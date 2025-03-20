import os
import threading
import time
import requests
import tempfile
import json
import cv2
from pathlib import Path
from bs4 import BeautifulSoup
from ultralytics import YOLO
from .detect_litter import process_litter
from .detect_number_plate import process_number_plate

# Configuration
AWS_URL = os.getenv("AWS_URL")

MODEL_PATH = Path(os.getenv("LITTER_MODEL_PATH"))
NUMBER_PLATE_MODEL = Path(os.getenv("NUMBER_PLATE_MODEL_PATH"))

# Global variables
model = None
detection_thread = None



def generate_processed_video(original_video_path, litter_json_path, plate_json_path, output_dir):
    try:
        frame_data = {}
        
        # Load litter tracking data if available and non-empty
        if litter_json_path and litter_json_path.exists():
            with open(litter_json_path, 'r') as f:
                litter_tracking_data = json.load(f)
            if litter_tracking_data:
                for entry in litter_tracking_data:
                    frame = entry['frame']
                    if frame not in frame_data:
                        frame_data[frame] = {'litter': [], 'plates': []}
                    frame_data[frame]['litter'].append(entry)
        
        # Load license plate tracking data if available and non-empty
        if plate_json_path and plate_json_path.exists():
            with open(plate_json_path, 'r') as f:
                plate_tracking_data = json.load(f)
            if plate_tracking_data:
                for entry in plate_tracking_data:
                    frame = entry['frame']
                    if frame not in frame_data:
                        frame_data[frame] = {'litter': [], 'plates': []}
                    frame_data[frame]['plates'].append(entry)
        
        if not frame_data:
            return None
        
        cap = cv2.VideoCapture(str(original_video_path))
        if not cap.isOpened():
            return None
        
        fps = cap.get(cv2.CAP_PROP_FPS)
        width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        
        output_filename = f"processed_{original_video_path.stem}.mp4"
        output_path = output_dir / output_filename
        fourcc = cv2.VideoWriter_fourcc(*'mp4v')
        out = cv2.VideoWriter(str(output_path), fourcc, fps, (width, height))
        
        frame_count = 0
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break
            
            frame_count += 1
            current_frame_data = frame_data.get(frame_count, {'litter': [], 'plates': []})
            
            # Draw litter detections
            for entry in current_frame_data['litter']:
                x1, y1, x2, y2 = entry['x1'], entry['y1'], entry['x2'], entry['y2']
                track_id = entry['track_id']
                class_name = entry['class_name']
                
                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
                label = f"{class_name} {track_id}"
                cv2.putText(frame, label, (x1, y1 - 10), 
                            cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)
            
            # Draw license plate detections
            for entry in current_frame_data['plates']:
                x1, y1, x2, y2 = entry['x1'], entry['y1'], entry['x2'], entry['y2']
                track_id = entry['track_id']
                ocr_text = entry.get('ocr_text', 'Unknown')
                
                cv2.rectangle(frame, (x1, y1), (x2, y2), (255, 0, 0), 2)
                label = f"Plate {track_id}: {ocr_text}"
                cv2.putText(frame, label, (x1, y1 - 10), 
                            cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 0, 0), 2)
            
            out.write(frame)

        cap.release()
        out.release()
        return output_path
        
    except Exception as e:
        print(f"Error generating processed video: {e}")
        return None




def get_video_list():
    try:
        response = requests.get(AWS_URL)
        if response.status_code != 200:
            return []
            
        soup = BeautifulSoup(response.text, "xml")
        return sorted(
            [key.text for key in soup.find_all("Key") 
             if key.text.endswith(('.mp4', '.avi', '.mov')) and 
                key.text.startswith('to_process/')]
        )
    except Exception as e:
        print(f"Error fetching video list: {e}")
        return []

def delete_video_from_bucket(video_key):
    try:
        response = requests.delete(f"{AWS_URL}{video_key}")
        return response.status_code == 204
    except Exception as e:
        print(f"Error deleting {video_key}: {e}")
        return False

def upload_to_aws(file_path, target_key):
    try:
        with open(file_path, 'rb') as f:
            response = requests.put(
                f"{AWS_URL}{target_key}",
                data=f,
                headers={'Content-Type': 'application/octet-stream'}
            )
            return response.status_code == 200
    except Exception as e:
        print(f"Error uploading {target_key}: {e}")
        return False

def download_and_process_video():
    global number_plate_model, trocr_processor, trocr_model
    # ... existing code ...
    
    
    videos = get_video_list()
    if not videos:
        return False

    video_key = videos[0]
    video_name = Path(video_key).name

    try:
        print(f"⏬ Downloading {video_name} from AWS")
        response = requests.get(f"{AWS_URL}{video_key}", stream=True)
        if not response.ok:
            return False
            
        temp_path = Path(tempfile.gettempdir()) / video_name
        with open(temp_path, "wb") as temp_file:
            for chunk in response.iter_content(chunk_size=8192):
                temp_file.write(chunk)

        with tempfile.TemporaryDirectory() as temp_processed_dir:
            processed_dir = Path(temp_processed_dir)
            
            # Process detections
            #######################################################################################
        
            litter_json_path = process_litter(temp_path, model, processed_dir)
            plate_json_path = process_number_plate(
                temp_path, 
                number_plate_model, 
                processed_dir,
                trocr_processor,
                trocr_model
            )
            #######################################################################################
            


            # Generate Video
            ########################################################################################
            processed_video_path = generate_processed_video(
                temp_path, 
                litter_json_path, 
                plate_json_path, 
                processed_dir
            )
            ########################################################################################


            if not processed_video_path or not processed_video_path.exists():
                print("NOTHING DETECTED")
                delete_video_from_bucket(video_key)
                temp_path.unlink(missing_ok=True)
                return False

            #########################################################################################
            video_target = f"processed/{processed_video_path.name}"
            upload_success = upload_to_aws(processed_video_path, video_target)
            #######################################################################################


            if upload_success:
                delete_video_from_bucket(video_key)
                print("✅ Successfully processed and uploaded video")
            else:
                print("⚠️ Partial upload completed")

        temp_path.unlink(missing_ok=True)
        return True
        
    except Exception as e:
        print(f"❌ Error processing video: {e}")
        return False

# Add new global variables
number_plate_model = None
trocr_processor = None
trocr_model = None

def main_loop():
    global model, number_plate_model, trocr_processor, trocr_model
    # Setup environment once
    from .detect_number_plate import setup_environment
    setup_environment()

    if model is None:
        # Load litter detection model
        if not MODEL_PATH.exists():
            print(f"❌ Litter model not found at {MODEL_PATH}")
            return
        try:
            model = YOLO(str(MODEL_PATH))
            print("✅ Litter detection model loaded")
        except Exception as e:
            print(f"❌ Failed to load litter model: {e}")
            return

    if number_plate_model is None:
        # Load number plate detection model
        if not NUMBER_PLATE_MODEL.exists():
            print(f"❌ Number plate model not found at {NUMBER_PLATE_MODEL}")
            return
        try:
            number_plate_model = YOLO(str(NUMBER_PLATE_MODEL))
            print("✅ Number plate detection model loaded")
        except Exception as e:
            print(f"❌ Failed to load number plate model: {e}")
            return

    if trocr_processor is None or trocr_model is None:
        # Load TrOCR models
        try:
            from transformers import TrOCRProcessor, VisionEncoderDecoderModel
            trocr_processor = TrOCRProcessor.from_pretrained(
                'microsoft/trocr-base-printed', 
                cache_dir=os.environ.get("MODEL_CACHE", ".ocr_model")
            )
            trocr_model = VisionEncoderDecoderModel.from_pretrained(
                'microsoft/trocr-base-printed',
                cache_dir=os.environ.get("MODEL_CACHE", ".ocr_model")
            )
            print("✅ TrOCR models loaded")
        except Exception as e:
            print(f"❌ Failed to load TrOCR models: {e}")
            return

    while True:
        try:
            if not download_and_process_video():
                print("⏳ No videos to process, waiting 10 seconds...")
                time.sleep(10)
        except Exception as e:
            print(f"⚠️ Unexpected error: {e}")
            time.sleep(5)
    
    # ... rest of existing code ...

def start_detection_system():
    global detection_thread
    
    if detection_thread and detection_thread.is_alive():
        print("⚠️ Detection system already running")
        return
    
    print("🚀 Starting litter detection system...")
    detection_thread = threading.Thread(target=main_loop, daemon=True)
    detection_thread.start()
    print("📡 Background processing started")
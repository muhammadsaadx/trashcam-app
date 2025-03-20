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
MODEL_PATH = Path("D:/TrashCamApp/trashcam-backend/weights/yolo12x_10epochsFull_40epochs5th.pt")
NUMBER_PLATE_MODEL = Path("D:/TrashCamApp/trashcam-backend/weights/license_plate_detector.pt")

# Global variables
model = None
detection_thread = None

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


def generate_processed_video(original_video_path, litter_json_path, plate_json_path, output_dir):
    try:
        # Initialize frame data dictionary
        frame_data = {}
        
        # Load litter tracking data if available
        if litter_json_path and Path(litter_json_path).exists():
            with open(litter_json_path, 'r') as f:
                litter_tracking_data = json.load(f)
            
            # Organize litter data by frame
            for entry in litter_tracking_data:
                frame = entry['frame']
                if frame not in frame_data:
                    frame_data[frame] = {'litter': [], 'plates': []}
                frame_data[frame]['litter'].append(entry)
        
        # Load license plate tracking data if available
        if plate_json_path and Path(plate_json_path).exists():
            with open(plate_json_path, 'r') as f:
                plate_tracking_data = json.load(f)
            
            # Organize plate data by frame
            for entry in plate_tracking_data:
                frame = entry['frame']
                if frame not in frame_data:
                    frame_data[frame] = {'litter': [], 'plates': []}
                frame_data[frame]['plates'].append(entry)
        
        # If no tracking data was loaded, return None
        if not frame_data:
            print("No tracking data available")
            return None
        
        # Open video capture
        cap = cv2.VideoCapture(str(original_video_path))
        if not cap.isOpened():
            return None
        
        # Get video properties
        fps = cap.get(cv2.CAP_PROP_FPS)
        width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        
        # Set up output video writer
        output_filename = f"processed_{original_video_path.stem}.mp4"
        output_path = output_dir / output_filename
        fourcc = cv2.VideoWriter_fourcc(*'mp4v')
        out = cv2.VideoWriter(str(output_path), fourcc, fps, (width, height))
        
        # Process each frame
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
                
                # Use a different color for license plates (blue)
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
    

    
def download_and_process_video():
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
            
            # Process litter detection
            litter_json_path = process_litter(temp_path, model, processed_dir)
            
            # Initialize number plate model if not defined at module level
            number_plate_model = YOLO(str(NUMBER_PLATE_MODEL))
            
            # Process number plate detection
            plate_json_path = process_number_plate(temp_path, number_plate_model, processed_dir)
            
            if not litter_json_path or not litter_json_path.exists():
                print("⚠️ No litter tracking data generated")
                
            if not plate_json_path or not plate_json_path.exists():
                print("⚠️ No license plate tracking data generated")
                
            # Continue with video processing if at least one type of detection worked
            if (litter_json_path and litter_json_path.exists()):
                processed_video_path = generate_processed_video(temp_path, litter_json_path, plate_json_path, processed_dir)
                
                if not processed_video_path or not processed_video_path.exists():
                    return False

                video_target = f"processed/{processed_video_path.name}"
                json_target = f"processed/{litter_json_path.name}"
                plate_json_target = f"processed/numberplates.json" if plate_json_path else None
                
                # Upload processed files
                upload_success = upload_to_aws(processed_video_path, video_target)
                if litter_json_path and litter_json_path.exists():
                    upload_success &= upload_to_aws(litter_json_path, json_target)
                if plate_json_path and plate_json_path.exists():
                    upload_success &= upload_to_aws(plate_json_path, plate_json_target)

                if upload_success:
                    delete_video_from_bucket(video_key)
                    print("✅ Successfully processed and uploaded video")
                else:
                    print("⚠️ Partial upload completed")
            else:
                print("❌ No detection data available for video processing")
                return False

        temp_path.unlink(missing_ok=True)
        return True
        
    except Exception as e:
        print(f"❌ Error processing video: {e}")
        return False


def main_loop():
    global model
    if model is None:
        if not MODEL_PATH.exists():
            print(f"❌ Model not found at {MODEL_PATH}")
            return
        try:
            model = YOLO(str(MODEL_PATH))
            print("✅ YOLO model loaded")
        except Exception as e:
            print(f"❌ Failed to load model: {e}")
            return
    
    while True:
        try:
            if not download_and_process_video():
                print("⏳ No videos to process, waiting 10 seconds...")
                time.sleep(10)
        except Exception as e:
            print(f"⚠️ Unexpected error: {e}")
            time.sleep(5)

def start_detection_system():
    global detection_thread
    
    if detection_thread and detection_thread.is_alive():
        print("⚠️ Detection system already running")
        return
    
    print("🚀 Starting litter detection system...")
    detection_thread = threading.Thread(target=main_loop, daemon=True)
    detection_thread.start()
    print("📡 Background processing started")


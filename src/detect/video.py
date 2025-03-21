import os
import threading
import time
import requests
import tempfile
import json
import cv2
import numpy as np
from pathlib import Path
from bs4 import BeautifulSoup
from ultralytics import YOLO
from facenet_pytorch import InceptionResnetV1
from .detect_litter import process_litter
from .detect_number_plate import process_number_plate
from .detect_face import process_face, extract_embedding, build_orl_database


# Configuration
AWS_URL = os.getenv("AWS_URL")
MODEL_PATH = Path(os.getenv("LITTER_MODEL_PATH"))
NUMBER_PLATE_MODEL = Path(os.getenv("NUMBER_PLATE_MODEL_PATH"))
FACE_MODEL_PATH = Path(os.getenv("FACE_DETECTION_MODEL_PATH"))
ORL_DATASET_PATH = Path(os.getenv("ORL_DATASET_PATH"))

model = None
number_plate_model = None
trocr_processor = None
trocr_model = None
face_model = None
facenet = None
orl_database = None
detection_thread = None

def generate_processed_video(original_video_path, litter_json_path, 
                           plate_json_path, face_json_path, output_dir):
    try:
        frame_data = {}
        
        # Load detection data
        for json_path, category in [(litter_json_path, 'litter'), 
                                  (plate_json_path, 'plates'),
                                  (face_json_path, 'faces')]:
            if json_path and json_path.exists():
                with open(json_path, 'r') as f:
                    data = json.load(f)
                    for entry in data:
                        frame = entry['frame']
                        if frame not in frame_data:
                            frame_data[frame] = {'litter': [], 'plates': [], 'faces': []}
                        frame_data[frame][category].append(entry)
        
        if not frame_data:
            return None
        
        # Video setup
        cap = cv2.VideoCapture(str(original_video_path))
        if not cap.isOpened():
            return None
        
        fps = cap.get(cv2.CAP_PROP_FPS)
        width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        
        output_path = output_dir / f"processed_{original_video_path.stem}.mp4"
        out = cv2.VideoWriter(str(output_path), cv2.VideoWriter_fourcc(*'mp4v'), fps, (width, height))
        
        # Process frames
        frame_count = 0
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break
            
            frame_count += 1
            current_data = frame_data.get(frame_count, {'litter': [], 'plates': [], 'faces': []})
            
            # Draw all detections
            for category, color in [('litter', (0, 255, 0)), 
                                   ('plates', (255, 0, 0)), 
                                   ('faces', (0, 0, 255))]:
                for entry in current_data[category]:
                    x1, y1, x2, y2 = entry['x1'], entry['y1'], entry['x2'], entry['y2']
                    cv2.rectangle(frame, (x1, y1), (x2, y2), color, 2)
                    label = (
                        f"{entry['class_name']} {entry['track_id']}" if category == 'litter' else
                        f"Plate {entry['track_id']}: {entry.get('ocr_text', '')}" if category == 'plates' else
                        entry['identity']
                    )
                    cv2.putText(frame, label, (x1, y1 - 10), 
                               cv2.FONT_HERSHEY_SIMPLEX, 0.6, color, 2)
            
            out.write(frame)

        cap.release()
        out.release()
        return output_path
        
    except Exception as e:
        print(f"Error generating video: {e}")
        return None

def get_video_list():
    try:
        response = requests.get(AWS_URL)
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, "xml")
            return sorted([
                key.text for key in soup.find_all("Key") 
                if key.text.endswith(('.mp4', '.avi', '.mov')) 
                and key.text.startswith('to_process/')
            ])
        return []
    except Exception as e:
        print(f"Error fetching videos: {e}")
        return []

def delete_video_from_bucket(video_key):
    try:
        return requests.delete(f"{AWS_URL}{video_key}").status_code == 204
    except Exception as e:
        print(f"Delete error: {e}")
        return False

def upload_to_aws(file_path, target_key):
    try:
        with open(file_path, 'rb') as f:
            return requests.put(
                f"{AWS_URL}{target_key}",
                data=f,
                headers={'Content-Type': 'application/octet-stream'}
            ).status_code == 200
    except Exception as e:
        print(f"Upload error: {e}")
        return False


def download_and_process_video():
    global model, number_plate_model, trocr_processor, trocr_model
    global face_model, facenet, orl_database
    
    videos = get_video_list()
    if not videos:
        return False

    video_key = videos[0]
    video_name = Path(video_key).name

    try:
        print(f"Downloading {video_name}")
        with requests.get(f"{AWS_URL}{video_key}", stream=True) as response:
            if response.ok:
                temp_path = Path(tempfile.gettempdir()) / video_name
                with open(temp_path, "wb") as f:
                    for chunk in response.iter_content(chunk_size=8192):
                        f.write(chunk)

                with tempfile.TemporaryDirectory() as temp_dir:
                    processed_dir = Path(temp_dir)
                    

                    ###########################################################################################################
                    # Process detections
                    litter_path = process_litter(temp_path, model, processed_dir)
                    plate_path = process_number_plate(temp_path, number_plate_model, 
                                                    processed_dir, trocr_processor, trocr_model)
                    face_path = process_face(temp_path, face_model, facenet, 
                                           orl_database, processed_dir)

                    # Generate video
                    output_path = generate_processed_video(temp_path, litter_path, 
                                                          plate_path, face_path, processed_dir)
                    ###########################################################################################################


                    
                    ###########################################################################################################
                    # Check if any detections were made
                    if output_path and output_path.exists():
                        if upload_to_aws(output_path, f"processed/{output_path.name}"):
                            delete_video_from_bucket(video_key)
                            print("Processing successful")
                            return True
                        return False
                    else:
                        print("NOTHING DETECTED")
                        delete_video_from_bucket(video_key)
                        return False
                    ###########################################################################################################

        print("Processing failed")
        return False
    except Exception as e:
        print(f"Critical error: {e}")
        return False
    finally:
        if 'temp_path' in locals():
            temp_path.unlink(missing_ok=True)

def main_loop():
    global model, number_plate_model, trocr_processor, trocr_model
    global face_model, facenet, orl_database
    
    # Initialize models
    try:
        from .detect_number_plate import setup_environment
        setup_environment()

        # Load litter model
        if not model:
            model = YOLO(str(MODEL_PATH))
            print("Loaded litter model")

        # Load plate model
        if not number_plate_model:
            number_plate_model = YOLO(str(NUMBER_PLATE_MODEL))
            print("Loaded plate model")

        # Load OCR
        if not trocr_processor or not trocr_model:
            from transformers import TrOCRProcessor, VisionEncoderDecoderModel
            trocr_processor = TrOCRProcessor.from_pretrained(
                'microsoft/trocr-base-printed', 
                cache_dir=os.environ.get("MODEL_CACHE", ".ocr_model"))
            trocr_model = VisionEncoderDecoderModel.from_pretrained(
                'microsoft/trocr-base-printed',
                cache_dir=os.environ.get("MODEL_CACHE", ".ocr_model"))
            print("Loaded OCR models")

        # Face detection
        if not face_model:
            face_model = YOLO(str(FACE_MODEL_PATH))
            print("Loaded face detector")

        if not facenet:
            facenet = InceptionResnetV1(pretrained='vggface2').eval()
            print("✅ Face recognition model loaded")

        # Build face database using detect_face's version
        if not orl_database:
            print("⏳ Building face database...")
            orl_database = build_orl_database(
                facenet_model=facenet,
                dataset_path=ORL_DATASET_PATH
            )
            print(f"✅ Loaded {len(orl_database)} known faces")


        # Main loop
        while True:
            if not download_and_process_video():
                time.sleep(10)
    except Exception as e:
        print(f"Initialization failed: {e}")
        return

def start_detection_system():
    global detection_thread
    if not (detection_thread and detection_thread.is_alive()):
        detection_thread = threading.Thread(target=main_loop, daemon=True)
        detection_thread.start()
        print("Detection system started")

if __name__ == "__main__":
    start_detection_system()
    try:
        while True: time.sleep(1)
    except KeyboardInterrupt:
        print("Stopping system...")
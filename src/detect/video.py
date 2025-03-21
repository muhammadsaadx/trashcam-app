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
from .detect_car_pedestrian import process_car_pedestrian
from .identify import identify_process
from collections import defaultdict
from typing import Tuple, List, Dict, Set, TypeAlias


# Configuration
AWS_URL = os.getenv("AWS_URL")
MODEL_PATH = Path(os.getenv("LITTER_MODEL_PATH"))
NUMBER_PLATE_MODEL = Path(os.getenv("NUMBER_PLATE_MODEL_PATH"))
FACE_MODEL_PATH = Path(os.getenv("FACE_DETECTION_MODEL_PATH"))
ORL_DATASET_PATH = Path(os.getenv("ORL_DATASET_PATH"))
CAR_OR_PERSON_MODEL_PATH = Path(os.getenv("CAR_OR_PERSON_MODEL_PATH"))

model = None
number_plate_model = None
trocr_processor = None
trocr_model = None
face_model = None
facenet = None
orl_database = None
detection_thread = None
car_pedestrian_model = None

def generate_processed_video(original_video_path, litter_json_path, plate_json_path, face_json_path, car_pedestrian_json_path, output_dir):
    try:
        print(f"🎬 Generating processed video from {original_video_path}")
        frame_data = {}
        
        # Load detection data
        for json_path, category in [(litter_json_path, 'litter'), 
                                  (plate_json_path, 'plates'),
                                  (face_json_path, 'faces'),
                                  (car_pedestrian_json_path, 'car_pedestrian')]:
            if json_path and json_path.exists():
                print(f"📊 Loading {category} detection data")
                with open(json_path, 'r') as f:
                    data = json.load(f)
                    for entry in data:
                        frame = entry['frame']
                        if frame not in frame_data:
                            frame_data[frame] = {'litter': [], 'plates': [], 'faces': [], 'car_pedestrian': []}
                        frame_data[frame][category].append(entry)
        
        if not frame_data:
            print("❌ No detection data found")
            return None
        
        # Video setup
        cap = cv2.VideoCapture(str(original_video_path))
        if not cap.isOpened():
            print("❌ Could not open video file")
            return None
        
        fps = cap.get(cv2.CAP_PROP_FPS)
        width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        
        output_path = output_dir / f"processed_{original_video_path.stem}.mp4"
        out = cv2.VideoWriter(str(output_path), cv2.VideoWriter_fourcc(*'mp4v'), fps, (width, height))
        
        print(f"⚙️ Processing video frames with detections")
        # Process frames
        frame_count = 0
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break
            
            frame_count += 1
            current_data = frame_data.get(frame_count, {'litter': [], 'plates': [], 'faces': [], 'car_pedestrian': []})
            
            # Draw all detections
            for category, color in [('litter', (0, 255, 0)), 
                                   ('plates', (255, 0, 0)), 
                                   ('faces', (0, 0, 255)),
                                   ('car_pedestrian', (255, 255, 0))]:
                for entry in current_data[category]:
                    x1, y1, x2, y2 = entry['x1'], entry['y1'], entry['x2'], entry['y2']
                    cv2.rectangle(frame, (x1, y1), (x2, y2), color, 2)
                    label = (
                        f"{entry['class_name']} {entry['track_id']}" if category == 'litter' else
                        f"Plate {entry['track_id']}: {entry.get('ocr_text', '')}" if category == 'plates' else
                        entry['identity'] if category == 'faces' else
                        f"{entry['class_name']} {entry['track_id']}"
                    )
                    cv2.putText(frame, label, (x1, y1 - 10), 
                               cv2.FONT_HERSHEY_SIMPLEX, 0.6, color, 2)
            
            out.write(frame)

        cap.release()
        out.release()
        print(f"✅ Processed video saved to {output_path}")
        return output_path
        
    except Exception as e:
        print(f"❌ Error generating video: {e}")
        return None

def get_video_list():
    try:
        print("🔍 Checking AWS for videos to process...")
        response = requests.get(AWS_URL)
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, "xml")
            videos = sorted([
                key.text for key in soup.find_all("Key") 
                if key.text.endswith(('.mp4', '.avi', '.mov')) 
                and key.text.startswith('to_process/')
            ])
            if videos:
                print(f"🎯 Found {len(videos)} videos to process")
            else:
                print("🔍 No videos found in to_process/ folder")
            return videos
        print(f"❌ Failed to get video list: HTTP {response.status_code}")
        return []
    except Exception as e:
        print(f"❌ Error fetching videos: {e}")
        return []

def delete_video_from_bucket(video_key):
    try:
        print(f"🗑️ Deleting processed video {video_key} from bucket")
        status_code = requests.delete(f"{AWS_URL}{video_key}").status_code
        if status_code == 204:
            print(f"✅ Successfully deleted {video_key}")
            return True
        else:
            print(f"❌ Failed to delete {video_key}: HTTP {status_code}")
            return False
    except Exception as e:
        print(f"❌ Delete error: {e}")
        return False

def upload_to_aws(file_path, target_key):
    try:
        print(f"📤 Uploading processed video to AWS: {target_key}")
        with open(file_path, 'rb') as f:
            status_code = requests.put(
                f"{AWS_URL}{target_key}",
                data=f,
                headers={'Content-Type': 'application/octet-stream'}
            ).status_code
            if status_code == 200:
                print(f"✅ Successfully uploaded to {target_key}")
                return True
            else:
                print(f"❌ Failed to upload to {target_key}: HTTP {status_code}")
                return False
    except Exception as e:
        print(f"❌ Upload error: {e}")
        return False

























# Define type aliases at module level
BBox: TypeAlias = Tuple[float, float, float, float]
TrackData: TypeAlias = List[Dict]

def preprocess_json_files(
    litter_json_path: str,
    plate_json_path: str,
    face_json_path: str,
    car_pedestrian_json_path: str
) -> None:
    """Process detection data by filtering tracks and resolving identity conflicts."""
    
    def load_data(path: str) -> TrackData:
        with open(path, 'r') as f:
            return json.load(f)

    def get_valid_tracks(data: TrackData, min_frames: int = 15) -> Set[int]:
        counter = defaultdict(int)
        for item in data:
            counter[item['track_id']] += 1
        return {tid for tid, count in counter.items() if count >= min_frames}

    def calculate_iou(bbox1: BBox, bbox2: BBox) -> float:
        x_left = max(bbox1[0], bbox2[0])
        y_top = max(bbox1[1], bbox2[1])
        x_right = min(bbox1[2], bbox2[2])
        y_bottom = min(bbox1[3], bbox2[3])
        
        if x_right < x_left or y_bottom < y_top:
            return 0.0
            
        intersection = (x_right - x_left) * (y_bottom - y_top)
        area1 = (bbox1[2] - bbox1[0]) * (bbox1[3] - bbox1[1])
        area2 = (bbox2[2] - bbox2[0]) * (bbox2[3] - bbox2[1])
        return intersection / (area1 + area2 - intersection + 1e-6)

    # Load all datasets
    litter_data = load_data(litter_json_path)
    plate_data = load_data(plate_json_path)
    face_data = load_data(face_json_path)
    car_pedestrian_data = load_data(car_pedestrian_json_path)

    # Get valid track IDs
    valid_litter = get_valid_tracks(litter_data)
    valid_plate = get_valid_tracks(plate_data)
    valid_car_ped = get_valid_tracks(car_pedestrian_data)

    # Process litter data with person overlap check
    person_boxes = defaultdict(list)
    for item in car_pedestrian_data:
        if item.get('class_name') == 'person' and item['track_id'] in valid_car_ped:
            person_boxes[item['frame']].append(
                (item['x1'], item['y1'], item['x2'], item['y2'])
            )
    
    filtered_litter = [
        item for item in litter_data
        if item['track_id'] in valid_litter
        and not any(
            calculate_iou(
                (item['x1'], item['y1'], item['x2'], item['y2']),
                p_bbox
            ) > 0.5
            for p_bbox in person_boxes.get(item['frame'], [])
        )
    ]

    # Process plate data - filter by valid tracks
    filtered_plate = [
        item for item in plate_data
        if item['track_id'] in valid_plate
    ]

    # Process face data
    face_class_counts = defaultdict(lambda: defaultdict(int))
    identity_area_counts = defaultdict(lambda: defaultdict(int))  # NEW: Track area-based counts
    for face in face_data:
        if 'identity' in face:
            face_class_counts[face['track_id']][face['identity']] += 1
            
    valid_faces = get_valid_tracks(face_data)
    face_groups = defaultdict(list)
    for face in face_data:
        face_groups[face['frame']].append(face)

    filtered_faces = []
    for face in face_data:
        if face['track_id'] not in valid_faces:
            continue
            
        track_id = face['track_id']
        original_identity = face.get('identity', 'Unknown')
        
        # NEW: Calculate area key for spatial grouping
        area_key = (int(face['x1'] // 100), int(face['y1'] // 100))  # Proper tuple creation

        # Check if identity needs replacement
        if face_class_counts[track_id].get(original_identity, 0) < 15:
            replacement = None
            max_iou = 0.0
            
            for other_face in face_groups[face['frame']]:
                if other_face['track_id'] == track_id:
                    continue
                
                other_identity = other_face.get('identity', 'Unknown')
                other_track_id = other_face['track_id']
                
                if face_class_counts[other_track_id].get(other_identity, 0) >= 15:
                    iou = calculate_iou(
                        (face['x1'], face['y1'], face['x2'], face['y2']),
                        (other_face['x1'], other_face['y1'], other_face['x2'], other_face['y2'])
                    )
                    
                    if iou > max_iou and iou > 0.5:
                        max_iou = iou
                        replacement = other_identity
            
            if replacement:
                filtered_faces.append({**face, 'identity': replacement})
                identity_area_counts[area_key][replacement] += 1
                continue
                
        # NEW: Check for overlapping identities in same area with higher frequency
        current_identity = face.get('identity', 'Unknown')
        max_count = identity_area_counts[area_key].get(current_identity, 0)
        replacement = None
        
        for other_face in face_groups[face['frame']]:
            if other_face['track_id'] == track_id:
                continue
                
            other_identity = other_face.get('identity', 'Unknown')
            iou = calculate_iou(
                (face['x1'], face['y1'], face['x2'], face['y2']),
                (other_face['x1'], other_face['y1'], other_face['x2'], other_face['y2'])
            )
            
            if iou > 0.5:
                other_count = identity_area_counts[area_key].get(other_identity, 0)
                if other_count > max_count:
                    max_count = other_count
                    replacement = other_identity
        
        if replacement:
            filtered_faces.append({**face, 'identity': replacement})
            identity_area_counts[area_key][replacement] += 1
        else:
            filtered_faces.append(face)
            identity_area_counts[area_key][current_identity] += 1

    # Filter identities with insufficient counts after replacement
    track_identity_counts = defaultdict(lambda: defaultdict(int))
    for face in filtered_faces:
        track_id = face['track_id']
        identity = face.get('identity', 'Unknown')
        track_identity_counts[track_id][identity] += 1

    final_filtered_faces = [
        face for face in filtered_faces
        if track_identity_counts[face['track_id']][face.get('identity', 'Unknown')] >= 15
    ]

    # Save processed data
    def save_data(data: TrackData, path: str) -> None:
        with open(path, 'w') as f:
            json.dump(data, f, indent=2)

    save_data(filtered_litter, litter_json_path)
    save_data(filtered_plate, plate_json_path)
    save_data(final_filtered_faces, face_json_path)



    


























def download_and_process_video():
    global model, number_plate_model, trocr_processor, trocr_model
    global face_model, facenet, orl_database, car_pedestrian_model
    
    videos = get_video_list()
    if not videos:
        print("⏳ Waiting for videos to process...")
        return False

    video_key = videos[0]
    video_name = Path(video_key).name

    try:
        print(f"📥 Downloading {video_name} from AWS")
        with requests.get(f"{AWS_URL}{video_key}", stream=True) as response:
            if response.ok:
                temp_path = Path(tempfile.gettempdir()) / video_name
                with open(temp_path, "wb") as f:
                    for chunk in response.iter_content(chunk_size=8192):
                        f.write(chunk)
                print(f"✅ Download successful: {temp_path}")

                with tempfile.TemporaryDirectory() as temp_dir:
                    processed_dir = Path(temp_dir)
                    print(f"📁 Created temporary directory for processing: {processed_dir}")
                    
                    # Process detections

                    
                    print("🔎 Starting litter detection")
                    litter_path = process_litter(temp_path, model, processed_dir)
                    print(f"✅ Litter detection complete: {litter_path}")
                    
                    print("🚗 Starting number plate detection")
                    plate_path = process_number_plate(temp_path, number_plate_model, 
                                                    processed_dir, trocr_processor, trocr_model)
                    print(f"✅ Number plate detection complete: {plate_path}")
                    
                    print("👤 Starting face detection")
                    face_path = process_face(temp_path, face_model, facenet, 
                                           orl_database, processed_dir)
                    print(f"✅ Face detection complete: {face_path}")
                    
                    print("🚶‍♂️🚗 Starting car and pedestrian detection")
                    car_pedestrian_path = process_car_pedestrian(temp_path, car_pedestrian_model, processed_dir)
                    print(f"✅ Car and pedestrian detection complete: {car_pedestrian_path}")



                    preprocess_json_files(litter_path, plate_path, face_path, car_pedestrian_path)
                    
                    # Generate video
                    output_path = generate_processed_video(temp_path, litter_path, 
                                                          plate_path, face_path, 
                                                          car_pedestrian_path, processed_dir)

                    # Check if any detections were made
                    if output_path and output_path.exists():
                        print(f"📤 Uploading processed video: {output_path}")
                        
                        upload_status = False

                        max_retries = 3
                        retry_count = 0
                        upload_status = False

                        while not upload_status and retry_count < max_retries:
                            upload_status = upload_to_aws(output_path, f"processed/{output_path.name}")
                            if not upload_status:
                               retry_count += 1
                               print(f"Upload failed. Retry {retry_count}/{max_retries}")
                               time.sleep(2)

                        delete_video_from_bucket(video_key)
                        print("🎉 Processing successful")

                        # Run identification process including car/pedestrian data
                        identify_process(litter_path, plate_path, face_path, car_pedestrian_path)

                        return True
                    else:
                        print("⚠️ NOTHING DETECTED")
                        delete_video_from_bucket(video_key)
                        return False

        print("❌ Processing failed")
        return False
    except Exception as e:
        print(f"❌ Critical error: {e}")
        return False
    finally:
        if 'temp_path' in locals():
            print(f"🧹 Cleaning up temporary file: {temp_path}")
            temp_path.unlink(missing_ok=True)




def main_loop():
    global model, number_plate_model, trocr_processor, trocr_model, car_pedestrian_model
    global face_model, facenet, orl_database
    
    # Initialize models
    try:
        print("🚀 Starting system initialization")
        from .detect_number_plate import setup_environment
        setup_environment()

        # Load litter model
        if not model:
            print("📦 Loading litter detection model...")
            model = YOLO(str(MODEL_PATH))
            print("✅ Loaded litter model")

        # Load plate model
        if not number_plate_model:
            print("📦 Loading number plate detection model...")
            number_plate_model = YOLO(str(NUMBER_PLATE_MODEL))
            print("✅ Loaded plate model")

        # Load OCR
        if not trocr_processor or not trocr_model:
            print("📦 Loading OCR models...")
            from transformers import TrOCRProcessor, VisionEncoderDecoderModel
            trocr_processor = TrOCRProcessor.from_pretrained(
                'microsoft/trocr-base-printed', 
                cache_dir=os.environ.get("MODEL_CACHE", ".ocr_model"))
            trocr_model = VisionEncoderDecoderModel.from_pretrained(
                'microsoft/trocr-base-printed',
                cache_dir=os.environ.get("MODEL_CACHE", ".ocr_model"))
            print("✅ Loaded OCR models")

        # Face detection
        if not face_model:
            print("📦 Loading face detection model...")
            face_model = YOLO(str(FACE_MODEL_PATH))
            print("✅ Loaded face detector")

        if not facenet:
            print("📦 Loading face recognition model...")
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

        # Load car/pedestrian model
        if not car_pedestrian_model:
            print("📦 Loading Car OR Pedestrian detection model...")
            car_pedestrian_model = YOLO(str(CAR_OR_PERSON_MODEL_PATH))
            print("✅ Loaded Car OR Pedestrian model")

        print("✅ System initialization complete")

        # Main loop
        print("🔄 Starting main processing loop")
        while True:
            if not download_and_process_video():
                print("⏳ Waiting for 10 seconds before next check...")
                time.sleep(10)
    except Exception as e:
        print(f"❌ Initialization failed: {e}")
        return

def start_detection_system():
    global detection_thread
    if not (detection_thread and detection_thread.is_alive()):
        print("🚀 Starting detection system thread")
        detection_thread = threading.Thread(target=main_loop, daemon=True)
        detection_thread.start()
        print("✅ Detection system started")

if __name__ == "__main__":
    start_detection_system()
    try:
        print("🏃 Main thread running, press Ctrl+C to stop")
        while True: time.sleep(1)
    except KeyboardInterrupt:
        print("🛑 Stopping system...")
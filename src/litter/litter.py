import os
import threading
import time
import requests
import tempfile
from pathlib import Path
from bs4 import BeautifulSoup
from ultralytics import YOLO
from .process import process_video  # Assuming process_video is in this module

# Configuration
AWS_URL = os.getenv("AWS_URL")
MODEL_PATH = Path("D:/TrashCamApp/trashcam-backend/weights/yolo12x_10epochsFull_40epochs5th.pt")

model = None  # Initialize model lazily to avoid loading at import time

def get_video_list():
    """Fetch list of videos from the to_process folder in AWS bucket"""
    try:
        response = requests.get(AWS_URL)
        if response.status_code != 200:
            print(f"Failed to get video list: HTTP {response.status_code}")
            return []
        soup = BeautifulSoup(response.text, "xml")
        return sorted([key.text for key in soup.find_all("Key") 
                      if key.text.endswith(('.mp4', '.avi', '.mov')) and 
                         key.text.startswith('to_process/')])
    except Exception as e:
        print(f"Error fetching video list: {e}")
        return []

def delete_video_from_bucket(video_key):
    """Remove video from AWS bucket"""
    try:
        response = requests.delete(f"{AWS_URL}{video_key}")
        if response.status_code == 204:
            print(f"Deleted {video_key} from AWS")
        else:
            print(f"Failed to delete {video_key}: HTTP {response.status_code}")
    except Exception as e:
        print(f"Error deleting {video_key}: {e}")

def upload_to_aws(file_path, target_key):
    """Upload a file to AWS bucket under specified key"""
    try:
        with open(file_path, 'rb') as f:
            response = requests.put(
                f"{AWS_URL}{target_key}",
                data=f
            )
            if response.status_code == 200:
                print(f"Successfully uploaded {target_key}")
                return True
            else:
                print(f"Upload failed: HTTP {response.status_code} - {response.text}")
                return False
    except Exception as e:
        print(f"Error uploading {target_key}: {e}")
        return False

def download_and_process_video():
    """Download and process a video directly from AWS bucket"""
    videos = get_video_list()
    if not videos:
        return False

    video_key = videos[0]
    video_name = Path(video_key).name

    try:
        print(f"Downloading {video_name} from AWS")
        response = requests.get(f"{AWS_URL}{video_key}", stream=True)
        if response.status_code != 200:
            print(f"Failed to download {video_name}: HTTP {response.status_code}")
            return False
            
        # Save to temporary file
        temp_path = Path(tempfile.gettempdir()) / video_name
        with open(temp_path, "wb") as temp_file:
            for chunk in response.iter_content(chunk_size=8192):
                temp_file.write(chunk)
            
        print(f"Processing {video_name}")

        # Process into temporary directory
        with tempfile.TemporaryDirectory() as temp_processed_dir:
            processed_dir = Path(temp_processed_dir)
            processed_path = process_video(temp_path, model, processed_dir)
            
            if processed_path and processed_path.exists():
                # Upload to processed/ folder in AWS
                target_key = f"processed/{processed_path.name}"
                if upload_to_aws(processed_path, target_key):
                    # Delete original from to_process only after successful upload
                    delete_video_from_bucket(video_key)
                else:
                    print("Upload failed, original video retained in bucket")
            else:
                print("Processing failed, no output generated")

        # Cleanup downloaded temp file
        try:
            temp_path.unlink()
            print(f"Cleaned up temporary file {temp_path}")
        except Exception as e:
            print(f"Error cleaning up temp file: {e}")

        return True
    except Exception as e:
        print(f"Error processing {video_name}: {e}")
        return False

def main_loop():
    """Continuous processing loop"""
    global model
    
    if model is None:
        if not MODEL_PATH.exists():
            print(f"ERROR: Model not found at {MODEL_PATH}")
            return
        model = YOLO(str(MODEL_PATH))
        print("YOLO model loaded successfully")
        
    while True:
        try:
            video_processed = download_and_process_video()
            if not video_processed:
                print("No videos to process, waiting...")
                time.sleep(5)
        except Exception as e:
            print(f"Error in main processing loop: {e}")
            time.sleep(5)

# Track background thread
detection_thread = None

def start_detection_system():
    """Start the litter detection system in a background thread"""
    global detection_thread
    
    if detection_thread is not None and detection_thread.is_alive():
        print("Detection system is already running")
        return
    
    print("Starting TrashCam litter detection system...")
    
    detection_thread = threading.Thread(target=main_loop, daemon=True)
    detection_thread.start()
    print("Processing thread started, monitoring for new videos...")

def detect_litter():
    """Legacy function for backward compatibility"""
    print("Warning: Using legacy detect_litter function. Consider updating to start_detection_system.")
    start_detection_system()
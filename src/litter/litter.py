import os
import threading
import time
import requests
from pathlib import Path
from bs4 import BeautifulSoup
from ultralytics import YOLO
from .process import process_video  # New import

# Configuration
TO_PROCESS_DIR = Path("D:/TrashCamApp/trashcam-backend/videos/to_process")
PROCESSED_DIR = Path("D:/TrashCamApp/trashcam-backend/videos/processed")
TO_PROCESS_DIR.mkdir(parents=True, exist_ok=True)
PROCESSED_DIR.mkdir(parents=True, exist_ok=True)

AWS_URL = os.getenv("AWS_URL")
MODEL_PATH = Path("D:/TrashCamApp/trashcam-backend/weights/yolo12xepoch6.pt")

# Initialize YOLOv12x model
model = YOLO(str(MODEL_PATH))
model.fuse()
model.info(verbose=False)

def get_video_list():
    """Fetch list of videos from AWS bucket"""
    try:
        response = requests.get(AWS_URL)
        if response.status_code != 200:
            print(f"Failed to get video list: HTTP {response.status_code}")
            return []
        soup = BeautifulSoup(response.text, "xml")
        return sorted([key.text for key in soup.find_all("Key") 
                      if key.text.endswith(('.mp4', '.avi', '.mov'))])
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

def download_video():
    """Download earliest video from AWS bucket"""
    videos = get_video_list()
    if not videos:
        return None

    video_key = videos[0]
    local_path = TO_PROCESS_DIR / Path(video_key).name

    if local_path.exists():
        print(f"Video {local_path.name} already exists")
        return local_path

    try:
        response = requests.get(f"{AWS_URL}{video_key}", stream=True)
        if response.status_code == 200:
            with open(local_path, 'wb') as f:
                for chunk in response.iter_content(chunk_size=8192):
                    f.write(chunk)
            delete_video_from_bucket(video_key)
            print(f"Downloaded {video_key}")
            return local_path
        else:
            print(f"Failed to download {video_key}: HTTP {response.status_code}")
    except Exception as e:
        print(f"Download failed: {e}")
    return None

def main_loop():
    """Continuous processing loop"""
    while True:
        try:
            video_path = download_video()
            if video_path:
                print(f"Processing {video_path.name}")
                processed_path = process_video(video_path, model, PROCESSED_DIR)
                if processed_path:
                    print(f"Successfully processed and saved to {processed_path}")
                
                try:
                    video_path.unlink()
                    print(f"Cleaned up {video_path.name}")
                except Exception as e:
                    print(f"Cleanup error: {e}")
            else:
                print("No videos to process, waiting...")
                time.sleep(5)
        except Exception as e:
            print(f"Error in main processing loop: {e}")
            time.sleep(5)

def detect_litter():
    """Start the litter detection system"""
    print("Starting TrashCam litter detection system...")
    
    if not MODEL_PATH.exists():
        print(f"ERROR: Model not found at {MODEL_PATH}")
        return
    
    print(f"TO_PROCESS_DIR: {TO_PROCESS_DIR} (exists: {TO_PROCESS_DIR.exists()})")
    print(f"PROCESSED_DIR: {PROCESSED_DIR} (exists: {PROCESSED_DIR.exists()})")
    
    monitor_thread = threading.Thread(target=main_loop, daemon=True)
    monitor_thread.start()
    print("Processing thread started, monitoring for new videos...")
    
    try:
        while True:
            time.sleep(60)
    except KeyboardInterrupt:
        print("Shutting down TrashCam system...")


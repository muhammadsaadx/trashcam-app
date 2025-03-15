from pathlib import Path
import threading
import time
import shutil
import cv2
import uuid
from ultralytics import YOLO

# Define directories
TO_PROCESS_DIR = Path("D:/TrashCamApp/trashcam-backend/to_process")
PROCESSED_DIR = Path("D:/TrashCamApp/trashcam-backend/processed")
TO_PROCESS_DIR.mkdir(parents=True, exist_ok=True)  # Ensure 'to_process' exists
PROCESSED_DIR.mkdir(parents=True, exist_ok=True)  # Ensure 'processed' exists

# Load YOLO model
MODEL_PATH = Path("D:/TrashCamApp/trashcam-backend/best.pt")
model = YOLO(str(MODEL_PATH))

def process_video(video_path):
    """ Process a video using YOLO and move it to the processed folder. """
    cap = cv2.VideoCapture(str(video_path))
    if not cap.isOpened():
        print(f"Error: Cannot open video {video_path}")
        return None

    output_filename = f"{uuid.uuid4()}.mp4"
    output_path = PROCESSED_DIR / output_filename

    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    fps = cap.get(cv2.CAP_PROP_FPS) or 30
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    out = cv2.VideoWriter(str(output_path), fourcc, int(fps), (width, height))

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        results = model(frame)[0]  
        if hasattr(results, 'boxes') and results.boxes is not None:
            for box in results.boxes:
                x1, y1, x2, y2 = map(int, box.xyxy[0])
                conf = box.conf[0].item()
                cls = int(box.cls[0].item())
                label = f"{model.names.get(cls, 'Unknown')} {conf:.2f}"

                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
                cv2.putText(frame, label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

        out.write(frame)

    cap.release()
    out.release()
    return output_path

def monitor_folder():
    """ Monitors the 'to_process' folder, processes videos, and moves them to 'processed'. """
    while True:
        try:
            files = list(TO_PROCESS_DIR.glob("*.mp4"))  # Check for video files
            if files:
                print("Processing videos...")  
                for video_file in files:
                    print(f"Processing: {video_file.name}")
                    processed_path = process_video(video_file)

                    if processed_path:
                        print(f"Processed: {processed_path.name}")
                        video_file.unlink()  # Delete the original video
            else:
                print("No videos found.")

        except Exception as e:
            print(f"Error monitoring folder: {e}")

        time.sleep(5)  # Wait 5 seconds before checking again

def start_monitoring():
    """ Start the folder monitoring in a background thread. """
    monitor_thread = threading.Thread(target=monitor_folder, daemon=True)
    monitor_thread.start()

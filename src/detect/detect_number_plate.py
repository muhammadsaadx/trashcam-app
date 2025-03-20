import cv2
import numpy as np
import uuid
from pathlib import Path
import json
from utils.sort.sort import Sort
from transformers import TrOCRProcessor, VisionEncoderDecoderModel
from PIL import Image
import os
import logging
import time
import pandas as pd

# Configure logging
logging.getLogger("transformers").setLevel(logging.ERROR)
Image.warnings.simplefilter('ignore')

def calculate_iou(box1, box2):
    """Calculate Intersection over Union (IoU) between two bounding boxes"""
    x1_inter = max(box1[0], box2[0])
    y1_inter = max(box1[1], box2[1])
    x2_inter = min(box1[2], box2[2])
    y2_inter = min(box1[3], box2[3])
    
    intersection_area = max(0, x2_inter - x1_inter) * max(0, y2_inter - y1_inter)
    
    area1 = (box1[2] - box1[0]) * (box1[3] - box1[1])
    area2 = (box2[2] - box2[0]) * (box2[3] - box2[1])
    union_area = area1 + area2 - intersection_area
    
    return intersection_area / union_area if union_area > 0 else 0.0

def save_tracking_data(track_history, ocr_history, frame_positions, json_path):
    tracking_data = []

    for obj_id in track_history:
        ocr_text = ocr_history.get(obj_id, {}).get('text', "Unknown")
        
        for pos in track_history[obj_id]:
            tracking_data.append({
                'track_id': obj_id,
                'frame': pos['frame'],
                'x1': pos['x1'],
                'y1': pos['y1'],
                'x2': pos['x2'],
                'y2': pos['y2'],
                'center_x': pos['center_x'],
                'center_y': pos['center_y'],
                'ocr_text': ocr_text
            })

    if tracking_data:
        json_path.parent.mkdir(parents=True, exist_ok=True)
        with open(json_path, 'w') as json_file:
            json.dump(tracking_data, json_file, indent=4)
        print(f"Tracking data saved to {json_path}")
        return True
    else:
        print("No tracking data to save.")
        return False

def process_number_plate(video_path, model, processed_dir):
    try:
        # Initialize OCR models
        trocr_processor = TrOCRProcessor.from_pretrained(
            'microsoft/trocr-base-printed', 
            cache_dir=os.environ.get("MODEL_CACHE", ".model")
        )
        trocr_model = VisionEncoderDecoderModel.from_pretrained(
            'microsoft/trocr-base-printed',
            cache_dir=os.environ.get("MODEL_CACHE", ".model")
        )
        
        # Initialize video capture
        cap = cv2.VideoCapture(str(video_path))
        if not cap.isOpened():
            print(f"Error: Cannot open video {video_path}")
            return None

        # Initialize SORT tracker
        mot_tracker = Sort(max_age=30, min_hits=3, iou_threshold=0.3)
        track_history = {}
        ocr_history = {}
        frame_count = 0

        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break

            frame_count += 1
            
            # Detect license plates
            results = model.predict(
                frame,
                imgsz=640,
                conf=0.3,
                iou=0.45,
                augment=False,
                half=False,
                device='cpu',
                max_det=100,
                verbose=False
            )[0]

            detections = []
            if results.boxes:
                for box in results.boxes:
                    x1, y1, x2, y2 = map(int, box.xyxy[0].tolist())
                    conf = box.conf.item()
                    detections.append([x1, y1, x2, y2, conf])

            # Update tracker
            sort_input = np.array(detections) if len(detections) > 0 else np.empty((0, 5))
            tracked_objects = mot_tracker.update(sort_input)

            # Process each tracked object
            for obj in tracked_objects:
                x1, y1, x2, y2, obj_id = map(int, obj)
                
                # Find the detection with best IoU
                best_match = (-1, 0.0)
                for idx, (dx1, dy1, dx2, dy2, _) in enumerate(detections):
                    iou = calculate_iou([x1, y1, x2, y2], [dx1, dy1, dx2, dy2])
                    if iou > best_match[1]:
                        best_match = (idx, iou)
                
                # If this is a new object or we should perform OCR
                if obj_id not in track_history or frame_count % 10 == 0:
                    # Extract plate image and perform OCR if we have a good match
                    if best_match[1] > 0.5:
                        dx1, dy1, dx2, dy2, _ = detections[best_match[0]]
                        cropped_img = frame[dy1:dy2, dx1:dx2]
                        
                        if cropped_img.size > 0:
                            # Perform OCR
                            pil_img = Image.fromarray(cv2.cvtColor(cropped_img, cv2.COLOR_BGR2RGB))
                            try:
                                pixel_values = trocr_processor(pil_img, return_tensors="pt").pixel_values
                                generated_ids = trocr_model.generate(pixel_values)
                                ocr_text = trocr_processor.batch_decode(
                                    generated_ids, 
                                    skip_special_tokens=True
                                )[0].strip()
                                
                                if ocr_text:
                                    if obj_id not in ocr_history:
                                        ocr_history[obj_id] = {'text': ocr_text, 'confidence': 1}
                                    else:
                                        # Simple confidence update
                                        ocr_history[obj_id]['confidence'] += 1
                                        ocr_history[obj_id]['text'] = ocr_text
                            except Exception as e:
                                print(f"OCR Error: {e}")

                # Initialize track history for new objects
                if obj_id not in track_history:
                    track_history[obj_id] = []
                
                # Record position
                track_history[obj_id].append({
                    'frame': frame_count,
                    'x1': x1, 
                    'y1': y1, 
                    'x2': x2, 
                    'y2': y2,
                    'center_x': (x1 + x2) // 2,
                    'center_y': (y1 + y2) // 2
                })

            if frame_count % 100 == 0:
                print(f"Processed {frame_count} frames from {video_path.name}")

        cap.release()

        # Save tracking data
        json_path = Path.cwd() / "temp" / "numberplates.json"
        if save_tracking_data(track_history, ocr_history, {}, json_path):
            return json_path
        return None
    
    except Exception as e:
        print(f"Error processing video {video_path}: {str(e)}")
        if 'cap' in locals() and cap.isOpened():
            cap.release()
        return None

# Environment setup function - can be called separately if needed
def setup_environment():
    os.makedirs(".model", exist_ok=True)
    os.environ["MODEL_CACHE"] = ".model"
    os.environ['TOKENIZERS_PARALLELISM'] = 'false'
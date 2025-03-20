import cv2
import numpy as np
import uuid
from pathlib import Path
import json
from utils.sort.sort import Sort
import pandas as pd
from datetime import datetime
import json


def calculate_iou(box1, box2):
    x1_inter = max(box1[0], box2[0])
    y1_inter = max(box1[1], box2[1])
    x2_inter = min(box1[2], box2[2])
    y2_inter = min(box1[3], box2[3])
    
    intersection_area = max(0, x2_inter - x1_inter) * max(0, y2_inter - y1_inter)
    
    area1 = (box1[2] - box1[0]) * (box1[3] - box1[1])
    area2 = (box2[2] - box2[0]) * (box2[3] - box2[1])
    union_area = area1 + area2 - intersection_area
    
    return intersection_area / union_area if union_area > 0 else 0.0

def process_video(video_path, model, processed_dir):
    try:
        cap = cv2.VideoCapture(str(video_path))
        if not cap.isOpened():
            print(f"Error: Cannot open video {video_path}")
            return None

        output_filename = f"{uuid.uuid4()}.mp4"
        output_path = processed_dir / output_filename
        fourcc = cv2.VideoWriter_fourcc(*'mp4v')
        fps = cap.get(cv2.CAP_PROP_FPS) or 30
        width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        out = cv2.VideoWriter(str(output_path), fourcc, int(fps), (width, height))

        mot_tracker = Sort(max_age=5, min_hits=2, iou_threshold=0.3)
        
        # Enhanced history tracking
        track_history = {}  # Track ID -> list of positions per frame
        class_history = {}  # Track ID -> class ID history
        frame_positions = {} # Track ID -> frames where it appeared
        
        frame_count = 0

        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break

            frame_count += 1
            
            results = model.predict(
                frame,
                imgsz=640,
                conf=0.45,
                iou=0.45,
                augment=False,
                half=False,
                device='cpu',
                max_det=100,
                verbose=True
            )[0]

            detections = []
            if results.boxes:
                for box in results.boxes:
                    x1, y1, x2, y2 = map(int, box.xyxy[0].tolist())
                    conf = box.conf.item()
                    cls_id = int(box.cls.item())
                    track_id = int(box.id.item()) if hasattr(box, 'id') and box.id is not None else -1
                    detections.append([x1, y1, x2, y2, conf, cls_id, track_id])

            sort_input = np.array([[x1, y1, x2, y2, conf] for x1, y1, x2, y2, conf, _, _ in detections])
            
            if len(sort_input) > 0:
                tracked_objects = mot_tracker.update(sort_input)
            else:
                tracked_objects = np.empty((0, 5))

            current_tracks = {}
            for obj in tracked_objects:
                x1, y1, x2, y2, obj_id = map(int, obj)
                best_match = (-1, 0.0)
                
                for idx, (dx1, dy1, dx2, dy2, _, cls_id, _) in enumerate(detections):
                    iou = calculate_iou([x1, y1, x2, y2], [dx1, dy1, dx2, dy2])
                    if iou > best_match[1]:
                        best_match = (idx, iou)

                if best_match[1] > 0.5:
                    cls_id = detections[best_match[0]][5]
                    track_id = detections[best_match[0]][6]
                    if track_id == -1:
                        track_id = obj_id
                else:
                    cls_id = class_history.get(obj_id, {}).get('last_class', -1)

                # Initialize history entries if this is a new track
                if obj_id not in track_history:
                    track_history[obj_id] = []
                    class_history[obj_id] = {
                        'classes': {},
                        'last_class': cls_id
                    }
                    frame_positions[obj_id] = []
                
                # Update position history
                track_history[obj_id].append({
                    'frame': frame_count,
                    'x1': x1, 
                    'y1': y1, 
                    'x2': x2, 
                    'y2': y2,
                    'center_x': (x1 + x2) // 2,
                    'center_y': (y1 + y2) // 2
                })
                
                # Update class history
                class_history[obj_id]['last_class'] = cls_id
                class_history[obj_id]['classes'][cls_id] = class_history[obj_id]['classes'].get(cls_id, 0) + 1
                
                # Record frame appearance
                frame_positions[obj_id].append(frame_count)
                
                current_tracks[obj_id] = cls_id

                class_name = model.names.get(cls_id, 'Unknown')
                label = f"{class_name} {obj_id}"
                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
                cv2.putText(frame, label, (x1, y1 - 10), 
                            cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)

            out.write(frame)
            
            if frame_count % 100 == 0:
                print(f"Processed {frame_count} frames from {video_path.name}")

        cap.release()
        out.release()

        print(f"\nProcessed video: {video_path.name}")
        
        # Generate tracking report
        
        # Save tracking data
        save_tracking_data(track_history, class_history, frame_positions, model.names, video_path)
        
        return output_path
    
    except Exception as e:
        print(f"Error processing video {video_path}: {str(e)}")
        if 'cap' in locals() and cap is not None:
            cap.release()
        if 'out' in locals() and out is not None:
            out.release()
        return None




def save_tracking_data(track_history, class_history, frame_positions, class_names, video_path):
    # Create JSON data
    tracking_data = []
    seen_entries = set()  # To track unique (track_id, center_x, center_y)

    for obj_id in track_history:
        # Get most frequent class
        class_counts = class_history[obj_id]['classes']
        most_common_class = max(class_counts.items(), key=lambda x: x[1]) if class_counts else (-1, 0)
        class_id, count = most_common_class
        class_name = class_names.get(class_id, "Unknown")
        
        # Add each position to the dataset if not duplicate
        for pos in track_history[obj_id]:
            entry_key = (obj_id, pos['center_x'], pos['center_y'])
            if entry_key not in seen_entries:
                tracking_data.append({
                    'track_id': obj_id,
                    'frame': pos['frame'],
                    'center_x': pos['center_x'],
                    'center_y': pos['center_y'],
                    'class_name': class_name
                })
                seen_entries.add(entry_key)  # Mark as seen

    if tracking_data:
        json_path = Path.cwd() / "temp" / f"litter.json"
        json_path.parent.mkdir(parents=True, exist_ok=True)  # Ensure folder exists

        with open(json_path, 'w') as json_file:
            json.dump(tracking_data, json_file, indent=4)
        
        print(f"Tracking data saved to {json_path}")

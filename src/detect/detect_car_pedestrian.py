import cv2
import numpy as np
import uuid
from pathlib import Path
import json
from utils.sort.sort import Sort

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


def save_tracking_data(track_history, class_history, frame_positions, class_names, json_path):
    tracking_data = []

    for obj_id in track_history:
        class_counts = class_history[obj_id]['classes']
        most_common_class = max(class_counts.items(), key=lambda x: x[1]) if class_counts else (-1, 0)
        class_id, count = most_common_class
        
        # Handle class names properly whether it's list or dict
        if isinstance(class_names, dict):
            class_name = class_names.get(class_id, "Unknown")
        else:
            class_name = "Unknown"
            if class_id != -1 and 0 <= class_id < len(class_names):
                class_name = class_names[class_id]
        
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
                'class_name': class_name
            })

    # Ensure the directory exists
    json_path.parent.mkdir(parents=True, exist_ok=True)
    
    # Write tracking data (empty list if no data)
    with open(json_path, 'w') as json_file:
        json.dump(tracking_data, json_file, indent=4)
    
    print(f"Tracking data saved to {json_path} ({'contains data' if tracking_data else 'empty file'})")
    return bool(tracking_data)


def process_car_pedestrian(video_path, model, processed_dir):
    try:
        cap = cv2.VideoCapture(str(video_path))
        if not cap.isOpened():
            print(f"Error: Cannot open video {video_path}")
            return None

        mot_tracker = Sort(max_age=5, min_hits=2, iou_threshold=0.3)
        track_history = {}
        class_history = {}
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
                verbose=False
            )[0]

            detections = []
            if results.boxes:
                for box in results.boxes:
                    x1, y1, x2, y2 = map(int, box.xyxy[0].tolist())
                    conf = box.conf.item()
                    cls_id = int(box.cls.item())
                    # Filter only for person (0) and car (2) classes in COCO dataset
                    if cls_id in [0, 2]:  # 0: person, 2: car in COCO
                        detections.append([x1, y1, x2, y2, conf, cls_id])

            sort_input = np.array([[x1, y1, x2, y2, conf] for x1, y1, x2, y2, conf, _ in detections])
            tracked_objects = mot_tracker.update(sort_input) if len(sort_input) > 0 else np.empty((0, 5))

            for obj in tracked_objects:
                x1, y1, x2, y2, obj_id = map(int, obj)
                best_match = (-1, 0.0)
                
                for idx, (dx1, dy1, dx2, dy2, _, cls_id) in enumerate(detections):
                    iou = calculate_iou([x1, y1, x2, y2], [dx1, dy1, dx2, dy2])
                    if iou > best_match[1]:
                        best_match = (idx, iou)

                cls_id = detections[best_match[0]][5] if best_match[1] > 0.5 else -1

                if obj_id not in track_history:
                    track_history[obj_id] = []
                    class_history[obj_id] = {'classes': {}, 'last_class': cls_id}
                
                track_history[obj_id].append({
                    'frame': frame_count,
                    'x1': x1, 
                    'y1': y1, 
                    'x2': x2, 
                    'y2': y2,
                    'center_x': (x1 + x2) // 2,
                    'center_y': (y1 + y2) // 2
                })
                
                class_history[obj_id]['last_class'] = cls_id
                class_history[obj_id]['classes'][cls_id] = class_history[obj_id]['classes'].get(cls_id, 0) + 1

            if frame_count % 100 == 0:
                print(f"Processed {frame_count} frames from {video_path.name} for car/pedestrian detection")

        cap.release()

        json_path = Path.cwd() / "temp" / "car_pedestrian.json"

        if save_tracking_data(track_history, class_history, {}, model.names, json_path):
            return json_path
        return None
    
    except Exception as e:
        print(f"Error processing video {video_path} for car/pedestrian detection: {str(e)}")
        if 'cap' in locals() and cap.isOpened():
            cap.release()
        return None
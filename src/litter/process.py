import cv2
import numpy as np
import uuid
from pathlib import Path
from utils.sort.sort import Sort

def calculate_iou(box1, box2):
    """Calculate Intersection over Union (IoU) between two bounding boxes."""
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
    """Process a video with YOLOv12x object detection and tracking."""
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
                conf=0.1,
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
                    cls_id = class_history.get(obj_id, -1)

                track_history[obj_id] = (x1, y1, x2, y2)
                class_history[obj_id] = cls_id
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
        print("Tracked objects:")
        for track_id, cls_id in class_history.items():
            class_name = model.names.get(cls_id, 'Unknown')
            print(f"  Track ID {track_id}: {class_name}")

        return output_path
    
    except Exception as e:
        print(f"Error processing video {video_path}: {str(e)}")
        if 'cap' in locals() and cap is not None:
            cap.release()
        if 'out' in locals() and out is not None:
            out.release()
        return None
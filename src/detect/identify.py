import json
from collections import defaultdict
from typing import Dict, List, Tuple

def load_json(path: str) -> List[dict]:
    """Load JSON data from file"""
    with open(path, 'r') as f:
        return json.load(f)

def calculate_iou(box1: List[float], box2: List[float]) -> float:
    """Calculate Intersection over Union between two bounding boxes"""
    x1 = max(box1[0], box2[0])
    y1 = max(box1[1], box2[1])
    x2 = min(box1[2], box2[2])
    y2 = min(box1[3], box2[3])
    
    intersection = max(0, x2 - x1) * max(0, y2 - y1)
    area1 = (box1[2]-box1[0])*(box1[3]-box1[1])
    area2 = (box2[2]-box2[0])*(box2[3]-box2[1])
    return intersection / (area1 + area2 - intersection + 1e-6)

def consolidate_entities(face_data: List[dict], plate_data: List[dict], 
                        car_data: List[dict]) -> Tuple[dict, dict, dict]:
    """Consolidate duplicate entities across datasets"""
    # 1. Consolidate faces by identity
    face_groups = defaultdict(set)
    for entry in face_data:
        if "identity" in entry and entry["identity"] != "Unknown":
            face_groups[entry["identity"]].add(entry["track_id"])
    
    # 2. Consolidate plates by OCR text
    plate_groups = defaultdict(set)
    for entry in plate_data:
        if entry.get("ocr_text"):
            plate_groups[entry["ocr_text"]].add(entry["track_id"])
    
    # 3. Consolidate cars with plates
    car_plate_map = defaultdict(set)
    for car in car_data:
        if car["class_name"] == "car":
            # Find associated plates in same frame
            for plate in plate_data:
                if plate["frame"] == car["frame"]:
                    iou = calculate_iou(
                        [car["x1"], car["y1"], car["x2"], car["y2"]],
                        [plate["x1"], plate["y1"], plate["x2"], plate["y2"]]
                    )
                    if iou > 0.3:
                        car_plate_map[car["track_id"]].add(plate["ocr_text"])
    
    # Group cars by shared plates
    car_groups = []
    for car_id, plates in car_plate_map.items():
        merged = False
        for group in car_groups:
            if plates & group["plates"]:
                group["cars"].add(car_id)
                group["plates"].update(plates)
                merged = True
                break
        if not merged:
            car_groups.append({
                "cars": {car_id},
                "plates": plates.copy()
            })

    return face_groups, plate_groups, car_groups

def analyze_car_plates(car_groups: List[dict], plate_groups: dict) -> Dict[str, str]:
    """Match consolidated cars to plates"""
    car_plates = {}
    
    for group in car_groups:
        # Find most common plate in group
        plate_counts = defaultdict(int)
        for plate in group["plates"]:
            if plate in plate_groups:
                plate_counts[plate] += 1
        
        if plate_counts:
            main_plate = max(plate_counts.items(), key=lambda x: x[1])[0]
            # Get canonical car ID
            canonical_car = f"Car{min(group['cars'])}"
            car_plates[canonical_car] = main_plate
    
    return car_plates

def analyze_person_status(face_data: List[dict], face_groups: dict, car_data: List[dict]) -> Dict[str, bool]:
    """Determine if persons are in cars"""
    in_car = defaultdict(bool)
    
    # Build frame map of car positions
    car_frames = defaultdict(list)
    for entry in car_data:
        if entry["class_name"] == "car":
            car_frames[entry["frame"]].append(
                (entry["x1"], entry["y1"], entry["x2"], entry["y2"])
            )

    # Check face positions against cars
    for entry in face_data:
        if "identity" in entry and entry["identity"] in face_groups:
            identity = entry["identity"]
            frame = entry["frame"]
            
            # Skip if already marked as in car
            if in_car.get(identity, False):
                continue
                
            # Check against cars in same frame
            face_center = (
                (entry["x1"] + entry["x2"])/2,
                (entry["y1"] + entry["y2"])/2
            )
            for car_bbox in car_frames.get(frame, []):
                if (car_bbox[0] <= face_center[0] <= car_bbox[2] and
                    car_bbox[1] <= face_center[1] <= car_bbox[3]):
                    in_car[identity] = True
                    break
    
    return dict(in_car)

def identify_associations(litter_path: str, 
                         plate_path: str, 
                         face_path: str, 
                         car_pedestrian_path: str) -> Dict:
    """Main processing function with exact requested output format"""
    # Load data
    litter_data = load_json(litter_path)
    plate_data = load_json(plate_path)
    face_data = load_json(face_path)
    car_data = load_json(car_pedestrian_path)

    # Consolidate entities
    face_groups, plate_groups, car_groups = consolidate_entities(face_data, plate_data, car_data)
    
    # Build final results
    return {
        "cars": analyze_car_plates(car_groups, plate_groups),
        "persons": analyze_person_status(face_data, face_groups, car_data),  # Fixed argument order
        "trash": analyze_trash_movement(litter_data, face_groups, car_data)
    }



def analyze_trash_movement(litter_data: List[dict], 
                          face_groups: dict,
                          car_pedestrian_data: List[dict]) -> Dict[str, str]:
    """Determine which person trash is moving away from"""
    movement = {}
    
    # Get person positions
    person_positions = defaultdict(list)
    for entry in car_pedestrian_data:
        if entry["class_name"] == "person":
            for identity, tracks in face_groups.items():
                if entry["track_id"] in tracks:
                    person_positions[identity].append(entry["center_x"])
                    break
    
    # Get trash trajectories
    trash_tracks = defaultdict(list)
    for entry in litter_data:
        trash_tracks[entry["track_id"]].append(entry["center_x"])
    
    # Analyze movement
    for tid, positions in trash_tracks.items():
        if len(positions) < 2:
            continue
            
        start = positions[0]
        end = positions[-1]
        direction = "right" if end > start + 20 else "left" if end < start - 20 else "stationary"
        
        # Find likely offender
        offender = None
        min_dist = float('inf')
        for identity, positions in person_positions.items():
            avg_x = sum(positions)/len(positions)
            
            if direction == "right" and avg_x < start:
                dist = start - avg_x
            elif direction == "left" and avg_x > start:
                dist = avg_x - start
            else:
                dist = abs(avg_x - start)
                
            if dist < min_dist:
                min_dist = dist
                offender = identity
        
        movement[f"Trash{tid}"] = offender
    
    return movement

def identify_associations(litter_path: str, 
                         plate_path: str, 
                         face_path: str, 
                         car_pedestrian_path: str) -> Dict:
    """Main processing function with exact requested output format"""
    # Load data
    litter_data = load_json(litter_path)
    plate_data = load_json(plate_path)
    face_data = load_json(face_path)
    car_data = load_json(car_pedestrian_path)

    # Consolidate entities
    face_groups, plate_groups, car_groups = consolidate_entities(face_data, plate_data, car_data)
    
    # Build final results
    return {
        "cars": analyze_car_plates(car_groups, plate_groups),
        "persons": analyze_person_status(face_groups, car_data),
        "trash": analyze_trash_movement(litter_data, face_groups, car_data)
    }



import cv2
import torch
import numpy as np
import json
from pathlib import Path
from facenet_pytorch import InceptionResnetV1
from torchvision import transforms
from PIL import Image
from ultralytics import YOLO

# Image transformations
transform = transforms.Compose([
    transforms.Resize((160, 160)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.5, 0.5, 0.5], std=[0.5, 0.5, 0.5])
])

def extract_embedding(image, facenet_model):
    """Extracts FaceNet embedding from an image"""
    image = Image.fromarray(image)
    image = transform(image).unsqueeze(0)
    with torch.no_grad():
        return facenet_model(image).numpy().flatten()

def build_orl_database(facenet_model, dataset_path):
    """Builds face database from ORL dataset"""
    embeddings = {}
    dataset_path = Path(dataset_path)
    
    if not dataset_path.exists():
        print("ORL dataset not found!")
        return embeddings
    
    for person_dir in dataset_path.iterdir():
        if person_dir.is_dir():
            embeddings_list = []
            for img_path in person_dir.glob("*"):
                try:
                    image = cv2.imread(str(img_path), cv2.IMREAD_GRAYSCALE)
                    image = cv2.cvtColor(image, cv2.COLOR_GRAY2RGB)
                    embeddings_list.append(extract_embedding(image, facenet_model))
                except Exception as e:
                    print(f"Error processing {img_path}: {e}")
            if embeddings_list:
                embeddings[person_dir.name] = np.mean(embeddings_list, axis=0)
    
    return embeddings

def process_face(video_path, face_model, facenet_model, orl_database, processed_dir):
    """Processes video for face recognition and returns JSON results"""
    try:
        tracking_data = []
        face_images = {}
        
        # Process video frames
        results = face_model.track(
            source=video_path,
            tracker="bytetrack.yaml",
            persist=True,
            verbose=False
        )

        for frame_id, result in enumerate(results):
            frame = result.orig_img
            
            if result.boxes.id is None:
                continue
                
            for box, track_id in zip(result.boxes.xyxy, result.boxes.id):
                if track_id is None:
                    continue
                
                # Extract face coordinates
                x1, y1, x2, y2 = map(int, box)
                track_id = int(track_id)
                
                # Get face region
                face = frame[y1:y2, x1:x2]
                if face.size == 0:
                    continue

                # Store embeddings
                if track_id not in face_images:
                    face_images[track_id] = []
                face_images[track_id].append(extract_embedding(face, facenet_model))

                # Recognize face
                identity = "Unknown"
                if track_id in face_images:
                    avg_embedding = np.mean(face_images[track_id], axis=0)
                    min_dist = float('inf')
                    for name, db_emb in orl_database.items():
                        dist = np.linalg.norm(avg_embedding - db_emb)
                        if dist < min_dist:
                            min_dist = dist
                            identity = name if dist < 1.0 else "Unknown"

                # Store tracking data
                tracking_data.append({
                    'track_id': track_id,
                    'frame': frame_id + 1,
                    'x1': x1,
                    'y1': y1,
                    'x2': x2,
                    'y2': y2,
                    'identity': identity
                })

        # Save results
        json_path = Path.cwd() / "temp" / "faces.json"
        with open(json_path, 'w') as f:
            json.dump(tracking_data, f, indent=2)
            
        return json_path

    except Exception as e:
        print(f"Face processing error: {e}")
        return None
from fastapi import APIRouter, UploadFile, File, HTTPException
import shutil
import os
from pathlib import Path

router = APIRouter(prefix="/detect", tags=["detect"])

# Create upload directory if it doesn't exist
UPLOAD_DIR = Path("D:/TrashCamApp/trashcam-backend/to_process")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

@router.post("/")
async def detect_video(video: UploadFile = File(...)):
    try:
        # Define the file location
        file_location = UPLOAD_DIR / video.filename
        
        # Save the uploaded file
        with open(file_location, "wb") as buffer:
            shutil.copyfileobj(video.file, buffer)

        return {
            "filename": video.filename,
            "content_type": video.content_type,
            "file_size": os.path.getsize(file_location.as_posix()),
            "status": "success",
            "message": "Video uploaded successfully and ready for processing"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

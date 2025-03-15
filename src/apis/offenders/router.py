from fastapi import APIRouter, Depends, HTTPException
from utils.database import Database
import httpx
import base64

from utils.s3_storage import get_idcard

router = APIRouter(prefix="/offenders", tags=["offenders"])

@router.get("/get_offender_profile")
async def get_offender_profile(offender_id: str):
    
    def format_location(location: str) -> str:
        return ", ".join(location.split(", ")[:4]) if location else ""
    
    query = """SELECT 
                r.reportid, 
                r.locationStr, 
                r.timestamp, 
                r.fineStatus, 
                r.fineIssued
            FROM report_offenders ro
            JOIN reports r ON ro.reportid = r.reportid
            WHERE ro.offenderid = %s;
            """

    try:
        result = await Database.read_from_db(query, (offender_id,))  

        if not result:
            raise HTTPException(status_code=404, detail="No reports found for this offender")

        formatted_result = [
            {
                "report_id": row[0],
                "location": format_location(row[1]),
                "timestamp": row[2].isoformat(), 
                "fine_status": row[3],
                "fine_issued": row[4],
            }
            for row in result
        ]

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

    return {"offender_id": offender_id, "reports": formatted_result}





@router.get("/get_offender_personal_details")
async def get_offender_personal_details(offender_id: str):
    query = "SELECT * FROM offenders WHERE offenderid = %s LIMIT 1;"

    try:
        result = await Database.read_from_db(query, (offender_id,))

        if not result:
            raise HTTPException(status_code=404, detail="No Profile Found")

        offender_id, name, cnic, address = result[0]

        profile = {
            "name": name,
            "cnic": cnic,
            "address": address,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

    return {"profile": profile}



    

@router.get("/get_offender_idcard")
async def get_offender_idcard(cnic: str):
    
    
    # Create the direct S3 URL for the image
    url = f"https://s3trashcambucket.s3.eu-north-1.amazonaws.com/idcards/{cnic}.jpg"
    
    try:
        # Fetch the image using httpx
        async with httpx.AsyncClient() as client:
            response = await client.get(url)
            
            # Check if request was successful
            if response.status_code == 200:
                # Return base64 encoded image data that can be displayed in browser
                image_data = response.content
                encoded_image = base64.b64encode(image_data).decode('utf-8')
                return {"image": f"data:image/jpeg;base64,{encoded_image}"}
            else:
                # If image not found or other error
                return {"error": f"ID card not found. Status code: {response.status_code}"}
    
    except Exception as e:
        # Handle any exceptions during the request
        return {"error": f"Error fetching ID card: {str(e)}"}
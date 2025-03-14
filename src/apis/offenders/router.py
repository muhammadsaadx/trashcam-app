from fastapi import APIRouter, Depends, HTTPException
from utils.database import Database
from datetime import datetime

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

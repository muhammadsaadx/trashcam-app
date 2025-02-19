from io import BytesIO
from typing import List, Dict
from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import JSONResponse, StreamingResponse
from database import Database
from s3_storage import get_idcard

# SERVICE FILE HAS CODE TO GET LOCATION WITH LONGITUTE AND LATITUDE
router = APIRouter(prefix="/reports", tags=["reports"])

@router.get("/get_list_of_reports", response_model=List[Dict])
async def get_list_of_reports(request: Request):
    params = request.query_params
    searchTerm = f"%{params.get('searchTerm', '').strip()}%"
    fineStatus = params.get('fineStatus', '').strip() or "%"
    location = f"%{params.get('location', '').strip()}%" or "%"

    query = """
        SELECT 
            o.name AS name,
            o.cnic AS cnic,
            r.latitude AS location_latitude,
            r.longitude AS location_longitude,
            r.locationStr AS location,
            r.fineissued AS fine,
            r.fineStatus AS status,
            r.reportid AS id
        FROM 
            offenders o
        JOIN 
            report_offenders ro ON o.offenderid = ro.offenderid
        JOIN 
            reports r ON ro.reportid = r.reportid
        WHERE
            (o.name ILIKE %s OR o.cnic ILIKE %s)
            AND r.fineStatus ILIKE %s
            AND r.locationStr ILIKE %s
        ORDER BY 
            r.timestamp DESC;
    """

    try:
        result = await Database.read_from_db(query, (searchTerm, searchTerm, fineStatus, location))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

    return [
        {
            "name": row[0] or "",
            "cnic": row[1] or "",
            "location": row[4] or "",
            "fine": f"Rs {row[5]}" if row[5] else "",
            "status": row[6] or "",
            "reportid": row[7] or "",
        }
        for row in result
    ] if result else [
        {
            "name": "", "cnic": "", "location": "", "fine": "", "status": "", "reportid": ""
        }
    ]



@router.get("/get_report")
async def get_report(report_id: str):
    query = """
                SELECT 
        o.name AS offender_name,
        o.cnic,
        o.address,
        r.locationStr AS location_of_offence,
        TO_CHAR(r.timestamp, 'HH12:MI AM') AS time_of_offence,  -- Format the time as HH12:MI AM/PM
        r.timestamp::DATE AS date_of_offence,
        r.fineIssued AS fine_issued,
        r.infodetails AS info_details, 
        (SELECT COUNT(DISTINCT r2.reportid)
        FROM reports r2
        JOIN report_offenders ro2 ON r2.reportid = ro2.reportid
        WHERE ro2.offenderid = o.offenderid) AS total_offences
        FROM 
        reports r
        JOIN 
        report_offenders ro ON r.reportid = ro.reportid
        JOIN 
        offenders o ON ro.offenderid = o.offenderid
        WHERE 
        r.reportid = %s;
        
    """

    try:
        result = await Database.read_from_db(query, (report_id,))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")


    if result:
        return [
            {
                "offender_name": row[0] or "",
                "cnic": row[1] or "",
                "address": row[2] or "",
                "location_of_offence": row[3] or "",
                "time_of_offence": row[4] or "",
                "date_of_offence": row[5] or "",
                "fine_issued": f"Rs {row[6]}" if row[6] else "",
                "info_details": row[7] or "",
                "total_offences": row[8] or 0
            }
            for row in result
        ]
    else:
        return [{
            "offender_name": "", "cnic": "", "address": "", "location_of_offence": "",
            "time_of_offence": "", "date_of_offence": "", "fine_issued": "", "info_details": "",
            "total_offences": 0
        }]




@router.get("/get_id_card_image")
async def get_id_card_image(cnic: str):
    image_data = get_idcard("trashcamdatabucket", "idcards/", cnic + ".jpg")
    if image_data:
        return StreamingResponse(BytesIO(image_data), media_type="image/jpeg")
    else:
        return {"error": "Image not found"}
    

@router.get("/get_history_data")
async def get_history_data(cnic: str):
    
        query = """
                SELECT 
                r.timestamp::DATE AS offense_date,
                r.fineStatus AS fine_status
                FROM 
                offenders o
                JOIN 
                report_offenders ro ON o.offenderid = ro.offenderid
                JOIN 
                reports r ON ro.reportid = r.reportid
                WHERE 
                o.cnic = %s
                ORDER BY 
                r.timestamp;
        """

        try:
                result = await Database.read_from_db(query, (cnic,))
        except Exception as e:
                raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")



        if result:
                formatted_result = [
                {
                        "offense_date": row[0],  # Date of the offense
                        "fine_status": row[1] or "",  # Fine status (paid, unpaid, etc.)
                }
                for row in result
                ]
        else:
                # Ensure to return an empty list if no data is found
                formatted_result = []


        return formatted_result
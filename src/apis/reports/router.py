from fastapi import APIRouter, HTTPException, Request
from typing import List, Dict
from database import Database
from .service import ReportService
from utils.helpers import Helpers

router = APIRouter(prefix="/reports", tags=["reports"])

@router.get("/get_list_of_reports", response_model=List[Dict])
async def get_list_of_reports(request: Request):
    params = request.query_params
    searchTerm = f"%{params.get('searchTerm', '').strip()}%"
    fineStatus = params.get('fineStatus', '').strip() or "%"
    location = f"%{params.get('location', '').strip()}%" or "%"

    query = """SELECT o.name AS name, o.cnic AS cnic, r.latitude AS location_latitude, r.longitude AS location_longitude, 
            r.locationStr AS location, r.fineissued AS fine,
            r.fineStatus AS status, r.reportid AS id
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

    return ReportService.format_report_list(result)














@router.get("/get_report")
async def get_report(report_id: str):
    query = """
        SELECT 
            o.name AS offender_name,
            o.cnic,
            o.address,
            r.locationStr AS location_of_offence,
            TO_CHAR(r.timestamp, 'HH12:MI AM') AS time_of_offence,
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

    return ReportService.format_report_details(result)

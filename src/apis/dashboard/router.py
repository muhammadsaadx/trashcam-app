from fastapi import APIRouter, HTTPException, Query
from database import Database
from .service import DashboardService


router = APIRouter(prefix="/dashboard", tags=["dashboard"])



@router.get("/get_all_report_dates")
async def get_all_report_dates():
    query = "SELECT timestamp FROM reports;"
    result = await Database.read_from_db(query, ())  

    if not result:
        raise HTTPException(status_code=404, detail="No data found")
    
    formatted_result = await DashboardService.format_report_dates(result)
    return formatted_result



































@router.get("/get_hot_points")
async def get_hot_points():
    query = """
        SELECT longitude, latitude
        FROM reports;
    """
    
    result = await Database.read_from_db(query, ())  
    
    hot_points = [[point[1], point[0]] for point in result]  
    
    return hot_points




@router.get("/get_status_data")
async def get_status_data():
    query = """   
        SELECT 
            COUNT(reportid) AS total_reports_issued,
            SUM(CASE WHEN fineStatus = 'Paid' THEN 1 ELSE 0 END) AS paid_reports,
            SUM(CASE WHEN fineStatus = 'Pending' THEN 1 ELSE 0 END) AS pending_reports,
            SUM(CASE WHEN fineStatus = 'Missed' THEN 1 ELSE 0 END) AS missed_reports
        FROM 
            reports;
    """
    
    result = await Database.read_from_db(query, ())  
    
    return result
    

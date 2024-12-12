from fastapi import APIRouter, HTTPException, Query
from database import Database
from typing import Optional

router = APIRouter(prefix="/dashboard", tags=["dashboard"])

@router.get("/get_litter_data")
async def get_litter_data(year: Optional[int] = Query(None)):
    query = """
        SELECT
            TO_CHAR(timestamp, 'Mon') AS month,
            COUNT(reportid) AS incidents
        FROM reports
        WHERE EXTRACT(YEAR FROM timestamp) = %s
        GROUP BY month
        ORDER BY MIN(EXTRACT(MONTH FROM timestamp));
    """
    
    
    result = await Database.read_from_db(query, (year,))  
    if not result:
        raise HTTPException(status_code=404, detail="No data found")
    
    formatted_result = [
        {"month": row[0], "incidents": row[1]}  
        for row in result
    ]
    
    return formatted_result



@router.get("/get_list_of_years")
async def get_list_of_years():
    query = """
        SELECT DISTINCT EXTRACT(YEAR FROM timestamp) AS year
        FROM reports
        ORDER BY year DESC;
    """
    
    result = await Database.read_from_db(query, ())  

    if not result:
        raise HTTPException(status_code=404, detail="No data found")
    
    return result
    


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
    

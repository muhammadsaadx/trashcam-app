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




@router.get("/get_longitude_latitude")
async def get_longitude_latitude():
    query = "SELECT longitude, latitude FROM reports;"
    result = await Database.read_from_db(query, ())

    if not result:
            raise HTTPException(status_code=404, detail="No data found")
        
    heatmap_data = [[float(point[1]), float(point[0]), 1.0] for point in result]  
    return heatmap_data


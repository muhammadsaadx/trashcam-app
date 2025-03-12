from fastapi import APIRouter, HTTPException, Query
from database import Database
from .service import DashboardService
from utils.helpers import Helpers


router = APIRouter(prefix="/dashboard", tags=["dashboard"])



@router.get("/get_all_report_dates")
async def get_all_report_dates():



#     locations = [
#     (33.6844, 73.0479),
#     (33.6932, 73.0687),
#     (33.7044, 73.0451),
#     (33.6750, 73.0576),
#     (33.6865, 73.0584),
#     (33.6890, 73.0600),
#     (33.6881, 73.0657),
#     (33.6782, 73.0511),
#     (33.6889, 73.0634),
#     (33.6766, 73.0721),
#     (33.7010, 73.0473),
#     (33.6990, 73.0606),
#     (33.6857, 73.0582),
#     (33.6700, 73.0505),
#     (33.6812, 73.0665),
#     (33.6904, 73.0499),
#     (33.7020, 73.0547),
#     (33.6880, 73.0598),
#     (33.6694, 73.0650),
#     (33.6728, 73.0531),
#     (33.6938, 73.0651),
#     (33.6864, 73.0550),
#     (33.6792, 73.0473),
#     (33.6967, 73.0589),
#     (33.6755, 73.0615),
#     (33.6907, 73.0460)
# ]


#     # Call the helper function for each location
#     for lat, lon in locations:
#         address = Helpers.reverse_geocode_geopy(lat, lon)
#         print(address)

    



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


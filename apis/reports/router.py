from typing import Optional
from fastapi import APIRouter, HTTPException, Query, Request
from apis.reports.service import reverse_geocode_geopy
from database import Database

router = APIRouter(prefix="/reports", tags=["reports"])


@router.get("/get_list_of_reports")
async def get_list_of_reports(request: Request):

        params = request.query_params
        searchTerm = params.get('searchTerm', '')
        fineStatus = params.get('fineStatus', '')
        location = params.get('location', '')
        print(fineStatus, searchTerm, location)

        query = """
                SELECT 
                        o.name AS name,
                        o.cnic AS cnic,
                        r.latitude AS location_latitude,
                        r.longitude AS location_longitude,
                        r.locationStr AS Location,
                        r.fineissued AS fine,
                        r.fineStatus as status,
                        r.reportid AS id
                FROM 
                        offenders o
                JOIN 
                        report_offenders ro ON o.offenderid = ro.offenderid
                JOIN 
                        reports r ON ro.reportid = r.reportid
                WHERE
                        (o.name ILIKE %s OR o.cnic ILIKE %s) 
                        AND (r.fineStatus ILIKE %s)
                        AND (r.locationStr ILIKE %s)
                ORDER BY 
                        r.timestamp DESC;

        """
        


        if location == '':
                location = '%'
        else:
                location = '%' + location + '%'

        if fineStatus == '':
                fineStatus = '%'

        if searchTerm == '' :
                searchTerm = '%'
        else:
                searchTerm = '%' + searchTerm + '%'

        result = await Database.read_from_db(query, (searchTerm, searchTerm, fineStatus, location, ))  

        if not result:
                formatted_result = [
                {
                        "name": "",   
                        "cnic": "",                  
                        "location": "",           
                        "fine": "",            
                        "status": "",
                        "reportid": "",
                        }
                ]
        else:
                formatted_result = [
                {
                        "name": row[0],   
                        "cnic": row[1],                  
                        "location": row[4],           
                        "fine": f"Rs {row[5]}",            
                        "status": row[6],
                        "reportid": row[7],
                        }
                        for row in result
                ]
                


        return formatted_result



# SERVICE FILE HAS CODE TO GET LOCATION WITH LONGITUTE AND LATITUDE







        

#         from typing import List, Optional
# from fastapi import APIRouter, HTTPException, Query, Request
# from apis.reports.service import reverse_geocode_geopy
# from database import Database

# router = APIRouter(prefix="/reports", tags=["reports"])

# # Helper function to format database rows
# def format_report_row(row) -> dict:
#     return {
#         "name": row[0],
#         "cnic": row[1],
#         "location": row[4],
#         "fine": f"Rs {row[5]}",
#         "status": row[6],
#         "reportid": row[7],
#     }

# @router.get("/get_list_of_reports", response_model=List[dict])
# async def get_list_of_reports(request: Request):
#     params = request.query_params

#     # Retrieve query parameters with default values
#     searchTerm = params.get("searchTerm", "").strip()
#     fineStatus = params.get("fineStatus", "").strip()
#     location = params.get("location", "").strip()

#     # Debugging prints (consider using logging in production)
#     print(f"fineStatus: {fineStatus}, searchTerm: {searchTerm}, location: {location}")

#     # Construct query with placeholders
#     query = """
#         SELECT 
#             o.name AS name,
#             o.cnic AS cnic,
#             r.latitude AS location_latitude,
#             r.longitude AS location_longitude,
#             r.locationStr AS location,
#             r.fineissued AS fine,
#             r.fineStatus AS status,
#             r.reportid AS id
#         FROM 
#             offenders o
#         JOIN 
#             report_offenders ro ON o.offenderid = ro.offenderid
#         JOIN 
#             reports r ON ro.reportid = r.reportid
#         WHERE
#             (o.name ILIKE %s OR o.cnic ILIKE %s)
#             AND r.fineStatus ILIKE %s
#             AND r.locationStr ILIKE %s
#         ORDER BY 
#             r.timestamp DESC;
#     """

#     # Add wildcards for empty or partial filters
#     searchTerm = f"%{searchTerm}%" if searchTerm else "%"
#     fineStatus = fineStatus or "%"
#     location = f"%{location}%" if location else "%"

#     # Fetch results from the database
#     try:
#         result = await Database.read_from_db(query, (searchTerm, searchTerm, fineStatus, location))
#     except Exception as e:
#         # Handle database errors gracefully
#         raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

#     # Format the results
#     if not result:
#         return [
#             {
#                 "name": "",
#                 "cnic": "",
#                 "location": "",
#                 "fine": "",
#                 "status": "",
#                 "reportid": "",
#             }
#         ]
    
#     return [format_report_row(row) for row in result]

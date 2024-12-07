from fastapi import APIRouter, HTTPException, Query
from apis.reports.service import reverse_geocode_geopy
from database import Database

router = APIRouter(prefix="/reports", tags=["reports"])


@router.get("/get_list_of_reports")
async def get_list_of_reports():
        query = """
                SELECT 
                o.name AS name,
                o.cnic AS cnic,
                r.latitude AS location_latitude,
                r.longitude AS location_longitude,
                r.locationStr AS Location,
                r.fineissued AS fine,
                CASE 
                        WHEN r.finepaid = TRUE THEN 'Paid'
                        WHEN r.finepaid = FALSE THEN 'Pending'
                END AS status
                FROM 
                offenders o
                JOIN 
                report_offenders ro ON o.offenderid = ro.offenderid
                JOIN 
                reports r ON ro.reportid = r.reportid
                ORDER BY 
                r.timestamp DESC;

        """
        
        
        result = await Database.read_from_db(query, ())  

        if not result:
                raise HTTPException(status_code=404, detail="No data found")
        


        formatted_result = [
        {
                "name": row[0],   
                "cnic": row[1],                  
                "location": row[4],           
                "fine": f"Rs {row[5]}",            
                "status": row[6],
                }
                for row in result
        ]
        

        return formatted_result




# SERVICE FILE HAS CODE TO GET LOCATION WITH LONGITUTE AND LATITUDE







        

        
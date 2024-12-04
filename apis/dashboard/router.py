from fastapi import APIRouter, HTTPException
from database import Database

router = APIRouter(prefix="/dashboard", tags=["dashboard"])

# Endpoint to get litter data for chart
@router.get("/litter-data")
async def get_litter_data():
    query = """
        SELECT
            TO_CHAR(timestamp, 'Mon') AS month,
            COUNT(reportid) AS incidents
        FROM reports
        GROUP BY month
        ORDER BY MIN(EXTRACT(MONTH FROM timestamp));
    """
    
    result = await Database.read_from_db(query, ())  # Pass empty tuple as no parameters are required
    
    if not result:
        raise HTTPException(status_code=404, detail="No data found")
    
    # Formatting the result to match the data structure for the frontend
    formatted_result = [
        {"month": row[0], "incidents": row[1]}  # Ensure key is 'month' instead of 'name'
        for row in result
    ]
    
    return formatted_result

from fastapi import APIRouter, Depends, HTTPException
from utils.database import Database

router = APIRouter(prefix="/offenders", tags=["offenders"])

@router.get("/get_offender_profile")
async def get_offender_profile(offender_id: str):


    print("offender_id", offender_id)    
   
    
    return {"offender"}

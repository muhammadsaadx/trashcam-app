# router.py
from fastapi import APIRouter
import apis.auth.model as schemas
from database import Database  

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/login")
async def login(user: schemas.UserLogin):
    # Print the incoming user data
    print(user.email)
    print("PRESSED")


    query = "SELECT * FROM users;"
    params = ()  # No parameters needed for a simple SELECT
    result = await Database.read_from_db(query, params)

    
    

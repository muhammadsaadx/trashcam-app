from fastapi import APIRouter, HTTPException
from apis.auth.model import UserLogin
from database import Database

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login")
async def login(user: UserLogin):

    query = "SELECT * FROM users WHERE email = %s AND passwordHash = %s"
    params = (user.email, user.password)

    result = await Database.read_from_db(query, params)

   

    if not result:
        return {
            "message": "Login Failed",
            "data": result
        }
    else:
        return {
            "message": "Login successful",
            "data": result
        }




   

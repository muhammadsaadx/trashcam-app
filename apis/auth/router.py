from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
import hashlib
from database import Database

router = APIRouter(prefix="/auth", tags=["auth"])

class UserLogin(BaseModel):
    email: EmailStr
    password: str

@router.post("/login")
async def login(user: UserLogin):
    print(user.email)  # This will print the email received

    query = "SELECT * FROM users"
    params = (user.email,)
    result = await Database.read_from_db(query, params)

    

    
    return {"message": "Login successful"}

from fastapi import APIRouter, HTTPException
from apis.auth.model import UserLogin
from apis.auth.sessions import create_access_token
from database import Database

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login")
async def login(user: UserLogin):
    query = "SELECT * FROM users WHERE email = %s AND passwordHash = %s"
    result = await Database.read_from_db(query, (user.email, user.password))
    
    message = "Login successful" if result else "Login failed"
    return {"message": message, "data": result}


    # if user.email == "test@e.com" and user.password == "password":  # Placeholder check
    #     access_token = create_access_token(data={"sub": user.email})
    #     print(access_token)
    #     return {"access_token": access_token, "token_type": "bearer"}


   

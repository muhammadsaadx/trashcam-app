from fastapi import FastAPI
from apis.auth.router import router as auth_router
from dotenv import load_dotenv
import os


app = FastAPI()


app.include_router(auth_router)


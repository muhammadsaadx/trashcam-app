from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from apis.auth.router import router as auth_router
from apis.dashboard.router import router as dashboard_router
from apis.reports.router import router as reports_router
from apis.offenders.router import router as offenders_router
from apis.detect.detect import router as detect_router

# Import folder monitoring from litter.py
from detect.video import start_detection_system

app = FastAPI()

# Include API routers
app.include_router(auth_router)
app.include_router(dashboard_router)
app.include_router(reports_router)
app.include_router(offenders_router)
app.include_router(detect_router)

# CORS middleware settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    start_detection_system()
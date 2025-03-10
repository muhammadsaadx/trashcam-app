from fastapi import FastAPI
from apis.auth.router import router as auth_router
from apis.dashboard.router import router as dashboard_router
from apis.reports.router import router as reports_router


from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()


app.include_router(auth_router)
app.include_router(dashboard_router)
app.include_router(reports_router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
    
)


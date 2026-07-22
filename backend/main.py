from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.api.health import router as health_router
from backend.api.vehicle import router as vehicle_router
from backend.api.traffic import router as traffic_router
from backend.api.road_incident import router as road_incident_router
from backend.api.route import router as route_router
from backend.api.auth import router as auth_router
from backend.api.websocket import router as websocket_router
from backend.api.predictions import router as predictions_router
from backend.api.route_recommendations import router as route_recommendations_router
from backend.config.database import Base, engine
from backend.services.gps_simulator import GPSSimulator


gps_simulator = GPSSimulator()


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    await gps_simulator.start()
    yield
    await gps_simulator.stop()


app = FastAPI(
    title="UrbanFlow AI API",
    description="AI-Powered Fleet Traffic Intelligence Platform",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router, prefix="/health")
app.include_router(vehicle_router)
app.include_router(traffic_router)
app.include_router(road_incident_router)
app.include_router(route_router)
app.include_router(auth_router)
app.include_router(websocket_router)
app.include_router(predictions_router)
app.include_router(route_recommendations_router)


@app.get("/")
async def root():
    return {
        "project": "UrbanFlow AI",
        "status": "running"
    }


@app.get("/health")
async def health_check():
    return {
        "project": "UrbanFlow AI",
        "status": "running"
    }
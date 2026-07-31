from contextlib import asynccontextmanager

from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from backend.api.health import router as health_router
from backend.api.vehicle import router as vehicle_router
from backend.api.traffic import router as traffic_router
from backend.api.road_incident import router as road_incident_router
from backend.api.route import router as route_router
from backend.api.auth import router as auth_router
from backend.api.websocket import router as websocket_router
from backend.api.predictions import router as predictions_router, get_predictions_endpoint
from backend.api.route_recommendations import router as route_recommendations_router, get_route_recommendations_endpoint
from backend.api.fleet_optimization import router as fleet_optimization_router, get_fleet_optimization
from backend.api.emergency_priority import router as emergency_priority_router, get_emergency_priority
from backend.config.database import Base, engine, get_db
from backend.config.settings import settings
from backend.core.deps import get_current_user
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
    docs_url="/docs" if settings.DEBUG else None,
    redoc_url="/redoc" if settings.DEBUG else None,
    openapi_url="/openapi.json" if settings.DEBUG else None,
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
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
app.include_router(fleet_optimization_router)
app.include_router(emergency_priority_router)


@app.get("/")
async def root():
    return {
        "project": "UrbanFlow AI",
        "status": "running"
    }


@app.get("/predictions", dependencies=[Depends(get_current_user)])
def predictions_no_slash(db: Session = Depends(get_db)):
    return get_predictions_endpoint(db)


@app.get("/route-recommendations", dependencies=[Depends(get_current_user)])
def route_recommendations_no_slash(db: Session = Depends(get_db)):
    return get_route_recommendations_endpoint(db)


@app.get("/fleet-optimization", dependencies=[Depends(get_current_user)])
def fleet_optimization_no_slash(db: Session = Depends(get_db)):
    return get_fleet_optimization(db)


@app.get("/emergency-priority", dependencies=[Depends(get_current_user)])
def emergency_priority_no_slash(db: Session = Depends(get_db)):
    return get_emergency_priority(db)



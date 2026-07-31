from fastapi import APIRouter, Depends, HTTPException
import json

from backend.config.database import get_db
from backend.repositories.vehicle_repository import VehicleRepository
from backend.schemas.vehicle import VehicleCreate, VehicleResponse, VehicleUpdate
from backend.ai.route_service import get_route_recommendations, get_fleet_optimization
from backend.api.websocket import manager
from backend.models.vehicle import Vehicle
from backend.ai.emergency_priority import build_emergency_summary
from backend.services.dashboard_context import load_dashboard_context
from backend.websocket.payloads import vehicle_event_payload
from sqlalchemy.orm import Session

router = APIRouter(prefix="/vehicles", tags=["Vehicles"])


async def _broadcast_vehicle_event(db: Session, action: str, vehicle_id: str):
    await manager.broadcast(json.dumps(vehicle_event_payload(action, vehicle_id)))
    await _broadcast_derived_updates(db)


async def _broadcast_derived_updates(db: Session):
    try:
        context = load_dashboard_context(db)
        _, payload = get_route_recommendations(
            context.vehicles, context.routes, context.traffic, context.predictions, context.incidents
        )
        await manager.broadcast_route_recommendation(payload)
        _, _, fleet_payload = get_fleet_optimization(
            context.vehicles, context.routes, context.traffic, context.predictions
        )
        await manager.broadcast(json.dumps(fleet_payload))
        emergency_payload = {
            "event": "emergency_priority_updated",
            **build_emergency_summary(context.vehicles),
        }
        await manager.broadcast(json.dumps(emergency_payload))
    except Exception:
        pass


def _get_vehicle_or_404(db: Session, vehicle_id: str) -> Vehicle:
    vehicle = VehicleRepository(db).get_by_vehicle_id(vehicle_id)
    if vehicle is None:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return vehicle


@router.get("/", response_model=list[VehicleResponse])
def list_vehicles(db: Session = Depends(get_db)):
    return VehicleRepository(db).get_all()


@router.get("/{vehicle_id}", response_model=VehicleResponse)
def get_vehicle(vehicle_id: str, db: Session = Depends(get_db)):
    return _get_vehicle_or_404(db, vehicle_id)


@router.post("/", response_model=VehicleResponse)
async def create_vehicle(vehicle: VehicleCreate, db: Session = Depends(get_db)):
    created = VehicleRepository(db).create(vehicle)
    await _broadcast_vehicle_event(db, "create", created.vehicle_id)
    return created


@router.put("/{vehicle_id}", response_model=VehicleResponse)
async def update_vehicle(vehicle_id: str, vehicle: VehicleUpdate, db: Session = Depends(get_db)):
    db_vehicle = _get_vehicle_or_404(db, vehicle_id)
    for key, value in vehicle.model_dump(exclude_unset=True).items():
        setattr(db_vehicle, key, value)
    db.commit()
    db.refresh(db_vehicle)
    await _broadcast_vehicle_event(db, "update", db_vehicle.vehicle_id)
    return db_vehicle


@router.delete("/{vehicle_id}")
async def delete_vehicle(vehicle_id: str, db: Session = Depends(get_db)):
    db_vehicle = _get_vehicle_or_404(db, vehicle_id)
    db.delete(db_vehicle)
    db.commit()
    await _broadcast_vehicle_event(db, "delete", vehicle_id)
    return {"detail": "Vehicle deleted"}

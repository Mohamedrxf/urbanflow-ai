from fastapi import APIRouter, Depends, HTTPException
import json

from backend.config.database import get_db
from backend.repositories.vehicle_repository import VehicleRepository
from backend.repositories.traffic_repository import TrafficRepository
from backend.repositories.road_incident_repository import RoadIncidentRepository
from backend.schemas.vehicle import VehicleCreate, VehicleResponse, VehicleUpdate
from backend.ai.route_service import get_route_recommendations, get_fleet_optimization
from backend.api.websocket import manager
from backend.models.vehicle import Vehicle
from backend.repositories.route_repository import RouteRepository
from backend.ai.prediction_service import get_predictions
from backend.ai.emergency_priority import EmergencyPriorityEngine
from sqlalchemy.orm import Session

router = APIRouter(prefix="/vehicles", tags=["Vehicles"])


@router.get("/", response_model=list[VehicleResponse])
def list_vehicles(db=Depends(get_db)):
    repository = VehicleRepository(db)
    return repository.get_all()


@router.get("/{vehicle_id}", response_model=VehicleResponse)
def get_vehicle(vehicle_id: str, db=Depends(get_db)):
    repository = VehicleRepository(db)
    vehicle = repository.get_by_vehicle_id(vehicle_id)
    if vehicle is None:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return vehicle


@router.post("/", response_model=VehicleResponse)
async def create_vehicle(vehicle: VehicleCreate, db=Depends(get_db)):
    repository = VehicleRepository(db)
    created = repository.create(vehicle)
    message = json.dumps({
        "event": "vehicle_updated",
        "action": "create",
        "vehicle_id": created.vehicle_id,
        "timestamp": datetime.utcnow().isoformat(),
    })
    await manager.broadcast(message)
    try:
        vehicles = VehicleRepository(db).get_all()
        traffic = TrafficRepository(db).get_all()
        incidents = RoadIncidentRepository(db).get_all()
        predictions = get_predictions(db=db, input_data={})
        routes = RouteRepository(db).get_all()
        _, payload = get_route_recommendations(vehicles, routes, traffic, predictions, incidents)
        await manager.broadcast_route_recommendation(payload)
        _, _, fleet_payload = get_fleet_optimization(vehicles, routes, traffic, predictions)
        await manager.broadcast(json.dumps(fleet_payload))
        emergency_results = []
        for vehicle in vehicles:
            emergency_results.append(EmergencyPriorityEngine().calculate_priority(vehicle))
        emergency_payload = {
            "event": "emergency_priority_updated",
            "emergency_vehicle_count": sum(1 for r in emergency_results if r.get("is_emergency")),
            "vehicles": emergency_results,
        }
        await manager.broadcast(json.dumps(emergency_payload))
    except Exception:
        pass
    return created


@router.put("/{vehicle_id}", response_model=VehicleResponse)
async def update_vehicle(vehicle_id: str, vehicle: VehicleUpdate, db: Session = Depends(get_db)):
    db_vehicle = db.query(Vehicle).filter(Vehicle.vehicle_id == vehicle_id).first()
    if db_vehicle is None:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    update_data = vehicle.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_vehicle, key, value)
    db.commit()
    db.refresh(db_vehicle)
    import json
    from datetime import datetime
    message = json.dumps({
        "event": "vehicle_updated",
        "action": "update",
        "vehicle_id": db_vehicle.vehicle_id,
        "timestamp": datetime.utcnow().isoformat(),
    })
    await manager.broadcast(message)
    try:
        vehicles = VehicleRepository(db).get_all()
        traffic = TrafficRepository(db).get_all()
        incidents = RoadIncidentRepository(db).get_all()
        predictions = get_predictions(db=db, input_data={})
        routes = RouteRepository(db).get_all()
        _, payload = get_route_recommendations(vehicles, routes, traffic, predictions, incidents)
        await manager.broadcast_route_recommendation(payload)
        _, _, fleet_payload = get_fleet_optimization(vehicles, routes, traffic, predictions)
        await manager.broadcast(json.dumps(fleet_payload))
        emergency_results = []
        for vehicle in vehicles:
            emergency_results.append(EmergencyPriorityEngine().calculate_priority(vehicle))
        emergency_payload = {
            "event": "emergency_priority_updated",
            "emergency_vehicle_count": sum(1 for r in emergency_results if r.get("is_emergency")),
            "vehicles": emergency_results,
        }
        await manager.broadcast(json.dumps(emergency_payload))
    except Exception:
        pass
    return db_vehicle


@router.delete("/{vehicle_id}")
async def delete_vehicle(vehicle_id: str, db: Session = Depends(get_db)):
    db_vehicle = db.query(Vehicle).filter(Vehicle.vehicle_id == vehicle_id).first()
    if db_vehicle is None:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    db.delete(db_vehicle)
    db.commit()
    import json
    from datetime import datetime
    message = json.dumps({
        "event": "vehicle_updated",
        "action": "delete",
        "vehicle_id": vehicle_id,
        "timestamp": datetime.utcnow().isoformat(),
    })
    await manager.broadcast(message)
    try:
        vehicles = VehicleRepository(db).get_all()
        traffic = TrafficRepository(db).get_all()
        incidents = RoadIncidentRepository(db).get_all()
        predictions = get_predictions(db=db, input_data={})
        routes = RouteRepository(db).get_all()
        _, payload = get_route_recommendations(vehicles, routes, traffic, predictions, incidents)
        await manager.broadcast_route_recommendation(payload)
        _, _, fleet_payload = get_fleet_optimization(vehicles, routes, traffic, predictions)
        await manager.broadcast(json.dumps(fleet_payload))
        emergency_results = []
        for vehicle in vehicles:
            emergency_results.append(EmergencyPriorityEngine().calculate_priority(vehicle))
        emergency_payload = {
            "event": "emergency_priority_updated",
            "emergency_vehicle_count": sum(1 for r in emergency_results if r.get("is_emergency")),
            "vehicles": emergency_results,
        }
        await manager.broadcast(json.dumps(emergency_payload))
    except Exception:
        pass
    return {"detail": "Vehicle deleted"}

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.config.database import get_db
from backend.repositories.vehicle_repository import VehicleRepository
from backend.ai.emergency_priority import EmergencyPriorityEngine

router = APIRouter(prefix="/emergency-priority", tags=["Emergency Priority"])


@router.get("/")
def get_emergency_priority(db: Session = Depends(get_db)):
    vehicle_repository = VehicleRepository(db)
    vehicles = vehicle_repository.get_all()

    engine = EmergencyPriorityEngine()
    results = []
    for vehicle in vehicles:
        priority = engine.calculate_priority(vehicle)
        if priority.get("is_emergency"):
            results.append({
                "vehicle_id": priority.get("vehicle_id"),
                "is_emergency": priority.get("is_emergency"),
                "priority_level": priority.get("priority_level"),
                "priority_score": priority.get("priority_score"),
                "recommended_action": priority.get("recommended_action"),
            })

    return {
        "emergency_vehicle_count": len(results),
        "vehicles": results,
    }

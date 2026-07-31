from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.config.database import get_db
from backend.repositories.vehicle_repository import VehicleRepository
from backend.ai.emergency_priority import build_emergency_summary

router = APIRouter(prefix="/emergency-priority", tags=["Emergency Priority"])


@router.get("/")
def get_emergency_priority(db: Session = Depends(get_db)):
    return build_emergency_summary(VehicleRepository(db).get_all())

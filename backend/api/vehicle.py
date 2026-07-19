from fastapi import APIRouter, Depends, HTTPException

from backend.config.database import get_db
from backend.repositories.vehicle_repository import VehicleRepository
from backend.schemas.vehicle import VehicleCreate, VehicleResponse

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
def create_vehicle(vehicle: VehicleCreate, db=Depends(get_db)):
    repository = VehicleRepository(db)
    return repository.create(vehicle)

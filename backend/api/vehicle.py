from fastapi import APIRouter, Depends

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
    return repository.get_by_vehicle_id(vehicle_id)


@router.post("/", response_model=VehicleResponse)
def create_vehicle(vehicle: VehicleCreate, db=Depends(get_db)):
    repository = VehicleRepository(db)
    return repository.create(vehicle)

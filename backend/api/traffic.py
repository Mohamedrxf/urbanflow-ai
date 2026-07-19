from fastapi import APIRouter, Depends, HTTPException

from backend.config.database import get_db
from backend.repositories.traffic_repository import TrafficRepository
from backend.schemas.traffic import TrafficCreate, TrafficResponse

router = APIRouter(prefix="/traffic", tags=["Traffic"])


@router.get("/", response_model=list[TrafficResponse])
def list_traffic(db=Depends(get_db)):
    repository = TrafficRepository(db)
    return repository.get_all()


@router.get("/{id}", response_model=TrafficResponse)
def get_traffic(id: int, db=Depends(get_db)):
    repository = TrafficRepository(db)
    traffic = repository.get_by_id(id)
    if traffic is None:
        raise HTTPException(status_code=404, detail="Traffic record not found")
    return traffic


@router.post("/", response_model=TrafficResponse)
def create_traffic(traffic: TrafficCreate, db=Depends(get_db)):
    repository = TrafficRepository(db)
    return repository.create(traffic)

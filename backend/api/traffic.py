from fastapi import APIRouter, Depends

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
    return repository.get_by_id(id)


@router.post("/", response_model=TrafficResponse)
def create_traffic(traffic: TrafficCreate, db=Depends(get_db)):
    repository = TrafficRepository(db)
    return repository.create(traffic)

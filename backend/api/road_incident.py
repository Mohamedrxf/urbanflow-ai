from fastapi import APIRouter, Depends, HTTPException

from backend.config.database import get_db
from backend.repositories.road_incident_repository import RoadIncidentRepository
from backend.schemas.road_incident import RoadIncidentCreate, RoadIncidentResponse
from backend.core.deps import get_current_user

router = APIRouter(prefix="/incidents", tags=["Road Incidents"], dependencies=[Depends(get_current_user)])


@router.get("/", response_model=list[RoadIncidentResponse])
def list_road_incidents(db=Depends(get_db)):
    repository = RoadIncidentRepository(db)
    return repository.get_all()


@router.get("/{id}", response_model=RoadIncidentResponse)
def get_road_incident(id: int, db=Depends(get_db)):
    repository = RoadIncidentRepository(db)
    road_incident = repository.get_by_id(id)
    if road_incident is None:
        raise HTTPException(status_code=404, detail="Road incident not found")
    return road_incident


@router.post("/", response_model=RoadIncidentResponse)
def create_road_incident(road_incident: RoadIncidentCreate, db=Depends(get_db)):
    repository = RoadIncidentRepository(db)
    return repository.create(road_incident)

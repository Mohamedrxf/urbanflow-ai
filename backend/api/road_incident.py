from backend.api.crud_router import create_crud_router
from backend.repositories.road_incident_repository import RoadIncidentRepository
from backend.schemas.road_incident import RoadIncidentCreate, RoadIncidentResponse

router = create_crud_router(
    prefix="/incidents",
    tag="Road Incidents",
    repository_type=RoadIncidentRepository,
    create_schema=RoadIncidentCreate,
    response_schema=RoadIncidentResponse,
    not_found_detail="Road incident not found",
)

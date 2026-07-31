from backend.api.crud_router import create_crud_router
from backend.repositories.traffic_repository import TrafficRepository
from backend.schemas.traffic import TrafficCreate, TrafficResponse

router = create_crud_router(
    prefix="/traffic",
    tag="Traffic",
    repository_type=TrafficRepository,
    create_schema=TrafficCreate,
    response_schema=TrafficResponse,
    not_found_detail="Traffic record not found",
)

from backend.api.crud_router import create_crud_router
from backend.repositories.route_repository import RouteRepository
from backend.schemas.route import RouteCreate, RouteResponse

router = create_crud_router(
    prefix="/routes",
    tag="Routes",
    repository_type=RouteRepository,
    create_schema=RouteCreate,
    response_schema=RouteResponse,
    not_found_detail="Route not found",
    lookup_field="route_id",
    lookup_type=str,
)

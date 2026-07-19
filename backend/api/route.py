from fastapi import APIRouter, Depends

from backend.config.database import get_db
from backend.repositories.route_repository import RouteRepository
from backend.schemas.route import RouteCreate, RouteResponse

router = APIRouter(prefix="/routes", tags=["Routes"])


@router.get("/", response_model=list[RouteResponse])
def list_routes(db=Depends(get_db)):
    repository = RouteRepository(db)
    return repository.get_all()


@router.get("/{route_id}", response_model=RouteResponse)
def get_route(route_id: str, db=Depends(get_db)):
    repository = RouteRepository(db)
    return repository.get_by_route_id(route_id)


@router.post("/", response_model=RouteResponse)
def create_route(route: RouteCreate, db=Depends(get_db)):
    repository = RouteRepository(db)
    return repository.create(route)

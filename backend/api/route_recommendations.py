from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.ai.route_service import get_route_recommendations
from backend.repositories.vehicle_repository import VehicleRepository
from backend.repositories.traffic_repository import TrafficRepository
from backend.repositories.road_incident_repository import RoadIncidentRepository
from backend.ai.prediction_service import get_predictions
from backend.config.database import get_db
from backend.core.deps import get_current_user

router = APIRouter(prefix="/route-recommendations", tags=["Route Recommendations"], dependencies=[Depends(get_current_user)])


@router.get("/")
def get_route_recommendations_endpoint(db: Session = Depends(get_db)):
    vehicle_repository = VehicleRepository(db)
    traffic_repository = TrafficRepository(db)
    incident_repository = RoadIncidentRepository(db)

    vehicles = vehicle_repository.get_all()
    traffic = traffic_repository.get_all()
    incidents = incident_repository.get_all()
    predictions = get_predictions(db=db, input_data={})
    routes = []

    result, _ = get_route_recommendations(
        vehicles=vehicles,
        routes=routes,
        traffic=traffic,
        predictions=predictions,
        incidents=incidents,
    )
    return result

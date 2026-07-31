from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.config.database import get_db
from backend.repositories.vehicle_repository import VehicleRepository
from backend.repositories.route_repository import RouteRepository
from backend.repositories.traffic_repository import TrafficRepository
from backend.repositories.road_incident_repository import RoadIncidentRepository
from backend.ai.fleet_optimizer import FleetOptimizer
from backend.ai.fleet_scorer import FleetScorer
from backend.ai.prediction_service import get_predictions
from backend.core.deps import get_current_user

router = APIRouter(prefix="/fleet-optimization", tags=["Fleet Optimization"], dependencies=[Depends(get_current_user)])


@router.get("/")
def get_fleet_optimization(db: Session = Depends(get_db)):
    vehicle_repository = VehicleRepository(db)
    traffic_repository = TrafficRepository(db)
    route_repository = RouteRepository(db)

    vehicles = vehicle_repository.get_all()
    traffic = traffic_repository.get_all()
    routes = route_repository.get_all()
    predictions = get_predictions(db=db, input_data={})

    fleet_results = FleetOptimizer().optimize_fleet(vehicles, routes, traffic, predictions)
    fleet_score = FleetScorer().calculate_fleet_score(fleet_results)

    return {
        "fleet_score": fleet_score.get("fleet_score"),
        "fleet_efficiency": fleet_score.get("fleet_efficiency"),
        "average_route_score": fleet_score.get("average_route_score"),
        "average_time_saved": fleet_score.get("average_time_saved"),
        "optimized_vehicle_count": fleet_score.get("optimized_vehicle_count"),
        "total_vehicle_count": fleet_score.get("total_vehicle_count"),
        "vehicles": fleet_results,
    }

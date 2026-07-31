"""Loader for the shared set of records every dashboard endpoint needs."""

from dataclasses import dataclass

from sqlalchemy.orm import Session

from backend.ai.prediction_service import get_predictions
from backend.repositories.road_incident_repository import RoadIncidentRepository
from backend.repositories.route_repository import RouteRepository
from backend.repositories.traffic_repository import TrafficRepository
from backend.repositories.vehicle_repository import VehicleRepository


@dataclass
class DashboardContext:
    vehicles: list
    traffic: list
    incidents: list
    routes: list
    predictions: list


def load_dashboard_context(db: Session) -> DashboardContext:
    """Load vehicles, traffic, incidents, routes and predictions for a session."""
    return DashboardContext(
        vehicles=VehicleRepository(db).get_all(),
        traffic=TrafficRepository(db).get_all(),
        incidents=RoadIncidentRepository(db).get_all(),
        routes=RouteRepository(db).get_all(),
        predictions=get_predictions(db=db, input_data={}),
    )

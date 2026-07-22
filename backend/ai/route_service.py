"""Route service for exposing route recommendations."""

from datetime import datetime, timezone

from backend.ai.route_engine import run_route_engine
from backend.api.websocket import manager


def get_route_recommendations(vehicles, routes, traffic, predictions, incidents):
    """Get route recommendations from the route engine.

    Args:
        vehicles: Available vehicles.
        routes: Candidate routes.
        traffic: Current traffic data.
        predictions: Prediction data.
        incidents: Current incidents.

    Returns:
        dict: Route recommendations from the engine.
    """
    return run_route_engine(vehicles, routes, traffic, predictions, incidents)


async def broadcast_route_recommendations(db=None):
    """Recalculate route recommendations and broadcast via WebSocket.

    Args:
        db: Optional SQLAlchemy session. If omitted, a new session is created.
    """
    from backend.config.database import SessionLocal
    from backend.repositories.vehicle_repository import VehicleRepository
    from backend.repositories.traffic_repository import TrafficRepository
    from backend.repositories.road_incident_repository import RoadIncidentRepository
    from backend.repositories.route_repository import RouteRepository
    from backend.ai.prediction_service import get_predictions

    if db is None:
        db = SessionLocal()
        should_close = True
    else:
        should_close = False

    try:
        vehicles = VehicleRepository(db).get_all()
        traffic = TrafficRepository(db).get_all()
        incidents = RoadIncidentRepository(db).get_all()
        predictions = get_predictions(db=db, input_data={})
        routes = RouteRepository(db).get_all()

        result = get_route_recommendations(vehicles, routes, traffic, predictions, incidents)

        best_route = result.get("best_route")
        payload = {
            "event": "route_recommendation_updated",
            "vehicle_id": best_route.vehicle_id if best_route else None,
            "best_route": best_route.route_id if best_route else None,
            "route_score": result.get("route_score"),
            "estimated_time": result.get("estimated_time"),
            "optimized_time": result.get("optimized_time"),
            "time_saved": result.get("time_saved"),
            "recommendation": result.get("recommendation"),
            "timestamp": datetime.now(timezone.utc).isoformat(),
        }
        await manager.broadcast_route_recommendation(payload)
    finally:
        if should_close:
            db.close()

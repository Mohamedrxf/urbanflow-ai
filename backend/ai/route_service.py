"""Route service for exposing route recommendations."""

from backend.ai.route_engine import run_route_engine
from backend.api.websocket import manager
from backend.ai.fleet_optimizer import FleetOptimizer
from backend.ai.fleet_scorer import FleetScorer
from backend.config.database import SessionLocal
from backend.services.dashboard_context import load_dashboard_context


def get_route_recommendations(vehicles, routes, traffic, predictions, incidents):
    """Get route recommendations from the route engine.

    Args:
        vehicles: Available vehicles.
        routes: Candidate routes.
        traffic: Current traffic data.
        predictions: Prediction data.
        incidents: Current incidents.

    Returns:
        tuple: (recommendation result, websocket payload)
    """
    result = run_route_engine(vehicles, routes, traffic, predictions, incidents)
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
    }
    return result, payload


def get_fleet_optimization(vehicles, routes, traffic, predictions):
    """Get fleet optimization results.

    Args:
        vehicles: Available vehicles.
        routes: Candidate routes.
        traffic: Current traffic data.
        predictions: Prediction data.

    Returns:
        tuple: (fleet results, fleet score, websocket payload)
    """
    fleet_results = FleetOptimizer().optimize_fleet(vehicles, routes, traffic, predictions)
    fleet_score = FleetScorer().calculate_fleet_score(fleet_results)
    payload = {"event": "fleet_optimization_updated", **fleet_score}
    return fleet_results, fleet_score, payload


async def broadcast_route_recommendations(db=None):
    """Recalculate route recommendations and broadcast via WebSocket.

    Args:
        db: Optional SQLAlchemy session. If omitted, a new session is created.
    """
    if db is None:
        db = SessionLocal()
        should_close = True
    else:
        should_close = False

    try:
        context = load_dashboard_context(db)
        _, payload = get_route_recommendations(
            context.vehicles, context.routes, context.traffic, context.predictions, context.incidents
        )
        await manager.broadcast_route_recommendation(payload)
    finally:
        if should_close:
            db.close()

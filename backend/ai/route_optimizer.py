"""Route optimizer for finding optimal traffic routes."""

from backend.ai.route_scorer import score_route


def optimize_route(vehicles, routes, traffic, predictions, incidents):
    """Select the best route for a vehicle based on current conditions.

    Args:
        vehicles: Available vehicles.
        routes: Candidate routes.
        traffic: Current traffic data.
        predictions: Prediction data.
        incidents: Current incidents.

    Returns:
        dict: Best route with optimized timing and recommendation.
    """
    if not vehicles or not routes:
        return {
            "route_score": None,
            "best_route": None,
            "estimated_time": 0.0,
            "optimized_time": 0.0,
            "time_saved": 0.0,
            "recommendation": "No routes available",
        }

    best_route = None
    best_score = -1.0

    for route in routes:
        related_traffic = None
        related_prediction = None
        route_incidents = []

        if traffic:
            related_traffic = next((t for t in traffic if t.road_name == route.source or t.road_name == route.destination), None)
        if predictions:
            related_prediction = next((p for p in predictions if p.road_id == route.route_id), None)
        if incidents:
            route_incidents = [i for i in incidents if i.road_name == route.source or i.road_name == route.destination]

        score = score_route(route, related_traffic, related_prediction, route_incidents)

        if score > best_score:
            best_score = score
            best_route = route

    estimated_time = best_route.estimated_time_min if best_route else 0.0
    optimized_time = estimated_time * 0.9 if estimated_time else 0.0
    time_saved = estimated_time - optimized_time

    recommendation = "Route optimized successfully."
    if best_score is not None and best_score < 50:
        recommendation = "Consider rerouting due to high congestion or incidents."

    return {
        "route_score": best_score,
        "best_route": best_route,
        "estimated_time": estimated_time,
        "optimized_time": round(optimized_time, 2),
        "time_saved": round(time_saved, 2),
        "recommendation": recommendation,
    }

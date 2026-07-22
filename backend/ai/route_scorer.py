"""Route scoring module for traffic route optimization."""


def score_route(route, traffic, prediction, incidents):
    """Generate a score for a route based on traffic, prediction, and incidents.

    Args:
        route: Route object containing distance and timing info.
        traffic: Traffic data affecting the route.
        prediction: Prediction data for the route.
        incidents: Incident data affecting the route.

    Returns:
        float: Route score between 0 and 100 where higher is better.
    """
    weight_traffic = 0.25
    weight_prediction = 0.25
    weight_incidents = 0.15
    weight_distance = 0.10
    weight_speed = 0.25

    traffic_penalty = 0.0
    if traffic:
        congestion_level = (traffic.congestion_level or "").lower()
        congestion_map = {"low": 1, "medium": 2, "high": 3}
        traffic_penalty = congestion_map.get(congestion_level, 0)

    prediction_penalty = 0.0
    if prediction:
        predicted_level = (prediction.predicted_congestion or "").lower()
        prediction_map = {"low": 1, "medium": 2, "high": 3}
        prediction_penalty = prediction_map.get(predicted_level, 0)

    incident_penalty = len(incidents) if incidents else 0.0
    distance_penalty = route.distance_km if hasattr(route, "distance_km") and route.distance_km is not None else 0.0

    speed_bonus = 0.0
    if traffic and hasattr(traffic, "average_speed") and traffic.average_speed is not None:
        max_speed = 120.0
        speed_bonus = min(traffic.average_speed, max_speed) / max_speed

    penalty_sum = (
        weight_traffic * traffic_penalty * 8
        + weight_prediction * prediction_penalty * 8
        + weight_incidents * incident_penalty * 6
        + weight_distance * distance_penalty * 1.5
    )

    bonus_sum = weight_speed * speed_bonus * 30

    route_score = 100.0 - penalty_sum + bonus_sum
    route_score = max(0.0, min(100.0, route_score))
    return round(route_score, 2)

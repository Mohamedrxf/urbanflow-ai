"""Route engine for orchestrating route optimization."""

from backend.ai.route_optimizer import optimize_route


def run_route_engine(vehicles, routes, traffic, predictions, incidents):
    """Run the route optimization pipeline.

    Args:
        vehicles: Available vehicles.
        routes: Candidate routes.
        traffic: Current traffic data.
        predictions: Prediction data.
        incidents: Current incidents.

    Returns:
        dict: Optimized route results.
    """
    if not vehicles or not routes:
        return optimize_route([], [], traffic, predictions, incidents)

    result = optimize_route(vehicles, routes, traffic, predictions, incidents)
    return result

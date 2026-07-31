from backend.ai.route_engine import run_route_engine
from backend.ai.route_optimizer import optimize_route


def test_optimize_route_without_vehicles_or_routes(make_vehicle, make_route):
    empty = optimize_route([], [], [], [], [])

    assert empty["best_route"] is None
    assert empty["route_score"] is None
    assert empty["recommendation"] == "No routes available"
    assert optimize_route([make_vehicle()], [], [], [], []) == empty
    assert optimize_route([], [make_route()], [], [], []) == empty


def test_optimize_route_picks_highest_scoring_route(make_vehicle, make_route):
    near = make_route(route_id="R-near", distance_km=1.0)
    far = make_route(route_id="R-far", distance_km=80.0)

    result = optimize_route([make_vehicle()], [far, near], [], [], [])

    assert result["best_route"] is near
    assert result["estimated_time"] == near.estimated_time_min
    assert result["optimized_time"] == round(near.estimated_time_min * 0.9, 2)
    assert result["time_saved"] == round(near.estimated_time_min * 0.1, 2)
    assert result["recommendation"] == "Route optimized successfully."


def test_optimize_route_recommends_rerouting_on_low_score(
    make_vehicle, make_route, make_traffic, make_incident
):
    route = make_route(source="A", destination="B", distance_km=400.0)
    traffic = [make_traffic(road_name="A", congestion_level="high", average_speed=5.0)]
    incidents = [make_incident(road_name="A")] * 3

    result = optimize_route([make_vehicle()], [route], traffic, [], incidents)

    assert result["route_score"] < 50
    assert result["recommendation"] == "Consider rerouting due to high congestion or incidents."


def test_optimize_route_matches_related_prediction(
    make_vehicle, make_route, make_prediction
):
    route = make_route(route_id="R1", distance_km=0.0)
    unrelated = optimize_route([make_vehicle()], [route], [], [make_prediction(road_id="other")], [])
    related = optimize_route(
        [make_vehicle()], [route], [], [make_prediction(road_id="R1", predicted_congestion="high")], []
    )

    assert related["route_score"] < unrelated["route_score"]


def test_optimize_route_zero_estimated_time(make_vehicle, make_route):
    result = optimize_route([make_vehicle()], [make_route(estimated_time_min=0.0)], [], [], [])

    assert result["optimized_time"] == 0.0
    assert result["time_saved"] == 0.0


def test_run_route_engine_delegates_to_optimizer(make_vehicle, make_route):
    vehicles = [make_vehicle()]
    routes = [make_route()]

    assert run_route_engine(vehicles, routes, [], [], []) == optimize_route(
        vehicles, routes, [], [], []
    )
    assert run_route_engine([], routes, [], [], [])["best_route"] is None

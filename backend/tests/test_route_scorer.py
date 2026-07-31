from types import SimpleNamespace

from backend.ai.route_scorer import score_route


def test_score_route_perfect_conditions(make_route):
    route = make_route(distance_km=0.0)

    assert score_route(route, None, None, []) == 100.0


def test_score_route_penalises_congestion(make_route, make_traffic, make_prediction):
    route = make_route(distance_km=0.0)
    low = score_route(route, make_traffic(congestion_level="low", average_speed=0.0), None, [])
    high = score_route(route, make_traffic(congestion_level="high", average_speed=0.0), None, [])

    assert high < low < 100.0


def test_score_route_penalises_prediction_and_incidents(
    make_route, make_prediction, make_incident
):
    route = make_route(distance_km=0.0)
    baseline = score_route(route, None, None, [])
    predicted = score_route(route, None, make_prediction(predicted_congestion="high"), [])
    with_incidents = score_route(route, None, None, [make_incident(), make_incident()])

    assert predicted < baseline
    assert with_incidents < baseline


def test_score_route_speed_bonus_is_capped(make_route, make_traffic):
    route = make_route(distance_km=20.0)
    fast = score_route(route, make_traffic(average_speed=120.0), None, [])
    faster = score_route(route, make_traffic(average_speed=500.0), None, [])

    assert fast == faster


def test_score_route_unknown_levels_are_not_penalised(make_route, make_traffic):
    route = make_route(distance_km=0.0)
    traffic = make_traffic(congestion_level="unknown", average_speed=0.0)

    assert score_route(route, traffic, None, []) == 100.0


def test_score_route_handles_missing_distance(make_traffic):
    route = SimpleNamespace(source="A", destination="B")

    assert score_route(route, make_traffic(average_speed=0.0), None, []) == 98.0


def test_score_route_clamped_to_zero(make_route, make_traffic, make_incident):
    route = make_route(distance_km=1000.0)
    traffic = make_traffic(congestion_level="high", average_speed=0.0)

    assert score_route(route, traffic, None, [make_incident()] * 20) == 0.0

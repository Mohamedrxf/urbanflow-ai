from backend.ai.fleet_optimizer import FleetOptimizer
from backend.ai.fleet_scorer import FleetScorer


def test_optimize_fleet_skips_inactive_vehicles(make_vehicle):
    vehicles = [make_vehicle(vehicle_id="V1"), make_vehicle(vehicle_id="V2", status="idle")]

    result = FleetOptimizer().optimize_fleet(vehicles, [], [], [])

    assert [item["vehicle_id"] for item in result] == ["V1"]


def test_optimize_fleet_defaults_without_routes_or_traffic(make_vehicle):
    result = FleetOptimizer().optimize_fleet([make_vehicle()], [], [], [])

    assert result[0]["assigned_route"] is None
    assert result[0]["congestion_level"] == "Low"
    assert result[0]["estimated_time"] == 0
    assert result[0]["time_saved"] == 0
    assert result[0]["reroute_required"] is False


def test_optimize_fleet_uses_first_route_and_traffic(make_vehicle, make_route, make_traffic):
    route = make_route(estimated_time_min=30.0, optimized_time_min=20.0)
    traffic = make_traffic(congestion_level="high")

    result = FleetOptimizer().optimize_fleet([make_vehicle()], [route], [traffic], [])

    assert result[0]["assigned_route"] == route.route_id
    assert result[0]["congestion_level"] == "high"
    assert result[0]["time_saved"] == 10.0


def test_optimize_fleet_deprioritises_non_emergency_when_critical_present(make_vehicle):
    vehicles = [
        make_vehicle(vehicle_id="V-amb", vehicle_type="ambulance"),
        make_vehicle(vehicle_id="V-truck", vehicle_type="truck"),
    ]

    result = {item["vehicle_id"]: item for item in FleetOptimizer().optimize_fleet(vehicles, [], [], [])}

    assert result["V-amb"]["route_score"] == 1.0
    assert result["V-amb"]["reroute_required"] is False
    assert result["V-truck"]["route_score"] == -9.0
    assert result["V-truck"]["reroute_required"] is True


def test_fleet_score_empty_results():
    assert FleetScorer().calculate_fleet_score([]) == {
        "fleet_score": 0,
        "average_route_score": 0,
        "average_time_saved": 0,
        "optimized_vehicle_count": 0,
        "total_vehicle_count": 0,
        "fleet_efficiency": "LOW",
    }


def test_fleet_score_averages_and_counts():
    results = [
        {"route_score": 90, "time_saved": 10},
        {"route_score": 70, "time_saved": 0},
        {"route_score": 20, "time_saved": 5},
    ]

    score = FleetScorer().calculate_fleet_score(results)

    assert score["average_route_score"] == 60.0
    assert score["average_time_saved"] == 5.0
    assert score["optimized_vehicle_count"] == 2
    assert score["total_vehicle_count"] == 3
    assert score["fleet_efficiency"] == "LOW"


def test_fleet_score_efficiency_thresholds():
    scorer = FleetScorer()

    assert scorer.calculate_fleet_score([{"route_score": 85}])["fleet_efficiency"] == "HIGH"
    assert scorer.calculate_fleet_score([{"route_score": 70}])["fleet_efficiency"] == "MEDIUM"
    assert scorer.calculate_fleet_score([{"route_score": 69.9}])["fleet_efficiency"] == "LOW"


def test_fleet_score_missing_keys_default_to_zero():
    score = FleetScorer().calculate_fleet_score([{}])

    assert score["fleet_score"] == 0
    assert score["average_time_saved"] == 0

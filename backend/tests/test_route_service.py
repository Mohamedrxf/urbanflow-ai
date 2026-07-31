import pytest

from backend.ai import route_service


def test_get_route_recommendations_builds_payload(make_vehicle, make_route):
    route = make_route(route_id="R1", vehicle_id="V1", distance_km=1.0)

    result, payload = route_service.get_route_recommendations(
        [make_vehicle()], [route], [], [], []
    )

    assert payload["event"] == "route_recommendation_updated"
    assert payload["vehicle_id"] == "V1"
    assert payload["best_route"] == "R1"
    assert payload["route_score"] == result["route_score"]
    assert payload["time_saved"] == result["time_saved"]


def test_get_route_recommendations_without_routes():
    result, payload = route_service.get_route_recommendations([], [], [], [], [])

    assert result["best_route"] is None
    assert payload["vehicle_id"] is None
    assert payload["best_route"] is None
    assert payload["recommendation"] == "No routes available"


def test_get_fleet_optimization_payload(make_vehicle, make_route):
    fleet_results, fleet_score, payload = route_service.get_fleet_optimization(
        [make_vehicle()], [make_route()], [], []
    )

    assert len(fleet_results) == 1
    assert payload["event"] == "fleet_optimization_updated"
    assert payload["fleet_score"] == fleet_score["fleet_score"]
    assert payload["total_vehicle_count"] == 1
    assert payload["fleet_efficiency"] == fleet_score["fleet_efficiency"]


@pytest.mark.asyncio
async def test_broadcast_route_recommendations_uses_provided_session(
    monkeypatch, db_session
):
    broadcasts = []

    async def fake_broadcast(payload):
        broadcasts.append(payload)

    monkeypatch.setattr(
        route_service.manager, "broadcast_route_recommendation", fake_broadcast
    )

    await route_service.broadcast_route_recommendations(db=db_session)

    assert broadcasts == [
        {
            "event": "route_recommendation_updated",
            "vehicle_id": None,
            "best_route": None,
            "route_score": None,
            "estimated_time": 0.0,
            "optimized_time": 0.0,
            "time_saved": 0.0,
            "recommendation": "No routes available",
        }
    ]
    # A caller-supplied session must stay open.
    assert db_session.is_active

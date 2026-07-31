import pytest

from backend.ai.emergency_priority import EmergencyPriorityEngine


@pytest.mark.parametrize(
    "vehicle_type,level,score",
    [
        ("ambulance", "CRITICAL", 100),
        ("AMBULANCE", "CRITICAL", 100),
        ("fire_truck", "CRITICAL", 95),
        ("police", "HIGH", 90),
        ("truck", "NORMAL", 50),
        ("", "NORMAL", 50),
    ],
)
def test_calculate_priority_levels(make_vehicle, vehicle_type, level, score):
    result = EmergencyPriorityEngine().calculate_priority(
        make_vehicle(vehicle_type=vehicle_type)
    )

    assert result["priority_level"] == level
    assert result["priority_score"] == score
    assert result["is_emergency"] is (level in ("HIGH", "CRITICAL"))


def test_calculate_priority_recommended_action(make_vehicle):
    result = EmergencyPriorityEngine().calculate_priority(
        make_vehicle(vehicle_id="V9", vehicle_type="police")
    )

    assert result["vehicle_id"] == "V9"
    assert result["recommended_action"] == "Prioritize at intersections"


def test_calculate_priority_with_missing_attributes():
    result = EmergencyPriorityEngine().calculate_priority(object())

    assert result["vehicle_id"] is None
    assert result["priority_level"] == "NORMAL"
    assert result["recommended_action"] == "Standard routing"

from datetime import datetime

from backend.ai.feature_builder import build_features
from backend.models.road_incident import RoadIncident
from backend.models.traffic import Traffic
from backend.models.vehicle import Vehicle


def add_vehicle(db, vehicle_id, status="active", speed=40.0):
    db.add(
        Vehicle(
            vehicle_id=vehicle_id,
            vehicle_type="truck",
            driver_name="d",
            latitude=1.0,
            longitude=2.0,
            speed=speed,
            status=status,
        )
    )
    db.commit()


def add_traffic(db, road_name, congestion_level):
    db.add(
        Traffic(
            road_name=road_name,
            congestion_level=congestion_level,
            average_speed=50.0,
            travel_time=10.0,
            timestamp=datetime.utcnow(),
        )
    )
    db.commit()


def add_incident(db, severity):
    db.add(
        RoadIncident(
            incident_type="crash",
            severity=severity,
            road_name="A",
            latitude=1.0,
            longitude=2.0,
            description="",
            reported_at=datetime.utcnow(),
        )
    )
    db.commit()


def test_build_features_empty_database(db_session):
    features = build_features(db_session)

    assert len(features) == 1
    feature = features[0]
    assert feature["total_vehicles"] == 0
    assert feature["active_vehicles"] == 0
    assert feature["avg_speed"] == 0.0
    assert feature["congestion_level"] is None
    assert feature["traffic_density"] is None
    assert feature["incident_count"] == 0
    assert feature["highest_severity"] is None


def test_build_features_counts_active_vehicles_and_avg_speed(db_session):
    add_vehicle(db_session, "V1", status="active", speed=30.0)
    add_vehicle(db_session, "V2", status="active", speed=50.0)
    add_vehicle(db_session, "V3", status="idle", speed=100.0)

    feature = build_features(db_session)[0]

    assert feature["total_vehicles"] == 3
    assert feature["active_vehicles"] == 2
    assert feature["avg_speed"] == 90.0


def test_build_features_traffic_density_and_severity(db_session):
    add_traffic(db_session, "A", "low")
    add_traffic(db_session, "B", "high")
    add_incident(db_session, "low")
    add_incident(db_session, "high")

    feature = build_features(db_session)[0]

    assert feature["congestion_level"] == "low"
    assert feature["traffic_density"] == 2.0
    assert feature["incident_count"] == 2
    assert feature["highest_severity"] == "high"


def test_build_features_unknown_congestion_level_scores_zero(db_session):
    add_traffic(db_session, "A", "unknown")

    assert build_features(db_session)[0]["traffic_density"] == 0.0


def test_build_features_time_fields_are_consistent(db_session):
    feature = build_features(db_session)[0]

    assert 0 <= feature["current_hour"] <= 23
    assert 0 <= feature["weekday"] <= 6
    assert feature["weekend_flag"] == (1 if feature["weekday"] >= 5 else 0)

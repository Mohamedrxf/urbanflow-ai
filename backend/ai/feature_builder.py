"""Feature builder for traffic prediction."""

from datetime import datetime

from backend.repositories.vehicle_repository import VehicleRepository
from backend.repositories.traffic_repository import TrafficRepository
from backend.repositories.road_incident_repository import RoadIncidentRepository


def build_features(db):
    """Build features from raw traffic/vehicle data.

    Args:
        db: Database session for querying repositories.

    Returns:
        list[dict]: Extracted features suitable for model input.
    """
    vehicle_repository = VehicleRepository(db)
    traffic_repository = TrafficRepository(db)
    incident_repository = RoadIncidentRepository(db)

    vehicles = vehicle_repository.get_all()
    traffic_records = traffic_repository.get_all()
    incidents = incident_repository.get_all()

    total_vehicles = len(vehicles)
    active_vehicles = sum(1 for v in vehicles if v.status == "active")
    avg_speed = (
        sum(v.speed for v in vehicles if v.speed is not None) / active_vehicles
        if active_vehicles > 0
        else 0.0
    )

    congestion_levels = [t.congestion_level for t in traffic_records if t.congestion_level]
    traffic_density = None
    if congestion_levels:
        density_map = {"low": 1, "medium": 2, "high": 3}
        traffic_density = sum(density_map.get(level.lower(), 0) for level in congestion_levels) / len(congestion_levels)

    incident_count = len(incidents)
    severity_order = {"low": 1, "medium": 2, "high": 3}
    highest_severity = None
    if incidents:
        highest_severity = max(
            (i.severity for i in incidents if i.severity),
            key=lambda s: severity_order.get(s.lower(), 0),
            default=None,
        )

    now = datetime.utcnow()
    current_hour = now.hour
    weekday = now.weekday()
    weekend_flag = 1 if weekday >= 5 else 0

    features = [
        {
            "total_vehicles": total_vehicles,
            "active_vehicles": active_vehicles,
            "avg_speed": avg_speed,
            "congestion_level": congestion_levels[0] if congestion_levels else None,
            "traffic_density": traffic_density,
            "incident_count": incident_count,
            "highest_severity": highest_severity,
            "current_hour": current_hour,
            "weekday": weekday,
            "weekend_flag": weekend_flag,
        }
    ]

    return features

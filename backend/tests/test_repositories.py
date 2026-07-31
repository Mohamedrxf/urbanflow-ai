from datetime import datetime

import pytest

from backend.repositories.road_incident_repository import RoadIncidentRepository
from backend.repositories.route_repository import RouteRepository
from backend.repositories.traffic_repository import TrafficRepository
from backend.repositories.user_repository import UserRepository
from backend.repositories.vehicle_repository import VehicleRepository
from backend.schemas.road_incident import RoadIncidentCreate
from backend.schemas.route import RouteCreate
from backend.schemas.traffic import TrafficCreate
from backend.schemas.user import UserCreate
from backend.schemas.vehicle import VehicleCreate


def test_vehicle_repository_create_and_lookup(db_session):
    repository = VehicleRepository(db_session)
    created = repository.create(
        VehicleCreate(
            vehicle_id="V1",
            vehicle_type="truck",
            driver_name="Dana",
            latitude=1.0,
            longitude=2.0,
            speed=42.0,
            status="active",
        )
    )

    assert created.id is not None
    assert repository.get_all() == [created]
    assert repository.get_by_vehicle_id("V1") is created
    assert repository.get_by_vehicle_id("missing") is None


def test_traffic_repository_create_and_lookup(db_session):
    repository = TrafficRepository(db_session)
    created = repository.create(
        TrafficCreate(
            road_name="Main St",
            congestion_level="high",
            average_speed=12.0,
            travel_time=30.0,
            timestamp=datetime.utcnow(),
        )
    )

    assert repository.get_all() == [created]
    assert repository.get_by_id(created.id) is created
    assert repository.get_by_id(created.id + 1) is None


def test_road_incident_repository_create_and_lookup(db_session):
    repository = RoadIncidentRepository(db_session)
    created = repository.create(
        RoadIncidentCreate(
            incident_type="crash",
            severity="high",
            road_name="Main St",
            latitude=1.0,
            longitude=2.0,
            description="two cars",
            reported_at=datetime.utcnow(),
        )
    )

    assert repository.get_all() == [created]
    assert repository.get_by_id(created.id) is created
    assert repository.get_by_id(created.id + 1) is None


def test_route_repository_create_and_lookup(db_session):
    repository = RouteRepository(db_session)
    created = repository.create(
        RouteCreate(
            route_id="R1",
            vehicle_id="V1",
            source="A",
            destination="B",
            distance_km=10.0,
            estimated_time_min=30.0,
            optimized_time_min=25.0,
            status="active",
            created_at=datetime.utcnow(),
        )
    )

    assert repository.get_all() == [created]
    assert repository.get_by_route_id("R1") is created
    assert repository.get_by_route_id("R2") is None


def test_user_repository_create_and_lookup(db_session):
    repository = UserRepository(db_session)
    created = repository.create(
        UserCreate(
            username="alice",
            email="alice@example.com",
            full_name="Alice",
            hashed_password="hashed",
        )
    )

    assert repository.get_by_username("alice") is created
    assert repository.get_by_email("alice@example.com") is created
    assert repository.get_by_username("bob") is None
    assert repository.get_by_email("bob@example.com") is None


def test_repositories_start_empty(db_session):
    assert VehicleRepository(db_session).get_all() == []
    assert TrafficRepository(db_session).get_all() == []
    assert RoadIncidentRepository(db_session).get_all() == []
    assert RouteRepository(db_session).get_all() == []

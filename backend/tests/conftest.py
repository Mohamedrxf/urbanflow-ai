import sys
from pathlib import Path
from types import SimpleNamespace

import pytest

PROJECT_ROOT = Path(__file__).resolve().parents[2]
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))


@pytest.fixture
def make_vehicle():
    def _make(vehicle_id="V1", vehicle_type="truck", status="active", speed=40.0):
        return SimpleNamespace(
            vehicle_id=vehicle_id,
            vehicle_type=vehicle_type,
            status=status,
            speed=speed,
        )

    return _make


@pytest.fixture
def make_route():
    def _make(
        route_id="R1",
        vehicle_id="V1",
        source="A",
        destination="B",
        distance_km=10.0,
        estimated_time_min=30.0,
        optimized_time_min=20.0,
    ):
        return SimpleNamespace(
            route_id=route_id,
            vehicle_id=vehicle_id,
            source=source,
            destination=destination,
            distance_km=distance_km,
            estimated_time_min=estimated_time_min,
            optimized_time_min=optimized_time_min,
        )

    return _make


@pytest.fixture
def make_traffic():
    def _make(road_name="A", congestion_level="low", average_speed=60.0):
        return SimpleNamespace(
            road_name=road_name,
            congestion_level=congestion_level,
            average_speed=average_speed,
        )

    return _make


@pytest.fixture
def make_incident():
    def _make(road_name="A", severity="low"):
        return SimpleNamespace(road_name=road_name, severity=severity)

    return _make


@pytest.fixture
def make_prediction():
    def _make(road_id="R1", predicted_congestion="low"):
        return SimpleNamespace(road_id=road_id, predicted_congestion=predicted_congestion)

    return _make


@pytest.fixture
def db_session():
    from sqlalchemy import create_engine
    from sqlalchemy.orm import sessionmaker

    from backend.models.base import Base
    import backend.models  # noqa: F401  (registers all mappers)
    import backend.models.user  # noqa: F401

    engine = create_engine("sqlite://")
    Base.metadata.create_all(engine)
    session = sessionmaker(bind=engine)()
    try:
        yield session
    finally:
        session.close()
        Base.metadata.drop_all(engine)
        engine.dispose()

import asyncio
import json

import pytest

from backend.models.vehicle import Vehicle
from backend.services import gps_simulator as gps_simulator_module
from backend.services.gps_simulator import GPSSimulator


@pytest.fixture
def simulator_env(monkeypatch, db_session):
    broadcasts = []

    async def fake_broadcast(message):
        broadcasts.append(message)

    monkeypatch.setattr(gps_simulator_module, "SessionLocal", lambda: db_session)
    monkeypatch.setattr(gps_simulator_module.manager, "broadcast", fake_broadcast)
    monkeypatch.setattr(db_session, "close", lambda: None)
    return db_session, broadcasts


def add_vehicle(db, vehicle_id, status="active", latitude=1.0, longitude=2.0):
    vehicle = Vehicle(
        vehicle_id=vehicle_id,
        vehicle_type="truck",
        driver_name="Dana",
        latitude=latitude,
        longitude=longitude,
        speed=40.0,
        status=status,
    )
    db.add(vehicle)
    db.commit()
    return vehicle


@pytest.mark.asyncio
async def test_tick_broadcasts_active_vehicle_positions(simulator_env):
    db, broadcasts = simulator_env
    vehicle = add_vehicle(db, "V1")

    await GPSSimulator()._tick()

    assert len(broadcasts) == 1
    payload = json.loads(broadcasts[0])
    assert payload["event"] == "vehicle_location"
    assert payload["vehicle_id"] == "V1"
    assert payload["latitude"] == vehicle.latitude
    assert payload["latitude"] != 1.0
    assert payload["longitude"] != 2.0


@pytest.mark.asyncio
async def test_tick_skips_inactive_and_location_less_vehicles(simulator_env):
    db, broadcasts = simulator_env
    add_vehicle(db, "V-idle", status="idle")
    add_vehicle(db, "V-nogps", latitude=None, longitude=None)

    await GPSSimulator()._tick()

    assert broadcasts == []


@pytest.mark.asyncio
async def test_start_is_idempotent_and_stop_cancels_task(simulator_env):
    simulator = GPSSimulator(interval=0)

    await simulator.start()
    first_task = simulator._task
    await simulator.start()

    assert simulator._running
    assert simulator._task is first_task

    await simulator.stop()

    assert not simulator._running
    assert first_task.cancelled() or first_task.done()


@pytest.mark.asyncio
async def test_stop_without_start_is_noop():
    simulator = GPSSimulator()

    await simulator.stop()

    assert simulator._task is None


@pytest.mark.asyncio
async def test_run_keeps_going_after_tick_failure(monkeypatch):
    simulator = GPSSimulator(interval=0)
    ticks = []

    async def failing_tick():
        ticks.append(1)
        if len(ticks) >= 3:
            simulator._running = False
        raise RuntimeError("db down")

    monkeypatch.setattr(simulator, "_tick", failing_tick)
    simulator._running = True

    await asyncio.wait_for(simulator._run(), timeout=5)

    assert len(ticks) == 3

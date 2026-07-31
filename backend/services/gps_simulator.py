import asyncio
import json
import logging
import random
from datetime import datetime, timezone

from backend.api.websocket import manager
from backend.config.database import SessionLocal
from backend.models.vehicle import Vehicle

logger = logging.getLogger(__name__)


class GPSSimulator:
    def __init__(self, interval: int = 5):
        self.interval = interval
        self._task = None
        self._running = False

    async def start(self):
        if self._running:
            return
        self._running = True
        self._task = asyncio.create_task(self._run())

    async def stop(self):
        if not self._running:
            return
        self._running = False
        if self._task:
            self._task.cancel()
            try:
                await self._task
            except asyncio.CancelledError:
                pass

    async def _run(self):
        while self._running:
            try:
                await self._tick()
            except asyncio.CancelledError:
                raise
            except Exception:
                logger.exception("GPS simulator tick failed; continuing")
            await asyncio.sleep(self.interval)

    async def _tick(self):
        db = SessionLocal()
        try:
            vehicles = db.query(Vehicle).filter(Vehicle.status == "active").all()
            for vehicle in vehicles:
                if vehicle.latitude is not None and vehicle.longitude is not None:
                    vehicle.latitude += random.uniform(-0.0001, 0.0001)
                    vehicle.longitude += random.uniform(-0.0001, 0.0001)
                    db.commit()
                    payload = {
                        "event": "vehicle_location",
                        "vehicle_id": vehicle.vehicle_id,
                        "latitude": vehicle.latitude,
                        "longitude": vehicle.longitude,
                        "speed": vehicle.speed,
                        "timestamp": datetime.now(timezone.utc).isoformat(),
                    }
                    await manager.broadcast(json.dumps(payload))
        finally:
            db.close()

import asyncio
import random

from backend.config.database import SessionLocal
from backend.models.vehicle import Vehicle


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
                self._tick()
            except asyncio.CancelledError:
                raise
            except Exception:
                pass
            await asyncio.sleep(self.interval)

    def _tick(self):
        db = SessionLocal()
        try:
            vehicles = db.query(Vehicle).filter(Vehicle.status == "active").all()
            for vehicle in vehicles:
                if vehicle.latitude is not None and vehicle.longitude is not None:
                    vehicle.latitude += random.uniform(-0.0001, 0.0001)
                    vehicle.longitude += random.uniform(-0.0001, 0.0001)
            db.commit()
        finally:
            db.close()

from backend.models.vehicle import Vehicle
from backend.repositories.base_repository import BaseRepository


class VehicleRepository(BaseRepository[Vehicle]):
    model = Vehicle

    def get_by_vehicle_id(self, vehicle_id: str) -> Vehicle | None:
        return self.get_by_field("vehicle_id", vehicle_id)

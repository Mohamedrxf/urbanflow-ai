from backend.models.vehicle import Vehicle
from backend.schemas.vehicle import VehicleCreate


class VehicleRepository:
    def __init__(self, db):
        self.db = db

    def get_all(self):
        return self.db.query(Vehicle).all()

    def get_by_vehicle_id(self, vehicle_id: str):
        return self.db.query(Vehicle).filter(Vehicle.vehicle_id == vehicle_id).first()

    def create(self, vehicle: VehicleCreate):
        db_vehicle = Vehicle(**vehicle.model_dump())
        self.db.add(db_vehicle)
        self.db.commit()
        self.db.refresh(db_vehicle)
        return db_vehicle

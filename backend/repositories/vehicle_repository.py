from backend.models.vehicle import Vehicle


class VehicleRepository:
    def __init__(self, db):
        self.db = db

    def get_all(self):
        return self.db.query(Vehicle).all()

    def get_by_vehicle_id(self, vehicle_id: str):
        return self.db.query(Vehicle).filter(Vehicle.vehicle_id == vehicle_id).first()

    def create(self, vehicle):
        self.db.add(vehicle)
        self.db.commit()
        self.db.refresh(vehicle)
        return vehicle

from backend.models.traffic import Traffic
from backend.schemas.traffic import TrafficCreate


class TrafficRepository:
    def __init__(self, db):
        self.db = db

    def get_all(self):
        return self.db.query(Traffic).all()

    def get_by_id(self, traffic_id: int):
        return self.db.query(Traffic).filter(Traffic.id == traffic_id).first()

    def create(self, traffic: TrafficCreate):
        db_traffic = Traffic(**traffic.model_dump())
        self.db.add(db_traffic)
        self.db.commit()
        self.db.refresh(db_traffic)
        return db_traffic

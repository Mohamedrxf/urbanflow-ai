from backend.models.traffic import Traffic


class TrafficRepository:
    def __init__(self, db):
        self.db = db

    def get_all(self):
        return self.db.query(Traffic).all()

    def get_by_id(self, traffic_id: int):
        return self.db.query(Traffic).filter(Traffic.id == traffic_id).first()

    def create(self, traffic):
        self.db.add(traffic)
        self.db.commit()
        self.db.refresh(traffic)
        return traffic

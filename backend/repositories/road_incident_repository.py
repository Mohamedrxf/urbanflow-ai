from backend.models.road_incident import RoadIncident


class RoadIncidentRepository:
    def __init__(self, db):
        self.db = db

    def get_all(self):
        return self.db.query(RoadIncident).all()

    def get_by_id(self, id: int):
        return self.db.query(RoadIncident).filter(RoadIncident.id == id).first()

    def create(self, road_incident):
        self.db.add(road_incident)
        self.db.commit()
        self.db.refresh(road_incident)
        return road_incident

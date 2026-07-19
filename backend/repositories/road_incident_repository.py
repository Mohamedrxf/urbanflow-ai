from backend.models.road_incident import RoadIncident
from backend.schemas.road_incident import RoadIncidentCreate


class RoadIncidentRepository:
    def __init__(self, db):
        self.db = db

    def get_all(self):
        return self.db.query(RoadIncident).all()

    def get_by_id(self, id: int):
        return self.db.query(RoadIncident).filter(RoadIncident.id == id).first()

    def create(self, road_incident: RoadIncidentCreate):
        db_road_incident = RoadIncident(**road_incident.model_dump())
        self.db.add(db_road_incident)
        self.db.commit()
        self.db.refresh(db_road_incident)
        return db_road_incident

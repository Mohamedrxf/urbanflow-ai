from backend.models.road_incident import RoadIncident
from backend.repositories.base_repository import BaseRepository


class RoadIncidentRepository(BaseRepository[RoadIncident]):
    model = RoadIncident

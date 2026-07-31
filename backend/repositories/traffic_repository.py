from backend.models.traffic import Traffic
from backend.repositories.base_repository import BaseRepository


class TrafficRepository(BaseRepository[Traffic]):
    model = Traffic

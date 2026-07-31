from backend.models.route import RouteOptimization
from backend.repositories.base_repository import BaseRepository


class RouteRepository(BaseRepository[RouteOptimization]):
    model = RouteOptimization

    def get_by_route_id(self, route_id: str) -> RouteOptimization | None:
        return self.get_by_field("route_id", route_id)

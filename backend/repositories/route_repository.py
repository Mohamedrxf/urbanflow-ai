from backend.models.route import RouteOptimization
from backend.schemas.route import RouteCreate


class RouteRepository:
    def __init__(self, db):
        self.db = db

    def get_all(self):
        return self.db.query(RouteOptimization).all()

    def get_by_route_id(self, route_id: str):
        return (
            self.db.query(RouteOptimization)
            .filter(RouteOptimization.route_id == route_id)
            .first()
        )

    def create(self, route: RouteCreate):
        db_route = RouteOptimization(**route.model_dump())
        self.db.add(db_route)
        self.db.commit()
        self.db.refresh(db_route)
        return db_route

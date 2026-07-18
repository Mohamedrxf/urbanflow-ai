from sqlalchemy import Column, Integer, String, Float, DateTime

from backend.models.base import Base


class RouteOptimization(Base):
    __tablename__ = "optimized_routes"

    id = Column(Integer, primary_key=True, index=True)
    route_id = Column(String, unique=True, index=True)
    vehicle_id = Column(String)
    source = Column(String)
    destination = Column(String)
    distance_km = Column(Float)
    estimated_time_min = Column(Float)
    optimized_time_min = Column(Float)
    status = Column(String)
    created_at = Column(DateTime)

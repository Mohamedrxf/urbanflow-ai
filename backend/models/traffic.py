from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime

from backend.models.base import Base


class Traffic(Base):
    __tablename__ = "traffic_data"

    id = Column(Integer, primary_key=True, index=True)
    road_name = Column(String)
    congestion_level = Column(String)
    average_speed = Column(Float)
    travel_time = Column(Float)
    timestamp = Column(DateTime, default=datetime.utcnow)

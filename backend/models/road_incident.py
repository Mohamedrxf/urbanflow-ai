from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime

from backend.models.base import Base


class RoadIncident(Base):
    __tablename__ = "road_incidents"

    id = Column(Integer, primary_key=True, index=True)
    incident_type = Column(String)
    severity = Column(String)
    road_name = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    description = Column(String)
    reported_at = Column(DateTime, default=datetime.utcnow)

from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.orm import relationship

from backend.models.base import Base


class Vehicle(Base):
    __tablename__ = "vehicles"

    id = Column(Integer, primary_key=True, index=True)
    vehicle_id = Column(String, unique=True, index=True)
    vehicle_type = Column(String)
    driver_name = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    speed = Column(Float)
    status = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

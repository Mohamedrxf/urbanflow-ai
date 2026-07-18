from pydantic import BaseModel, ConfigDict
from datetime import datetime


class TrafficBase(BaseModel):
    road_name: str
    congestion_level: str
    average_speed: float
    travel_time: float
    timestamp: datetime


class TrafficCreate(TrafficBase):
    pass


class TrafficResponse(TrafficBase):
    id: int

    model_config = ConfigDict(from_attributes=True)

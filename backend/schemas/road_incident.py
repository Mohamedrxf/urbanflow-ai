from pydantic import BaseModel, ConfigDict
from datetime import datetime


class RoadIncidentBase(BaseModel):
    incident_type: str
    severity: str
    road_name: str
    latitude: float
    longitude: float
    description: str
    reported_at: datetime


class RoadIncidentCreate(RoadIncidentBase):
    pass


class RoadIncidentResponse(RoadIncidentBase):
    id: int

    model_config = ConfigDict(from_attributes=True)

from pydantic import BaseModel, ConfigDict
from datetime import datetime


class RouteBase(BaseModel):
    route_id: str
    vehicle_id: str
    source: str
    destination: str
    distance_km: float
    estimated_time_min: float
    optimized_time_min: float
    status: str
    created_at: datetime


class RouteCreate(RouteBase):
    pass


class RouteResponse(RouteBase):
    id: int

    model_config = ConfigDict(from_attributes=True)

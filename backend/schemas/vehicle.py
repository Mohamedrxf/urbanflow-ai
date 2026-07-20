from pydantic import BaseModel, ConfigDict
from datetime import datetime


class VehicleBase(BaseModel):
    vehicle_id: str
    vehicle_type: str
    driver_name: str
    latitude: float
    longitude: float
    speed: float
    status: str
    created_at: datetime


class VehicleCreate(VehicleBase):
    pass


class VehicleUpdate(BaseModel):
    vehicle_type: str | None = None
    driver_name: str | None = None
    latitude: float | None = None
    longitude: float | None = None
    speed: float | None = None
    status: str | None = None


class VehicleResponse(VehicleBase):
    id: int

    model_config = ConfigDict(from_attributes=True)

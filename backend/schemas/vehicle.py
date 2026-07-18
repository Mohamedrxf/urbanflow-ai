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


class VehicleResponse(VehicleBase):
    id: int

    model_config = ConfigDict(from_attributes=True)

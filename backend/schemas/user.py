from pydantic import BaseModel, ConfigDict, EmailStr
from datetime import datetime


class UserBase(BaseModel):
    username: str
    email: EmailStr
    full_name: str
    role: str = "fleet_manager"
    is_active: bool = True


class UserCreate(UserBase):
    hashed_password: str


class UserLogin(BaseModel):
    username: str
    password: str


class UserResponse(UserBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

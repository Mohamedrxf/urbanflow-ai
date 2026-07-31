from pydantic import BaseModel, ConfigDict, EmailStr, Field
from datetime import datetime


class UserBase(BaseModel):
    username: str = Field(min_length=3, max_length=50, pattern=r"^[A-Za-z0-9_.-]+$")
    email: EmailStr
    full_name: str = Field(min_length=1, max_length=120)
    role: str = "fleet_manager"
    is_active: bool = True


class UserCreate(BaseModel):
    """Registration payload.

    ``role`` and ``is_active`` are deliberately not accepted from clients so a
    self-registering user cannot escalate their own privileges.
    """

    username: str = Field(min_length=3, max_length=50, pattern=r"^[A-Za-z0-9_.-]+$")
    email: EmailStr
    full_name: str = Field(min_length=1, max_length=120)
    hashed_password: str = Field(min_length=8, max_length=128)


class UserLogin(BaseModel):
    username: str = Field(min_length=1, max_length=50)
    password: str = Field(min_length=1, max_length=128)


class UserResponse(UserBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from backend.config.database import get_db
from backend.core.deps import get_current_user as get_authenticated_user
from backend.models.user import User
from backend.services.auth_service import AuthService
from backend.schemas.user import UserCreate, UserLogin, UserResponse

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    auth_service = AuthService(db)
    existing_user = auth_service.user_repository.get_by_email(user.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    existing_user = auth_service.user_repository.get_by_username(user.username)
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already taken")
    return auth_service.register_user(user)


@router.post("/login")
def login_user(login: UserLogin, db: Session = Depends(get_db)):
    auth_service = AuthService(db)
    token = auth_service.authenticate_user(login)
    if token is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
        )
    return token


@router.get("/me", response_model=UserResponse)
def get_current_user(user: User = Depends(get_authenticated_user)):
    return user

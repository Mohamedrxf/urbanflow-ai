from fastapi import Depends, HTTPException, Security, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from backend.config.database import get_db
from backend.core.jwt import verify_access_token
from backend.models.user import User
from backend.repositories.user_repository import UserRepository

security = HTTPBearer()

CREDENTIALS_EXCEPTION = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Invalid authentication credentials",
    headers={"WWW-Authenticate": "Bearer"},
)


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Security(security),
    db: Session = Depends(get_db),
) -> User:
    payload = verify_access_token(credentials.credentials)
    if payload is None:
        raise CREDENTIALS_EXCEPTION
    username = payload.get("sub")
    if not username:
        raise CREDENTIALS_EXCEPTION
    user = UserRepository(db).get_by_username(username)
    if user is None or not user.is_active:
        raise CREDENTIALS_EXCEPTION
    return user


def authenticate_websocket_token(token: str | None, db: Session) -> User | None:
    if not token:
        return None
    payload = verify_access_token(token)
    if payload is None:
        return None
    username = payload.get("sub")
    if not username:
        return None
    user = UserRepository(db).get_by_username(username)
    if user is None or not user.is_active:
        return None
    return user

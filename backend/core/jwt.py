from datetime import datetime, timedelta, timezone

from jose import JWTError, jwt

from backend.config.settings import settings


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.jwt_secret_key, algorithm=settings.ALGORITHM)


def verify_access_token(token: str):
    try:
        return jwt.decode(token, settings.jwt_secret_key, algorithms=[settings.ALGORITHM])
    except JWTError:
        return None

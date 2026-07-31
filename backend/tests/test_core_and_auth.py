from datetime import timedelta

import pytest
from jose import jwt

from backend.core import jwt as jwt_module
from backend.core.jwt import create_access_token, verify_access_token
from backend.core.security import hash_password, verify_password
from backend.schemas.user import UserCreate, UserLogin
from backend.services.auth_service import AuthService


def test_create_and_verify_access_token():
    token = create_access_token({"sub": "alice"})
    payload = verify_access_token(token)

    assert payload["sub"] == "alice"
    assert "exp" in payload


def test_verify_access_token_rejects_invalid_token():
    assert verify_access_token("not-a-token") is None


def test_verify_access_token_rejects_wrong_signature():
    token = jwt.encode({"sub": "alice"}, "other-secret", algorithm=jwt_module.ALGORITHM)

    assert verify_access_token(token) is None


def test_verify_access_token_rejects_expired_token(monkeypatch):
    monkeypatch.setattr(jwt_module, "ACCESS_TOKEN_EXPIRE_MINUTES", -1)

    assert verify_access_token(create_access_token({"sub": "alice"})) is None


def test_create_access_token_does_not_mutate_input():
    data = {"sub": "alice"}
    create_access_token(data)

    assert data == {"sub": "alice"}


def test_hash_password_round_trip():
    hashed = hash_password("s3cret")

    assert hashed != "s3cret"
    assert verify_password("s3cret", hashed)
    assert not verify_password("wrong", hashed)


def test_hash_password_is_salted():
    assert hash_password("s3cret") != hash_password("s3cret")


@pytest.fixture
def auth_service(db_session):
    return AuthService(db_session)


def new_user(username="alice", password="s3cret"):
    return UserCreate(
        username=username,
        email=f"{username}@example.com",
        full_name="Alice",
        hashed_password=password,
    )


def test_register_user_stores_hashed_password(auth_service):
    user = auth_service.register_user(new_user())

    assert user.id is not None
    assert user.hashed_password != "s3cret"
    assert verify_password("s3cret", user.hashed_password)


def test_authenticate_user_returns_token(auth_service):
    auth_service.register_user(new_user())

    result = auth_service.authenticate_user(UserLogin(username="alice", password="s3cret"))

    assert result["token_type"] == "bearer"
    assert verify_access_token(result["access_token"])["sub"] == "alice"


def test_authenticate_user_with_wrong_password(auth_service):
    auth_service.register_user(new_user())

    assert auth_service.authenticate_user(UserLogin(username="alice", password="nope")) is None


def test_authenticate_unknown_user(auth_service):
    assert auth_service.authenticate_user(UserLogin(username="ghost", password="x")) is None

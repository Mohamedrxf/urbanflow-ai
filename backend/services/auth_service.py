from backend.repositories.user_repository import UserRepository
from backend.core.security import hash_password, verify_password
from backend.core.jwt import create_access_token
from backend.schemas.user import UserCreate, UserLogin


class AuthService:
    def __init__(self, db):
        self.user_repository = UserRepository(db)

    def register_user(self, user: UserCreate):
        user.hashed_password = hash_password(user.hashed_password)
        return self.user_repository.create(user)

    def authenticate_user(self, login: UserLogin):
        user = self.user_repository.get_by_username(login.username)
        if not user or not verify_password(login.password, user.hashed_password):
            return None
        token_data = {"sub": user.username}
        access_token = create_access_token(token_data)
        return {"access_token": access_token, "token_type": "bearer"}

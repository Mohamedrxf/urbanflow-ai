import secrets
from pathlib import Path

from pydantic_settings import BaseSettings
from pydantic import field_validator

PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent

INSECURE_SECRET_KEYS = {
    "your-secret-key",
    "your-secret-key-here-change-in-production",
    "changeme",
    "secret",
}


class Settings(BaseSettings):
    APP_NAME: str = "UrbanFlow AI"
    APP_VERSION: str = "0.1.0"
    DEBUG: bool = False
    DATABASE_URL: str = f"sqlite:///{PROJECT_ROOT / 'urbanflow.db'}"

    SECRET_KEY: str | None = None
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    CORS_ORIGINS: list[str] = ["http://localhost:5173", "http://localhost:3000"]

    model_config = {
        "env_file": ".env",
        "env_file_encoding": "utf-8",
    }

    @field_validator("DEBUG", mode="before")
    @classmethod
    def parse_debug(cls, value):
        if isinstance(value, bool):
            return value
        if isinstance(value, str):
            return value.strip().lower() not in ("false", "0", "no", "off", "release")
        return bool(value)

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def parse_cors_origins(cls, value):
        if isinstance(value, str) and not value.strip().startswith("["):
            return [origin.strip() for origin in value.split(",") if origin.strip()]
        return value

    @property
    def jwt_secret_key(self) -> str:
        """Signing key for JWTs.

        In production a strong ``SECRET_KEY`` must be configured; in debug mode a
        random per-process key is generated so tokens never fall back to a
        publicly known default.
        """
        key = self.SECRET_KEY
        if key and key not in INSECURE_SECRET_KEYS and len(key) >= 32:
            return key
        if self.DEBUG:
            return _EPHEMERAL_SECRET_KEY
        raise RuntimeError(
            "SECRET_KEY is not configured or is insecure. Set SECRET_KEY to a random "
            "value of at least 32 characters (e.g. `python -c \"import secrets; "
            "print(secrets.token_urlsafe(48))\"`)."
        )


_EPHEMERAL_SECRET_KEY = secrets.token_urlsafe(48)

settings = Settings()

from pydantic_settings import BaseSettings
from pydantic import field_validator


class Settings(BaseSettings):
    APP_NAME: str = "UrbanFlow AI"
    APP_VERSION: str = "0.1.0"
    DEBUG: bool = False
    DATABASE_URL: str = "sqlite:///./urbanflow.db"

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


settings = Settings()

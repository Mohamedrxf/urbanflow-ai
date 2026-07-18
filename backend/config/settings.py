from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "UrbanFlow AI"
    APP_VERSION: str = "0.1.0"
    DEBUG: bool = False
    DATABASE_URL: str = "sqlite:///./urbanflow.db"

    model_config = {
        "env_file": ".env",
        "env_file_encoding": "utf-8",
    }


settings = Settings()

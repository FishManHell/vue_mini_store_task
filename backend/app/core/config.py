from functools import lru_cache

from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )

    app_name: str = "Vue Mini Store API"
    debug: bool = False
    log_level: str = "INFO"

    cors_origins: list[str] = [
        "http://localhost:5173",
        "http://localhost:4173",
    ]

    redis_url: str = "redis://localhost:6379/0"
    cart_ttl_seconds: int = 60 * 60 * 24 * 7

    @field_validator("cors_origins", mode="before")
    @classmethod
    def _split_cors(cls, v: str | list[str]) -> list[str]:
        if isinstance(v, str):
            return [o.strip() for o in v.split(",") if o.strip()]
        return v


@lru_cache
def get_settings() -> Settings:
    return Settings()

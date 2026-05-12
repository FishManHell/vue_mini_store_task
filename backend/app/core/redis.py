from redis.asyncio import Redis, from_url

from app.core.config import get_settings


def create_redis_client() -> Redis:
    settings = get_settings()
    return from_url(
        settings.redis_url,
        encoding="utf-8",
        decode_responses=True,
    )

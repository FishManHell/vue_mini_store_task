import json

from redis.asyncio import Redis

CART_KEY_PREFIX = "cart:"


class CartRepository:
    """Stores cart as JSON: [{"productId": str, "quantity": int}, ...]
    under key cart:{session_id}, with sliding TTL refreshed on every write.
    """

    def __init__(self, redis: Redis, ttl_seconds: int) -> None:
        self._redis = redis
        self._ttl = ttl_seconds

    @staticmethod
    def _key(session_id: str) -> str:
        return f"{CART_KEY_PREFIX}{session_id}"

    async def get(self, session_id: str) -> list[dict]:
        raw = await self._redis.get(self._key(session_id))
        if not raw:
            return []
        return json.loads(raw)

    async def set(self, session_id: str, items: list[dict]) -> None:
        if not items:
            await self._redis.delete(self._key(session_id))
            return
        await self._redis.set(
            self._key(session_id),
            json.dumps(items),
            ex=self._ttl,
        )

    async def delete(self, session_id: str) -> None:
        await self._redis.delete(self._key(session_id))

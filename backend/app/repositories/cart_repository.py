from pydantic import TypeAdapter
from redis.asyncio import Redis

from app.models.common import CamelModel

CART_KEY_PREFIX = "cart:"


class StoredCartItem(CamelModel):
    """Persisted shape of a cart line in Redis (one entry per product).

    camelCase on the wire keeps storage shape == API shape, so existing
    Redis values stay readable without migration.
    """

    product_id: str
    quantity: int


_ADAPTER = TypeAdapter(list[StoredCartItem])


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

    async def get(self, session_id: str) -> list[StoredCartItem]:
        raw = await self._redis.get(self._key(session_id))
        if not raw:
            return []
        return _ADAPTER.validate_json(raw)

    async def set(self, session_id: str, items: list[StoredCartItem]) -> None:
        if not items:
            await self._redis.delete(self._key(session_id))
            return
        await self._redis.set(
            self._key(session_id),
            _ADAPTER.dump_json(items, by_alias=True).decode("utf-8"),
            ex=self._ttl,
        )

    async def delete(self, session_id: str) -> None:
        await self._redis.delete(self._key(session_id))

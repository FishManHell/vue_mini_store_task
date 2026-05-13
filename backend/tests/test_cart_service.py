from decimal import Decimal

import pytest

from app.models import MAX_QUANTITY_PER_ITEM, Category, ProductDetails
from app.repositories import ProductRepository, StoredCartItem
from app.services import CartService, ProductNotFoundError, ProductService


class FakeCartRepository:
    """In-memory stand-in for the Redis-backed CartRepository."""

    def __init__(self) -> None:
        self._store: dict[str, list[StoredCartItem]] = {}

    async def get(self, session_id: str) -> list[StoredCartItem]:
        return [item.model_copy() for item in self._store.get(session_id, [])]

    async def set(self, session_id: str, items: list[StoredCartItem]) -> None:
        if not items:
            self._store.pop(session_id, None)
            return
        self._store[session_id] = [item.model_copy() for item in items]

    async def delete(self, session_id: str) -> None:
        self._store.pop(session_id, None)


def _product(id: str, name: str, price: str) -> ProductDetails:
    return ProductDetails(
        id=id,
        name=name,
        price=Decimal(price),
        thumbnail_url="https://example.test/x.png",
        short_description="short",
        long_description="long",
        category=Category.EBOOK,
        reviews=[],
    )


@pytest.fixture
def cart_service() -> CartService:
    products = [_product("p1", "Book One", "19.99"), _product("p2", "Book Two", "5.00")]
    product_service = ProductService(ProductRepository(products))
    return CartService(FakeCartRepository(), product_service)  # type: ignore[arg-type]


async def test_add_item_merges_quantity(cart_service: CartService) -> None:
    await cart_service.add_item("sess", "p1", 2)
    response = await cart_service.add_item("sess", "p1", 3)

    assert len(response.items) == 1
    assert response.items[0].quantity == 5
    assert response.items[0].line_total == Decimal("99.95")
    assert response.total_count == 5
    assert response.total_price == Decimal("99.95")


async def test_add_item_clamps_at_max(cart_service: CartService) -> None:
    await cart_service.add_item("sess", "p1", MAX_QUANTITY_PER_ITEM - 1)
    response = await cart_service.add_item("sess", "p1", 50)

    assert response.items[0].quantity == MAX_QUANTITY_PER_ITEM


async def test_add_unknown_product_raises(cart_service: CartService) -> None:
    with pytest.raises(ProductNotFoundError) as exc:
        await cart_service.add_item("sess", "missing", 1)
    assert exc.value.product_id == "missing"


async def test_remove_item_returns_remaining_cart(cart_service: CartService) -> None:
    await cart_service.add_item("sess", "p1", 1)
    await cart_service.add_item("sess", "p2", 2)
    response = await cart_service.remove_item("sess", "p1")

    assert [item.id for item in response.items] == ["p2"]
    assert response.total_count == 2
    assert response.total_price == Decimal("10.00")

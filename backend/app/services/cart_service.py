from decimal import Decimal

from app.models import CartItem, CartResponse, MAX_QUANTITY_PER_ITEM
from app.repositories import CartRepository
from app.services.product_service import ProductService


class ProductNotFoundError(Exception):
    """Raised when a product id does not exist in the catalog."""

    def __init__(self, product_id: str) -> None:
        super().__init__(f"Product {product_id} not found")
        self.product_id = product_id


class CartItemNotFoundError(Exception):
    """Raised when updating/removing a product that is not in the cart."""

    def __init__(self, product_id: str) -> None:
        super().__init__(f"Cart item {product_id} not found")
        self.product_id = product_id


class CartService:
    def __init__(
        self,
        cart_repository: CartRepository,
        product_service: ProductService,
    ) -> None:
        self._cart_repository = cart_repository
        self._product_service = product_service

    async def get_cart(self, session_id: str) -> CartResponse:
        items = await self._cart_repository.get(session_id)
        return self._build_response(items)

    async def add_item(
        self, session_id: str, product_id: str, quantity: int
    ) -> CartResponse:
        if self._product_service.get_product(product_id) is None:
            raise ProductNotFoundError(product_id)

        items = await self._cart_repository.get(session_id)
        existing = self._find(items, product_id)
        if existing is not None:
            existing["quantity"] = min(
                existing["quantity"] + quantity, MAX_QUANTITY_PER_ITEM
            )
        else:
            items.append({"productId": product_id, "quantity": quantity})

        await self._cart_repository.set(session_id, items)
        return self._build_response(items)

    async def update_quantity(
        self, session_id: str, product_id: str, quantity: int
    ) -> CartResponse:
        items = await self._cart_repository.get(session_id)
        existing = self._find(items, product_id)
        if existing is None:
            raise CartItemNotFoundError(product_id)

        existing["quantity"] = quantity
        await self._cart_repository.set(session_id, items)
        return self._build_response(items)

    async def remove_item(self, session_id: str, product_id: str) -> CartResponse:
        items = await self._cart_repository.get(session_id)
        filtered = [i for i in items if i["productId"] != product_id]
        await self._cart_repository.set(session_id, filtered)
        return self._build_response(filtered)

    async def clear(self, session_id: str) -> None:
        await self._cart_repository.delete(session_id)

    @staticmethod
    def _find(items: list[dict], product_id: str) -> dict | None:
        return next((i for i in items if i["productId"] == product_id), None)

    def _build_response(self, raw_items: list[dict]) -> CartResponse:
        cart_items: list[CartItem] = []
        total_count = 0
        total_price = Decimal("0.00")

        for raw in raw_items:
            product = self._product_service.get_product(raw["productId"])
            if product is None:
                # Product was removed from the catalog after it was added
                # to the cart. Skip silently rather than 500 the response.
                continue
            quantity = raw["quantity"]
            line_total = (product.price * quantity).quantize(Decimal("0.01"))
            cart_items.append(
                CartItem(
                    **product.model_dump(),
                    quantity=quantity,
                    line_total=line_total,
                )
            )
            total_count += quantity
            total_price += line_total

        return CartResponse(
            items=cart_items,
            total_count=total_count,
            total_price=total_price,
        )

from decimal import Decimal

from pydantic import Field

from app.models.common import CamelModel
from app.models.product import ProductListItem

MAX_QUANTITY_PER_ITEM = 99


class CartItem(ProductListItem):
    quantity: int = Field(ge=1, le=MAX_QUANTITY_PER_ITEM)
    line_total: Decimal


class CartResponse(CamelModel):
    items: list[CartItem]
    total_count: int
    total_price: Decimal


class AddToCartRequest(CamelModel):
    product_id: str
    quantity: int = Field(default=1, ge=1, le=MAX_QUANTITY_PER_ITEM)


class UpdateQuantityRequest(CamelModel):
    quantity: int = Field(ge=1, le=MAX_QUANTITY_PER_ITEM)

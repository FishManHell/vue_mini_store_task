from datetime import date
from decimal import Decimal
from enum import StrEnum

from pydantic import Field

from app.models.common import CamelModel


class Category(StrEnum):
    EBOOK = "ebook"
    SOFTWARE_LICENSE = "software_license"
    ONLINE_COURSE = "online_course"
    TEMPLATE = "template"


class Review(CamelModel):
    id: str
    author: str
    rating: int = Field(ge=1, le=5)
    comment: str
    created_at: date


class ProductBase(CamelModel):
    id: str
    name: str
    price: Decimal = Field(max_digits=10, decimal_places=2, ge=0)
    thumbnail_url: str


class ProductListItem(ProductBase):
    short_description: str
    category: Category


class ProductDetails(ProductListItem):
    long_description: str
    reviews: list[Review] = Field(default_factory=list)


class SortOrder(StrEnum):
    NAME_ASC = "name-asc"
    NAME_DESC = "name-desc"
    PRICE_ASC = "price-asc"
    PRICE_DESC = "price-desc"

from decimal import Decimal

import pytest

from app.models import Category, ProductDetails, SortOrder
from app.repositories import ProductRepository
from app.services import ProductService


def _product(
    id: str,
    name: str,
    price: str,
    category: Category = Category.EBOOK,
) -> ProductDetails:
    return ProductDetails(
        id=id,
        name=name,
        price=Decimal(price),
        thumbnail_url="https://example.test/x.png",
        short_description="short",
        long_description="long",
        category=category,
        reviews=[],
    )


@pytest.fixture
def service() -> ProductService:
    products = [
        _product("1", "Beta Book", "20.00", Category.EBOOK),
        _product("2", "Alpha Course", "50.00", Category.ONLINE_COURSE),
        _product("3", "Gamma Template", "10.00", Category.TEMPLATE),
        _product("4", "Alpha Book", "30.00", Category.EBOOK),
    ]
    return ProductService(ProductRepository(products))


def test_default_sort_is_name_ascending_case_insensitive(service: ProductService) -> None:
    names = [p.name for p in service.list_products()]
    assert names == ["Alpha Book", "Alpha Course", "Beta Book", "Gamma Template"]


def test_search_is_case_insensitive_substring(service: ProductService) -> None:
    results = service.list_products(search="alpha")
    assert {p.id for p in results} == {"2", "4"}


def test_filter_by_category(service: ProductService) -> None:
    results = service.list_products(category=Category.EBOOK)
    assert {p.id for p in results} == {"1", "4"}


def test_sort_price_desc(service: ProductService) -> None:
    prices = [p.price for p in service.list_products(sort=SortOrder.PRICE_DESC)]
    assert prices == [Decimal("50.00"), Decimal("30.00"), Decimal("20.00"), Decimal("10.00")]


def test_combined_search_and_category(service: ProductService) -> None:
    results = service.list_products(search="alpha", category=Category.EBOOK)
    assert [p.id for p in results] == ["4"]


def test_blank_search_is_ignored(service: ProductService) -> None:
    assert len(service.list_products(search="   ")) == 4

from collections.abc import Callable
from typing import Any

from app.models import Category, ProductDetails, SortOrder
from app.repositories import ProductRepository

_SORT_KEYS: dict[SortOrder, tuple[Callable[[ProductDetails], Any], bool]] = {
    SortOrder.NAME_ASC: (lambda p: p.name.lower(), False),
    SortOrder.NAME_DESC: (lambda p: p.name.lower(), True),
    SortOrder.PRICE_ASC: (lambda p: p.price, False),
    SortOrder.PRICE_DESC: (lambda p: p.price, True),
}


class ProductService:
    def __init__(self, repository: ProductRepository) -> None:
        self._repository = repository

    def list_products(
        self,
        *,
        search: str | None = None,
        category: Category | None = None,
        sort: SortOrder = SortOrder.NAME_ASC,
    ) -> list[ProductDetails]:
        products = self._repository.list_all()

        if search:
            query = search.strip().lower()
            if query:
                products = [p for p in products if query in p.name.lower()]

        if category is not None:
            products = [p for p in products if p.category == category]

        key, reverse = _SORT_KEYS[sort]
        return sorted(products, key=key, reverse=reverse)

    def get_product(self, product_id: str) -> ProductDetails | None:
        return self._repository.get_by_id(product_id)

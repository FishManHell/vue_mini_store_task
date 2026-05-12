from pathlib import Path

from pydantic import TypeAdapter

from app.models import ProductDetails

CATALOG_PATH = Path(__file__).parent.parent / "data" / "products.json"


class ProductRepository:
    """In-memory catalog. Loaded once at startup from products.json."""

    def __init__(self, products: list[ProductDetails]) -> None:
        self._products = products
        self._by_id = {p.id: p for p in products}

    @classmethod
    def from_json_file(cls, path: Path = CATALOG_PATH) -> "ProductRepository":
        raw = path.read_text(encoding="utf-8")
        products = TypeAdapter(list[ProductDetails]).validate_json(raw)
        return cls(products)

    def list_all(self) -> list[ProductDetails]:
        return list(self._products)

    def get_by_id(self, product_id: str) -> ProductDetails | None:
        return self._by_id.get(product_id)

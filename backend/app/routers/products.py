from fastapi import APIRouter, Depends, HTTPException, Request, status

from app.models import Category, ProductDetails, ProductListItem, SortOrder
from app.services import ProductService

router = APIRouter(prefix="/products", tags=["products"])


def get_product_service(request: Request) -> ProductService:
    return request.app.state.product_service


@router.get(
    "",
    response_model=list[ProductListItem],
    response_model_by_alias=True,
)
async def list_products(
    search: str | None = None,
    category: Category | None = None,
    sort: SortOrder = SortOrder.NAME_ASC,
    service: ProductService = Depends(get_product_service),
) -> list[ProductDetails]:
    return service.list_products(search=search, category=category, sort=sort)


@router.get(
    "/{product_id}",
    response_model=ProductDetails,
    response_model_by_alias=True,
)
async def get_product(
    product_id: str,
    service: ProductService = Depends(get_product_service),
) -> ProductDetails:
    product = service.get_product(product_id)
    if product is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found",
        )
    return product

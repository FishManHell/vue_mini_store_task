from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Query, Request, status

from app.models import Category, ProductDetails, ProductListItem, SortOrder
from app.services import ProductService

MAX_SEARCH_LENGTH = 100

router = APIRouter(prefix="/products", tags=["products"])


def get_product_service(request: Request) -> ProductService:
    return request.app.state.product_service


ProductServiceDep = Annotated[ProductService, Depends(get_product_service)]


@router.get(
    "",
    response_model=list[ProductListItem],
    response_model_by_alias=True,
)
async def list_products(
    service: ProductServiceDep,
    search: Annotated[str | None, Query(max_length=MAX_SEARCH_LENGTH)] = None,
    category: Category | None = None,
    sort: SortOrder = SortOrder.NAME_ASC,
) -> list[ProductDetails]:
    return service.list_products(search=search, category=category, sort=sort)


@router.get(
    "/{product_id}",
    response_model=ProductDetails,
    response_model_by_alias=True,
)
async def get_product(
    product_id: str,
    service: ProductServiceDep,
) -> ProductDetails:
    product = service.get_product(product_id)
    if product is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found",
        )
    return product

from fastapi import APIRouter, Depends, HTTPException, Response, status

from app.core.deps import get_cart_service, session_id
from app.models import AddToCartRequest, CartResponse, UpdateQuantityRequest
from app.services import (
    CartItemNotFoundError,
    CartService,
    ProductNotFoundError,
)

router = APIRouter(prefix="/cart", tags=["cart"])


@router.get(
    "",
    response_model=CartResponse,
    response_model_by_alias=True,
)
async def get_cart(
    sid: str = Depends(session_id),
    service: CartService = Depends(get_cart_service),
) -> CartResponse:
    return await service.get_cart(sid)


@router.post(
    "/items",
    response_model=CartResponse,
    response_model_by_alias=True,
    status_code=status.HTTP_201_CREATED,
)
async def add_item(
    body: AddToCartRequest,
    sid: str = Depends(session_id),
    service: CartService = Depends(get_cart_service),
) -> CartResponse:
    try:
        return await service.add_item(sid, body.product_id, body.quantity)
    except ProductNotFoundError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product {exc.product_id} not found",
        ) from exc


@router.patch(
    "/items/{product_id}",
    response_model=CartResponse,
    response_model_by_alias=True,
)
async def update_item(
    product_id: str,
    body: UpdateQuantityRequest,
    sid: str = Depends(session_id),
    service: CartService = Depends(get_cart_service),
) -> CartResponse:
    try:
        return await service.update_quantity(sid, product_id, body.quantity)
    except CartItemNotFoundError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Cart item {exc.product_id} not found",
        ) from exc


@router.delete(
    "/items/{product_id}",
    response_model=CartResponse,
    response_model_by_alias=True,
)
async def remove_item(
    product_id: str,
    sid: str = Depends(session_id),
    service: CartService = Depends(get_cart_service),
) -> CartResponse:
    return await service.remove_item(sid, product_id)


@router.delete("", status_code=status.HTTP_204_NO_CONTENT, response_class=Response)
async def clear_cart(
    sid: str = Depends(session_id),
    service: CartService = Depends(get_cart_service),
) -> Response:
    await service.clear(sid)
    return Response(status_code=status.HTTP_204_NO_CONTENT)

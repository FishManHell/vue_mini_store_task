from fastapi import Header, HTTPException, Request, status

from app.services import CartService


async def session_id(
    x_session_id: str | None = Header(default=None, alias="X-Session-Id"),
) -> str:
    if not x_session_id or not x_session_id.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="X-Session-Id header is required",
        )
    return x_session_id.strip()


def get_cart_service(request: Request) -> CartService:
    return request.app.state.cart_service

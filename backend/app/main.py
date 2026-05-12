from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import get_settings
from app.core.redis import create_redis_client
from app.repositories import CartRepository, ProductRepository
from app.routers import cart, health, products
from app.services import CartService, ProductService

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Products — in-memory catalog
    product_repository = ProductRepository.from_json_file()
    product_service = ProductService(product_repository)
    app.state.product_repository = product_repository
    app.state.product_service = product_service

    # Cart — Redis-backed
    redis = create_redis_client()
    cart_repository = CartRepository(redis, ttl_seconds=settings.cart_ttl_seconds)
    app.state.redis = redis
    app.state.cart_service = CartService(cart_repository, product_service)

    try:
        yield
    finally:
        await redis.aclose()


app = FastAPI(
    title=settings.app_name,
    version="0.1.4",
    debug=settings.debug,
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=False,
    allow_methods=["GET", "POST", "PATCH", "DELETE"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(products.router)
app.include_router(cart.router)

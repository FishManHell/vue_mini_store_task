from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import get_settings
from app.repositories import ProductRepository
from app.routers import health, products
from app.services import ProductService

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    repository = ProductRepository.from_json_file()
    app.state.product_repository = repository
    app.state.product_service = ProductService(repository)
    yield


app = FastAPI(
    title=settings.app_name,
    version="0.1.2",
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

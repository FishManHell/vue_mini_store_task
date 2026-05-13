# Vue Mini Store — Backend

FastAPI service powering the Vue Mini Store take-home project. Read-only product
catalog backed by a static JSON file, plus a Redis-backed shopping cart keyed by
a client-provided session header.

## Stack

- Python 3.12
- [FastAPI](https://fastapi.tiangolo.com/) 0.136 + [Pydantic v2](https://docs.pydantic.dev/latest/) + [pydantic-settings](https://docs.pydantic.dev/latest/concepts/pydantic_settings/)
- [redis-py](https://redis-py.readthedocs.io/) (asyncio) + Redis 7
- [uvicorn](https://www.uvicorn.org/) (with `uvloop` + `httptools` extras)
- [uv](https://docs.astral.sh/uv/) for dependency management
- [ruff](https://docs.astral.sh/ruff/) + [pytest](https://docs.pytest.org/) for dev

## Architecture

Layered request flow — each layer has a single responsibility, no business
logic in routers, no HTTP/Redis in repositories:

```
HTTP request
   ↓
Router            validates query/body, maps errors to HTTP codes
   ↓
Service           business logic, cross-cutting validation
   ↓
Repository        data access (in-memory catalog or Redis)
   ↓
Pydantic models   contract — camelCase on the wire, snake_case in Python
```

The product catalog is loaded once from `app/data/products.json` into memory
at startup (FastAPI `lifespan` hook), wrapped in a `ProductRepository`, and
exposed via `ProductService`. The cart lives in Redis under
`cart:{session_id}` with a sliding TTL refreshed on every write.

## Quick start

### Option A — Docker Compose (recommended)

Spins up Redis + backend (and frontend) with one command. Run from the **repo
root**, not from `backend/`:

```bash
docker compose up --build -d
docker compose ps             # all three services should be healthy
curl http://localhost:8000/health
```

- Backend: <http://localhost:8000>
- Swagger UI: <http://localhost:8000/docs>
- Frontend (via nginx): <http://localhost:8080> (proxies `/api/*` to backend)

Stop with `docker compose down`. Add `-v` to drop the Redis volume.

### Option B — Backend Docker image standalone

Use this to verify the backend Dockerfile independently from Docker Compose.
Redis is still required because the cart is Redis-backed.

Start Redis:

```bash
docker run --rm \
  --name vue-mini-store-redis \
  -p 6379:6379 \
  redis:7-alpine
```

Build and run the backend image:

```bash
cd backend
docker build -t vue-mini-store-backend .
docker run --rm \
  --name vue-mini-store-backend \
  -p 8000:8000 \
  -e REDIS_URL=redis://host.docker.internal:6379/0 \
  -e CORS_ORIGINS=http://localhost:5173,http://localhost:8080 \
  vue-mini-store-backend
```

Check:

```bash
curl http://localhost:8000/health
```

Swagger UI: <http://localhost:8000/docs>

### Option C — Local with `uv`

Requires a running Redis on `localhost:6379` (e.g. `docker compose up -d redis`).

```bash
cd backend
cp .env.example .env          # adjust as needed
uv sync
uv run uvicorn app.main:app --reload
```

Tests, lint and format:

```bash
uv run pytest
uv run ruff check .
uv run ruff format .
```

## Project layout

```
backend/
├── Dockerfile                multi-stage python:3.12-slim + uv → runtime
├── .dockerignore
├── pyproject.toml            uv-managed dependencies + ruff/pytest config
├── uv.lock                   pinned versions (commit this)
├── .env.example              template for local .env
├── tests/                    pytest suite (product_service, cart_service)
└── app/
    ├── core/
    │   ├── config.py         Pydantic Settings (env-driven)
    │   ├── redis.py          asyncio Redis client factory
    │   └── deps.py           FastAPI dependencies (X-Session-Id, services)
    ├── models/
    │   ├── common.py         CamelModel base (alias_generator=to_camel)
    │   ├── product.py        Category, SortOrder, Review, Product*
    │   └── cart.py           CartItem, CartResponse, request bodies
    ├── repositories/
    │   ├── product_repository.py    loads products.json via TypeAdapter
    │   └── cart_repository.py       Redis JSON, sliding TTL
    ├── services/
    │   ├── product_service.py       search + category + sort
    │   └── cart_service.py          add/update/remove/clear + domain errors
    ├── routers/
    │   ├── health.py
    │   ├── products.py
    │   └── cart.py
    ├── data/
    │   └── products.json     8 products, UUID ids, camelCase keys
    └── main.py               FastAPI app, CORS, lifespan, router wiring
```

## Tests

Pytest with `asyncio_mode = "auto"` (see `[tool.pytest.ini_options]` in
`pyproject.toml`). Service-level unit tests, no Redis or HTTP layer needed:

- **`tests/test_product_service.py`** — filter (search / category), sort
  (name/price asc & desc), combined filters, blank-search guard.
- **`tests/test_cart_service.py`** — quantity merging, clamp at
  `MAX_QUANTITY_PER_ITEM`, missing-product error, removal totals. Uses an
  in-memory `FakeCartRepository` that mirrors the real Redis contract.

```bash
uv run pytest -v
```

## Configuration

All settings come from environment variables (or `.env`). See `.env.example`.

| Variable | Default | Notes |
|---|---|---|
| `APP_NAME` | `Vue Mini Store API` | Shown in Swagger UI title |
| `DEBUG` | `false` | Enables FastAPI debug mode |
| `LOG_LEVEL` | `INFO` | Reserved for future logging config |
| `CORS_ORIGINS` | `http://localhost:5173,http://localhost:4173` | Comma-separated list. Add `http://localhost:8080` for Docker frontend |
| `REDIS_URL` | `redis://localhost:6379/0` | `redis://redis:6379/0` inside Docker network |
| `CART_TTL_SECONDS` | `604800` (7d) | TTL on `cart:{session_id}` keys, refreshed per write |

## API reference

All responses are JSON with **camelCase** keys. Prices serialize as decimal
strings (e.g. `"29.99"`) to preserve precision.

Base URL: `http://localhost:8000` (or `http://localhost:8080/api` through the
nginx proxy).

### Health

```http
GET /health
→ 200 {"status": "ok"}
```

### Products

```http
GET /products
GET /products?search=vue&category=online_course&sort=price-desc
GET /products/{id}
```

Query parameters (all optional on the list endpoint):

| Param | Type | Default | Notes |
|---|---|---|---|
| `search` | string | — | Case-insensitive substring match on `name` |
| `category` | enum | — | One of `ebook`, `software_license`, `online_course`, `template`. Invalid → 422 |
| `sort` | enum | `name-asc` | One of `name-asc`, `name-desc`, `price-asc`, `price-desc` |

**List response** (`ProductListItem[]`):
```json
[
  {
    "id": "4af8ea52-5205-4738-929c-b9e03dd6ab6f",
    "name": "The Pragmatic Programmer",
    "price": "29.99",
    "thumbnailUrl": "https://picsum.photos/seed/product-1/600/600",
    "shortDescription": "A timeless guide ...",
    "category": "ebook"
  }
]
```

**Detail response** (`ProductDetails`) adds `longDescription` and `reviews`:
```json
{
  "id": "4af8ea52-...",
  "name": "The Pragmatic Programmer",
  "price": "29.99",
  "thumbnailUrl": "...",
  "shortDescription": "...",
  "category": "ebook",
  "longDescription": "...",
  "reviews": [
    {
      "id": "a3c04152-...",
      "author": "Marta L.",
      "rating": 5,
      "comment": "...",
      "createdAt": "2025-08-14"
    }
  ]
}
```

Unknown id → `404 {"detail": "Product not found"}`.

### Cart

**All cart endpoints require** an `X-Session-Id` header (any non-empty string;
the client generates one UUID per browser and stores it in `localStorage`).

```http
GET /cart                             → CartResponse
POST /cart/items                      → 201 CartResponse
PATCH /cart/items/{productId}         → CartResponse
DELETE /cart/items/{productId}        → CartResponse
DELETE /cart                          → 204
```

**`CartResponse`** — enriches every line with product fields from the catalog
and precomputes totals server-side (clients should not multiply Decimal strings):

```json
{
  "items": [
    {
      "id": "4af8ea52-...",
      "name": "The Pragmatic Programmer",
      "price": "29.99",
      "thumbnailUrl": "...",
      "shortDescription": "...",
      "category": "ebook",
      "quantity": 2,
      "lineTotal": "59.98"
    }
  ],
  "totalCount": 2,
  "totalPrice": "59.98"
}
```

**POST `/cart/items`** — adds or merges an item:
```json
{ "productId": "4af8ea52-...", "quantity": 2 }
```

- `quantity` is `int` in `[1, 99]`. Repeated POSTs sum quantities and **clamp at 99**.
- Unknown `productId` → `404 {"detail": "Product <id> not found"}`.
- `quantity` out of range → `422`.

**PATCH `/cart/items/{productId}`** — sets absolute quantity:
```json
{ "quantity": 5 }
```

- Item not in cart → `404 {"detail": "Cart item <id> not found"}`.

**Errors** common to all cart endpoints:
- Missing or empty `X-Session-Id` → `400 {"detail": "X-Session-Id header is required"}`.

### Interactive docs

FastAPI generates OpenAPI + Swagger UI automatically:

- Swagger UI: <http://localhost:8000/docs>
- ReDoc: <http://localhost:8000/redoc>
- OpenAPI JSON: <http://localhost:8000/openapi.json>

## Implementation notes

- **camelCase contract.** `app/models/common.py` defines `CamelModel`, a
  `BaseModel` with `alias_generator=to_camel` and `populate_by_name=True`. All
  domain/request/response models inherit from it. Every route sets
  `response_model_by_alias=True` so FastAPI serializes aliases on the way out.
- **`Decimal` for money.** Prices and totals use `decimal.Decimal` end-to-end.
  Pydantic v2 serializes `Decimal` to a JSON **string** by default —
  intentional, matches the frontend's `price: string` type, avoids float
  precision drift on the client.
- **Cart never snapshots product data.** Redis holds only
  `[{productId, quantity}]`. Name/price/image are re-read from
  `ProductRepository` on every GET, so catalog edits propagate to existing
  carts. Products removed from the catalog are silently skipped (no 500).
- **Sliding TTL.** Every write to a cart key resets the TTL to
  `CART_TTL_SECONDS`. Active users keep their carts; abandoned sessions expire.
- **Cart mutations are not atomic.** `add_item` / `update_quantity` /
  `remove_item` do a `read → modify → write` against Redis without
  `WATCH`/`MULTI`. Acceptable for a single-browser-tab session (one in-flight
  request at a time); a production deployment with concurrent writes per
  session would need a Lua script or optimistic locking.
- **Layered isolation.** Routers know about HTTP and Pydantic models;
  services know about domain logic and raise domain exceptions
  (`ProductNotFoundError`, `CartItemNotFoundError`); repositories know about
  storage. Routers translate domain exceptions to HTTP codes.
- **Docker image.** Multi-stage `python:3.12-slim` (~263 MB). `uv` is copied
  from the official Astral image into the builder stage only — the runtime
  image has just Python + `.venv` + `app/`. `UV_LINK_MODE=copy` is required
  for Docker (avoids cross-layer hardlinks). `--no-dev` keeps pytest/ruff out
  of prod.
- **Pydantic Settings + lists from env.** `CORS_ORIGINS` is annotated with
  `NoDecode` to disable Pydantic's default JSON parsing for list fields,
  letting our `field_validator` accept a plain comma-separated string.

## Roadmap

- Optional: hosting (Fly.io / Railway)

# Vue Mini Store — Backend

FastAPI service for the Vue Mini Store take-home project.

> Status: WIP — skeleton only. Endpoints will be documented as features land.

## Stack

- Python 3.12
- FastAPI + Pydantic v2
- Redis (cart storage — coming next)
- uv for dependency management

## Quick start

Prereqs: [`uv`](https://docs.astral.sh/uv/) installed.

```bash
cd backend
cp .env.example .env
uv sync
uv run uvicorn app.main:app --reload
```

Then open:

- API: http://localhost:8000
- Swagger UI: http://localhost:8000/docs
- Health check: http://localhost:8000/health

## Project layout

```
app/
├── core/           # config, shared infra
├── routers/        # FastAPI APIRouters (HTTP layer)
├── services/       # business logic
├── repositories/   # data access (JSON catalog, Redis)
├── models/         # Pydantic schemas
├── data/           # static product catalog (products.json)
└── main.py         # FastAPI app entrypoint
```

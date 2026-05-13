# Vue Mini Store — Frontend

Mini e-commerce SPA for digital products (e-books, software licenses, online courses, templates). Product list with search / category filter / sort, product details, shopping cart with quantity controls and mock checkout.

Talks to the FastAPI backend over `/api/*`. See [`backend/README.md`](../backend/README.md) for the API contract; see the [root `README.md`](../README.md) for the full-stack one-command setup.

## Stack

- **Vue 3** Composition API + `<script setup>`
- **TypeScript**, **Vite 8**
- **Pinia** (setup-style stores)
- **Vue Router 5** (history mode, typed route constants)
- **Tailwind v3** + design tokens
- **PrimeVue** (Aura preset) — Toast, ConfirmDialog, Select, Badge
- **lucide-vue-next** icons, **Inter** variable font
- **axios** for HTTP — `baseURL: '/api'`, `X-Session-Id` injected by request interceptor
- **Vitest** + `@vue/test-utils` + `happy-dom` for unit tests

## Architecture

Frontend follows **[Feature-Sliced Design](https://feature-sliced.design/)**:

```
src/
├── app/        — composition root: router, pinia, theme, global styles
├── pages/      — route-level slices (products, product-details, cart, not-found)
├── widgets/    — page-scoped compositions (app-header, product-details, cart)
├── features/   — user actions (filter-products)
├── entities/   — business models (product, cart)
└── shared/     — UI primitives, api client, lib helpers, types, constants
```

All layers expose a public API via `index.ts` — except `pages/`, where each slice is just a `.vue` + `.async.ts` pair at the slice root.

### Talking to the backend

- **`shared/api/session.ts`** — `getSessionId()` lazily generates a UUID via `crypto.randomUUID()` on first call, persists it in `localStorage` under `session_id`, and caches it in memory. Cart identity for the lifetime of the browser.
- **`shared/api/http.ts`** — single axios instance, `baseURL: '/api'`, request interceptor injects `X-Session-Id` on every call.
- **Data hooks** (`entities/product/model/`): `useProducts(filters?)` and `useProduct(id)`. Both use `AbortController` to cancel in-flight requests on input change / unmount. Errors are normalised to `'not_found' | 'unknown' | null` so the UI can branch cleanly.
- **Cart store** (`entities/cart/model/cart-store.ts`) mirrors the server. Every action (`load`, `addItem`, `updateQuantity`, `removeItem`, `clear`) `await`s the backend and replaces local state with the response — no optimistic updates. `App.vue` calls `cart.load()` in `onMounted` to hydrate the header badge after refresh.

## Quick start

### Run locally with npm (requires backend on `:8000`)

The Vite dev server proxies `/api/*` to `http://localhost:8000` (see `vite.config.ts`), so the backend must be reachable. Easiest is to start just `redis` + `backend` from Docker Compose and run the frontend natively for HMR:

```sh
# from repo root — bring up backend dependencies
docker compose up -d redis backend

# then, from frontend/
cd frontend
npm install
npm run dev          # http://localhost:5173
```

### Run with Docker

Production-grade multi-stage build → nginx serving the static SPA. Build context is `./frontend` only — the backend folder is not included in the image.

```sh
# from repo root
docker build -t vue-store-frontend ./frontend
docker run --rm -p 8080:80 vue-store-frontend
# open http://localhost:8080
```

In Docker the nginx config (`nginx.conf`) proxies `/api/*` to `backend:8000` (resolved by the Compose network), so use `docker compose up` from the repo root if you want the full stack — see the root README.

The nginx config handles:
- SPA history-mode fallback (`try_files $uri $uri/ /index.html`)
- `/api/*` reverse proxy to the backend service
- Immutable cache for hashed `/assets/*`
- `no-cache` on `index.html` so users always pick up the latest asset hashes
- gzip on demand

## Scripts

| Command             | What it does                                 |
| ------------------- | -------------------------------------------- |
| `npm run dev`       | Vite dev server with HMR (proxies `/api` → `:8000`) |
| `npm run build`     | Type-check (`vue-tsc`) + production build    |
| `npm run preview`   | Preview the production build locally         |
| `npm run test:unit` | Run unit tests with Vitest                   |
| `npm run lint`      | Run oxlint + eslint with autofix             |
| `npm run format`    | Format `src/` with Prettier                  |

## Implementation notes

- **camelCase on the wire.** Backend models use Pydantic `alias_generator=to_camel`, so the frontend consumes plain camelCase JSON — no client-side key mapping.
- **`price` as string.** Money is `Decimal` on the backend and serialized to a JSON string (e.g. `"29.99"`). The frontend keeps it as a string and never multiplies it locally — `lineTotal` and `totalPrice` come from the server.
- **Session identity.** `X-Session-Id` is a per-browser UUID stored in `localStorage`. Clearing storage = abandoning the current cart (the Redis TTL will eventually reap it).
- **No optimistic UI.** Every cart mutation round-trips. Trade-off: a tick of latency on `+`/`-`/remove, but the client is never lying about what the server holds.
- **Error UX.** Inline retry on the products list (network failure → `ProductListError` with Retry button). Toast on cart write failures. Manual retry only — no auto-retry in v1.

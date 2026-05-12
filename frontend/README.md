# Vue Mini Store — Frontend

Mini e-commerce SPA for digital products (e-books, software licenses, online courses, templates). Product list with search / category filter / sort, product details, shopping cart with quantity controls and mock checkout.

## Stack

- **Vue 3** Composition API + `<script setup>`
- **TypeScript**, **Vite 8**
- **Pinia** (setup-style stores)
- **Vue Router 4** (history mode, typed routes)
- **Tailwind v3** + design tokens
- **PrimeVue** (Aura preset) — Toast, ConfirmDialog, Select, Badge
- **lucide-vue-next** icons, **Inter** variable font
- **axios** for HTTP (wired but unused until backend lands)
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
└── shared/     — UI primitives, lib helpers, types, constants
```

All layers expose a public API via `index.ts` — except `pages/`, where each slice is just a `.vue` + `.async.ts` pair at the slice root.

## Quick start

### Run locally with npm

```sh
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

The nginx config (`nginx.conf`) handles:
- SPA history-mode fallback (`try_files $uri $uri/ /index.html`)
- Immutable cache for hashed `/assets/*`
- `no-cache` on `index.html` so users always pick up the latest asset hashes
- gzip on demand

## Scripts

| Command             | What it does                                 |
| ------------------- | -------------------------------------------- |
| `npm run dev`       | Vite dev server with HMR                     |
| `npm run build`     | Type-check (`vue-tsc`) + production build    |
| `npm run preview`   | Preview the production build locally         |
| `npm run test:unit` | Run unit tests with Vitest                   |
| `npm run lint`      | Run oxlint + eslint with autofix             |
| `npm run format`    | Format `src/` with Prettier                  |

## Project status

Frontend UI is complete with mock data. Backend (FastAPI + Redis) and end-to-end integration are tracked separately.

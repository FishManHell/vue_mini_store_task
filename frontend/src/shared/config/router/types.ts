import type { RouteRecordRaw } from 'vue-router'

export enum AppRoute {
  HOME = 'home',
  PRODUCTS = 'products',
  PRODUCT_DETAILS = 'productDetails',
  CART = 'cart',
  NOT_FOUND = 'notFound',
}

export const RoutePaths = {
  [AppRoute.HOME]: '/',
  [AppRoute.PRODUCTS]: '/products',
  [AppRoute.PRODUCT_DETAILS]: '/products/:id',
  [AppRoute.CART]: '/cart',
  [AppRoute.NOT_FOUND]: '/:pathMatch(.*)*',
} as const

export type AppRouteRecord<K extends AppRoute> = RouteRecordRaw & {
  name: K
  path: (typeof RoutePaths)[K]
}

export type RoutesType = AppRouteRecord<AppRoute>[]

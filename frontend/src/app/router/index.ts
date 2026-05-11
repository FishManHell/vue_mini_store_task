import { createRouter, createWebHistory } from 'vue-router'
import { AppRoute, RoutePaths, type RoutesType } from '@/shared/config/router'
import { ProductsPageAsync as ProductsPage } from '@/pages/products/ProductsPage.async'
import { ProductDetailsPageAsync as ProductDetailsPage } from '@/pages/product-details/ProductDetailsPage.async'
import { CartPageAsync as CartPage } from '@/pages/cart/CartPage.async'
import { NotFoundPageAsync as NotFoundPage } from '@/pages/not-found/NotFoundPage.async'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
  }
}

const routes: RoutesType = [
  {
    path: RoutePaths[AppRoute.HOME],
    name: AppRoute.HOME,
    redirect: RoutePaths[AppRoute.PRODUCTS],
  },
  {
    path: RoutePaths[AppRoute.PRODUCTS],
    name: AppRoute.PRODUCTS,
    component: ProductsPage,
    meta: { title: 'Products' },
  },
  {
    path: RoutePaths[AppRoute.PRODUCT_DETAILS],
    name: AppRoute.PRODUCT_DETAILS,
    component: ProductDetailsPage,
    props: true,
    meta: { title: 'Product' },
  },
  {
    path: RoutePaths[AppRoute.CART],
    name: AppRoute.CART,
    component: CartPage,
    meta: { title: 'Cart' },
  },
  {
    path: RoutePaths[AppRoute.NOT_FOUND],
    name: AppRoute.NOT_FOUND,
    component: NotFoundPage,
    meta: { title: 'Not found' },
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: (_, __, savedPosition) => savedPosition ?? { top: 0 },
})

router.afterEach((to) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} — Mini Store`
  }
})

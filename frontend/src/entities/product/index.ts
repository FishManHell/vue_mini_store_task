export type {
  Category,
  ProductBase,
  ProductListItem,
  ProductDetails,
  Review,
  SortOrder,
  ProductFilters,
} from './model/types'
export { CATEGORY, SORT_ORDER } from './model/types'
export { useProducts } from './model/use-products'
export { useProduct, type ProductError } from './model/use-product'
export { formatCategory, formatPrice } from './lib/format'
export { default as ProductCard } from './ui/ProductCard.vue'
export { default as ProductCardSkeleton } from './ui/ProductCardSkeleton.vue'

import type { Category } from '@/shared/constants/categories'

export interface ProductBase {
  id: string
  name: string
  price: string
  thumbnailUrl: string
}

export interface ProductListItem extends ProductBase {
  shortDescription: string
  category: Category
}

export interface Review {
  id: string
  author: string
  rating: number
  comment: string
  createdAt: string
}

export interface ProductDetails extends ProductListItem {
  longDescription: string
  reviews: Review[]
}

export const SORT_ORDER = {
  NAME_ASC: 'name-asc',
  NAME_DESC: 'name-desc',
  PRICE_ASC: 'price-asc',
  PRICE_DESC: 'price-desc',
} as const

export type SortOrder = (typeof SORT_ORDER)[keyof typeof SORT_ORDER]

export interface ProductFilters {
  search: string
  category: Category | null
  sort: SortOrder
}

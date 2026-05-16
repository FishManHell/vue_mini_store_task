import type { LocationQuery, LocationQueryRaw } from 'vue-router'
import { SORT_ORDER, type ProductFilters, type SortOrder } from '@/entities/product'
import { CATEGORY, type Category } from '@/shared/constants/categories'

const QUERY_KEY = {
  SEARCH: 'search',
  CATEGORY: 'category',
  SORT: 'sort',
} as const

export const DEFAULT_FILTERS: ProductFilters = {
  search: '',
  category: null,
  sort: SORT_ORDER.NAME_ASC,
}

const VALID_CATEGORIES = new Set<string>(Object.values(CATEGORY))
const VALID_SORTS = new Set<string>(Object.values(SORT_ORDER))

function isCategory(value: string): value is Category {
  return VALID_CATEGORIES.has(value)
}

function isSortOrder(value: string): value is SortOrder {
  return VALID_SORTS.has(value)
}

function firstString(value: unknown): string {
  if (typeof value === 'string') return value
  if (Array.isArray(value) && typeof value[0] === 'string') return value[0]
  return ''
}

function parseSearch(value: unknown): string {
  return firstString(value)
}

function parseCategory(value: unknown): Category | null {
  const raw = firstString(value)
  return isCategory(raw) ? raw : DEFAULT_FILTERS.category
}

function parseSort(value: unknown): SortOrder {
  const raw = firstString(value)
  return isSortOrder(raw) ? raw : DEFAULT_FILTERS.sort
}

export function parseFilters(query: LocationQuery): ProductFilters {
  return {
    search: parseSearch(query[QUERY_KEY.SEARCH]),
    category: parseCategory(query[QUERY_KEY.CATEGORY]),
    sort: parseSort(query[QUERY_KEY.SORT]),
  }
}

export function buildQuery(filters: ProductFilters): LocationQueryRaw {
  const query: LocationQueryRaw = {}
  if (filters.search !== DEFAULT_FILTERS.search) query[QUERY_KEY.SEARCH] = filters.search
  if (filters.category !== DEFAULT_FILTERS.category) query[QUERY_KEY.CATEGORY] = filters.category
  if (filters.sort !== DEFAULT_FILTERS.sort) query[QUERY_KEY.SORT] = filters.sort
  return query
}

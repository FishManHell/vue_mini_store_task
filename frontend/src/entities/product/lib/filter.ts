import {
  SORT_ORDER,
  type ProductFilters,
  type ProductListItem,
  type SortOrder,
} from '../model/types'

type Comparator = (a: ProductListItem, b: ProductListItem) => number

const COMPARATORS: Record<SortOrder, Comparator> = {
  [SORT_ORDER.NAME_ASC]: (a, b) => a.name.localeCompare(b.name),
  [SORT_ORDER.NAME_DESC]: (a, b) => b.name.localeCompare(a.name),
  [SORT_ORDER.PRICE_ASC]: (a, b) => Number(a.price) - Number(b.price),
  [SORT_ORDER.PRICE_DESC]: (a, b) => Number(b.price) - Number(a.price),
}

export function applyFilters(
  products: ProductListItem[],
  filters: ProductFilters,
): ProductListItem[] {
  let result = products

  const query = filters.search.trim().toLowerCase()
  if (query) {
    result = result.filter((product) => product.name.toLowerCase().includes(query))
  }

  if (filters.category !== null) {
    result = result.filter((product) => product.category === filters.category)
  }

  return [...result].sort(COMPARATORS[filters.sort])
}

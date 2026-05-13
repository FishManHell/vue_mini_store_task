import { reactive } from 'vue'
import {
  SORT_ORDER,
  type ProductFilters,
  type SortOrder,
} from '@/entities/product'
import type {Category} from "@/shared/constants/categories";

const filters = reactive<ProductFilters>({
  search: '',
  category: null,
  sort: SORT_ORDER.NAME_ASC,
})

export function useFilters() {
  return {
    filters,
    setSearch(value: string): void {
      filters.search = value
    },
    setCategory(value: Category | null): void {
      filters.category = value
    },
    setSort(value: SortOrder): void {
      filters.sort = value
    },
    reset(): void {
      filters.search = ''
      filters.category = null
      filters.sort = SORT_ORDER.NAME_ASC
    },
  }
}

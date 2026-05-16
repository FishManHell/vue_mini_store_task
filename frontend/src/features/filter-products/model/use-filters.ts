import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { ProductFilters, SortOrder } from '@/entities/product'
import type { Category } from '@/shared/constants/categories'
import { DEFAULT_FILTERS, buildQuery, parseFilters } from './filters-codec'

export function useFilters() {
  const route = useRoute()
  const router = useRouter()

  const filters = computed<ProductFilters>(() => parseFilters(route.query))

  function patch(next: Partial<ProductFilters>): void {
    router.replace({ query: buildQuery({ ...filters.value, ...next }) })
  }

  return {
    filters,
    setSearch(value: string): void {
      patch({ search: value })
    },
    setCategory(value: Category | null): void {
      patch({ category: value })
    },
    setSort(value: SortOrder): void {
      patch({ sort: value })
    },
    reset(): void {
      router.replace({ query: buildQuery(DEFAULT_FILTERS) })
    },
  }
}

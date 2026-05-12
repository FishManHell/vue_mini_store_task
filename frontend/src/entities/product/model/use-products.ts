import { onUnmounted, ref, watch } from 'vue'
import axios from 'axios'
import { http } from '@/shared/api'
import type { ProductFilters, ProductListItem } from './types'

export type ProductsError = 'unknown'

function buildParams(filters?: ProductFilters) {
  if (!filters) return undefined
  const params: Record<string, string> = { sort: filters.sort }
  if (filters.search.trim()) params.search = filters.search.trim()
  if (filters.category) params.category = filters.category
  return params
}

export function useProducts(filters?: ProductFilters) {
  const products = ref<ProductListItem[] | null>(null)
  const isLoading = ref(true)
  const error = ref<ProductsError | null>(null)

  let controller: AbortController | null = null

  async function load() {
    controller?.abort()
    controller = new AbortController()
    const signal = controller.signal

    isLoading.value = true
    error.value = null

    try {
      const { data } = await http.get<ProductListItem[]>('/products', {
        params: buildParams(filters),
        signal,
      })
      if (signal.aborted) return
      products.value = data
    } catch (e) {
      if (axios.isCancel(e) || signal.aborted) return
      error.value = 'unknown'
      products.value = null
    } finally {
      if (!signal.aborted) isLoading.value = false
    }
  }

  if (filters) {
    watch(filters, load, { deep: true, immediate: true })
  } else {
    load()
  }

  onUnmounted(() => controller?.abort())

  return { products, isLoading, error, reload: load }
}

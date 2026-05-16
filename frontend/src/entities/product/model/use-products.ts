import { onUnmounted, ref, toValue, watch, type MaybeRefOrGetter } from 'vue'
import axios from 'axios'
import { http } from '@/shared/api'
import type { ProductFilters, ProductListItem } from './types'

export type ProductsError = 'unknown'

function buildParams(filters: ProductFilters | undefined) {
  if (!filters) return undefined
  const params: Record<string, string> = { sort: filters.sort }
  if (filters.search.trim()) params.search = filters.search.trim()
  if (filters.category) params.category = filters.category
  return params
}

export function useProducts(filters?: MaybeRefOrGetter<ProductFilters | undefined>) {
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
        params: buildParams(toValue(filters)),
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

  watch(() => toValue(filters), load, { immediate: true })

  onUnmounted(() => controller?.abort())

  return { products, isLoading, error, reload: load }
}

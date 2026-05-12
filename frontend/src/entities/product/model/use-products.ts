import { onMounted, ref, watch } from 'vue'
import { applyFilters } from '../lib/filter'
import { mockProducts } from './mock-data'
import type { ProductDetails, ProductFilters, ProductListItem } from './types'

const MOCK_DELAY_MS = 500

function toListItem(product: ProductDetails): ProductListItem {
  const { longDescription: _longDescription, reviews: _reviews, ...listItem } = product
  return listItem
}

export function useProducts(filters?: ProductFilters) {
  const products = ref<ProductListItem[] | null>(null)
  const isLoading = ref(true)

  async function load() {
    isLoading.value = true
    await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS))
    const list = mockProducts.map(toListItem)
    products.value = filters ? applyFilters(list, filters) : list
    isLoading.value = false
  }

  if (filters) {
    watch(filters, load, { deep: true, immediate: true })
  } else {
    onMounted(load)
  }

  return { products, isLoading }
}

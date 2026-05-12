import { ref, toValue, watch, type MaybeRefOrGetter } from 'vue'
import { mockProducts } from './mock-data'
import type { ProductDetails } from './types'

const MOCK_DELAY_MS = 500

export type ProductError = 'not_found' | 'unknown'

export function useProduct(id: MaybeRefOrGetter<string>) {
  const product = ref<ProductDetails | null>(null)
  const isLoading = ref(true)
  const error = ref<ProductError | null>(null)

  async function load() {
    isLoading.value = true
    error.value = null
    product.value = null

    await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS))

    const currentId = toValue(id)
    const found = mockProducts.find((p) => p.id === currentId)

    if (!found) {
      error.value = 'not_found'
    } else {
      product.value = found
    }

    isLoading.value = false
  }

  watch(() => toValue(id), load, { immediate: true })

  return { product, isLoading, error }
}

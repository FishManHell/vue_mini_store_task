import { onUnmounted, ref, toValue, watch, type MaybeRefOrGetter } from 'vue'
import axios from 'axios'
import { http } from '@/shared/api'
import type { ProductDetails } from './types'

export type ProductError = 'not_found' | 'unknown'

export function useProduct(id: MaybeRefOrGetter<string>) {
  const product = ref<ProductDetails | null>(null)
  const isLoading = ref(true)
  const error = ref<ProductError | null>(null)

  let controller: AbortController | null = null

  async function load() {
    controller?.abort()
    controller = new AbortController()
    const signal = controller.signal

    isLoading.value = true
    error.value = null
    product.value = null

    try {
      const { data } = await http.get<ProductDetails>(`/products/${toValue(id)}`, {
        signal,
      })
      if (signal.aborted) return
      product.value = data
    } catch (e) {
      if (axios.isCancel(e) || signal.aborted) return
      if (axios.isAxiosError(e) && e.response?.status === 404) {
        error.value = 'not_found'
      } else {
        error.value = 'unknown'
      }
    } finally {
      if (!signal.aborted) isLoading.value = false
    }
  }

  watch(() => toValue(id), load, { immediate: true })

  onUnmounted(() => controller?.abort())

  return { product, isLoading, error }
}

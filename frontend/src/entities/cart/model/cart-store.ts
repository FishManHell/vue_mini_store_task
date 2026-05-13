import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { http } from '@/shared/api'
import type { CartItem, CartResponse } from './types'

export type CartError = 'unknown'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  const totalCount = ref(0)
  const totalPrice = ref('0.00')
  const isLoading = ref(false)
  const isLoaded = ref(false)
  const error = ref<CartError | null>(null)

  const isEmpty = computed(() => items.value.length === 0)

  function applyResponse(data: CartResponse) {
    items.value = data.items
    totalCount.value = data.totalCount
    totalPrice.value = data.totalPrice
  }

  function applyEmpty() {
    items.value = []
    totalCount.value = 0
    totalPrice.value = '0.00'
  }

  async function run(fn: () => Promise<void>) {
    isLoading.value = true
    error.value = null
    try {
      await fn()
    } catch {
      error.value = 'unknown'
    } finally {
      isLoading.value = false
    }
  }

  async function load() {
    await run(async () => {
      const { data } = await http.get<CartResponse>('/cart')
      applyResponse(data)
      isLoaded.value = true
    })
  }

  async function addItem(productId: string, quantity = 1) {
    await run(async () => {
      const { data } = await http.post<CartResponse>('/cart/items', { productId, quantity })
      applyResponse(data)
    })
  }

  async function updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      await removeItem(productId)
      return
    }
    await run(async () => {
      const { data } = await http.patch<CartResponse>(`/cart/items/${productId}`, { quantity })
      applyResponse(data)
    })
  }

  async function removeItem(productId: string) {
    await run(async () => {
      const { data } = await http.delete<CartResponse>(`/cart/items/${productId}`)
      applyResponse(data)
    })
  }

  async function clear() {
    await run(async () => {
      await http.delete('/cart')
      applyEmpty()
    })
  }

  async function checkout() {
    await clear()
  }

  return {
    items,
    totalCount,
    totalPrice,
    isEmpty,
    isLoading,
    isLoaded,
    error,
    load,
    addItem,
    updateQuantity,
    removeItem,
    clear,
    checkout
  }
})

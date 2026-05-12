import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { ProductListItem } from '@/entities/product'
import type { CartItem } from './types'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  const totalCount = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0),
  )

  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0),
  )

  const isEmpty = computed(() => items.value.length === 0)

  function addItem(product: ProductListItem, quantity = 1) {
    const existing = items.value.find((item) => item.id === product.id)
    if (existing) {
      existing.quantity += quantity
      return
    }
    items.value.push({
      id: product.id,
      name: product.name,
      price: product.price,
      thumbnailUrl: product.thumbnailUrl,
      shortDescription: product.shortDescription,
      category: product.category,
      quantity,
    })
  }

  function removeItem(productId: string) {
    const index = items.value.findIndex((item) => item.id === productId)
    if (index !== -1) {
      items.value.splice(index, 1)
    }
  }

  function updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }
    const existing = items.value.find((item) => item.id === productId)
    if (existing) {
      existing.quantity = quantity
    }
  }

  function clear() {
    items.value = []
  }

  return {
    items,
    totalCount,
    totalPrice,
    isEmpty,
    addItem,
    removeItem,
    updateQuantity,
    clear,
  }
})

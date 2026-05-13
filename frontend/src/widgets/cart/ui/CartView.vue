<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'
import { useCartStore } from '@/entities/cart'
import { formatPrice } from '@/entities/product'
import CartItemsList from './CartItemsList.vue'
import CartSummary from './CartSummary.vue'
import CartEmpty from './CartEmpty.vue'

const cart = useCartStore()
const { items, isEmpty, totalCount, totalPrice } = storeToRefs(cart)

const toast = useToast()
const confirm = useConfirm()

function showError(summary: string) {
  toast.add({
    severity: 'error',
    summary,
    detail: 'Please try again.',
    life: 3000,
  })
}

function handleCheckout() {
  confirm.require({
    header: 'Place order',
    message: `Place order for ${formatPrice(totalPrice.value)}?`,
    acceptLabel: 'Place order',
    rejectLabel: 'Cancel',
    accept: async () => {
      await cart.clear()
      if (cart.error) {
        showError('Could not place order')
        return
      }
      toast.add({
        severity: 'success',
        summary: 'Order placed',
        detail: 'Thanks for your purchase!',
        life: 3000,
      })
    },
  })
}

function handleClear() {
  confirm.require({
    header: 'Clear cart',
    message: 'Remove all items from your cart?',
    acceptLabel: 'Clear',
    rejectLabel: 'Cancel',
    acceptClass: 'p-button-danger',
    accept: async () => {
      await cart.clear()
      if (cart.error) {
        showError('Could not clear cart')
        return
      }
      toast.add({
        severity: 'info',
        summary: 'Cart cleared',
        life: 2000,
      })
    },
  })
}
</script>

<template>
  <CartEmpty v-if="isEmpty" />
  <div v-else :class="'grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start'">
    <CartItemsList :items="items" />
    <CartSummary
      :item-count="totalCount"
      :total="totalPrice"
      @checkout="handleCheckout"
      @clear="handleClear"
    />
  </div>
</template>

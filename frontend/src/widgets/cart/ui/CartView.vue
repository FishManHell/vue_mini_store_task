<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'
import { useCartStore } from '@/entities/cart'
import { formatPrice } from '@/entities/product'
import CartItemsList from './CartItemsList.vue'
import CartSummary from './CartSummary.vue'
import CartEmpty from './CartEmpty.vue'
import { styles } from './CartView.styles'

const cart = useCartStore()
const { items, isEmpty, totalCount, totalPrice } = storeToRefs(cart)

const toast = useToast()
const confirm = useConfirm()

function handleCheckout() {
  confirm.require({
    header: 'Place order',
    message: `Place order for ${formatPrice(String(totalPrice.value))}?`,
    acceptLabel: 'Place order',
    rejectLabel: 'Cancel',
    accept: () => {
      cart.clear()
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
    accept: () => {
      cart.clear()
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
  <div v-else :class="styles.layout">
    <CartItemsList :items="items" />
    <CartSummary
      :item-count="totalCount"
      :total="totalPrice"
      @checkout="handleCheckout"
      @clear="handleClear"
    />
  </div>
</template>

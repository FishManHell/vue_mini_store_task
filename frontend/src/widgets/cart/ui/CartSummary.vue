<script setup lang="ts">
import { CreditCard, Trash2 } from 'lucide-vue-next'
import { formatPrice } from '@/entities/product'
import { styles } from './CartSummary.styles'

interface Props {
  itemCount: number
  total: number
}

defineProps<Props>()

defineEmits<{
  (event: 'checkout'): void
  (event: 'clear'): void
}>()
</script>

<template>
  <aside :class="styles.root" aria-label="Order summary">
    <h2 :class="styles.title">Order summary</h2>

    <div :class="styles.rows">
      <div :class="styles.row">
        <span :class="styles.rowLabel">Items</span>
        <span :class="styles.rowValue">{{ itemCount }}</span>
      </div>
      <div :class="styles.row">
        <span :class="styles.rowLabel">Subtotal</span>
        <span :class="styles.rowValue">{{ formatPrice(String(total)) }}</span>
      </div>
    </div>

    <div :class="styles.divider" />

    <div :class="styles.totalRow">
      <span :class="styles.totalLabel">Total</span>
      <span :class="styles.totalValue">{{ formatPrice(String(total)) }}</span>
    </div>

    <button type="button" :class="styles.checkout" @click="$emit('checkout')">
      <CreditCard :size="18" aria-hidden="true" />
      Checkout
    </button>

    <button type="button" :class="styles.clear" @click="$emit('clear')">
      <Trash2 :size="14" aria-hidden="true" />
      Clear cart
    </button>
  </aside>
</template>

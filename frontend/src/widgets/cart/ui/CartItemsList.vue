<script setup lang="ts">
import { CartItemCard, type CartItem } from '@/entities/cart'
import { styles } from './CartItemsList.styles'

interface Props {
  items: CartItem[]
}

defineProps<Props>()
</script>

<template>
  <ul :class="styles.root">
    <li v-for="item in items" :key="item.id">
      <CartItemCard :item="item" />
    </li>
  </ul>
</template>

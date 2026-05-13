<script setup lang="ts">
import { CartItemCard, type CartItem } from '@/entities/cart'

interface Props {
  items: CartItem[]
}

defineProps<Props>()
</script>

<template>
  <ul :class="'flex flex-col gap-3'">
    <li v-for="item in items" :key="item.id">
      <CartItemCard :item="item" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { CartView } from '@/widgets/cart'
import { styles } from './CartPage.styles'
</script>

<template>
  <h1 :class="styles.title">Cart</h1>
  <CartView />
</template>

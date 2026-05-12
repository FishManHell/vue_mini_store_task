<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowRight, ShoppingBag } from 'lucide-vue-next'
import { AppRoute } from '@/shared/config/router'
import { styles } from './CartEmpty.styles'
</script>

<template>
  <div :class="styles.root" role="status">
    <ShoppingBag :size="40" :class="styles.icon" aria-hidden="true" />
    <h2 :class="styles.title">Your cart is empty</h2>
    <p :class="styles.description">
      Looks like you haven’t added anything yet. Browse the catalog to find your next favorite.
    </p>
    <RouterLink :to="{ name: AppRoute.PRODUCTS }" :class="styles.link">
      Browse products
      <ArrowRight :size="16" aria-hidden="true" />
    </RouterLink>
  </div>
</template>

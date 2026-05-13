<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'
import Badge from 'primevue/badge'
import { ShoppingCart } from 'lucide-vue-next'
import { AppRoute, RoutePaths } from '@/shared/config/router'
import { useCartStore } from '@/entities/cart'
import ThemeToggle from './ThemeToggle.vue'
import { styles } from './AppHeader.styles'

const { totalCount: cartCount } = storeToRefs(useCartStore())
</script>

<template>
  <header :class="styles.header">
    <div :class="styles.container">
      <RouterLink :to="RoutePaths[AppRoute.PRODUCTS]" :class="styles.logo"> Mini Store </RouterLink>

      <nav :class="styles.nav">
        <ThemeToggle />
        <RouterLink :to="RoutePaths[AppRoute.CART]" aria-label="View cart" :class="styles.cartLink">
          <ShoppingCart :size="18" />
          <Badge
            v-if="cartCount > 0"
            :value="cartCount"
            severity="danger"
            :class="styles.cartBadge"
          />
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowLeft, PackageX } from 'lucide-vue-next'
import { AppRoute } from '@/shared/config/router'
import { styles } from './ProductDetailsNotFound.styles'
</script>

<template>
  <div :class="styles.root" role="alert">
    <PackageX :size="40" :class="styles.icon" aria-hidden="true" />
    <h1 :class="styles.title">Product not found</h1>
    <p :class="styles.description">
      The product you are looking for does not exist or may have been removed from the store.
    </p>
    <RouterLink :to="{ name: AppRoute.PRODUCTS }" :class="styles.link">
      <ArrowLeft :size="16" aria-hidden="true" />
      Back to Products
    </RouterLink>
  </div>
</template>

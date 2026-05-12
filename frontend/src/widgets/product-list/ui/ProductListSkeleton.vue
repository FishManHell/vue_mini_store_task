<script setup lang="ts">
import { ProductCardSkeleton } from '@/entities/product'
import { styles } from './ProductList.styles'

const SKELETON_COUNT = 8
</script>

<template>
  <div :class="styles.grid" aria-busy="true" aria-live="polite">
    <ProductCardSkeleton v-for="i in SKELETON_COUNT" :key="i" />
  </div>
</template>

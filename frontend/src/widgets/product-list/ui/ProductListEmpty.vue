<script setup lang="ts">
import { PackageX } from 'lucide-vue-next'
import { styles } from './ProductListEmpty.styles'
</script>

<template>
  <div :class="styles.wrapper">
    <PackageX :size="40" :class="styles.icon" />
    <h2 :class="styles.title">No products found</h2>
    <p :class="styles.description">Try adjusting filters or check back later.</p>
  </div>
</template>

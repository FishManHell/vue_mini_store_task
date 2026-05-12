<script setup lang="ts">
import { styles } from './ProductCardSkeleton.styles'
</script>

<template>
  <div :class="styles.card" aria-hidden="true">
    <div :class="styles.article">
      <div :class="styles.thumbnail" />
      <div :class="styles.body">
        <div :class="styles.badge" />
        <div :class="styles.nameLine1" />
        <div :class="styles.nameLine2" />
        <div :class="styles.descLine1" />
        <div :class="styles.descLine2" />
        <div :class="styles.footer">
          <div :class="styles.price" />
        </div>
      </div>
    </div>
  </div>
</template>

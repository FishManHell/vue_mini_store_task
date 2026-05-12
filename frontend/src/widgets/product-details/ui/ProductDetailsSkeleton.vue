<script setup lang="ts">
import { styles } from './ProductDetailsSkeleton.styles'
</script>

<template>
  <div :class="styles.root" role="status" aria-label="Loading product">
    <div :class="styles.backBar" />

    <div :class="styles.hero">
      <div :class="styles.thumbnail" />

      <div :class="styles.info">
        <div :class="styles.badge" />
        <div :class="styles.nameLine1" />
        <div :class="styles.nameLine2" />
        <div :class="styles.price" />
        <div :class="styles.textLine" />
        <div :class="styles.textLine" />
        <div :class="styles.textLineShort" />
        <div :class="styles.button" />
      </div>
    </div>

    <div :class="styles.section">
      <div :class="styles.sectionTitle" />
      <div :class="styles.textLine" />
      <div :class="styles.textLine" />
      <div :class="styles.textLine" />
      <div :class="styles.textLineShort" />
    </div>

    <div :class="styles.section">
      <div :class="styles.sectionTitle" />
      <div v-for="i in 2" :key="i" :class="styles.reviewItem">
        <div :class="styles.reviewHeader">
          <div :class="styles.reviewAuthor" />
          <div :class="styles.reviewRating" />
        </div>
        <div :class="styles.textLine" />
        <div :class="styles.textLineShort" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AlertTriangle, RotateCw } from 'lucide-vue-next'
import { styles } from './ProductListError.styles'

defineEmits<{
  (event: 'retry'): void
}>()
</script>

<template>
  <div :class="styles.wrapper" role="alert">
    <AlertTriangle :size="40" :class="styles.icon" aria-hidden="true" />
    <h2 :class="styles.title">Could not load products</h2>
    <p :class="styles.description">Check your connection and try again.</p>
    <button type="button" :class="styles.retry" @click="$emit('retry')">
      <RotateCw :size="14" aria-hidden="true" />
      Retry
    </button>
  </div>
</template>

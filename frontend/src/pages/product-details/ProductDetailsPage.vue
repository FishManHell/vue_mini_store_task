<script setup lang="ts">
import { ProductDetails } from '@/widgets/product-details'

interface Props {
  id: string
}

const props = defineProps<Props>()
</script>

<template>
  <ProductDetails :id="props.id" />
</template>

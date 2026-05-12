<script setup lang="ts">
import { computed } from 'vue'
import { Loader2 } from 'lucide-vue-next'
import { ProductCard, type ProductListItem } from '@/entities/product'
import ProductListSkeleton from './ProductListSkeleton.vue'
import ProductListEmpty from './ProductListEmpty.vue'
import { styles } from './ProductList.styles'

interface Props {
  products: ProductListItem[] | null
  isLoading: boolean
}

const props = defineProps<Props>()

const isInitialLoad = computed(() => props.isLoading && props.products === null)
const isEmpty = computed(
  () => !props.isLoading && props.products !== null && props.products.length === 0,
)
const isReloading = computed(
  () => props.isLoading && props.products !== null && props.products.length > 0,
)
</script>

<template>
  <ProductListSkeleton v-if="isInitialLoad" />
  <ProductListEmpty v-else-if="isEmpty" />
  <div v-else>
    <div v-if="isReloading" :class="styles.reloadBar" aria-live="polite">
      <Loader2 :size="14" :class="styles.reloadIcon" />
      <span>Updating…</span>
    </div>
    <div :class="[styles.grid, isReloading && styles.gridDimmed]">
      <ProductCard
        v-for="product in props.products ?? []"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

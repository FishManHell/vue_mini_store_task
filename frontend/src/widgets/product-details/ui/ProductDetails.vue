<script setup lang="ts">
import { toRef } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useProduct, type ProductDetails } from '@/entities/product'
import { useCartStore } from '@/entities/cart'
import ProductDetailsView from './ProductDetailsView.vue'
import ProductDetailsSkeleton from './ProductDetailsSkeleton.vue'
import ProductDetailsNotFound from './ProductDetailsNotFound.vue'

interface Props {
  id: string
}

const props = defineProps<Props>()

const idRef = toRef(props, 'id')
const { product, isLoading, error } = useProduct(idRef)

const cart = useCartStore()
const toast = useToast()

function handleAddToCart(item: ProductDetails) {
  cart.addItem(item)
  toast.add({
    severity: 'success',
    summary: 'Added to cart',
    detail: item.name,
    life: 2500,
  })
}
</script>

<template>
  <ProductDetailsSkeleton v-if="isLoading" />
  <ProductDetailsNotFound v-else-if="error === 'not_found' || product === null" />
  <ProductDetailsView v-else :product="product" @add-to-cart="handleAddToCart" />
</template>

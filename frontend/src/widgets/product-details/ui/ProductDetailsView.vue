<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowLeft, ShoppingCart } from 'lucide-vue-next'
import { AppRoute } from '@/shared/config/router'
import { formatCategory, formatPrice, type ProductDetails } from '@/entities/product'
import ProductDetailsReviews from './ProductDetailsReviews.vue'
import { styles } from './ProductDetailsView.styles'

interface Props {
  product: ProductDetails
}

const props = defineProps<Props>()

defineEmits<{
  (event: 'addToCart', product: ProductDetails): void
}>()
</script>

<template>
  <article :class="styles.root">
    <RouterLink :to="{ name: AppRoute.PRODUCTS }" :class="styles.backLink">
      <ArrowLeft :size="16" aria-hidden="true" />
      Back to Products
    </RouterLink>

    <div :class="styles.hero">
      <div :class="styles.thumbnailWrap">
        <img
          :src="props.product.thumbnailUrl"
          :alt="props.product.name"
          :class="styles.thumbnail"
        />
      </div>

      <div :class="styles.info">
        <span :class="styles.badge">{{ formatCategory(props.product.category) }}</span>
        <h1 :class="styles.name">{{ props.product.name }}</h1>
        <span :class="styles.price">{{ formatPrice(props.product.price) }}</span>
        <p :class="styles.short">{{ props.product.shortDescription }}</p>
        <button type="button" :class="styles.addToCart" @click="$emit('addToCart', props.product)">
          <ShoppingCart :size="18" aria-hidden="true" />
          Add to Cart
        </button>
      </div>
    </div>

    <section :class="styles.section" aria-labelledby="description-title">
      <h2 id="description-title" :class="styles.sectionTitle">About this product</h2>
      <p :class="styles.longDescription">{{ props.product.longDescription }}</p>
    </section>

    <ProductDetailsReviews :reviews="props.product.reviews" />
  </article>
</template>

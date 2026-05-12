<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowUpRight } from 'lucide-vue-next'
import { AppRoute } from '@/shared/config/router'
import type { ProductListItem } from '../model/types'
import { formatCategory, formatPrice } from '../lib/format'
import { styles } from './ProductCard.styles'

interface Props {
  product: ProductListItem
}

const props = defineProps<Props>()
</script>

<template>
  <RouterLink
    :to="{ name: AppRoute.PRODUCT_DETAILS, params: { id: props.product.id } }"
    :aria-label="`View ${props.product.name}`"
    :class="styles.card"
  >
    <article :class="styles.article">
      <div :class="styles.thumbnailWrap">
        <img
          :src="props.product.thumbnailUrl"
          :alt="props.product.name"
          loading="lazy"
          :class="styles.thumbnail"
        />
      </div>

      <div :class="styles.body">
        <span :class="styles.badge">{{ formatCategory(props.product.category) }}</span>
        <h3 :class="styles.name">{{ props.product.name }}</h3>
        <p :class="styles.description">{{ props.product.shortDescription }}</p>
        <div :class="styles.footer">
          <span :class="styles.price">{{ formatPrice(props.product.price) }}</span>
          <ArrowUpRight :size="18" :class="styles.arrow" />
        </div>
      </div>
    </article>
  </RouterLink>
</template>

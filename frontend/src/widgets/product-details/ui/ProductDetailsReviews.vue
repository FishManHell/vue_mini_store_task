<script setup lang="ts">
import { computed } from 'vue'
import { Star } from 'lucide-vue-next'
import type { Review } from '@/entities/product'
import { styles } from './ProductDetailsReviews.styles'

interface Props {
  reviews: Review[]
}

const props = defineProps<Props>()

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
})

const sortedReviews = computed(() =>
  [...props.reviews].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
)

function formatDate(value: string): string {
  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? value : dateFormatter.format(parsed)
}
</script>

<template>
  <section :class="styles.root" aria-labelledby="reviews-title">
    <header :class="styles.header">
      <h2 id="reviews-title" :class="styles.title">Reviews</h2>
      <span v-if="props.reviews.length > 0" :class="styles.count">
        {{ props.reviews.length }} {{ props.reviews.length === 1 ? 'review' : 'reviews' }}
      </span>
    </header>

    <p v-if="props.reviews.length === 0" :class="styles.empty">
      No reviews yet — be the first to share your thoughts.
    </p>

    <ul v-else :class="styles.list">
      <li v-for="review in sortedReviews" :key="review.id" :class="styles.item">
        <div :class="styles.itemHeader">
          <span :class="styles.author">{{ review.author }}</span>
          <span :class="styles.rating" :aria-label="`Rating: ${review.rating} out of 5`">
            <Star
              v-for="i in 5"
              :key="i"
              :size="14"
              :class="i <= review.rating ? styles.starFilled : styles.starEmpty"
              :fill="i <= review.rating ? 'currentColor' : 'none'"
              aria-hidden="true"
            />
          </span>
        </div>
        <p :class="styles.comment">{{ review.comment }}</p>
        <time :class="styles.date" :datetime="review.createdAt">
          {{ formatDate(review.createdAt) }}
        </time>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { Minus, Plus, Trash2 } from 'lucide-vue-next'
import { AppRoute } from '@/shared/config/router'
import { formatCategory, formatPrice } from '@/entities/product'
import type { CartItem } from '../model/types'
import { useCartStore } from '../model/cart-store'
import { styles } from './CartItemCard.styles'

interface Props {
  item: CartItem
}

const props = defineProps<Props>()

const cart = useCartStore()
const toast = useToast()

const canDecrement = computed(() => props.item.quantity > 1)

function notifyIfError() {
  if (cart.error) {
    toast.add({
      severity: 'error',
      summary: 'Could not update cart',
      detail: 'Please try again.',
      life: 3000,
    })
  }
}

async function decrement() {
  if (!canDecrement.value) return
  await cart.updateQuantity(props.item.id, props.item.quantity - 1)
  notifyIfError()
}

async function increment() {
  await cart.updateQuantity(props.item.id, props.item.quantity + 1)
  notifyIfError()
}

async function remove() {
  await cart.removeItem(props.item.id)
  notifyIfError()
}
</script>

<template>
  <article :class="styles.root">
    <RouterLink
      :to="{ name: AppRoute.PRODUCT_DETAILS, params: { id: props.item.id } }"
      :class="styles.thumbnailWrap"
      :aria-label="`View ${props.item.name}`"
    >
      <img :src="props.item.thumbnailUrl" :alt="props.item.name" :class="styles.thumbnail" />
    </RouterLink>

    <div :class="styles.body">
      <div :class="styles.info">
        <RouterLink
          :to="{ name: AppRoute.PRODUCT_DETAILS, params: { id: props.item.id } }"
          :class="styles.link"
        >
          {{ props.item.name }}
        </RouterLink>
        <span :class="styles.category">{{ formatCategory(props.item.category) }}</span>
        <span :class="styles.unitPrice">{{ formatPrice(props.item.price) }} each</span>
      </div>

      <div :class="styles.controls">
        <div :class="styles.qtyGroup" role="group" :aria-label="`Quantity for ${props.item.name}`">
          <button
            type="button"
            :class="styles.qtyButton"
            :disabled="!canDecrement"
            aria-label="Decrease quantity"
            @click="decrement"
          >
            <Minus :size="14" aria-hidden="true" />
          </button>
          <span :class="styles.qtyValue" aria-live="polite">{{ props.item.quantity }}</span>
          <button
            type="button"
            :class="styles.qtyButton"
            aria-label="Increase quantity"
            @click="increment"
          >
            <Plus :size="14" aria-hidden="true" />
          </button>
        </div>

        <span :class="styles.lineTotal">{{ formatPrice(props.item.lineTotal) }}</span>

        <button
          type="button"
          :class="styles.remove"
          :aria-label="`Remove ${props.item.name} from cart`"
          @click="remove"
        >
          <Trash2 :size="16" aria-hidden="true" />
        </button>
      </div>
    </div>
  </article>
</template>

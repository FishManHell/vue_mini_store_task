import type { ProductListItem } from '@/entities/product'

export interface CartItem extends ProductListItem {
  quantity: number
}

import type {Category} from "@/shared/constants/categories";

export interface CartItem {
  id: string
  name: string
  price: string
  thumbnailUrl: string
  shortDescription: string
  category: Category
  quantity: number
  lineTotal: string
}

export interface CartResponse {
  items: CartItem[]
  totalCount: number
  totalPrice: string
}

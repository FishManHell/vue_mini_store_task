import { SORT_ORDER, type SortOrder } from '@/entities/product'
import type { SelectOption } from '@/shared/lib/types/select-option'

export const SORT_OPTIONS: SelectOption<SortOrder>[] = [
  { label: 'Name: A to Z', value: SORT_ORDER.NAME_ASC },
  { label: 'Name: Z to A', value: SORT_ORDER.NAME_DESC },
  { label: 'Price: low to high', value: SORT_ORDER.PRICE_ASC },
  { label: 'Price: high to low', value: SORT_ORDER.PRICE_DESC },
]

import { CATEGORY, type Category } from '@/shared/constants/categories'
import type { SelectOption } from '@/shared/lib/types/select-option'

export const ALL_CATEGORIES = 'all' as const
export type CategoryOptionValue = Category | typeof ALL_CATEGORIES

export const CATEGORY_OPTIONS: SelectOption<CategoryOptionValue>[] = [
  { label: 'All categories', value: ALL_CATEGORIES },
  { label: 'E-book', value: CATEGORY.EBOOK },
  { label: 'Software License', value: CATEGORY.SOFTWARE_LICENSE },
  { label: 'Online Course', value: CATEGORY.ONLINE_COURSE },
  { label: 'Template', value: CATEGORY.TEMPLATE },
]

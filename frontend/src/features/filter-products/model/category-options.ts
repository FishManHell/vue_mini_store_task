import { CATEGORY, type Category } from '@/shared/constants/categories'
import type { SelectOption } from '@/shared/lib/types/select-option'

export const CATEGORY_OPTIONS: SelectOption<Category | null>[] = [
  { label: 'All categories', value: null },
  { label: 'E-book', value: CATEGORY.EBOOK },
  { label: 'Software License', value: CATEGORY.SOFTWARE_LICENSE },
  { label: 'Online Course', value: CATEGORY.ONLINE_COURSE },
  { label: 'Template', value: CATEGORY.TEMPLATE },
]

import type { Category } from '../model/types'

const CATEGORY_LABELS: Record<Category, string> = {
  ebook: 'E-book',
  software_license: 'Software License',
  online_course: 'Online Course',
  template: 'Template',
}

export function formatCategory(category: Category): string {
  return CATEGORY_LABELS[category]
}

export function formatPrice(price: string, currency = 'USD'): string {
  const value = Number(price)
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(value)
}

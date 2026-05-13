import { describe, expect, it } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'
import ProductCard from './ProductCard.vue'
import { AppRoute } from '@/shared/config/router'
import type { ProductListItem } from '../model/types'

const product: ProductListItem = {
  id: 'p-42',
  name: 'The Pragmatic Programmer',
  price: '29.99',
  thumbnailUrl: 'https://example.test/thumb.png',
  shortDescription: 'A timeless guide',
  category: 'ebook',
}

function renderCard(overrides: Partial<ProductListItem> = {}) {
  return mount(ProductCard, {
    props: { product: { ...product, ...overrides } },
    global: { stubs: { RouterLink: RouterLinkStub } },
  })
}

describe('ProductCard', () => {
  it('renders product name, formatted price, description and category label', () => {
    const wrapper = renderCard()

    expect(wrapper.get('h3').text()).toBe('The Pragmatic Programmer')
    expect(wrapper.text()).toContain('$29.99')
    expect(wrapper.text()).toContain('A timeless guide')
    expect(wrapper.text()).toContain('E-book')
  })

  it('renders a thumbnail with alt text matching the product name', () => {
    const wrapper = renderCard()
    const img = wrapper.get('img')

    expect(img.attributes('src')).toBe('https://example.test/thumb.png')
    expect(img.attributes('alt')).toBe('The Pragmatic Programmer')
    expect(img.attributes('loading')).toBe('lazy')
  })

  it('links to the product detail route with the product id', () => {
    const wrapper = renderCard({ id: 'p-99' })
    const link = wrapper.findComponent(RouterLinkStub)

    expect(link.props('to')).toEqual({
      name: AppRoute.PRODUCT_DETAILS,
      params: { id: 'p-99' },
    })
    expect(link.attributes('aria-label')).toBe('View The Pragmatic Programmer')
  })
})

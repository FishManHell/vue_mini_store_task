<script setup lang="ts">
import { useProducts } from '@/entities/product'
import { ProductFiltersPanel, useFilters } from '@/features/filter-products'
import { ProductList } from '@/widgets/product-list'
import { styles } from './ProductsPage.styles'

const { filters } = useFilters()
const { products, isLoading, error, reload } = useProducts(filters)
</script>

<template>
  <h1 :class="styles.title">Products</h1>
  <ProductFiltersPanel />
  <ProductList
    :products="products"
    :is-loading="isLoading"
    :error="error"
    @retry="reload"
  />
</template>

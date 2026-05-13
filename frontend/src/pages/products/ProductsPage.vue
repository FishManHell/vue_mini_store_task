<script setup lang="ts">
import { useProducts } from '@/entities/product'
import { ProductFiltersPanel, useFilters } from '@/features/filter-products'
import { ProductList } from '@/widgets/product-list'

const { filters } = useFilters()
const { products, isLoading, error, reload } = useProducts(filters)
</script>

<template>
  <h1 :class="'mb-6 text-3xl font-bold tracking-tight text-primary md:mb-10 md:text-4xl'">Products</h1>
  <ProductFiltersPanel />
  <ProductList
    :products="products"
    :is-loading="isLoading"
    :error="error"
    @retry="reload"
  />
</template>

<script setup lang="ts">
import {onUnmounted, ref, watch} from 'vue'
import Select from 'primevue/select'
import { Search } from 'lucide-vue-next'
import { useFilters } from '../model/use-filters'
import { CATEGORY_OPTIONS } from '../model/category-options'
import { SORT_OPTIONS } from '../model/sort-options'
import { styles } from './ProductFiltersPanel.styles'

const SEARCH_DEBOUNCE_MS = 300

const { filters, setSearch, setCategory, setSort } = useFilters()

const localSearch = ref(filters.search)
let searchTimer: ReturnType<typeof setTimeout> | null = null
watch(localSearch, (value) => {
  if (searchTimer) clearTimeout(searchTimer)
  searchTimer = setTimeout(() => setSearch(value), SEARCH_DEBOUNCE_MS)
})

onUnmounted(() => {
  if (searchTimer) clearTimeout(searchTimer)
})
</script>

<template>
  <div :class="styles.panel">
    <div :class="styles.searchWrap">
      <Search :size="16" :class="styles.searchIcon" />
      <input
        v-model="localSearch"
        type="text"
        placeholder="Search products…"
        aria-label="Search products"
        :class="styles.searchInput"
      />
    </div>

    <Select
      :model-value="filters.category"
      :options="CATEGORY_OPTIONS"
      option-label="label"
      option-value="value"
      placeholder="Category"
      aria-label="Filter by category"
      :class="styles.select"
      @update:model-value="setCategory"
    />

    <Select
      :model-value="filters.sort"
      :options="SORT_OPTIONS"
      option-label="label"
      option-value="value"
      placeholder="Sort by"
      aria-label="Sort products"
      :class="styles.select"
      @update:model-value="setSort"
    />
  </div>
</template>

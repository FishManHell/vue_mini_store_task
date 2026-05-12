<script setup lang="ts">
import { Sun, Moon } from 'lucide-vue-next'
import { useTheme } from '@/shared/lib/theme'
import { styles } from './ThemeToggle.styles'

const { isDark, toggle } = useTheme()
</script>

<template>
  <button
    type="button"
    @click="toggle"
    :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
    :class="styles.button"
  >
    <Sun v-if="isDark" :size="18" />
    <Moon v-else :size="18" />
  </button>
</template>

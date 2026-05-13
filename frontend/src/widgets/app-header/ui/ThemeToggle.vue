<script setup lang="ts">
import { Sun, Moon } from 'lucide-vue-next'
import { useTheme } from '@/shared/lib/theme'

const { isDark, toggle } = useTheme()
</script>

<template>
  <button
    type="button"
    @click="toggle"
    :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
    :class="'inline-flex ' +
     'h-10 w-10 ' +
      'items-center ' +
       'justify-center ' +
        'rounded-lg ' +
         'text-secondary ' +
          'transition-colors ' +
           'duration-200 ' +
            'hover:bg-surface-hover ' +
             'hover:text-primary ' +
              'focus-visible:outline-none ' +
               'focus-visible:ring-2 focus-visible:ring-accent'"
  >
    <Sun v-if="isDark" :size="18" />
    <Moon v-else :size="18" />
  </button>
</template>

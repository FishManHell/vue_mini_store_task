<script setup lang="ts">
import { RouterView } from 'vue-router'
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import { AppHeader } from '@/widgets/app-header'
import { styles } from './App.styles'
</script>

<template>
  <AppHeader />
  <main :class="styles.main">
    <RouterView />
  </main>
  <Toast />
  <ConfirmDialog />
</template>

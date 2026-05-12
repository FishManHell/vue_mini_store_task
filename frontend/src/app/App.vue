<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import { AppHeader } from '@/widgets/app-header'
import { useCartStore } from '@/entities/cart'
import { styles } from './App.styles'

const cart = useCartStore()

onMounted(() => {
  cart.load()
})
</script>

<template>
  <AppHeader />
  <main :class="styles.main">
    <RouterView />
  </main>
  <Toast />
  <ConfirmDialog />
</template>

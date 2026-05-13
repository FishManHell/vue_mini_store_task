<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import { AppHeader } from '@/widgets/app-header'
import { useCartStore } from '@/entities/cart'

const cart = useCartStore()

onMounted(() => {
  cart.load()
})
</script>

<template>
  <AppHeader />
  <main :class="'mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-10'">
    <RouterView />
  </main>
  <Toast />
  <ConfirmDialog />
</template>

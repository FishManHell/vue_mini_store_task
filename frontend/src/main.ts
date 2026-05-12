import { createApp } from 'vue'
import Aura from '@primeuix/themes/aura';
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
import PrimeVue from 'primevue/config';
import { pinia } from '@/app/pinia'
import App from './app/App.vue'
import {router} from "@/app/router";
import { applyInitialTheme } from '@/shared/lib/theme'
import '@/app/styles/main.css'

applyInitialTheme()

const app = createApp(App)
app.use(PrimeVue, {
  ripple: true,
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.dark',
    },
  },
})

app.use(pinia)
app.use(ToastService)
app.use(ConfirmationService)
app.use(router)

app.mount('#app')

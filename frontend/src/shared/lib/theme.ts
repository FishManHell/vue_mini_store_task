import { ref } from 'vue'

const THEME_KEY = 'theme'
const DARK_CLASS = 'dark'

type Theme = 'light' | 'dark'

function readStoredTheme(): Theme | null {
  const value = localStorage.getItem(THEME_KEY)
  return value === 'dark' || value === 'light' ? value : null
}

function readSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function resolveInitialTheme(): Theme {
  return readStoredTheme() ?? readSystemTheme()
}

export function applyInitialTheme(): void {
  const theme = resolveInitialTheme()
  document.documentElement.classList.toggle(DARK_CLASS, theme === 'dark')
}

const isDark = ref(resolveInitialTheme() === 'dark')

function setDark(value: boolean): void {
  isDark.value = value
  document.documentElement.classList.toggle(DARK_CLASS, value)
  localStorage.setItem(THEME_KEY, value ? 'dark' : 'light')
}

export function useTheme() {
  return {
    isDark,
    toggle: () => setDark(!isDark.value),
  }
}

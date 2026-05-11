import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,ts,tsx,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter Variable', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config

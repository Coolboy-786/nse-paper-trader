import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace 'nse-paper-trader' below with your exact GitHub repository name
// e.g. if your repo URL is github.com/yourname/my-trader  →  base: '/my-trader/'
export default defineConfig({
  plugins: [react()],
  base: '/nse-paper-trader/',
})

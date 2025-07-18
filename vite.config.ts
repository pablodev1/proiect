import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path' // Asigură-te că ai importat 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // REPARAȚIE: Adaugă această secțiune 'resolve'
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
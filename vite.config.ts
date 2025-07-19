import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// REPARAȚIE: Importăm ce ne trebuie din 'node:url' pentru o rezolvare modernă a căilor
import { URL, fileURLToPath } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // REPARAȚIE: Folosim noua metodă, bazată pe URL, pentru a defini alias-ul.
      // Aceasta funcționează corect în toate mediile moderne.
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
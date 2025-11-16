import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Ajuste conforme a URL das suas APIs
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api/catalog': 'http://localhost:8000',   // catalog-service
      '/api/orders': 'http://localhost:8001'     // order-service
    }
  }
})

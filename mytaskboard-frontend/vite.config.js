import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify('http://45.77.172.27:8080')
  },
  server: {
    host: '0.0.0.0',
    port: 3000
  }
})

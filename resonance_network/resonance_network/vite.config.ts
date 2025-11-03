import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/analytics': {
        target: 'https://https://alexisacui47.lastapp.dev',
        changeOrigin: true,
        secure: true,
      },
      '/api': {
        target: 'https://alexisacui47.lastapp.dev',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
})
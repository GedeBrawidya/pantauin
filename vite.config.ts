import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss() ],
  server: {
    proxy: {
      // Semua request ke /api/tasks* akan diteruskan ke backend
      '/api': {
        target: 'http://20.205.22.220:3000',
        changeOrigin: true,
        secure: false,
        // Tidak perlu rewrite jika path sama
      },
    },
  },
})



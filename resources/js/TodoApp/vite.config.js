import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: 
  [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/app': 'http://localhost',
    },
    hmr: {
      port: 3000,
    },
  },
  build: {
    outDir: 'public/build',
  },
});

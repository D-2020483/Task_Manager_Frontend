import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import Path from 'path'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': Path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})

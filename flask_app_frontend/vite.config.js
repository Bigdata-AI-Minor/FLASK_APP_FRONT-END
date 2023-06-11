import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteFS from 'vite-fs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), ViteFS()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

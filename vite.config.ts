import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: [
      'chrome100',
      'firefox100',
      'es2017'
    ],
    manifest: 'manifest.json',
    rollupOptions: {
      input: {
        // jsを指定するとhtmlが生成されない
        app: resolve(__dirname, 'index.html')
      },
      output: {
        manualChunks: {
          react: ['react'],
        },
      },
    },
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: [
      'chrome100',
      'firefox100'
    ],
    manifest: 'manifest.json',
    rollupOptions: {
      input: {
        app: './src/main.tsx'
      },
      output: {
        manualChunks: {
          react: ['react'],
        },
      },
    },
  }
})

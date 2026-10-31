import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: 'src/content/index.tsx',
      output: {
        format: 'iife',
        name: 'WhatsAppImageRotator',
        entryFileNames: 'content.js',
      },
    },
  },
})

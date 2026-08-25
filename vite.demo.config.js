import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

/**
 * Demo build: bundles the entire site (JS + CSS) into ONE portable
 * dist-demo/index.html that runs from anywhere — no server needed.
 * Checkout falls back to a local mock confirmation automatically.
 *
 *   npm run build:demo
 */
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  define: { 'import.meta.env.VITE_SINGLEFILE': JSON.stringify('1') },
  build: { outDir: 'dist-demo' },
})

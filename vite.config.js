import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// base './' makes the build work from any path: GitHub Pages project
// sites (/Coco-Drapes/), a custom domain at the root, or a local file.
export default defineConfig({
  plugins: [react()],
  base: './',
})

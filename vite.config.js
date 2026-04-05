import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        poolremoval: resolve(__dirname, 'pool-removal/index.html'),
        pooldemolition: resolve(__dirname, 'pool-demolition/index.html'),
        poolremovalcost: resolve(__dirname, 'pool-removal-cost/index.html'),
        about: resolve(__dirname, 'about/index.html'),
        contact: resolve(__dirname, 'contact/index.html'),
        blog: resolve(__dirname, 'blog/index.html'),
        blogcost: resolve(__dirname, 'blog/scottsdale-pool-removal-cost-guide-2026/index.html'),
        blogpartial: resolve(__dirname, 'blog/full-vs-partial-pool-removal-arizona/index.html'),
        blogprep: resolve(__dirname, 'blog/how-to-prepare-your-yard-scottsdale/index.html'),
      }
    }
  }
})

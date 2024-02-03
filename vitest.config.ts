/// <reference types="vitest" />

import { getViteConfig } from 'astro/config';
import Vue from '@vitejs/plugin-vue'
import preact from '@preact/preset-vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { fileURLToPath, URL } from 'url'

export default getViteConfig({
  plugins: [
    preact(),
    Vue(),
    svelte({ hot: !process.env.VITEST }),
  ],
  resolve: {
    // react-router-dom specifies "module" field in package.json for ESM entry
    // if it's not mapped, it uses the "main" field which is CommonJS that redirects to CJS preact
    mainFields: ['module'],
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url))
      },
    ]
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test/setup.ts'
  },
})
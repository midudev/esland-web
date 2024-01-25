import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import preact from "@astrojs/preact";
import i18n from "./src/i18n/config";
import svelte from '@astrojs/svelte';
import auth from "auth-astro";

import vue from "@astrojs/vue";
// https://astro.build/config

export default defineConfig({
  integrations: [
    tailwind(),
    preact(),
    auth(),
    vue(),
    svelte()
  ],
  i18n,
  trailingSlash: "never",
  output: "server",
  adapter: vercel(),
  build: {
    assets: 'assets'
  },
  redirects: i18n.routing.prefixDefaultLocale ? {
    '/': `/${i18n.defaultLocale}`
  } : undefined
});
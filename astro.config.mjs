import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import preact from "@astrojs/preact";
import i18n from './src/i18n';
import auth from "auth-astro";

// https://astro.build/config
const config = {
  integrations: [
    tailwind(),
    preact(),
    auth()
  ],
  i18n,
  trailingSlash: "never",
  output: "server",
  adapter: vercel(),
  build: {
    assets: 'assets'
  }
};

if (i18n.routing.prefixDefaultLocale) {
  config.redirects = {
    '/': `/${i18n.defaultLocale}`
  }
}

export default defineConfig(config);
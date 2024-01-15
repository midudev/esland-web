import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import preact from "@astrojs/preact";
import i18n from './src/i18n';
import auth from "auth-astro";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), preact(), auth()],
  i18n,
  trailingSlash: "never",
  output: "server",
  adapter: vercel(),
});
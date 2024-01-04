import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), preact()],
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'ca'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  output: "server",
  adapter: vercel()
});
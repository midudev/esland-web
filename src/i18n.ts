const config = {
  defaultLocale: "es",
  locales: ["es", "en", "ca"],
  routing: {
    prefixDefaultLocale: true,
  },
};

export function needPrefix (locale: string): boolean {
  return config.routing.prefixDefaultLocale || locale !== config.defaultLocale;
}

export default config;
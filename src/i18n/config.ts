// NO TENGO NI PUTA IDEA DE LO QUE PASA CON ASTRO PERO TENGO
// QUE DEJARLO ASI PARA QUE TRABAJE EN EL BUILD

type Locale = {
  name: string;
  routes: string[];
};

const components = [
  "vota",
  "info",
  "archivo",
  "aviso-legal",
  "privacidad",
  "cookies",
];

const LOCALES: Record<string, Locale> = {
  es: {
    name: "Español",
    routes: components,
  },
  en: {
    name: "English",
    routes: [
      "vote",
      "information",
      "archive",
      "legal-notice",
      "privacy",
      "cookies",
    ],
  },
  ca: {
    name: "Català",
    routes: [
      "vota",
      "informacio",
      "arxiu",
      "avis-legal",
      "privacitat",
      "cookies",
    ],
  },
};

const config = {
  defaultLocale: "es",
  locales: Object.keys(LOCALES),
  routing: {
    prefixDefaultLocale: false,
  },
};

export function split(currentLocale: string) {
  const currentLocaleData = LOCALES[currentLocale];
  const otherLocales = structuredClone(LOCALES);
  delete otherLocales[currentLocale];
  return [
    currentLocaleData,
    otherLocales
  ]
}

export function needPrefix(locale: string): boolean {
  return config.routing.prefixDefaultLocale || locale !== config.defaultLocale;
}

export function trimSlash(path: string): string {
  return path.replace(/^\/|\/+$/g, "");
}

export function getComponentPath(locale: string, path: string) {
  path = trimSlash(path);
  if (needPrefix(locale)) {
    path = path.substring(3);
  }
  const index = LOCALES[locale].routes.indexOf(path);
  return index === -1 ? '/' : components[index];
}

export function getRelativeLocaleUrl(locale: string, path: string) {
  path = trimSlash(path);
  if (locale in LOCALES) {
    const index = components.indexOf(path);
    if (index !== -1) {
      const { routes } = LOCALES[locale];
      path = routes[index] || path;
    }
  }
  path = `/${path}`;
  if (needPrefix(locale)) {
    path = `/${locale}${path}`;
  }
  return path !== "/" ? path.replace(/\/+$/, "") : path;
}

export default config;

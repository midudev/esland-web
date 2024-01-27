// NO TENGO NI PUTA IDEA DE LO QUE PASA CON ASTRO PERO TENGO
// QUE DEJARLO ASI PARA QUE TRABAJE EN EL BUILD

type Locale = {
  name: string;
  routes: string[];
};

interface Route {
  params: { slug: string | undefined };
}

const components = [
  "vota",
  "info",
  "archivo",
  "aviso-legal",
  "privacidad",
  "cookies",
];

const INDEX_COMPONENT = "inicio";

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
  return [currentLocaleData, otherLocales];
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
  return index === -1 ? "/" : components[index];
}

export function getRelativeLocaleUrl(locale: string | undefined, path: string) {
  if (!locale || path.startsWith('#') || /^https?:\/\//.test(path)) {
    return path
  }
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

export async function getRoutesAndPages(
  resolveComponents: () => Promise<Record<string, any>>
) {
  const components = (await resolveComponents()).reduce(
    //@ts-ignore
    (acc: { [key: string]: any }, entry) => {
      if (entry.url) {
        const url = entry.url.replace("/", "")
          .replace(".html", "")
          .toLowerCase()
          .replace("/index", "");
        acc[url] = entry.default;
      }
      return acc;
    },
    {}
  );

  const pages: Record<string, any> = {};

  const routes = config.locales.reduce((acc: Route[], lang: string) => {
    const needPrefix =
      lang !== config.defaultLocale || config.routing.prefixDefaultLocale;
    for (const [path, component] of Object.entries(components)) {
      let slug: string | undefined = path;
      if (slug === INDEX_COMPONENT) {
        slug = needPrefix ? lang : undefined;
      } else if (needPrefix) {
        slug = getRelativeLocaleUrl(lang, slug).substring(1);
      }
      acc.push({
        params: { slug },
      });
      pages[slug === undefined ? INDEX_COMPONENT : slug] = component;
    }
    if (needPrefix && lang === config.defaultLocale) {
      acc.push({
        params: { slug: undefined },
      });
    }
    return acc;
  }, []);

  return [
    {
      resolve(slug?: string) {
        if (slug?.endsWith('/')) {
          slug = slug.slice(0, -1);
        }
        if (!slug) {
          slug = INDEX_COMPONENT;
        }
        return pages[slug];
      },
    },
    routes,
  ];
}

export default config;

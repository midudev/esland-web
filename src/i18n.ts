const config = {
  defaultLocale: "es",
  locales: ["es", "en", "ca"],
  routing: {
    prefixDefaultLocale: true,
  },
};

const routes: Record<string, any> = {
  es: {
    vota: "vota",
    info: "informacion",
    archivo: "archivo",
    "aviso-legal": "aviso-legal",
    privacidad: "privacidad",
    cookies: "cookies",
  },
  en: {
    vota: "vote",
    info: "information",
    archivo: "archive",
    "aviso-legal": "legal-notice",
    privacidad: "privacy",
    cookies: "cookies",
  },
  ca: {
    vota: "vota",
    info: "informacio",
    archivo: "arxiu",
    "aviso-legal": "avis-legal",
    privacidad: "privacitat",
    cookies: "cookies",
  },
};

export const LOCALES: Record<string, { code: string; name: string }> = {
  ca: {
    code: "ca",
    name: "Català",
  },
  en: {
    code: "en",
    name: "English",
  },
  es: {
    code: "es",
    name: "Español",
  },
};

export function needPrefix(locale: string): boolean {
  return config.routing.prefixDefaultLocale || locale !== config.defaultLocale;
}

function trimSlash(path: string) {
  if (path.startsWith("/")) {
    path = path.substring(1);
  }
  return path.replace(/\/+$/, "");
}

export function getRelativeLocaleUrl(locale: string, path: string) {
  path = trimSlash(path);
  if (locale in routes) {
    const paths = routes[locale];
    path = paths[path] || path;
  }
  path = `/${path}`;
  if (needPrefix(locale)) {
    path = `/${locale}${path}`;
  }
  return path !== "/" ? path.replace(/\/+$/, "") : path;
}

export function getPathByLocale(path: string) {
  const [, lang] = path.split("/");
  if (lang in routes) return lang;
  return config.defaultLocale;
}

export function geRealPath(locale: string, path: string) {
  path = trimSlash(path);
  if (needPrefix(locale)) {
    path = path.substring(3);
  }
  if (locale in routes) {
    const paths = routes[locale];
    path = paths[path] || path;
    path = Object.keys(paths).find((key) => paths[key] === path) || path;
  }
  return path;
}

export default config;

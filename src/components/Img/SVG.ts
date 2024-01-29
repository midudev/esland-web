import { normalize } from "./Resolver";

const CACHE: Record<string, any> = import.meta.glob(
  "/src/assets/images/**/*.svg",
  {
    as: "raw",
    import: "default",
    eager: true,
  }
);

function replaceString(replace: string, regex: RegExp, value: string) {
  const res = replace.replace(regex, value);
  if (res !== replace) {
    replace = res;
  } else {
    replace += ` ${value}`;
  }
  return replace
}

export function resolve(src: string, attrs: Record<string, any>) {
  if (!src.endsWith('.svg')) {
    src = src + '.svg';
  }
  src = normalize(src);
  const svg = CACHE[src]
  if (!svg) {
    throw `Not found svg in: ${src}`;
  }
  let search: RegExpMatchArray | string | null = svg.match(/<svg([^>]+)/gi);
  if (search === null) {
    throw `Not found svg in: ${src}`;
  }
  search = search[0];
  let replace = search;
  for (const [key, value] of Object.entries(attrs)) {
    if (value !== undefined) {
      replace = replaceString(
        replace,
        new RegExp(`${key}="([^"]+)"`, "g"),
        `${key}="${value}"`
      )
    }
  }
  return svg.replace(search, replace);
}

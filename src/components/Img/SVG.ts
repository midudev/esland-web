import { normalize } from "./Resolver";

export interface Props {
  src: string;
  width?: number | string;
  height?: number | string;
  class?: string;
  hidden?: boolean;
  label?:string
}

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

function toObject(svg: string) {
  const regex = new RegExp(/<svg([^>]+)>(.+?)<\/svg>/, 'gis');
  const match = regex.exec(svg);
  const object: { attrs: Record<string, string | number>, children: string } = {
    attrs: {},
    children: ''
  }
  if (match !== null) {
    const [, attrs, content] = match;
    object.attrs = attrs.trim().match(/(\S+)="(.+?)"/g)?.reduce((
      acc: Record<string, string | number>,
      attr: string
    ) => {
      const [name, value] = attr.split("=")

      return {
        ...acc,
        [name]: value.replace(/"/g, '')
      };
    }, {}) as Record<string, string | number>
    object.children = content
  }

  return object
}

export function resolve(src: string, attrs: Record<string, any> = {}, asString = true) {
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
  const content = svg.replace(search, replace);

  return asString ? content : toObject(content)
}

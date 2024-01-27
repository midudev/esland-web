import path from "node:path";
import fs from "node:fs/promises";

const ROOT = '/src/assets/images';
const isProd = import.meta.env.MODE === "production";

const IMAGES: Record<string, any> = import.meta.glob(
    `/src/assets/images/**/*.{png,jpg,webp,svg}`,
    {
      import: "default",
      eager: true,
    }
);

const SVG: Record<string, string> = {};

function resolveSrc(src: string) {
  if (!src.startsWith("/")) {
    src = "/" + src;
  }
  if (!src.startsWith(ROOT)) {
    src = `${ROOT}${src}`
  }
  return src;
}

export function resolve(src: string, returnSrc: boolean = false) {

  src = resolveSrc(src);
  const img = IMAGES[src];
  if (!img) {
    throw "error: not find image -> " + src
  }
  return returnSrc ? img.src : img;
}

export async function svg(src: string): Promise<string> {
  if (!src.endsWith('.svg')) {
    src = src + '.svg';
  }
  src = resolveSrc(src);

  if (Object.hasOwn(SVG, src)) {
    return SVG[src];
  }
  let filePath = resolve(src, true).replace("/@fs", "");
  const parts = path.parse(src);
  let name = parts.name;
  if (isProd) {
    filePath = `./dist${filePath}`;
  } else {
    filePath = filePath.substring(0, filePath.indexOf(".svg?")) + ".svg";
  }
  const content = await fs.readFile(filePath, "utf-8");
  return SVG[name] = content as string;
}
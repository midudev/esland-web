import { Glob } from 'bun';
import sharp from 'sharp';
import { join, dirname, extname, basename } from 'node:path';
import { rm } from 'node:fs/promises';

const glob = new Glob('public/**/gallery/*.jpg');

const shouldRemove = (str: string = '') => str.toLowerCase().startsWith('rm');
const remove = shouldRemove(process.argv[2]?.toLowerCase());

for await (const file of glob.scan('.')) {
  console.info(`Converting ${file}`);
  const ext = extname(file);
  const fileWithoutExt = basename(file, ext);
  const dir = dirname(file);
  const webpFile = join(dir, fileWithoutExt) + '1-1.webp';
  const convert = sharp(file)
    .trim({ threshold: 0 }) // This removes transparent pixels
    .webp({
      lossless: true,
      quality: 100
    });

  await convert.toFile(webpFile);
  console.info(`Converted to ${webpFile}`);
}

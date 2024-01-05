import { Glob } from 'bun';
import sharp from 'sharp';
import { join, dirname, extname, basename } from 'node:path';
import { rm } from 'node:fs/promises';

const glob = new Glob('public/**/*.{jpg,jpeg,png}');

const replaceExtWithDot = (newExtWithDot: string, { inFilePath }: { inFilePath: string }) => join(dirname(inFilePath), basename(inFilePath, extname(inFilePath))) + newExtWithDot;
const shouldRemove = (str: string = '') => str.toLowerCase().startsWith('rm');
const remove = shouldRemove(process.argv[2]?.toLowerCase());

for await (const file of glob.scan('.')) {
  console.info(`Converting ${file}`);
  const newFilePath = replaceExtWithDot('.webp', { inFilePath: file });
  const convert = sharp(file)
    // .trim({ threshold: 0 }) // This removes transparent pixels
    .webp({
      lossless: true,
      quality: 100
    });

  await convert.toFile(newFilePath);
  console.info(`Converted to ${newFilePath}`);

  if (remove) {
    console.log(`Removing old file ${file}`)
    await rm(file, { force: true })
  }
}
import { Glob } from 'bun';
import sharp from 'sharp';
import { join, dirname, extname, basename } from 'node:path';
import { rm } from 'node:fs/promises';

const glob = new Glob('public/**/gallery/*.jpg');

const shouldRemove = (str: string = '') => str.toLowerCase().startsWith('rm');
const remove = shouldRemove(process.argv[2]?.toLowerCase());

const WIDTH = 365;
const HEIGHT = 365;

for await (const file of glob.scan('.')) {
  console.info(`Removing background of image ${file}`)
  console.info(`Converting ${file} to webp`);
  const ext = extname(file);
  const fileWithoutExt = basename(file, ext);
  const dir = dirname(file);
  const filePathWithoutExt = join(dir, fileWithoutExt);
  const webpFile = filePathWithoutExt + '.webp'; // original as webp
  const thumbnailFile = filePathWithoutExt + '-thumb.webp';
  const convertOriginal = sharp(file);

  const originalDetails = await convertOriginal
    .webp({
      lossless: true,
      quality: 100
    })
    .toFile(webpFile);
  console.info(`Converted to ${webpFile}`, { details: originalDetails });

  const thumbnail = await convertOriginal
    .resize(WIDTH, HEIGHT, {
      fit: 'cover',
      position: sharp.strategy.entropy,
    }).toFile(thumbnailFile);
  console.info(`Created thumbnail ${thumbnailFile}`, { details: thumbnail });

  if (remove) {
    rm(file, { force: true });
  }
}

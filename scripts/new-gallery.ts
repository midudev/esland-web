import { Glob } from 'bun';
import { join, dirname, extname, basename } from 'node:path';
import { rm } from 'node:fs/promises';
import { removeBackground } from '@imgly/background-removal-node';


const glob = new Glob('public/**/gallery/*thumb.webp');
const publicPath = 'file://' + join(process.cwd(), 'node_modules', '@imgly/background-removal-node', 'dist') + '/';
const replaceExtWithDot = (newExtWithDot: string, { inFilePath }: { inFilePath: string }) => join(dirname(inFilePath), basename(inFilePath, extname(inFilePath))) + newExtWithDot;
const tabinfo = (msg: string, n = 1) => console.info(`${`\t`.repeat(n)}⚬${msg}`)

for await (const file of glob.scan('.')) {
  // Remove background
  console.info(`Creating thumbnail without a background for ${basename(file)}`);
  const noBgImgBuff = await removeBackground(file, {
    publicPath,
    model: 'medium',
    output: {
      quality: 1,
      format: "image/webp"
    }
  }).then(data => data.arrayBuffer());
  const filePathWithoutBgThumb = replaceExtWithDot('-nobg.webp', { inFilePath: file });
  await Bun.write(filePathWithoutBgThumb, noBgImgBuff);
  tabinfo(`Image without background created\n`)
}
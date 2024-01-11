// import votingEditions from '@/data/editions-vote.json';
// import { join, basename, extname, dirname } from 'node:path';
// import { mkdir } from 'node:fs/promises';
// import sharp from 'sharp';
// import { getVotingImageURL } from './src/voting-3rd-edition-image-urls';

// const basePath = join('public', 'archivo-page');
// const downloadImg = async (url: string) => fetch(url).then(res => res.arrayBuffer());
// const replaceExtWithDot = (newExtWithDot: string, { inFilePath }: { inFilePath: string }) => join(dirname(inFilePath), basename(inFilePath, extname(inFilePath))) + newExtWithDot;

// const editionBasePath = join(basePath, edition, 'voting-assets');
// await mkdir(editionBasePath, { recursive: true });

// for (const { candidatos } of info) {
//   for (const { imagen } of candidatos) {
//     const imageUrl = getVotingImageURL(imagen).href;
//     const imgBuff = await downloadImg(imageUrl);
//     const imagePathPNG = join(editionBasePath, imagen);
//     const imagePathWEBP = replaceExtWithDot('.webp', { inFilePath: imagePathPNG });
//     await sharp(imgBuff).webp({
//       quality: 60,
//     }).toFile(imagePathWEBP);
//   }
// }
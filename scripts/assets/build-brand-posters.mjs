import sharp from "sharp";

const [inputPath, avifPath, webpPath] = process.argv.slice(2);

if (!inputPath || !avifPath || !webpPath) {
  throw new Error("Expected input PNG, AVIF output, and WebP output paths.");
}

const source = sharp(inputPath, { failOn: "error" });
const metadata = await source.metadata();

await Promise.all([
  sharp(inputPath).avif({ chromaSubsampling: "4:4:4", effort: 9, quality: 68 }).toFile(avifPath),
  sharp(inputPath).webp({ effort: 6, quality: 92, smartSubsample: true }).toFile(webpPath),
]);

console.log(
  JSON.stringify({
    source: inputPath,
    sourceWidth: metadata.width,
    sourceHeight: metadata.height,
    avif: avifPath,
    webp: webpPath,
  }),
);

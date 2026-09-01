import { NodeIO } from "@gltf-transform/core";
import { EXTTextureWebP } from "@gltf-transform/extensions";
import sharp from "sharp";

const [inputPath, outputPath] = process.argv.slice(2);

if (!inputPath || !outputPath) {
  throw new Error("Expected input and output GLB paths.");
}

const io = new NodeIO().registerExtensions([EXTTextureWebP]);
const document = await io.read(inputPath);
const textures = document.getRoot().listTextures();
document.createExtension(EXTTextureWebP).setRequired(true);

for (const texture of textures) {
  const image = texture.getImage();
  if (!image) {
    throw new Error(`Texture ${texture.getName() || "(unnamed)"} has no image data.`);
  }

  const normalized = sharp(image, { failOn: "error" }).toColorspace("srgb");
  const webp = await normalized.webp({ effort: 6, lossless: true }).toBuffer();

  texture.setImage(webp).setMimeType("image/webp");
}

await io.write(outputPath, document);

console.log(
  JSON.stringify({
    input: inputPath,
    output: outputPath,
    textures: textures.length,
    encoding: "lossless-webp",
  }),
);

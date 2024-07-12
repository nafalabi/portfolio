import sharp from "sharp";
import glob from "glob";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distpath = path.resolve(__dirname, "../", "dist/**/*.{png,jpg,jpeg}");
const matches = glob.sync(distpath);
const QUALITY = 70;

Promise.all(
  matches.map(async (match) => {
    console.log(match);

    const stream = sharp(match);
    // const info = await stream.metadata();

    const optimizedName = match.replace(
      /(\..+)$/,
      (_match, ext) => `-optimized${ext}`,
    );

    await stream.jpeg({ quality: QUALITY }).toFile(optimizedName);

    fs.rm(match, () => {
      fs.rename(optimizedName, match, () => { });
    });
  }),
);

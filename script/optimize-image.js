const sharp = require(`sharp`);
const glob = require(`glob`);
const fs = require(`fs-extra`);
const path = require('path');

const distpath = path.resolve(__dirname, '../', 'public/**/*.{png,jpg,jpeg}');
const matches = glob.sync(distpath);
const QUALITY = 70;

Promise.all(
  matches.map(async match => {
    const stream = sharp(match);
    // const info = await stream.metadata();

    const optimizedName = match.replace(
      /(\..+)$/,
      (_match, ext) => `-optimized${ext}`
    );

    await stream
      .jpeg({ quality: QUALITY })
      .toFile(optimizedName);

    return fs.rename(optimizedName, match);
  })
)


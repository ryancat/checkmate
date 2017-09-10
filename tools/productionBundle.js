import webpack from 'webpack';
import prodConfig from '../webpack.production.config';
import zlib from 'zlib';
import fs from 'fs';

/* eslint-disable no-console */
const compiler = webpack(prodConfig);
const gzip = zlib.createGzip();

compiler.run((err, stats) => {
  if (err) {
    console.log(err);
  }
  else {
    console.log(stats.toString());

    let inStream = fs.createReadStream('./dist/bundle.js');
    let outStream = fs.createWriteStream('./dist/bundle.js.gz');

    inStream
    .pipe(gzip)
    .pipe(outStream);
  }
})
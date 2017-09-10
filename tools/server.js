import express from 'express';
import webpack from 'webpack';
import path from 'path';
import devConfig from '../webpack.dev.config';
// import prodConfig from '../webpack.production.config';
import open from 'open';

/* eslint-disable no-console */

const port = process.env.PORT || 3000;
const app = express();
// let config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;
let config = devConfig;
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
// import webpack from 'webpack';
// import config from './webpack.dev.config'

// config.output.filename = 'bundle.min.js'
// config.plugins.push(new webpack.optimize.UglifyJsPlugin({
//   minimize: true
// }))

// export default config

import webpack from 'webpack';
import path from 'path';

export default {
  entry: [
    path.resolve(__dirname, 'src/main')
  ],
  target: 'web',
  output: {
    path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      parallel: {
        cache: true,
        workers: 2
      }
    })
  ],
  module: {
    loaders: [
      {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel-loader']},
      {test: /(\.scss)$/, include: path.join(__dirname, 'src'), loaders: ['style-loader', 'css-loader', 'sass-loader']}
    ]
  }
};

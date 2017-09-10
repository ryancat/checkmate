import webpack from 'webpack';
import config from './webpack.dev.config'

config.output.filename = 'bundle.min.js'
config.plugins.push(new webpack.optimize.UglifyJsPlugin({
  minimize: true
}))

export default config
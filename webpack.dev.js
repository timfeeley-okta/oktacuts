const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  cache: false,
  watch: true,

  optimization: {
    splitChunks: false,
  },
  devServer: {
    static: false,
    hot: true,
    allowedHosts: 'all',
    devMiddleware: {
      writeToDisk: true,
    },
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
})

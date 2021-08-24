const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  entry: {
    popup: './pages/popup/index.tsx',
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css'],
    plugins: [new TsconfigPathsPlugin()],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './pages/popup/index.html',
      filename: './popup.html',
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: './assets' }],
    }),
  ],
  output: {
    filename: '[name].js',

    path: path.resolve(__dirname, 'dist'),
  },
}

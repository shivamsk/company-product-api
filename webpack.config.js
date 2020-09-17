const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  target: 'node',
  externals: [
    nodeExternals({
      includeAbsolutePaths: true,
    })
  ],
  node: {
    __dirname: false,
    __filename: false,
  },
  context: path.resolve(__dirname, './src'),
  entry: {
    index: [
      './app.js']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: (/node_modules/),
      },
      {
        test: /package\.json$/,
        loader: 'file-loader',
        options: {
          name: '[name].json'
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
        exclude: /package\.json/
      }
    ],
  }
}

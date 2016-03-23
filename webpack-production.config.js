const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')

const config = {
  entry: {
    app: ['./src/client/app.js']
  },
  module: {
    loaders: [
      { test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?-url&minimize!sass-loader')
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'html-loader?attrs=false'
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: './'
  },
  plugins: [
    new ExtractTextPlugin('bundle.css'),
    new webpack.IgnorePlugin(/vertx/),
    new webpack.optimize.UglifyJsPlugin()
  ],
  resolve: {
    extensions: ['', '.scss', '.js', '.html'],
    modulesDirectories: ['src', 'node_modules']
  },
  target: 'electron'
}

module.exports = config

'use strict';
/* eslint no-var:0 */

var webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loaders: ['babel'],
        test: /\.js$/,
      },
      {
        loaders: ['json'],
        test: /\.json$/,
      },
    ],
  },
  output: {
    library: 'SwaggerDiff',
    libraryTarget: 'umd',
    filename: 'dist/swagger-diff.min.js',
  },
  resolve: {
    extensions: ['', '.js', '.json'],
    modulesDirectories: ['src', 'node_modules'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.browser': JSON.stringify(true),
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false,
      },
    }),
  ],
  node: {
    fs: 'empty',
  },
};

var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

const API_BASE_PATH = process.env.API_BASE_PATH = 'http://localhost:8080/api';

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',

  output: {
    path: helpers.root('dist'),
    publicPath: 'http://localhost:3000/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.DefinePlugin({ // use to define environment variables that we can reference within our application.
      'process.env': {
        'API_BASE_PATH': JSON.stringify(API_BASE_PATH)       
      }
    })
  ],

  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  }
});

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, 'src'),

  entry: {
    index: './index.js'
  },

  output: {
    path: path.join(__dirname, '/build'),
    filename: '[name].[chunkhash].bundle.js',
    sourceMapFilename: '[name].[chunkhash].bundle.map'
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader' // see .babelrc for loader "options"
      }, {
        loader: 'eslint-loader',
        options: {
          failOnWarning: false,
          failOnError: true
        }
      }]
    }, {
      test: /\.html$/,
      exclude: path.join(__dirname, './src/index.html'),
      use: [{
        loader: 'html-loader'
      }]
    }, {
      test: /\.less$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'less-loader']
      })
    }, {
      test: /\.(jpg|png|gif)$/,
      use: [{
        loader: 'file-loader'
      }]
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader?limit=10000&mimetype=application/font-woff'
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader'
    }]
  },

  plugins: [
    // keep commons chunk plugin first for karma.conf.js interop
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor']
    }),

    new ExtractTextPlugin('[name].[contenthash].css'),

    new HtmlWebpackPlugin({
      template: './index.html',
      chunksSortMode: 'dependency'
    })
  ]

};
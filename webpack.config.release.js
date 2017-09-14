const prodConfig = require('./webpack.config.prod');
const S3Plugin = require('webpack-s3-plugin');
const webpackMerge = require('webpack-merge');
const cdnBase = 'http://123fakepath.cloudfront.net';

module.exports = webpackMerge(prodConfig, {
  // "workaround" for https://github.com/MikaAK/s3-plugin-webpack/issues/73
  output: {
    publicPath: ''
  },

  module: {
    rules: [{
      test: /\.(jpg|png|gif)$/,
      use: [{
        loader: 'file-loader',
        options: {
          publicPath: cdnBase
        }
      }]
    }]
  },

  plugins: [
    new S3Plugin({
      s3Options: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION
      },
      s3UploadOptions: {
        Bucket: process.env.AWS_BUCKET
      },
      cdnizerOptions: {
        defaultCDNBase: cdnBase
      }
    })
  ]
});
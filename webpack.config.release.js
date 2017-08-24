const prodConfig = require('./webpack.config.prod');
const S3Plugin = require('webpack-s3-plugin');
const webpackMerge = require('webpack-merge');

module.exports = webpackMerge(prodConfig, {
  // "workaround" for https://github.com/MikaAK/s3-plugin-webpack/issues/73
  output: {
    publicPath: ''
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
        defaultCDNBase: 'http://123fakepath.cloudfront.net'
      }
    })
  ]
});
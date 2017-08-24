# s3-plugin-webpack-test-bed

## Overview
This a repo to demonstrate a (possible) bug with [s3-plugin-webpack](https://github.com/webpack-contrib/s3-plugin-webpack/) and its handling of certain paths, like images used in a `<img>` HTML tag.

## Setup
1. Make sure you have NodeJS and npm or yarn already installed
1. Run `npm install` or `yarn install`

**Note: AWS credentials aren't actually needed for reproducing this issue**

## Test Case
Currently being observed is [this](https://github.com/webpack-contrib/s3-plugin-webpack/issues/83) issue with how image paths in `<img>` HTML tags are not getting CDN-ized.

1. Run `yarn run release`
1. Look in the _build/_ directory and observe that in _index.html_ we see our `defaultCDNBase` from _webpack.config.release.js_ value used for our `<script>` and `<style>` paths

```html
<!DOCTYPE html>
<html lang="en">

  <head>

    <title>S3 Webpack Plugin Test Bed</title>

  <link href="http://123fakepath.cloudfront.net/index.a85dc37e5d2d363f48cd432bc2fddd5a.css" rel="stylesheet"></head>

  <body>

    <section id="bootstrap">

    </section>

  <script type="text/javascript" src="http://123fakepath.cloudfront.net/common.a226870440a26715faee.bundle.js"></script><script type="text/javascript" src="http://123fakepath.cloudfront.net/index.3fcb33768a53684d414c.bundle.js"></script></body>

</html>
```

However in _build/index.[contenthash].bundle.js_ we see there is no `defaultCDNBase` applied to our `img` path, though it is content hashed
```
function(e,n,t){e.exports='<div id=home> <h1>Yay Webpack!</h1> <img alt="webpack image should be here" src='+t(4)+"> </div>"},function(e,n,t){e.exports=t.p+"f78661bef717cf2cc2c2e5158f196384.png"}],[0]);
```

That said, if the image is moved to the _home.css_ file as a background image, e.g.
```
#home {
  width: 40%;
  margin: 0 auto;
  text-align: center;
  background-image: url('./webpack.png');
}
```

It will get correctly CDN-ized in _build/index.[contenthash].css_
```
#home{width:40%;margin:0 auto;text-align:center;background-image:url(http://123fakepath.cloudfront.net/f78661bef717cf2cc2c2e5158f196384.png)}
```
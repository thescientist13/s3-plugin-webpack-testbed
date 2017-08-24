# s3-webpack-plugin-test-repo

## Overview
This a repo to demonstrate a (possible) bug with [s3-webpack-plugin]() and its handling of certain paths, like images used in a `<img>` HTML tag.

## Setup
1. Assuming NodeJS and npm / yarn are already installed, run `npm install` or `yarn install`
1. Configure the following environment variables to test the release task `yarn run release`
- accessKeyId
- secretAccessKey
- region
- bucket
- CDN base

## Test Case
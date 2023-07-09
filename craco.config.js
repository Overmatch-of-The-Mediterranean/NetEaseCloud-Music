const path = require('path')

const resolve = (dir) => path.resolve(__dirname, dir)
const cracoLessPlugin = require('craco-less')

module.exports = {
  plugins: [
    {
      plugin: cracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      }
    }
  ],
  webpack: {
    alias: {
      '@': resolve('src')
    }
  }
}

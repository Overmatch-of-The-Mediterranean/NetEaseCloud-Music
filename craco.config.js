const path = require('path')

const resolve = (dir) => path.resolve(__dirname, dir)
const cracoLessPlugin = require('craco-less')

module.exports = {
  plugins: [{plugin:cracoLessPlugin}],
  webpack: {
    alias: {
      '@': resolve('src')
    }
  }
}

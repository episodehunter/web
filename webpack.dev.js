const path = require('path')
const webpack = require('webpack')
const common = require('./webpack.base.js')

module.exports = Object.assign({}, common, {
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    watchContentBase: true,
    compress: true,
    port: 1337,
    historyApiFallback: true
  },
  plugins: [...common.plugins, new webpack.NamedModulesPlugin()]
})

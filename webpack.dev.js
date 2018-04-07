const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.base.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    compress: true,
    port: 1337,
    historyApiFallback: {
      index: 'index.html'
    }
  },
  plugins: [new webpack.NamedModulesPlugin()]
})

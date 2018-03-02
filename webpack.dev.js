const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.base.js')

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    compress: true,
    port: 1337,
    historyApiFallback: {
      index: 'index.html'
    }
  }
})

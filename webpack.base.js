const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { InjectManifest } = require('workbox-webpack-plugin')

module.exports = {
  entry: ['./src/index.tsx'],
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(ico|png)$/i,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /\.tsx?$/,
        use: ['babel-loader'],
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules/@episodehunter/types') // TODO: Do we need this?
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      alwaysWriteToDisk: true
    }),
    new InjectManifest({
      swSrc: path.join('src', 'service-worker.js')
    })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: '[hash].bundle.js',
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    globalObject: 'this'
  }
}

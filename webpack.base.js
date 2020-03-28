const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    main: './src/index.tsx',
    'service-worker': './src/service-worker.ts'
  },
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
    })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    globalObject: 'this'
  }
}

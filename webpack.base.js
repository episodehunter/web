const path = require('path')
const OfflinePlugin = require('offline-plugin')

module.exports = {
  entry: ['./src/index.tsx'],
  devtool: 'source-map',
  module: {
    rules: [
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
    new OfflinePlugin({
      responseStrategy: 'cache-first',
      externals: [
        'https://polyfill.io/v3/polyfill.min.js?flags=gated&features=IntersectionObserver%2CIntersectionObserverEntry',
        'https://fonts.googleapis.com/css?family=Lato:100,400,700',
        'https://fonts.googleapis.com/icon?family=Material+Icons'
      ],
      AppCache: false
    })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    globalObject: 'this'
  }
}

const path = require('path')

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
          path.resolve(__dirname, 'node_modules/@episodehunter/types')
        ]
      }
    ]
  },
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

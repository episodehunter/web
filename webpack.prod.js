const path = require('path')
const common = require('./webpack.base.js')
const WebpackPwaManifest = require('webpack-pwa-manifest')

module.exports = Object.assign({}, common, {
  mode: 'production',
  plugins: [
    ...common.plugins,
    new WebpackPwaManifest({
      short_name: 'Episodehunter',
      name: 'Episodehunter',
      icons: [
        {
          src: path.resolve('src/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          ios: true
        },
        {
          src: path.resolve('src/logo.png'),
          sizes: 1024,
          ios: 'startup'
        }
      ],
      background_color: '#1a1c21',
      theme_color: '#03A37E',
      start_url: '/',
      display: 'standalone',
      orientation: 'portrait',
      inject: true,
      ios: true
    })
  ]
})

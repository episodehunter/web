workbox.precaching.precacheAndRoute(self.__precacheManifest || [])

workbox.routing.registerNavigationRoute('/index.html')

// Cache the Google Fonts stylesheets with a stale while revalidate strategy.
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets'
  })
)

// Cache the Google Fonts webfont files with a cache first strategy for 1 year.
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new workbox.strategies.CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365
      })
    ]
  })
)

// Cache polyfil
workbox.routing.registerRoute(
  /^https:\/\/polyfill\.io/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'polyfill-io'
  })
)

// Cache images from CDN
workbox.routing.registerRoute(
  /^https:\/\/d1lolx4ilifvdr\.cloudfront\.net/,
  new workbox.strategies.CacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200] // Only cache responses with status of 200 or 0 (opaque responses)
      }),
      new workbox.expiration.Plugin({
        maxEntries: 500,
        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
      })
    ]
  })
)

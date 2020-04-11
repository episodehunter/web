const cacheNames = {
  precache: 'precache-v2',
  images: 'images-v1',
}

const PRECACHE_URLS = [
  'index.html',
  '/',
  '/main.js',
  'https://fonts.googleapis.com/css?family=Lato:100,400,700',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://polyfill.io/v3/polyfill.min.js?flags=gated&features=IntersectionObserver%2CIntersectionObserverEntry',
]

function initialize(service: ServiceWorkerGlobalScope): void {
  const removeOldCaches = async () => {
    const keyList = await caches.keys()
    for (const key of keyList) {
      if (Object.values(cacheNames).includes(key)) {
        await caches.delete(key)
      }
    }
  }

  const preCache = async () => {
    const cache = await caches.open(cacheNames.precache)
    await cache.addAll(PRECACHE_URLS)
  }

  const onMessage = (event: ExtendableMessageEvent) => {
    if (event.data === 'skipWaiting') {
      service.skipWaiting()
    }
  }

  const onFetch = (event: FetchEvent) => {
    if (event.request.method.toLowerCase() !== 'get') {
      return
    }

    const usePrecache: RegExp[] = [
      /^https:\/\/fonts\.googleapis\.com/,
      /^https:\/\/fonts\.gstatic\.com/,
      /^https:\/\/polyfill\.io/,
      /^https:\/\/d1lolx4ilifvdr\.cloudfront\.net/,
      /main\.js$/,
      /\.worker\.js$/,
      /(localhost|episodehunter).*\.(png|jpg)/,
      /localhost:1337\/$/,
      /episodehunter\.tv\/$/,
    ]

    const isPrecacheMatch = usePrecache.find(p => event.request.url.match(p))

    if (event.request.url.match(/^https:\/\/d1lolx4ilifvdr\.cloudfront\.net/)) {
      event.respondWith(cacheOrNetwork(cacheNames.images)(event))
    } else if (isPrecacheMatch) {
      event.respondWith(cacheOrNetwork(cacheNames.precache)(event))
    }
  }

  const cacheOrNetwork = (cacheName: string) => async (event: FetchEvent): Promise<Response> => {
    const cache = await caches.open(cacheName)
    const cacheResponse = await cache.match(event.request)

    if (cacheResponse) {
      return cacheResponse
    }
    const newResponse = await fetch(event.request)
    if (newResponse.ok) {
      cache.put(event.request, newResponse.clone())
    }
    return newResponse
  }

  service.addEventListener('install', event => event.waitUntil(preCache()))
  service.addEventListener('activate', event => event.waitUntil(removeOldCaches()))
  service.addEventListener('message', onMessage)
  service.addEventListener('fetch', onFetch)
}

initialize(self as any)

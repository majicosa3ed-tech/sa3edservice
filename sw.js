const CACHE_NAME = 'sa3edservice-v2';
const ASSETS_TO_CACHE = [
  '/sa3edservice/',
  '/sa3edservice/index.html',
  '/sa3edservice/manifest.json',
  '/sa3edservice/assets/index.js',
  '/sa3edservice/assets/index.css'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
      .catch(() => Promise.resolve())
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) =>
          cacheName !== CACHE_NAME ? caches.delete(cacheName) : null
        )
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET' || url.protocol === 'chrome-extension:') return;

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      return fetch(request).then((response) => {
        if (!response || response.status !== 200 || response.type === 'error') {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, responseToCache));
        return response;
      }).catch(() => {
        return caches.match('/sa3edservice/index.html');
      });
    })
  );
});

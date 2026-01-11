const CACHE_NAME = 'servicecode-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/servicecode/',
  '/servicecode/index.html',
  '/servicecode/manifest.json',
  '/servicecode/offline-app.html'
];

// Install event - cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching assets for offline use');
      return cache.addAll(ASSETS_TO_CACHE).catch((error) => {
        console.warn('Error caching assets:', error);
        // Continue even if some assets fail to cache
        return Promise.resolve();
      });
    })
  );
  self.skipWaiting(); // Skip waiting and activate immediately
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim(); // Claim all clients immediately
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome extensions
  if (url.protocol === 'chrome-extension:') {
    return;
  }

  event.respondWith(
    caches.match(request).then((response) => {
      if (response) {
        return response; // Serve from cache
      }

      // Try fetching from network
      return fetch(request)
        .then((response) => {
          // Don't cache non-successful responses
          if (!response || response.status !== 200 || response.type === 'error') {
            return response;
          }

          // Clone the response and cache it
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });

          return response;
        })
        .catch((error) => {
          console.log('Fetch error, serving offline page:', error);
          // Return offline page or cached response
          return caches.match('/servicecode/offline-app.html');
        });
    })
  );
});

// Background sync for future requests
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-codes') {
    event.waitUntil(
      // Sync service codes when connection is restored
      fetch('/servicecode/').then(() => {
        console.log('Service codes synced');
      })
    );
  }
});

// Message from client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

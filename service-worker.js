
const CACHE_NAME = 'shinhan-bank-v2';
const STATIC_CACHE = 'shinhan-static-v2';
const DYNAMIC_CACHE = 'shinhan-dynamic-v2';
const IMAGE_CACHE = 'shinhan-images-v2';

const urlsToCache = [
  '/',
  '/index.html',
  '/register.html',
  '/assets/css/accessibility.css',
  '/assets/css/shared.css',
  '/assets/js/validation-utils.js',
  '/assets/js/modal-manager.js',
  '/assets/js/form.js',
  '/public/themes/shinhan/img/logo-01.svg',
  '/public/themes/shinhan/img/loading-icon-2.png',
  '/public/themes/shinhan/img/i_lock.png',
  '/public/themes/shinhan/img/i_search2.png',
  '/public/themes/shinhan/img/i_close_2.png',
  '/public/themes/shinhan/css/stylelibs.min.css',
  '/public/themes/shinhan/scss/style.min.css',
  '/public/article.css',
  '/public/themes/shinhan/js/jsmain.min.js',
  '/public/themes/shinhan/js/main.js',
  '/public/themes/shinhan/img/shinhan_logo_2.svg'
];

const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.svg'];

// Helper function to determine if URL is an image
function isImage(url) {
  return imageExtensions.some(ext => url.toLowerCase().includes(ext));
}

// Install event - cache static assets
self.addEventListener('install', event => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('[Service Worker] Caching static assets');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating...');
  const cacheWhitelist = [STATIC_CACHE, DYNAMIC_CACHE, IMAGE_CACHE];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - network first, then cache fallback with different strategies
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin && !url.href.includes('shinhan.com.vn')) {
    return;
  }

  // Handle images with cache-first strategy
  if (isImage(request.url)) {
    event.respondWith(
      caches.open(IMAGE_CACHE).then(cache => {
        return cache.match(request).then(response => {
          if (response) {
            return response;
          }
          return fetch(request).then(networkResponse => {
            // Only cache successful responses
            if (networkResponse && networkResponse.status === 200) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => {
            // Return fallback image if available
            return cache.match('/assets/img/placeholder.png');
          });
        });
      })
    );
    return;
  }

  // Handle API calls with network-first strategy
  if (request.url.includes('/api/') || request.url.includes('vn4-subscribe')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Don't cache POST requests
          if (request.method === 'GET' && response.status === 200) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE).then(cache => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match(request);
        })
    );
    return;
  }

  // Handle static assets with cache-first strategy
  event.respondWith(
    caches.match(request)
      .then(response => {
        if (response) {
          // Return cached version and update cache in background
          fetch(request).then(networkResponse => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(STATIC_CACHE).then(cache => {
                cache.put(request, networkResponse);
              });
            }
          }).catch(() => {});
          return response;
        }

        // Not in cache, fetch from network
        return fetch(request).then(networkResponse => {
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse;
          }

          const responseClone = networkResponse.clone();
          caches.open(DYNAMIC_CACHE).then(cache => {
            cache.put(request, responseClone);
          });

          return networkResponse;
        }).catch(error => {
          console.log('[Service Worker] Fetch failed:', error);
          // Return offline page if available
          return caches.match('/offline.html');
        });
      })
  );
});

// Message event - allow clients to control cache
self.addEventListener('message', event => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
  
  if (event.data.action === 'clearCache') {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        );
      })
    );
  }
});


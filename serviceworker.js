var CACHE_NAME = 'gih-cache-v5';
var CACHED_URLS = [
  // Our HTML
  'first.html',
  // Stylesheets and fonts
    'styles.css',
    'mystyles.css',
    'min-style.css'
  // JavaScript
    'material.js',
    'manifest.json'
  // Images
    'appimages/android-icon36x36.png',
    'appimages/android-icon48x48.png.png',
    'appimages/android-icon72x72.png',
    'appimages/android-icon96x96.png',
    'appimages/android-icon144x144.png',
    'appimages/android-icon192x192.png',
    'appimages/favicon.png',
    'appimages/favicon-16x16.png',
    'appimages/favicon-32x32.png',
    'appimages/favicon-96x96.png',
    'appimages/jack.png',
    'appimages/ms-icon-70x70.png',
    'appimages/ms-icon-144x144.png',
    'appimages/ms-icon-150x150.png',
    'appimages/ms-icon-310x310.png',
    'appimages/paddy.jpg'
];

self.addEventListener('install', function(event) {
  // Cache everything in CACHED_URLS. Installation will fail if something fails to cache
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(CACHED_URLS);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request).then(function(response) {
        if (response) {
          return response;
        } else if (event.request.headers.get('accept').includes('text/html')) {
          return caches.match('first.html');
        }
      });
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName.startsWith('gih-cache') && CACHE_NAME !== cacheName) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

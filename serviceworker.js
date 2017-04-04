
var CACHE_NAME = 'gih-cache-v5';
var BASE_PATH = '/dfm/'
var CACHED_URLS = [
  // Our HTML
  BASE_PATH + 'first.html',
  // Stylesheets and fonts
    BASE_PATH + 'styles.css',
    BASE_PATH + 'mystyles.css',
    BASE_PATH + 'min-style.css',
  // JavaScript
    BASE_PATH + 'material.js',
    BASE_PATH + 'manifest.json',
  // Images
    BASE_PATH + 'appimages/android-icon-36x36.png',
    BASE_PATH + 'appimages/android-icon-48x48.png',
    BASE_PATH + 'appimages/android-icon-72x72.png',
    BASE_PATH + 'appimages/android-icon-96x96.png',
    BASE_PATH + 'appimages/android-icon-144x144.png',
    BASE_PATH + 'appimages/android-icon-192x192.png',
    BASE_PATH + 'appimages/favicon-16x16.png',
    BASE_PATH + 'appimages/favicon-32x32.png',
    BASE_PATH +  'appimages/favicon-96x96.png',
    BASE_PATH + 'appimages/ms-icon-70x70.png',
    BASE_PATH + 'appimages/ms-icon-144x144.png',
    BASE_PATH + 'appimages/ms-icon-150x150.png',
    BASE_PATH +  'appimages/ms-icon-310x310.png',
    BASE_PATH + 'appimages/paddy.jpg',
    
    BASE_PATH + 'eventsimages/example-blog01.jpg',
    BASE_PATH + 'eventsimages/example-blog02.jpg',
    BASE_PATH + 'eventsimages/example-blog03.jpg',
    BASE_PATH + 'eventsimages/example-blog04.jpg',
    BASE_PATH + 'eventsimages/example-blog05.jpg',
    BASE_PATH + 'eventsimages/example-blog06.jpg',
    BASE_PATH + 'eventsimages/example-blog07.jpg',
    
    BASE_PATH + 'eventsimages/example-work01.jpg',
    BASE_PATH + 'eventsimages/example-work02.jpg',
    BASE_PATH + 'eventsimages/example-work03.jpg',
    BASE_PATH + 'eventsimages/example-work04.jpg',
    BASE_PATH + 'eventsimages/example-work05.jpg',
    BASE_PATH + 'eventsimages/example-work06.jpg',
    BASE_PATH + 'eventsimages/example-work07.jpg',
    BASE_PATH + 'eventsimages/example-work08.jpg',
    BASE_PATH + 'eventsimages/example-work09.jpg',
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
  var requestURL = new URL(event.request.url);
  if (requestURL.pathname === BASE_PATH +  'first.html') {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match(BASE_PATH + 'first.html').then(function(cachedResponse) {
          var fetchPromise = fetch('first.html').then(function(networkResponse) {
            cache.put('first.html', networkResponse.clone());
            return networkResponse;
          });
          return cachedResponse || fetchPromise;
        });
      })
    );
  } else if (
    CACHED_URLS.includes(requestURL.href) ||
    CACHED_URLS.includes(requestURL.pathname)) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match(event.request).then(function(response) {
          return response || fetch(event.request);
        })
      })
    );
  }
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

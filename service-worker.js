// Toy Haven - Simple service worker
// Uses a cache-first strategy for core site files

var CACHE_NAME = 'toy-haven-v1';

// List of files to cache for offline use
var urlsToCache = [
  'index.html',
  'products.html',
  'cart.html',
  'checkout.html',
  'wishlist.html',
  'feedback.html',
  'manifest.json',
  'css/style.css',
  'css/home.css',
  'css/products.css',
  'css/cart.css',
  'css/checkout.css',
  'css/wishlist.css',
  'css/feedback.css',
  'js/data.js',
  'js/utils.js',
  'js/nav.js',
  'js/home.js',
  'js/products.js',
  'js/cart.js',
  'js/checkout.js',
  'js/wishlist.js',
  'js/feedback.js',
  'icons/favicon.ico',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'images/products/placeholder.jpg'
];

// Install event: runs once when the service worker is first installed
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event: try cache first, then network if not found (cache-first strategy)
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (cachedResponse) {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});

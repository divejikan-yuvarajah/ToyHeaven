var CACHE_NAME = 'toy-haven-v6';

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
  'images/banners/banner-figurines.png',
  'images/banners/banner-toys.png',
  'images/banners/banner-board-games.png',
  'images/banners/banner-diecast-cars.png',
  'images/products/01-super-hero-action-figure.png',
  'images/products/02-fantasy-knight-figurine.png',
  'images/products/03-space-explorer-figure.png',
  'images/products/04-dinosaur-collector-set.png',
  'images/products/05-princess-doll-figurine.png',
  'images/products/06-building-blocks-set.png',
  'images/products/07-remote-control-mini-car.png',
  'images/products/08-plush-teddy-bear.png',
  'images/products/09-bubble-blaster.png',
  'images/products/10-puzzle-cube.png',
  'images/products/11-family-trivia-night.png',
  'images/products/12-snakes-and-ladders.png',
  'images/products/13-strategy-kingdom.png',
  'images/products/14-word-challenge.png',
  'images/products/15-adventure-quest.png',
  'images/products/16-classic-red-sports-car.png',
  'images/products/17-police-patrol-car.png',
  'images/products/18-vintage-pickup-truck.png',
  'images/products/19-racing-formula-car.png',
  'images/products/20-fire-rescue-truck.png'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      var deleteOld = [];
      for (var i = 0; i < cacheNames.length; i++) {
        if (cacheNames[i] !== CACHE_NAME) {
          deleteOld.push(caches.delete(cacheNames[i]));
        }
      }
      return Promise.all(deleteOld);
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function (event) {
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(function (cachedResponse) {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    }).catch(function () {
      return caches.match('index.html');
    })
  );
});

var cacheName = 'mvj';
var filesToCache = [  
    './index.html',
    './style.css',
    './js/main.js',
    './sketch.js',
    './boss.js',
    './bullet.js',
    './enemy.js',
    './player.js',
    './p5.dom.min.js',
    './p5.min.js',
    './p5.sound.min.js',
    './assets/*',
    './sprites/*'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(filesToCache)
                .then(() => console.log('Assets added to cache'))
                .catch(err => console.log('Error while fetching assets', err));
        })
    );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (response) {
            return response || fetch(e.request);
        })
    );
});
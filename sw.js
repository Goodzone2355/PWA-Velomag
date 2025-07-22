const CACHE_NAME = 'velomag-cache-v1';
const URLS_TO_CACHE = [
    './index.html',
    './about.html',
    './contacts.html',
    './job.html',
    '/payment.html',
    './css/about.css',
    './css/card.css',
    './css/contacts.css',
    './css/footer.css',
    './css/header.css',
    './css/index.css',
    './css/job.css',
    './css/payment.css',
    './css/style.css',
    './img/promo/promo.jpg',
    './img/promo/merida.png',
    './img/promo/cube.png',
    './img/promo/shimano.png',
    './img/promo/stels.png',
    './offline.html' // Добавьте эту страницу для fallback
];

self.addEventListener('activate', event => {
});

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(URLS_TO_CACHE);
            })
            .catch(error => {
                console.error('Cache addAll failed:', error);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(cacheFirst(event.request));
});

async function cacheFirst(request) {
    const cached = await caches.match(request);
    return cached ?? await fetch(request);
} 
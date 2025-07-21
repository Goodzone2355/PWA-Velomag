const CACHE_NAME = 'cache-first-v1';
const URLS_TO_CACHE = [
    'index.html',
    'about.html',
    'contacts.html',
    'job.html',
    'payment.html',
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
];

self.addEventListener('activate', event => {
    console.log("SW: activate");
});

self.addEventListener('install', async event => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(URLS_TO_CACHE);
});

self.addEventListener('fetch', event => {
    console.log('Fetch', event.request);
    event.respondWith(cacheFirst(event.request));
});

async function cacheFirst(request) {
    const cached = await caches.match(request);
    return cached ?? await fetch(request);
}
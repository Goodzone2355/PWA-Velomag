const CACHE_NAME = 'velomag-cache-v1';
const URLS_TO_CACHE = [
    './index.html',
    './about.html',
    './contacts.html',
    './job.html',
    './payment.html',
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

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) =>
            cache.addAll(URLS_TO_CACHE))
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(fromCache(event.request));
    event.waitUntil(update(event.request));
});

function fromCache(request) {
    return caches.open(CACHE_NAME).then((cache) =>
        cache.match(request).then((matching) =>
            matching || Promise.reject('no-match')
        ));
}

function update(request) {
    return caches.open(CACHE_NAME).then((cache) =>
        fetch(request).then((response) =>
            cache.put(request, response)
        )
    );
}
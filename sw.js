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

// self.addEventListener('activate', event => {
// });

// self.addEventListener('install', event => {
//     event.waitUntil(
//         caches.open(CACHE_NAME)
//             .then(cache => {
//                 return cache.addAll(URLS_TO_CACHE);
//             })
//             .catch(error => {
//                 console.error('Cache addAll failed:', error);
//             })
//     );
// });

// self.addEventListener('fetch', event => {
//     event.respondWith(cacheFirst(event.request));
// });


// async function cacheFirst(request) {
//     const cached = await caches.match(request);
//     return cached ?? await fetch(request);
// } 

// При установке воркера мы должны закешировать часть данных (статику).
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) =>
            cache.addAll(URLS_TO_CACHE))
    );
});

// при событии fetch, мы используем кэш, и только потом обновляем его данным с сервера
self.addEventListener('fetch', function (event) {
    // Мы используем `respondWith()`, чтобы мгновенно ответить без ожидания ответа с сервера.
    event.respondWith(fromCache(event.request));
    // `waitUntil()` нужен, чтобы предотвратить прекращение работы worker'a до того как кэш обновиться.
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
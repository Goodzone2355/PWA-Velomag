const CACHE_NAME = 'velomag-cache-v1';
const URLS_TO_CACHE = [
    '/',
    '/index.html',
    '/about.html',
    '/contacts.html',
    '/job.html',
    '/payment.html',
    '/css/about.css',
    '/css/card.css',
    '/css/contacts.css',
    '/css/footer.css',
    '/css/header.css',
    '/css/index.css',
    '/css/job.css',
    '/css/payment.css',
    '/css/style.css',
    '/img/promo/promo.jpg',
    '/img/promo/merida.png',
    '/img/promo/cube.png',
    '/img/promo/shimano.png',
    '/img/promo/stels.png',
    '/offline.html'
];

// Установка и кэширование
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(URLS_TO_CACHE))
            .then(() => self.skipWaiting())
    );
});

// Активация и очистка старых кэшей
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.map(key => key !== CACHE_NAME ? caches.delete(key) : null)
            )
        )
    );
    console.log('SW activated');
});

// Стратегия "Сначала кэш, потом сеть" с оффлайн-режимом
self.addEventListener('fetch', event => {
    // Пропускаем не-GET запросы
    if (event.request.method !== 'GET') return;

    event.respondWith(
        caches.match(event.request)
            .then(cached => {
                // 1. Пробуем кэш
                if (cached) return cached;

                // 2. Идём в сеть
                return fetch(event.request)
                    .then(response => {
                        // Клонируем для кэширования
                        const responseClone = response.clone();
                        caches.open(CACHE_NAME)
                            .then(cache => cache.put(event.request, responseClone));
                        return response;
                    })
                    .catch(() => {
                        // 3. Fallback для оффлайн-режима
                        if (event.request.mode === 'navigate') {
                            return caches.match('/offline.html');
                        }
                        return new Response('Оффлайн режим');
                    });
            })
    );
});
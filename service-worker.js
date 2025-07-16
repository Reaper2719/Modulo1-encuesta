self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('modulo1-cache-v2').then(cache => {
      return cache.addAll([
        '/',
        'index.html',
        'style.css',
        'main.js',
        'indexedDB.js',
        'export.js',
        'manifest.json',
        'icon-192.png',
        'icon-512.png'
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== 'modulo1-cache-v2').map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => {
        if (event.request.destination === 'document') {
          return caches.match('index.html');
        }
      });
    })
  );
});

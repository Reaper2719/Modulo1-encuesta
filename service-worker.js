self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('modulo1-cache-v2').then(cache => {
      // Usar rutas relativas para máxima compatibilidad                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
      return cache.addAll([
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
      // Si está en caché, responde con caché
      if (response) return response;
      // Si no, intenta buscar en red
      return fetch(event.request).catch(() => {
        // Si falla y es navegación, muestra offline
        if (event.request.mode === 'navigate' || event.request.destination === 'document') {
          return caches.match('index.html');
        }
        // Fallback para otros recursos
        return new Response('Offline', { status: 503, statusText: 'Offline' });
      });
    })
  );
});

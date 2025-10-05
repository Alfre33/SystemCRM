// public/service-worker.js
const CACHE_NAME = 'pwa-shell-v1';
const APP_SHELL = [
  '/', // navegación raíz
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/offline.html', // fallback de navegación
];

// Instala y precachea lo esencial
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

// Limpia versiones viejas
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null))
        )
      )
  );
  self.clients.claim();
});

// Estrategias simples:
// - Navegación: Network → Offline fallback
// - Estáticos /assets/: Cache First con calentamiento en la 1ª visita
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // 1) Rutas de navegación (SPA)
  if (req.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          return await fetch(req);
        } catch {
          return (
            (await caches.match('/index.html')) || caches.match('/offline.html')
          );
        }
      })()
    );
    return;
  }

  // 2) Archivos propios
  if (url.origin === self.location.origin) {
    // Prioriza caché para bundles de Vite y shell
    if (
      url.pathname.startsWith('/assets/') ||
      APP_SHELL.includes(url.pathname)
    ) {
      event.respondWith(
        caches.match(req).then((cached) => {
          if (cached) return cached;
          return fetch(req).then((res) => {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
            return res;
          });
        })
      );
      return;
    }
  }

  // 3) Resto: Network → Caché si existe
  event.respondWith(fetch(req).catch(() => caches.match(req)));
});

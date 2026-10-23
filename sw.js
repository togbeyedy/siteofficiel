// Service Worker - Majesté Togbé Yédy
const CACHE_NAME = 'togbeyedy-v1';
const URLS_A_METTRE_EN_CACHE = [
  '/',
  '/index.html',
  '/icon.png',
  '/manifest.json'
];

// Installation : on met en cache les fichiers de base
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_A_METTRE_EN_CACHE);
    })
  );
  self.skipWaiting();
});

// Activation : on nettoie les anciens caches si la version change
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((noms) => {
      return Promise.all(
        noms.map((nom) => {
          if (nom !== CACHE_NAME) {
            return caches.delete(nom);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Stratégie : Network First (réseau d'abord, cache en secours)
self.addEventListener('fetch', (event) => {
  // On ne gère que les requêtes GET
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((reponse) => {
        // On met en cache la réponse fraîche
        const copie = reponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, copie);
        });
        return reponse;
      })
      .catch(() => {
        // Si le réseau échoue, on renvoie le cache
        return caches.match(event.request).then((cachee) => {
          return cachee || caches.match('/index.html');
        });
      })
  );
});

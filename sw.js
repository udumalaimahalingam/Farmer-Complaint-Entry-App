// Bump this version whenever you change any file, so users get the new version.
const CACHE_NAME = "complaint-app-v2";

const APP_FILES = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./vendor/xlsx.full.min.js",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

// Install: cache the app shell so it opens offline.
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.all(
        APP_FILES.map((url) =>
          cache.add(url).catch(() => console.warn("Could not cache", url))
        )
      )
    ).then(() => self.skipWaiting())
  );
});

// Activate: remove old caches from previous versions.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch: cache first, fall back to network, and store new same-site files.
self.addEventListener("fetch", (event) => {
  const req = event.request;

  // Only handle GET requests from our own site.
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;

      return fetch(req)
        .then((response) => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          }
          return response;
        })
        .catch(() => {
          // Offline and page not cached: show the main app page.
          if (req.mode === "navigate") {
            return caches.match("./index.html");
          }
        });
    })
  );
});

const CACHE_NAME = "v1_cache_degradado_app_vue";
const urlsToCache = [
  "./",
  "./?umt_source=web_app_manifest",
  "./pages/fallback.html",
  "./img/color16.png",
  "./img/color32.png",
  "./img/color64.png",
  "./img/color128.png",
  "./img/maskable_icon_x192.png",
  "./img/color256.png",
  "./img/color512.png",
  "./img/color1024.png",
  "./js/main.js",
  "https://unpkg.com/vue@next",
  "./js/mountApp.js",
  "./style/style.css",
  "./manifest.json"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache
        .addAll(urlsToCache)
        .then(() => self.skipWaiting())
        .catch((err) => console.log(err))
    )
  );
});

self.addEventListener("activate", (e) => {
  const cacheWhitelist = [CACHE_NAME];

  e.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      if (res) {
        return res;
      }

      return fetch(e.request);
    }).catch(()=>caches.match("./pages/fallback.html"))
  );
});
// The web app that used to live here was retired; Gentle Ride is now an
// iPhone app. Phones that installed the old web app still have its service
// worker, which would keep serving the cached app. This replacement clears
// those caches, removes itself, and reloads open pages onto the new site.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    for (const key of await caches.keys()) await caches.delete(key);
    await self.registration.unregister();
    for (const client of await self.clients.matchAll({ type: "window" })) client.navigate(client.url);
  })());
});

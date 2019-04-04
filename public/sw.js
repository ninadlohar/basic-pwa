self.addEventListener("install", function(event) {
  console.log("sw installing...", event);
});

self.addEventListener("activate", function(event) {
  console.log("sw activating...", event);
  return self.clients.claim();
});

self.addEventListener("fetch", function(event) {
  console.log("sw fetching...", event);
  event.respondWith(fetch(event.request));
});

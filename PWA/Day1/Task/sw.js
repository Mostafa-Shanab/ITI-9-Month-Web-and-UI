const filesToSave = [
  "index.html",
  "offline.html",
  "404.html",
  "Pages/page2.html",
  "JS/page1.js",
  "JS/script.js",
  "CSS/main.css",
];

const staticCacheName = "File1";

self.addEventListener("install", (ins) => {
  ins.waitUntil(
    caches
      .open(staticCacheName)
      .then((cache) => {
        return cache.addAll(filesToSave);
      })
      .catch((err) => {
        console.log("🚀 ~ err:", err);
      }),
  );

  self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((cachedResponse) => {
        console.log("HI4");
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request)
          .then((networkResponse) => {
            if (!networkResponse.ok) {
              if (event.request.mode === "navigate") {
                return caches.match("404.html");
              }
            }
            // save new request in cache
            console.log("HI3");
            return caches
              .open(staticCacheName)
              .then((cache) => {
                cache
                  .put(event.request, networkResponse.clone())
                  .then((res) => {
                    console.log("🚀 ~ res:", res);
                  })
                  .catch((err) => {
                    console.log("🚀 ~ err:", err);
                  });
                return networkResponse;
              })
              .catch((err) => {
                console.log("🚀 ~ err networkResponse:", err);
              });
          })
          .catch(() => {
            // if request is navigation --> offline page
            console.log("HI2");
            if (event.request.mode === "navigate") {
              return caches.match("offline.html");
            }
            console.log("HI1");
            // for wrong URL
            return caches.match("404.html");
          });
      })
      .catch((err) => {
        console.log("🚀 ~ err then:", err);
      }),
  );
});

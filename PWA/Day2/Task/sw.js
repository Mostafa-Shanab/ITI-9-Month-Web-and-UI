const CACHE_NAME = "todo-cache-v1";
const urlsToCache = ["/", "/index.html", "/styles.css", "/app.js", "/idb.js"];

self.addEventListener("install", (event) => {
  console.log("Service Worker: Installing...");
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Service Worker: Caching files");
        return cache.addAll(urlsToCache);
      })
      .catch((err) => {
        console.log("Service Worker: Cache failed", err);
      }),
  );
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activating...");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Service Worker: Clearing old cache");
            return caches.delete(cache);
          }
        }),
      );
    }),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
      .catch((err) => {
        console.log("Service Worker: Fetch error", err);
      }),
  );
});

self.addEventListener("notificationclick", (event) => {
  console.log("Notification clicked:", event);

  const notification = event.notification;
  const action = event.action;

  if (action === "view") {
    event.waitUntil(clients.openWindow("/"));
  } else if (action === "close") {
    notification.close();
  } else {
    event.waitUntil(clients.openWindow("/"));
  }

  notification.close();
});

self.addEventListener("notificationclose", (event) => {
  console.log("Notification closed:", event);
});

self.addEventListener("push", (event) => {
  console.log("Push notification received:", event);

  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      data: {
        url: data.url || "/",
      },
    };

    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});

self.addEventListener("sync", (event) => {
  console.log("Background sync:", event);

  if (event.tag === "sync-tasks") {
    event.waitUntil(syncTasks());
  }
});

function syncTasks() {
  return new Promise((resolve, reject) => {
    console.log("Syncing tasks...");
    resolve();
  });
}

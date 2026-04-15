/* Trading Diary — Service Worker */
var CACHE = 'trading-diary-v1';
var SHELL = ['/', '/index.html'];

/* ── Install: cache app shell ── */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(c) { return c.addAll(SHELL); })
  );
  self.skipWaiting();
});

/* ── Activate: clean old caches ── */
self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE; })
            .map(function(k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

/* ── Fetch: network-first, cache fallback ── */
self.addEventListener('fetch', function(e) {
  /* Only handle same-origin GET requests */
  if (e.request.method !== 'GET') return;
  var url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;

  e.respondWith(
    fetch(e.request)
      .then(function(resp) {
        var clone = resp.clone();
        caches.open(CACHE).then(function(c) { c.put(e.request, clone); });
        return resp;
      })
      .catch(function() {
        return caches.match(e.request).then(function(r) {
          return r || caches.match('/');
        });
      })
  );
});

/* ── Push: show notification when page is closed ── */
self.addEventListener('push', function(e) {
  var data = { title: '📊 Trading Diary', body: 'Nueva alerta de mercado' };
  try {
    if (e.data) {
      var d = e.data.json();
      data.title = d.title || data.title;
      data.body  = d.body  || data.body;
      data.tag   = d.tag   || undefined;
    }
  } catch(err) {
    try { data.body = e.data ? e.data.text() : data.body; } catch(e2) {}
  }
  e.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: 'https://em-content.zobj.net/source/apple/391/chart-increasing_1f4c8.png',
      badge: 'https://em-content.zobj.net/source/apple/391/chart-increasing_1f4c8.png',
      vibrate: [200, 100, 200],
      requireInteraction: true,
      tag: data.tag || 'trading-alert',
      renotify: true,
      data: data
    })
  );
});

/* ── Notification click: open/focus the app ── */
self.addEventListener('notificationclick', function(e) {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(function(list) {
        for (var i = 0; i < list.length; i++) {
          if (list[i].url.indexOf(self.location.origin) === 0 && 'focus' in list[i]) {
            return list[i].focus();
          }
        }
        if (clients.openWindow) return clients.openWindow('/');
      })
  );
});

/* ── Background sync: ping active clients ── */
self.addEventListener('message', function(e) {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});

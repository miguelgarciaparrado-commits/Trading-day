/* Trading Diary — Service Worker (v2, Web Push + PWA) */
var CACHE = 'trading-diary-v2';
var SHELL = ['/', '/index.html', '/manifest.json', '/icon.svg'];

/* ── Install: cache app shell ── */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(c) {
      return c.addAll(SHELL).catch(function(){ return c.addAll(['/', '/index.html']); });
    })
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

/* ── Fetch: network-first, cache fallback (same-origin GET only) ── */
self.addEventListener('fetch', function(e) {
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

/* ── Push: show rich notification with actions + deep link data ── */
self.addEventListener('push', function(e) {
  var data = { title: '📊 Trading Diary', body: 'Nueva alerta de mercado' };
  try {
    if (e.data) {
      var d = e.data.json();
      data = Object.assign(data, d);
    }
  } catch(err) {
    try { data.body = e.data ? e.data.text() : data.body; } catch(e2) {}
  }

  var opts = {
    body:    data.body,
    icon:    data.icon  || '/icon.svg',
    badge:   data.badge || '/icon.svg',
    tag:     data.tag   || 'trading-alert',
    renotify: true,
    requireInteraction: true,
    vibrate:  data.vibrate || [200, 100, 200],
    data:     data.data || {},
    actions:  Array.isArray(data.actions) ? data.actions.slice(0, 2) : undefined
  };

  e.waitUntil(self.registration.showNotification(data.title, opts));
});

/* ── Notification click: route action + deep link ──
   - action "dismiss"   → close only, no navigation
   - action "open_trade"→ POST mark-active + open app at deep link
   - any other click    → open/focus app at deep link (default "/")
*/
self.addEventListener('notificationclick', function(e) {
  e.notification.close();
  var action   = e.action || '';
  var ndata    = e.notification.data || {};
  var deepLink = ndata.deepLink || '/';

  if (action === 'dismiss') return;

  if (action === 'open_trade' && ndata.tradeId) {
    /* Fire-and-forget: tell the app (once it opens) to mark the trade active.
       We pass the intent via URL query; trading-diary.jsx reads it on load. */
    var sep = deepLink.indexOf('?') >= 0 ? '&' : '?';
    deepLink = deepLink + sep + 'action=open_trade';
  }

  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(list) {
      /* If an existing client is open: focus it and post a message with the deep link */
      for (var i = 0; i < list.length; i++) {
        var c = list[i];
        if (c.url.indexOf(self.location.origin) === 0 && 'focus' in c) {
          try { c.postMessage({ type: 'deep-link', url: deepLink, action: action, data: ndata }); } catch(_){}
          return c.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow(deepLink);
    })
  );
});

/* ── Message: support manual skip-waiting from the app ── */
self.addEventListener('message', function(e) {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});

/* ── Subscription change: log + notify app so it can re-subscribe ── */
self.addEventListener('pushsubscriptionchange', function(e) {
  e.waitUntil(
    clients.matchAll({ type: 'window' }).then(function(list) {
      list.forEach(function(c) {
        try { c.postMessage({ type: 'pushsubscriptionchange' }); } catch(_){}
      });
    })
  );
});

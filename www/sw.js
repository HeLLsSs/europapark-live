/* Service worker : garde la page et les polices en cache pour qu'elle s'ouvre
   instantanément, même quand le réseau du parc est saturé.
   Les temps d'attente (api.php / themeparks.wiki) passent toujours par le réseau. */
const CACHE = 'ep-live-v6';
const TILES = 'ep-tiles';   // fond de carte et Leaflet : gardés d'une version à l'autre
const SHELL = ['./', 'index.html', 'i18n.js', 'manifest.webmanifest', 'parks.json', 'icon.svg', 'icon-180.png', 'icon-192.png', 'icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE && k !== TILES).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);

  // Données en direct : jamais depuis le cache du service worker
  if (url.pathname.endsWith('/api.php') || url.hostname === 'api.themeparks.wiki') return;

  // Tuiles OpenStreetMap et Leaflet : cache d'abord, le réseau seulement pour ce qui manque
  if (url.hostname === 'tile.openstreetmap.org' || (url.hostname === 'cdnjs.cloudflare.com' && url.pathname.includes('/leaflet/'))) {
    e.respondWith(caches.open(TILES).then(async cache => {
      const hit = await cache.match(e.request, {ignoreVary: true});   // tuiles aussi téléchargées par la page (carte hors ligne)
      if (hit) return hit;
      const r = await fetch(e.request);
      if (r.ok || r.type === 'opaque') cache.put(e.request, r.clone());
      return r;
    }));
    return;
  }

  // Polices Google : cache d'abord
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    // Cache permanent (TILES) : une nouvelle version de l'appli ne les efface pas
    e.respondWith(caches.open(TILES).then(async cache => {
      const hit = await cache.match(e.request);
      const net = fetch(e.request).then(r => { if (r.ok || r.type === 'opaque') cache.put(e.request, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    }));
    return;
  }

  // Page et fichiers du site : réseau d'abord, mais pas plus de 3 s s'il y a une copie
  // (réseau saturé dans le parc : connecté, mais rien ne passe) ; cache si hors ligne
  if (url.origin === self.location.origin) {
    const cached = () => caches.match(e.request, {ignoreSearch: true}).then(r => r || caches.match('index.html'));
    const net = fetch(e.request).then(r => { if (r.ok) { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); } return r; });
    e.respondWith(new Promise(resolve => {
      let done = false;
      const finish = r => { if (!done && r) { done = true; resolve(r); } };
      const timer = setTimeout(() => cached().then(finish), 3000);
      net.then(r => { clearTimeout(timer); finish(r); })
        .catch(() => { clearTimeout(timer); cached().then(r => r ? finish(r) : finish(Response.error())); });
    }));
  }
});

// Notifications envoyées par le serveur (api.php, cron collect) : {title, body, tag, url}
self.addEventListener('push', e => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (_) { d = {body: e.data ? e.data.text() : ''}; }
  e.waitUntil(self.registration.showNotification(d.title || 'Europa-Park Live', {
    body: d.body || '',
    tag: d.tag,
    renotify: !!d.tag,
    icon: 'icon-192.png',
    badge: 'icon-192.png',
    data: {url: d.url || './#now'},
    vibrate: [200, 100, 200],
  }));
});

// Toucher la notification : ramène la page ouverte (sur le bon onglet) ou l'ouvre
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = new URL((e.notification.data && e.notification.data.url) || './', self.registration.scope).href;
  e.waitUntil(self.clients.matchAll({type: 'window', includeUncontrolled: true}).then(async list => {
    const c = list[0];
    if (!c) return self.clients.openWindow(url);
    const w = (await c.focus().catch(() => null)) || c;
    if (w.url !== url && 'navigate' in w) await w.navigate(url).catch(() => {});
    return w;
  }));
});

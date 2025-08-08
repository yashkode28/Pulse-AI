self.addEventListener('push', function(event) {
  const data = event.data?.json() || {};
  const title = data.title || "Pulse AI";
  const options = {
    body: data.body || "You have a new notification.",
    icon: '/icon-192x192.png', // update with your icon
    badge: '/badge-72x72.png', // optional
    data: data.url || '/',
  };
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const url = event.notification.data || '/';
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(windowClients => {
      for (let client of windowClients) {
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});

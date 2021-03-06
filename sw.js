let urlFromPush = ""

self.addEventListener('push', (e) =>{
    let optionsFromPush = e.data.json()
    urlFromPush = optionsFromPush.url
    let options = {
        body: optionsFromPush.body,
        icon: './icons/mindblown.png',
        vibrate:[100, 50, 100],
    }
    e.waitUntil(self.registration.showNotification(optionsFromPush.title, options));
})

self.addEventListener('notificationclick', (e) =>{
    let url = urlFromPush;
    e.notification.close(); // Android needs explicit close.
    e.waitUntil(
        clients.matchAll({type: 'window'}).then( windowClients => {
            // Check if there is already a window/tab open with the target URL
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                // If so, just focus it.
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }
            // If not, then open the target URL in a new window/tab.
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
})
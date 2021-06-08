self.addEventListener('push', (e) =>{
    let options = {
        body:'',
        icon: '',
        vibrate:[100, 50, 100],

    }
    e.waitUntil(self.registration.showNotification('Click For Eternal Wisdom', options));
})

self.addEventListener('notificationclick', (e) =>{
    let url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=OfficialRickAstleyOfficialRickAstleyOffiziellerK%C3%BCnstlerkanal';
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
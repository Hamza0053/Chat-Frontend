self.addEventListener('push', (event) => {
    const data = event.data.json();

    const options = {
        body: data.body,
        icon: data.icon,
        badge: data.badge,
        tag: 'whatsapp-notification',
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );

    // ✅ Send data to React via postMessage
    self.clients.matchAll().then(clients => {
        clients.forEach(client => {
            console.log('hello');
            client.postMessage({
                type: "PUSH_NOTIFICATION",
                payload: data
            });
        });
    });
});

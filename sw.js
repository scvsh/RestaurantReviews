self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {

            if (response) {
                return response;
            }

            let requestClone = event.request.clone();

            return fetch(requestClone).then(function(response) {
                let responseClone = response.clone();

                if (response.status !== 200) {
                    return response;
                } else {
                    caches.open('locations').then(function(cache) {
                        cache.put(event.request, responseClone);
                    });

                    return response;
                }
            });
        }),
    );
});

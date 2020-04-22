workbox.precaching.precacheAndRoute(self.__precacheManifest || [])

workbox.routing.registerRoute(
    new RegExp('http://api-test/api/v1/'), //for development
    // new RegExp('https://d-test\\.pp\\.ua/api/v1/'), //for production
    new workbox.strategies.NetworkFirst({
        cacheName: 'api-data'
    })
)
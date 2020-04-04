console.log("Its my service worker")
workbox.precaching.precacheAndRoute(self.__precacheManifest || [])

workbox.routing.registerRoute(
    new RegExp('https://d-test\\.pp\\.ua/api/v1/'),
    new workbox.strategies.NetworkFirst({
        cacheName: 'api-data'
    })
)
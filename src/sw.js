/* eslint-disable no-undef */

workbox.precaching.precacheAndRoute(self.__precacheManifest || [])

workbox.routing.registerRoute(
  // /http:\/\/api-test\/api\/v1\//, // for development
  /https:\/\/d-test.pp.ua\/api\/v1\//, // for production
  new workbox.strategies.NetworkFirst({
    cacheName: 'api-data'
  })
)

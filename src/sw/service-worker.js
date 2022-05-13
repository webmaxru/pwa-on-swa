/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing';
import { setCacheNameDetails, clientsClaim } from 'workbox-core';
import { NetworkFirst, CacheFirst } from 'workbox-strategies';


// SETTINGS

// Claiming control to start runtime caching asap
clientsClaim();

// Use to update the app after user triggered refresh
//self.skipWaiting();

// PRECACHING

// Precache and serve resources from __WB_MANIFEST array
precacheAndRoute(self.__WB_MANIFEST);

// NAVIGATION ROUTING

// This assumes /index.html has been precached.
const navHandler = createHandlerBoundToURL('/index.html');
const navigationRoute = new NavigationRoute(navHandler, {
  denylist: [
    new RegExp('/account'),
    new RegExp('/admin'),
    new RegExp('/login'),
    new RegExp('/logout'),
    new RegExp('/.auth'),
    new RegExp('/aboutme'),
    new RegExp('/400.html'),
    new RegExp('/404.html'),
    new RegExp('/privacy.html'),
  ], // Also might be specified explicitly via allowlist
});
registerRoute(navigationRoute);


// APP SHELL UPDATE FLOW

addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Registering a route for /news endpoint
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/news'),
  new NetworkFirst()
);

// Registering a route for /archives endpoint
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/archives'),
  new CacheFirst()
);
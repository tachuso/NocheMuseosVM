// Copyright 2016 Google Inc.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var cacheName = 'NocheMuseosVM';
var filesToCache = [
  '',
  'index.html',
  'home.html',
  'route.html',
  'museums.html',

  'js/common.min.js',
  'js/ui.min.js',
  'js/home.min.js',
  'js/route.min.js',
  'js/museums.min.js',

  'libs/jquery/jquery-1.min.js',
  'libs/underscore/underscore-min.js',
  'libs/backbone/backbone-min.js',
  'libs/bootstrap/js/bootstrap.min.js',
  'libs/kendo/js/kendo.all.min.js',
  'libs/kendo/js/jszip.min.js',
  'libs/kendo/js/cultures/kendo.culture.es.min.js',
  'libs/kendo/js/cultures/kendo.culture.en.min.js',
  'libs/kendo/js/cultures/kendo.culture.es-AR.min.js',
  'libs/datejs/date.js',

  'css/ui.min.css',
  'css/colors.min.css',
  'css/common.min.css',
  'css/home.min.css',
  'css/route.min.css',
  'css/scrollbar.min.css',

  'fonts/materialdesign/css/materialdesignicons.min.css',

  'img/sky2.jpg',
  'img/stars.png',
  'img/unvimeLogo.png',
  'img/unvimeLogo2.png',
];

self.addEventListener('install', function (e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
      caches.open(cacheName).then(function (cache) {
          console.log('[ServiceWorker] Caching app shell');
          return cache.addAll(filesToCache);
      })
    );
});

self.addEventListener('activate', function (e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
      caches.keys().then(function (keyList) {
          return Promise.all(keyList.map(function (key) {
              if (key !== cacheName) {
                  console.log('[ServiceWorker] Removing old cache', key);
                  return caches.delete(key);
              }
          }));
      })
    );
    /*
     * Fixes a corner case in which the app wasn't returning the latest data.
     * You can reproduce the corner case by commenting out the line below and
     * then doing the following steps: 1) load app for first time so that the
     * initial New York City data is shown 2) press the refresh button on the
     * app 3) go offline 4) reload the app. You expect to see the newer NYC
     * data, but you actually see the initial data. This happens because the
     * service worker is not yet activated. The code below essentially lets
     * you activate the service worker faster.
     */
    return self.clients.claim();
});

self.addEventListener('fetch', function (e) {
    console.log('[ServiceWorker] Fetch', e.request.url);
    e.respondWith(
      caches.match(e.request).then(function (response) {
          return response || fetch(e.request);
      })
    );
});

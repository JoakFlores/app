;
//asignar un nombre y versión al cache
const CACHE_NAME = 'v2.1_cache_miscore',
  urlsToCache = [
    './',
    './css/framework7.bundle.min.css',
    './css/framework7-icons.css',
    './css/detalle-goleo.css',
    './css/home.css',
    './css/index.css',
    './css/resultados.css',
    './css/settings.css',
    './css/show-info.css',
    './css/splash.css',
    './img/BackGroundDefault.png',
    './img/Splash.png',
    './img/BackGroundDetGol.png',
    './img/BackGroundInfo.png',
    './img/Balon.ico',
    './img/tarjeta_amarilla.png',
    './img/tarjeta_roja.png',
    './img/Tor_1_1_2.png',
    './js/framework7.bundle.min.js',
    './js/detalle_goleo.js',
    './js/global.js',
    './script.js',
    './js/home.js',
    './js/index.js',
    './js/resultados.js',
    './js/settings.js',
    './js/show-info.js',
    './js/push-notification.js',
    './views/detalle-goleo.html',
    './views/home.html',
    './views/settings.html',
    './views/show-info.html',
    './index.html',
    './fonts/Roboto-Regular.ttf',
  ]

//durante la fase de instalación, generalmente se almacena en caché los archivos estáticos
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("Opened cache")
        return cache.addAll(urlsToCache)
          .then(() => self.skipWaiting())
      })
      .catch(err => console.log('Falló registro de cache', err))
  )
})


//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME]

  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            //Eliminamos lo que ya no se necesita en cache
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      // Le indica al SW activar el cache actual
      .then(() => self.clients.claim())
  )
})

//cuando el navegador recupera una url
self.addEventListener('fetch', e => {
  //Responder ya sea con el objeto en caché o continuar y buscar la url real
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) {
          //recuperar del cache
          return res
        }
        //recuperar de la petición a la url
        return fetch(e.request)
      })
  )
})

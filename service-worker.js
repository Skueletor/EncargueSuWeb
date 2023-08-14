const swVersion = '1';

const name = 'EncargueSuWeb'
const dataCacheName = `${name}-data-V${swVersion}`; //EncargueSuWeb-data-V1
const cacheName = `${name}-V${swVersion}`; //EncargueSuWeb-V1
const initialPath = '/' + name;

// Static resource to be cached.
const filesToCache = [
   //pages
   initialPath + '/',
   initialPath + '/index.html',
   initialPath + '/pages/quien-soy.html',
   initialPath + '/pages/caracteristicas-web.html',
   initialPath + '/pages/contactenos.html',
   initialPath + '/pages/politica-privacidad.html',
   initialPath + '/pages/precios.html',
   initialPath + '/pages/preguntas-frecuentes.html',
   initialPath + '/pages/terminos-condiciones.html',
   //styles
   initialPath + '/src/css/modules/bundle.min.css',
   initialPath + '/src/css/modules/prism.css',
   initialPath + '/src/css/modules/swiper-bundle.min.css',
   initialPath + '/src/css/extra.min.css',
   //javascript
   initialPath + '/src/js/modules/bundle.min.js',
   initialPath + '/src/js/modules/bootstrap.bundle.min.js',
   initialPath + '/src/js/modules/prism.js',
   initialPath + '/src/js/modules/swiper-bundle.min.js',
   initialPath + '/src/js/about-me.min.js',
   initialPath + '/src/js/info-web.min.js',
   //fonts
   initialPath + '/src/fonts/BOUNCY-GUM.ttf',
   //img
   //logo
   initialPath + '/src/img/logo/46/white-blue.png',
   initialPath + '/src/img/logo/46/white-black.png',
   initialPath + '/src/img/logo/150/white-black.png',
   initialPath + '/src/img/logo/150/white-blue.png',
   initialPath + '/src/img/logo/192/white-black.png',
   initialPath + '/src/img/logo/256/white-black.png',
   initialPath + '/src/img/logo/384/white-black.png',
   initialPath + '/src/img/logo/512/white-black.png',
   initialPath + '/src/img/logo/maskable/white-black.png',
   initialPath + '/src/img/logo/favicon/apple-touch-icon.png',
   initialPath + '/src/img/logo/favicon/favicon-32x32.png',
   initialPath + '/src/img/logo/favicon/favicon-16x16.png',
   initialPath + '/src/img/logo/favicon/favicon.ico',
   //carrusel
   initialPath + '/src/img/carousel/img1/img.png',
   initialPath + '/src/img/carousel/img1/360.png',
   initialPath + '/src/img/carousel/img1/768.png',
   initialPath + '/src/img/carousel/img2/img.jpg',
   initialPath + '/src/img/carousel/img2/360.jpg',
   initialPath + '/src/img/carousel/img2/768.jpg',
   initialPath + '/src/img/carousel/img3/img.jpg',
   initialPath + '/src/img/carousel/img3/360.jpg',
   initialPath + '/src/img/carousel/img3/768.jpg',
   //icons
   initialPath + '/src/img/icon/cliente.png',
   initialPath + '/src/img/icon/flecha-arriba.png',
   initialPath + '/src/img/icon/inicio.svg',
   initialPath + '/src/img/icon/precios.png',
   initialPath + '/src/img/icon/web.png',
   initialPath + '/src/img/icon/pregunta.png',
   initialPath + '/src/img/icon/faq.png',
   initialPath + '/src/img/icon/cerrar.png',
   //my
   initialPath + '/src/img/my/46.png',
   initialPath + '/src/img/my/150.png',
   initialPath + '/src/img/my/512.png',
   //iconos socials media
   initialPath + '/src/img/icon/whatsapp-dark.svg',
   initialPath + '/src/img/icon/whatsapp-light.svg',
   initialPath + '/src/img/icon/facebook-dark.svg',
   initialPath + '/src/img/icon/facebook-light.svg',
   initialPath + '/src/img/icon/instagram-dark.svg',
   initialPath + '/src/img/icon/instagram-light.svg',
   initialPath + '/src/img/icon/telegram-light.svg',
   initialPath + '/src/img/icon/telegram-dark.svg',
   initialPath + '/src/img/icon/linkedin-light.svg',
   initialPath + '/src/img/icon/github-light.svg',
   //iconos home
   initialPath + '/src/img/home/soporte.png',
   initialPath + '/src/img/home/confianza.png',
   initialPath + '/src/img/home/profesionalismo.png',
   initialPath + '/src/img/home/rendimiento.png',
   initialPath + '/src/img/home/enlinea.png',
   initialPath + '/src/img/home/personalizacion.png',
   initialPath + '/src/img/home/app-0.png',
   initialPath + '/src/img/home/google-0.jpg',
   initialPath + '/src/img/home/app.png',
   initialPath + '/src/img/home/google.jpg',
   //quien soy/ who i am 
   initialPath + '/src/img/quien-soy/fondo/360.jpg',
   initialPath + '/src/img/quien-soy/fondo/768.jpg',
   initialPath + '/src/img/quien-soy/fondo/img.jpg',
   initialPath + '/src/img/quien-soy/experiencia.png',
   initialPath + '/src/img/quien-soy/ideoma.svg',
   initialPath + '/src/img/quien-soy/pais.png',
   initialPath + '/src/img/quien-soy/mapa.png',
   initialPath + '/src/img/quien-soy/edad.png',

];

// Service worker install hook.
self.addEventListener('install', function(e) {
   e.waitUntil(
      caches.open(cacheName).then(function(cache) {
         return cache.addAll(filesToCache);
      })
   );
});

// Service worker activation hook.
self.addEventListener('activate', function(e) {
   e.waitUntil(
      caches.keys().then(function(keyList) {
         return Promise.all(keyList.map(function(key) {
            if (key !== cacheName && key !== dataCacheName) {
               return caches.delete(key);
            }
         }));
      })
   );
   return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
   e.respondWith(
      caches.match(e.request).then(function (response) {
         console.log(e.request)
         return response || fetch(e.request);
      })
   );
});

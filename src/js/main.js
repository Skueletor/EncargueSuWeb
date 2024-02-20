"serviceWorker"in navigator&&navigator.serviceWorker.register(`/${main.nameWeb}/serviceWorker.js`).then(function(r){console.log("Service Worker registrado con \xe9xito:",r)}).catch(function(r){console.info("Error al registrar el Service Worker:",r)});


(function() {
   if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register(`/${main.nameWeb}/serviceWorker.js`)
      .then(function(registration) {
         console.log('Service Worker registrado con éxito:', registration);
      })
      .catch(function(error) {
         console.info('Error al registrar el Service Worker:', error);
      });
   }
})();
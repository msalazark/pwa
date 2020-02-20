// asignar nombre  y versión 
const CACHE_NAME = "vl_cache_mask" 

// ficheros en el cache de la aplicación 
var urlsToCache = [
	"./", 
	"./css/style.css" , 
	"./img/favicon.png" , 
	"./img/1.png" , 
	"./img/2.png" , 
	"./img/3.png" , 
	"./img/4.png" , 
	"./img/5.png" , 
	"./img/6.png" , 
	"./img/facebook.png" , 
	"./img/instagram.png" , 
	"./img/twitter.png" , 
	"./img/favicon-1024.png" , 
	"./img/favicon-512.png" , 
	"./img/favicon-384.png" , 
	"./img/favicon-256.png" , 
	"./img/favicon-192.png" , 
	"./img/favicon-128.png" , 
	"./img/favicon-96.png" , 
	"./img/favicon-64.png" , 
	"./img/favicon-32.png" , 		
	"./img/favicon-16.png"  
]; 

// evento install : instalación de sw , almacenar archivos y guarda recursos estàticos 
self.addEventListener("install", e => {
	e.waitUntil(
		caches.open(CACHE_NAME)
			.then(cache => {
				return cache.addAll(urlsToCache)
						.then( ()=> {
							self.skipWaiting();
						});
			})
			.catch( err => console.log("no se registró Caché" , err )) 	
	); 
}); 

// evento activate 
self.addEventListener("activate" , e => {
	const cacheWhitelist = [CACHE_NAME];
	e.waitUntil(
		caches.keys()
			.then( cacheNames => {
				return Promise.all(
					cacheNames.map( cacheName => {
						if (cacheWhitelist.indexOf(cacheName) === -1 ) {
							// eliminar elementos no necesitados 
							return caches.delete(cacheName); 
						}
					}) 
				);
			})
			.then( () => {
				// activar la cache en el dispositivo 
				self.clients.claim(); 
			}) 
	);

}); 

// evento fetch  
self.addEventListener ( 'fetch' , e => {
	e.respondWith(
		caches.match( e.request )
				.then( res => {
					if (res) {
						// devuelvo ratos de cache 
						return res; 
					}
					return fetch(e.request); 
				})
	);
});




/* Only public offline UI is cached. Private trips/files live in IndexedDB. */
const CACHE='ferd-offline-shell-v9-20261029-navigation:'+self.registration.scope;
const root=new URL(self.registration.scope);
const shell=['offline.html','wallet-tickets.js','activity-times.js','rental-cars.js','travel-navigation.js','offline.js','offline-store.js'];
const url=name=>new URL(name,root).href;
self.addEventListener('install',event=>event.waitUntil((async()=>{const cache=await caches.open(CACHE);for(const name of shell){const response=await fetch(url(name),{cache:'reload'});if(!response.ok)throw new Error('Missing offline asset: '+name);await cache.put(url(name),response)}await self.skipWaiting()})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith('ferd-offline-shell-')&&key.endsWith(':'+self.registration.scope)&&key!==CACHE)await caches.delete(key);await self.clients.claim()})()));
self.addEventListener('message',event=>{if(event.data?.type==='CHECK_OFFLINE_SHELL')event.waitUntil((async()=>{const cache=await caches.open(CACHE),ready=(await Promise.all(shell.map(name=>cache.match(url(name))))).every(Boolean);event.ports[0]?.postMessage({ready})})())});
self.addEventListener('fetch',event=>{
 const request=event.request,u=new URL(request.url);if(request.method!=='GET'||u.origin!==root.origin)return;
 if(shell.some(name=>u.pathname===new URL(name,root).pathname)){event.respondWith((async()=>{const cache=await caches.open(CACHE);return await cache.match(url(shell.find(name=>u.pathname===new URL(name,root).pathname)))||fetch(request)})());return}
 // Never intercept unrelated sites hosted under other GitHub project paths.
 if(request.mode==='navigate'&&(u.pathname===root.pathname||u.pathname===new URL('index.html',root).pathname))event.respondWith((async()=>{const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),4500);try{const response=await fetch(request,{signal:controller.signal});if(!response.ok)throw new Error('Navigation failed');return response}catch{const cache=await caches.open(CACHE);return await cache.match(url('offline.html'))||new Response('Ferðin hefur ekki verið sótt fyrir notkun án nets.',{status:503,headers:{'Content-Type':'text/plain;charset=utf-8'}})}finally{clearTimeout(timer)}})());
});

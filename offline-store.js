/* Device-local, per-site travel copies. No auth tokens or server writes. */
(()=>{
 'use strict';
 const scope=new URL('.',location.href).pathname;
 const dbName='ferdakerfid-offline-v1:'+scope, signal='ferdakerfid-offline-change:'+scope;
 function announce(){try{localStorage.setItem(signal,Date.now()+':'+Math.random())}catch{}globalThis.dispatchEvent?.(new Event('travel-offline-change'))}
 function openDB(){return new Promise((resolve,reject)=>{if(!globalThis.indexedDB)return reject(new Error('Þessi vafri styður ekki vistun ferðar í tækinu.'));const req=indexedDB.open(dbName,1);req.onupgradeneeded=()=>{const db=req.result;db.createObjectStore('meta');db.createObjectStore('trips',{keyPath:'key'})};req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);req.onblocked=()=>reject(new Error('Lokaðu öðrum flipum appsins og reyndu aftur.'))})}
 async function transaction(mode,work){const db=await openDB();return new Promise((resolve,reject)=>{const tx=db.transaction(['meta','trips'],mode);let result,reason;const api={meta:tx.objectStore('meta'),trips:tx.objectStore('trips'),result:v=>result=v,fail:e=>{reason=e;tx.abort()}};tx.oncomplete=()=>{db.close();resolve(result)};tx.onerror=()=>{};tx.onabort=()=>{db.close();reject(reason||tx.error||new Error('Ekki tókst að vista í tækinu.'))};try{work(api)}catch(e){api.fail(e)}})}
 function checked(api,owner,work){const req=api.meta.get('owner');req.onsuccess=()=>{try{if(!owner||req.result!==owner)return api.fail(new Error('Innskráning breyttist. Opnaðu ferðina aftur.'));work()}catch(e){api.fail(e)}}}
 async function activate(owner){await transaction('readwrite',a=>{const req=a.meta.get('owner');req.onsuccess=()=>{if(req.result!==owner)a.trips.clear();owner?a.meta.put(owner,'owner'):a.meta.delete('owner')}});announce()}
 async function owner(){return transaction('readonly',a=>{const req=a.meta.get('owner');req.onsuccess=()=>a.result(req.result||null)})}
 async function list(user){return transaction('readonly',a=>checked(a,user,()=>{const req=a.trips.getAll();req.onsuccess=()=>a.result(req.result.filter(x=>x.owner===user).map(({documents,...p})=>({...p,documents:documents.map(({blob,...d})=>d)})))}))}
 async function read(user,id){return transaction('readonly',a=>checked(a,user,()=>{const req=a.trips.get(user+':'+id);req.onsuccess=()=>a.result(req.result||null)}))}
 async function replace(user,pack){if(!pack?.trip?.id||!Array.isArray(pack.documents))throw new Error('Ófullgerð ferð.');await transaction('readwrite',a=>checked(a,user,()=>a.trips.put({...pack,key:user+':'+pack.trip.id,owner:user})));announce()}
 async function remove(user,id){await transaction('readwrite',a=>checked(a,user,()=>a.trips.delete(user+':'+id)));announce()}
 async function clear(){await transaction('readwrite',a=>{a.trips.clear();a.meta.clear()});announce()}
 globalThis.OfflineTravel={activate,owner,list,read,replace,remove,clear,signal};
})();

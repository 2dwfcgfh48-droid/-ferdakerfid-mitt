/* Optional discovery thumbnails only. No trip data, credentials or persistent writes. */
(function(){'use strict';
const AGENT='FerdakerfidMitt/155 (https://github.com/2dwfcgfh48-droid/-ferdakerfid-mitt)';
const qid=v=>typeof v==='string'&&/^Q[1-9][0-9]{0,14}$/.test(v);
const folded=v=>String(v||'').normalize('NFD').replace(/\p{M}/gu,'').toLowerCase().replace(/[^\p{L}\p{N}]/gu,'');
const values=(e,p)=>{const a=(e?.claims||e?.statements||{})[p]||[];const live=a.filter(x=>x.rank!=='deprecated'&&x.mainsnak?.snaktype==='value');return (live.some(x=>x.rank==='preferred')?live.filter(x=>x.rank==='preferred'):live).map(x=>x.mainsnak.datavalue?.value)};
const https=(v,host)=>{try{const u=new URL(v);return u.protocol==='https:'&&u.hostname===host&&!u.port&&!u.username&&!u.password?u:null}catch{return null}};
const text=v=>{if(typeof v!=='string'||v.length>20000)return '';const d=document.createElement('template');d.innerHTML=v;d.content.querySelectorAll('script,style,iframe,object').forEach(x=>x.remove());return d.content.textContent.replace(/\s+/g,' ').trim()};
function matches(place,e){
 if(!qid(place.wikidata)||e?.id!==place.wikidata||e.type!=='item')return false;
 const names=[...Object.values(e.labels||{}),...Object.values(e.aliases||{}).flat()].map(x=>folded(x?.value));
 if(folded(place.name).length<2||!names.includes(folded(place.name)))return false;
 const coords=values(e,'P625');if(!coords.length)return false;
 return coords.every(c=>{if(!c||c.globe!=='http://www.wikidata.org/entity/Q2'||!Number.isFinite(c.latitude)||!Number.isFinite(c.longitude)||Math.abs(c.latitude)>90||Math.abs(c.longitude)>180||!Number.isFinite(place.latitude)||!Number.isFinite(place.longitude)||Math.abs(place.latitude)>90||Math.abs(place.longitude)>180)return false;
  const r=x=>x*Math.PI/180,h=Math.sin(r(c.latitude-place.latitude)/2)**2+Math.cos(r(c.latitude))*Math.cos(r(place.latitude))*Math.sin(r(c.longitude-place.longitude)/2)**2;return 12742000*Math.asin(Math.sqrt(Math.min(1,h)))<=250;
 });
}
function metadata(data,file,compactAuthor=false){
 const pages=data?.query?.pages;if(!Array.isArray(pages)||pages.length!==1)return null;
 const p=pages[0],i=p.imageinfo?.[0],m=i?.extmetadata||{};
 if(p.missing||p.invalid||p.ns!==6||p.title?.replaceAll('_',' ')!=='File:'+file.replaceAll('_',' ')||!Number.isInteger(p.pageid)||!['image/jpeg','image/png','image/webp'].includes(i?.mime))return null;
 const source=https(i.descriptionurl,'commons.wikimedia.org'),thumb=https(i.thumburl,'upload.wikimedia.org')||https(i.thumburl,'thumb.wikimedia.org');
 if(!source||!thumb||!source.pathname.startsWith('/wiki/File:')||!thumb.pathname.startsWith('/wikipedia/commons/'))return null;
 let sourceFile;try{sourceFile=decodeURIComponent(source.pathname.slice('/wiki/File:'.length)).replaceAll('_',' ')}catch{return null}
 if(sourceFile!==file.replaceAll('_',' '))return null;
 let author=text(m.Artist?.value);if(compactAuthor&&author.length>300){const t=document.createElement('template');t.innerHTML=m.Artist.value;const names=[...new Set([...t.content.querySelectorAll('a[title^="User:"]')].filter(a=>{try{const u=new URL(a.getAttribute('href'),'https://commons.wikimedia.org');return u.protocol==='https:'&&u.hostname==='commons.wikimedia.org'&&u.pathname.startsWith('/wiki/User:')}catch{return false}}).map(a=>a.textContent.trim()).filter(Boolean))];if(names.length!==1)return null;author=names[0]}const license=text(m.LicenseShortName?.value),url=https(m.LicenseUrl?.value,'creativecommons.org');
 const match=url?.pathname.match(/^\/licenses\/(by|by-sa)\/(1\.0|2\.0|2\.5|3\.0|4\.0)\/?$/);
 if(!author||!match||license!=='CC '+match[1].toUpperCase()+' '+match[2]||text(m.Restrictions?.value))return null;
 return {file,pageid:p.pageid,url:thumb.href,source:source.href,author,license,licenseUrl:url.href,credit:text(m.Attribution?.value)||text(m.Credit?.value)};
}
function mount({host,thumbnailWidth=240}){
 const cache=new Map();let queue=[],running=false,epoch=0,active=null,blockedUntil=0,lastCall=0,notice=null;
 const observer=typeof IntersectionObserver==='function'?new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting){observer.unobserve(e.target);const job=jobs.get(e.target);if(job){jobs.delete(e.target);queue.push(job)}}pump()},{rootMargin:'120px'}):null;
 let jobs=new WeakMap();
 function problem(){if(notice||host.hidden)return;notice=document.createElement('p');notice.className='notice nearby-photo-status';notice.textContent='Ekki tókst að sækja staðarmyndir. Staðalistinn er áfram aðgengilegur.';const anchor=host.querySelector('.nearby-results');if(anchor)anchor.after(notice);else host.append(notice)}
 async function api(site,params,signal){
  const wait=Math.max(0,300-(Date.now()-lastCall));if(wait)await new Promise(resolve=>setTimeout(resolve,wait));if(signal.aborted)throw new DOMException('Aborted','AbortError');
  if(Date.now()<blockedUntil)throw Error('cooldown');lastCall=Date.now();
  const u=new URL('https://'+site+'/w/api.php');u.search=new URLSearchParams({...params,format:'json',origin:'*',maxlag:'5'});
  const timeout=setTimeout(()=>active?.abort(),25000);
  try{const r=await fetch(u.href,{signal,credentials:'omit',referrerPolicy:'no-referrer',headers:{'Api-User-Agent':AGENT}});
   if(r.status===429||r.status===503){const raw=r.headers.get('Retry-After'),seconds=Number(raw),date=Date.parse(raw);blockedUntil=Date.now()+Math.min(3600000,Math.max(60000,Number.isFinite(seconds)&&seconds>0?seconds*1000:Number.isFinite(date)?date-Date.now():60000));throw Error('cooldown')}
   if(!r.ok)throw Error('provider');
   const reader=r.body?.getReader();if(!reader)throw Error('empty');let size=0;const parts=[];
   try{for(;;){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>2000000)throw Error('large');parts.push(value)}}finally{await reader.cancel().catch(()=>{})}
   const bytes=new Uint8Array(size);let offset=0;for(const p of parts){bytes.set(p,offset);offset+=p.byteLength}const d=JSON.parse(new TextDecoder().decode(bytes));if(d.error){if(d.error.code==='maxlag'||d.error.code==='ratelimited')blockedUntil=Date.now()+60000;throw Error('provider')}return d;
  }finally{clearTimeout(timeout)}
 }
 async function load(place,signal,knownEntity){
  const key=JSON.stringify([place.wikidata,place.name,place.latitude,place.longitude]),saved=cache.get(key);if(saved&&saved.until>Date.now())return saved.value;
  const entity=knownEntity||((await api('www.wikidata.org',{action:'wbgetentities',ids:place.wikidata,props:'labels|aliases|claims'},signal)).entities?.[place.wikidata]);let photo=null;
  if(matches(place,entity)){
   const files=values(entity,'P18').filter(f=>typeof f==='string'&&f.length<=250&&!/[|#\u0000-\u001f]/.test(f));
   // Ambiguous image statements are not resolved by guessing.
   if(files.length===1){const file=files[0],info=await api('commons.wikimedia.org',{action:'query',formatversion:'2',titles:'File:'+file,prop:'imageinfo',iiprop:'url|mime|extmetadata',iiurlwidth:thumbnailWidth===960?'960':'240',iiextmetadatalanguage:'en'},signal);photo=metadata(info,file,thumbnailWidth===960);
    if(photo){const media=await api('commons.wikimedia.org',{action:'wbgetentities',ids:'M'+photo.pageid,props:'claims'},signal),e=media.entities?.['M'+photo.pageid];
     if(e?.id!=='M'+photo.pageid||e.type!=='mediainfo')photo=null;
     else {const depicts=values(e,'P180').map(x=>x?.id).filter(qid);if(depicts.length&&!depicts.includes(place.wikidata))photo=null}
    }
   }
  }
  if(signal.aborted)throw new DOMException('Aborted','AbortError');cache.set(key,{value:photo,until:Date.now()+(photo?3600000:600000)});if(cache.size>200)cache.delete(cache.keys().next().value);return photo;
 }
 function display(job,photo){
  const {overview,card,own}=job;if(own!==epoch||!overview.isConnected||host.hidden)return;
  const image=new Image();image.className='nearby-place-photo';image.width=104;image.height=78;image.alt='';image.decoding='async';image.referrerPolicy='no-referrer';
  image.onload=()=>{if(own!==epoch||!overview.isConnected||host.hidden)return;const frame=document.createElement('span');frame.className='nearby-photo-frame';frame.append(image);overview.prepend(frame);overview.classList.add('nearby-result-with-photo');
   const credit=document.createElement('p');credit.className='notice nearby-photo-credit';
   const link=(label,url)=>{const a=document.createElement('a');a.textContent=label;a.href=url;a.target='_blank';a.rel='noopener noreferrer';return a};
   credit.append(link('Mynd: '+photo.author,photo.source),document.createTextNode(' · '),link(photo.license,photo.licenseUrl));
   if(photo.credit)credit.append(document.createTextNode(' · '+photo.credit));card.append(credit);
  };
  image.onerror=()=>{if(own===epoch&&overview.isConnected)problem()};image.src=photo.url;
 }
 async function pump(){if(running)return;running=true;try{while(queue.length){const job=queue.shift();if(job.own!==epoch||!job.overview.isConnected)continue;if(Date.now()<blockedUntil){problem();continue}const current=new AbortController();active=current;
   try{const photo=await load(job.place,current.signal,job.entity);if(photo)display(job,photo)}catch(e){if(job.own===epoch)problem()}finally{if(active===current)active=null}
  }}finally{running=false}}
 return {
  watch(place,overview,card,entity){if(!qid(place.wikidata))return;const job={place,overview,card,entity,own:epoch};if(observer){jobs.set(overview,job);observer.observe(overview)}else overview.parentElement.addEventListener('toggle',()=>{if(overview.parentElement.open&&job.own===epoch){queue.push(job);pump()}},{once:true})},
  reset(){epoch++;active?.abort();queue=[];jobs=new WeakMap();observer?.disconnect();notice?.remove();notice=null}
 };
}
window.NearbyPhotos={mount};
})();

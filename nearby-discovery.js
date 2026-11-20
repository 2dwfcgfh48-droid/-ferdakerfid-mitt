/* HUG-03/04: isolated, temporary discovery state; never writes trip or booking data. */
(function(){'use strict';
const categories=[['sights','🏛️','Áhugaverðir staðir'],['events','🎭','Viðburðir og markaðir'],['food','🍷','Matur og drykkur'],['outdoors','🚴','Afþreying og útivist'],['webcams','📷','Vefmyndavélar'],['practical','🧰','Hagnýtt nálægt mér']];
const active=new Set(['sights','food','practical']);
const safe=v=>{try{const u=new URL(v);return u.protocol==='https:'&&!u.username&&!u.password?u.href:null}catch{return null}};
const point=s=>s&&typeof s.latitude==='number'&&typeof s.longitude==='number'&&Number.isFinite(s.latitude)&&Number.isFinite(s.longitude)&&Math.abs(s.latitude)<=90&&Math.abs(s.longitude)<=180?[s.longitude,s.latitude]:null;
function mount({host,button,context,request,showPoints,clearPoints}){
 let version=0,controller=null,gps=null,category=null,opened=false,contextKey='',results=[],lastStopId=null,manualCenter=false;
 const node=(tag,text,cls)=>{const el=document.createElement(tag);if(text!=null)el.textContent=text;if(cls)el.className=cls;return el};
 host.hidden=true;host.classList.add('nearby-discovery');
 const heading=node('h3','🧭 Uppgötva nágrennið');host.append(heading);
 const close=node('button','Loka','btn small');close.type='button';host.append(close);
 const form=node('div',null,'nearby-context'),label=node('label','Leit miðast við'),select=node('select');label.append(select);form.append(label);
 const radiusLabel=node('label','Fjarlægð'),radius=node('select');for(const n of [1,2,5,10,15,20]){const o=node('option',n+' km');o.value=n;radius.append(o)}radius.value='5';radiusLabel.append(radius);form.append(radiusLabel);host.append(form);
 const modeLabel=node('label','Ferðamáti'),mode=node('select');for(const [value,text] of [['walking','Gangandi'],['driving','Í bíl']]){const o=node('option',text);o.value=value;mode.append(o)}modeLabel.append(mode);form.append(modeLabel);
 const gpsButton=node('button','Nota núverandi staðsetningu','btn small');gpsButton.type='button';host.append(gpsButton);
 const grid=node('div',null,'nearby-grid');const buttons=[];
 for(const [key,icon,text] of categories){const b=node('button',null,'btn nearby-category');b.type='button';b.dataset.nearbyCategory=key;b.setAttribute('aria-pressed','false');b.append(node('span',icon,'nearby-emoji'),node('span',text));b.onclick=()=>search(key);buttons.push(b);grid.append(b)}host.append(grid);
 const status=node('p','', 'notice');status.setAttribute('role','status');status.setAttribute('aria-live','polite');host.append(status);
 const list=node('div',null,'nearby-results');host.append(list);
 const attr=node('p',null,'notice nearby-attribution');for(const [text,url] of [['Powered by Geoapify','https://www.geoapify.com/'],['© OpenStreetMap contributors','https://www.openstreetmap.org/copyright']]){const a=node('a',text);a.href=url;a.target='_blank';a.rel='noopener noreferrer';attr.append(a,document.createTextNode(' '))}attr.hidden=true;host.append(attr);
 function invalidate(){version++;controller?.abort();controller=null;results=[];list.replaceChildren();clearPoints();attr.hidden=true;host.removeAttribute('aria-busy')}
 function refresh(){const ctx=context();lastStopId=ctx.stopId;manualCenter=false;const stops=ctx.stops||[];select.replaceChildren();for(const s of stops){const o=node('option',s.label||s.name);o.value=s.id;o.disabled=!point(s);select.append(o)}
  if(gps){const o=node('option','Núverandi staðsetning');o.value='gps';select.append(o);select.value='gps'}else if(stops.some(s=>s.id===ctx.stopId))select.value=ctx.stopId;else{const first=stops.find(s=>point(s));if(first)select.value=first.id}
  contextKey=JSON.stringify([ctx.owner,ctx.tripId,stops.map(s=>[s.id,s.latitude,s.longitude])]);status.textContent=stops.some(point)||gps?'Veldu flokk til að leita í nágrenninu.':'Veldu staðsetningu áfangastaðar eða notaðu núverandi staðsetningu.';
 }
 function change(){invalidate();if(category)search(category)}
 async function search(key){
  invalidate();category=key;buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.nearbyCategory===key)));
  if(!active.has(key)){status.textContent='Gögn fyrir þennan flokk eru ekki enn tengd í þessari áfangaútgáfu.';return}
  const ctx=context(),stop=select.value==='gps'?gps:(ctx.stops||[]).find(s=>s.id===select.value),center=point(stop);
  if(!ctx.tripId||!center){status.textContent='Staðsetningu vantar. Veldu áfangastað með kortapunkti eða núverandi staðsetningu.';return}
  const own=version;controller=new AbortController();const current=controller;let timedOut=false;const timer=setTimeout(()=>{timedOut=true;current.abort()},25000);status.textContent='Sæki staði…';host.setAttribute('aria-busy','true');
  try{const data=await request({trip_id:ctx.tripId,category:key,center,radius_km:Number(radius.value)},controller.signal);if(own!==version||!opened)return;
   if(data.error){status.textContent=data.error;return}
   if(!Array.isArray(data.results))throw Error('shape');
   results=data.results.filter(x=>typeof x.name==='string'&&point(x));
   for(const p of results){const card=node('article',null,'nearby-result');card.append(node('strong',p.name));if(p.address)card.append(node('p',p.address,'notice'));
    if(Number.isFinite(p.distance_m))card.append(node('p',p.distance_m<1000?p.distance_m+' m frá leitarmiðju':(p.distance_m/1000).toLocaleString('is-IS',{maximumFractionDigits:1})+' km frá leitarmiðju','notice'));
    const actions=node('div',null,'nearby-actions');const map=node('button','Sýna á korti','btn small');map.type='button';map.onclick=()=>showPoints([p],true);actions.append(map);
    const url=new URL('https://www.google.com/maps/dir/');url.searchParams.set('api','1');url.searchParams.set('destination',p.latitude+','+p.longitude);url.searchParams.set('origin',center[1]+','+center[0]);url.searchParams.set('travelmode',mode.value);
    const nav=node('a','Leiðsögn í Google Maps ↗','btn small');nav.href=url.href;nav.target='_blank';nav.rel='noopener noreferrer';actions.append(nav);
    if(safe(p.website)){const a=node('a','Vefsíða ↗','btn small');a.href=safe(p.website);a.target='_blank';a.rel='noopener noreferrer';actions.append(a)}card.append(actions);list.append(card);
   }
   showPoints(results,false);attr.hidden=false;status.textContent=results.length?'Sýni '+results.length+' staði. Listinn er ekki tæmandi.':'Engir staðir komu úr þessari leit. Það staðfestir ekki að þjónustan sé ekki til staðar.';
   if(key==='practical')status.textContent+=' Sumir þjónustuflokkar bíða enn gagnatengingar.';
  }catch(e){if(own===version&&(timedOut||e.name!=='AbortError'))status.textContent=timedOut?'Svarfrestur rann út. Prófaðu aftur síðar.':'Ekki tókst að sækja staði. Prófaðu aftur síðar.'}finally{clearTimeout(timer);if(own===version)host.removeAttribute('aria-busy')}
 }
 function reset(){opened=false;gps=null;category=null;invalidate();host.hidden=true;button.setAttribute('aria-expanded','false')}
 function open(){opened=true;host.hidden=false;button.setAttribute('aria-expanded','true');refresh();close.focus({preventScroll:true})}
 button.onclick=()=>opened?reset():open();close.onclick=()=>{reset();button.focus({preventScroll:true})};select.onchange=()=>{manualCenter=true;change()};radius.onchange=change;mode.onchange=()=>{for(const a of list.querySelectorAll('a')){if(a.href.startsWith('https://www.google.com/maps/dir/')){const url=new URL(a.href);url.searchParams.set('travelmode',mode.value);a.href=url.href}}};
 gpsButton.onclick=()=>{if(!navigator.geolocation){status.textContent='Staðsetning er ekki tiltæk í þessum vafra.';return}invalidate();const own=version;status.textContent='Bíð eftir staðsetningarheimild…';navigator.geolocation.getCurrentPosition(pos=>{if(own!==version||!opened)return;gps={latitude:pos.coords.latitude,longitude:pos.coords.longitude};refresh();if(category)search(category)},()=>{if(own===version)status.textContent='Staðsetning fékkst ekki. Þú getur áfram leitað við áfangastað.'},{enableHighAccuracy:false,timeout:10000,maximumAge:60000})};
 return {reset,contextChanged(){if(!opened)return;const c=context(),key=JSON.stringify([c.owner,c.tripId,(c.stops||[]).map(s=>[s.id,s.latitude,s.longitude])]);if(key!==contextKey){invalidate();gps=null;refresh()}else if(lastStopId!==c.stopId){lastStopId=c.stopId;if(!manualCenter&&!gps&&(c.stops||[]).some(s=>s.id===c.stopId)){invalidate();select.value=c.stopId;status.textContent='Áfangastaður breyttist. Veldu flokk til að leita.'}}},destroy:reset};
}
window.NearbyDiscovery={mount};
})();

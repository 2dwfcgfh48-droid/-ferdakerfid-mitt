/* HUG-03/04: isolated, temporary discovery state; never writes trip or booking data. */
(function(){'use strict';
const categories=[['sights','🏛️','Áhugaverðir staðir'],['events','🎭','Viðburðir og markaðir'],['food','🍷','Matur og drykkur'],['outdoors','🚴','Afþreying og útivist'],['webcams','📷','Vefmyndavélar'],['practical','🧰','Hagnýtt nálægt mér']];
const active=new Set(['sights','food','practical']);
const filters={sights:[['all','Allt'],['historic','Sögustaðir'],['museums','Söfn'],['churches','Kirkjur']],food:[['all','Allt'],['restaurants','Veitingastaðir'],['wine','Vínbarir'],['cafes','Kaffihús']],practical:[['all','Allt'],['pharmacy','💊 Apótek'],['medical','🏥 Læknisþjónusta'],['dentist','🦷 Tannlæknar'],['atm','🏧 Hraðbankar'],['groceries','🛒 Matvöruverslanir'],['toilets','🚻 Almenningssalerni'],['hairdresser','💇 Hárgreiðsla'],['luggage','🧳 Farangursgeymsla',true],['water','🚰 Drykkjarvatn'],['charging','🔌 Hleðslustöðvar'],['bikerepair','🛠️ Hjólaviðgerðir',true]]};
const cuisineOptions=[['indian','Indverskur'],['nepalese','Nepalskur'],['japanese','Japanskur'],['sushi','Sushi'],['mexican','Mexíkóskur'],['lebanese','Líbanskur'],['moroccan','Marokkóskur'],['italian','Ítalskur'],['steak_house','Steikhús'],['regional','Staðbundinn matur']];
const hasCategory=(p,key)=>(Array.isArray(p.categories)?p.categories:[]).some(c=>typeof c==='string'&&(c===key||c.startsWith(key+'.')));
const safe=v=>{try{const u=new URL(v);return u.protocol==='https:'&&!u.username&&!u.password?u.href:null}catch{return null}};
const point=s=>s&&typeof s.latitude==='number'&&typeof s.longitude==='number'&&Number.isFinite(s.latitude)&&Number.isFinite(s.longitude)&&Math.abs(s.latitude)<=90&&Math.abs(s.longitude)<=180?[s.longitude,s.latitude]:null;
function mount({host,button,context,request,showPoints,clearPoints}){
 let version=0,controller=null,gps=null,category=null,subtype='all',cuisines=[],opened=false,contextKey='',results=[],lastStopId=null,manualCenter=false,filterCategory=null,nextOffset=null,busy=false,retry=false;
 const node=(tag,text,cls)=>{const el=document.createElement(tag);if(text!=null)el.textContent=text;if(cls)el.className=cls;return el};
 host.hidden=true;host.classList.add('nearby-discovery');
 const toolbar=node('div',null,'nearby-toolbar'),back=node('button','← Til baka','btn small'),close=node('button','Loka','btn small');back.type=close.type='button';back.hidden=true;toolbar.append(back,close);host.append(toolbar);
 const heading=node('h3','🧭 Uppgötva nágrennið');heading.tabIndex=-1;host.append(heading);
 const summary=node('p','', 'nearby-summary');summary.hidden=true;host.append(summary);
 const radiusSlot=node('div',null,'nearby-category-radius');radiusSlot.hidden=true;host.append(radiusSlot);
 const filterBox=node('div',null,'nearby-filters');filterBox.hidden=true;filterBox.setAttribute('role','group');filterBox.setAttribute('aria-label','Flokkasíur');host.append(filterBox);
 const cuisinePanel=node('details',null,'nearby-cuisines'),cuisineHeading=node('summary','Matargerðir'),cuisineChoices=node('div',null,'nearby-cuisine-choices');cuisinePanel.hidden=true;cuisinePanel.append(cuisineHeading,cuisineChoices);const cuisineInputs=[];
 for(const [key,title] of cuisineOptions){const l=node('label'),input=node('input');input.type='checkbox';input.value=key;l.append(input,document.createTextNode(title));cuisineInputs.push(input);cuisineChoices.append(l)}
 const applyCuisine=node('button','Nota síu','btn small');applyCuisine.type='button';cuisinePanel.append(applyCuisine);host.append(cuisinePanel);
 const form=node('div',null,'nearby-context'),label=node('label','Áfangastaður'),select=node('select');label.append(select);form.append(label);
 const radiusLabel=node('label',null,'nearby-radius'),radiusTitle=node('span',null,'nearby-radius-title'),radiusValue=node('output','5 km'),radius=node('input');radius.type='range';radius.min='1';radius.max='20';radius.step='1';radius.value='5';radius.setAttribute('aria-label','Fjarlægð');radiusTitle.append(node('span','Radíus'),radiusValue);const bounds=node('span',null,'nearby-radius-bounds');bounds.append(node('span','1 km'),node('span','20 km'));radiusLabel.append(radiusTitle,radius,bounds);form.append(radiusLabel);host.append(form);
 const modeLabel=node('label','Ferðamáti','nearby-mode'),mode=node('select');for(const [value,text] of [['walking','Gangandi'],['driving','Í bíl']]){const o=node('option',text);o.value=value;mode.append(o)}modeLabel.append(mode);modeLabel.hidden=true;host.append(modeLabel);
 const gpsButton=node('button','Nota núverandi staðsetningu','btn small');gpsButton.type='button';host.append(gpsButton);
 const grid=node('div',null,'nearby-grid');const buttons=[];
 for(const [key,icon,text] of categories){const b=node('button',null,'btn nearby-category');b.type='button';b.dataset.nearbyCategory=key;b.setAttribute('aria-pressed','false');b.append(node('span',icon,'nearby-emoji'),node('span',text));b.onclick=()=>search(key);buttons.push(b);grid.append(b)}host.append(grid);
 const resultBar=node('div',null,'nearby-result-bar');host.append(resultBar);
 const status=node('p','', 'notice');status.setAttribute('role','status');status.setAttribute('aria-live','polite');status.tabIndex=-1;resultBar.append(status);
 const moreTop=node('button','Sýna fleiri','btn small nearby-more');moreTop.type='button';moreTop.hidden=true;resultBar.append(moreTop);
 const list=node('div',null,'nearby-results');host.append(list);
 const more=node('button','Sýna fleiri','btn small nearby-more');more.type='button';more.hidden=true;host.append(more);
 const attr=node('p',null,'notice nearby-attribution');for(const [text,url] of [['Powered by Geoapify','https://www.geoapify.com/'],['© OpenStreetMap contributors','https://www.openstreetmap.org/copyright']]){const a=node('a',text);a.href=url;a.target='_blank';a.rel='noopener noreferrer';attr.append(a,document.createTextNode(' '))}attr.hidden=true;host.append(attr);
 function syncMore(){moreTop.hidden=more.hidden;moreTop.disabled=more.disabled;moreTop.textContent=more.textContent}
 function describe(){const stop=select.selectedOptions[0];summary.textContent=(stop?.textContent||'Áfangastaður óvalinn')+' · Radíus: '+radius.value+' km';radiusValue.value=radius.value+' km';radius.setAttribute('aria-valuetext',radius.value+' km')}
 function paintFilters(){
  if(filterCategory!==category){filterBox.replaceChildren();filterBox.classList.toggle('nearby-services',category==='practical');for(const [key,text,pending] of filters[category]||[]){const b=node('button',null,'btn small');b.type='button';b.dataset.nearbyFilter=key;b.disabled=!!pending;if(category==='practical'&&key!=='all'){const at=text.indexOf(' ');b.append(node('span',text.slice(0,at),'nearby-service-icon'),node('span',text.slice(at+1).replace('Læknisþjónusta','Læknis\u00adþjónusta').replace('Matvöruverslanir','Matvöru\u00adverslanir').replace('Almenningssalerni','Almennings\u00adsalerni').replace('Farangursgeymsla','Farangurs\u00adgeymsla').replace('Hleðslustöðvar','Hleðslu\u00adstöðvar').replace('Hjólaviðgerðir','Hjóla\u00adviðgerðir')))}else b.append(node('span',text));if(pending)b.append(node('small','Ekki tengt'));b.onclick=()=>{subtype=key;if(!['all','restaurants'].includes(key)){cuisines=[];cuisineInputs.forEach(x=>x.checked=false)}search(category)};filterBox.append(b)}filterCategory=category}
  filterBox.hidden=!filters[category];for(const b of filterBox.children)b.setAttribute('aria-pressed',String(b.dataset.nearbyFilter===subtype));
  cuisinePanel.hidden=category!=='food'||!['all','restaurants'].includes(subtype);cuisineHeading.textContent='Matargerðir'+(cuisines.length?' ('+cuisines.length+')':'');
 }
 function view(key){const chosen=categories.find(c=>c[0]===key);heading.textContent=chosen?chosen[1]+' '+chosen[2]:'🧭 Uppgötva nágrennið';back.hidden=!chosen;summary.hidden=!chosen;form.hidden=!!chosen;radiusSlot.hidden=!chosen;const radiusParent=chosen?radiusSlot:form;if(radiusLabel.parentElement!==radiusParent)radiusParent.append(radiusLabel);grid.hidden=!!chosen;modeLabel.hidden=!chosen;buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.nearbyCategory===key)));paintFilters();describe()}
 function home(message){const previous=category;category=null;subtype='all';cuisines=[];cuisineInputs.forEach(x=>x.checked=false);cuisinePanel.open=false;invalidate();view(null);status.textContent=message||'Veldu flokk til að leita í nágrenninu.';return buttons.find(b=>b.dataset.nearbyCategory===previous)}
 function invalidate(){version++;controller?.abort();controller=null;busy=false;nextOffset=null;retry=false;more.hidden=true;more.disabled=false;more.textContent='Sýna fleiri';syncMore();results=[];list.replaceChildren();clearPoints();attr.hidden=true;host.removeAttribute('aria-busy')}
 function refresh(){const ctx=context();lastStopId=ctx.stopId;manualCenter=false;const stops=ctx.stops||[];select.replaceChildren();for(const s of stops){const o=node('option',s.label||s.name);o.value=s.id;o.disabled=!point(s);select.append(o)}
  if(gps){const o=node('option','Núverandi staðsetning');o.value='gps';select.append(o);select.value='gps'}else if(stops.some(s=>s.id===ctx.stopId))select.value=ctx.stopId;else{const first=stops.find(s=>point(s));if(first)select.value=first.id}
  contextKey=JSON.stringify([ctx.owner,ctx.tripId,stops.map(s=>[s.id,s.latitude,s.longitude])]);describe();status.textContent=stops.some(point)||gps?'Veldu flokk til að leita í nágrenninu.':'Veldu staðsetningu áfangastaðar eða notaðu núverandi staðsetningu.';
 }
 function change(){if(category)search(category);else invalidate()}
 function kind(p){if(category==='food'){if(hasCategory(p,'catering.cafe'))return 'Kaffihús';if(hasCategory(p,'catering.restaurant'))return 'Veitingastaður';if(hasCategory(p,'catering.bar')||hasCategory(p,'catering.pub'))return subtype==='wine'?'Vínbar':'Bar'}if(subtype!=='all')return filters[category]?.find(x=>x[0]===subtype)?.[1]||'';return ''}
 async function search(key,append=false){
  if(append&&(busy||nextOffset===null||key!==category))return;
  if(!append){const entering=category!==key;invalidate();category=key;view(key);if(entering)heading.focus({preventScroll:true})}
  if(!active.has(key)){status.textContent='Gögn fyrir þennan flokk eru ekki enn tengd í þessari áfangaútgáfu.';return}
  const ctx=context(),stop=select.value==='gps'?gps:(ctx.stops||[]).find(s=>s.id===select.value),center=point(stop);
  if(!ctx.tripId||!center){status.textContent='Staðsetningu vantar. Veldu áfangastað með kortapunkti eða núverandi staðsetningu.';return}
  const own=version;controller=new AbortController();const current=controller;let timedOut=false;const timer=setTimeout(()=>{timedOut=true;current.abort()},25000);status.textContent=append?'Sæki fleiri staði…':'Sæki staði…';host.setAttribute('aria-busy','true');busy=true;more.disabled=true;
  if(append)more.textContent='Sæki fleiri…';syncMore();
  const expected={subtype,cuisines:[...cuisines].sort(),offset:append?nextOffset:0};
  try{const data=await request({trip_id:ctx.tripId,category:key,center,radius_km:Number(radius.value),subtype:expected.subtype,offset:expected.offset,...(key==='food'?{cuisines:expected.cuisines}:{})},current.signal);if(own!==version||!opened)return;
   if(data.error)throw {userMessage:data.error};
   if((expected.subtype!=='all'||expected.cuisines.length)&&(data.filter?.subtype!==expected.subtype||JSON.stringify(data.filter?.cuisines)!==JSON.stringify(expected.cuisines)))throw {userMessage:'Þessi sía er ekki enn tengd við staðaleitina. Prófaðu Allt eða aftur síðar.'};
   if(!Array.isArray(data.results))throw Error('shape');
   const page=data.page;
   if((append&&!page)||(page&&(page.offset!==expected.offset||typeof page.has_more!=='boolean'||typeof page.capped!=='boolean'||(page.has_more&&(page.capped||page.next_offset!==expected.offset+20||page.next_offset>480))||(!page.has_more&&page.next_offset!==null))))throw {userMessage:'Ekki tókst að staðfesta næsta skammt niðurstaðna. Prófaðu aftur.'};
   const seen=new Set(results.map(p=>p.id));let firstNew=null;
   for(const p of data.results){if(typeof p.id!=='string'||!p.id||typeof p.name!=='string'||!point(p)||seen.has(p.id))continue;seen.add(p.id);results.push(p);const card=addResult(p,center);if(!firstNew)firstNew=card}
   nextOffset=page?.has_more?page.next_offset:null;retry=false;more.hidden=nextOffset===null;
   showPoints(results,false);attr.hidden=false;
   status.textContent='Sóttir staðir: '+results.length+'. Heildarfjöldi óþekktur.';
   if(page?.capped)status.textContent+=' Hámarki þessarar leitar er náð. Minnkaðu radíus eða veldu undirflokk til að þrengja leitina.';
   status.textContent+=' Listinn er ekki tæmandi.';
   if(key==='practical')status.textContent+=' Farangursgeymsla og hjólaviðgerðir bíða gagnatengingar.';
   if(append&&more.hidden)(firstNew?.querySelector('summary')||status).focus({preventScroll:true});
  }catch(e){if(own===version&&(timedOut||e.name!=='AbortError')){status.textContent=e.userMessage||(timedOut?'Svarfrestur rann út. Prófaðu aftur síðar.':'Ekki tókst að sækja staði. Prófaðu aftur síðar.');retry=true;more.hidden=false}}
  finally{clearTimeout(timer);if(own===version){busy=false;controller=null;host.removeAttribute('aria-busy');more.disabled=false;more.textContent=retry?'Reyna aftur':'Sýna fleiri';syncMore()}}
 }
 function addResult(p,center){const card=node('article',null,'nearby-result');card.dataset.nearbyResult=p.id;const details=node('details'),overview=node('summary',null,'nearby-result-overview'),body=node('div',null,'nearby-result-details');overview.append(node('strong',p.name));
    const km=Number.isFinite(p.distance_m)?(p.distance_m<1000?p.distance_m+' m':(p.distance_m/1000).toLocaleString('is-IS',{maximumFractionDigits:1})+' km'):'';const meta=[km?km+' frá leitarmiðju':'',kind(p)].filter(Boolean).join(' · ');if(meta)overview.append(node('span',meta,'notice'));
    details.append(overview,body);card.append(details);if(p.address)body.append(node('p',p.address,'notice'));
    const labels=(Array.isArray(p.cuisines)?p.cuisines:[]).map(c=>cuisineOptions.find(x=>x[0]===c)?.[1]).filter(Boolean);if(labels.length)body.append(node('p',labels.join(' · '),'notice'));
    const actions=node('div',null,'nearby-actions');const map=node('button','Sýna á korti','btn small');map.type='button';map.onclick=()=>showPoints([p],true);actions.append(map);
    const url=new URL('https://www.google.com/maps/dir/');url.searchParams.set('api','1');url.searchParams.set('destination',p.latitude+','+p.longitude);url.searchParams.set('origin',center[1]+','+center[0]);url.searchParams.set('travelmode',mode.value);
    const nav=node('a','Leiðsögn í Google Maps ↗','btn small');nav.href=url.href;nav.target='_blank';nav.rel='noopener noreferrer';actions.append(nav);
    if(safe(p.website)){const a=node('a','Vefsíða ↗','btn small');a.href=safe(p.website);a.target='_blank';a.rel='noopener noreferrer';actions.append(a)}body.append(actions);list.append(card);return card;
 }
 function reset(){opened=false;gps=null;home();host.hidden=true;button.setAttribute('aria-expanded','false')}
 function open(){opened=true;host.hidden=false;button.setAttribute('aria-expanded','true');refresh();view(null);close.focus({preventScroll:true})}
 button.onclick=()=>opened?reset():open();close.onclick=()=>{reset();button.focus({preventScroll:true})};select.onchange=()=>{manualCenter=true;change()};radius.onchange=change;mode.onchange=()=>{for(const a of list.querySelectorAll('a')){if(a.href.startsWith('https://www.google.com/maps/dir/')){const url=new URL(a.href);url.searchParams.set('travelmode',mode.value);a.href=url.href}}};
 back.onclick=()=>{home()?.focus({preventScroll:true})};radius.oninput=describe;
 more.onclick=moreTop.onclick=()=>search(category,nextOffset!==null);
 applyCuisine.onclick=()=>{cuisines=cuisineInputs.filter(x=>x.checked).map(x=>x.value);cuisinePanel.open=false;search('food');cuisineHeading.focus({preventScroll:true})};
 gpsButton.onclick=()=>{if(!navigator.geolocation){status.textContent='Staðsetning er ekki tiltæk í þessum vafra.';return}invalidate();const own=version;status.textContent='Bíð eftir staðsetningarheimild…';navigator.geolocation.getCurrentPosition(pos=>{if(own!==version||!opened)return;gps={latitude:pos.coords.latitude,longitude:pos.coords.longitude};refresh();if(category)search(category)},()=>{if(own===version)status.textContent='Staðsetning fékkst ekki. Þú getur áfram leitað við áfangastað.'},{enableHighAccuracy:false,timeout:10000,maximumAge:60000})};
 return {reset,selectResult(id){const card=[...list.children].find(c=>c.dataset.nearbyResult===String(id));if(!card||!opened)return;card.querySelector('details').open=true;card.querySelector('summary').focus({preventScroll:true});card.scrollIntoView({block:'nearest'})},contextChanged(){if(!opened)return;const c=context(),key=JSON.stringify([c.owner,c.tripId,(c.stops||[]).map(s=>[s.id,s.latitude,s.longitude])]);if(key!==contextKey){home();gps=null;refresh()}else if(lastStopId!==c.stopId){lastStopId=c.stopId;if(!manualCenter&&!gps&&(c.stops||[]).some(s=>s.id===c.stopId)){select.value=c.stopId;home('Áfangastaður breyttist. Veldu flokk til að leita.')}}},destroy:reset};
}
window.NearbyDiscovery={mount};
})();

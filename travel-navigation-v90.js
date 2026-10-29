/* Shared Google Maps navigation; only walking/driving, no API calls. */
(function(root){
 const roles=['outbound','return','outbound_arrival','return_arrival','rental_return'];
 const normalize=mode=>mode==='driving'?'driving':'walking';
 const label=mode=>normalize(mode)==='driving'?'Í bíl':'Gangandi';
 function mode(item,role='outbound'){const m=item?.metadata||{},leg=role.startsWith('return')?'return':'outbound';const saved=m.navigation_modes?.[role];return ['walking','driving'].includes(saved)?saved:normalize((role==='rental_return')?null:m.departure_plans?.[leg]?.mode)}
 function patch(metadata,role,value){if(!roles.includes(role)||!['walking','driving'].includes(value))throw Error('Ógildur ferðamáti.');const m={...(metadata||{}),navigation_modes:{...(metadata?.navigation_modes||{}),[role]:value}};if(['outbound','return'].includes(role)&&!['walking','driving'].includes(metadata?.navigation_modes?.[role+'_arrival']))m.navigation_modes[role+'_arrival']=mode({metadata},role+'_arrival');if(['outbound','return'].includes(role)&&m.departure_plans?.[role])m.departure_plans={...m.departure_plans,[role]:{...m.departure_plans[role],mode:value}};return m}
 function query(place,label=''){const lat=place?.latitude,lng=place?.longitude;if(lat!=null&&lng!=null&&Number.isFinite(Number(lat))&&Number.isFinite(Number(lng))&&Math.abs(+lat)<=90&&Math.abs(+lng)<=180)return lat+','+lng;return place?.address||place?.label||place?.name||label||''}
 function url(destination,origin='',value='walking'){if(!destination)return '';const q=new URLSearchParams({api:'1',destination:String(destination),travelmode:normalize(value),dir_action:'navigate'});if(origin)q.set('origin',String(origin));return 'https://www.google.com/maps/dir/?'+q.toString()}
 function fromLink(raw){try{const u=new URL(raw);if(u.protocol!=='https:'||!/(^|\.)google\.[a-z.]+$/.test(u.hostname))return '';return u.searchParams.get('destination')||u.searchParams.get('query')||''}catch{return ''}}

 function eventDate(item,role='outbound'){const m=item?.metadata||{};if(role==='rental_return')return m.rental_car?.return_date||'';if(role==='return_arrival')return m.return_arrival_date||m.return_date||m.return_flight_date||'';if(role==='outbound_arrival')return m.outbound_arrival_date||m.outbound_departure_date||item?.local_date||'';if(role==='return')return m.return_date||m.return_flight_date||'';return m.outbound_departure_date||item?.local_date||''}
 function eventStop(item,role){const m=item?.metadata||{};if(role==='rental_return')return m.rental_car?.return_same_place?item.stop_id:m.rental_car?.return_place?.source_stop_id||null;if(role.startsWith('return'))return m.route_places?.[role==='return'?'return_from':'return_to']?.source_stop_id||m.route_plan?.[role==='return'?'to_stop_id':'from_stop_id']||null;return role==='outbound_arrival'?m.route_places?.outbound_to?.source_stop_id||m.route_plan?.to_stop_id||null:item.stop_id||m.route_places?.outbound_from?.source_stop_id||m.route_plan?.from_stop_id||null}
 function eligibleHotels(item,role,items,usable=()=>true){const date=eventDate(item,role),stopId=eventStop(item,role);if(!date)return [];return items.filter(h=>h.category==='lodging'&&h.id!==item.id&&usable(h)&&h.status!=='cancelled'&&h.metadata?.lodging_plan?.role!=='cancelled'&&h.local_date&&h.end_local_date&&h.local_date<=date&&date<=h.end_local_date&&(!stopId||h.stop_id===stopId))}
 function hotelQuery(hotel){const p=hotel?.metadata?.lodging_place||hotel?.metadata?.place||{};const lat=hotel?.latitude??p.latitude,lng=hotel?.longitude??p.longitude;if(lat!=null&&lng!=null&&Number.isFinite(+lat)&&Number.isFinite(+lng)&&Math.abs(+lat)<=90&&Math.abs(+lng)<=180)return lat+','+lng;return p.address||hotel?.address||''}
 function origin(item,role,items=[],usable=()=>true){
  const spec=item?.metadata?.navigation_origins?.[role],leg=role==='return'?'return':'outbound',plan=['outbound','return'].includes(role)?item?.metadata?.departure_plans?.[leg]:null;
  if(spec?.type==='current')return {explicit:true,query:'',label:'Núverandi staðsetning',blocked:false};
  const legacyId=plan?.origin_place?.source_item_id,legacySource=legacyId&&items.find(i=>i.id===legacyId);const hotelId=spec?.type==='hotel'?spec.item_id:!spec&&legacyId&&(legacySource?.category==='lodging'||!legacySource&&!plan.origin_place.route_role)?legacyId:null;
  if(hotelId){const hotel=eligibleHotels(item,role,items,usable).find(h=>h.id===hotelId),point=hotel&&hotelQuery(hotel);if(!hotel||!point)return {explicit:true,query:'',label:hotel?.title||'Valin gisting',blocked:true};return {explicit:true,query:point,label:hotel.title,blocked:false}}
  if(spec)return {explicit:true,query:'',label:'Upphafsstaður þarf yfirferð',blocked:true};
  if(plan?.origin)return {explicit:true,query:query(plan.origin_place,plan.origin),label:plan.origin,blocked:false};
  return {explicit:false,query:'',label:'',blocked:false};
 }
 function lodgingLocation(item,stops=[]){if(item?.category!=='lodging')return '';const stop=stops.find(s=>s.id===item.stop_id);if(!stop?.name)return '';const code=String(stop.country_code||'').toUpperCase(),flag=/^[A-Z]{2}$/.test(code)?Array.from(code,c=>String.fromCodePoint(c.charCodeAt(0)+127397)).join(''):'';return [flag,stop.name].filter(Boolean).join(' ')}

 const esc=v=>String(v??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
 function html({item,role='outbound',destination,origin='',title='Leiðsögn',selected,classes='btn small',originLabel=''}){const value=selected||mode(item,role),href=url(destination,origin,value);if(!href)return '';return '<span class="navigation-actions">'+(originLabel?'<small class="navigation-origin-info">Frá: '+esc(originLabel)+'</small>':'')+'<a data-departure-link data-navigation-link data-navigation-title="'+esc(title)+'" class="'+esc(classes)+'" href="'+esc(href)+'" target="_blank" rel="noopener noreferrer">'+esc(title)+' · '+label(value)+' ↗</a></span>'}

 root.TravelNavigation={roles,normalize,label,mode,patch,query,url,fromLink,html,eventDate,eventStop,eligibleHotels,hotelQuery,origin,lodgingLocation};
})(globalThis);

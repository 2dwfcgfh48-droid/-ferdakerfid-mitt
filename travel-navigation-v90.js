/* Shared Google Maps navigation; only walking/driving, no API calls. */
(function(root){
 const roles=['outbound','return','outbound_arrival','return_arrival','rental_return'];
 const normalize=mode=>mode==='driving'?'driving':'walking';
 const label=mode=>normalize(mode)==='driving'?'Í bíl':'Gangandi';
 function mode(item,role='outbound'){const m=item?.metadata||{},leg=role.startsWith('return')?'return':'outbound';const saved=m.navigation_modes?.[role];return ['walking','driving'].includes(saved)?saved:normalize((role==='rental_return')?null:m.departure_plans?.[leg]?.mode)}
 function patch(metadata,role,value){if(!roles.includes(role)||!['walking','driving'].includes(value))throw Error('Ógildur ferðamáti.');const m={...(metadata||{}),navigation_modes:{...(metadata?.navigation_modes||{}),[role]:value}};if(['outbound','return'].includes(role)&&!['walking','driving'].includes(metadata?.navigation_modes?.[role+'_arrival']))m.navigation_modes[role+'_arrival']=mode({metadata},role+'_arrival');if(['outbound','return'].includes(role)&&m.departure_plans?.[role])m.departure_plans={...m.departure_plans,[role]:{...m.departure_plans[role],mode:value}};return m}
 function query(place,label=''){const lat=place?.latitude,lng=place?.longitude;if(lat!=null&&lng!=null&&lat!==''&&lng!==''&&Number.isFinite(Number(lat))&&Number.isFinite(Number(lng))&&Math.abs(+lat)<=90&&Math.abs(+lng)<=180)return lat+','+lng;return place?.address||place?.label||place?.name||label||''}
 function url(destination,origin='',value='walking'){if(!destination)return '';const q=new URLSearchParams({api:'1',destination:String(destination),travelmode:normalize(value),dir_action:'navigate'});if(origin)q.set('origin',String(origin));return 'https://www.google.com/maps/dir/?'+q.toString()}
 function fromLink(raw){try{const u=new URL(raw);if(u.protocol!=='https:'||!/(^|\.)google\.[a-z.]+$/.test(u.hostname))return '';return u.searchParams.get('destination')||u.searchParams.get('query')||''}catch{return ''}}

 function eventDate(item,role='outbound'){const m=item?.metadata||{};if(role==='rental_return')return m.rental_car?.return_date||'';if(role==='return_arrival')return m.return_arrival_date||m.return_date||m.return_flight_date||'';if(role==='outbound_arrival')return m.outbound_arrival_date||m.outbound_departure_date||item?.local_date||'';if(role==='return')return m.return_date||m.return_flight_date||'';return m.outbound_departure_date||item?.local_date||''}
 function eventStop(item,role){const m=item?.metadata||{};if(role==='rental_return')return m.rental_car?.return_same_place?item.stop_id:m.rental_car?.return_place?.source_stop_id||null;if(role.startsWith('return'))return m.route_places?.[role==='return'?'return_from':'return_to']?.source_stop_id||m.route_plan?.[role==='return'?'to_stop_id':'from_stop_id']||null;return role==='outbound_arrival'?m.route_places?.outbound_to?.source_stop_id||m.route_plan?.to_stop_id||null:(['flight','train','ferry','bus','transfer'].includes(item.category)?m.route_places?.outbound_from?.source_stop_id||m.route_plan?.from_stop_id||(m.route_plan?null:item.stop_id):item.stop_id||m.route_places?.outbound_from?.source_stop_id||m.route_plan?.from_stop_id)||null}
 function eligibleHotels(item,role,items,usable=()=>true){const date=eventDate(item,role),stopId=eventStop(item,role);if(!date||!stopId&&['flight','train','ferry','bus','transfer'].includes(item.category)&&role==='outbound'&&item.metadata?.route_plan)return [];return items.filter(h=>h.category==='lodging'&&h.id!==item.id&&usable(h)&&h.status!=='cancelled'&&h.metadata?.lodging_plan?.role!=='cancelled'&&h.local_date&&h.end_local_date&&h.local_date<=date&&date<=h.end_local_date&&(!stopId||h.stop_id===stopId))}
 function hotelQuery(hotel){const p=hotel?.metadata?.lodging_place||hotel?.metadata?.place||{};const lat=hotel?.latitude??p.latitude,lng=hotel?.longitude??p.longitude;if(lat!=null&&lng!=null&&Number.isFinite(+lat)&&Number.isFinite(+lng)&&Math.abs(+lat)<=90&&Math.abs(+lng)<=180)return lat+','+lng;return p.address||hotel?.address||''}
 function origin(item,role,items=[],usable=()=>true){
  // Arrival-to-hotel navigation starts at this leg's arrival endpoint.
  // Keep legacy origin metadata intact, but never apply a hotel/current override here.
  if(['flight','train','ferry','bus','transfer'].includes(item?.category)&&['outbound_arrival','return_arrival'].includes(role))return {explicit:false,query:'',label:'',blocked:false};
  const spec=item?.metadata?.navigation_origins?.[role],leg=role==='return'?'return':'outbound',plan=['outbound','return'].includes(role)?item?.metadata?.departure_plans?.[leg]:null;
  if(spec?.type==='place'){
   const place=spec.place,point=query(place);
   return {explicit:true,query:point,label:place?.label||'Handvalið upphaf',blocked:!point};
  }
  if(item?.category==='lodging'&&spec?.type==='arrival'){
   const source=items.find(candidate=>candidate.id===spec.item_id),field=spec.leg+'_to',arrivalRole=spec.leg+'_arrival';
   const metadata=source?.metadata||{},place=metadata.route_places?.[field],point=place&&query(place);
   const valid=source&&source.status!=='cancelled'&&metadata[spec.leg+'_arrival_date']===item.local_date&&eventStop(source,arrivalRole)===item.stop_id&&place?.latitude!=null&&place?.longitude!=null&&(!spec.query||spec.query===point);
   return {explicit:true,query:valid?point:'',label:place?.label||place?.name||'Valinn komustaður',blocked:!valid};
  }
  if(spec?.type==='current')return {explicit:true,query:'',label:'Núverandi staðsetning',blocked:false};
  const legacyId=plan?.origin_place?.source_item_id,legacySource=legacyId&&items.find(i=>i.id===legacyId);const hotelId=spec?.type==='hotel'?spec.item_id:!spec&&legacyId&&(legacySource?.category==='lodging'||!legacySource&&!plan.origin_place.route_role)?legacyId:null;
  if(hotelId){const hotel=eligibleHotels(item,role,items,usable).find(h=>h.id===hotelId),point=hotel&&hotelQuery(hotel);if(!hotel||!point)return {explicit:true,query:'',label:hotel?.title||'Valin gisting',blocked:true};return {explicit:true,query:point,label:hotel.title,blocked:false}}
  if(spec)return {explicit:true,query:'',label:'Upphafsstaður þarf yfirferð',blocked:true};
  if(plan?.origin)return {explicit:true,query:query(plan.origin_place,plan.origin),label:plan.origin,blocked:false};
  return {explicit:false,query:'',label:'Veldu upphaf leiðsagnar',blocked:true};
 }
 // Presentation only. Explicit IDs win; legacy endpoints require exact recorded names/codes and a recorded date.
 function stopLocation(stop){if(!stop?.name)return '';const code=String(stop.country_code||'').toUpperCase(),flag=/^[A-Z]{2}$/.test(code)?Array.from(code,c=>String.fromCodePoint(c.charCodeAt(0)+127397)).join(''):'';return [flag,stop.name].filter(Boolean).join(' ')}
 function destinationId(item,role='outbound'){
  const m=item?.metadata||{},transport=['flight','train','ferry','bus','transfer'].includes(item?.category);
  if(!item)return null;
  const ownStop=item.stop_id||(item.category==='lodging'?m.lodging_place?.source_stop_id:null)||m.place?.source_stop_id||null;
  if(role==='rental_return'||m._rental_event==='rental_return')return m.rental_car?.return_same_place===true?ownStop:m.rental_car?.return_place?.source_stop_id||null;
  if(item.category==='day_trip'&&['return','return_arrival','return_to'].includes(role))return m.day_trip?.base_stop_id||m.route_plan?.from_stop_id||null;
  if(!transport)return ownStop;
  const field=['outbound_from','outbound_to','return_from','return_to'].includes(role)?role:role.startsWith('return')?'return_to':'outbound_to';
  const key=['outbound_from','return_to'].includes(field)?'from_stop_id':'to_stop_id';
  return m.route_places?.[field]?.source_stop_id||m.route_plan?.[key]||(field==='return_to'?m.day_trip?.base_stop_id:null)||(!m.route_plan&&!m.day_trip&&field==='outbound_to'?item.stop_id:null)||null;
 }
 function destinationStop(item,stops,role,catalog={}){
  const id=destinationId(item,role);if(id)return stops.find(s=>s.id===id)||null;
  if(!['flight','train','ferry','bus','transfer'].includes(item?.category))return null;
  const m=item.metadata||{},field=['outbound_from','outbound_to','return_from','return_to'].includes(role)?role:role.startsWith('return')?'return_to':'outbound_to',p=m.route_places?.[field];
  const date=({outbound_from:m.outbound_departure_date||item.local_date,outbound_to:m.outbound_arrival_date,return_from:m.return_date||m.return_flight_date,return_to:m.return_arrival_date})[field];
  if(!/^\d{4}-\d{2}-\d{2}$/.test(date||''))return null;
  const key=v=>String(v||'').normalize('NFC').trim().toLocaleLowerCase(),raw=String(m[field]||p?.label||p?.name||'').trim(),rawCode=raw.toUpperCase(),code=catalog.airports?.[rawCode]?rawCode:catalog.icao?.[rawCode],airport=code&&catalog.airports?.[code];
  const candidates=stops.filter(s=>s.start_date&&s.end_date&&s.start_date<=date&&date<=s.end_date&&(!p?.country_code||s.country_code===p.country_code)&&
   (item.category==='flight'&&airport?s.country_code===airport[3]&&Object.entries(catalog.aliases||{}).some(([name,codes])=>key(name)===key(s.name)&&codes.includes(code)):key(raw)===key(s.name)));
  return candidates.length===1?candidates[0]:null;
 }
 function bookingLocation(item,stops=[],role='all',catalog=globalThis.BookingDestinationCatalog||{}){
  catalog=catalog||{};const m=item?.metadata||{},transport=['flight','train','ferry','bus','transfer'].includes(item?.category),type=m.transport_trip_type||m.flight_trip_type,dayTrip=transport&&!!m.day_trip||item?.category==='day_trip';
  const field=r=>['outbound_from','outbound_to','return_from','return_to'].includes(r)?r:r.startsWith('return')?'return_to':'outbound_to';
  const location=r=>{
   const stop=destinationStop(item,stops,r,catalog);if(stop)return stopLocation(stop);
   if(destinationId(item,r))return '';
   const raw=String(m[field(r)]||'').trim().toUpperCase(),code=catalog.airports?.[raw]?raw:catalog.icao?.[raw],airport=item?.category==='flight'&&code&&catalog.airports?.[code];
   if(airport)return stopLocation({name:airport[2],country_code:airport[3]});
   if(dayTrip){const p=m.route_places?.[field(r)]||(!transport&&field(r)==='outbound_to'?m.place:null);return p?.label||p?.name||m[field(r)]||''}
   return '';
  };
  const summary=role==='all'||dayTrip&&!['outbound_from','outbound_to','return_from','return_to'].includes(role);
  if(!summary||(!transport&&!dayTrip)||(!dayTrip&&type!=='round_trip'))return location(role==='all'?'outbound':role);
  const out=location('outbound'),back=location('return');
  if(dayTrip)return 'Útleið: '+(out||'Óskráður komustaður')+' · Heimleið: '+(back||'Óskráður komustaður');
  if(out&&back&&destinationId(item,'outbound')&&destinationId(item,'outbound')===destinationId(item,'return'))return out;
  return [out?'Útleið: '+out:'',back?'Heimleið: '+back:''].filter(Boolean).join(' · ');
 }
 function bookingName(item,stops=[],role='all',catalog=globalThis.BookingDestinationCatalog||{}){return [bookingLocation(item,stops,role,catalog),item?.title].filter(Boolean).join(' · ')}
 function lodgingLocation(item,stops=[]){return item?.category==='lodging'?bookingLocation(item,stops):''}

 const esc=v=>String(v??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
 function html({item,role='outbound',destination,origin='',title='Leiðsögn',selected,classes='btn small',originLabel=''}){const value=selected||mode(item,role),href=url(destination,origin,value);if(!href)return '';return '<span class="navigation-actions">'+(originLabel?'<small class="navigation-origin-info">Frá: '+esc(originLabel)+'</small>':'')+'<a data-departure-link data-navigation-link data-navigation-title="'+esc(title)+'" class="'+esc(classes)+'" href="'+esc(href)+'" target="_blank" rel="noopener noreferrer">'+esc(title)+' · '+label(value)+' ↗</a></span>'}

 root.TravelNavigation={roles,normalize,label,mode,patch,query,url,fromLink,html,eventDate,eventStop,eligibleHotels,hotelQuery,origin,lodgingLocation,stopLocation,destinationId,bookingLocation,bookingName,destinationStop,bookingDestinationVersion:132};
})(globalThis);

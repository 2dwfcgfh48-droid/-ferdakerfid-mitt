/* Rental booking has two milestones, never a continuous busy interval. */
(function(root){
 const active=i=>i?.category==='rental_car'&&!i.metadata?.quick_cost;
 const clock=v=>/^([01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?$/.test(String(v||''))?String(v).slice(0,5):'';
 function date(v){if(!/^\d{4}-\d{2}-\d{2}$/.test(String(v||'')))return '';const n=Date.parse(v+'T12:00:00Z');return Number.isFinite(n)&&new Date(n).toISOString().slice(0,10)===v?v:''}
 function pickup(i){return i.metadata?.place||((i.latitude!=null&&i.longitude!=null)?{label:i.address||i.title,latitude:i.latitude,longitude:i.longitude}:null)}
 function returns(i){const r=i.metadata?.rental_car||{};return {date:date(r.return_date),time:clock(r.return_time),same:r.return_same_place===true,place:r.return_same_place===true?pickup(i):r.return_place||null}}
 function events(i){if(!active(i))return [];const r=returns(i);return [{item:i,leg:'outbound',date:date(i.local_date)||null,time:clock(i.local_time)||null,place:pickup(i)},...(r.date?[{item:i,leg:'rental_return',date:r.date,time:r.time||null,place:r.place}]:[])]}
 function title(i,leg){return (leg==='rental_return'?'Skila bíl':'Sækja bíl')+' · '+i.title}
 function view(i,e){return {...i,title:title(i,e.leg),local_date:e.date,local_time:e.time,latitude:e.place?.latitude??null,longitude:e.place?.longitude??null,address:e.place?.address||e.place?.label||null,google_maps_url:null,end_local_date:null,end_local_time:null,start_at:null,end_at:null,metadata:{...i.metadata,place:e.place||null,_rental_event:e.leg,departure_plans:e.leg==='outbound'?i.metadata?.departure_plans:null}}}
 root.RentalCars={active,clock,date,pickup,returns,events,title,view};
})(globalThis);

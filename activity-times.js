/* Shared activity time formatting; no storage or network access. */
(function(root){
 const categories=['bike_tour','walking_tour','day_trip','attraction','restaurant','cafe','bar','rooftop_bar','saved_place','other'];
 const supports=category=>categories.includes(category);
 const clock=value=>/^([01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?$/.test(String(value||''))?String(value).slice(0,5):'';
 function date(value){if(!/^\d{4}-\d{2}-\d{2}$/.test(String(value||'')))return '';const n=Date.parse(value+'T12:00:00Z');return Number.isFinite(n)&&new Date(n).toISOString().slice(0,10)===value?value:''}
 function range(item){
  if(!item||!supports(item.category)||item.all_day||item.metadata?.quick_cost)return null;
  const startDate=date(item.local_date),endDate=date(item.end_local_date||item.local_date),start=clock(item.local_time),end=clock(item.end_local_time);
  if(!startDate||!endDate||!start||!end||endDate<startDate||endDate===startDate&&end<=start)return null;
  return {startDate,endDate,start,end};
 }
 function label(item,formatDate=value=>value.split('-').reverse().join('-')){const r=range(item);return r?r.start+'–'+(r.endDate!==r.startDate?formatDate(r.endDate)+' · ':'')+r.end:''}
 root.ActivityTimes={supports,clock,range,label};
})(globalThis);

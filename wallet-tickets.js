/* Optional ticket labels. No DOM, network, account-relative identity or storage access. */
(function(root){'use strict';
 const object=value=>value&&typeof value==='object'&&!Array.isArray(value)?value:{};
 function assignment(doc){const a=object(object(doc?.metadata).ticket_assignment);return {traveller:['self','partner','both'].includes(a.traveller)?a.traveller:'',leg:['outbound','return','all'].includes(a.leg)?a.leg:''};}
 function apply(metadata,traveller,leg){const result={...object(metadata)},a={...object(result.ticket_assignment)},valid=assignment({metadata:{ticket_assignment:{traveller,leg}}});for(const k of ['traveller','leg']){if(valid[k])a[k]=valid[k];else delete a[k];}if(Object.keys(a).length)result.ticket_assignment=a;else delete result.ticket_assignment;return result;}
 function hasLabels(doc){const a=assignment(doc);return !!(a.traveller||a.leg);}
 function description(doc){const a=assignment(doc);return [({self:'Fyrir mig',partner:'Fyrir maka',both:'Fyrir okkur bæði'})[a.traveller],({outbound:'Útferð',return:'Heimferð',all:'Öll bókunin'})[a.leg]].filter(Boolean).join(' · ');}
 function buttonLabel(doc){return ({self:'Minn miði',partner:'Miði maka',both:'Miði fyrir okkur bæði'})[assignment(doc).traveller]||doc.title||'Miði / skjal';}
 function groups(docs,leg){const primary=[],unmarked=[],other=[];for(const d of docs){const a=assignment(d);if(d.document_type!=='ticket')other.push(d);else if(!a.leg)unmarked.push(d);else if(!leg||a.leg==='all'||a.leg===leg)primary.push(d);else other.push(d);}return {primary,unmarked,other};}
 function legForDate(item,date){if(!date)return null;const m=item?.metadata||{},out=m.outbound_departure_date||item?.local_date,back=m.return_date||m.return_flight_date;return out===date&&back!==date?'outbound':back===date&&out!==date?'return':null;}
 root.TravelTickets=Object.freeze({assignment,apply,hasLabels,description,buttonLabel,groups,legForDate});
})(globalThis);

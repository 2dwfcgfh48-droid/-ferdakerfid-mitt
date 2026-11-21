/* Read-only destination background. Opened explicitly; no trip writes or machine translation. */
(function(){'use strict';
const CONFIG={
 sights:{title:'📜 Kynntu þér áfangastaðinn',groups:[['Yfirlit og saga',/^(saga|history|historical overview)/,true],['Vinsælir staðir',/architecture|landmark|sights|attraction|kennileiti|byggingar/],['Saga og menning',/culture|menning/],['Vissir þú að?',/etymology|toponym|orðsif|nafn/]]},
 events:{title:'🎉 Upplifðu menninguna',groups:[['Viðburðir og hátíðir',/festival|event|hatiðir|hatidir|cultural life/],['Íþróttir og leikir',/sport|iþrott|iþrott/],['Markaðir og messur',/market|fair|markað|markad|messur/]]},
 food:{title:'🍽️ Smakkaðu áfangastaðinn',groups:[['Dæmigerðir réttir',/cuisine|gastronomy|matargerð|matargerd|food/],['Dæmigerðir drykkir',/drink|wine|coffee|drykk|vinmenning|kaffi/]]},
 outdoors:{title:'🌿 Upplifðu áfangastaðinn',groups:[['Náttúra og upplifanir',/park|garden|nature|geography|nátt|natt|landafr|garðar|gardar/],['Hjólaferðir (allar)',/cycling|biking|hjóla|hjola/],['Leiðsagðar ferðir',/guided tour|leiðsog|leidsog/]]}
};
const AGENT='FerdakerfidMitt/155 (https://github.com/2dwfcgfh48-droid/-ferdakerfid-mitt)';
const qid=q=>typeof q==='string'&&/^Q[1-9][0-9]{0,14}$/.test(q);
const clean=s=>String(s||'').replace(/\s+/g,' ').trim();
const fold=s=>clean(s).normalize('NFD').replace(/\p{M}/gu,'').toLowerCase();
const name=s=>fold(s).replace(/[^\p{L}\p{N}]/gu,'');
const values=(e,p)=>{const a=(e?.claims||{})[p]||[],live=a.filter(x=>x.rank!=='deprecated'&&x.mainsnak?.snaktype==='value');return (live.some(x=>x.rank==='preferred')?live.filter(x=>x.rank==='preferred'):live).map(x=>x.mainsnak.datavalue?.value)};
const coords=e=>values(e,'P625').filter(c=>c?.globe==='http://www.wikidata.org/entity/Q2'&&Number.isFinite(c.latitude)&&Number.isFinite(c.longitude)&&Math.abs(c.latitude)<=90&&Math.abs(c.longitude)<=180);
const distance=(a,b)=>{const r=x=>x*Math.PI/180,h=Math.sin(r(a.latitude-b.latitude)/2)**2+Math.cos(r(a.latitude))*Math.cos(r(b.latitude))*Math.sin(r(a.longitude-b.longitude)/2)**2;return 12742000*Math.asin(Math.sqrt(Math.min(1,h)))};
const limited=s=>{const words=clean(s).split(' ');if(words.length<=120)return words.join(' ');const text=words.slice(0,120).join(' '),end=Math.max(text.lastIndexOf('. '),text.lastIndexOf('! '),text.lastIndexOf('? '));return end>text.length/2?text.slice(0,end+1):text+'…'};
function articleText(html){
 const t=document.createElement('template');t.innerHTML=html;
 t.content.querySelectorAll('script,style,iframe,object,table,figure,.infobox,.navbox,.hatnote,.ambox,.thumb,.gallery,.reflist,.reference,sup,.mw-editsection,.geo').forEach(e=>e.remove());
 const intro=[],entries=[];let headings=[],anchor='';
 for(const el of t.content.querySelectorAll('h2,h3,h4,p')){
  if(el.tagName!=='P'){const level=Number(el.tagName[1])-2;headings=headings.slice(0,level);headings[level]=fold(el.textContent);anchor=el.id||el.querySelector('[id]')?.id||'';continue}
  const text=clean(el.textContent);if(text.length<40||text.length>12000)continue;
  if(!headings.length)intro.push(text);else entries.push({heading:headings.filter(Boolean).join(' / '),text,anchor});
 }
 return {intro,entries};
}
function mount({host}){
 const outer=document.createElement('details');outer.className='nearby-culture';outer.hidden=true;
 const title=document.createElement('summary'),body=document.createElement('div');body.className='nearby-culture-body';outer.append(title,body);host.append(outer);
 const photos=window.NearbyPhotos?.mount({host:body,thumbnailWidth:960});
 let category=null,stop=null,stamp='',epoch=0,controller=null,loaded=false,blockedUntil=0,lastCall=0;
 const identities=new Map(),articles=new Map(),countries=new Map();
 const node=(tag,text,cls)=>{const e=document.createElement(tag);if(text!=null)e.textContent=text;if(cls)e.className=cls;return e};
 const link=(text,url)=>{const e=node('a',text);e.href=url;e.target='_blank';e.rel='noopener noreferrer';return e};
 function cache(map,key,value){map.set(key,{value,until:Date.now()+3600000});if(map.size>40)map.delete(map.keys().next().value);return value}
 function get(map,key){const c=map.get(key);return c?.until>Date.now()?c.value:undefined}
 async function api(site,params,signal){
  if(Date.now()<blockedUntil)throw Error('cooldown');const delay=Math.max(0,300-(Date.now()-lastCall));if(delay)await new Promise(r=>setTimeout(r,delay));if(signal.aborted)throw new DOMException('Aborted','AbortError');lastCall=Date.now();
  const url=new URL('https://'+site+'/w/api.php');url.search=new URLSearchParams({...params,format:'json',formatversion:'2',origin:'*',maxlag:'5'});const active=controller,timer=setTimeout(()=>active?.abort(),25000);
  try{const r=await fetch(url,{credentials:'omit',referrerPolicy:'no-referrer',headers:{'Api-User-Agent':AGENT},signal});if(r.status===429||r.status===503){const raw=r.headers.get('Retry-After'),s=Number(raw),d=Date.parse(raw);blockedUntil=Date.now()+Math.min(3600000,Math.max(60000,s>0?s*1000:Number.isFinite(d)?d-Date.now():60000));throw Error('cooldown')}if(!r.ok)throw Error('provider');
   const reader=r.body?.getReader();if(!reader)throw Error('empty');let size=0;const parts=[];try{for(;;){const {value,done}=await reader.read();if(done)break;size+=value.byteLength;if(size>2500000)throw Error('large');parts.push(value)}}finally{await reader.cancel().catch(()=>{})}
   const bytes=new Uint8Array(size);let at=0;for(const p of parts){bytes.set(p,at);at+=p.byteLength}const d=JSON.parse(new TextDecoder().decode(bytes));if(d.error){if(['maxlag','ratelimited'].includes(d.error.code))blockedUntil=Date.now()+60000;throw Error('provider')}return d;
  }finally{clearTimeout(timer)}
 }
 async function entities(ids,signal){const d=await api('www.wikidata.org',{action:'wbgetentities',ids:ids.join('|'),props:'labels|aliases|claims|sitelinks'},signal);return d.entities||{}}
 async function countryMatches(entity,code,signal){
  const ids=values(entity,'P17').map(x=>x?.id).filter(qid);if(!ids.length||ids.length>5)return false;
  const missing=ids.filter(id=>get(countries,id)===undefined);if(missing.length){const data=await entities(missing,signal);for(const id of missing)cache(countries,id,data[id]?.id===id&&data[id]?.type==='item'?values(data[id],'P297').filter(v=>typeof v==='string'):[])}
  const codes=ids.flatMap(id=>get(countries,id)||[]);return codes.includes(code)&&codes.every(c=>c===code);
 }
 function matches(entity,s,q){
  if(entity?.id!==q||!qid(entity?.id)||entity.type!=='item'||!Number.isFinite(s.latitude)||!Number.isFinite(s.longitude)||Math.abs(s.latitude)>90||Math.abs(s.longitude)>180)return false;
  const names=[...Object.values(entity.labels||{}),...Object.values(entity.aliases||{}).flat()].map(x=>name(x?.value));
  const points=coords(entity);return name(s.name).length>1&&names.includes(name(s.name))&&points.length>0&&points.every(p=>distance(p,s)<=15000);
 }
 async function page(lang,title,signal){
  if(typeof title!=='string'||title.length>250||/[|\u0000-\u001f]/.test(title))return null;
  const d=await api(lang+'.wikipedia.org',{action:'query',titles:title,redirects:'1',prop:'pageprops',meta:'siteinfo',siprop:'rightsinfo'},signal),p=d.query?.pages?.[0];
  if(!p||p.missing||p.ns!==0||p.pageprops?.disambiguation!==undefined||!qid(p.pageprops?.wikibase_item)||!Number.isInteger(p.pageid))return null;
  return {...p,rights:d.query.rightsinfo};
 }
 async function identify(s,signal){
  const key=JSON.stringify([s.name,s.latitude,s.longitude,s.country_code]),saved=get(identities,key);if(saved!==undefined)return saved;
  const code=String(s.country_code||'').toUpperCase();if(!/^[A-Z]{2}$/.test(code))return null;
  const checked=new Set();
  for(const lang of ['is','en']){
   const p=await page(lang,s.name,signal);if(!p)continue;const q=p.pageprops.wikibase_item;if(checked.has(q))continue;checked.add(q);const e=(await entities([q],signal))[q];
   if(matches(e,s,q)&&await countryMatches(e,code,signal))return cache(identities,key,e);
  }
  const search=await api('www.wikidata.org',{action:'wbsearchentities',search:s.name,language:'is',uselang:'is',type:'item',limit:'5'},signal),ids=(search.search||[]).map(x=>x.id).filter(qid).filter(q=>!checked.has(q));
  if(!ids.length)return cache(identities,key,null);const found=await entities(ids,signal),valid=[];
  for(const q of ids){const e=found[q];if(matches(e,s,q)&&await countryMatches(e,code,signal))valid.push(e)}
  return cache(identities,key,valid.length===1?valid[0]:null);
 }
 async function article(entity,lang,signal){
  const title=entity.sitelinks?.[lang+'wiki']?.title;if(!title)return null;const key=entity.id+'|'+lang,saved=get(articles,key);if(saved!==undefined)return saved;
  const p=await page(lang,title,signal);if(!p||p.pageprops.wikibase_item!==entity.id)return cache(articles,key,null);
  let rights;try{rights=new URL(p.rights?.url)}catch{return null}
  if(rights.username||rights.password||rights.port||rights.protocol!=='https:'||rights.hostname!=='creativecommons.org'||!/^\/licenses\/by-sa\/(4\.0|3\.0)\//.test(rights.pathname))return null;
  const d=await api(lang+'.wikipedia.org',{action:'parse',pageid:String(p.pageid),prop:'text|revid',disableeditsection:'1'},signal),parse=d.parse;
  if(!parse||parse.pageid!==p.pageid||!Number.isInteger(parse.revid)||typeof parse.text!=='string')return null;
  return cache(articles,key,{...articleText(parse.text),lang,title:p.title,url:'https://'+lang+'.wikipedia.org/wiki/'+encodeURIComponent(p.title.replaceAll(' ','_')),revision:'https://'+lang+'.wikipedia.org/w/index.php?oldid='+parse.revid,license:rights.href});
 }
 function pick(a,group,key,index){
  if(!a)return [];
  let rows=a.entries.filter(p=>group[1].test(p.heading));
  if(key==='food'&&index===1){const drinks=/\b(coffee|wine|beer|liqueur|drink|espresso|limoncello)\b|kaffi|drykk|vinfram|bjor/;rows=[...rows,...a.entries.filter(p=>/cuisine|matarger/.test(p.heading)&&drinks.test(fold(p.text)))]}
  if(group[2]&&!rows.length)rows=a.intro.map(text=>({text,anchor:''}));
  return [...new Map(rows.map(p=>[p.text,p])).values()].slice(0,2);
 }
 function render(entity,is,en,own,fallbackFailed=false){
  const config=CONFIG[category];body.replaceChildren();const hero=node('div',null,'nearby-culture-hero'),picture=node('div');hero.append(picture);body.append(hero);
  body.append(node('h4',stop.label||stop.name));
  if(category==='events')body.append(node('p','Fróðleikur um hefðir og menningu, ekki staðfest dagskrá á ferðadögum.','notice'));
  for(let index=0;index<config.groups.length;index++){
   const group=config.groups[index],local=pick(is,group,category,index),foreign=local.length?[]:pick(en,group,category,index),rows=local.length?local:foreign,source=local.length?is:en;
   const section=node('details',null,'nearby-culture-section'),heading=node('summary',group[0]);section.open=index===0;section.append(heading);
   if(!rows.length)section.append(node('p',fallbackFailed?'Ekki tókst að staðfesta upplýsingar um þennan þátt. Prófaðu aftur síðar.':'Ekki fundust upplýsingar um þennan þátt í tengdri Wikipedia-grein.','notice'));
   else {if(source.lang!=='is')section.append(node('p','Frumtexti á ensku frá Wikipedia.','notice'));const text=node('p',limited(rows.map(r=>r.text).join('\n\n')));text.lang=source.lang;section.append(text);const attribution=node('p',null,'notice nearby-culture-source');attribution.append(link('Texti: höfundar Wikipedia · '+(source.lang==='is'?'íslenska':'enska'),source.revision+(rows[0].anchor?'#'+encodeURIComponent(rows[0].anchor):'')),document.createTextNode(' · Styttur úrdráttur · '),link('CC BY-SA',source.license));section.append(attribution)}body.append(section);
  }
  const primary=is||en;if(primary)body.append(link('Lesa meira á Wikipedia ↗',primary.url));
  const p=coords(entity)[0];if(p&&own===epoch)photos?.watch({wikidata:entity.id,name:stop.name,latitude:p.latitude,longitude:p.longitude},picture,hero,entity);
 }
 async function load(){
  if(!outer.open||loaded||!CONFIG[category])return;const own=epoch;controller=new AbortController();const current=controller;body.replaceChildren(node('p','Sæki fróðleik um áfangastaðinn…','notice'));body.setAttribute('aria-busy','true');
  try{
   if(!stop?.name){body.replaceChildren(node('p','Veldu skráðan áfangastað til að lesa um hann.','notice'));return}
   const e=await identify(stop,current.signal);if(own!==epoch||!outer.open)return;
   if(!e){body.replaceChildren(node('p','Ekki tókst að tengja áfangastaðinn örugglega við heimild. Þú getur áfram notað staðaleitina.','notice'));return}
   const is=await article(e,'is',current.signal);if(own!==epoch||!outer.open)return;let en=null;
   let fallbackFailed=false;if(CONFIG[category].groups.some((g,i)=>!pick(is,g,category,i).length)){try{en=await article(e,'en',current.signal)}catch(error){if(!is)throw error;fallbackFailed=true}}
   if(own!==epoch||!outer.open)return;if(!is&&!en){body.replaceChildren(node('p','Fróðleikur fannst ekki í tiltækum heimildum fyrir þennan áfangastað.','notice'));return}
   render(e,is,en,own,fallbackFailed);if(fallbackFailed)body.append(node('p','Íslenska heimildin er sýnd. Ekki tókst að sækja viðbótarefni á ensku.','notice'));loaded=true;
  }catch(e){if(own===epoch&&outer.open)body.replaceChildren(node('p',Date.now()<blockedUntil?'Heimildaveitan takmarkar sókn tímabundið. Prófaðu aftur síðar.':'Ekki tókst að sækja fróðleik. Lokaðu kaflanum og opnaðu aftur til að reyna á ný.','notice'))}
  finally{if(own===epoch){controller=null;body.removeAttribute('aria-busy')}}
 }
 function clear(){epoch++;controller?.abort();controller=null;photos?.reset();loaded=false;body.replaceChildren();body.removeAttribute('aria-busy')}
 outer.addEventListener('toggle',()=>{if(outer.open)load();else clear()});
 return {show(key,s,scope){const next=JSON.stringify([key,s?.id,s?.name,s?.latitude,s?.longitude,s?.country_code,scope]);if(next===stamp)return;stamp=next;clear();outer.open=false;category=CONFIG[key]?key:null;stop=s;outer.hidden=!category;title.textContent=CONFIG[key]?.title||''},reset(){stamp='';clear();outer.open=false;outer.hidden=true;category=null;stop=null}};
}
window.NearbyCulture={mount};
})();

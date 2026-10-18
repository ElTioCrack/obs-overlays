const Q=new URLSearchParams(location.search);
// config compartida (shared/config.js) editable desde el panel; se recarga sola si cambia
const PAGE=location.pathname.split("/").pop().replace(".html","");
const NS=({"starting":"start","starting-vertical":"start","brb":"brb","tech":"tech","ending":"end"})[PAGE]||PAGE;
const CFG_URL=new URL("config.js",document.currentScript.src).href.split("?")[0];
document.write('<script src="'+CFG_URL+"?t="+Date.now()+'"><\/script>');
// vista previa del panel: si estamos dentro del panel, usar el borrador sin guardar
try{if(window.parent!==window&&window.parent.__DRAFT_CFG)window.__DRAFT=window.parent.__DRAFT_CFG}catch(e){}
const P=(k,d)=>{const q=Q.get(k);if(q!=null)return q;const c=window.__DRAFT||window.CFG||{},has=o=>o&&o[k]!=null&&o[k]!=="";return has(c[NS])?c[NS][k]:has(c.global)?c.global[k]:d};
addEventListener("load",()=>{if(window.__DRAFT)return;const snap=JSON.stringify(window.CFG||{});setInterval(()=>{const s=document.createElement("script");s.src=CFG_URL+"?t="+Date.now();s.onload=()=>{s.remove();const c=window.CFG;if(!c||typeof c!=="object"||!c.global){window.CFG=JSON.parse(snap);return}/* config rota: se mantiene la última válida */if(JSON.stringify(c)!==snap)location.reload()};s.onerror=()=>s.remove();document.head.appendChild(s)},2000)});
if(Q.get("accent"))document.documentElement.style.setProperty("--a","#"+Q.get("accent"));
const LOW=Q.get("motion")==="low"||matchMedia("(prefers-reduced-motion: reduce)").matches;
if(LOW)document.documentElement.classList.add("low-motion");
const EASE={out:"cubic-bezier(.16,1,.3,1)",in:"cubic-bezier(.7,0,.84,0)",back:"cubic-bezier(.34,1.56,.64,1)",num:"cubic-bezier(.22,1,.36,1)"};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const replay=(el,cls)=>{el.classList.remove(cls);void el.offsetWidth;el.classList.add(cls)};
const swap=(el,fn)=>{fn();replay(el,"swap")};
const bump=el=>replay(el,"bump");
const shimmer=el=>replay(el,"shimmer");
// WAAPI: entrada 420ms ease-out, salida 260ms ease-in
const enter=(el,o={})=>el.animate([{opacity:0,transform:o.from||"translateY(24px) scale(.96)"},{opacity:1,transform:"none"}],{duration:LOW?1:(o.d||420),delay:o.delay||0,easing:o.e||EASE.out,fill:"both"}).finished;
const leave=(el,o={})=>el.animate([{opacity:1,transform:"none"},{opacity:0,transform:o.to||"translateY(-12px)"}],{duration:LOW?1:(o.d||260),easing:EASE.in,fill:"both"}).finished;
// cola FIFO global: nunca se montan alertas
const queue=[];let playing=false;
const enqueue=fn=>{if(queue.length>=20)queue.shift();/* cola limitada: se descarta lo más antiguo */queue.push(fn);if(!playing)next()};
async function next(){const fn=queue.shift();if(!fn){playing=false;return}playing=true;try{await fn()}catch(e){}next()}
// contador con easing
function countTo(el,to,d=900){const from=+(el.dataset.value||0),t0=performance.now();const f=t=>{const p=Math.min((t-t0)/d,1),e=1-Math.pow(1-p,3);el.textContent=Math.round(from+(to-from)*e).toLocaleString("es");if(p<1)requestAnimationFrame(f);else el.dataset.value=to};requestAnimationFrame(f)}
// roll por dígito: solo anima el carácter que cambia
function roll(el,str){const c=[...str];if(el.children.length!==c.length){el.innerHTML=c.map(x=>`<span class="d">${x}</span>`).join("");return}
c.forEach((x,i)=>{const d=el.children[i];if(d.textContent!==x){d.textContent=x;if(!LOW)d.animate([{transform:"translateY(-45%)",opacity:0},{transform:"none",opacity:1}],{duration:380,easing:EASE.out})}})}
const pad=n=>String(n).padStart(2,"0");

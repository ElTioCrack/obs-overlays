// Motor de pantallas: partículas, título letra a letra, ticker, reloj, tarjetas
const NAME=P("name","el_tio_crack");
function stageBg(root){root.insertAdjacentHTML("afterbegin",`<i class="orb g"></i><i class="orb s"></i><i class="orb g2"></i><div class="grid"></div><canvas id="fx"></canvas><div class="vign"></div><div class="frame-base"></div><div class="frame-glow"></div><div class="frame"></div><i class="corner tl"></i><i class="corner tr"></i><i class="corner br"></i><i class="corner bl"></i>`)}
// chispas doradas que suben + ráfagas
const FX={parts:[],burst(x,y,n=90){for(let i=0;i<n;i++){const a=Math.random()*6.283,s=2+Math.random()*7;this.parts.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-3,r:1+Math.random()*2.4,life:1,g:.12,burst:true,hue:Math.random()<.25})}}};
function startFx(n=70){const cv=document.getElementById("fx"),x=cv.getContext("2d");let W,H;const fit=()=>{W=cv.width=innerWidth;H=cv.height=innerHeight};fit();addEventListener("resize",fit);
 const mk=(y)=>({x:Math.random()*W,y:y??Math.random()*H,r:.6+Math.random()*2.2,vy:.25+Math.random()*.9,sw:Math.random()*6.283,sp:.005+Math.random()*.015,a:.25+Math.random()*.6,tw:Math.random()*6.283,silver:Math.random()<.3});
 const base=Array.from({length:n},()=>mk());let raf;
 const draw=()=>{x.clearRect(0,0,W,H);x.globalCompositeOperation="lighter";
  for(const p of base){p.y-=p.vy;p.sw+=p.sp;p.tw+=.05;const px=p.x+Math.sin(p.sw)*18;if(p.y<-10)Object.assign(p,mk(H+10));const al=p.a*(.55+.45*Math.sin(p.tw));const g=x.createRadialGradient(px,p.y,0,px,p.y,p.r*5);g.addColorStop(0,p.silver?`rgba(255,255,255,${al})`:`rgba(255,226,170,${al})`);g.addColorStop(1,"rgba(212,162,78,0)");x.fillStyle=g;x.beginPath();x.arc(px,p.y,p.r*5,0,6.283);x.fill()}
  FX.parts=FX.parts.filter(p=>p.life>0);for(const p of FX.parts){p.vy+=p.g;p.vx*=.985;p.x+=p.vx;p.y+=p.vy;p.life-=.012;x.fillStyle=p.hue?`rgba(255,255,255,${p.life})`:`rgba(232,185,104,${p.life})`;x.beginPath();x.arc(p.x,p.y,p.r,0,6.283);x.fill()}
  x.globalCompositeOperation="source-over";raf=requestAnimationFrame(draw)};
 if(!LOW)raf=requestAnimationFrame(draw);document.addEventListener("visibilitychange",()=>{cancelAnimationFrame(raf);if(!document.hidden&&!LOW)raf=requestAnimationFrame(draw)})}
// título: letras que caen con blur, palabra acento en dorado
function splitTitle(el,text,acc){const words=text.split(" ");let k=0;el.innerHTML=words.map(w=>`<span class="w${acc&&w.toLowerCase()===acc.toLowerCase()?" acc":""}">${[...w].map(c=>`<span class="l">${c}</span>`).join("")}</span>`).join(" ");
 el.querySelectorAll(".l").forEach(l=>{if(!LOW)l.animate([{opacity:0,transform:"translateY(.45em) rotate(6deg)",filter:"blur(8px)"},{opacity:1,transform:"none",filter:"blur(0)"}],{duration:700,delay:200+k++*38,easing:EASE.out,fill:"both"})});
 // ola suave periódica
 setInterval(()=>{let i=0;el.querySelectorAll(".l").forEach(l=>{if(!LOW)l.animate([{transform:"none"},{transform:"translateY(-.08em)"},{transform:"none"}],{duration:600,delay:i++*30,easing:"ease-in-out"})})},9000)}
function ticker(el,items,speed=70){const seg=items.map(t=>`<span>${t}</span><i class="sep"></i>`).join("");el.innerHTML=`<span class="row">${seg.repeat(8)}</span>`;const row=el.firstChild;requestAnimationFrame(()=>{const w=row.scrollWidth/8;row.animate([{transform:"translate3d(0,0,0)"},{transform:`translate3d(${-w}px,0,0)`}],{duration:w/speed*1000,iterations:Infinity})})}
function clockTo(el){const t=()=>{const d=new Date();roll(el,pad(d.getHours())+":"+pad(d.getMinutes()))};t();setInterval(t,1000)}
const IC={game:'<path d="M6 11h4M8 9v4M15 12h.01M18 10h.01"/><rect x="2" y="6" width="20" height="12" rx="6"/>',heart:'<path d="M12 20s-7-4.4-9-8.5C1.6 8.6 3.6 5 7 5c2 0 3.4 1.2 5 3 1.6-1.8 3-3 5-3 3.4 0 5.4 3.6 4 6.5C19 15.6 12 20 12 20z"/>',bell:'<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4z"/><path d="M10 21h4"/>',chat:'<path d="M4 5h16v11H9l-5 4z"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a5 5 0 0 1 3.5 6"/>'};
const icon=k=>`<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${IC[k]||""}</svg>`;
// tarjetas: {k,label,value|values[],bar}
function cards(el,list){el.innerHTML=list.map((c,i)=>`<div class="card">${icon(c.k)}<small>${c.label}</small><b data-i="${i}">${c.values?c.values[0]:c.value}</b>${c.bar!=null?`<div class="bar"><i style="--p:${c.bar}"></i></div>`:""}</div>`).join("");
 el.querySelectorAll(".card").forEach((c,i)=>enter(c,{from:"translateY(20px) scale(.97)",delay:900+i*90,d:600}));
 list.forEach((c,i)=>{if(!c.values)return;let n=0;const b=el.querySelector(`b[data-i="${i}"]`);setInterval(()=>swap(b,()=>b.textContent=c.values[++n%c.values.length]),5000+i*700)})}
function brandTop(el,sub){el.innerHTML=`<div class="brand"><div class="av">${NAME[0].toUpperCase()}</div><div><b>${NAME}</b><small>${sub}</small></div></div><div class="chips"><span class="chip"><span class="dot live gold"></span><span id="st"></span></span><span class="chip"><span id="clk"></span></span></div>`;clockTo(document.getElementById("clk"))}

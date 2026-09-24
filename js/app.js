const COLORS=[['blue','#1265ff'],['tiffany blue','#0abab5'],['teal blue','#078a8a'],['sky blue','#56b8ff'],['red','#e3262e'],['ruby red','#9b111e'],['white','#f4f4f2'],['silver','#b9bec5'],['black','#050505'],['navy','#081b4b'],['orange','#f47a1f'],['purple','#7b3fc6'],['light purple','#b78cff'],['dark grey','#444'],['light grey','#b8b8b8'],['deep blue','#123c9e'],['admiral blue','#2d5f9a'],['space blue','#183b57'],['blue grey','#6f8192'],['dark maroon','#4a1019'],['gold','#c6a15b'],['yellow','#f4d30b'],['neon yellow','#dfff00'],['clover','#168a45'],['brown','#6b4026'],['green','#21a34a'],['lime green','#8dcc19'],['forest green','#164b2a'],['wbc green','#009b77'],['olive green','#687230'],['pink','#f08bb5'],['hot pink','#ff2b88'],['burgundy','#6f1232'],['maroon','#751b25'],['skin','#d7a07b']];
const AREAS=['Palm Back','Wrist Back','Thumb Up','Thumb Middle','Thumb Down','Thumb In','Thumb Strip','Thumb Attachment','Palm In','Palm Out','Piping','Stitches','Laces'];
const img={contest:'assets/contest.jpg',laces:'assets/laces.jpg',velcro:'assets/velcro.jpg'};
const blank=()=>({colors:{},logoColor:'#050505',dangerColor:'#050505',mainLogo:true,wristPatch:true,customText:''});
const state={type:'contest',size:'8oz',padding:'foam',closure:'laces',activeGlove:'left',design:{left:blank(),right:blank()},area:'Palm Back'};
const $=id=>document.getElementById(id); const q=s=>document.querySelectorAll(s);
function design(){return state.design[state.activeGlove]}
function mode(){return state.type==='contest'?'contest':state.closure}
function setType(type){state.type=type;state.size=type==='contest'?'8oz':'14oz';state.padding='foam';state.closure=type==='contest'?'laces':'laces';state.area='Palm Back';q('#typeTabs button,#typeBtns button').forEach(b=>b.classList.toggle('active',b.dataset.type===type));renderOptions();renderAreas();renderLogo();renderTemplate();}
function renderOptions(){let h='';if(state.type==='contest'){h+=block('Padding type',`<div class="seg two"><button data-pad="foam" class="${state.padding==='foam'?'active':''}">Foam</button><button data-pad="horsehair" class="${state.padding==='horsehair'?'active':''}">Horsehair</button></div>`);h+=block('Weight',`<div class="seg three"><button data-size="8oz" class="${state.size==='8oz'?'active':''}">8oz</button><button data-size="10oz" class="${state.size==='10oz'?'active':''}">10oz</button><button data-size="12oz" class="${state.size==='12oz'?'active':''}">12oz</button></div>`)}else{h+=block('Padding type',`<div class="seg two"><button data-pad="foam" class="${state.padding==='foam'?'active':''}">Full foam</button><button data-pad="blend" class="${state.padding==='blend'?'active':''}">3 mix horsehair blend</button></div>`);h+=block('Closure',`<div class="seg two"><button data-closure="laces" class="${state.closure==='laces'?'active':''}">Laces</button><button data-closure="velcro" class="${state.closure==='velcro'?'active':''}">Velcro</button></div>`);h+=block('Weight',`<div class="seg two"><button data-size="14oz" class="${state.size==='14oz'?'active':''}">14oz</button><button data-size="16oz" class="${state.size==='16oz'?'active':''}">16oz</button></div>`)}$('options').innerHTML=h;q('#options [data-pad]').forEach(b=>b.onclick=()=>{state.padding=b.dataset.pad;renderOptions()});q('#options [data-size]').forEach(b=>b.onclick=()=>{state.size=b.dataset.size;renderOptions()});q('#options [data-closure]').forEach(b=>b.onclick=()=>{state.closure=b.dataset.closure;state.area='Palm Back';renderOptions();renderLogo();renderAreas();renderTemplate()});}
function block(title,inner){return `<div class="option-title">${title}</div>${inner}`}
function renderAreas(){const available=state.type==='contest'?AREAS:AREAS; $('areas').innerHTML=available.map(a=>`<button class="area-btn ${state.area===a?'active':''}" data-area="${a}">${a}</button>`).join('');q('.area-btn').forEach(b=>b.onclick=()=>{state.area=b.dataset.area;$('areaTitle').textContent=state.area;$('paletteTitle').textContent=state.area;openPalette();renderAreas()});$('areaTitle').textContent=state.area}
function openPalette(){const fixed=state.area==='Stitches'||state.area==='Laces';$('palette').innerHTML=COLORS.map(([n,c])=>`<button class="swatch ${(design().colors[state.area]||'#f4f4f2')===c?'selected':''}" data-color="${c}" ${fixed?'disabled':''} style="background:${c}"><span>${n}</span></button>`).join('');$('paletteCard').classList.add('open');q('.swatch').forEach(b=>b.onclick=()=>{design().colors[state.area]=b.dataset.color;renderTemplate();openPalette()})}
$('closePalette').onclick=()=>$('paletteCard').classList.remove('open');
function renderLogo(){const d=design();const velcro=state.type!=='contest'&&state.closure==='velcro';const removal=!velcro;$('logoOptions').innerHTML=`<div class="logo-row"><div><b>Main glove logo</b><small>${removal?'Remove for +£10':'Mandatory on velcro gloves — cannot be removed'}</small></div><button id="mainToggle" class="toggle ${d.mainLogo?'on':''}" ${removal?'':'disabled'}></button></div><div class="logo-row"><div><b>Logo colour</b><small>Logo remains above the selected leather colour.</small><div class="logo-palette" id="logoPalette"></div></div></div>${velcro?`<div class="logo-row"><div><b>Dangerous Adversary logo</b><small>Colour can change — cannot be removed.</small><div class="logo-palette" id="dangerPalette"></div></div></div>`:''}<div class="logo-row"><div><b>Wrist patch</b><small>${velcro?'Fixed on velcro — cannot be removed':'Can be removed free of charge'}</small></div><button id="wristToggle" class="toggle ${d.wristPatch?'on':''}" ${velcro?'disabled':''}></button></div>`;
function mini(id,key){$(id).innerHTML=COLORS.map(([n,c])=>`<button class="mini-swatch ${d[key]===c?'active':''}" title="${n}" style="background:${c}" data-c="${c}"></button>`).join('');q('#'+id+' .mini-swatch').forEach(b=>b.onclick=()=>{d[key]=b.dataset.c;renderLogo();renderTemplate()})}mini('logoPalette','logoColor');if(velcro)mini('dangerPalette','dangerColor');$('mainToggle')?.addEventListener('click',()=>{d.mainLogo=!d.mainLogo;renderLogo();updatePrice();renderTemplate()});$('wristToggle')?.addEventListener('click',()=>{if(!velcro){d.wristPatch=!d.wristPatch;renderLogo();renderTemplate()}});}
function updatePrice(){const d=design();const fee=!d.mainLogo; $('price').textContent='£'+(125+(fee?10:0));$('fee').classList.toggle('hidden',!fee)}
// Normalised polygon masks. Coordinates are percentages of the supplied final templates. They follow the actual seam layout in the three final artworks.
const masks={
contest:{
'Palm Back':[[[57,4],[86,4],[87,60],[58,61]],[[12,31],[38,31],[39,90],[13,90]]],
'Wrist Back':[[[57,61],[87,61],[87,91],[57,91]]],
'Thumb Up':[[[35,17],[40,17],[43,33],[40,43],[36,39]]],
'Thumb Middle':[[[35,32],[43,32],[42,49],[36,52]]],
'Thumb Down':[[[35,46],[42,47],[41,64],[35,66]]],
'Thumb In':[[[34,59],[40,59],[39,70],[34,69]]],
'Thumb Strip':[[[39,17],[43,18],[40,68],[37,68]]],
'Thumb Attachment':[[[32,37],[36,36],[37,67],[33,69]]],
'Palm In':[[[13,32],[38,32],[36,88],[14,88]]],
'Palm Out':[[[57,4],[86,4],[87,60],[58,61]]]
},
laces:{
'Palm Back':[[[57,4],[86,4],[87,60],[58,61]],[[12,31],[38,31],[39,90],[13,90]]],
'Wrist Back':[[[57,61],[87,61],[87,91],[57,91]]],
'Thumb Up':[[[35,16],[40,17],[43,32],[40,43],[36,39]]],
'Thumb Middle':[[[35,32],[43,32],[42,49],[36,52]]],
'Thumb Down':[[[35,46],[42,47],[41,64],[35,66]]],
'Thumb In':[[[34,59],[40,59],[39,70],[34,69]]],
'Thumb Strip':[[[39,16],[43,17],[40,68],[37,68]]],
'Thumb Attachment':[[[32,37],[36,36],[37,67],[33,69]]],
'Palm In':[[[13,32],[38,32],[36,88],[14,88]]],
'Palm Out':[[[57,4],[86,4],[87,60],[58,61]]]
},
velcro:{
'Palm Back':[[[57,3],[88,3],[89,61],[58,61]],[[11,2],[44,2],[43,47],[13,48]]],
'Wrist Back':[[[58,62],[88,62],[88,93],[58,93]],[[12,63],[44,63],[44,93],[12,93]]],
'Thumb Up':[[[38,16],[42,17],[43,32],[39,43]]],
'Thumb Middle':[[[38,31],[44,31],[43,48],[39,51]]],
'Thumb Down':[[[37,46],[43,47],[42,63],[37,65]]],
'Thumb In':[[[35,59],[40,59],[39,70],[34,70]]],
'Thumb Strip':[[[40,17],[44,18],[41,67],[38,67]]],
'Thumb Attachment':[[[32,37],[38,35],[39,67],[33,69]]],
'Palm In':[[[12,3],[44,3],[44,47],[12,47]]],
'Palm Out':[[[57,3],[88,3],[89,61],[58,61]]]
}}
const pipings={contest:[[[13,60],[39,60]],[[57,61],[87,61]],[[13,91],[39,91]],[[57,91],[87,91]]],laces:[[[13,60],[39,60]],[[57,61],[87,61]],[[13,91],[39,91]],[[57,91],[87,91]]],velcro:[[[12,62],[44,62]],[[58,62],[88,62]],[[12,93],[44,93]],[[58,93],[88,93]],[[44,64],[44,92]],[[88,64],[88,92]]]};
function poly(points){return points.map(p=>p.join('% ')+'%').join(',')}
function regionHTML(points,color){return `<div class="region" style="clip-path:polygon(${points.map(p=>p.join('% ')).join(',')})"><div class="fill" style="background:${color}"></div></div>`}
function renderTemplate(){const d=design();const m=mode();$('templateImg').src=img[m];$('templateTag').textContent=(state.type==='contest'?'CONTEST':state.type.toUpperCase())+' · '+(m==='velcro'?'VELCRO':'LACES');$('gloveLabel').textContent=(state.activeGlove==='left'?'LEFT':'RIGHT')+' GLOVE';
let html='';const mm=masks[m];Object.entries(mm).forEach(([a,polys])=>{const c=d.colors[a]||'#f4f4f2';polys.forEach(p=>html+=regionHTML(p,c))});$('colorLayer').innerHTML=html;
let lh='';const pc=d.colors.Piping||'#f4f4f2';pipings[m].forEach(line=>{const [a,b]=line;const left=a[0],top=a[1],width=b[0]-a[0],height=Math.max(0.5,b[1]-a[1]+1);lh+=`<div class="piping" style="left:${left}%;top:${top}%;width:${width}%;height:${height}%;background:${pc}"></div>`});$('lineLayer').innerHTML=lh;
let logos='';if(d.mainLogo){if(state.type==='contest'){logos+=`<div class="logo-tint" style="left:67%;top:20%;width:18%;height:33%;background:${d.logoColor};opacity:.7"></div>`}else{logos+=`<div class="logo-tint" style="left:61%;top:19%;width:27%;height:25%;background:${d.logoColor};opacity:.82"></div>`}}
if(state.type==='contest'&&d.wristPatch)logos+=`<div class="logo-tint" style="left:60%;top:66%;width:25%;height:21%;background:#050505;opacity:.25"></div>`;
if(state.type!=='contest'&&m==='velcro'){logos+=`<div class="logo-tint" style="left:13%;top:66%;width:29%;height:20%;background:${d.dangerColor};opacity:.5"></div>`}
if(d.customText)logos+=`<div class="text-decal" style="left:75%;top:55%;color:${d.logoColor}">${escapeHtml(d.customText)}</div>`;$('logoLayer').innerHTML=logos;updatePrice()}
function escapeHtml(s){return s.replace(/[&<>'"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[m]))}
q('#typeTabs button,#typeBtns button').forEach(b=>b.onclick=()=>setType(b.dataset.type));$('switchBtn').onclick=()=>{state.activeGlove=state.activeGlove==='left'?'right':'left';renderLogo();renderTemplate()};$('copyBtn').onclick=()=>{state.design.right=JSON.parse(JSON.stringify(state.design.left));showToast('Left glove design copied to right glove');if(state.activeGlove==='right')renderLogo();renderTemplate()};$('customText').oninput=e=>{design().customText=e.target.value;renderTemplate()};$('textToggle').onclick=()=>{$('customText').focus()};$('menuBtn').onclick=()=>$('sidebar').classList.toggle('open');$('sendBtn').onclick=()=>{const name=$('name').value.trim(),email=$('email').value.trim();if(!name||!email){showToast('Please enter your name and email');return}const payload={gloveType:state.type,size:state.size,padding:state.padding,closure:state.closure,leftGlove:state.design.left,rightGlove:state.design.right,extraDetails:$('details').value,name,email};const body=encodeURIComponent(JSON.stringify(payload,null,2));window.location.href=`mailto:kieranmacmillan07@icloud.com?subject=Mano%20a%20Mano%20Custom%20Glove%20Design&body=${body}`};function showToast(t){const e=$('toast');e.textContent=t;e.classList.add('show');setTimeout(()=>e.classList.remove('show'),2200)}
renderOptions();renderAreas();renderLogo();renderTemplate();

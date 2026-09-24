const COLORS=[['blue','#1265ff'],['tiffany blue','#0abab5'],['teal blue','#078a8a'],['sky blue','#56b8ff'],['red','#e3262e'],['ruby red','#9b111e'],['white','#f4f4f2'],['silver','#b9bec5'],['black','#050505'],['navy','#081b4b'],['orange','#f47a1f'],['purple','#7b3fc6'],['light purple','#b78cff'],['dark grey','#444'],['light grey','#b8b8b8'],['deep blue','#123c9e'],['admiral blue','#2d5f9a'],['space blue','#183b57'],['blue grey','#6f8192'],['dark maroon','#4a1019'],['gold','#c6a15b'],['yellow','#f4d30b'],['neon yellow','#dfff00'],['clover','#168a45'],['brown','#6b4026'],['green','#21a34a'],['lime green','#8dcc19'],['forest green','#164b2a'],['wbc green','#009b77'],['olive green','#687230'],['pink','#f08bb5'],['hot pink','#ff2b88'],['burgundy','#6f1232'],['maroon','#751b25'],['skin','#d7a07b']];
const AREAS=['Palm Back','Wrist Back','Thumb Up','Thumb Middle','Thumb Down','Thumb In','Thumb Strip','Thumb Attachment','Palm In','Palm Out','Piping','Stitches','Laces'];
const img={contest:'assets/contest-clean.jpg',laces:'assets/laces-clean.jpg',velcro:'assets/velcro-clean.jpg'};
const blank=()=>({colors:{},logoColor:'#050505',dangerColor:'#050505',mainLogo:true,wristPatch:true,customText:''});
const state={type:'contest',size:'8oz',padding:'foam',closure:'laces',activeGlove:'left',design:{left:blank(),right:blank()},area:'Palm Back'};
const $=id=>document.getElementById(id); const q=s=>document.querySelectorAll(s);
const design=()=>state.design[state.activeGlove];
const mode=()=>state.type==='contest'?'contest':state.closure;
function setType(type){state.type=type;state.size=type==='contest'?'8oz':'14oz';state.padding='foam';state.closure='laces';state.area='Palm Back';q('#typeTabs button,#typeBtns button').forEach(b=>b.classList.toggle('active',b.dataset.type===type));renderOptions();renderAreas();renderLogo();renderTemplate();closePalette();}
function block(title,inner){return `<div class="option-title">${title}</div>${inner}`}
function renderOptions(){let h='';if(state.type==='contest'){h+=block('Padding type',`<div class="seg two"><button data-pad="foam" class="${state.padding==='foam'?'active':''}">Foam</button><button data-pad="horsehair" class="${state.padding==='horsehair'?'active':''}">Horsehair</button></div>`);h+=block('Weight',`<div class="seg three"><button data-size="8oz" class="${state.size==='8oz'?'active':''}">8oz</button><button data-size="10oz" class="${state.size==='10oz'?'active':''}">10oz</button><button data-size="12oz" class="${state.size==='12oz'?'active':''}">12oz</button></div>`)}else{h+=block('Padding type',`<div class="seg two"><button data-pad="foam" class="${state.padding==='foam'?'active':''}">Full foam</button><button data-pad="blend" class="${state.padding==='blend'?'active':''}">3 mix horsehair blend</button></div>`);h+=block('Closure',`<div class="seg two"><button data-closure="laces" class="${state.closure==='laces'?'active':''}">Laces</button><button data-closure="velcro" class="${state.closure==='velcro'?'active':''}">Velcro</button></div>`);h+=block('Weight',`<div class="seg two"><button data-size="14oz" class="${state.size==='14oz'?'active':''}">14oz</button><button data-size="16oz" class="${state.size==='16oz'?'active':''}">16oz</button></div>`)}$('options').innerHTML=h;q('#options [data-pad]').forEach(b=>b.onclick=()=>{state.padding=b.dataset.pad;renderOptions()});q('#options [data-size]').forEach(b=>b.onclick=()=>{state.size=b.dataset.size;renderOptions()});q('#options [data-closure]').forEach(b=>b.onclick=()=>{state.closure=b.dataset.closure;state.area='Palm Back';renderOptions();renderLogo();renderAreas();renderTemplate()});}
function renderAreas(){$('areas').innerHTML=AREAS.map(a=>`<button class="area-btn ${state.area===a?'active':''}" data-area="${a}">${a}</button>`).join('');q('.area-btn').forEach(b=>b.onclick=()=>{state.area=b.dataset.area;$('areaTitle').textContent=state.area;$('paletteTitle').textContent=state.area;openPalette();renderAreas()});$('areaTitle').textContent=state.area;}
function closePalette(){$('paletteCard').classList.remove('open')}
$('closePalette').onclick=closePalette;
function openPalette(){const fixed=state.area==='Stitches'||state.area==='Laces';$('palette').innerHTML=COLORS.map(([n,c])=>`<button class="swatch ${(design().colors[state.area]||'#f4f4f2')===c?'selected':''}" data-color="${c}" ${fixed?'disabled':''} style="background:${c}"><span>${n}</span></button>`).join('');$('paletteCard').classList.add('open');q('.swatch').forEach(b=>b.onclick=()=>{design().colors[state.area]=b.dataset.color;renderTemplate();openPalette()})}
function renderLogo(){const d=design();const velcro=state.type!=='contest'&&state.closure==='velcro';const removable=!velcro;$('logoOptions').innerHTML=`<div class="logo-row"><div><b>Main glove logo</b><small>${removable?'Remove for +£10':'Mandatory on velcro gloves — cannot be removed'}</small></div><button id="mainToggle" class="toggle ${d.mainLogo?'on':''}" ${removable?'':'disabled'}></button></div><div class="logo-row"><div><b>Logo colour</b><small>Logo sits above the selected glove colour.</small><div class="logo-palette" id="logoPalette"></div></div></div>${velcro?`<div class="logo-row"><div><b>Dangerous Adversary logo</b><small>Colour can change — cannot be removed.</small><div class="logo-palette" id="dangerPalette"></div></div></div>`:''}<div class="logo-row"><div><b>Wrist patch</b><small>${velcro?'Not removable on velcro':'Can be removed free of charge'}</small></div><button id="wristToggle" class="toggle ${d.wristPatch?'on':''}" ${velcro?'disabled':''}></button></div>`;
function mini(id,key){$(id).innerHTML=COLORS.map(([n,c])=>`<button class="mini-swatch ${d[key]===c?'active':''}" title="${n}" style="background:${c}" data-c="${c}"></button>`).join('');q('#'+id+' .mini-swatch').forEach(b=>b.onclick=()=>{d[key]=b.dataset.c;renderLogo();renderTemplate()})}mini('logoPalette','logoColor');if(velcro)mini('dangerPalette','dangerColor');$('mainToggle')?.addEventListener('click',()=>{d.mainLogo=!d.mainLogo;renderLogo();renderTemplate()});$('wristToggle')?.addEventListener('click',()=>{if(!velcro){d.wristPatch=!d.wristPatch;renderLogo();renderTemplate()}});}
function updatePrice(){const d=design();const fee=!d.mainLogo&&state.type!=='velcro';$('price').textContent='£'+(125+(fee?10:0));$('fee').classList.toggle('hidden',!fee)}
// Accurate template zones. Percentages are based on the supplied 1536x1024 final artwork.
const zones={
contest:{
'Palm Back':[[[12,29],[39,29],[39,61],[13,61]],[[57,3],[87,3],[87,61],[58,61]]],
'Wrist Back':[[[57,62],[87,62],[87,91],[57,91]],[[13,62],[39,62],[39,91],[13,91]]],
'Thumb Up':[[[40,16],[48,16],[49,32],[44,43],[40,37]]],
'Thumb Middle':[[[40,31],[49,31],[49,48],[42,53]]],
'Thumb Down':[[[40,47],[49,47],[49,64],[41,67]]],
'Thumb In':[[[35,33],[42,35],[42,67],[36,69]]],
'Thumb Strip':[[[43,16],[49,16],[49,66],[45,67]]],
'Thumb Attachment':[[[37,35],[41,33],[43,65],[38,68]]],
'Palm In':[[[12,29],[39,29],[39,61],[13,61]]],
'Palm Out':[[[57,3],[87,3],[87,61],[58,61]]]
},
laces:{
'Palm Back':[[[12,29],[39,29],[39,61],[13,61]],[[57,3],[87,3],[87,61],[58,61]]],
'Wrist Back':[[[57,62],[87,91],[57,91]],[[13,62],[39,91],[13,91]]],
'Thumb Up':[[[40,16],[48,16],[49,32],[44,43],[40,37]]],
'Thumb Middle':[[[40,31],[49,31],[49,48],[42,53]]],
'Thumb Down':[[[40,47],[49,47],[49,64],[41,67]]],
'Thumb In':[[[35,33],[42,35],[42,67],[36,69]]],
'Thumb Strip':[[[43,16],[49,16],[49,66],[45,67]]],
'Thumb Attachment':[[[37,35],[41,33],[43,65],[38,68]]],
'Palm In':[[[12,29],[39,29],[39,61],[13,61]]],
'Palm Out':[[[57,3],[87,3],[87,61],[58,61]]]
},
velcro:{
'Palm Back':[[[12,29],[39,29],[39,61],[13,61]],[[57,3],[88,3],[88,61],[58,61]]],
'Wrist Back':[[[13,63],[44,63],[44,93],[13,93]],[[58,63],[88,63],[88,93],[58,93]]],
'Thumb Up':[[[40,16],[49,16],[50,32],[45,43],[40,37]]],
'Thumb Middle':[[[40,31],[50,31],[50,48],[42,53]]],
'Thumb Down':[[[40,47],[50,47],[50,64],[41,67]]],
'Thumb In':[[[35,33],[42,35],[42,67],[36,69]]],
'Thumb Strip':[[[43,16],[50,16],[50,67],[45,67]]],
'Thumb Attachment':[[[37,35],[42,33],[43,66],[38,68]]],
'Palm In':[[[12,29],[39,29],[39,61],[13,61]]],
'Palm Out':[[[57,3],[88,3],[88,61],[58,61]]]
}};
const pipingZones={contest:[[[13,60],[39,60]],[[57,61],[87,61]],[[13,91],[39,91]],[[57,91],[87,91]]],laces:[[[13,60],[39,60]],[[57,61],[87,61]],[[13,91],[39,91]],[[57,91],[87,91]]],velcro:[[[12,62],[44,62]],[[58,62],[88,62]],[[12,93],[44,93]],[[58,93],[88,93]],[[44,64],[44,92]],[[88,64],[88,92]]]};
const stitchZones={contest:[['h',12,30,39,30],['h',12,61,39,61],['h',57,61,87,61],['h',57,91,87,91]],laces:[['h',12,30,39,30],['h',12,61,39,61],['h',57,61,87,61],['h',57,91,87,91]],velcro:[['h',12,62,44,62],['h',58,62,88,62],['h',12,93,44,93],['h',58,93,88,93]]};
function poly(points){return points.map(p=>p[0]+'% '+p[1]+'%').join(',')}
function regionHTML(points,color){return `<div class="region" style="clip-path:polygon(${poly(points)})"><div class="fill" style="background:${color}"></div></div>`}
function lineHTML(a,b,color,cls='piping'){const x=a[0],y=a[1],w=b[0]-a[0],h=Math.max(.35,b[1]-a[1]);return `<div class="${cls}" style="left:${x}%;top:${y}%;width:${w}%;height:${h}%;background:${color}"></div>`}
function maskStyle(src,color){return `-webkit-mask-image:url('${src}');mask-image:url('${src}');background:${color}`}
function renderTemplate(){const d=design(),m=mode();$('templateImg').src=img[m];$('templateTag').textContent=(state.type==='contest'?'CONTEST':state.type.toUpperCase())+' · '+(m==='velcro'?'VELCRO':'LACES');$('gloveLabel').textContent=(state.activeGlove==='left'?'LEFT':'RIGHT')+' GLOVE';
let html='';const zm=zones[m];Object.entries(zm).forEach(([a,polys])=>{const c=d.colors[a]||'#f4f4f2';polys.forEach(p=>html+=regionHTML(p,c))});$('colorLayer').innerHTML=html;
let lh='';const pc=d.colors.Piping||'#f4f4f2';pipingZones[m].forEach(([a,b])=>lh+=lineHTML(a,b,pc));const sc=d.colors.Stitches||'#050505';stitchZones[m].forEach(z=>{if(z[0]==='h')lh+=lineHTML([z[1],z[2]],[z[3],z[4]],sc,'stitches')});$('lineLayer').innerHTML=lh;
let logos='';
if(state.type==='contest'){
 if(d.mainLogo){logos+=`<div class="logo-mask contest-grey" style="left:67%;top:14%;width:18%;height:47%;${maskStyle('assets/contest-logo-grey-mask.png',d.logoColor)}"></div><div class="logo-mask contest-black" style="left:67%;top:14%;width:18%;height:47%;${maskStyle('assets/contest-logo-black-mask.png','#050505')}"></div>`}
 if(d.wristPatch)logos+=`<img class="fixed-patch contest-patch" src="assets/contest-wrist_patch-overlay.jpg" alt="">`;
}else{
 if(d.mainLogo)logos+=`<div class="logo-mask main-logo" style="left:60%;top:19%;width:30%;height:30%;${maskStyle('assets/training-logo-mask.png',d.logoColor)}"></div>`;
 if(m==='velcro')logos+=`<div class="logo-mask danger-logo" style="left:6.5%;top:70%;width:33%;height:19%;${maskStyle('assets/danger-logo-mask.png',d.dangerColor)}"></div>`;
 else if(d.wristPatch)logos+=`<img class="fixed-patch wrist-patch" src="assets/laces-wrist_patch-overlay.jpg" alt="">`;
}
if(d.customText)logos+=`<div class="text-decal" style="left:74%;top:54%;color:${d.logoColor}">${escapeHtml(d.customText)}</div>`;$('logoLayer').innerHTML=logos;updatePrice()}
function escapeHtml(s){return s.replace(/[&<>'"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[m]))}
// Navigation: real pages within the same site rather than dead links.
const pageData={
 home:{title:'BUILT BY FIGHTERS. FOR FIGHTERS.',sub:'Mano a Mano Boxing equipment built around custom design, performance and identity.',cards:[['Custom Gloves','Build your glove from the ground up.','custom-gloves'],['Gloves','Browse training, sparring and contest gloves.','shop'],['About','Our story and what Mano a Mano stands for.','about']]},
 shop:{title:'GLOVES',sub:'Training, sparring and contest gloves.',cards:[['Training Gloves','14oz / 16oz · full foam or 3 mix horsehair blend.','custom-gloves'],['Sparring Gloves','14oz / 16oz · laces or velcro.','custom-gloves'],['Contest Gloves','8oz / 10oz / 12oz · foam or horsehair.','custom-gloves']]},
 headguard:{title:'HEADGUARD',sub:'Headguard range coming to the Mano a Mano store.',cards:[['Headguard','Product range placeholder — ready for your final product artwork.','contact']]},
 groin:{title:'GROIN GUARD',sub:'Groin guard range coming to the Mano a Mano store.',cards:[['Groin Guard','Product range placeholder — ready for your final product artwork.','contact']]},
 about:{title:'ABOUT MANO A MANO',sub:'A boxing brand built around custom equipment and fighter identity.',cards:[['Our Story','More brand information can be added here.','about']]},
 contact:{title:'CONTACT',sub:'Get in touch about custom designs, products or enquiries.',cards:[['Email','kieranmacmillan07@icloud.com','contact']]}
};
function showPage(key){if(key==='custom-gloves'){showCustomizer();return}const d=pageData[key]||pageData.home;$('sitePage').innerHTML=`<div class="page-hero"><span class="eyebrow">MANO A MANO BOXING</span><h1>${d.title}</h1><p>${d.sub}</p></div><div class="page-grid">${d.cards.map(c=>`<article class="page-card"><span class="kicker">MANO A MANO</span><h2>${c[0]}</h2><p>${c[1]}</p><button data-page="${c[2]}">${c[2]==='custom-gloves'?'DESIGN NOW':'VIEW SECTION'} <span>→</span></button></article>`).join('')}</div>`;$('customiser').hidden=true;$('sitePage').hidden=false;q('#sitePage [data-page]').forEach(b=>b.onclick=()=>showPage(b.dataset.page));}
function showCustomizer(){$('sitePage').hidden=true;$('customiser').hidden=false;window.scrollTo({top:0,behavior:'smooth'})}
function bindNav(){q('[data-nav]').forEach(a=>a.onclick=e=>{e.preventDefault();showPage(a.dataset.nav);$('sidebar').classList.remove('open')});}
q('#typeTabs button,#typeBtns button').forEach(b=>b.onclick=()=>setType(b.dataset.type));
$('switchBtn').onclick=()=>{state.activeGlove=state.activeGlove==='left'?'right':'left';renderLogo();renderTemplate()};
$('copyBtn').onclick=()=>{state.design.right=JSON.parse(JSON.stringify(state.design.left));showToast('Left glove design copied to right glove');if(state.activeGlove==='right')renderLogo();renderTemplate()};
$('customText').oninput=e=>{design().customText=e.target.value;renderTemplate()};$('textToggle').onclick=()=>$('customText').focus();$('menuBtn').onclick=()=>$('sidebar').classList.toggle('open');
$('sendBtn').onclick=()=>{const name=$('name').value.trim(),email=$('email').value.trim();if(!name||!email){showToast('Please enter your name and email');return}const payload={gloveType:state.type,size:state.size,padding:state.padding,closure:state.closure,leftGlove:state.design.left,rightGlove:state.design.right,extraDetails:$('details').value,name,email};const body=encodeURIComponent(JSON.stringify(payload,null,2));window.location.href=`mailto:kieranmacmillan07@icloud.com?subject=Mano%20a%20Mano%20Custom%20Glove%20Design&body=${body}`};
function showToast(t){const e=$('toast');e.textContent=t;e.classList.add('show');setTimeout(()=>e.classList.remove('show'),2200)}
renderOptions();renderAreas();renderLogo();renderTemplate();bindNav();showPage('home');

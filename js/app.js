const app=document.getElementById('app');
const sidebar=document.getElementById('sidebar');
document.getElementById('mobileMenu').onclick=()=>sidebar.classList.toggle('open');

const palette=[
['blue','#0057b8'],['tiffany blue','#81d8d0'],['teal blue','#008c95'],['sky blue','#66c7e8'],
['red','#d40000'],['ruby red','#9b111e'],['white','#f5f5f5'],['silver','#a7a7a7'],['black','#090909'],
['navy','#071a4d'],['orange','#f36a21'],['purple','#6f2da8'],['light purple','#b18bd1'],['dark grey','#3e3e3e'],
['light grey','#a9a9a9'],['deep blue','#003b8f'],['admiral blue','#1d3f8a'],['space blue','#243b64'],
['blue grey','#607d8b'],['dark maroon','#4a0f19'],['gold','#c9a227'],['yellow','#ffd400'],['neon yellow','#dfff00'],
['clover','#2e8b57'],['brown','#704214'],['green','#16833b'],['lime green','#32cd32'],['forest green','#0b5d1e'],
['wbc green','#00843d'],['olive green','#708238'],['pink','#ff69b4'],['hot pink','#ff1493'],['burgundy','#800020'],
['maroon','#800000'],['skin','#c98f72']
];
const products={training:'Custom Training Gloves',sparring:'Custom Sparring Gloves',contest:'Custom Contest Gloves',headgear:'Custom Headguard',groin:'Custom Groin Guard'};
const state={body:'#f5f5f5',logo:'#f5f5f5',wrist:true,logoRemoved:false};

function swatches(id,current){return `<div class="swatches">${palette.map(([n,c])=>`<button class="swatch ${current===c?'active':''}" style="background:${c}" data-role="${id}" data-value="${c}" title="${n}"><span>${n}</span></button>`).join('')}</div>`}
function shell(title,text,content){return `<section class="page"><div class="page-head"><div class="eyebrow">MANO A MANO BOXING</div><h1>${title}</h1><p>${text}</p></div>${content}</section>`}
function shop(type){const label=type==='contest'?'Contest Gloves':type==='headguard'?'Headguard':type==='groinguard'?'Groin Guard':`${type[0].toUpperCase()+type.slice(1)} Gloves`;return shell(label,'Product catalogue placeholder — prices, product photography and purchasing will be added here.',`<div class="product-grid"><article class="product-card"><div class="product-art">${label.toUpperCase()}</div><h3>MANO A MANO</h3><p>PRODUCT DETAILS TO BE ADDED</p></article></div>`) }

function gloveSvg(isContest){
 return `<svg class="glove-svg" viewBox="0 0 620 620" aria-label="Mano a Mano glove preview">
   <defs>
    <linearGradient id="gloveShade" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".42"/><stop offset=".42" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient>
    <filter id="soft"><feGaussianBlur stdDeviation="8"/></filter>
   </defs>
   <ellipse cx="305" cy="545" rx="175" ry="28" fill="#000" opacity=".45" filter="url(#soft)"/>
   <g id="gloveShape">
    <path id="gloveBody" d="M196 382 C167 339 151 280 159 226 C166 176 194 133 241 111 C277 94 321 91 358 107 C405 128 441 166 457 212 C468 244 470 284 460 318 C450 350 431 371 410 391 L405 473 C404 506 381 528 347 531 L230 531 C198 530 176 510 177 480 Z" fill="#f5f5f5" stroke="#222" stroke-width="6"/>
    <path id="gloveThumb" d="M181 356 C145 349 119 322 119 286 C119 253 140 227 170 220 C193 214 214 224 228 242 L242 279 C230 302 212 326 181 356 Z" fill="#f5f5f5" stroke="#222" stroke-width="6"/>
    <path d="M205 166 C232 132 272 113 312 113 C355 113 393 132 421 165" fill="none" stroke="#d2d2d2" stroke-width="8" stroke-linecap="round"/>
    <path d="M195 390 C244 416 340 424 410 389" fill="none" stroke="#d2d2d2" stroke-width="8"/>
    <path d="M191 452 L401 452" stroke="#333" stroke-width="4" opacity=".45"/>
    <path d="M190 468 L400 468" stroke="#333" stroke-width="2" opacity=".25"/>
    <path d="M190 485 L399 485" stroke="#333" stroke-width="2" opacity=".2"/>
    <path d="M191 382 C185 417 184 463 188 493" fill="none" stroke="#fff" stroke-width="22" opacity=".18"/>
    <path d="M196 382 C167 339 151 280 159 226 C166 176 194 133 241 111 C277 94 321 91 358 107 C405 128 441 166 457 212 C468 244 470 284 460 318 C450 350 431 371 410 391 L405 473 C404 506 381 528 347 531 L230 531 C198 530 176 510 177 480 Z" fill="url(#gloveShade)" pointer-events="none"/>
    <g id="contestLogo" ${isContest?'':'style="display:none"'}><circle cx="310" cy="270" r="70" fill="#111" opacity=".86"/><text x="310" y="256" text-anchor="middle" fill="#aaa" font-size="55" font-family="Arial" font-weight="900">M M</text><text x="310" y="289" text-anchor="middle" fill="#fff" font-size="13" font-family="Arial" font-weight="700" letter-spacing="2">MANO A MANO</text></g>
    <g id="trainingLogo" ${isContest?'style="display:none"':''}><text x="310" y="258" text-anchor="middle" fill="#f5f5f5" font-size="48" font-family="Arial" font-weight="900" id="logoText">M M</text><text x="310" y="286" text-anchor="middle" fill="#f5f5f5" font-size="14" font-family="Arial" font-weight="700" letter-spacing="2">MANO A MANO</text><text x="310" y="305" text-anchor="middle" fill="#f5f5f5" font-size="9" font-family="Arial" font-weight="700" letter-spacing="3">BOXING</text></g>
    <g id="wristPatch"><rect x="278" y="475" width="64" height="28" rx="5" fill="#111"/><text x="310" y="493" text-anchor="middle" fill="#fff" font-size="8" font-family="Arial" font-weight="700">MM · EST 2026</text></g>
   </g>
  </svg>`;
}

function customizer(type){
 const isContest=type==='contest'; const isGlove=['contest','training','sparring'].includes(type); const title=products[type];
 return `<section class="customizer"><div class="custom-head"><div><div class="eyebrow">CUSTOM / ${type.toUpperCase()}</div><h1>${title}</h1></div><p>Choose from Mano a Mano's fixed colour range. Drag the glove to rotate it. No zoom.</p></div>
 <div class="custom-layout"><div class="viewer"><div class="viewer-label">LIVE 3D-STYLE PREVIEW / WHITE BASE</div><div id="gloveStage" class="glove-stage">${isGlove?gloveSvg(isContest):'<div class="non-glove-preview">CUSTOM PRODUCT<br><span>PREVIEW</span></div>'}</div><div class="viewer-hint">DRAG TO ROTATE · 360° · NO ZOOM</div></div>
 <aside class="panel"><h2>Design</h2><div class="small">These are the only colours available from Mano a Mano.</div>
 <div class="control-group"><h3>${isGlove?'Glove Colour':'Base Colour'}</h3>${swatches('body',state.body)}</div>
 ${isGlove?`<div class="control-group"><h3>Logo</h3><div class="toggle-row"><label>${isContest?'Contest logo · 8 / 10 / 12oz':'Training / sparring logo · 14 / 16oz'}</label><select id="logoChoice"><option value="keep">Keep logo</option><option value="remove">Remove logo — +£10</option></select></div><div id="logoColorWrap"><div class="small">${isContest?'Only the two M shapes change colour. The MANO A MANO text stays fixed.':'The complete M–M logo and MANO A MANO writing change to the selected colour.'}</div>${swatches('logo',state.logo)}</div></div>
 <div class="control-group"><h3>Wrist Patch</h3><div class="toggle-row"><label>Fixed patch · cannot be recoloured</label><select id="wristChoice"><option value="keep">Keep patch</option><option value="remove">Remove patch — Free</option></select></div></div>
 <div class="control-group"><h3>Extra Details</h3><textarea class="text-control" id="details" rows="4" placeholder="Any extra details or requests..."></textarea></div>
 <div class="control-group"><h3>Your Details</h3><input class="text-control" id="customerName" placeholder="Name *"><input class="text-control" id="customerEmail" type="email" placeholder="Email *"><button class="btn submit" id="submitDesign">SUBMIT DESIGN</button><div class="status" id="status">Prototype: payment and automatic email delivery are not connected yet.</div></div>`:''}
 </aside></div></section>`;
}

function render(){
 const hash=location.hash.slice(1);
 if(!hash||hash==='home') app.innerHTML=`<section class="hero"><div><div class="eyebrow">MANO A MANO / BOXING EQUIPMENT</div><h1>BUILT<br><span>FOR THE</span>FIGHT</h1><p>Premium boxing equipment and a live custom design experience.</p><a class="btn" href="#custom/sparring">START CUSTOMISING</a></div></section>`;
 else if(hash.startsWith('shop/')) app.innerHTML=shop(hash.split('/')[1]);
 else if(hash.startsWith('custom/')){const type=hash.split('/')[1];app.innerHTML=customizer(products[type]?type:'sparring');if(['contest','training','sparring'].includes(type))initCustomizer(type)}
 else if(hash==='about') app.innerHTML=shell('About','Mano a Mano boxing equipment.',`<div class="info-grid"><div class="info-box"><h3>Custom Equipment</h3><p>Design your equipment using the fixed Mano a Mano colour range.</p></div><div class="info-box"><h3>Built For The Fight</h3><p>Product information and brand story will be added here.</p></div></div>`);
 else app.innerHTML=shell('Contact','Contact details will be added here.',`<div class="info-grid"><div class="info-box"><h3>Get In Touch</h3><p>Custom orders and enquiries will be handled here.</p></div></div>`);
 sidebar.classList.remove('open');window.scrollTo(0,0);
}

function initCustomizer(type){
 const stage=document.getElementById('gloveStage'); const svg=stage.querySelector('.glove-svg');
 let rotY=-12,rotX=0,drag=false,lastX=0,lastY=0;
 const applyRotation=()=>{svg.style.transform=`perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;}; applyRotation();
 stage.onpointerdown=e=>{drag=true;lastX=e.clientX;lastY=e.clientY;stage.setPointerCapture(e.pointerId)};
 stage.onpointermove=e=>{if(!drag)return;rotY+=(e.clientX-lastX)*.65;rotX-=(e.clientY-lastY)*.35;rotX=Math.max(-25,Math.min(25,rotX));lastX=e.clientX;lastY=e.clientY;applyRotation()};
 stage.onpointerup=()=>drag=false;stage.onpointercancel=()=>drag=false;
 function setBody(c){state.body=c;const b=svg.getElementById('gloveBody');const t=svg.getElementById('gloveThumb');b.setAttribute('fill',c);t.setAttribute('fill',c)}
 function setLogo(c){state.logo=c;if(type==='contest'){svg.querySelectorAll('#contestLogo text').forEach((el,i)=>{if(i<2)el.setAttribute('fill',c)})}else svg.querySelectorAll('#trainingLogo text').forEach(el=>el.setAttribute('fill',c))}
 function setVisibility(){const cl=svg.getElementById('contestLogo'),tl=svg.getElementById('trainingLogo'),wp=svg.getElementById('wristPatch');if(cl)cl.style.display=type==='contest'&&!state.logoRemoved?'':'none';if(tl)tl.style.display=(type==='training'||type==='sparring')&&!state.logoRemoved?'':'none';if(wp)wp.style.display=state.wrist?'':'none'}
 setBody(state.body);setLogo(state.logo);setVisibility();
 document.querySelectorAll('[data-role]').forEach(btn=>btn.onclick=()=>{const role=btn.dataset.role,val=btn.dataset.value;if(role==='body')setBody(val);if(role==='logo')setLogo(val);document.querySelectorAll(`[data-role="${role}"]`).forEach(x=>x.classList.toggle('active',x===btn))});
 document.getElementById('logoChoice').onchange=e=>{state.logoRemoved=e.target.value==='remove';setVisibility()};document.getElementById('wristChoice').onchange=e=>{state.wrist=e.target.value==='keep';setVisibility()};
 document.getElementById('submitDesign').onclick=()=>{const name=document.getElementById('customerName').value.trim(),email=document.getElementById('customerEmail').value.trim();document.getElementById('status').textContent=name&&email?'Design captured. Payment and automatic email delivery will be connected in the production build.':'Name and email are required.'};
}
window.addEventListener('hashchange',render);render();

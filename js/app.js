const COLORS=[['blue','#1265ff'],['tiffany blue','#0abab5'],['teal blue','#078a8a'],['sky blue','#56b8ff'],['red','#e3262e'],['ruby red','#9b111e'],['white','#f4f4f2'],['silver','#b9bec5'],['black','#050505'],['navy','#081b4b'],['orange','#f47a1f'],['purple','#7b3fc6'],['light purple','#b78cff'],['dark grey','#444'],['light grey','#b8b8b8'],['deep blue','#123c9e'],['admiral blue','#2d5f9a'],['space blue','#183b57'],['blue grey','#6f8192'],['dark maroon','#4a1019'],['gold','#c6a15b'],['yellow','#f4d30b'],['neon yellow','#dfff00'],['clover','#168a45'],['brown','#6b4026'],['green','#21a34a'],['lime green','#8dcc19'],['forest green','#164b2a'],['wbc green','#009b77'],['olive green','#687230'],['pink','#f08bb5'],['hot pink','#ff2b88'],['burgundy','#6f1232'],['maroon','#751b25'],['skin','#d7a07b']];
const AREAS=['Palm Back','Wrist Back','Thumb Up','Thumb Middle','Thumb Down','Thumb In','Thumb Strip','Thumb Attachment','Palm In','Palm Out','Piping','Stitches','Laces'];
const img={contest:'assets/contest.jpg',laces:'assets/laces.jpg',velcro:'assets/velcro.jpg'};
const blank=()=>({colors:{},logoColor:'#050505',dangerColor:'#050505',mainLogo:true,wristPatch:true,customText:''});
const state={type:'contest',size:'8oz',padding:'foam',closure:'laces',activeGlove:'left',design:{left:blank(),right:blank()},area:'Palm Back'};
const $=id=>document.getElementById(id); const q=s=>document.querySelectorAll(s);
function design(){return state.design[state.activeGlove]}
function mode(){return state.type==='contest'?'contest':state.closure}
function setType(type){state.type=type;state.size=type==='contest'?'8oz':'14oz';state.padding='foam';state.closure=type==='contest'?'laces':'laces';state.area='Palm Back';q('#typeTabs button,#typeBtns button').forEach(b=>b.classList.toggle('active',b.dataset.type===type));$('switchBtn').textContent='Switch to right glove';renderOptions();renderAreas();renderLogo();renderTemplate();}
function renderOptions(){let h='';if(state.type==='contest'){h+=block('Padding type',`<div class="seg two"><button data-pad="foam" class="${state.padding==='foam'?'active':''}">Foam</button><button data-pad="horsehair" class="${state.padding==='horsehair'?'active':''}">Horsehair</button></div>`);h+=block('Weight',`<div class="seg three"><button data-size="8oz" class="${state.size==='8oz'?'active':''}">8oz</button><button data-size="10oz" class="${state.size==='10oz'?'active':''}">10oz</button><button data-size="12oz" class="${state.size==='12oz'?'active':''}">12oz</button></div>`)}else{h+=block('Padding type',`<div class="seg two"><button data-pad="foam" class="${state.padding==='foam'?'active':''}">Full foam</button><button data-pad="blend" class="${state.padding==='blend'?'active':''}">3 mix horsehair blend</button></div>`);h+=block('Closure',`<div class="seg two"><button data-closure="laces" class="${state.closure==='laces'?'active':''}">Laces</button><button data-closure="velcro" class="${state.closure==='velcro'?'active':''}">Velcro</button></div>`);h+=block('Weight',`<div class="seg two"><button data-size="14oz" class="${state.size==='14oz'?'active':''}">14oz</button><button data-size="16oz" class="${state.size==='16oz'?'active':''}">16oz</button></div>`)}$('options').innerHTML=h;q('#options [data-pad]').forEach(b=>b.onclick=()=>{state.padding=b.dataset.pad;renderOptions()});q('#options [data-size]').forEach(b=>b.onclick=()=>{state.size=b.dataset.size;renderOptions()});q('#options [data-closure]').forEach(b=>b.onclick=()=>{state.closure=b.dataset.closure;state.area='Palm Back';renderOptions();renderLogo();renderAreas();renderTemplate()});}
function block(title,inner){return `<div class="option-title">${title}</div>${inner}`}
function renderAreas(){const available=(state.type!=='contest'&&state.closure==='velcro')?AREAS.map(a=>a==='Laces'?'Velcro':a):AREAS; $('areas').innerHTML=available.map(a=>`<button class="area-btn ${state.area===a?'active':''}" data-area="${a}">${a}</button>`).join('');q('.area-btn').forEach(b=>b.onclick=()=>{state.area=b.dataset.area;$('areaTitle').textContent=state.area;$('paletteTitle').textContent=state.area;openPalette();renderAreas()});$('areaTitle').textContent=state.area}
function openPalette(){const fixed=state.area==='Stitches'||state.area==='Laces'||state.area==='Velcro';$('palette').innerHTML=COLORS.map(([n,c])=>`<button class="swatch ${(design().colors[state.area]||'#f4f4f2')===c?'selected':''}" data-color="${c}" ${fixed?'disabled':''} style="background:${c}"><span>${n}</span></button>`).join('');$('paletteCard').classList.add('open');q('.swatch').forEach(b=>b.onclick=()=>{design().colors[state.area]=b.dataset.color;renderTemplate();openPalette()})}
$('closePalette').onclick=()=>$('paletteCard').classList.remove('open');
function renderLogo(){const d=design();const velcro=state.type!=='contest'&&state.closure==='velcro';const removal=!velcro;$('logoOptions').innerHTML=`<div class="logo-row"><div><b>Main glove logo</b><small>${removal?'Remove for +£10':'Mandatory on velcro gloves — cannot be removed'}</small></div><button id="mainToggle" class="toggle ${d.mainLogo?'on':''}" ${removal?'':'disabled'}></button></div><div class="logo-row"><div><b>Logo colour</b><small>Logo remains above the selected leather colour.</small><div class="logo-palette" id="logoPalette"></div></div></div>${velcro?`<div class="logo-row"><div><b>Dangerous Adversary logo</b><small>Colour can change — cannot be removed.</small><div class="logo-palette" id="dangerPalette"></div></div></div>`:''}<div class="logo-row"><div><b>Wrist patch</b><small>${velcro?'Fixed on velcro — cannot be removed':'Can be removed free of charge'}</small></div><button id="wristToggle" class="toggle ${d.wristPatch?'on':''}" ${velcro?'disabled':''}></button></div>`;
function mini(id,key){$(id).innerHTML=COLORS.map(([n,c])=>`<button class="mini-swatch ${d[key]===c?'active':''}" title="${n}" style="background:${c}" data-c="${c}"></button>`).join('');q('#'+id+' .mini-swatch').forEach(b=>b.onclick=()=>{d[key]=b.dataset.c;renderLogo();renderTemplate()})}mini('logoPalette','logoColor');if(velcro)mini('dangerPalette','dangerColor');$('mainToggle')?.addEventListener('click',()=>{d.mainLogo=!d.mainLogo;renderLogo();updatePrice();renderTemplate()});$('wristToggle')?.addEventListener('click',()=>{if(!velcro){d.wristPatch=!d.wristPatch;renderLogo();renderTemplate()}});}
function updatePrice(){const d=design();const fee=!d.mainLogo; $('price').textContent='£'+(125+(fee?10:0));$('fee').classList.toggle('hidden',!fee)}
// Exact template-aligned panel paths. Coordinates are in the source image viewBox, not guessed rectangles.
// The clean artwork itself remains the visual source of truth; these paths sit above it only to apply colour.
const TEMPLATE={
  contest:{src:'assets/contest.jpg',w:1536,h:1024,mode:'contest'},
  laces:{src:'assets/laces.jpg',w:1536,h:1024,mode:'laces'},
  velcro:{src:'assets/velcro.jpg',w:1290,h:845,mode:'velcro'}
};
const PATHS={
  laces:{
    'Palm Back':[
      'M166 31 C190 14 240 5 305 4 C430 2 548 14 616 46 C648 62 663 88 660 125 C656 176 632 223 595 258 C562 288 521 302 468 307 C379 315 281 309 221 296 C188 289 169 271 163 238 C158 206 157 167 156 128 C154 86 157 51 166 31 Z',
      'M838 34 C889 15 967 7 1044 7 C1134 6 1225 15 1282 37 C1304 46 1319 61 1323 82 C1330 118 1330 166 1330 215 C1330 331 1321 445 1307 548 C1299 604 1290 616 1276 620 C1177 633 1011 633 902 620 C891 618 884 609 881 594 C858 484 837 370 827 268 C818 188 812 116 819 82 C823 60 829 44 838 34 Z'
    ],
    'Wrist Back':[
      'M882 622 C980 636 1179 636 1279 622 L1280 902 C1170 927 1001 928 889 902 Z',
      'M211 623 C301 638 512 638 602 623 L602 904 C500 925 305 925 213 904 Z'
    ],
    'Palm In':[
      'M302 929 L302 481 C302 444 323 420 358 416 L407 416 C442 420 460 444 460 481 L460 929 C417 934 349 934 302 929 Z'
    ],
    'Palm Out':[
      'M461 929 L461 481 C461 444 482 420 517 416 L562 416 C590 423 606 448 607 486 L607 920 C565 929 511 933 461 929 Z',
      'M95 904 C105 853 109 774 118 700 C127 626 142 550 159 486 C174 429 202 388 248 375 C279 366 319 370 350 383 C385 397 418 415 449 430 L462 444 L462 486 C425 466 385 451 349 447 C316 443 287 455 267 484 C240 523 228 579 220 632 C209 704 201 809 198 907 Z'
    ],
    'Thumb Attachment':[
      'M533 291 C566 270 595 242 614 212 C626 193 637 175 651 166 C665 157 679 162 692 177 C706 194 714 222 713 253 C711 300 697 352 682 403 C668 452 650 503 629 552 C617 579 604 605 584 626 C570 641 555 647 542 646 C553 604 560 558 560 507 C559 457 554 409 548 367 C542 331 536 309 533 291 Z'
    ],
    'Thumb Strip':[
      'M649 166 C660 151 675 151 689 166 C703 182 713 211 713 246 C712 299 698 352 682 405 C667 455 649 503 629 552 C617 579 605 604 584 626 C578 631 572 635 566 638 C581 591 591 545 596 497 C603 432 600 373 593 316 C588 272 589 233 600 204 C611 185 628 174 649 166 Z'
    ],
    'Thumb Up':[
      'M649 166 C660 151 675 151 689 166 C703 182 713 211 713 246 C712 278 706 309 698 338 C685 331 672 318 663 301 C652 280 647 253 647 226 C647 202 648 181 649 166 Z'
    ],
    'Thumb Middle':[
      'M698 338 C687 378 674 420 661 458 C650 493 637 529 625 557 C614 579 604 600 584 626 C577 632 570 636 563 639 C575 597 585 551 590 507 C597 451 596 395 590 343 C607 341 621 343 634 349 C657 359 677 358 698 338 Z'
    ],
    'Thumb Down':[
      'M563 639 C572 614 581 590 589 566 C598 537 605 509 611 480 C621 434 627 392 625 351 C638 353 649 359 660 369 C672 380 681 392 688 405 C674 456 649 523 625 566 C612 589 603 611 584 626 C576 633 569 637 563 639 Z'
    ],
    'Thumb In':[
      'M533 291 C548 279 560 267 572 253 C586 236 596 217 603 200 C591 232 588 270 593 316 C599 371 602 430 596 488 C591 539 582 590 566 638 C555 643 548 646 542 646 C551 601 559 553 559 505 C558 457 553 407 547 367 C541 332 536 309 533 291 Z'
    ],
    'Piping':[],
    'Stitches':[],
    'Laces':[]
  },
  contest:{},
  velcro:{
    'Palm Back':[
      'M140 30 C183 13 240 5 316 4 C409 3 501 12 557 34 C576 42 589 56 594 75 C600 103 599 146 600 192 C601 292 596 392 585 487 C579 533 575 548 564 553 C486 565 353 566 272 554 C260 552 255 542 251 526 C234 439 220 349 212 268 C204 192 200 119 204 83 C207 59 216 43 232 35 C250 26 270 19 291 15 C232 19 179 24 140 30 Z',
      'M720 31 C767 14 831 6 900 5 C991 4 1084 14 1142 37 C1164 46 1178 62 1183 85 C1190 118 1190 167 1190 214 C1190 315 1183 419 1170 515 C1164 553 1158 565 1145 568 C1055 580 911 580 824 567 C813 565 807 556 804 541 C786 451 770 358 762 273 C754 194 750 120 755 82 C758 60 767 44 783 36 C802 26 821 19 843 15 C794 18 751 23 720 31 Z'
    ],
    'Wrist Back':[
      'M253 559 C337 571 485 571 565 559 L565 575 C480 586 337 586 253 574 Z',
      'M804 572 C892 584 1058 584 1147 572 L1147 588 C1057 600 893 600 805 588 Z',
      'M253 744 C337 757 487 757 566 744 L566 760 C485 774 336 774 253 760 Z',
      'M805 749 C893 762 1058 762 1147 749 L1147 765 C1058 778 893 778 805 765 Z'
    ],
    'Velcro':[
      'M165 576 C264 588 449 588 545 576 L545 742 C451 754 264 754 165 741 Z',
      'M716 589 C812 601 1059 601 1148 588 L1148 747 C1057 760 813 760 717 747 Z'
    ],
    'Palm In':[
      'M263 554 L263 321 C263 292 281 273 312 268 L363 268 C394 273 411 292 411 322 L411 555 Z'
    ],
    'Palm Out':[
      'M412 555 L412 322 C412 293 431 273 460 268 L507 268 C536 276 552 296 555 328 L555 549 C512 558 458 562 412 555 Z'
    ],
    'Thumb Attachment':[
      'M506 197 C534 181 560 164 579 147 C593 134 605 138 616 151 C629 167 637 191 637 219 C636 259 625 299 613 340 C601 382 588 425 572 466 C560 496 547 521 530 535 C518 545 506 550 495 550 C505 507 512 463 513 414 C514 359 510 301 505 254 C501 226 501 208 506 197 Z'
    ],
    'Thumb Strip':[
      'M579 147 C593 134 605 138 616 151 C629 167 637 191 637 219 C636 259 625 299 613 340 C601 382 588 425 572 466 C560 496 547 521 530 535 C525 539 520 542 515 544 C529 500 539 455 544 406 C550 350 550 294 544 246 C540 209 548 175 579 147 Z'
    ],
    'Thumb Up':[
      'M579 147 C593 134 605 138 616 151 C629 167 637 191 637 219 C637 241 633 262 627 282 C612 278 598 269 589 256 C579 242 574 224 574 204 C574 180 576 160 579 147 Z'
    ],
    'Thumb Middle':[
      'M627 282 C620 310 612 338 604 365 C596 393 586 423 575 452 C564 481 551 510 530 535 C523 541 517 544 511 546 C521 509 530 470 534 431 C540 378 539 324 534 276 C547 276 559 281 571 289 C590 302 609 299 627 282 Z'
    ],
    'Thumb Down':[
      'M511 546 C518 519 527 492 536 463 C546 430 553 398 558 365 C565 324 568 286 565 254 C579 257 590 264 601 274 C612 284 620 297 627 312 C616 355 601 401 586 440 C572 477 556 511 530 535 C523 541 517 544 511 546 Z'
    ],
    'Thumb In':[
      'M506 197 C518 188 530 177 541 165 C552 152 562 139 570 127 C558 157 550 193 554 246 C560 299 561 355 555 410 C550 458 540 505 515 544 C507 548 500 550 495 550 C504 505 511 461 512 413 C513 360 509 302 504 254 C500 226 501 208 506 197 Z'
    ],
    'Piping':[],
    'Stitches':[],
    'Velcro':[]
  }
};
PATHS.contest=PATHS.laces;

function svgForTemplate(templateMode,d){
  const t=TEMPLATE[templateMode];
  const paths=PATHS[templateMode];
  const names=Object.keys(paths);
  let out=`<svg class="panel-svg" viewBox="0 0 ${t.w} ${t.h}" preserveAspectRatio="none" aria-hidden="true">`;
  for(const name of names){
    const color=d.colors[name]||'#f4f4f2';
    for(const path of (paths[name]||[])) out+=`<path d="${path}" fill="${color}" fill-opacity=".96" data-panel="${name}"/>`;
  }
  // Piping is drawn from the actual template seam locations instead of generic bars.
  const piping=t.mode==='velcro' ? [
    'M253 560 L565 560','M804 573 L1147 573','M253 748 C335 762 489 762 566 748','M805 752 C892 765 1060 765 1147 752'
  ] : [
    'M163 299 C260 318 418 320 594 294','M882 622 C980 636 1179 636 1279 622','M211 904 C301 925 500 925 602 904','M889 902 C1001 928 1170 927 1280 902'
  ];
  const pc=d.colors.Piping||'#f4f4f2';
  for(const p of piping) out+=`<path d="${p}" fill="none" stroke="${pc}" stroke-width="7" stroke-linecap="round" opacity=".95"/>`;
  out+='</svg>';return out;
}
function renderTemplate(){
  const d=design();const m=mode();const t=TEMPLATE[m];
  $('templateImg').src=t.src;
  $('templateTag').textContent=(state.type==='contest'?'CONTEST':state.type.toUpperCase())+' · '+(m==='velcro'?'VELCRO':'LACES');
  $('gloveLabel').textContent=(state.activeGlove==='left'?'LEFT':'RIGHT')+' GLOVE';
  $('colorLayer').innerHTML=svgForTemplate(m,d);
  $('lineLayer').innerHTML='';
  let logos='';
  // Keep the existing logo placements/layout; only the colour masks underneath are changed.
  if(d.mainLogo){
    if(state.type==='contest') logos+=`<div class="logo-tint" style="left:67%;top:20%;width:18%;height:33%;background:${d.logoColor};opacity:.7"></div>`;
    else logos+=`<div class="logo-tint" style="left:61%;top:19%;width:27%;height:25%;background:${d.logoColor};opacity:.82"></div>`;
  }
  if(state.type==='contest'&&d.wristPatch)logos+=`<div class="logo-tint" style="left:60%;top:66%;width:25%;height:21%;background:#050505;opacity:.25"></div>`;
  if(state.type!=='contest'&&m==='velcro')logos+=`<div class="logo-tint" style="left:13%;top:66%;width:29%;height:20%;background:${d.dangerColor};opacity:.5"></div>`;
  if(d.customText)logos+=`<div class="text-decal" style="left:75%;top:55%;color:${d.logoColor}">${escapeHtml(d.customText)}</div>`;
  $('logoLayer').innerHTML=logos;updatePrice();
}
function escapeHtml(s){return s.replace(/[&<>'"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[m]))}
q('#typeTabs button,#typeBtns button').forEach(b=>b.onclick=()=>setType(b.dataset.type));$('switchBtn').onclick=()=>{state.activeGlove=state.activeGlove==='left'?'right':'left';$('switchBtn').textContent=state.activeGlove==='left'?'Switch to right glove':'Switch to left glove';renderLogo();renderTemplate()};$('copyBtn').onclick=()=>{state.design.right=JSON.parse(JSON.stringify(state.design.left));showToast('Left glove design copied to right glove');if(state.activeGlove==='right')renderLogo();renderTemplate()};$('customText').oninput=e=>{design().customText=e.target.value;renderTemplate()};$('textToggle').onclick=()=>{$('customText').focus()};$('menuBtn').onclick=()=>$('sidebar').classList.toggle('open');$('sendBtn').onclick=()=>{const name=$('name').value.trim(),email=$('email').value.trim();if(!name||!email){showToast('Please enter your name and email');return}const payload={gloveType:state.type,size:state.size,padding:state.padding,closure:state.closure,leftGlove:state.design.left,rightGlove:state.design.right,extraDetails:$('details').value,name,email};const body=encodeURIComponent(JSON.stringify(payload,null,2));window.location.href=`mailto:kieranmacmillan07@icloud.com?subject=Mano%20a%20Mano%20Custom%20Glove%20Design&body=${body}`};function showToast(t){const e=$('toast');e.textContent=t;e.classList.add('show');setTimeout(()=>e.classList.remove('show'),2200)}
$('switchBtn').textContent='Switch to right glove';renderOptions();renderAreas();renderLogo();renderTemplate();

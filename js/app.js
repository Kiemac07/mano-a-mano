import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

const app=document.getElementById("app");
const sidebar=document.getElementById("sidebar");
document.getElementById("mobileMenu").onclick=()=>sidebar.classList.toggle("open");

const palette=[
["blue","#0057b8"],["tiffany blue","#81d8d0"],["teal blue","#008c95"],["sky blue","#66c7e8"],
["red","#d40000"],["ruby red","#9b111e"],["white","#f5f5f5"],["silver","#a7a7a7"],["black","#090909"],
["navy","#071a4d"],["orange","#f36a21"],["purple","#6f2da8"],["light purple","#b18bd1"],["dark grey","#3e3e3e"],
["light grey","#a9a9a9"],["deep blue","#003b8f"],["admiral blue","#1d3f8a"],["space blue","#243b64"],
["blue grey","#607d8b"],["dark maroon","#4a0f19"],["gold","#c9a227"],["yellow","#ffd400"],["neon yellow","#dfff00"],
["clover","#2e8b57"],["brown","#704214"],["green","#16833b"],["lime green","#32cd32"],["forest green","#0b5d1e"],
["WBC green","#00843d"],["olive green","#708238"],["pink","#ff69b4"],["hot pink","#ff1493"],["burgundy","#800020"],
["maroon","#800000"],["skin","#c98f72"]
];

const products={
 training:"Custom Training Gloves",sparring:"Custom Sparring Gloves",contest:"Custom Contest Gloves",
 headgear:"Custom Headguard",groin:"Custom Groin Guard"
};

const state={
 body:"#f5f5f5",logo:"#f5f5f5",wrist:true,logo:true,logoRemoved:false
};

function swatches(id, current){
 return `<div class="swatches">${palette.map(([n,c])=>`<button class="swatch ${current===c?"active":""}" style="background:${c}" data-role="${id}" data-value="${c}" title="${n}"><span>${n}</span></button>`).join("")}</div>`;
}
function shell(title,text,content){return `<section class="page"><div class="page-head"><div class="eyebrow">MANO A MANO BOXING</div><h1>${title}</h1><p>${text}</p></div>${content}</section>`}
function shop(type){return shell(type==="contest"?"Contest Gloves":type==="headguard"?"Headguard":type==="groinguard"?"Groin Guard":`${type[0].toUpperCase()+type.slice(1)} Gloves`,"Product catalogue placeholder — prices, product photography and purchasing will be added here.",`<div class="product-grid"><article class="product-card"><div class="product-art">${(type||"PRODUCT").toUpperCase()}</div><h3>MANO A MANO</h3><p>PRODUCT DETAILS TO BE ADDED</p></article></div>`)}

function customizer(type){
 const isContest=type==="contest";
 const isGlove=["contest","training","sparring"].includes(type);
 const title=products[type];
 return `<section class="customizer">
 <div class="custom-head"><div><div class="eyebrow">CUSTOM / ${type.toUpperCase()}</div><h1>${title}</h1></div>
 <p>Choose from Mano a Mano's fixed colour range. Drag the glove to rotate it. No zoom.</p></div>
 <div class="custom-layout">
  <div class="viewer"><div class="viewer-label">LIVE 3D PREVIEW / WHITE BASE</div><canvas id="gloveCanvas"></canvas><div class="viewer-hint">DRAG TO ROTATE · 360° · NO ZOOM</div></div>
  <aside class="panel"><h2>Design</h2><div class="small">These are the only colours available from Mano a Mano.</div>
   ${isGlove?`<div class="control-group"><h3>Glove Colour</h3>${swatches("body",state.body)}</div>`:"<div class=\"control-group\"><h3>Base Colour</h3>${swatches("body",state.body)}</div>"}
   ${isGlove?`<div class="control-group"><h3>Logo</h3>
     <div class="toggle-row"><label>${isContest?"Contest logo · 8 / 10 / 12oz":"Training / sparring logo · 14 / 16oz"}</label><select id="logoChoice"><option value="keep">Keep logo</option><option value="remove">Remove logo — +£10</option></select></div>
     <div id="logoColorWrap"><div class="small">${isContest?"Only the two grey M shapes change colour. The MANO A MANO text stays fixed.":"The complete M–M logo and MANO A MANO writing change to the selected colour."}</div>${swatches("logo",state.logo)}</div>
   </div>
   <div class="control-group"><h3>Wrist Patch</h3>
     <div class="toggle-row"><label>Fixed patch · cannot be recoloured</label><select id="wristChoice"><option value="keep">Keep patch</option><option value="remove">Remove patch — Free</option></select></div>
   </div>`:""}
   ${isGlove?`<div class="control-group"><h3>Extra Details</h3><textarea class="text-control" id="details" rows="4" placeholder="Any extra details or requests..."></textarea></div>
   <div class="control-group"><h3>Your Details</h3><input class="text-control" id="customerName" placeholder="Name *"><input class="text-control" id="customerEmail" type="email" placeholder="Email *"><button class="btn submit" id="submitDesign">SUBMIT DESIGN</button><div class="status" id="status">Prototype: payment and automatic email delivery are not connected yet.</div></div>`:""}
  </aside>
 </div></section>`;
}

function render(){
 const hash=location.hash.slice(1);
 if(!hash||hash==="home"){
   app.innerHTML=`<section class="hero"><div><div class="eyebrow">MANO A MANO / BOXING EQUIPMENT</div><h1>BUILT<br><span>FOR THE</span>FIGHT</h1><p>Premium boxing equipment and a live custom design experience.</p><a class="btn" href="#custom/sparring">START CUSTOMISING</a></div></section>`;
 }else if(hash.startsWith("shop/")) app.innerHTML=shop(hash.split("/")[1]);
 else if(hash.startsWith("custom/")){const type=hash.split("/")[1];app.innerHTML=customizer(products[type]?type:"sparring");if(["contest","training","sparring"].includes(type))initGlove(type);}
 else if(hash==="about") app.innerHTML=shell("About","Mano a Mano boxing equipment.",`<div class="info-grid"><div class="info-box"><h3>Custom Equipment</h3><p>Design your equipment using the fixed Mano a Mano colour range.</p></div><div class="info-box"><h3>Built For The Fight</h3><p>Product information and brand story will be added here.</p></div></div>`);
 else app.innerHTML=shell("Contact","Contact details will be added here.",`<div class="info-grid"><div class="info-box"><h3>Get In Touch</h3><p>Custom orders and enquiries will be handled here.</p></div></div>`);
 sidebar.classList.remove("open");window.scrollTo(0,0);
}

function initGlove(type){
 const canvas=document.getElementById("gloveCanvas");
 const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});
 renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setSize(canvas.clientWidth,canvas.clientHeight,false);renderer.outputColorSpace=THREE.SRGBColorSpace;
 const scene=new THREE.Scene(), camera=new THREE.PerspectiveCamera(30,canvas.clientWidth/canvas.clientHeight,.1,100);camera.position.set(0,.15,6.7);
 scene.add(new THREE.AmbientLight(0xffffff,2.4));const key=new THREE.DirectionalLight(0xffffff,4);key.position.set(3,5,5);scene.add(key);const rim=new THREE.DirectionalLight(0xffffff,2);rim.position.set(-4,2,-3);scene.add(rim);
 const glove=new THREE.Group();glove.rotation.y=-.35;scene.add(glove);

 const mats={};
 const M=(id,color="#f5f5f5",rough=.55)=>mats[id]=new THREE.MeshStandardMaterial({color,roughness:rough,metalness:.02});
 // Procedural approximation of the supplied silhouette: long cuff, tall rear, large padded fist, curved thumb.
 const body=new THREE.Mesh(new THREE.SphereGeometry(1.25,64,40),M("body"));body.scale.set(1.02,1.38,.78);body.position.set(0,.72,0);glove.add(body);
 const top=new THREE.Mesh(new THREE.SphereGeometry(.88,56,32),M("body"));top.scale.set(1.22,.55,.92);top.position.set(.05,1.72,.05);glove.add(top);
 const cuff=new THREE.Mesh(new THREE.CapsuleGeometry(.78,.9,12,32),M("body"));cuff.scale.set(1.02,1.05,.82);cuff.position.set(.02,-1.03,0);glove.add(cuff);
 const thumb=new THREE.Mesh(new THREE.CapsuleGeometry(.34,1.05,12,28),M("body"));thumb.rotation.z=-1.05;thumb.rotation.x=-.12;thumb.scale.set(1.0,1.05,.9);thumb.position.set(-.92,.65,.28);glove.add(thumb);
 const side=new THREE.Mesh(new THREE.SphereGeometry(.58,40,24),M("body"));side.scale.set(.55,1.2,.72);side.position.set(.86,.65,.18);glove.add(side);
 const seam=new THREE.Mesh(new THREE.TorusGeometry(.83,.018,8,64),M("seam","#d8d8d8",.8));seam.scale.set(1,1.3,1);seam.rotation.x=Math.PI/2;seam.position.y=-.45;glove.add(seam);

 // Logo planes are placed on the glove's visible outer face as a prototype.
 const loader=new THREE.TextureLoader();
 function planeTexture(path,tint="#ffffff"){
   const tx=loader.load(path); tx.colorSpace=THREE.SRGBColorSpace;
   const material=new THREE.MeshBasicMaterial({map:tx,transparent:true});
   return material;
 }
 const contestLogo=new THREE.Mesh(new THREE.PlaneGeometry(1.25,.56),planeTexture("assets/contest-logo-full.png","#fff"));
 contestLogo.position.set(.0,.78,.79);contestLogo.rotation.y=0;glove.add(contestLogo);
 const trainingLogo=new THREE.Mesh(new THREE.PlaneGeometry(1.3,.62),planeTexture("assets/training-logo-mask.png","#fff"));
 trainingLogo.position.set(.0,.78,.79);glove.add(trainingLogo);
 const wristPatch=new THREE.Mesh(new THREE.PlaneGeometry(.72,.38),planeTexture("assets/wrist-patch.png","#fff"));
 wristPatch.position.set(.02,-1.03,.69);glove.add(wristPatch);

 function setBody(c){state.body=c;mats.body.color.set(c);mats.seam.color.set("#d6d6d6")}
 function setLogo(c){
   state.logo=c;
   // For this prototype the supplied logo is represented as a tintable mesh.
   const mesh=type==="contest"?contestLogo:trainingLogo;
   mesh.material.color.set(c);
   if(type==="contest"){
     // The contest source contains white text + grey M. Full selective masking is
     // represented by the logo-color control in the UI; final GLB will use separate decals.
     mesh.material.opacity=1;
   }
 }
 function setVisibility(){
   contestLogo.visible=type==="contest"&&!state.logoRemoved;
   trainingLogo.visible=(type==="training"||type==="sparring")&&!state.logoRemoved;
   wristPatch.visible=state.wrist;
 }
 setBody(state.body);setLogo(state.logo);setVisibility();

 document.querySelectorAll("[data-role]").forEach(btn=>{
   btn.onclick=()=>{const role=btn.dataset.role,val=btn.dataset.value;
     if(role==="body")setBody(val); if(role==="logo")setLogo(val);
     document.querySelectorAll(`[data-role="${role}"]`).forEach(x=>x.classList.toggle("active",x===btn));
   };
 });
 const logoChoice=document.getElementById("logoChoice"),wrap=document.getElementById("logoColorWrap");
 logoChoice.onchange=()=>{state.logoRemoved=logoChoice.value==="remove";setVisibility();};
 document.getElementById("wristChoice").onchange=e=>{state.wrist=e.target.value==="keep";setVisibility()};
 document.getElementById("submitDesign").onclick=()=>{
   const name=document.getElementById("customerName").value.trim(),email=document.getElementById("customerEmail").value.trim();
   document.getElementById("status").textContent=name&&email?"Prototype captured. Stripe checkout + automatic design email will be connected in the production build.":"Name and email are required.";
 };

 let drag=false,lastX=0,lastY=0;
 canvas.onpointerdown=e=>{drag=true;lastX=e.clientX;lastY=e.clientY;canvas.setPointerCapture(e.pointerId)};
 canvas.onpointermove=e=>{if(!drag)return;glove.rotation.y+=(e.clientX-lastX)*.011;glove.rotation.x+=(e.clientY-lastY)*.007;glove.rotation.x=Math.max(-.6,Math.min(.6,glove.rotation.x));lastX=e.clientX;lastY=e.clientY};
 canvas.onpointerup=()=>drag=false;canvas.onpointercancel=()=>drag=false;

 function resize(){const w=canvas.clientWidth,h=canvas.clientHeight;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h,false)}
 window.addEventListener("resize",resize);
 function loop(){requestAnimationFrame(loop);renderer.render(scene,camera)}loop();
}
window.addEventListener("hashchange",render);render();

const app = document.getElementById("app");
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.querySelector(".sidebar");

menuToggle.addEventListener("click", () => sidebar.classList.toggle("open"));

const gloveTypes = {
  sparring: "Custom Sparring Gloves",
  training: "Custom Training Gloves",
  contest: "Custom Contest Gloves",
  headgear: "Custom Headgear",
  groin: "Custom Groin Guard"
};

const colorSections = [
  ["outer-thumb", "Outer Thumb"],
  ["inner-thumb", "Inner Thumb"],
  ["outer-palm", "Outer Palm"],
  ["inner-palm", "Inner Palm"],
  ["back", "Back of Glove"],
  ["wrist", "Wrist"],
  ["cuff", "Cuff"],
  ["stitching", "Stitching"]
];

const state = {
  type: "sparring",
  colors: Object.fromEntries(colorSections.map(([id]) => [id, "#111111"])),
  text: "",
  details: "",
  name: "",
  email: "",
  rx: -8,
  ry: -8
};

function layoutShell(title, subtitle, content) {
  return `
    <section class="page">
      <div class="page-head">
        <div class="eyebrow">MANO A MANO BOXING</div>
        <h1>${title}</h1>
        <p>${subtitle}</p>
      </div>
      ${content}
    </section>`;
}

function shopPage(kind) {
  const title = kind === "gloves" ? "Gloves" : kind === "headguard" ? "Headguard" : "Groin Guard";
  const products = kind === "gloves"
    ? ["Training Gloves","Sparring Gloves","Contest Gloves"]
    : [title];
  return layoutShell(title, "Premium boxing equipment built around performance, protection and clean design.", `
    <div class="product-grid">
      ${products.map((p,i)=>`
        <article class="product-card">
          <div class="product-art">${kind === "gloves" ? "GLOVE" : kind === "headguard" ? "HEADGUARD" : "GROIN GUARD"}</div>
          <div><h3>${p}</h3><p>PRODUCT PREVIEW — DETAILS TO BE ADDED</p></div>
        </article>`).join("")}
    </div>`);
}

function customizer(type="sparring") {
  state.type = type;
  const title = gloveTypes[type];
  const isGlove = ["sparring","training","contest"].includes(type);
  const sections = isGlove ? colorSections : [
    ["shell","Outer Shell"],["inner","Inner Padding"],["side","Side Panels"],["strap","Straps"],["cuff","Cuff"],["stitching","Stitching"]
  ];
  return `
  <section class="customizer">
    <div class="custom-head">
      <div>
        <div class="eyebrow">CUSTOM / ${type.toUpperCase()}</div>
        <h1>${title}</h1>
      </div>
      <p>Build your design visually. The final version will use a real Mano a Mano 3D model that can be dragged through a full 360° view.</p>
    </div>
    <div class="custom-layout">
      <div class="viewer" id="viewer">
        <div class="viewer-note">3D PREVIEW / DRAFT MODEL</div>
        <div class="glove-stage" id="gloveStage">
          <div class="glove-body" id="gloveBody"></div>
          <div class="glove-thumb" id="gloveThumb"></div>
          <div class="glove-palm" id="glovePalm"></div>
          <div class="glove-cuff" id="gloveCuff"></div>
          <div class="stitch" id="gloveStitch"></div>
          <div class="glove-mark" id="gloveMark">MAM</div>
        </div>
        <div class="viewer-hint">DRAG TO ROTATE · 360° PREVIEW</div>
      </div>
      <aside class="panel">
        <h2>Design</h2>
        <div class="small">Choose a colour for each section. This draft uses a placeholder model until the real 3D glove/headgear files are available.</div>
        <div class="swatches">
          ${sections.map(([id,label])=>`
            <div class="swatch-row">
              <label>${label}</label>
              <div class="swatch-control">
                <input type="color" data-color="${id}" value="${state.colors[id] || "#111111"}">
                <span class="hex" id="hex-${id}">${state.colors[id] || "#111111"}</span>
              </div>
            </div>`).join("")}
        </div>

        <div class="form-section">
          <h3>Custom Text</h3>
          <input class="text-control" id="customText" maxlength="18" placeholder="e.g. MACMILLAN" value="${state.text}">
        </div>

        <div class="form-section">
          <h3>Extra Details</h3>
          <textarea class="text-control" id="details" placeholder="Any extra details, requests or notes...">${state.details}</textarea>
        </div>

        <div class="form-section">
          <h3>Your Details</h3>
          <input class="text-control" id="customerName" placeholder="Name *" value="${state.name}" required>
          <input class="text-control" id="customerEmail" type="email" placeholder="Email *" value="${state.email}" required>
          <button class="btn submit" id="submitDesign" type="button">SUBMIT DESIGN</button>
          <div class="status" id="submitStatus">Draft mode: email sending will be connected once the backend/email service is added.</div>
        </div>
      </aside>
    </div>
  </section>`;
}

function render() {
  const hash = location.hash.replace("#","");
  if (!hash || hash === "home") {
    app.innerHTML = `
      <section class="hero">
        <div class="hero-inner">
          <div class="eyebrow">MANO A MANO / BOXING EQUIPMENT</div>
          <h1>BUILT<br><span>FOR THE</span>FIGHT</h1>
          <p>Premium boxing equipment with a dedicated custom design experience. This is the first Mano a Mano website prototype.</p>
          <a class="btn" href="#custom/sparring">START CUSTOMISING</a>
        </div>
      </section>`;
  } else if (hash.startsWith("shop/")) {
    app.innerHTML = shopPage(hash.split("/")[1]);
  } else if (hash.startsWith("custom/")) {
    const type = hash.split("/")[1];
    app.innerHTML = customizer(gloveTypes[type] ? type : "sparring");
    initCustomizer();
  } else if (hash === "about") {
    app.innerHTML = layoutShell("About Mano a Mano", "A premium boxing equipment concept focused on performance and custom design.", `<div class="info-grid"><div class="info-box"><h3>The Brand</h3><p>Mano a Mano is built around boxing culture, equipment and individuality. This section is ready for the real brand story.</p></div><div class="info-box"><h3>Custom Built</h3><p>The future customiser will let customers design their equipment and submit the finished specification directly to the team.</p></div></div>`);
  } else {
    app.innerHTML = layoutShell("Contact", "Contact information and enquiries will live here.", `<div class="info-grid"><div class="info-box"><h3>Get In Touch</h3><p>Email, Instagram and other contact details can be added here.</p></div><div class="info-box"><h3>Custom Orders</h3><p>For custom equipment, use the customiser and submit your design.</p></div></div>`);
  }
  window.scrollTo(0,0);
  sidebar.classList.remove("open");
}

function applyColor(id, color) {
  state.colors[id] = color;
  const el = document.getElementById(`hex-${id}`);
  if (el) el.textContent = color.toUpperCase();

  const body = document.getElementById("gloveBody");
  const thumb = document.getElementById("gloveThumb");
  const palm = document.getElementById("glovePalm");
  const cuff = document.getElementById("gloveCuff");
  const stitch = document.getElementById("gloveStitch");

  if (id === "back") body.style.background = color;
  if (id === "outer-thumb") thumb.style.background = color;
  if (id === "inner-thumb") thumb.style.boxShadow = `inset 14px 8px 22px ${color}, inset -16px -20px 28px #333`;
  if (id === "outer-palm" || id === "inner-palm") palm.style.background = color;
  if (id === "cuff" || id === "wrist") cuff.style.background = color;
  if (id === "stitching") stitch.style.borderColor = color;
}

function initCustomizer() {
  document.querySelectorAll("[data-color]").forEach(input => {
    input.addEventListener("input", e => applyColor(e.target.dataset.color, e.target.value));
    applyColor(input.dataset.color, input.value);
  });

  const text = document.getElementById("customText");
  text.addEventListener("input", e => {
    state.text = e.target.value;
    document.getElementById("gloveMark").textContent = e.target.value || "MAM";
  });

  const details = document.getElementById("details");
  const name = document.getElementById("customerName");
  const email = document.getElementById("customerEmail");
  details.addEventListener("input", e => state.details = e.target.value);
  name.addEventListener("input", e => state.name = e.target.value);
  email.addEventListener("input", e => state.email = e.target.value);

  const stage = document.getElementById("gloveStage");
  let dragging = false, lastX = 0, lastY = 0;

  stage.addEventListener("pointerdown", e => {
    dragging = true;
    lastX = e.clientX; lastY = e.clientY;
    stage.setPointerCapture(e.pointerId);
  });
  stage.addEventListener("pointermove", e => {
    if (!dragging) return;
    const dx = e.clientX - lastX, dy = e.clientY - lastY;
    lastX = e.clientX; lastY = e.clientY;
    state.ry += dx * 0.7;
    state.rx -= dy * 0.7;
    stage.style.transform = `rotateX(${state.rx}deg) rotateY(${state.ry}deg)`;
  });
  stage.addEventListener("pointerup", () => dragging = false);
  stage.addEventListener("pointercancel", () => dragging = false);

  document.getElementById("submitDesign").addEventListener("click", () => {
    const status = document.getElementById("submitStatus");
    if (!state.name.trim() || !state.email.trim()) {
      status.textContent = "Please enter your name and email before submitting.";
      return;
    }
    status.textContent = "Prototype only: the design data is captured in the page. Automatic email sending will be connected in the next build.";
  });
}

window.addEventListener("hashchange", render);
render();

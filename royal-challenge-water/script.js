// ==========================================================
//  EDIT YOUR BUSINESS DETAILS HERE
//  Replace these placeholders with your real contact details.
// ==========================================================
const BUSINESS = {
  phone: "+91 77600090",              // shown on the site and used for "call"
  whatsapp: "",                      // e.g. "919876543210" (country code, no + or spaces). Leave "" to send orders by email instead.
  email: "ashvinichungi@gmail.com",    // orders are emailed here when whatsapp is ""
  address: "Hyderabad",
  currency: "₹",
};

// Your products. Change names, sizes, prices or add new ones.
const PRODUCTS = [
// price is for one "per" (a case, a bottle or a jar).
  { id: "250ml", name: "Pocket Bottle", size: "250 ml", price: 220, per: "case", pack: "Case of 48", tag: "Events", fill: 0.35 },
  { id: "500ml", name: "On-the-Go",     size: "500 ml", price: 140, per: "case", pack: "Case of 24", tag: "Popular", fill: 0.5 },
  { id: "1l",    name: "Classic",       size: "1 L",    price: 100, per: "case", pack: "Case of 12", tag: "Best value", fill: 0.65 },
  { id: "2l",    name: "Family",        size: "2 L",    price: 130, per: "case", pack: "Case of 9",  tag: "",        fill: 0.8 },
  { id: "20l",   name: "Home & Office Jar", size: "20 L", price: 50, per: "jar", pack: "Returnable jar", tag: "", fill: 0.95 },
];

const PROCESS = [
  ["Source selection", "Water is drawn from carefully chosen, tested sources."],
  ["Sand filtration", "Removes dirt, silt and larger particles."],
  ["Carbon filtration", "Activated carbon removes odour, chlorine and bad taste."],
  ["Reverse osmosis", "RO membranes filter out dissolved salts and impurities."],
  ["Mineral balancing", "Essential minerals are added back for taste and health."],
  ["UV & ozone treatment", "Kills bacteria and viruses and keeps water fresh."],
  ["Hygienic sealing", "Filled and sealed in a clean room, then batch-tested."],
];

const $ = (sel) => document.querySelector(sel);
const money = (n) => BUSINESS.currency + n.toLocaleString("en-IN");

// ---------- Products ----------
$("#product-grid").innerHTML = PRODUCTS.map((p) => `
  <article class="product reveal">
    ${p.tag ? `<span class="product-tag">${p.tag}</span>` : ""}
    ${bottleIcon(p.id)}
    <h3>${p.name}</h3>
    <p class="product-size">${p.size} · ${p.pack}</p>
    <p class="product-price">${money(p.price)}<small> / ${p.per}</small></p>
    <a class="btn btn-small" href="#order" data-product="${p.id}">Order</a>
  </article>`).join("");

// ---------- Process ----------
$("#process-list").innerHTML = PROCESS.map(([title, text], i) => `
  <li class="step reveal"><span class="step-num">${i + 1}</span><h3>${title}</h3><p>${text}</p></li>`).join("");

// ---------- Contact ----------
$("#contact-phone").textContent = BUSINESS.phone;
$("#contact-phone").href = "tel:" + BUSINESS.phone.replace(/\s/g, "");
$("#contact-email").textContent = BUSINESS.email;
$("#contact-email").href = "mailto:" + BUSINESS.email;
$("#contact-address").textContent = BUSINESS.address;
$("#year").textContent = new Date().getFullYear();

// ---------- Order form ----------
const form = $("#order-form");
const productSelect = $("#order-product");
productSelect.innerHTML = PRODUCTS.map((p) => `<option value="${p.id}">${p.name} (${p.size}) · ${money(p.price)} per ${p.per}</option>`).join("");

function updateTotal() {
  const p = PRODUCTS.find((x) => x.id === productSelect.value);
  const qty = Math.max(1, parseInt(form.qty.value, 10) || 1);
  $("#order-total").textContent = `Estimated total: ${money(p.price * qty)}`;
}
productSelect.addEventListener("change", updateTotal);
form.qty.addEventListener("input", updateTotal);
updateTotal();

// Pre-select a product when arriving from another page, e.g. index.html?product=500ml#order
const wanted = new URLSearchParams(location.search).get("product");
if (PRODUCTS.some((p) => p.id === wanted)) { productSelect.value = wanted; updateTotal(); }

document.querySelectorAll("[data-product]").forEach((a) =>
  a.addEventListener("click", () => { productSelect.value = a.dataset.product; updateTotal(); })
);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = $("#form-msg");
  if (!form.checkValidity()) {
    msg.textContent = "Please fill in your name, phone, address and quantity.";
    msg.className = "form-msg error";
    form.reportValidity();
    return;
  }
  const p = PRODUCTS.find((x) => x.id === productSelect.value);
  const qty = parseInt(form.qty.value, 10);
  const text = [
    "New order — Royal Challenge Water",
    `Name: ${form.name.value}`,
    `Phone: ${form.phone.value}`,
    `Address: ${form.address.value}`,
    `Product: ${p.name} (${p.size}) x ${qty} ${p.per}(s) = ${money(p.price * qty)}`,
    form.notes.value ? `Notes: ${form.notes.value}` : "",
  ].filter(Boolean).join("\n");

  const url = BUSINESS.whatsapp
    ? `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(text)}`
    : `mailto:${BUSINESS.email}?subject=${encodeURIComponent("New water order")}&body=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
  msg.textContent = "Thanks! Your order is ready to send. Please press send in the window that opened.";
  msg.className = "form-msg ok";
});

// ---------- Mobile menu ----------
const toggle = $("#nav-toggle");
toggle.addEventListener("click", () => {
  const open = document.body.classList.toggle("menu-open");
  toggle.setAttribute("aria-expanded", open);
});
document.querySelectorAll("#nav-links a").forEach((a) =>
  a.addEventListener("click", () => document.body.classList.remove("menu-open"))
);

// ---------- Bubbles ----------
const bubbles = $("#bubbles");
for (let i = 0; i < 18; i++) {
  const b = document.createElement("span");
  const size = 6 + Math.random() * 22;
  b.style.cssText = `left:${Math.random() * 100}%;width:${size}px;height:${size}px;animation-duration:${8 + Math.random() * 10}s;animation-delay:${-Math.random() * 15}s`;
  bubbles.appendChild(b);
}

// ---------- Scroll reveal + counters ----------
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    const num = entry.target.querySelector(".stat-num");
    if (num) countUp(num);
    io.unobserve(entry.target);
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

function countUp(el) {
  const target = +el.dataset.target;
  const suffix = el.dataset.suffix || "";
  const start = performance.now();
  const tick = (now) => {
    const t = Math.min(1, (now - start) / 1200);
    el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3))) + suffix;
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

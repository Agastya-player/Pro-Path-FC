// ==========================================================
//  EDIT YOUR STILL & SPARKLING PRODUCTS HERE
//  Change names, sizes, prices, or add/remove products.
//  type must be "still" or "sparkling".
// ==========================================================
const CURRENCY = "₹";

// price is for one "per" (a case, a can, a bottle or a jar).
const RANGE = [
  { type: "still", name: "Pocket Bottle", size: "250 ml", pack: "Case of 48", price: 220, per: "case", fill: 0.35 },
  { type: "still", name: "On-the-Go", size: "500 ml", pack: "Case of 24", price: 140, per: "case", fill: 0.5, tag: "Popular" },
  { type: "still", name: "Classic", size: "1 L", pack: "Case of 12", price: 100, per: "case", fill: 0.65, tag: "Best value" },
  { type: "still", name: "Family", size: "2 L", pack: "Case of 9", price: 130, per: "case", fill: 0.8 },
  { type: "still", name: "Home & Office Jar", size: "20 L", pack: "Returnable jar", price: 50, per: "jar", fill: 0.95, jar: true },
  { type: "sparkling", name: "Sparkling Original", size: "300 ml can", pack: "Case of 24", price: 30, per: "can", fill: 0.6, tag: "New" },
  { type: "sparkling", name: "Sparkling Lemon", size: "300 ml can", pack: "Case of 24", price: 35, per: "can", fill: 0.6, flavour: "lemon" },
  { type: "sparkling", name: "Sparkling Mint", size: "300 ml can", pack: "Case of 24", price: 35, per: "can", fill: 0.6, flavour: "mint" },
  { type: "sparkling", name: "Sparkling Royal Glass", size: "750 ml glass", pack: "Case of 12", price: 90, per: "bottle", fill: 0.75, tag: "Premium" },
];

const COMPARE = [
  ["Taste", "Smooth, light and neutral", "Crisp and lively with fine bubbles"],
  ["Gas (CO₂)", "None", "Added carbonation"],
  ["Sugar & calories", "Zero", "Zero"],
  ["Flavours", "Natural", "Original, Lemon, Mint"],
  ["Best for", "Everyday drinking, cooking, sports", "Meals, parties, soft-drink swap, mixers"],
  ["Pack sizes", "250 ml – 20 L jar", "300 ml cans, 750 ml glass"],
  ["Serve", "Room temperature or chilled", "Well chilled"],
];

const $ = (sel) => document.querySelector(sel);
const grid = $("#range-grid");

grid.innerHTML = RANGE.map((p) => `
  <article class="product reveal" data-type="${p.type}">
    ${p.tag ? `<span class="product-tag">${p.tag}</span>` : ""}
    <span class="type-pill ${p.type}">${p.type === "still" ? "💧 Still" : "🫧 Sparkling"}</span>
    <div class="mini-bottle ${p.jar ? "jar" : ""} ${p.type} ${p.flavour || ""}" style="--fill:${p.fill}"><span></span></div>
    <h3>${p.name}</h3>
    <p class="product-size">${p.size} · ${p.pack}</p>
    <p class="product-price">${CURRENCY}${p.price}<small> / ${p.per}</small></p>
    <a class="btn btn-small" href="index.html#order">Order</a>
  </article>`).join("");

$("#compare-body").innerHTML = COMPARE.map(([row, still, sparkling]) =>
  `<tr><th scope="row">${row}</th><td>${still}</td><td>${sparkling}</td></tr>`).join("");

// Tabs
const tabs = document.querySelectorAll(".tab");
function filter(type) {
  tabs.forEach((t) => {
    const on = t.dataset.filter === type;
    t.classList.toggle("active", on);
    t.setAttribute("aria-selected", on);
  });
  grid.querySelectorAll(".product").forEach((card) => {
    card.hidden = type !== "all" && card.dataset.type !== type;
  });
}
tabs.forEach((t) => t.addEventListener("click", () => filter(t.dataset.filter)));
document.querySelectorAll("[data-tab]").forEach((a) => a.addEventListener("click", () => filter(a.dataset.tab)));

$("#year").textContent = new Date().getFullYear();

// Mobile menu
const toggle = $("#nav-toggle");
toggle.addEventListener("click", () => {
  const open = document.body.classList.toggle("menu-open");
  toggle.setAttribute("aria-expanded", open);
});

// Scroll reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add("visible"); io.unobserve(entry.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

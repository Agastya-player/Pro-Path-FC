// ==========================================================
//  EDIT YOUR PRICE LIST HERE
//  price = cost of one case (or one jar) in rupees, bottles = bottles per case.
//  id must match a product id in script.js so "Order" pre-selects it.
// ==========================================================
const PRICES = [
  { id: "250ml", size: "250 ml", bottles: 48, price: 220, fill: 0.35 },
  { id: "500ml", size: "500 ml", bottles: 24, price: 140, fill: 0.5, tag: "Popular" },
  { id: "1l",    size: "1 Litre", bottles: 12, price: 100, fill: 0.65, tag: "Best value" },
  { id: "2l",    size: "2 Litre", bottles: 9,  price: 130, fill: 0.8 },
  { id: "20l",   size: "20 Litre jar", bottles: 1, price: 50, fill: 0.95, jar: true, tag: "Home & office" },
];

const $ = (sel) => document.querySelector(sel);
const rupees = (n) => "₹" + (Number.isInteger(n) ? n : n.toFixed(2)).toLocaleString("en-IN");
const perBottle = (p) => p.price / p.bottles;
const unit = (p) => (p.jar ? "jar" : "case");
const orderLink = (p) => `index.html?product=${p.id}#order`;

$("#price-grid").innerHTML = PRICES.map((p) => `
  <article class="price-card reveal">
    ${p.tag ? `<span class="product-tag">${p.tag}</span>` : ""}
    <div class="mini-bottle ${p.jar ? "jar" : ""}" style="--fill:${p.fill}"><span></span></div>
    <h3>${p.size}</h3>
    <p class="price-pack">${p.jar ? "Returnable jar refill" : `${p.bottles} bottles per case`}</p>
    <p class="price-big">₹${p.price}<small> / ${unit(p)}</small></p>
    <p class="price-each">${p.jar ? "Only ₹" + (p.price / 20).toFixed(2) + " per litre" : `Only ${rupees(perBottle(p))} per bottle`}</p>
    <a class="btn btn-small" href="${orderLink(p)}">Order</a>
  </article>`).join("");

$("#lowest-price").textContent = rupees(Math.min(...PRICES.filter((p) => !p.jar).map(perBottle)));

// Calculator
const pack = $("#calc-pack");
const cases = $("#calc-cases");
pack.innerHTML = PRICES.map((p, i) => `<option value="${i}">${p.jar ? p.size : `${p.size} × ${p.bottles}`} — ₹${p.price} per ${unit(p)}</option>`).join("");
function calc() {
  const p = PRICES[pack.value];
  const n = Math.max(1, parseInt(cases.value, 10) || 1);
  $("#calc-bottles").textContent = (p.bottles * n).toLocaleString("en-IN");
  $("#calc-total").textContent = "₹" + (p.price * n).toLocaleString("en-IN");
  $("#calc-order").href = orderLink(p);
}
pack.addEventListener("change", calc);
cases.addEventListener("input", calc);
calc();

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

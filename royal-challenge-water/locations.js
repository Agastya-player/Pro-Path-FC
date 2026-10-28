// ==========================================================
//  EDIT YOUR FACTORY / DEPOT LOCATIONS HERE
//  These are SAMPLE locations in Telangana — replace them with your real ones.
//
//  To get the numbers for a place:
//   1. Open Google Maps and find your factory.
//   2. Right-click the exact spot — the first line of the menu shows "lat, lng"
//      (e.g. 17.5330, 78.2640). Click it to copy.
//   3. Paste them into lat and lng below.
// ==========================================================
const LOCATIONS = [
  {
    name: "Hyderabad Main Plant",
    type: "Factory",
    area: "Patancheru Industrial Area, Sangareddy district",
    lat: 17.533, lng: 78.264,
    hours: "Mon–Sat, 8 am – 8 pm",
    capacity: "Bottles & 20 L jars",
  },
  {
    name: "Warangal Plant",
    type: "Factory",
    area: "Madikonda Industrial Area, Hanamkonda",
    lat: 17.97, lng: 79.53,
    hours: "Mon–Sat, 8 am – 7 pm",
    capacity: "20 L jars",
  },
  {
    name: "Karimnagar Plant",
    type: "Factory",
    area: "Industrial Estate, Karimnagar",
    lat: 18.4386, lng: 79.1288,
    hours: "Mon–Sat, 8 am – 7 pm",
    capacity: "Bottles",
  },
  {
    name: "Nizamabad Depot",
    type: "Distribution depot",
    area: "Nizamabad",
    lat: 18.6725, lng: 78.0941,
    hours: "Daily, 7 am – 9 pm",
    capacity: "Delivery hub",
  },
  {
    name: "Khammam Depot",
    type: "Distribution depot",
    area: "Khammam",
    lat: 17.2473, lng: 80.1514,
    hours: "Daily, 7 am – 9 pm",
    capacity: "Delivery hub",
  },
];

const $ = (sel) => document.querySelector(sel);
const mapFrame = $("#map-frame");
const list = $("#location-list");

const embedUrl = (l, zoom = 13) => `https://maps.google.com/maps?q=${l.lat},${l.lng}&z=${zoom}&output=embed`;
const directionsUrl = (l) => `https://www.google.com/maps/dir/?api=1&destination=${l.lat},${l.lng}`;

list.innerHTML = LOCATIONS.map((l, i) => `
  <li>
    <button class="location-card" type="button" data-index="${i}" aria-pressed="false">
      <span class="location-type ${l.type === "Factory" ? "factory" : ""}">${l.type === "Factory" ? "🏭" : "🚚"} ${l.type}</span>
      <strong>${l.name}</strong>
      <span class="location-area">📍 ${l.area}</span>
      <span class="location-meta">🕒 ${l.hours} · ${l.capacity}</span>
    </button>
    <a class="location-dir" href="${directionsUrl(l)}" target="_blank" rel="noopener">Get directions ↗</a>
  </li>`).join("");

function select(i) {
  const l = LOCATIONS[i];
  mapFrame.src = embedUrl(l);
  $("#map-caption").textContent = `${l.name} — ${l.area}`;
  list.querySelectorAll(".location-card").forEach((b) => {
    const on = +b.dataset.index === i;
    b.classList.toggle("active", on);
    b.setAttribute("aria-pressed", on);
  });
}

list.addEventListener("click", (e) => {
  const card = e.target.closest(".location-card");
  if (card) {
    select(+card.dataset.index);
    if (window.innerWidth < 900) mapFrame.scrollIntoView({ behavior: "smooth", block: "center" });
  }
});

$("#show-all").addEventListener("click", () => {
  // Centre of Telangana, zoomed out to show the whole state
  mapFrame.src = "https://maps.google.com/maps?q=Telangana&z=7&output=embed";
  $("#map-caption").textContent = "All of Telangana";
  list.querySelectorAll(".location-card").forEach((b) => { b.classList.remove("active"); b.setAttribute("aria-pressed", false); });
});

$("#count-factories").textContent = LOCATIONS.filter((l) => l.type === "Factory").length;
$("#count-depots").textContent = LOCATIONS.filter((l) => l.type !== "Factory").length;
$("#year").textContent = new Date().getFullYear();
select(0);

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

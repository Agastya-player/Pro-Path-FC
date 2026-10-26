(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const POS = { FW: "Forward", MF: "Midfielder", DF: "Defender" };
  const CACHE_KEY = "ppfc-wiki-v1";

  // Photo + bio for each player, keyed by Wikipedia title. Filled by loadWiki().
  let wiki = {};
  let visible = PLAYERS.slice();
  let current = -1;

  const initials = (name) => name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const wikiUrl = (p) => "https://en.wikipedia.org/wiki/" + encodeURIComponent(p.wiki.replace(/ /g, "_"));
  const imageFor = (p) => p.img || (wiki[p.wiki] && wiki[p.wiki].img);

  // ---------- Media (photo with a coloured fallback) ----------
  function media(p) {
    const el = document.createElement("div");
    el.className = "media";
    el.dataset.initials = initials(p.name);
    el.dataset.wiki = p.wiki;
    el.style.setProperty("--c1", p.color[0]);
    el.style.setProperty("--c2", p.color[1]);
    addPhoto(el, p);
    return el;
  }

  function addPhoto(el, p) {
    const src = imageFor(p);
    if (!src || el.querySelector(".photo")) return;
    const img = new Image();
    img.className = "photo";
    img.alt = p.name;
    img.loading = "lazy";
    img.decoding = "async";
    img.referrerPolicy = "no-referrer";
    img.onload = () => { img.classList.add("loaded"); el.classList.add("has-photo"); };
    img.onerror = () => img.remove();
    img.src = src;
    el.appendChild(img);
  }

  const byWiki = Object.fromEntries(PLAYERS.map((p) => [p.wiki, p]));
  function hydrateAll() {
    $$(".media").forEach((el) => byWiki[el.dataset.wiki] && addPhoto(el, byWiki[el.dataset.wiki]));
  }

  // ---------- Wikipedia: one batched request for every photo + intro ----------
  async function loadWiki() {
    try {
      const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) || "null");
      if (cached) { wiki = cached; hydrateAll(); return; }
    } catch (_) { /* storage unavailable */ }

    const params = new URLSearchParams({
      action: "query", format: "json", origin: "*", redirects: "1",
      prop: "pageimages|extracts", piprop: "thumbnail", pithumbsize: "800", pilimit: "max",
      exintro: "1", explaintext: "1", exsentences: "3", exlimit: "max",
      titles: PLAYERS.map((p) => p.wiki).join("|"),
    });
    try {
      const res = await fetch("https://en.wikipedia.org/w/api.php?" + params);
      const data = await res.json();
      const q = data.query || {};
      // Map the titles we asked for to the final page titles Wikipedia used.
      const finalTitle = {};
      PLAYERS.forEach((p) => (finalTitle[p.wiki] = p.wiki));
      for (const step of [...(q.normalized || []), ...(q.redirects || [])]) {
        for (const k in finalTitle) if (finalTitle[k] === step.from) finalTitle[k] = step.to;
      }
      const pages = Object.values(q.pages || {});
      for (const p of PLAYERS) {
        const page = pages.find((pg) => pg.title === finalTitle[p.wiki]);
        if (page) wiki[p.wiki] = { img: page.thumbnail && page.thumbnail.source, bio: page.extract };
      }
      try { sessionStorage.setItem(CACHE_KEY, JSON.stringify(wiki)); } catch (_) { /* ignore */ }
      hydrateAll();
      if (current >= 0) renderModal();
    } catch (err) {
      console.warn("Could not load player photos from Wikipedia:", err);
    }
  }

  // ---------- Grid ----------
  const grid = $("#grid");
  function renderGrid(filter) {
    visible = PLAYERS.filter((p) => filter === "all" || p.era === filter || p.pos === filter);
    grid.innerHTML = "";
    visible.forEach((p, i) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "card";
      card.style.setProperty("--c1", p.color[0]);
      card.style.animationDelay = i * 40 + "ms";
      card.setAttribute("aria-label", `${p.name}, ${p.country}. Open details`);
      card.appendChild(media(p));
      card.insertAdjacentHTML("beforeend", `
        <span class="card-era">${p.era === "legend" ? "🏆 Legend" : "🌟 Star"}</span>
        <span class="card-num">${p.num}</span>
        <span class="card-info"><strong>${p.name}</strong><span>${p.flag} ${p.country} · ${POS[p.pos]}</span></span>`);
      card.addEventListener("click", () => openModal(p));
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--ry", ((e.clientX - r.left) / r.width - 0.5) * 14 + "deg");
        card.style.setProperty("--rx", ((e.clientY - r.top) / r.height - 0.5) * -14 + "deg");
      });
      card.addEventListener("mouseleave", () => { card.style.setProperty("--rx", 0); card.style.setProperty("--ry", 0); });
      grid.appendChild(card);
    });
  }

  $$(".chip").forEach((chip) => chip.addEventListener("click", () => {
    $$(".chip").forEach((c) => c.classList.toggle("active", c === chip));
    renderGrid(chip.dataset.filter);
  }));

  // ---------- Modal ----------
  const modal = $("#modal");
  let lastFocus = null;

  function openModal(p) {
    if (!visible.includes(p)) visible = PLAYERS.slice();
    current = visible.indexOf(p);
    lastFocus = document.activeElement;
    renderModal();
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    hideToast();
    $(".modal-close", modal).focus();
  }

  function renderModal() {
    const p = visible[current];
    const info = wiki[p.wiki] || {};
    const box = $("#modal-media");
    box.innerHTML = "";
    box.appendChild(media(p));
    $("#modal-eyebrow").textContent = `${p.flag} ${p.country} · ${POS[p.pos]} · #${p.num}`;
    $("#modal-name").textContent = p.name;
    $("#modal-nick").textContent = p.nick;
    $("#modal-honours").innerHTML = p.honours.map((h) => `<li>${h}</li>`).join("");
    $("#modal-bio").textContent = info.bio || `${p.name} ${p.fact}`;
    $("#modal-link").href = wikiUrl(p);
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    current = -1;
    if (lastFocus) lastFocus.focus();
  }

  function step(dir) {
    current = (current + dir + visible.length) % visible.length;
    renderModal();
  }

  $$("[data-close]", modal).forEach((el) => el.addEventListener("click", closeModal));
  $("#modal-prev").addEventListener("click", () => step(-1));
  $("#modal-next").addEventListener("click", () => step(1));
  document.addEventListener("keydown", (e) => {
    if (current < 0) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });

  const randomPlayer = () => PLAYERS[Math.floor(Math.random() * PLAYERS.length)];
  ["#random-btn", "#hero-random"].forEach((id) => $(id).addEventListener("click", () => {
    visible = PLAYERS.slice();
    openModal(randomPlayer());
  }));

  // ---------- Hero spotlight (rotates every few seconds) ----------
  const order = PLAYERS.slice().sort(() => Math.random() - 0.5);
  let spot = 0;
  function showSpotlight() {
    const p = order[spot % order.length];
    const box = $("#spotlight-img");
    const old = box.firstElementChild;
    const next = media(p);
    box.appendChild(next);
    if (old) { old.style.transition = "opacity .8s"; old.style.opacity = 0; setTimeout(() => old.remove(), 900); }
    $("#spotlight-name").textContent = p.name;
    $("#spotlight-meta").textContent = `${p.flag} ${p.country} · ${p.nick}`;
    $("#spotlight-num").textContent = p.num;
    $("#spotlight").onclick = () => { visible = PLAYERS.slice(); openModal(p); };
  }
  showSpotlight();
  setInterval(() => { if (!document.hidden) { spot++; showSpotlight(); } }, 4500);

  // ---------- Ticker ----------
  const tickerItems = PLAYERS.map((p) => `<span>${p.name} — ${p.honours[0]}</span>`).join("");
  $("#ticker-track").innerHTML = tickerItems + tickerItems; // doubled for a seamless loop

  // ---------- "Did you know?" pop-up ----------
  const toast = $("#toast");
  let toastOn = true;
  let toastPlayer = null;
  let hideTimer;

  function showToast() {
    if (!toastOn || current >= 0) return;
    toastPlayer = randomPlayer();
    const box = $("#toast-img");
    box.innerHTML = "";
    box.appendChild(media(toastPlayer));
    $("#toast-name").textContent = toastPlayer.name;
    $("#toast-fact").textContent = toastPlayer.fact.charAt(0).toUpperCase() + toastPlayer.fact.slice(1);
    toast.classList.add("show");
    clearTimeout(hideTimer);
    hideTimer = setTimeout(hideToast, 7000);
  }
  function hideToast() { toast.classList.remove("show"); }

  $("#toast-main").addEventListener("click", () => toastPlayer && openModal(toastPlayer));
  $("#toast-close").addEventListener("click", () => { toastOn = false; hideToast(); });
  setTimeout(showToast, 5000);
  setInterval(showToast, 16000);

  // ---------- Counters ----------
  const totals = {
    players: PLAYERS.length,
    nations: new Set(PLAYERS.map((p) => p.country)).size,
    ballon: PLAYERS.reduce((n, p) => n + p.ballon, 0),
    worldcups: PLAYERS.reduce((n, p) => n + p.worldCups, 0),
  };
  function countUp(el) {
    const target = totals[el.dataset.count];
    const start = performance.now();
    const tick = (t) => {
      const k = Math.min((t - start) / 1400, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  // ---------- Scroll reveal ----------
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("visible");
      const counter = $("[data-count]", e.target);
      if (counter) countUp(counter);
      io.unobserve(e.target);
    }), { threshold: 0.15 });
    $$(".reveal").forEach((el) => io.observe(el));
  } else {
    $$(".reveal").forEach((el) => el.classList.add("visible"));
    $$("[data-count]").forEach((el) => (el.textContent = totals[el.dataset.count]));
  }

  renderGrid("all");
  loadWiki();
})();

// Bottle icons: the real bottle photo for 250 ml to 2 L, SVG drawings for the jar, cans and glass bottle. Every icon uses the same 100 x 200 canvas and
// sits on the same baseline, so the heights show the real size differences.
// bottleIcon("500ml"), bottleIcon("can", "lemon"), bottleIcon("glass"), ...
(function () {
  let uid = 0;
  const f = (n) => +n.toFixed(2);

  const LABELS = {
    "250ml": "250 ml bottle", "500ml": "500 ml bottle", "1l": "1 litre bottle", "2l": "2 litre bottle",
    "20l": "20 litre jar", can: "300 ml sparkling can", glass: "750 ml glass bottle",
  };

  // Real photo of the Royal Challenge bottle (bottle.png), scaled to each size.
  const PHOTO_HEIGHTS = { "250ml": 92, "500ml": 126, "1l": 160, "2l": 186 };
  const PHOTO_ASPECT = 222 / 752;

  function photo(h) {
    const w = h * PHOTO_ASPECT;
    return `<ellipse cx="50" cy="197.5" rx="${f(w / 2 + 5)}" ry="2.2" fill="#0d1545" opacity=".18"/>` +
      `<image href="bottle.png" x="${f(50 - w / 2)}" y="${f(196 - h)}" width="${f(w)}" height="${h}" preserveAspectRatio="xMidYMid meet"/>`;
  }

  const SPECS = {
    "20l": { h: 178, w: 84, neck: 30, cap: 14, jar: true },
    glass: { h: 172, w: 34, neck: 11, cap: 9, glass: true },
  };

  function bottle(spec) {
    const id = "bi" + uid++;
    const { h, w, neck, cap, jar, glass } = spec;
    const top = 196 - h, bx = w / 2, nx = neck / 2;
    const neckH = glass ? h * 0.2 : jar ? h * 0.08 : h * 0.06;
    const shH = jar ? h * 0.12 : glass ? h * 0.16 : h * 0.2;
    const y0 = top + cap, y1 = y0 + neckH, y2 = y1 + shH, yb = 196;
    const r = Math.min(bx * 0.45, 12);
    const body =
      `M${f(50 - nx)} ${f(y0)} L${f(50 - nx)} ${f(y1)} C${f(50 - nx)} ${f(y1 + shH * 0.55)} ${f(50 - bx)} ${f(y2 - shH * 0.6)} ${f(50 - bx)} ${f(y2)} ` +
      `L${f(50 - bx)} ${f(yb - r)} Q${f(50 - bx)} ${yb} ${f(50 - bx + r)} ${yb} L${f(50 + bx - r)} ${yb} Q${f(50 + bx)} ${yb} ${f(50 + bx)} ${f(yb - r)} ` +
      `L${f(50 + bx)} ${f(y2)} C${f(50 + bx)} ${f(y2 - shH * 0.6)} ${f(50 + nx)} ${f(y1 + shH * 0.55)} ${f(50 + nx)} ${f(y1)} L${f(50 + nx)} ${f(y0)} Z`;

    // label
    const lt = y2 + (yb - y2) * (glass ? 0.3 : 0.22), lh = (yb - y2) * (glass ? 0.4 : 0.46);
    const bandY = lt + lh * 0.3, bandH = lh * 0.4;
    let label;
    if (glass) {
      label =
        `<rect x="${f(50 - bx)}" y="${f(lt)}" width="${w}" height="${f(lh)}" fill="#f4efe0"/>` +
        `<rect x="${f(50 - bx)}" y="${f(lt + lh * 0.12)}" width="${w}" height="1.6" fill="#1b9e4b"/>` +
        `<rect x="${f(50 - bx)}" y="${f(lt + lh * 0.88 - 1.6)}" width="${w}" height="1.6" fill="#1b9e4b"/>` +
        `<text x="50" y="${f(lt + lh * 0.5)}" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="${f(w * 0.2)}" fill="#0d1545">ROYAL</text>` +
        `<text x="50" y="${f(lt + lh * 0.72)}" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="${f(w * 0.14)}" fill="#0d1545">CHALLENGE</text>`;
    } else {
      label =
        `<rect x="${f(50 - bx)}" y="${f(lt)}" width="${w}" height="${f(lh)}" fill="#1b9e4b"/>` +
        `<circle cx="50" cy="${f(lt + lh * 0.14)}" r="${f(Math.min(3, bx * 0.13))}" fill="#f4c542"/>` +
        `<rect x="${f(50 - bx)}" y="${f(bandY)}" width="${w}" height="${f(bandH)}" fill="#0d1545"/>` +
        `<rect x="${f(50 - bx)}" y="${f(bandY + 0.6)}" width="${w}" height="0.5" fill="#fff" opacity=".7"/>` +
        `<rect x="${f(50 - bx)}" y="${f(bandY + bandH - 1.1)}" width="${w}" height="0.5" fill="#fff" opacity=".7"/>` +
        (w >= 44
          ? `<text x="50" y="${f(bandY + bandH * 0.47)}" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="${f(w * 0.165)}" fill="#fff">ROYAL</text>` +
            `<text x="50" y="${f(bandY + bandH * 0.86)}" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="${f(w * 0.118)}" fill="#fff">CHALLENGE</text>`
          : "");
    }

    const capFill = glass ? `url(#${id}k)` : `url(#${id}c)`;
    const ridges = Array.from({ length: Math.max(3, Math.round(neck / 3)) }, (_, i) => {
      const x = 50 - nx - 1 + ((neck + 2) / (Math.max(3, Math.round(neck / 3)) + 1)) * (i + 1);
      return `<line x1="${f(x)}" y1="${f(top + 1.5)}" x2="${f(x)}" y2="${f(y0 - 1)}" stroke="rgba(0,0,0,.2)" stroke-width=".6"/>`;
    }).join("");
    const grooves = [10, 16].map((d) =>
      `<path d="M${f(50 - bx)} ${yb - d} Q50 ${yb - d + 3} ${f(50 + bx)} ${yb - d}" stroke="rgba(13,21,69,.16)" stroke-width="1.2" fill="none"/>` +
      `<path d="M${f(50 - bx)} ${yb - d + 1.6} Q50 ${yb - d + 4.6} ${f(50 + bx)} ${yb - d + 1.6}" stroke="rgba(255,255,255,.55)" stroke-width=".8" fill="none"/>`).join("");
    const handle = jar
      ? `<path d="M${f(50 + bx - 8)} ${f(y2 - 3)} C${f(50 + bx + 9)} ${f(y2 - 16)} ${f(50 + bx + 9)} ${f(y2 + 20)} ${f(50 + bx - 6)} ${f(y2 + 16)}" stroke="rgba(13,21,69,.4)" stroke-width="4.4" fill="none" stroke-linecap="round"/>` +
        `<path d="M${f(50 + bx - 8)} ${f(y2 - 3)} C${f(50 + bx + 9)} ${f(y2 - 16)} ${f(50 + bx + 9)} ${f(y2 + 20)} ${f(50 + bx - 6)} ${f(y2 + 16)}" stroke="#cfe3e8" stroke-width="3" fill="none" stroke-linecap="round"/>`
      : "";
    const liquid = glass
      ? `<rect x="0" y="${f(y1 + 1)}" width="100" height="200" fill="url(#${id}g)"/>`
      : `<rect x="0" y="${f(y1 + 1)}" width="100" height="200" fill="url(#${id}w)"/>` +
        `<ellipse cx="50" cy="${f(y1 + 1)}" rx="${f(nx)}" ry="1.5" fill="#f2fcff" opacity=".9"/>`;

    return (
      `<defs>` +
      `<linearGradient id="${id}w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6fbfc"/><stop offset=".4" stop-color="#e2eef1"/><stop offset="1" stop-color="#c4d7dc"/></linearGradient>` +
      `<linearGradient id="${id}g" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#0b5a2f"/><stop offset=".35" stop-color="#1f9a52"/><stop offset=".7" stop-color="#0f6d38"/><stop offset="1" stop-color="#083f21"/></linearGradient>` +
      `<linearGradient id="${id}s" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".5"/><stop offset=".2" stop-color="#fff" stop-opacity="0"/><stop offset=".78" stop-color="#0d1545" stop-opacity="0"/><stop offset="1" stop-color="#0d1545" stop-opacity=".25"/></linearGradient>` +
      `<linearGradient id="${id}c" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#0c8a17"/><stop offset=".3" stop-color="#3fdc4b"/><stop offset=".6" stop-color="#1fbd2b"/><stop offset="1" stop-color="#097012"/></linearGradient>` +
      `<linearGradient id="${id}k" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#a97f1d"/><stop offset=".3" stop-color="#f4d77c"/><stop offset=".6" stop-color="#d9a82e"/><stop offset="1" stop-color="#8a6512"/></linearGradient>` +
      `<clipPath id="${id}b"><path d="${body}"/></clipPath>` +
      `</defs>` +
      `<ellipse cx="50" cy="197.5" rx="${f(bx + 5)}" ry="2.2" fill="#0d1545" opacity=".18"/>` +
      handle +
      `<g clip-path="url(#${id}b)">${liquid}${label}${grooves}` +
      `<rect x="${f(50 - bx)}" y="${f(y1)}" width="${w}" height="${f(yb - y1)}" fill="url(#${id}s)"/>` +
      `<path d="M${f(50 - bx + 3.5)} ${f(y2 + 3)} L${f(50 - bx + 3.5)} ${yb - 14}" stroke="#fff" stroke-width="${f(Math.max(1.4, w * 0.07))}" stroke-linecap="round" opacity=".55"/>` +
      `<path d="M${f(50 + bx - 3)} ${f(y2 + 8)} L${f(50 + bx - 3)} ${yb - 16}" stroke="#fff" stroke-width="1" stroke-linecap="round" opacity=".35"/>` +
      `</g>` +
      `<path d="${body}" fill="none" stroke="rgba(13,21,69,.4)" stroke-width=".8"/>` +
      `<rect x="${f(50 - nx - 2.2)}" y="${f(y0 + 0.4)}" width="${f(neck + 4.4)}" height="1.8" rx=".9" fill="#fff" fill-opacity=".6" stroke="rgba(13,21,69,.3)" stroke-width=".4"/>` +
      `<rect x="${f(50 - nx - 1.5)}" y="${f(top)}" width="${f(neck + 3)}" height="${cap}" rx="2" fill="${capFill}"/>` +
      ridges +
      `<rect x="${f(50 - nx - 1.5)}" y="${f(top)}" width="${f(neck + 3)}" height="${cap}" rx="2" fill="none" stroke="rgba(0,0,0,.3)" stroke-width=".5"/>`
    );
  }

  const CAN_COLOURS = {
    original: { wrap: "#0d1545", text: "#fff", band: "#1b9e4b" },
    lemon: { wrap: "#f2cb2e", text: "#0d1545", band: "#1b9e4b" },
    mint: { wrap: "#17a98a", text: "#fff", band: "#0d1545" },
  };

  function can(flavour) {
    const id = "bi" + uid++;
    const c = CAN_COLOURS[flavour] || CAN_COLOURS.original;
    const body = "M32 100 Q32 94 38 93 L62 93 Q68 94 68 100 L68 189 Q68 195 62 196 L38 196 Q32 195 32 189 Z";
    const bubbles = [[40, 175], [46, 181], [58, 177], [53, 184], [62, 171], [37, 184]]
      .map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${i % 2 ? 1.2 : 1.7}" fill="none" stroke="#fff" stroke-width=".6" opacity=".8"/>`).join("");
    return (
      `<defs>` +
      `<linearGradient id="${id}m" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7d8896"/><stop offset=".25" stop-color="#eef2f6"/><stop offset=".55" stop-color="#b6c0cb"/><stop offset="1" stop-color="#6c7785"/></linearGradient>` +
      `<linearGradient id="${id}s" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".3"/><stop offset=".22" stop-color="#fff" stop-opacity=".35"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset=".8" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".38"/></linearGradient>` +
      `<clipPath id="${id}b"><path d="${body}"/></clipPath>` +
      `</defs>` +
      `<ellipse cx="50" cy="197.5" rx="23" ry="2.2" fill="#0d1545" opacity=".18"/>` +
      `<g clip-path="url(#${id}b)">` +
      `<rect x="30" y="92" width="40" height="106" fill="url(#${id}m)"/>` +
      `<rect x="30" y="104" width="40" height="84" fill="${c.wrap}"/>` +
      `<rect x="30" y="152" width="40" height="9" fill="${c.band}"/>` +
      `<path d="M30 153 Q38 148 46 153 T62 153 T78 153" stroke="#fff" stroke-width="1" fill="none" opacity=".7"/>` +
      `<text x="50" y="124" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="8" fill="${c.text}">ROYAL</text>` +
      `<text x="50" y="133" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="4.9" fill="${c.text}">CHALLENGE</text>` +
      `<text x="50" y="142" text-anchor="middle" font-family="Arial,sans-serif" font-weight="700" font-size="3.6" letter-spacing=".4" fill="${c.text}">SPARKLING</text>` +
      bubbles +
      `<rect x="30" y="92" width="40" height="106" fill="url(#${id}s)"/>` +
      `<path d="M37 108 L37 186" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".5"/>` +
      `</g>` +
      `<path d="${body}" fill="none" stroke="rgba(13,21,69,.4)" stroke-width=".8"/>` +
      `<ellipse cx="50" cy="93.4" rx="12.5" ry="1.8" fill="#cfd6de" stroke="rgba(13,21,69,.35)" stroke-width=".5"/>` +
      `<rect x="44" y="92.4" width="12" height="2" rx="1" fill="#9aa5b1"/>` +
      `<ellipse cx="50" cy="93.4" rx="3" ry=".9" fill="#6c7785"/>`
    );
  }

  window.bottleIcon = function (kind, flavour) {
    const inner = kind === "can" ? can(flavour) : PHOTO_HEIGHTS[kind] ? photo(PHOTO_HEIGHTS[kind]) : bottle(SPECS[kind] || SPECS["20l"]);
    return `<svg class="bottle-icon" viewBox="0 0 100 200" role="img" aria-label="${LABELS[kind] || "Bottle"}">${inner}</svg>`;
  };
})();

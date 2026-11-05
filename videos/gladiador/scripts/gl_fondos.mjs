// Fondos romanos DETALLADOS (5 capas: cielo, lejos, medio, suelo y primer plano con paralaje > 1),
// con atrezo de la época, luz del momento del día y elementos vivos.
import { C, r3, rng, icon } from "./lib.mjs";
export const G = 900;
export const RC = { sand: "#e3c48a", sand2: "#c9a467", terra: "#b5532f", marble: "#efe9df", marble2: "#d8cfbf", gold: "#d9a72b", purple: "#6b2d5c", stone: "#bfae94", stoneD: "#8f7f68", tile: "#a8452f" };

// ---------- 1 · Cielo ----------
export function romanSky(S, kind = "dia") {
  const { W, H, h } = S.fmt, dur = S.t1 - S.t0;
  const g = { dia: ["#3f7fc4", "#8ec0e6", "#f3dcae"], tarde: ["#4a3f7a", "#d98a5a", "#f6c27a"], noche: ["#070b19", "#18223f", "#3d2c42"] }[kind];
  S.bg.push(`<div class="layer" style="width:${W}px;height:${H}px;background:linear-gradient(180deg,${g[0]} 0%,${g[1]} 62%,${g[2]} 100%)"></div>`);
  const sx = h ? 1480 : 760, sy = h ? 130 : 330;
  if (kind === "noche") {
    const R = rng(3); let st = "";
    for (let i = 0; i < 90; i++) st += `<i id="${S.id}-st${i}" style="position:absolute;left:${r3(R() * W)}px;top:${r3(R() * H * 0.55)}px;width:${r3(2 + R() * 3)}px;height:${r3(2 + R() * 3)}px;border-radius:50%;background:#fff;opacity:${r3(0.3 + R() * 0.6)}"></i>`;
    S.bg.push(`<div class="layer" style="width:${W}px;height:${H}px">${st}</div>`);
    for (let i = 0; i < 90; i += 4) S.tw(`tl.fromTo("#${S.id}-st${i}",{opacity:0.2},{immediateRender:false,opacity:1,duration:${1 + (i % 5) * 0.3},yoyo:true,repeat:${Math.floor(dur)},ease:"sine.inOut"},${r3((i % 7) * 0.2)});`);
    S.bg.push(`<div class="layer" style="left:${sx - 80}px;top:${sy - 40}px;width:150px;height:150px;border-radius:50%;background:#f4ecd2;box-shadow:0 0 80px 20px rgba(244,236,210,.35)"><div style="position:absolute;left:34px;top:30px;width:30px;height:24px;border-radius:50%;background:#e2d8bb"></div><div style="position:absolute;left:84px;top:80px;width:22px;height:18px;border-radius:50%;background:#e2d8bb"></div></div>`);
  } else {
    // sol con halo y rayos que giran despacio
    S.bg.push(`<div id="${S.id}-rays" class="layer" style="left:${sx - 500}px;top:${sy - 500}px;width:1000px;height:1000px;background:repeating-conic-gradient(rgba(255,240,190,.16) 0 8deg,rgba(255,240,190,0) 8deg 22deg);border-radius:50%;-webkit-mask:radial-gradient(closest-side,#000 30%,transparent 100%);mask:radial-gradient(closest-side,#000 30%,transparent 100%)"></div>`);
    S.tw(`tl.fromTo("#${S.id}-rays",{rotation:0},{rotation:${r3(dur * 2)},duration:${r3(dur)},ease:"none"},0);`);
    S.bg.push(`<div class="layer" style="left:${sx - 85}px;top:${sy - 85}px;width:170px;height:170px;border-radius:50%;background:${kind === "dia" ? "#fff3c4" : "#ffcf86"};box-shadow:0 0 70px 24px ${kind === "dia" ? "rgba(255,236,170,.6)" : "rgba(255,170,90,.6)"}"></div>`);
    // nubes con volumen (tres bolas y sombra) a dos velocidades
    let cl = ""; const R = rng(4);
    for (let i = 0; i < 7; i++) {
      const w = 220 + R() * 220, top = 40 + R() * (h ? 260 : 520), sh = kind === "dia" ? "#d6e4f1" : "#e9b49a";
      cl += `<div id="${S.id}-cl${i}" style="position:absolute;left:${r3(i * W / 6 + R() * 100)}px;top:${r3(top)}px;width:${r3(w)}px;height:${r3(w * 0.42)}px;opacity:${i % 2 ? 0.75 : 0.95}">
        <div style="position:absolute;left:0;bottom:0;width:100%;height:46%;border-radius:60px;background:#fff"></div>
        <div style="position:absolute;left:16%;bottom:22%;width:42%;height:70%;border-radius:50%;background:#fff"></div>
        <div style="position:absolute;left:46%;bottom:18%;width:34%;height:60%;border-radius:50%;background:#fff"></div>
        <div style="position:absolute;left:4%;bottom:0;width:92%;height:16%;border-radius:40px;background:${sh}"></div></div>`;
    }
    S.bg.push(`<div class="layer" style="width:${W}px;height:${H}px">${cl}</div>`);
    for (let i = 0; i < 7; i++) S.tw(`tl.fromTo("#${S.id}-cl${i}",{x:0},{x:${-180 - i * 70},duration:${r3(dur)},ease:"none"},0);`);
    // pájaros en V que cruzan el cielo
    let bd = "";
    for (let i = 0; i < 5; i++) bd += `<svg id="${S.id}-bd${i}" style="position:absolute;left:${W + 100 + i * 70}px;top:${(h ? 180 : 420) + (i % 3) * 36}px" width="40" height="20" viewBox="0 0 40 20"><path id="${S.id}-bw${i}" d="M2,14 Q10,2 20,12 Q30,2 38,14" stroke="#2b2a33" stroke-width="3.5" fill="none" stroke-linecap="round"/></svg>`;
    S.bg.push(`<div class="layer" style="width:${W}px;height:${H}px">${bd}</div>`);
    for (let i = 0; i < 5; i++) {
      const c = 14 + i;
      S.tw(`tl.fromTo("#${S.id}-bd${i}",{x:0,y:0},{x:${-(W + 600)},y:${-60 + i * 15},duration:${c},repeat:${Math.ceil(dur / c)},ease:"none"},${r3(i * 0.6)});`);
      S.tw(`tl.fromTo("#${S.id}-bd${i}",{scaleY:1},{immediateRender:false,scaleY:0.4,duration:0.22,yoyo:true,repeat:${Math.floor(dur / 0.22)},ease:"sine.inOut"},${r3(i * 0.1)});`);
    }
  }
}

// ---------- 2-3 · Lejos y medio: Roma con colinas, templos, acueducto y casas ----------
function temple(x, y, w, fill, line) {
  const n = Math.max(4, Math.round(w / 34)), ch = w * 0.62;
  let cols = "";
  for (let i = 0; i < n; i++) cols += `<rect x="${r3(x + 8 + i * (w - 16) / n)}" y="${r3(y - ch)}" width="${r3((w - 16) / n * 0.55)}" height="${r3(ch)}" fill="${fill}" stroke="${line}" stroke-width="2"/>`;
  return `<rect x="${x}" y="${y}" width="${w}" height="${r3(w * 0.06)}" fill="${fill}"/>${cols}<rect x="${x - 6}" y="${r3(y - ch - w * 0.07)}" width="${w + 12}" height="${r3(w * 0.07)}" fill="${fill}" stroke="${line}" stroke-width="2"/><path d="M${x - 10},${r3(y - ch - w * 0.07)} L${r3(x + w / 2)},${r3(y - ch - w * 0.32)} L${x + w + 10},${r3(y - ch - w * 0.07)}Z" fill="${fill}" stroke="${line}" stroke-width="2"/>`;
}
function house(x, y, w, hh, wall, roof, line, R) {
  let win = "";
  for (let k = 0; k < Math.floor(w / 60); k++) for (let f = 0; f < Math.floor(hh / 70); f++) if (R() < 0.7) win += `<rect x="${r3(x + 18 + k * 60)}" y="${r3(y - hh + 22 + f * 70)}" width="22" height="30" rx="4" fill="${line}" opacity=".55"/>`;
  return `<rect x="${x}" y="${r3(y - hh)}" width="${w}" height="${hh}" fill="${wall}" stroke="${line}" stroke-width="2"/>${win}<path d="M${x - 12},${r3(y - hh)} L${r3(x + w * 0.5)},${r3(y - hh - 40)} L${x + w + 12},${r3(y - hh)}Z" fill="${roof}" stroke="${line}" stroke-width="2"/>`;
}
function cypress(x, y, s, fill) { return `<path d="M${x},${y} C${x - 26 * s},${y - 60 * s} ${x - 16 * s},${y - 170 * s} ${x},${y - 230 * s} C${x + 16 * s},${y - 170 * s} ${x + 26 * s},${y - 60 * s} ${x},${y}Z" fill="${fill}"/>`; }
export function romeSkyline(S, { far = "#a7b8d2", mid = "#cfae8e", night = false } = {}) {
  const { h } = S.fmt, R = rng(17), W0 = 16000;
  // lejos: colinas suaves, templos y cipreses (claros por la perspectiva)
  let farS = `<path d="M0,330 ${[...Array(20)].map((_, i) => `Q${i * 800 + 400},${200 + R() * 80} ${(i + 1) * 800},${300 + R() * 30}`).join(" ")} L${W0},360 L0,360Z" fill="${far}" opacity=".85"/>`;
  for (let x = 200; x < W0; x += 700 + R() * 600) {
    const t = R();
    if (t < 0.35) farS += temple(x, 300, 140 + R() * 80, far, night ? "#2a3150" : "#8ea2c0");
    else if (t < 0.7) farS += house(x, 320, 120 + R() * 120, 80 + R() * 90, far, night ? "#3a3550" : "#b9a6a2", night ? "#2a3150" : "#8ea2c0", R);
    for (let k = 0; k < 3; k++) farS += cypress(x + 200 + k * 26, 330, 0.45 + R() * 0.2, night ? "#2b3a40" : "#7f9aa8");
  }
  // medio: acueducto con arcos y casas con tejas
  let midS = "";
  const aqY = 150;
  midS += `<rect x="0" y="${aqY}" width="${W0}" height="26" fill="${mid}" stroke="#8a6f58" stroke-width="3"/>`;
  for (let x = 0; x < W0; x += 140) midS += `<path d="M${x},${aqY + 26} L${x},320 L${x + 30},320 L${x + 30},${aqY + 80} A40,40 0 0 1 ${x + 110},${aqY + 80} L${x + 110},320 L${x + 140},320 L${x + 140},${aqY + 26}Z" fill="${mid}" stroke="#8a6f58" stroke-width="2"/>`;
  for (let x = 100; x < W0; x += 260 + R() * 220) midS += house(x, 320, 140 + R() * 160, 110 + R() * 120, night ? "#4a4060" : (R() < 0.5 ? "#e3c9a4" : "#d8b48e"), night ? "#5a3a40" : RC.tile, night ? "#2a2238" : "#7a5a40", R);
  for (let x = 400; x < W0; x += 900 + R() * 500) midS += cypress(x, 320, 0.8 + R() * 0.3, night ? "#22302f" : "#4f6b4a");
  S.parallax = [[`${S.id}-far`, 0.12], [`${S.id}-mid`, 0.35], [`${S.id}-fg`, 1.35]];
  S.bg.push(`<div id="${S.id}-far" class="layer" style="left:-3000px;top:${h ? 300 : 840}px;width:${W0}px;height:360px"><svg width="${W0}" height="360">${farS}</svg></div>`);
  S.bg.push(`<div id="${S.id}-mid" class="layer" style="left:-3000px;top:${h ? 400 : 980}px;width:${W0}px;height:330px"><svg width="${W0}" height="330">${midS}</svg></div>`);
  foreground(S);
}

// ---------- 5 · Primer plano (delante de la cámara, paralaje 1,35, desenfocado) ----------
export function foreground(S) {
  const { W, H, h } = S.fmt, R = rng(31);
  let fg = "";
  const base = H;
  for (let x = 300; x < 30000; x += 1300 + R() * 900) {
    const t = R(), s = h ? 1 : 1.25;
    if (t < 0.35) fg += `<svg style="position:absolute;left:${r3(x)}px;top:${r3(base - 230 * s)}px" width="${170 * s}" height="${260 * s}" viewBox="0 0 170 260"><path d="M60,10 L110,10 L104,40 C160,70 170,180 120,240 L50,240 C0,180 10,70 66,40Z" fill="#9a4a2a" stroke="${C.ink}" stroke-width="7"/><path d="M40,30 C20,40 20,80 50,70 M130,30 C150,40 150,80 120,70" stroke="${C.ink}" stroke-width="7" fill="none"/><path d="M30,120 L140,120" stroke="#c8743a" stroke-width="10"/></svg>`;
    else fg += `<svg style="position:absolute;left:${r3(x)}px;top:${r3(base - 190 * s)}px" width="${300 * s}" height="${200 * s}" viewBox="0 0 300 200"><path d="M10,200 C0,120 60,90 90,110 C100,40 180,30 200,90 C240,60 300,100 290,200Z" fill="#3f5f34" stroke="${C.ink}" stroke-width="7"/><path d="M80,150 q20,-30 40,0 M170,140 q20,-30 40,0" stroke="#5f8a4a" stroke-width="8" fill="none"/></svg>`;
  }
  S.over.push(`<div id="${S.id}-fg" class="layer" style="left:0;top:${h ? 90 : 120}px;width:32000px;height:${H}px;z-index:14;filter:blur(3px);opacity:.95">${fg}</div>`);
}

// ---------- 4 · Suelo de arena con huellas, ondas, piedras y sombras ----------
export function sandGround(S, { top = RC.sand, bottom = RC.sand2 } = {}) {
  const R = rng(8); let marks = "";
  for (let i = 0; i < 520; i++) {
    const x = -6000 + i * 120 + R() * 100, y = G + 20 + R() * 260, t = R();
    if (t < 0.45) marks += `<path d="M${r3(x)},${r3(y)} q30,-9 60,0" stroke="#b8935a" stroke-width="5" fill="none" stroke-linecap="round" opacity=".55"/>`;
    else if (t < 0.7) marks += `<ellipse cx="${r3(x)}" cy="${r3(y)}" rx="${r3(8 + R() * 10)}" ry="${r3(5 + R() * 5)}" fill="#a88a58" opacity=".7"/>`;
    else if (t < 0.85) marks += `<ellipse cx="${r3(x)}" cy="${r3(y)}" rx="14" ry="7" fill="#b8935a" opacity=".45"/><ellipse cx="${r3(x + 40)}" cy="${r3(y + 18)}" rx="14" ry="7" fill="#b8935a" opacity=".45"/>`;
    else marks += `<path d="M${r3(x)},${r3(y)} l14,-10 l16,8 l-6,10Z" fill="#9c8a72" stroke="${C.ink}" stroke-width="2"/>`;
  }
  S.add(`<svg class="prop" style="left:0;top:0;overflow:visible;z-index:2" width="1" height="1" overflow="visible">
    <defs><linearGradient id="${S.id}-gs" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="0.3" stop-color="${bottom}"/><stop offset="1" stop-color="#a8854f"/></linearGradient></defs>
    <path d="M-6000,${G} L60000,${G} L60000,${G + 16000} L-6000,${G + 16000}Z" fill="url(#${S.id}-gs)" stroke="${C.ink}" stroke-width="5"/>
    <rect x="-6000" y="${G}" width="66000" height="26" fill="rgba(0,0,0,.12)"/>${marks}</svg>`);
}
// Sombra de contacto bajo un personaje (va con él si se mueve con walk)
export function shadowUnder(S, a, w = 220) {
  S.add(`<div class="prop" style="left:${a.x - w / 2}px;top:${G - 14}px;width:${w}px;height:30px;border-radius:50%;background:rgba(40,25,10,.28);z-index:3"></div>`);
}

// ---------- Escenarios ----------
// Patio del ludus: muro de sillares, tejado de tejas, columnas con capitel, armas colgadas, ánforas, banderas, plantas
export function ludus(S, x, w = 3400) {
  const R = rng(51); let cols = "", props = "", blocks = "";
  for (let y = 90; y < 640; y += 46) for (let bx = (y / 46) % 2 ? -60 : 0; bx < w; bx += 120) blocks += `<rect x="${bx}" y="${y}" width="118" height="44" fill="none" stroke="#c6a676" stroke-width="2"/>`;
  for (let i = 0; i < Math.floor(w / 300); i++) {
    const cx = i * 300 + 60;
    cols += `<rect x="${cx}" y="110" width="64" height="530" fill="${RC.marble}" stroke="${C.ink}" stroke-width="5"/>${[0, 1, 2].map((k) => `<path d="M${cx + 14 + k * 18},120 L${cx + 14 + k * 18},640" stroke="${RC.marble2}" stroke-width="5"/>`).join("")}<rect x="${cx - 14}" y="82" width="92" height="32" fill="${RC.marble2}" stroke="${C.ink}" stroke-width="5"/><path d="M${cx - 10},84 q10,-14 22,0 M${cx + 52},84 q10,-14 22,0" stroke="${C.ink}" stroke-width="4" fill="none"/>`;
    const px = cx + 150, t = R();
    if (t < 0.3) props += `<g transform="translate(${px},250)"><path d="M-40,-80 C-20,-90 60,-90 80,-80 L80,60 C60,70 -20,70 -40,60Z" fill="#b5332a" stroke="${C.ink}" stroke-width="5"/><circle cx="20" cy="-10" r="16" fill="${RC.gold}" stroke="${C.ink}" stroke-width="4"/></g>`;
    else if (t < 0.55) props += `<g transform="translate(${px},230)"><path d="M0,0 L0,190 M40,0 L40,190" stroke="#8a6232" stroke-width="10"/><path d="M-14,40 L54,40 M-14,120 L54,120" stroke="#8a6232" stroke-width="10"/><path d="M10,30 L10,-60 M30,110 L30,20" stroke="#c9ced6" stroke-width="9" stroke-linecap="round"/></g>`;
    else if (t < 0.8) props += `<g transform="translate(${px},140)"><path d="M0,0 L60,0 L60,150 L30,130 L0,150Z" fill="${["#6b2d5c", "#b5532f", "#d9a72b"][i % 3]}" stroke="${C.ink}" stroke-width="5"/><circle cx="30" cy="50" r="14" fill="${RC.marble}"/></g>`;
    else props += `<g transform="translate(${px},420)"><rect x="-10" y="120" width="90" height="100" fill="#b5532f" stroke="${C.ink}" stroke-width="5"/><path d="M34,120 C0,60 10,0 34,-20 C60,0 70,60 34,120Z" fill="#4f7a3a" stroke="${C.ink}" stroke-width="4"/></g>`;
  }
  let tiles = "";
  for (let tx = 0; tx < w; tx += 40) tiles += `<path d="M${tx},20 q20,-24 40,0" fill="${RC.tile}" stroke="${C.ink}" stroke-width="3"/>`;
  S.add(`<svg class="prop" style="left:${x - w / 2}px;top:${G - 680}px;z-index:1" width="${w}" height="690">
    <rect x="0" y="70" width="${w}" height="610" fill="#ddbf91"/>${blocks}
    <rect x="0" y="20" width="${w}" height="56" fill="${RC.tile}" stroke="${C.ink}" stroke-width="6"/>${tiles}
    ${props}${cols}<rect x="0" y="640" width="${w}" height="40" fill="${RC.marble2}" stroke="${C.ink}" stroke-width="5"/></svg>`);
  // ánforas y un barril sobre el suelo, delante del muro
  let floor = "";
  for (let i = 0; i < Math.floor(w / 700); i++) {
    const ax = x - w / 2 + 380 + i * 700 + R() * 120;
    floor += `<svg class="prop" style="left:${r3(ax)}px;top:${G - 170}px;z-index:3" width="110" height="175" viewBox="0 0 110 175"><path d="M38,8 L72,8 L68,30 C104,50 108,130 74,168 L36,168 C2,130 6,50 42,30Z" fill="#b8643a" stroke="${C.ink}" stroke-width="5"/><path d="M28,22 C12,30 12,60 34,54 M82,22 C98,30 98,60 76,54" stroke="${C.ink}" stroke-width="5" fill="none"/></svg>`;
  }
  S.add(floor);
}
export function post(S, id, x) {
  S.add(`<svg id="${id}" class="prop" style="left:${x - 60}px;top:${G - 530}px;z-index:4" width="120" height="540"><rect x="25" y="0" width="70" height="520" rx="12" fill="#8a6232" stroke="${C.ink}" stroke-width="6"/><path d="M35,120 l50,10 M35,240 l50,-8 M35,360 l50,6 M40,60 l40,4" stroke="#6b4a24" stroke-width="5"/><path d="M50,150 l10,30 M70,280 l-8,30" stroke="#d9b98a" stroke-width="5"/><rect x="0" y="500" width="120" height="40" rx="8" fill="#6b4a24" stroke="${C.ink}" stroke-width="5"/></svg>`);
}
// Coliseo por dentro: toldo (velarium), gradas con público, estatuas, palco del emperador, podio con inscripción y antorchas
export function stands(S, x, w = 5000, { seed = 5 } = {}) {
  const R = rng(seed), rows = 9, colors = ["#b5532f", "#efe9df", "#6b2d5c", "#d9a72b", "#4a6fa5", "#7a8a4a", "#c98f62"];
  let rowsSvg = "";
  for (let r = 0; r < rows; r++) {
    const y = 140 + r * 74; let p = "";
    for (let k = 0; k < w / 50; k++) {
      const cx = k * 50 + (r % 2) * 25 + R() * 8, col = colors[Math.floor(R() * colors.length)], arm = R() < 0.18;
      p += `<rect x="${r3(cx - 17)}" y="${y + 22}" width="34" height="42" rx="12" fill="${col}"/><circle cx="${r3(cx)}" cy="${y + 12}" r="14" fill="${["#d9a273", "#a8724a", "#c98f62", "#e0b48c"][Math.floor(R() * 4)]}"/>${arm ? `<path d="M${r3(cx + 12)},${y + 26} l12,-26" stroke="${col}" stroke-width="9" stroke-linecap="round"/>` : ""}`;
    }
    rowsSvg += `<g id="${S.id}-row${r}">${p}</g><rect x="0" y="${y + 62}" width="${w}" height="12" fill="${RC.stoneD}"/>`;
  }
  // toldo a franjas con cuerdas, estatuas sobre el podio y palco con telas moradas
  let vel = "";
  for (let k = 0; k < w; k += 120) vel += `<path d="M${k},0 L${k + 120},0 L${k + 110},70 L${k + 10},70Z" fill="${(k / 120) % 2 ? "#efe3c8" : "#c8743a"}" stroke="${C.ink}" stroke-width="3"/><path d="M${k + 60},70 L${k + 60},130" stroke="#8a6f58" stroke-width="3"/>`;
  let statues = "";
  for (let k = 300; k < w; k += 900) statues += `<g transform="translate(${k},860)"><rect x="-40" y="0" width="80" height="30" fill="${RC.marble2}" stroke="${C.ink}" stroke-width="4"/><path d="M-20,0 L-24,-120 L-36,-150 L-14,-170 L-10,-200 C-10,-230 14,-230 14,-200 L18,-170 L36,-150 L24,-120 L20,0Z" fill="${RC.marble}" stroke="${C.ink}" stroke-width="4"/></g>`;
  const pb = w / 2;
  const box = `<g transform="translate(${pb - 260},700)"><rect width="520" height="160" fill="${RC.marble}" stroke="${C.ink}" stroke-width="5"/><path d="M0,0 C80,60 180,60 260,0 C340,60 440,60 520,0 L520,40 L0,40Z" fill="${RC.purple}" stroke="${C.ink}" stroke-width="4"/><path d="M40,40 L40,160 M480,40 L480,160" stroke="${RC.gold}" stroke-width="10"/></g>`;
  S.add(`<svg class="prop" style="left:${x - w / 2}px;top:${G - 1360}px;z-index:1" width="${w}" height="1370">
    <rect x="0" y="0" width="${w}" height="900" fill="${RC.stone}"/>${vel}${rowsSvg}${box}
    <rect x="0" y="860" width="${w}" height="510" fill="${RC.marble}" stroke="${C.ink}" stroke-width="6"/><rect x="0" y="900" width="${w}" height="44" fill="${RC.terra}"/>
    ${[...Array(Math.floor(w / 600))].map((_, i) => `<text x="${i * 600 + 120}" y="932" font-family="Cinzel" font-weight="900" font-size="34" fill="${RC.marble}">SPQR · IMP · TITVS</text>`).join("")}
    ${[...Array(Math.floor(w / 400))].map((_, i) => `<rect x="${i * 400 + 180}" y="980" width="44" height="390" fill="${RC.marble2}" stroke="${C.ink}" stroke-width="4"/><rect x="${i * 400 + 170}" y="970" width="64" height="20" fill="${RC.marble2}" stroke="${C.ink}" stroke-width="4"/>`).join("")}
    ${statues}</svg>`);
  const dur = S.t1 - S.t0;
  for (let r = 0; r < rows; r++) S.tw(`tl.fromTo("#${S.id}-row${r}",{y:0},{immediateRender:false,y:-6,duration:${r3(0.35 + (r % 3) * 0.07)},yoyo:true,repeat:${Math.floor(dur / 0.4)},ease:"sine.inOut"},${r3((r % 4) * 0.1)});`);
  // antorchas del podio con llama viva
  for (let k = 0, n = 0; k < w; k += 1100, n++) torch(S, `${S.id}-tc${seed}${n}`, x - w / 2 + k + 500, G - 470);
}
export function torch(S, id, x, y) {
  const dur = S.t1 - S.t0;
  S.add(`<div id="${id}" class="prop" style="left:${x - 40}px;top:${y - 160}px;width:80px;height:260px;z-index:2">
    <div style="position:absolute;left:-90px;top:-80px;width:260px;height:260px;border-radius:50%;background:radial-gradient(closest-side,rgba(255,170,70,.45),rgba(255,140,50,0))"></div>
    <svg width="80" height="260" viewBox="0 0 80 260" style="position:absolute;left:0;top:0"><path d="M30,110 L50,110 L44,260 L36,260Z" fill="#6b4a24" stroke="${C.ink}" stroke-width="4"/><path d="M20,110 L60,110 L54,96 L26,96Z" fill="#5b5f66" stroke="${C.ink}" stroke-width="4"/>
     <g id="${id}-f"><path d="M40,6 C18,40 22,80 40,96 C58,80 62,40 40,6Z" fill="${C.fire}" stroke="${C.ink}" stroke-width="4"/><path d="M40,40 C30,60 32,80 40,90 C48,80 50,60 40,40Z" fill="${C.fire2}"/></g></svg></div>`);
  S.tw(`tl.fromTo("#${id}-f",{scaleY:0.9,scaleX:1.05},{immediateRender:false,scaleY:1.12,scaleX:0.94,svgOrigin:"40 96",duration:0.2,yoyo:true,repeat:${Math.floor(dur / 0.2)},ease:"sine.inOut"},0);`);
}
// El público salta (gritos)
export function roar(S, t, n = 3) {
  S.cue(t, "crowd");
  for (let r = 0; r < 9; r++) S.tw(`tl.to("#${S.id}-row${r}",{y:-34,duration:0.14,yoyo:true,repeat:${n * 2 - 1},ease:"power2.out"},${r3(t + r * 0.03)});`);
}
// Fachada del Coliseo: tres pisos de arcos con columnas, estatuas en los arcos, ático con ventanas y banderolas
export function colosseum(S, x, y = G, w = 2600, h = 1300) {
  let arcs = "";
  for (let f = 0; f < 3; f++) for (let i = 0; i < 9; i++) {
    const ax = 60 + i * (w - 120) / 9, aw = (w - 120) / 9 - 40, ay = 160 + f * 340;
    arcs += `<path d="M${r3(ax)},${ay + 290} L${r3(ax)},${ay + 110} A${r3(aw / 2)},${r3(aw / 2)} 0 0 1 ${r3(ax + aw)},${ay + 110} L${r3(ax + aw)},${ay + 290}Z" fill="#4a3c30" stroke="${C.ink}" stroke-width="5"/>
      <rect x="${r3(ax - 18)}" y="${ay + 40}" width="16" height="250" fill="${RC.marble2}" stroke="${C.ink}" stroke-width="3"/>`;
    if (f > 0 && i % 2 === 0) arcs += `<path d="M${r3(ax + aw / 2 - 12)},${ay + 290} L${r3(ax + aw / 2 - 14)},${ay + 190} C${r3(ax + aw / 2 - 14)},${ay + 160} ${r3(ax + aw / 2 + 14)},${ay + 160} ${r3(ax + aw / 2 + 14)},${ay + 190} L${r3(ax + aw / 2 + 12)},${ay + 290}Z" fill="${RC.marble}" opacity=".9"/>`;
  }
  let att = "";
  for (let i = 0; i < 18; i++) att += `<rect x="${r3(80 + i * (w - 160) / 18)}" y="${86}" width="40" height="40" fill="#4a3c30" stroke="${C.ink}" stroke-width="3"/>`;
  let flags = "";
  for (let i = 0; i < 9; i++) flags += `<g id="${S.id}-cf${i}"><path d="M${r3(60 + i * (w - 120) / 8)},40 L${r3(60 + i * (w - 120) / 8)},-60" stroke="#6b4a24" stroke-width="6"/><path d="M${r3(60 + i * (w - 120) / 8)},-60 l50,12 l-50,12Z" fill="${[RC.terra, RC.purple, RC.gold][i % 3]}" stroke="${C.ink}" stroke-width="3"/></g>`;
  S.add(`<svg id="${S.id}-colo" class="prop" style="left:${x - w / 2}px;top:${y - h}px;z-index:2" width="${w}" height="${h + 80}" viewBox="0 -80 ${w} ${h + 90}" overflow="visible">
    <path d="M0,${h} L0,60 C${w * 0.3},20 ${w * 0.7},20 ${w},60 L${w},${h}Z" fill="${RC.stone}" stroke="${C.ink}" stroke-width="8"/>
    <path d="M${w * 0.62},60 L${w},60 L${w},${h} L${w * 0.7},${h}Z" fill="rgba(0,0,0,.08)"/>
    ${att}${[0, 1, 2].map((f) => `<rect x="0" y="${f * 340 + 150}" width="${w}" height="24" fill="${RC.stoneD}"/>`).join("")}${arcs}${flags}</svg>`);
  const dur = S.t1 - S.t0;
  for (let i = 0; i < 9; i++) S.tw(`tl.fromTo("#${S.id}-cf${i}",{skewY:0},{immediateRender:false,skewY:6,duration:0.5,yoyo:true,repeat:${Math.floor(dur / 0.5)},ease:"sine.inOut"},${r3(i * 0.07)});`);
}
// Túnel bajo la arena: sillares, arcos, antorchas, cadenas, armero, rejillas con luz y polvo
export function tunnel(S, x, w = 3000) {
  let blocks = "";
  for (let y = 140; y < 1500; y += 60) for (let bx = (y / 60) % 2 ? -70 : 0; bx < w; bx += 140) blocks += `<rect x="${bx}" y="${y}" width="138" height="58" fill="none" stroke="#3d3025" stroke-width="3"/>`;
  let arches = "", props = "";
  for (let i = 0; i < Math.ceil(w / 700); i++) {
    const ax = i * 700 + 60;
    arches += `<path d="M${ax},1500 L${ax},700 A300,300 0 0 1 ${ax + 600},700 L${ax + 600},1500" fill="#32271e" stroke="${C.ink}" stroke-width="8"/>`;
    props += `<path d="M${ax + 200},760 q40,60 0,120 q-40,60 0,120" stroke="#6b6f76" stroke-width="10" fill="none" stroke-dasharray="18 10"/><rect x="${ax + 380}" y="1060" width="160" height="14" fill="#6b4a24"/><path d="M${ax + 400},1060 L${ax + 400},940 M${ax + 450},1060 L${ax + 450},920 M${ax + 500},1060 L${ax + 500},950" stroke="#c9ced6" stroke-width="8" stroke-linecap="round"/>`;
  }
  S.add(`<svg class="prop" style="left:${x - w / 2}px;top:${G - 1500}px;z-index:1" width="${w}" height="1510">
    <rect width="${w}" height="1510" fill="#2a2018"/>${blocks}${arches}${props}<rect y="0" width="${w}" height="140" fill="#1a130e"/>
    ${[...Array(Math.ceil(w / 600))].map((_, i) => `<rect x="${i * 600 + 250}" y="40" width="120" height="60" fill="#d9b98a" opacity=".6"/>${[0, 1, 2, 3].map((k) => `<rect x="${i * 600 + 262 + k * 28}" y="40" width="8" height="60" fill="#1a130e"/>`).join("")}`).join("")}</svg>`);
  // haces de luz que bajan por las rejillas con polvo flotando
  S.add(`<div class="prop" style="left:${x - w / 2}px;top:${G - 1460}px;width:${w}px;height:1460px;z-index:2;background:repeating-linear-gradient(90deg,transparent 0 250px,rgba(255,226,160,.16) 250px 370px,transparent 370px 600px);-webkit-mask:linear-gradient(180deg,#000,transparent 90%);mask:linear-gradient(180deg,#000,transparent 90%)"></div>`);
  for (let k = 0, n = 0; k < w; k += 1400, n++) torch(S, `${S.id}-tt${n}`, x - w / 2 + 400 + k, G - 520);
}
// Calle de Pompeya: frescos rojos y amarillos, puerta, mostrador con tinajas, lámpara, ánforas y losas con pasaderas
export function wall(S, x, w = 2600) {
  let panels = "";
  for (let i = 0; i < Math.floor(w / 520); i++) {
    const px = i * 520 + 40;
    panels += `<rect x="${px}" y="120" width="440" height="460" fill="${i % 2 ? "#b8402a" : "#d8a640"}" stroke="#5a2a1a" stroke-width="6"/><rect x="${px + 24}" y="144" width="392" height="412" fill="none" stroke="#efe3c8" stroke-width="5"/><path d="M${px + 220},200 C${px + 190},250 ${px + 250},300 ${px + 220},350" stroke="#2f5a3a" stroke-width="8" fill="none"/>`;
  }
  const door = `<rect x="${w - 520}" y="200" width="260" height="440" fill="#5a3b22" stroke="${C.ink}" stroke-width="6"/>${[0, 1, 2].map((k) => `<path d="M${w - 520 + 40 + k * 80},200 L${w - 520 + 40 + k * 80},640" stroke="#3d2817" stroke-width="5"/>`).join("")}`;
  const counter = `<rect x="${w - 230}" y="520" width="220" height="120" fill="${RC.marble2}" stroke="${C.ink}" stroke-width="5"/>${[0, 1].map((k) => `<ellipse cx="${w - 170 + k * 100}" cy="530" rx="34" ry="14" fill="#7a3b2e" stroke="${C.ink}" stroke-width="4"/>`).join("")}`;
  let paving = "";
  for (let px = 0; px < w; px += 110) paving += `<path d="M${px},660 l100,0 l-8,40 l-96,0Z" fill="#8c8478" stroke="${C.ink}" stroke-width="3"/>`;
  S.add(`<svg class="prop" style="left:${x - w / 2}px;top:${G - 1000}px;z-index:1" width="${w}" height="1010">
    <rect width="${w}" height="1010" fill="#e8d6b5" stroke="${C.ink}" stroke-width="6"/><rect y="0" width="${w}" height="70" fill="${RC.tile}" stroke="${C.ink}" stroke-width="5"/>
    ${[...Array(Math.ceil(w / 40))].map((_, i) => `<path d="M${i * 40},70 q20,-24 40,0" fill="${RC.tile}" stroke="${C.ink}" stroke-width="3"/>`).join("")}
    ${panels}${door}${counter}<rect y="640" width="${w}" height="370" fill="#a8452f"/>${paving}
    <path d="M300,96 L300,130 M280,150 C280,130 320,130 320,150 L310,170 L290,170Z" stroke="#5b5f66" stroke-width="5" fill="#d9a72b"/></svg>`);
}

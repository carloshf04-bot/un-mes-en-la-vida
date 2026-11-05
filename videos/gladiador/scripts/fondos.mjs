// Fondos: cielo, montañas con paralaje, suelo, nieve, rodillos y transiciones entre capítulos.
import { C, r3, rng, camSet, camTo, fit } from "./lib.mjs";
export const G = 900;
// ---------- Fondos ----------
export function sky(S, { top = C.night, mid = C.night2, glow = "#c8743a", low = "#5b4a52", stars = true } = {}) {
  const { W, H } = S.fmt;
  S.bg.push(`<div class="layer" style="width:${W}px;height:${H}px;background:linear-gradient(180deg,${top} 0%,${mid} 58%,${low} 78%,${glow} 100%)"></div>`);
  if (!stars) return;
  const R = rng(7); let st = "";
  for (let i = 0; i < 70; i++) st += `<i id="${S.id}-st${i}" style="position:absolute;left:${r3(R() * W)}px;top:${r3(R() * H * 0.5)}px;width:${r3(2 + R() * 3)}px;height:${r3(2 + R() * 3)}px;border-radius:50%;background:#fff;opacity:${r3(0.3 + R() * 0.6)}"></i>`;
  S.bg.push(`<div class="layer" style="width:${W}px;height:${H}px">${st}</div>`);
  const dur = S.t1 - S.t0;
  for (let i = 0; i < 70; i += 3) {
    const c = 1.2 + (i % 5) * 0.35;
    S.tw(`tl.fromTo("#${S.id}-st${i}",{opacity:0.2},{opacity:0.9,duration:${c},yoyo:true,repeat:${Math.max(1, Math.floor(dur / c) - 1)},ease:"sine.inOut"},${r3((i % 7) * 0.2)});`);
  }
}
export function ridge(seed, w, h, rough, n) {
  const R = rng(seed); let d = `M0,${h} L0,${r3(h * 0.6)}`;
  for (let i = 1; i <= n; i++) d += ` L${r3((w / n) * i)},${r3(h * (0.15 + R() * rough))}`;
  return d + ` L${w},${h}Z`;
}
export function parallax(S, { far = "#3a4766", far2 = "#46557a", mid = "#55617f", mamC = "#3a4566" } = {}) {
  const { W, H, h } = S.fmt;
  const baseFar = h ? 520 : 1060, baseMid = h ? 700 : 1300;
  S.parallax = [[`${S.id}-far`, 0.12], [`${S.id}-mid`, 0.35]];
  S.bg.push(`<div id="${S.id}-far" class="layer" style="left:-3000px;top:${baseFar - 300}px;width:16000px;height:420px">
    <svg width="16000" height="420" viewBox="0 0 16000 420"><path d="${ridge(11, 16000, 420, 0.7, 90)}" fill="${far}"/>
    <path d="${ridge(12, 16000, 420, 0.5, 60)}" fill="${far2}" opacity=".9"/></svg></div>`);
  // colinas medias con mamuts lejanos
  let mam = "";
  for (let i = 0; i < 3; i++) mam += `<g transform="translate(${3600 + i * 150},${205 - i * 4}) scale(${0.5 - i * 0.06})"><g id="${S.id}-mam${i}">${mammoth(mamC)}</g></g>`;
  S.bg.push(`<div id="${S.id}-mid" class="layer" style="left:-3000px;top:${baseMid - 320}px;width:16000px;height:420px">
    <svg width="16000" height="420" viewBox="0 0 16000 420"><path d="${ridge(21, 16000, 420, 0.45, 50)}" fill="${mid}"/>${mam}</svg></div>`);
}
export function mammoth(fill) {
  return `<path d="M-90,0 L-86,-60 C-110,-80 -104,-140 -60,-150 C-20,-172 40,-168 70,-140 C96,-150 118,-120 112,-88 C120,-60 118,-20 104,6 C100,-20 96,-40 90,-50 L84,0 L66,0 L62,-50 L-40,-50 L-44,0 L-62,0 L-64,-46 Z" fill="${fill}"/>
  <path d="M108,-60 C130,-40 132,-10 120,8" stroke="${fill}" stroke-width="10" fill="none" stroke-linecap="round"/>`;
}
export function ground(S, { top = C.snow, bottom = "#9fb2c8", x0 = -6000 } = {}) {
  const R = rng(5); let tufts = "";
  for (let i = 0; i < 260; i++) {
    const x = x0 + i * 300 + R() * 200;
    if (R() < 0.3) { const w = 40 + R() * 60, hh = 22 + R() * 30;
      tufts += `<path d="M${r3(x - w)},${G + 10} L${r3(x - w * 0.7)},${r3(G - hh * 0.7)} L${r3(x - w * 0.1)},${r3(G - hh)} L${r3(x + w * 0.6)},${r3(G - hh * 0.6)} L${r3(x + w)},${G + 10}Z" fill="${C.rock}" stroke="${C.ink}" stroke-width="4" stroke-linejoin="round"/><path d="M${r3(x - w * 0.6)},${r3(G - hh * 0.75)} L${r3(x - w * 0.1)},${r3(G - hh - 4)} L${r3(x + w * 0.5)},${r3(G - hh * 0.65)}" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`; }
    else tufts += `<path d="M${r3(x)},${G + 4} l-8,-30 M${r3(x + 6)},${G + 4} l2,-36 M${r3(x + 12)},${G + 4} l10,-28" stroke="#9c8a5a" stroke-width="5" stroke-linecap="round"/>`;
  }
  S.add(`<svg class="prop" style="left:0;top:0;overflow:visible;z-index:2" width="1" height="1" overflow="visible">
    <defs><linearGradient id="${S.id}-gsnow" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bottom}"/></linearGradient></defs>
    <path d="M-6000,${G} C-3000,${G - 20} 0,${G + 10} 4000,${G - 8} S12000,${G + 14} 60000,${G} L60000,${G + 16000} L-6000,${G + 16000}Z" fill="url(#${S.id}-gsnow)" stroke="${C.ink}" stroke-width="5"/>
    ${tufts}</svg>`);
}
// Nieve que cae (en pantalla). Si windAt, a partir de ahí sopla fuerte.
export function snow(S, { n = 60, windAt = null, windEnd = null } = {}) {
  const { W, H } = S.fmt; const R = rng(9); let h = ""; const dur = S.t1 - S.t0;
  for (let i = 0; i < n; i++) h += `<i id="${S.id}-sn${i}" style="position:absolute;left:${r3(R() * W)}px;top:-30px;width:${r3(4 + R() * 6)}px;height:${r3(4 + R() * 6)}px;border-radius:50%;background:#fff;opacity:${r3(0.5 + R() * 0.5)}"></i>`;
  S.over.push(`<div id="${S.id}-snow" class="layer" style="width:${W}px;height:${H}px;z-index:15">${h}</div>`);
  for (let i = 0; i < n; i++) {
    const c = 4 + R() * 4, off = -R() * c, k = Math.ceil((dur - off) / c);
    S.tw(`tl.fromTo("#${S.id}-sn${i}",{y:${r3(-40 + R() * 0)},x:0},{y:${H + 60},x:${r3(-60 + R() * 120)},duration:${r3(c)},repeat:${k},ease:"none"},${r3(off)});`);
  }
  if (windAt !== null) {
    let w = "";
    for (let i = 0; i < 14; i++) w += `<i id="${S.id}-wd${i}" style="position:absolute;left:0;top:${r3(R() * H)}px;width:${r3(200 + R() * 300)}px;height:5px;border-radius:4px;background:rgba(255,255,255,.55)"></i>`;
    S.over.push(`<div id="${S.id}-wind" class="layer" style="width:${W}px;height:${H}px;z-index:15;opacity:0">${w}</div>`);
    S.tw(`tl.to("#${S.id}-wind",{opacity:1,duration:0.3},${r3(windAt)});tl.to("#${S.id}-wind",{opacity:0,duration:0.5},${r3(windEnd)});`);
    for (let i = 0; i < 14; i++) {
      const c = 0.5 + R() * 0.4;
      S.tw(`tl.fromTo("#${S.id}-wd${i}",{x:${W + 100}},{x:-700,duration:${r3(c)},repeat:${Math.ceil((windEnd - windAt) / c)},ease:"none"},${r3(windAt + R() * 0.3)});`);
    }
    S.tw(`tl.to("#${S.id}-snow",{x:-120,skewX:-14,duration:0.4},${r3(windAt)});tl.to("#${S.id}-snow",{x:0,skewX:0,duration:0.6},${r3(windEnd)});`);
  }
}

// Contador de rodillo (cada cifra es una tira de dígitos que gira)
export function reel(S, id, x, y, digits, { size = 170, color = C.bone } = {}) {
  let cols = "";
  [...digits].forEach((d, i) => {
    if (!/\d/.test(d)) { cols += `<span class="dirt" style="font-size:${size}px;line-height:${size}px;color:${color}">${d}</span>`; return; }
    let strip = ""; for (let k = 0; k < 20; k++) strip += `<div style="height:${size}px;line-height:${size}px">${k % 10}</div>`;
    cols += `<span style="display:inline-block;height:${size}px;overflow:hidden;vertical-align:top"><span id="${id}-c${i}" class="dirt" style="display:block;font-size:${size}px;color:${color}">${strip}</span></span>`;
  });
  S.add(`<div id="${id}" class="wtext" style="left:${x - 600}px;top:${y - size / 2}px;width:1200px;text-align:center;white-space:nowrap;z-index:9;text-shadow:0 8px 0 ${C.ink}">${cols}</div>`);
}
export function rollReel(S, id, digits, tStart, tEnd, size = 170) {
  S.cue(tStart, "tick");
  [...digits].forEach((d, i) => {
    if (!/\d/.test(d)) return;
    const target = 10 + parseInt(d, 10);
    const land = r3(tStart + (tEnd - tStart) * (0.55 + 0.45 * (i / digits.length)));
    S.tw(`tl.fromTo("#${id}-c${i}",{y:0,filter:"blur(0px)"},{y:${-target * size},duration:${r3(land - tStart)},ease:"power3.inOut"},${r3(tStart)});`);
    S.tw(`tl.fromTo("#${id}-c${i}",{filter:"blur(0px)"},{filter:"blur(5px)",duration:${r3((land - tStart) / 2)},yoyo:true,repeat:1,ease:"sine.inOut"},${r3(tStart)});`);
  });
}


// Paralaje más ancho para capítulos largos: el fondo se mueve poco, así que 16000 px bastan
// Entrada y salida de capítulo: barrido lateral con desenfoque (la cámara nunca corta en seco)
export function enter(S, box, { dur = 0.55 } = {}) {
  S.cue(0, "whooshBig");
  const c = fit(S.fmt, box);
  const off = S.fmt.W * 0.9;
  S.tw(`tl.set("#${S.id}-world",{x:${r3(c.x + off)},y:${c.y},scale:${c.scale}},0);`);
  for (const [sel, f] of S.parallax || []) S.tw(`tl.set("#${sel}",{x:${r3((c.x + off) * f)},y:${r3(c.y * f * 0.35)}},0);`);
  camTo(S, 0, box, { dur, ease: "power3.out" });
  S.tw(`tl.fromTo("#${S.id}-world",{filter:"blur(14px)"},{filter:"blur(0px)",duration:${dur},ease:"power2.out"},0);`);
}
export function exit(S, { dur = 0.45 } = {}) {
  const T = r3(S.t1 - S.t0 - dur), c = S.cam, off = S.fmt.W * 0.9;
  S.tw(`tl.to("#${S.id}-world",{x:${r3(c.x - off)},duration:${dur},ease:"power3.in"},${T});`);
  for (const [sel, f] of S.parallax || []) S.tw(`tl.to("#${sel}",{x:${r3((c.x - off) * f)},duration:${dur},ease:"power3.in"},${T});`);
  S.tw(`tl.fromTo("#${S.id}-world",{filter:"blur(0px)"},{filter:"blur(14px)",duration:${dur},ease:"power2.in"},${T});`);
}

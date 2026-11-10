// Escenarios de «Un mes en la vida de un vikingo» (Vestfold y Hedeby, h. 890). diseno.md, apartado 2.
// 5 capas por escenario: 1 cielo (S.bg) · 2 lejos (paralaje 0,12) · 3 medio (paralaje 0,35 + piezas del mundo)
// · 4 suelo con textura (mundo) · 5 primer plano desenfocado (S.over, paralaje 1,35). Más atrezo, luz y elementos vivos.
import { C, r3, rng } from "./lib.mjs";
import { smoke, sunRays, motes, vignette, shade } from "./gl_fondos2.mjs";
import { fire, animal, animalIdle, tent } from "./lib2.mjs";
export const G = 900;
const INK = C.ink;
const DUR = (S) => S.t1 - S.t0;
const REP = (S, d) => Math.max(1, Math.floor(DUR(S) / d));
// Las capas con paralaje se colocan según la estación del escenario (S.x0), para que no se queden sin dibujo en mundos largos
import { fit } from "./lib.mjs";
const lay = (S, f, pad = 3000) => { const x0 = S.x0 ?? 0, b = S.fmt.h ? { x: x0 - 900, y: G - 1010, w: 1800, h: 1050 } : { x: x0 - 560, y: G - 1330, w: 1120, h: 1360 }; return r3(-fit(S.fmt, b).x * f - pad); };
export const VK = { fjord: "#2f4a66", sky: "#cfe0ea", grass: "#6f8f4a", earth: "#8a6a48", oak: "#a0703c", oakD: "#7a5030", madder: "#9e3a2a", sail: "#b8643a", silver: "#dfe4ea", amber: "#d9a72b" };

// ===================== 1 · CIELO =====================
const SKY = {
  manana: ["#9fbfd8", "#e8eef0", "#f3dcae"], dia: ["#4f86b8", "#a9cbe2", "#e6eef0"], tarde: ["#4a5a8a", "#d98a5a", "#f6c27a"],
  atardecer: ["#3a3a6a", "#c9708a", "#f2b48a"], niebla: ["#b9c4cc", "#cdd5da", "#d9dfe2"], nublado: ["#6f7a84", "#8d979e", "#a9b2b8"],
  noche: ["#070b19", "#16223f", "#24324e"], teatro: ["#5a7aa8", "#9fbcd8", "#e8d8b0"],
};
// moon: null (sin luna), 0 nueva, 0.5 creciente, 1 llena, -0.5 menguante
const MOONX = { 0: 0, 0.5: -1.05, 1: -2.3, "-0.5": 1.05 };
function moonDisc(S, x, y, r, phase, day) {
  const shade = day ? "#a9c8e0" : "#141c33";
  S.bg.push(`<div class="layer" style="left:${x - r}px;top:${y - r}px;width:${2 * r}px;height:${2 * r}px;border-radius:50%;opacity:${day ? 0.7 : 1};box-shadow:0 0 ${day ? 30 : 80}px ${day ? 6 : 22}px rgba(244,236,210,${day ? 0.12 : 0.32})">
    <div style="position:absolute;inset:0;border-radius:50%;overflow:hidden;background:#f4ecd2">
      <div style="position:absolute;left:${r3(r * 0.42)}px;top:${r3(r * 0.4)}px;width:${r3(r * 0.4)}px;height:${r3(r * 0.32)}px;border-radius:50%;background:#e2d8bb"></div>
      <div style="position:absolute;left:${r3(r * 1.15)}px;top:${r3(r * 1.1)}px;width:${r3(r * 0.3)}px;height:${r3(r * 0.24)}px;border-radius:50%;background:#e2d8bb"></div>
      <div style="position:absolute;left:-2px;top:-2px;width:${2 * r + 4}px;height:${2 * r + 4}px;border-radius:50%;background:${shade};transform:translateX(${r3(MOONX[String(phase)] * r)}px)"></div></div></div>`);
}
export function nordicSky(S, kind = "dia", { moon = null, gulls = true } = {}) {
  const { W, H, h } = S.fmt, dur = DUR(S), g = SKY[kind];
  S.bg.push(`<div class="layer" style="width:${W}px;height:${H}px;background:linear-gradient(180deg,${g[0]} 0%,${g[1]} 58%,${g[2]} 100%)"></div>`);
  const sx = h ? 1480 : 780, sy = h ? 140 : 380;
  if (kind === "noche") {
    const R = rng(13); let st = "";
    for (let i = 0; i < 120; i++) st += `<i id="${S.id}-st${i}" style="position:absolute;left:${r3(R() * W)}px;top:${r3(R() * H * 0.55)}px;width:${r3(2 + R() * 3.5)}px;height:${r3(2 + R() * 3.5)}px;border-radius:50%;background:#fff;opacity:${r3(0.3 + R() * 0.6)}"></i>`;
    S.bg.push(`<div class="layer" style="width:${W}px;height:${H}px">${st}</div>`);
    for (let i = 0; i < 120; i += 4) S.tw(`tl.fromTo("#${S.id}-st${i}",{opacity:0.15},{immediateRender:false,opacity:1,duration:${r3(0.9 + (i % 6) * 0.3)},yoyo:true,repeat:${REP(S, 1)},ease:"sine.inOut"},${r3((i % 7) * 0.2)});`);
    // aurora tenue: banda verdosa que respira (cielo del norte)
    S.bg.push(`<div id="${S.id}-aur" class="layer" style="left:${-W * 0.1}px;top:${h ? 60 : 300}px;width:${W * 1.2}px;height:${h ? 260 : 380}px;background:radial-gradient(ellipse at 50% 60%,rgba(90,200,150,.16),rgba(90,200,150,0) 70%)"></div>`);
    S.tw(`tl.fromTo("#${S.id}-aur",{opacity:0.5,scaleX:1},{immediateRender:false,opacity:1,scaleX:1.1,duration:5,yoyo:true,repeat:${REP(S, 5)},ease:"sine.inOut"},0);`);
    if (moon !== null && moon !== 0) moonDisc(S, sx, sy, moon === 1 ? 92 : 74, moon, false);
    return;
  }
  const sunny = !["niebla", "nublado", "teatro"].includes(kind);
  if (sunny) {
    S.bg.push(`<div id="${S.id}-rays" class="layer" style="left:${sx - 520}px;top:${sy - 520}px;width:1040px;height:1040px;background:repeating-conic-gradient(rgba(255,240,190,.15) 0 8deg,rgba(255,240,190,0) 8deg 22deg);border-radius:50%;-webkit-mask:radial-gradient(closest-side,#000 30%,transparent 100%);mask:radial-gradient(closest-side,#000 30%,transparent 100%)"></div>`);
    S.tw(`tl.fromTo("#${S.id}-rays",{rotation:0},{rotation:${r3(dur * 2)},duration:${r3(dur)},ease:"none"},0);`);
    const warm = ["tarde", "atardecer"].includes(kind);
    S.bg.push(`<div class="layer" style="left:${sx - 80}px;top:${sy - 80}px;width:160px;height:160px;border-radius:50%;background:${warm ? "#ffcf86" : "#fff6d0"};box-shadow:0 0 80px 30px ${warm ? "rgba(255,170,90,.6)" : "rgba(255,240,180,.6)"}"></div>`);
  }
  if (moon !== null && moon !== 0) moonDisc(S, h ? 360 : 200, h ? 150 : 400, 46, moon, true);
  // nubes con volumen y sombra, a dos velocidades
  let cl = ""; const R = rng(kind.length * 7 + 3), n = kind === "nublado" ? 10 : 7;
  const top = kind === "nublado" ? "#c3c9ce" : kind === "niebla" ? "#eef1f2" : "#fff", sh = { tarde: "#e9b49a", atardecer: "#d99aa8", nublado: "#8e979e", niebla: "#c9d0d4" }[kind] || "#cfdde9";
  for (let i = 0; i < n; i++) {
    const w = 240 + R() * 260, tp = 30 + R() * (h ? 300 : 560);
    cl += `<div id="${S.id}-cl${i}" style="position:absolute;left:${r3(i * W / (n - 1) - 100 + R() * 120)}px;top:${r3(tp)}px;width:${r3(w)}px;height:${r3(w * 0.42)}px;opacity:${i % 2 ? 0.75 : 0.95}">
      <div style="position:absolute;left:0;bottom:0;width:100%;height:46%;border-radius:60px;background:${top}"></div>
      <div style="position:absolute;left:16%;bottom:22%;width:42%;height:70%;border-radius:50%;background:${top}"></div>
      <div style="position:absolute;left:46%;bottom:18%;width:34%;height:60%;border-radius:50%;background:${top}"></div>
      <div style="position:absolute;left:4%;bottom:0;width:92%;height:16%;border-radius:40px;background:${sh}"></div></div>`;
  }
  S.bg.push(`<div class="layer" style="width:${W}px;height:${H}px">${cl}</div>`);
  for (let i = 0; i < n; i++) S.tw(`tl.fromTo("#${S.id}-cl${i}",{x:0},{x:${-160 - i * 60},duration:${r3(dur)},ease:"none"},0);`);
  if (gulls && kind !== "teatro") gullsFly(S);
}
// Gaviotas: «M» blanca con las puntas negras, de una en una
function gullsFly(S) {
  const { W, h } = S.fmt, dur = DUR(S); let bd = "";
  for (let i = 0; i < 4; i++) bd += `<svg id="${S.id}-gu${i}" style="position:absolute;left:${W + 80 + i * 260}px;top:${(h ? 170 : 420) + (i % 3) * 70}px" width="56" height="26" viewBox="0 0 56 26" overflow="visible"><path d="M2,18 Q14,2 28,16 Q42,2 54,18" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M2,18 l5,-6 M54,18 l-5,-6" stroke="#1e1e24" stroke-width="5" stroke-linecap="round"/></svg>`;
  S.bg.push(`<div class="layer" style="width:${W}px;height:${S.fmt.H}px">${bd}</div>`);
  for (let i = 0; i < 4; i++) {
    const c = 11 + i * 2;
    S.tw(`tl.fromTo("#${S.id}-gu${i}",{x:0,y:0},{x:${-(W + 900)},y:${-40 + i * 25},duration:${c},repeat:${Math.ceil(dur / c)},ease:"none"},${r3(i * 1.3)});`);
    S.tw(`tl.fromTo("#${S.id}-gu${i}",{scaleY:1},{immediateRender:false,scaleY:0.35,duration:0.26,yoyo:true,repeat:${Math.floor(dur / 0.26)},ease:"sine.inOut"},${r3(i * 0.1)});`);
  }
}
// Niebla que se desliza (capa delante; fogTo la espesa o la abre)
export function fog(S, k = 0.55) {
  const W = 12000, H = 3200, x0 = (S.x0 ?? 0) - 6000;
  S.add(`<div id="${S.id}-fog" class="prop" style="left:${x0}px;top:${G - 2400}px;width:${W}px;height:${H}px;z-index:7;pointer-events:none;opacity:${k};background:repeating-linear-gradient(180deg,rgba(235,240,243,.0) 0 60px,rgba(235,240,243,.55) 60px 200px,rgba(235,240,243,.1) 200px 300px),linear-gradient(180deg,rgba(225,232,236,.5),rgba(225,232,236,.85))"></div>`);
  S.tw(`tl.fromTo("#${S.id}-fog",{x:0},{immediateRender:false,x:-600,duration:9,yoyo:true,repeat:${REP(S, 9)},ease:"sine.inOut"},0);`);
}
export function fogTo(S, t, op, d = 1.2) { S.tw(`tl.to("#${S.id}-fog",{opacity:${op},duration:${d},ease:"power1.inOut"},${r3(t)});`); }

// ===================== 2 · LEJOS (paralaje 0,12) =====================
function roundRidge(seed, w, h, base, amp, step) {
  const R = rng(seed); let d = `M0,${h} L0,${base}`, x = 0;
  while (x < w) { const nx = x + step * (0.7 + R() * 0.6); d += ` Q${r3((x + nx) / 2)},${r3(base - amp * (0.4 + R() * 0.8))} ${r3(nx)},${r3(base - amp * R() * 0.2)}`; x = nx; }
  return d + ` L${w},${h}Z`;
}
function firs(seed, w, y, n, s, fill) {
  const R = rng(seed); let f = "";
  for (let i = 0; i < n; i++) { const x = R() * w, k = s * (0.6 + R() * 0.6); f += `<path d="M${r3(x)},${y} l${r3(-16 * k)},0 l${r3(14 * k)},${r3(-30 * k)} l${r3(-10 * k)},0 l${r3(12 * k)},${r3(-28 * k)} l${r3(-8 * k)},0 l${r3(8 * k)},${r3(-26 * k)} l${r3(8 * k)},${r3(26 * k)} l${r3(-8 * k)},0 l${r3(12 * k)},${r3(28 * k)} l${r3(-10 * k)},0 l${r3(14 * k)},${r3(30 * k)}Z" fill="${fill}"/>`; }
  return f;
}
// kind: montes (fiordo), costa (rocas y pinos), llano (Schlei, Volga), hedeby (tejados y mástiles, sin muralla)
export function farLayer(S, { kind = "montes", night = false, seed = 21 } = {}) {
  const { h } = S.fmt, W0 = 16000, HH = 440;
  const col = night ? ["#2a3654", "#202b46", "#18213a"] : kind === "llano" ? ["#b9c9d2", "#a5b9a8", "#8fa88a"] : ["#a9bed2", "#7f9bb6", "#56708e"];
  let s = "";
  if (kind === "montes" || kind === "costa") {
    const amp = kind === "montes" ? 230 : 120;
    const r1 = roundRidge(seed, W0, HH, 300, amp, 900), r2 = roundRidge(seed + 1, W0, HH, 350, amp * 0.7, 700), r3_ = roundRidge(seed + 2, W0, HH, 400, amp * 0.45, 520);
    s += `<defs><clipPath id="${S.id}-snow"><rect x="0" y="0" width="${W0}" height="${kind === "montes" ? 175 : 0}"/></clipPath></defs>`;
    s += `<path d="${r1}" fill="${col[0]}"/><path d="${r1}" fill="${night ? "#4a5878" : "#f2f6f8"}" clip-path="url(#${S.id}-snow)" opacity=".95"/>`;
    s += `<path d="${r2}" fill="${col[1]}"/>${firs(seed + 3, W0, 372, 160, 0.9, night ? "#1a2238" : "#5f7a8e")}`;
    s += `<path d="${r3_}" fill="${col[2]}"/>${firs(seed + 4, W0, 418, 220, 1.2, night ? "#121a2c" : "#3f5868")}`;
  } else if (kind === "llano") {
    s += `<path d="${roundRidge(seed, W0, HH, 380, 40, 600)}" fill="${col[0]}"/><path d="${roundRidge(seed + 1, W0, HH, 405, 25, 400)}" fill="${col[1]}"/>`;
    const R = rng(seed + 5); for (let x = 100; x < W0; x += 90 + R() * 160) s += `<ellipse cx="${r3(x)}" cy="${r3(392 - R() * 10)}" rx="${r3(30 + R() * 30)}" ry="${r3(22 + R() * 18)}" fill="${night ? "#1a2238" : "#7f9a7a"}"/>`;
  } else if (kind === "hedeby") {
    s += `<path d="${roundRidge(seed, W0, HH, 380, 50, 900)}" fill="${night ? col[0] : "#b4c3cf"}"/>`;
    const R = rng(seed + 7);
    for (let x = 0; x < W0; x += 120 + R() * 90) { const w = 90 + R() * 70, hh = 40 + R() * 30, y = 420; s += `<rect x="${r3(x)}" y="${r3(y - hh)}" width="${r3(w)}" height="${r3(hh)}" fill="${night ? "#2a3048" : "#a89a86"}"/><path d="M${r3(x - 10)},${r3(y - hh)} L${r3(x + w / 2)},${r3(y - hh - 46)} L${r3(x + w + 10)},${r3(y - hh)}Z" fill="${night ? "#363a52" : "#b8a070"}"/>`; if (R() < 0.3) s += `<path d="M${r3(x + w / 2)},${r3(y - hh - 40)} L${r3(x + w / 2)},${r3(y - hh - 230)}" stroke="${night ? "#2a3048" : "#7a6a56"}" stroke-width="5"/>`; }
  }
  S.bg.push(`<div id="${S.id}-far" class="layer" style="left:${lay(S, 0.12)}px;top:${h ? 260 : 780}px;width:${W0}px;height:${HH}px"><svg width="${W0}" height="${HH}">${s}</svg></div>`);
  S.parallax = [...(S.parallax || []).filter(([q]) => q !== `${S.id}-far`), [`${S.id}-far`, 0.12]];
}

// ===================== 3a · MEDIO LEJANO (paralaje 0,35): agua del fiordo, orilla, Kaupang, islotes =====================
export function midLayer(S, { kind = "fjord", night = false, kaupang = false, skerries = false, boats = 0, seed = 31, land = null } = {}) {
  const { h } = S.fmt, W0 = 24000, HH = h ? 760 : 1100, top = h ? 520 : 1060;
  const water = night ? ["#1a2742", "#101a2e"] : kind === "sea" ? ["#4f7a98", "#2f4a66"] : ["#7fa3bb", "#3f6a8a"];
  let s = `<defs><linearGradient id="${S.id}-wg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${water[0]}"/><stop offset="1" stop-color="${water[1]}"/></linearGradient></defs>`;
  s += `<rect x="0" y="40" width="${W0}" height="${HH}" fill="url(#${S.id}-wg)"/>`;
  const R = rng(seed);
  // orilla lejana
  if (kind !== "sea") s += `<path d="${roundRidge(seed + 2, W0, 120, 46, 26, 500)}" fill="${night ? "#1c2840" : kind === "llano" ? "#7f9a6a" : "#6f8a6a"}"/>`;
  // reflejos horizontales que parpadean
  for (let i = 0; i < 100; i++) s += `<rect id="${S.id}-wr${i}" x="${r3(R() * W0)}" y="${r3(70 + R() * (HH - 120))}" width="${r3(40 + R() * 120)}" height="4" rx="2" fill="${night ? "#c9d4f0" : "#e8f2f8"}" opacity="${r3(0.25 + R() * 0.4)}"/>`;
  if (skerries) for (let x = 200; x < W0; x += 700 + R() * 900) { const w = 120 + R() * 220, y = 70 + R() * 80; s += `<path d="M${r3(x)},${r3(y)} C${r3(x + w * 0.1)},${r3(y - 40 - R() * 30)} ${r3(x + w * 0.8)},${r3(y - 50)} ${r3(x + w)},${r3(y)}Z" fill="${night ? "#2a3450" : "#9aa6ae"}" stroke="${night ? "#1a2238" : "#6f7a84"}" stroke-width="3"/><path d="M${r3(x + w * 0.3)},${r3(y - 30)} q${r3(w * 0.2)},-12 ${r3(w * 0.4)},0" stroke="#fff" stroke-width="4" opacity=".4" fill="none"/>`; }
  if (kaupang) for (let x = 600; x < W0; x += 2600) {
    for (let k = 0; k < 9; k++) { const hx = x + k * 70, hw = 56, hh = 26; s += `<rect x="${hx}" y="${46 - hh}" width="${hw}" height="${hh}" fill="${night ? "#2a3048" : "#9a8a76"}"/><path d="M${hx - 6},${46 - hh} L${hx + hw / 2},${46 - hh - 22} L${hx + hw + 6},${46 - hh}Z" fill="${night ? "#363a52" : "#6f8a5a"}"/>`; }
    for (let k = 0; k < 4; k++) s += `<path d="M${x + 60 + k * 150},62 q40,14 80,0 l-8,-10 l-64,0Z" fill="${night ? "#2a3048" : "#7a5a3a"}"/><path d="M${x + 100 + k * 150},52 L${x + 100 + k * 150},-10" stroke="${night ? "#2a3048" : "#6a5a46"}" stroke-width="3"/>`;
  }
  for (let b = 0; b < boats; b++) { const x = 900 + b * 1700 + R() * 400, y = 120 + R() * 80; s += `<path d="M${r3(x)},${r3(y)} q60,20 120,0 l-12,-14 l-96,0Z" fill="${night ? "#2a3048" : "#6b4a2e"}"/><path d="M${r3(x + 60)},${r3(y - 14)} L${r3(x + 60)},${r3(y - 90)}" stroke="#5a4632" stroke-width="3"/><path d="M${r3(x + 34)},${r3(y - 84)} L${r3(x + 86)},${r3(y - 84)} L${r3(x + 82)},${r3(y - 26)} L${r3(x + 38)},${r3(y - 26)}Z" fill="${night ? "#4a3a3a" : "#b8643a"}" opacity=".9"/>`; }
  if (land) s += `<rect x="0" y="${land}" width="${W0}" height="${HH}" fill="${land_col(night)}"/>`;
  S.bg.push(`<div id="${S.id}-mid" class="layer" style="left:${lay(S, 0.35, 5000)}px;top:${top}px;width:${W0}px;height:${HH + 40}px"><svg width="${W0}" height="${HH + 40}">${s}</svg></div>`);
  S.parallax = [...(S.parallax || []).filter(([q]) => q !== `${S.id}-mid`), [`${S.id}-mid`, 0.35]];
  for (let i = 0; i < 100; i += 3) S.tw(`tl.fromTo("#${S.id}-wr${i}",{opacity:0.1},{immediateRender:false,opacity:0.7,duration:${r3(0.8 + (i % 5) * 0.3)},yoyo:true,repeat:${REP(S, 1)},ease:"sine.inOut"},${r3((i % 6) * 0.25)});`);
  if (kaupang) for (let k = 0; k < 3; k++) smokeBg(S, `${S.id}-ks${k}`, k);
}
const land_col = (night) => (night ? "#1c2840" : "#6f8a5a");
// humo lejano de Kaupang (en el cielo, pequeño)
function smokeBg(S, id, k) {
  const { h } = S.fmt; let p = "";
  for (let i = 0; i < 4; i++) p += `<i id="${id}-${i}" style="position:absolute;left:${(h ? 300 : 120) + k * (h ? 600 : 380)}px;top:${h ? 520 : 1050}px;width:26px;height:26px;border-radius:50%;background:rgba(200,205,212,.55)"></i>`;
  S.bg.push(`<div class="layer">${p}</div>`);
  for (let i = 0; i < 4; i++) S.tw(`tl.fromTo("#${id}-${i}",{x:0,y:0,scale:0.5,opacity:0.8},{x:${20 + i * 6},y:-160,scale:2.4,opacity:0,duration:4,repeat:${REP(S, 4)},ease:"none"},${r3(i + k * 0.4)});`);
}

// ===================== 4 · SUELO =====================
const GROUND = {
  hierba: ["#7f9f52", "#6f8f4a", "#4f6b3a"], prado: ["#86a65a", "#6f8f4a", "#56733e"], noche: ["#2f4250", "#24343f", "#18242e"],
  guijarros: ["#8f8676", "#6f6658", "#4f483e"], tablones: ["#a07a52", "#8a6a48", "#6a5038"], barro: ["#7a6a52", "#5f5242", "#463c30"],
  tierra: ["#6a5440", "#56442f", "#3e3122"], tablas: ["#8a5a35", "#6b4426", "#4a2e18"], museo: ["#4a3426", "#3a281c", "#2a1c12"],
  arena: ["#c9b48a", "#a8946a", "#8a7856"],
};
export function ground(S, kind = "hierba", { x0 = -6000 } = {}) {
  const [a, b, c] = GROUND[kind], R = rng(kind.length * 13 + 5); let m = "";
  const v = !S.fmt.h, N = v ? 1100 : 560;
  for (let i = 0; i < N; i++) {
    const x = x0 + (i % 560) * 120 + R() * 100, y = G + 24 + R() * (v ? 760 : 300), t = R();
    if (kind === "hierba" || kind === "prado" || kind === "noche") {
      if (t < 0.45) m += `<path d="M${r3(x)},${r3(y)} l4,-22 M${r3(x + 8)},${r3(y)} l-2,-26 M${r3(x + 16)},${r3(y)} l6,-18" stroke="${kind === "noche" ? "#3f5868" : "#9fbf62"}" stroke-width="4" stroke-linecap="round"/>`;
      else if (t < 0.6 && kind !== "noche") m += `<circle cx="${r3(x)}" cy="${r3(y)}" r="6" fill="${["#f2e6a0", "#fff", "#c9a0d8", "#f2b48a"][i % 4]}" stroke="${INK}" stroke-width="1.5"/>`;
      else if (t < 0.75) m += `<path d="M${r3(x)},${r3(y)} l14,-10 l18,6 l-6,10Z" fill="${kind === "noche" ? "#4a5866" : "#9a948a"}" stroke="${INK}" stroke-width="2"/><path d="M${r3(x + 4)},${r3(y - 4)} l10,-6" stroke="#fff" stroke-width="2" opacity=".5"/>`;
      else m += `<ellipse cx="${r3(x)}" cy="${r3(y)}" rx="${r3(20 + R() * 30)}" ry="5" fill="${kind === "noche" ? "#1a2a34" : "#5f7f3a"}" opacity=".6"/>`;
    } else if (kind === "guijarros" || kind === "arena") {
      m += `<ellipse cx="${r3(x)}" cy="${r3(y)}" rx="${r3(8 + R() * 14)}" ry="${r3(6 + R() * 8)}" fill="${["#a89e8c", "#8a8272", "#c0b6a2", "#6f675a"][i % 4]}" stroke="${INK}" stroke-width="2"/>`;
      if (t < 0.15) m += `<path d="M${r3(x)},${r3(y + 10)} q20,-14 40,0 q20,-14 40,0" stroke="#3f6a3a" stroke-width="6" fill="none" stroke-linecap="round"/>`;
    } else if (kind === "tablones" || kind === "tablas" || kind === "museo") {
      if (i < 40) m += `<path d="M${x0},${G + 10 + i * 44} L60000,${G + 10 + i * 44}" stroke="${c}" stroke-width="5"/>`;
      m += `<path d="M${r3(x)},${G + 12 + (i % 7) * 44} l0,40" stroke="${c}" stroke-width="5"/>`;
      if (t < 0.3) m += `<circle cx="${r3(x + 30)}" cy="${r3(G + 30 + (i % 7) * 44)}" r="3.5" fill="${c}"/>`;
      if (kind === "tablones" && t > 0.85) m += `<ellipse cx="${r3(x)}" cy="${r3(y)}" rx="${r3(40 + R() * 40)}" ry="8" fill="#5f6f78" opacity=".45"/>`;
    } else if (kind === "barro" || kind === "tierra") {
      if (t < 0.4) m += `<ellipse cx="${r3(x)}" cy="${r3(y)}" rx="14" ry="7" fill="${c}" opacity=".6"/><ellipse cx="${r3(x + 34)}" cy="${r3(y + 14)}" rx="14" ry="7" fill="${c}" opacity=".6"/>`;
      else if (t < 0.6) m += `<ellipse cx="${r3(x)}" cy="${r3(y)}" rx="${r3(30 + R() * 50)}" ry="9" fill="${kind === "barro" ? "#6f8088" : "#8a7a5a"}" opacity=".5"/>`;
      else if (kind === "tierra") m += `<path d="M${r3(x)},${r3(y)} l30,-6 M${r3(x + 6)},${r3(y + 6)} l26,-12" stroke="#c9b06a" stroke-width="3" opacity=".7"/>`;
      else m += `<path d="M${r3(x)},${r3(y)} l12,-8 l14,6 l-4,8Z" fill="#7a7266" stroke="${INK}" stroke-width="2"/>`;
    }
  }
  S.add(`<svg class="prop" style="left:0;top:0;overflow:visible;z-index:2" width="1" height="1" overflow="visible">
    <defs><linearGradient id="${S.id}-gr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="0.25" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></linearGradient></defs>
    <path d="M${x0},${G} L60000,${G} L60000,${G + 16000} L${x0},${G + 16000}Z" fill="url(#${S.id}-gr)" stroke="${INK}" stroke-width="5"/>
    <rect x="${x0}" y="${G}" width="66000" height="22" fill="rgba(0,0,0,.12)"/>${m}</svg>`);
}
// Mar como suelo: bandas, crestas que avanzan, brillos y una franja de olas delante del barco (z 8)
export function sea(S, { kind = "medio", night = false, front = true } = {}) {
  const cols = night ? ["#1a2742", "#142036", "#0c1424"] : ["#3f6a8a", "#2f4a66", "#1e3248"], R = rng(5); let cr = "";
  const big = kind === "viva" ? 1.5 : kind === "calma" ? 0.5 : 1;
  for (let i = 0; i < 260; i++) { const x = -6000 + i * 240 + R() * 160, y = G + 30 + R() * 420; cr += `<path d="M${r3(x)},${r3(y)} q${r3(30 * big)},${r3(-16 * big)} ${r3(60 * big)},0 q${r3(30 * big)},${r3(-16 * big)} ${r3(60 * big)},0" stroke="${night ? "#7a8cb8" : "#e8f2f6"}" stroke-width="5" fill="none" stroke-linecap="round" opacity=".7"/>`; }
  S.add(`<svg class="prop" style="left:0;top:0;overflow:visible;z-index:2" width="1" height="1" overflow="visible">
    <defs><linearGradient id="${S.id}-sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${cols[0]}"/><stop offset="0.3" stop-color="${cols[1]}"/><stop offset="1" stop-color="${cols[2]}"/></linearGradient></defs>
    <path d="M-6000,${G} L60000,${G} L60000,${G + 16000} L-6000,${G + 16000}Z" fill="url(#${S.id}-sg)"/><g id="${S.id}-crests">${cr}</g></svg>`);
  S.tw(`tl.fromTo("#${S.id}-crests",{x:0},{immediateRender:false,x:${night ? -60 : -240},duration:4,yoyo:true,repeat:${REP(S, 4)},ease:"sine.inOut"},0);`);
  if (!front) return;
  let fw = "";
  for (let i = 0; i < 160; i++) fw += `<path d="M${-6000 + i * 420},${G + 70} q50,-${r3(36 * big)} 105,0 q55,-${r3(36 * big)} 105,0 q50,-${r3(36 * big)} 105,0 q55,-${r3(36 * big)} 105,0" fill="${cols[0]}" stroke="${night ? "#7a8cb8" : "#e8f2f6"}" stroke-width="6"/>`;
  S.add(`<svg id="${S.id}-fw" class="prop" style="left:0;top:0;overflow:visible;z-index:8" width="1" height="1" overflow="visible"><g>${fw}<rect x="-6000" y="${G + 70}" width="66000" height="900" fill="${cols[0]}"/><rect x="-6000" y="${G + 70}" width="66000" height="900" fill="url(#${S.id}-sg)" opacity=".6"/></g></svg>`);
  S.tw(`tl.fromTo("#${S.id}-fw",{x:0,y:0},{immediateRender:false,x:-105,y:${r3(8 * big)},duration:${r3(1.6 / Math.max(0.6, big))},yoyo:true,repeat:${REP(S, 1.6 / Math.max(0.6, big))},ease:"sine.inOut"},0);`);
}

// ===================== 3b · MEDIO: piezas del mundo =====================
export const birch = (x, y, s = 1, id = "") => `<g ${id ? `id="${id}"` : ""}><path d="M${x},${y} L${x + 4 * s},${y - 420 * s}" stroke="${INK}" stroke-width="${r3(26 * s)}" stroke-linecap="round"/><path d="M${x},${y} L${x + 4 * s},${y - 420 * s}" stroke="#efece4" stroke-width="${r3(18 * s)}" stroke-linecap="round"/>${[0.2, 0.38, 0.55, 0.7].map((f) => `<path d="M${r3(x - 8 * s)},${r3(y - 420 * s * f)} l${r3(14 * s)},${r3(-4 * s)}" stroke="#2a2420" stroke-width="${r3(5 * s)}"/>`).join("")}<g class="crown"><ellipse cx="${x + 4 * s}" cy="${r3(y - 450 * s)}" rx="${r3(120 * s)}" ry="${r3(150 * s)}" fill="#8fbf5a" stroke="${INK}" stroke-width="5"/><ellipse cx="${r3(x - 50 * s)}" cy="${r3(y - 380 * s)}" rx="${r3(80 * s)}" ry="${r3(90 * s)}" fill="#a6d06a" stroke="${INK}" stroke-width="4"/><ellipse cx="${r3(x + 60 * s)}" cy="${r3(y - 400 * s)}" rx="${r3(70 * s)}" ry="${r3(80 * s)}" fill="#7faf4a" stroke="${INK}" stroke-width="4"/></g></g>`;
export const firTree = (x, y, s = 1, fill = "#2f5a3a") => `<g><rect x="${r3(x - 10 * s)}" y="${r3(y - 60 * s)}" width="${r3(20 * s)}" height="${r3(60 * s)}" fill="#5a3b22"/>${[0, 1, 2, 3].map((k) => `<path d="M${r3(x - (150 - k * 30) * s)},${r3(y - (50 + k * 110) * s)} L${x},${r3(y - (230 + k * 110) * s)} L${r3(x + (150 - k * 30) * s)},${r3(y - (50 + k * 110) * s)}Z" fill="${fill}" stroke="${INK}" stroke-width="4"/>`).join("")}</g>`;
export function trees(S, id, x, w, { n = 6, night = false, seed = 3, fir = 0.3, z = 1, y = G } = {}) {
  const R = rng(seed); let t = "";
  for (let i = 0; i < n; i++) { const tx = r3(x - w / 2 + (i + 0.5) * w / n + (R() - 0.5) * 120), s = 0.9 + R() * 0.5; t += R() < fir ? firTree(tx, y, s * 1.1, night ? "#1a2a2a" : "#2f5a3a") : birch(tx, y, s, `${id}-b${i}`); }
  S.add(`<svg class="prop" style="left:0;top:0;z-index:${z};${night ? "filter:brightness(.45) saturate(.6)" : ""}" width="1" height="1" overflow="visible">${t}</svg>`);
  S.tw(`tl.fromTo('[id^="${id}-b"] .crown',{rotation:-1.5},{immediateRender:false,rotation:1.5,transformOrigin:"50% 100%",duration:2.2,yoyo:true,repeat:${REP(S, 2.2)},ease:"sine.inOut"},0);`);
}
// Cerca de varas entretejidas
export function fence(S, x, w, { z = 3, y = G, night = false } = {}) {
  let f = "";
  for (let k = 0; k <= w; k += 90) f += `<rect x="${k}" y="0" width="14" height="150" fill="#6b4a2e" stroke="${INK}" stroke-width="3"/>`;
  for (let r = 0; r < 4; r++) f += `<path d="M0,${30 + r * 28} ${[...Array(Math.ceil(w / 90))].map((_, k) => `Q${k * 90 + 45},${30 + r * 28 + (k % 2 ? 10 : -10)} ${(k + 1) * 90},${30 + r * 28}`).join(" ")}" stroke="#8a6a42" stroke-width="10" fill="none"/>`;
  S.add(`<svg class="prop" style="left:${x - w / 2}px;top:${y - 150}px;z-index:${z};${night ? "filter:brightness(.45)" : ""}" width="${w + 20}" height="160" overflow="visible">${f}</svg>`);
}
// Casa larga: paredes de tablones algo curvas (como un barco), tejado de tepe con hierba y flores, agujero del humo, puerta
export function longhouse(S, id, x, { night = false, s = 1, flowers = true, door = true, z = 2, y = G, extras = true } = {}) {
  const w = 2200, h = 760;
  let planks = ""; for (let k = 60; k < w - 60; k += 46) planks += `<path d="M${k},${k < w / 2 ? 330 - (k / w) * 40 : 330 - ((w - k) / w) * 40} L${k},${h}" stroke="#5a3b22" stroke-width="5"/>`;
  let fl = ""; const R = rng(8); for (let k = 0; k < 26; k++) { const fx = 160 + R() * (w - 320), fy = 130 + R() * 150; fl += `<g><path d="M${r3(fx)},${r3(fy + 18)} l0,-18" stroke="#3f6a2a" stroke-width="4"/><circle cx="${r3(fx)}" cy="${r3(fy)}" r="10" fill="${["#f2e6a0", "#fff", "#e08ab0", "#f2b48a", "#c9a0d8"][k % 5]}" stroke="${INK}" stroke-width="2.5"/><circle cx="${r3(fx)}" cy="${r3(fy)}" r="3.5" fill="#d9a72b"/></g>`; }
  let tufts = ""; for (let k = 40; k < w - 40; k += 38) tufts += `<path d="M${k},${70 + Math.abs(k - w / 2) * 0.05} l-6,-24 M${k + 8},${70 + Math.abs(k - w / 2) * 0.05} l4,-28 M${k + 16},${72 + Math.abs(k - w / 2) * 0.05} l10,-20" stroke="#7fa84a" stroke-width="5" stroke-linecap="round"/>`;
  const wallC = night ? "#4a3a30" : "#8a5f38", roofC = night ? "#2f4234" : "#6f8f4a";
  const dw = 180, dx = w / 2 - 300;
  S.add(`<svg id="${id}" class="prop" style="left:${r3(x - w * s / 2)}px;top:${r3(y - h * s)}px;z-index:${z}" width="${w * s}" height="${h * s}" viewBox="0 0 ${w} ${h}" overflow="visible">
    <path d="M60,${h} L40,320 C${w * 0.3},290 ${w * 0.7},290 ${w - 40},320 L${w - 60},${h}Z" fill="${wallC}" stroke="${INK}" stroke-width="8"/>${planks}
    <path d="M60,${h - 30} L${w - 60},${h - 30}" stroke="#4a3220" stroke-width="10"/>
    <path d="M-30,340 C${w * 0.2},20 ${w * 0.8},20 ${w + 30},340 C${w * 0.8},300 ${w * 0.2},300 -30,340Z" fill="${roofC}" stroke="${INK}" stroke-width="9"/>
    <path d="M0,330 C${w * 0.2},300 ${w * 0.8},300 ${w},330" stroke="${night ? "#2a2018" : "#5a4630"}" stroke-width="16" fill="none"/>${night ? "" : tufts}
    <g id="${id}-fl" style="opacity:${flowers ? 1 : 0}">${fl}</g>
    <rect x="${w / 2 + 120}" y="40" width="90" height="40" rx="10" fill="#2a1d14" stroke="${INK}" stroke-width="5"/>
    ${door ? `<rect x="${dx}" y="${h - 330}" width="${dw}" height="330" fill="${night ? "#ffb35a" : "#1e1610"}" stroke="${INK}" stroke-width="7"/><g id="${id}-door"><rect x="${dx}" y="${h - 330}" width="${dw}" height="330" fill="#6b4426" stroke="${INK}" stroke-width="6"/><path d="M${dx + 60},${h - 330} L${dx + 60},${h} M${dx + 120},${h - 330} L${dx + 120},${h}" stroke="#4a2e18" stroke-width="5"/></g>` : ""}
    <path id="${id}-curve" d="M40,320 C${w * 0.3},290 ${w * 0.7},290 ${w - 40},320 M60,${h} L40,320 M${w - 60},${h} L${w - 40},320" stroke="${VK.amber}" stroke-width="14" fill="none" opacity="0"/>
  </svg>`);
  // la puerta: abierta de día (la hoja girada), cerrada de noche hasta que se abre o se cierra
  S.tw(`tl.set("#${id}-door",{scaleX:${night ? 1 : 0.15},transformOrigin:"0% 50%"},0);`);
  if (night) S.add(`<div class="prop" style="left:${r3(x - w * s / 2 + dx * s - 120 * s)}px;top:${r3(y - 40)}px;width:${r3((dw + 240) * s)}px;height:120px;z-index:${z};background:radial-gradient(ellipse at 50% 0%,rgba(255,180,90,.55),rgba(255,180,90,0) 70%)"></div>`);
  smoke(S, `${id}-sm`, x + (w / 2 + 165 - w / 2) * s, y - (h - 40) * s, { color: night ? "rgba(120,130,150,.35)" : "rgba(170,170,175,.45)", size: 70 * s + 20, rise: 360 * s + 80, z: z });
  if (extras) {
    // granero sobre postes y pila de leña
    const gx = x + w * s / 2 + 260 * s;
    S.add(`<svg class="prop" style="left:${r3(gx - 170 * s)}px;top:${r3(y - 520 * s)}px;z-index:${z};${night ? "filter:brightness(.5)" : ""}" width="${340 * s}" height="${520 * s}" viewBox="0 0 340 520" overflow="visible">
      ${[40, 150, 260].map((px) => `<rect x="${px}" y="330" width="30" height="190" fill="#6b4a2e" stroke="${INK}" stroke-width="4"/><ellipse cx="${px + 15}" cy="330" rx="34" ry="12" fill="#8c8f96" stroke="${INK}" stroke-width="3"/>`).join("")}
      <rect x="20" y="170" width="300" height="160" fill="#8a5f38" stroke="${INK}" stroke-width="6"/>${[60, 110, 160, 210, 260].map((px) => `<path d="M${px},170 L${px},330" stroke="#5a3b22" stroke-width="4"/>`).join("")}
      <path d="M0,180 L170,40 L340,180Z" fill="${night ? "#2f4234" : "#c9a45a"}" stroke="${INK}" stroke-width="6"/><path d="M40,160 L170,60 L300,160" stroke="#a8843a" stroke-width="5" fill="none"/></svg>
      <svg class="prop" style="left:${r3(x - w * s / 2 - 420 * s)}px;top:${r3(y - 220 * s)}px;z-index:${z};${night ? "filter:brightness(.5)" : ""}" width="${380 * s}" height="${220 * s}" viewBox="0 0 380 220">${[0, 1, 2, 3].map((r) => [...Array(6 - r)].map((_, k) => `<circle cx="${40 + r * 30 + k * 60}" cy="${190 - r * 50}" r="28" fill="#a0703c" stroke="${INK}" stroke-width="4"/><circle cx="${40 + r * 30 + k * 60}" cy="${190 - r * 50}" r="12" fill="none" stroke="#7a5030" stroke-width="3"/>`).join("")).join("")}</svg>`);
  }
}
export function flowersPop(S, id, t) { S.cue(t, "pop"); S.tw(`tl.fromTo("#${id}-fl > g",{scale:0,opacity:0},{scale:1,opacity:1,transformOrigin:"50% 100%",duration:0.35,stagger:0.03,ease:"back.out(2.4)"},${r3(t)});tl.set("#${id}-fl",{opacity:1},${r3(t)});`); }
// Interior de la casa larga: pared del fondo, postes, telar con pesas, caldero, bancos con pieles, estante, tabique del establo y haz de luz
export function longhouseIn(S, id, x, w = 4200) {
  const H = 1500, y0 = G - H; let pl = "";
  for (let k = 0; k < w; k += 70) pl += `<rect x="${k}" y="0" width="66" height="${H}" fill="${k % 140 ? "#3a2a1e" : "#33251a"}"/>`;
  let posts = ""; for (let k = 300; k < w; k += 900) posts += `<rect x="${k}" y="0" width="70" height="${H}" fill="#4a3424" stroke="${INK}" stroke-width="6"/><path d="M${k - 120},140 L${k + 35},20 L${k + 190},140" stroke="#4a3424" stroke-width="30" fill="none"/>`;
  const loomX = w * 0.68, shelfX = w * 0.18;
  S.add(`<svg id="${id}" class="prop" style="left:${x - w / 2}px;top:${y0}px;z-index:1" width="${w}" height="${H}" overflow="visible">
    ${pl}<rect width="${w}" height="${H}" fill="url(#${id}-dk)"/><defs><radialGradient id="${id}-dk" cx="50%" cy="85%" r="70%"><stop offset="0" stop-color="#ff9b3d" stop-opacity=".25"/><stop offset="1" stop-color="#000" stop-opacity=".45"/></radialGradient></defs>
    ${posts}<rect x="0" y="0" width="${w}" height="120" fill="#2a1d14"/>
    <g transform="translate(${shelfX},${H - 760})"><rect x="0" y="0" width="420" height="22" fill="#6b4a2e" stroke="${INK}" stroke-width="4"/>${[30, 120, 210, 300].map((bx) => `<path d="M${bx},0 C${bx},-50 ${bx + 70},-50 ${bx + 70},0Z" fill="#a0703c" stroke="${INK}" stroke-width="4"/>`).join("")}
      <circle cx="120" cy="-220" r="80" fill="#d9a72b" stroke="${INK}" stroke-width="6"/><path d="M120,-300 A80,80 0 0 1 120,-140Z" fill="#2b2622"/><circle cx="120" cy="-220" r="20" fill="#8f979f" stroke="${INK}" stroke-width="4"/>
      <path d="M260,-300 L330,-120" stroke="#8a6232" stroke-width="12" stroke-linecap="round"/><path d="M250,-310 L250,-280 L276,-276 C286,-256 300,-246 314,-240 C318,-270 316,-300 306,-322Z" fill="#9aa3ad" stroke="${INK}" stroke-width="4"/></g>
    <g id="${id}-loom" transform="translate(${loomX},${H - 900})"><path d="M0,0 L-40,600 M300,0 L340,600" stroke="#6b4a2e" stroke-width="22" stroke-linecap="round"/><rect x="-10" y="20" width="320" height="24" fill="#6b4a2e" stroke="${INK}" stroke-width="4"/>
      <rect x="10" y="44" width="280" height="300" fill="#c9b48a" stroke="${INK}" stroke-width="3"/>${[...Array(14)].map((_, k) => `<path d="M${20 + k * 20},44 L${20 + k * 20},440" stroke="#8a7a5a" stroke-width="2"/>`).join("")}<path d="M10,100 L290,100 M10,160 L290,160 M10,220 L290,220" stroke="#3f5f7a" stroke-width="10"/>
      ${[...Array(7)].map((_, k) => `<g id="${id}-wt${k}"><path d="M${30 + k * 40},340 L${30 + k * 40},430" stroke="#8a7a5a" stroke-width="3"/><circle cx="${30 + k * 40}" cy="450" r="20" fill="#9a6a42" stroke="${INK}" stroke-width="4"/></g>`).join("")}</g>
    <g transform="translate(${w * 0.86},${H - 760})"><path d="M0,-600 L0,-200" stroke="#4a3424" stroke-width="16"/><rect x="-200" y="-200" width="400" height="200" fill="#5a4030" stroke="${INK}" stroke-width="5"/>${[...Array(9)].map((_, k) => `<path d="M${-190 + k * 46},-200 L${-190 + k * 46},0" stroke="#6b4a2e" stroke-width="12"/>`).join("")}</g>
  </svg>`);
  for (let k = 0; k < 7; k++) S.tw(`tl.fromTo("#${id}-wt${k}",{rotation:-3},{immediateRender:false,rotation:3,svgOrigin:"${30 + k * 40} 340",duration:${r3(1.4 + k * 0.1)},yoyo:true,repeat:${REP(S, 1.5)},ease:"sine.inOut"},0);`);
  // bancos de tierra con tablas y pieles a los dos lados del hogar
  S.add(`<svg class="prop" style="left:${x - w / 2}px;top:${G - 150}px;z-index:3" width="${w}" height="160" overflow="visible"><rect x="0" y="40" width="${w}" height="110" fill="#5a4030" stroke="${INK}" stroke-width="6"/><rect x="0" y="30" width="${w}" height="24" fill="#8a6232" stroke="${INK}" stroke-width="5"/>${[0.12, 0.3, 0.55, 0.8].map((f) => `<path d="M${w * f},30 C${w * f + 40},-10 ${w * f + 200},-10 ${w * f + 240},30Z" fill="#a8875e" stroke="${INK}" stroke-width="4"/><path d="M${w * f + 40},20 l20,-10 M${w * f + 120},16 l14,-12" stroke="#6b4e32" stroke-width="4"/>`).join("")}</svg>`);
  // caldero colgado de su cadena sobre el hogar
  S.add(`<svg id="${id}-pot" class="prop" style="left:${x + 210}px;top:${G - 700}px;z-index:5" width="280" height="560" overflow="visible"><path d="M140,0 L140,380" stroke="#5b5f66" stroke-width="8" stroke-dasharray="16 6"/><path d="M60,380 C60,520 220,520 220,380Z" fill="#3a3a40" stroke="${INK}" stroke-width="6"/><path d="M50,380 L230,380" stroke="#5b5f66" stroke-width="12" stroke-linecap="round"/><ellipse cx="140" cy="382" rx="80" ry="10" fill="#d9c27a"/>${[0, 1, 2].map((k) => `<circle id="${id}-bub${k}" cx="${110 + k * 30}" cy="380" r="${8 + k * 2}" fill="#efe0a0" stroke="${INK}" stroke-width="2"/>`).join("")}</svg>`);
  for (let k = 0; k < 3; k++) S.tw(`tl.fromTo("#${id}-bub${k}",{y:0,opacity:1},{immediateRender:false,y:-26,opacity:0,duration:${r3(0.6 + k * 0.15)},repeat:${REP(S, 0.7)},ease:"power1.out"},${r3(k * 0.2)});`);
  // hogar largo de piedras con fuego
  S.add(`<svg class="prop" style="left:${x - 170}px;top:${G - 70}px;z-index:5" width="1040" height="90" overflow="visible">${[...Array(13)].map((_, k) => `<ellipse cx="${40 + k * 80}" cy="50" rx="44" ry="28" fill="${k % 2 ? "#8c8f96" : "#7a7f86"}" stroke="${INK}" stroke-width="4"/>`).join("")}</svg>`);
  fire(S, `${id}-fire`, x + 130, G - 30, 0.9); fire(S, `${id}-fire2`, x + 570, G - 30, 0.75);
  // haz de luz del agujero del humo, con motas
  const { W, H: HS } = S.fmt;
  S.over.push(`<div id="${S.id}-beam" class="layer" style="width:${W}px;height:${HS}px;z-index:12;pointer-events:none;mix-blend-mode:screen;background:linear-gradient(105deg,rgba(0,0,0,0) 38%,rgba(190,215,240,.28) 44%,rgba(190,215,240,.28) 52%,rgba(0,0,0,0) 58%);-webkit-mask:linear-gradient(180deg,#000,transparent 90%);mask:linear-gradient(180deg,#000,transparent 90%)"></div>`);
  smoke(S, `${id}-sm`, x + 350, G - 300, { n: 7, color: "rgba(120,110,105,.35)", size: 80, rise: 700, z: 4 });
}
// Campo recién sembrado: surcos en diagonal, brotes (crecen con grow) y el arado de madera apoyado
export function field(S, id, x, w = 2400, { tall = false } = {}) {
  let f = ""; const R = rng(4);
  for (let k = -400; k < w; k += 70) f += `<path d="M${k},0 L${k + 380},300" stroke="#5f4630" stroke-width="22" stroke-linecap="round"/><path d="M${k + 10},0 L${k + 390},300" stroke="#8a6a48" stroke-width="8"/>`;
  let sp = ""; for (let i = 0; i < 160; i++) { const sx = R() * w, sy = 20 + R() * 260; sp += `<path d="M${r3(sx)},${r3(sy)} l-6,${tall ? -46 : -18} M${r3(sx)},${r3(sy)} l6,${tall ? -40 : -16}" stroke="#7fbf4a" stroke-width="${tall ? 6 : 5}" stroke-linecap="round"/>`; }
  S.add(`<svg class="prop" style="left:${x - w / 2}px;top:${G + 10}px;z-index:2" width="${w}" height="320" overflow="hidden"><rect width="${w}" height="320" fill="#6a5038"/>${f}<g id="${id}-sp">${sp}</g></svg>`);
  S.tw(`tl.fromTo("#${id}-sp",{skewX:-2},{immediateRender:false,skewX:2,duration:1.8,yoyo:true,repeat:${REP(S, 1.8)},ease:"sine.inOut"},0);`);
}
export function grow(S, id, t) { S.tw(`tl.fromTo("#${id}-sp",{scaleY:0.2},{scaleY:1.5,transformOrigin:"50% 100%",duration:1,ease:"back.out(1.6)"},${r3(t)});`); }
// Arroyo con piedras y una piedra plana con el peine, las pinzas, la cucharilla y un paño
export function stream(S, id, x, w = 1800) {
  S.add(`<svg class="prop" style="left:${x - w / 2}px;top:${G + 20}px;z-index:2" width="${w}" height="240" overflow="visible">
    <path d="M0,40 C${w * 0.3},10 ${w * 0.6},90 ${w},50 L${w},200 C${w * 0.6},230 ${w * 0.3},170 0,200Z" fill="#5f9ab8" stroke="${INK}" stroke-width="6"/>
    <g id="${id}-fl">${[...Array(14)].map((_, k) => `<path d="M${k * w / 14 + 20},${90 + (k % 3) * 30} q30,-10 60,0" stroke="#e8f4fa" stroke-width="5" fill="none" stroke-linecap="round"/>`).join("")}</g>
    ${[0.15, 0.4, 0.72, 0.9].map((f, k) => `<ellipse cx="${w * f}" cy="${100 + (k % 2) * 50}" rx="${40 + k * 8}" ry="22" fill="#8c8f96" stroke="${INK}" stroke-width="4"/><path d="M${w * f - 20},${92 + (k % 2) * 50} l24,-6" stroke="#fff" stroke-width="3" opacity=".6"/>`).join("")}</svg>`);
  S.tw(`tl.fromTo("#${id}-fl",{x:0},{immediateRender:false,x:60,duration:1.2,repeat:${REP(S, 1.2)},ease:"none"},0);`);
}
// Prado del thing: montículo, piedras planas y varas de avellano con cuerdas
export function thingMound(S, id, x) {
  S.add(`<svg class="prop" style="left:${x - 700}px;top:${G - 200}px;z-index:2" width="1400" height="210" overflow="visible"><path d="M0,200 C300,40 1100,40 1400,200Z" fill="#7f9f52" stroke="${INK}" stroke-width="7"/><path d="M200,150 C400,80 1000,80 1200,150" stroke="#9fbf62" stroke-width="10" fill="none"/>${[[300, 190], [520, 120], [900, 120], [1120, 190]].map(([a, b]) => `<ellipse cx="${a}" cy="${b}" rx="60" ry="20" fill="#9a948a" stroke="${INK}" stroke-width="4"/>`).join("")}</svg>`);
}
export function hazelRopes(S, id, x, w = 3200) {
  let p = ""; for (let k = 0; k <= w; k += 400) p += `<path d="M${k},210 L${k + 6},0" stroke="#7a5a32" stroke-width="12" stroke-linecap="round"/><path d="M${k - 8},20 l-16,-20 M${k + 10},40 l18,-18" stroke="#6f9a4a" stroke-width="6" stroke-linecap="round"/>`;
  S.add(`<svg class="prop" style="left:${x - w / 2}px;top:${G - 210}px;z-index:4" width="${w + 20}" height="220" overflow="visible">${p}<g id="${id}-rope">${[...Array(Math.floor(w / 400))].map((_, k) => `<path d="M${k * 400 + 6},40 Q${k * 400 + 200},90 ${k * 400 + 406},40" stroke="#d9c79a" stroke-width="7" fill="none"/>`).join("")}</g></svg>`);
  S.tw(`tl.fromTo("#${id}-rope",{y:0},{immediateRender:false,y:6,duration:1.3,yoyo:true,repeat:${REP(S, 1.3)},ease:"sine.inOut"},0);`);
}
// Filas de hombres libres en silueta con lanzas y escudos. armsUp(S,id,t) levanta las armas
export function thingCrowd(S, id, x, w = 3000, { rows = 2, z = 1, night = false } = {}) {
  const R = rng(9); let g = "";
  for (let r = 0; r < rows; r++) for (let k = 0; k < w / 150; k++) {
    const px = k * 150 + (r % 2) * 75 + R() * 30, py = 330 - r * 60, c = r ? "#5a6a5a" : "#4a5848", sk = ["#e4b48e", "#d8a47e", "#c9946e"][k % 3];
    g += `<g><rect x="${r3(px - 30)}" y="${r3(py - 150)}" width="60" height="150" rx="20" fill="${c}" stroke="${INK}" stroke-width="3"/><circle cx="${r3(px)}" cy="${r3(py - 180)}" r="30" fill="${sk}" stroke="${INK}" stroke-width="3"/><path d="M${r3(px - 30)},${r3(py - 190)} C${r3(px - 28)},${r3(py - 220)} ${r3(px + 28)},${r3(py - 220)} ${r3(px + 30)},${r3(py - 190)}" fill="${["#8a5a2a", "#c9a060", "#6b4a2a", "#3b2a1a"][k % 4]}"/>
      <g class="arm"><path d="M${r3(px + 34)},${r3(py - 40)} L${r3(px + 34)},${r3(py - 300)}" stroke="#7a5030" stroke-width="7"/><path d="M${r3(px + 34)},${r3(py - 326)} l-10,26 l20,0Z" fill="#c9ced6" stroke="${INK}" stroke-width="2"/></g>${k % 3 === 0 ? `<circle cx="${r3(px - 30)}" cy="${r3(py - 80)}" r="40" fill="${k % 2 ? VK.amber : "#2b2622"}" stroke="${INK}" stroke-width="3"/>` : ""}</g>`;
  }
  S.add(`<svg id="${id}" class="prop" style="left:${x - w / 2}px;top:${G - 340}px;z-index:${z};${night ? "filter:brightness(.5)" : ""}" width="${w}" height="350" overflow="visible">${g}</svg>`);
  S.tw(`tl.fromTo("#${id}",{y:0},{immediateRender:false,y:-4,duration:0.9,yoyo:true,repeat:${REP(S, 0.9)},ease:"sine.inOut"},0);`);
}
export function armsUp(S, id, t) { S.tw(`tl.to("#${id} .arm",{y:-90,duration:0.25,stagger:0.01,ease:"back.out(2)"},${r3(t)});`); }

// ---------- El barco de Gokstad (diseño 2.4) ----------
// Mira a la izquierda (proa a la izquierda). y = línea de flotación. Delante (z 7): casco; detrás (z 3): mástil, vela y tripulación.
// sail: "up" (hinchada), "slack" (floja), "furled" (recogida en la verga), "down" (mástil tumbado: varado)
export function gokstad(S, id, x, y, { s = 1, sail = "up", shields = false, oars = false, crew = 0, rocking = true, zb = 3, zf = 7, night = false } = {}) {
  const L = 1800, gy = (px) => r3(-236 - 64 * (px / L) ** 2);
  const hull = `M-1800,-300 C-900,-215 900,-215 1800,-300 C1700,-120 1000,40 0,50 C-1000,40 -1700,-120 -1800,-300Z`;
  let str = ""; for (let k = 1; k <= 8; k++) { const f = k / 9; str += `<path d="M${-1800 + 80 * f},${-300 + 60 * f} C-900,${r3(-215 + 255 * f)} 900,${r3(-215 + 255 * f)} ${1800 - 80 * f},${-300 + 60 * f}" stroke="#6b4426" stroke-width="7" fill="none"/>`; }
  const spiral = (sx) => `<path d="M${1760 * sx},-290 C${1880 * sx},-380 ${1960 * sx},-540 ${1975 * sx},-640 C${1990 * sx},-720 ${1900 * sx},-740 ${1880 * sx},-680 C${1870 * sx},-640 ${1905 * sx},-630 ${1920 * sx},-655" stroke="${INK}" stroke-width="58" fill="none" stroke-linecap="round"/><path d="M${1760 * sx},-290 C${1880 * sx},-380 ${1960 * sx},-540 ${1975 * sx},-640 C${1990 * sx},-720 ${1900 * sx},-740 ${1880 * sx},-680 C${1870 * sx},-640 ${1905 * sx},-630 ${1920 * sx},-655" stroke="${VK.oak}" stroke-width="44" fill="none" stroke-linecap="round"/>`;
  const holes = [...Array(16)].map((_, k) => { const px = -1350 + k * 180; return `<circle cx="${px}" cy="${gy(px) + 34}" r="11" fill="#2a1d14"/>`; }).join("");
  const sh = shields ? [...Array(16)].map((_, k) => { const px = -1380 + k * 184; return `<g id="${id}-sh${k}"><circle cx="${px}" cy="${gy(px) - 6}" r="62" fill="${k % 2 ? "#2b2622" : VK.amber}" stroke="${INK}" stroke-width="7"/><circle cx="${px}" cy="${gy(px) - 6}" r="16" fill="#8f979f" stroke="${INK}" stroke-width="4"/></g>`; }).join("") : "";
  const oarsS = [...Array(16)].map((_, k) => { const px = -1350 + k * 180; return `<g id="${id}-o${k}"><path d="M${px + 60},${gy(px) - 40} L${px - 170},${r3(gy(px) + 330)}" stroke="#b08a5a" stroke-width="16" stroke-linecap="round"/><path d="M${px - 150},${r3(gy(px) + 290)} L${px - 200},${r3(gy(px) + 400)}" stroke="#c9a06a" stroke-width="34" stroke-linecap="round"/></g>`; }).join("");
  const rudder = `<path d="M1500,-420 L1500,-240" stroke="#7a5030" stroke-width="24"/><path d="M1480,-260 L1440,80 C1450,120 1540,120 1550,80 L1530,-260Z" fill="#8a6232" stroke="${INK}" stroke-width="7"/><path d="M1500,-410 L1330,-440" stroke="#7a5030" stroke-width="14" stroke-linecap="round"/>`;
  let seams = ""; for (let k = -560; k <= 560; k += 80) seams += `<path d="M${k},-1420 L${k},-560" stroke="#8f4a26" stroke-width="7"/>`;
  const sailUp = `<g id="${id}-sail"><path d="M-640,-1420 L640,-1420 C700,-1100 690,-800 650,-560 L-650,-560 C-690,-800 -700,-1100 -640,-1420Z" fill="${VK.sail}" stroke="${INK}" stroke-width="10"/>${seams}<path d="M-640,-1420 C-560,-1100 -560,-800 -650,-560" stroke="#d98a5a" stroke-width="10" fill="none" opacity=".6"/><path d="M-650,-560 L-1100,-300 M650,-560 L1100,-300" stroke="#5a4632" stroke-width="5"/></g>`;
  const mast = sail === "down" ? `<path d="M-1200,-340 L1300,-380" stroke="#8a6232" stroke-width="40" stroke-linecap="round"/><path d="M-1200,-340 L1300,-380" stroke="${INK}" stroke-width="4" fill="none" opacity=".4"/><rect x="-500" y="-430" width="900" height="70" rx="30" fill="${VK.sail}" stroke="${INK}" stroke-width="6"/>`
    : `<path d="M0,-240 L0,-1520" stroke="${INK}" stroke-width="50"/><path d="M0,-240 L0,-1520" stroke="#8a6232" stroke-width="38"/><path d="M0,-1520 L-1500,-300 M0,-1520 L1500,-300" stroke="#5a4632" stroke-width="5"/><path d="M-700,-1440 L700,-1440" stroke="${INK}" stroke-width="40" stroke-linecap="round"/><path d="M-700,-1440 L700,-1440" stroke="#8a6232" stroke-width="28" stroke-linecap="round"/>`
      + (sail === "up" || sail === "slack" ? sailUp : `<rect x="-660" y="-1470" width="1320" height="70" rx="34" fill="${VK.sail}" stroke="${INK}" stroke-width="7"/>${[-500, -250, 0, 250, 500].map((k) => `<path d="M${k},-1470 L${k},-1400" stroke="#5a4632" stroke-width="6"/>`).join("")}`);
  let crewS = ""; for (let k = 0; k < crew; k++) { const px = -1300 + k * (2600 / Math.max(1, crew - 1)), c = ["#5f7a8c", "#8a7a5e", "#7a5a3a", "#9e3a2a"][k % 4]; crewS += `<g><rect x="${px - 40}" y="${gy(px) - 150}" width="80" height="160" rx="26" fill="${c}" stroke="${INK}" stroke-width="5"/><circle cx="${px}" cy="${gy(px) - 190}" r="40" fill="#e4b48e" stroke="${INK}" stroke-width="5"/><path d="M${px - 40},${gy(px) - 200} C${px - 38},${gy(px) - 240} ${px + 38},${gy(px) - 240} ${px + 40},${gy(px) - 200}" fill="${k % 2 ? "#7a5a3a" : "#c9a060"}" stroke="${INK}" stroke-width="4"/></g>`; }
  const cargo = `<rect x="-900" y="-330" width="120" height="110" rx="10" fill="#8a6232" stroke="${INK}" stroke-width="5"/><rect x="-760" y="-320" width="90" height="100" rx="40" fill="#b8936a" stroke="${INK}" stroke-width="5"/><path d="M800,-420 L800,-300 M760,-420 L860,-420" stroke="#7a5030" stroke-width="10"/>${[0, 1, 2].map((k) => `<path d="M${770 + k * 30},-420 l0,60" stroke="#c9b48a" stroke-width="12" stroke-linecap="round"/>`).join("")}<ellipse cx="1100" cy="-300" rx="90" ry="40" fill="#8a6a4a" stroke="${INK}" stroke-width="5"/>`;
  const W = 4300 * s, H = 1800 * s, dark = night ? "filter:brightness(.55) saturate(.7);" : "";
  const box = (z, sub, inner) => `<div id="${id}-${sub}" class="prop" style="left:${r3(x - W / 2)}px;top:${r3(y - 1650 * s)}px;width:${r3(W)}px;height:${r3(H)}px;z-index:${z};${dark}"><svg width="100%" height="100%" viewBox="-2150 -1650 4300 1800" overflow="visible">${inner}</svg></div>`;
  S.add(box(zb, "bk", `${mast}${crewS}${cargo}`));
  S.add(box(zf, "fr", `${oars ? `<g id="${id}-oars">${oarsS}</g>` : ""}<defs><clipPath id="${id}-hc"><path d="${hull}"/></clipPath></defs>${spiral(-1)}${spiral(1)}<path d="${hull}" fill="${VK.oak}" stroke="${INK}" stroke-width="10"/><g clip-path="url(#${id}-hc)">${str}<path id="${id}-tl" d="M-1800,-300 C-900,-215 900,-215 1800,-300" stroke="${VK.amber}" stroke-width="0" fill="none"/></g><path d="M-1800,-300 C-900,-215 900,-215 1800,-300" stroke="#c9a06a" stroke-width="10" fill="none"/>${holes}${rudder}${sh}`));
  if (oars) S.tw(`tl.set("#${id}-oars",{opacity:${oars === "off" ? 0 : 1}},0);`);
  if (rocking) S.tw(`tl.fromTo("#${id}-bk,#${id}-fr",{y:-5,rotation:-0.6},{immediateRender:false,y:6,rotation:0.6,transformOrigin:"50% 92%",duration:1.7,yoyo:true,repeat:${REP(S, 1.7)},ease:"sine.inOut"},0);`);
  if (sail === "up") S.tw(`tl.fromTo("#${id}-sail",{scaleX:0.95},{immediateRender:false,scaleX:1.04,svgOrigin:"0 -1000",duration:1.3,yoyo:true,repeat:${REP(S, 1.3)},ease:"sine.inOut"},0);`);
  if (sail === "slack") S.tw(`tl.set("#${id}-sail",{scaleY:0.55,scaleX:0.9,svgOrigin:"0 -1420"},0);`);
  return { id, x, y, s, deck: y - 40 * s, gy: (px) => y + gy(px) * s };
}
export function shipRow(S, ship, t0, t1) { // los remos bogan
  const n = Math.max(1, Math.floor((t1 - t0) / 0.9));
  S.tw(`tl.set("#${ship.id}-oars",{opacity:1},${r3(t0)});`);
  for (let k = 0; k < 16; k++) { const px = -1350 + k * 180, gy = r3(-236 - 64 * (px / 1800) ** 2); S.tw(`tl.fromTo("#${ship.id}-o${k}",{rotation:-14},{rotation:12,svgOrigin:"${px + 60} ${gy - 40}",duration:0.45,yoyo:true,repeat:${n * 2 - 1},ease:"sine.inOut"},${r3(t0 + k * 0.012)});`); }
}
export const sailTo = (S, ship, t, mode) => mode === "slack" ? S.tw(`tl.to("#${ship.id}-sail",{scaleY:0.55,scaleX:0.9,svgOrigin:"0 -1420",duration:0.9,ease:"bounce.out"},${r3(t)});`) : S.tw(`tl.fromTo("#${ship.id}-sail",{scaleY:0.05},{scaleY:1,svgOrigin:"0 -1420",duration:0.8,ease:"back.out(1.4)"},${r3(t)});`);
// Actor a bordo: se mece con el barco
export function aboard(S, ship, a) { S.tw(`tl.fromTo("#${a.id}",{y:-5},{immediateRender:false,y:6,duration:1.7,yoyo:true,repeat:${REP(S, 1.7)},ease:"sine.inOut"},0);`); }

// Cobertizo de barcos de piedra y tepe, abierto al agua
export function naust(S, x) {
  S.add(`<svg class="prop" style="left:${x - 900}px;top:${G - 620}px;z-index:1" width="1800" height="630" overflow="visible"><path d="M0,620 L60,250 L1740,250 L1800,620Z" fill="#8a8478" stroke="${INK}" stroke-width="7"/>${[...Array(40)].map((_, k) => `<rect x="${70 + (k % 20) * 84}" y="${280 + Math.floor(k / 20) * 160 + (k % 2) * 30}" width="70" height="50" rx="14" fill="#9a948a" stroke="${INK}" stroke-width="3"/>`).join("")}<path d="M-40,270 C300,40 1500,40 1840,270Z" fill="#6f8f4a" stroke="${INK}" stroke-width="8"/>${[...Array(30)].map((_, k) => `<path d="M${60 + k * 58},${200 - Math.sin(k / 29 * Math.PI) * 110} l-4,-26 M${70 + k * 58},${200 - Math.sin(k / 29 * Math.PI) * 110} l8,-22" stroke="#9fbf62" stroke-width="5" stroke-linecap="round"/>`).join("")}<path d="M500,620 L560,330 L1240,330 L1300,620Z" fill="#1e1610" stroke="${INK}" stroke-width="7"/></svg>`);
}
export function jetty(S, id, x, w = 2600, { night = false, z = 3 } = {}) {
  let p = ""; for (let k = 0; k <= w; k += 180) p += `<rect x="${k}" y="40" width="34" height="260" fill="#5a4030" stroke="${INK}" stroke-width="4"/>`;
  let b = ""; for (let k = 0; k < w; k += 46) b += `<rect x="${k}" y="20" width="44" height="34" fill="${k % 92 ? "#8a6a48" : "#7a5c3c"}" stroke="${INK}" stroke-width="3"/>`;
  S.add(`<svg class="prop" style="left:${x - w / 2}px;top:${G - 40}px;z-index:${z};${night ? "filter:brightness(.5)" : ""}" width="${w + 40}" height="320" overflow="visible">${p}${b}<path d="M${w * 0.3},54 q20,40 0,80 M${w * 0.7},54 q-20,40 0,80" stroke="#c9b48a" stroke-width="7" fill="none"/></svg>`);
}
// Calle de Hedeby: casas de entramado con tejado de paja, talleres (peinero, cuentero, herrero) y el arroyo entablado
export function hedebyStreet(S, id, x, w = 4400, { night = false } = {}) {
  const R = rng(12); let hs = "";
  for (let k = 0; k < w; k += 620) {
    const hw = 480 + R() * 60, hh = 300 + R() * 60, top = 520 - hh;
    hs += `<g><rect x="${k}" y="${top}" width="${hw}" height="${hh}" fill="${night ? "#5a4a3a" : "#b89a72"}" stroke="${INK}" stroke-width="6"/>${[1, 2, 3, 4].map((q) => `<path d="M${k + q * hw / 5},${top} L${k + q * hw / 5},520" stroke="#6b4a2e" stroke-width="10"/>`).join("")}<path d="M${k},${top + hh / 2} L${k + hw},${top + hh / 2}" stroke="#6b4a2e" stroke-width="8"/>
      <path d="M${k - 40},${top + 10} L${k + hw / 2},${top - 230} L${k + hw + 40},${top + 10}Z" fill="${night ? "#5a4a2a" : "#c9a45a"}" stroke="${INK}" stroke-width="7"/>${[...Array(8)].map((_, q) => `<path d="M${k + q * hw / 7},${top + 4} L${k + hw / 2},${top - 220}" stroke="#a8843a" stroke-width="3"/>`).join("")}
      <rect x="${k + hw / 2 - 60}" y="${520 - 200}" width="120" height="200" fill="${night ? "#ffb35a" : "#2a1d14"}" stroke="${INK}" stroke-width="5"/></g>`;
  }
  // talleres: astas del peinero, bandeja de cuentas, yunque
  const ws = `<g transform="translate(${w * 0.2},520)"><path d="M0,0 L0,-160 M-60,-160 L60,-160" stroke="#6b4a2e" stroke-width="12"/>${[-40, 0, 40].map((a) => `<path d="M${a},-160 C${a - 20},-220 ${a + 10},-250 ${a - 10},-300 M${a - 6},-220 l-24,-14" stroke="#e6d2b0" stroke-width="9" fill="none" stroke-linecap="round"/>`).join("")}</g>
    <g transform="translate(${w * 0.5},520)"><rect x="-120" y="-120" width="240" height="30" fill="#8a6232" stroke="${INK}" stroke-width="4"/><rect x="-100" y="-90" width="20" height="90" fill="#6b4a2e"/><rect x="80" y="-90" width="20" height="90" fill="#6b4a2e"/>${[...Array(18)].map((_, q) => `<circle id="${id}-bd${q}" cx="${-100 + q * 12}" cy="-128" r="7" fill="${["#d98a2b", "#3f8a6a", "#2f5f9a", "#e6dcc6", "#b3261e"][q % 5]}" stroke="${INK}" stroke-width="1.5"/>`).join("")}</g>
    <g transform="translate(${w * 0.8},520)"><path d="M-70,-110 L70,-110 L50,-80 L30,-80 L30,0 L-30,0 L-30,-80 L-50,-80Z" fill="#4a4a50" stroke="${INK}" stroke-width="5"/><rect x="-140" y="-60" width="70" height="60" fill="#7a3a2a" stroke="${INK}" stroke-width="4"/><circle cx="-105" cy="-70" r="24" fill="#ff9b3d" opacity=".8"/></g>`;
  S.add(`<svg class="prop" style="left:${x - w / 2}px;top:${G - 520}px;z-index:1" width="${w}" height="530" overflow="visible">${hs}${ws}</svg>`);
  for (let q = 0; q < 18; q += 3) S.tw(`tl.fromTo("#${id}-bd${q}",{opacity:0.6},{immediateRender:false,opacity:1,scale:1.3,transformOrigin:"50% 50%",duration:0.5,yoyo:true,repeat:${REP(S, 0.5)},ease:"sine.inOut"},${r3(q * 0.1)});`);
  // arroyo entablado delante de las casas
  S.add(`<svg class="prop" style="left:${x - w / 2}px;top:${G + 150}px;z-index:2" width="${w}" height="130" overflow="visible"><rect x="0" y="10" width="${w}" height="110" fill="#4f7a98" stroke="${INK}" stroke-width="5"/><rect x="0" y="0" width="${w}" height="20" fill="#7a5c3c" stroke="${INK}" stroke-width="4"/><rect x="0" y="110" width="${w}" height="20" fill="#7a5c3c" stroke="${INK}" stroke-width="4"/><g id="${id}-cw">${[...Array(Math.floor(w / 160))].map((_, k) => `<path d="M${k * 160 + 20},${55 + (k % 2) * 25} q30,-10 60,0" stroke="#dfeef6" stroke-width="5" fill="none"/>`).join("")}</g></svg>`);
  S.tw(`tl.fromTo("#${id}-cw",{x:0},{immediateRender:false,x:80,duration:1.4,repeat:${REP(S, 1.4)},ease:"none"},0);`);
  smoke(S, `${id}-s1`, x - w * 0.3, G - 760, { size: 70, rise: 420, color: "rgba(150,145,140,.45)" });
  smoke(S, `${id}-s2`, x + w * 0.3, G - 740, { size: 70, rise: 420, color: "rgba(150,145,140,.45)" });
  // chispas del herrero, en bucle
  let sp = ""; for (let k = 0; k < 8; k++) sp += `<i id="${id}-sk${k}" style="position:absolute;left:${x - w / 2 + w * 0.8 - 105}px;top:${G - 100}px;width:8px;height:8px;border-radius:50%;background:#ffd36b"></i>`;
  S.add(`<div class="prop" style="left:0;top:0;z-index:3">${sp}</div>`);
  for (let k = 0; k < 8; k++) S.tw(`tl.fromTo("#${id}-sk${k}",{x:0,y:0,opacity:1},{x:${-60 + k * 16},y:${-80 - (k % 3) * 30},opacity:0,duration:0.6,repeat:${REP(S, 0.75)},repeatDelay:0.15,ease:"power2.out"},${r3(k * 0.07)});`);
}
// Puestos con toldo de lana
export function stalls(S, id, x, { n = 3, z = 3 } = {}) {
  let st = "";
  for (let k = 0; k < n; k++) {
    const sx = k * 560, c = ["#9e3a2a", "#3f5f7a", "#c9a45a"][k % 3];
    st += `<g><rect x="${sx + 20}" y="120" width="16" height="280" fill="#6b4a2e"/><rect x="${sx + 444}" y="120" width="16" height="280" fill="#6b4a2e"/><g id="${id}-aw${k}"><path d="M${sx},120 L${sx + 480},120 L${sx + 470},180 ${[...Array(8)].map((_, q) => `Q${sx + 450 - q * 60 - 30},210 ${sx + 450 - (q + 1) * 60},180`).join(" ")}Z" fill="${c}" stroke="${INK}" stroke-width="5"/></g>
      <rect x="${sx + 10}" y="300" width="460" height="30" fill="#8a6232" stroke="${INK}" stroke-width="4"/>
      ${k % 3 === 0 ? `<path d="M${sx + 40},300 C${sx + 60},250 ${sx + 160},250 ${sx + 180},300Z" fill="#8a6a4a" stroke="${INK}" stroke-width="3"/><path d="M${sx + 200},300 C${sx + 220},240 ${sx + 330},240 ${sx + 350},300Z" fill="#c9b48a" stroke="${INK}" stroke-width="3"/>` : k % 3 === 1 ? [...Array(6)].map((_, q) => `<path d="M${sx + 40 + q * 70},300 L${sx + 50 + q * 70},250 L${sx + 90 + q * 70},250 L${sx + 100 + q * 70},300Z" fill="#a8946a" stroke="${INK}" stroke-width="3"/>`).join("") : `<path d="M${sx + 60},300 C${sx + 40},250 ${sx + 120},230 ${sx + 120},300Z" fill="#c9c1b0" stroke="${INK}" stroke-width="3"/><rect x="${sx + 200}" y="270" width="140" height="30" rx="6" fill="#8c8f96" stroke="${INK}" stroke-width="3"/>`}</g>`;
  }
  S.add(`<svg class="prop" style="left:${x - n * 280}px;top:${G - 400}px;z-index:${z}" width="${n * 560}" height="410" overflow="visible">${st}</svg>`);
  for (let k = 0; k < n; k++) S.tw(`tl.fromTo("#${id}-aw${k}",{skewX:0},{immediateRender:false,skewX:3,transformOrigin:"50% 0%",duration:1.1,yoyo:true,repeat:${REP(S, 1.1)},ease:"sine.inOut"},${r3(k * 0.3)});`);
}
// Iglesia pequeña de madera (Ansgario, en sepia)
export function church(S, x) {
  S.add(`<svg class="prop" style="left:${x - 300}px;top:${G - 760}px;z-index:2" width="600" height="770" overflow="visible"><rect x="60" y="360" width="480" height="400" fill="#8a6a48" stroke="${INK}" stroke-width="7"/>${[...Array(9)].map((_, k) => `<path d="M${110 + k * 50},360 L${110 + k * 50},760" stroke="#5a3b22" stroke-width="5"/>`).join("")}<path d="M20,370 L300,150 L580,370Z" fill="#6b4a2e" stroke="${INK}" stroke-width="7"/><rect x="250" y="560" width="100" height="200" fill="#2a1d14" stroke="${INK}" stroke-width="5"/><path d="M300,150 L300,20 M260,60 L340,60" stroke="#6b4a2e" stroke-width="18" stroke-linecap="round"/></svg>`);
}
// Casas grandes de madera de los rus en el Volga, con barcas
export function volgaHouses(S, x, w = 3600) {
  let h = ""; for (let k = 0; k < w; k += 900) h += `<g><rect x="${k}" y="200" width="700" height="320" fill="#7a5a3a" stroke="${INK}" stroke-width="6"/>${[...Array(8)].map((_, q) => `<path d="M${k},${230 + q * 38} L${k + 700},${230 + q * 38}" stroke="#5a3b22" stroke-width="5"/>`).join("")}<path d="M${k - 40},210 L${k + 350},20 L${k + 740},210Z" fill="#6b4a2e" stroke="${INK}" stroke-width="6"/><rect x="${k + 300}" y="380" width="100" height="140" fill="#2a1d14"/></g>`;
  S.add(`<svg class="prop" style="left:${x - w / 2}px;top:${G - 520}px;z-index:1" width="${w}" height="530" overflow="visible">${h}</svg>`);
  smoke(S, `${S.id}-vs`, x - 300, G - 560, { size: 70, rise: 380 });
}
// Escenario de ópera de 1876: telón que se abre, candilejas y decorado pintado
export function operaStage(S, id, x, w = 3600) {
  S.add(`<svg class="prop" style="left:${x - w / 2}px;top:${G - 1500}px;z-index:1" width="${w}" height="1510" overflow="visible"><rect width="${w}" height="1500" fill="#6a8ab0"/><path d="M0,1100 C400,700 900,800 1300,1000 C1700,700 2400,650 ${w},1050 L${w},1500 L0,1500Z" fill="#8a7a6a" stroke="${INK}" stroke-width="6"/><path d="M${w * 0.62},1500 L${w * 0.62},700" stroke="#5a3b22" stroke-width="60"/><ellipse cx="${w * 0.62}" cy="620" rx="380" ry="260" fill="#5f8a4a" stroke="${INK}" stroke-width="6"/>${[0, 1, 2].map((k) => `<ellipse cx="${400 + k * 900}" cy="${200 + k * 60}" rx="220" ry="70" fill="#e8eef4" stroke="${INK}" stroke-width="4"/>`).join("")}</svg>
    <div id="${id}-cL" class="prop" style="left:${x - w / 2}px;top:${G - 1500}px;width:${w / 2}px;height:1500px;z-index:6;background:repeating-linear-gradient(90deg,#8a1e1a 0 80px,#a82a22 80px 140px);border-right:8px solid ${INK}"></div>
    <div id="${id}-cR" class="prop" style="left:${x}px;top:${G - 1500}px;width:${w / 2}px;height:1500px;z-index:6;background:repeating-linear-gradient(90deg,#a82a22 0 60px,#8a1e1a 60px 140px);border-left:8px solid ${INK}"></div>
    <div class="prop" style="left:${x - w / 2}px;top:${G - 1560}px;width:${w}px;height:160px;z-index:7;background:#7a1a16;border-bottom:16px solid ${VK.amber}"></div>`);
  let fl = ""; for (let k = 0; k < w / 200; k++) fl += `<circle id="${id}-fl${k}" cx="${k * 200 + 100}" cy="30" r="18" fill="#ffe08a" stroke="${INK}" stroke-width="3"/>`;
  S.add(`<svg class="prop" style="left:${x - w / 2}px;top:${G + 10}px;z-index:7" width="${w}" height="80" overflow="visible"><rect y="40" width="${w}" height="40" fill="#3a2414" stroke="${INK}" stroke-width="4"/>${fl}</svg>`);
  S.add(`<div class="prop" style="left:${x - w / 2}px;top:${G - 500}px;width:${w}px;height:540px;z-index:5;background:linear-gradient(0deg,rgba(255,220,120,.4),rgba(255,220,120,0));pointer-events:none"></div>`);
  for (let k = 0; k < w / 200; k += 2) S.tw(`tl.fromTo("#${id}-fl${k}",{opacity:0.6},{immediateRender:false,opacity:1,duration:0.3,yoyo:true,repeat:${REP(S, 0.3)}},${r3(k * 0.05)});`);
}
export function curtainOpen(S, id, t) { S.cue(t, "whoosh"); S.tw(`tl.to("#${id}-cL",{scaleX:0.12,transformOrigin:"0% 50%",duration:1.1,ease:"power2.inOut"},${r3(t)});tl.to("#${id}-cR",{scaleX:0.12,transformOrigin:"100% 50%",duration:1.1,ease:"power2.inOut"},${r3(t)});`); }
// Sala de museo: pared con degradado, foco, vitrinas lejanas, vitrina principal con su objeto y cartela
export function museumRoom(S, id, x, w = 4200) {
  S.add(`<svg class="prop" style="left:${x - w / 2}px;top:${G - 1700}px;z-index:1" width="${w}" height="1710" overflow="visible"><defs><linearGradient id="${id}-wg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#232a38"/><stop offset="1" stop-color="#4a5568"/></linearGradient></defs><rect y="-1200" width="${w}" height="2900" fill="url(#${id}-wg)"/><rect y="-1200" width="${w}" height="140" fill="#1c2230"/>${[...Array(Math.floor(w / 900))].map((_, k) => `<rect x="${k * 900 + 300}" y="-1060" width="40" height="200" fill="#2a3140"/><path d="M${k * 900 + 260},-860 l120,0 l-30,60 l-60,0Z" fill="#c9ced6" stroke="${INK}" stroke-width="4"/>`).join("")}${[...Array(Math.floor(w / 600))].map((_, k) => `<rect x="${k * 600 + 120}" y="1180" width="260" height="380" fill="#5a6578" stroke="#3a4458" stroke-width="6" opacity=".7"/><rect x="${k * 600 + 150}" y="1020" width="200" height="160" fill="rgba(200,220,235,.25)" stroke="#6a7588" stroke-width="5"/>`).join("")}<rect x="0" y="1560" width="${w}" height="140" fill="#3a4250"/><rect x="${w * 0.08}" y="300" width="380" height="120" fill="#e6e8ec" stroke="${INK}" stroke-width="4"/><text x="${w * 0.08 + 190}" y="378" text-anchor="middle" font-family="Inter" font-weight="900" font-size="54" fill="#2a3140">SALA 3</text><path d="M${w * 0.75},420 l120,0 l-30,-30 M${w * 0.75 + 120},420 l-30,30" stroke="#e6e8ec" stroke-width="14" fill="none"/><rect x="${w * 0.7}" y="1460" width="420" height="40" fill="#6b4a2e" stroke="${INK}" stroke-width="4"/><rect x="${w * 0.71}" y="1500" width="30" height="60" fill="#4a3426"/><rect x="${w * 0.7 + 380}" y="1500" width="30" height="60" fill="#4a3426"/></svg>`);
  S.over.push(`<div class="layer" style="width:${S.fmt.W}px;height:${S.fmt.H}px;z-index:12;pointer-events:none;background:radial-gradient(ellipse 40% 70% at 50% 0%,rgba(220,235,255,.22),rgba(0,0,0,0) 70%)"></div>`);
}
// Vitrina con peana; kind: veksoe | gjermundbu | craneo | viborg | grilletes
export function museumCase(S, id, x, kind, lbl, { z = 4, s = S.fmt.h ? 1 : 0.8 } = {}) {
  const obj = {
    veksoe: `<g transform="translate(160,250)">${[-90, 90].map((dx) => `<g transform="translate(${dx},0)"><path d="M-60,0 C-62,-70 62,-70 60,0Z" fill="#b08a36" stroke="${INK}" stroke-width="5"/><path d="M-50,-30 C-110,-60 -120,-130 -90,-170 M50,-30 C110,-60 120,-130 90,-170" stroke="#b08a36" stroke-width="16" fill="none" stroke-linecap="round"/><circle cx="-14" cy="-26" r="10" fill="${INK}"/><circle cx="14" cy="-26" r="10" fill="${INK}"/></g>`).join("")}</g>`,
    gjermundbu: `<g id="${id}-obj" transform="translate(160,330) scale(1.3)"><path d="M-80,0 C-84,-110 84,-116 80,0Z" fill="#8f979f" stroke="${INK}" stroke-width="6"/><path d="M0,-110 L0,0 M-82,-34 L82,-34" stroke="#6b7178" stroke-width="10"/><g id="${id}-gf"><path d="M-46,4 C-52,34 -30,52 -8,42 L0,10 L8,42 C30,52 52,34 46,4Z" fill="none" stroke="#6b7178" stroke-width="10" stroke-linejoin="round"/></g></g>`,
    craneo: `<g transform="translate(160,320)"><path d="M-80,-40 C-90,-160 90,-160 80,-40 C80,0 60,10 50,30 L-50,30 C-60,10 -80,0 -80,-40Z" fill="#e6dcc6" stroke="${INK}" stroke-width="6"/><ellipse cx="-34" cy="-50" rx="22" ry="26" fill="#3a2a20"/><ellipse cx="34" cy="-50" rx="22" ry="26" fill="#3a2a20"/><path d="M0,-20 l-10,24 l20,0Z" fill="#3a2a20"/><g id="${id}-teeth">${[-36, -18, 0, 18, 36].map((dx) => `<rect x="${dx - 8}" y="30" width="16" height="26" rx="3" fill="#f4ecd8" stroke="${INK}" stroke-width="3"/><path d="M${dx - 5},36 l10,0 M${dx - 5},44 l10,0" stroke="#9e3a2a" stroke-width="2.5"/>`).join("")}</g></g>`,
    viborg: `<g transform="translate(160,330)"><rect x="-60" y="-160" width="120" height="170" rx="20" fill="rgba(200,225,235,.45)" stroke="${INK}" stroke-width="5"/><rect x="-56" y="-80" width="112" height="86" rx="14" fill="#6a5038"/><rect x="-40" y="-190" width="80" height="34" rx="6" fill="#8a6232" stroke="${INK}" stroke-width="4"/><circle cx="100" cy="-20" r="40" fill="rgba(200,225,235,.4)" stroke="${INK}" stroke-width="6"/><path d="M128,8 L170,50" stroke="#6b4a2e" stroke-width="14" stroke-linecap="round"/></g>`,
    grilletes: `<g transform="translate(160,320)"><ellipse cx="-50" cy="-40" rx="40" ry="30" fill="none" stroke="#5b5f66" stroke-width="14"/><ellipse cx="50" cy="-40" rx="40" ry="30" fill="none" stroke="#5b5f66" stroke-width="14"/><path d="M-10,-40 q10,20 20,0" stroke="#6b6f76" stroke-width="10" fill="none"/></g>`,
  }[kind];
  S.add(`<svg id="${id}" class="prop" style="left:${r3(x - 160 * s)}px;top:${r3(G - 900 * s)}px;z-index:${z}" width="${r3(320 * s)}" height="${r3(910 * s)}" viewBox="0 0 320 910" overflow="visible">
    <rect x="20" y="460" width="280" height="440" fill="#d8dbe0" stroke="${INK}" stroke-width="6"/><rect x="0" y="440" width="320" height="30" fill="#c0c4cc" stroke="${INK}" stroke-width="5"/>
    ${obj}<rect x="10" y="80" width="300" height="360" fill="rgba(200,225,240,.18)" stroke="#e8f2f8" stroke-width="6"/>
    <rect id="${id}-gl" x="20" y="80" width="40" height="360" fill="rgba(255,255,255,.35)" transform="skewX(-12)"/>
    <rect x="20" y="556" width="280" height="122" fill="#f4f1ea" stroke="${INK}" stroke-width="4"/>${String(lbl).split("<br>").map((l, i) => `<text x="160" y="${604 + i * 48}" text-anchor="middle" font-family="Inter" font-weight="900" font-size="${l.length > 9 ? 31 : 40}" fill="#2a3140">${l}</text>`).join("")}</svg>`);
  S.tw(`tl.fromTo("#${id}-gl",{x:0},{immediateRender:false,x:260,duration:2.4,repeat:${REP(S, 3)},repeatDelay:0.6,ease:"power1.inOut"},0.4);`);
}
// Túmulo con hierba; cutTo() abre el corte con el barco dentro; closeTo() lo tapa
export function mound(S, id, x) {
  S.add(`<svg class="prop" style="left:${x - 1100}px;top:${G - 520}px;z-index:2" width="2200" height="530" overflow="visible"><path d="M0,520 C300,40 1900,40 2200,520Z" fill="#7f9f52" stroke="${INK}" stroke-width="8"/>${[...Array(40)].map((_, k) => `<path d="M${60 + k * 52},${520 - Math.sin(k / 39 * Math.PI) * 460} l-4,-24 M${70 + k * 52},${520 - Math.sin(k / 39 * Math.PI) * 460} l8,-20" stroke="#9fbf62" stroke-width="5"/>`).join("")}
    <g id="${id}-cut" opacity="0"><path d="M200,520 C450,180 1750,180 2000,520Z" fill="#6a5038" stroke="${INK}" stroke-width="6"/><path d="M380,470 C700,420 1500,420 1820,470 C1700,520 500,520 380,470Z M380,470 L320,330 M1820,470 L1880,330" fill="${VK.oak}" stroke="${INK}" stroke-width="8"/><path d="M820,300 L1380,300 L1380,440 L820,440Z" fill="#5a4030" stroke="${INK}" stroke-width="6"/><path d="M820,300 L1100,220 L1380,300" fill="#4a3426" stroke="${INK}" stroke-width="6"/></g>
    <g id="${id}-top" opacity="0"><path d="M200,520 C450,180 1750,180 2000,520Z" fill="#8a6a48" stroke="${INK}" stroke-width="6"/></g></svg>`);
}
// Pavo real que abre la cola
export function peacock(S, id, x, y = G, s = 1.6) {
  const fan = [...Array(13)].map((_, k) => { const a = -170 + k * 13.3; return `<g transform="rotate(${a} 0 0)"><path d="M0,0 L230,0" stroke="#3f8a6a" stroke-width="20"/><ellipse cx="230" cy="0" rx="34" ry="24" fill="#2f6a8a" stroke="${INK}" stroke-width="3"/><circle cx="234" cy="0" r="11" fill="#d9a72b"/></g>`; }).join("");
  S.add(`<svg id="${id}" class="prop" style="left:${x - 260 * s}px;top:${y - 400 * s}px;z-index:6;opacity:0" width="${520 * s}" height="${430 * s}" viewBox="-260 -400 520 430" overflow="visible"><g id="${id}-fan" transform="translate(0,-120)">${fan}</g><path d="M-40,-60 C-60,-150 0,-180 20,-140 C30,-200 60,-230 70,-210 C80,-180 60,-150 40,-120 C60,-80 40,-30 0,-30Z" fill="#2f5f9a" stroke="${INK}" stroke-width="5"/><circle cx="62" cy="-205" r="5" fill="#fff"/><path d="M70,-212 L90,-206 L70,-200Z" fill="#d9a72b"/><path d="M58,-226 l-6,-24 M64,-228 l2,-24 M70,-226 l8,-22" stroke="#2f5f9a" stroke-width="3"/><path d="M-10,-30 L-14,10 M14,-30 L18,10" stroke="#8a6232" stroke-width="6"/></svg>`);
}
export function fanOpen(S, id, t) { S.tw(`tl.fromTo("#${id}-fan",{scale:0.1,opacity:0},{scale:1,opacity:1,svgOrigin:"0 -120",duration:0.6,ease:"back.out(1.6)"},${r3(t)});`); }

// ===================== 5 · PRIMER PLANO (paralaje 1,35, desenfocado) =====================
const FG = {
  fern: [300, 220, `${[-50, -28, -10, 10, 28, 50].map((a, k) => `<g transform="rotate(${a} 150 220)"><path d="M150,220 C140,150 150,80 150,${10 + (k % 2) * 30}" stroke="#3f6a2a" stroke-width="8" fill="none"/>${[0, 1, 2, 3, 4].map((q) => `<path d="M150,${190 - q * 34} q-${34 - q * 5},-6 -${48 - q * 7},-24 q${26 - q * 3},-2 ${48 - q * 7},18Z M150,${190 - q * 34} q${34 - q * 5},-6 ${48 - q * 7},-24 q-${26 - q * 3},-2 -${48 - q * 7},18Z" fill="#5f8a3a" stroke="${INK}" stroke-width="2.5"/>`).join("")}</g>`).join("")}`],
  mossRock: [340, 180, `<path d="M10,180 C0,100 60,40 160,40 C260,30 330,90 330,180Z" fill="#7a7f86" stroke="${INK}" stroke-width="7"/><path d="M40,90 C100,40 220,30 300,80 C240,70 120,70 40,90Z" fill="#5f8a3a"/><path d="M80,70 q40,-20 80,-10" stroke="#fff" stroke-width="6" opacity=".4" fill="none"/>`],
  reeds: [220, 380, `${[...Array(9)].map((_, k) => `<path d="M${20 + k * 22},380 C${20 + k * 22},250 ${10 + k * 26},120 ${30 + k * 20},${20 + (k % 3) * 30}" stroke="#7a8a4a" stroke-width="8" fill="none"/>${k % 3 === 0 ? `<rect x="${24 + k * 21}" y="${60 + (k % 2) * 30}" width="14" height="60" rx="7" fill="#6b4a2e"/>` : ""}`).join("")}`],
  barrel: [180, 230, `<path d="M20,10 C0,80 0,150 20,220 L160,220 C180,150 180,80 160,10Z" fill="#8a6232" stroke="${INK}" stroke-width="7"/><path d="M8,60 L172,60 M4,170 L176,170" stroke="#5b5f66" stroke-width="12"/><path d="M60,10 L56,220 M120,10 L124,220" stroke="#6b4a2e" stroke-width="5"/>`],
  rope: [260, 120, `<ellipse cx="130" cy="80" rx="120" ry="38" fill="#c9b48a" stroke="${INK}" stroke-width="6"/><ellipse cx="130" cy="74" rx="80" ry="22" fill="none" stroke="#a8946a" stroke-width="8"/><ellipse cx="130" cy="70" rx="40" ry="10" fill="#8a7a5a"/>`],
  post: [120, 700, `<rect x="30" y="0" width="60" height="700" fill="#6b4a2e" stroke="${INK}" stroke-width="7"/><path d="M40,100 L80,120 M40,300 L80,320 M40,500 L80,520" stroke="#4a3220" stroke-width="6"/>`],
  birchTrunk: [140, 900, `<rect x="40" y="0" width="60" height="900" fill="#efece4" stroke="${INK}" stroke-width="7"/>${[80, 220, 380, 520, 700].map((y) => `<path d="M40,${y} l30,-6" stroke="#2a2420" stroke-width="9"/>`).join("")}`],
  thistle: [200, 300, `<path d="M100,300 L100,90 M100,180 L40,120 M100,150 L160,100" stroke="#5f7a3a" stroke-width="9"/><circle cx="100" cy="70" r="28" fill="#9a6ab8" stroke="${INK}" stroke-width="4"/><circle cx="40" cy="104" r="20" fill="#9a6ab8" stroke="${INK}" stroke-width="4"/><circle cx="160" cy="86" r="22" fill="#9a6ab8" stroke="${INK}" stroke-width="4"/>`],
  foam: [420, 140, `<path d="M0,140 C40,40 120,40 160,90 C200,20 300,30 330,90 C370,50 420,80 420,140Z" fill="#e8f2f6" stroke="#b9d0dc" stroke-width="6"/>`],
  gunwale: [900, 200, `<path d="M0,200 C200,120 700,110 900,140 L900,200Z" fill="${VK.oak}" stroke="${INK}" stroke-width="8"/><path d="M0,190 C200,130 700,120 900,150" stroke="#c9a06a" stroke-width="10" fill="none"/>`],
  heads: [600, 240, `${[0, 1, 2].map((k) => `<ellipse cx="${100 + k * 200}" cy="${150 + (k % 2) * 20}" rx="80" ry="96" fill="#1e1a24"/><rect x="${30 + k * 200}" y="${200 + (k % 2) * 20}" width="140" height="80" rx="30" fill="#1e1a24"/>`).join("")}`],
  cordon: [700, 300, `<rect x="40" y="60" width="26" height="240" fill="#b08a36" stroke="${INK}" stroke-width="4"/><rect x="640" y="60" width="26" height="240" fill="#b08a36" stroke="${INK}" stroke-width="4"/><path d="M53,80 Q350,190 653,80" stroke="#9e3a2a" stroke-width="18" fill="none"/>`],
  embers: [300, 160, `<path d="M20,160 L280,160 L250,110 L60,110Z" fill="#3a2a20" stroke="${INK}" stroke-width="5"/>${[60, 120, 180, 230].map((x, k) => `<circle cx="${x}" cy="${120 - (k % 2) * 10}" r="16" fill="#ff9b3d" stroke="${INK}" stroke-width="3"/>`).join("")}`],
  oarLean: [200, 700, `<path d="M40,700 L160,40" stroke="#b08a5a" stroke-width="18" stroke-linecap="round"/><path d="M150,80 L190,-60 C200,-90 170,-100 160,-70 L120,60Z" fill="#c9a06a" stroke="${INK}" stroke-width="5"/>`],
  basket: [200, 150, `<path d="M10,40 L190,40 L170,150 L30,150Z" fill="#b98a4e" stroke="${INK}" stroke-width="6"/><path d="M14,75 L186,75 M20,110 L180,110" stroke="#8a6232" stroke-width="6"/>${[...Array(8)].map((_, k) => `<circle cx="${40 + k * 18}" cy="34" r="9" fill="${["#d98a2b", "#3f8a6a", "#2f5f9a", "#e6dcc6"][k % 4]}" stroke="${INK}" stroke-width="2"/>`).join("")}`],
};
export function fg(S, list = ["fern", "mossRock"], { blur = 3, k0 = 1.6 } = {}) {
  const { H, h } = S.fmt, R = rng(41), kk = h ? 1 : 1.25; let f = "";
  for (let x = 160, i = 0; x < 60000; x += 1200 + R() * 900, i++) {
    const key = list[i % list.length], [w, hh, svg] = FG[key], s = Math.min(k0 * kk, (H * 0.42) / hh * 1.25);
    f += `<svg style="position:absolute;left:${r3(x)}px;top:${r3(H - hh * s * 0.8)}px" width="${r3(w * s)}" height="${r3(hh * s)}" viewBox="0 0 ${w} ${hh}" overflow="visible">${svg}</svg>`;
  }
  S.over.push(`<div id="${S.id}-fgv" class="layer" style="left:${lay(S, 1.35, 20000)}px;top:${h ? 90 : 120}px;width:60000px;height:${H}px;z-index:14;filter:blur(${blur}px);opacity:.95">${f}</div>`);
  S.parallax = [...(S.parallax || []).filter(([q]) => q !== `${S.id}-fgv`), [`${S.id}-fgv`, 1.35]];
}

// ===================== ATREZO DE LA ÉPOCA =====================
const VA = {
  ard: [300, 220, `<path d="M10,40 L250,150" stroke="#8a6232" stroke-width="16" stroke-linecap="round"/><path d="M200,120 L280,220 L240,220 L190,140Z" fill="#a0703c" stroke="${INK}" stroke-width="5"/><path d="M60,60 L40,10" stroke="#8a6232" stroke-width="12" stroke-linecap="round"/>`],
  spade: [80, 300, `<path d="M40,0 L40,220" stroke="#8a6232" stroke-width="12"/><path d="M15,220 L65,220 L60,290 C55,302 25,302 20,290Z" fill="#a0703c" stroke="${INK}" stroke-width="5"/><path d="M20,288 C25,302 55,302 60,288" stroke="#9aa3ad" stroke-width="7" fill="none"/>`],
  seedBasket: [140, 110, `<path d="M6,30 L134,30 L118,108 L22,108Z" fill="#b98a4e" stroke="${INK}" stroke-width="5"/><path d="M10,56 L130,56 M16,82 L124,82" stroke="#8a6232" stroke-width="5"/><ellipse cx="70" cy="30" rx="60" ry="10" fill="#d9c27a" stroke="${INK}" stroke-width="3"/>`],
  pail: [110, 120, `<path d="M8,20 L102,20 L92,118 L18,118Z" fill="#a0703c" stroke="${INK}" stroke-width="5"/><path d="M12,50 L98,50 M15,90 L95,90" stroke="#5a3b22" stroke-width="5"/><ellipse cx="55" cy="22" rx="46" ry="9" fill="#f4f1e6" stroke="${INK}" stroke-width="3"/>`],
  quern: [170, 110, `<ellipse cx="85" cy="80" rx="80" ry="28" fill="#8c8f96" stroke="${INK}" stroke-width="5"/><ellipse cx="85" cy="56" rx="72" ry="24" fill="#9a9ea6" stroke="${INK}" stroke-width="5"/><circle cx="85" cy="54" r="10" fill="#4a4a50"/><path d="M130,50 L140,10" stroke="#8a6232" stroke-width="10" stroke-linecap="round"/>`],
  chest: [220, 140, `<rect x="0" y="30" width="220" height="110" fill="#8a6232" stroke="${INK}" stroke-width="6"/><path d="M0,30 C0,0 220,0 220,30" fill="#7a5030" stroke="${INK}" stroke-width="6"/><rect x="96" y="50" width="28" height="36" fill="#5b5f66" stroke="${INK}" stroke-width="3"/><path d="M40,30 L40,140 M180,30 L180,140" stroke="#5b5f66" stroke-width="8"/>`],
  barrel: [130, 170, `<path d="M14,8 C0,60 0,110 14,162 L116,162 C130,110 130,60 116,8Z" fill="#8a6232" stroke="${INK}" stroke-width="6"/><path d="M6,44 L124,44 M4,126 L126,126" stroke="#5b5f66" stroke-width="10"/>`],
  sack: [130, 150, `<path d="M20,150 C0,100 10,40 40,20 L90,20 C120,40 130,100 110,150Z" fill="#d8c9a0" stroke="${INK}" stroke-width="5"/><path d="M40,20 L50,0 L80,0 L90,20" fill="#c9b48a" stroke="${INK}" stroke-width="4"/>`],
  fishRack: [260, 300, `<path d="M20,300 L20,40 M240,300 L240,40 M0,50 L260,50" stroke="#7a5030" stroke-width="12"/>${[50, 95, 140, 185, 225].map((x) => `<path d="M${x},50 L${x},70 C${x - 12},90 ${x - 16},150 ${x - 4},190 L${x + 6},190 C${x + 18},150 ${x + 12},90 ${x},70" fill="#c9b48a" stroke="${INK}" stroke-width="3"/>`).join("")}`],
  shieldLean: [200, 210, `<g transform="rotate(-10 100 210)"><circle cx="100" cy="110" r="96" fill="${VK.amber}" stroke="${INK}" stroke-width="7"/><path d="M100,14 A96,96 0 0 1 100,206Z" fill="#2b2622"/><circle cx="100" cy="110" r="96" fill="none" stroke="${INK}" stroke-width="7"/><circle cx="100" cy="110" r="24" fill="#8f979f" stroke="${INK}" stroke-width="4"/></g>`],
  oarStack: [420, 120, `${[0, 1, 2, 3].map((k) => `<path d="M0,${110 - k * 22} L380,${100 - k * 22}" stroke="#b08a5a" stroke-width="14" stroke-linecap="round"/><ellipse cx="390" cy="${100 - k * 22}" rx="34" ry="10" fill="#c9a06a" stroke="${INK}" stroke-width="3"/>`).join("")}`],
  sailFold: [260, 100, `<path d="M0,100 L20,30 C80,10 180,10 240,30 L260,100Z" fill="${VK.sail}" stroke="${INK}" stroke-width="6"/><path d="M30,60 L230,60" stroke="#8f4a26" stroke-width="6"/>`],
  net: [260, 180, `<path d="M10,180 C20,80 240,80 250,180Z" fill="rgba(200,190,160,.4)" stroke="#a8946a" stroke-width="5"/>${[...Array(8)].map((_, k) => `<path d="M${30 + k * 28},100 L${20 + k * 30},180" stroke="#a8946a" stroke-width="3"/>`).join("")}<path d="M20,130 L240,130 M14,155 L246,155" stroke="#a8946a" stroke-width="3"/>`],
  tarPot: [200, 230, `<path d="M40,230 L70,150 M160,230 L130,150 M100,230 L100,150" stroke="#5b5f66" stroke-width="10"/><path d="M30,60 C30,170 170,170 170,60Z" fill="#2a2420" stroke="${INK}" stroke-width="6"/><ellipse cx="100" cy="60" rx="70" ry="14" fill="#14100c"/><path d="M60,200 C70,180 90,190 100,170 C110,190 130,180 140,200Z" fill="#ff9b3d" stroke="${INK}" stroke-width="3"/>`],
  logs: [420, 90, `${[0, 1, 2].map((k) => `<rect x="${k * 140}" y="40" width="120" height="50" rx="25" fill="#a0703c" stroke="${INK}" stroke-width="5"/><circle cx="${k * 140 + 25}" cy="65" r="18" fill="#c9a06a" stroke="#7a5030" stroke-width="3"/>`).join("")}`],
  horn: [140, 90, `<path d="M10,80 C10,40 60,10 130,10 C120,30 110,50 60,84 C40,92 14,94 10,80Z" fill="#e6d2b0" stroke="${INK}" stroke-width="5"/><path d="M110,14 L130,10" stroke="${VK.amber}" stroke-width="8"/>`],
  bench: [320, 110, `<rect x="0" y="20" width="320" height="26" fill="#a0703c" stroke="${INK}" stroke-width="5"/><rect x="20" y="46" width="22" height="64" fill="#7a5030" stroke="${INK}" stroke-width="4"/><rect x="278" y="46" width="22" height="64" fill="#7a5030" stroke="${INK}" stroke-width="4"/>`],
  bowls: [200, 80, `${[0, 1, 2].map((k) => `<path d="M${k * 66},40 C${k * 66},80 ${k * 66 + 60},80 ${k * 66 + 60},40Z" fill="#a0703c" stroke="${INK}" stroke-width="4"/>`).join("")}<path d="M150,30 L196,4" stroke="#c9a06a" stroke-width="8" stroke-linecap="round"/>`],
  bread: [180, 60, `<ellipse cx="90" cy="40" rx="86" ry="20" fill="#d9b06a" stroke="${INK}" stroke-width="5"/>${[50, 90, 130].map((x) => `<circle cx="${x}" cy="36" r="4" fill="#8a6232"/>`).join("")}`],
  honey: [100, 120, `<path d="M20,30 L80,30 L86,110 C80,120 20,120 14,110Z" fill="#c9733a" stroke="${INK}" stroke-width="5"/><rect x="16" y="14" width="68" height="20" rx="6" fill="#e6d2b0" stroke="${INK}" stroke-width="4"/><path d="M24,60 C30,80 30,90 26,100" stroke="#ffd36b" stroke-width="6" fill="none" stroke-linecap="round"/>`],
  cart: [460, 300, `<rect x="40" y="90" width="380" height="80" fill="#a0703c" stroke="${INK}" stroke-width="6"/>${[0, 1, 2, 3].map((k) => `<path d="M${70 + k * 100},90 C${80 + k * 100},70 ${110 + k * 100},70 ${120 + k * 100},90" stroke="#7a5030" stroke-width="6" fill="none"/>`).join("")}<circle cx="230" cy="220" r="80" fill="none" stroke="#6b4a2e" stroke-width="18"/><circle cx="230" cy="220" r="16" fill="#5b5f66" stroke="${INK}" stroke-width="4"/>${[0, 1, 2, 3].map((k) => `<path d="M230,220 L${r3(230 + 76 * Math.cos(k * Math.PI / 4))},${r3(220 + 76 * Math.sin(k * Math.PI / 4))} M230,220 L${r3(230 - 76 * Math.cos(k * Math.PI / 4))},${r3(220 - 76 * Math.sin(k * Math.PI / 4))}" stroke="#6b4a2e" stroke-width="8"/>`).join("")}<path d="M420,140 L460,150" stroke="#7a5030" stroke-width="12"/>`],
  sledge: [400, 110, `<path d="M10,60 L340,60 C380,60 400,40 390,20" stroke="#6b4a2e" stroke-width="14" fill="none" stroke-linecap="round"/><rect x="40" y="70" width="300" height="34" fill="#a0703c" stroke="${INK}" stroke-width="5"/>`],
  woodpile: [300, 160, `${[0, 1, 2].map((r) => [...Array(5 - r)].map((_, k) => `<circle cx="${30 + r * 28 + k * 58}" cy="${135 - r * 48}" r="26" fill="#a0703c" stroke="${INK}" stroke-width="4"/>`).join("")).join("")}`],
  beadsTray: [200, 70, `<rect x="0" y="30" width="200" height="40" fill="#8a6232" stroke="${INK}" stroke-width="4"/>${[...Array(12)].map((_, k) => `<circle cx="${14 + k * 16}" cy="24" r="7" fill="${["#d98a2b", "#3f8a6a", "#2f5f9a", "#e6dcc6", "#b3261e"][k % 5]}" stroke="${INK}" stroke-width="2"/>`).join("")}`],
  antlers: [220, 180, `<path d="M110,180 L110,100 C80,60 40,50 20,10 M110,100 C140,60 180,50 200,10 M60,50 L40,70 M160,50 L180,70" stroke="#e6d2b0" stroke-width="12" fill="none" stroke-linecap="round"/>`],
  whetstone: [160, 60, `<rect x="0" y="20" width="160" height="40" rx="10" fill="#8c8f96" stroke="${INK}" stroke-width="4"/><path d="M20,30 l40,0 M80,40 l50,0" stroke="#b0b4ba" stroke-width="4"/>`],
  jug: [110, 150, `<path d="M30,10 L80,10 L76,40 C110,60 110,120 80,148 L30,148 C0,120 0,60 34,40Z" fill="#c9b48a" stroke="${INK}" stroke-width="5"/><path d="M14,70 L96,70 M10,100 L100,100" stroke="#8a7a5a" stroke-width="4"/>`],
  cloth: [220, 90, `<path d="M0,90 L20,20 C80,0 160,0 200,20 L220,90Z" fill="#3f5f7a" stroke="${INK}" stroke-width="5"/><path d="M30,50 L190,50" stroke="#d9a72b" stroke-width="6"/>`],
  furs: [260, 110, `<path d="M0,110 C10,40 80,20 130,40 C180,20 250,40 260,110Z" fill="#8a6a4a" stroke="${INK}" stroke-width="6"/><path d="M40,70 l20,10 M120,60 l10,14 M200,70 l-14,12" stroke="#6b4e32" stroke-width="5"/>`],
  anchor: [180, 150, `<path d="M20,150 C0,100 30,60 90,60 C150,60 180,100 160,150Z" fill="#8c8f96" stroke="${INK}" stroke-width="6"/><circle cx="90" cy="62" r="14" fill="none" stroke="#5b5f66" stroke-width="6"/><path d="M90,48 C110,20 140,10 170,0" stroke="#c9b48a" stroke-width="6" fill="none"/>`],
  cauldron: [180, 160, `<path d="M20,40 C20,160 160,160 160,40Z" fill="#3a3a40" stroke="${INK}" stroke-width="6"/><path d="M10,40 L170,40" stroke="#5b5f66" stroke-width="12" stroke-linecap="round"/>`],
  horse: [420, 360, `<path d="M60,340 L70,200 M110,340 L110,200 M300,340 L290,200 M340,340 L340,200" stroke="#6b4428" stroke-width="22" stroke-linecap="round"/><path d="M40,200 C20,100 300,90 340,150 L340,210 C300,240 60,240 40,200Z" fill="#8a5a3a" stroke="${INK}" stroke-width="6"/><path d="M300,160 L360,40 C380,20 420,40 410,70 L380,110 L340,170Z" fill="#8a5a3a" stroke="${INK}" stroke-width="6"/><path d="M310,150 L360,40" stroke="#3b2a1a" stroke-width="16"/><path d="M40,140 C10,160 10,230 20,260" stroke="#3b2a1a" stroke-width="16" fill="none"/><path d="M380,60 L330,-10" stroke="#c9b48a" stroke-width="5"/>`],
  rope: [160, 70, `<ellipse cx="80" cy="45" rx="76" ry="24" fill="#c9b48a" stroke="${INK}" stroke-width="5"/><ellipse cx="80" cy="40" rx="44" ry="12" fill="none" stroke="#a8946a" stroke-width="6"/>`],
  bucket: [110, 110, `<path d="M8,20 L102,20 L92,108 L18,108Z" fill="#8a6232" stroke="${INK}" stroke-width="5"/><path d="M12,50 L98,50 M15,82 L95,82" stroke="#5b5f66" stroke-width="5"/><ellipse cx="55" cy="22" rx="46" ry="9" fill="#7fb6d6" stroke="${INK}" stroke-width="3"/>`],
  standScore: [140, 260, `<path d="M70,260 L70,90 M30,260 L70,200 L110,260" stroke="#3a2a1e" stroke-width="8" fill="none"/><rect x="10" y="20" width="120" height="80" fill="#f4f1e6" stroke="${INK}" stroke-width="4" transform="rotate(-8 70 60)"/><path d="M24,46 l90,-12 M26,66 l90,-12" stroke="#3a2a1e" stroke-width="3"/>`],
  spearProp: [80, 520, `<path d="M40,520 L40,60" stroke="#7a5030" stroke-width="10"/><path d="M40,0 L24,60 L56,60Z" fill="#c9a24a" stroke="${INK}" stroke-width="4"/>`],
  bigShield: [230, 230, `<circle cx="115" cy="115" r="108" fill="#b8b2a6" stroke="${INK}" stroke-width="7"/><path d="M115,10 L115,220 M10,115 L220,115" stroke="#c9a24a" stroke-width="12"/><circle cx="115" cy="115" r="26" fill="#c9a24a" stroke="${INK}" stroke-width="4"/>`],
  bench2: [420, 120, `<rect x="0" y="20" width="420" height="30" fill="#4a3426" stroke="${INK}" stroke-width="5"/><rect x="30" y="50" width="26" height="70" fill="#3a281c"/><rect x="364" y="50" width="26" height="70" fill="#3a281c"/>`],
  shackleProp: [220, 80, `<path d="M10,40 q20,-24 40,0 q20,24 40,0 q20,-24 40,0" stroke="#6b6f76" stroke-width="9" fill="none" stroke-dasharray="14 6"/><ellipse cx="170" cy="40" rx="30" ry="22" fill="none" stroke="#5b5f66" stroke-width="10"/>`],
  lamp: [90, 220, `<path d="M45,220 L45,90" stroke="#5b5f66" stroke-width="8"/><path d="M15,90 C15,60 75,60 75,90Z" fill="#8a6232" stroke="${INK}" stroke-width="4"/><path d="M45,40 C35,60 37,76 45,84 C53,76 55,60 45,40Z" fill="#ff9b3d" stroke="${INK}" stroke-width="3"/>`],
  boat: [520, 160, `<path d="M0,40 C100,150 420,150 520,40 C420,80 100,80 0,40Z" fill="#7a5030" stroke="${INK}" stroke-width="6"/><path d="M30,60 C150,120 370,120 490,60" stroke="#a0703c" stroke-width="6" fill="none"/>`],
};
export function atz(S, id, x, list, { gap = 50, y = G, z = 3, scale = 1, night = false } = {}) {
  const items = list.map((k) => VA[k]); const total = items.reduce((a, [w]) => a + w * scale + gap, -gap);
  let cx = x - total / 2, h = "";
  items.forEach(([w, hh, svg], i) => { h += `<svg id="${id}-${i}" class="prop" style="left:${r3(cx)}px;top:${r3(y - hh * scale)}px;z-index:${z};${night ? "filter:brightness(.5)" : ""}" width="${r3(w * scale)}" height="${r3(hh * scale)}" viewBox="0 0 ${w} ${hh}" overflow="visible">${svg}</svg>`; cx += w * scale + gap; });
  S.add(h);
}

// ===================== LUZ =====================
export function tintVk(S, kind = "sepia") {
  const { W, H } = S.fmt;
  const t = { sepia: ["rgba(201,160,106,.5)", "multiply"], despues: ["rgba(143,162,184,.45)", "multiply"], frio: ["rgba(127,138,150,.4)", "multiply"], noche: ["rgba(36,50,78,.55)", "multiply"], ambar: ["rgba(255,190,110,.18)", "screen"] }[kind];
  S.over.push(`<div class="layer" style="width:${W}px;height:${H}px;z-index:13;pointer-events:none;mix-blend-mode:${t[1]};background:${t[0]}"></div>`);
}
// Llovizna fina en diagonal (rincón de los esclavos)
export function drizzle(S, n = 60) {
  const { W, H } = S.fmt, R = rng(77); let d = "";
  for (let i = 0; i < n; i++) d += `<i id="${S.id}-rn${i}" style="position:absolute;left:${r3(R() * W * 1.2)}px;top:${r3(-60 - R() * H)}px;width:3px;height:46px;background:rgba(220,230,240,.45);transform:rotate(12deg)"></i>`;
  S.over.push(`<div class="layer" style="width:${W}px;height:${H}px;z-index:13;overflow:hidden;pointer-events:none">${d}</div>`);
  for (let i = 0; i < n; i++) { const c = 1.6 + (i % 4) * 0.3; S.tw(`tl.fromTo("#${S.id}-rn${i}",{x:0,y:0},{x:-200,y:${H + 200},duration:${r3(c)},repeat:${REP(S, c)},ease:"none"},${r3((i % 9) * 0.2)});`); }
}

// ===================== RECETAS (diseño 2.2) =====================
const NIGHT = { night: true };
export const FONDO = {
  gancho(S, x) { nordicSky(S, "tarde"); farLayer(S, { kind: "costa", seed: 23 }); midLayer(S, { kind: "sea", skerries: true }); sea(S, { kind: "viva" }); sunRays(S, { color: "255,200,130", k: 0.24 }); motes(S, { color: "rgba(255,250,240,.7)" }); fg(S, ["foam", "rope", "foam"], { blur: 3 }); },
  intro(S, x) {
    nordicSky(S, "manana"); farLayer(S); midLayer(S, { kaupang: true, boats: 2 }); ground(S, "prado"); longhouse(S, `${S.id}-lh`, x + 1500, { s: 0.55 }); trees(S, `${S.id}-tr`, x + 300, 3600, { n: 7, seed: 5 });
    fence(S, x - 1400, 900); atz(S, `${S.id}-az`, x - 2300, ["cart", "ard", "woodpile", "pail", "seedBasket", "quern"], { gap: 30 });
    const v = animal(S, `${S.id}-cow`, "vaca", x + 2300, G + 40, { s: 0.8 }); animalIdle(S, v, 0, DUR(S)); const o = animal(S, `${S.id}-sh1`, "oveja", x + 2800, G + 30, { s: 0.6, flip: true }); animalIdle(S, o, 0.3, DUR(S));
    fog(S, 0.18); fg(S, ["fern", "mossRock", "thistle"]);
  },
  mito(S, x) { nordicSky(S, "dia"); farLayer(S, { seed: 27 }); midLayer(S, { boats: 3 }); ground(S, "hierba"); trees(S, `${S.id}-tr`, x, 4200, { n: 8, seed: 9 }); atz(S, `${S.id}-az`, x - 1800, ["oarStack", "barrel", "sack", "shieldLean", "chest", "net"], { gap: 30 }); fg(S, ["fern", "thistle"]); },
  s1_granja(S, x) {
    nordicSky(S, "manana"); farLayer(S, { seed: 29 }); midLayer(S, { boats: 1 }); ground(S, "prado"); trees(S, `${S.id}-tr`, x - 1700, 1600, { n: 3, seed: 2, fir: 0.2 });
    longhouse(S, `${S.id}-lh`, x + 900, { s: 0.85, flowers: false }); field(S, `${S.id}-fd`, x - 1000, 2600); fence(S, x - 2100, 700);
    atz(S, `${S.id}-az`, x - 2600, ["ard", "spade", "seedBasket", "pail", "quern", "woodpile"], { gap: 30 });
    const v = animal(S, `${S.id}-cow`, "vaca", x + 2500, G + 30, { s: 0.75 }); animalIdle(S, v, 0, DUR(S)); const o = animal(S, `${S.id}-sh`, "oveja", x - 3200, G + 20, { s: 0.6 }); animalIdle(S, o, 0.3, DUR(S));
    sunRays(S, { color: "255,236,190", k: 0.16, from: "right" }); fg(S, ["thistle", "fern", "mossRock"]);
  },
  s1_dagmal(S, x) { longhouseIn(S, `${S.id}-in`, x, 5200); ground(S, "tierra"); atz(S, `${S.id}-az`, x + 1500, ["chest", "bowls", "bread", "honey", "furs", "quern"], { gap: 30, z: 4 }); motes(S, { color: "rgba(255,220,170,.6)" }); vignette(S, 0.5); fg(S, ["post", "post"], { blur: 4 }); },
  s1_noche(S, x) {
    nordicSky(S, "noche"); farLayer(S, { ...NIGHT, seed: 29 }); midLayer(S, NIGHT); ground(S, "noche"); longhouse(S, `${S.id}-lh`, x + 700, { s: 0.85, night: true });
    trees(S, `${S.id}-tr`, x - 1900, 1400, { n: 3, night: true, seed: 2 }); fence(S, x - 1200, 900, { night: true });
    atz(S, `${S.id}-az`, x - 2600, ["woodpile", "sledge", "shieldLean", "pail", "spade", "chest"], { gap: 30, night: true }); vignette(S, 0.65); fg(S, ["fern", "post"], { blur: 4 });
  },
  s1_sabado(S, x) {
    nordicSky(S, "dia"); farLayer(S, { seed: 31 }); midLayer(S, { boats: 1 }); ground(S, "hierba"); trees(S, `${S.id}-tr`, x, 3800, { n: 6, seed: 11, fir: 0.4 }); stream(S, `${S.id}-st`, x + 200, 3000);
    atz(S, `${S.id}-az`, x + 1600, ["cloth", "bucket", "whetstone", "seedBasket", "pail", "bench"], { gap: 30 }); sunRays(S, { k: 0.14 }); motes(S); fg(S, ["reeds", "fern", "mossRock"]);
  },
  s2_thing(S, x) {
    nordicSky(S, "dia", { moon: 0.5 }); farLayer(S, { seed: 33 }); midLayer(S, { boats: 4 }); ground(S, "hierba"); thingCrowd(S, `${S.id}-cr`, x + 300, 4200); thingMound(S, `${S.id}-mo`, x - 300); hazelRopes(S, `${S.id}-hr`, x, 4400);
    atz(S, `${S.id}-az`, x - 2200, ["horse", "spearProp", "shieldLean", "chest", "horn", "barrel"], { gap: 30, z: 3 }); fg(S, ["thistle", "fern"]);
  },
  s2_varadero(S, x) {
    nordicSky(S, "tarde"); farLayer(S, { seed: 35 }); midLayer(S, { kaupang: true, boats: 2 }); ground(S, "guijarros"); naust(S, x - 2300);
    S.ship = gokstad(S, `${S.id}-sh`, x + 300, G + 10, { s: 0.6, sail: "down", rocking: false, zf: 4, zb: 3 }); atz(S, `${S.id}-lg`, x + 300, ["logs", "logs", "logs"], { gap: 180, y: G + 30, z: 5 });
    atz(S, `${S.id}-az`, x + 2200, ["tarPot", "oarStack", "sailFold", "barrel", "sack", "fishRack", "net"], { gap: 24 }); smoke(S, `${S.id}-tar`, x + 1620, G - 260, { color: "rgba(40,36,34,.55)", size: 50, rise: 380 });
    sunRays(S, { color: "255,190,120", k: 0.2 }); fg(S, ["rope", "barrel"]);
  },
  ins_gokstad(S, x) { nordicSky(S, "tarde"); farLayer(S, { seed: 37 }); midLayer(S, {}); ground(S, "hierba"); mound(S, `${S.id}-mo`, x + 200); trees(S, `${S.id}-tr`, x - 1900, 1200, { n: 2, seed: 3 }); atz(S, `${S.id}-az`, x + 2000, ["spade", "woodpile", "sledge", "chest", "shieldLean", "horn"], { gap: 30 }); sunRays(S, { color: "255,200,130", k: 0.22 }); motes(S, { color: "rgba(255,220,160,.6)" }); fg(S, ["fern", "mossRock"]); },
  s2_despedida(S, x) {
    nordicSky(S, "atardecer", { moon: 0.5 }); farLayer(S, { seed: 39 }); midLayer(S, { boats: 1 }); sea(S, { kind: "calma", front: false });
    jetty(S, `${S.id}-jt`, x - 1300, 2600); S.ship = gokstad(S, `${S.id}-sh`, x + 1700, G + 60, { s: 0.55, sail: "furled", shields: true, zf: 5, zb: 3 });
    atz(S, `${S.id}-az`, x - 1700, ["barrel", "sack", "chest", "fishRack", "rope", "seedBasket"], { gap: 20, y: G - 20, z: 4 }); fg(S, ["post", "rope"]);
  },
  s3_mar_dia(S, x) { nordicSky(S, "dia"); farLayer(S, { kind: "costa", seed: 41 }); midLayer(S, { kind: "sea", skerries: true }); sea(S); S.ship = gokstad(S, `${S.id}-sh`, x + 200, G + 40, { s: 1, sail: "up", crew: 0 }); sunRays(S, { k: 0.14 }); fg(S, ["foam", "foam"]); },
  s3_remo(S, x) { nordicSky(S, "niebla", { gulls: false }); farLayer(S, { kind: "costa", seed: 41 }); midLayer(S, { kind: "sea" }); sea(S, { kind: "calma" }); S.ship = gokstad(S, `${S.id}-sh`, x + 200, G + 40, { s: 1, sail: "up", oars: "off" }); fog(S, 0.45); shade(S, 0.6); fg(S, ["foam"], { blur: 5 }); },
  s3_noche_mar(S, x) {
    nordicSky(S, "noche", { moon: 1 }); farLayer(S, { kind: "costa", night: true, seed: 41 }); midLayer(S, { kind: "sea", night: true }); sea(S, { kind: "calma", night: true });
    moonPath(S); S.ship = gokstad(S, `${S.id}-sh`, x + 200, G + 40, { s: 1, sail: "furled", night: true }); vignette(S, 0.7); fg(S, ["gunwale", "rope"], { blur: 4 });
  },
  s3_campamento(S, x) { nordicSky(S, "noche", { moon: 1 }); farLayer(S, { kind: "costa", night: true }); midLayer(S, { kind: "sea", night: true }); ground(S, "guijarros"); tent(S, `${S.id}-tn`, x - 600, G, 1.2, "#a8946a"); fire(S, `${S.id}-fi`, x + 200, G); atz(S, `${S.id}-az`, x + 1200, ["oarStack", "chest", "furs", "barrel", "cauldron", "horn"], { gap: 20, night: true }); vignette(S, 0.6); fg(S, ["embers", "oarLean"]); },
  s3_schlei(S, x) { nordicSky(S, "manana"); farLayer(S, { kind: "llano", seed: 43 }); midLayer(S, { kind: "llano" }); sea(S, { kind: "calma" }); S.ship = gokstad(S, `${S.id}-sh`, x + 200, G + 40, { s: 1, sail: "up" }); fg(S, ["reeds", "reeds"], { blur: 3 }); },
  atlantico(S, x) { nordicSky(S, "nublado"); farLayer(S, { kind: "costa", seed: 45 }); midLayer(S, { kind: "sea" }); sea(S, { kind: "viva" }); S.ship = gokstad(S, `${S.id}-sh`, x, G + 40, { s: 0.6, sail: "up", crew: 6 }); fg(S, ["foam"]); },
  s4_puerto(S, x) {
    nordicSky(S, "dia", { moon: -0.5 }); farLayer(S, { kind: "hedeby", seed: 47 }); midLayer(S, { boats: 4 }); sea(S, { kind: "calma", front: false });
    jetty(S, `${S.id}-jt`, x, 5200); atz(S, `${S.id}-az`, x - 1500, ["barrel", "sack", "furs", "jug", "antlers", "whetstone", "cloth"], { gap: 24, y: G - 20, z: 4 });
    gokstad(S, `${S.id}-m1`, x + 1900, G + 120, { s: 0.35, sail: "furled", zf: 2, zb: 2 }); fg(S, ["rope", "basket", "post"]);
  },
  s4_mercado(S, x) {
    nordicSky(S, "dia"); farLayer(S, { kind: "hedeby", seed: 49 }); midLayer(S, { kind: "llano" }); ground(S, "tablones"); hedebyStreet(S, `${S.id}-hs`, x, 5600); stalls(S, `${S.id}-stl`, x + 1300, { n: 3 });
    atz(S, `${S.id}-az`, x - 1800, ["beadsTray", "antlers", "whetstone", "jug", "furs", "cloth"], { gap: 24, z: 4 }); motes(S, { color: "rgba(200,190,180,.5)" }); fg(S, ["barrel", "basket", "post"]);
  },
  s4_plata(S, x) {
    nordicSky(S, "dia"); farLayer(S, { kind: "hedeby", seed: 49 }); midLayer(S, { kind: "llano" }); ground(S, "tablones"); hedebyStreet(S, `${S.id}-hs`, x, 5200); tintVk(S, "ambar");
    atz(S, `${S.id}-az`, x - 1500, ["cloth", "beadsTray", "chest", "jug", "whetstone", "lamp"], { gap: 24, z: 4 }); vignette(S, 0.4); fg(S, ["basket", "barrel"], { blur: 5 });
  },
  s4_esclavos(S, x) {
    nordicSky(S, "nublado", { gulls: false }); farLayer(S, { kind: "hedeby", seed: 51 }); midLayer(S, { boats: 2 }); sea(S, { kind: "calma", front: false }); jetty(S, `${S.id}-jt`, x, 4800);
    atz(S, `${S.id}-az`, x + 1300, ["shackleProp", "barrel", "rope", "cloth", "sack", "anchor"], { gap: 24, y: G - 20, z: 4 }); fg(S, ["rope", "post"], { blur: 4 }); tintVk(S, "frio"); drizzle(S); vignette(S, 0.45);
  },
  s4_ansgario(S, x) { nordicSky(S, "dia"); farLayer(S, { kind: "hedeby", seed: 53 }); midLayer(S, { kind: "llano" }); ground(S, "barro"); church(S, x + 700); atz(S, `${S.id}-az`, x + 1900, ["bench", "cauldron", "woodpile", "pail", "sack", "jug"], { gap: 24 }); fg(S, ["post", "fern"]); },
  ins_museo(S, x) { museumRoom(S, `${S.id}-mr`, x + 2500, 13000); ground(S, "museo"); atz(S, `${S.id}-az`, x + 1600, ["bench2"], { z: 3 }); fg(S, ["cordon", "heads"], { blur: 4 }); },
  s4_noche(S, x) {
    nordicSky(S, "noche", { moon: -0.5 }); farLayer(S, { kind: "hedeby", night: true, seed: 55 }); midLayer(S, { kind: "llano", night: true }); ground(S, "tablones"); hedebyStreet(S, `${S.id}-hs`, x, 5600, { night: true }); // noche: el escenario va oscurecido con el filtro del escenario (los rótulos quedan por encima)
    fire(S, `${S.id}-b1`, x - 900, G + 40, 0.6); fire(S, `${S.id}-b2`, x + 1300, G + 40, 0.6); atz(S, `${S.id}-az`, x + 2200, ["barrel", "horn", "jug", "bench", "furs", "lamp"], { gap: 20, z: 4 }); vignette(S, 0.3); fg(S, ["barrel", "post"], { blur: 4 });
  },
  balance(S, x) {
    nordicSky(S, "atardecer"); farLayer(S, { seed: 29 }); midLayer(S, { boats: 1 }); ground(S, "prado"); trees(S, `${S.id}-tr`, x - 2300, 1200, { n: 2, seed: 2 });
    longhouse(S, `${S.id}-lh`, x + 1500, { s: 0.7 }); field(S, `${S.id}-fd`, x - 600, 2200, { tall: true }); gokstad(S, `${S.id}-far`, x - 2700, G - 60, { s: 0.22, sail: "down", rocking: false, zf: 1, zb: 1 });
    atz(S, `${S.id}-az`, x - 1900, ["shieldLean", "oarStack", "seedBasket", "horn", "chest", "pail"], { gap: 24 }); sunRays(S, { color: "255,180,160", k: 0.2 }); fg(S, ["birchTrunk", "thistle"]);
  },
  ins_volga(S, x) { nordicSky(S, "manana"); farLayer(S, { kind: "llano", seed: 57 }); midLayer(S, { kind: "llano", boats: 3 }); ground(S, "barro"); volgaHouses(S, x + 400, 4200); atz(S, `${S.id}-az`, x + 1900, ["boat", "pail", "furs", "cloth", "sack"], { gap: 24 }); tintVk(S, "despues"); fg(S, ["reeds"]); },
  ins_1876(S, x) { nordicSky(S, "teatro", { gulls: false }); ground(S, "tablas"); operaStage(S, `${S.id}-op`, x, 4200); atz(S, `${S.id}-az`, x + 1300, ["standScore", "bigShield", "spearProp", "lamp", "chest", "rope"], { gap: 30, z: 4 }); vignette(S, 0.45); fg(S, ["heads", "heads"], { blur: 4 }); },
  cierre(S, x) {
    nordicSky(S, "noche"); farLayer(S, { ...NIGHT, seed: 29 }); midLayer(S, { ...NIGHT, boats: 1 }); ground(S, "noche"); longhouse(S, `${S.id}-lh`, x + 600, { s: 0.85, night: true });
    trees(S, `${S.id}-tr`, x - 1900, 1400, { n: 3, night: true, seed: 2 }); atz(S, `${S.id}-az`, x - 1700, ["woodpile", "sledge", "shieldLean", "pail", "chest", "spade"], { gap: 24, night: true });
    const d = { id: `${S.id}-dog` }; vignette(S, 0.6); fg(S, ["fern", "birchTrunk"], { blur: 4 });
  },
};
// Camino de la luna sobre el agua
export function moonPath(S) {
  const { W, H, h } = S.fmt; let p = "";
  for (let i = 0; i < 18; i++) p += `<i id="${S.id}-mp${i}" style="position:absolute;left:${(h ? 1480 : 780) - 30 - (i % 5) * 18}px;top:${(h ? 560 : 1100) + i * 22}px;width:${70 + (i % 4) * 40}px;height:6px;border-radius:3px;background:#f4ecd2"></i>`;
  S.bg.push(`<div class="layer" style="width:${W}px;height:${H}px">${p}</div>`);
  for (let i = 0; i < 18; i += 2) S.tw(`tl.fromTo("#${S.id}-mp${i}",{opacity:0.3},{immediateRender:false,opacity:0.95,duration:${r3(0.6 + (i % 3) * 0.2)},yoyo:true,repeat:${REP(S, 0.7)}},${r3(i * 0.05)});`);
}

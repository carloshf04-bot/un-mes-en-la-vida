// Piezas del mundo: estaciones de cámara, tarjetas, barras, números que giran, gráficas,
// fuego, tiendas, cueva, animales, móvil, bocadillos y el camino que une las escenas.
import { C, r3, rng, icon, camTo, camSet, esc } from "./lib.mjs";

export const G = 900;

// ---------- Estaciones (un sitio del mundo por idea) ----------
// Encuadre estándar alrededor de una estación en x=cx
export function spotBox(S, cx, k = 1) {
  return S.fmt.h ? { x: cx - 900 * k, y: G - 1010 * k, w: 1800 * k, h: 1050 * k }
                 : { x: cx - 560 * k, y: G - 1330 * k, w: 1120 * k, h: 1360 * k };
}
// Zona de información (donde van tarjetas y datos) y sitio de los personajes
export function zone(S, cx) {
  return S.fmt.h ? { x: cx + 230, y: G - 540, w: 1200, h: 860, chx: cx - 560 }
                 : { x: cx, y: G - 1000, w: 1000, h: 600, chx: cx - 230 };
}
export function goSpot(S, t, cx, { dur = 1.0, k = 1, blur = 0, ease = "power2.inOut" } = {}) {
  return camTo(S, t, spotBox(S, cx, k), { dur, blur, ease });
}
// Rejilla de n huecos centrada en (x,y)
export function grid(S, n, x, y, size, gap = 40, cols = null, sy = null) {
  sy = sy || size;
  cols = cols || (S.fmt.h ? Math.min(n, 4) : Math.min(n, n === 4 ? 2 : 3));
  const rows = Math.ceil(n / cols), out = [];
  for (let i = 0; i < n; i++) {
    const r = Math.floor(i / cols), c = i % cols, inRow = Math.min(cols, n - r * cols);
    out.push({ x: r3(x + (c - (inRow - 1) / 2) * (size + gap)), y: r3(y + (r - (rows - 1) / 2) * (sy + gap)) });
  }
  return out;
}

// ---------- Tarjetas y apariciones ----------
export const cardW = (size, label, lsize = null) => {
  const ls = lsize || Math.max(60, Math.round(size * 0.18));
  const chars = Math.max(0, ...String(label).split("<br>").map((x) => x.length));
  return { ls, w: Math.max(size, Math.round(chars * 0.66 * ls + 56)) };
};
export function iconCard(S, id, x, y, size, ic, label = "", { bg = C.bone, color = C.ink, lsize = null, z = 7 } = {}) {
  const { ls, w } = cardW(size, label, lsize);
  S.add(`<div id="${id}" class="card" style="left:${r3(x - w / 2)}px;top:${r3(y - size / 2)}px;width:${w}px;height:${size}px;background:${bg};z-index:${z};opacity:0"><div class="card-in">${icon(ic, { size: Math.round(size * (label ? 0.5 : 0.62)), color })}${label ? `<div class="lbl" style="font-size:${ls}px;color:${color};text-align:center;line-height:1">${label}</div>` : ""}</div></div>`);
}
export function panel(S, id, x, y, w, h, inner, { bg = C.bone, z = 7, radius = 34, pad = 30 } = {}) {
  S.add(`<div id="${id}" class="card" style="left:${r3(x - w / 2)}px;top:${r3(y - h / 2)}px;width:${w}px;height:${h}px;background:${bg};z-index:${z};border-radius:${radius}px;padding:${pad}px;opacity:0;flex-direction:column">${inner}</div>`);
}
export function pop(S, sel, t, { dur = 0.45, from = 0.3 } = {}) {
  S.cue(t, "pop");
  S.tw(`tl.fromTo("${sel}",{scale:${from},opacity:0},{scale:1,opacity:1,duration:${dur},ease:"back.out(1.9)"},${r3(t)});`);
}
export function drop(S, sel, t, dy = -160) {
  S.cue(t + 0.15, "pop", 0.8);
  S.tw(`tl.fromTo("${sel}",{y:${dy},opacity:0},{y:0,opacity:1,duration:0.5,ease:"bounce.out"},${r3(t)});`);
}
export function fadeUp(S, sel, t, { dy = 40, dur = 0.4 } = {}) {
  S.tw(`tl.fromTo("${sel}",{y:${dy},opacity:0},{y:0,opacity:1,duration:${dur},ease:"power3.out"},${r3(t)});`);
}
// Se transforma: se encoge un poco y se apaga (lo usa el siguiente que crece en su sitio)
export function shrinkOut(S, sel, t, { to = 0.6, dur = 0.3 } = {}) {
  S.tw(`tl.to("${sel}",{scale:${to},opacity:0,duration:${dur},ease:"power2.in"},${r3(t)});`);
}
export function flipIn(S, sel, t) {
  S.cue(t, "flip");
  S.tw(`tl.fromTo("${sel}",{rotationY:-90,opacity:0},{rotationY:0,opacity:1,duration:0.35,ease:"back.out(1.6)"},${r3(t)});`);
}
export function flipOut(S, sel, t) {
  S.tw(`tl.to("${sel}",{rotationY:90,opacity:0,duration:0.2,ease:"power2.in"},${r3(t)});`);
}
export function wobble(S, sel, t, n = 4, deg = 6) {
  S.tw(`tl.to("${sel}",{rotation:${deg},duration:0.12,yoyo:true,repeat:${n},ease:"sine.inOut"},${r3(t)});tl.to("${sel}",{rotation:0,duration:0.1},${r3(t + 0.12 * (n + 1))});`);
}
export function pulse(S, sel, t, s = 1.12) {
  S.tw(`tl.to("${sel}",{scale:${s},duration:0.14,yoyo:true,repeat:1,ease:"power2.out"},${r3(t)});`);
}
export function mark(S, id, x, y, size, t, ok) {
  S.cue(t, ok ? "ok" : "click");
  const ic = ok ? icon("check-fat", { size, color: C.green }) : icon("x", { size, color: C.red, weight: "bold" });
  S.add(`<div id="${id}" class="stamp" style="left:${r3(x - size / 2)}px;top:${r3(y - size / 2)}px;width:${size}px;height:${size}px;z-index:10;opacity:0;filter:drop-shadow(0 6px 0 ${C.ink})">${ic}</div>`);
  S.tw(`tl.fromTo("#${id}",{scale:2.3,opacity:0,rotation:${ok ? 0 : -20}},{scale:1,opacity:1,rotation:0,duration:0.3,ease:"power4.out"},${r3(t)});`);
}
// Texto grande en el mundo
export function label(S, id, x, y, str, { size = 80, color = C.bone, w = 1600, font = "Inter", weight = 900, z = 9, dirt = false, align = "center" } = {}) {
  const ff = dirt ? "'Rubik Dirt'" : font;
  S.add(`<div id="${id}" class="wtext" style="left:${r3(x - w / 2)}px;top:${r3(y - size * 0.62)}px;width:${w}px;font-family:${ff};font-weight:${dirt ? 400 : weight};font-size:${size}px;line-height:1.08;color:${color};text-align:${align};z-index:${z};opacity:0;text-shadow:0 ${r3(size * 0.06)}px 0 ${C.ink},0 0 ${r3(size * 0.25)}px rgba(0,0,0,.5)">${str}</div>`);
}
export function slam(S, sel, t, amp = 2.4) {
  S.cue(t - 0.05, "impact", 0.8);
  S.tw(`tl.fromTo("${sel}",{scale:${amp},opacity:0,filter:"blur(10px)"},{scale:1,opacity:1,filter:"blur(0px)",duration:0.28,ease:"power4.in"},${r3(t - 0.15)});`);
}
export function wordsIn(S, id, x, y, words, times, { size = 80, color = C.bone, w = 1600, keyIdx = -1 } = {}) {
  const sp = words.map((wd, i) => `<span id="${id}-${i}" style="display:inline-block;margin:0 ${r3(size * 0.14)}px;${i === keyIdx ? `color:${C.ochre}` : ""}">${wd}</span>`).join("");
  S.add(`<div id="${id}" class="wtext" style="left:${r3(x - w / 2)}px;top:${r3(y - size * 0.62)}px;width:${w}px;font:900 ${size}px Inter;color:${color};text-align:center;z-index:9;line-height:1.15;text-shadow:0 ${r3(size * 0.06)}px 0 ${C.ink}">${sp}</div>`);
  times.forEach((t, i) => S.tw(`tl.fromTo("#${id}-${i}",{opacity:0,filter:"blur(8px)"},{opacity:1,filter:"blur(0px)",duration:0.15},${r3(t)});`));
}

// ---------- Barras, números y gráficas ----------
export function bar(S, id, x, y, w, { label: lb = "", ic = null, color = C.green, from = 0.2, to = 0.9, t = 0, dur = 1, h = 70, show = null } = {}) {
  S.add(`<div id="${id}" class="prop" style="left:${r3(x - w / 2)}px;top:${r3(y - h / 2 - 60)}px;width:${w}px;z-index:8;opacity:0">
    <div style="display:flex;align-items:center;gap:14px;font:900 62px Inter;color:${C.bone};text-shadow:0 4px 0 ${C.ink};margin-bottom:10px">${ic ? icon(ic, { size: 60, color: C.bone }) : ""}${lb}</div>
    <div style="width:${w}px;height:${h}px;background:${C.ink2};border:6px solid ${C.ink};border-radius:${h}px;overflow:hidden;box-shadow:0 8px 0 ${C.ink}">
      <div id="${id}-f" style="width:100%;height:100%;background:${color};transform-origin:0 50%;border-radius:${h}px"></div></div></div>`);
  S.tw(`tl.fromTo("#${id}",{opacity:0,y:30},{opacity:1,y:0,duration:0.35,ease:"power3.out"},${r3(show ?? t - 0.4)});`);
  S.tw(`tl.fromTo("#${id}-f",{scaleX:${from}},{scaleX:${to},duration:${dur},ease:"power2.inOut"},${r3(t)});`);
}
export function counter(S, id, x, y, { from = 0, to = 100, t = 0, dur = 1, size = 160, pre = "", suf = "", dirt = true, color = C.bone, w = 1000, dec = 0, sep = true } = {}) {
  S.cue(t, "tick");
  const fmtN = (v) => { const s = dec ? v.toFixed(dec) : Math.round(v).toString(); return sep ? s.replace(/\B(?=(\d{3})+(?!\d))/g, ".") : s; };
  S.add(`<div id="${id}" class="wtext ${dirt ? "dirt" : ""}" style="left:${r3(x - w / 2)}px;top:${r3(y - size * 0.6)}px;width:${w}px;font-size:${size}px;${dirt ? "" : "font-family:Inter;font-weight:900;"}color:${color};text-align:center;z-index:9;opacity:0;text-shadow:0 ${r3(size * 0.05)}px 0 ${C.ink}">${pre}<span id="${id}-n">${fmtN(from)}</span>${suf}</div>`);
  S.tw(`(()=>{const o={v:${from}},el=document.getElementById("${id}-n");const f=(v)=>{const s=${dec ? `v.toFixed(${dec})` : "Math.round(v).toString()"};return ${sep ? 's.replace(/\\B(?=(\\d{3})+(?!\\d))/g,".")' : "s"};};tl.fromTo(o,{v:${from}},{v:${to},duration:${dur},ease:"power2.out",onUpdate:()=>{el.textContent=f(o.v);}},${r3(t)});})();`);
}
export function lineChart(S, id, x, y, w, h, vals, t, dur, { color = C.green, title = "", labels = [] } = {}) {
  const n = vals.length, pts = vals.map((v, i) => `${r3(110 + (i / (n - 1)) * (w - 220))},${r3(h - 80 - v * (h - 190))}`).join(" ");
  const lab = labels.map((l, i) => `<text x="${r3(110 + (i / (labels.length - 1)) * (w - 220))}" y="${h - 18}" font-family="Inter" font-weight="900" font-size="60" fill="${C.ink}" text-anchor="middle">${l}</text>`).join("");
  S.add(`<div id="${id}" class="card" style="left:${r3(x - w / 2)}px;top:${r3(y - h / 2)}px;width:${w}px;height:${h}px;background:${C.bone};z-index:7;opacity:0;flex-direction:column">
   <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="position:absolute;left:0;top:0">
    <text x="40" y="76" font-family="Inter" font-weight="900" font-size="64" fill="${C.ink}">${title}</text>
    <path d="M60,${h - 80} L${w - 60},${h - 80}" stroke="${C.ink}" stroke-width="5"/>
    <polyline id="${id}-l" points="${pts}" fill="none" stroke="${color}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/>${lab}</svg></div>`);
  pop(S, `#${id}`, t - 0.3);
  S.tw(`tl.fromTo("#${id}-l",{strokeDashoffset:1},{strokeDashoffset:0,duration:${dur},ease:"power1.inOut"},${r3(t)});`);
}
// Fila de personitas (para porcentajes): las k primeras cambian de color en t
export function people(S, id, x, y, n, k, t, { size = 110, color = C.bone, hit = C.red, ic = "person" } = {}) {
  let h = "";
  for (let i = 0; i < n; i++) h += `<div id="${id}-${i}" style="display:inline-block;margin:0 4px">${icon(ic, { size, color })}</div>`;
  S.add(`<div id="${id}" class="prop" style="left:${r3(x - (n * (size + 8)) / 2)}px;top:${r3(y - size / 2)}px;width:${n * (size + 8)}px;z-index:8;opacity:0;white-space:nowrap;filter:drop-shadow(0 5px 0 ${C.ink})">${h}</div>`);
  return { show: (tt) => S.tw(`tl.fromTo("#${id}",{opacity:0},{opacity:1,duration:0.3},${r3(tt)});` + [...Array(n)].map((_, i) => `tl.fromTo("#${id}-${i}",{y:40,opacity:0},{y:0,opacity:1,duration:0.3,ease:"back.out(2)"},${r3(tt + i * 0.05)});`).join("")),
    hit: () => { for (let i = 0; i < k; i++) S.tw(`tl.to("#${id}-${i} svg",{fill:"${hit}",duration:0.2},${r3(t + i * 0.12)});tl.to("#${id}-${i} path",{fill:"${hit}",duration:0.2},${r3(t + i * 0.12)});`); } };
}

// ---------- Mundo: fuego, tienda, refugio, cueva, luna, camino ----------
export function fire(S, id, x, y, s = 1, { t0 = 0, t1 = null, big = false } = {}) {
  S.fires = (S.fires || 0) + 1;
  const T1 = t1 ?? S.t1 - S.t0, R = rng(x | 0);
  S.add(`<div id="${id}" class="prop" style="left:${r3(x - 150 * s)}px;top:${r3(y - 300 * s)}px;width:${300 * s}px;height:${310 * s}px;z-index:6">
   <div id="${id}-glow" style="position:absolute;left:${r3(-260 * s)}px;top:${r3(-200 * s)}px;width:${820 * s}px;height:${620 * s}px;border-radius:50%;background:radial-gradient(closest-side,rgba(255,170,70,.45),rgba(255,140,50,0))"></div>
   <svg width="${300 * s}" height="${310 * s}" viewBox="-150 -300 300 310" overflow="visible" style="position:absolute;left:0;top:0">
    <g id="${id}-f1"><path d="M-70,0 C-110,-60 -60,-120 -40,-180 C-20,-130 0,-150 0,-230 C40,-170 70,-140 60,-90 C90,-110 100,-60 80,0Z" fill="${C.fire}" stroke="${C.ink}" stroke-width="5"/></g>
    <g id="${id}-f2"><path d="M-40,0 C-60,-50 -30,-80 -16,-120 C0,-90 14,-100 16,-150 C40,-100 56,-70 44,0Z" fill="${C.fire2}"/></g>
    <path d="M-110,4 L90,-26 M-100,-24 L110,6" stroke="#6b4226" stroke-width="26" stroke-linecap="round"/><path d="M-110,4 L90,-26 M-100,-24 L110,6" stroke="${C.ink}" stroke-width="5" fill="none" opacity=".5"/>
   </svg></div>`);
  const d = T1 - t0;
  S.tw(`tl.fromTo("#${id}-f1",{scaleY:0.92,scaleX:1.03},{scaleY:1.1,scaleX:0.96,svgOrigin:"0 0",duration:0.23,yoyo:true,repeat:${Math.max(1, Math.floor(d / 0.23))},ease:"sine.inOut"},${r3(t0)});`);
  S.tw(`tl.fromTo("#${id}-f2",{scaleY:1.08,skewX:4},{scaleY:0.9,skewX:-4,svgOrigin:"0 0",duration:0.17,yoyo:true,repeat:${Math.max(1, Math.floor(d / 0.17))},ease:"sine.inOut"},${r3(t0)});`);
  S.tw(`tl.fromTo("#${id}-glow",{opacity:0.75,scale:0.97},{opacity:1,scale:1.04,duration:0.4,yoyo:true,repeat:${Math.max(1, Math.floor(d / 0.4))},ease:"sine.inOut"},${r3(t0)});`);
}
export function tent(S, id, x, y, s = 1, color = "#9c6b3e") {
  S.add(`<svg id="${id}" class="prop" style="left:${r3(x - 260 * s)}px;top:${r3(y - 380 * s)}px;z-index:3" width="${520 * s}" height="${390 * s}" viewBox="-260 -380 520 390" overflow="visible">
    <path d="M-30,-370 L-10,-300 M30,-370 L10,-300" stroke="#5a3b22" stroke-width="14" stroke-linecap="round"/>
    <path d="M0,-310 L-250,0 L250,0Z" fill="${color}" stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"/>
    <path d="M0,-310 L-120,0 M0,-310 L120,0" stroke="#7a5030" stroke-width="5"/>
    <path d="M0,-180 L-60,0 L60,0Z" fill="#2a1a10"/><path d="M-200,-40 l20,-10 M150,-70 l24,8 M-80,-200 l16,8" stroke="#f0dcb8" stroke-width="6" stroke-linecap="round"/></svg>`);
}
export function shelter(S, id, x, y, w = 1400) {
  S.add(`<svg id="${id}" class="prop" style="left:${r3(x - w / 2)}px;top:${r3(y - 900)}px;z-index:2" width="${w}" height="910" viewBox="0 0 ${w} 910" overflow="visible">
    <path d="M0,910 L0,260 C80,120 300,30 ${w * 0.5},20 C${w * 0.8},10 ${w},100 ${w},300 L${w},420 C${w * 0.8},380 ${w * 0.55},420 ${w * 0.3},470 C${w * 0.2},490 ${w * 0.14},560 ${w * 0.12},910Z" fill="${C.rock}" stroke="${C.ink}" stroke-width="8"/>
    <path d="M${w * 0.12},910 C${w * 0.14},560 ${w * 0.2},490 ${w * 0.3},470 C${w * 0.55},420 ${w * 0.8},380 ${w},420 L${w},910Z" fill="#2c211b" opacity=".55"/>
    <path d="M60,300 C200,200 400,140 600,140 M${w * 0.6},80 C${w * 0.75},90 ${w * 0.9},140 ${w * 0.97},220" stroke="${C.rockD}" stroke-width="10" fill="none" stroke-linecap="round"/>
    <path d="M${w * 0.2},40 C${w * 0.4},10 ${w * 0.6},12 ${w * 0.8},30" stroke="#fff" stroke-width="18" fill="none" stroke-linecap="round"/></svg>`);
}
export function caveMouth(S, id, x, y, w = 1100, h = 800) {
  S.add(`<svg id="${id}" class="prop" style="left:${r3(x - w / 2)}px;top:${r3(y - h)}px;z-index:2" width="${w}" height="${h + 10}" viewBox="0 0 ${w} ${h + 10}" overflow="visible">
    <path d="M0,${h} C0,${h * 0.3} ${w * 0.2},0 ${w * 0.5},0 C${w * 0.8},0 ${w},${h * 0.3} ${w},${h}Z" fill="${C.rock}" stroke="${C.ink}" stroke-width="8"/>
    <path d="M${w * 0.22},${h} C${w * 0.22},${h * 0.45} ${w * 0.35},${h * 0.25} ${w * 0.5},${h * 0.25} C${w * 0.66},${h * 0.25} ${w * 0.78},${h * 0.45} ${w * 0.78},${h}Z" fill="#0b0705" stroke="${C.ink}" stroke-width="6"/>
    <path d="M${w * 0.15},${h * 0.12} C${w * 0.35},0 ${w * 0.65},0 ${w * 0.85},${h * 0.12}" stroke="#fff" stroke-width="16" fill="none" stroke-linecap="round"/></svg>`);
}
export function moonBadge(S, id, x, y, phase, title, t, { size = 230 } = {}) {
  S.cue(t - 0.2, "impact", 1); S.cue(t - 0.5, "riser", 0.6);
  // phase: 0 nueva, 0.5 creciente, 1 llena, -0.5 menguante
  const r = size / 2, sh = phase === 1 ? "" : phase === 0 ? `<circle cx="0" cy="0" r="${r}" fill="#2a3150"/>` :
    `<path d="M0,${-r} A${r},${r} 0 0,${phase > 0 ? 0 : 1} 0,${r} A${r * 0.35},${r} 0 0,${phase > 0 ? 1 : 0} 0,${-r}Z" fill="#2a3150"/>`;
  S.add(`<div id="${id}" class="prop" style="left:${r3(x - 500)}px;top:${r3(y - r)}px;width:1000px;z-index:9;display:flex;align-items:center;justify-content:center;gap:40px;opacity:0">
    <svg width="${size}" height="${size}" viewBox="${-r - 8} ${-r - 8} ${size + 16} ${size + 16}"><circle cx="0" cy="0" r="${r}" fill="${phase === 1 && title.includes("TRES") ? "#f2b48a" : "#f4ecd2"}" stroke="${C.ink}" stroke-width="7"/>${sh}<circle cx="0" cy="0" r="${r}" fill="none" stroke="${C.ink}" stroke-width="7"/></svg>
    <div class="dirt" style="font-size:${size * 0.62}px;color:${C.bone};text-shadow:0 8px 0 ${C.ink};white-space:nowrap">${title}</div></div>`);
  S.tw(`tl.fromTo("#${id}",{scale:2,opacity:0,filter:"blur(10px)"},{scale:1,opacity:1,filter:"blur(0px)",duration:0.35,ease:"power4.in"},${r3(t - 0.2)});`);
}
// Camino (línea ocre punteada sobre el suelo) que se dibuja mientras viaja la cámara
export function trail(S, id, x0, x1, t, dur) {
  const w = Math.abs(x1 - x0);
  S.add(`<svg id="${id}" class="prop" style="left:${Math.min(x0, x1)}px;top:${G - 40}px;z-index:3" width="${w}" height="120" viewBox="0 0 ${w} 120" overflow="visible">
    <path id="${id}-p" d="M0,60 C${w * 0.25},20 ${w * 0.5},100 ${w * 0.75},50 S${w},70 ${w},60" fill="none" stroke="${C.ochre}" stroke-width="16" stroke-linecap="round" stroke-dasharray="40 34" opacity=".95"/>
    <path d="M0,60 C${w * 0.25},20 ${w * 0.5},100 ${w * 0.75},50 S${w},70 ${w},60" fill="none" stroke="${C.ink}" stroke-width="5" stroke-dasharray="40 34" opacity=".3" transform="translate(0,5)"/></svg>
    <svg class="prop" style="left:${Math.min(x0, x1)}px;top:${G - 40}px;z-index:3" width="${w}" height="120"><defs><clipPath id="${id}-c"><rect id="${id}-r" x="0" y="0" width="${w}" height="120"/></clipPath></defs></svg>`);
  S.tw(`tl.fromTo("#${id}",{clipPath:"inset(0 100% 0 0)"},{clipPath:"inset(0 0% 0 0)",duration:${r3(dur)},ease:"power1.inOut"},${r3(t)});`);
}

// ---------- Animales (silueta 2D con patas que andan) ----------
const AN = {
  reno: { fill: "#8a6e55", dark: "#6b533f", belly: "#e8dcc6", w: 1, extra: (d) => `<path d="M118,-196 C110,-240 80,-250 70,-280 M118,-196 C130,-240 160,-250 150,-290 M100,-230 l-26,-6 M140,-232 l26,-10" stroke="#e6d2b0" stroke-width="9" fill="none" stroke-linecap="round"/>` },
  bisonte: { fill: "#5a3a25", dark: "#43291a", belly: "#7a5236", w: 1.15, hump: true, extra: () => `<path d="M136,-176 C150,-190 160,-196 170,-186" stroke="#e6d2b0" stroke-width="8" fill="none" stroke-linecap="round"/>` },
  caballo: { fill: "#c9a46b", dark: "#a5844f", belly: "#e8d4a8", w: 1, mane: "#3b2a1a", extra: () => "" },
  mamut: { fill: "#6b3f2a", dark: "#55301f", belly: "#7f4d34", w: 1.6, tusk: true, extra: () => "" },
  leon: { fill: "#c79a5e", dark: "#a67e48", belly: "#e3c896", w: 1.2, cat: true, extra: () => "" },
  hiena: { fill: "#9a8a6a", dark: "#7a6c50", belly: "#c8b994", w: 0.95, spots: true, extra: () => "" },
  oso: { fill: "#4b3426", dark: "#382619", belly: "#5e4331", w: 1.35, bear: true, extra: () => "" },
};
export function animal(S, id, kind, x, y, { s = 1, flip = false, z = 5 } = {}) {
  const a = AN[kind], O = C.ink;
  const leg = (n, lx, d) => `<g id="${id}-${n}"><rect x="${lx - 11}" y="-96" width="22" height="96" rx="10" fill="${d ? a.dark : a.fill}" stroke="${O}" stroke-width="4"/><rect x="${lx - 13}" y="-10" width="26" height="12" rx="4" fill="${O}"/></g>`;
  const body = a.bear ? `<path d="M-110,-90 C-120,-170 -40,-200 40,-190 C110,-186 140,-150 130,-90 C120,-70 -100,-60 -110,-90Z" fill="${a.fill}" stroke="${O}" stroke-width="5"/>`
    : a.hump ? `<path d="M-110,-100 C-120,-150 -60,-160 0,-160 C30,-230 110,-220 120,-150 C130,-110 110,-80 80,-80 L-90,-80 C-110,-82 -112,-90 -110,-100Z" fill="${a.fill}" stroke="${O}" stroke-width="5"/>`
    : `<path d="M-110,-110 C-112,-160 80,-166 104,-130 C116,-104 100,-82 74,-82 L-84,-82 C-106,-84 -112,-96 -110,-110Z" fill="${a.fill}" stroke="${O}" stroke-width="5"/>`;
  const head = a.cat ? `<path d="M90,-150 C96,-196 170,-200 176,-156 C180,-130 160,-118 130,-118 C104,-118 88,-130 90,-150Z" fill="${a.fill}" stroke="${O}" stroke-width="5"/><circle cx="150" cy="-160" r="6" fill="${O}"/><path d="M100,-186 l6,-20 l14,16 M150,-196 l10,-18 l8,20" fill="${a.dark}" stroke="${O}" stroke-width="4"/>`
    : a.bear ? `<path d="M110,-150 C110,-196 186,-196 190,-150 L214,-136 C218,-122 204,-116 190,-118 C160,-110 116,-116 110,-150Z" fill="${a.fill}" stroke="${O}" stroke-width="5"/><circle cx="124" cy="-186" r="13" fill="${a.dark}" stroke="${O}" stroke-width="4"/><circle cx="162" cy="-160" r="6" fill="${O}"/>`
    : a.tusk ? `<path d="M80,-150 C70,-230 170,-240 180,-170 C186,-140 176,-110 168,-80 C160,-40 150,-10 150,10" fill="none" stroke="${a.fill}" stroke-width="34" stroke-linecap="round"/><path d="M78,-148 C70,-232 172,-240 182,-168 L174,-120 C150,-110 110,-110 78,-148Z" fill="${a.fill}" stroke="${O}" stroke-width="5"/><path d="M150,-110 C200,-110 220,-150 200,-180" stroke="#f2ead6" stroke-width="13" fill="none" stroke-linecap="round"/><circle cx="140" cy="-176" r="6" fill="${O}"/>`
    : `<path d="M86,-140 C90,-176 108,-196 128,-200 C150,-202 170,-170 180,-150 C186,-136 176,-126 162,-128 L130,-132 C112,-118 92,-118 86,-140Z" fill="${a.fill}" stroke="${O}" stroke-width="5"/><circle cx="138" cy="-176" r="6" fill="${O}"/>${a.mane ? `<path d="M86,-140 C92,-180 110,-200 124,-204" stroke="${a.mane}" stroke-width="16" fill="none" stroke-linecap="round"/>` : ""}`;
  const spots = a.spots ? `<circle cx="-60" cy="-130" r="8" fill="${a.dark}"/><circle cx="-20" cy="-140" r="7" fill="${a.dark}"/><circle cx="20" cy="-128" r="8" fill="${a.dark}"/><circle cx="50" cy="-145" r="6" fill="${a.dark}"/>` : "";
  const tail = `<g id="${id}-tail"><path d="M-108,-120 C-140,-120 -150,-90 -146,-70" stroke="${a.dark}" stroke-width="12" fill="none" stroke-linecap="round"/></g>`;
  const svg = `<g transform="scale(${a.w},1)">${tail}${leg("l1", -70, 1)}${leg("l2", 70, 1)}${body}${spots}${leg("l3", -50, 0)}${leg("l4", 90, 0)}</g><g transform="translate(${(a.w - 1) * 110},0)"><g id="${id}-head">${head}${a.extra()}</g></g>`;
  const W = 500 * s * a.w, H = 300 * s;
  S.add(`<div id="${id}" class="actor" style="left:${r3(x - W / 2)}px;top:${r3(y - H)}px;width:${r3(W)}px;height:${r3(H)}px;z-index:${z}"><div id="${id}-flip" style="width:100%;height:100%"><svg viewBox="${-250 * a.w} -290 ${500 * a.w} 300" width="100%" height="100%" overflow="visible">${svg}</svg></div></div>`);
  if (flip) S.tw(`tl.set("#${id}-flip",{scaleX:-1},0);`);
  return { id, x, y, kind };
}
export function animalWalk(S, an, t0, t1, x1, { run = false } = {}) {
  const cyc = run ? 0.3 : 0.6, d = t1 - t0, n = Math.max(1, Math.round(d / cyc)), half = r3(d / n / 2), A = run ? 34 : 20;
  S.tw(`tl.to("#${an.id}",{x:"+=${r3(x1 - an.x)}",duration:${r3(d)},ease:"none"},${r3(t0)});`);
  an.x = x1;
  [["l1", 1, "-70 -96"], ["l4", 1, "90 -96"], ["l2", -1, "70 -96"], ["l3", -1, "-50 -96"]].forEach(([p, ph, o]) =>
    S.tw(`tl.fromTo("#${an.id}-${p}",{rotation:${-A * ph}},{rotation:${A * ph},svgOrigin:"${o}",duration:${half},yoyo:true,repeat:${n * 2 - 1},ease:"sine.inOut"},${r3(t0)});`));
  S.tw(`tl.fromTo("#${an.id}-head",{y:0},{immediateRender:false,y:${run ? 8 : 4},duration:${half},yoyo:true,repeat:${n * 2 - 1},ease:"sine.inOut"},${r3(t0)});`);
}
export function animalIdle(S, an, t0, t1) {
  const d = t1 - t0; if (d < 0.6) return;
  S.tw(`tl.fromTo("#${an.id}-head",{rotation:0},{immediateRender:false,rotation:6,svgOrigin:"100 -130",duration:1.3,yoyo:true,repeat:${Math.max(1, Math.floor(d / 1.3) - 1)},ease:"sine.inOut"},${r3(t0)});`);
  S.tw(`tl.fromTo("#${an.id}-tail",{rotation:-8},{immediateRender:false,rotation:10,svgOrigin:"-108 -118",duration:0.5,yoyo:true,repeat:${Math.max(1, Math.floor(d / 0.5) - 1)},ease:"sine.inOut"},${r3(t0)});`);
}
// Ojos que brillan en la oscuridad
export function glowEyes(S, id, x, y, t, { color = "#ffd34d", s = 1 } = {}) {
  S.add(`<div id="${id}" class="prop" style="left:${x - 60 * s}px;top:${y - 20 * s}px;width:${120 * s}px;height:${40 * s}px;z-index:4;opacity:0">
    <div style="position:absolute;left:0;top:0;width:${36 * s}px;height:${22 * s}px;border-radius:50%;background:${color};box-shadow:0 0 ${24 * s}px ${color}"></div>
    <div style="position:absolute;right:0;top:0;width:${36 * s}px;height:${22 * s}px;border-radius:50%;background:${color};box-shadow:0 0 ${24 * s}px ${color}"></div></div>`);
  S.tw(`tl.fromTo("#${id}",{opacity:0,scaleY:0.1},{opacity:1,scaleY:1,duration:0.25},${r3(t)});`);
}

// ---------- Réplicas de apps ----------
export function phone(S, id, x, y, w, h, inner, { z = 8 } = {}) {
  S.add(`<div id="${id}" class="prop" style="left:${r3(x - w / 2)}px;top:${r3(y - h / 2)}px;width:${w}px;height:${h}px;z-index:${z};opacity:0;background:#1d1d22;border:8px solid ${C.ink};border-radius:${w * 0.12}px;box-shadow:0 16px 0 ${C.ink},0 30px 60px rgba(0,0,0,.4);padding:${w * 0.05}px">
   <div style="position:relative;width:100%;height:100%;border-radius:${w * 0.08}px;overflow:hidden;background:#f3efe6">${inner}</div></div>`);
}
export function bubble(S, id, x, y, w, h, inner, { tail = "left", bg = "#fff", z = 9 } = {}) {
  const tl = tail === "left" ? `left:40px` : tail === "right" ? `right:40px` : `left:${w / 2 - 20}px`;
  S.add(`<div id="${id}" class="prop" style="left:${r3(x - w / 2)}px;top:${r3(y - h / 2)}px;width:${w}px;height:${h}px;z-index:${z};opacity:0">
    <div style="position:absolute;inset:0;background:${bg};border:6px solid ${C.ink};border-radius:40px;box-shadow:0 10px 0 ${C.ink};display:flex;align-items:center;justify-content:center;gap:16px;font:900 62px Inter;color:${C.ink};text-align:center;padding:10px 24px;line-height:1.05">${inner}</div>
    <div style="position:absolute;${tl};bottom:-34px;width:44px;height:44px;background:${bg};border-right:6px solid ${C.ink};border-bottom:6px solid ${C.ink};transform:rotate(45deg)"></div></div>`);
}
// Texto que se escribe letra a letra
export function typeOn(S, elId, str, t0, dur) {
  S.cue(t0, "typing");
  S.tw(`(()=>{const o={n:0},el=document.getElementById("${elId}"),s=${JSON.stringify(str)};tl.fromTo(o,{n:0},{n:s.length,duration:${dur},ease:"none",onUpdate:()=>{el.textContent=s.slice(0,Math.round(o.n));}},${r3(t0)});})();`);
}
export function arrow(S, id, x1, y1, x2, y2, t, { color = C.ochre, dur = 0.5, bend = 0.25, w = 14 } = {}) {
  const mx = (x1 + x2) / 2 - (y2 - y1) * bend, my = (y1 + y2) / 2 + (x2 - x1) * bend;
  const minx = Math.min(x1, x2, mx) - 60, miny = Math.min(y1, y2, my) - 60, W = Math.max(x1, x2, mx) - minx + 120, H = Math.max(y1, y2, my) - miny + 120;
  const ang = Math.atan2(y2 - my, x2 - mx) * 180 / Math.PI;
  S.add(`<svg id="${id}" class="prop" style="left:${r3(minx)}px;top:${r3(miny)}px;z-index:8" width="${r3(W)}" height="${r3(H)}" overflow="visible">
    <path id="${id}-p" d="M${r3(x1 - minx)},${r3(y1 - miny)} Q${r3(mx - minx)},${r3(my - miny)} ${r3(x2 - minx)},${r3(y2 - miny)}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/>
    <g id="${id}-h" opacity="0" transform="translate(${r3(x2 - minx)},${r3(y2 - miny)}) rotate(${r3(ang)})"><path d="M0,0 L-40,-24 L-40,24Z" fill="${color}" stroke="${C.ink}" stroke-width="4"/></g></svg>`);
  S.tw(`tl.fromTo("#${id}-p",{strokeDashoffset:1},{strokeDashoffset:0,duration:${dur},ease:"power2.inOut"},${r3(t)});tl.to("#${id}-h",{opacity:1,duration:0.1},${r3(t + dur - 0.05)});`);
}

// ---------- Atajos para «tarjetas en su palabra» ----------
// items: [icono, etiqueta, tiempo, marca (true=verde, false=roja, undefined=nada), color de fondo]
export function cardsAt(S, pre, x, y, items, { size = null, cols = null, gap = 36 } = {}) {
  const sz = size || (S.fmt.h ? 300 : 280);
  const cw = Math.max(...items.map((it) => cardW(sz, it[1] || "").w));
  const maxW = S.fmt.h ? 1650 : 1040;
  let cl = cols || (S.fmt.h ? Math.min(items.length, 4) : Math.min(items.length, items.length === 4 ? 2 : 3));
  cl = Math.max(1, Math.min(cl, Math.floor((maxW + gap) / (cw + gap))));
  const pos = grid(S, items.length, x, y, cw, gap, cl, sz);
  items.forEach(([ic, lb, t, mk, bg], i) => {
    iconCard(S, `${pre}${i}`, pos[i].x, pos[i].y, sz, ic, lb, { bg: bg || C.bone });
    pop(S, `#${pre}${i}`, t);
    if (mk !== undefined && mk !== null) mark(S, `${pre}${i}m`, pos[i].x + cardW(sz, lb || "").w / 2 - sz * 0.17, pos[i].y - sz * 0.33, sz * 0.42, t + 0.25, mk);
  });
  return pos;
}
export function clearAt(S, sels, t, dur = 0.3) {
  S.tw(`tl.to("${sels}",{scale:0.5,opacity:0,duration:${dur},stagger:0.04,ease:"power2.in"},${r3(t)});`);
}
export const ids = (pre, n, m = false) => [...Array(n)].map((_, i) => `#${pre}${i}${m ? `,#${pre}${i}m` : ""}`).join(",");

// Utilidades de «Un mes en la vida de un gladiador» (gm_caps.mjs).
// - esc(): construye un escenario completo (5 capas) con un id propio y lo envuelve para poder encenderlo y apagarlo.
//   Así un capítulo puede pasar por varios escenarios con su propio cielo, luz y primer plano.
// - cut(): cambio de estación con goSpot + whoosh (desenfoque) y cambio de escenario a mitad del viaje.
// - who(): actor con sombra de contacto, equipo con id (para que aparezca en su palabra) y que pertenece al escenario activo.
import { C, r3, icon, camTo, actor, life, walk, pose, GEAR, back } from "./lib.mjs";
import { exit } from "./fondos.mjs";
import { G } from "./gl_fondos.mjs";
import { spotBox, goSpot, pop, slam, fadeUp, mark, label, cardW, grid, moonBadge, counter } from "./lib2.mjs";

// ---------- Escenarios intercambiables ----------
export function esc(S, name, fn, x, { filter = "" } = {}) {
  const P = Object.create(S);
  P.id = `${S.id}-${name}`; P.parallax = []; P.x0 = x;
  const b0 = S.bg.length, o0 = S.over.length, h0 = S.html.length;
  subsuelo(P, x);
  fn(P, x);
  const wrap = (arr, i0, tag) => { const it = arr.splice(i0); arr.push(`<div id="${P.id}-${tag}" class="layer" style="visibility:hidden;${filter && tag !== "O" ? `filter:${filter}` : ""}">\n${it.join("\n")}\n</div>`); };
  wrap(S.bg, b0, "B"); wrap(S.over, o0, "O"); wrap(S.html, h0, "W");
  S.parallax = [...(S.parallax || []), ...P.parallax];
  (S.escs ||= {})[name] = { id: P.id, x, P, filter };
  return P;
}
// Subsuelo con losas y piedras (z 0): rellena lo que queda bajo los suelos que acaban a G + 310 (se ve en vertical)
function subsuelo(P, x, w = 9000) {
  let st = ""; let k = 0;
  for (let yy = 0; yy < 1400; yy += 70) for (let xx = (yy / 70) % 2 ? -60 : 0; xx < w; xx += 150) { k++; st += `<rect x="${xx}" y="${yy}" width="146" height="66" rx="8" fill="${k % 3 ? "#5e5348" : "#665a4e"}" stroke="#3e352c" stroke-width="3"/>`; if (k % 7 === 0) st += `<ellipse cx="${xx + 40}" cy="${yy + 30}" rx="12" ry="7" fill="#7a6e60"/>`; }
  P.add(`<svg class="prop" style="left:${x - w / 2}px;top:${G + 5}px;z-index:0" width="${w}" height="1400"><rect width="${w}" height="1400" fill="#4e453c"/>${st}<rect width="${w}" height="1400" fill="url(#${P.id}-ssg)"/><defs><linearGradient id="${P.id}-ssg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".45"/></linearGradient></defs></svg>`);
}
// Activa un escenario en t (apaga el anterior). Los actores creados con who() mientras está activo van con él.
export function on(S, name, t) { (S.toggles ||= []).push([r3(t), name]); S.cur = name; }
// Cambio de estación: la cámara viaja con desenfoque (whoosh) y a mitad cambia el escenario
export function cut(S, t, name, { x = null, dur = 1.0, k = 1 } = {}) {
  const e = S.escs[name];
  goSpot(S, t, x ?? e.x, { dur, blur: 5, k });
  on(S, name, t + dur / 2);
}
export function move(S, t, x, { dur = 0.9, k = 1 } = {}) { goSpot(S, t, x, { dur, blur: 4, k }); }
// Emite los encendidos y apagados (llamar al final de cada capítulo)
export function fin(S) {
  const tg = S.toggles || [], mem = S.mem || {};
  for (const [name, e] of Object.entries(S.escs || {})) {
    const sel = [`#${e.id}-B`, `#${e.id}-O`, `#${e.id}-W`, ...(mem[name] || [])].join(",");
    let prev = null;
    if (!tg.length || tg[0][0] > 0 || tg[0][1] !== name) if ((mem[name] || []).length) S.tw(`tl.set("${(mem[name] || []).join(",")}",{visibility:"hidden"},0);`);
    for (const [t, n] of tg) {
      if (n === name && prev !== name) S.tw(`tl.set("${sel}",{visibility:"visible"},${t});`);
      if (n !== name && prev === name) S.tw(`tl.set("${sel}",{visibility:"hidden"},${t});`);
      prev = n;
    }
  }
}

// ---------- Actores ----------
// g: { T: ["loin"], H: ["galhair","mustache"], F: "shield", B: ["wood"] } · off: claves que empiezan ocultas
export function who(S, id, kind, x, { g = {}, off = [], scale = 1.35, flip = false, z = 6, y = G, seed = 1, live = true, shadow = true } = {}) {
  const props = {};
  for (const [slot, ks] of Object.entries(g)) {
    const s = [].concat(ks).map((k, i) => { const raw = k.startsWith("<"); return `<g id="${id}-g-${raw ? slot + i : k}">${raw ? k : GEAR[k]}</g>`; }).join("");
    props[slot] = slot === "B" ? back(s) : s;
  }
  const mine = [`#${id}`];
  if (shadow) {
    const w = 230 * scale / 1.35;
    S.add(`<div id="${id}-sh" class="prop" style="left:${r3(x - w / 2)}px;top:${r3(y - 16)}px;width:${r3(w)}px;height:32px;border-radius:50%;background:rgba(30,18,8,.32);z-index:3"></div>`);
    mine.push(`#${id}-sh`);
  }
  const a = actor(S, id, kind, x, y, { scale, flip, z, props });
  a.sc = scale; a.sh = shadow;
  const ef = S.cur && S.escs[S.cur].filter;
  if (ef) S.tw(`tl.set("#${id}",{filter:"${ef}"},0);`);
  for (const k of off) S.tw(`tl.set("#${id}-g-${k}",{opacity:0},0);`);
  if (live) life(S, a, 0, S.t1 - S.t0, seed);
  if (S.cur) ((S.mem ||= {})[S.cur] ||= []).push(...mine);
  return a;
}
export function go(S, a, t0, t1, x1, o = {}) {
  const dx = r3(x1 - a.x);
  walk(S, a, t0, t1, x1, o);
  if (a.sh) S.tw(`tl.to("#${a.id}-sh",{x:"+=${dx}",duration:${r3(t1 - t0)},ease:"none"},${r3(t0)});`);
}
export function gearOn(S, a, k, t, d = 0.25) { S.cue(t, "pop", 0.6); S.tw(`tl.fromTo("#${a.id}-g-${k}",{opacity:0},{opacity:1,duration:${d}},${r3(t)});`); }
export function gearOff(S, a, k, t, d = 0.2) { S.tw(`tl.to("#${a.id}-g-${k}",{opacity:0,duration:${d}},${r3(t)});`); }
// Aparece o desaparece un actor entero (y su sombra)
export function appear(S, a, t, d = 0.35) { S.tw(`tl.fromTo("#${a.id}${a.sh ? `,#${a.id}-sh` : ""}",{opacity:0},{opacity:1,duration:${d}},${r3(t)});`); }
export function vanish(S, a, t, d = 0.3) { S.tw(`tl.to("#${a.id}${a.sh ? `,#${a.id}-sh` : ""}",{opacity:0,duration:${d}},${r3(t)});`); }
export function hidden(S, a) { S.tw(`tl.set("#${a.id}${a.sh ? `,#${a.id}-sh` : ""}",{opacity:0},0);`); }
// Golpe con la mano trasera (espada) hacia delante
export function strike(S, a, t, { arm = "B" } = {}) {
  pose(S, a, t - 0.14, { [`arm${arm}`]: -160, [`fore${arm}`]: -30, body: -4 }, 0.12, "power2.out");
  pose(S, a, t, { [`arm${arm}`]: -70, [`fore${arm}`]: -10, body: 6 }, 0.08, "power4.in");
  pose(S, a, t + 0.3, { [`arm${arm}`]: -20, [`fore${arm}`]: -20, body: 0 }, 0.2);
}

// ---------- Estación: dónde va cada cosa ----------
export function Z(S, x) {
  const F = S.fmt.F;
  return { x, L: x - F(560, 250), R: x + F(600, 270), top: F(G - 860, G - 1070), cx: F(x + 230, x), cy: F(G - 560, G - 1010), w: F(1500, 1000) };
}

// ---------- Textos y tarjetas ----------
export function tx(S, id, x, y, str, t, { size = null, color = C.bone, w = null, roman = false, fx = "slam", z = 9 } = {}) {
  const F = S.fmt.F;
  const plate = `<span style="background:rgba(24,14,8,.62);border-radius:20px;padding:0 24px 6px;-webkit-box-decoration-break:clone;box-decoration-break:clone">${str}</span>`;
  label(S, id, x, y, roman ? `<span class="roman" style="background:rgba(24,14,8,.55);border-radius:20px;padding:0 28px 8px">${str}</span>` : plate, { size: size || F(86, 76), color, w: w || F(1500, 1000), z });
  if (fx === "slam") slam(S, `#${id}`, t); else if (fx === "pop") pop(S, `#${id}`, t); else fadeUp(S, `#${id}`, t);
}
// Dibujos del equipo (GEAR) dentro de una tarjeta: [viewBox]
const VB = {
  helmet: "-80 -480 170 130", shield: "-50 -318 160 276", sword: "-20 -310 90 170", wood: "-20 -312 90 154", trident: "-15 -490 90 460",
  net: "-25 -195 100 90", pugio: "0 -245 60 80", hoplon: "-30 -256 120 120", cup: "-5 -228 75 92", lamp: "-12 -205 110 64",
  palm: "-30 -430 150 280", strigil: "15 -275 85 125", tabula: "-6 -232 100 90", scroll: "-20 -212 108 92", secutor: "-70 -440 145 160",
  scutumGal: "-35 -316 130 270", wicker: "-50 -318 160 276", manica: "8 -244 46 78", bowl: "-10 -190 82 56", shackle: "8 -196 48 116",
  // vikingo
  hacksilver: "-5 -200 80 60", scales: "-45 -170 150 90", comb: "-5 -200 75 45", axe: "0 -360 100 230", shieldRound: "-72 -298 204 204", spade: "5 -170 60 220",
  stockfish: "5 -300 55 130", oar: "-75 -430 200 450", hornDrink: "5 -270 80 115", swordVk: "5 -380 55 245", hornHelmet: "-110 -500 225 140", gjermundbu: "-65 -450 135 120",
  knife: "15 -245 35 100", basin: "-20 -195 105 70", silverBag: "-5 -200 70 95", earspoon: "20 -250 55 90", file: "15 -255 35 110", bundle: "-15 -210 95 65", furRoll: "-20 -205 105 55", crown: "-50 -440 110 60",
};
export function gearCard(S, id, x, y, size, key, lb = "", { bg = C.bone, color = C.ink, lsize = null, z = 7 } = {}) {
  const { ls, w } = cardW(size, lb, lsize), hh = size + (String(lb).split("<br>").length - 1) * ls;
  const isz = Math.round(size * (lb ? 0.56 : 0.72));
  S.add(`<div id="${id}" class="card" style="left:${r3(x - w / 2)}px;top:${r3(y - hh / 2)}px;width:${w}px;height:${hh}px;background:${bg};z-index:${z};opacity:0"><div class="card-in"><svg width="${isz}" height="${isz}" viewBox="${VB[key]}" overflow="visible">${GEAR[key]}</svg>${lb ? `<div class="lbl" style="font-size:${ls}px;color:${color};text-align:center;line-height:1">${lb}</div>` : ""}</div></div>`);
}
export function iconCard2(S, id, x, y, size, ic, lb = "", { bg = C.bone, color = C.ink, icolor = null, lsize = null, z = 7 } = {}) {
  if (ic.startsWith("g:")) return gearCard(S, id, x, y, size, ic.slice(2), lb, { bg, color, lsize, z });
  const { ls, w } = cardW(size, lb, lsize), hh = size + (String(lb).split("<br>").length - 1) * ls;
  S.add(`<div id="${id}" class="card" style="left:${r3(x - w / 2)}px;top:${r3(y - hh / 2)}px;width:${w}px;height:${hh}px;background:${bg};z-index:${z};opacity:0"><div class="card-in">${icon(ic, { size: Math.round(size * (lb ? 0.5 : 0.62)), color: icolor || color })}${lb ? `<div class="lbl" style="font-size:${ls}px;color:${color};text-align:center;line-height:1">${lb}</div>` : ""}</div></div>`);
}
// Una tarjeta en su palabra (mk: true = check verde, false = X roja)
export function c1(S, id, x, y, ic, lb, t, { size = null, bg = C.bone, mk = null, icolor = null, fx = "pop" } = {}) {
  const sz = size || S.fmt.F(250, 240);
  iconCard2(S, id, x, y, sz, ic, lb, { bg, icolor });
  if (fx === "pop") pop(S, `#${id}`, t); else if (fx === "drop") { S.cue(t + 0.15, "pop", 0.8); S.tw(`tl.fromTo("#${id}",{y:-160,opacity:0},{y:0,opacity:1,duration:0.5,ease:"bounce.out"},${r3(t)});`); }
  else { S.cue(t, "flip"); S.tw(`tl.fromTo("#${id}",{rotationY:-90,opacity:0},{rotationY:0,opacity:1,duration:0.35,ease:"back.out(1.6)"},${r3(t)});`); }
  if (mk !== null) mark(S, `${id}m`, x + cardW(sz, lb || "").w / 2 - sz * 0.17, y - sz * 0.33, sz * 0.42, t + 0.3, mk);
}
// Fila o rejilla de tarjetas, cada una en su palabra: items [icono o "g:gear", etiqueta, t, marca, fondo]
export function cards(S, pre, x, y, items, { size = null, cols = null, gap = 30 } = {}) {
  const sz = size || S.fmt.F(240, 220);
  const cw = Math.max(...items.map((it) => cardW(sz, it[1] || "").w));
  const maxW = S.fmt.F(1700, 1040);
  let cl = cols || (S.fmt.h ? Math.min(items.length, 4) : Math.min(items.length, items.length === 4 ? 2 : 3));
  cl = Math.max(1, Math.min(cl, Math.floor((maxW + gap) / (cw + gap))));
  const pos = grid(S, items.length, x, y, cw, gap, cl, sz);
  items.forEach(([ic, lb, t, mk, bg], i) => c1(S, `${pre}${i}`, pos[i].x, pos[i].y, ic, lb, t, { size: sz, bg: bg || C.bone, mk: mk ?? null }));
  return pos;
}
export const all = (pre, n, m = false) => [...Array(n)].map((_, i) => `#${pre}${i}${m ? `,#${pre}${i}m` : ""}`).join(",");
export function gone(S, sels, t, dur = 0.3) {
  const list = sels.split(",").map((s) => s.trim()).filter(Boolean);
  if (!list.length) return;
  S.tw(`tl.to("${list.join(",")}",{scale:0.5,opacity:0,duration:${dur},stagger:0.03,ease:"power2.in"},${r3(t)});`);
}
// Panel libre (HTML dentro)
export function box(S, id, x, y, w, h, inner, t, { bg = C.bone, z = 8, fx = "pop" } = {}) {
  S.add(`<div id="${id}" class="card" style="left:${r3(x - w / 2)}px;top:${r3(y - h / 2)}px;width:${w}px;height:${h}px;background:${bg};z-index:${z};opacity:0;flex-direction:column;padding:20px;gap:12px">${inner}</div>`);
  if (fx === "pop") pop(S, `#${id}`, t); else if (fx === "slam") slam(S, `#${id}`, t); else fadeUp(S, `#${id}`, t);
}
// Iconos sueltos que salen alrededor de un punto (estrellas de fama, dolor, notas…)
export function sprinkle(S, id, x, y, ic, t, { n = 5, color = "#ffd36b", size = 90, r = 260, dur = 2 } = {}) {
  let h = "";
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + (i - (n - 1) / 2) * 0.55, px = x + Math.cos(a) * r, py = y + Math.sin(a) * r * 0.8;
    h += `<div id="${id}${i}" class="prop" style="left:${r3(px - size / 2)}px;top:${r3(py - size / 2)}px;z-index:9;opacity:0;filter:drop-shadow(0 5px 0 ${C.ink})">${icon(ic, { size, color })}</div>`;
  }
  S.add(h);
  for (let i = 0; i < n; i++) S.tw(`tl.fromTo("#${id}${i}",{opacity:0,scale:0.2,rotation:-30},{opacity:1,scale:1,rotation:0,duration:0.35,ease:"back.out(2)"},${r3(t + i * 0.08)});tl.to("#${id}${i}",{y:-30,duration:0.6,yoyo:true,repeat:${Math.max(1, Math.round(dur / 0.6))},ease:"sine.inOut"},${r3(t + 0.4)});`);
}
// Cierre de capítulo: vista general y salida
export function outro(S, line, x, { k = 1.55, y = null } = {}) {
  const end = S.t1 - S.t0, t = Math.min(S.line(line).end + 0.05, end - 1.25);
  const b = spotBox(S, x, k);
  camTo(S, t, b, { dur: 0.75, ease: "power2.inOut" });
  exit(S, { dur: 0.45 });
}
// Rótulo «HOY» para comparaciones modernas
export const HOY = `<span style="display:inline-block;background:${C.green};color:${C.ink};border:5px solid ${C.ink};border-radius:14px;padding:0 14px;font:900 0.7em Inter;vertical-align:middle">HOY</span>`;
// Insignia de semana (luna + «SEMANA N») sobre una placa oscura para que se lea sobre cualquier fondo
export function semana(S, id, x, y, phase, title, t) {
  const F = S.fmt.F;
  S.add(`<div id="${id}bg" class="prop" style="left:${r3(x - F(470, 450))}px;top:${r3(y - 150)}px;width:${F(940, 900)}px;height:300px;border-radius:40px;background:rgba(20,14,30,.72);border:6px solid ${C.ink};z-index:8;opacity:0"></div>`);
  S.tw(`tl.fromTo("#${id}bg",{opacity:0,scale:1.3},{opacity:1,scale:1,duration:0.3},${r3(t - 0.2)});`);
  moonBadge(S, id, x, y, phase, title, t, { size: F(220, 200) });
  return `#${id},#${id}bg`;
}
// Contador grande con placa oscura detrás
export function num(S, id, x, y, { from = 0, to = 100, t = 0, dur = 0.9, size = 170, suf = "", w = 1200, bw = 900, bh = null } = {}) {
  S.add(`<div id="${id}bg" class="prop" style="left:${r3(x - bw / 2)}px;top:${r3(y - (bh || size * 1.3) / 2)}px;width:${bw}px;height:${bh || size * 1.3}px;border-radius:36px;background:rgba(36,22,13,.78);border:6px solid ${C.ink};z-index:8;opacity:0"></div>`);
  S.tw(`tl.fromTo("#${id}bg",{opacity:0,scale:0.6},{opacity:1,scale:1,duration:0.25,ease:"back.out(1.7)"},${r3(t - 0.15)});`);
  counter(S, id, x, y, { from, to, t, dur, size, suf, w });
  S.tw(`tl.fromTo("#${id}",{opacity:0,scale:1.8},{opacity:1,scale:1,duration:0.25,ease:"power3.out"},${r3(t - 0.1)});`);
  return `#${id},#${id}bg`;
}

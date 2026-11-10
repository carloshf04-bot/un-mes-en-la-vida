// Motor de los capítulos del vikingo. Cada frase se monta con say(K, n, [...]): lo que aparece va pegado a su palabra
// (S.W(frase, "palabra")) y lo de la frase anterior se recoge al empezar la siguiente. Los rótulos y tarjetas van en
// «huecos» de la zona de información (a la derecha en horizontal; arriba, sobre las cabezas, en vertical).
import { C, r3, icon, camTo, shake, pose, talk, shiver, burst, stampX, GEAR } from "./lib.mjs";
import { G } from "./vk_fondos.mjs";
import { spotBox, pop, slam, fadeUp, mark, wobble, pulse, arrow } from "./lib2.mjs";
import { cut, move, who, go, gearOn, gearOff, appear, vanish, hidden, tx, cards, all, gone, box, sprinkle, num } from "./gm_lib.mjs";

export function kit(S) {
  const F = S.fmt.F, h = S.fmt.h;
  const K = { S, F, h, x: 0, prev: [], A: {}, k: 0, u: 0 };
  K.W = (l, w, dt = 0) => { const [ww, nn] = String(w).split("#"); return r3(S.W(l, ww, +(nn || 1)) + dt); };
  K.L = (i) => S.line(i);
  K.sy = (k) => (h ? G - 800 + k * 210 : G - 1210 + k * 210);
  K.ix = () => (h ? K.x + 380 : K.x);
  K.ax = (k) => (h ? K.x - 640 + k * 330 : K.x - 330 + k * 330);
  K.id = (p = "e") => `${S.id}-${p}${++K.u}`;
  return K;
}
// Actor en un hueco (0, 1, 2) o en una x absoluta. o.hid: empieza oculto
export function actorK(K, name, kind, k, o = {}) {
  const x = Math.abs(k) < 10 ? K.ax(k) : k;
  const a = who(K.S, `${K.S.id}-${name}${++K.k}`, kind, x, { seed: K.k, ...o });
  if (o.hid) hidden(K.S, a);
  else if (K.tcut) K.S.tw(`tl.set("#${a.id}${a.sh ? `,#${a.id}-sh` : ""}",{opacity:0},0);tl.set("#${a.id}${a.sh ? `,#${a.id}-sh` : ""}",{opacity:1},${r3(K.tcut)});`);
  K.A[name] = a;
  return a;
}
const lines = (str, size, w) => { const t = String(str).replace(/<[^>]+>/g, ""); return Math.max(String(str).split("<br>").length, Math.ceil((t.length * 0.62 * size) / (w - 60))); };

export function say(K, n, items, o = {}) {
  const { S, F, h } = K, t0 = K.L(n).start;
  if (!o.keep && K.prev.length) { gone(S, K.prev.join(","), r3(t0 - 0.22)); K.prev = []; }
  let s = o.slot ?? 0;
  const T = (w, dt = 0) => K.W(n, w, dt);
  const P = (sel) => { if (sel) K.prev.push(sel); };
  for (const it of items) {
    const ty = it[0], id = K.id(`f${n}`);
    if (ty === "t") { // rótulo: ["t", palabra, texto, {c, size, u (uncial), fx, x, y, dt, w}]
      const [, w, str, op = {}] = it, size = op.size || F(84, 74), ww = op.w || F(1150, 1000);
      tx(S, id, op.x ?? K.ix(), op.y ?? K.sy(s), str, T(w, op.dt || 0), { size, color: op.c || C.bone, roman: op.u, fx: op.fx || "slam", w: ww });
      if (op.y === undefined) { const nl = lines(str, size, ww); s += nl > 2 ? 2.2 : nl === 2 ? 1.5 : 1; }
      if (!op.stay) P(`#${id}`);
    } else if (ty === "c" || ty === "i") { // tarjetas: ["c", [[icono, etiqueta, palabra, marca, fondo]...], {size, cols, y}] · ["i", palabra, icono, etiqueta, marca, {..}]
      const list = ty === "c" ? it[1] : [[it[2], it[3], it[1], it[4], it[5]?.bg]];
      const op = (ty === "c" ? it[2] : it[5]) || {};
      const size = op.size || F(220, 200), cols = op.cols || (h ? Math.min(list.length, 4) : Math.min(list.length, 3)), rows = Math.ceil(list.length / cols);
      const y = op.y ?? K.sy(s) + ((rows - 1) * (size + 30)) / 2;
      cards(S, id, op.x ?? K.ix(), y, list.map(([ic, lb, w, mk, bg]) => [ic, lb, T(w, op.dt || 0), mk, bg]), { size, cols });
      if (op.y === undefined) s += Math.max(1, Math.ceil((rows * (size + 30)) / 210));
      P(all(id, list.length, true));
    } else if (ty === "n") { // número: ["n", palabra, hasta, sufijo, {from, size, bw}]
      const [, w, to, suf = "", op = {}] = it;
      P(num(S, id, op.x ?? K.ix(), op.y ?? K.sy(s) + 10, { from: op.from || 0, to, t: T(w), suf, size: op.size || F(140, 120), w: F(1200, 1000), bw: op.bw || F(760, 720), dur: op.dur || 0.6 }));
      if (op.y === undefined) s++;
    } else if (ty === "x" || ty === "ok") { // marca sobre un hueco: ["x", palabra, {s, x, y, size}]
      const [, w, op = {}] = it;
      mark(S, id, op.x ?? K.ix(), op.y ?? K.sy(op.s ?? Math.max(0, s - 1)), op.size || F(200, 180), T(w), ty === "ok"); P(`#${id}`);
    } else if (ty === "p") { const [, w, a, p, dt = 0, d = 0.3] = it; pose(S, K.A[a], T(w, dt), p, d); }
    else if (ty === "g") { const [, w, a, k, dt = 0] = it; gearOn(S, K.A[a], k, T(w, dt)); }
    else if (ty === "G") { const [, w, a, k, dt = 0] = it; gearOff(S, K.A[a], k, T(w, dt)); }
    else if (ty === "in") { const [, w, a, dt = -0.1] = it; appear(S, K.A[a], T(w, dt)); S.cue(T(w, dt), "pop", 0.5); }
    else if (ty === "out") { const [, w, a, dt = 0] = it; vanish(S, K.A[a], T(w, dt)); }
    else if (ty === "go") { const [, w, a, x1, d = 0.8, run = false, dt = -0.2] = it; go(S, K.A[a], T(w, dt), T(w, dt + d), Math.abs(x1) < 10 ? K.ax(x1) : x1, { run }); }
    else if (ty === "talk") { const [, w, a, d = 1.2] = it; talk(S, K.A[a], T(w), T(w, d)); }
    else if (ty === "shiver") { const [, w, a, d = 0.8] = it; shiver(S, K.A[a], T(w), T(w, d)); }
    else if (ty === "fx") { const [, w, a, f, d = 0.4] = it; S.tw(`tl.to("#${K.A[a].id}",{filter:"${f}",duration:${d}},${T(w)});`); }
    else if (ty === "wob") { const [, w, sel, nn = 4, deg = 6] = it; wobble(S, sel.startsWith("#") ? sel : `#${K.A[sel].id}`, T(w), nn, deg); }
    else if (ty === "pulse") { const [, w, sel] = it; pulse(S, sel, T(w)); }
    else if (ty === "cam") { const [, w, k = 1, dx = 0, dy = 0, d = 0.8, dt = -0.1] = it; const b = spotBox(S, K.x + dx, k); b.y += dy; camTo(S, T(w, dt), b, { dur: d, ease: "power2.inOut" }); }
    else if (ty === "cut") { const [, w, name, dt = -0.5, x = null] = it; const t = T(w, dt); if (K.prev.length) { gone(S, K.prev.join(","), r3(t - 0.1)); K.prev = []; } cut(S, t, name, { x }); K.x = x ?? S.escs[name].x; K.tcut = r3(t + 0.5); }
    else if (ty === "mv") { const [, w, x1, dt = -0.4] = it; move(S, T(w, dt), x1); K.x = x1; }
    else if (ty === "sfx") { const [, w, k, g = 1] = it; S.cue(T(w), k, g); }
    else if (ty === "shake") { const [, w, amp = 14] = it; shake(S, T(w), amp, 0.4); }
    else if (ty === "b") { const [, w, x, y, op = {}] = it; burst(S, id, x, y, T(w, op.dt || 0), { n: 12, spread: 140, up: 140, size: 14, seed: n, ...op }); }
    else if (ty === "f") { const r = it[1](T, id, s, K); if (r?.sel) P(r.sel); if (r?.s !== undefined) s = r.s; else if (typeof r === "string") P(r); }
  }
  return s;
}
// Pieza SVG libre en el mundo (opacidad 0); show() la hace aparecer
export function art(K, id, x, y, w, h, vb, inner, { z = 8 } = {}) {
  K.S.add(`<svg id="${id}" class="prop" style="left:${r3(x - w / 2)}px;top:${r3(y - h / 2)}px;z-index:${z};opacity:0" width="${w}" height="${h}" viewBox="${vb}" overflow="visible">${inner}</svg>`);
  return `#${id}`;
}
// Mapa plano de Escandinavia (Noruega, Suecia, Jutlandia, islas británicas). pts: [[ETIQUETA, x, y, t]] en un lienzo de 1000×700
export const PTS = { KAUPANG: [372, 372], VESTFOLD: [360, 352], OSLO: [395, 300], HEDEBY: [345, 610], BIRKA: [640, 330], INGLATERRA: [70, 560], DINAMARCA: [420, 540], SUECIA: [600, 250], ESTE: [930, 420], NORUEGA: [270, 170], BRITANICAS: [70, 470] };
export function mapa(K, id, x, y, t, pts = [], { w = null, routes = [], regions = [], title = "" } = {}) {
  const { S, F } = K, W = w || F(1000, 920), H = W * 0.7;
  const land = `<path d="M210,0 L1000,0 L1000,470 C900,500 800,470 720,430 C660,400 640,330 600,390 C560,450 520,420 470,380 C430,350 410,400 390,390 C350,370 340,330 300,320 C250,300 220,240 200,180 C185,110 190,50 210,0Z" fill="#b9c7a0" stroke="${C.ink}" stroke-width="5"/>
    <path d="M330,690 C320,620 330,520 360,470 C390,450 410,480 400,520 C395,560 420,560 440,540 C470,520 480,560 460,600 C440,640 420,660 420,700Z" fill="#b9c7a0" stroke="${C.ink}" stroke-width="5"/>
    <path d="M0,330 C50,340 100,420 110,500 C120,580 90,630 40,680 L0,690Z" fill="#b9c7a0" stroke="${C.ink}" stroke-width="5"/><path d="M250,700 L1000,700 L1000,620 C820,640 600,660 470,690Z" fill="#b9c7a0" stroke="${C.ink}" stroke-width="5"/>
    <path d="M380,390 C390,340 395,300 398,270" stroke="#5f8ab0" stroke-width="12" fill="none" stroke-linecap="round"/>`;
  const reg = regions.map(([rx, ry, rr, c], i) => `<ellipse id="${id}-rg${i}" cx="${rx}" cy="${ry}" rx="${rr}" ry="${rr * 0.7}" fill="${c || "#d9a72b"}" opacity="0"/>`).join("");
  const ps = pts.map(([lb, px, py], i) => `<g id="${id}-p${i}" opacity="0"><circle cx="${px}" cy="${py}" r="16" fill="${C.red}" stroke="${C.ink}" stroke-width="5"/><text x="${px + (px > 760 ? -26 : 26)}" y="${py + 14}" text-anchor="${px > 760 ? "end" : "start"}" font-family="Inter" font-weight="900" font-size="84" fill="${C.ink}" stroke="#f4e6cf" stroke-width="14" paint-order="stroke">${lb}</text></g>`).join("");
  const rs = routes.map(([a, b], i) => { const [x1, y1] = [pts[a][1], pts[a][2]], [x2, y2] = [pts[b][1], pts[b][2]], mx = (x1 + x2) / 2 - 120, my = (y1 + y2) / 2; return `<path id="${id}-r${i}" d="M${x1},${y1} Q${mx},${my} ${x2},${y2}" stroke="${C.ochre}" stroke-width="12" fill="none" stroke-dasharray="26 16" stroke-linecap="round" pathLength="1000"/>`; }).join("");
  S.add(`<div id="${id}" class="card" style="left:${r3(x - W / 2)}px;top:${r3(y - H / 2)}px;width:${W}px;height:${r3(H)}px;background:#8fb6cf;z-index:8;opacity:0;overflow:hidden;padding:0"><svg width="100%" height="100%" viewBox="0 0 1000 700">${land}${reg}${rs}${ps}${title ? `<text x="980" y="680" text-anchor="end" font-family="Inter" font-weight="900" font-size="40" fill="#24324e" opacity=".6">${title}</text>` : ""}</svg></div>`);
  pop(S, `#${id}`, t);
  pts.forEach(([, , , tt], i) => S.tw(`tl.fromTo("#${id}-p${i}",{opacity:0,scale:2,transformOrigin:"50% 50%"},{opacity:1,scale:1,duration:0.3,ease:"back.out(2)"},${r3(tt ?? t + 0.2)});`));
  routes.forEach(([, , tt, d = 1.2], i) => S.tw(`tl.fromTo("#${id}-r${i}",{strokeDashoffset:1000,strokeDasharray:"1000 1000"},{strokeDashoffset:0,duration:${d},ease:"power1.inOut"},${r3(tt)});`));
  regions.forEach(([, , , , tt], i) => S.tw(`tl.to("#${id}-rg${i}",{opacity:0.55,duration:0.4},${r3(tt)});`));
  return `#${id}`;
}
// Fase de la luna pequeña (para la fila de fases)
export const moonSvg = (ph, r = 60) => { const sh = ph === 1 ? "" : ph === 0 ? `<circle r="${r}" fill="#2a3150"/>` : `<path d="M0,${-r} A${r},${r} 0 0,${ph > 0 ? 0 : 1} 0,${r} A${r * 0.35},${r} 0 0,${ph > 0 ? 1 : 0} 0,${-r}Z" fill="#2a3150"/>`; return `<circle r="${r}" fill="#f4ecd2" stroke="${C.ink}" stroke-width="6"/>${sh}<circle r="${r}" fill="none" stroke="${C.ink}" stroke-width="6"/>`; };
// Una pieza del GEAR suelta en el mundo (casco fantasma, cuerno…), escalada
export function gearArt(K, id, key, x, y, s = 1.35, { z = 8, op = 1 } = {}) {
  K.S.add(`<div id="${id}" class="prop" style="left:${r3(x - 130 * s)}px;top:${r3(y - 470 * s)}px;width:${r3(260 * s)}px;height:${r3(480 * s)}px;z-index:${z};opacity:0"><svg viewBox="-130 -470 260 480" width="100%" height="100%" overflow="visible"><g opacity="${op}">${GEAR[key]}</g></svg></div>`);
  return `#${id}`;
}
export { G, C, r3, icon, pop, slam, fadeUp, stampX, arrow, box, sprinkle, tx, gone, camTo, spotBox };

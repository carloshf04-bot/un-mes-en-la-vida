// Librería del generador: formato, cámara, personajes SVG, iconos, textos y utilidades.
// Todo lo que se anima es función del tiempo de la línea de GSAP (renderizado determinista).
import fs from "fs";
import path from "path";

export const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");

// ---------- Formato ----------
export function makeFormat(fmt) {
  const h = fmt === "h";
  const W = h ? 1920 : 1080, H = h ? 1080 : 1920;
  // Zona donde vive el contenido (fuera de subtítulos y zonas seguras de las apps)
  const R = h ? { x: 80, y: 60, w: 1760, h: 820 } : { x: 70, y: 470, w: 940, h: 1010 };
  return { fmt, h, W, H, R, F: (a, b) => (h ? a : b) };
}

// ---------- Paleta ----------
export const C = {
  ink: "#24160d", ink2: "#3a2616", bone: "#f4e6cf", bone2: "#e6d2b0",
  ochre: "#d9822b", ochreD: "#a85a1c", red: "#e5484d", redD: "#a3262a",
  green: "#4fbf6a", greenD: "#2a8044", snow: "#e8eef5", snowS: "#b9c7d6",
  skin: "#d9a273", skinS: "#b97f52", fire: "#ff9b3d", fire2: "#ffd36b",
  rock: "#6d5646", rockD: "#4a3a30", night: "#101a2c", night2: "#24324e",
};

// ---------- Utilidades ----------
export function rng(seed) { // mulberry32
  let a = seed >>> 0;
  return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
export const r3 = (x) => Math.round(x * 1000) / 1000;
export const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");

// ---------- Iconos Phosphor (librería, nunca dibujados a mano) ----------
const PH = path.join(ROOT, "build/node_modules/@phosphor-icons/core/assets");
export function icon(name, { size = 120, color = C.ink, weight = "fill" } = {}) {
  const file = path.join(PH, weight, `${name}${weight === "regular" ? "" : "-" + weight}.svg`);
  let svg = fs.readFileSync(file, "utf8");
  svg = svg.replace("<svg", `<svg width="${size}" height="${size}" style="display:block;color:${color}"`)
    .replace(/fill="currentColor"/g, `fill="${color}"`);
  if (!/fill="/.test(svg.split(">")[0])) svg = svg.replace("<svg", `<svg fill="${color}"`);
  return svg;
}

// ---------- Escena: acumula HTML y código GSAP ----------
export class Scene {
  constructor(id, fmt, words, frases, t0, t1) {
    Object.assign(this, { id, fmt, words, frases, t0, t1 });
    this.html = []; this.bg = []; this.over = []; this.js = []; this.css = [];
    this.n = 0; this.cam = null; this.cues = [];
  }
  uid(p = "e") { return `${this.id}-${p}${++this.n}`; }
  // Efecto de sonido en el tiempo local t
  cue(t, k, g = 1) { this.cues.push({ t: r3(t + this.t0), k, g }); }
  // Tiempo local (la escena empieza en 0)
  L(t) { return r3(t - this.t0); }
  // P("palabra", n): cuándo EMPIEZA la n-ésima vez que se dice esa palabra en el vídeo
  P(word, n = 1) { return this.L(findWord(this.words, word, n).start); }
  PE(word, n = 1) { return this.L(findWord(this.words, word, n).end); }
  // Palabra dentro de una frase concreta del guion (más robusto)
  W(line, word, n = 1) {
    const ws = this.words.filter((w) => w.line === line && w.n === normWord(word));
    if (!ws[n - 1]) throw new Error(`No encuentro "${word}" (${n}) en la frase ${line}`);
    return this.L(ws[n - 1].start);
  }
  line(i) { return { start: this.L(this.frases[i - 1].start), end: this.L(this.frases[i - 1].end) }; }
  add(h) { this.html.push(h); }
  tw(code) { this.js.push(code); }
}

export function normWord(w) {
  return w.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-zñ0-9]/g, "");
}
export function findWord(words, word, n = 1) {
  const k = normWord(word); let c = 0;
  for (const w of words) if (w.n === k && ++c === n) return w;
  throw new Error(`P("${word}", ${n}): no está en la transcripción`);
}

// ---------- Cámara ----------
// box = {x, y, w, h} en coordenadas del mundo. Devuelve {x, y, scale} del contenedor del mundo.
export function fit(fmt, box, pad = 1) {
  const { R } = fmt;
  const z = Math.min(R.w / (box.w * pad), R.h / (box.h * pad));
  return { x: r3(R.x + R.w / 2 - (box.x + box.w / 2) * z), y: r3(R.y + R.h / 2 - (box.y + box.h / 2) * z), scale: r3(z) };
}
// Mueve la cámara (y los fondos con paralaje) a un encuadre
export function camTo(S, t, box, { dur = 1.2, ease = "power2.inOut", pad = 1, blur = 0 } = {}) {
  const c = fit(S.fmt, box, pad);
  S.cam = c;
  S.tw(`tl.to("#${S.id}-world",{x:${c.x},y:${c.y},scale:${c.scale},duration:${dur},ease:"${ease}"},${r3(t)});`);
  for (const [sel, f] of S.parallax || []) {
    S.tw(`tl.to("#${sel}",{x:${r3(c.x * f)},y:${r3((c.y + 0) * f * 0.35)},duration:${dur},ease:"${ease}"},${r3(t)});`);
  }
  if (blur) {
    S.cue(t, "whoosh");
    S.tw(`tl.fromTo("#${S.id}-world",{filter:"blur(0px)"},{filter:"blur(${blur}px)",duration:${r3(dur / 2)},ease:"power2.in",yoyo:true,repeat:1},${r3(t)});`);
  }
  return c;
}
export function camSet(S, t, box, pad = 1) {
  const c = fit(S.fmt, box, pad); S.cam = c;
  S.tw(`tl.set("#${S.id}-world",{x:${c.x},y:${c.y},scale:${c.scale}},${r3(t)});`);
  for (const [sel, f] of S.parallax || []) S.tw(`tl.set("#${sel}",{x:${r3(c.x * f)},y:${r3(c.y * f * 0.35)}},${r3(t)});`);
  return c;
}
export function shake(S, t, amp = 14, dur = 0.35) {
  if (amp >= 14) S.cue(t - 0.03, "impact", Math.min(1, amp / 22));
  const id = `${S.id}-shake`;
  S.tw(`tl.fromTo("#${id}",{x:0,y:0},{keyframes:[{x:${amp},y:${-amp * 0.6}},{x:${-amp * 0.8},y:${amp * 0.5}},{x:${amp * 0.5},y:${amp * 0.3}},{x:${-amp * 0.3},y:0},{x:0,y:0}],duration:${dur},ease:"none"},${r3(t)});`);
}

// ---------- Personajes 2D articulados (SVG) ----------
// Origen en los pies (0,0). Todas las articulaciones giran sobre su punto (svgOrigin).
const OUT = C.ink, SW = 4.5;
export const CAST = {
  tarko: { skin: C.skin, skinS: C.skinS, hair: "#2b1a10", tunic: "#8a5a35", tunic2: "#6b4226", fur: "#c9a27a", pants: "#5a3b22", boot: "#3d2817", beard: true, h: 1 },
  lia: { skin: "#c98f62", skinS: "#a8724a", hair: "#5a2e14", tunic: "#c27b3a", tunic2: "#9c5c26", fur: "#ead2a8", pants: "#6e4a2a", boot: "#3d2817", braid: true, h: 0.95 },
  nima: { skin: "#dcae82", skinS: "#bb8a5f", hair: "#3b2211", tunic: "#c9472e", tunic2: "#9e3320", fur: "#f0dcb8", pants: "#7a4b2b", boot: "#3d2817", kid: true, h: 0.62 },
  ama: { skin: "#c99572", skinS: "#a47354", hair: "#d8d2c8", tunic: "#5e6b4a", tunic2: "#47533a", fur: "#d9c9a8", pants: "#4b3a2a", boot: "#3d2817", old: true, h: 0.9 },
  felix: { skin: "#d9a273", skinS: "#b97f52", hair: "#3b2211", tunic: "#d9a273", tunic2: "#7a4a22", fur: "#d9a273", pants: "#d9a273", boot: "#6b4226", bare: true, beard: false, h: 1 },
  ret: { skin: "#a8724a", skinS: "#87573a", hair: "#140d08", tunic: "#a8724a", tunic2: "#7a4a22", fur: "#a8724a", pants: "#a8724a", boot: "#6b4226", bare: true, beard: true, h: 1.03 },
  lanista: { skin: "#d6a07a", skinS: "#b5805a", hair: "#d6a07a", tunic: "#7a3b2e", tunic2: "#5a2a20", fur: "#c9a27a", pants: "#d6a07a", boot: "#5a3b22", beard: true, h: 1.05 },
  arbitro: { skin: "#d9a273", skinS: "#b97f52", hair: "#5a3b22", tunic: "#efe9df", tunic2: "#b5532f", fur: "#efe9df", pants: "#d9a273", boot: "#6b4226", h: 1 },
  galeno: { skin: "#d6a07a", skinS: "#b5805a", hair: "#9a958c", tunic: "#e9e2d0", tunic2: "#6b2d5c", fur: "#e9e2d0", pants: "#e9e2d0", boot: "#6b4226", beard: true, old: false, h: 1 },
  gladia: { skin: "#c98f62", skinS: "#a8724a", hair: "#3b1a0a", tunic: "#b5532f", tunic2: "#7a2e18", fur: "#d9a72b", pants: "#c98f62", boot: "#6b4226", braid: true, h: 0.97 },
  moderno: { skin: C.skin, skinS: C.skinS, hair: "#2b1a10", tunic: "#3f6fb5", tunic2: "#2f548c", fur: "#3f6fb5", pants: "#2e4a7a", boot: "#f2f2f2", beard: true, h: 1 },
  // ---- Un mes en la vida de un gladiador (año 80) ----
  // Félix cautivo (intro y llegada): túnica raída; pies blanqueados con yeso, como los esclavos recién traídos (Plinio, HN 35.199)
  felixcap: { skin: "#d9a273", skinS: "#b97f52", hair: "#3b2211", tunic: "#8c7b62", tunic2: "#6b5c46", fur: "#a8957a", pants: "#d9a273", boot: "#e6dfd2", h: 1 },
  // El doctor: exgladiador, canoso, robusto, túnica parda de trabajo. Lleva la rudis de retirado
  doctor: { skin: "#c58c5e", skinS: "#a36e45", hair: "#77726a", tunic: "#7a5a3a", tunic2: "#54402a", fur: "#b89a74", pants: "#c58c5e", boot: "#4a3220", beard: true, h: 1.08 },
  // Tito: afeitado (como en sus retratos), toga blanca con franja púrpura y calzado rojo
  tito: { skin: "#e0b08a", skinS: "#bf8e68", hair: "#3a2a1e", tunic: "#f3eee2", tunic2: "#6b2d5c", fur: "#f3eee2", pants: "#f3eee2", boot: "#8a2e2a", h: 1 },
  // Prisco y Vero: se distinguen por el cinturón (azul o verde) y el penacho de la galea
  prisco: { skin: "#d0976a", skinS: "#ae7a50", hair: "#2b1a10", tunic: "#d0976a", tunic2: "#3f5f8a", fur: "#d0976a", pants: "#d0976a", boot: "#6b4226", bare: true, h: 1.02 },
  vero: { skin: "#b9805a", skinS: "#986344", hair: "#1e140c", tunic: "#b9805a", tunic2: "#7a8a4a", fur: "#b9805a", pants: "#b9805a", boot: "#6b4226", bare: true, beard: true, h: 0.99 },
  // Médico de la escuela (año 80); no es Galeno
  medicus: { skin: "#d6a07a", skinS: "#b5805a", hair: "#4a3424", tunic: "#e9e2d0", tunic2: "#3f6a6a", fur: "#e9e2d0", pants: "#d6a07a", boot: "#6b4226", beard: true, h: 0.98 },
  // Aficionada en la grada: túnica larga azul y manto ocre
  fan: { skin: "#e0b48c", skinS: "#c0926a", hair: "#5a2e14", tunic: "#4a6fa5", tunic2: "#2f4f7a", fur: "#d9a72b", pants: "#4a6fa5", boot: "#7a4a22", braid: true, h: 0.94 },
  // Vendedor de recuerdos (vasos y lámparas)
  vendedor: { skin: "#c98f62", skinS: "#a8724a", hair: "#9a958c", tunic: "#7a8a4a", tunic2: "#56633a", fur: "#d9c9a8", pants: "#c98f62", boot: "#5a3b22", beard: true, old: true, h: 0.95 },
  // Guardia de la escuela (no es legionario: túnica y lanza)
  custos: { skin: "#c08a60", skinS: "#9e6c46", hair: "#2b1a10", tunic: "#8a3a2a", tunic2: "#5a2620", fur: "#9a8a6a", pants: "#c08a60", boot: "#4a3220", h: 1.04 },
  // Rotulista de anuncios: el cuello y las bandas de las piernas, manchados de rojo
  pictor: { skin: "#d9a273", skinS: "#b97f52", hair: "#5a3b22", tunic: "#c9b38a", tunic2: "#a0703c", fur: "#b3261e", pants: "#d9a273", boot: "#6b4226", h: 0.97 },
  // Músico de la arena (tuba, cornu): túnica blanca con franjas rojas
  musico: { skin: "#c98f62", skinS: "#a8724a", hair: "#2b1a10", tunic: "#efe9df", tunic2: "#b5532f", fur: "#efe9df", pants: "#c98f62", boot: "#6b4226", h: 1 },
  // El antiguo «galo» (frase 11, pasado, en sepia): pelo rojizo, bigote y escudo galo
  gallus: { skin: "#e0b48c", skinS: "#c0926a", hair: "#a8582a", tunic: "#e0b48c", tunic2: "#4a6a3a", fur: "#e0b48c", pants: "#8a6a3a", boot: "#5a3b22", bare: true, h: 1.03 },
  // Figuras «de piedra» del relieve de Halicarnaso (frase 116): todo en tonos de piedra
  lapis: { skin: "#c9bda4", skinS: "#a89c84", hair: "#a89c84", tunic: "#bfb39a", tunic2: "#9a8e78", fur: "#c9bda4", pants: "#c9bda4", boot: "#9a8e78", braid: true, h: 0.97 },

  // ---- Un mes en la vida de un vikingo (Vestfold y Hedeby, h. 890) ----
  // Ulf: túnica azul glasto desvaída, ribete y vendas de pierna de lana cruda, pantalón pardo, zapatos de cuero
  ulf: { skin: "#e8b893", skinS: "#c7936c", hair: "#b07a3a", tunic: "#5f7a8c", tunic2: "#3f5566", fur: "#d8cbb0", pants: "#8a7a5e", boot: "#4a3220", beard: true, h: 1 },
  // Ása: vestido de lino crudo bajo el delantal-vestido azul (pants = color del vestido largo)
  asa: { skin: "#efc6a2", skinS: "#cfa07a", hair: "#d9b46a", tunic: "#e6dcc6", tunic2: "#3f5f7a", fur: "#e6dcc6", pants: "#3f5f7a", boot: "#4a3220", braid: true, h: 0.95 },
  // Kári: lana sin teñir
  kari: { skin: "#efc29c", skinS: "#cf9e78", hair: "#e3c88a", tunic: "#a8946a", tunic2: "#6b5a3a", fur: "#d8cbb0", pants: "#7a6a4e", boot: "#4a3220", kid: true, h: 0.62 },
  // Geirmund: rojo de rubia con ribete amarillo de tablillas; pantalón gris oscuro
  geirmund: { skin: "#e0ae88", skinS: "#bf8c66", hair: "#6b4a2a", tunic: "#9e3a2a", tunic2: "#6b241a", fur: "#d9a72b", pants: "#4a4a55", boot: "#3a2414", beard: true, h: 1.08 },
  // Hallvard: anciano, verde apagado (gualda + glasto)
  hallvard: { skin: "#dcae8c", skinS: "#bb8c6a", hair: "#e6e1d6", tunic: "#6f7f52", tunic2: "#4f5a3a", fur: "#d8cbb0", pants: "#6b5a46", boot: "#4a3220", beard: true, old: true, h: 1 },
  // Poppo: mercader frisón, beis y pardo oscuro, sin barba
  poppo: { skin: "#d9a882", skinS: "#b88762", hair: "#3b2a1a", tunic: "#c9b48a", tunic2: "#5a4632", fur: "#8a6a4a", pants: "#5a4632", boot: "#3a2414", h: 0.98 },

  // ---- Figurantes ----
  // Remeros y vecinos: dos variantes de lana natural (clonar y cambiar el pelo si hace falta)
  remero1: { skin: "#e4b48e", skinS: "#c39068", hair: "#8a5a2a", tunic: "#8a7a5e", tunic2: "#5a4c38", fur: "#d8cbb0", pants: "#6b5a46", boot: "#4a3220", beard: true, h: 1.02 },
  remero2: { skin: "#d8a47e", skinS: "#b8845e", hair: "#c9a060", tunic: "#7a5a3a", tunic2: "#54402a", fur: "#d8cbb0", pants: "#5a4c38", boot: "#3a2414", h: 0.98 },
  // Esclava cautiva en Hedeby (n.º 18): lana basta sin teñir; lleva grilletes (GEAR.shackle)
  thrall: { skin: "#e0b48c", skinS: "#c0926a", hair: "#5a3a22", tunic: "#b8ab90", tunic2: "#8a7e66", fur: "#b8ab90", pants: "#b8ab90", boot: "#8a6a4a", braid: true, h: 0.93 },
  // Inserto «921 · VOLGA» (n.º 21): un rus tatuado y el viajero Ibn Fadlan
  rus: { skin: "#e6b896", skinS: "#c59470", hair: "#9a6a32", tunic: "#e6b896", tunic2: "#5a3b22", fur: "#e6b896", pants: "#7a6a52", boot: "#4a3220", bare: true, beard: true, h: 1.05 },
  fadlan: { skin: "#b9845c", skinS: "#98663f", hair: "#1e140c", tunic: "#2f4f6a", tunic2: "#d9a72b", fur: "#efe6d2", pants: "#2f4f6a", boot: "#5a3b22", beard: true, h: 0.98 },
  // Inserto «1876 · BAYREUTH» (M1): el cantante de ópera con el traje de Doepler
  opera: { skin: "#f0c8a8", skinS: "#d0a080", hair: "#c9a060", tunic: "#7a6a9a", tunic2: "#c9a24a", fur: "#d9c9a8", pants: "#5a4a6a", boot: "#8a5a35", beard: true, h: 1.05 },
  hunter2: { skin: "#b9805a", skinS: "#986344", hair: "#1e140c", tunic: "#6f6a3a", tunic2: "#54502b", fur: "#bfa57a", pants: "#4b3a22", boot: "#33220f", h: 1.02 },
};

export function person(id, k, props = {}) {
  const c = CAST[k];
  const hs = c.kid ? 1.28 : 1; // cabeza más grande en niños
  const hairPath = c.old
    ? `M-46,-360 C-50,-410 -10,-418 10,-414 C46,-410 56,-380 50,-352 C44,-372 30,-388 4,-392 C-20,-392 -36,-380 -46,-360Z M-48,-362 C-58,-330 -52,-300 -40,-296 L-36,-340Z`
    : c.braid
    ? `M-48,-350 C-56,-404 -8,-424 18,-416 C52,-408 60,-372 50,-346 C40,-372 22,-390 0,-388 C-18,-386 -36,-372 -48,-350Z M-50,-352 C-66,-320 -60,-262 -50,-230 C-40,-262 -38,-300 -38,-336Z`
    : `M-50,-344 C-62,-392 -30,-428 6,-420 C30,-432 62,-404 54,-360 L48,-372 L40,-356 L30,-382 L18,-366 L4,-388 L-8,-366 L-22,-384 L-30,-360 L-44,-376Z M-52,-346 C-60,-320 -56,-298 -46,-292 L-42,-336Z`;
  const beard = c.beard ? `<path d="M-30,-338 C-30,-300 -10,-292 8,-292 C30,-292 46,-306 46,-336 C36,-318 24,-312 8,-312 C-8,-312 -22,-320 -30,-338Z" fill="${c.hair}" stroke="${OUT}" stroke-width="3"/>` : "";
  const wr = c.old ? `<path d="M10,-372 l14,2 M-6,-328 q6,4 12,0" stroke="${c.skinS}" stroke-width="3" fill="none"/>` : "";
  const leg = (s, x) => `
    <g id="${id}-leg${s}">
      <rect x="${x - 17}" y="-186" width="34" height="96" rx="15" fill="${s === "B" ? c.tunic2 : c.pants}" stroke="${OUT}" stroke-width="${SW}"/>
      <g id="${id}-shin${s}">
        <rect x="${x - 15}" y="-104" width="30" height="92" rx="13" fill="${s === "B" ? c.tunic2 : c.pants}" stroke="${OUT}" stroke-width="${SW}"/>
        <path d="M${x - 18},-22 L${x + 16},-24 C${x + 34},-22 ${x + 38},-6 ${x + 32},0 L${x - 20},0 C${x - 24},-8 ${x - 22},-18 ${x - 18},-22Z" fill="${c.boot}" stroke="${OUT}" stroke-width="${SW}"/>
        <path d="M${x - 17},-30 L${x + 17},-30" stroke="${c.fur}" stroke-width="9" stroke-linecap="round"/>
      </g>
    </g>`;
  const arm = (s, x) => `
    <g id="${id}-arm${s}">
      <rect x="${x - 13}" y="-300" width="27" height="78" rx="12" fill="${s === "B" ? c.tunic2 : c.tunic}" stroke="${OUT}" stroke-width="${SW}"/>
      <g id="${id}-fore${s}">
        <rect x="${x - 11}" y="-232" width="23" height="66" rx="11" fill="${s === "B" ? c.skinS : c.skin}" stroke="${OUT}" stroke-width="${SW}"/>
        <circle cx="${x + 1}" cy="-164" r="14" fill="${s === "B" ? c.skinS : c.skin}" stroke="${OUT}" stroke-width="${SW}"/>
        <g id="${id}-hand${s}">${props[s] || ""}</g>
      </g>
    </g>`;
  const eye = (x) => `
      <ellipse cx="${x}" cy="-356" rx="9.5" ry="12" fill="#fff" stroke="${OUT}" stroke-width="3"/>
      <circle class="pupil" cx="${x + 2.5}" cy="-354" r="5.5" fill="${OUT}"/>`;
  return `
  <g id="${id}-rig">
   <g id="${id}-body">
    ${leg("B", -12)}
    ${arm("B", -30)}
    ${leg("F", 14)}
    <g id="${id}-torso">
      <path d="M-46,-302 C-30,-316 32,-316 48,-302 L44,-210 L52,-160 L38,-170 L28,-156 L16,-170 L4,-154 L-8,-170 L-20,-156 L-32,-170 L-50,-160 L-42,-210Z" fill="${c.tunic}" stroke="${OUT}" stroke-width="${SW}" stroke-linejoin="round"/>
      <path d="M-44,-300 C-20,-286 22,-286 46,-300 C30,-312 -30,-312 -44,-300Z" fill="${c.fur}" stroke="${OUT}" stroke-width="3"/>
      <rect x="-44" y="-214" width="90" height="13" rx="5" fill="${c.tunic2}" stroke="${OUT}" stroke-width="3"/>
      ${c.bare ? `<path d="M-14,-262 q14,8 28,0 M-24,-232 q24,10 48,0" stroke="${c.skinS}" stroke-width="4" fill="none" stroke-linecap="round"/>` : `<path d="M-20,-262 l8,10 M10,-250 l8,8 M-30,-236 l6,8" stroke="${c.tunic2}" stroke-width="4" stroke-linecap="round"/>`}
      ${props.T || ""}
    </g>
    <g id="${id}-head">
     <g transform="translate(0,-300) scale(${hs}) translate(0,300)">
      <rect x="-12" y="-318" width="24" height="22" fill="${c.skinS}" stroke="${OUT}" stroke-width="3"/>
      <ellipse cx="-40" cy="-350" rx="9" ry="13" fill="${c.skin}" stroke="${OUT}" stroke-width="3.5"/>
      <ellipse cx="4" cy="-354" rx="46" ry="52" fill="${c.skin}" stroke="${OUT}" stroke-width="${SW}"/>
      ${wr}
      <path d="${hairPath}" fill="${c.hair}" stroke="${OUT}" stroke-width="3.5" stroke-linejoin="round"/>
      ${beard}
      ${props.H || ""}
      <g id="${id}-eyes">${eye(-10)}${eye(22)}</g>
      <g id="${id}-lids" opacity="1">
        <rect id="${id}-lidL" x="-21" y="-369" width="22" height="26" rx="9" fill="${c.skin}" stroke="${OUT}" stroke-width="3" />
        <rect id="${id}-lidR" x="11" y="-369" width="22" height="26" rx="9" fill="${c.skin}" stroke="${OUT}" stroke-width="3" />
      </g>
      <path id="${id}-brows" d="M-20,-376 L-2,-373 M14,-373 L32,-376" stroke="${OUT}" stroke-width="5" stroke-linecap="round"/>
      <path d="M8,-346 C14,-338 14,-330 6,-328" stroke="${OUT}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <g id="${id}-mouth">
        <path class="m-neutral" d="M-6,-318 Q8,-312 22,-318" stroke="${OUT}" stroke-width="4" fill="none" stroke-linecap="round"/>
        <path class="m-smile" opacity="0" d="M-8,-322 Q8,-304 24,-322 Z" fill="#7a2b1e" stroke="${OUT}" stroke-width="3.5" stroke-linejoin="round"/>
        <ellipse class="m-open" opacity="0" cx="8" cy="-316" rx="9" ry="11" fill="#5a1e14" stroke="${OUT}" stroke-width="3.5"/>
        <path class="m-sad" opacity="0" d="M-6,-312 Q8,-324 22,-312" stroke="${OUT}" stroke-width="4" fill="none" stroke-linecap="round"/>
      </g>
      ${props.V || ""}
     </g>
    </g>
    ${arm("F", 30)}
   </g>
  </g>`;
}
// Articulaciones (puntos de giro) en coordenadas del personaje
export const JOINT = {
  legB: "-12 -182", shinB: "-12 -100", legF: "14 -182", shinF: "14 -100",
  armB: "-30 -292", foreB: "-30 -228", armF: "30 -292", foreF: "30 -228",
  head: "4 -310", body: "0 0", torso: "0 -200",
};

// Lobo-perro (Gris), origen en las patas
export function wolf(id, fur = "#8d9099", furD = "#6c6f78", belly = "#c9ccd2") {
  const legW = (s, x, d) => `<g id="${id}-leg${s}"><rect x="${x - 10}" y="-78" width="20" height="78" rx="9" fill="${d ? furD : fur}" stroke="${OUT}" stroke-width="4"/><ellipse cx="${x + 4}" cy="-4" rx="14" ry="7" fill="${d ? furD : fur}" stroke="${OUT}" stroke-width="3.5"/></g>`;
  return `<g id="${id}-rig"><g id="${id}-body">
    <g id="${id}-tail"><path d="M-92,-112 C-140,-128 -158,-96 -150,-70 C-136,-92 -118,-100 -92,-96Z" fill="${fur}" stroke="${OUT}" stroke-width="4" stroke-linejoin="round"/></g>
    ${legW("BB", -60, 1)}${legW("FB", 54, 1)}
    <path d="M-96,-108 C-96,-148 60,-150 86,-118 C100,-96 84,-66 50,-64 L-60,-64 C-92,-66 -100,-84 -96,-108Z" fill="${fur}" stroke="${OUT}" stroke-width="4.5"/>
    <path d="M-60,-70 C-20,-82 30,-82 50,-70" stroke="${belly}" stroke-width="10" fill="none" stroke-linecap="round"/>
    ${legW("BF", -44, 0)}${legW("FF", 70, 0)}
    <g id="${id}-head">
      <path d="M62,-126 L78,-176 L96,-136Z M98,-132 L118,-174 L124,-128Z" fill="${furD}" stroke="${OUT}" stroke-width="4" stroke-linejoin="round"/>
      <path d="M56,-124 C60,-158 120,-160 132,-126 L172,-110 C178,-100 172,-90 160,-90 L120,-90 C96,-80 62,-90 56,-124Z" fill="${fur}" stroke="${OUT}" stroke-width="4.5" stroke-linejoin="round"/>
      <path d="M120,-96 C140,-92 156,-94 166,-98" stroke="${belly}" stroke-width="8" fill="none" stroke-linecap="round"/>
      <ellipse cx="170" cy="-108" rx="8" ry="6" fill="${OUT}"/>
      <ellipse cx="104" cy="-124" rx="7" ry="8" fill="#fff" stroke="${OUT}" stroke-width="3"/><circle cx="106" cy="-123" r="4" fill="${OUT}"/>
      <rect id="${id}-lid" x="95" y="-133" width="18" height="18" rx="7" fill="${fur}"/>
    </g>
  </g></g>`;
}
export const WJOINT = { tail: "-92 -104", legBB: "-60 -74", legFB: "54 -74", legBF: "-44 -74", legFF: "70 -74", head: "70 -110", body: "0 0" };

// Coloca un actor (div con su SVG) en el mundo. x,y = pies en coordenadas del mundo.
export function actor(S, id, kind, x, y, { scale = 1, flip = false, z = 5, props = {} } = {}) {
  const isWolf = kind === "gris" || kind === "perro" || kind === "lobo";
  const hh = isWolf ? 220 : 480 * (CAST[kind]?.h || 1);
  const ww = isWolf ? 360 : 260;
  const s = scale * (isWolf ? 1 : CAST[kind].h);
  const vb = isWolf ? "-180 -200 360 210" : `-130 -470 260 480`;
  const w = ww * (isWolf ? scale : s), h = (isWolf ? 210 : 480) * (isWolf ? scale : s);
  S.add(`<div id="${id}" class="actor" style="left:${r3(x - w / 2)}px;top:${r3(y - h)}px;width:${r3(w)}px;height:${r3(h)}px;z-index:${z}">
  <div id="${id}-flip" style="width:100%;height:100%"><svg viewBox="${vb}" width="100%" height="100%" overflow="visible">${isWolf ? (kind === "perro" ? wolf(id, "#a07a4a", "#7a5a34", "#d9c09a") : wolf(id)) : person(id, kind, props)}</svg></div></div>`);
  if (flip) S.tw(`tl.set("#${id}-flip",{scaleX:-1},0);`);
  if (isWolf) S.tw(`tl.set("#${id}-lid",{scaleY:0,svgOrigin:"0 -133"},0);`);
  else S.tw(`tl.set("#${id}-lidL,#${id}-lidR",{scaleY:0,svgOrigin:"0 -369"},0);`);
  return { id, x, y, w, h, isWolf };
}

// ----- Acting -----
const J = (id, part, isWolf) => `svgOrigin:"${(isWolf ? WJOINT : JOINT)[part]}"`;

// Respira y parpadea durante [t0, t1]
export function life(S, a, t0, t1, seed = 1) {
  const R = rng(seed); const d = t1 - t0; if (d <= 0.5) return;
  const cyc = 1.7 + R() * 0.5, n = Math.max(1, Math.floor(d / cyc));
  if (a.isWolf) {
    S.tw(`tl.fromTo("#${a.id}-tail",{rotation:-12},{immediateRender:false,rotation:14,${J(a.id, "tail", 1)},duration:0.35,yoyo:true,repeat:${Math.max(1, Math.floor(d / 0.35) - 1)},ease:"sine.inOut"},${r3(t0)});`);
    S.tw(`tl.fromTo("#${a.id}-body",{scaleY:1},{immediateRender:false,scaleY:1.02,svgOrigin:"0 0",duration:${r3(cyc / 2)},yoyo:true,repeat:${n * 2 - 1},ease:"sine.inOut"},${r3(t0)});`);
  } else {
    S.tw(`tl.fromTo("#${a.id}-torso",{scaleY:1,scaleX:1},{immediateRender:false,scaleY:1.022,scaleX:1.008,svgOrigin:"0 -160",duration:${r3(cyc / 2)},yoyo:true,repeat:${n * 2 - 1},ease:"sine.inOut"},${r3(t0)});`);
    S.tw(`tl.fromTo("#${a.id}-head",{y:0},{immediateRender:false,y:-3,duration:${r3(cyc / 2)},yoyo:true,repeat:${n * 2 - 1},ease:"sine.inOut"},${r3(t0 + 0.12)});`);
  }
  // parpadeos
  let t = t0 + 0.6 + R() * 1.5;
  const lids = a.isWolf ? [`#${a.id}-lid`] : [`#${a.id}-lidL`, `#${a.id}-lidR`];
  while (t < t1 - 0.3) {
    for (const l of lids) S.tw(`tl.to("${l}",{scaleY:1,svgOrigin:"0 ${a.isWolf ? -133 : -369}",duration:0.06,ease:"power1.in"},${r3(t)}).to("${l}",{scaleY:0,svgOrigin:"0 ${a.isWolf ? -133 : -369}",duration:0.09,ease:"power1.out"},${r3(t + 0.1)});`);
    t += 2.2 + R() * 2.6;
  }
}

// Andar o correr de x0 a x1 (coordenadas del mundo) entre t0 y t1
export function walk(S, a, t0, t1, x1, { run = false, y1 = null } = {}) {
  const cyc = run ? 0.34 : 0.56, d = t1 - t0, n = Math.max(1, Math.round(d / cyc));
  const A = run ? 38 : 24, half = r3(d / n / 2);
  const dx = r3(x1 - a.x); a.x = x1;
  S.tw(`tl.to("#${a.id}",{x:"+=${dx}"${y1 !== null ? `,y:${y1}` : ""},duration:${r3(d)},ease:"${run ? "none" : "none"}"},${r3(t0)});`);
  if (a.isWolf) {
    for (const [p, ph] of [["legFF", 1], ["legBB", 1], ["legFB", -1], ["legBF", -1]])
      S.tw(`tl.fromTo("#${a.id}-${p}",{rotation:${-A * ph}},{rotation:${A * ph},${J(a.id, p, 1)},duration:${half},yoyo:true,repeat:${n * 2 - 1},ease:"sine.inOut"},${r3(t0)});`);
    for (const p of ["legFF", "legBB", "legFB", "legBF"]) S.tw(`tl.to("#${a.id}-${p}",{rotation:0,${J(a.id, p, 1)},duration:0.15},${r3(t1)});`);
    return;
  }
  for (const [p, ph] of [["legF", 1], ["legB", -1], ["armF", -0.8], ["armB", 0.8]])
    S.tw(`tl.fromTo("#${a.id}-${p}",{rotation:${-A * ph}},{rotation:${A * ph},${J(a.id, p)},duration:${half},yoyo:true,repeat:${n * 2 - 1},ease:"sine.inOut"},${r3(t0)});`);
  for (const [p, off] of [["shinF", 0], ["shinB", half]])
    S.tw(`tl.fromTo("#${a.id}-${p}",{rotation:0},{immediateRender:false,rotation:${run ? 55 : 28},${J(a.id, p)},duration:${half},yoyo:true,repeat:${n * 2 - 1},ease:"sine.inOut"},${r3(t0 + off)});`);
  if (run) for (const p of ["foreF", "foreB"]) S.tw(`tl.fromTo("#${a.id}-${p}",{rotation:-70},{immediateRender:false,rotation:-70,${J(a.id, p)},duration:${r3(d)}},${r3(t0)});`);
  S.tw(`tl.fromTo("#${a.id}-body",{y:0},{immediateRender:false,y:${run ? -18 : -8},duration:${half},yoyo:true,repeat:${n * 2 - 1},ease:"sine.inOut"},${r3(t0)});`);
  S.tw(`tl.fromTo("#${a.id}-body",{rotation:0},{immediateRender:false,rotation:${run ? 7 : 2},svgOrigin:"0 0",duration:0.2},${r3(t0)});`);
  // aterriza en pose neutra
  for (const p of ["legF", "legB", "shinF", "shinB", "armF", "armB", "foreF", "foreB"]) S.tw(`tl.to("#${a.id}-${p}",{rotation:0,${J(a.id, p)},duration:0.22,ease:"power2.out"},${r3(t1)});`);
  S.tw(`tl.to("#${a.id}-body",{rotation:0,y:0,svgOrigin:"0 0",duration:0.22,ease:"power2.out"},${r3(t1)});`);
}

// Pose: rotaciones de articulaciones (grados) y gesto de boca/cejas
export function pose(S, a, t, p, dur = 0.3, ease = "back.out(1.6)") {
  for (const [part, deg] of Object.entries(p)) {
    if (["mouth", "brows", "look"].includes(part)) continue;
    S.tw(`tl.to("#${a.id}-${part}",{rotation:${deg},${J(a.id, part, a.isWolf)},duration:${dur},ease:"${ease}"},${r3(t)});`);
  }
  if (p.mouth) {
    for (const m of ["neutral", "smile", "open", "sad"])
      S.tw(`tl.to("#${a.id}-mouth .m-${m}",{opacity:${m === p.mouth ? 1 : 0},duration:0.08},${r3(t)});`);
  }
  if (p.brows !== undefined) S.tw(`tl.to("#${a.id}-brows",{y:${p.brows},duration:0.2},${r3(t)});`);
  if (p.look !== undefined) S.tw(`tl.to("#${a.id}-eyes .pupil",{x:${p.look},duration:0.2},${r3(t)});`);
}
// Habla: abre y cierra la boca mientras dura un tramo (para personajes que hablan)
export function talk(S, a, t0, t1) {
  const n = Math.max(1, Math.floor((t1 - t0) / 0.16));
  S.tw(`tl.fromTo("#${a.id}-mouth .m-open",{opacity:0},{immediateRender:false,opacity:1,duration:0.08,yoyo:true,repeat:${n * 2 - 1}},${r3(t0)});`);
}
export function shiver(S, a, t0, t1) {
  const n = Math.max(1, Math.floor((t1 - t0) / 0.06));
  S.tw(`tl.fromTo("#${a.id}-body",{x:-2.5},{immediateRender:false,x:2.5,duration:0.06,yoyo:true,repeat:${n - 1},ease:"none"},${r3(t0)});`);
  S.tw(`tl.to("#${a.id}-body",{x:0,duration:0.1},${r3(t1)});`);
}

// ---------- Piezas de interfaz ----------
export function card(S, id, x, y, w, h, inner, { bg = C.bone, z = 6, rot = 0 } = {}) {
  S.add(`<div id="${id}" class="card" style="left:${x - w / 2}px;top:${y - h / 2}px;width:${w}px;height:${h}px;background:${bg};z-index:${z}"><div class="card-in" style="transform:rotate(${rot}deg)">${inner}</div></div>`);
}
export function popIn(S, sel, t, { from = 0.2, dur = 0.5, ease = "back.out(2)" } = {}) {
  S.cue(t, "pop");
  S.tw(`tl.fromTo("${sel}",{scale:${from},opacity:0},{scale:1,opacity:1,duration:${dur},ease:"${ease}"},${r3(t)});`);
}
export function stampX(S, id, x, y, size, t, color = C.red) {
  S.cue(t, "click");
  S.add(`<div id="${id}" class="stamp" style="left:${x - size / 2}px;top:${y - size / 2}px;width:${size}px;height:${size}px;z-index:9">${icon("x", { size, color, weight: "bold" })}</div>`);
  S.tw(`tl.fromTo("#${id}",{scale:2.4,opacity:0,rotation:-20},{scale:1,opacity:1,rotation:0,duration:0.32,ease:"power4.out"},${r3(t)});`);
}
export function stampCheck(S, id, x, y, size, t, color = C.green) {
  S.add(`<div id="${id}" class="stamp" style="left:${x - size / 2}px;top:${y - size / 2}px;width:${size}px;height:${size}px;z-index:9">${icon("check-fat", { size, color, weight: "fill" })}</div>`);
  S.tw(`tl.fromTo("#${id}",{scale:2.4,opacity:0},{scale:1,opacity:1,duration:0.32,ease:"power4.out"},${r3(t)});`);
}
// Texto en el mundo
export function text(S, id, x, y, str, { size = 80, font = "Inter", weight = 900, color = C.bone, w = 1400, z = 8, align = "center", stroke = true } = {}) {
  S.add(`<div id="${id}" class="wtext" style="left:${x - w / 2}px;top:${y - size * 0.6}px;width:${w}px;font-family:${font};font-weight:${weight};font-size:${size}px;color:${color};text-align:${align};z-index:${z};${stroke ? `text-shadow:0 ${size * 0.05}px 0 ${C.ink},0 ${size * 0.1}px ${size * 0.2}px rgba(0,0,0,.45)` : ""}">${str}</div>`);
}
// Partículas (nieve, polvo, chispas) deterministas
export function burst(S, id, x, y, t, { n = 14, color = C.snow, spread = 160, up = 120, size = 12, dur = 0.8, seed = 3 } = {}) {
  const R = rng(seed); let h = "";
  for (let i = 0; i < n; i++) h += `<i id="${id}-${i}" class="pt" style="left:${x}px;top:${y}px;width:${size}px;height:${size}px;background:${color}"></i>`;
  S.add(`<div class="pts" style="z-index:9">${h}</div>`);
  for (let i = 0; i < n; i++) {
    const a = (R() - 0.5) * Math.PI, dx = Math.sin(a) * spread * (0.4 + R()), dy = -up * (0.4 + R());
    S.tw(`tl.fromTo("#${id}-${i}",{x:0,y:0,opacity:1,scale:${r3(0.6 + R())}},{keyframes:[{x:${r3(dx * 0.6)},y:${r3(dy)},duration:${r3(dur * 0.45)},ease:"power2.out"},{x:${r3(dx)},y:${r3(dy * 0.2 + 30)},opacity:0,duration:${r3(dur * 0.55)},ease:"power1.in"}]},${r3(t)});`);
  }
}

// Objetos para la mano (coordenadas del personaje; la mano delantera está en (31,-164))
export const PROP = {
  spear: `<g id="PID"><path d="M31,-60 L31,-430" stroke="#7a5030" stroke-width="10" stroke-linecap="round"/><path d="M31,-470 L16,-420 L46,-420Z" fill="#9aa3ad" stroke="${C.ink}" stroke-width="4"/></g>`,
  torch: `<g id="PID"><path d="M31,-190 L31,-20" stroke="#7a5030" stroke-width="14" stroke-linecap="round"/><path d="M31,-20 C0,10 10,50 31,80 C40,50 70,30 50,-15Z" fill="${C.fire}" stroke="${C.ink}" stroke-width="4"/><path d="M31,-10 C20,10 26,30 32,42 C40,26 46,10 40,-8Z" fill="${C.fire2}"/></g>`,
  stone: `<g id="PID"><path d="M14,-182 L40,-196 L58,-176 L46,-150 L20,-152Z" fill="#8c8f96" stroke="${C.ink}" stroke-width="4"/></g>`,
  basket: `<g id="PID"><path d="M-14,-150 L76,-150 L64,-96 L-2,-96Z" fill="#b98a4e" stroke="${C.ink}" stroke-width="5"/><path d="M-6,-136 L70,-136 M0,-118 L66,-118" stroke="#8a6232" stroke-width="5"/><path d="M-10,-150 C10,-200 52,-200 72,-150" stroke="#8a6232" stroke-width="6" fill="none"/></g>`,
  needle: `<g id="PID"><path d="M20,-170 L70,-230" stroke="#efe6d2" stroke-width="7" stroke-linecap="round"/></g>`,
};
export const prop = (k, id) => PROP[k].replace("PID", id);

// Equipo de gladiador (para props: F = mano delantera, B = mano trasera, H = cabeza, T = torso)
export const GEAR = {
  // casco de mirmillón: ala ancha y cresta con forma de pez (la cara queda a la vista)
  helmet: `<g><path d="M-58,-372 C-60,-430 70,-440 66,-372Z" fill="#c9a24a" stroke="${C.ink}" stroke-width="5"/><path d="M-72,-372 L80,-372 L74,-358 L-66,-358Z" fill="#b08a36" stroke="${C.ink}" stroke-width="5"/>
    <path d="M-30,-430 C-10,-470 40,-470 60,-436 L76,-452 L74,-420 L60,-430 C40,-450 0,-450 -30,-430Z" fill="#b5532f" stroke="${C.ink}" stroke-width="4"/><circle cx="46" cy="-446" r="4" fill="${C.ink}"/></g>`,
  loin: `<g><path d="M-46,-206 L50,-206 L44,-160 L4,-140 L-40,-160Z" fill="#efe6d2" stroke="${C.ink}" stroke-width="4"/><rect x="-48" y="-216" width="100" height="16" rx="6" fill="#7a4a22" stroke="${C.ink}" stroke-width="3"/></g>`,
  shield: `<g><path d="M-40,-300 C-20,-308 80,-308 100,-300 L100,-60 C80,-52 -20,-52 -40,-60Z" fill="#b5332a" stroke="${C.ink}" stroke-width="6"/><path d="M-26,-288 L86,-288 L86,-72 L-26,-72Z" fill="none" stroke="#d9a72b" stroke-width="6"/><circle cx="30" cy="-180" r="22" fill="#d9a72b" stroke="${C.ink}" stroke-width="4"/></g>`,
  sword: `<g><path d="M24,-170 L24,-290" stroke="#c9ced6" stroke-width="14" stroke-linecap="round"/><path d="M24,-300 L16,-282 L32,-282Z" fill="#c9ced6"/><path d="M10,-168 L38,-168" stroke="#7a4a22" stroke-width="10" stroke-linecap="round"/><path d="M24,-168 L24,-148" stroke="#7a4a22" stroke-width="9"/></g>`,
  wood: `<g><path d="M24,-170 L24,-300" stroke="#a0703c" stroke-width="16" stroke-linecap="round"/><path d="M8,-168 L40,-168" stroke="#7a4a22" stroke-width="10" stroke-linecap="round"/></g>`,
  trident: `<g><path d="M31,-40 L31,-420" stroke="#7a5030" stroke-width="10" stroke-linecap="round"/><path d="M5,-430 L5,-470 M31,-430 L31,-480 M57,-430 L57,-470 M5,-430 L57,-430" stroke="#c9ced6" stroke-width="9" stroke-linecap="round" fill="none"/></g>`,
  net: `<g><circle cx="20" cy="-150" r="36" fill="rgba(230,220,190,.25)" stroke="#d8c9a0" stroke-width="5"/><path d="M-12,-170 L52,-130 M-12,-130 L52,-170 M20,-186 L20,-114" stroke="#d8c9a0" stroke-width="4"/></g>`,
  staff: `<g><path d="M31,-60 L31,-470" stroke="#8a6232" stroke-width="10" stroke-linecap="round"/></g>`,
  // --- Félix: melena y bigote galo caído (H). Orden: galhair + mustache (+ helmet)
  galhair: `<g fill="#3b2211" stroke="${C.ink}" stroke-width="3.5" stroke-linejoin="round"><path d="M-50,-350 C-66,-300 -62,-252 -44,-236 C-40,-270 -38,-312 -40,-342Z"/><path d="M50,-362 C64,-322 62,-280 50,-262 C47,-292 45,-328 43,-350Z"/></g>`,
  mustache: `<g><path d="M-16,-327 C-6,-336 4,-334 8,-329 C12,-334 24,-336 34,-327 C40,-318 42,-306 38,-298 C32,-310 22,-316 8,-320 C-6,-316 -16,-310 -22,-298 C-26,-306 -22,-318 -16,-327Z" fill="#3b2211" stroke="${C.ink}" stroke-width="3" stroke-linejoin="round"/></g>`,
  // cicatrices (H en la cara; para el lanista y el doctor)
  scarFace: `<path d="M30,-386 L42,-338 M33,-372 l8,-3 M36,-358 l8,-3" stroke="#9a4a2e" stroke-width="4" stroke-linecap="round"/>`,
  // mirmillón: manga acolchada en el brazo de la espada (F; en B, envolver con back())
  manica: `<g><rect x="16" y="-236" width="30" height="62" rx="10" fill="#e6dccb" stroke="${C.ink}" stroke-width="4"/><path d="M16,-220 L46,-220 M16,-204 L46,-204 M16,-188 L46,-188" stroke="#a89880" stroke-width="4"/></g>`,
  // reciario: hombrera de bronce (T) y puñal (F)
  galerus: `<g><path d="M-74,-296 L-80,-350 C-68,-358 -52,-354 -46,-342 L-40,-298Z" fill="#c9a24a" stroke="${C.ink}" stroke-width="4"/><path d="M-72,-320 L-44,-318" stroke="#8f6a2a" stroke-width="4"/></g>`,
  pugio: `<g><path d="M31,-176 L31,-230" stroke="#c9ced6" stroke-width="10" stroke-linecap="round"/><path d="M31,-238 L25,-226 L37,-226Z" fill="#c9ced6"/><path d="M20,-172 L42,-172" stroke="#7a4a22" stroke-width="8" stroke-linecap="round"/></g>`,
  // secutor: casco liso y redondo con dos agujeros (ranura V: tapa ojos, cejas y boca)
  secutor: `<g><path d="M-54,-330 C-62,-424 66,-432 60,-330 C58,-298 40,-288 4,-288 C-36,-288 -52,-300 -54,-330Z" fill="#c9ced6" stroke="${C.ink}" stroke-width="5"/><path d="M-26,-410 C0,-430 32,-428 52,-404" stroke="#9aa3ad" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M-60,-300 C-30,-286 40,-286 66,-300" stroke="#9aa3ad" stroke-width="10" fill="none" stroke-linecap="round"/><circle cx="-10" cy="-356" r="6" fill="${C.ink}"/><circle cx="22" cy="-356" r="6" fill="${C.ink}"/><path d="M-30,-390 C-20,-400 0,-404 14,-402" stroke="#fff" stroke-width="5" opacity=".6" fill="none" stroke-linecap="round"/></g>`,
  // tracio: casco de ala con cresta de grifo (H). Solo para el abanico de tipos de la frase 51
  thraex: `<g><path d="M-56,-372 C-58,-432 66,-440 64,-372Z" fill="#c9a24a" stroke="${C.ink}" stroke-width="5"/><path d="M-70,-372 L78,-372 L72,-360 L-64,-360Z" fill="#b08a36" stroke="${C.ink}" stroke-width="4"/><path d="M-20,-428 C-10,-470 40,-480 64,-452 L80,-458 L70,-438 C50,-452 20,-450 -20,-428Z" fill="#c9a24a" stroke="${C.ink}" stroke-width="4"/><circle cx="52" cy="-454" r="3.5" fill="${C.ink}"/></g>`,
  // casco genérico con penacho, para Prisco y Vero. Color del penacho: reemplazar PLUMA
  galea: `<g><path d="M-56,-372 C-58,-434 66,-440 64,-372Z" fill="#b8b2a6" stroke="${C.ink}" stroke-width="5"/><path d="M-68,-372 L76,-372 L70,-360 L-62,-360Z" fill="#9aa3ad" stroke="${C.ink}" stroke-width="4"/><path d="M-10,-430 C-20,-480 0,-500 10,-470 M30,-436 C40,-486 60,-490 50,-458" stroke="PLUMA" stroke-width="12" fill="none" stroke-linecap="round"/></g>`,
  sica: `<g><path d="M31,-176 C30,-226 46,-262 76,-280" stroke="#c9ced6" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M18,-170 L44,-170" stroke="#7a4a22" stroke-width="9" stroke-linecap="round"/></g>`,
  parmula: `<g><rect x="-10" y="-232" width="84" height="96" rx="8" fill="#4a6fa5" stroke="${C.ink}" stroke-width="5"/><rect x="2" y="-220" width="60" height="72" fill="none" stroke="#d9a72b" stroke-width="4"/></g>`,
  hoplon: `<g><circle cx="30" cy="-196" r="54" fill="#c9a24a" stroke="${C.ink}" stroke-width="6"/><circle cx="30" cy="-196" r="38" fill="none" stroke="#8f6a2a" stroke-width="5"/><circle cx="30" cy="-196" r="10" fill="#8f6a2a" stroke="${C.ink}" stroke-width="3"/></g>`,
  // escudo galo ovalado con espina y umbo (frases 10 y 11)
  scutumGal: `<g><ellipse cx="30" cy="-180" rx="58" ry="130" fill="#4a6a3a" stroke="${C.ink}" stroke-width="6"/><path d="M30,-306 L30,-54" stroke="#8a6232" stroke-width="10"/><ellipse cx="30" cy="-180" rx="22" ry="30" fill="#9aa3ad" stroke="${C.ink}" stroke-width="4"/><path d="M-10,-250 C10,-230 10,-210 -10,-190 M70,-160 C50,-140 50,-120 70,-100" stroke="#d9a72b" stroke-width="5" fill="none"/></g>`,
  // escudo de mimbre de práctica (frase 42)
  wicker: `<g><path d="M-40,-300 C-20,-308 80,-308 100,-300 L100,-60 C80,-52 -20,-52 -40,-60Z" fill="#c9a467" stroke="${C.ink}" stroke-width="6"/>${[...Array(8)].map((_, k) => `<path d="M-40,${-280 + k * 28} L100,${-280 + k * 28}" stroke="#a07e48" stroke-width="5"/>`).join("")}${[...Array(5)].map((_, k) => `<path d="M${-20 + k * 30},-300 L${-20 + k * 30},-60" stroke="#8a6a38" stroke-width="4" stroke-dasharray="14 14"/>`).join("")}</g>`,
  // Tito: corona de laurel (H) y toga con franja púrpura (T)
  laurel: `<g><path d="M-48,-376 C-30,-404 40,-406 58,-378" stroke="#4f6b3a" stroke-width="6" fill="none"/>${[-40, -24, -8, 8, 24, 40, 54].map((x, i) => { const y = -392 + Math.abs(x - 5) * 0.28; return `<ellipse cx="${x}" cy="${y}" rx="12" ry="6" transform="rotate(${i % 2 ? 30 : -30} ${x} ${y})" fill="#6f9a4a" stroke="${C.ink}" stroke-width="2.5"/>`; }).join("")}</g>`,
  toga: `<g><path d="M-46,-304 C-10,-292 30,-246 50,-168 L36,-156 C18,-226 -14,-268 -48,-282Z" fill="#f3eee2" stroke="${C.ink}" stroke-width="4"/><path d="M-46,-298 C-12,-286 26,-242 44,-170" stroke="#6b2d5c" stroke-width="7" fill="none"/></g>`,
  // objetos de mano
  palm: `<g><path d="M31,-160 C34,-260 50,-350 70,-420" stroke="#4f6b3a" stroke-width="7" fill="none" stroke-linecap="round"/>${[...Array(9)].map((_, k) => { const y = -220 - k * 22, x = 36 + k * 3.8; return `<path d="M${x},${y} q-36,8 -50,34 M${x},${y} q36,4 52,30" stroke="#6f9a4a" stroke-width="6" fill="none" stroke-linecap="round"/>`; }).join("")}</g>`,
  scroll: `<g><rect x="-6" y="-200" width="80" height="64" fill="#efe3c8" stroke="${C.ink}" stroke-width="4"/><rect x="-14" y="-206" width="14" height="76" rx="6" fill="#a0703c" stroke="${C.ink}" stroke-width="3"/><rect x="68" y="-206" width="14" height="76" rx="6" fill="#a0703c" stroke="${C.ink}" stroke-width="3"/><path d="M8,-184 L60,-184 M8,-170 L54,-170 M8,-156 L58,-156" stroke="#5a4a38" stroke-width="3"/><circle cx="34" cy="-140" r="11" fill="#b3261e" stroke="${C.ink}" stroke-width="3"/></g>`,
  tabula: `<g><rect x="0" y="-214" width="72" height="56" rx="4" fill="#a0703c" stroke="${C.ink}" stroke-width="4"/><rect x="8" y="-206" width="56" height="40" fill="#3a2a1e"/><path d="M14,-196 L50,-196 M14,-184 L44,-184 M14,-172 L52,-172" stroke="#d9c7a0" stroke-width="3"/><path d="M60,-150 L88,-226" stroke="#c9a24a" stroke-width="5" stroke-linecap="round"/></g>`,
  // vaso de vidrio soplado en molde con nombres (como el de Montagnole: GAMVS, MEROPS, CALAMVS)
  cup: `<g><path d="M8,-222 L56,-222 L52,-150 C50,-142 14,-142 12,-150Z" fill="rgba(150,205,175,.55)" stroke="${C.ink}" stroke-width="4"/><path d="M10,-204 L54,-204 M11,-176 L53,-176" stroke="#5a8a6a" stroke-width="3"/><path d="M18,-196 l6,12 l6,-12 M36,-196 l0,12 M42,-196 l6,0 l-6,12 l6,0" stroke="#2f5a3a" stroke-width="2.5" fill="none"/><path d="M16,-218 L18,-160" stroke="#fff" stroke-width="4" opacity=".6"/></g>`,
  lamp: `<g><path d="M-6,-170 C-6,-196 50,-196 52,-178 L80,-178 C88,-172 84,-162 74,-162 L50,-162 C44,-150 0,-150 -6,-170Z" fill="#b8643a" stroke="${C.ink}" stroke-width="4"/><circle cx="22" cy="-178" r="10" fill="#a0502c" stroke="${C.ink}" stroke-width="2.5"/></g>`,
  brush: `<g><path d="M31,-160 L31,-260" stroke="#a0703c" stroke-width="8" stroke-linecap="round"/><path d="M24,-262 L38,-262 L36,-292 C34,-300 28,-300 26,-292Z" fill="#b3261e" stroke="${C.ink}" stroke-width="3"/></g>`,
  strigil: `<g><path d="M31,-158 L31,-196 C31,-246 70,-262 86,-232" stroke="#b08a36" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M31,-196 C31,-238 64,-250 78,-232" stroke="#e0c070" stroke-width="3" fill="none"/></g>`,
  shackle: `<g><rect x="14" y="-190" width="34" height="16" rx="6" fill="#5b5f66" stroke="${C.ink}" stroke-width="4"/><path d="M31,-176 q-8,16 0,30 q8,16 0,30 q-8,16 0,30" stroke="#6b6f76" stroke-width="7" fill="none" stroke-dasharray="12 6"/></g>`,
  // cartel de venta colgado del cuello (titulus), en T
  titulus: `<g><path d="M-24,-300 L-20,-258 M32,-300 L28,-258" stroke="#8a6232" stroke-width="3"/><rect x="-36" y="-262" width="80" height="50" rx="4" fill="#efe3c8" stroke="${C.ink}" stroke-width="4"/><path d="M-26,-246 L34,-246 M-26,-232 L24,-232" stroke="#5a4a38" stroke-width="3"/></g>`,
  // bolitas de madera con premio (frases 88 y 89)
  ball: `<g><circle cx="31" cy="-178" r="13" fill="#c9a467" stroke="${C.ink}" stroke-width="3"/><path d="M24,-180 l14,0 M26,-174 l10,0" stroke="#5a4a38" stroke-width="2"/></g>`,
  // instrumentos de la pompa (pose: brazo delantero levantado hasta la boca)
  cornu: `<g><circle cx="10" cy="-270" r="96" fill="none" stroke="#c9a24a" stroke-width="12"/><circle cx="10" cy="-270" r="96" fill="none" stroke="${C.ink}" stroke-width="2.5"/><path d="M-30,-180 L80,-340" stroke="#8a6232" stroke-width="9" stroke-linecap="round"/><path d="M90,-330 L130,-370 L140,-350Z" fill="#c9a24a" stroke="${C.ink}" stroke-width="4"/></g>`,
  tuba: `<g><path d="M20,-320 L220,-420" stroke="#c9a24a" stroke-width="10" stroke-linecap="round"/><path d="M210,-430 L250,-460 L262,-416 L220,-408Z" fill="#c9a24a" stroke="${C.ink}" stroke-width="4"/></g>`,
  bowl: `<g><path d="M-4,-176 L66,-176 C62,-146 46,-140 31,-140 C16,-140 0,-146 -4,-176Z" fill="#b8936a" stroke="${C.ink}" stroke-width="4"/><ellipse cx="31" cy="-176" rx="35" ry="8" fill="#d9c27a" stroke="${C.ink}" stroke-width="3"/></g>`,
  // gorro de liberto (H, frase 81)
  pileus: `<g><path d="M-48,-372 C-44,-446 52,-446 58,-372Z" fill="#c9b38a" stroke="${C.ink}" stroke-width="4"/><path d="M-50,-372 L60,-372" stroke="#a8946a" stroke-width="6"/></g>`,
  cloth: `<g><path d="M31,-176 C50,-230 90,-220 110,-250 L118,-200 C96,-180 60,-190 38,-160Z" fill="#efe9df" stroke="${C.ink}" stroke-width="4"/></g>`,
  purse: `<g><path d="M14,-176 C0,-150 4,-120 31,-116 C58,-120 62,-150 48,-176Z" fill="#8a5a35" stroke="${C.ink}" stroke-width="4"/><path d="M14,-178 L48,-178" stroke="#5a3b22" stroke-width="6" stroke-linecap="round"/><circle cx="40" cy="-150" r="6" fill="#d9a72b" stroke="${C.ink}" stroke-width="2"/></g>`,
  // dedo alzado para pedir la missio (frase 98)
  finger: `<path d="M31,-176 L31,-212" stroke="#d9a273" stroke-width="11" stroke-linecap="round"/><path d="M31,-176 L31,-212" stroke="${C.ink}" stroke-width="2" opacity=".0"/>`,

  // --- Ropa y adornos ---
  // capa rectangular de lana sujeta con broche anular en el hombro derecho (la posición del broche es reconstrucción, n.º 11)
  cloak: `<g><path d="M-52,-306 C-72,-250 -74,-190 -62,-150 L-40,-158 C-46,-210 -40,-262 -26,-300Z" fill="#6b4a2e" stroke="${C.ink}" stroke-width="4" stroke-linejoin="round"/><path d="M-36,-306 C-4,-298 22,-298 38,-298" stroke="#6b4a2e" stroke-width="15" stroke-linecap="round"/><path d="M-36,-306 C-4,-298 22,-298 38,-298" stroke="${C.ink}" stroke-width="2.5" fill="none" opacity=".35"/><circle cx="38" cy="-298" r="11" fill="#c9ced6" stroke="${C.ink}" stroke-width="3.5"/><circle cx="38" cy="-298" r="4.5" fill="#6b4a2e" stroke="${C.ink}" stroke-width="2"/><path d="M30,-306 L48,-288" stroke="#9aa3ad" stroke-width="3" stroke-linecap="round"/></g>`,
  // gorro redondo de lana (Ulf de viaje). NO es un casco
  capWool: `<g><path d="M-50,-370 C-54,-432 60,-438 58,-370 C28,-380 -20,-380 -50,-370Z" fill="#7a5a3a" stroke="${C.ink}" stroke-width="4"/><path d="M-50,-370 C-20,-382 30,-382 58,-370" stroke="#5a3e26" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M-20,-414 C-4,-424 20,-424 34,-414" stroke="#9a7a52" stroke-width="4" fill="none" stroke-linecap="round"/></g>`,
  // Ása: delantal-vestido azul con dos broches ovalados, sarta de cuentas entre ellos y tirantes
  smokkr: `<g><path d="M-44,-272 L46,-272 L50,-160 L-48,-160Z" fill="#3f5f7a" stroke="${C.ink}" stroke-width="4"/><path d="M-30,-300 L-28,-272 M32,-300 L30,-272" stroke="#3f5f7a" stroke-width="8"/><ellipse cx="-28" cy="-280" rx="15" ry="11" fill="#c9a24a" stroke="${C.ink}" stroke-width="3.5"/><ellipse cx="30" cy="-280" rx="15" ry="11" fill="#c9a24a" stroke="${C.ink}" stroke-width="3.5"/><path d="M-34,-282 l12,0 M24,-282 l12,0 M-28,-288 l0,12 M30,-288 l0,12" stroke="#8f6a2a" stroke-width="2"/>${["#d98a2b", "#3f8a6a", "#2f5f9a", "#d98a2b", "#e6dcc6", "#3f8a6a", "#2f5f9a"].map((c, i) => { const x = -18 + i * 6.3, y = -268 + Math.sin((i / 6) * Math.PI) * 14; return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4" fill="${c}" stroke="${C.ink}" stroke-width="1.5"/>`; }).join("")}</g>`,
  // llaves y tijeras colgadas del cinto (Ása)
  keys: `<g><path d="M36,-206 L38,-168 M44,-206 L50,-172" stroke="#5a3b22" stroke-width="3"/><path d="M38,-170 L38,-150 M38,-156 l7,0 M38,-150 l5,0" stroke="#7a7f86" stroke-width="4" stroke-linecap="round"/><path d="M50,-174 L56,-148 M50,-174 L44,-150" stroke="#7a7f86" stroke-width="3.5" stroke-linecap="round"/></g>`,
  // tatuajes del rus del Volga (inserto 921): líneas verde oscuro sobre el pecho (T)
  tattoo: `<g stroke="#2f4a3a" stroke-width="3.5" fill="none" stroke-linecap="round" opacity=".85"><path d="M-30,-286 C-20,-270 -20,-250 -32,-236 M34,-286 C24,-270 24,-250 36,-236"/><path d="M-12,-276 q16,12 32,0 M-14,-252 q18,12 36,0"/><circle cx="-26" cy="-214" r="6"/><circle cx="34" cy="-214" r="6"/></g>`,

  // --- Armas (sin casco) ---
  // escudo redondo de tablas, pintado en dos mitades amarilla y negra como los de Gokstad, con umbo de hierro (≈80 cm)
  shieldRound: `<g><circle cx="30" cy="-196" r="96" fill="#d9a72b" stroke="${C.ink}" stroke-width="6"/><path d="M30,-292 A96,96 0 0 1 30,-100Z" fill="#2b2622"/>${[-36, -4, 64, 96].map((x) => `<path d="M${x},${-196 - Math.sqrt(96 * 96 - (x - 30) ** 2).toFixed(0)} L${x},${-196 + +Math.sqrt(96 * 96 - (x - 30) ** 2).toFixed(0)}" stroke="#8a6a38" stroke-width="2.5" opacity=".45"/>`).join("")}<circle cx="30" cy="-196" r="96" fill="none" stroke="${C.ink}" stroke-width="6"/><circle cx="30" cy="-196" r="25" fill="#8f979f" stroke="${C.ink}" stroke-width="4"/><circle cx="23" cy="-203" r="7" fill="#e6ebf0"/></g>`,
  // hacha barbada de granjero (mango de fresno)
  axe: `<g><path d="M31,-140 L31,-334" stroke="#8a6232" stroke-width="11" stroke-linecap="round"/><path d="M27,-336 L27,-308 L50,-302 C58,-284 68,-272 82,-266 C86,-294 86,-324 78,-350 C66,-340 54,-334 40,-336Z" fill="#9aa3ad" stroke="${C.ink}" stroke-width="4" stroke-linejoin="round"/><path d="M78,-346 C84,-320 84,-292 80,-272" stroke="#e6ebf0" stroke-width="3" fill="none"/></g>`,
  // espada del jefe (pomo lobulado y guarda corta), solo Geirmund
  swordVk: `<g><path d="M31,-182 L31,-372" stroke="#c9ced6" stroke-width="13" stroke-linecap="round"/><path d="M31,-182 L31,-360" stroke="#9aa3ad" stroke-width="3"/><path d="M14,-176 L48,-176" stroke="#c9a24a" stroke-width="9" stroke-linecap="round"/><path d="M31,-176 L31,-150" stroke="#5a3b22" stroke-width="10"/><path d="M18,-146 C18,-136 44,-136 44,-146 C40,-154 22,-154 18,-146Z" fill="#c9a24a" stroke="${C.ink}" stroke-width="3"/></g>`,
  // cuchillo largo (para comer y trabajar)
  knife: `<g><path d="M31,-172 L31,-232" stroke="#c9ced6" stroke-width="10" stroke-linecap="round"/><path d="M31,-240 L36,-226 L26,-226Z" fill="#c9ced6"/><path d="M31,-170 L31,-148" stroke="#7a4a22" stroke-width="10" stroke-linecap="round"/></g>`,

  // --- Trabajo, viaje y comercio ---
  // remo de pino (frase de los 32 remos)
  oar: `<g><path d="M-40,-60 L110,-420" stroke="#b08a5a" stroke-width="12" stroke-linecap="round"/><path d="M-40,-60 L-62,-4 C-70,14 -50,22 -42,6 L-24,-50Z" fill="#c9a06a" stroke="${C.ink}" stroke-width="4"/></g>`,
  // pala de madera con filo de hierro (granja)
  spade: `<g><path d="M31,-150 L31,-20" stroke="#8a6232" stroke-width="10" stroke-linecap="round"/><path d="M14,-24 L48,-24 L44,30 C40,42 22,42 18,30Z" fill="#a0703c" stroke="${C.ink}" stroke-width="4"/><path d="M18,28 C22,42 40,42 44,28" stroke="#9aa3ad" stroke-width="6" fill="none"/><path d="M18,-160 L44,-160" stroke="#8a6232" stroke-width="8" stroke-linecap="round"/></g>`,
  // huso con tortera de piedra (Ása hila)
  spindle: `<g><path d="M31,-170 L31,-90" stroke="#a0703c" stroke-width="5" stroke-linecap="round"/><ellipse cx="31" cy="-104" rx="13" ry="6" fill="#8c8f96" stroke="${C.ink}" stroke-width="3"/><path d="M31,-170 C40,-200 30,-230 60,-260" stroke="#efe6d2" stroke-width="3" fill="none"/><path d="M50,-262 C56,-290 84,-290 86,-262 C84,-246 56,-246 50,-262Z" fill="#efe6d2" stroke="${C.ink}" stroke-width="3"/></g>`,
  // peine de asta con remaches (n.º 24)
  comb: `<g><rect x="2" y="-196" width="62" height="18" rx="4" fill="#e6d2b0" stroke="${C.ink}" stroke-width="3"/>${[...Array(11)].map((_, k) => `<path d="M${6 + k * 5.4},-178 L${6 + k * 5.4},-162" stroke="#e6d2b0" stroke-width="3"/>`).join("")}<path d="M2,-162 L64,-162" stroke="${C.ink}" stroke-width="1.5" opacity=".4"/>${[12, 33, 54].map((x) => `<circle cx="${x}" cy="-187" r="2.5" fill="#7a5a3a"/>`).join("")}</g>`,
  // cuerno para beber (M4: cuernos, no cráneos)
  hornDrink: `<g><path d="M20,-176 C10,-210 30,-250 74,-262 C70,-250 66,-236 46,-170 C40,-160 24,-162 20,-176Z" fill="#e6d2b0" stroke="${C.ink}" stroke-width="4"/><path d="M22,-178 C30,-164 44,-164 46,-172" stroke="#c9a24a" stroke-width="6" fill="none"/><path d="M60,-252 L74,-262" stroke="#c9a24a" stroke-width="6" stroke-linecap="round"/></g>`,
  // pescado seco (comida a bordo, n.º 8)
  stockfish: `<g><path d="M31,-176 L31,-190 C20,-200 14,-250 26,-290 L36,-290 C48,-250 42,-200 31,-190" fill="#c9b48a" stroke="${C.ink}" stroke-width="3.5"/><path d="M22,-296 L31,-284 L40,-296" fill="#a8946a" stroke="${C.ink}" stroke-width="3"/><path d="M26,-240 L36,-240 M26,-220 L36,-220" stroke="#a8946a" stroke-width="2.5"/></g>`,
  // balanza plegable de bronce: la mano sujeta la anilla y la balanza cuelga (n.º 16)
  scales: `<g><path d="M31,-164 L31,-140" stroke="#8f6a2a" stroke-width="3"/><path d="M-21,-138 L83,-138" stroke="#b08a36" stroke-width="5" stroke-linecap="round"/><path d="M31,-146 L31,-128" stroke="#b08a36" stroke-width="5"/><path d="M-21,-138 L-33,-96 M-21,-138 L-9,-96 M83,-138 L71,-96 M83,-138 L95,-96" stroke="#8f6a2a" stroke-width="2"/><path d="M-37,-96 C-33,-84 -5,-84 -1,-96Z M67,-96 C71,-84 95,-84 99,-96Z" fill="#c9a24a" stroke="${C.ink}" stroke-width="3"/><path d="M-27,-98 l6,-6 l8,4 l-4,5Z" fill="#e6ebf0" stroke="${C.ink}" stroke-width="1.5"/><rect x="76" y="-104" width="10" height="8" rx="2" fill="#7a7f86" stroke="${C.ink}" stroke-width="1.5"/></g>`,
  // plata picada en la palma: trozo de dírham, de brazalete y de lingote (n.º 16 y 17)
  hacksilver: `<g><path d="M14,-176 A18,18 0 0 1 48,-176 L31,-176Z" fill="#dfe4ea" stroke="${C.ink}" stroke-width="3"/><path d="M20,-178 l6,-6 M28,-182 l8,0" stroke="#8f979f" stroke-width="1.5"/><path d="M40,-160 C48,-168 62,-166 66,-156" stroke="#c9ced6" stroke-width="7" fill="none" stroke-linecap="round"/><rect x="2" y="-166" width="20" height="9" rx="2" fill="#c9ced6" stroke="${C.ink}" stroke-width="2.5" transform="rotate(-12 12 -162)"/></g>`,
  // palangana de madera (inserto 921, n.º 21)
  basin: `<g><path d="M-14,-178 L76,-178 C72,-140 52,-132 31,-132 C10,-132 -10,-140 -14,-178Z" fill="#a0703c" stroke="${C.ink}" stroke-width="4"/><ellipse cx="31" cy="-178" rx="45" ry="9" fill="#8fb0b8" stroke="${C.ink}" stroke-width="3"/><path d="M-6,-160 L68,-160" stroke="#7a5030" stroke-width="3"/></g>`,

  // --- Solo para el mito (M1) ---
  // casco con cuernos de ópera (1876): SIEMPRE con stampX encima
  hornHelmet: `<g><path d="M-54,-372 C-56,-432 64,-438 62,-372Z" fill="#9aa3ad" stroke="${C.ink}" stroke-width="5"/><path d="M-60,-372 L68,-372" stroke="#7a7f86" stroke-width="9" stroke-linecap="round"/><path d="M-50,-400 C-90,-410 -110,-450 -98,-492 C-84,-462 -70,-440 -44,-424Z" fill="#efe6d2" stroke="${C.ink}" stroke-width="4"/><path d="M56,-404 C96,-414 116,-454 104,-496 C90,-466 76,-444 50,-428Z" fill="#efe6d2" stroke="${C.ink}" stroke-width="4"/></g>`,
  // casco de Gjermundbu (s. X): redondo con anteojeras. Solo en vitrina o con rótulo «SIGLO X»
  gjermundbu: `<g><path d="M-54,-362 C-58,-436 64,-442 60,-362Z" fill="#8f979f" stroke="${C.ink}" stroke-width="5"/><path d="M4,-438 L4,-362 M-56,-386 L62,-386" stroke="#6b7178" stroke-width="8"/><circle cx="4" cy="-440" r="6" fill="#6b7178" stroke="${C.ink}" stroke-width="2.5"/><path d="M-26,-370 C-30,-350 -16,-338 -2,-344 L4,-366 L10,-344 C24,-338 38,-350 34,-370Z" fill="none" stroke="#6b7178" stroke-width="7" stroke-linejoin="round"/></g>`,
  // --- Piezas extra de Producción ---
  // piel enrollada (despedida, frase 106) y piel untada que tapa al durmiente (en T, con POSE.dormir)
  furRoll: `<g><ellipse cx="31" cy="-176" rx="44" ry="22" fill="#8a6a4a" stroke="${C.ink}" stroke-width="4"/><path d="M-8,-176 C10,-168 52,-168 70,-176" stroke="#6b4e32" stroke-width="4" fill="none"/><path d="M10,-188 l6,8 M34,-192 l4,8 M54,-188 l-4,8" stroke="#a8875e" stroke-width="3"/></g>`,
  hide: `<g><path d="M-70,-300 C-40,-320 60,-322 92,-296 L96,-150 C60,-130 -40,-130 -74,-150Z" fill="#8a6a4a" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/><path d="M-50,-280 l20,10 M10,-292 l12,14 M60,-280 l-10,16 M-30,-200 l18,8 M40,-190 l12,10" stroke="#6b4e32" stroke-width="5" stroke-linecap="round"/><path d="M-60,-296 C-20,-312 50,-312 84,-292" stroke="#fff" stroke-width="5" opacity=".55" fill="none"/></g>`,
  // saquito de plata (frase 26)
  silverBag: `<g><path d="M14,-176 C0,-150 4,-116 31,-112 C58,-116 62,-150 48,-176Z" fill="#c9b48a" stroke="${C.ink}" stroke-width="4"/><path d="M14,-178 L48,-178" stroke="#7a5a3a" stroke-width="6" stroke-linecap="round"/><circle cx="24" cy="-186" r="7" fill="#dfe4ea" stroke="${C.ink}" stroke-width="2"/><circle cx="38" cy="-190" r="6" fill="#dfe4ea" stroke="${C.ink}" stroke-width="2"/></g>`,
  // fardo de pieles para cambiar (frase 181)
  bundle: `<g><rect x="-10" y="-206" width="86" height="56" rx="14" fill="#a07a4a" stroke="${C.ink}" stroke-width="4"/><path d="M8,-206 L8,-150 M58,-206 L58,-150" stroke="#5a3b22" stroke-width="6"/></g>`,
  // cucharilla de hueso para las orejas (frase 57)
  earspoon: `<g><path d="M31,-170 L58,-232" stroke="#efe6d2" stroke-width="7" stroke-linecap="round"/><ellipse cx="60" cy="-238" rx="7" ry="5" fill="#efe6d2" stroke="${C.ink}" stroke-width="2"/></g>`,
  // corona (rey Alfredo, frase 116)
  crown: `<g><path d="M-44,-386 L-44,-420 L-24,-400 L4,-432 L32,-400 L52,-420 L52,-386Z" fill="#d9a72b" stroke="${C.ink}" stroke-width="4" stroke-linejoin="round"/><circle cx="4" cy="-404" r="5" fill="#9e3a2a"/></g>`,
  // lima (frase 198)
  file: `<g><path d="M31,-170 L31,-246" stroke="#8f979f" stroke-width="10" stroke-linecap="round"/><path d="M26,-236 l10,0 M26,-224 l10,0 M26,-212 l10,0 M26,-200 l10,0" stroke="#5b5f66" stroke-width="2"/><path d="M31,-170 L31,-148" stroke="#7a4a22" stroke-width="10" stroke-linecap="round"/></g>`,
  // mochila moderna (frase 230, HOY)
  backpack: `<g><rect x="-80" y="-300" width="70" height="120" rx="20" fill="#3f6fb5" stroke="${C.ink}" stroke-width="4"/><rect x="-74" y="-240" width="56" height="40" rx="8" fill="#2f548c" stroke="${C.ink}" stroke-width="3"/></g>`,
};
// Equipo en la mano trasera (desplaza un objeto pensado para la mano delantera)
export const back = (g) => `<g transform="translate(-60,0)">${g}</g>`;
// Casco con el color del penacho
export const galea = (pluma) => GEAR.galea.replace("PLUMA", pluma);
// Poses (grados de cada articulación; ajustar en la captura)
export const POSE = {
  brazosCruzados: { armF: -10, foreF: 100, armB: -10, foreB: -80, brows: 4 },
  remar:      { armF: -70, foreF: -20, armB: -60, foreB: -30, legF: -30, legB: 20 },  // sentado en el arcón, tirando del remo
  vapnatak:   { armF: -150, foreF: -10, mouth: "open" },                            // la lanza (en F) en alto: chocar las armas en el thing
  pesar:      { armF: -60, foreF: -30, head: 6, brows: -2 },                        // balanza a la altura de los ojos
  hilar:      { armF: -40, foreF: -70, armB: -120, foreB: -20 },                    // Ása con el huso
  peinarse:   { armF: -150, foreF: -90, head: -4 },                                 // el peine en el pelo
  mirarLejos: { armF: -130, foreF: -100, head: -8 },                                // la mano de visera: buscar la costa
  dormir:     { body: -90 },                                                        // tumbado bajo la piel, en cubierta
  mareo:      { head: 10, brows: 6, mouth: "sad", armF: -20, foreF: -110 },         // la mano a la barriga
  manoAlta:   { armF: -165, foreF: -5, mouth: "open" },
  silencio:   { armF: -120, foreF: -150, head: 4 },                                 // dedo en los labios
};
// Capa de otro color (Geirmund: azul #2f4f7a; Hallvard: pardo #6b5a46; Poppo: #3a3a44)
export const cloakOf = (c) => GEAR.cloak.replaceAll("#6b4a2e", c);

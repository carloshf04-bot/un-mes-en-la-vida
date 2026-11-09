// Escenarios nuevos de «Un mes en la vida de un gladiador» (Roma, año 80 d. C.).
// 5 capas por escenario: cielo (S.bg), lejos y medio (romeSkyline / stands / arquitectura), suelo y primer plano (S.over, paralaje 1,35).
import { C, r3, rng } from "./lib.mjs";
import { G, RC, torch, romanSky, romeSkyline, sandGround, ludus, post, stands, colosseum, wall, tunnel } from "./gl_fondos.mjs";
const INK = C.ink;
const DUR = (S) => S.t1 - S.t0;
const REP = (S, d) => Math.max(1, Math.floor(DUR(S) / d));

// ===================== CIELO =====================
// Cielo de noche con la fase de la luna (disco claro + disco de sombra que se desplaza)
export const MOON = { nueva: 0, fina: -0.3, creciente: -1.05, llena: -2.3, menguante: 1.05 };
export function nightSky(S, phase = "nueva", { g = ["#070b19", "#18223f", "#3d2c42"], day = false, r = 70 } = {}) {
  const { W, H, h } = S.fmt, mx = h ? 1480 : 760, my = h ? 150 : 360;
  if (!day) {
    S.bg.push(`<div class="layer" style="width:${W}px;height:${H}px;background:linear-gradient(180deg,${g[0]} 0%,${g[1]} 62%,${g[2]} 100%)"></div>`);
    const R = rng(11); let st = "";
    for (let i = 0; i < 110; i++) st += `<i id="${S.id}-ns${i}" style="position:absolute;left:${r3(R() * W)}px;top:${r3(R() * H * 0.55)}px;width:${r3(2 + R() * 3)}px;height:${r3(2 + R() * 3)}px;border-radius:50%;background:#fff;opacity:${r3(0.3 + R() * 0.6)}"></i>`;
    S.bg.push(`<div class="layer" style="width:${W}px;height:${H}px">${st}</div>`);
    for (let i = 0; i < 110; i += 5) S.tw(`tl.fromTo("#${S.id}-ns${i}",{opacity:0.15},{immediateRender:false,opacity:1,duration:${r3(0.9 + (i % 6) * 0.25)},yoyo:true,repeat:${REP(S, 1)},ease:"sine.inOut"},${r3((i % 7) * 0.2)});`);
  }
  const shade = day ? "#86b8e2" : "#141c33";
  S.bg.push(`<div class="layer" style="left:${mx - r}px;top:${my - r}px;width:${2 * r}px;height:${2 * r}px;border-radius:50%;opacity:${day ? 0.75 : 1};box-shadow:0 0 70px 18px rgba(244,236,210,${day ? 0.12 : 0.3})">
    <div style="position:absolute;inset:0;border-radius:50%;overflow:hidden;background:#f4ecd2;border:2px solid rgba(244,236,210,.55)">
      <div style="position:absolute;left:${r3(r * 0.42)}px;top:${r3(r * 0.4)}px;width:${r3(r * 0.4)}px;height:${r3(r * 0.32)}px;border-radius:50%;background:#e2d8bb"></div>
      <div style="position:absolute;left:${r3(r * 1.15)}px;top:${r3(r * 1.1)}px;width:${r3(r * 0.3)}px;height:${r3(r * 0.24)}px;border-radius:50%;background:#e2d8bb"></div>
      <div id="${S.id}-moonSh" style="position:absolute;left:-2px;top:-2px;width:${2 * r + 4}px;height:${2 * r + 4}px;border-radius:50%;background:${shade}"></div></div></div>`);
  S.tw(`tl.set("#${S.id}-moonSh",{x:${r3(MOON[phase] * r)}},0);`);
  S.moonR = r;
}
// La luna cambia de fase en su sitio (frases 47 y 124)
export function moonTo(S, t, phase, d = 1.2) { S.tw(`tl.to("#${S.id}-moonSh",{x:${r3(MOON[phase] * (S.moonR || 70))},duration:${d},ease:"power2.inOut"},${r3(t)});`); }

// Cielo gris de ceniza con copos que caen (inserto de Pompeya)
export function ashSky(S) {
  const { W, H } = S.fmt, R = rng(91); let a = "";
  S.bg.push(`<div class="layer" style="width:${W}px;height:${H}px;background:linear-gradient(180deg,#3b3634 0%,#7a716a 60%,#a59a8c 100%)"></div>`);
  for (let i = 0; i < 70; i++) a += `<i id="${S.id}-ash${i}" style="position:absolute;left:${r3(R() * W)}px;top:${r3(-40 - R() * H * 0.8)}px;width:${r3(4 + R() * 6)}px;height:${r3(4 + R() * 6)}px;border-radius:50%;background:#d8d2c8;opacity:${r3(0.4 + R() * 0.5)}"></i>`;
  S.over.push(`<div class="layer" style="width:${W}px;height:${H}px;z-index:13;overflow:hidden;pointer-events:none">${a}</div>`);
  for (let i = 0; i < 70; i++) { const c = 4 + (i % 5); S.tw(`tl.fromTo("#${S.id}-ash${i}",{x:0,y:0},{x:${-60 + (i % 7) * 20},y:${H + 200},duration:${c},repeat:${REP(S, c)},ease:"none"},${r3((i % 9) * 0.4)});`); }
}

// ===================== LUZ Y ATMÓSFERA =====================
export function vignette(S, k = 0.6) {
  const { W, H } = S.fmt;
  S.over.push(`<div class="layer" style="width:${W}px;height:${H}px;z-index:15;pointer-events:none;background:radial-gradient(ellipse at 50% 45%,rgba(0,0,0,0) 45%,rgba(5,6,18,${k}) 100%)"></div>`);
}
// Paleta de recuerdo: sepia (pasado), despues (gris azulado), ceniza (Pompeya), noche (azul de luna)
export function tint(S, kind = "sepia") {
  const { W, H } = S.fmt;
  const t = { sepia: "rgba(150,100,45,.55)", despues: "rgba(80,105,140,.5)", ceniza: "rgba(120,120,125,.55)", noche: "rgba(30,40,90,.38)" }[kind];
  S.over.push(`<div class="layer" style="width:${W}px;height:${H}px;z-index:13;pointer-events:none;mix-blend-mode:${kind === "noche" ? "multiply" : "color"};background:${t}"></div>`);
}
// Velo oscuro (ejecuciones del mediodía y frase 31): shade() lo crea apagado; shadeTo() lo enciende
export function shade(S, k = 0.6, on = false) {
  const { W, H } = S.fmt;
  S.over.push(`<div id="${S.id}-shade" class="layer" style="width:${W}px;height:${H}px;z-index:13;pointer-events:none;background:rgba(18,14,22,${k});opacity:${on ? 1 : 0}"></div>`);
}
export function shadeTo(S, t, op = 1, d = 0.4) { S.tw(`tl.to("#${S.id}-shade",{opacity:${op},duration:${d}},${r3(t)});`); }
// Rayos de sol en diagonal que respiran
export function sunRays(S, { color = "255,214,140", from = "right", k = 0.22 } = {}) {
  const { W, H } = S.fmt;
  S.over.push(`<div id="${S.id}-sr" class="layer" style="width:${W}px;height:${H}px;z-index:12;pointer-events:none;mix-blend-mode:screen;background:repeating-linear-gradient(${from === "right" ? 115 : 65}deg,rgba(${color},0) 0 90px,rgba(${color},${k}) 90px 150px,rgba(${color},0) 150px 260px);-webkit-mask:linear-gradient(180deg,#000,transparent 85%);mask:linear-gradient(180deg,#000,transparent 85%)"></div>`);
  S.tw(`tl.fromTo("#${S.id}-sr",{opacity:0.6},{immediateRender:false,opacity:1,duration:2.4,yoyo:true,repeat:${REP(S, 2.4)},ease:"sine.inOut"},0);`);
}
// Polvo o motas en suspensión
export function motes(S, { n = 40, color = "rgba(255,236,190,.7)", z = 13 } = {}) {
  const { W, H } = S.fmt, R = rng(121); let p = "";
  for (let i = 0; i < n; i++) p += `<i id="${S.id}-mo${i}" style="position:absolute;left:${r3(R() * W)}px;top:${r3(R() * H)}px;width:${r3(3 + R() * 5)}px;height:${r3(3 + R() * 5)}px;border-radius:50%;background:${color}"></i>`;
  S.over.push(`<div class="layer" style="width:${W}px;height:${H}px;z-index:${z};pointer-events:none">${p}</div>`);
  for (let i = 0; i < n; i++) { const c = 3 + (i % 4); S.tw(`tl.fromTo("#${S.id}-mo${i}",{x:0,y:0,opacity:0},{keyframes:[{x:${10 + (i % 5) * 8},y:${-20 - (i % 3) * 15},opacity:0.9,duration:${c / 2}},{x:${20 + (i % 5) * 10},y:${-50 - (i % 3) * 20},opacity:0,duration:${c / 2}}],repeat:${REP(S, c)},ease:"sine.inOut"},${r3((i % 8) * 0.3)});`); }
}
// Humo que sube (hogares, brasero, Vesubio)
export function smoke(S, id, x, y, { n = 6, color = "rgba(120,120,130,.45)", size = 60, rise = 320, z = 2 } = {}) {
  let p = "";
  for (let i = 0; i < n; i++) p += `<i id="${id}-${i}" style="position:absolute;left:${r3(x - size / 2)}px;top:${r3(y - size / 2)}px;width:${size}px;height:${size}px;border-radius:50%;background:${color}"></i>`;
  S.add(`<div class="prop" style="left:0;top:0;z-index:${z}">${p}</div>`);
  const c = 3.2;
  for (let i = 0; i < n; i++) S.tw(`tl.fromTo("#${id}-${i}",{x:0,y:0,scale:0.4,opacity:0.8},{x:${30 + i * 6},y:${-rise},scale:2.2,opacity:0,duration:${c},repeat:${REP(S, c)},ease:"none"},${r3(i * c / n)});`);
}
// Llama pequeña de lámpara de aceite con resplandor
export function lampFlame(S, id, x, y, s = 1) {
  S.add(`<div id="${id}" class="prop" style="left:${r3(x - 60 * s)}px;top:${r3(y - 90 * s)}px;width:${r3(120 * s)}px;height:${r3(100 * s)}px;z-index:3">
    <div style="position:absolute;left:${r3(-60 * s)}px;top:${r3(-60 * s)}px;width:${r3(240 * s)}px;height:${r3(240 * s)}px;border-radius:50%;background:radial-gradient(closest-side,rgba(255,170,70,.5),rgba(255,140,50,0))"></div>
    <svg width="${r3(120 * s)}" height="${r3(100 * s)}" viewBox="0 0 120 100" style="position:absolute;left:0;top:0"><g id="${id}-f"><path d="M60,20 C46,48 50,76 60,90 C70,76 74,48 60,20Z" fill="${C.fire}" stroke="${INK}" stroke-width="3"/><path d="M60,52 C55,64 56,80 60,86 C64,80 65,64 60,52Z" fill="${C.fire2}"/></g></svg></div>`);
  S.tw(`tl.fromTo("#${id}-f",{scaleY:0.85,scaleX:1.06},{immediateRender:false,scaleY:1.15,scaleX:0.92,svgOrigin:"60 90",duration:0.17,yoyo:true,repeat:${REP(S, 0.17)},ease:"sine.inOut"},0);`);
}

// ===================== ATREZO SUELTO =====================
// [ancho, alto, svg] con el suelo en y = alto
const ATZ = {
  amphora: [110, 175, `<path d="M38,8 L72,8 L68,30 C104,50 108,130 74,168 L36,168 C2,130 6,50 42,30Z" fill="#b8643a" stroke="${INK}" stroke-width="5"/><path d="M28,22 C12,30 12,60 34,54 M82,22 C98,30 98,60 76,54" stroke="${INK}" stroke-width="5" fill="none"/>`],
  rake: [80, 320, `<path d="M40,0 L40,290" stroke="#8a6232" stroke-width="10" stroke-linecap="round"/><rect x="0" y="286" width="80" height="14" fill="#6b4a24" stroke="${INK}" stroke-width="3"/>${[0, 1, 2, 3, 4].map((k) => `<path d="M${6 + k * 17},300 l0,18" stroke="#6b4a24" stroke-width="5"/>`).join("")}`],
  helmetPost: [150, 340, `<rect x="62" y="80" width="26" height="260" fill="#8a6232" stroke="${INK}" stroke-width="4"/><path d="M20,90 C18,30 132,24 130,90Z" fill="#c9a24a" stroke="${INK}" stroke-width="5"/><path d="M6,90 L144,90 L138,104 L12,104Z" fill="#b08a36" stroke="${INK}" stroke-width="4"/><path d="M40,34 C56,4 100,4 118,30 L132,18 L130,46 L116,38 C100,20 64,20 40,34Z" fill="#b5532f" stroke="${INK}" stroke-width="4"/><path d="M30,104 L30,140 L120,140 L120,104" fill="#9aa3ad" stroke="${INK}" stroke-width="4"/>${[0, 1, 2, 3].map((k) => `<path d="M${46 + k * 20},104 L${46 + k * 20},140" stroke="${INK}" stroke-width="3"/>`).join("")}`],
  shieldLean: [170, 270, `<g transform="rotate(-8 85 270)"><path d="M10,10 C30,2 130,2 150,10 L150,250 C130,258 30,258 10,250Z" fill="#b5332a" stroke="${INK}" stroke-width="6"/><circle cx="80" cy="130" r="22" fill="#d9a72b" stroke="${INK}" stroke-width="4"/></g>`],
  wickerLean: [170, 270, `<g transform="rotate(-8 85 270)"><path d="M10,10 C30,2 130,2 150,10 L150,250 C130,258 30,258 10,250Z" fill="#c9a467" stroke="${INK}" stroke-width="6"/>${[...Array(8)].map((_, k) => `<path d="M10,${34 + k * 28} L150,${34 + k * 28}" stroke="#a07e48" stroke-width="5"/>`).join("")}</g>`],
  chain: [220, 60, `<path d="M10,40 q20,-24 40,0 q20,24 40,0 q20,-24 40,0 q20,24 40,0" stroke="#6b6f76" stroke-width="9" fill="none" stroke-dasharray="14 6"/><ellipse cx="190" cy="34" rx="24" ry="16" fill="none" stroke="#5b5f66" stroke-width="9"/>`],
  bucket: [110, 110, `<path d="M8,20 L102,20 L92,108 L18,108Z" fill="#8a6232" stroke="${INK}" stroke-width="5"/><path d="M12,50 L98,50 M15,82 L95,82" stroke="#5b5f66" stroke-width="5"/><ellipse cx="55" cy="22" rx="46" ry="9" fill="#7fb6d6" stroke="${INK}" stroke-width="3"/>`],
  rack: [340, 340, `<rect x="10" y="40" width="20" height="300" fill="#8a6232" stroke="${INK}" stroke-width="4"/><rect x="310" y="40" width="20" height="300" fill="#8a6232" stroke="${INK}" stroke-width="4"/><rect x="0" y="120" width="340" height="18" fill="#8a6232" stroke="${INK}" stroke-width="4"/><rect x="0" y="240" width="340" height="18" fill="#8a6232" stroke="${INK}" stroke-width="4"/>
    <path d="M40,120 C38,70 120,66 118,120Z" fill="#c9a24a" stroke="${INK}" stroke-width="4"/><path d="M60,74 C70,52 100,52 112,70" stroke="#b5532f" stroke-width="9" fill="none"/>
    <path d="M140,120 C136,60 210,60 206,120Z" fill="#c9ced6" stroke="${INK}" stroke-width="4"/><circle cx="160" cy="98" r="5" fill="${INK}"/><circle cx="180" cy="98" r="5" fill="${INK}"/>
    <path d="M232,120 C230,74 304,70 302,120Z" fill="#c9a24a" stroke="${INK}" stroke-width="4"/><path d="M250,78 C262,50 296,48 306,64 L314,56 L310,76" stroke="#8f6a2a" stroke-width="6" fill="none"/>
    <path d="M60,240 L60,150 M120,240 L126,152 M200,240 L200,150" stroke="#a0703c" stroke-width="12" stroke-linecap="round"/><path d="M262,240 L262,150" stroke="#7a5030" stroke-width="8"/><path d="M244,150 L244,128 M262,150 L262,122 M280,150 L280,128 M244,150 L280,150" stroke="#c9ced6" stroke-width="6" fill="none"/>`],
  bench: [320, 110, `<rect x="0" y="20" width="320" height="26" fill="#a0703c" stroke="${INK}" stroke-width="5"/><rect x="20" y="46" width="22" height="64" fill="#7a5030" stroke="${INK}" stroke-width="4"/><rect x="278" y="46" width="22" height="64" fill="#7a5030" stroke="${INK}" stroke-width="4"/>`],
  basket: [130, 100, `<path d="M6,30 L124,30 L110,98 L20,98Z" fill="#b98a4e" stroke="${INK}" stroke-width="5"/><path d="M10,50 L120,50 M14,72 L116,72" stroke="#8a6232" stroke-width="5"/>${[0, 1, 2, 3, 4, 5].map((k) => `<path d="M${20 + k * 18},30 l-6,-26 M${20 + k * 18},30 l6,-24" stroke="#d9b860" stroke-width="4"/>`).join("")}`],
  woodSwords: [140, 260, `<path d="M20,260 L50,10 M60,260 L80,6 M100,260 L110,12" stroke="#a0703c" stroke-width="14" stroke-linecap="round"/><path d="M10,200 L130,200" stroke="#7a4a22" stroke-width="10"/>`],
  ladder: [130, 560, `<g transform="rotate(-10 65 560)"><path d="M20,560 L20,0 M110,560 L110,0" stroke="#8a6232" stroke-width="12"/>${[...Array(8)].map((_, k) => `<path d="M20,${520 - k * 66} L110,${520 - k * 66}" stroke="#8a6232" stroke-width="9"/>`).join("")}</g>`],
  paintPot: [100, 90, `<path d="M6,20 L94,20 L86,90 L14,90Z" fill="#8a6232" stroke="${INK}" stroke-width="5"/><ellipse cx="50" cy="22" rx="44" ry="9" fill="#b3261e" stroke="${INK}" stroke-width="3"/><path d="M20,26 C18,40 24,44 22,56" stroke="#b3261e" stroke-width="6" fill="none" stroke-linecap="round"/>`],
  palmJar: [160, 330, `<path d="M50,230 L110,230 L104,250 C150,270 150,320 120,330 L40,330 C10,320 10,270 56,250Z" fill="#b8643a" stroke="${INK}" stroke-width="5"/>${[0, 1, 2].map((k) => `<path d="M80,230 C${60 + k * 20},150 ${30 + k * 50},60 ${k * 70 + 10},10" stroke="#4f6b3a" stroke-width="6" fill="none"/>${[...Array(6)].map((_, q) => `<path d="M${r3(80 + (k - 1) * (12 + q * 10))},${200 - q * 32} l-26,10 M${r3(80 + (k - 1) * (12 + q * 10))},${200 - q * 32} l26,8" stroke="#6f9a4a" stroke-width="5" stroke-linecap="round"/>`).join("")}`).join("")}`],
  torchfg: [80, 320, `<path d="M32,120 L48,120 L44,320 L36,320Z" fill="#6b4a24" stroke="${INK}" stroke-width="4"/><path d="M22,120 L58,120 L52,104 L28,104Z" fill="#5b5f66" stroke="${INK}" stroke-width="4"/><g class="fl"><path d="M40,10 C18,44 22,84 40,104 C58,84 62,44 40,10Z" fill="${C.fire}" stroke="${INK}" stroke-width="4"/><path d="M40,46 C30,66 32,86 40,98 C48,86 50,66 40,46Z" fill="${C.fire2}"/></g>`],
  gateBar: [260, 900, `<rect x="20" y="0" width="70" height="900" fill="#6b4a24" stroke="${INK}" stroke-width="6"/><rect x="170" y="0" width="70" height="900" fill="#6b4a24" stroke="${INK}" stroke-width="6"/><rect x="0" y="300" width="260" height="50" fill="#5a3b22" stroke="${INK}" stroke-width="5"/><circle cx="55" cy="325" r="8" fill="#2b2b2b"/><circle cx="205" cy="325" r="8" fill="#2b2b2b"/>`],
  bannerFg: [160, 700, `<path d="M30,0 L30,700" stroke="#6b4a24" stroke-width="14"/><path d="M36,30 L150,30 L150,330 L93,290 L36,330Z" fill="${RC.purple}" stroke="${INK}" stroke-width="5"/><path d="M50,70 L136,70 M50,100 L136,100" stroke="${RC.gold}" stroke-width="6"/>`],
  plant: [170, 260, `<path d="M60,140 L110,140 L104,170 C150,180 150,240 120,256 L50,256 C20,240 20,180 66,170Z" fill="#9a4a2a" stroke="${INK}" stroke-width="6"/><path d="M85,140 C40,120 20,60 50,20 C70,60 80,90 85,140 C90,90 110,40 140,30 C150,80 120,120 85,140Z" fill="#4f7a3a" stroke="${INK}" stroke-width="5"/>`],
  column: [150, 900, `<rect x="20" y="40" width="110" height="840" fill="${RC.marble}" stroke="${INK}" stroke-width="6"/>${[0, 1, 2].map((k) => `<path d="M${42 + k * 32},50 L${42 + k * 32},870" stroke="${RC.marble2}" stroke-width="7"/>`).join("")}<rect x="0" y="10" width="150" height="40" fill="${RC.marble2}" stroke="${INK}" stroke-width="6"/><rect x="5" y="870" width="140" height="30" fill="${RC.marble2}" stroke="${INK}" stroke-width="6"/>`],
  curtain: [300, 900, `<path d="M0,0 L300,0 L280,900 L120,900 C140,600 60,300 0,240Z" fill="#8a2e2a" stroke="${INK}" stroke-width="6"/><path d="M80,40 C100,300 160,600 170,890 M180,30 C190,300 230,600 240,890" stroke="#6a1e1a" stroke-width="8" fill="none"/>`],
  glassRow: [320, 160, `<rect x="0" y="130" width="320" height="30" fill="#8a6232" stroke="${INK}" stroke-width="5"/>${[0, 1, 2].map((k) => `<path d="M${30 + k * 100},40 L${90 + k * 100},40 L${84 + k * 100},130 L${36 + k * 100},130Z" fill="rgba(150,205,175,.6)" stroke="${INK}" stroke-width="4"/><path d="M${33 + k * 100},70 L${87 + k * 100},70" stroke="#4f7a5a" stroke-width="4"/>`).join("")}`],
  wheel: [260, 260, `<circle cx="130" cy="130" r="120" fill="none" stroke="#5a3b22" stroke-width="20"/><circle cx="130" cy="130" r="120" fill="none" stroke="${INK}" stroke-width="4"/>${[0, 1, 2, 3, 4, 5].map((k) => `<path d="M130,130 L${r3(130 + 112 * Math.cos(k * Math.PI / 3))},${r3(130 + 112 * Math.sin(k * Math.PI / 3))}" stroke="#6b4a24" stroke-width="12"/>`).join("")}<circle cx="130" cy="130" r="24" fill="#5b5f66" stroke="${INK}" stroke-width="4"/>`],
  tabletStand: [160, 200, `<rect x="0" y="90" width="160" height="16" fill="#a0703c" stroke="${INK}" stroke-width="4"/><rect x="20" y="106" width="14" height="94" fill="#7a5030"/><rect x="126" y="106" width="14" height="94" fill="#7a5030"/><rect x="16" y="40" width="70" height="50" rx="4" fill="#a0703c" stroke="${INK}" stroke-width="4"/><rect x="24" y="48" width="54" height="34" fill="#3a2a1e"/><rect x="92" y="60" width="56" height="30" fill="#efe3c8" stroke="${INK}" stroke-width="3"/><path d="M100,30 L130,86" stroke="#c9a24a" stroke-width="5" stroke-linecap="round"/>`],
  gallicShield: [150, 300, `<path d="M75,6 C130,30 140,140 140,150 C140,160 130,270 75,294 C20,270 10,160 10,150 C10,140 20,30 75,6Z" fill="#4a6a3a" stroke="${INK}" stroke-width="6"/><path d="M75,20 L75,280" stroke="#8a6232" stroke-width="10"/><ellipse cx="75" cy="150" rx="22" ry="34" fill="#9aa3ad" stroke="${INK}" stroke-width="4"/><path d="M30,80 C50,100 50,120 30,140 M120,160 C100,180 100,200 120,220" stroke="#d9a72b" stroke-width="5" fill="none"/>`],
  aryballos: [120, 110, `<circle cx="40" cy="70" r="36" fill="#c9a24a" stroke="${INK}" stroke-width="5"/><rect x="30" y="20" width="20" height="18" fill="#b08a36" stroke="${INK}" stroke-width="3"/><path d="M30,24 C10,10 70,0 50,24" stroke="#5a3b22" stroke-width="3" fill="none"/><path d="M80,108 L80,80 C80,50 110,44 118,62" stroke="#b08a36" stroke-width="8" fill="none" stroke-linecap="round"/>`],
  barley: [140, 320, `${[0, 1, 2, 3].map((k) => `<path d="M${30 + k * 26},320 C${30 + k * 26},220 ${40 + k * 30},120 ${50 + k * 30},60" stroke="#b8963a" stroke-width="5" fill="none"/>${[0, 1, 2, 3, 4].map((q) => `<ellipse cx="${50 + k * 30 + (q % 2 ? 7 : -7)}" cy="${70 + q * 14}" rx="6" ry="10" fill="#d9b860" stroke="${INK}" stroke-width="2"/>`).join("")}<path d="M${50 + k * 30},60 l-4,-50 M${50 + k * 30},60 l8,-46" stroke="#d9b860" stroke-width="2"/>`).join("")}`],
  vine: [420, 520, `<path d="M0,520 C80,400 120,300 220,220 C300,160 360,100 420,0" stroke="#6b4a24" stroke-width="14" fill="none"/>${[[120, 380], [200, 260], [300, 170], [380, 80], [60, 460], [260, 300]].map(([a, b]) => `<path d="M${a},${b} c-30,-40 10,-70 30,-40 c20,-30 60,0 30,40 c30,20 0,60 -30,40 c-10,30 -50,20 -30,-40Z" fill="#5f8a4a" stroke="${INK}" stroke-width="4"/>`).join("")}${[[240, 330], [252, 350], [228, 350], [240, 370]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="11" fill="#6b2d5c" stroke="${INK}" stroke-width="2.5"/>`).join("")}`],
  bedEdge: [520, 200, `<rect x="0" y="60" width="520" height="40" fill="#8a6232" stroke="${INK}" stroke-width="5"/><rect x="20" y="100" width="30" height="100" fill="#6b4a24" stroke="${INK}" stroke-width="4"/><path d="M-10,60 C60,10 200,20 300,30 C400,10 470,20 530,60Z" fill="#d9b860" stroke="${INK}" stroke-width="5"/><path d="M40,40 l20,-20 M120,30 l-14,-22 M220,34 l16,-20 M360,26 l-10,-22" stroke="#a88838" stroke-width="4"/>`],
};
// Coloca una fila de objetos de atrezo centrada en x, apoyados en el suelo
export function atrezo(S, id, x, list, { gap = 60, y = G, z = 3, scale = 1 } = {}) {
  const items = list.map((k) => ATZ[k]); const total = items.reduce((a, [w]) => a + w * scale + gap, -gap);
  let cx = x - total / 2, h = "";
  items.forEach(([w, hh, svg], i) => { h += `<svg id="${id}-${i}" class="prop" style="left:${r3(cx)}px;top:${r3(y - hh * scale)}px;z-index:${z}" width="${r3(w * scale)}" height="${r3(hh * scale)}" viewBox="0 0 ${w} ${hh}" overflow="visible">${svg}</svg>`; cx += w * scale + gap; });
  S.add(h);
}
// Primer plano con objetos del lugar (paralaje 1,35, desenfocado). Sustituye a foreground() cuando no pega (arena, interiores, noche)
const FGS = { column: 1.2, curtain: 1.2, gateBar: 1.25, bannerFg: 1.3 };
export function foreground2(S, list = ["amphora", "plant"], { s0 = 2.2, blur = 3 } = {}) {
  const { H, h } = S.fmt, R = rng(37), k = h ? 1 : 1.25; let fg = "";
  for (let x = 200, i = 0; x < 30000; x += 1300 + R() * 900, i++) {
    const key = list[i % list.length], [w, hh, svg] = ATZ[key], s = Math.min((FGS[key] || s0) * k, (H * 0.42) / hh * 1.25);
    fg += `<svg style="position:absolute;left:${r3(x)}px;top:${r3(H - hh * s * 0.8)}px" width="${r3(w * s)}" height="${r3(hh * s)}" viewBox="0 0 ${w} ${hh}" overflow="visible">${svg}</svg>`;
  }
  S.over.push(`<div id="${S.id}-fg2" class="layer" style="left:0;top:${h ? 90 : 120}px;width:32000px;height:${H}px;z-index:14;filter:blur(${blur}px);opacity:.95">${fg}</div>`);
  S.parallax = [...(S.parallax || []).filter(([q]) => q !== `${S.id}-fg2`), [`${S.id}-fg2`, 1.35]];
  if (list.includes("torchfg")) S.tw(`tl.fromTo("#${S.id}-fg2 .fl",{scaleY:0.9},{immediateRender:false,scaleY:1.12,transformOrigin:"50% 100%",duration:0.2,yoyo:true,repeat:${REP(S, 0.2)},ease:"sine.inOut"},0);`);
}

// ===================== PIEZAS =====================
// Estandarte que ondea
export function banner(S, id, x, y = G, { color = RC.purple, z = 3 } = {}) {
  S.add(`<svg class="prop" style="left:${x - 80}px;top:${y - 620}px;z-index:${z}" width="200" height="630" overflow="visible"><path d="M20,0 L20,620" stroke="#6b4a24" stroke-width="12"/><path d="M-10,40 L50,40" stroke="#6b4a24" stroke-width="8"/><circle cx="20" cy="-6" r="12" fill="${RC.gold}" stroke="${INK}" stroke-width="4"/><g id="${id}-cl"><path d="M-6,46 L46,46 L46,220 L20,196 L-6,220Z" fill="${color}" stroke="${INK}" stroke-width="5"/><path d="M4,70 L36,70 M4,90 L36,90" stroke="${RC.gold}" stroke-width="5"/></g></svg>`);
  S.tw(`tl.fromTo("#${id}-cl",{skewY:0,scaleX:1},{immediateRender:false,skewY:5,scaleX:0.92,svgOrigin:"20 46",duration:0.6,yoyo:true,repeat:${REP(S, 0.6)},ease:"sine.inOut"},0);`);
}
// Reja de madera en el muro del podio (año 80: sin subterráneos). inside = vista desde dentro, con la arena iluminada detrás
export function arenaGate(S, id, x, { inside = false, w = 560, z = 2 } = {}) {
  const h = 700, a = 70, r = (w - 2 * a) / 2;
  const arch = `M${a},${h} L${a},${r + 60} A${r},${r} 0 0 1 ${w - a},${r + 60} L${w - a},${h}Z`;
  S.add(`<svg id="${id}" class="prop" style="left:${x - w / 2}px;top:${G - h}px;z-index:${z}" width="${w}" height="${h + 10}">
    <defs><clipPath id="${id}-cp"><path d="${arch}"/></clipPath></defs>
    <rect width="${w}" height="${h}" fill="${RC.marble}" stroke="${INK}" stroke-width="6"/>${[1, 2, 3, 4, 5].map((k) => `<path d="M0,${k * 120} L${w},${k * 120}" stroke="${RC.marble2}" stroke-width="4"/>`).join("")}
    <path d="${arch}" fill="${inside ? "#f0d49a" : "#1e1610"}" stroke="${INK}" stroke-width="7"/>
    <g id="${id}-bars" clip-path="url(#${id}-cp)">${[...Array(6)].map((_, k) => `<rect x="${r3(a + 20 + k * (w - 2 * a - 40) / 5 - 9)}" y="0" width="18" height="${h}" fill="#6b4a24" stroke="${INK}" stroke-width="3"/>`).join("")}${[260, 460].map((yy) => `<rect x="0" y="${yy}" width="${w}" height="18" fill="#6b4a24" stroke="${INK}" stroke-width="3"/>`).join("")}</g></svg>`);
}
export function gateRumble(S, id, t, d = 1) { S.tw(`tl.fromTo("#${id}-bars",{x:-3},{x:3,duration:0.05,yoyo:true,repeat:${Math.floor(d / 0.05)},ease:"none"},${r3(t)}); tl.to("#${id}-bars",{x:0,duration:0.05},${r3(t + d)});`); }
// Puerta de la escuela con dos hojas que se abren
export function gate(S, id, x, { label = "LVDVS", w = 1200 } = {}) {
  const h = 900, sp = 380, ow = 440, ox = (w - ow) / 2; let blocks = "";
  for (let y = 0; y < h; y += 46) for (let bx = (y / 46) % 2 ? -60 : 0; bx < w; bx += 120) blocks += `<rect x="${bx}" y="${y}" width="118" height="44" fill="none" stroke="#c6a676" stroke-width="2"/>`;
  const leaf = (s) => `<svg id="${id}-${s}" class="prop" style="left:${x - ow / 2 + (s === "R" ? ow / 2 : 0)}px;top:${G - (h - sp)}px;z-index:2" width="${ow / 2}" height="${h - sp}">
    <rect width="${ow / 2}" height="${h - sp}" fill="#7a5030" stroke="${INK}" stroke-width="5"/>${[1, 2, 3].map((k) => `<path d="M${k * ow / 8},0 L${k * ow / 8},${h - sp}" stroke="#5a3b22" stroke-width="5"/>`).join("")}${[60, 260, 460].map((yy) => `<rect x="0" y="${yy}" width="${ow / 2}" height="16" fill="#5b5f66" stroke="${INK}" stroke-width="3"/>`).join("")}</svg>`;
  S.add(`<svg class="prop" style="left:${x - w / 2}px;top:${G - h}px;z-index:1" width="${w}" height="${h + 10}">
    <rect width="${w}" height="${h}" fill="#ddbf91" stroke="${INK}" stroke-width="6"/>${blocks}<rect y="0" width="${w}" height="36" fill="${RC.tile}" stroke="${INK}" stroke-width="5"/>
    <path d="M${ox},${h} L${ox},${sp} A${ow / 2},${ow / 2} 0 0 1 ${ox + ow},${sp} L${ox + ow},${h}Z" fill="#1e1610" stroke="${INK}" stroke-width="8"/>
    <rect x="${w / 2 - 240}" y="56" width="480" height="66" fill="${RC.marble}" stroke="${INK}" stroke-width="5"/><text x="${w / 2}" y="104" text-anchor="middle" font-family="Cinzel" font-weight="900" font-size="44" fill="${RC.terra}">${label}</text></svg>${leaf("L")}${leaf("R")}`);
  torch(S, `${id}-t1`, x - ow / 2 - 90, G - 420); torch(S, `${id}-t2`, x + ow / 2 + 90, G - 420);
}
export function gateOpen(S, id, t, d = 1) {
  S.cue(t, "wood");
  S.tw(`tl.to("#${id}-L",{scaleX:0.18,transformOrigin:"0% 50%",duration:${d},ease:"power2.inOut"},${r3(t)}); tl.to("#${id}-R",{scaleX:0.18,transformOrigin:"100% 50%",duration:${d},ease:"power2.inOut"},${r3(t)});`);
}
// Carro-jaula de prisioneros (los presos van de pie sobre el piso del carro: y = G - 200, escala 0,75)
export function cart(S, id, x, { z = 6 } = {}) {
  S.add(`<div id="${id}" class="prop" style="left:${x - 330}px;top:${G - 520}px;width:660px;height:530px;z-index:${z}">
   <svg width="660" height="530" viewBox="0 0 660 530" overflow="visible">
    <path d="M600,340 L780,320" stroke="#6b4a24" stroke-width="16" stroke-linecap="round"/>
    <rect x="40" y="320" width="560" height="40" fill="#8a6232" stroke="${INK}" stroke-width="6"/><rect x="40" y="40" width="560" height="22" fill="#8a6232" stroke="${INK}" stroke-width="5"/>
    ${[...Array(10)].map((_, k) => `<rect x="${50 + k * 58}" y="50" width="16" height="276" fill="#6b4a24" stroke="${INK}" stroke-width="3"/>`).join("")}
    <g id="${id}-wh"><circle cx="320" cy="430" r="96" fill="none" stroke="#5a3b22" stroke-width="18"/><circle cx="320" cy="430" r="96" fill="none" stroke="${INK}" stroke-width="4"/>${[0, 1, 2, 3, 4, 5].map((k) => `<path d="M320,430 L${r3(320 + 92 * Math.cos(k * Math.PI / 3))},${r3(430 + 92 * Math.sin(k * Math.PI / 3))}" stroke="#6b4a24" stroke-width="10"/>`).join("")}<circle cx="320" cy="430" r="20" fill="#5b5f66" stroke="${INK}" stroke-width="4"/></g>
   </svg></div>`);
}
export function cartRoll(S, id, t0, t1, dx) {
  S.tw(`tl.to("#${id}",{x:"+=${dx}",duration:${r3(t1 - t0)},ease:"none"},${r3(t0)}); tl.to("#${id}-wh",{rotation:"+=${r3(dx / (2 * Math.PI * 96) * 360)}",svgOrigin:"320 430",duration:${r3(t1 - t0)},ease:"none"},${r3(t0)});`);
}
// Brasero del juramento
export function brazier(S, id, x) {
  S.add(`<div id="${id}" class="prop" style="left:${x - 110}px;top:${G - 380}px;width:220px;height:380px;z-index:4">
    <div style="position:absolute;left:-120px;top:-120px;width:460px;height:400px;border-radius:50%;background:radial-gradient(closest-side,rgba(255,150,60,.45),rgba(255,120,40,0))"></div>
    <svg width="220" height="380" viewBox="0 0 220 380" style="position:absolute;left:0;top:0" overflow="visible">
      <path d="M50,380 L90,200 M170,380 L130,200 M110,380 L110,200" stroke="#5b5f66" stroke-width="12" stroke-linecap="round"/>
      <g id="${id}-f">${[0, 1, 2].map((k) => `<path d="M${60 + k * 50},150 C${40 + k * 50},100 ${60 + k * 50},40 ${70 + k * 50},20 C${90 + k * 50},60 ${100 + k * 50},110 ${80 + k * 50},150Z" fill="${C.fire}" stroke="${INK}" stroke-width="4"/>`).join("")}</g>
      <path d="M20,140 L200,140 L170,210 L50,210Z" fill="#7a6a5a" stroke="${INK}" stroke-width="6"/><path d="M40,150 L180,150" stroke="${C.fire2}" stroke-width="8" stroke-linecap="round"/>
    </svg></div>`);
  S.tw(`tl.fromTo("#${id}-f",{scaleY:0.88},{immediateRender:false,scaleY:1.12,svgOrigin:"110 150",duration:0.22,yoyo:true,repeat:${REP(S, 0.22)},ease:"sine.inOut"},0);`);
}
// Busto de mármol (Séneca: curls false; Claudio: curls; Nerón: curls + beard ligera; Marco Aurelio: curls + beard; Tito: wreath)
export function bust(S, id, x, y = G, { beard = false, curls = true, wreath = false, w = 260, pedestal = 300 } = {}) {
  const m = RC.marble, m2 = RC.marble2;
  if (pedestal) S.add(`<svg class="prop" style="left:${x - 90}px;top:${y - pedestal}px;z-index:3" width="180" height="${pedestal}"><rect x="10" y="0" width="160" height="30" fill="${m2}" stroke="${INK}" stroke-width="5"/><rect x="30" y="30" width="120" height="${pedestal - 60}" fill="${m}" stroke="${INK}" stroke-width="5"/><rect x="10" y="${pedestal - 30}" width="160" height="30" fill="${m2}" stroke="${INK}" stroke-width="5"/></svg>`);
  const by = y - pedestal;
  S.add(`<svg id="${id}" class="prop" style="left:${x - w / 2}px;top:${by - w * 1.5}px;z-index:4" width="${w}" height="${w * 1.5}" viewBox="0 0 260 390">
    <rect x="70" y="330" width="120" height="60" fill="${m2}" stroke="${INK}" stroke-width="5"/><path d="M40,330 C40,260 90,240 130,240 C170,240 220,260 220,330Z" fill="${m}" stroke="${INK}" stroke-width="5"/>
    <rect x="112" y="200" width="36" height="50" fill="${m2}" stroke="${INK}" stroke-width="4"/><ellipse cx="130" cy="150" rx="62" ry="74" fill="${m}" stroke="${INK}" stroke-width="5"/>
    ${curls ? `<path d="M70,130 C64,70 100,64 130,66 C160,64 196,70 190,130 C178,104 160,96 130,98 C100,96 82,104 70,130Z" fill="${m2}" stroke="${INK}" stroke-width="4"/>` : `<path d="M74,116 C80,96 92,90 100,92 M186,116 C180,96 168,90 160,92" stroke="${m2}" stroke-width="10" fill="none"/>`}
    ${beard ? `<path d="M80,170 C84,230 176,230 180,170 C164,196 96,196 80,170Z" fill="${m2}" stroke="${INK}" stroke-width="4"/>` : ""}
    ${wreath ? `<path d="M70,112 C90,80 170,80 190,112" stroke="#6f8a4a" stroke-width="10" fill="none" stroke-dasharray="14 6"/>` : ""}
    <path d="M100,148 l18,0 M142,148 l18,0" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><path d="M130,156 L124,184 L136,184" stroke="${INK}" stroke-width="4" fill="none"/><path d="M114,202 Q130,208 146,202" stroke="${INK}" stroke-width="4" fill="none"/></svg>`);
}
// Órgano de agua (hydraulis) con burbujas en el depósito
export function hydraulis(S, id, x, y = G) {
  let pipes = ""; for (let k = 0; k < 12; k++) { const ph = 260 - k * 14; pipes += `<rect x="${40 + k * 18}" y="${200 - ph}" width="14" height="${ph}" rx="4" fill="#c9a24a" stroke="${INK}" stroke-width="3"/>`; }
  let bub = ""; for (let k = 0; k < 6; k++) bub += `<circle id="${id}-b${k}" cx="${120 + (k % 3) * 30}" cy="450" r="${6 + (k % 3) * 2}" fill="#d8eef8" stroke="${INK}" stroke-width="2"/>`;
  S.add(`<svg id="${id}" class="prop" style="left:${x - 160}px;top:${y - 480}px;z-index:3" width="320" height="490" overflow="visible">
    ${pipes}<rect x="20" y="200" width="280" height="40" fill="#8a6232" stroke="${INK}" stroke-width="5"/>
    <rect x="30" y="240" width="260" height="30" fill="#efe9df" stroke="${INK}" stroke-width="4"/>${[...Array(10)].map((_, k) => `<rect x="${36 + k * 25}" y="242" width="18" height="24" fill="#fff" stroke="${INK}" stroke-width="2"/>`).join("")}
    <path d="M70,270 L60,480 L260,480 L250,270Z" fill="#8a6232" stroke="${INK}" stroke-width="5"/>
    <path d="M90,320 C90,300 230,300 230,320 L236,470 L84,470Z" fill="#7fb6d6" stroke="${INK}" stroke-width="4" opacity=".9"/>${bub}
    <path d="M250,300 L300,300 L300,380" stroke="#5b5f66" stroke-width="10" fill="none"/><rect x="290" y="380" width="20" height="90" fill="#5b5f66" stroke="${INK}" stroke-width="3"/></svg>`);
  for (let k = 0; k < 6; k++) S.tw(`tl.fromTo("#${id}-b${k}",{y:0,opacity:1},{y:-130,opacity:0,duration:${r3(1 + k * 0.15)},repeat:${REP(S, 1)},ease:"power1.in"},${r3(k * 0.2)});`);
}
// Litera (frase 84)
export function lectica(S, id, x, y = G - 230) {
  S.add(`<svg id="${id}" class="prop" style="left:${x - 300}px;top:${y - 300}px;z-index:6" width="600" height="320" overflow="visible">
    <path d="M-40,250 L640,250" stroke="#6b4a24" stroke-width="16" stroke-linecap="round"/><rect x="120" y="150" width="360" height="110" fill="#6b2d5c" stroke="${INK}" stroke-width="5"/>
    <path d="M110,40 L490,40 L470,10 L130,10Z" fill="${RC.gold}" stroke="${INK}" stroke-width="5"/><path d="M130,40 L130,150 M470,40 L470,150" stroke="${RC.gold}" stroke-width="10"/>
    <g id="${id}-cur"><path d="M140,44 C170,100 160,140 190,150 L140,150Z M460,44 C430,100 440,140 410,150 L460,150Z" fill="#b5532f" stroke="${INK}" stroke-width="4"/></g></svg>`);
}
// Balanza gigante de bronce (balance). tilt(): deg > 0 baja el platillo rojo
export function bigScale(S, id, x, y = G) {
  S.add(`<svg class="prop" style="left:${x - 400}px;top:${y - 760}px;z-index:4" width="800" height="770" overflow="visible">
    <rect x="300" y="700" width="200" height="60" fill="#8f6a2a" stroke="${INK}" stroke-width="6"/><rect x="384" y="160" width="32" height="545" fill="#b08a36" stroke="${INK}" stroke-width="5"/>
    <g id="${id}-beam"><rect x="60" y="140" width="680" height="26" rx="10" fill="#c9a24a" stroke="${INK}" stroke-width="5"/>
      <g id="${id}-pL"><path d="M90,166 L40,420 M90,166 L140,420" stroke="#5b5f66" stroke-width="4"/><path d="M10,420 L170,420 C160,470 20,470 10,420Z" fill="${C.green}" stroke="${INK}" stroke-width="5"/></g>
      <g id="${id}-pR"><path d="M710,166 L660,420 M710,166 L760,420" stroke="#5b5f66" stroke-width="4"/><path d="M630,420 L790,420 C780,470 640,470 630,420Z" fill="${C.red}" stroke="${INK}" stroke-width="5"/></g>
    </g><circle cx="400" cy="152" r="22" fill="${RC.gold}" stroke="${INK}" stroke-width="5"/></svg>`);
}
export function tilt(S, id, t, deg) {
  S.tw(`tl.to("#${id}-beam",{rotation:${deg},svgOrigin:"400 152",duration:0.8,ease:"elastic.out(1,0.5)"},${r3(t)}); tl.to("#${id}-pL,#${id}-pR",{rotation:${-deg},transformOrigin:"50% 0%",duration:0.8,ease:"elastic.out(1,0.5)"},${r3(t)});`);
}
// Letras pintadas o rayadas sobre cualquier pared (dipinti y grafitis)
export function dipinto(S, id, x, y, lines, { size = 44, color = "#b3261e", w = 1100, rot = 0, font = "Cinzel", weight = 700, z = 2, bg = "" } = {}) {
  const hh = lines.length * size * 1.35 + 20;
  S.add(`<svg id="${id}" class="prop" style="left:${x - w / 2}px;top:${y}px;z-index:${z}" width="${w}" height="${hh}" overflow="visible"><g transform="rotate(${rot} ${w / 2} 0)">${bg ? `<rect x="0" y="0" width="${w}" height="${hh}" fill="${bg}" stroke="#cfc6b0" stroke-width="3"/>` : ""}${lines.map((l, i) => `<text id="${id}-l${i}" x="${w / 2}" y="${r3((i + 1) * size * 1.3)}" text-anchor="middle" font-family="${font}" font-weight="${weight}" font-size="${size}" fill="${color}">${l}</text>`).join("")}</g></svg>`);
}
// Puertas numeradas de los cuartos, para alinear con ludus(S, x, w) (mismo x y w)
export function cellDoors(S, x, w = 3400) {
  const x0 = x - w / 2, N = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"]; let d = "";
  for (let i = 0; i < Math.floor(w / 300) - 1; i++) { const dx = i * 300 + 160;
    d += `<rect x="${dx}" y="0" width="130" height="220" fill="#2a1d14" stroke="${INK}" stroke-width="5"/>${[0, 1, 2].map((k) => `<rect x="${dx + 18 + k * 40}" y="0" width="12" height="220" fill="#6b4a24"/>`).join("")}<rect x="${dx - 6}" y="-34" width="142" height="30" fill="${RC.marble}" stroke="${INK}" stroke-width="3"/><text x="${dx + 65}" y="-11" text-anchor="middle" font-family="Cinzel" font-weight="900" font-size="24" fill="${RC.terra}">${N[i % 12]}</text>`; }
  S.add(`<svg class="prop" style="left:${x0}px;top:${G - 260}px;z-index:2" width="${w}" height="270" viewBox="0 -40 ${w} 270" overflow="visible">${d}</svg>`);
}
// Caballo (eques, frase 54). Silla romana de cuatro cuernos, SIN estribos (no existían)
export function horse(S, id, x, { color = "#8a5a35", z = 4 } = {}) {
  const leg = (lx) => `<rect x="${lx}" y="-190" width="30" height="190" rx="12" fill="${color}" stroke="${INK}" stroke-width="5"/>`;
  S.add(`<svg id="${id}" class="prop" style="left:${x - 230}px;top:${G - 430}px;z-index:${z}" width="480" height="440" viewBox="-230 -430 480 440" overflow="visible">
    <g id="${id}-lB">${leg(-150)}${leg(110)}</g>
    <path d="M-180,-200 C-200,-320 120,-330 160,-250 L170,-190 C120,-160 -140,-160 -180,-200Z" fill="${color}" stroke="${INK}" stroke-width="6"/>
    <path d="M-180,-270 C-230,-250 -230,-170 -210,-130" stroke="#3b2211" stroke-width="18" fill="none" stroke-linecap="round"/>
    <path d="M110,-280 L170,-400 C190,-420 230,-400 230,-370 L200,-330 C190,-320 170,-300 160,-250Z" fill="${color}" stroke="${INK}" stroke-width="6"/><path d="M120,-300 L170,-410 L150,-300Z" fill="#3b2211"/><circle cx="196" cy="-380" r="6" fill="${INK}"/>
    <path d="M-60,-300 C-40,-330 40,-330 60,-300 L50,-250 L-50,-250Z" fill="#b5532f" stroke="${INK}" stroke-width="5"/><path d="M-60,-300 L-70,-322 M60,-300 L70,-322" stroke="#7a3b2e" stroke-width="10" stroke-linecap="round"/>
    <g id="${id}-lF">${leg(-120)}${leg(80)}</g></svg>`);
}
// Carro de guerra (essedarius, frase 54): plataforma de mimbre y una rueda
export function essedum(S, id, x, { z = 4 } = {}) {
  S.add(`<svg id="${id}" class="prop" style="left:${x - 220}px;top:${G - 300}px;z-index:${z}" width="440" height="310" overflow="visible">
    <path d="M300,180 L470,150" stroke="#6b4a24" stroke-width="14" stroke-linecap="round"/><rect x="40" y="160" width="300" height="34" fill="#8a6232" stroke="${INK}" stroke-width="5"/>
    <path d="M60,160 C60,60 320,60 320,160" fill="#c9a467" stroke="${INK}" stroke-width="5"/>${[0, 1, 2, 3].map((k) => `<path d="M70,${150 - k * 20} L310,${150 - k * 20}" stroke="#a07e48" stroke-width="4"/>`).join("")}
    <g id="${id}-wh"><circle cx="190" cy="220" r="86" fill="none" stroke="#5a3b22" stroke-width="16"/><circle cx="190" cy="220" r="86" fill="none" stroke="${INK}" stroke-width="4"/>${[0, 1, 2, 3, 4, 5, 6, 7].map((k) => `<path d="M190,220 L${r3(190 + 82 * Math.cos(k * Math.PI / 4))},${r3(220 + 82 * Math.sin(k * Math.PI / 4))}" stroke="#6b4a24" stroke-width="8"/>`).join("")}</g></svg>`);
}
// Gradas vacías (cierre): stands() con el público oculto
export function emptyStands(S, x, w = 7000, opts = {}) { stands(S, x, w, opts); S.tw(`tl.set('[id^="${S.id}-row"]',{opacity:0},0);`); }

// ===================== ESCENARIOS =====================
// Acera, calzada de losas, pasaderas y charcos (y de 700 a 1010 en un svg con top = G - 700)
function pavement(w, R) {
  let p = `<rect y="700" width="${w}" height="30" fill="#bfae94" stroke="${INK}" stroke-width="4"/><rect y="730" width="${w}" height="280" fill="#6e665c"/>`;
  for (let px = 0; px < w; px += 118) p += `<path d="M${px},${744 + (px % 3) * 4} l110,${r3(-4 + R() * 8)} l-4,44 l-108,2Z" fill="${R() < 0.5 ? "#8c8478" : "#7d766b"}" stroke="${INK}" stroke-width="3"/>`;
  for (let k = 0; k < 3; k++) p += `<ellipse cx="${r3(w * 0.3 + k * 130)}" cy="800" rx="46" ry="20" fill="#a59a8a" stroke="${INK}" stroke-width="4"/>`;
  for (let k = 0; k < 4; k++) p += `<ellipse cx="${r3(R() * w)}" cy="${r3(850 + R() * 120)}" rx="${r3(40 + R() * 40)}" ry="10" fill="#8fb3c9" opacity=".6"/>`;
  return p;
}
const tilesRow = (w, y, fill) => { let t = ""; for (let tx = 0; tx < w; tx += 40) t += `<path d="M${tx},${y} q20,-24 40,0" fill="${fill}" stroke="${INK}" stroke-width="3"/>`; return t; };

// Mercado de esclavos: pórtico con toldos, estrado de venta (catasta: los actores encima, y = G - 100)
export function slaveMarket(S, x, w = 3800) {
  const R = rng(111), x0 = x - w / 2; let por = "", aw = "", ids = [];
  for (let i = 0; i < Math.floor(w / 320); i++) { const cx = i * 320 + 60;
    por += `<rect x="${cx}" y="120" width="54" height="580" fill="${RC.marble}" stroke="${INK}" stroke-width="5"/><rect x="${cx - 12}" y="96" width="78" height="28" fill="${RC.marble2}" stroke="${INK}" stroke-width="4"/><path d="M${cx + 14},130 L${cx + 14},700 M${cx + 34},130 L${cx + 34},700" stroke="${RC.marble2}" stroke-width="4"/>`;
    if (i % 2 === 0) { ids.push(i); aw += `<g id="${S.id}-aw${i}"><path d="M${cx + 54},200 L${cx + 320},200 L${cx + 340},280 L${cx + 40},280Z" fill="${["#c8743a", "#4a6fa5", "#7a8a4a"][i % 3]}" stroke="${INK}" stroke-width="4"/>${[0, 1, 2, 3].map((k) => `<path d="M${cx + 80 + k * 64},200 L${cx + 70 + k * 64},280" stroke="#efe3c8" stroke-width="14"/>`).join("")}</g>`; }
  }
  const c = w / 2;
  const cat = `<g transform="translate(${c - 420},600)"><rect x="0" y="0" width="840" height="34" fill="#a0703c" stroke="${INK}" stroke-width="5"/><rect x="0" y="34" width="840" height="66" fill="#7a5030" stroke="${INK}" stroke-width="5"/>${[0, 1, 2, 3, 4].map((k) => `<path d="M${k * 210},34 L${k * 210},100" stroke="#5a3b22" stroke-width="5"/>`).join("")}<path d="M840,34 L900,34 L900,66 L960,66 L960,100 L840,100Z" fill="#8a6232" stroke="${INK}" stroke-width="4"/><rect x="60" y="-260" width="16" height="260" fill="#6b4a24" stroke="${INK}" stroke-width="3"/><rect x="20" y="-300" width="140" height="70" fill="#efe3c8" stroke="${INK}" stroke-width="4"/><path d="M36,-280 L140,-280 M36,-262 L120,-262 M36,-246 L132,-246" stroke="#5a4a38" stroke-width="3"/></g>`;
  S.add(`<svg class="prop" style="left:${x0}px;top:${G - 700}px;z-index:1" width="${w}" height="1010">
    <rect y="60" width="${w}" height="640" fill="#d8b48e"/>${[...Array(Math.floor(w / 320))].map((_, i) => `<rect x="${i * 320 + 150}" y="330" width="140" height="370" fill="#4a3424" stroke="${INK}" stroke-width="4"/>`).join("")}
    <rect y="40" width="${w}" height="60" fill="${RC.tile}" stroke="${INK}" stroke-width="5"/>${tilesRow(w, 60, RC.tile)}${por}${aw}${cat}${pavement(w, R)}</svg>`);
  for (const i of ids) S.tw(`tl.fromTo("#${S.id}-aw${i}",{skewX:0},{immediateRender:false,skewX:2.5,transformOrigin:"50% 0%",duration:${r3(0.9 + (i % 3) * 0.2)},yoyo:true,repeat:${REP(S, 0.9)},ease:"sine.inOut"},${r3(i * 0.1)});`);
}

// Cuarto del gladiador de noche
export function cell(S, x, w = 2600) {
  const R = rng(61), x0 = x - w / 2, n = w * 0.62, dx = w - 420; let blocks = "", graf = "", straw = "";
  for (let y = 60; y < 900; y += 54) for (let bx = (y / 54) % 2 ? -60 : 0; bx < w; bx += 130) blocks += `<rect x="${bx}" y="${y}" width="128" height="52" fill="none" stroke="#3e3228" stroke-width="3" opacity=".7"/>`;
  // grafitis rayados: gladiador de palitos y cuenta de días en grupos de cinco
  for (let i = 0; i < 4; i++) { const gx = 140 + i * 260 + R() * 60, gy = 420 + R() * 80;
    graf += `<g transform="translate(${r3(gx)},${r3(gy)})" stroke="#cdbb94" stroke-width="4" fill="none" stroke-linecap="round" opacity=".7"><circle cx="0" cy="-60" r="12"/><path d="M0,-48 L0,0 L-14,40 M0,0 L14,40 M0,-36 L-24,-14 M0,-36 L30,-50 L50,-90"/><path d="M60,-20 L60,40 M72,-20 L72,40 M84,-20 L84,40 M96,-20 L96,40 M54,0 L102,22"/></g>`; }
  for (let i = 0; i < 160; i++) straw += `<path d="M${r3(R() * w)},${r3(910 + R() * 380)} l${r3(10 + R() * 20)},${r3(-6 + R() * 12)}" stroke="#a88838" stroke-width="3" opacity=".6"/>`;
  const win = `<rect x="${w * 0.36}" y="140" width="190" height="120" fill="#1d2a4a" stroke="${INK}" stroke-width="6"/>${[1, 2, 3].map((k) => `<rect x="${w * 0.36 + k * 47 - 4}" y="140" width="8" height="120" fill="#3a3a40"/>`).join("")}`;
  const niche = `<path d="M${n},560 L${n},460 A70,70 0 0 1 ${n + 140},460 L${n + 140},560Z" fill="#2a1d14" stroke="${INK}" stroke-width="5"/><path d="M${n + 30},556 C${n + 30},532 ${n + 110},532 ${n + 110},556 L${n + 130},546 L${n + 110},560Z" fill="#b8643a" stroke="${INK}" stroke-width="4"/>`;
  const hang = `<circle cx="${w * 0.5}" cy="330" r="6" fill="${INK}"/><path d="M${w * 0.5},336 L${w * 0.5},380 C${w * 0.5},430 ${w * 0.5 + 50},440 ${w * 0.5 + 66},410" stroke="#b08a36" stroke-width="10" fill="none" stroke-linecap="round"/><circle cx="${w * 0.5 + 170}" cy="320" r="6" fill="${INK}"/><path d="M${w * 0.5 + 130},326 L${w * 0.5 + 210},326 L${w * 0.5 + 232},480 L${w * 0.5 + 108},480Z" fill="#8c7b62" stroke="${INK}" stroke-width="5"/>`;
  const door = `<rect x="${dx}" y="300" width="300" height="600" fill="#2a1d14" stroke="${INK}" stroke-width="7"/><rect id="${S.id}-glow" x="${dx}" y="300" width="300" height="600" fill="url(#${S.id}-dg)"/>${[0, 1, 2, 3, 4].map((k) => `<rect x="${dx + 20 + k * 60}" y="300" width="14" height="600" fill="#6b4a24" stroke="${INK}" stroke-width="3"/>`).join("")}<rect x="${dx}" y="450" width="300" height="18" fill="#6b4a24" stroke="${INK}" stroke-width="3"/>`;
  const bed = `<g transform="translate(220,740)"><rect x="0" y="0" width="560" height="40" fill="#8a6232" stroke="${INK}" stroke-width="5"/><rect x="20" y="40" width="26" height="120" fill="#6b4a24" stroke="${INK}" stroke-width="4"/><rect x="514" y="40" width="26" height="120" fill="#6b4a24" stroke="${INK}" stroke-width="4"/><path d="M-10,0 C40,-50 140,-40 200,-30 C300,-56 420,-40 570,0Z" fill="#d9b860" stroke="${INK}" stroke-width="5"/>${[...Array(14)].map((_, k) => `<path d="M${20 + k * 38},-14 l${k % 2 ? 18 : -14},-20" stroke="#a88838" stroke-width="4"/>`).join("")}<path d="M330,-36 C380,-60 470,-50 520,-8 L470,0 C430,-20 380,-26 330,-36Z" fill="#7a5a3a" stroke="${INK}" stroke-width="4"/></g>`;
  const items = `<g transform="translate(900,900)"><path d="M10,-120 L50,-120 L46,-100 C80,-80 80,-20 56,0 L4,0 C-20,-20 -20,-80 14,-100Z" fill="#a8542f" stroke="${INK}" stroke-width="5"/><path d="M50,-110 C76,-110 78,-70 58,-64" stroke="${INK}" stroke-width="5" fill="none"/><path d="M110,-30 L190,-30 C186,-4 170,0 150,0 C130,0 114,-4 110,-30Z" fill="#b8936a" stroke="${INK}" stroke-width="4"/><ellipse cx="150" cy="-30" rx="40" ry="8" fill="#d9c27a" stroke="${INK}" stroke-width="3"/>${[0, 1, 2].map((k) => `<rect x="${230 + k * 26}" y="-16" width="16" height="14" rx="3" fill="#efe6d2" stroke="${INK}" stroke-width="3"/>`).join("")}</g>`;
  S.add(`<svg class="prop" style="left:${x0}px;top:${G - 900}px;z-index:1" width="${w}" height="1300">
    <defs><radialGradient id="${S.id}-dg" cx="50%" cy="40%" r="60%"><stop offset="0" stop-color="#ff9b3d" stop-opacity=".75"/><stop offset="1" stop-color="#2a1d14" stop-opacity="0"/></radialGradient></defs>
    <rect width="${w}" height="900" fill="#5a4a3c"/>${blocks}<rect width="${w}" height="60" fill="#3a2c22"/>${[...Array(Math.ceil(w / 260))].map((_, k) => `<rect x="${k * 260}" y="0" width="40" height="70" fill="#4a3424" stroke="${INK}" stroke-width="3"/>`).join("")}
    ${win}${graf}${niche}${hang}${door}${bed}
    <rect y="900" width="${w}" height="400" fill="#6e5a44" stroke="${INK}" stroke-width="5"/>${straw}${items}</svg>`);
  S.add(`<div class="prop" style="left:${r3(x0 + w * 0.36 - 40)}px;top:${G - 760}px;width:560px;height:780px;z-index:2;background:linear-gradient(180deg,rgba(150,180,255,.26),rgba(150,180,255,0));clip-path:polygon(8% 0,42% 0,100% 100%,38% 100%)"></div>`);
  lampFlame(S, `${S.id}-lamp`, x0 + n + 128, G - 900 + 544, 0.8);
  S.tw(`tl.fromTo("#${S.id}-glow",{opacity:0.75},{immediateRender:false,opacity:1,duration:0.3,yoyo:true,repeat:${REP(S, 0.3)},ease:"sine.inOut"},0);`);
}

// Banquete de la cena libera: pórtico de noche, guirnaldas, lámparas colgadas, curiosos tras la barandilla y mesa larga (z 6)
const FOOD = [
  (x) => `<circle cx="${x + 40}" cy="-26" r="30" fill="#c9853f" stroke="${INK}" stroke-width="4"/>${[0, 1, 2, 3].map((k) => { const c = 28 * Math.cos(k * Math.PI / 4), s = 28 * Math.sin(k * Math.PI / 4); return `<path d="M${r3(x + 40 - c)},${r3(-26 - s)} L${r3(x + 40 + c)},${r3(-26 + s)}" stroke="#8a5a25" stroke-width="3"/>`; }).join("")}`, // pan redondo con gajos, como el de Pompeya
  (x) => `<ellipse cx="${x + 50}" cy="-4" rx="56" ry="10" fill="#c9a24a" stroke="${INK}" stroke-width="4"/>${[[30, -22], [48, -30], [66, -22], [40, -12], [58, -12], [48, -18]].map(([a, b]) => `<circle cx="${x + a}" cy="${b}" r="10" fill="#6b2d5c" stroke="${INK}" stroke-width="2.5"/>`).join("")}`, // uvas en plato de bronce
  (x) => `<ellipse cx="${x + 50}" cy="-4" rx="60" ry="10" fill="#d8cfbf" stroke="${INK}" stroke-width="4"/><path d="M${x + 10},-10 C${x + 10},-50 ${x + 80},-56 ${x + 92},-20 L${x + 108},-30 L${x + 100},-10Z" fill="#b8743a" stroke="${INK}" stroke-width="4"/>`, // ave asada
  (x) => `<path d="M${x + 20},-60 L${x + 52},-60 L${x + 48},-46 C${x + 76},-32 ${x + 76},-8 ${x + 60},0 L${x + 12},0 C${x - 4},-8 ${x - 4},-32 ${x + 24},-46Z" fill="#a8542f" stroke="${INK}" stroke-width="4"/><circle cx="${x + 90}" cy="-14" r="14" fill="#7a2e3a" stroke="${INK}" stroke-width="3"/><circle cx="${x + 116}" cy="-12" r="12" fill="#7a2e3a" stroke="${INK}" stroke-width="3"/>`, // jarra de vino e higos
  (x) => `<path d="M${x + 10},-30 L${x + 90},-30 C${x + 86},-6 ${x + 70},0 ${x + 50},0 C${x + 30},0 ${x + 14},-6 ${x + 10},-30Z" fill="#b8936a" stroke="${INK}" stroke-width="4"/>${[...Array(7)].map((_, k) => `<ellipse cx="${x + 22 + k * 9}" cy="-32" rx="6" ry="5" fill="#4f5a2a" stroke="${INK}" stroke-width="2"/>`).join("")}`, // aceitunas
  (x) => `<circle cx="${x + 40}" cy="-22" r="22" fill="#b3261e" stroke="${INK}" stroke-width="4"/><path d="M${x + 34},-44 l6,-8 l6,8" fill="#7a1a14" stroke="${INK}" stroke-width="3"/><ellipse cx="${x + 84}" cy="-12" rx="12" ry="15" fill="#efe6d2" stroke="${INK}" stroke-width="3"/><ellipse cx="${x + 104}" cy="-12" rx="12" ry="15" fill="#efe6d2" stroke="${INK}" stroke-width="3"/>`, // granada y huevos
];
export function banquet(S, x, w = 3600) {
  const R = rng(71), x0 = x - w / 2, nb = Math.floor(w / 420); let back = "";
  for (let i = 0; i < nb; i++) { const cx = i * 420 + 40;
    back += `<rect x="${cx}" y="100" width="60" height="560" fill="#9a8a78" stroke="${INK}" stroke-width="5"/><rect x="${cx}" y="440" width="60" height="220" fill="#8a3a2a" stroke="${INK}" stroke-width="5"/><rect x="${cx - 12}" y="80" width="84" height="26" fill="#8a7a68" stroke="${INK}" stroke-width="4"/>`;
    back += `<g id="${S.id}-cw${i}">${[0, 1, 2, 3].map((k) => { const hx = cx + 110 + k * 70 + R() * 16; return `<rect x="${r3(hx - 22)}" y="480" width="44" height="90" rx="16" fill="${["#4a6fa5", "#7a8a4a", "#b5532f", "#6b2d5c"][(k + i) % 4]}" stroke="${INK}" stroke-width="3"/><circle cx="${r3(hx)}" cy="462" r="20" fill="${["#d9a273", "#a8724a", "#c98f62", "#e0b48c"][(k + 2 * i) % 4]}" stroke="${INK}" stroke-width="3"/>`; }).join("")}</g>`;
    back += `<g id="${S.id}-sw${i}"><path d="M${cx + 60},110 Q${cx + 240},220 ${cx + 420},110 L${cx + 420},134 Q${cx + 240},250 ${cx + 60},134Z" fill="#8a2e2a" stroke="${INK}" stroke-width="4"/></g>`;
    back += `<path d="M${cx + 240},100 L${cx + 240},250" stroke="#5b5f66" stroke-width="4" stroke-dasharray="8 4"/><path d="M${cx + 200},262 C${cx + 200},244 ${cx + 280},244 ${cx + 280},262 L${cx + 300},258 L${cx + 286},272 C${cx + 260},284 ${cx + 220},284 ${cx + 200},262Z" fill="#c9a24a" stroke="${INK}" stroke-width="4"/>`;
  }
  const rail = `<rect y="570" width="${w}" height="16" fill="#6b4a24" stroke="${INK}" stroke-width="3"/><rect y="620" width="${w}" height="12" fill="#6b4a24" stroke="${INK}" stroke-width="3"/>${[...Array(Math.floor(w / 70))].map((_, k) => `<rect x="${k * 70}" y="570" width="10" height="90" fill="#6b4a24"/>`).join("")}`;
  S.add(`<svg class="prop" style="left:${x0}px;top:${G - 700}px;z-index:1" width="${w}" height="1010">
    <rect y="40" width="${w}" height="620" fill="#2e2430"/><rect y="0" width="${w}" height="44" fill="#6a3a2e" stroke="${INK}" stroke-width="5"/>${tilesRow(w, 40, "#6a3a2e")}
    ${back}${rail}<rect y="660" width="${w}" height="40" fill="#6e5a44" stroke="${INK}" stroke-width="4"/><rect y="700" width="${w}" height="310" fill="#5e4c3a"/></svg>`);
  for (let i = 0; i < nb; i++) lampFlame(S, `${S.id}-lf${i}`, x0 + i * 420 + 40 + 296, G - 700 + 258, 0.7);
  const tw = w - 600; let food = "";
  for (let px = 40, k = 0; px < tw - 140; px += 170, k++) food += FOOD[k % FOOD.length](px);
  S.add(`<svg id="${S.id}-table" class="prop" style="left:${x0 + 300}px;top:${G - 230}px;z-index:6" width="${tw}" height="240" overflow="visible">
    <rect x="0" y="40" width="${tw}" height="30" fill="#a0703c" stroke="${INK}" stroke-width="5"/><rect x="0" y="70" width="${tw}" height="160" fill="#7a5030" stroke="${INK}" stroke-width="5"/>${[...Array(Math.floor(tw / 300))].map((_, k) => `<path d="M${k * 300 + 150},70 L${k * 300 + 150},230" stroke="#5a3b22" stroke-width="5"/>`).join("")}<g transform="translate(0,40)">${food}</g></svg>`);
  for (let i = 0; i < nb; i++) {
    S.tw(`tl.fromTo("#${S.id}-cw${i}",{y:0},{immediateRender:false,y:-12,duration:${r3(0.8 + (i % 3) * 0.3)},yoyo:true,repeat:${REP(S, 0.8)},ease:"sine.inOut"},${r3(i * 0.25)});`);
    S.tw(`tl.fromTo("#${S.id}-sw${i}",{scaleY:1},{immediateRender:false,scaleY:1.08,transformOrigin:"50% 0%",duration:1.1,yoyo:true,repeat:${REP(S, 1.1)},ease:"sine.inOut"},${r3(i * 0.15)});`);
  }
  torch(S, `${S.id}-t1`, x0 + 120, G - 100); torch(S, `${S.id}-t2`, x0 + w - 120, G - 100);
}

// Calle de Roma con el anuncio de los juegos pintado (edictum), rotulista, tienda y fuente
export function street(S, x, w = 3600) {
  const R = rng(131), x0 = x - w / 2, nx = 260, nw = 1300, sx = w - 1500, fx = w - 700; let win = "";
  for (let k = 0; k < Math.floor(w / 360); k++) { const wx = 120 + k * 360;
    win += `<rect x="${wx}" y="70" width="70" height="90" fill="#3a2a1e" stroke="${INK}" stroke-width="4"/><rect x="${wx - 30}" y="70" width="30" height="90" fill="#8a6232" stroke="${INK}" stroke-width="3"/><rect x="${wx + 70}" y="70" width="30" height="90" fill="#8a6232" stroke="${INK}" stroke-width="3"/>${k % 3 === 1 ? `<rect x="${wx - 40}" y="160" width="150" height="14" fill="#6b4a24" stroke="${INK}" stroke-width="3"/><path d="M${wx - 20},160 C${wx - 30},130 ${wx},126 ${wx + 6},160Z M${wx + 60},160 C${wx + 70},128 ${wx + 96},130 ${wx + 92},160Z" fill="#4f7a3a" stroke="${INK}" stroke-width="3"/>` : ""}`; }
  // Anuncio inventado con fórmulas reales de los edicta munerum (PARIA PVGNABVNT, VENATIO, SPARSIONES, VELA ERVNT)
  const ed = `<rect x="${nx}" y="210" width="${nw}" height="330" fill="#f4efe2" stroke="#cfc6b0" stroke-width="4"/>
    <text id="${S.id}-ed0" x="${nx + nw / 2}" y="290" text-anchor="middle" font-family="Cinzel" font-weight="900" font-size="64" fill="#b3261e">IMP · TITVS · CAESAR · AVG</text>
    <text id="${S.id}-ed1" x="${nx + nw / 2}" y="370" text-anchor="middle" font-family="Cinzel" font-weight="700" font-size="46" fill="#b3261e">AMPHITHEATRI · DEDICATIONE</text>
    <text id="${S.id}-ed2" x="${nx + nw / 2}" y="440" text-anchor="middle" font-family="Cinzel" font-weight="700" font-size="46" fill="#b3261e">GLADIATORVM · PARIA · PVGNABVNT</text>
    <text id="${S.id}-ed3" x="${nx + nw / 2}" y="510" text-anchor="middle" font-family="Cinzel" font-weight="700" font-size="46" fill="#1f1a18">VENATIO · SPARSIONES · VELA · ERVNT</text>`;
  const old = `<g opacity=".5"><text x="${nx + nw + 230}" y="300" text-anchor="middle" font-family="Cinzel" font-weight="700" font-size="34" fill="#b3261e">MVNERA · VELA</text><text x="${nx + nw + 230}" y="346" text-anchor="middle" font-family="Cinzel" font-weight="700" font-size="34" fill="#b3261e">ERVNT</text></g><rect x="${nx + nw + 250}" y="262" width="150" height="100" fill="#efe9df" opacity=".85" transform="rotate(-4 ${nx + nw + 325} 312)"/>`;
  const ladder = `<g transform="translate(${nx + nw - 120},700) rotate(-12)"><path d="M0,0 L0,-520 M90,0 L90,-520" stroke="#8a6232" stroke-width="12"/>${[...Array(8)].map((_, k) => `<path d="M0,${-40 - k * 62} L90,${-40 - k * 62}" stroke="#8a6232" stroke-width="9"/>`).join("")}</g><g transform="translate(${nx + nw + 20},610)">${ATZ.paintPot[2]}</g>`;
  const shop = `<g transform="translate(${sx},0)"><rect x="0" y="230" width="560" height="470" fill="#2e2018" stroke="${INK}" stroke-width="6"/>
    ${[0, 1, 2].map((k) => `<path d="M${40 + k * 70},300 L${70 + k * 70},300 L${68 + k * 70},316 C${96 + k * 70},330 ${96 + k * 70},400 ${74 + k * 70},420 L${46 + k * 70},420 C${24 + k * 70},400 ${24 + k * 70},330 ${42 + k * 70},316Z" fill="#b8643a" stroke="${INK}" stroke-width="4"/>`).join("")}
    <path d="M300,250 L300,312 M360,250 L360,296" stroke="#8a6232" stroke-width="4"/><ellipse cx="300" cy="334" rx="16" ry="22" fill="#c98f62" stroke="${INK}" stroke-width="3"/><ellipse cx="360" cy="314" rx="12" ry="18" fill="#efe3c8" stroke="${INK}" stroke-width="3"/>
    <rect x="20" y="520" width="420" height="180" fill="${RC.marble2}" stroke="${INK}" stroke-width="5"/>${[0, 1, 2].map((k) => `<ellipse cx="${90 + k * 130}" cy="526" rx="42" ry="14" fill="#7a3b2e" stroke="${INK}" stroke-width="4"/>`).join("")}
    ${[0, 1, 2, 3].map((k) => `<rect x="${456 + k * 24}" y="250" width="20" height="450" fill="#8a6232" stroke="${INK}" stroke-width="3"/>`).join("")}
    <g id="${S.id}-awn"><path d="M-30,214 L590,214 L630,290 L-70,290Z" fill="#c8743a" stroke="${INK}" stroke-width="5"/>${[0, 1, 2, 3, 4, 5].map((k) => `<path d="M${k * 110 - 10},214 L${k * 110 - 40},290 L${k * 110 + 20},290 L${k * 110 + 45},214Z" fill="#efe3c8"/>`).join("")}</g></g>`;
  const fountain = `<g transform="translate(${fx},700)"><rect x="-140" y="-150" width="280" height="150" fill="#bfae94" stroke="${INK}" stroke-width="6"/><rect x="-150" y="-160" width="300" height="20" fill="#d8cfbf" stroke="${INK}" stroke-width="4"/><rect x="-40" y="-330" width="80" height="180" fill="#bfae94" stroke="${INK}" stroke-width="5"/><circle cx="0" cy="-270" r="26" fill="${RC.marble}" stroke="${INK}" stroke-width="4"/><path id="${S.id}-wat" d="M0,-252 C14,-220 20,-190 22,-160" stroke="#7fc0e6" stroke-width="10" fill="none" stroke-dasharray="16 10" stroke-linecap="round"/><path d="M-130,-150 Q0,-170 130,-150" stroke="#7fc0e6" stroke-width="8" fill="none"/></g>`;
  S.add(`<svg class="prop" style="left:${x0}px;top:${G - 700}px;z-index:1" width="${w}" height="1010">
    <rect y="40" width="${w}" height="660" fill="#e8d6b5" stroke="${INK}" stroke-width="6"/><rect y="0" width="${w}" height="40" fill="${RC.tile}" stroke="${INK}" stroke-width="5"/>${tilesRow(w, 40, RC.tile)}
    <rect y="180" width="${w}" height="10" fill="#cdb894"/><rect y="600" width="${w}" height="100" fill="#cfa77a"/>
    ${win}${ed}${old}${ladder}${shop}${fountain}${pavement(w, R)}</svg>`);
  S.tw(`tl.fromTo("#${S.id}-wat",{strokeDashoffset:0},{strokeDashoffset:-52,duration:0.4,repeat:${REP(S, 0.4)},ease:"none"},0);`);
  S.tw(`tl.fromTo("#${S.id}-awn",{skewX:0},{immediateRender:false,skewX:3,transformOrigin:"50% 0%",duration:0.9,yoyo:true,repeat:${REP(S, 0.9)},ease:"sine.inOut"},0);`);
}
// El rotulista pinta una línea del anuncio (frase 73). Si clip-path no va en <text>, cambiar por opacity
export function paintOn(S, t, line, d = 1.2) { S.tw(`tl.fromTo("#${S.id}-ed${line}",{clipPath:"inset(0 100% 0 0)"},{clipPath:"inset(0 0% 0 0)",duration:${d},ease:"none"},${r3(t)});`); }

// Tienda de recuerdos: vasos de vidrio, lámparas, figurillas de barro, balanza, monedas y palmas
export function souvenirShop(S, x, w = 3000) {
  const R = rng(141), x0 = x - w / 2, ox = 700, ow = 1400; let shelf = "";
  for (let r = 0; r < 3; r++) { const y = 310 + r * 100;
    shelf += `<rect x="${ox + 20}" y="${y}" width="${ow - 40}" height="14" fill="#8a6232" stroke="${INK}" stroke-width="3"/>`;
    for (let k = 0; k < 11; k++) { const ix = ox + 60 + k * 120, t = (k + r) % 3;
      if (t === 0) shelf += `<path d="M${ix},${y - 70} L${ix + 44},${y - 70} L${ix + 40},${y - 4} L${ix + 4},${y - 4}Z" fill="rgba(150,205,175,.6)" stroke="${INK}" stroke-width="3"/><path d="M${ix + 2},${y - 50} L${ix + 42},${y - 50} M${ix + 3},${y - 26} L${ix + 41},${y - 26}" stroke="#4f7a5a" stroke-width="3"/>`;
      else if (t === 1) shelf += `<path d="M${ix - 6},${y - 22} C${ix - 6},${y - 46} ${ix + 50},${y - 46} ${ix + 52},${y - 28} L${ix + 76},${y - 28} C${ix + 84},${y - 22} ${ix + 80},${y - 12} ${ix + 70},${y - 12} L${ix + 50},${y - 12} C${ix + 44},${y - 2} ${ix},${y - 2} ${ix - 6},${y - 22}Z" fill="#b8643a" stroke="${INK}" stroke-width="3"/>`;
      else shelf += `<g transform="translate(${ix + 20},${y})"><path d="M-10,0 L-8,-40 L-18,-46 L-12,-60 C-12,-80 12,-80 12,-60 L18,-46 L8,-40 L10,0Z" fill="#c98f62" stroke="${INK}" stroke-width="3"/><rect x="-22" y="-52" width="14" height="30" fill="#a0502c" stroke="${INK}" stroke-width="2"/></g>`;
    } }
  const counter = `<rect x="${ox}" y="560" width="${ow}" height="140" fill="${RC.marble2}" stroke="${INK}" stroke-width="5"/>
    <g transform="translate(${ox + 200},560)"><path d="M0,-90 L0,0 M-60,-90 L60,-90" stroke="#8f6a2a" stroke-width="6"/><path d="M-80,-40 L-60,-90 L-40,-40 M40,-40 L60,-90 L80,-40" fill="none" stroke="#5b5f66" stroke-width="3"/><path d="M-84,-40 C-80,-24 -40,-24 -36,-40Z M36,-40 C40,-24 80,-24 84,-40Z" fill="#c9a24a" stroke="${INK}" stroke-width="3"/></g>
    ${[0, 1, 2, 3, 4].map((k) => `<ellipse id="${S.id}-coin${k}" cx="${ox + 420 + k * 26}" cy="${552 - (k % 2) * 6}" rx="14" ry="6" fill="#d9a72b" stroke="${INK}" stroke-width="2.5"/>`).join("")}
    <g transform="translate(${ox + 700},560)"><rect x="0" y="-50" width="70" height="50" rx="4" fill="#a0703c" stroke="${INK}" stroke-width="4"/><rect x="8" y="-42" width="54" height="34" fill="#3a2a1e"/><path d="M14,-32 L52,-32 M14,-20 L44,-20" stroke="#d9c7a0" stroke-width="3"/></g>
    <g transform="translate(${ox + ow - 220},560)"><path d="M10,-80 L60,-80 L56,-60 C90,-40 90,-10 70,0 L0,0 C-20,-10 -20,-40 14,-60Z" fill="#b8643a" stroke="${INK}" stroke-width="4"/><g id="${S.id}-palm">${[0, 1, 2].map((k) => `<path d="M35,-80 C${10 + k * 25},-200 ${-40 + k * 50},-260 ${-70 + k * 70},-300" stroke="#5f8a4a" stroke-width="7" fill="none"/>`).join("")}</g></g>`;
  const graf = `<g stroke="#5a4a3c" stroke-width="3" fill="none" transform="translate(300,420)"><circle cx="0" cy="-60" r="10"/><path d="M0,-50 L0,-10 L-12,20 M0,-10 L12,20 M0,-40 L-20,-20 M0,-40 L26,-56"/><path d="M60,20 C64,-20 70,-50 84,-70 M70,-20 l-14,-8 M74,-40 l14,-6"/></g>`;
  S.add(`<svg class="prop" style="left:${x0}px;top:${G - 700}px;z-index:1" width="${w}" height="1010">
    <rect y="40" width="${w}" height="660" fill="#e3c9a4" stroke="${INK}" stroke-width="6"/><rect y="0" width="${w}" height="40" fill="${RC.tile}" stroke="${INK}" stroke-width="5"/>${tilesRow(w, 40, RC.tile)}
    <rect x="${ox}" y="220" width="${ow}" height="480" fill="#3a2a1e" stroke="${INK}" stroke-width="6"/>${shelf}${counter}${graf}
    <rect x="${ox - 60}" y="200" width="60" height="500" fill="${RC.marble}" stroke="${INK}" stroke-width="5"/><rect x="${ox + ow}" y="200" width="60" height="500" fill="${RC.marble}" stroke="${INK}" stroke-width="5"/>
    <rect x="${ox + ow / 2 - 280}" y="120" width="560" height="64" fill="#8a6232" stroke="${INK}" stroke-width="5"/><text x="${ox + ow / 2}" y="166" text-anchor="middle" font-family="Cinzel" font-weight="900" font-size="38" fill="#efe3c8">VASA · VITREA · LVCERNAE</text>
    <g id="${S.id}-awn"><path d="M${ox - 40},196 L${ox + ow + 40},196 L${ox + ow + 80},250 L${ox - 80},250Z" fill="#4a6fa5" stroke="${INK}" stroke-width="5"/>${[...Array(12)].map((_, k) => `<path d="M${ox + k * 125},196 L${ox + k * 125 - 20},250" stroke="#efe3c8" stroke-width="18"/>`).join("")}</g>
    ${pavement(w, R)}</svg>`);
  S.tw(`tl.fromTo("#${S.id}-awn",{skewX:0},{immediateRender:false,skewX:2,transformOrigin:"50% 0%",duration:1,yoyo:true,repeat:${REP(S, 1)},ease:"sine.inOut"},0);`);
  S.tw(`tl.fromTo("#${S.id}-palm",{rotation:-3},{immediateRender:false,rotation:3,transformOrigin:"50% 100%",duration:1.3,yoyo:true,repeat:${REP(S, 1.3)},ease:"sine.inOut"},0);`);
  for (let k = 0; k < 5; k++) S.tw(`tl.fromTo("#${S.id}-coin${k}",{fill:"#d9a72b"},{immediateRender:false,fill:"#ffe08a",duration:0.25,yoyo:true,repeat:1,repeatDelay:${1.5 + k * 0.4}},${r3(k * 0.5)});`);
}

// Enfermería: ventana alta con haz de luz, estante de frascos, instrumental de bronce, banco de masaje, vendas, cubo con gotera y cortina
export function infirmary(S, x, w = 2800) {
  const x0 = x - w / 2; let blocks = "", jars = "";
  for (let y = 40; y < 700; y += 54) for (let bx = (y / 54) % 2 ? -60 : 0; bx < w; bx += 130) blocks += `<rect x="${bx}" y="${y}" width="128" height="52" fill="none" stroke="#8a7a62" stroke-width="2" opacity=".6"/>`;
  for (let r = 0; r < 2; r++) { const y = 300 + r * 140; jars += `<rect x="120" y="${y}" width="700" height="14" fill="#8a6232" stroke="${INK}" stroke-width="3"/>`;
    for (let k = 0; k < 9; k++) { const jx = 150 + k * 75;
      jars += k % 2 ? `<path d="M${jx + 14},${y - 70} L${jx + 22},${y - 70} L${jx + 22},${y - 44} C${jx + 40},${y - 34} ${jx + 40},${y - 4} ${jx + 18},${y - 2} C${jx - 4},${y - 4} ${jx - 4},${y - 34} ${jx + 14},${y - 44}Z" fill="rgba(170,215,200,.6)" stroke="${INK}" stroke-width="3"/>` : `<rect x="${jx}" y="${y - 60}" width="40" height="58" rx="8" fill="${["#b8643a", "#c9a467", "#8a5a35"][k % 3]}" stroke="${INK}" stroke-width="3"/><rect x="${jx - 2}" y="${y - 66}" width="44" height="10" rx="3" fill="#6b4a24" stroke="${INK}" stroke-width="2"/>`; } }
  const tools = `<g transform="translate(1000,560)"><rect x="0" y="0" width="420" height="24" fill="#a0703c" stroke="${INK}" stroke-width="4"/><rect x="20" y="24" width="20" height="116" fill="#7a5030" stroke="${INK}" stroke-width="3"/><rect x="380" y="24" width="20" height="116" fill="#7a5030" stroke="${INK}" stroke-width="3"/><rect x="30" y="-8" width="300" height="10" fill="#efe6d2" stroke="${INK}" stroke-width="2"/>
    <path d="M50,-14 L120,-14" stroke="#c9a24a" stroke-width="6" stroke-linecap="round"/><path d="M120,-14 L146,-18" stroke="#c9ced6" stroke-width="5" stroke-linecap="round"/><path d="M160,-14 L250,-14" stroke="#c9a24a" stroke-width="4" stroke-linecap="round"/><circle cx="252" cy="-14" r="5" fill="#c9a24a"/>
    <path d="M270,-12 L320,-22 M270,-12 L320,-6" stroke="#c9a24a" stroke-width="5" stroke-linecap="round"/><path d="M340,-8 C340,-50 400,-50 400,-8Z" fill="#c9a24a" stroke="${INK}" stroke-width="4"/></g>`;
  const bench = `<g transform="translate(1700,600)"><rect x="0" y="0" width="520" height="30" fill="#8a6232" stroke="${INK}" stroke-width="5"/><rect x="30" y="30" width="26" height="70" fill="#6b4a24" stroke="${INK}" stroke-width="4"/><rect x="464" y="30" width="26" height="70" fill="#6b4a24" stroke="${INK}" stroke-width="4"/><rect x="20" y="-20" width="200" height="20" rx="6" fill="#efe6d2" stroke="${INK}" stroke-width="3"/><circle cx="440" cy="-24" r="20" fill="#c9a467" stroke="${INK}" stroke-width="4"/><path d="M434,-44 l12,0 l0,-10 l-12,0Z" fill="#6b4a24"/></g>`;
  const rope = `<path d="M1100,200 Q1370,250 1640,200" stroke="#8a6232" stroke-width="4" fill="none"/>${[0, 1, 2, 3, 4].map((k) => `<rect id="${S.id}-vd${k}" x="${1150 + k * 100}" y="${r3(212 + Math.sin((k + 0.5) / 5 * Math.PI) * 18)}" width="40" height="${110 + (k % 2) * 40}" fill="#efe6d2" stroke="${INK}" stroke-width="3"/>`).join("")}`;
  const win = `<rect x="${w - 760}" y="120" width="220" height="130" fill="#fff0c0" stroke="${INK}" stroke-width="6"/>${[1, 2].map((k) => `<rect x="${w - 760 + k * 73 - 4}" y="120" width="8" height="130" fill="#6b4a24"/>`).join("")}`;
  const door = `<rect x="${w - 380}" y="260" width="260" height="440" fill="#2a1d14" stroke="${INK}" stroke-width="6"/><g id="${S.id}-cur"><path d="M${w - 380},264 L${w - 120},264 L${w - 130},700 L${w - 250},700 C${w - 260},500 ${w - 300},400 ${w - 380},380Z" fill="#7a3b2e" stroke="${INK}" stroke-width="4"/></g>`;
  const bucket = `<g transform="translate(1555,900)"><path d="M8,-100 L102,-100 L92,0 L18,0Z" fill="#8a6232" stroke="${INK}" stroke-width="5"/><path d="M12,-70 L98,-70 M15,-36 L95,-36" stroke="#5b5f66" stroke-width="5"/><ellipse cx="55" cy="-98" rx="46" ry="9" fill="#7fb6d6" stroke="${INK}" stroke-width="3"/></g><circle id="${S.id}-drip" cx="1610" cy="330" r="6" fill="#7fb6d6" stroke="${INK}" stroke-width="2"/>`;
  const mortar = `<g transform="translate(860,900)"><path d="M0,-60 L90,-60 C86,-10 70,0 45,0 C20,0 4,-10 0,-60Z" fill="#bfae94" stroke="${INK}" stroke-width="4"/><path d="M60,-60 L96,-120" stroke="#8f7f68" stroke-width="14" stroke-linecap="round"/></g>`;
  let slabs = ""; for (let px = 0; px < w; px += 200) slabs += `<rect x="${px}" y="${900 + ((px / 200) % 2) * 6}" width="198" height="110" fill="${(px / 200) % 2 ? "#a59a8a" : "#9a8f80"}" stroke="${INK}" stroke-width="3"/>`;
  S.add(`<svg class="prop" style="left:${x0}px;top:${G - 900}px;z-index:1" width="${w}" height="1210">
    <rect y="0" width="${w}" height="900" fill="#cdb894"/>${blocks}<rect y="0" width="${w}" height="40" fill="#8a6a4a"/>
    ${jars}${rope}${win}${door}${tools}${bench}${mortar}<rect y="900" width="${w}" height="310" fill="#9a8f80"/>${slabs}${bucket}</svg>`);
  S.add(`<div class="prop" style="left:${x0 + w - 1300}px;top:${G - 780}px;width:800px;height:780px;z-index:2;background:linear-gradient(200deg,rgba(255,240,190,.45),rgba(255,240,190,0) 85%);clip-path:polygon(70% 0,98% 0,55% 100%,0 100%)"></div>`);
  S.tw(`tl.fromTo("#${S.id}-cur",{skewX:0},{immediateRender:false,skewX:-3,transformOrigin:"50% 0%",duration:1.4,yoyo:true,repeat:${REP(S, 1.4)},ease:"sine.inOut"},0);`);
  S.tw(`tl.fromTo("#${S.id}-drip",{y:0,opacity:1},{y:470,opacity:0.6,duration:0.7,repeat:${REP(S, 1.6)},repeatDelay:0.9,ease:"power2.in"},0.4);`);
  for (let k = 0; k < 5; k++) S.tw(`tl.fromTo("#${S.id}-vd${k}",{rotation:-2},{immediateRender:false,rotation:2,transformOrigin:"50% 0%",duration:${r3(1.2 + k * 0.15)},yoyo:true,repeat:${REP(S, 1.2)},ease:"sine.inOut"},0);`);
}

// Inserto de Pompeya: Vesubio humeando y el cuartel de columnas (rojas abajo) medio enterrado en ceniza, con cepo, casco y grafiti
export function pompeii(S, x, w = 3200) {
  const R = rng(81), x0 = x - w / 2; let cols = "";
  S.add(`<svg class="prop" style="left:${x0}px;top:${G - 1250}px;z-index:0" width="${w}" height="700"><path d="M${w * 0.12},700 L${w * 0.38},250 L${w * 0.44},300 L${w * 0.5},230 L${w * 0.78},700Z" fill="#6f6660" stroke="${INK}" stroke-width="6"/><path d="M${w * 0.38},250 L${w * 0.44},300 L${w * 0.5},230 L${w * 0.56},340 L${w * 0.33},340Z" fill="#5a524d"/></svg>`);
  smoke(S, `${S.id}-ves`, x0 + w * 0.44, G - 1000, { n: 8, color: "rgba(70,64,60,.6)", size: 200, rise: 700, z: 0 });
  for (let i = 0; i < Math.floor(w / 300); i++) { const cx = i * 300 + 80;
    cols += `<rect x="${cx}" y="100" width="56" height="600" fill="#e6d9be" stroke="${INK}" stroke-width="5"/><rect x="${cx}" y="430" width="56" height="270" fill="#a8452f" stroke="${INK}" stroke-width="5"/><rect x="${cx - 12}" y="76" width="80" height="28" fill="#d8cfbf" stroke="${INK}" stroke-width="4"/>`; }
  let top = "M0,520"; for (let ax = 0; ax < w; ax += 160) top += ` Q${ax + 80},${r3(470 + R() * 70)} ${ax + 160},${r3(500 + R() * 40)}`;
  const props = `<g transform="translate(${w * 0.3},560)"><rect x="0" y="0" width="360" height="20" rx="6" fill="#5b5f66" stroke="${INK}" stroke-width="4"/>${[0, 1, 2, 3].map((k) => `<ellipse cx="${40 + k * 90}" cy="-6" rx="22" ry="26" fill="none" stroke="#5b5f66" stroke-width="9"/>`).join("")}</g>
    <g transform="translate(${w * 0.62},540)"><path d="M0,40 C-4,-30 120,-36 116,40Z" fill="#b08a36" stroke="${INK}" stroke-width="5"/><path d="M-14,40 L130,40" stroke="#8f6a2a" stroke-width="10"/><path d="M20,-6 C40,-40 90,-40 104,-10" stroke="#b5532f" stroke-width="10" fill="none"/></g>
    <g transform="translate(${w * 0.8},600) rotate(-70)"><path d="M38,8 L72,8 L68,30 C104,50 108,130 74,168 L36,168 C2,130 6,50 42,30Z" fill="#b8643a" stroke="${INK}" stroke-width="5"/></g>
    <g stroke="#5a4a3c" stroke-width="3" fill="none" transform="translate(986,330)"><circle cx="20" cy="0" r="8"/><path d="M20,8 L20,40 L10,64 M20,40 L30,64 M20,18 L4,30 M20,18 L40,6"/></g>`;
  S.add(`<svg class="prop" style="left:${x0}px;top:${G - 700}px;z-index:1" width="${w}" height="1010">
    <rect y="40" width="${w}" height="660" fill="#7a6e66"/><rect y="0" width="${w}" height="44" fill="#8a6a5a" stroke="${INK}" stroke-width="5"/>${tilesRow(w, 40, "#8a6a5a")}<rect y="44" width="${w}" height="32" fill="#d8cfbf" stroke="${INK}" stroke-width="4"/>
    ${cols}<path d="${top} L${w},1010 L0,1010Z" fill="#9a928a" stroke="${INK}" stroke-width="5"/>${props}</svg>`);
}

// Vía Apia en sepia: calzada en perspectiva, tumbas y pinos, miliario y niebla (sin cruces: solo postes lejanos borrosos)
export function appia(S, x, w = 4000) {
  const x0 = x - w / 2, hz = 360, vx = w / 2; let road = "", side = "", posts = "";
  road += `<path d="M${vx - 24},${hz} L${vx + 24},${hz} L${w * 0.86},1010 L${w * 0.14},1010Z" fill="#8a7a64" stroke="${INK}" stroke-width="5"/>`;
  for (let k = 1; k < 14; k++) { const t = (k / 14) ** 2, y = hz + t * (1010 - hz), hw = 24 + t * (w * 0.36 - 24); road += `<path d="M${r3(vx - hw)},${r3(y)} L${r3(vx + hw)},${r3(y)}" stroke="#5e5242" stroke-width="${r3(1 + t * 4)}"/>`; }
  for (let k = 0; k < 8; k++) { const t = ((k + 1) / 9) ** 2, y = hz + t * (1010 - hz), s = 0.12 + t * 1.1, off = 60 + t * w * 0.44;
    for (const sg of [-1, 1]) { const tx = vx + sg * off;
      side += (k + (sg > 0 ? 1 : 0)) % 2
        ? `<path d="M${r3(tx - 70 * s)},${r3(y)} L${r3(tx - 70 * s)},${r3(y - 110 * s)} A${r3(70 * s)},${r3(46 * s)} 0 0 1 ${r3(tx + 70 * s)},${r3(y - 110 * s)} L${r3(tx + 70 * s)},${r3(y)}Z" fill="#cbb89a" stroke="${INK}" stroke-width="${r3(2 + 3 * s)}"/>`
        : `<path d="M${r3(tx)},${r3(y)} L${r3(tx)},${r3(y - 200 * s)}" stroke="#5a4a38" stroke-width="${r3(3 + 8 * s)}"/><ellipse cx="${r3(tx)}" cy="${r3(y - 220 * s)}" rx="${r3(130 * s)}" ry="${r3(46 * s)}" fill="#5f6a44" stroke="${INK}" stroke-width="${r3(2 + 3 * s)}"/>`;
    } }
  for (let k = 0; k < 12; k++) { const sg = k % 2 ? 1 : -1, t = 0.01 + (k >> 1) * 0.01, px = vx + sg * (40 + t * w * 0.44), y = hz + t * (1010 - hz); posts += `<path d="M${r3(px)},${r3(y)} L${r3(px)},${r3(y - 30)}" stroke="#6a5e50" stroke-width="2" opacity=".35"/>`; }
  S.add(`<svg class="prop" style="left:${x0}px;top:${G - 700}px;z-index:1" width="${w}" height="1010">
    <path d="M0,${hz} C${w * 0.2},${hz - 60} ${w * 0.4},${hz - 20} ${w / 2},${hz} C${w * 0.7},${hz - 40} ${w * 0.85},${hz - 70} ${w},${hz} L${w},1010 L0,1010Z" fill="#a89a74"/>
    ${posts}${road}${side}
    <g transform="translate(${w * 0.3},700)"><rect x="-26" y="-130" width="52" height="130" rx="20" fill="#cbbfa8" stroke="${INK}" stroke-width="5"/><text x="0" y="-70" text-anchor="middle" font-family="Cinzel" font-weight="700" font-size="22" fill="#6a5e50">M·P</text><text x="0" y="-44" text-anchor="middle" font-family="Cinzel" font-weight="700" font-size="22" fill="#6a5e50">XII</text></g></svg>`);
  let mist = ""; for (let k = 0; k < 3; k++) mist += `<div id="${S.id}-mist${k}" class="prop" style="left:${x0 - 600}px;top:${G - 420 + k * 60}px;width:${w + 1200}px;height:140px;z-index:2;background:linear-gradient(90deg,rgba(240,232,215,0),rgba(240,232,215,.55) 30%,rgba(240,232,215,.35) 70%,rgba(240,232,215,0))"></div>`;
  S.add(mist);
  for (let k = 0; k < 3; k++) S.tw(`tl.fromTo("#${S.id}-mist${k}",{x:${-200 + k * 120}},{x:${200 - k * 80},duration:${r3(DUR(S))},ease:"sine.inOut"},0);`);
}

// Telón de fondo a franjas para presentar los tipos de gladiador (frases 51-54)
export function drape(S, x, w = 3400) {
  let st = ""; for (let k = 0; k < w; k += 150) st += `<path d="M${k},60 L${k + 150},60 L${k + 150},780 L${k},780Z" fill="${(k / 150) % 2 ? "#c8743a" : "#efe3c8"}"/><path d="M${k + 75},70 C${k + 60},300 ${k + 90},500 ${k + 75},770" stroke="rgba(0,0,0,.12)" stroke-width="8" fill="none"/>`;
  S.add(`<svg id="${S.id}-drape" class="prop" style="left:${x - w / 2}px;top:${G - 780}px;z-index:1" width="${w}" height="790">
    <rect x="0" y="30" width="${w}" height="34" fill="#8a6232" stroke="${INK}" stroke-width="5"/>${st}<path d="M0,780 L${w},780" stroke="${INK}" stroke-width="5"/>${[...Array(Math.ceil(w / 600))].map((_, k) => `<path d="M${k * 600 + 300},0 L${k * 600 + 300},34" stroke="#8a6232" stroke-width="6"/>`).join("")}</svg>`);
  S.tw(`tl.fromTo("#${S.id}-drape",{skewX:0},{immediateRender:false,skewX:0.8,transformOrigin:"50% 0%",duration:1.6,yoyo:true,repeat:${REP(S, 1.6)},ease:"sine.inOut"},0);`);
}

// Museo de Éfeso «un siglo después»: excavación con losas, dos estelas en griego y la vitrina con el cráneo de los tres agujeros
export function ephesus(S, x, w = 3000) {
  const x0 = x - w / 2, GR = "GFS Didot";
  const stele = (sx, name) => `<g transform="translate(${sx},180)"><path d="M0,520 L0,60 L110,0 L220,60 L220,520Z" fill="#cfd6dc" stroke="${INK}" stroke-width="5"/><rect x="30" y="100" width="160" height="200" fill="#b9c3cc" stroke="${INK}" stroke-width="3"/><path d="M110,140 l0,90 M110,170 l-40,30 M110,170 l40,-24 M110,230 l-24,60 M110,230 l24,60" stroke="#8e9aa6" stroke-width="10" stroke-linecap="round"/><circle cx="110" cy="128" r="16" fill="#8e9aa6"/><text x="110" y="360" text-anchor="middle" font-family="${GR}" font-weight="700" font-size="30" fill="#6f7c88">${name}</text><text x="110" y="404" text-anchor="middle" font-family="${GR}" font-size="28" fill="#6f7c88">ΧΑΙΡΕ</text></g>`;
  const vit = `<g transform="translate(${w / 2 - 260},200)"><rect x="0" y="300" width="520" height="200" fill="#5a6672" stroke="${INK}" stroke-width="5"/><rect x="10" y="20" width="500" height="280" fill="rgba(200,225,240,.25)" stroke="${INK}" stroke-width="5"/><path d="M40,40 L120,280 M380,40 L460,200" stroke="#fff" stroke-width="6" opacity=".35"/>
    <path d="M180,270 C150,250 150,140 260,120 C370,140 370,250 340,270 L320,270 L316,296 L204,296 L200,270Z" fill="#e8e0cc" stroke="${INK}" stroke-width="5"/>
    <ellipse cx="225" cy="210" rx="26" ry="22" fill="#3a3530"/><ellipse cx="295" cy="210" rx="26" ry="22" fill="#3a3530"/><path d="M260,236 L250,258 L270,258Z" fill="#3a3530"/>
    ${[0, 1, 2].map((k) => `<circle id="${S.id}-hole${k}" cx="${232 + k * 28}" cy="${152 + k * 4}" r="7" fill="#3a3530"/>`).join("")}
    <rect x="160" y="320" width="200" height="40" fill="#efe9df" stroke="${INK}" stroke-width="2"/><text x="260" y="347" text-anchor="middle" font-family="Inter" font-weight="700" font-size="20" fill="#3a3530">ÉFESO · s. II-III</text></g>`;
  let dig = `<rect x="80" y="760" width="900" height="200" fill="#8a7a64" stroke="${INK}" stroke-width="4"/>`;
  for (let k = 0; k < 3; k++) dig += `<rect x="${120 + k * 290}" y="790" width="250" height="120" fill="#b8a88a" stroke="${INK}" stroke-width="4"/><path d="M${120 + k * 290},850 L${370 + k * 290},850" stroke="#8f7f68" stroke-width="3"/>`;
  dig += `<path d="M80,780 L980,780 M380,760 L380,960 M680,760 L680,960" stroke="#efe9df" stroke-width="2"/>`;
  S.add(`<svg class="prop" style="left:${x0}px;top:${G - 760}px;z-index:1" width="${w}" height="1070">
    <defs><radialGradient id="${S.id}-spot" cx="50%" cy="0%" r="80%"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>
    <rect width="${w}" height="760" fill="#8e9db0"/><rect x="${w / 2 - 400}" y="0" width="800" height="760" fill="url(#${S.id}-spot)"/>
    ${[200, 560, w - 760, w - 400].map((sx) => `<path d="M${sx + 110},0 L${sx + 110},30" stroke="#3a3530" stroke-width="6"/><path d="M${sx + 80},30 L${sx + 140},30 L${sx + 130},60 L${sx + 90},60Z" fill="#3a3530"/>`).join("")}
    ${stele(w - 760, "ΜΥΡΜΙΛΛΩΝ")}${stele(w - 400, "ΡΗΤΙΑΡΙΟΣ")}${vit}
    <rect y="760" width="${w}" height="310" fill="#6f7c88"/>${dig}</svg>`);
}
export function holesGlow(S, t) { for (let k = 0; k < 3; k++) S.tw(`tl.to("#${S.id}-hole${k}",{fill:"#ffd36b",duration:0.2},${r3(t + k * 0.18)});`); }

// Villa de Espículo (regalo de Nerón): peristilo, granados, setos, estatua y fuente
export function villa(S, x, w = 3200) {
  const R = rng(161), x0 = x - w / 2; let tiles = "", cols = "", garden = "";
  for (let tx = 200; tx < w - 200; tx += 40) tiles += `<path d="M${tx},140 q20,-24 40,0" fill="${RC.tile}" stroke="${INK}" stroke-width="3"/>`;
  for (let i = 0; i < 9; i++) { const cx = 260 + i * (w - 560) / 8; cols += `<rect x="${r3(cx)}" y="300" width="44" height="400" fill="${RC.marble}" stroke="${INK}" stroke-width="4"/><rect x="${r3(cx - 10)}" y="284" width="64" height="20" fill="${RC.marble2}" stroke="${INK}" stroke-width="3"/>`; }
  for (let k = 0; k < 6; k++) { const gx = 300 + k * (w - 600) / 5;
    garden += k % 2 ? `<rect x="${r3(gx - 70)}" y="620" width="140" height="80" rx="20" fill="#4f6b3a" stroke="${INK}" stroke-width="4"/>` : `<path d="M${r3(gx)},700 L${r3(gx)},560" stroke="#6b4a24" stroke-width="12"/><circle cx="${r3(gx)}" cy="520" r="70" fill="#5f8a4a" stroke="${INK}" stroke-width="4"/>${[0, 1, 2, 3].map((q) => `<circle cx="${r3(gx - 40 + q * 26)}" cy="${500 + (q % 2) * 30}" r="9" fill="#b3261e" stroke="${INK}" stroke-width="2"/>`).join("")}`; }
  const fount = `<g transform="translate(${w / 2},700)"><ellipse cx="0" cy="-20" rx="220" ry="34" fill="#9fc6dc" stroke="${INK}" stroke-width="5"/><rect x="-14" y="-140" width="28" height="120" fill="${RC.marble2}" stroke="${INK}" stroke-width="4"/><path id="${S.id}-vjet" d="M0,-150 C-30,-200 -70,-150 -90,-40 M0,-150 C30,-200 70,-150 90,-40" stroke="#9fc6dc" stroke-width="7" fill="none" stroke-dasharray="14 8"/></g>`;
  const statue = `<g transform="translate(${w - 420},700)"><rect x="-50" y="-40" width="100" height="40" fill="${RC.marble2}" stroke="${INK}" stroke-width="4"/><path d="M-20,-40 L-24,-160 L-36,-190 L-14,-210 L-10,-240 C-10,-270 14,-270 14,-240 L18,-210 L36,-190 L24,-160 L20,-40Z" fill="${RC.marble}" stroke="${INK}" stroke-width="4"/></g>`;
  S.add(`<svg class="prop" style="left:${x0}px;top:${G - 700}px;z-index:1" width="${w}" height="1010">
    <rect x="200" y="140" width="${w - 400}" height="560" fill="#e3c9a4" stroke="${INK}" stroke-width="6"/><rect x="200" y="100" width="${w - 400}" height="44" fill="${RC.tile}" stroke="${INK}" stroke-width="5"/>${tiles}
    <rect x="200" y="300" width="${w - 400}" height="400" fill="#b8402a" opacity=".35"/>${cols}${garden}${fount}${statue}
    <rect y="700" width="${w}" height="310" fill="#7a9a5a"/>${[...Array(40)].map((_, k) => `<path d="M${r3(k * 80 + R() * 40)},${r3(740 + R() * 200)} l8,-20 l8,20" stroke="#4f6b3a" stroke-width="4" fill="none"/>`).join("")}</svg>`);
  S.tw(`tl.fromTo("#${S.id}-vjet",{strokeDashoffset:0},{strokeDashoffset:-44,duration:0.4,repeat:${REP(S, 0.4)},ease:"none"},0);`);
}

// Relieve de Halicarnaso: losa con AMAZON y ACHILLIA (en griego) y el mar detrás. Delante, dos actores «lapis»
export function relief(S, x, w = 2000) {
  const x0 = x - w / 2, GR = "GFS Didot";
  S.add(`<svg class="prop" style="left:${x0}px;top:${G - 760}px;z-index:1" width="${w}" height="1070">
    <rect y="0" width="${w}" height="420" fill="#9cc3d6"/>${[0, 1, 2, 3].map((k) => `<path id="${S.id}-wv${k}" d="M0,${300 + k * 30} ${[...Array(Math.ceil(w / 80) + 2)].map(() => "q20,-10 40,0 q20,10 40,0").join(" ")}" stroke="#e8f2f6" stroke-width="4" fill="none" opacity=".7"/>`).join("")}
    <path d="M0,280 C200,200 400,240 600,270 L600,300 L0,300Z" fill="#a8b89a"/>
    <rect x="${w * 0.1}" y="40" width="${w * 0.8}" height="720" fill="#cbbfa8" stroke="${INK}" stroke-width="7"/><rect x="${w * 0.1 + 40}" y="140" width="${w * 0.8 - 80}" height="580" fill="#b9ac92" stroke="#8f8470" stroke-width="5"/>
    <text x="${w / 2}" y="110" text-anchor="middle" font-family="${GR}" font-weight="700" font-size="46" fill="#7d725e">ΑΠΕΛΥΘΗΣΑΝ</text>
    <text x="${w * 0.32}" y="200" text-anchor="middle" font-family="${GR}" font-weight="700" font-size="40" fill="#7d725e">ΑΜΑΖΩΝ</text><text x="${w * 0.68}" y="200" text-anchor="middle" font-family="${GR}" font-weight="700" font-size="40" fill="#7d725e">ΑΧΙΛΛΙΑ</text>
    <path d="M${w * 0.2},300 l40,60 l-20,40 M${w * 0.78},500 l-30,50" stroke="#8f8470" stroke-width="3" fill="none"/><rect y="760" width="${w}" height="310" fill="#bfae94"/></svg>`);
  for (let k = 0; k < 4; k++) S.tw(`tl.fromTo("#${S.id}-wv${k}",{x:0},{immediateRender:false,x:-80,duration:${2 + k * 0.4},repeat:${REP(S, 2)},ease:"none"},0);`);
}

// ===================== RECETAS POR CAPÍTULO =====================
const NIGHT = { far: "#2a3352", mid: "#3a3550", night: true, fg: false };
export const FONDO = {
  gancho(S, x = 0) {
    romanSky(S, "tarde"); stands(S, x, 7000, { seed: 5 }); sandGround(S, { top: "#e8c78a", bottom: "#c99a5a" });
    arenaGate(S, `${S.id}-gate`, x - 1600); banner(S, `${S.id}-bn1`, x - 2300); banner(S, `${S.id}-bn2`, x + 2100, G, { color: RC.terra });
    atrezo(S, `${S.id}-az`, x + 1000, ["rake", "amphora", "helmetPost", "shieldLean", "chain", "woodSwords"]);
    sunRays(S); motes(S); foreground2(S, ["gateBar", "bannerFg", "rake"]);
  },
  intro(S, x = 0) {
    romanSky(S, "manana"); romeSkyline(S, { far: "#b4c4dc", mid: "#d8b896", fg: false }); slaveMarket(S, x, 3800);
    cart(S, `${S.id}-cart`, x - 1700); smoke(S, `${S.id}-sm`, x + 1500, G - 820);
    atrezo(S, `${S.id}-az`, x + 1250, ["basket", "amphora", "chain", "bench", "bucket", "tabletStand"]);
    foreground2(S, ["plant", "amphora", "wheel"]);
  },
  intro_galo(S, x = 0) {
    romanSky(S, "tarde"); stands(S, x, 6000, { seed: 9 }); sandGround(S);
    atrezo(S, `${S.id}-az`, x + 900, ["gallicShield", "rake", "amphora", "chain", "helmetPost", "bucket"]); tint(S, "sepia"); foreground2(S, ["gateBar"]);
  },
  s1_llegada(S, x = 0) {
    romanSky(S, "atardecer"); nightSky(S, "nueva", { day: true }); romeSkyline(S, { far: "#9a8ab8", mid: "#b08a8a", fg: false });
    gate(S, `${S.id}-gate`, x, { label: "LVDVS" }); cart(S, `${S.id}-cart`, x - 1400); sandGround(S, { top: "#b89a72", bottom: "#8a7258" });
    atrezo(S, `${S.id}-az`, x + 1200, ["amphora", "chain", "bucket", "basket", "bench", "plant"]); foreground2(S, ["torchfg", "amphora"]); vignette(S, 0.35);
  },
  s1_juramento(S, x = 0) {
    nightSky(S, "nueva"); romeSkyline(S, NIGHT); ludus(S, x, 3400); sandGround(S, { top: "#7a6650", bottom: "#5e4c3a" }); tint(S, "noche");
    brazier(S, `${S.id}-br`, x + 300); smoke(S, `${S.id}-bs`, x + 300, G - 360, { color: "rgba(90,80,80,.4)", size: 50, rise: 260 });
    torch(S, `${S.id}-t1`, x - 700, G - 100); torch(S, `${S.id}-t2`, x + 1100, G - 100);
    atrezo(S, `${S.id}-az`, x - 1200, ["tabletStand", "amphora", "chain", "bench", "woodSwords", "helmetPost"]); foreground2(S, ["torchfg", "amphora"]); vignette(S, 0.6);
  },
  s1_pasillo(S, x = 0) { // tunnel() como pasillo de la escuela (NO es el hipogeo)
    tunnel(S, x, 3000); sandGround(S, { top: "#6e5a44", bottom: "#4a3a2c" });
    atrezo(S, `${S.id}-az`, x + 600, ["chain", "bucket", "bench", "woodSwords", "amphora", "rack"]); foreground2(S, ["torchfg", "gateBar"]); vignette(S, 0.55);
  },
  s1_patio_noche(S, x = 0) {
    nightSky(S, "nueva"); romeSkyline(S, NIGHT); ludus(S, x, 3400); cellDoors(S, x, 3400); sandGround(S, { top: "#7a6650", bottom: "#5e4c3a" }); tint(S, "noche");
    torch(S, `${S.id}-t1`, x - 900, G - 100); torch(S, `${S.id}-t2`, x + 900, G - 100); post(S, `${S.id}-palus`, x + 200);
    atrezo(S, `${S.id}-az`, x - 300, ["bucket", "bench", "chain", "amphora", "woodSwords", "wickerLean"]); shade(S, 0.75); foreground2(S, ["torchfg", "amphora"]); vignette(S, 0.6);
  },
  s1_cuarto(S, x = 0) { cell(S, x, 2600); foreground2(S, ["bedEdge", "amphora"]); vignette(S, 0.7); },
  s1_pompeya(S, x = 0) { ashSky(S); pompeii(S, x, 3200); tint(S, "ceniza"); foreground2(S, ["column", "amphora"], { blur: 4 }); },
  s1_espartaco(S, x = 0) {
    romanSky(S, "dia"); romeSkyline(S, { far: "#c9b48e", mid: "#d8b48e", fg: false }); gate(S, `${S.id}-gate`, x, { label: "LVDVS · CAPVAE" }); sandGround(S);
    atrezo(S, `${S.id}-az`, x + 1100, ["amphora", "basket", "bench", "chain", "woodSwords", "bucket"]); tint(S, "sepia"); foreground2(S, ["plant", "amphora"]);
  },
  s1_apia(S, x = 0) { romanSky(S, "tarde"); appia(S, x, 4000); tint(S, "sepia"); foreground2(S, ["plant", "column"], { blur: 4 }); },
  s1_comida(S, x = 0) {
    romanSky(S, "atardecer"); romeSkyline(S, { far: "#9a8ab8", mid: "#c09a88", fg: false }); ludus(S, x, 3400); sandGround(S, { top: "#d6b07c", bottom: "#b08a5a" });
    atrezo(S, `${S.id}-az`, x + 300, ["basket", "bench", "amphora", "bucket", "barley", "tabletStand"]); torch(S, `${S.id}-t1`, x - 900, G - 100);
    foreground2(S, ["barley", "amphora"]);
  },
  s1_palus(S, x = 0) {
    romanSky(S, "atardecer"); romeSkyline(S, { far: "#9a8ab8", mid: "#c09a88", fg: false }); ludus(S, x, 3400); post(S, `${S.id}-palus`, x + 200);
    sandGround(S, { top: "#d9b07a", bottom: "#b08a5a" }); atrezo(S, `${S.id}-az`, x - 900, ["rack", "woodSwords", "wickerLean", "bucket", "aryballos", "bench"]);
    sunRays(S, { color: "255,190,120", k: 0.28 }); motes(S); foreground2(S, ["vine", "amphora"]);
  },
  s2_patio(S, x = 0) {
    romanSky(S, "mediodia"); nightSky(S, "creciente", { day: true }); romeSkyline(S, { far: "#a9c0dc", mid: "#d9be9a", fg: false }); ludus(S, x, 3600);
    post(S, `${S.id}-p1`, x - 300); post(S, `${S.id}-p2`, x + 500); sandGround(S, { top: "#f0d9a0", bottom: "#d9b878" });
    atrezo(S, `${S.id}-az`, x + 1400, ["rack", "bucket", "basket", "wickerLean", "bench", "aryballos"]); motes(S, { color: "rgba(255,240,200,.6)" }); foreground2(S, ["vine", "amphora", "bucket"]);
  },
  s2_tipos(S, x = 0) {
    romanSky(S, "mediodia"); drape(S, x, 3400); sandGround(S, { top: "#f0d9a0", bottom: "#d9b878" });
    atrezo(S, `${S.id}-az`, x + 1300, ["rack", "helmetPost", "shieldLean", "woodSwords", "bench", "bucket"]); foreground2(S, ["vine", "bannerFg"]);
  },
  s2_enfermeria(S, x = 0) { infirmary(S, x, 2800); motes(S, { color: "rgba(255,240,190,.75)", n: 50 }); foreground2(S, ["curtain", "amphora"]); vignette(S, 0.35); },
  s2_efeso(S, x = 0) { ephesus(S, x, 3000); tint(S, "despues"); foreground2(S, ["column"], { blur: 5 }); vignette(S, 0.3); },
  s2_galeno(S, x = 0) { infirmary(S, x, 2800); bust(S, `${S.id}-ma`, x + 600, G, { beard: true, curls: true }); tint(S, "despues"); vignette(S, 0.35); },
  s3_calle(S, x = 0) { romanSky(S, "manana"); romeSkyline(S, { fg: false }); street(S, x, 3600); smoke(S, `${S.id}-sm`, x - 1200, G - 820); foreground2(S, ["plant", "amphora", "column"]); },
  s3_pompeya(S, x = 0) {
    romanSky(S, "manana"); romeSkyline(S, { fg: false }); wall(S, x, 2600);
    dipinto(S, `${S.id}-dp`, x - 500, G - 880, ["CRVCIARII · VENATIO", "ET · VELA · ERVNT"], { bg: "#f4efe2", w: 760 });
    atrezo(S, `${S.id}-az`, x + 300, ["amphora", "paintPot", "ladder", "basket", "plant", "bucket"]); foreground2(S, ["plant", "column"]);
  },
  s3_coliseo(S, x = 0) {
    romanSky(S, "manana"); romeSkyline(S, { fg: false }); colosseum(S, x, G, 2600, 1300); sandGround(S, { top: "#cdb48e", bottom: "#a8906a" });
    atrezo(S, `${S.id}-az`, x + 1700, ["amphora", "basket", "bench", "plant", "tabletStand", "bucket"]); foreground2(S, ["plant", "column"]);
  },
  s3_banquete(S, x = 0) {
    nightSky(S, "llena", { g: ["#0b1230", "#1e2a55", "#3a2a48"] }); romeSkyline(S, NIGHT); banquet(S, x, 3600);
    foreground2(S, ["curtain", "torchfg", "amphora"]); vignette(S, 0.55);
  },
  s3_pompa(S, x = 0) {
    romanSky(S, "manana"); stands(S, x, 7000, { seed: 6 }); sandGround(S, { top: "#ecd29a", bottom: "#cfa86a" });
    hydraulis(S, `${S.id}-org`, x + 900); lectica(S, `${S.id}-lec`, x - 600); banner(S, `${S.id}-bn1`, x - 1800); banner(S, `${S.id}-bn2`, x + 1800, G, { color: RC.terra });
    atrezo(S, `${S.id}-az`, x + 2400, ["helmetPost", "shieldLean", "rake", "amphora", "palmJar", "chain"]); motes(S); foreground2(S, ["bannerFg", "gateBar"]);
  },
  s3_fieras(S, x = 0) {
    romanSky(S, "manana"); stands(S, x, 7000, { seed: 8 }); sandGround(S); arenaGate(S, `${S.id}-gate`, x, { w: 760 });
    atrezo(S, `${S.id}-az`, x + 1400, ["rake", "bucket", "chain", "amphora", "bench", "basket"]); motes(S); foreground2(S, ["gateBar"]);
  },
  s3_mediodia(S, x = 0) { romanSky(S, "mediodia"); stands(S, x, 7000, { seed: 4 }); sandGround(S, { top: "#f4e6c0", bottom: "#d9c08a" }); atrezo(S, `${S.id}-az`, x + 1200, ["rake", "bucket", "chain", "amphora", "bench", "woodSwords"]); shade(S, 0.6); foreground2(S, ["gateBar"]); },
  s3_combate(S, x = 0) {
    romanSky(S, "tarde"); stands(S, x, 7000, { seed: 7 }); sandGround(S, { top: "#e8b878", bottom: "#c08a50" }); arenaGate(S, `${S.id}-gate`, x - 1500);
    atrezo(S, `${S.id}-az`, x + 1500, ["rake", "palmJar", "bucket", "helmetPost", "chain", "amphora"]);
    sunRays(S, { color: "255,170,90", k: 0.3 }); motes(S, { color: "rgba(255,200,140,.7)" }); foreground2(S, ["gateBar", "bannerFg"]);
  },
  s4_mercado(S, x = 0) { romanSky(S, "manana"); romeSkyline(S, { far: "#b8c8de", fg: false }); souvenirShop(S, x, 3000); foreground2(S, ["glassRow", "palmJar", "column"]); },
  s4_grafiti(S, x = 0) {
    romanSky(S, "manana"); romeSkyline(S, { fg: false }); wall(S, x, 2600);
    dipinto(S, `${S.id}-dp`, x - 300, G - 860, ["CELADVS · THR", "SVSPIRIVM · PVELLARVM"], { color: "#3a2c22", weight: 400, size: 40, rot: -3, w: 900 });
    atrezo(S, `${S.id}-az`, x + 700, ["amphora", "plant", "basket", "bench", "bucket", "palmJar"]); foreground2(S, ["plant"]);
  },
  s4_palestra(S, x = 0) {
    romanSky(S, "manana"); romeSkyline(S, { fg: false }); ludus(S, x, 3400); sandGround(S, { top: "#e6cf9e", bottom: "#c9ad78" });
    atrezo(S, `${S.id}-az`, x + 900, ["aryballos", "bench", "bucket", "amphora", "basket", "plant"]); foreground2(S, ["column", "plant"]);
  },
  s4_villa(S, x = 0) { romanSky(S, "dia"); romeSkyline(S, { fg: false }); villa(S, x, 3200); tint(S, "sepia"); foreground2(S, ["plant", "column"]); },
  s4_halicarnaso(S, x = 0) { romanSky(S, "dia"); relief(S, x, 2000); atrezo(S, `${S.id}-az`, x + 1300, ["amphora", "plant", "basket", "bench", "palmJar", "bucket"]); foreground2(S, ["column", "plant"]); },
  s4_prisco(S, x = 0) {
    romanSky(S, "tarde"); stands(S, x, 7000, { seed: 11 }); sandGround(S, { top: "#f0c27a", bottom: "#c8904a" });
    atrezo(S, `${S.id}-az`, x + 1300, ["palmJar", "palmJar", "rake", "bucket", "helmetPost", "shieldLean"]);
    sunRays(S, { color: "255,200,110", k: 0.34 }); motes(S); foreground2(S, ["bannerFg", "gateBar"]);
  },
  s4_noche(S, x = 0) {
    nightSky(S, "menguante"); romeSkyline(S, NIGHT); ludus(S, x, 3400); post(S, `${S.id}-palus`, x + 200); sandGround(S, { top: "#6e6458", bottom: "#4e463e" }); tint(S, "noche");
    torch(S, `${S.id}-t1`, x - 800, G - 100); torch(S, `${S.id}-t2`, x + 1000, G - 100);
    atrezo(S, `${S.id}-az`, x - 1200, ["woodSwords", "wickerLean", "bucket", "bench", "rack", "amphora"]); foreground2(S, ["torchfg", "vine"]); vignette(S, 0.6);
  },
  balance(S, x = 0) {
    romanSky(S, "malva"); romeSkyline(S, { far: "#8a7aa8", mid: "#b98a7a", fg: false }); colosseum(S, x - 600, G, 2600, 1300); bigScale(S, `${S.id}-bal`, x + 1100);
    sandGround(S, { top: "#e0a878", bottom: "#b07a58" }); atrezo(S, `${S.id}-az`, x + 2100, ["helmetPost", "shieldLean", "basket", "chain", "palmJar", "woodSwords"]);
    sunRays(S, { color: "255,170,130", from: "left", k: 0.26 }); motes(S); foreground2(S, ["barley", "helmetPost"]);
  },
  cierre(S, x = 0) {
    nightSky(S, "fina", { g: ["#070b19", "#142048", "#2a3a6a"] }); emptyStands(S, x, 7000, { seed: 5 }); sandGround(S, { top: "#8a7a64", bottom: "#5e5242" });
    arenaGate(S, `${S.id}-gate`, x - 1500); atrezo(S, `${S.id}-az`, x + 1200, ["rake", "helmetPost", "woodSwords", "amphora", "chain", "bucket"]);
    tint(S, "noche"); foreground2(S, ["gateBar", "torchfg", "bannerFg"]); vignette(S, 0.6);
  },
};

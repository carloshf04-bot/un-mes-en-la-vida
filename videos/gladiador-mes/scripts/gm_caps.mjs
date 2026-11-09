// «Un mes en la vida de un gladiador» (Roma, año 80): 8 capítulos, 137 frases.
// Cada aparición va pegada a su palabra: W(frase, "palabra", n). Cada capítulo empieza con enter(), pasa por
// varios escenarios de 5 capas (gl_fondos2.mjs) con cut() (goSpot + whoosh) y acaba con una vista general y exit().
import { C, r3, icon, camTo, shake, pose, talk, shiver, burst, GEAR, POSE, galea, prop } from "./lib.mjs";
import { enter, exit } from "./fondos.mjs";
import { G, RC, romanSky, romeSkyline, sandGround, ludus, post, stands, roar, colosseum, wall, torch } from "./gl_fondos.mjs";
import { FONDO, slaveMarket, gate, appia, infirmary, ephesus, relief, villa, nightSky, moonTo, gateOpen, cartRoll, paintOn, gateRumble, tilt, holesGlow, shadeTo, atrezo, foreground2, sunRays, motes, vignette, tint, banner, arenaGate, bust, cart, smoke, shade, dipinto, horse, essedum } from "./gl_fondos2.mjs";
import { spotBox, zone, goSpot, pop, drop, fadeUp, flipIn, flipOut, wobble, pulse, mark, label, slam, counter, bar, animal, animalWalk, animalIdle, arrow, people, phone, bubble } from "./lib2.mjs";
import { esc, on, cut, move, fin, who, go, gearOn, gearOff, appear, vanish, hidden, strike, Z, tx, c1, cards, all, gone, box, sprinkle, outro, gearCard, HOY, semana, num } from "./gm_lib.mjs";

const SEPIA = "sepia(.75) saturate(.8) contrast(1.05)";
const ctx = (S) => ({ F: S.fmt.F, h: S.fmt.h, L: (i) => S.line(i), W: (l, w, n = 1) => S.W(l, w, n), end: S.t1 - S.t0 });
const FX = { T: ["loin"], H: ["galhair", "mustache"] }; // Félix en la escuela
const FXCAP = { T: ["titulus"], H: ["galhair", "mustache"] }; // Félix cautivo
const ARMAS = { T: ["loin"], H: ["galhair", "mustache", "helmet"], F: ["shield"], B: ["sword", "manica"] };
const RET = { T: ["loin", "galerus"], F: ["trident"], B: ["net"] };

// Techo de madera para los interiores (cuarto, enfermería): vigas, cuerdas y un farol, para que arriba no quede un plano liso
function ceiling(P, x, w = 2800, y0 = G - 900) {
  let beams = "";
  for (let k = 0; k < w; k += 320) beams += `<rect x="${k}" y="0" width="70" height="700" fill="#3a2a1e" stroke="${C.ink}" stroke-width="5"/><path d="M${k + 70},640 L${k + 140},700" stroke="#2a1d14" stroke-width="16"/>`;
  P.add(`<svg class="prop" style="left:${x - w / 2}px;top:${y0 - 700}px;z-index:1" width="${w}" height="710"><rect width="${w}" height="700" fill="#2a2018"/>${[...Array(12)].map((_, k) => `<rect x="0" y="${k * 58}" width="${w}" height="54" fill="${k % 2 ? "#33261c" : "#2d2219"}"/>`).join("")}${beams}<rect y="640" width="${w}" height="60" fill="#4a3424" stroke="${C.ink}" stroke-width="5"/></svg>`);
}

// ======================= 1 · GANCHO (1-4) =======================
function romaColina(P, x) {
  romanSky(P, "tarde"); romeSkyline(P, { far: "#b7a3c0", mid: "#d6a888", fg: false }); colosseum(P, x + 700, G, 1900, 950);
  sandGround(P, { top: "#c9b07a", bottom: "#a88f5a" }); atrezo(P, `${P.id}-az`, x - 1500, ["amphora", "basket", "plant", "bench", "palmJar", "bucket"], { gap: 40 });
  banner(P, `${P.id}-b1`, x - 2000); smoke(P, `${P.id}-sm`, x - 1800, G - 900);
  sunRays(P, { color: "255,190,120", k: 0.24 }); motes(P); foreground2(P, ["plant", "column", "amphora"]);
}
export function gancho(S) {
  const { F, h, L, W, end } = ctx(S);
  const A = 3000, B = 6400, zA = Z(S, A), zB = Z(S, B);
  const ar = esc(S, "arena", FONDO.gancho, A);
  esc(S, "roma", romaColina, B);
  on(S, "arena", 0);
  enter(S, spotBox(S, A, 0.85));
  // 1 · luchar ante 50.000
  const T = who(S, "g0fx", "felix", zA.L - F(500, 300), { g: { T: ["loin"], H: ["galhair", "mustache", "helmet"], F: ["shield"], B: ["wood"] }, off: ["wood"], seed: 1 });
  go(S, T, 0.1, W(1, "luchar") + 0.3, zA.L);
  pose(S, T, W(1, "luchar") + 0.35, { mouth: "open", brows: 4, head: -6 }, 0.25);
  camTo(S, W(1, "cincuenta") - 0.1, spotBox(S, A, 1.12), { dur: 0.9, ease: "power3.out" });
  box(S, "g0bg", zA.cx, F(G - 580, G - 1030), F(900, 820), F(330, 300), "", W(1, "cincuenta") - 0.3, { bg: "rgba(36,22,13,.78)", z: 8 });
  counter(S, "g0n", zA.cx, F(G - 640, G - 1090), { from: 0, to: 50000, t: W(1, "cincuenta") - 0.2, dur: 0.9, size: F(230, 190), w: F(1300, 1000) });
  S.tw(`tl.fromTo("#g0n",{opacity:0,scale:2.2,filter:"blur(10px)"},{opacity:1,scale:1,filter:"blur(0px)",duration:0.3,ease:"power4.in"},${r3(W(1, "cincuenta") - 0.25)});`);
  shake(S, W(1, "cincuenta"), 16, 0.4); roar(ar, W(1, "cincuenta"), 3);
  tx(S, "g0p", zA.cx, F(G - 470, G - 920), "PERSONAS", W(1, "personas"), { color: RC.gold, fx: "up" });
  c1(S, "g0l", zA.cx, F(G - 250, G - 700), "lock", "SIN ELEGIR", W(1, "negarte"), { size: F(220, 210), bg: "#e8d6c0", mk: false });
  pose(S, T, W(1, "negarte"), { mouth: "sad", brows: 6, head: 6 }, 0.25);
  shake(S, W(1, "negarte") + 0.1, 10, 0.25);
  // 2 · un mes, una espada de madera y un entrenador que no sonríe
  gone(S, "#g0bg,#g0n,#g0p,#g0l,#g0lm", L(2).start - 0.25);
  const D = who(S, "g0dr", "doctor", zA.R + F(500, 400), { g: { H: ["scarFace"] }, flip: true, seed: 2 });
  go(S, D, W(2, "entrenador") - 0.7, W(2, "entrenador") + 0.2, zA.R);
  pose(S, D, W(2, "entrenador") + 0.25, { ...POSE.brazosCruzados, mouth: "sad", brows: 6 }, 0.3);
  cards(S, "g2c", A, zA.top, [["calendar-blank", "UN MES", W(2, "mes")], ["g:wood", "MADERA", W(2, "espada")], ["smiley-angry", "SIN SONRISA", W(2, "sonreír"), false]], { size: F(210, 200), cols: F(3, 2) });
  gearOn(S, T, "wood", W(2, "espada"));
  pose(S, T, W(2, "espada") + 0.1, { armB: -60, foreB: -30, mouth: "neutral", brows: 0 }, 0.3);
  // 3 · Roma, año 80
  gone(S, all("g2c", 3, true), L(3).start - 0.25);
  cut(S, L(3).start - 0.4, "roma", { dur: 1.0 });
  const T3 = who(S, "g3fx", "felix", zB.L, { g: { T: ["loin"], H: ["galhair", "mustache", "helmet"], F: ["shield"], B: ["wood"] }, seed: 3 });
  pose(S, T3, W(3, "roma") , { head: -8, look: 4, mouth: "open" }, 0.3);
  tx(S, "g3r", zB.cx, F(G - 760, G - 1150), "ROMA", W(3, "roma"), { roman: true, size: F(150, 120), color: RC.marble });
  tx(S, "g3a", zB.cx, F(G - 600, G - 1000), "AÑO 80 d. C.", W(3, "ochenta"), { size: F(96, 84), color: RC.gold });
  // 4 · título
  gone(S, "#g3r,#g3a", L(4).start - 0.15);
  const ty = F(G - 700, G - 1110);
  S.add(`<div id="g4t" class="card" style="left:${zB.cx - F(780, 500)}px;top:${ty - F(190, 170)}px;width:${F(1560, 1000)}px;height:${F(380, 340)}px;background:${RC.marble};border-radius:30px;z-index:8;opacity:0;flex-direction:column">
    <div style="font:900 ${F(78, 60)}px Inter;color:${C.ink};margin-bottom:6px">UN MES EN LA VIDA DE UN</div>
    <div id="g4g" class="roman" style="font-size:${F(180, 128)}px;color:${RC.terra};line-height:1;text-shadow:0 6px 0 ${C.ink}">GLADIADOR</div></div>`);
  pop(S, "#g4t", W(4, "mes") - 0.15);
  S.tw(`tl.fromTo("#g4g",{scale:2.4,opacity:0,filter:"blur(10px)"},{scale:1,opacity:1,filter:"blur(0px)",duration:0.3,ease:"power4.in"},${r3(W(4, "gladiador") - 0.2)});`);
  shake(S, W(4, "gladiador") + 0.1, 18, 0.4);
  pose(S, T3, W(4, "gladiador"), { armB: -160, foreB: -10, mouth: "smile", brows: -4 }, 0.3);
  S.tw(`tl.to("#g4t",{y:${F(-170, -150)},scale:0.72,duration:0.4,ease:"power2.inOut"},${r3(W(4, "bueno") - 0.45)});`);
  cards(S, "g4c", zB.cx, F(G - 440, G - 820), [["thumbs-up", "LO BUENO", W(4, "bueno"), null, "#cfe8c6"], ["skull", "LO MALO", W(4, "malo"), null, "#f0c9c0"], ["film-slate", "CINE", W(4, "películas"), false]], { size: F(210, 190), cols: F(3, 2) });
  pose(S, T3, W(4, "malo"), { armB: -20, foreB: -20, mouth: "sad" }, 0.3);
  outro(S, 4, B);
}

// ======================= 2 · INTRO (5-16) =======================
function mercadoAncho(P, x) { // mercado de esclavos con dos estaciones (5 capas: cielo, colinas, pórtico, losas y primer plano)
  romanSky(P, "manana"); romeSkyline(P, { far: "#b4c4dc", mid: "#d8b896", fg: false }); slaveMarket(P, x, 6400);
  smoke(P, `${P.id}-sm`, x + 2400, G - 820); smoke(P, `${P.id}-sm2`, x - 2600, G - 860);
  atrezo(P, `${P.id}-az`, x + 2700, ["basket", "amphora", "bench", "bucket", "tabletStand"], { gap: 30 });
  atrezo(P, `${P.id}-az2`, x - 600, ["amphora", "basket", "chain"], { gap: 30 });
  foreground2(P, ["plant", "amphora", "wheel"]);
}
function fama(P, x) {
  romanSky(P, "dia"); romeSkyline(P, { far: "#aebfd8", mid: "#dcb898", fg: false }); wall(P, x, 3400);
  sandGround(P, { top: "#b8ad9c", bottom: "#9a8f80" });
  atrezo(P, `${P.id}-az`, x - 1250, ["amphora", "plant", "bench", "basket", "palmJar", "bucket"], { gap: 30, z: 3 });
  banner(P, `${P.id}-b1`, x + 1500, G, { color: RC.terra }); smoke(P, `${P.id}-sm`, x - 1500, G - 1050);
  sunRays(P, { color: "255,214,150", k: 0.2 }); motes(P); foreground2(P, ["plant", "amphora", "column"]);
}
export function intro(S) {
  const { F, h, L, W, end } = ctx(S);
  const A = 3000, A2 = 5600, Bx = 9400, Cx = 12800;
  const zA = Z(S, A), zA2 = Z(S, A2), zB = Z(S, Bx), zC = Z(S, Cx);
  esc(S, "mercado", mercadoAncho, 4300);
  const gal = esc(S, "galo", (P, x) => { romanSky(P, "tarde"); stands(P, x, 6000, { seed: 9 }); sandGround(P);
    atrezo(P, `${P.id}-az`, x + 300, ["gallicShield", "rake", "amphora", "chain", "helmetPost", "bucket"], { gap: 50 }); motes(P); foreground2(P, ["amphora", "rake"]); }, Bx, { filter: SEPIA });
  esc(S, "fama", fama, Cx);
  on(S, "mercado", 0);
  enter(S, spotBox(S, A));
  // 5 · Félix = afortunado
  const T = who(S, "i5fx", "felixcap", zA.L, { g: { T: ["titulus"], H: ["galhair", "mustache"], F: ["shackle"] }, seed: 5 });
  box(S, "i5p", zA.cx, zA.cy - F(60, 40), F(980, 900), F(470, 440), `<div class="roman" style="font-size:${F(150, 130)}px;color:${C.ink};line-height:1">FÉLIX</div>
    <div id="i5p2" style="display:flex;align-items:center;gap:18px;font:900 ${F(64, 60)}px Inter;color:${C.greenD};opacity:0">${icon("clover", { size: 86, color: C.green })}= AFORTUNADO</div>`, W(5, "félix") - 0.15, { fx: "slam" });
  fadeUp(S, "#i5p2", W(5, "afortunado") - 0.1);
  pose(S, T, W(5, "félix"), { armF: -40, foreF: -60, mouth: "smile" }, 0.3);
  tx(S, "i5v", zA.cx, zA.cy + F(290, 270), "¿SERÁ VERDAD?", W(5, "verdad") - 0.1, { color: "#ffd38a", size: F(76, 68), fx: "up" });
  pose(S, T, W(5, "verdad"), { brows: -8, head: 8, mouth: "neutral", look: 4 }, 0.25);
  // 6 · galo y esclavo, vendido a una escuela
  gone(S, "#i5p,#i5v", L(6).start - 0.2);
  cards(S, "i6c", zA.cx, zA.cy - F(40, 20), [["map-trifold", "GALO", W(6, "galo")], ["link", "ESCLAVO", W(6, "esclavo")], ["hand-coins", "VENDIDO", W(6, "vendido")], ["sword", "ESCUELA", W(6, "escuela")]], { cols: 2, size: F(230, 220) });
  pose(S, T, W(6, "vendido"), { mouth: "sad", brows: 5, head: 6 }, 0.3);
  // 7 · sorpresa 1: no todos eran esclavos
  gone(S, all("i6c", 4), L(7).start - 0.25);
  move(S, L(7).start - 0.3, A2);
  go(S, T, L(7).start - 0.3, L(7).start + 0.6, zA2.L, { run: true });
  tx(S, "i7s", zA2.cx, zA2.cy - F(220, 230), "SORPRESA 1", W(7, "sorpresa"), { roman: true, color: RC.gold, size: F(110, 92) });
  const pp = people(S, "i7pp", zA2.cx, zA2.cy + F(40, 40), 6, 3, W(7, "esclavos"), { size: F(130, 110), hit: "#8a8f96" });
  pp.show(W(7, "todos")); pp.hit();
  tx(S, "i7t", zA2.cx, zA2.cy + F(230, 220), "NO TODOS ERAN ESCLAVOS", W(7, "esclavos") + 0.1, { size: F(72, 64), fx: "up" });
  // 8 · hombres libres que se vendían (por pobreza)
  gone(S, "#i7s,#i7pp,#i7t", L(8).start - 0.2);
  const Li = who(S, "i8li", "pictor", zA2.x + F(80, 30), { g: {}, seed: 8, scale: 1.3 });
  hidden(S, Li); appear(S, Li, W(8, "libres") - 0.3);
  const La = who(S, "i8la", "lanista", zA2.R + F(40, 20), { g: { H: ["scarFace"], F: ["purse"] }, off: ["purse"], flip: true, seed: 9 });
  hidden(S, La); appear(S, La, W(8, "escuela") - 0.2);
  cards(S, "i8c", zA2.x, zA2.top, [["person-simple-walk", "LIBRES", W(8, "libres"), null, "#cfe8c6"], ["hourglass", "UN TIEMPO", W(8, "tiempo")], ["coins", "DINERO", W(8, "dinero")]], { size: F(210, 190), cols: F(3, 2) });
  gearOn(S, La, "purse", W(8, "dinero"));
  pose(S, La, W(8, "dinero"), { armF: -70, foreF: -50, mouth: "smile" }, 0.3);
  burst(S, "i8b", zA2.R - F(120, 80), G - 420, W(8, "dinero") + 0.1, { n: 10, color: RC.gold, spread: 140, up: 160, size: 18, seed: 8 });
  tx(S, "i8p", zA2.x, zA2.top + F(200, 380), "PORQUE ERAN POBRES", W(8, "pobres") - 0.1, { size: F(70, 62), color: "#ffd38a", fx: "up" });
  pose(S, Li, W(8, "pobres"), { mouth: "sad", brows: 5, head: 6 }, 0.3);
  // 9 · Félix no eligió: lo trajeron encadenado
  gone(S, all("i8c", 3) + ",#i8p", L(9).start - 0.2);
  vanish(S, Li, L(9).start - 0.1); vanish(S, La, L(9).start - 0.1);
  S.tw(`tl.to("#i5fx-head",{rotation:-9,svgOrigin:"4 -310",duration:0.14,yoyo:true,repeat:5,ease:"sine.inOut"},${r3(W(9, "eligió"))});`);
  mark(S, "i9x", zA2.L, G - F(780, 760), 170, W(9, "nada"), false);
  tx(S, "i9e", zA2.cx, zA2.cy, "ENCADENADO", W(9, "encadenado"), { roman: true, size: F(110, 92), color: "#c9ced6" });
  atrezo(S, "i9ch", zA2.L + 40, ["chain"], { z: 7, scale: 1.3 });
  S.tw(`tl.fromTo("#i9ch-0",{opacity:0,y:-200},{opacity:1,y:0,duration:0.4,ease:"bounce.out"},${r3(W(9, "encadenado"))});`);
  shake(S, W(9, "encadenado") + 0.2, 12, 0.3);
  pose(S, T, W(9, "encadenado"), { armF: -30, foreF: -90, armB: 20, foreB: -90, mouth: "sad", head: 8 }, 0.3);
  // 10 · sorpresa 2: galo, pero no luchará como galo
  gone(S, "#i9x,#i9e,#i9ch-0", L(10).start - 0.2);
  cut(S, L(10).start - 0.4, "galo");
  const T2 = who(S, "i10fx", "felixcap", zB.L, { g: { H: ["galhair", "mustache"], F: ["scutumGal"] }, off: ["scutumGal"], seed: 10 });
  tx(S, "i10s", zB.cx, zB.cy - F(230, 240), "SORPRESA 2", W(10, "segunda"), { roman: true, color: RC.gold, size: F(110, 92) });
  gearOn(S, T2, "scutumGal", W(10, "galo"));
  pose(S, T2, W(10, "galo"), { mouth: "smile", brows: -3 }, 0.3);
  mark(S, "i10x", zB.L + F(40, 40), G - 330, F(260, 240), W(10, "como"), false);
  pose(S, T2, W(10, "como") + 0.2, { mouth: "sad", brows: 6, head: 6 }, 0.3);
  tx(S, "i10n", zB.cx, zB.cy + F(40, 0), "NO LUCHARÁ<br>COMO UN GALO", W(10, "luchar"), { size: F(80, 70), fx: "up" });
  // 11 · el antiguo «galo», enemigo de Roma
  gone(S, "#i10s,#i10x,#i10n", L(11).start - 0.2);
  gearOff(S, T2, "scutumGal", L(11).start - 0.2);
  const Ga = who(S, "i11ga", "gallus", zB.R + F(500, 400), { g: { H: ["mustache"], F: ["scutumGal"], B: ["sword"] }, flip: true, seed: 11 });
  go(S, Ga, W(11, "galo") - 0.8, W(11, "galo") + 0.1, zB.R);
  tx(S, "i11g", zB.x + F(100, 0), zB.top, "EL «GALO»", W(11, "galo"), { roman: true, size: F(100, 86), color: "#e8d6b5" });
  tx(S, "i11e", zB.x + F(100, 0), zB.top + F(150, 140), "ENEMIGO DE ROMA", W(11, "enemigo"), { size: F(80, 70), color: "#ff8a7a" });
  roar(gal, W(11, "enemigo"), 2);
  pose(S, Ga, W(11, "enemigo"), { armB: -150, foreB: -20, mouth: "open", brows: 6 }, 0.3);
  // 12 · la Galia ya es parte del imperio
  gone(S, "#i11g,#i11e", L(12).start - 0.2);
  c1(S, "i12m", zB.x + F(100, 0), zB.top + F(20, 0), "map-trifold", "GALIA", W(12, "galia"), { size: F(250, 230) });
  S.tw(`tl.to("#i12m",{backgroundColor:"${RC.purple}",color:"#fff",duration:0.4},${r3(W(12, "imperio"))});tl.to("#i12m .lbl",{color:"#fff",duration:0.3},${r3(W(12, "imperio"))});`);
  tx(S, "i12i", zB.x + F(100, 0), zB.top + F(190, 200), "= IMPERIO", W(12, "imperio"), { size: F(76, 68), color: "#e0b0e0", fx: "up" });
  pose(S, Ga, W(12, "feo"), { mouth: "sad", brows: 7, head: 10, armB: 0, foreB: 0 }, 0.3);
  S.tw(`tl.to("#i11ga-body",{scaleY:0.88,svgOrigin:"0 0",duration:0.4},${r3(W(12, "feo"))});`);
  // 13 · lo cambiaron por otro tipo: el de Félix
  gone(S, "#i12m,#i12i", L(13).start - 0.2);
  burst(S, "i13b", zB.R, G - 300, W(13, "cambiaron"), { n: 16, color: "#e8d6b5", spread: 200, up: 220, size: 20, seed: 13 });
  vanish(S, Ga, W(13, "cambiaron"), 0.25);
  label(S, "i13q", zB.R, G - 520, "?", { size: 300, color: RC.gold });
  pop(S, "#i13q", W(13, "cambiaron") + 0.1);
  S.tw(`tl.to("#i13q",{x:${r3(zB.L - zB.R)},y:-260,scale:0.6,duration:0.7,ease:"power2.inOut"},${r3(W(13, "félix") - 0.3)});`);
  tx(S, "i13t", zB.x + F(100, 0), zB.top, "OTRO TIPO", W(13, "tipo"), { size: F(86, 76), fx: "up" });
  pose(S, T2, W(13, "félix"), { look: -3, head: -10, mouth: "open" }, 0.3);
  // 14 · para la ley: al nivel de actores y prostitutas
  gone(S, "#i13q,#i13t", L(14).start - 0.2);
  cut(S, L(14).start - 0.4, "fama");
  const T3 = who(S, "i14fx", "felixcap", zC.L, { g: { H: ["galhair", "mustache"] }, seed: 14 });
  cards(S, "i14c", zC.x + F(120, 0), zC.top, [["gavel", "LEY", W(14, "ley")], ["mask-happy", "ACTORES", W(14, "actores")], ["lamp", "PROSTITUTAS", W(14, "prostitutas")]], { size: F(210, 190), cols: F(3, 2) });
  tx(S, "i14n", zC.cx, F(G - 600, G - 760), "EL ESCALÓN MÁS BAJO", W(14, "nivel"), { size: F(72, 62), color: "#ffb4a0", fx: "up" });
  pose(S, T3, W(14, "nivel"), { mouth: "sad", brows: 6, head: 6 }, 0.3);
  // 15 · pero el público los adora
  gone(S, all("i14c", 3) + ",#i14n", L(15).start - 0.2);
  const Fa = who(S, "i15fa", "fan", zC.R + F(450, 350), { g: { F: ["cloth"] }, flip: true, seed: 15 });
  go(S, Fa, L(15).start - 0.2, W(15, "adora"), zC.R);
  pose(S, Fa, W(15, "adora"), { armF: -150, foreF: -20, mouth: "smile", brows: -6 }, 0.3);
  S.tw(`tl.to("#i15fa-armF",{rotation:-120,svgOrigin:"30 -292",duration:0.18,yoyo:true,repeat:7},${r3(W(15, "adora") + 0.35)});`);
  sprinkle(S, "i15s", zC.L, G - F(700, 720), "star", W(15, "estrellas") - 0.1, { n: 5, r: F(240, 200) });
  tx(S, "i15e", zC.x + F(80, 0), zC.top, "ESTRELLAS", W(15, "estrellas"), { roman: true, size: F(120, 96), color: RC.gold });
  pose(S, T3, W(15, "adora"), { mouth: "smile", brows: -4, head: -4, armB: -150, foreB: -20 }, 0.3);
  // 16 · la paradoja
  gone(S, "#i15e," + all("i15s", 5), L(16).start - 0.2);
  vanish(S, Fa, L(16).start);
  tx(S, "i16p", zC.x + F(100, 0), zC.top - F(10, 0), "LA PARADOJA", W(16, "paradoja"), { roman: true, size: F(100, 84), color: RC.gold });
  const pa = F({ x: zC.x - 60, y: G - 560 }, { x: zC.x + 60, y: G - 1100 }), pb = F({ x: zC.x + 560, y: G - 560 }, { x: zC.x + 60, y: G - 800 });
  S.tw(`tl.to("#i16p",{y:${F(0, -200)},duration:0.01},${r3(W(16, "paradoja") - 0.2)});`);
  c1(S, "i16a", pa.x, pa.y, "thumbs-down", "NADIE QUIERE<br>SERLO", W(16, "nadie"), { size: F(220, 180), bg: "#f0c9c0" });
  c1(S, "i16b", pb.x, pb.y, "eye", "TODOS QUIEREN<br>VERLO", W(16, "todos"), { size: F(220, 180), bg: "#cfe8c6" });
  pose(S, T3, W(16, "verlo"), { mouth: "open", brows: -5, look: 4 }, 0.3);
  outro(S, 16, Cx);
}

// ======================= 3 · SEMANA 1 · LUNA NUEVA (17-46) =======================
function capua(P, x) { // inserto en sepia: la escuela de Capua (73 a. C.)
  romanSky(P, "dia"); romeSkyline(P, { far: "#c9b48e", mid: "#d8b48e", fg: false }); gate(P, `${P.id}-gate`, x + 350, { label: "LVDVS · CAPVAE" }); sandGround(P);
  atrezo(P, `${P.id}-az`, x - 1150, ["amphora", "basket", "bench", "chain", "woodSwords", "bucket"], { gap: 30 }); smoke(P, `${P.id}-sm`, x + 1500, G - 900);
  motes(P); foreground2(P, ["plant", "amphora"]);
}
function apia(P, x) { romanSky(P, "tarde"); appia(P, x, 4000); motes(P, { color: "rgba(240,230,210,.6)" }); foreground2(P, ["plant", "amphora"], { blur: 4 }); }
function cuarto(P, x) { ceiling(P, x, 2800); FONDO.s1_cuarto(P, x); }
export function semana1(S) {
  const { F, h, L, W, end } = ctx(S);
  const X = (i) => 3000 + (i % 6) * 3000;
  const ll = esc(S, "llegada", FONDO.s1_llegada, X(0));
  const ju = esc(S, "jura", FONDO.s1_juramento, X(1));
  esc(S, "pasillo", FONDO.s1_pasillo, X(2));
  esc(S, "cuarto", cuarto, X(3));
  const pm = esc(S, "pompeya", FONDO.s1_pompeya, X(4));
  const pn = esc(S, "patio", FONDO.s1_patio_noche, X(5));
  esc(S, "capua", capua, X(6), { filter: SEPIA });
  esc(S, "apia", apia, X(7), { filter: SEPIA });
  esc(S, "comida", FONDO.s1_comida, X(8));
  esc(S, "palus", FONDO.s1_palus, X(9));
  on(S, "llegada", 0);
  // 17 · Semana 1 · luna nueva
  const A = X(0), zA = Z(S, A);
  enter(S, spotBox(S, A));
  const s1b = semana(S, "s1m", A, F(G - 800, G - 1100), 0, "SEMANA 1", W(17, "semana"));
  tx(S, "s1ml", A, F(G - 570, G - 880), "LUNA NUEVA", W(17, "luna"), { size: F(76, 68), color: C.bone2, fx: "up" });
  // 18 · llega atado a otros prisioneros (carro-jaula; la puerta se abre)
  S.tw(`tl.to("${s1b},#s1ml",{y:-60,scale:0.7,opacity:0,duration:0.35,ease:"power2.in"},${r3(L(18).start - 0.2)});`);
  const cx0 = A - 1400, tL = W(18, "llega");
  const pr = [["felixcap", "s18fx", FXCAP], ["hunter2", "s18p1", {}], ["prisco", "s18p2", {}]].map(([k, id, g], i) =>
    who(S, id, k, cx0 - 160 + i * 150, { g, scale: 0.8, y: G - 160, z: 5, seed: 18 + i, shadow: false }));
  gateOpen(ll, `${ll.id}-gate`, tL - 0.3, 1.2);
  cartRoll(ll, `${ll.id}-cart`, tL - 0.6, tL + 1.6, 900);
  for (const a of pr) S.tw(`tl.to("#${a.id}",{x:"+=900",duration:2.2,ease:"none"},${r3(tL - 0.6)});`);
  for (const a of pr) shiver(S, a, tL - 0.6, tL + 1.6);
  c1(S, "s18c", zA.cx + F(60, 0), F(G - 760, G - 1080), "link", "ATADOS", W(18, "atado"), { size: F(230, 220) });
  // 19 · el lanista: antiguo gladiador que alquila a los suyos
  gone(S, "#s18c", L(19).start - 0.2);
  const La = who(S, "s19la", "lanista", A + F(520, 330), { g: { H: ["scarFace"], F: ["purse"] }, off: ["purse"], flip: true, seed: 19 });
  hidden(S, La); appear(S, La, W(19, "dueño") - 0.2);
  S.tw(`tl.fromTo("#s19la",{x:-260},{x:0,duration:0.8,ease:"power2.out"},${r3(W(19, "dueño") - 0.2)});`);
  tx(S, "s19l", A + F(300, 0), zA.top - F(40, 40), "LANISTA", W(19, "lanista"), { roman: true, size: F(110, 92), color: RC.gold });
  c1(S, "s19g", A + F(100, -200), zA.top + F(200, 220), "sword", "EXGLADIADOR", W(19, "gladiador"), { size: F(210, 190) });
  c1(S, "s19a", A + F(560, 250), zA.top + F(200, 220), "hand-coins", "ALQUILA", W(19, "alquilar"), { size: F(210, 190) });
  gearOn(S, La, "purse", W(19, "alquilar"));
  pose(S, La, W(19, "alquilar"), { armF: -80, foreF: -40, mouth: "smile", brows: -3 }, 0.3);
  // 20 · Félix no es una persona: es una inversión
  gone(S, "#s19l,#s19g,#s19a", L(20).start - 0.2);
  c1(S, "s20p", A + F(250, 0), zA.top + F(60, 60), "person", "PERSONA", W(20, "persona"), { size: F(250, 230) });
  mark(S, "s20x", A + F(250, 0), zA.top + F(60, 60), 200, W(20, "persona") + 0.35, false);
  S.tw(`tl.to("#s20p,#s20x",{rotationY:90,opacity:0,duration:0.2},${r3(W(20, "inversión") - 0.25)});`);
  c1(S, "s20i", A + F(250, 0), zA.top + F(60, 60), "coins", "INVERSIÓN", W(20, "inversión"), { size: F(250, 230), bg: RC.gold, fx: "flip" });
  S.tw(`tl.to("#s19la-foreF,#s19la-foreB",{rotation:-25,svgOrigin:"0 -228",duration:0.15,yoyo:true,repeat:5},${r3(W(20, "inversión") + 0.2)});`);
  // 21 · el juramento (sacramentum), de noche junto al brasero
  gone(S, "#s20i", L(21).start - 0.25);
  const B = X(1), zB = Z(S, B);
  cut(S, L(21).start - 0.45, "jura");
  const T = who(S, "s21fx", "felixcap", zB.L, { g: { H: ["galhair", "mustache"] }, seed: 21 });
  const La2 = who(S, "s21la", "lanista", zB.R + F(40, 60), { g: { H: ["scarFace"], F: ["scroll"] }, flip: true, seed: 22 });
  pose(S, T, W(21, "juramento"), { ...POSE.juramento, mouth: "open" }, 0.35);
  tx(S, "s21j", zB.x, zB.top, "JURAMENTO", W(21, "juramento"), { size: F(84, 74), fx: "up" });
  tx(S, "s21s", zB.x, zB.top + F(130, 120), "SACRAMENTUM", W(21, "sacramentum"), { roman: true, size: F(116, 90), color: RC.gold });
  talk(S, La2, W(21, "juramento"), W(21, "sacramentum"));
  // 22 · quemar, encadenar, golpear y matar a hierro
  gone(S, "#s21j,#s21s", L(22).start - 0.2);
  cards(S, "s22c", zB.x, zB.top + F(20, 30), [["fire", "QUEMAR", W(22, "quemar"), null, "#f6d3a8"], ["link", "ENCADENAR", W(22, "encadenar")], ["hand-fist", "GOLPEAR", W(22, "golpear")], ["sword", "HIERRO", W(22, "hierro"), null, "#e3c1bd"]], { size: F(200, 200), cols: F(4, 2), gap: F(24, 26) });
  for (const w of ["quemar", "encadenar", "golpear", "hierro"]) shiver(S, T, W(22, w), W(22, w) + 0.25);
  // 23 · Séneca: el contrato más deshonroso
  gone(S, all("s22c", 4), L(23).start - 0.2);
  bust(S, "s23b", zB.x - F(60, 0), G, { curls: false, w: F(240, 220), pedestal: F(260, 240) });
  S.tw(`tl.fromTo("#s23b",{y:-500,opacity:0},{y:0,opacity:1,duration:0.5,ease:"bounce.out"},${r3(W(23, "séneca") - 0.4)});`);
  tx(S, "s23s", zB.x - F(60, 0), zB.top - F(20, 20), "SÉNECA", W(23, "séneca"), { roman: true, size: F(96, 84), color: RC.marble });
  c1(S, "s23d", zB.x + F(380, 0), zB.top + F(150, 170), "seal-warning", "DESHONROSO", W(23, "deshonroso"), { size: F(200, 190), bg: "#f0c9c0", mk: false });
  pose(S, T, W(23, "palabras"), { armF: 0, foreF: 0, mouth: "sad", brows: 6 }, 0.3);
  // 24 · su cuerpo es de la escuela
  gone(S, "#s23s,#s23d,#s23dm", L(24).start - 0.2);
  S.tw(`tl.to("#s23b",{opacity:0,y:-80,duration:0.3},${r3(L(24).start - 0.2)});`);
  tx(S, "s24t", zB.x, zB.top, "PROPIEDAD DE<br>LA ESCUELA", W(24, "cuerpo"), { size: F(84, 74), color: "#ffb4a0" });
  S.add(`<div id="s24st" class="prop" style="left:${zB.L - 50}px;top:${G - 400}px;z-index:9;opacity:0;filter:drop-shadow(0 4px 0 ${C.ink})">${icon("seal", { size: 110, color: "#b3261e" })}</div>`);
  S.tw(`tl.fromTo("#s24st",{scale:2.6,opacity:0,rotation:-30},{scale:1,opacity:1,rotation:0,duration:0.3,ease:"power4.out"},${r3(W(24, "cuerpo") + 0.1)});`);
  S.cue(W(24, "cuerpo") + 0.1, "impact", 0.7);
  pose(S, T, W(24, "escuela"), { head: 8, mouth: "sad" }, 0.3);
  // 25 · pasillo de la escuela: a dormir
  gone(S, "#s24t,#s24st", L(25).start - 0.2);
  const Cx = X(2), zC = Z(S, Cx);
  cut(S, L(25).start - 0.45, "pasillo");
  const T25 = who(S, "s25fx", "felixcap", zC.L - F(200, 150), { g: { H: ["galhair", "mustache"] }, seed: 25 });
  const Gu = who(S, "s25gu", "custos", zC.L - F(560, 450), { g: { F: [prop("spear", "s25sp")], B: [prop("torch", "s25to")] }, seed: 26 });
  go(S, T25, L(25).start, W(25, "dormir") + 0.4, zC.x + F(250, 120));
  go(S, Gu, L(25).start + 0.2, W(25, "dormir") + 0.5, zC.x - F(150, 120));
  c1(S, "s25c", zC.x + F(300, 0), zC.top, "bed", "A DORMIR", W(25, "dormir"), { size: F(240, 220) });
  // 26 · cuarto diminuto, alrededor de un patio
  gone(S, "#s25c", L(26).start - 0.2);
  const D = X(3), zD = Z(S, D);
  cut(S, L(26).start - 0.45, "cuarto");
  const T26 = who(S, "s26fx", "felixcap", D - F(200, 120), { g: { H: ["galhair", "mustache"] }, seed: 27 });
  tx(S, "s26t", D + F(250, 0), zD.top - F(40, 180), "CUARTO DIMINUTO", W(26, "cuarto"), { size: F(84, 70) });
  pose(S, T26, W(26, "diminuto"), { armF: -60, foreF: -30, armB: -60, foreB: -30, mouth: "sad" }, 0.3);
  vanish(S, T26, W(27, "pompeya") - 0.3);
  const plan = `<div style="display:grid;grid-template-columns:repeat(5,${F(78, 66)}px);grid-template-rows:repeat(4,${F(58, 54)}px);gap:8px">${[...Array(20)].map((_, i) => { const r = Math.floor(i / 5), c = i % 5, inner = r > 0 && r < 3 && c > 0 && c < 4; return inner ? (r === 1 && c === 1 ? `<div style="grid-column:2/5;grid-row:2/4;background:#e3c48a;border:5px solid ${C.ink};border-radius:10px;display:flex;align-items:center;justify-content:center;font:900 ${F(46, 40)}px Inter;color:${C.ink}">PATIO</div>` : "") : `<div style="background:${i === 0 ? C.ochre : "#8a6232"};border:4px solid ${C.ink};border-radius:6px"></div>`; }).join("")}</div>`;
  box(S, "s26p", D + F(320, 0), zD.cy + F(80, 60), F(560, 500), F(380, 350), plan, W(26, "patio") - 0.2);
  // 27 · ¿cómo lo sabemos? Pompeya
  gone(S, "#s26t,#s26p", L(27).start - 0.2);
  const E = X(4), zE = Z(S, E);
  c1(S, "s27c", D + F(250, 0), zD.cy, "magnifying-glass", "¿CÓMO LO SABEMOS?", W(27, "sabemos") - 0.1, { size: F(240, 220) });
  gone(S, "#s27c", W(27, "pompeya") - 0.5);
  cut(S, W(27, "pompeya") - 0.55, "pompeya", { dur: 0.9 });
  tx(S, "s27p", E + F(200, 0), zE.top - F(40, 40), "POMPEYA", W(27, "pompeya") + 0.1, { roman: true, size: F(130, 104), color: "#efe9df" });
  tx(S, "s27a", E + F(200, 0), zE.top + F(110, 100), "AÑO 79", W(27, "pompeya") + 0.4, { size: F(76, 68), color: "#ffd38a", fx: "up" });
  // 28 · el Vesubio la sepultó, con su cuartel de gladiadores
  gone(S, "#s27p,#s27a", L(28).start - 0.15);
  camTo(S, W(28, "vesubio") - 0.4, spotBox(S, E, 1.25), { dur: 0.8 });
  tx(S, "s28v", E, F(G - 1150, G - 1500), "VESUBIO", W(28, "vesubio"), { roman: true, size: F(110, 96), color: "#ffb08a" });
  shake(S, W(28, "sepultó"), 12, 0.5);
  burst(S, "s28a", E, G - 900, W(28, "sepultó"), { n: 24, color: "#cfc8bc", spread: 900, up: 200, size: 22, seed: 28, dur: 1.4 });
  camTo(S, W(28, "cuartel") - 0.3, spotBox(S, E), { dur: 0.7 });
  tx(S, "s28c", E + F(200, 0), zE.top + F(40, 0), "CUARTEL DE<br>GLADIADORES", W(28, "cuartel"), { size: F(80, 70), color: "#efe9df", fx: "up" });
  S.tw(`tl.to("#s28v",{opacity:0,duration:0.3},${r3(W(28, "cuartel") - 0.3)});`);
  // 29 · arqueólogos: cuartos, grafitis y cepos
  gone(S, "#s28c", L(29).start - 0.2);
  const Ar = who(S, "s29ar", "moderno", zE.L, { g: { F: ["brush"] }, seed: 29 });
  hidden(S, Ar); appear(S, Ar, W(29, "arqueólogos") - 0.2);
  pose(S, Ar, W(29, "arqueólogos"), { body: 14, head: 10, armF: -40, foreF: -40 }, 0.4);
  S.tw(`tl.to("#s29ar-foreF",{rotation:-70,svgOrigin:"30 -228",duration:0.2,yoyo:true,repeat:15},${r3(W(29, "arqueólogos") + 0.4)});`);
  tx(S, "s29h", zE.L, G - F(800, 790), `${HOY}`, W(29, "arqueólogos"), { size: 110, fx: "pop" });
  cards(S, "s29c", zE.cx, zE.cy - F(20, 0), [["door", "CUARTOS", W(29, "cuartos")], ["pencil-simple", "GRAFITIS", W(29, "grafitis")], ["link", "CEPOS", W(29, "hierros")]], { size: F(220, 200), cols: F(3, 2) });
  // 30 · normas duras: vigilancia día y noche
  gone(S, all("s29c", 3) + ",#s29h", L(30).start - 0.2);
  const Fx = X(5), zF = Z(S, Fx);
  cut(S, L(30).start - 0.45, "patio");
  const T30 = who(S, "s30fx", "felixcap", zF.L, { g: { H: ["galhair", "mustache"] }, seed: 30 });
  const Gu2 = who(S, "s30gu", "custos", zF.R + F(60, 60), { g: { F: [prop("spear", "s30sp")], B: [prop("torch", "s30to")] }, flip: true, seed: 31 });
  c1(S, "s30n", zF.x, zF.top, "scroll", "NORMAS DURAS", W(30, "normas"), { size: F(220, 200) });
  pose(S, Gu2, W(30, "vigilan"), { armF: -20, foreF: -10, brows: 6, look: -4 }, 0.3);
  c1(S, "s30e", zF.x + F(380, 0), zF.top + F(30, 240), "eye", "", W(30, "vigilan"), { size: F(200, 180), bg: "#ffd36b" });
  c1(S, "s30d", zF.x - F(380, 0), zF.top + F(30, 240), "moon-stars", "DÍA Y NOCHE", W(30, "noche") - 0.2, { size: F(200, 180), bg: "#c8d0ea" });
  pose(S, T30, W(30, "vigilan"), { mouth: "sad", brows: 5, look: 4 }, 0.3);
  // 31 · escapar o morir (silueta y sombra, sin detalle)
  gone(S, "#s30n,#s30e,#s30d", L(31).start - 0.2);
  const Sh = who(S, "s31sh", "hunter2", zF.x - F(150, 0), { g: {}, seed: 32, shadow: false });
  S.tw(`tl.set("#s31sh",{filter:"brightness(0)",opacity:0},0);tl.to("#s31sh",{opacity:0.85,duration:0.2},${r3(W(31, "escapar") - 0.3)});`);
  go(S, Sh, W(31, "escapar") - 0.2, W(31, "escapar") + 0.8, zF.x + F(900, 700), { run: true });
  tx(S, "s31e", zF.x, zF.top, "ESCAPAR", W(31, "escapar"), { size: F(90, 80) });
  shadeTo(pn, W(31, "morir") - 0.05, 1, 0.2); shadeTo(pn, W(31, "morir") + 0.9, 0, 0.4);
  pose(S, T30, W(31, "morir"), { mouth: "sad", brows: 8, head: 10 }, 0.3);
  tx(S, "s31a", zF.x, zF.top + F(140, 130), "ANTES QUE LA ARENA", W(31, "arena") - 0.2, { size: F(70, 62), color: "#c8d0ea", fx: "up" });
  // 32 · Espartaco escapó de Capua (73 a. C.)
  gone(S, "#s31e,#s31a", L(32).start - 0.2);
  const Gx = X(6), zG = Z(S, Gx), cp = S.escs.capua.P;
  cut(S, L(32).start - 0.45, "capua");
  const Sp = who(S, "s32sp", "gallus", Gx + F(350, 330), { g: { B: ["sword"] }, seed: 33 });
  hidden(S, Sp);
  tx(S, "s32e", zG.x, zG.top - F(30, 40), "ESPARTACO", W(32, "espartaco"), { roman: true, size: F(120, 100), color: "#efe3c8" });
  tx(S, "s32d", zG.x, zG.top + F(110, 100), "73 a. C.", W(32, "antes"), { size: F(80, 72), color: "#ffd38a", fx: "up" });
  gateOpen(cp, `${cp.id}-gate`, W(32, "escapó") - 0.3, 0.8);
  appear(S, Sp, W(32, "escapó"));
  go(S, Sp, W(32, "escapó"), W(32, "escapó") + 1.1, zG.L, { run: true });
  pose(S, Sp, W(32, "capua"), { armB: -150, foreB: -20, mouth: "open", brows: 6 }, 0.3);
  gone(S, "#s32e,#s32d", W(32, "setenta") - 0.3);
  const n32 = num(S, "s32n", zG.cx + F(80, 0), zG.cy - F(140, 120), { from: 0, to: 70, t: W(32, "setenta") - 0.1, dur: 0.8, size: F(150, 130), suf: "<span style='font-size:.42em'> COMPAÑEROS</span>", w: F(1200, 1000), bw: F(900, 880) });
  cards(S, "s32c", zG.cx + F(80, 0), zG.cy + F(130, 160), [["knife", "CUCHILLOS", W(32, "cuchillos")], ["fire", "PINCHOS DE ASAR", W(32, "pinchos")]], { size: F(200, 190), cols: 2 });
  // 33 · guerra y seis mil ejecutados en la vía Apia (siluetas lejanas, sin detalle)
  gone(S, n32 + "," + all("s32c", 2), L(33).start - 0.2);
  const Hx = X(7), zH = Z(S, Hx);
  cut(S, L(33).start - 0.45, "apia");
  c1(S, "s33g", zH.x, zH.top, "sword", "GUERRA", W(33, "guerra"), { size: F(220, 200) });
  gone(S, "#s33g", W(33, "seis") - 0.3);
  const n33 = num(S, "s33n", zH.x, zH.top + F(10, 0), { from: 0, to: 6000, t: W(33, "seis") - 0.1, dur: 0.9, size: F(160, 140), w: F(1200, 1000), bw: 700 });
  tx(S, "s33r", zH.x, zH.top + F(150, 140), "REBELDES EJECUTADOS", W(33, "rebeldes"), { size: F(70, 62), fx: "up" });
  tx(S, "s33a", zH.x, zH.top + F(290, 280), "VÍA APIA", W(33, "apia"), { roman: true, size: F(110, 92), color: "#efe3c8" });
  camTo(S, L(33).start + 0.6, spotBox(S, Hx, 0.88), { dur: L(33).end - L(33).start, ease: "sine.inOut" });
  // 34 · la comida: primer dato raro
  gone(S, n33 + ",#s33r,#s33a", L(34).start - 0.2);
  const I = X(8), zI = Z(S, I);
  cut(S, L(34).start - 0.45, "comida");
  const T34 = who(S, "s34fx", "felix", zI.L, { g: { ...FX, F: ["bowl"] }, off: ["bowl"], seed: 34 });
  c1(S, "s34c", zI.cx, zI.cy - F(150, 120), "bowl-food", "LA COMIDA", W(34, "comida"), { size: F(240, 220) });
  gearOn(S, T34, "bowl", W(34, "comida"));
  pose(S, T34, W(34, "comida"), { armF: -60, foreF: -50, mouth: "smile" }, 0.3);
  tx(S, "s34r", zI.cx, zI.cy + F(150, 160), "DATO RARO", W(34, "raro"), { roman: true, size: F(110, 92), color: RC.gold });
  // 35 · no estaban secos y marcados como en el cine
  gone(S, "#s34c,#s34r", L(35).start - 0.2);
  c1(S, "s35a", zI.cx - F(220, 0), zI.cy - F(60, 140), "barbell", "SECOS Y MARCADOS", W(35, "secos"), { size: F(230, 210) });
  c1(S, "s35b", zI.cx + F(330, 0), zI.cy - F(60, -150), "film-slate", "CINE", W(35, "películas"), { size: F(200, 180), mk: false });
  mark(S, "s35x", zI.cx - F(220, 0), zI.cy - F(60, 140), 200, W(35, "marcados") + 0.1, false);
  // 36 · cebada y legumbres: los de la cebada
  gone(S, "#s35a,#s35b,#s35bm,#s35x", L(36).start - 0.2);
  for (let i = 0; i < 7; i++) {
    S.add(`<div id="s36g${i}" class="prop" style="left:${zI.L - 40 + (i - 3) * 40}px;top:${G - 760}px;z-index:9;opacity:0">${icon("grains", { size: 70, color: RC.gold })}</div>`);
    S.tw(`tl.fromTo("#s36g${i}",{opacity:0,y:-80},{opacity:1,y:330,duration:0.5,ease:"power2.in"},${r3(W(36, "cebada", 1) - 0.2 + i * 0.07)});tl.to("#s36g${i}",{opacity:0,duration:0.1},${r3(W(36, "cebada", 1) + 0.35 + i * 0.07)});`);
  }
  cards(S, "s36c", zI.cx, zI.cy - F(160, 150), [["grains", "CEBADA", W(36, "cebada", 1), null, "#f3e2b0"], ["leaf", "LEGUMBRES", W(36, "legumbres"), null, "#d6e8c0"]], { size: F(210, 200), cols: 2 });
  tx(S, "s36h", zI.cx, zI.cy + F(110, 120), "HORDEARII", W(36, "llamaban"), { roman: true, size: F(116, 96), color: RC.gold });
  tx(S, "s36h2", zI.cx, zI.cy + F(240, 240), "«LOS DE LA CEBADA»", W(36, "cebada", 2), { size: F(64, 60), fx: "up" });
  pose(S, T34, W(36, "comían"), { armB: -110, foreB: -110, mouth: "open" }, 0.25);
  S.tw(`tl.to("#s34fx-armB",{rotation:-140,svgOrigin:"-30 -292",duration:0.2,yoyo:true,repeat:5},${r3(W(36, "comían") + 0.3)});`);
  // 37 · una capa de grasa sobre el músculo
  gone(S, all("s36c", 2) + ",#s36h,#s36h2", L(37).start - 0.2);
  pose(S, T34, L(37).start, { armB: 0, foreB: 0, armF: 0, foreF: 0, mouth: "neutral" }, 0.3);
  S.tw(`tl.to("#s34fx-torso",{scaleX:1.2,svgOrigin:"0 -200",duration:0.5,ease:"elastic.out(1,0.5)"},${r3(W(37, "grasa"))});`);
  arrow(S, "s37a", zI.cx - F(100, -60), zI.cy + F(60, 140), zI.L + 50, G - 330, W(37, "grasa") - 0.1, { dur: 0.4, bend: 0.2 });
  tx(S, "s37g", zI.cx + F(60, 120), zI.cy - F(10, -60), "GRASA", W(37, "grasa"), { size: F(96, 84), color: "#ffe08a" });
  tx(S, "s37m", zI.cx + F(60, 120), zI.cy + F(110, 180), "SOBRE EL MÚSCULO", W(37, "músculo") - 0.1, { size: F(66, 60), fx: "up" });
  // 38 · una bebida de polvo de plantas quemadas, para los huesos
  gone(S, "#s37a,#s37g,#s37m", L(38).start - 0.2);
  cards(S, "s38c", zI.cx, zI.cy - F(60, 30), [["bone", "HUESOS", W(38, "huesos")], ["fire", "PLANTAS QUEMADAS", W(38, "polvo"), null, "#d8d4ce"]], { size: F(220, 200), cols: F(2, 1) });
  burst(S, "s38b", zI.L + 60, G - 420, W(38, "quemadas"), { n: 14, color: "#8a8f96", spread: 160, up: 180, size: 16, seed: 38 });
  // 39 · un estudio moderno de huesos apunta a lo mismo
  gone(S, all("s38c", 2), L(39).start - 0.2);
  c1(S, "s39c", zI.cx, zI.cy - F(60, 30), "test-tube", "ESTUDIO MODERNO", W(39, "estudio"), { size: F(240, 220) });
  mark(S, "s39m", zI.cx + F(220, 200), zI.cy - F(150, 120), 170, W(39, "mismo") - 0.1, true);
  // 40 · Félix la prueba: sabe a hoguera apagada
  gone(S, "#s39c,#s39m", L(40).start - 0.2);
  pose(S, T34, W(40, "prueba"), { armF: -130, foreF: -100, head: -10, mouth: "open" }, 0.35);
  pose(S, T34, W(40, "hoguera"), { armF: -20, foreF: -20, head: 8, mouth: "sad", brows: 8 }, 0.25);
  shiver(S, T34, W(40, "hoguera"), W(40, "apagada") + 0.6);
  burst(S, "s40s", zI.L, G - F(860, 860), W(40, "hoguera"), { n: 12, color: "#8a8f96", spread: 120, up: 200, size: 22, seed: 40, dur: 1.2 });
  tx(S, "s40t", zI.cx, zI.cy, "¡PUAJ!", W(40, "apagada"), { size: F(150, 130), color: "#c9d6a0" });
  // 41 · el primer entrenamiento (palus al atardecer)
  gone(S, "#s40t", L(41).start - 0.2);
  const J = X(9), zJ = Z(S, J);
  cut(S, L(41).start - 0.45, "palus");
  const T41 = who(S, "s41fx", "felix", J - F(380, 220), { g: { ...FX, F: ["wicker"], B: ["wood"] }, off: ["wicker", "wood"], seed: 41 });
  const Dr = who(S, "s41dr", "doctor", J + F(780, 420), { g: { H: ["scarFace"] }, flip: true, seed: 42 });
  pose(S, Dr, 0, { ...POSE.brazosCruzados, mouth: "sad", brows: 6 }, 0.01);
  tx(S, "s41e", J - F(100, 0), zJ.top - F(40, 40), "PRIMER<br>ENTRENAMIENTO", W(41, "entrenamiento"), { roman: true, size: F(100, 84), color: RC.gold });
  // 42 · espada de madera y escudo de mimbre
  gone(S, "#s41e", L(42).start - 0.2);
  gearOn(S, T41, "wood", W(42, "espada")); gearOn(S, T41, "wicker", W(42, "mimbre"));
  cards(S, "s42c", J - F(100, 0), zJ.top, [["g:wood", "ESPADA DE MADERA", W(42, "espada")], ["g:wicker", "ESCUDO DE MIMBRE", W(42, "mimbre")]], { size: F(210, 190), cols: F(2, 1) });
  pose(S, T41, W(42, "mimbre") + 0.2, { ...POSE.guardia, mouth: "smile" }, 0.3);
  // 43 · un poste de madera de su altura
  gone(S, all("s42c", 2), L(43).start - 0.2);
  pose(S, Dr, W(43, "señalan"), { armF: -90, foreF: 0, armB: 0, foreB: 0, mouth: "open" }, 0.3);
  S.tw(`tl.fromTo("#${S.escs.palus.id}-palus",{filter:"brightness(1)"},{filter:"brightness(1.5)",duration:0.25,yoyo:true,repeat:3},${r3(W(43, "poste"))});`);
  arrow(S, "s43a", J + F(200, 200), G - F(900, 1000), J + 200, G - 560, W(43, "poste"), { dur: 0.4, bend: 0.15 });
  S.add(`<svg id="s43h" class="prop" style="left:${J - F(560, 400)}px;top:${G - 660}px;z-index:9;opacity:0" width="80" height="670"><path d="M40,10 L40,650 M10,10 L70,10 M10,650 L70,650" stroke="${C.bone}" stroke-width="10" stroke-linecap="round"/><path d="M40,10 L40,650" stroke="${C.ink}" stroke-width="3"/></svg>`);
  fadeUp(S, "#s43h", W(43, "altura") - 0.2);
  tx(S, "s43t", J - F(100, 0), zJ.top, "DE SU ALTURA", W(43, "altura"), { size: F(80, 70), fx: "up" });
  // 44 · se llama palus: su rival durante semanas
  gone(S, "#s43a,#s43h,#s43t", L(44).start - 0.2);
  tx(S, "s44p", J + 200, G - F(720, 740), "PALUS", W(44, "palus"), { roman: true, size: F(120, 100), color: RC.gold });
  S.add(`<div id="s44f" class="prop" style="left:${J + 200 - 55}px;top:${G - 470}px;z-index:9;opacity:0">${icon("smiley-angry", { size: 110, color: "#3a2616" })}</div>`);
  pop(S, "#s44f", W(44, "rival"));
  pose(S, T41, W(44, "rival"), { ...POSE.guardia, brows: 6, mouth: "open" }, 0.3);
  // 45 · al acabar: sudor, aceite y arena con el estrígilo
  gone(S, "#s44p,#s44f", L(45).start - 0.2);
  gearOff(S, T41, "wicker", L(45).start - 0.1); gearOff(S, T41, "wood", L(45).start - 0.1);
  pose(S, T41, L(45).start, { armF: 0, foreF: 0, armB: 0, foreB: 0, legF: 0, legB: 0, mouth: "neutral", brows: 0 }, 0.3);
  cards(S, "s45c", J + F(100, 0), zJ.top, [["drop", "SUDOR", W(45, "sudor"), null, "#cfe3f0"], ["drop-half", "ACEITE", W(45, "aceite"), null, "#f3e2b0"], ["grains", "ARENA", W(45, "arena"), null, "#ead4a8"]], { size: F(200, 180), cols: 3 });
  S.tw(`tl.to("#s41fx-armF",{rotation:-100,svgOrigin:"30 -292",duration:0.25,yoyo:true,repeat:7},${r3(W(45, "rascan"))});`);
  gone(S, all("s45c", 3), W(45, "estrígilo") - 0.3);
  gearCard(S, "s45s", J + F(100, 0), zJ.top + F(40, 60), F(260, 240), "strigil", "ESTRÍGILO");
  pop(S, "#s45s", W(45, "estrígilo"));
  // 46 · se tumba en su cuarto: le duele todo (día 1 de 30)
  gone(S, "#s45s", L(46).start - 0.2);
  const D46 = D - F(0, 380);
  cut(S, L(46).start - 0.45, "cuarto", { x: D46 });
  const T46 = who(S, "s46fx", "felix", D - F(820, 700), { g: FX, seed: 46, shadow: false });
  S.tw(`tl.set("#s46fx",{rotation:-90,transformOrigin:"50% 100%",x:${F(400, 380)},y:-170},0);`);
  hidden(S, T46); appear(S, T46, L(46).start - 0.1);
  pose(S, T46, 0, { mouth: "sad", brows: 6 }, 0.01);
  pose(S, T46, W(46, "tumba"), { armF: -40, foreF: -60, mouth: "open" }, 0.3);
  sprinkle(S, "s46d", D - F(560, 480), G - 300, "lightning", W(46, "duele"), { n: 4, color: "#ffd36b", size: 80, r: F(220, 200) });
  tx(S, "s46t", F(D + 300, D46), zD.top, "LE DUELE TODO", W(46, "duele"), { size: F(84, 72), color: "#ffb4a0", fx: "up" });
  tx(S, "s46p", F(D + 300, D46), zD.top + F(150, 140), "DÍA 1 DE 30", W(46, "primer"), { roman: true, size: F(110, 92), color: RC.gold });
  outro(S, 46, D46);
}

// ======================= 4 · SEMANA 2 · LUNA CRECIENTE (47-71) =======================
function enfermeria(P, x) { ceiling(P, x, 4000); infirmary(P, x, 4000); motes(P, { color: "rgba(255,240,190,.75)", n: 50 }); foreground2(P, ["curtain", "amphora"]); vignette(P, 0.35); }
function galenoEsc(P, x) { ceiling(P, x, 3800); infirmary(P, x, 3800); bust(P, `${P.id}-ma`, x + 650, G, { beard: true, curls: true, w: 240, pedestal: 260 }); motes(P); vignette(P, 0.35); foreground2(P, ["curtain", "amphora"]); }
function efesoEsc(P, x) { ephesus(P, x, 4000); P.add(`<svg class="prop" style="left:${x - 2000}px;top:${G - 1460}px;z-index:0" width="4000" height="710"><rect width="4000" height="710" fill="#5f6d7c"/>${[...Array(14)].map((_, k) => `<rect x="${k * 300}" y="0" width="40" height="710" fill="#4f5b68"/><path d="M${k * 300 + 150},0 L${k * 300 + 150},120" stroke="#3a3530" stroke-width="4"/><circle cx="${k * 300 + 150}" cy="130" r="14" fill="#ffe8b0"/>`).join("")}</svg>`); motes(P, { color: "rgba(230,240,255,.6)" }); vignette(P, 0.3); foreground2(P, ["column", "amphora"], { blur: 5 }); }
export function semana2(S) {
  const { F, h, L, W, end } = ctx(S);
  const X = (i) => 3000 + (i % 6) * 3000;
  const pa = esc(S, "patio", FONDO.s2_patio, X(0));
  esc(S, "tipos", FONDO.s2_tipos, X(1));
  esc(S, "enfer", enfermeria, X(2));
  const ef = esc(S, "efeso", efesoEsc, X(3), { filter: "saturate(.55) hue-rotate(-8deg) brightness(.95)" });
  esc(S, "galeno", galenoEsc, X(4), { filter: "saturate(.5) brightness(.95)" });
  on(S, "patio", 0);
  const A = X(0), zA = Z(S, A);
  enter(S, spotBox(S, A));
  // 47 · Semana 2: la luna engorda, y Félix también
  const s2b = semana(S, "s2m", A, F(G - 800, G - 1100), 0.5, "SEMANA 2", W(47, "semana"));
  moonTo(pa, W(47, "engorda") - 0.2, "creciente", 1.0);
  tx(S, "s2ml", A, F(G - 570, G - 880), "LA LUNA ENGORDA", W(47, "engorda"), { size: F(76, 68), color: C.bone2, fx: "up" });
  const T = who(S, "s47fx", "felix", A - F(700, 420), { g: { ...FX, B: ["wood"] }, seed: 47 });
  S.tw(`tl.to("${s2b},#s2ml",{y:-60,scale:0.7,opacity:0,duration:0.35,ease:"power2.in"},${r3(W(47, "félix") - 0.2)});`);
  S.tw(`tl.to("#s47fx-torso",{scaleX:1.18,svgOrigin:"0 -200",duration:0.5,ease:"elastic.out(1,0.5)"},${r3(W(47, "también"))});`);
  tx(S, "s47t", zA.cx, zA.cy - F(80, 60), "+ CEBADA", W(47, "cebada"), { size: F(96, 84), color: RC.gold, fx: "pop" });
  pose(S, T, W(47, "también"), { mouth: "smile", brows: -4 }, 0.3);
  // 48 · golpe tras golpe contra el palus (el palus de la izquierda está en A - 300)
  gone(S, "#s47t", L(48).start - 0.2);
  c1(S, "s48m", zA.cx + F(200, 0), zA.top, "sun-horizon", "CADA MAÑANA", W(48, "mañana") - 0.1, { size: F(220, 200), bg: "#f6e3b0" });
  const hits = [W(48, "golpe", 1), W(48, "golpe", 2), W(48, "contra"), W(48, "palus")];
  hits.forEach((t, k) => { strike(S, T, t); burst(S, `s48b${k}`, A - 300, G - 330, t + 0.05, { n: 6, color: "#c9a06a", spread: 120, up: 90, size: 12, seed: 48 + k, dur: 0.5 }); S.cue(t + 0.04, "hit", 0.6); S.tw(`tl.fromTo("#${pa.id}-p1",{x:0},{x:10,duration:0.06,yoyo:true,repeat:1},${r3(t + 0.05)});`); });
  // 49 · el manual militar: armas de práctica más pesadas; la de verdad se nota ligera
  gone(S, "#s48m", L(49).start - 0.2);
  c1(S, "s49m", zA.cx + F(160, 0), zA.top - F(0, 0), "book-open", "MANUAL MILITAR", W(49, "manual"), { size: F(220, 200) });
  const sc = `<div style="display:flex;gap:${F(70, 40)}px;align-items:flex-end"><div id="s49L" style="text-align:center"><svg width="130" height="160" viewBox="-20 -312 90 154">${GEAR.wood}</svg><div class="lbl">PRÁCTICA</div></div><div id="s49R" style="text-align:center"><svg width="130" height="160" viewBox="-20 -310 90 170">${GEAR.sword}</svg><div class="lbl">DE VERDAD</div></div></div>`;
  box(S, "s49s", zA.cx + F(160, 0), zA.cy + F(150, 230), F(760, 720), 420, sc, W(49, "pesadas") - 0.2);
  S.tw(`tl.to("#s49L",{y:40,duration:0.5,ease:"bounce.out"},${r3(W(49, "pesadas"))});tl.to("#s49R",{y:-40,duration:0.5,ease:"back.out(2)"},${r3(W(49, "pesadas"))});`);
  S.tw(`tl.to("#s49R",{y:-70,rotation:8,duration:0.6,yoyo:true,repeat:3,ease:"sine.inOut"},${r3(W(49, "ligera") - 0.1)});`);
  tx(S, "s49l", zA.cx + F(160, 0), zA.top + F(150, 130), "MÁS PESADAS", W(49, "pesadas"), { size: F(76, 68), color: "#ffd38a", fx: "up" });
  gone(S, "#s49l", W(49, "ligera") - 0.4);
  tx(S, "s49g", zA.cx + F(160, 0), zA.top + F(150, 130), "¡LIGERA!", W(49, "ligera"), { size: F(90, 80), color: "#bff0c0" });
  // 50 · los doctores: maestros, no médicos
  gone(S, "#s49m,#s49s,#s49g", L(50).start - 0.2);
  const Dr = who(S, "s50dr", "doctor", zA.R + F(500, 400), { g: { H: ["scarFace"], F: ["wood"] }, flip: true, seed: 50 });
  go(S, Dr, L(50).start - 0.3, W(50, "doctores") + 0.2, zA.R);
  tx(S, "s50d", A + F(100, 0), zA.top - F(30, 30), "DOCTORES", W(50, "doctores"), { roman: true, size: F(110, 92), color: RC.gold });
  cards(S, "s50c", A + F(100, 0), zA.top + F(200, 220), [["first-aid", "MÉDICOS", W(50, "médicos"), false], ["medal", "MAESTROS", W(50, "maestros"), true]], { size: F(200, 190), cols: 2 });
  pose(S, Dr, W(50, "maestros"), { ...POSE.brazosCruzados, mouth: "sad", brows: 6 }, 0.3);
  tx(S, "s50g", A + F(100, 0), zA.top + F(400, 420), "EXGLADIADORES", W(50, "gladiadores"), { size: F(68, 62), color: "#ffd38a", fx: "up" });
  // 51 · muchos tipos de gladiador, cada uno con sus maestros
  gone(S, "#s50d,#s50g," + all("s50c", 2, true), L(51).start - 0.2);
  const B = X(1), zB = Z(S, B);
  cut(S, L(51).start - 0.45, "tipos");
  tx(S, "s51t", B, zB.top - F(20, 30), "TIPOS DE GLADIADOR", W(51, "tipos"), { roman: true, size: F(104, 80), color: RC.marble });
  const pr51 = people(S, "s51p", B, zB.top + F(170, 170), 5, 5, W(51, "maestros"), { size: F(120, 100), color: C.bone, hit: RC.gold, ic: "person-arms-spread" });
  pr51.show(W(51, "tipos") + 0.2); pr51.hit();
  tx(S, "s51m", B, zB.top + F(330, 320), "CADA UNO, SU MAESTRO", W(51, "maestros"), { size: F(70, 62), fx: "up" });
  // 52 · hoplómaco: soldado griego con escudo redondo y pequeño
  gone(S, "#s51t,#s51p,#s51m", L(52).start - 0.2);
  const Ho = who(S, "s52ho", "prisco", B - F(350, 0), { g: { H: [galea("#b5532f")], F: ["hoplon"], B: [prop("spear", "s52sp")] }, seed: 52 });
  hidden(S, Ho); appear(S, Ho, W(52, "hoplómaco") - 0.3);
  tx(S, "s52t", B + F(330, 0), zB.top - F(20, 30), "HOPLÓMACO", W(52, "hoplómaco"), { roman: true, size: F(104, 88), color: RC.marble });
  c1(S, "s52g", B + F(330, 230), zB.top + F(210, 230), "g:hoplon", "REDONDO Y PEQUEÑO", W(52, "redondo"), { size: F(220, 200) });
  pose(S, Ho, W(52, "griego"), { ...POSE.guardia, mouth: "open" }, 0.3);
  // 53 · secutor: casco liso y redondo con dos agujeros (la red resbala)
  gone(S, "#s52t,#s52g", L(53).start - 0.2); vanish(S, Ho, L(53).start - 0.2);
  const Se = who(S, "s53se", "vero", B - F(350, 0), { g: { V: ["secutor"], F: ["shield"], B: ["sword"] }, seed: 53 });
  hidden(S, Se); appear(S, Se, W(53, "secutor") - 0.3);
  tx(S, "s53t", B + F(330, 0), zB.top - F(20, 30), "SECUTOR", W(53, "secutor"), { roman: true, size: F(104, 88), color: RC.marble });
  const hx = B - F(350, 0) + 4 * 1.35 * 0.99, hy = G - 360 * 1.35 * 0.99;
  gone(S, "#s53t", W(53, "agujeros") - 0.4);
  camTo(S, W(53, "agujeros") - 0.3, { x: hx - F(420, 300), y: hy - F(240, 400), w: F(840, 600), h: F(470, 800) }, { dur: 0.6 });
  tx(S, "s53a", hx + F(250, 0), hy - F(150, 300), "2 AGUJEROS", W(53, "agujeros") + 0.1, { size: F(64, 60), w: 700, color: RC.gold, fx: "pop" });
  S.add(`<svg id="s53n" class="prop" style="left:${hx - 120}px;top:${hy - 260}px;z-index:9;opacity:0" width="240" height="160" viewBox="0 0 240 160"><path d="M10,80 Q120,-20 230,80 L210,150 Q120,90 30,150Z" fill="rgba(230,220,190,.35)" stroke="#d8c9a0" stroke-width="5"/>${[0, 1, 2, 3, 4].map((k) => `<path d="M${30 + k * 45},30 L${50 + k * 40},150" stroke="#d8c9a0" stroke-width="4"/>`).join("")}<path d="M20,100 L220,100 M30,125 L210,125 M40,60 L200,60" stroke="#d8c9a0" stroke-width="4"/></svg>`);
  S.tw(`tl.fromTo("#s53n",{opacity:0,y:-200,x:0,rotation:0},{opacity:1,y:0,duration:0.35,ease:"power2.in"},${r3(W(53, "red") - 0.35)});tl.to("#s53n",{x:260,y:320,rotation:40,opacity:0,duration:0.7,ease:"power2.in"},${r3(W(53, "red") + 0.05)});`);
  camTo(S, L(53).end + 0.05, spotBox(S, B), { dur: 0.5 });
  // 54 · a caballo y en carro de guerra
  gone(S, "#s53t,#s53a", L(54).start - 0.2); vanish(S, Se, L(54).start - 0.2);
  const hs = F(B - 350, B - 180), cs = F(B + 450, B + 220);
  horse(S, "s54h", hs, { color: "#8a5a35", z: 5 });
  const Eq = who(S, "s54eq", "prisco", hs - 20, { g: { H: [galea("#d9a72b")], F: ["parmula"], B: [prop("spear", "s54sp")] }, scale: 1.0, y: G - 230, z: 4, seed: 54, shadow: false });
  S.tw(`tl.set("#s54h,#s54eq",{opacity:0},0);tl.fromTo("#s54h,#s54eq",{opacity:0,x:-500},{opacity:1,x:0,duration:0.7,ease:"power2.out"},${r3(W(54, "caballo") - 0.6)});`);
  tx(S, "s54a", hs, zB.top - F(20, 30), "A CABALLO", W(54, "caballo"), { size: F(80, 66), w: 800, fx: "pop" });
  essedum(S, "s54c", cs, { z: 5 });
  const Es = who(S, "s54es", "vero", cs - 60, { g: { H: [galea("#7a8a4a")], F: ["shield"], B: ["sword"] }, scale: 0.95, y: G - 140, z: 4, seed: 55, shadow: false });
  S.tw(`tl.set("#s54c,#s54es",{opacity:0},0);tl.fromTo("#s54c,#s54es",{opacity:0,x:500},{opacity:1,x:0,duration:0.7,ease:"power2.out"},${r3(W(54, "carro") - 0.6)});tl.fromTo("#s54c-wh",{rotation:0},{rotation:-360,svgOrigin:"190 220",duration:0.7},${r3(W(54, "carro") - 0.6)});`);
  tx(S, "s54b", cs, zB.top + F(110, 130), "EN CARRO", W(54, "carro"), { size: F(80, 66), w: 800, fx: "pop" });
  // 55-57 · Félix será mirmillón: casco con pez, escudo grande, espada corta
  S.tw(`tl.to("#s54h,#s54eq,#s54c,#s54es",{opacity:0,duration:0.3},${r3(L(55).start - 0.2)});`);
  gone(S, "#s54a,#s54b", L(55).start - 0.2);
  const M = who(S, "s55fx", "felix", B - F(400, 230), { g: { T: ["loin"], H: ["galhair", "mustache", "helmet"], F: ["shield"], B: ["sword", "manica"] }, off: ["helmet", "shield", "sword", "manica"], seed: 56 });
  hidden(S, M); appear(S, M, W(55, "félix", 1) - 0.2);
  pose(S, M, W(55, "félix", 1), { look: 4, brows: -6, mouth: "open" }, 0.3);
  tx(S, "s55t", B + F(330, 0), zB.top - F(20, 30), "MIRMILLÓN", W(55, "mirmillón"), { roman: true, size: F(110, 92), color: RC.gold });
  cards(S, "s56c", B + F(330, 120), zB.top + F(210, 240), [["g:helmet", "CASCO", W(56, "casco")], ["g:shield", "ESCUDO", W(56, "escudo")], ["g:sword", "ESPADA", W(56, "espada")]], { size: F(210, 180), cols: 3 });
  gearOn(S, M, "helmet", W(56, "casco")); gearOn(S, M, "shield", W(56, "escudo")); gearOn(S, M, "sword", W(56, "espada")); gearOn(S, M, "manica", W(56, "espada"));
  tx(S, "s56p", B + F(330, 0), zB.top + F(400, 420), "¡CON UN PESCADO!", W(56, "pescado"), { size: F(70, 60), color: "#ffd38a", fx: "pop" });
  gone(S, all("s56c", 3) + ",#s56p", L(57).start - 0.2);
  const hx2 = M.x + 10, hy2 = G - 440 * 1.35;
  camTo(S, W(57, "pescado") - 0.3, { x: hx2 - F(450, 330), y: hy2 - F(260, 420), w: F(900, 660), h: F(500, 840) }, { dur: 0.6 });
  S.tw(`tl.to("#s55fx-g-helmet",{y:-8,duration:0.15,yoyo:true,repeat:3},${r3(W(57, "pescado"))});`);
  camTo(S, W(57, "nadie") - 0.1, spotBox(S, B), { dur: 0.6 });
  pose(S, M, W(57, "elegante") - 0.2, { armF: -40, foreF: -60, armB: -40, foreB: -60, head: 8, mouth: "sad", brows: 6 }, 0.3);
  c1(S, "s57e", B + F(330, 0), zB.top + F(150, 150), "crown-simple", "ELEGANTE", W(57, "elegante"), { size: F(220, 200), mk: false });
  // 58 · su rival: el reciario
  gone(S, "#s55t,#s57e,#s57em", L(58).start - 0.2);
  pose(S, M, L(58).start, { armF: 0, foreF: 0, armB: 0, foreB: 0, head: 0, mouth: "neutral", brows: 0 }, 0.3);
  const Re = who(S, "s58re", "ret", B + F(1300, 900), { g: RET, flip: true, seed: 58 });
  go(S, Re, W(58, "rival") - 0.2, W(58, "reciario") + 0.1, B + F(560, 300));
  tx(S, "s58r", B + F(80, 0), zB.top - F(20, 30), "RECIARIO", W(58, "reciario"), { roman: true, size: F(116, 96), color: "#9fc6e8" });
  tx(S, "s58m", B + F(80, 0), zB.top + F(120, 120), "EL MÁS RARO", W(58, "raro"), { size: F(72, 64), fx: "up" });
  // 59 · sin casco ni escudo; red, tridente y puñal
  gone(S, "#s58r,#s58m", L(59).start - 0.2);
  cards(S, "s59a", B + F(80, 0), zB.top + F(40, 40), [["g:helmet", "CASCO", W(59, "casco"), false], ["g:shield", "ESCUDO", W(59, "escudo"), false]], { size: F(210, 190), cols: 2 });
  gone(S, all("s59a", 2, true), W(59, "red") - 0.3);
  cards(S, "s59b", B + F(80, 0), zB.top + F(40, 40), [["g:net", "RED", W(59, "red")], ["g:trident", "TRIDENTE", W(59, "tridente")], ["g:pugio", "PUÑAL", W(59, "puñal")]], { size: F(210, 180), cols: 3 });
  pose(S, Re, W(59, "red"), { armB: -120, foreB: -40, mouth: "smile" }, 0.3);
  // 60 · injusto, pero más rápido; si te atrapa la red, se acabó
  gone(S, all("s59b", 3), L(60).start - 0.2);
  c1(S, "s60i", B + F(80, 0), zB.top, "scales", "¿INJUSTO?", W(60, "injusto"), { size: F(210, 190) });
  S.tw(`tl.to("#s60i svg",{rotation:-14,duration:0.25,yoyo:true,repeat:3},${r3(W(60, "injusto") + 0.3)});`);
  gone(S, "#s60i", W(60, "rápido") - 0.3);
  go(S, Re, W(60, "rápido") - 0.2, W(60, "rápido") + 0.4, B + F(100, 60), { run: true });
  go(S, Re, W(60, "rápido") + 0.5, W(60, "rápido") + 1.1, B + F(560, 300), { run: true });
  tx(S, "s60r", B + F(80, 0), zB.top, "MÁS RÁPIDO", W(60, "rápido"), { size: F(90, 78), color: "#9fc6e8" });
  S.add(`<svg id="s60n" class="prop" style="left:${M.x - 170}px;top:${G - 720}px;z-index:9;opacity:0" width="340" height="700" viewBox="0 0 340 700"><path d="M20,40 Q170,-20 320,40 L330,680 L10,680Z" fill="rgba(230,220,190,.25)" stroke="#d8c9a0" stroke-width="6"/>${[...Array(7)].map((_, k) => `<path d="M${20 + k * 50},20 L${20 + k * 50},680" stroke="#d8c9a0" stroke-width="4"/>`).join("")}${[...Array(9)].map((_, k) => `<path d="M10,${80 + k * 70} L330,${80 + k * 70}" stroke="#d8c9a0" stroke-width="4"/>`).join("")}</svg>`);
  S.tw(`tl.fromTo("#s60n",{opacity:0,x:${F(700, 450)},y:-200,scale:0.4},{opacity:1,x:0,y:0,scale:1,duration:0.45,ease:"power2.out"},${r3(W(60, "red") - 0.3)});`);
  shiver(S, M, W(60, "red") + 0.2, W(60, "acabó") + 0.5);
  tx(S, "s60a", B + F(80, 0), zB.top + F(140, 130), "SE ACABÓ", W(60, "acabó"), { size: F(96, 84), color: "#ff8a7a" });
  pose(S, M, W(60, "red") + 0.15, { mouth: "open", brows: 8 }, 0.2);
  // 61 · primus palus (en las lápidas) y Félix, del último
  gone(S, "#s60r,#s60a,#s60n", L(61).start - 0.2);
  pose(S, M, L(61).start, { mouth: "neutral", brows: 0 }, 0.3);
  const st = `<div style="font-family:Cinzel;font-weight:900;font-size:${F(60, 56)}px;color:#5a4a38;line-height:1.15;text-align:center">D · M<br>PRIMVS<br>PALVS</div>`;
  S.add(`<div id="s61l" class="prop" style="left:${B + F(80, 0) - 200}px;top:${zB.top - F(190, 200)}px;width:400px;height:${F(400, 380)}px;z-index:8;opacity:0;background:#cbbfa8;border:7px solid ${C.ink};border-radius:180px 180px 16px 16px;display:flex;align-items:center;justify-content:center;box-shadow:0 12px 0 ${C.ink}">${st}</div>`);
  pop(S, "#s61l", W(61, "lápidas") - 0.1);
  tx(S, "s61p", B + F(80, 0), zB.top + F(250, 230), "1.º PALO: LO MÁS ALTO", W(61, "primer"), { size: F(70, 62), color: RC.gold, fx: "up" });
  gone(S, "#s61l,#s61p", W(61, "félix") - 0.3);
  const lad = `<div style="display:flex;align-items:flex-end;gap:${F(40, 30)}px;height:300px">${[1, 0.8, 0.6, 0.4, 0.2].map((v, k) => `<div style="width:${F(80, 70)}px;height:${v * 280}px;background:${k === 4 ? C.ochre : "#8a6232"};border:5px solid ${C.ink};border-radius:10px"></div>`).join("")}</div><div class="lbl" style="font-size:${F(62, 60)}px">PALOS</div>`;
  box(S, "s61r", B + F(140, 0), zB.top + F(80, 120), F(620, 560), F(440, 430), lad, W(61, "félix") - 0.2);
  tx(S, "s61u", B + F(140, 0), zB.top + F(370, 400), "FÉLIX: EL ÚLTIMO", W(61, "último") - 0.1, { size: F(72, 64), color: "#ffd38a", fx: "up" });
  pose(S, M, W(61, "último"), { mouth: "sad", head: 8, brows: 6 }, 0.3);
  // 62 · entrenar duele: cortes, moratones, golpes en la frente
  gone(S, "#s61r,#s61u", L(62).start - 0.2);
  cut(S, L(62).start - 0.45, "patio", { x: A + F(400, 300) });
  vanish(S, T, L(62).start - 0.3); vanish(S, Dr, L(62).start - 0.3);
  const zA2 = Z(S, A + F(400, 300));
  const T62 = who(S, "s62fx", "felix", zA2.L, { g: { ...FX, F: ["wicker"], B: ["wood"] }, seed: 62 });
  const Dr2 = who(S, "s62dr", "doctor", zA2.R - F(100, 40), { g: { H: ["scarFace"], B: ["wood"] }, flip: true, seed: 63 });
  hidden(S, T62); hidden(S, Dr2); appear(S, T62, L(62).start - 0.1); appear(S, Dr2, L(62).start - 0.1);
  [W(62, "cortes"), W(62, "moratones"), W(62, "frente")].forEach((t, k) => { strike(S, Dr2, t - 0.05); shake(S, t + 0.05, 8, 0.2); S.cue(t, "hit", 0.6); });
  cards(S, "s62c", zA2.x, zA2.top, [["bandaids", "CORTES", W(62, "cortes")], ["drop", "MORATONES", W(62, "moratones"), null, "#d8c8e8"], ["star", "GOLPES", W(62, "golpes")]], { size: F(200, 180), cols: 3 });
  sprinkle(S, "s62s", zA2.L, G - 700, "star", W(62, "frente"), { n: 3, size: 70, r: 120 });
  pose(S, T62, W(62, "frente") + 0.1, { head: 12, mouth: "sad", brows: 8 }, 0.2);
  // 63 · vale dinero: el lanista lo cuida (masajistas y médicos)
  gone(S, all("s62c", 3) + "," + all("s62s", 3), L(63).start - 0.2);
  const Cx = X(2), zC = Z(S, Cx);
  cut(S, L(63).start - 0.45, "enfer");
  const T63 = who(S, "s63fx", "felix", zC.L, { g: FX, seed: 64 });
  const Me = who(S, "s63me", "medicus", Cx + F(120, 60), { g: { F: ["tabula"] }, flip: true, seed: 65 });
  const Ms = who(S, "s63ms", "hunter2", Cx + F(620, 300), { g: { F: ["cloth"] }, flip: true, seed: 66 });
  hidden(S, Me); hidden(S, Ms);
  c1(S, "s63d", Cx + F(100, 0), zC.top, "coins", "VALE MUCHO", W(63, "dinero"), { size: F(210, 190), bg: RC.gold });
  tx(S, "s63l", Cx + F(100, 0), zC.top + F(160, 150), "EL LANISTA LO CUIDA", W(63, "cuida") - 0.2, { size: F(70, 62), fx: "up" });
  gone(S, "#s63d,#s63l", W(63, "masajistas") - 0.3);
  appear(S, Ms, W(63, "masajistas") - 0.2); appear(S, Me, W(63, "médicos") - 0.2);
  cards(S, "s63c", Cx + F(100, 0), zC.top, [["hand-palm", "MASAJISTAS", W(63, "masajistas")], ["first-aid", "MÉDICOS", W(63, "médicos")]], { size: F(210, 190), cols: 2 });
  S.tw(`tl.to("#s63ms-armF",{rotation:-50,svgOrigin:"30 -292",duration:0.25,yoyo:true,repeat:5},${r3(W(63, "masajistas") + 0.2)});`);
  // 64 · Éfeso, un siglo después: tumbas de gladiadores
  gone(S, all("s63c", 2), L(64).start - 0.2);
  const D = X(3), zD = Z(S, D);
  cut(S, L(64).start - 0.45, "efeso");
  tx(S, "s64e", D, zD.top - F(30, 30), "ÉFESO", W(64, "éfeso"), { roman: true, size: F(120, 100), color: "#e8eef5" });
  tx(S, "s64s", D, zD.top + F(110, 110), "UN SIGLO DESPUÉS", W(64, "siglo"), { size: F(76, 68), color: "#bcd0e8", fx: "up" });
  camTo(S, W(64, "tumbas") - 0.2, spotBox(S, D + F(450, 300), 1), { dur: 0.7 });
  // 65 · tenían 20-30 años; heridas bien curadas
  gone(S, "#s64e,#s64s", L(65).start - 0.2);
  const n65 = num(S, "s65n", D + F(450, 300), zD.top, { from: 15, to: 30, t: W(65, "veinte") - 0.1, dur: 0.8, size: F(140, 120), suf: "<span style='font-size:.45em'> AÑOS</span>", w: 1000, bw: 600 });
  tx(S, "s65r", D + F(450, 300), zD.top + F(140, 130), "ENTRE 20 Y 30", W(65, "treinta"), { size: F(70, 62), fx: "up" });
  c1(S, "s65c", D + F(450, 300), zD.top + F(330, 330), "bone", "HERIDAS CURADAS", W(65, "curadas") - 0.1, { size: F(200, 180), mk: true });
  // 66 · buenos médicos
  gone(S, n65 + ",#s65r,#s65c,#s65cm", L(66).start - 0.2);
  c1(S, "s66c", D + F(450, 300), zD.top + F(60, 60), "first-aid", "BUENOS MÉDICOS", W(66, "médicos") - 0.1, { size: F(240, 220), mk: true });
  // 67 · un cráneo con tres agujeros: un tridente
  gone(S, "#s66c,#s66cm", L(67).start - 0.2);
  camTo(S, W(67, "cráneo") - 0.4, { x: D - F(500, 330), y: G - F(840, 1000), w: F(1000, 660), h: F(560, 900) }, { dur: 0.7 });
  tx(S, "s67c", D, G - F(730, 880), "CRÁNEO", W(67, "cráneo"), { size: F(70, 62), w: 800, fx: "pop" });
  holesGlow(ef, W(67, "tres"));
  tx(S, "s67t", D + F(320, 180), G - F(560, 560), "3 AGUJEROS", W(67, "tres") + 0.1, { size: F(62, 60), w: 600, color: "#ffd36b", fx: "pop" });
  gearCard(S, "s67tr", D + F(-330, -200), G - F(500, 560), F(240, 220), "trident", "TRIDENTE");
  drop(S, "#s67tr", W(67, "tridente"));
  camTo(S, L(67).end + 0.05, spotBox(S, D), { dur: 0.5 });
  // 68 · décadas después: Galeno, médico de gladiadores en Pérgamo y luego de Marco Aurelio
  gone(S, "#s67c,#s67t,#s67tr", L(68).start - 0.2);
  const E = X(4), zE = Z(S, E);
  cut(S, L(68).start - 0.45, "galeno");
  tx(S, "s68d", E, zE.top - F(30, 30), "DÉCADAS DESPUÉS", W(68, "décadas"), { size: F(80, 70), color: "#bcd0e8" });
  const Ga = who(S, "s68ga", "galeno", zE.L, { g: { F: ["scroll"] }, seed: 68 });
  tx(S, "s68p", zE.L + F(300, 250), zE.top + F(130, 140), "PÉRGAMO", W(68, "pérgamo"), { size: F(68, 60), w: 700, fx: "up" });
  tx(S, "s68g", zE.L + F(300, 250), zE.top + F(250, 260), "GALENO", W(68, "galeno"), { roman: true, size: F(96, 84), w: 800, color: RC.marble });
  pose(S, Ga, W(68, "galeno"), { armF: -60, foreF: -40, mouth: "smile" }, 0.3);
  tx(S, "s68m", E + F(650, 250), F(G - 1000, G - 760), "MARCO AURELIO", W(68, "marco"), { size: F(66, 60), w: 700, color: RC.gold, fx: "pop" });
  S.tw(`tl.fromTo("#${S.escs.galeno.id}-ma",{filter:"brightness(1)"},{filter:"brightness(1.35)",duration:0.3,yoyo:true,repeat:3},${r3(W(68, "emperador"))});`);
  // 69 · un remedio: sangre de gladiador contra la epilepsia (lo contó Plinio)
  gone(S, "#s68d,#s68p,#s68g,#s68m", L(69).start - 0.2);
  cut(S, L(69).start - 0.45, "enfer", { x: Cx + F(500, 300) });
  vanish(S, T63, L(69).start - 0.3); vanish(S, Me, L(69).start - 0.3); vanish(S, Ms, L(69).start - 0.3);
  const zC2 = Z(S, Cx + F(500, 300));
  const T69 = who(S, "s69fx", "felix", zC2.L, { g: FX, seed: 69 });
  hidden(S, T69); appear(S, T69, L(69).start - 0.1);
  cards(S, "s69c", zC2.cx, zC2.cy - F(80, 30), [["flask", "REMEDIO", W(69, "remedio")], ["drop", "SANGRE", W(69, "sangre"), null, "#f0c0c0"], ["brain", "EPILEPSIA", W(69, "epilepsia")], ["book-open", "PLINIO", W(69, "plinio")]], { size: F(200, 190), cols: 2 });
  pose(S, T69, W(69, "sangre"), { mouth: "open", brows: 8, head: 6 }, 0.3);
  // 70 · Félix prefiere guardarse la suya
  gone(S, all("s69c", 4), L(70).start - 0.2);
  pose(S, T69, W(70, "prefiere"), { ...POSE.brazosCruzados, mouth: "sad", brows: 6, head: -6 }, 0.3);
  tx(S, "s70t", zC2.cx, zC2.cy, "NO, GRACIAS", W(70, "guardarse"), { size: F(100, 86), color: "#ffd38a" });
  // 71 · el lanista trae una novedad: hay juegos, y no unos cualquiera
  gone(S, "#s70t", L(71).start - 0.2);
  cut(S, L(71).start - 0.45, "patio", { x: A + F(400, 300) });
  vanish(S, T62, L(71).start - 0.3); vanish(S, Dr2, L(71).start - 0.3);
  const T71 = who(S, "s71fx", "felix", zA2.L, { g: { ...FX, B: ["wood"] }, seed: 71 });
  const La = who(S, "s71la", "lanista", zA2.R + F(500, 400), { g: { H: ["scarFace"], F: ["scroll"] }, flip: true, seed: 72 });
  hidden(S, T71); appear(S, T71, L(71).start - 0.1); hidden(S, La);
  appear(S, La, W(71, "lanista") - 0.4); go(S, La, W(71, "lanista") - 0.4, W(71, "patio"), zA2.R);
  c1(S, "s71n", zA2.x, zA2.top, "scroll", "NOVEDAD", W(71, "novedad"), { size: F(210, 190) });
  gone(S, "#s71n", W(71, "juegos", 1) - 0.25);
  tx(S, "s71j", zA2.x, zA2.top, "¡HAY JUEGOS!", W(71, "juegos", 1), { roman: true, size: F(120, 96), color: RC.gold });
  pose(S, La, W(71, "juegos", 1), { armF: -150, foreF: -20, mouth: "open" }, 0.3);
  gone(S, "#s71j", W(71, "cualquiera") - 0.45);
  tx(S, "s71c", zA2.L + F(150, 100), G - F(840, 1050), "NO UNOS CUALQUIERA", W(71, "cualquiera"), { size: F(64, 60), w: F(800, 640), color: RC.gold });
  camTo(S, W(71, "cualquiera") - 0.2, { x: zA2.L - F(450, 330), y: G - F(860, 1100), w: F(900, 660), h: F(520, 900) }, { dur: 0.8, ease: "power3.out" });
  S.cue(W(71, "cualquiera") - 0.3, "riser", 0.8);
  pose(S, T71, W(71, "cualquiera"), { mouth: "open", brows: -8, head: -6 }, 0.25);
  outro(S, 71, A + F(400, 300));
}

// ======================= 5 · SEMANA 3 · LUNA LLENA (72-103) =======================
// Red que vuela (combate): SVG suelto que se anima con tl
function netSvg(S, id, x, y, w = 300) {
  S.add(`<svg id="${id}" class="prop" style="left:${x - w / 2}px;top:${y - w / 2}px;z-index:9;opacity:0" width="${w}" height="${w}" viewBox="0 0 300 300"><circle cx="150" cy="150" r="140" fill="rgba(230,220,190,.25)" stroke="#d8c9a0" stroke-width="7"/>${[...Array(7)].map((_, k) => `<path d="M${30 + k * 40},20 L${30 + k * 40},280" stroke="#d8c9a0" stroke-width="5"/><path d="M20,${30 + k * 40} L280,${30 + k * 40}" stroke="#d8c9a0" stroke-width="5"/>`).join("")}<circle cx="150" cy="150" r="140" fill="none" stroke="${C.ink}" stroke-width="2" opacity=".4"/></svg>`);
}
function waves(S, id, x, y, t, { n = 3, color = "rgba(255,240,200,.9)" } = {}) {
  let h = ""; for (let k = 0; k < n; k++) h += `<div id="${id}${k}" class="prop" style="left:${x - 120}px;top:${y - 120}px;width:240px;height:240px;border-radius:50%;border:10px solid ${color};z-index:9;opacity:0"></div>`;
  S.add(h);
  for (let k = 0; k < n; k++) S.tw(`tl.fromTo("#${id}${k}",{scale:0.3,opacity:0.9},{scale:2.6,opacity:0,duration:0.9,ease:"power1.out"},${r3(t + k * 0.22)});`);
}
function mediodia(P, x) { FONDO.s3_mediodia(P, x); sunRays(P, { color: "255,250,230", k: 0.18 }); }
export function semana3(S) {
  const { F, h, L, W, end } = ctx(S);
  const X = (i) => 3000 + (i % 6) * 3000;
  const ca = esc(S, "calle", FONDO.s3_calle, X(0) + 890);
  esc(S, "pompeya", FONDO.s3_pompeya, X(1));
  esc(S, "coliseo", FONDO.s3_coliseo, X(2));
  const ba = esc(S, "banquete", FONDO.s3_banquete, X(3));
  const po = esc(S, "pompa", FONDO.s3_pompa, X(4));
  const fi = esc(S, "fieras", FONDO.s3_fieras, X(5));
  const md = esc(S, "mediodia", mediodia, X(6));
  const co = esc(S, "combate", FONDO.s3_combate, X(7));
  on(S, "calle", 0);
  const A = X(0), zA = Z(S, A);
  enter(S, spotBox(S, A));
  // 72 · Semana 3: luna llena, la semana más importante
  const s3b = semana(S, "s3m", A, F(G - 920, G - 1180), 1, "SEMANA 3", W(72, "semana"));
  tx(S, "s3ml", A, F(G - 700, G - 960), "LUNA LLENA", W(72, "luna"), { size: F(76, 68), color: C.bone2, fx: "up" });
  tx(S, "s3mi", A, F(G - 590, G - 860), "LA MÁS IMPORTANTE DE SU VIDA", W(72, "importante"), { size: F(66, 60), color: RC.gold, fx: "up" });
  // 73 · carteles nuevos pintados a mano
  S.tw(`tl.to("${s3b},#s3ml,#s3mi",{y:-60,scale:0.7,opacity:0,duration:0.35,ease:"power2.in"},${r3(L(73).start - 0.2)});`);
  for (let k = 0; k < 4; k++) S.tw(`tl.set("#${ca.id}-ed${k}",{opacity:0},0);`);
  const Pi = who(S, "s73pi", "pictor", A + F(720, 300), { g: { F: ["brush"] }, flip: true, seed: 73 });
  [W(73, "carteles"), W(73, "nuevos"), W(73, "pintados"), W(73, "mano")].forEach((t, k) => { S.tw(`tl.fromTo("#${ca.id}-ed${k}",{opacity:0},{opacity:1,duration:0.4},${r3(t)});`); S.cue(t, "flip", 0.5); });
  S.tw(`tl.to("#s73pi-armF",{rotation:-150,svgOrigin:"30 -292",duration:0.3,yoyo:true,repeat:9,ease:"sine.inOut"},${r3(W(73, "carteles") - 0.1)});`);
  tx(S, "s73t", A, zA.top - F(50, 60), "CARTELES PINTADOS", W(73, "carteles"), { size: F(78, 66) });
  // 74 · quién pagaba, cuántas parejas y los extras
  gone(S, "#s73t", L(74).start - 0.2);
  cards(S, "s74c", A, zA.top - F(40, 30), [["crown", "QUIÉN PAGA", W(74, "pagaba")], ["users", "PAREJAS", W(74, "parejas")], ["star", "EXTRAS", W(74, "extras")]], { size: F(200, 180), cols: 3 });
  // 75 · en Pompeya: fieras y toldos
  gone(S, all("s74c", 3), L(75).start - 0.2);
  const B = X(1) - 450, zB = Z(S, B);
  cut(S, L(75).start - 0.45, "pompeya", { x: B });
  tx(S, "s75p", B + F(250, 0), G - F(450, 420), "POMPEYA", W(75, "pompeya"), { roman: true, size: F(110, 92), color: RC.marble });
  cards(S, "s75c", B + F(250, 0), G - F(260, 230), [["paw-print", "FIERAS", W(75, "fieras")], ["sun", "TOLDOS", W(75, "toldos"), null, "#f6e3b0"]], { size: F(200, 180), cols: 2 });
  const Pi2 = who(S, "s75pi", "fan", B - F(650, 330), { g: {}, seed: 75 });
  pose(S, Pi2, W(75, "promete"), { armF: -110, foreF: -20, mouth: "open", look: 4 }, 0.3);
  // 76 · este cartel es distinto: Tito estrena el anfiteatro Flavio (Coliseo)
  gone(S, "#s75p," + all("s75c", 2), L(76).start - 0.2);
  const Cc = X(2), zC = Z(S, Cc);
  cut(S, L(76).start - 0.45, "coliseo");
  box(S, "s76c", zC.x, zC.top + F(40, 40), F(1000, 900), 230, `<div class="roman" style="font-size:${F(66, 56)}px;color:#b3261e;line-height:1.1;text-align:center">IMP · TITVS · CAESAR<br>AMPHITHEATRI · DEDICATIO</div>`, W(76, "distinto") - 0.1, { bg: "#f4efe2", fx: "slam" });
  gone(S, "#s76c", W(76, "tito") - 0.3);
  const Ti = who(S, "s76ti", "tito", zC.L, { g: { H: ["laurel"], T: ["toga"] }, seed: 76 });
  hidden(S, Ti); appear(S, Ti, W(76, "tito") - 0.25);
  tx(S, "s76t", zC.cx, zC.top + F(0, 0), "TITO", W(76, "tito"), { roman: true, size: F(120, 100), color: RC.gold });
  tx(S, "s76f", zC.cx, zC.top + F(150, 150), "ANFITEATRO FLAVIO", W(76, "flavio"), { size: F(78, 66), fx: "up" });
  pose(S, Ti, W(76, "estrena"), { armF: -140, foreF: -20, mouth: "smile" }, 0.3);
  gone(S, "#s76t,#s76f", W(76, "coliseo") - 0.3);
  camTo(S, W(76, "coliseo") - 0.3, spotBox(S, Cc, 1.25), { dur: 0.8 });
  tx(S, "s76k", Cc, F(G - 1150, G - 1500), "COLISEO", W(76, "coliseo"), { roman: true, size: F(150, 130), color: RC.marble });
  // 77 · 50.000 personas, entrada gratis, más de tres meses de fiesta
  gone(S, "#s76k", L(77).start - 0.2);
  camTo(S, L(77).start - 0.2, spotBox(S, Cc), { dur: 0.7 });
  const n77 = num(S, "s77n", zC.cx, zC.top - F(10, 20), { from: 0, to: 50000, t: W(77, "cincuenta") - 0.1, dur: 0.9, size: F(140, 120), suf: "<span style='font-size:.4em'> PERSONAS</span>", w: 1200, bw: F(900, 880) });
  cards(S, "s77c", zC.cx, zC.top + F(230, 240), [["ticket", "GRATIS", W(77, "gratis"), null, RC.gold], ["calendar", "+ DE 3 MESES", W(77, "meses")]], { size: F(200, 180), cols: 2 });
  pose(S, Ti, W(77, "gratis"), { armF: -150, foreF: -10, armB: -150, foreB: -10, mouth: "smile" }, 0.3);
  // 78 · la víspera: banquete público, cena libera
  gone(S, n77 + "," + all("s77c", 2), L(78).start - 0.2);
  const D = X(3), zD = Z(S, D);
  cut(S, L(78).start - 0.45, "banquete");
  const ty = G - 30;
  const T = who(S, "s78fx", "felix", D - F(380, 260), { g: FX, z: 5, seed: 78, shadow: false });
  const Co = who(S, "s78co", "vero", D + F(120, 70), { g: {}, z: 5, seed: 79, shadow: false });
  const C3 = who(S, "s78c3", "prisco", D + F(600, 380), { g: {}, z: 5, seed: 80, shadow: false, flip: true });
  c1(S, "s78v", D, zD.top - F(40, 40), "moon-stars", "LA VÍSPERA", W(78, "víspera"), { size: F(200, 180), bg: "#c8d0ea" });
  gone(S, "#s78v", W(78, "banquete") - 0.3);
  S.tw(`tl.fromTo("#${ba.id}-table",{filter:"brightness(1)"},{filter:"brightness(1.4)",duration:0.3,yoyo:true,repeat:3},${r3(W(78, "banquete"))});`);
  tx(S, "s78b", D, zD.top - F(40, 40), "BANQUETE", W(78, "banquete"), { size: F(80, 70), fx: "up" });
  tx(S, "s78l", D, zD.top + F(110, 100), "CENA LIBERA", W(78, "libera") - 0.1, { roman: true, size: F(116, 96), color: RC.gold });
  // 79 · la gente entra a mirar, como a animales en una jaula
  gone(S, "#s78b,#s78l", L(79).start - 0.2);
  c1(S, "s79g", D, zD.top - F(30, 30), "eyes", "LA GENTE MIRA", W(79, "gente"), { size: F(210, 190) });
  S.tw(`tl.to("[id^='${ba.id}-cw']",{y:-40,duration:0.3,yoyo:true,repeat:3},${r3(W(79, "mirar"))});`);
  S.add(`<svg id="s79j" class="prop" style="left:${D - 1300}px;top:${G - 900}px;z-index:7;opacity:0" width="2600" height="910">${[...Array(14)].map((_, k) => `<rect x="${k * 190}" y="0" width="30" height="910" fill="#4a4e55" stroke="${C.ink}" stroke-width="5"/>`).join("")}<rect y="0" width="2600" height="34" fill="#4a4e55" stroke="${C.ink}" stroke-width="5"/></svg>`);
  S.tw(`tl.fromTo("#s79j",{y:-900,opacity:0.8},{y:0,opacity:0.8,duration:0.4,ease:"bounce.out"},${r3(W(79, "jaula") - 0.3)});`);
  S.cue(W(79, "jaula"), "impact", 0.7);
  for (const a of [T, Co, C3]) pose(S, a, W(79, "jaula"), { mouth: "sad", brows: 6, head: 6 }, 0.3);
  // 80 · comida buena, pero casi no la tocan
  S.tw(`tl.to("#s79j",{y:-900,opacity:0,duration:0.4},${r3(L(80).start - 0.2)});`);
  gone(S, "#s79g", L(80).start - 0.2);
  c1(S, "s80c", D, zD.top - F(30, 30), "bowl-food", "COMIDA BUENA", W(80, "comida"), { size: F(210, 190), mk: true });
  tx(S, "s80t", D, zD.top + F(150, 150), "CASI NO LA TOCAN", W(80, "tocan") - 0.2, { size: F(72, 64), color: "#c8d0ea", fx: "up" });
  // 81 · despedirse, dejar a su mujer al cuidado de un amigo, liberar a sus esclavos
  gone(S, "#s80c,#s80cm,#s80t", L(81).start - 0.2);
  for (const a of [Co, C3]) pose(S, a, L(81).start, { mouth: "neutral", brows: 3, head: 0 }, 0.3);
  cards(S, "s81c", D, zD.top - F(10, 0), [["hand-waving", "DESPEDIRSE", W(81, "despedirse")], ["handshake", "SU MUJER,<br>A UN AMIGO", W(81, "amigo") - 0.2], ["lock-open", "LIBERAR<br>ESCLAVOS", W(81, "liberar")]], { size: F(190, 170), cols: F(3, 2), gap: 20 });
  S.tw(`tl.to("#s78co-armF",{rotation:-150,svgOrigin:"30 -292",duration:0.2,yoyo:true,repeat:5},${r3(W(81, "despedirse"))});`);
  // 82 · Félix no tiene a nadie: se come lo de su compañero
  gone(S, all("s81c", 3), L(82).start - 0.2);
  tx(S, "s82t", D, zD.top, "NI MUJER NI ESCLAVOS", W(82, "mujer") - 0.1, { size: F(72, 64), fx: "up" });
  pose(S, T, W(82, "come") - 0.1, { armF: -70, foreF: -20, body: 8, mouth: "open" }, 0.3);
  S.tw(`tl.to("#s78fx-armF",{rotation:-150,svgOrigin:"30 -292",duration:0.2,yoyo:true,repeat:5},${r3(W(82, "compañero"))});`);
  pose(S, Co, W(82, "compañero"), { mouth: "open", brows: -8, look: -4, head: -6 }, 0.25);
  pose(S, T, W(82, "compañero") + 1.2, { armF: 0, foreF: 0, body: 0, mouth: "smile", brows: -4 }, 0.3);
  // 83 · al día siguiente, desfile: la pompa
  gone(S, "#s82t", L(83).start - 0.2);
  const E = X(4), zE = Z(S, E);
  cut(S, L(83).start - 0.45, "pompa");
  const par = [["felix", "s83fx", ARMAS], ["vero", "s83a", { H: [galea("#7a8a4a")], F: ["shield"] }], ["prisco", "s83b", { H: [galea("#3f5f8a")], F: ["shield"] }]].map(([k, id, g], i) =>
    who(S, id, k, E - F(1500, 1100) - i * 300, { g, seed: 83 + i, scale: F(1.2, 1.15) }));
  par.forEach((a, i) => go(S, a, L(83).start - 0.2 + i * 0.1, W(83, "pompa") + 1.2, E - F(450, 300) + (2 - i) * F(-280, -200) + F(600, 440)));
  tx(S, "s83d", E, zE.top - F(40, 40), "DESFILE", W(83, "desfile"), { size: F(80, 70), fx: "up" });
  tx(S, "s83p", E, zE.top + F(100, 100), "POMPA", W(83, "pompa"), { roman: true, size: F(130, 110), color: RC.gold });
  // 84 · el que paga, trompetas, cuernos y el órgano de agua
  gone(S, "#s83d,#s83p", L(84).start - 0.2);
  move(S, L(84).start - 0.2, E + F(300, 450));
  const zE2 = Z(S, E + F(300, 450));
  S.tw(`tl.fromTo("#${po.id}-lec",{filter:"brightness(1)"},{filter:"brightness(1.4)",duration:0.25,yoyo:true,repeat:3},${r3(W(84, "paga"))});`);
  tx(S, "s84p", E - 600, G - F(620, 640), "EL QUE PAGA", W(84, "paga"), { size: F(64, 60), w: 700, fx: "pop" });
  const Mu1 = who(S, "s84m1", "musico", E + F(100, 150), { g: { F: ["tuba"] }, seed: 84 });
  const Mu2 = who(S, "s84m2", "musico", E + F(520, 740), { g: { F: ["cornu"] }, flip: false, seed: 85 });
  hidden(S, Mu1); hidden(S, Mu2); appear(S, Mu1, W(84, "trompetas") - 0.2); appear(S, Mu2, W(84, "cuernos") - 0.2);
  pose(S, Mu1, W(84, "trompetas"), POSE.soplar, 0.25); pose(S, Mu2, W(84, "cuernos"), POSE.soplar, 0.25);
  cards(S, "s84c", zE2.x, zE2.top - F(20, 20), [["megaphone", "TROMPETAS", W(84, "trompetas")], ["speaker-high", "CUERNOS", W(84, "cuernos")], ["drop", "ÓRGANO DE AGUA", W(84, "órgano"), null, "#cfe3f0"]], { size: F(190, 170), cols: 3, gap: 20 });
  S.tw(`tl.fromTo("#${po.id}-org",{scale:1},{scale:1.05,transformOrigin:"50% 100%",duration:0.2,yoyo:true,repeat:5},${r3(W(84, "órgano"))});`);
  // 85 · la arena tenía banda sonora
  gone(S, all("s84c", 3) + ",#s84p", L(85).start - 0.2);
  sprinkle(S, "s85n", zE2.x, G - F(700, 760), "music-notes", W(85, "banda") - 0.2, { n: 6, r: F(420, 340), size: 100, color: "#ffe08a" });
  tx(S, "s85t", zE2.x, zE2.top - F(40, 40), "BANDA SONORA", W(85, "banda"), { roman: true, size: F(116, 92), color: RC.gold });
  // 86 · por la mañana, las fieras
  gone(S, "#s85t," + all("s85n", 6), L(86).start - 0.2);
  const Fx = X(5), zF = Z(S, Fx);
  cut(S, L(86).start - 0.45, "fieras");
  S.tw(`tl.to("#${fi.id}-gate-bars",{y:-560,duration:0.6,ease:"power2.inOut"},${r3(W(86, "fieras") - 0.3)});`);
  S.cue(W(86, "fieras") - 0.3, "impact", 0.6);
  tx(S, "s86f", Fx, zF.top - F(40, 40), "LAS FIERAS", W(86, "fieras"), { roman: true, size: F(116, 96), color: RC.marble });
  const le = animal(S, "s86le", "leon", Fx, G, { s: F(1.3, 1.1), z: 6, flip: false });
  const os = animal(S, "s86os", "oso", Fx, G, { s: F(1.2, 1.0), z: 6, flip: false });
  S.tw(`tl.set("#s86le,#s86os",{opacity:0},0);tl.to("#s86le",{opacity:1,duration:0.2},${r3(W(86, "leones") - 0.5)});tl.to("#s86os",{opacity:1,duration:0.2},${r3(W(86, "osos") - 0.5)});`);
  animalWalk(S, le, W(86, "leones") - 0.5, W(86, "leones") + 0.6, Fx - F(650, 330), { run: true });
  animalWalk(S, os, W(86, "osos") - 0.5, W(86, "osos") + 0.6, Fx + F(650, 330), { run: true });
  animalIdle(S, le, W(86, "leones") + 0.7, L(87).end); animalIdle(S, os, W(86, "osos") + 0.7, L(87).end);
  S.tw(`tl.set("#s86os-flip",{scaleX:-1},${r3(W(86, "osos") + 0.65)});`);
  cards(S, "s86c", Fx, zF.top + F(150, 150), [["cat", "LEONES", W(86, "leones")], ["paw-print", "OSOS", W(86, "osos")], ["bird", "Y MÁS", W(86, "animales")]], { size: F(180, 170), cols: 3, gap: 20 });
  // 87 · mueren miles de animales
  gone(S, "#s86f," + all("s86c", 3), L(87).start - 0.2);
  tx(S, "s87m", Fx, zF.top, "MILES DE ANIMALES", W(87, "miles"), { size: F(96, 80), color: "#ffb4a0" });
  S.tw(`tl.to("#s86le,#s86os",{opacity:0,duration:0.8},${r3(W(87, "animales") + 0.2)});`);
  // 88 · Tito tira bolitas con premios
  gone(S, "#s87m", L(88).start - 0.2);
  const Ti2 = who(S, "s88ti", "tito", Fx - F(600, 280), { g: { H: ["laurel"], T: ["toga"], F: ["ball"] }, seed: 88 });
  hidden(S, Ti2); appear(S, Ti2, W(88, "tito") - 0.3);
  tx(S, "s88t", Fx - F(600, 280), G - F(780, 760), "TITO", W(88, "tito"), { roman: true, size: 80, w: 500, color: RC.gold, fx: "pop" });
  for (let k = 0; k < 6; k++) {
    S.add(`<div id="s88b${k}" class="prop" style="left:${Fx - F(560, 240)}px;top:${G - 520}px;width:44px;height:44px;border-radius:50%;background:#c9a467;border:5px solid ${C.ink};z-index:8;opacity:0"></div>`);
    S.tw(`tl.fromTo("#s88b${k}",{opacity:0,x:0,y:0},{keyframes:[{opacity:1,x:${120 + k * 90},y:${-300 - k * 30},duration:0.35,ease:"power2.out"},{x:${240 + k * 170},y:${-80 + k * 10},opacity:0,duration:0.4,ease:"power2.in"}]},${r3(W(88, "bolitas") + k * 0.12)});`);
  }
  S.tw(`tl.set("[id^='s88b']",{opacity:0},0);`);
  S.tw(`tl.to("#s88ti-armF",{rotation:-160,svgOrigin:"30 -292",duration:0.18,yoyo:true,repeat:7},${r3(W(88, "bolitas") - 0.1)});`);
  cards(S, "s88c", Fx + F(250, 0), zF.top + F(10, 0), [["bread", "COMIDA", W(88, "comida")], ["t-shirt", "ROPA", W(88, "ropa")], ["coin", "PLATA", W(88, "plata")], ["horse", "CABALLOS", W(88, "caballos")], ["person", "ESCLAVOS", W(88, "esclavos")]], { size: F(170, 160), cols: F(5, 3), gap: 16 });
  // 89 · quien la atrapa, se lleva el regalo: una rifa a lo bestia
  gone(S, all("s88c", 5) + ",#s88t", L(89).start - 0.2);
  const Fa = who(S, "s89fa", "fan", Fx + F(560, 280), { g: { F: ["ball"] }, off: ["ball"], flip: true, seed: 89 });
  hidden(S, Fa); appear(S, Fa, L(89).start - 0.1);
  S.tw(`tl.to("#s89fa",{y:-140,duration:0.25,yoyo:true,repeat:1,ease:"power2.out"},${r3(W(89, "atrapa") - 0.2)});`);
  pose(S, Fa, W(89, "atrapa") - 0.2, { armF: -170, foreF: 0, mouth: "open", brows: -6 }, 0.2);
  gearOn(S, Fa, "ball", W(89, "atrapa"));
  c1(S, "s89r", Fx, zF.top, "ticket", "RIFA", W(89, "rifa"), { size: F(210, 190), bg: RC.gold });
  tx(S, "s89b", Fx, zF.top + F(160, 160), "A LO BESTIA", W(89, "bestia") - 0.1, { size: F(84, 74), color: "#ffb4a0" });
  // 90 · a mediodía, los condenados (solo sombra) · Séneca: puro asesinato
  gone(S, "#s89r,#s89b", L(90).start - 0.2);
  const Gm = X(6), zG = Z(S, Gm);
  cut(S, L(90).start - 0.45, "mediodia");
  c1(S, "s90m", Gm, zG.top, "sun", "MEDIODÍA", W(90, "mediodía"), { size: F(210, 190), bg: "#f6e3b0" });
  shadeTo(md, W(90, "condenados") - 0.1, 1, 0.4); shadeTo(md, W(90, "séneca") - 0.35, 0, 0.4);
  const pp = people(S, "s90p", Gm, G - 120, 6, 0, 0, { size: F(150, 120), color: "#1a1418", ic: "person" });
  pp.show(W(90, "condenados"));
  S.tw(`tl.to("#s90p",{opacity:0,duration:0.4},${r3(W(90, "séneca") - 0.3)});`);
  gone(S, "#s90m", W(90, "condenados") - 0.2);
  bust(S, "s90b", Gm + F(500, 250), G, { curls: false, w: F(220, 200), pedestal: 240 });
  S.tw(`tl.set("#s90b",{opacity:0},0);tl.fromTo("#s90b",{y:-400,opacity:0},{y:0,opacity:1,duration:0.45,ease:"bounce.out"},${r3(W(90, "séneca") - 0.3)});`);
  tx(S, "s90s", Gm - F(200, 0), zG.top, "SÉNECA:", W(90, "séneca"), { roman: true, size: F(90, 80), color: RC.marble, fx: "up" });
  tx(S, "s90a", Gm - F(200, 0), zG.top + F(140, 130), "«PURO ASESINATO»", W(90, "asesinato") - 0.1, { size: F(80, 70), color: "#ffb4a0" });
  // 91 · por la tarde: Félix espera junto a la puerta y el público ruge
  gone(S, "#s90s,#s90a", L(91).start - 0.2);
  S.tw(`tl.to("#s90b",{opacity:0,duration:0.2},${r3(L(91).start)});`);
  const Hg = X(7) - 1500, zH = Z(S, Hg), Hf = X(7) + 300, zF2 = Z(S, Hf);
  cut(S, L(91).start - 0.45, "combate", { x: Hg + F(150, 120) });
  const P0 = who(S, "s91fx", "felix", Hg + F(480, 380), { g: ARMAS, seed: 91, flip: true });
  tx(S, "s91t", Hg + F(150, 120), zH.top - F(40, 40), "POR LA TARDE", W(91, "tarde"), { size: F(80, 70), color: "#ffd38a", fx: "up" });
  gone(S, "#s91t", W(91, "félix") - 0.3);
  S.tw(`tl.fromTo("#${co.id}-gate",{filter:"brightness(1)"},{filter:"brightness(1.3)",duration:0.25,yoyo:true,repeat:3},${r3(W(91, "puerta"))});`);
  gateRumble(co, `${co.id}-gate`, W(91, "rugir"), 1.2); roar(co, W(91, "rugir"), 3);
  waves(S, "s91w", Hg + F(150, 120), G - 800, W(91, "rugir"));
  shiver(S, P0, W(91, "rugir"), W(91, "rugir") + 1.2);
  tx(S, "s91r", Hg + F(150, 120), zH.top, "¡ROAAAR!", W(91, "rugir") + 0.1, { size: F(110, 92), color: RC.gold });
  // 92 · suena el cuerno; sale a la arena; delante, el reciario
  gone(S, "#s91r", L(92).start - 0.2);
  c1(S, "s92c", Hg + F(150, 120), zH.top, "speaker-high", "CUERNO", W(92, "cuerno"), { size: F(200, 180) });
  gone(S, "#s92c", W(92, "sale") - 0.3);
  vanish(S, P0, W(92, "sale") - 0.1);
  move(S, W(92, "sale") - 0.4, Hf, { dur: 1.0 });
  const P = who(S, "s92fx", "felix", zF2.L - F(500, 300), { g: ARMAS, seed: 92 });
  hidden(S, P); appear(S, P, W(92, "sale") - 0.2);
  go(S, P, W(92, "sale") - 0.2, W(92, "arena") + 0.5, zF2.L);
  const Re = who(S, "s92re", "ret", zF2.R, { g: RET, flip: true, seed: 93 });
  hidden(S, Re); appear(S, Re, W(92, "reciario") - 0.3);
  S.tw(`tl.to("#s92re-armB",{rotation:-60,svgOrigin:"-30 -292",duration:0.25,yoyo:true,repeat:7},${r3(W(92, "reciario"))});`);
  tx(S, "s92r", Hf, zF2.top - F(40, 40), "EL RECIARIO", W(92, "reciario"), { roman: true, size: F(100, 86), color: "#9fc6e8" });
  // Tito en el palco (al fondo, pequeño)
  const Ti3 = who(S, "s92ti", "tito", X(7), { g: { H: ["laurel"], T: ["toga"] }, scale: 0.55, y: G - 500, z: 2, seed: 94, shadow: false });
  // 93 · el árbitro, con una vara larga
  gone(S, "#s92r", L(93).start - 0.2);
  const Ab = who(S, "s93ab", "arbitro", Hf + F(30, 10), { g: { F: ["staff"] }, seed: 95, z: 7 });
  hidden(S, Ab); appear(S, Ab, W(93, "árbitro") - 0.3);
  S.tw(`tl.fromTo("#s93ab",{y:-60},{y:0,duration:0.4,ease:"bounce.out"},${r3(W(93, "árbitro") - 0.3)});`);
  tx(S, "s93t", Hf, zF2.top - F(40, 40), "ÁRBITRO", W(93, "árbitro"), { roman: true, size: F(100, 86), color: RC.marble });
  pose(S, Ab, W(93, "vara"), { armF: -90, foreF: 0, armB: -90, foreB: 0, mouth: "open" }, 0.3);
  tx(S, "s93v", Hf, zF2.top + F(130, 130), "UNA VARA PARA SEPARARLOS", W(93, "vara"), { size: F(64, 60), fx: "up" });
  // 94 · tira la red, falla, Félix ataca
  gone(S, "#s93t,#s93v", L(94).start - 0.2);
  S.tw(`tl.to("#s93ab",{x:${F(-60, -40)},y:0,opacity:0.0,duration:0.4},${r3(L(94).start)});`);
  netSvg(S, "s94n", zF2.R - 60, G - 380, 260);
  S.tw(`tl.fromTo("#s94n",{opacity:0,x:0,y:0,rotation:0,scale:0.4},{keyframes:[{opacity:1,x:${r3((zF2.L - zF2.R) * 0.5)},y:-260,scale:1,rotation:120,duration:0.4,ease:"power2.out"},{x:${r3((zF2.L - zF2.R) * 0.7)},y:330,rotation:200,scaleY:0.3,duration:0.4,ease:"power2.in"}]},${r3(W(94, "red") - 0.1)});`);
  pose(S, Re, W(94, "red") - 0.2, { armB: -160, foreB: -20, mouth: "open" }, 0.2);
  tx(S, "s94f", Hf, zF2.top - F(40, 40), "¡FALLA!", W(94, "falla"), { size: F(110, 92), color: RC.gold });
  go(S, P, W(94, "ataca") - 0.1, W(94, "ataca") + 0.5, zF2.L + F(300, 120), { run: true });
  strike(S, P, W(94, "ataca") + 0.55); shake(S, W(94, "ataca") + 0.55, 10, 0.25);
  // 95 · el tridente le araña el hombro; resbala y cae
  gone(S, "#s94f", L(95).start - 0.2);
  pose(S, Re, W(95, "tridente") - 0.15, { armF: -80, foreF: 10, body: -6, mouth: "open" }, 0.15);
  S.add(`<div id="s95h" class="prop" style="left:${zF2.L + F(300, 120) + 20}px;top:${G - 400}px;width:60px;height:12px;border-radius:6px;background:#c0392b;transform:rotate(-30deg);z-index:8;opacity:0"></div>`);
  fadeUp(S, "#s95h", W(95, "hombro"), { dy: 0, dur: 0.2 });
  shake(S, W(95, "hombro"), 8, 0.2);
  S.tw(`tl.to("#s92fx",{rotation:-78,transformOrigin:"50% 100%",x:"-=60",y:-30,duration:0.45,ease:"power2.in"},${r3(W(95, "cae") - 0.25)});tl.to("#s95h",{opacity:0,duration:0.2},${r3(W(95, "cae") - 0.25)});`);
  burst(S, "s95d", zF2.L + F(200, 60), G - 20, W(95, "cae") + 0.2, { n: 18, color: "#e8c890", spread: 260, up: 120, size: 18, seed: 95 });
  shake(S, W(95, "cae") + 0.2, 16, 0.35);
  tx(S, "s95t", Hf, zF2.top - F(40, 40), "¡CAE!", W(95, "cae"), { size: F(110, 92), color: "#ffb4a0" });
  // 96 · la red atrapa el escudo; el anfiteatro grita
  gone(S, "#s95t", L(96).start - 0.2);
  go(S, Re, L(96).start, W(96, "red") + 0.2, zF2.L + F(560, 340));
  netSvg(S, "s96n", zF2.L + F(10, -100), G - 210, 240);
  S.tw(`tl.fromTo("#s96n",{opacity:0,scale:2,rotation:-40},{opacity:1,scale:1,rotation:0,duration:0.35,ease:"power3.out"},${r3(W(96, "red") + 0.1)});`);
  roar(co, W(96, "anfiteatro"), 4); waves(S, "s96w", Hf, G - 900, W(96, "grita"));
  tx(S, "s96t", Hf, zF2.top - F(40, 40), "¡TODOS GRITAN!", W(96, "grita"), { size: F(100, 86), color: RC.gold });
  // 97 · levanta el tridente: ¿es el final?
  gone(S, "#s96t", L(97).start - 0.2);
  pose(S, Re, W(97, "levanta"), { armF: -170, foreF: -10, armB: -40, foreB: -20, mouth: "open", brows: 6 }, 0.35);
  camTo(S, W(97, "levanta"), { x: Hf - F(700, 450), y: G - F(1000, 1200), w: F(1400, 900), h: F(800, 1240) }, { dur: 2.2, ease: "sine.inOut" });
  S.cue(W(97, "final") - 0.4, "riser", 0.9);
  tx(S, "s97t", Hf + F(150, 0), G - F(820, 1050), "¿ES EL FINAL?", W(97, "final"), { roman: true, size: F(110, 92), color: "#ffd38a" });
  // 98 · levanta un dedo: missio
  gone(S, "#s97t", L(98).start - 0.15);
  camTo(S, L(98).start, spotBox(S, Hf), { dur: 0.7 });
  pose(S, P, W(98, "dedo") - 0.2, { armB: -150, foreB: -10, mouth: "sad", brows: 7 }, 0.3);
  c1(S, "s98d", Hf, zF2.top - F(30, 30), "hand-pointing", "UN DEDO", W(98, "dedo"), { size: F(200, 180) });
  tx(S, "s98p", Hf, zF2.top + F(150, 150), "= PIEDAD", W(98, "piedad"), { size: F(84, 74), color: "#bff0c0", fx: "up" });
  gone(S, "#s98d,#s98p", W(98, "missio") - 0.3);
  tx(S, "s98m", Hf, zF2.top + F(40, 40), "MISSIO", W(98, "missio"), { roman: true, size: F(140, 116), color: RC.gold });
  // 99 · el gran mito: el pulgar para abajo
  gone(S, "#s98m", L(99).start - 0.2);
  tx(S, "s99m", Hf, zF2.top - F(40, 40), "EL GRAN MITO", W(99, "mito"), { roman: true, size: F(110, 92), color: "#ffb4a0" });
  c1(S, "s99p", Hf, zF2.top + F(170, 190), "thumbs-down", "", W(99, "pulgar"), { size: F(220, 200), bg: "#f0c9c0" });
  // 100 · nadie sabe qué gesto pedía la muerte
  gone(S, "#s99m,#s99p", L(100).start - 0.2);
  tx(S, "s100r", Hf, zF2.top - F(40, 40), "EN REALIDAD…", W(100, "realidad"), { size: F(84, 74), fx: "up" });
  label(S, "s100q", Hf, zF2.top + F(150, 160), "?", { size: 200, color: RC.gold }); pop(S, "#s100q", W(100, "nadie"));
  gone(S, "#s100q", W(100, "arriba") - 0.25);
  c1(S, "s100a", Hf - F(170, 150), zF2.top + F(170, 190), "thumbs-up", "¿?", W(100, "arriba"), { size: F(200, 180) });
  c1(S, "s100b", Hf + F(170, 150), zF2.top + F(170, 190), "thumbs-down", "¿?", W(100, "abajo"), { size: F(200, 180) });
  // 101 · hoy el público grita «¡que viva!» y el emperador asiente
  gone(S, "#s100r,#s100a,#s100b", L(101).start - 0.2);
  roar(co, W(101, "viva") - 0.1, 3); waves(S, "s101w", Hf, G - 900, W(101, "viva"));
  tx(S, "s101v", Hf, zF2.top - F(40, 40), "¡QUE VIVA!", W(101, "viva"), { roman: true, size: F(116, 96), color: "#bff0c0" });
  vanish(S, Re, W(101, "emperador") - 0.4, 0.2);
  camTo(S, W(101, "emperador") - 0.3, { x: X(7) - F(500, 330), y: G - F(1000, 1150), w: F(1000, 660), h: F(560, 1000) }, { dur: 0.6 });
  S.tw(`tl.to("#s92ti-head",{rotation:12,svgOrigin:"4 -310",duration:0.2,yoyo:true,repeat:3},${r3(W(101, "asiente"))});`);
  tx(S, "s101e", X(7), G - F(930, 1080), "EL EMPERADOR ASIENTE", W(101, "asiente") - 0.1, { size: F(64, 60), w: F(900, 640), fx: "up" });
  // 102 · ha perdido, pero sigue vivo: su nombre no mentía
  gone(S, "#s101v,#s101e", L(102).start - 0.2);
  camTo(S, L(102).start - 0.1, spotBox(S, Hf), { dur: 0.7 });
  S.tw(`tl.to("#s96n",{opacity:0,duration:0.3},${r3(L(102).start)});`);
  tx(S, "s102p", Hf, zF2.top - F(40, 40), "HA PERDIDO", W(102, "perdido"), { size: F(84, 74), color: "#ffb4a0", fx: "up" });
  S.tw(`tl.to("#s92fx",{rotation:0,x:"+=60",y:0,duration:0.5,ease:"back.out(1.6)"},${r3(W(102, "vivo") - 0.3)});`);
  pose(S, P, W(102, "vivo"), { armB: -150, foreB: -20, mouth: "smile", brows: -4 }, 0.3);
  tx(S, "s102v", Hf, zF2.top + F(120, 110), "¡VIVO!", W(102, "vivo"), { roman: true, size: F(120, 100), color: "#bff0c0" });
  gone(S, "#s102p,#s102v", W(102, "nombre") - 0.3);
  box(S, "s102n", Hf + F(250, 0), zF2.top + F(60, 60), F(1000, 940), 200, `<div style="display:flex;align-items:center;gap:18px;white-space:nowrap;font:900 ${F(64, 60)}px Inter;color:${C.greenD}">${icon("clover", { size: 90, color: C.green })}FELIX = AFORTUNADO</div>`, W(102, "nombre"));
  mark(S, "s102m", Hf + F(720, 420), zF2.top - F(30, 30), 150, W(102, "mentía"), true);
  // 103 · esa misma tarde, otro combate pasará a la historia
  gone(S, "#s102n,#s102m", L(103).start - 0.2);
  const P1 = who(S, "s103a", "prisco", Hf + F(500, 140), { g: { H: [galea("#3f5f8a")], F: ["shield"], B: ["sword"] }, scale: 0.8, seed: 103, z: 4 });
  const P2 = who(S, "s103b", "vero", Hf + F(820, 380), { g: { H: [galea("#7a8a4a")], F: ["shield"], B: ["sword"] }, scale: 0.8, flip: true, seed: 104, z: 4 });
  hidden(S, P1); hidden(S, P2); appear(S, P1, W(103, "combate") - 0.3); appear(S, P2, W(103, "combate") - 0.3);
  for (let k = 0; k < 4; k++) { strike(S, P1, W(103, "combate") + k * 0.7); strike(S, P2, W(103, "combate") + 0.35 + k * 0.7); }
  tx(S, "s103h", Hf, zF2.top - F(40, 40), "HISTORIA", W(103, "historia"), { roman: true, size: F(130, 110), color: RC.gold });
  outro(S, 103, Hf);
}

// ======================= 6 · SEMANA 4 · LUNA MENGUANTE (104-124) =======================
function grafitiEsc(P, x) {
  romanSky(P, "manana"); romeSkyline(P, { fg: false }); wall(P, x, 3600); sandGround(P, { top: "#b8ad9c", bottom: "#9a8f80" });
  dipinto(P, `${P.id}-dp`, x - 250, G - 900, ["CELADVS · THR", "SVSPIRIVM · PVELLARVM"], { color: "#2a1d14", weight: 700, size: 58, rot: -3, w: 1000 });
  atrezo(P, `${P.id}-az`, x + 1150, ["amphora", "plant", "basket", "bench", "bucket", "palmJar"], { gap: 20 }); smoke(P, `${P.id}-sm`, x + 1400, G - 1060);
  motes(P); foreground2(P, ["plant", "amphora"]);
}
function haliEsc(P, x) { romanSky(P, "dia"); sandGround(P, { top: "#cbbd9e", bottom: "#a8987a" }); relief(P, x, 2800); atrezo(P, `${P.id}-az`, x + 1650, ["amphora", "plant", "basket", "palmJar"], { gap: 20 }); atrezo(P, `${P.id}-az2`, x - 1650, ["bench", "bucket"], { gap: 20 }); motes(P); foreground2(P, ["column", "plant"]); }
function villaEsc(P, x) { romanSky(P, "dia"); romeSkyline(P, { fg: false }); villa(P, x, 3600); motes(P); foreground2(P, ["plant", "column"]); }
export function semana4(S) {
  const { F, h, L, W, end } = ctx(S);
  const X = (i) => 3000 + (i % 6) * 3000;
  esc(S, "palestra", FONDO.s4_palestra, X(0));
  const gr = esc(S, "grafiti", grafitiEsc, X(1));
  const me = esc(S, "mercado", FONDO.s4_mercado, X(2));
  esc(S, "villa", villaEsc, X(3), { filter: SEPIA });
  esc(S, "hali", haliEsc, X(4));
  const pr = esc(S, "prisco", FONDO.s4_prisco, X(5));
  const no = esc(S, "noche", FONDO.s4_noche, X(6));
  on(S, "palestra", 0);
  const A = X(0), zA = Z(S, A);
  enter(S, spotBox(S, A));
  // 104 · Semana 4: la luna mengua y la herida se cura
  const s4b = semana(S, "s4m", A, F(G - 800, G - 1100), -0.5, "SEMANA 4", W(104, "semana"));
  tx(S, "s4ml", A, F(G - 570, G - 880), "LA LUNA MENGUA", W(104, "mengua"), { size: F(76, 68), color: C.bone2, fx: "up" });
  S.tw(`tl.to("${s4b},#s4ml",{y:-60,scale:0.7,opacity:0,duration:0.35,ease:"power2.in"},${r3(W(104, "herida") - 0.3)});`);
  const T = who(S, "s104fx", "felix", zA.L, { g: FX, seed: 104 });
  S.add(`<div id="s104v" class="prop" style="left:${zA.L - 10}px;top:${G - 395}px;width:70px;height:46px;border-radius:10px;background:#efe6d2;border:4px solid ${C.ink};transform:rotate(-20deg);z-index:7"></div>`);
  ((S.mem ||= {})[S.cur] ||= []).push("#s104v");
  S.tw(`tl.to("#s104v",{opacity:0,scale:0.5,duration:0.5},${r3(W(104, "cura"))});`);
  c1(S, "s104c", zA.cx, zA.cy, "bandaids", "SE CURA", W(104, "cura"), { size: F(220, 200), mk: true });
  pose(S, T, W(104, "cura"), { mouth: "smile", armF: -40, foreF: -60 }, 0.3);
  // 105 · el público lo vio aguantar: fama
  gone(S, "#s104c,#s104cm", L(105).start - 0.2);
  c1(S, "s105a", zA.cx, zA.cy - F(100, 60), "shield-check", "AGUANTÓ", W(105, "aguantar"), { size: F(220, 200) });
  sprinkle(S, "s105s", zA.L, G - F(700, 720), "star", W(105, "fama") - 0.1, { n: 5, r: F(240, 200) });
  tx(S, "s105f", zA.cx, zA.cy + F(170, 180), "FAMA", W(105, "fama"), { roman: true, size: F(130, 110), color: RC.gold });
  pose(S, T, W(105, "fama"), { armB: -150, foreB: -20, mouth: "smile", brows: -4 }, 0.3);
  // 106 · eran estrellas: en Pompeya, «el suspiro de las chicas»
  gone(S, "#s105a,#s105f," + all("s105s", 5), L(106).start - 0.2);
  const B = X(1), zB = Z(S, B);
  cut(S, L(106).start - 0.45, "grafiti");
  const Fa = who(S, "s106fa", "fan", zB.R, { g: {}, flip: true, seed: 106 });
  sprinkle(S, "s106e", B, G - F(600, 640), "star", W(106, "estrellas"), { n: 5, r: F(380, 300) });
  tx(S, "s106p", B - 250, G - F(980, 1050), "POMPEYA", W(106, "pompeya"), { roman: true, size: F(96, 84), color: RC.marble, fx: "up" });
  gone(S, all("s106e", 5), W(106, "pompeya") - 0.2);
  S.tw(`tl.fromTo("#${gr.id}-dp",{scale:1},{scale:1.08,transformOrigin:"50% 50%",duration:0.3,yoyo:true,repeat:3},${r3(W(106, "suspiro"))});`);
  tx(S, "s106s", B, G - F(560, 620), "«EL SUSPIRO DE LAS CHICAS»", W(106, "suspiro"), { size: F(76, 62), color: "#ffc0d0" });
  sprinkle(S, "s106h", zB.R, G - 700, "heart", W(106, "chicas"), { n: 4, color: "#ff7a9a", r: 160, size: 70 });
  pose(S, Fa, W(106, "suspiro"), { head: -10, mouth: "smile", brows: -6, armF: -120, foreF: -80 }, 0.3);
  // 107 · los hinchas: programa y apuestas
  gone(S, "#s106p,#s106s," + all("s106h", 4), L(107).start - 0.2);
  const Cx = X(2), zC = Z(S, Cx);
  cut(S, L(107).start - 0.45, "mercado");
  const Hi = who(S, "s107hi", "fan", zC.L, { g: { F: ["tabula"] }, seed: 107 });
  tx(S, "s107h", zC.cx, zC.top - F(10, 10), "HINCHAS", W(107, "hinchas"), { roman: true, size: F(110, 92), color: RC.gold });
  cards(S, "s107c", zC.cx, zC.top + F(220, 230), [["g:tabula", "PROGRAMA", W(107, "programa")], ["coins", "APUESTAS", W(107, "apostaban"), null, RC.gold]], { size: F(210, 190), cols: 2 });
  pose(S, Hi, W(107, "programa"), { armF: -70, foreF: -50, mouth: "open" }, 0.3);
  // 108 · recuerdos: vasos con nombres y lámparas
  gone(S, "#s107h," + all("s107c", 2), L(108).start - 0.2);
  const Ve = who(S, "s108ve", "vendedor", zC.R, { g: { F: ["cup"], B: ["lamp"] }, flip: true, seed: 108 });
  hidden(S, Ve); appear(S, Ve, W(108, "recuerdos") - 0.3);
  tx(S, "s108r", Cx, zC.top - F(10, 10), "RECUERDOS", W(108, "recuerdos"), { roman: true, size: F(110, 92), color: RC.gold });
  cards(S, "s108c", Cx, zC.top + F(220, 230), [["g:cup", "VASOS DE VIDRIO", W(108, "vasos")], ["g:lamp", "LÁMPARAS", W(108, "lámparas")]], { size: F(210, 190), cols: F(2, 1) });
  pose(S, Ve, W(108, "vasos"), { armF: -80, foreF: -40, mouth: "smile" }, 0.3);
  // 109 · como la camiseta de tu jugador favorito, pero en vidrio
  gone(S, "#s108r," + all("s108c", 2), L(109).start - 0.2);
  box(S, "s109t", Cx, zC.top + F(60, 60), F(560, 540), 300, `${HOY}${icon("t-shirt", { size: 130, color: "#3f6fb5" })}<div class="lbl" style="font-size:64px">FÉLIX · 10</div>`, W(109, "camiseta"), { fx: "pop" });
  S.tw(`tl.to("#s109t",{rotationY:90,opacity:0,duration:0.2},${r3(W(109, "vidrio") - 0.25)});`);
  gearCard(S, "s109v", Cx, zC.top + F(60, 60), F(260, 240), "cup", "EN VIDRIO");
  flipIn(S, "#s109v", W(109, "vidrio"));
  // 110 · el mito del sudor como perfume
  gone(S, "#s109v", L(110).start - 0.2);
  cut(S, L(110).start - 0.45, "palestra", { x: A + F(400, 300) });
  vanish(S, T, L(110).start - 0.3);
  const zA2 = Z(S, A + F(400, 300));
  const At = who(S, "s110at", "prisco", zA2.L, { g: { F: ["strigil"] }, seed: 110 });
  hidden(S, At); appear(S, At, L(110).start - 0.1);
  tx(S, "s110m", zA2.cx, zA2.cy - F(180, 200), "MITO", W(110, "mito"), { roman: true, size: F(120, 100), color: "#ffb4a0" });
  cards(S, "s110c", zA2.cx, zA2.cy + F(20, 0), [["drop", "SUDOR", W(110, "sudor"), null, "#cfe3f0"], ["flask", "¿PERFUME?", W(110, "perfume"), null, "#f3d0e6"]], { size: F(210, 190), cols: 2 });
  // 111 · en realidad, ninguna fuente lo cuenta; sí se vendía la mugre de los atletas como remedio
  gone(S, "#s110m", L(111).start - 0.2);
  tx(S, "s111r", zA2.cx, zA2.cy - F(180, 200), "EN REALIDAD", W(111, "realidad"), { size: F(90, 78), fx: "up" });
  mark(S, "s111x", zA2.cx + F(140, 140), zA2.cy - F(40, 60), 170, W(111, "fuente"), false);
  gone(S, "#s111r,#s111x," + all("s110c", 2), W(111, "sí") - 0.3);
  c1(S, "s111m", zA2.cx, zA2.cy - F(40, 40), "flask", "MUGRE = REMEDIO", W(111, "remedio") - 0.1, { size: F(230, 210), bg: "#d8d4ce" });
  S.tw(`tl.to("#s110at-armF",{rotation:-110,svgOrigin:"30 -292",duration:0.25,yoyo:true,repeat:7},${r3(W(111, "mugre") - 0.3)});`);
  burst(S, "s111b", zA2.L + 40, G - 330, W(111, "mugre"), { n: 12, color: "#7a6a5a", spread: 140, up: 60, size: 14, seed: 111 });
  tx(S, "s111a", zA2.cx, zA2.cy + F(180, 180), "DE LOS ATLETAS", W(111, "atletas"), { size: F(76, 66), fx: "up" });
  // 112 · el dinero: palma y monedas de oro
  gone(S, "#s111m,#s111a", L(112).start - 0.2);
  cut(S, L(112).start - 0.45, "mercado", { x: Cx + F(300, 250) });
  vanish(S, Hi, L(112).start - 0.3); vanish(S, Ve, L(112).start - 0.3);
  const zC2 = Z(S, Cx + F(300, 250));
  const Wi = who(S, "s112wi", "felix", zC2.L, { g: { ...FX, F: ["purse"] }, off: ["purse"], seed: 112 });
  hidden(S, Wi); appear(S, Wi, L(112).start - 0.1);
  c1(S, "s112d", zC2.cx, zC2.cy - F(160, 150), "coins", "¿Y EL DINERO?", W(112, "dinero"), { size: F(210, 190) });
  gearOn(S, Wi, "purse", W(112, "oro"));
  cards(S, "s112c", zC2.cx, zC2.cy + F(110, 120), [["g:palm", "PALMA", W(112, "palma")], ["coin", "MONEDAS DE ORO", W(112, "oro"), null, RC.gold]], { size: F(200, 180), cols: 2 });
  burst(S, "s112b", zC2.L + 50, G - 500, W(112, "oro"), { n: 14, color: RC.gold, spread: 200, up: 200, size: 18, seed: 112 });
  pose(S, Wi, W(112, "oro"), { armF: -70, foreF: -30, mouth: "smile", brows: -4 }, 0.3);
  // 113 · Claudio contaba las monedas con los dedos, a gritos, con el público
  gone(S, "#s112d," + all("s112c", 2), L(113).start - 0.2);
  bust(S, "s113b", zC2.cx + F(150, 260), G, { curls: true, w: F(220, 200), pedestal: 240 });
  S.tw(`tl.set("#s113b",{opacity:0},0);tl.fromTo("#s113b",{y:-400,opacity:0},{y:0,opacity:1,duration:0.45,ease:"bounce.out"},${r3(W(113, "claudio") - 0.35)});tl.to("#s113b",{opacity:0,duration:0.3},${r3(L(113).end + 0.1)});`);
  tx(S, "s113c", zC2.cx - F(120, 0), zC2.top - F(20, 30), "CLAUDIO", W(113, "claudio"), { roman: true, size: F(110, 92), color: RC.marble });
  const n113 = num(S, "s113n", zC2.cx - F(120, 0), zC2.top + F(150, 160), { from: 0, to: 5, t: W(113, "dedos") - 0.1, dur: 1.4, size: F(130, 110), suf: "<span style='font-size:.45em'> MONEDAS</span>", w: 900, bw: 620 });
  tx(S, "s113p", zC2.cx - F(120, 0), zC2.top + F(300, 310), "¡TODOS A CORO!", W(113, "público") - 0.1, { size: F(72, 64), color: RC.gold, fx: "pop" });
  // 114 · Nerón regaló a Espículo casas y fincas
  gone(S, "#s113c,#s113p," + n113, L(114).start - 0.2);
  const D = X(3), zD = Z(S, D);
  cut(S, L(114).start - 0.45, "villa");
  bust(S, "s114b", D + F(620, 300), G, { curls: true, beard: true, w: F(220, 200), pedestal: 240 });
  S.tw(`tl.set("#s114b",{opacity:0},0);tl.fromTo("#s114b",{y:-400,opacity:0},{y:0,opacity:1,duration:0.45,ease:"bounce.out"},${r3(W(114, "nerón") - 0.3)});tl.to("#s114b",{opacity:0,duration:0.3},${r3(L(114).end + 0.2)});`);
  S.tw(`tl.set("#s114b",{filter:"${SEPIA}"},0);`);
  tx(S, "s114n", D + F(620, 300), G - F(640, 640), "NERÓN", W(114, "nerón"), { roman: true, size: F(100, 86), w: 800, color: RC.marble });
  const Sp = who(S, "s114sp", "vero", zD.L, { g: { H: [galea("#b5532f")], F: ["palm"] }, seed: 114 });
  hidden(S, Sp); appear(S, Sp, W(114, "espículo") - 0.3);
  tx(S, "s114e", zD.L, G - F(780, 780), "ESPÍCULO", W(114, "espículo"), { roman: true, size: F(96, 84), w: 800, color: RC.gold });
  cards(S, "s114c", D + F(60, 0), zD.top - F(30, 40), [["house", "CASAS Y FINCAS", W(114, "casas")], ["medal-military", "COMO UN GENERAL", W(114, "general")]], { size: F(170, 170), cols: F(2, 1), gap: 20 });
  // 115 · mujeres que mataron fieras (según un historiador posterior)
  gone(S, "#s114n,#s114e," + all("s114c", 2), L(115).start - 0.2);
  const E = X(4), zE = Z(S, E);
  cut(S, L(115).start - 0.45, "hali");
  tx(S, "s115h", E, zE.top - F(30, 40), "NO TODO ERAN HOMBRES", W(115, "hombres") - 0.1, { size: F(84, 70) });
  c1(S, "s115c", E, zE.top + F(170, 180), "book-open", "HISTORIADOR POSTERIOR", W(115, "historiador"), { size: F(200, 180) });
  gone(S, "#s115c", W(115, "mujeres") - 0.3);
  const Gl = who(S, "s115gl", "gladia", zE.L, { g: { F: [prop("spear", "s115sp")] }, seed: 115 });
  hidden(S, Gl); appear(S, Gl, W(115, "mujeres") - 0.2);
  const Le = animal(S, "s115le", "leon", zE.R, G, { s: F(1.2, 1.0), flip: true, z: 6 });
  S.tw(`tl.set("#s115le",{opacity:0},0);tl.to("#s115le",{opacity:1,duration:0.3},${r3(W(115, "fieras") - 0.3)});tl.to("#s115le,#s115gl,#s115gl-sh",{opacity:0,duration:0.3},${r3(L(116).start - 0.2)});`);
  animalIdle(S, Le, W(115, "fieras"), L(115).end);
  pose(S, Gl, W(115, "mataron"), { armF: -60, foreF: -60, body: 8, mouth: "open", brows: 6 }, 0.3);
  // 116 · el relieve de Halicarnaso: dos gladiadoras
  gone(S, "#s115h", L(116).start - 0.2);
  tx(S, "s116h", E, zE.top - F(30, 40), "HALICARNASO", W(116, "halicarnaso"), { roman: true, size: F(110, 88), color: RC.marble });
  const lp = [who(S, "s116l1", "lapis", E - F(300, 200), { g: { F: ["shield"], B: ["sword"] }, live: false, seed: 116 }), who(S, "s116l2", "lapis", E + F(300, 200), { g: { F: ["shield"], B: ["sword"] }, flip: true, live: false, seed: 117 })];
  const gl = [who(S, "s116g1", "gladia", E - F(300, 200), { g: { F: ["shield"], B: ["sword"] }, seed: 118 }), who(S, "s116g2", "gladia", E + F(300, 200), { g: { F: ["shield"], B: ["sword"] }, flip: true, seed: 119 })];
  for (const a of [...lp, ...gl]) hidden(S, a);
  for (const a of lp) appear(S, a, L(116).start);
  for (const a of lp) vanish(S, a, W(116, "gladiadoras"), 0.5);
  for (const a of gl) { appear(S, a, W(116, "gladiadoras"), 0.5); pose(S, a, W(116, "gladiadoras") + 0.4, { ...POSE.guardia, mouth: "open" }, 0.3); }
  tx(S, "s116g", E, zE.top + F(130, 120), "GLADIADORAS", W(116, "gladiadoras"), { size: F(84, 72), color: RC.gold, fx: "up" });
  // 117 · el combate que Félix vio aquella misma tarde
  gone(S, "#s116h,#s116g", L(117).start - 0.2);
  const Fx = X(5), zF = Z(S, Fx);
  cut(S, L(117).start - 0.45, "prisco");
  const Tw = who(S, "s117fx", "felix", Fx - F(780, 420), { g: FX, seed: 120, z: 8 });
  tx(S, "s117t", Fx, zF.top - F(30, 40), "AQUELLA MISMA TARDE", W(117, "combate"), { size: F(80, 70), color: "#ffd38a", fx: "up" });
  pose(S, Tw, W(117, "vio"), { look: 4, head: -6, mouth: "open" }, 0.3);
  // 118 · Prisco y Vero: tan igualados que ninguno ganaba
  gone(S, "#s117t", L(118).start - 0.2);
  const Pr = who(S, "s118pr", "prisco", Fx - F(150, 60), { g: { H: [galea("#3f5f8a")], F: ["shield"], B: ["sword", "palm", "wood"] }, off: ["palm", "wood"], seed: 121 });
  const Vr = who(S, "s118vr", "vero", Fx + F(330, 280), { g: { H: [galea("#7a8a4a")], F: ["shield"], B: ["sword", "palm", "wood"] }, off: ["palm", "wood"], flip: true, seed: 122 });
  hidden(S, Pr); hidden(S, Vr); appear(S, Pr, L(118).start - 0.1); appear(S, Vr, L(118).start - 0.1);
  for (let k = 0; k < 7; k++) { strike(S, Pr, L(118).start + 0.4 + k * 0.85); strike(S, Vr, L(118).start + 0.8 + k * 0.85); S.cue(L(118).start + 0.4 + k * 0.85, "hit", 0.5); }
  tx(S, "s118a", Fx - F(150, 60), G - F(790, 790), "PRISCO", W(118, "prisco"), { size: 60, w: 520, color: "#9fc6e8", fx: "pop" });
  tx(S, "s118b", Fx + F(330, 280), G - F(790, 790), "VERO", W(118, "vero"), { size: 60, w: 520, color: "#cfe0a0", fx: "pop" });
  box(S, "s118s", Fx + F(90, 0), zF.top - F(70, 120), F(520, 480), 160, `<div style="display:flex;align-items:center;gap:24px;font:900 ${F(100, 90)}px Inter;color:${C.ink}">${icon("hourglass", { size: 100, color: C.ochreD })}0 – 0</div>`, W(118, "igualados"));
  S.tw(`tl.to("#s118s svg",{rotation:180,duration:0.6,repeat:3,ease:"power2.inOut"},${r3(W(118, "igualados") + 0.3)});`);
  tx(S, "s118n", Fx + F(90, 0), zF.top + F(40, -10), "NADIE GANA", W(118, "ganar") - 0.1, { size: F(76, 66), color: "#ffb4a0", fx: "up" });
  // 119 · Tito les da la palma a los dos, y la rudis
  gone(S, "#s118a,#s118b,#s118s,#s118n", L(119).start - 0.2);
  const Ti = who(S, "s119ti", "tito", Fx, { g: { H: ["laurel"], T: ["toga"] }, scale: 0.62, y: G - 500, z: 2, seed: 123, shadow: false });
  pose(S, Ti, W(119, "tito"), { armF: -150, foreF: -10, armB: -150, foreB: -10, mouth: "smile" }, 0.3);
  for (const a of [Pr, Vr]) { pose(S, a, W(119, "tito"), { armB: 0, foreB: 0, body: 0 }, 0.3); gearOff(S, a, "sword", W(119, "palma") - 0.1); gearOn(S, a, "palm", W(119, "palma")); gearOff(S, a, "palm", W(119, "rudis") - 0.1); gearOn(S, a, "wood", W(119, "rudis")); }
  cards(S, "s119c", Fx + F(90, 110), zF.top + F(40, 60), [["g:palm", "LA PALMA", W(119, "palma")], ["g:wood", "LA RUDIS", W(119, "rudis")]], { size: F(200, 180), cols: 2 });
  // 120 · un empate, en la arena, delante del emperador
  gone(S, all("s119c", 2), L(120).start - 0.2);
  tx(S, "s120e", Fx + F(90, 110), zF.top, "EMPATE", W(120, "empate"), { roman: true, size: F(150, 120), color: RC.gold });
  roar(pr, W(120, "empate") + 0.1, 2);
  camTo(S, W(120, "arena") - 0.2, spotBox(S, Fx, 1.3), { dur: 0.8 });
  S.tw(`tl.to("#s119ti-armF,#s119ti-armB",{rotation:-110,svgOrigin:"0 -292",duration:0.15,yoyo:true,repeat:7},${r3(W(120, "emperador"))});`);
  // 121 · lo contó un poeta que estaba allí: el único combate contado con detalle
  gone(S, "#s120e", L(121).start - 0.2);
  camTo(S, L(121).start - 0.1, spotBox(S, Fx), { dur: 0.7 });
  c1(S, "s121p", Fx + F(90, 110), zF.top, "scroll", "UN POETA: MARCIAL", W(121, "poeta"), { size: F(210, 190) });
  tx(S, "s121u", Fx + F(90, 110), zF.top + F(180, 190), "EL ÚNICO CONTADO<br>CON DETALLE", W(121, "único"), { size: F(70, 62), color: "#ffd38a", fx: "up" });
  // 122 · la rudis: retiro y, a veces, la libertad
  gone(S, "#s121p,#s121u", L(122).start - 0.2);
  cards(S, "s122c", Fx + F(90, 110), zF.top + F(20, 40), [["g:wood", "RUDIS", W(122, "rudis")], ["house", "RETIRO", W(122, "retiro")], ["lock-open", "LIBERTAD", W(122, "libertad"), true]], { size: F(190, 170), cols: 3, gap: 20 });
  // 123 · Félix mira las dos rudis: él también quiere una
  gone(S, all("s122c", 3, true), L(123).start - 0.2);
  S.tw(`tl.fromTo("#s118pr-g-wood,#s118vr-g-wood",{filter:"brightness(1)"},{filter:"brightness(1.8) drop-shadow(0 0 8px #ffe08a)",duration:0.3,yoyo:true,repeat:3},${r3(W(123, "espadas"))});`);
  camTo(S, W(123, "quiere") - 0.4, { x: Tw.x - F(450, 330), y: G - F(860, 1100), w: F(900, 660), h: F(520, 900) }, { dur: 0.7 });
  pose(S, Tw, W(123, "quiere"), { armF: -100, foreF: -110, mouth: "open", brows: 6 }, 0.25);
  tx(S, "s123q", Tw.x + F(150, 100), G - F(820, 1040), "ÉL TAMBIÉN QUIERE UNA", W(123, "quiere"), { size: F(60, 60), w: F(800, 620), color: RC.gold });
  // 124 · al día siguiente, al palus; la luna se apaga
  gone(S, "#s123q", L(124).start - 0.2);
  const Gx = X(6), zG = Z(S, Gx);
  cut(S, L(124).start - 0.45, "noche");
  const Tn = who(S, "s124fx", "felix", Gx - F(180, 120), { g: { ...FX, B: ["wood"] }, seed: 124 });
  hidden(S, Tn); appear(S, Tn, L(124).start - 0.2);
  [W(124, "vuelve"), W(124, "palus"), W(124, "luna") - 0.2].forEach((t, k) => { strike(S, Tn, t); S.cue(t + 0.04, "hit", 0.6); burst(S, `s124b${k}`, Gx + 200, G - 330, t + 0.05, { n: 6, color: "#c9a06a", spread: 120, up: 90, size: 12, seed: 124 + k, dur: 0.5 }); });
  moonTo(no, W(124, "apaga") - 0.2, "nueva", 1.0);
  tx(S, "s124l", Gx, zG.top, "LA LUNA SE APAGA", W(124, "apaga"), { size: F(84, 72), color: "#c8d0ea", fx: "up" });
  outro(S, 124, Gx);
}

// ======================= 7 · BALANCE (125-133) =======================
export function balance(S) {
  const { F, h, L, W, end } = ctx(S);
  const X0 = 6000;
  const bl = esc(S, "balance", FONDO.balance, X0);
  on(S, "balance", 0);
  const A = X0 + 1100, zA = Z(S, A), sid = `${bl.id}-bal`;
  enter(S, spotBox(S, A));
  const T = who(S, "b0fx", "felix", A - F(780, 400), { g: FX, seed: 125, z: 7 });
  // 125 · ¿buena o mala vida?
  tilt(bl, sid, W(125, "buena"), -10);
  tx(S, "b125b", A - 300, G - F(220, 200), "¿BUENA?", W(125, "buena"), { size: F(76, 66), w: 600, color: "#bff0c0", fx: "pop" });
  tilt(bl, sid, W(125, "mala"), 10);
  tx(S, "b125m", A + 300, G - F(220, 200), "¿MALA?", W(125, "mala"), { size: F(76, 66), w: 600, color: "#ffb4a0", fx: "pop" });
  pose(S, T, W(125, "mala"), { head: 8, brows: 6, mouth: "neutral", armF: -60, foreF: -100 }, 0.3);
  // 126 · lo malo
  gone(S, "#b125b,#b125m", L(126).start - 0.2);
  tilt(bl, sid, W(126, "malo"), 14);
  tx(S, "b126m", A, zA.top - F(40, 40), "LO MALO", W(126, "malo"), { roman: true, size: F(110, 92), color: "#ff8a7a" });
  cards(S, "b126c", A, zA.top + F(150, 170), [["link", "PROPIEDAD", W(126, "propiedad")], ["gavel", "BASURA", W(126, "basura")], ["skull", "20-30 AÑOS", W(126, "veinte")]], { size: F(180, 170), cols: 3, gap: 18 });
  pose(S, T, W(126, "propiedad"), { mouth: "sad", brows: 6, head: 6 }, 0.3);
  // 127 · lo bueno
  gone(S, "#b126m," + all("b126c", 3), L(127).start - 0.2);
  tilt(bl, sid, W(127, "bueno"), -14);
  tx(S, "b127b", A, zA.top - F(80, 190), "LO BUENO", W(127, "bueno"), { roman: true, size: F(110, 92), color: "#bff0c0" });
  cards(S, "b127c", A, zA.top + F(160, 140), [["bowl-food", "COMIDA", W(127, "comida")], ["first-aid", "MÉDICOS", W(127, "médicos")], ["medal", "MAESTROS", W(127, "entrenadores")], ["star", "FAMA", W(127, "fama")], ["trophy", "PREMIOS", W(127, "premios")], ["g:wood", "RUDIS", W(127, "rudis")]], { size: F(160, 150), cols: 3, gap: 14 });
  pose(S, T, W(127, "bueno"), { mouth: "smile", brows: -4, head: 0 }, 0.3);
  // 128 · el dato más fuerte: casi ningún combate acababa en muerte
  gone(S, "#b127b," + all("b127c", 6), L(128).start - 0.2);
  const B = X0 - 800, zB = Z(S, B);
  move(S, L(128).start - 0.4, B, { dur: 1.0 });
  vanish(S, T, L(128).start - 0.3);
  const T2 = who(S, "b128fx", "felix", zB.L, { g: { ...FX, B: ["wood"] }, seed: 128, z: 7 });
  hidden(S, T2); appear(S, T2, L(128).start);
  tx(S, "b128d", zB.cx, zB.cy - F(200, 220), "EL DATO MÁS FUERTE", W(128, "dato"), { roman: true, size: F(96, 78), color: RC.gold });
  bar(S, "b128b", zB.cx, zB.cy + F(40, 20), F(900, 860), { label: "SIN MUERTE", ic: "heartbeat", color: C.green, from: 0, to: 0.8, t: W(128, "mayoría"), dur: 1.2, show: W(128, "mayoría") - 0.3 });
  tx(S, "b128m", zB.cx, zB.cy + F(200, 190), "LA MAYORÍA", W(128, "mayoría") + 0.4, { size: F(76, 68), color: "#bff0c0", fx: "up" });
  // 129 · dos o tres combates al año
  gone(S, "#b128d,#b128b,#b128m", L(129).start - 0.2);
  const mon = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
  const cal = `<div class="lbl" style="font-size:${F(62, 60)}px;margin-bottom:6px">UN AÑO</div><div style="display:grid;grid-template-columns:repeat(${F(6, 4)},${F(110, 120)}px);gap:12px">${mon.map((m, k) => `<div id="b129m${k}" style="height:${F(86, 90)}px;border:5px solid ${C.ink};border-radius:12px;background:#efe3c8;display:flex;align-items:center;justify-content:center;font:700 34px Cinzel;color:${C.ink};position:relative">${m}</div>`).join("")}</div>`;
  box(S, "b129c", zB.cx, zB.cy, F(860, 620), F(380, 520), cal, W(129, "gladiador") - 0.2);
  [[2, W(129, "dos")], [7, W(129, "tres") - 0.2], [10, W(129, "tres") + 0.15]].forEach(([k, t]) => { S.tw(`tl.to("#b129m${k}",{backgroundColor:"${C.ochre}",scale:1.12,duration:0.25,ease:"back.out(2)"},${r3(t)});`); S.cue(t, "pop", 0.7); });
  tx(S, "b129t", zB.cx, zB.cy + F(270, 340), "2 O 3 COMBATES AL AÑO", W(129, "combates"), { size: F(70, 62), fx: "up" });
  // 130 · entrenar, comer cebada y esperar
  gone(S, "#b129c,#b129t", L(130).start - 0.2);
  cards(S, "b130c", zB.cx, zB.cy - F(30, 30), [["barbell", "ENTRENAR", W(130, "entrenar")], ["grains", "CEBADA", W(130, "cebada"), null, "#f3e2b0"], ["hourglass", "ESPERAR", W(130, "esperar")]], { size: F(210, 190), cols: F(3, 2) });
  pose(S, T2, W(130, "esperar"), { ...POSE.brazosCruzados, mouth: "neutral", head: 6 }, 0.3);
  // 131 · hoy: un boxeador profesional; él nunca eligió subir al ring
  gone(S, all("b130c", 3), L(131).start - 0.2);
  const Mo = who(S, "b131mo", "moderno", zB.R, { g: {}, flip: true, seed: 131, z: 7 });
  hidden(S, Mo); appear(S, Mo, W(131, "boxeador") - 0.3);
  pose(S, Mo, W(131, "boxeador"), { armF: -110, foreF: -100, armB: -110, foreB: -100, mouth: "smile" }, 0.3);
  c1(S, "b131b", zB.x + F(60, 0), zB.top, "boxing-glove", "BOXEADOR", W(131, "boxeador"), { size: F(200, 180), bg: "#cfe0f5" });
  tx(S, "b131h", zB.x + F(60, 0), zB.top - F(150, 150), `${HOY} COMPARACIÓN`, W(131, "hoy"), { size: F(66, 60), fx: "pop" });
  gone(S, "#b131b,#b131h", W(131, "solo") - 0.3);
  c1(S, "b131l", zB.x + F(60, 0), zB.top + F(40, 40), "lock", "NO ELIGIÓ", W(131, "eligió"), { size: F(220, 200), bg: "#f0c9c0", mk: false });
  pose(S, T2, W(131, "eligió"), { armF: 0, foreF: 0, armB: 0, foreB: 0, mouth: "sad", brows: 6, head: 8 }, 0.3);
  // 132 · comían cebada, tenían árbitro y eran estrellas del rock
  gone(S, "#b131l,#b131lm", L(132).start - 0.2);
  vanish(S, Mo, L(132).start - 0.2);
  cards(S, "b132c", zB.cx, zB.cy - F(60, 40), [["grains", "CEBADA", W(132, "cebada"), null, "#f3e2b0"], ["hand-palm", "ÁRBITRO", W(132, "árbitro")], ["guitar", "ROCK", W(132, "rock"), null, RC.gold]], { size: F(210, 190), cols: F(3, 2) });
  pose(S, T2, W(132, "rock"), { armF: -60, foreF: -80, armB: -30, foreB: -110, mouth: "open", brows: -6, head: -6 }, 0.25);
  S.tw(`tl.to("#b128fx-foreB",{rotation:-80,svgOrigin:"-30 -228",duration:0.1,yoyo:true,repeat:9},${r3(W(132, "rock") + 0.3)});`);
  sprinkle(S, "b132s", zB.L, G - 720, "star", W(132, "rock") + 0.1, { n: 5, r: F(240, 200) });
  // 133 · y cuando veas un pulgar para abajo en una película, acuérdate de Félix
  gone(S, all("b132c", 3) + "," + all("b132s", 5), L(133).start - 0.2);
  pose(S, T2, L(133).start, { armF: 0, foreF: 0, armB: 0, foreB: 0, mouth: "neutral", brows: 0, head: 0 }, 0.3);
  box(S, "b133p", zB.cx, zB.cy - F(30, 30), F(560, 520), F(330, 320), `${icon("film-slate", { size: 110, color: C.ink })}${icon("thumbs-down", { size: 110, color: "#c0392b" })}<div class="lbl">EN EL CINE</div>`, W(133, "película"));
  pose(S, T2, W(133, "félix"), { mouth: "smile", brows: -6, armB: -150, foreB: -20 }, 0.3);
  S.tw(`tl.to("#b128fx-lidR",{scaleY:1,svgOrigin:"0 -369",duration:0.08},${r3(W(133, "félix") + 0.1)});tl.to("#b128fx-lidR",{scaleY:0,svgOrigin:"0 -369",duration:0.1},${r3(W(133, "félix") + 0.55)});`);
  tx(S, "b133f", zB.cx, zB.cy + F(230, 240), "ACUÉRDATE DE FÉLIX", W(133, "acuérdate"), { size: F(76, 66), color: RC.gold, fx: "up" });
  outro(S, 133, B);
}

// ======================= 8 · CIERRE (134-137) =======================
export function cierre(S) {
  const { F, h, L, W, end } = ctx(S);
  const A = 3000, zA = Z(S, A);
  esc(S, "noche", FONDO.cierre, A);
  on(S, "noche", 0);
  enter(S, spotBox(S, A));
  const T = who(S, "c0fx", "felix", zA.L, { g: { T: ["loin"], H: ["galhair", "mustache", "helmet"], B: ["wood"] }, seed: 134 });
  // 134 · suscríbete y dale a me gusta
  const bx = zA.cx, by = zA.cy - F(120, 120);
  S.add(`<div id="c134s" class="prop" style="left:${bx - 330}px;top:${by - 75}px;width:660px;height:150px;z-index:9;opacity:0;background:#d93a3a;border:7px solid ${C.ink};border-radius:80px;box-shadow:0 10px 0 ${C.ink};display:flex;align-items:center;justify-content:center;gap:20px;font:900 66px Inter;color:#fff">${icon("bell-ringing", { size: 80, color: "#fff" })}SUSCRIBIRSE</div>
    <div id="c134l" class="prop" style="left:${bx - 110}px;top:${by + 120}px;width:220px;height:200px;z-index:9;opacity:0;background:${C.bone};border:7px solid ${C.ink};border-radius:40px;box-shadow:0 10px 0 ${C.ink};display:flex;align-items:center;justify-content:center"><div id="c134li">${icon("thumbs-up", { size: 130, color: "#9aa3ad" })}</div></div>
    <div id="c134c" class="prop" style="left:${bx + 360}px;top:${by + 200}px;z-index:12;opacity:0">${icon("cursor", { size: 110, color: "#fff" })}</div>`);
  const tS = W(134, "suscríbete"), tG = W(134, "gusta");
  pop(S, "#c134s", tS - 0.3);
  S.tw(`tl.fromTo("#c134c",{opacity:0,x:200,y:120},{opacity:1,x:0,y:0,duration:0.4,ease:"power2.out"},${r3(tS - 0.2)});tl.to("#c134c",{x:-200,y:-150,duration:0.3,ease:"power2.inOut"},${r3(tS + 0.15)});tl.to("#c134c",{scale:0.85,duration:0.08,yoyo:true,repeat:1},${r3(tS + 0.45)});`);
  S.cue(tS + 0.45, "click");
  S.tw(`tl.to("#c134s",{backgroundColor:"#7a7f88",duration:0.15},${r3(tS + 0.5)});`);
  pop(S, "#c134l", tG - 0.4);
  S.tw(`tl.to("#c134c",{x:-470,y:90,duration:0.3,ease:"power2.inOut"},${r3(tG - 0.3)});tl.to("#c134li path",{fill:"${C.ochre}",duration:0.15},${r3(tG + 0.05)});`);
  pulse(S, "#c134l", tG + 0.05, 1.25);
  pose(S, T, tS, { armB: -150, foreB: -20, mouth: "smile" }, 0.3);
  // 135 · comenta «gladiador»; ¿mirmillón o reciario?
  gone(S, "#c134s,#c134l,#c134c", L(135).start - 0.2);
  bubble(S, "c135b", bx, zA.cy - F(230, 250), F(720, 700), 160, `${icon("chat-circle-text", { size: 70, color: C.ochreD })}<span id="c135w"></span>`);
  S.tw(`tl.fromTo("#c135b",{opacity:0,y:40},{opacity:1,y:0,duration:0.35,ease:"back.out(1.6)"},${r3(W(135, "comentarios") - 0.2)});`);
  typeOnS(S, "c135w", "GLADIADOR", W(135, "gladiador") - 0.1, 0.6);
  cards(S, "c135c", bx, zA.cy + F(120, 110), [["g:helmet", "MIRMILLÓN", W(135, "mirmillón"), null, "#f3d9c0"], ["g:trident", "RECIARIO", W(135, "reciario"), null, "#cfe3f0"]], { size: F(220, 200), cols: 2, gap: 70 });
  label(S, "c135v", bx, zA.cy + F(120, 110), "VS", { size: 90, color: RC.gold, w: 300 }); pop(S, "#c135v", W(135, "reciario") + 0.2);
  // 136 · mándaselo a tu amigo del gimnasio (no aguantaría ni una semana de palus)
  gone(S, "#c135b,#c135v," + all("c135c", 2), L(136).start - 0.2);
  post(S, "c136p", zA.R + F(-200, -60));
  S.tw(`tl.set("#c136p",{opacity:0},0);tl.to("#c136p",{opacity:1,duration:0.3},${r3(W(136, "gimnasio") - 0.3)});`);
  const Am = who(S, "c136am", "moderno", zA.R - F(560, 260), { g: { B: ["wood"] }, seed: 136 });
  hidden(S, Am); appear(S, Am, W(136, "amigo") - 0.2);
  c1(S, "c136a", bx, zA.top + F(20, 0), "paper-plane-tilt", "PARA TU AMIGO", W(136, "mándaselo"), { size: F(210, 190) });
  gone(S, "#c136a", W(136, "gimnasio") - 0.3);
  c1(S, "c136g", bx, zA.top + F(20, 0), "barbell", "GIMNASIO", W(136, "gimnasio"), { size: F(210, 190), bg: C.ochre });
  pose(S, Am, W(136, "gimnasio"), { armF: -150, foreF: -60, armB: -150, foreB: -60, mouth: "smile", brows: -6 }, 0.3);
  strike(S, Am, W(136, "semana") - 0.2);
  S.tw(`tl.to("#c136am",{rotation:-80,transformOrigin:"50% 100%",x:"-=40",duration:0.45,ease:"power2.in"},${r3(W(136, "palus") - 0.1)});`);
  burst(S, "c136d", zA.R - F(700, 360), G - 20, W(136, "palus") + 0.35, { n: 14, color: "#c9b48e", spread: 220, up: 100, size: 16, seed: 136 });
  shake(S, W(136, "palus") + 0.35, 12, 0.3);
  pose(S, T, W(136, "palus") + 0.3, { mouth: "smile", brows: -6, head: -6 }, 0.3);
  // 137 · nos vemos en el próximo viaje en el tiempo (título final)
  gone(S, "#c136g", L(137).start - 0.2);
  S.tw(`tl.to("#c136am,#c136am-sh,#c136p",{opacity:0,duration:0.3},${r3(L(137).start - 0.1)});`);
  pose(S, T, W(137, "vemos") - 0.2, { armB: -150, foreB: -30, mouth: "smile" }, 0.3);
  S.tw(`tl.to("#c0fx-foreB",{rotation:-60,svgOrigin:"-30 -228",duration:0.16,yoyo:true,repeat:7,ease:"sine.inOut"},${r3(W(137, "vemos") + 0.1)});`);
  S.add(`<div id="c137t" class="card" style="left:${zA.cx - F(700, 480)}px;top:${zA.cy - F(330, 300)}px;width:${F(1400, 960)}px;height:${F(330, 300)}px;background:${RC.marble};border-radius:30px;z-index:9;opacity:0;flex-direction:column">
    <div style="font:900 ${F(70, 56)}px Inter;color:${C.ink};margin-bottom:6px">UN MES EN LA VIDA DE UN</div>
    <div class="roman" style="font-size:${F(160, 116)}px;color:${RC.terra};line-height:1;text-shadow:0 6px 0 ${C.ink}">GLADIADOR</div></div>`);
  pop(S, "#c137t", W(137, "vemos") - 0.1);
  camTo(S, W(137, "tiempo"), spotBox(S, A, 1.25), { dur: Math.max(1.2, end - W(137, "tiempo") - 0.5), ease: "sine.inOut" });
  exit(S, { dur: 0.45 });
}
function typeOnS(S, elId, str, t0, dur) {
  S.cue(t0, "typing");
  S.tw(`(()=>{const o={n:0},el=document.getElementById("${elId}"),s=${JSON.stringify(str)};tl.fromTo(o,{n:0},{n:s.length,duration:${dur},ease:"none",onUpdate:()=>{el.textContent=s.slice(0,Math.round(o.n));}},${r3(t0)});})();`);
}

const wrap = (fn) => (S) => { fn(S); fin(S); };
export const CAPITULOS = [
  { id: "gancho", desde: 1, hasta: 4, build: wrap(gancho) },
  { id: "intro", desde: 5, hasta: 16, build: wrap(intro) },
  { id: "semana1", desde: 17, hasta: 46, build: wrap(semana1) },
  { id: "semana2", desde: 47, hasta: 71, build: wrap(semana2) },
  { id: "semana3", desde: 72, hasta: 103, build: wrap(semana3) },
  { id: "semana4", desde: 104, hasta: 124, build: wrap(semana4) },
  { id: "balance", desde: 125, hasta: 133, build: wrap(balance) },
  { id: "cierre", desde: 134, hasta: 137, build: wrap(cierre) },
];

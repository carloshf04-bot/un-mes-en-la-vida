// «Un mes en la vida de un vikingo» (Vestfold y Hedeby, h. 890): 8 capítulos, 238 frases (guion_visual.md).
// Cada capítulo: enter() → escenarios de 5 capas (vk_fondos.mjs) con cut() → vista general y exit() (outro).
// Todo lo que aparece va en su palabra: say(K, frase, [[tipo, "palabra", …]]) (vk_lib.mjs).
import { C, r3, icon, pose, GEAR, POSE, cloakOf, prop, burst } from "./lib.mjs";
import { enter } from "./fondos.mjs";
import { G, VK, FONDO, gokstad, aboard, shipRow, sailTo, flowersPop, grow, armsUp, curtainOpen, fogTo, museumCase, peacock, fanOpen, mound, atz } from "./vk_fondos.mjs";
import { bigScale, tilt, shade, shadeTo } from "./gl_fondos2.mjs";
import { animal, animalIdle, animalWalk, spotBox, pop, slam, fadeUp, arrow } from "./lib2.mjs";
import { esc, on, fin, outro, semana, HOY, box, gone, sprinkle, tx, appear, hidden } from "./gm_lib.mjs";
import { kit, actorK, say, art, mapa, moonSvg, gearArt } from "./vk_lib.mjs";

const SEPIA = "sepia(.7) saturate(.8) contrast(1.05)";
const DESP = "saturate(.75) hue-rotate(-8deg) brightness(.97)";
const VERDE = "hue-rotate(75deg) saturate(1.25) brightness(.95)";
const SOMBRA = "brightness(.12) contrast(1.2)";
const GEIR = { T: [cloakOf("#2f4f7a")], F: ["swordVk"] };
const HALL = { T: [cloakOf("#6b5a46")], F: ["staff"] };
const ASA = { T: ["smokkr", "keys"], F: ["spindle"] };
const POPPO = { T: [cloakOf("#3a3a44")], F: ["scales"], B: ["purse"] };
const AMB = VK.amber, ROJO = "#ff8a7a", VERDEC = "#bfe8a0";
// Rótulo del nombre de un personaje encima de su cabeza
const nameTag = (K, a, str, w, op = {}) => ["t", w, str, { x: K.A[a].x, y: G - (op.hy || 760) * (op.sc || 1), size: K.F(70, 64), c: AMB, fx: "up", w: K.F(700, 600), dt: op.dt || 0 }];
const vis = (S, sel, t, op = 1, d = 0.4) => S.tw(`tl.to("${sel}",{opacity:${op},duration:${d}},${r3(t)});`);
const hideAt0 = (S, sel) => S.tw(`tl.set("${sel}",{opacity:0},0);`);

// ======================= 1 · GANCHO (1-5) =======================
export function gancho(S) {
  const K = kit(S), { F } = K, A = 3000;
  const P = esc(S, "mar", (P, x) => {
    FONDO.gancho(P, x);
    P.ship = gokstad(P, `${S.id}-ship`, x - F(150, 0), G + 40, { s: F(0.5, 0.4), sail: "up", crew: 7 });
  }, A);
  on(S, "mar", 0); K.x = A;
  enter(S, spotBox(S, A));
  const ship = P.ship, U = actorK(K, "ulf", "ulf", A + F(230, 160), { g: { H: ["capWool"], T: ["cloak"] }, scale: F(0.62, 0.52), flip: true, shadow: false, z: 6, y: G + 10 });
  aboard(S, ship, U);
  const SEL = `#${ship.id}-bk,#${ship.id}-fr,#${U.id}`;
  // 1 · el barco entra por la derecha
  S.tw(`tl.fromTo("${SEL}",{x:${F(2300, 1500)}},{x:0,duration:1.6,ease:"power2.out"},${r3(Math.max(0, K.W(1, "salir") - 0.6))});`);
  S.cue(K.W(1, "salir"), "wind");
  say(K, 1, [["c", [["house", "TECHO", "techo", false], ["compass", "BRÚJULA", "brújula", false], ["toilet", "BAÑO", "baño", false]], { size: F(210, 190) }]]);
  // 2 · dormir en cubierta bajo una piel untada de grasa
  const D = actorK(K, "dorm", "ulf", A + F(420, 260), { g: { T: ["hide"], H: ["capWool"] }, off: ["hide"], scale: 1.1, hid: true, shadow: false, z: 9, y: G - 140 });
  pose(S, D, 0, { body: -90 }, 0.01);
  art(K, `${S.id}-chest`, A + F(150, 0), G - 20, 640, 120, "0 0 640 120", `<rect x="0" y="10" width="640" height="110" rx="10" fill="#8a6232" stroke="${C.ink}" stroke-width="7"/><path d="M80,10 L80,120 M560,10 L560,120" stroke="#5b5f66" stroke-width="10"/>`, { z: 9 });
  say(K, 2, [["cam", "dormir", 0.62, F(150, 0), 60, 0.7], ["in", "dormir", "dorm"], ["f", (T) => { vis(S, `#${S.id}-chest`, T("dormir", -0.1), 1, 0.3); }], ["p", "dormir", "dorm", { mouth: "open" }],
    ["g", "piel", "dorm", "hide"], ["b", "piel", A + F(150, 0), G - 230, { color: "#f0dca0", n: 10, up: 60, dt: 0.3 }], ["t", "piel", "UNTADA DE GRASA", { c: AMB, size: F(76, 70), y: G - F(430, 470), x: A + F(150, 0), fx: "up" }]]);
  // 3 · pagar con plata partida a cachos
  say(K, 3, [["out", "pagar", "dorm", -0.3], ["f", (T) => { vis(S, `#${S.id}-chest`, T("pagar", -0.3), 0, 0.2); }], ["cam", "pagar", 1, 0, 0, 0.6, -0.4],
    ["i", "pagar", "g:hacksilver", "PLATA", null, { size: F(250, 230) }],
    ["f", (T, id, s) => { const x = K.ix(), y = K.sy(s) + 40; art(K, id, x, y, 300, 160, "-150 -80 300 160", `<g id="${id}-a"><path d="M0,-70 A70,70 0 0 0 0,70Z" fill="#dfe4ea" stroke="${C.ink}" stroke-width="6"/></g><g id="${id}-b"><path d="M0,-70 A70,70 0 0 1 0,70Z" fill="#c9ced6" stroke="${C.ink}" stroke-width="6"/></g><path d="M-30,-20 l20,0 M10,10 l24,0" stroke="#8f979f" stroke-width="5"/>`); pop(S, `#${id}`, T("cachos", -0.4)); S.cue(T("cachos"), "silver"); S.tw(`tl.to("#${id}-a",{x:-60,rotation:-18,duration:0.3,ease:"back.out(2)"},${T("cachos")});tl.to("#${id}-b",{x:60,rotation:18,duration:0.3,ease:"back.out(2)"},${T("cachos")});`); return { sel: `#${id}`, s: s + 1 }; }],
    ["t", "cachos", "A CACHOS", { c: AMB, fx: "up", dt: 0.2 }]]);
  // 4-5 · aquí nadie lleva cuernos. Ni uno
  const hh = gearArt(K, `${S.id}-ghost`, "hornHelmet", U.x, G + 10 - F(0.62, 0.52) * 0, F(0.62, 0.52) * 1.15, { op: 0.75, z: 9 });
  say(K, 4, [["t", "nadie", "NADIE LLEVA CASCO", { size: F(80, 70) }], ["f", (T) => { S.tw(`tl.fromTo("${hh}",{opacity:0,y:-80},{opacity:0.85,y:0,duration:0.5,ease:"power2.out"},${T("cuernos", -0.1)});`); S.cue(T("cuernos"), "riser", 0.5); }]]);
  say(K, 5, [["f", (T, id) => { stampXAt(K, id, U.x, G - F(300, 260), F(260, 220), T("uno")); return `#${id},${hh}`; }], ["t", "uno", "0 CUERNOS", { c: ROJO, size: F(130, 110), u: true }], ["shake", "uno", 16]], { keep: true, slot: 1 });
  outro(S, 5, A); fin(S);
}
function stampXAt(K, id, x, y, size, t) {
  K.S.cue(t, "click");
  K.S.add(`<div id="${id}" class="stamp" style="left:${r3(x - size / 2)}px;top:${r3(y - size / 2)}px;width:${size}px;height:${size}px;z-index:10;opacity:0;filter:drop-shadow(0 6px 0 ${C.ink})">${icon("x", { size, color: C.red, weight: "bold" })}</div>`);
  K.S.tw(`tl.fromTo("#${id}",{scale:2.4,opacity:0,rotation:-20},{scale:1,opacity:1,rotation:0,duration:0.3,ease:"power4.out"},${r3(t)});`);
}

// ======================= 2 · INTRO (6-27) =======================
export function intro(S) {
  const K = kit(S), { F, h } = K, A = 3000, A2 = 4300, M = 10000;
  const Pf = esc(S, "fiordo", (P, x) => { FONDO.intro(P, x); P.ship = gokstad(P, `${S.id}-ship`, x + 2050, G + 30, { s: 0.3, sail: "furled", zf: 1, zb: 1 }); }, A);
  esc(S, "mito", FONDO.mito, M);
  hideAt0(S, `#${S.id}-ship-bk,#${S.id}-ship-fr`);
  on(S, "fiordo", 0); K.x = A;
  enter(S, spotBox(S, A, 1.5));
  const U = actorK(K, "ulf", "ulf", 0, { g: { F: ["spade", "silverBag"] }, off: ["silverBag"], hid: true });
  // 6 · Noruega, h. 890
  say(K, 6, [["cam", "Noruega", 1, 0, 0, 1.4], ["t", "ochocientos", "VESTFOLD · NORUEGA<br>h. 890", { c: AMB, size: F(90, 78) }]]);
  // 7 · título
  say(K, 7, [["f", (T, id) => {
    const ty = K.sy(0) + F(90, 110);
    S.add(`<div id="${id}" class="card" style="left:${K.ix() - F(640, 480)}px;top:${ty - F(190, 170)}px;width:${F(1280, 960)}px;height:${F(380, 340)}px;background:#efe6d2;border-radius:30px;z-index:8;opacity:0;flex-direction:column">
      <div style="font:900 ${F(70, 56)}px Inter;color:${C.ink};margin-bottom:8px">UN MES EN LA VIDA DE UN</div>
      <div id="${id}-v" class="uncial" style="font-size:${F(170, 132)}px;color:${VK.madder};line-height:1;text-shadow:0 6px 0 ${C.ink}">VIKINGO</div>
      <svg width="${F(900, 760)}" height="26" viewBox="0 0 900 26" style="margin-top:10px">${[...Array(30)].map((_, k) => `<path d="M${k * 30},13 l15,-11 l15,11 l-15,11Z" fill="${k % 2 ? AMB : "#3f5f7a"}" stroke="${C.ink}" stroke-width="2"/>`).join("")}</svg></div>`);
    pop(S, `#${id}`, T("mes", -0.15));
    S.tw(`tl.fromTo("#${id}-v",{scale:2.4,opacity:0,filter:"blur(10px)"},{scale:1,opacity:1,filter:"blur(0px)",duration:0.3,ease:"power4.in"},${T("vikingo", -0.2)});`);
    S.tw(`tl.to("#${id}",{opacity:0,y:-60,duration:0.4},${r3(K.L(8).end + 0.1)});`);
    return {};
  }], ["shake", "vikingo", 16]]);
  // 8 · bueno, un granjero que se va de vikingo
  say(K, 8, [["in", "granjero", "ulf"], ["p", "granjero", "ulf", { mouth: "smile", armB: -40 }, 0.2], ["t", "granjero", "UN GRANJERO", { y: K.sy(2) + 40, c: VERDEC, fx: "up" }]], { keep: true });
  say(K, 9, [["t", "dato", "DATO RARO", { c: AMB, size: F(120, 100), u: true }], ["p", "dato", "ulf", { brows: -6, mouth: "open" }]]);
  // 10-14 · vikingo no era un pueblo
  say(K, 10, [["cut", "Vikingo", "mito", -0.6], ["c", [["users-three", "UN PUEBLO", "pueblo", false]], { size: F(250, 230) }]]);
  const U2 = actorK(K, "ulf2", "ulf", 0, { g: { T: ["cloak"], B: ["axe"] } });
  say(K, 11, [["t", "víking", "VÍKING = IRSE DE VIAJE<br>POR MAR", { c: AMB }], ["i", "mar", "sailboat", "EXPEDICIÓN", null, { size: F(210, 190) }], ["p", "víking", "ulf2", POSE.mirarLejos]]);
  say(K, 12, [["t", "víkingr", "VÍKINGR = EL QUE SE VA", { c: AMB }], ["f", (T, id) => { arrow(S, id, K.ix() - F(300, 100), K.sy(0) + 80, U2.x + 60, G - 700, T("víkingr", 0.2)); return `#${id}`; }], ["p", "víkingr", "ulf2", { mouth: "smile", armF: -30, foreF: -20 }]]);
  say(K, 13, [["c", [["person", "NORUEGOS", "noruegos"], ["person", "DANESES", "daneses"], ["person", "SUECOS", "suecos"]], { size: F(210, 190), cols: F(3, 2) }]]);
  const MO = actorK(K, "mod", "moderno", 1, { g: { F: [prop("basket", "bk"), "oar"] }, off: ["oar"], hid: true, flip: true });
  say(K, 14, [["in", "vendimia", "mod"], ["t", "vendimia", `${HOY} LA VENDIMIA`, { size: F(78, 68) }], ["G", "remos", "mod", "F0"], ["g", "remos", "mod", "oar"], ["t", "remos", "…PERO CON REMOS", { c: AMB, fx: "up" }], ["p", "remos", "mod", { mouth: "open", brows: -6 }]]);
  // 15-18 · este es Ulf
  say(K, 15, [["cut", "Este", "fiordo", -0.5, A2]]);
  const U3 = actorK(K, "ulf3", "ulf", 0, { g: { F: ["spade", "silverBag"], T: [] }, off: ["silverBag"] });
  const Ws = actorK(K, "lobo", "lobo", 1, { hid: true, scale: 1.1 });
  const Asa = actorK(K, "asa", "asa", 1, { g: ASA, hid: true });
  const Ka = actorK(K, "kari", "kari", A2 - 470, { hid: true, z: 7 });
  const Dg = actorK(K, "perro", "perro", A2 - 900, { hid: true, scale: 0.9 });
  const Gm = actorK(K, "geir", "geirmund", 1, { g: GEIR, off: ["swordVk"], hid: true, flip: true });
  say(K, 15, [["cam", "Ulf", 0.72, F(-640, -330), F(-120, -80), 0.7], ["t", "Ulf", "ULF", { x: U3.x, y: G - F(760, 780), size: F(130, 110), u: true, c: AMB }], ["p", "Ulf", "ulf3", { mouth: "smile", brows: -4 }]], { keep: true });
  const B = `#${S.id}-fiordo-B,#${S.id}-fiordo-W`;
  say(K, 16, [["cam", "existió", 1, 0, 0, 0.7, -0.3], ["f", (T) => { S.tw(`tl.to("#${U3.id}",{opacity:0.35,duration:0.15,yoyo:true,repeat:5},${T("existió")});tl.to("${B}",{filter:"grayscale(1)",duration:0.3},${T("existió")});tl.to("${B}",{filter:"grayscale(0)",duration:0.8},${T("mundo")});`); }],
    ["t", "existió", "NO EXISTIÓ", { c: ROJO }], ["t", "mundo", "SU MUNDO, SÍ", { c: VERDEC }]]);
  say(K, 17, [["in", "lobo", "lobo"], ["t", "lobo", "ÚLFR = LOBO", { c: AMB, size: F(96, 84) }]]);
  say(K, 18, [["out", "Y", "lobo", 0], ["fx", "marea", "ulf3", VERDE], ["wob", "marea", "ulf3", 6, 5], ["p", "marea", "ulf3", POSE.mareo], ["i", "marea", "boat", "SE MAREA", null, { size: F(220, 200) }], ["f", (T, id) => { S.tw(`tl.to("[id^='${S.id}-f18'] svg",{rotation:12,yoyo:true,repeat:5,duration:0.3,transformOrigin:"50% 80%"},${T("barco")});`); }]]);
  // 19-20 · Vestfold, la granja, Ása y Kári
  say(K, 19, [["fx", "Vive", "ulf3", "none"], ["p", "Vive", "ulf3", { head: 0, brows: 0, mouth: "neutral", armF: 0, foreF: 0 }], ["f", (T, id) => mapa(K, id, K.ix(), K.sy(0) + F(270, 280), T("Vestfold", -0.3), [["VESTFOLD", 360, 352, T("Vestfold")], ["OSLO", 410, 290, T("Oslo")]], { regions: [[395, 300, 60, "#3f8ac9", T("Oslo")]], w: F(900, 860) })]]);
  say(K, 20, [["t", "granja", "LA GRANJA", { c: VERDEC }], ["in", "Ása", "asa"], ["p", "Ása", "asa", POSE.hilar], nameTag(K, "asa", "ÁSA", "Ása"),
    ["in", "Kári", "kari"], ["go", "Kári", "kari", A2 - 470, 0.6, true, -0.6], ["in", "Kári", "perro", -0.5], nameTag(K, "kari", "KÁRI · 8 AÑOS", "Kári", { hy: F(900, 860) })]);
  // 21-24 · Kaupang y Geirmund
  say(K, 21, [["out", "Al", "asa", -0.1], ["out", "Al", "kari", -0.1], ["out", "Al", "perro", -0.1], ["t", "Kaupang", "KAUPANG", { u: true, c: AMB, size: F(110, 96) }], ["t", "mercado", "PUERTO DE MERCADO", { size: F(70, 64) }], ["i", "barcos", "sailboat", "BARCOS", null, { size: F(200, 180) }], ["p", "Kaupang", "ulf3", POSE.mirarLejos]]);
  say(K, 22, [["p", "manda", "ulf3", { armF: 0, foreF: 0, head: 0 }], ["in", "Geirmund", "geir"], nameTag(K, "geir", "GEIRMUND", "Geirmund", { hy: 800 }), ["t", "jefe", "EL JEFE LOCAL", { c: AMB }]]);
  say(K, 23, [["g", "espada", "geir", "swordVk"], ["p", "espada", "geir", { armF: -150, foreF: -10, mouth: "smile" }], ["b", "espada", Gm.x + 40, G - 900, { color: "#fff", n: 10 }],
    ["f", (T, id) => { box(S, id, K.ix(), K.sy(1), F(760, 700), F(170, 160), `<div style="font:900 ${F(78, 70)}px Inter;color:${C.ink}">«TENGO PLATA»</div>`, T("tengo", -0.1), { bg: "#c9a06a", fx: "slam" }); return `#${id}`; }]]);
  say(K, 24, [["p", "Y", "geir", { armF: 0, foreF: 0 }], ["f", (T) => { vis(S, `#${S.id}-ship-bk,#${S.id}-ship-fr`, T("barco", -0.2), 1, 0.6); }], ["t", "barco", "UN BARCO", { c: AMB, size: F(110, 96) }], ["cam", "barco", 1.25, 300, 0, 0.9]]);
  // 25-27 · rumbo a Hedeby, con plata y estómago
  say(K, 25, [["cam", "Este", 1, 0, 0, 0.7, -0.2], ["out", "Este", "geir"], ["f", (T, id) => mapa(K, id, K.ix(), K.sy(0) + F(270, 280), T("remar", -0.3), [["KAUPANG", 372, 372, T("remar")], ["HEDEBY", 345, 610, T("Hedeby")]], { routes: [[0, 1, T("Hedeby", -0.3)]], w: F(900, 860) })], ["i", "daneses", "scales", "GRAN MERCADO", null, { size: F(190, 170), y: K.sy(2) + 60 }]]);
  say(K, 26, [["g", "plata", "ulf3", "silverBag"], ["p", "plata", "ulf3", { armF: -70, foreF: -40, mouth: "smile" }], ["b", "plata", U3.x + 60, G - 420, { color: "#dfe4ea", n: 8 }], ["t", "plata", "PLATA", { c: "#dfe4ea", size: F(110, 96) }]]);
  say(K, 27, [["p", "estómago", "ulf3", POSE.mareo], ["fx", "estómago", "ulf3", VERDE], ["sfx", "estómago", "creak"], ["t", "estómago", "…Y ESTÓMAGO", { c: VERDEC }]]);
  outro(S, 27, K.x); fin(S);
}

// ======================= 3 · SEMANA 1 · LUNA NUEVA (28-69) =======================
export function semana1(S) {
  const K = kit(S), { F, h } = K, A = 3000, Bx = 10000, Cx = 16000, Dx = 22000;
  const Pg = esc(S, "granja", FONDO.s1_granja, A);
  esc(S, "casa", (P, x) => { FONDO.s1_dagmal(P, x); const v = animal(P, `${S.id}-vaca`, "vaca", x + 1750, G - 140, { s: 0.95, z: 2 }); animalIdle(P, v, 0, S.t1 - S.t0); }, Bx);
  esc(S, "arroyo", FONDO.s1_sabado, Cx);
  esc(S, "noche", FONDO.s1_noche, Dx);
  hideAt0(S, `#${S.id}-vaca`);
  on(S, "granja", 0); K.x = A;
  enter(S, spotBox(S, A));
  // 28-29 · semana 1, luna nueva
  say(K, 28, [["f", (T, id) => semana(S, id, K.ix(), K.sy(0) + 80, 0, "SEMANA 1", T("Semana"))]]);
  say(K, 29, [["t", "Luna", "LUNA NUEVA", { y: K.sy(2), c: "#c9d4f0" }]], { keep: true });
  const U = actorK(K, "ulf", "ulf", 0, { g: { F: ["spade"], B: ["axe"] }, hid: true });
  // 30-35 · primavera, siembra, saga
  say(K, 30, [["t", "primavera", "PRIMAVERA", { c: VERDEC, size: F(100, 90) }], ["i", "siembra", "plant", "SIEMBRA HECHA", true, { size: F(210, 190) }]]);
  say(K, 31, [["in", "granjero", "ulf"], ["t", "guerrero", "ANTES QUE GUERRERO…", { size: F(74, 66) }], ["t", "granjero", "…GRANJERO", { c: VERDEC, size: F(100, 90) }]]);
  say(K, 32, [["c", [["plant", "SIEMBRA", "siembra"], ["sailboat", "VIAJE", "viaje"], ["grains", "COSECHA", "cosecha"]], { size: F(210, 190), cols: 3 }]]);
  say(K, 33, [["c", [["g:scroll", "SAGA DE LAS<br>ORCADAS", "saga"]], { size: F(260, 240) }], ["t", "siglos", "SIGLO XIII", { c: AMB, size: F(80, 70) }]]);
  say(K, 34, [["t", "primavera", "«VIAJE DE PRIMAVERA»", { c: AMB, size: F(84, 70) }], ["p", "primavera", "ulf", { mouth: "smile", brows: -4 }]]);
  say(K, 35, [["c", [["suitcase", "PUENTE DE MAYO", "puente"], ["g:axe", "CON HACHA", "hacha"]], { size: F(220, 200), cols: 2 }], ["t", "puente", `${HOY}`, { size: F(70, 64), y: K.sy(0) - F(150, 140) }]]);
  // 36-40 · la casa larga
  const LH = `${S.id}-granja-lh`;
  say(K, 36, [["mv", "casa", A + 900, -0.5], ["t", "larga", "CASA LARGA", { c: AMB, y: G - F(860, 1200) }], ["f", (T) => { S.tw(`tl.to("#${LH}-curve",{opacity:1,duration:0.3},${T("curvas")});`); S.cue(T("curvas"), "ok"); }], ["t", "curvas", "PAREDES CURVAS", { y: G - F(860, 1200) + F(130, 130), size: F(72, 64) }],
    ["f", (T, id) => { art(K, id, A + 900, G - F(830, 840), F(1700, 1500), F(400, 360), "-1850 -720 3700 820", `<path d="M-1800,-300 C-900,-215 900,-215 1800,-300 C1700,-120 1000,40 0,50 C-1000,40 -1700,-120 -1800,-300Z" transform="scale(1,-1) translate(0,-420)" fill="none" stroke="${AMB}" stroke-width="22" stroke-dasharray="40 24"/>`, { z: 8 }); S.tw(`tl.fromTo("#${id}",{opacity:0,y:-60},{opacity:1,y:0,duration:0.5},${T("barco", -0.1)});`); return `#${id}`; }]]);
  say(K, 37, [["f", (T) => { S.tw(`tl.to("#${LH}-curve",{opacity:0,duration:0.2},${T("tejado", -0.3)});`); }], ["cam", "tejado", 0.62, 0, F(-430, -330), 0.8], ["t", "tepe", "TEPE = TIERRA CON HIERBA", { x: A + 900, y: G - F(860, 1130), c: VERDEC, size: F(70, 60), w: F(1000, 900) }]]);
  say(K, 38, [["f", (T) => flowersPop(Pg, LH, T("flores", -0.1))], ["t", "flores", "¡FLORES!", { x: A + 900, y: G - F(860, 1130), c: "#f2b4d0", size: F(90, 80) }]]);
  say(K, 39, [["cam", "No", 1, 0, 0, 0.7, -0.3], ["c", [["house-simple", "CHIMENEA", "chimenea", false]], { size: F(230, 210), x: A + 900 + F(0, 0), y: G - F(880, 1200) }]]);
  say(K, 40, [["b", "humo", A + 900 + 165 * 0.85, G - 680, { color: "#b8b8bc", n: 14, up: 220, size: 26, spread: 80 }], ["t", "agujero", "SALE POR UN AGUJERO", { y: G - F(880, 1200), size: F(72, 64) }], ["t", "quiere", "…CUANDO QUIERE", { y: G - F(760, 1080), c: AMB, size: F(72, 64) }]]);
  // 41-47 · dentro: hogar, vacas y comidas
  say(K, 41, [["cut", "En", "casa", -0.6], ["t", "hogar", "HOGAR LARGO", { c: AMB, size: F(100, 90) }]]);
  const U2 = actorK(K, "ulf2", "ulf", 0, { g: { F: ["bowl"], T: ["cloak"] }, off: ["bowl", "cloak"] });
  const Asa = actorK(K, "asa", "asa", 1, { g: ASA, hid: true });
  say(K, 42, [["f", (T) => { vis(S, `#${S.id}-vaca`, T("tabique", -0.1), 1); S.cue(T("tabique"), "pop"); }], ["cam", "fondo", 1, F(1300, 1500), 0, 0.9], ["t", "vacas", "LAS VACAS, DENTRO", { x: Bx + F(1300 + 250, 1500), y: G - F(760, 1150) }]]);
  say(K, 43, [["cam", "dos", 1, 0, 0, 0.8, -0.2], ["n", "dos", 2, " COMIDAS", { bw: F(860, 820) }], ["t", "día", "AL DÍA", { fx: "up" }]]);
  say(K, 44, [["t", "dagmal", "DAGMAL · MAÑANA", { c: AMB }], ["g", "dagmal", "ulf2", "bowl"], ["p", "dagmal", "ulf2", { armF: -60, foreF: -40, mouth: "smile" }], ["t", "trabajo", "TRAS UNAS HORAS DE TRABAJO", { size: F(64, 58) }]]);
  say(K, 45, [["t", "natmal", "NATMAL · NOCHE", { c: "#c9d4f0" }], ["f", (T) => { S.tw(`tl.to("#${S.id}-casa-beam",{opacity:0.15,duration:0.6},${T("natmal")});tl.to("#${S.id}-casa-beam",{opacity:1,duration:0.6},${r3(K.L(46).end)});`); }]]);
  say(K, 46, [["c", [["cooking-pot", "GACHAS", "Gachas"], ["bread", "PAN", "pan"], ["fish", "PESCADO", "pescado"], ["bowl-food", "GUISO", "guiso"]], { size: F(200, 180), cols: F(4, 2) }]]);
  say(K, 47, [["i", "miel", "drop", "MIEL", null, { size: F(250, 230), bg: "#f2c26a" }], ["t", "golosina", "LA ÚNICA GOLOSINA", { y: K.sy(2) + 20, size: F(70, 62) }], ["p", "miel", "ulf2", { mouth: "smile", brows: -6 }]]);
  // 48-50 · la ropa de Ulf y de Ása
  say(K, 48, [["G", "Ulf", "ulf2", "bowl"], ["t", "túnica", "TÚNICA DE LANA", { size: F(76, 68) }], ["f", (T, id) => { arrow(S, id, K.ix() - F(380, 0), K.sy(0) + 40, U2.x + 70, G - 330, T("túnica", 0.1)); return `#${id}`; }], ["t", "botones", "SIN BOTONES", { c: ROJO, size: F(70, 62) }],
    ["g", "capa", "ulf2", "cloak"], ["t", "capa", "CAPA + BROCHE", { c: AMB, size: F(76, 68) }], ["f", (T) => { gone(S, K.prev.join(","), T("broche", -0.35)); K.prev = []; }], ["cam", "broche", 0.5, F(-640, -330) + 30, F(-370, -300), 0.6]]);
  say(K, 49, [["cam", "Ása", 1, 0, 0, 0.6, -0.3], ["in", "Ása", "asa"], ["p", "Ása", "asa", POSE.hilar], ["t", "broches", "2 BROCHES OVALADOS", { c: AMB, size: F(74, 66) }], ["wob", "llaves", "asa", 4, 3], ["t", "llaves", "LAS LLAVES DE LA CASA", { size: F(70, 62) }], ["sfx", "llaves", "silver", 0.6]]);
  say(K, 50, [["cut", "Cuando", "granja", -0.5, A + 300]]);
  const Asa2 = actorK(K, "asa2", "asa", 1, { g: { T: ["smokkr", "keys"] } });
  say(K, 50, [["t", "granja", "LA GRANJA, DE ÁSA", { c: AMB }], ["p", "granja", "asa2", { armF: -60, foreF: -30, mouth: "smile" }]], { keep: true });
  // 51-61 · el gran mito: los «guarros»
  const U3 = actorK(K, "ulf3", "ulf", 0, { hid: true });
  say(K, 51, [["out", "Y", "ulf", -0.1], ["out", "Y", "asa2", -0.1], ["in", "mito", "ulf3", -0.3], ["t", "mito", "EL GRAN MITO", { c: AMB, size: F(120, 100), u: true }]]);
  say(K, 52, [["fx", "guarros", "ulf3", "grayscale(.8) brightness(.85)"], ["f", (T, id) => { sprinkle(S, id, U3.x, G - 520, "bug", T("guarros"), { n: 5, color: "#2a2a2a", size: 60, r: 220, dur: 2 }); return [0, 1, 2, 3, 4].map((i) => `#${id}${i}`).join(","); }], ["t", "guarros", "¿UNOS GUARROS?", { c: "#c9c1b0" }], ["p", "guarros", "ulf3", { mouth: "sad", brows: 6 }]]);
  say(K, 53, [["fx", "realidad", "ulf3", "none"], ["p", "realidad", "ulf3", { mouth: "smile", brows: -4 }], ["t", "realidad", "EN REALIDAD…", { size: F(76, 68) }], ["t", "laugardagr", "LAUGARDAGR = SÁBADO", { c: AMB }]]);
  say(K, 54, [["t", "Significa", "DÍA DE LAVARSE", { c: "#a8d8f0", size: F(100, 88) }]]);
  say(K, 55, [["cut", "Ese", "arroyo", -0.5]]);
  const U4 = actorK(K, "ulf4", "ulf", 0, { g: { F: ["comb", "earspoon"] }, off: ["comb", "earspoon"] });
  say(K, 55, [["b", "arroyo", U4.x + 60, G + 60, { color: "#cfeefa", n: 14, up: 200 }], ["sfx", "arroyo", "waves", 0.5], ["t", "arroyo", "AL ARROYO", { c: "#a8d8f0" }], ["g", "peina", "ulf4", "comb"], ["p", "peina", "ulf4", POSE.peinarse], ["t", "asta", "PEINE DE ASTA", { size: F(72, 64) }]], { keep: true });
  say(K, 56, [["p", "Los", "ulf4", { armF: 0, foreF: 0, head: 0 }], ["c", [["g:comb", "", "peines"], ["g:comb", "", "peines", null, "#e6d2b0"], ["g:comb", "", "peines"]], { size: F(170, 160), cols: 3 }], ["t", "comunes", "DE LO MÁS COMÚN", { c: AMB }]]);
  say(K, 57, [["G", "Y", "ulf4", "comb"], ["i", "cucharillas", "g:earspoon", "CUCHARILLA", null, { size: F(230, 210) }], ["g", "orejas", "ulf4", "earspoon"], ["p", "orejas", "ulf4", { armF: -150, foreF: -120, head: 8, mouth: "smile", brows: -6 }], ["t", "orejas", "PARA LAS OREJAS", { size: F(70, 62) }]]);
  say(K, 58, [["G", "Siglos", "ulf4", "earspoon"], ["p", "Siglos", "ulf4", { armF: 0, foreF: 0, head: 0, mouth: "neutral", brows: 0 }], ["c", [["g:scroll", "CRONISTA INGLÉS", "cronista"]], { size: F(250, 230) }], ["t", "Siglos", "SIGLOS DESPUÉS", { c: AMB, size: F(72, 64), dt: 0.2 }]]);
  say(K, 59, [["c", [["g:comb", "A DIARIO", "peinaban"], ["bathtub", "LOS SÁBADOS", "sábados"]], { size: F(220, 200), cols: 2 }]]);
  say(K, 60, [["g", "Y", "ulf4", "comb"], ["p", "Y", "ulf4", POSE.peinarse], ["f", (T, id) => { sprinkle(S, id, U4.x, G - 560, "heart", T("novias"), { n: 5, color: "#ff6b8a", size: 80, r: 240 }); return [0, 1, 2, 3, 4].map((i) => `#${id}${i}`).join(","); }], ["t", "novias", "LES QUITABAN LAS NOVIAS", { c: "#ffb0c0", size: F(70, 62) }]]);
  const In = actorK(K, "ingles", "remero2", 1, { hid: true, flip: true });
  S.tw(`tl.set("#${In.id}",{filter:"${SOMBRA}"},0);`);
  say(K, 61, [["in", "envidia", "ingles", -0.4], ["b", "envidia", In.x - 40, G - 640, { color: "#9a9aa0", n: 12, up: 160, size: 22 }], ["b", "envidia", In.x + 40, G - 640, { color: "#9a9aa0", n: 12, up: 160, size: 22, seed: 9 }], ["t", "envidia", "ENVIDIA", { c: "#9fe07a", size: F(120, 100), u: true }]]);
  // 62-69 · noche sin luna, armas, Kári
  say(K, 62, [["cut", "Esa", "noche", -0.5], ["t", "noche", "NOCHE SIN LUNA", { c: "#c9d4f0" }]]);
  const U5 = actorK(K, "ulf5", "ulf", 0, { g: { F: ["axe"], B: ["shieldRound"] }, off: ["axe", "shieldRound"] });
  const Ka = actorK(K, "kari", "kari", 1, { hid: true, flip: true });
  say(K, 63, [["g", "hacha", "ulf5", "axe"], ["p", "hacha", "ulf5", { armF: -40, foreF: -30 }], ["g", "escudo", "ulf5", "shieldRound"], ["c", [["g:axe", "HACHA", "hacha"], ["g:shieldRound", "ESCUDO", "escudo"]], { size: F(210, 190), cols: 2 }], ["t", "metro", "≈ 1 METRO", { c: AMB }]]);
  say(K, 64, [["i", "Espada", "sword", "ESPADA", false, { size: F(230, 210) }]]);
  say(K, 65, [["c", [["g:swordVk", "", "cara"], ["coins", "CARÍSIMA", "cara", null, "#f2d68a"]], { size: F(220, 200), cols: 2 }], ["t", "granjero", "NO PARA UN GRANJERO", { size: F(66, 60) }]]);
  say(K, 66, [["in", "Kári", "kari"], ["p", "pregunta", "kari", { head: -8, mouth: "open", brows: 4 }], ["t", "volver", "¿VAS A VOLVER?", { c: "#ffd38a", x: Ka.x, y: G - F(640, 640), size: F(70, 62), w: F(700, 560) }]]);
  say(K, 67, [["p", "contesta", "ulf5", { head: 10, mouth: "sad", brows: 4 }], ["t", "contesta", "…", { size: F(120, 100) }]]);
  say(K, 68, [["p", "mar", "ulf5", { head: -6, look: -3 }], ["cam", "mar", 1.15, -400, 0, 1.2], ["t", "mar", "EL MAR", { c: "#9fc0e0", size: F(100, 90) }]]);
  say(K, 69, [["i", "marea", "waves", "SE MAREA", null, { size: F(230, 210), bg: "#a8d8f0" }], ["sfx", "marea", "waves"], ["shiver", "marea", "ulf5", 0.8], ["p", "marea", "ulf5", { mouth: "open", brows: 6 }], ["fx", "marea", "ulf5", VERDE]]);
  outro(S, 69, K.x); fin(S);
}

// ======================= 4 · SEMANA 2 · MEDIA LUNA (70-110) =======================
export function semana2(S) {
  const K = kit(S), { F, h } = K, A = 3000, Bx = 10000, Cx = 16000, Dx = 22000;
  const Pt = esc(S, "thing", FONDO.s2_thing, A);
  const Pv = esc(S, "varadero", FONDO.s2_varadero, Bx);
  const Pm = esc(S, "tumulo", (P, x) => { FONDO.ins_gokstad(P, x); peacock(P, `${S.id}-pv`, x + F(1050, 450), G, 1.8); }, Cx, { filter: "sepia(.35) saturate(.9)" });
  const Pd = esc(S, "muelle", FONDO.s2_despedida, Dx);
  on(S, "thing", 0); K.x = A;
  enter(S, spotBox(S, A));
  const CR = `${S.id}-thing-cr`;
  // 70-77 · semana 2, el thing
  say(K, 70, [["f", (T, id) => semana(S, id, K.ix(), K.sy(0) + 80, 0.5, "SEMANA 2", T("Semana"))]]);
  say(K, 71, [["t", "luna", "MEDIA LUNA", { y: K.sy(2), c: "#c9d4f0" }]], { keep: true });
  const U = actorK(K, "ulf", "ulf", 0, { g: { T: ["cloak"], F: [prop("spear", `${S.id}-usp`)], B: ["shieldRound"] } });
  const Hv = actorK(K, "hall", "hallvard", A + F(-300, 250), { g: HALL, hid: true, y: G - 130, z: 3, flip: true, shadow: false });
  say(K, 72, [["cam", "thing", 1.35, 0, 0, 1], ["t", "thing", "THING", { u: true, c: AMB, size: F(140, 120), y: G - F(980, 1380) }]]);
  say(K, 73, [["cam", "asamblea", 1, 0, 0, 0.8, -0.3], ["t", "asamblea", "LA ASAMBLEA", { size: F(80, 70) }], ["t", "libres", "DE LOS HOMBRES LIBRES", { c: AMB, size: F(74, 66) }]]);
  say(K, 74, [["c", [["scroll", "LEYES", "leyes"], ["users", "PLEITOS", "pleitos"], ["coins", "MULTAS", "multas"]], { size: F(210, 190), cols: 3 }]]);
  say(K, 75, [["t", "atención", "PERO ATENCIÓN", { c: AMB, size: F(74, 66) }], ["i", "pena", "gavel", "LA PENA", false, { size: F(230, 210) }]]);
  say(K, 76, [["c", [["users-three", "LA FAMILIA", "familia"]], { size: F(240, 220) }], ["t", "ofendido", "DEL OFENDIDO", { size: F(72, 64) }]]);
  say(K, 77, [["p", "ganas", "ulf", POSE.manoAlta], ["c", [["trophy", "GANAS", "ganas", true], ["hand-coins", "Y COBRAS TÚ", "cobrar"]], { size: F(210, 190), cols: 2 }], ["p", "cobrar", "ulf", { armF: -80, foreF: -10, armB: 0, mouth: "sad", brows: 6, head: 6 }]]);
  // 78-83 · Hallvard, el hombre de la ley
  say(K, 78, [["p", "En", "ulf", { armF: 0, foreF: 0, mouth: "neutral", brows: 0, head: 0 }], ["in", "Hallvard", "hall"], ["t", "Hallvard", "HALLVARD", { x: A + F(-300, 250), y: G - F(940, 940), c: AMB, size: F(76, 68), fx: "up", w: F(700, 600) }], ["t", "ley", "EL HOMBRE DE LA LEY", { size: F(76, 68) }]]);
  say(K, 79, [["i", "libros", "book-open", "LIBROS", false, { size: F(230, 210) }]]);
  say(K, 80, [["talk", "sabe", "hall", 2.6], ["p", "memoria", "hall", { armB: -150, foreB: -20, mouth: "open" }], ["t", "memoria", "DE MEMORIA", { c: AMB, size: F(100, 88) }], ["t", "alto", "Y EN ALTO", { size: F(72, 64) }]]);
  say(K, 81, [["i", "chuleta", "note", "CHULETA", false, { size: F(230, 210) }], ["t", "todos", "DELANTE DE TODOS", { size: F(70, 62), y: K.sy(2) + 40 }]]);
  const W1 = actorK(K, "m1", "asa", A + F(1100, 520), { g: { T: ["smokkr"] }, hid: true, flip: true, scale: 1.15 });
  say(K, 82, [["p", "Las", "hall", { armB: 0, foreB: 0, mouth: "neutral" }], ["in", "mujeres", "m1"], ["cam", "mujeres", 1, F(250, 200), 0, 0.7], ["c", [["eye", "MIRAN", "miran"], ["check-square", "NO VOTAN", "votan", false]], { size: F(200, 180), cols: 2, x: K.ix() - F(250, 0) }]]);
  say(K, 83, [["cam", "Y", 1, 0, 0, 0.7, -0.2], ["out", "Y", "m1"], ["t", "dato", "OTRO DATO RARO", { c: AMB, size: F(110, 96), u: true }]]);
  // 84-88 · vápnatak
  const F1 = actorK(K, "lu1", "remero1", A + F(80, -20), { g: { F: [prop("spear", `${S.id}-lsp`)], B: ["shieldRound"] }, hid: true, scale: 1.2 });
  const F2 = actorK(K, "lu2", "remero2", A + F(420, 330), { g: { F: ["axe"], B: ["shieldRound"] }, hid: true, flip: true, scale: 1.2 });
  const clash = (t, k) => { for (const a of [F1, F2]) { pose(S, a, r3(t - 0.18), { armF: -150, foreF: -20 }, 0.14, "power2.out"); pose(S, a, t, { armF: -60, foreF: -10 }, 0.08, "power4.in"); pose(S, a, r3(t + 0.3), { armF: -20, foreF: -10 }, 0.2); }
    burst(S, `${S.id}-cl${k}`, A + F(250, 155), G - 330, t, { n: 12, color: "#ffe9a8", spread: 130, up: 140, size: 13, seed: 20 + k }); S.cue(t, "clank"); };
  say(K, 84, [["in", "Siglos", "lu1"], ["in", "Siglos", "lu2"], ["f", (T) => clash(T("armas", 0.15), 0)], ["t", "Siglos", "SIGLOS DESPUÉS, LAS LEYES CUENTAN…", { size: F(70, 62) }], ["f", (T) => armsUp(Pt, CR, T("armas", -0.1))], ["p", "armas", "ulf", POSE.vapnatak], ["sfx", "armas", "clank"], ["t", "armas", "…QUE SE CHOCABAN LAS ARMAS", { c: AMB, size: F(70, 62) }]]);
  say(K, 85, [["f", (T) => { clash(T("vápnatak", 0.2), 1); clash(T("armas", 0.1), 2); }], ["t", "vápnatak", "VÁPNATAK", { u: true, c: AMB, size: F(130, 110) }], ["t", "armas", "= TOMAR LAS ARMAS", { size: F(76, 68) }]]);
  say(K, 86, [["i", "mano", "hand-palm", "LEVANTAR LA MANO", false, { size: F(230, 210) }]]);
  say(K, 87, [["f", (T) => { for (let k = 0; k < 3; k++) clash(T("Hierro", k * 0.42), 3 + k); }], ["t", "madera", "HIERRO CONTRA MADERA", { size: F(80, 70) }],
    ["f", (T, id, s) => { box(S, id, K.ix(), K.sy(s) + 30, F(640, 600), F(170, 160), `<div style="font:900 ${F(90, 80)}px Inter;color:#fff;letter-spacing:4px">APROBADO</div>`, T("aprobado"), { bg: C.greenD, fx: "slam" }); return { sel: `#${id}`, s: s + 1 }; }], ["shake", "aprobado", 12]]);
  say(K, 88, [["out", "Como", "lu1", -0.2], ["out", "Como", "lu2", -0.2], ["p", "Como", "ulf", { armF: 0, foreF: 0, mouth: "neutral" }], ["c", [["chalkboard-teacher", "EN CLASE", "clase"], ["g:axe", "CON HACHA", "hacha"]], { size: F(220, 200), cols: 2 }], ["t", "clase", `${HOY}`, { size: F(70, 62), y: K.sy(0) - F(150, 140) }]]);
  // 89-91 · Geirmund pide remeros
  const Gm = actorK(K, "geir", "geirmund", A + F(-300, 250), { g: GEIR, hid: true, y: G - 130, z: 3, flip: true, shadow: false });
  say(K, 89, [["out", "Geirmund", "hall", -0.3], ["in", "Geirmund", "geir"], ["c", [["g:oar", "SE BUSCAN<br>REMEROS", "remeros"]], { size: F(260, 240) }], ["talk", "avisa", "geir", 1.6]]);
  say(K, 90, [["p", "apunta", "ulf", POSE.manoAlta], ["t", "apunta", "¡YO!", { c: AMB, x: U.x, y: G - F(820, 840), size: F(110, 96), w: F(500, 400) }]]);
  say(K, 91, [["p", "arrepiente", "ulf", { armF: 0, foreF: 0, mouth: "sad", brows: 6, head: 8 }], ["fx", "arrepiente", "ulf", VERDE], ["t", "acto", "…Y SE ARREPIENTE", { c: VERDEC }]]);
  // 92-97 · el varadero y el barco de Gokstad
  say(K, 92, [["cut", "En", "varadero", -0.5], ["t", "varadero", "EL VARADERO DE KAUPANG", { size: F(72, 64), y: G - F(1000, 1250) }], ["cam", "barco", 1.2, 300, 0, 1]]);
  const U2 = actorK(K, "ulf2", "ulf", 0, { g: { H: ["capWool"] } });
  say(K, 93, [["cam", "Es", 1, 0, 0, 0.7, -0.3], ["t", "Gokstad", "BARCO DE GOKSTAD", { c: AMB, size: F(84, 74) }], ["f", (T, id, s) => mapa(K, id, K.ix(), K.sy(1) + F(170, 160), T("Vestfold", -0.3), [["VESTFOLD", 360, 352, T("Vestfold")]], { w: F(620, 640) })]]);
  say(K, 94, [["i", "madera", "tree", "LA MADERA", null, { size: F(220, 200) }], ["t", "ochocientos", "CORTADA h. 890", { c: AMB }]]);
  say(K, 95, [["n", "Treinta", 32, "", { size: F(170, 150), bw: F(500, 480) }], ["t", "remos", "REMOS", { c: AMB, size: F(90, 80) }], ["sfx", "remos", "oar"]]);
  const SHV = `${S.id}-varadero-sh`;
  say(K, 96, [["f", (T) => { S.tw(`tl.to("#${SHV}-tl",{strokeWidth:30,duration:0.3},${T("Tablas")});tl.to("#${SHV}-tl",{strokeWidth:0,duration:0.3},${T("vela", -0.2)});`); }], ["c", [["stack", "TABLAS SOLAPADAS", "Tablas"], ["sailboat", "VELA CUADRADA", "vela"], ["g:oar", "TIMÓN", "remo"]], { size: F(200, 180), cols: F(3, 2) }]]);
  say(K, 97, [["i", "Camarotes", "bed", "CAMAROTES", false, { size: F(240, 220) }], ["p", "ninguno", "ulf2", { mouth: "sad", brows: 6 }]]);
  // 98-103 · el túmulo de Gokstad
  const MO = `${S.id}-tumulo-mo`;
  say(K, 98, [["cut", "Pocos", "tumulo", -0.5], ["t", "Pocos", "POCOS AÑOS DESPUÉS", { c: AMB, dt: 0.4, y: G - F(1000, 1250) }], ["f", (T) => { vis(S, `#${MO}-cut`, T("barco", -0.1), 1); vis(S, `#${MO}-top`, T("montículo"), 1, 0.8); S.cue(T("montículo"), "impact", 0.6); }], ["cam", "barco", 0.85, 200, 0, 0.8]]);
  say(K, 99, [["cam", "Con", 1, 0, 0, 0.7, -0.3], ["n", "caballos", 12, " CABALLOS", { bw: F(900, 860), size: F(120, 100) }], ["c", [["dog", "PERROS", "perros"], ["squares-four", "TABLERO", "tablero"]], { size: F(190, 170), cols: 2 }], ["f", (T) => { vis(S, `#${S.id}-pv`, T("pavos", -0.2), 1, 0.3); fanOpen(S, `${S.id}-pv`, T("pavos")); S.cue(T("pavos"), "pop"); }]]);
  say(K, 100, [["pulse", "Pavos", `#${S.id}-pv`], ["t", "Pavos", "PAVOS REALES", { c: "#7fd0c0", size: F(110, 96) }], ["cam", "Pavos", 0.8, F(800, 400), 0, 0.6]]);
  say(K, 101, [["b", "Noruega", Cx + F(1050, 450), G - 500, { color: "#fff", n: 18, up: -60, spread: 300, size: 16, dur: 1.6 }], ["b", "Noruega", Cx + F(850, 300), G - 560, { color: "#fff", n: 14, up: -40, spread: 300, size: 14, dur: 1.6, seed: 4 }], ["t", "Noruega", "EN NORUEGA", { c: "#e8f2f8", x: Cx + F(1050, 300), y: G - F(860, 900), size: F(84, 74) }]]);
  say(K, 102, [["cam", "Nadie", 1, 0, 0, 0.6, -0.2], ["i", "Nadie", "question", "¿QUIÉN ERA?", null, { size: F(240, 220) }]]);
  say(K, 103, [["c", [["bandaids", "CORTES EN<br>LAS PIERNAS", "cortes"], ["knife", "DE ARMAS", "armas"]], { size: F(210, 190), cols: 2 }]]);
  // 104-110 · la despedida
  say(K, 104, [["cut", "Llega", "muelle", -0.5], ["t", "tarde", "LA TARDE DE LA PARTIDA", { c: "#ffd0c0" }]]);
  const SHD = `${S.id}-muelle-sh`;
  for (let k = 0; k < 16; k++) S.tw(`tl.set("#${SHD}-sh${k}",{opacity:0},0);`);
  const U3 = actorK(K, "ulf3", "ulf", 0, { g: { H: ["capWool"], T: ["cloak"], F: ["stockfish"], B: ["furRoll"] }, off: ["stockfish", "furRoll"] });
  const As = actorK(K, "asa", "asa", 1, { g: { T: ["smokkr", "keys"], F: ["furRoll"] }, flip: true, hid: true });
  const Ka = actorK(K, "kari", "kari", F(Dx - 1500, Dx - 700), { hid: true });
  const Dg = actorK(K, "perro", "perro", F(Dx - 1800, Dx - 950), { hid: true, scale: 0.9 });
  say(K, 105, [["cam", "escudos", 1.15, 900, 0, 0.8, -0.4], ["f", (T) => { S.tw(`tl.to("[id^='${SHD}-sh']",{opacity:1,duration:0.15,stagger:0.09},${T("escudos")});`); for (let k = 0; k < 5; k++) S.cue(T("escudos", k * 0.3), "wood", 0.4); }], ["t", "amarillos", "AMARILLOS Y NEGROS", { c: AMB, y: G - F(1080, 1350), x: K.x + 900 }]]);
  say(K, 106, [["cam", "Ása", 1, 0, 0, 0.7, -0.3], ["in", "Ása", "asa"], ["p", "Ása", "asa", { armF: -70, foreF: -30, mouth: "smile" }], ["G", "pescado", "asa", "furRoll", -0.6], ["g", "pescado", "ulf3", "furRoll", -0.6], ["g", "pescado", "ulf3", "stockfish"], ["c", [["g:furRoll", "PIEL", "piel"], ["g:stockfish", "PESCADO SECO", "pescado"]], { size: F(200, 180), cols: 2 }]]);
  say(K, 107, [["in", "Kári", "kari"], ["in", "Kári", "perro"], ["go", "Kári", "kari", F(Dx - 300, Dx + 300), 1.4, true, 0], ["f", (T) => { const D = K.A.perro; S.tw(`tl.to("#${D.id},#${D.id}-sh",{x:"+=${F(1200, 1000)}",duration:1.4,ease:"none"},${T("Kári")});`); }], ["t", "muelle", "POR EL MUELLE", { size: F(70, 62) }]]);
  say(K, 108, [["out", "Ulf", "asa"], ["out", "Ulf", "kari"], ["out", "Ulf", "perro"], ["p", "agua", "ulf3", { head: 10, look: 3 }], ["cam", "agua", 0.85, F(-640, -330), 0, 0.8], ["t", "agua", "EL AGUA", { c: "#9fc0e0", size: F(96, 86), x: U3.x + F(500, 0), y: G - F(760, 900) }]]);
  say(K, 109, [["f", (T, id) => { art(K, id, U3.x + 150, G + 120, 520, 140, "0 0 520 140", [0, 1, 2].map((k) => `<ellipse id="${id}-r${k}" cx="260" cy="70" rx="${80 + k * 80}" ry="${20 + k * 20}" fill="none" stroke="#e8f2f8" stroke-width="6"/>`).join(""), { z: 9 }); S.tw(`tl.fromTo("#${id}",{opacity:0},{opacity:1,duration:0.3},${T("mirada", -0.3)});tl.fromTo("#${id} ellipse",{scale:0.3,transformOrigin:"50% 50%"},{scale:1.2,duration:1.2,stagger:0.2,repeat:1},${T("mirada", -0.3)});`); return `#${id}`; }], ["t", "mirada", "…Y LE DEVUELVE LA MIRADA", { c: "#9fc0e0", size: F(70, 62), x: U3.x + F(500, 0), y: G - F(760, 900) }]]);
  say(K, 110, [["cam", "lobo", 0.45, F(-640, -330), F(-450, -380), 0.7], ["t", "lobo", "EL LOBO…", { x: U3.x, y: G - F(860, 920), size: F(80, 70), w: F(600, 520) }], ["p", "saliva", "ulf3", { head: 6, brows: 6, mouth: "sad" }], ["f", (T) => { S.tw(`tl.fromTo("#${U3.id}-head",{y:0},{y:10,duration:0.15,yoyo:true,repeat:3},${T("saliva")});`); S.cue(T("saliva"), "gulp"); }]]);
  outro(S, 110, Dx); fin(S);
}

// ======================= 5 · SEMANA 3 · LUNA LLENA (111-159) =======================
export function semana3(S) {
  const K = kit(S), { F, h } = K, A = 3000, Bx = 10000, Cx = 17000, Dx = 23000, Ex = 29000;
  const Pa = esc(S, "mar", FONDO.s3_mar_dia, A);
  const Pn = esc(S, "noche", FONDO.s3_noche_mar, Bx);
  const Pr = esc(S, "niebla", FONDO.s3_remo, Cx);
  const Ps = esc(S, "schlei", FONDO.s3_schlei, Dx);
  const Pe = esc(S, "atlantico", FONDO.atlantico, Ex, { filter: "sepia(.35)" });
  on(S, "mar", 0); K.x = A;
  enter(S, spotBox(S, A));
  const shA = Pa.ship;
  const deck = G - 20;
  const U = actorK(K, "ulf", "ulf", A - F(300, 250), { g: { H: ["capWool"], F: ["stockfish"] }, off: ["stockfish"], shadow: false, y: deck });
  const Gm = actorK(K, "geir", "geirmund", A + F(1000, 430), { g: { T: [cloakOf("#2f4f7a")] }, shadow: false, y: deck, flip: false });
  const R1 = actorK(K, "r1", "remero1", A - 900, { g: { H: ["capWool"] }, shadow: false, y: deck, flip: true });
  [U, Gm, R1].forEach((a) => aboard(S, shA, a));
  say(K, 111, [["f", (T, id) => semana(S, id, K.ix(), K.sy(0) + 80, 1, "SEMANA 3", T("Semana"))]]);
  say(K, 112, [["t", "Luna", "LUNA LLENA", { y: K.sy(2), c: "#f4ecd2" }]], { keep: true });
  // 113-117 · cuánto se tarda: Óttar
  say(K, 113, [["f", (T, id) => mapa(K, id, K.ix(), K.sy(0) + F(270, 280), T("Rumbo", -0.2), [["KAUPANG", 372, 372, T("Rumbo")], ["HEDEBY", 345, 610, T("Hedeby")]], { routes: [[0, 1, T("Rumbo"), 1.6]], w: F(860, 840) })]]);
  say(K, 114, [["i", "sabemos", "question", "¿CUÁNTO SE TARDA?", null, { size: F(230, 210) }]]);
  const Ot = actorK(K, "ottar", "remero1", K.ix() - F(160, 200), { hid: true, shadow: false, y: G - F(150, 520), scale: 1.0, z: 8, flip: true });
  const Al = actorK(K, "alfredo", "remero2", K.ix() + F(260, 200), { g: { H: ["crown"] }, hid: true, shadow: false, y: G - F(150, 520), scale: 1.0, z: 8 });
  S.tw(`tl.set("#${Ot.id},#${Al.id}",{filter:"${SOMBRA}"},0);`);
  say(K, 115, [["f", (T, id, s) => { box(S, id, K.ix(), F(G - 470, G - 860), F(1000, 900), F(720, 700), "", T("navegante", -0.3), { bg: "rgba(30,24,40,.55)", z: 7 }); return `#${id}`; }], ["in", "navegante", "ottar"], ["t", "navegante", "UN NAVEGANTE NORUEGO", { size: F(70, 62) }]]);
  say(K, 116, [["t", "Óttar", "ÓTTAR · h. 890", { c: AMB, size: F(84, 74) }], ["in", "Alfredo", "alfredo"], ["t", "Alfredo", "REY ALFREDO", { c: "#ffd38a", size: F(70, 62), y: K.sy(2) }], ["t", "Inglaterra", "INGLATERRA", { size: F(66, 60), y: K.sy(2) + F(90, 90) }]], { keep: true, slot: 1 });
  say(K, 117, [["out", "De", "ottar", -0.3], ["out", "De", "alfredo", -0.3], ["f", (T, id) => mapa(K, id, K.ix(), K.sy(0) + F(220, 230), T("Kaupang", -0.3), [["KAUPANG", 372, 372, T("Kaupang")], ["HEDEBY", 345, 610, T("Hedeby")]], { routes: [[0, 1, T("Hedeby", 0.1)]], w: F(760, 720) })], ["f", (T, id) => { tx(S, id, K.ix(), K.sy(0) + F(220, 230) + 0.35 * F(760, 720) + F(135, 120), "5 DÍAS", T("cinco"), { size: F(130, 110), color: AMB }); return `#${id}`; }]]);
  gone(S, `[id^='${S.id}-f115']`, r3(K.L(117).start - 0.3));
  // 118-126 · sorpresas: sin brújula, sin comida caliente
  say(K, 118, [["t", "sorpresa", "PRIMERA SORPRESA", { c: AMB, size: F(84, 74) }], ["i", "brújula", "compass", "BRÚJULA", false, { size: F(230, 210) }]]);
  say(K, 119, [["cam", "costa", 1.3, 0, 0, 1], ["t", "costa", "VIENDO LA COSTA", { y: G - F(1200, 1600), size: F(90, 80) }], ["t", "tierra", "TIERRA ↑", { c: VERDEC, y: G - F(1060, 1460), x: K.x - F(500, 250), size: F(84, 74), w: 700 }], ["t", "mar", "MAR ↓", { c: "#9fc0e0", y: G - F(130, 150), x: K.x + F(450, 250), size: F(84, 74), w: 600 }], ["p", "costa", "ulf", POSE.mirarLejos]]);
  say(K, 120, [["cam", "Y", 1, 0, 0, 0.8, -0.3], ["p", "Y", "ulf", { armF: 0, foreF: 0, head: 0 }], ["i", "piedra", "diamond", "¿PIEDRA SOLAR?", null, { size: F(240, 220), bg: "#fff3c4" }], ["t", "sagas", "DE LAS SAGAS", { size: F(66, 60) }]]);
  say(K, 121, [["f", (T, id) => { box(S, id, K.ix(), K.sy(1), F(820, 760), F(170, 160), `<div style="font:900 ${F(76, 68)}px Inter;color:#fff">NO ENCONTRADA</div>`, T("Nunca"), { bg: C.redD, fx: "slam" }); return `#${id}`; }], ["shake", "Nunca", 10]]);
  say(K, 122, [["t", "Segunda", "SEGUNDA SORPRESA", { c: AMB, size: F(84, 74) }], ["i", "caliente", "flame", "COMIDA CALIENTE", false, { size: F(230, 210) }]]);
  say(K, 123, [["c", [["fish", "PESCADO SECO", "Pescado"], ["grains", "HARINA", "harina"], ["cheese", "MANTEQUILLA", "mantequilla"], ["bread", "PAN", "pan"], ["bowl-food", "GACHAS", "gachas"]], { size: F(180, 170), cols: 3 }]]);
  say(K, 124, [["i", "carne", "fork-knife", "CARNE ASADA", null, { size: F(240, 220), bg: "#f2c26a" }], ["t", "lujo", "= UN LUJO", { c: AMB, size: F(90, 80) }]]);
  say(K, 125, [["c", [["scroll", "SAGAS", "sagas"], ["sailboat", "BARCOS ENTERRADOS", "barcos"]], { size: F(210, 190), cols: 2 }]]);
  say(K, 126, [["t", "dos", `${HOY} 2007 · UNA RÉPLICA`, { size: F(72, 64) }], ["n", "litros", 1000, " L DE AGUA", { from: 0, bw: F(1000, 940), size: F(110, 92) }], ["i", "litros", "drop", "", null, { size: F(160, 150), bg: "#a8d8f0" }]]);
  // 127-131 · el pescado seco y el mareo
  say(K, 127, [["g", "muerde", "ulf", "stockfish", -0.3], ["p", "muerde", "ulf", { armF: -110, foreF: -80, mouth: "open" }], ["cam", "muerde", 0.6, -F(300, 250), -F(300, 260), 0.6]]);
  say(K, 128, [["sfx", "Cruje", "creak"], ["shake", "Cruje", 8], ["t", "Cruje", "¡CRAC!", { c: AMB, x: U.x + F(450, 0), y: G - F(820, 960), size: F(120, 100), w: F(600, 500) }], ["c", [["sneaker", "COMO UNA SUELA", "suela"]], { size: F(200, 180), x: U.x + F(450, 0), y: G - F(560, 1180) }]]);
  say(K, 129, [["cam", "minutos", 1, 0, 0, 0.6], ["G", "minutos", "ulf", "stockfish"], ["fx", "minutos", "ulf", VERDE], ["p", "minutos", "ulf", { body: -20, head: 16, mouth: "open", brows: 6 }], ["b", "borda", U.x - 200, G - 100, { color: "#cfeefa", n: 14, up: 200 }], ["t", "borda", "POR LA BORDA", { c: VERDEC }]]);
  say(K, 130, [["p", "Lobo", "ulf", { body: 0, head: 6 }], ["i", "Lobo", "paw-print", "LOBO", true, { size: F(220, 200) }]], {});
  say(K, 131, [["i", "mar", "waves", "DE MAR", false, { size: F(220, 200), bg: "#a8d8f0" }]], { keep: true, slot: 1 });
  // 132-135 · la noche fondeados
  say(K, 132, [["cut", "Por", "noche", -0.5], ["t", "camas", "NO HAY CAMAS", { c: "#c9d4f0" }]]);
  const dk = G - 250;
  const ch = (x) => art(K, `${S.id}-ch${x}`, x, G - 140, 560, 110, "0 0 560 110", `<rect x="0" y="10" width="560" height="100" rx="10" fill="#6b4a2e" stroke="${C.ink}" stroke-width="6"/>`, { z: 8 });
  const sleepers = [Bx - F(300, 160), Bx + F(450, 420)].map((x, i) => { ch(x - 230); const a = actorK(K, `d${i}`, i ? "remero1" : "ulf", x, { g: { T: ["hide"], H: ["capWool"] }, off: ["hide"], shadow: false, y: dk, z: 9, scale: 1.05, live: true }); pose(S, a, 0, { body: -90 }, 0.01); return a; });
  S.tw(`tl.set("#${S.id}-ch${Bx - F(300, 160) - 230},#${S.id}-ch${Bx + F(450, 420) - 230}",{opacity:1},0);`);
  say(K, 133, [["g", "pieles", "d0", "hide"], ["g", "pieles", "d1", "hide", 0.2], ["b", "grasa", Bx, dk - 200, { color: "#f0dca0", n: 10, up: 60 }], ["t", "grasa", "UNTADAS DE GRASA", { c: AMB, size: F(74, 66) }], ["t", "saco", `${HOY} UN SACO DE DORMIR`, { size: F(70, 62) }]]);
  say(K, 134, [["b", "pringoso", Bx - 200, dk - 120, { color: "#e8c870", n: 14, up: -40, spread: 300, dur: 1.2 }], ["t", "pringoso", "PRINGOSO", { c: "#e8c870", size: F(110, 96), u: true }]]);
  say(K, 135, [["t", "luna", "LUNA LLENA", { c: "#f4ecd2", size: F(84, 74) }], ["f", (T, id) => { sprinkle(S, id, Bx, dk - 300, "moon-stars", T("ronca"), { n: 3, color: "#c9d4f0", size: 70, r: 200 }); tx(S, `${id}z`, Bx, G - F(700, 860), "Z Z Z", T("ronca"), { size: F(110, 96), color: "#c9d4f0", fx: "up" }); return `#${id}0,#${id}1,#${id}2,#${id}z`; }], ["sfx", "ronca", "snore"]]);
  say(K, 136, [["t", "Cuarto", "DÍA 4", { c: AMB, size: F(130, 110), u: true }]]);
  // 137-151 · la niebla
  say(K, 137, [["cut", "Al", "niebla", -0.5], ["t", "niebla", "NIEBLA", { c: "#ffffff", size: F(120, 100), u: true }]]);
  const shR = Pr.ship;
  const U2 = actorK(K, "ulf2", "ulf", Cx - F(300, 250), { g: { H: ["capWool"] }, shadow: false, y: G - 20 });
  const G2 = actorK(K, "geir2", "geirmund", Cx + F(1000, 430), { g: { T: [cloakOf("#2f4f7a")] }, shadow: false, y: G - 20 });
  const R2 = actorK(K, "r2", "remero2", Cx - 900, { g: { H: ["capWool"] }, shadow: false, y: G - 20, flip: true });
  [U2, G2, R2].forEach((a) => aboard(S, shR, a));
  say(K, 138, [["f", (T) => { sailTo(Pr, shR, T("vela"), "slack"); }], ["cam", "vela", 1.3, 0, 0, 0.9], ["t", "muerta", "LA VELA CUELGA", { y: G - F(1300, 1650) }]]);
  say(K, 139, [["cam", "Geirmund", 1, 0, 0, 0.7, -0.3], ["talk", "manda", "geir2", 1.0], ["f", (T) => shipRow(Pr, shR, T("remos", -0.2), K.L(151).end)], ["p", "remos", "ulf2", POSE.remar], ["p", "remos", "r2", POSE.remar], ["sfx", "remos", "oar"], ["t", "remos", "¡A LOS REMOS!", { c: AMB }]]);
  say(K, 140, [["cam", "peor", 0.75, -900, 0, 2.2, 0], ["t", "peor", "LO PEOR…", { c: ROJO, x: Cx - 900 + F(300, 0), y: G - F(760, 1000), size: F(90, 80), w: F(800, 700) }]]);
  say(K, 141, [["f", (T) => fogTo(Pr, T("borra", -0.4), 0.85, 1.2)], ["t", "costa", "LA COSTA SE BORRA", { x: Cx - 900 + F(300, 0), y: G - F(760, 1000), size: F(80, 70), w: F(900, 760) }]]);
  const z0 = Cx - 900 + F(300, 0);
  say(K, 142, [["i", "tierra", "mountains", "TIERRA", false, { size: F(220, 200), x: z0, y: G - F(700, 1000) }]]);
  say(K, 143, [["i", "sol", "sun", "SOL", false, { size: F(220, 200), x: z0, y: G - F(700, 1000) }]]);
  say(K, 144, [["f", (T) => fogTo(Pr, T("nada", -0.3), 0.97, 0.8)], ["t", "nada", "NADA", { x: z0, y: G - F(700, 1000), size: F(150, 130), c: "#5a6a78", u: true }]]);
  say(K, 145, [["f", (T, id) => { const sz = F(240, 220); S.add(`<div id="${id}" class="card" style="left:${z0 - sz / 2}px;top:${G - F(700, 1000) - sz / 2}px;width:${sz}px;height:${sz}px;background:${C.bone};z-index:9;opacity:0">${icon("compass", { size: sz * 0.7, color: C.ink })}</div>`); pop(S, `#${id}`, T("rumbo", -0.3)); S.tw(`tl.to("#${id} svg",{rotation:1080,duration:2.2,ease:"none"},${T("rumbo", -0.2)});`); return `#${id}`; }], ["t", "costa", "SIN COSTA, NO HAY RUMBO", { x: z0, y: G - F(450, 760), size: F(66, 60), w: F(900, 760) }]]);
  say(K, 146, [["cam", "Geirmund", 1, 0, 0, 0.8, -0.3], ["p", "callar", "geir2", POSE.silencio], ["t", "callar", "¡SSSH!", { c: AMB, x: G2.x, y: G - F(860, 880), size: F(110, 96), w: 500 }], ["i", "olas", "waves", "OLAS EN LAS ROCAS", null, { size: F(210, 190), bg: "#a8d8f0" }], ["sfx", "olas", "waves", 0.5]]);
  say(K, 147, [["p", "rema", "geir2", { armF: 0, foreF: 0 }], ["p", "tientas", "ulf2", { ...POSE.remar, brows: 6, mouth: "sad" }], ["fx", "garganta", "ulf2", VERDE], ["t", "tientas", "A TIENTAS", { size: F(80, 70) }], ["t", "garganta", "EL ESTÓMAGO EN LA GARGANTA", { c: VERDEC, size: F(64, 58) }]]);
  say(K, 148, [["f", (T) => { shadeTo(Pr, T("final", -0.2), 1, 0.6); shadeTo(Pr, r3(K.L(148).end + 0.5), 0, 0.4); }], ["t", "final", "¿ES EL FINAL?", { c: ROJO, size: F(120, 100) }]]);
  say(K, 149, [["sfx", "chillido", "gull"], ["t", "chillido", "¡IIIIH!", { c: "#ffffff", size: F(130, 110) }]]);
  say(K, 150, [["f", (T, id) => { const gl = `<path d="M2,18 Q14,2 28,16 Q42,2 54,18" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M2,18 l5,-6 M54,18 l-5,-6" stroke="#1e1e24" stroke-width="6" stroke-linecap="round"/>`; for (let k = 0; k < 2; k++) { art(K, `${id}g${k}`, Cx + 900, G - F(900, 1150) + k * 120, 180, 84, "0 0 56 26", gl, { z: 13 }); S.tw(`tl.fromTo("#${id}g${k}",{opacity:1,x:${F(1300, 800)}},{opacity:1,x:${-F(2400, 1700)},duration:2.6,ease:"none"},${T("Gaviotas", k * 0.25 - 0.2)});tl.fromTo("#${id}g${k}",{scaleY:1},{scaleY:0.4,duration:0.22,yoyo:true,repeat:11},${T("Gaviotas", -0.2)});`); } return `#${id}g0,#${id}g1`; }], ["t", "Gaviotas", "¡GAVIOTAS!", { c: "#ffffff", size: F(110, 96) }], ["p", "Gaviotas", "ulf2", { head: -10, mouth: "open", brows: -6 }]]);
  say(K, 151, [["f", (T) => fogTo(Pr, T("juncos", -0.3), 0.6, 0.8)], ["t", "juncos", "JUNCOS", { c: VERDEC, size: F(110, 96) }], ["sfx", "juncos", "wind", 0.4]]);
  // 152-155 · el Schlei
  say(K, 152, [["f", (T) => fogTo(Pr, T("niebla", -0.2), 0, 0.8)], ["cut", "orillas", "schlei", -0.6], ["t", "orillas", "ORILLAS BAJAS Y VERDES", { c: VERDEC, size: F(76, 66) }]]);
  const shS = Ps.ship;
  const U3 = actorK(K, "ulf3", "ulf", Dx - F(300, 250), { g: { H: ["capWool"] }, shadow: false, y: G - 20 });
  aboard(S, shS, U3);
  say(K, 153, [["t", "Schlei", "SCHLEI", { u: true, c: AMB, size: F(130, 110) }], ["f", (T, id) => { arrow(S, id, K.ix() - F(300, 300), K.sy(1) + 60, K.ix() + F(400, 300), K.sy(1) + 40, T("Hedeby", -0.2), { bend: 0.1 }); tx(S, `${id}t`, K.ix(), K.sy(2), "HACIA HEDEBY", T("Hedeby"), { size: F(70, 62), fx: "up" }); return `#${id},#${id}t`; }], ["p", "Hedeby", "ulf3", POSE.mirarLejos]]);
  say(K, 154, [["t", "Quinto", "DÍA 5", { c: AMB, size: F(130, 110), u: true }], ["ok", "Quinto", { size: F(170, 150), x: K.ix() + F(260, 230) }], ["p", "Quinto", "ulf3", { armF: 0, foreF: 0, head: 0, mouth: "smile" }]]);
  say(K, 155, [["i", "Óttar", "user", "ÓTTAR ACERTÓ", true, { size: F(230, 210) }]]);
  // 156-159 · por si dudas: la copia que cruzó el Atlántico
  say(K, 156, [["t", "barcos", "SIGLOS DESPUÉS…", { c: AMB, size: F(90, 80) }]]);
  say(K, 157, [["cut", "copia", "atlantico", -0.6], ["t", "copia", "UNA COPIA DEL BARCO", { size: F(76, 66), dt: 0.3 }], ["t", "Atlántico", "CRUZÓ EL ATLÁNTICO", { c: "#9fc0e0", size: F(84, 74) }]]);
  say(K, 158, [["i", "semanas", "calendar-blank", "≈ 4 SEMANAS", null, { size: F(240, 220) }]]);
  say(K, 159, [["f", (T, id) => { const ph = [0, 0.5, 1, -0.5], r = F(70, 64); art(K, id, K.ix(), K.sy(0) + 100, F(900, 760), F(200, 180), `-${r * 7} -${r + 20} ${r * 14} ${r * 2 + 40}`, ph.map((p, i) => `<g id="${id}m${i}" transform="translate(${(i - 1.5) * r * 3.2},0)">${moonSvg(p, r)}</g>`).join(""), { z: 9 }); S.tw(`tl.set("#${id}",{opacity:1},${T("mes", -0.4)});tl.fromTo("#${id} g[id]",{scale:0,opacity:0,transformOrigin:"50% 50%"},{scale:1,opacity:1,duration:0.3,stagger:0.12,ease:"back.out(2)"},${T("mes", -0.4)});`); return `#${id}`; }], ["t", "lunar", "UN MES LUNAR", { c: "#f4ecd2", y: K.sy(2) }]]);
  outro(S, 159, K.x); fin(S);
}

// ======================= 6 · SEMANA 4 · LUNA MENGUANTE (160-205) =======================
export function semana4(S) {
  const K = kit(S), { F, h } = K, A = 3000, Bx = 9000, Cx = 15000, Dx = 21000, Ex = 27000, Fx = 33000, Gx = 39000;
  esc(S, "puerto", FONDO.s4_puerto, A);
  esc(S, "calle", FONDO.s4_mercado, Bx);
  const Pp = esc(S, "plata", (P, x) => { FONDO.s4_plata(P, x); bigScale(P, `${S.id}-bs`, x + F(820, 0), G); }, Cx);
  esc(S, "esclavos", FONDO.s4_esclavos, Dx);
  esc(S, "ansgario", FONDO.s4_ansgario, Ex, { filter: SEPIA });
  esc(S, "museo", (P, x) => { FONDO.ins_museo(P, x); museumCase(P, `${S.id}-cr`, x + F(-300, 0), "craneo", "SUECIA<br>800-1050"); }, Fx);
  esc(S, "noche", FONDO.s4_noche, Gx, { filter: "brightness(.62) saturate(.7) hue-rotate(8deg)" });
  on(S, "puerto", 0); K.x = A;
  enter(S, spotBox(S, A));
  const U = actorK(K, "ulf", "ulf", 0, { g: { T: ["cloak"], B: ["axe"] }, y: G - 20 });
  const W1 = actorK(K, "c1", "remero1", 1, { g: { F: ["bundle"] }, y: G - 20, flip: true });
  // 160-165 · Hedeby
  say(K, 160, [["f", (T, id) => semana(S, id, K.ix(), K.sy(0) + 80, -0.5, "SEMANA 4", T("Semana"))]]);
  say(K, 161, [["t", "Luna", "LUNA MENGUANTE", { y: K.sy(2), c: "#c9d4f0" }]], { keep: true });
  say(K, 162, [["t", "Hedeby", "HEDEBY", { u: true, c: AMB, size: F(150, 130) }], ["cam", "Hedeby", 1.3, 300, 0, 1.2]]);
  say(K, 163, [["t", "mercados", "UNO DE LOS MAYORES MERCADOS", { size: F(74, 66) }], ["t", "vikinga", "DE LA ÉPOCA VIKINGA", { c: AMB, size: F(70, 62) }]]);
  say(K, 164, [["cam", "Hoy", 1, 0, 0, 0.7, -0.3], ["f", (T, id, s) => { box(S, id, K.ix(), K.sy(0) + 60, F(900, 860), F(280, 270), `<div style="font:900 ${F(64, 60)}px Inter;color:${C.ink}">${HOY}</div><div style="font:900 ${F(64, 58)}px Inter;color:${C.ink};text-align:center;line-height:1.05">PATRIMONIO DE LA HUMANIDAD · 2018</div>`, T("Patrimonio", -0.1), { bg: "#e8eef4", fx: "slam" }); return { sel: `#${id}`, s: 2 }; }]]);
  say(K, 165, [["n", "mil", 1000, "-1.500", { bw: F(860, 820), size: F(120, 100) }], ["t", "personas", "PERSONAS", { fx: "up" }], ["f", (T, id) => { arrow(S, id, K.ix() - F(300, 100), K.sy(2) + 40, U.x + 80, G - 700, T("Ulf")); tx(S, `${id}t`, K.ix(), K.sy(2) + 40, "ULF, DE PASO", T("Ulf"), { size: F(70, 62), color: AMB, fx: "up" }); return `#${id},#${id}t`; }]]);
  // 166-170 · la calle
  say(K, 166, [["cut", "Calles", "calle", -0.5], ["t", "Calles", "CALLES DE TABLONES", { size: F(76, 68), dt: 0.3 }], ["t", "arroyo", "UN ARROYO ENTABLADO", { size: F(70, 62), c: "#9fc0e0" }], ["t", "talleres", "TALLERES", { c: AMB }]]);
  const U2 = actorK(K, "ulf2", "ulf", 0, { g: { T: ["cloak"], B: ["axe"] } });
  const Po = actorK(K, "poppo", "poppo", 1, { g: POPPO, hid: true, flip: true });
  say(K, 167, [["c", [["g:comb", "PEINES", "Peines"], ["circles-three", "CUENTAS", "cuentas"], ["hammer", "HERREROS", "herreros"]], { size: F(200, 180), cols: 3 }], ["sfx", "herreros", "hammer"]]);
  say(K, 168, [["f", (T, id) => { S.add(`<div id="${id}" class="prop" style="left:${K.x - 2000}px;top:${G - 1600}px;width:4000px;height:1700px;z-index:9;opacity:0;background:radial-gradient(ellipse at 40% 60%,rgba(150,145,140,.85),rgba(150,145,140,0) 70%)"></div>`); S.tw(`tl.fromTo("#${id}",{opacity:0,x:-600},{opacity:1,x:0,duration:0.9},${T("humo", -0.2)});`); return `#${id}`; }], ["t", "humo", "Y HUMO", { c: "#ddd", size: F(110, 96) }]]);
  say(K, 169, [["p", "Mucho", "ulf2", { head: 12, body: 6, mouth: "open", brows: 6 }], ["shiver", "Mucho", "ulf2", 1.2], ["t", "Mucho", "MUCHO HUMO", { c: "#ddd", size: F(100, 90) }], ["sfx", "Mucho", "cough"]], { keep: true, slot: 1 });
  say(K, 170, [["p", "Ulf", "ulf2", { head: 0, body: 0, mouth: "neutral", brows: 0 }], ["in", "Poppo", "poppo"], nameTag(K, "poppo", "POPPO · FRISÓN", "Poppo", { hy: 780 }), ["t", "mercader", "UN MERCADER", { c: AMB }], ["t", "frisón", "DE FRISIA<br>(HOY, PAÍSES BAJOS)", { size: F(66, 60) }]]);
  say(K, 171, [["t", "dato", "EL DATO MÁS RARO", { c: AMB, size: F(100, 88), u: true }]]);
  say(K, 172, [["i", "monedas", "coins", "NO SE CUENTAN", null, { size: F(240, 220), bg: "#f2d68a" }], ["x", "monedas", { dt: 0.2 }]]);
  // 173-181 · la plata se pesa
  say(K, 173, [["cut", "pesan", "plata", -0.6], ["t", "pesan", "SE PESAN", { c: AMB, size: F(130, 110), u: true, dt: 0.3 }]]);
  const Po2 = actorK(K, "poppo2", "poppo", F(Cx - 300, Cx + 160), { g: POPPO, flip: true });
  const U3 = actorK(K, "ulf3", "ulf", F(Cx - 640, Cx - 330), { g: { T: ["cloak"], F: ["bundle", "hacksilver"] }, off: ["bundle", "hacksilver"] });
  say(K, 174, [["p", "platillos", "poppo2", POSE.pesar], ["sfx", "platillos", "silver", 0.6], ["t", "platillos", "PLATILLOS DE BRONCE", { size: F(70, 62) }], ["t", "pesas", "Y PESAS", { c: AMB, size: F(80, 70) }]]);
  say(K, 175, [["c", [["coin", "MONEDAS", "Monedas"], ["circle-notch", "JOYAS", "joyas"], ["rectangle", "LINGOTES", "lingotes"]], { size: F(190, 170), cols: 3 }], ["sfx", "cachos", "silver"], ["b", "cachos", Cx + F(380, 0), G - F(800, 1210), { color: "#dfe4ea", n: 16, size: 14 }], ["f", (T) => { vis(S, `[id^='${S.id}-bs']`, T("platillo", -0.4), 1, 0.3); tilt(S, `${S.id}-bs`, T("platillo"), 8); }]]);
  say(K, 176, [["t", "plata", "PLATA PICADA", { c: "#dfe4ea", size: F(120, 100), u: true }]]);
  say(K, 177, [["c", [["map-pin", "DE AQUÍ", "dónde"], ["map-pin", "DE ALLÁ", "venga"], ["map-pin", "DE LEJOS", "plata"]], { size: F(170, 160), cols: 3 }]]);
  say(K, 178, [["f", (T) => tilt(S, `${S.id}-bs`, T("pesa"), 0)], ["t", "pesa", "SOLO IMPORTA EL PESO", { c: AMB, size: F(80, 70) }]]);
  say(K, 179, [["f", (T, id) => mapa(K, id, K.ix(), K.sy(0) + F(240, 260), T("este", -0.3), [["HEDEBY", 345, 610, T("este")], ["ESTE", 930, 420, T("este", 0.2)]], { routes: [[1, 0, T("este", 0.3)]], w: F(820, 760) })], ["i", "dírhams", "coin", "DÍRHAM ÁRABE", null, { size: F(170, 160), bg: "#e8eef4", y: K.sy(2) + F(120, 90) }]]);
  say(K, 180, [["c", [["bread", "EL PAN", "pan"], ["scissors", "UN CACHO DE PULSERA", "pulsera"]], { size: F(200, 180), cols: 2 }], ["t", "Imagina", `${HOY} IMAGINA…`, { size: F(70, 62) }]]);
  say(K, 181, [["g", "cambia", "ulf3", "bundle"], ["p", "cambia", "ulf3", { armF: -70, foreF: -20 }], ["G", "plata", "ulf3", "bundle", -0.3], ["g", "plata", "ulf3", "hacksilver"], ["p", "plata", "ulf3", { armF: -60, foreF: -50, mouth: "smile" }], ["b", "plata", U3.x + 60, G - 420, { color: "#dfe4ea", n: 8 }], ["t", "puñado", "UN PUÑADO DE PLATA", { c: "#dfe4ea" }]]);
  // 182-191 · esclavos (sin bromas)
  say(K, 182, [["cut", "muelle", "esclavos", -0.6], ["t", "cosa", "OTRA COSA", { c: "#c9d0d6" }]]);
  const Th = actorK(K, "esclava", "thrall", 1, { g: { F: ["shackle"] }, hid: true, flip: true });
  say(K, 183, [["in", "Personas", "esclava"], ["t", "Personas", "PERSONAS", { c: "#e6e8ec", size: F(110, 96) }], ["p", "Personas", "esclava", { head: 8, mouth: "sad", brows: 5 }]]);
  say(K, 184, [["t", "Esclavos", "ESCLAVOS", { c: "#e6e8ec", size: F(84, 74), x: Dx + F(170, 0), y: G - F(760, 820), w: F(700, 640) }], ["cam", "Esclavos", 0.7, F(-310, 0), F(-120, -120), 0.7], ["sfx", "Esclavos", "chain"]]);
  say(K, 185, [["cam", "Según", 1, 0, 0, 0.7, -0.3], ["t", "Museo", "MUSEO NACIONAL<br>DE DINAMARCA", { size: F(70, 62) }], ["t", "importantes", "UNA DE LAS COSAS MÁS VENDIDAS", { c: "#c9d0d6", size: F(62, 56) }]]);
  say(K, 186, [["f", (T, id) => mapa(K, id, K.ix(), K.sy(0) + F(270, 280), T("capturaban", -0.2), [["EUROPA DEL ESTE", 860, 560, T("Este")], ["ISLAS BRITÁNICAS", 50, 430, T("británicas")]], { regions: [[860, 560, 140, "#c9707a", T("Este")], [60, 500, 110, "#c9707a", T("británicas")]], w: F(900, 860) })]]);
  say(K, 187, [["c", [["hand-grabbing", "ROBAR", "robar"], ["knife", "MATAR", "matar"]], { size: F(210, 190), cols: 2 }], ["t", "castigo", "COMO CASTIGO", { c: "#c9d0d6" }]]);
  say(K, 188, [["f", (T, id) => mapa(K, id, K.ix(), K.sy(0) + F(200, 220), T("Birka", -0.3), [["BIRKA", 640, 330, T("Birka")]], { w: F(720, 700) })], ["c", [["g:shackle", "GRILLETES", "grilletes"]], { size: F(200, 180), y: K.sy(2) + F(90, 60) }]]);
  say(K, 189, [["c", [["person", "ESCLAVO", "esclavo", null, "#c9d0d6"], ["person", "LIBRE", "libre", null, "#cfe8c6"]], { size: F(210, 190), cols: 2 }], ["t", "menos", "VALÍA MUCHO MENOS", { c: "#c9d0d6", size: F(70, 62) }]]);
  say(K, 190, [["t", "expertos", "SEGÚN MUCHOS EXPERTOS", { size: F(70, 62) }], ["f", (T, id) => { sprinkle(S, id, K.ix(), K.sy(1) + 60, "coin", T("dírhams"), { n: 5, color: "#dfe4ea", size: 80, r: 200 }); return [0, 1, 2, 3, 4].map((i) => `#${id}${i}`).join(","); }], ["t", "esclavos", "SE PAGÓ POR ESCLAVOS", { c: "#c9d0d6", y: K.sy(2) }]]);
  say(K, 191, [["p", "chiste", "esclava", { head: 0, look: 0, mouth: "neutral", brows: 2 }], ["cam", "chiste", 0.6, F(-310, 0), F(-250, -200), 1.0], ["t", "chiste", "AQUÍ NO HAY CHISTE", { c: "#e6e8ec", x: K.x + F(-310, 0), y: G - F(860, 950), size: F(70, 62), w: F(760, 760) }]]);
  // 192-193 · Ansgario (sepia, el pasado)
  say(K, 192, [["cut", "Hace", "ansgario", -0.5]]);
  const An = actorK(K, "ans", "remero1", 1, { g: { T: [cloakOf("#4a3a2a")], F: ["staff"] }, hid: true, flip: true });
  say(K, 192, [["t", "cuarenta", "HACIA EL 850<br>(40 AÑOS ANTES DE ULF)", { c: AMB, size: F(76, 66) }], ["in", "Ansgario", "ans"], ["t", "Ansgario", "SAN ANSGARIO", { size: F(76, 68) }], ["t", "iglesia", "UNA IGLESIA", { c: AMB, size: F(70, 62) }]]);
  say(K, 193, [["p", "rescataba", "ans", { armF: -80, foreF: -20, mouth: "smile" }], ["c", [["link-break", "RESCATABA CAUTIVOS", "cautivos"]], { size: F(230, 210) }], ["t", "biógrafo", "SEGÚN SU BIÓGRAFO", { size: F(66, 60) }]]);
  // 194-198 · dientes limados (en Suecia)
  say(K, 194, [["t", "otro", "OTRO DATO RARO…", { c: AMB, size: F(84, 74) }], ["cut", "lugar", "museo", -0.3], ["t", "lugar", "EN SUECIA", { c: "#e6e8ec", size: F(110, 96), dt: 0.5 }]]);
  say(K, 195, [["cam", "Suecia", 1, 0, 0, 0.6], ["t", "Suecia", "SUECIA Y DINAMARCA", { size: F(72, 64) }], ["n", "quinientos", 557, " ESQUELETOS", { bw: F(1000, 940), size: F(110, 92) }]]);
  say(K, 196, [["n", "Veinticuatro", 24, " HOMBRES", { bw: F(860, 820), size: F(120, 100), y: G - F(800, 1150) }], ["t", "dientes", "DIENTES LIMADOS", { c: AMB, x: Fx + F(-300, 0), y: G - F(960, 1000), size: F(64, 58), w: F(800, 700) }], ["cam", "dientes", 0.9, F(-150, 0), F(-60, -60), 0.7],
    ["f", (T, id) => { const w = F(540, 340), h = F(580, 380);
      box(S, id, K.ix() + F(120, 0), F(G - 400, G - 520), w, h, `<svg viewBox="-110 -130 220 260" width="${w - 60}" height="${h - 60}"><path d="M-70,-110 C-80,-20 -60,60 -40,120 L-20,120 L0,40 L20,120 L40,120 C60,60 80,-20 70,-110 C40,-128 -40,-128 -70,-110Z" fill="#f4ecd8" stroke="${C.ink}" stroke-width="8"/>${[-40, -12, 16, 44].map((x) => `<path d="M${x},-112 L${x - 6},-60" stroke="#9e3a2a" stroke-width="9" stroke-linecap="round"/>`).join("")}<path d="M-50,-90 C-48,-40 -46,0 -40,30" stroke="#fff" stroke-width="7" opacity=".6" fill="none"/></svg><div style="font:900 ${F(40, 38)}px Inter;color:${C.ink}">SURCOS LIMADOS</div>`, T("dientes", 0.2), { bg: "#e8eef4", z: 9 }); return `#${id}`; }]]);
  const U4 = actorK(K, "ulf4", "ulf", 0, { g: { T: ["cloak"] }, hid: true });
  say(K, 197, [["cam", "Ulf", 1, 0, 0, 0.6, -0.3], ["in", "Ulf", "ulf4"], ["p", "tiene", "ulf4", { mouth: "smile", brows: -6 }], ["i", "tiene", "smiley", "ULF NO", true, { size: F(220, 200) }]]);
  say(K, 198, [["f", (T, id) => { const a = actorK(K, "lima", "remero2", F(Fx + 330, Fx + 330), { g: { F: ["file"] }, hid: true, flip: true }); S.tw(`tl.set("#${a.id}",{filter:"${SOMBRA}"},0);`); appear(S, a, T("alguien", -0.2)); return `#${a.id}`; }], ["i", "idea", "question", "¿BUENA IDEA?", null, { size: F(220, 200) }]]);
  // 199-205 · la noche de los cuernos
  say(K, 199, [["cut", "Esa", "noche", -0.5]]);
  const Gm = actorK(K, "geir", "geirmund", 1, { g: { T: [cloakOf("#2f4f7a")], F: ["hornDrink"] }, flip: true });
  const U5 = actorK(K, "ulf5", "ulf", 0, { g: { T: ["cloak"], F: ["hornDrink"] }, off: ["hornDrink"] });
  say(K, 199, [["p", "invita", "geir", { armF: -120, foreF: -40, mouth: "smile" }], ["t", "beber", "¡A BEBER!", { c: AMB, size: F(100, 88) }]], { keep: true });
  say(K, 200, [["g", "cuernos", "ulf5", "hornDrink"], ["p", "cuernos", "ulf5", { armF: -90, foreF: -40, mouth: "smile" }], ["t", "cuernos", "EN CUERNOS", { c: AMB, size: F(110, 96) }]]);
  say(K, 201, [["t", "mito", "OTRO MITO", { c: AMB, size: F(110, 96), u: true }], ["i", "cráneo", "skull", "BEBER EN CRÁNEOS", false, { size: F(220, 200) }]]);
  say(K, 202, [["c", [["student", "ERUDITO DANÉS", "erudito"]], { size: F(200, 180) }], ["t", "Siglos", "SIGLO XVII", { c: AMB, size: F(66, 60), y: K.sy(0) - F(140, 130) }],
    ["f", (T, id, s) => { box(S, id, K.ix(), K.sy(s) + 10, F(1000, 920), F(180, 180), `<div style="font:900 ${F(54, 50)}px Inter;color:${C.ink};text-align:center;line-height:1.1">«LAS RAMAS CURVAS<br>DE LOS <span id="${id}-k">CRÁNEOS</span>»</div>`, T("ramas", -0.1), { bg: "#efe3c8" }); S.tw(`tl.to("#${id}-k",{color:"${VK.amber}",duration:0.2},${T("cuernos")});`); return { sel: `#${id}`, s: s + 1 }; }], ["t", "cuernos", "= CUERNOS PARA BEBER", { c: AMB, size: F(70, 62) }]]);
  say(K, 203, [["c", [["cow", "VACA", "animal"], ["g:hornDrink", "CUERNO", "cuernos"]], { size: F(210, 190), cols: 2 }], ["t", "cráneo", "LOS CUERNOS SALEN DEL CRÁNEO", { size: F(62, 56) }]]);
  say(K, 204, [["i", "letra", "skull", "AL PIE DE LA LETRA", null, { size: F(230, 210) }], ["p", "letra", "ulf5", { brows: 6, mouth: "open" }]]);
  say(K, 205, [["c", [["g:hornDrink", "CUERNOS", "cuernos"], ["wine", "COPAS", "copas"], ["brandy", "VASOS", "vasos"]], { size: F(200, 180), cols: 3 }], ["p", "cuernos", "ulf5", { mouth: "smile", brows: 0 }]]);
  outro(S, 205, K.x); fin(S);
}

// ======================= 7 · BALANCE (206-232) =======================
export function balance(S) {
  const K = kit(S), { F, h } = K, A = 3000, Bx = 10000, Cx = 16000, Dx = 23000;
  const Pb = esc(S, "granja", (P, x) => { FONDO.balance(P, x); bigScale(P, `${S.id}-bs`, x + F(1500, 0) + F(-1300, 0), G); }, A);
  esc(S, "volga", FONDO.ins_volga, Bx, { filter: DESP });
  esc(S, "museo", (P, x) => { FONDO.ins_museo(P, x); museumCase(P, `${S.id}-vb`, x + F(-300, 0), "viborg", "VIBORG<br>1018-1030"); museumCase(P, `${S.id}-gj`, x + 2500 + F(-300, 0), "gjermundbu", "GJERMUNDBU<br>SIGLO X"); museumCase(P, `${S.id}-vk`, x + 5000 + F(-300, 0), "veksoe", "VEKSØ<br>h. 900 a. C."); }, Cx);
  esc(S, "opera", FONDO.ins_1876, Dx);
  on(S, "granja", 0); K.x = A;
  enter(S, spotBox(S, A));
  const U = actorK(K, "ulf", "ulf", 0, { g: { T: ["cloak"], B: ["shieldRound"], F: ["backpack"] }, off: ["backpack"] });
  const As = actorK(K, "asa", "asa", 1, { g: { T: ["smokkr", "keys"], F: ["hacksilver"] }, hid: true, flip: true });
  // 206-211
  say(K, 206, [["t", "Cinco", "5 DÍAS DESPUÉS", { c: AMB, size: F(100, 88) }], ["t", "Kaupang", "DE VUELTA EN KAUPANG", { size: F(70, 62) }]]);
  say(K, 207, [["f", (T) => { S.tw(`tl.to("#${S.id}-world",{rotation:1.2,duration:0.5,yoyo:true,repeat:5,ease:"sine.inOut",transformOrigin:"50% 80%"},${T("tierra")});tl.to("#${S.id}-world",{rotation:0,duration:0.3},${T("tierra", 3.1)});`); }], ["wob", "tierra", "ulf", 6, 6], ["p", "tierra", "ulf", POSE.mareo], ["t", "moviendo", "EL SUELO SE SIGUE MOVIENDO", { c: VERDEC, size: F(66, 60) }]]);
  say(K, 208, [["p", "Ása", "ulf", { head: 0, armF: 0, foreF: 0, mouth: "smile", brows: 0 }], ["in", "Ása", "asa"], ["i", "cuenta", "hash", "NO LA CUENTA", false, { size: F(220, 200) }]]);
  say(K, 209, [["f", (T) => { vis(S, `[id^='${S.id}-bs']`, T("pesa", -0.4), 1, 0.3); tilt(S, `${S.id}-bs`, T("pesa", 0.1), -10); S.cue(T("pesa"), "silver"); }], ["p", "pesa", "asa", { armF: -80, foreF: -30, mouth: "smile" }], ["t", "pesa", "LA PESA", { c: AMB, size: F(120, 100), u: true }], ["cam", "pesa", 1.15, 0, 0, 0.8]]);
  say(K, 210, [["cam", "ahora", 1, 0, 0, 0.6, -0.3], ["f", (T, id) => { tx(S, `${id}m`, K.ix() - F(300, 240), K.sy(0) + 40, "LO MALO", T("malo"), { size: F(90, 76), color: ROJO }); tx(S, `${id}b`, K.ix() + F(300, 240), K.sy(0) + 40, "LO BUENO", T("bueno"), { size: F(90, 76), color: VERDEC }); return `#${id}m,#${id}b`; }]]);
  say(K, 211, [["t", "malo", "LO MALO", { c: ROJO, size: F(80, 70) }], ["i", "higiene", "hand-soap", "LA HIGIENE COMPARTIDA", null, { size: F(220, 200) }]]);
  // 212-216 · el Volga, 921
  say(K, 212, [["cut", "Treinta", "volga", -0.5]]);
  const Fa = actorK(K, "fad", "fadlan", 0, { g: { F: ["scroll"] }, hid: true });
  const Ru = actorK(K, "rus", "rus", 1, { g: { T: ["tattoo"], F: ["basin"] }, off: ["basin"], hid: true, flip: true });
  say(K, 212, [["t", "Volga", "921 · RÍO VOLGA", { c: AMB, size: F(90, 80) }], ["t", "Treinta", "30 AÑOS DESPUÉS", { size: F(70, 62), dt: 0.5 }], ["in", "Ibn", "fad"], nameTag(K, "fad", "IBN FADLÁN", "Ibn", { hy: 770 }), ["in", "escandinavos", "rus"]], { keep: true });
  say(K, 213, [["g", "palangana", "rus", "basin"], ["p", "palangana", "rus", { armF: -60, foreF: -30 }], ["i", "palangana", "g:basin", "UNA SOLA PALANGANA", null, { size: F(220, 200) }]]);
  say(K, 214, [["c", [["drop", "CARA", "cara"], ["g:comb", "PEINE", "peinaba"], ["smiley-nervous", "MOCOS", "mocos"], ["drop-half", "ESCUPE", "escupía"]], { size: F(170, 160), cols: F(4, 2) }], ["p", "escupía", "rus", { head: 10, mouth: "open" }], ["t", "siguiente", "¡AL SIGUIENTE!", { c: AMB, size: F(80, 70) }], ["go", "siguiente", "rus", 2, 0.6]]);
  say(K, 215, [["p", "guarras", "fad", { brows: 8, mouth: "sad", head: -6 }], ["t", "guarras", "«LAS CRIATURAS MÁS GUARRAS»", { c: "#c9c1b0", size: F(70, 62) }]]);
  say(K, 216, [["p", "perfectos", "rus", { armF: -30, armB: -30, foreF: -60, foreB: -60, head: -8, mouth: "smile" }], ["t", "perfectos", "«CUERPOS PERFECTOS»", { c: VERDEC, size: F(74, 66) }], ["i", "palmeras", "tree-palm", "ALTOS COMO PALMERAS", null, { size: F(210, 190) }]]);
  // 217-219 · Viborg
  say(K, 217, [["cut", "siglo", "museo", -0.5], ["t", "Viborg", "VIBORG · DINAMARCA", { size: F(74, 66) }], ["t", "siglo", "UN SIGLO DESPUÉS DE ULF", { c: AMB, size: F(66, 60), dt: 0.4 }], ["i", "gusanos", "bug", "HUEVOS DE GUSANO", null, { size: F(210, 190) }]]);
  say(K, 218, [["i", "Peinados", "g:comb", "PEINADOS", true, { size: F(220, 200) }]]);
  say(K, 219, [["i", "gusanos", "bug", "SIN GUSANOS", false, { size: F(220, 200) }]], { keep: true, slot: 1 });
  // 220-223 · lo bueno y el dato que más pesa
  say(K, 220, [["cut", "Lo", "granja", -0.5], ["t", "bueno", "LO BUENO", { c: VERDEC, size: F(84, 74) }], ["c", [["coins", "PLATA", "plata"], ["house", "GRANJA EN PIE", "granja"], ["plant", "BROTES ALTOS", "brotes"]], { size: F(190, 170), cols: 3 }], ["f", (T) => grow(S, `${S.id}-granja-fd`, T("brotes"))]]);
  say(K, 221, [["t", "pesa", "EL DATO QUE MÁS PESA", { c: AMB, size: F(84, 74) }], ["f", (T) => { tilt(S, `${S.id}-bs`, T("pesa"), 14); S.cue(T("pesa"), "impact"); }]]);
  say(K, 222, [["f", (T, id, s) => { box(S, id, K.ix(), K.sy(1) + 40, F(900, 840), F(300, 280), `<div class="uncial" style="font-size:${F(118, 96)}px;color:#fff;line-height:1;white-space:nowrap"><span style="font-family:Inter;font-weight:900">0</span> CUERNOS</div>`, T("cuernos", -0.1), { bg: C.redD, fx: "slam" }); return { sel: `#${id}`, s: 3 }; }], ["t", "casco", "NI UN CASCO CON CUERNOS", { size: F(66, 60) }]]);
  say(K, 223, [["shake", "uno", 22], ["t", "uno", "NI UNO", { c: ROJO, size: F(110, 96), y: K.sy(2) + 60 }]], { keep: true });
  // 224-228 · Gjermundbu, la ópera de 1876 y Veksø
  say(K, 224, [["cut", "Gjermundbu", "museo", -0.6, Cx + 2500], ["t", "Gjermundbu", "GJERMUNDBU · SIGLO X", { c: AMB, size: F(74, 66), dt: 0.3 }], ["t", "después", "AÑOS DESPUÉS DE ULF", { size: F(66, 60) }]]);
  say(K, 225, [["cam", "redondo", 0.7, F(-300, 0), F(-200, -250), 0.7], ["f", (T) => { S.tw(`tl.fromTo("#${S.id}-gj-obj",{filter:"drop-shadow(0 0 0 #ffd36b)"},{filter:"drop-shadow(0 0 18px #ffd36b)",duration:0.3,yoyo:true,repeat:3},${T("redondo")});tl.fromTo("#${S.id}-gj-gf",{opacity:1},{opacity:0.3,duration:0.15,yoyo:true,repeat:5},${T("gafas")});`); }], ["t", "gafas", "GAFAS DE HIERRO", { c: AMB, x: K.x + F(200, 0), y: G - F(560, 1010), size: F(60, 58), w: F(560, 660) }]]);
  say(K, 226, [["cut", "figurinista", "opera", -0.6]]);
  const Op = actorK(K, "op", "opera", 0, { g: { H: ["hornHelmet"], F: [prop("spear", `${S.id}-osp`)] }, hid: true, z: 6 });
  say(K, 226, [["f", (T) => curtainOpen(S, `${S.id}-opera-op`, T("figurinista", 0.1))], ["in", "Wagner", "op"], ["talk", "Wagner", "op", 2.4], ["p", "Wagner", "op", { armF: -150, armB: -150, mouth: "open" }], ["t", "setenta", "1876 · ÓPERA DE WAGNER", { c: AMB, size: F(74, 66) }], ["f", (T, id) => { stampXAt(K, id, K.A.op.x, G - 720, F(240, 220), T("setenta", 0.6)); return `#${id}`; }]], { keep: true });
  say(K, 227, [["cut", "Dinamarca", "museo", -0.5, Cx + 5000], ["t", "Dinamarca", "¿Y LOS DE DINAMARCA?", { size: F(74, 66) }]]);
  say(K, 228, [["t", "Bronce", "EDAD DEL BRONCE", { c: AMB, size: F(80, 70) }], ["f", (T, id, s) => { box(S, id, K.ix(), K.sy(s) + 50, F(1000, 940), F(230, 230), `<div style="display:flex;align-items:center;gap:20px;font:900 ${F(52, 48)}px Inter;color:${C.ink}"><span>VEKSØ</span><span style="flex:1;min-width:${F(300, 240)}px;border-top:8px dashed ${C.ochre}"></span><span>ULF</span></div><div style="font:900 ${F(62, 56)}px Inter;color:${C.redD}">≈ 1.800 AÑOS</div>`, T("ochocientos", -0.2)); return { sel: `#${id}`, s: s + 2 }; }]]);
  // 229-232 · resumen y vuelta a casa
  say(K, 229, [["cut", "Así", "granja", -0.5], ["c", [["sailboat", "SIN BRÚJULA", "cinco"], ["scales", "A PESO", "plata"], ["prohibit", "0 CUERNOS", "cuerno"]], { size: F(170, 150), cols: F(3, 2) }]]);
  say(K, 230, [["g", "trabajo", "ulf", "backpack"], ["t", "trabajo", `${HOY} TRABAJO DE VERANO`, { size: F(70, 62) }], ["c", [["scales", "PAGADO A PESO", "peso"], ["smiley-sad", "MAREO INCLUIDO", "mareo"]], { size: F(190, 170), cols: 2 }], ["fx", "mareo", "ulf", VERDE]]);
  const Lb = actorK(K, "lobo", "lobo", A + F(450, 200), { hid: true, scale: 1.0 });
  say(K, 231, [["G", "lobo", "ulf", "backpack", -0.5], ["fx", "lobo", "ulf", "none"], ["in", "lobo", "lobo"], ["go", "lobo", "ulf", A + F(900, 600), 1.6, false, 0], ["t", "madriguera", "VUELVE A SU MADRIGUERA", { c: AMB, size: F(70, 62) }]]);
  say(K, 232, [["wob", "Mareado", "ulf", 4, 6], ["fx", "Mareado", "ulf", VERDE], ["b", "plata", A + F(940, 640), G - 420, { color: "#dfe4ea", n: 14 }], ["sfx", "plata", "silver"], ["t", "plata", "MAREADO, PERO CON PLATA", { c: "#dfe4ea", size: F(70, 62) }]]);
  outro(S, 232, K.x); fin(S);
}

// ======================= 8 · CIERRE (233-238) =======================
export function cierre(S) {
  const K = kit(S), { F, h } = K, A = 3000;
  const Pc = esc(S, "noche", (P, x) => { FONDO.cierre(P, x); }, A);
  on(S, "noche", 0); K.x = A;
  enter(S, spotBox(S, A));
  const U = actorK(K, "ulf", "ulf", 0, { g: { T: ["cloak"], F: ["comb"] }, off: ["comb"] });
  const Gm = actorK(K, "geir", "geirmund", K.ix() - F(320, 230), { g: GEIR, hid: true, z: 8, scale: 1.0, y: G - F(140, 540) });
  const As = actorK(K, "asa", "asa", K.ix() + F(320, 230), { g: ASA, hid: true, z: 8, scale: 1.0, flip: true, y: G - F(140, 540) });
  const Dg = actorK(K, "perro", "perro", A - F(250, 0), { scale: 0.85 });
  say(K, 233, [["f", (T, id) => { box(S, id, K.ix(), K.sy(0) + 60, F(820, 780), F(200, 190), `<div style="display:flex;align-items:center;gap:20px;font:900 ${F(76, 68)}px Inter;color:#fff">${icon("bell-ringing", { size: F(90, 80), color: "#fff" })}SUSCRÍBETE</div>`, T("suscríbete", -0.1), { bg: "#c9302c", fx: "slam" }); return `#${id}`; }], ["c", [["thumbs-up", "ME GUSTA", "gusta"]], { size: F(220, 200), y: K.sy(2) + 20 }], ["p", "suscríbete", "ulf", { mouth: "smile", armF: -150, foreF: -10 }]]);
  say(K, 234, [["p", "Y", "ulf", { armF: 0, foreF: 0 }], ["f", (T, id, s) => { box(S, id, K.ix(), K.sy(0) + 80, F(900, 860), F(250, 240), `<div style="display:flex;align-items:center;gap:20px">${icon("chat-circle-text", { size: F(110, 96), color: C.ink })}<span class="uncial" style="font-size:${F(120, 100)}px;color:${VK.madder}">Víking</span></div>`, T("víking", -0.2), { bg: "#fff" }); return `#${id}`; }], ["t", "palabra", "UNA SOLA PALABRA", { y: K.sy(2), size: F(70, 62) }]]);
  say(K, 235, [["f", (T, id) => { box(S, id, K.ix(), G - F(560, 970), F(1100, 1000), F(720, 700), "", T("Geirmund", -0.4), { bg: "rgba(20,24,44,.7)", z: 7 }); return `#${id}`; }], ["in", "Geirmund", "geir"], ["in", "Ása", "asa"], ["t", "Geirmund", "¿VÍKING…", { x: K.ix() - F(300, 220), y: G - F(860, 1250), size: F(70, 60), w: 520, c: "#9fc0e0" }], ["t", "Ása", "…O GRANJA?", { x: K.ix() + F(300, 220), y: G - F(860, 1250), size: F(70, 60), w: 520, c: VERDEC }], ["p", "Ása", "ulf", { head: 8, brows: -6, look: 3 }]]);
  say(K, 236, [["out", "pásaselo", "geir"], ["out", "pásaselo", "asa"], ["c", [["share-network", "A UN AMIGO", "amigo"], ["calendar-check", "SOLO LOS SÁBADOS", "sábados"]], { size: F(200, 180), cols: 2 }]]);
  say(K, 237, [["g", "costumbre", "ulf", "comb"], ["p", "costumbre", "ulf", { ...POSE.peinarse, mouth: "smile" }], ["f", (T) => { S.tw(`tl.to("#${U.id}-lidR",{scaleY:1,svgOrigin:"0 -369",duration:0.08},${T("costumbre", 0.3)});tl.to("#${U.id}-lidR",{scaleY:0,svgOrigin:"0 -369",duration:0.1},${T("costumbre", 0.9)});`); }], ["t", "costumbre", "COSTUMBRE VIKINGA", { c: AMB, size: F(84, 74), u: false }]]);
  say(K, 238, [["G", "próximo", "ulf", "comb"], ["go", "próximo", "ulf", A + F(600, 400), 1.2, false, -0.3], ["f", (T) => { S.tw(`tl.to("#${S.id}-noche-lh-door",{scaleX:1,transformOrigin:"0% 50%",duration:0.9,ease:"power2.inOut"},${T("próximo", 1.0)});`); S.cue(T("próximo", 1.0), "creak"); }], ["t", "próximo", "HASTA EL PRÓXIMO VIAJE", { c: AMB, size: F(80, 70) }]]);
  // fundido a negro al final
  const { W, H } = S.fmt, end = S.t1 - S.t0;
  S.over.push(`<div id="${S.id}-fade" class="layer" style="width:${W}px;height:${H}px;z-index:30;background:#000;opacity:0"></div>`);
  S.tw(`tl.to("#${S.id}-fade",{opacity:1,duration:1.4},${r3(end - 1.6)});`);
  camTo(S, r3(K.L(238).end - 0.2), spotBox(S, A + 300, 1.3), { dur: 1.6 });
  fin(S);
}
import { camTo } from "./lib.mjs";

export const CAPITULOS = [
  { id: "gancho", desde: 1, hasta: 5, build: gancho },
  { id: "intro", desde: 6, hasta: 27, build: intro },
  { id: "semana1", desde: 28, hasta: 69, build: semana1 },
  { id: "semana2", desde: 70, hasta: 110, build: semana2 },
  { id: "semana3", desde: 111, hasta: 159, build: semana3 },
  { id: "semana4", desde: 160, hasta: 205, build: semana4 },
  { id: "balance", desde: 206, hasta: 232, build: balance },
  { id: "cierre", desde: 233, hasta: 238, build: cierre },
];

// 5 · SEMANA 3 · LUNA LLENA · ENFERMEDAD Y PELIGRO (frases 70-92)
import { C, r3, icon, camTo, shake, actor, life, walk, pose, shiver, burst, prop } from "./lib.mjs";
import { G, sky, parallax, ground, snow, enter, exit } from "./fondos.mjs";
import { spotBox, zone, goSpot, grid, iconCard, panel, pop, drop, fadeUp, flipIn, flipOut, wobble, pulse, mark, label, slam, counter, bar, lineChart, fire, tent, moonBadge, bubble, arrow, cardsAt, clearAt, ids, animal, animalWalk, animalIdle, glowEyes, people } from "./lib2.mjs";

export function semana3(S) {
  const { F, h } = S.fmt;
  const L = (i) => S.line(i), W = (l, w, n) => S.W(l, w, n);
  const end = S.t1 - S.t0;
  sky(S, { top: "#080d1c", mid: "#1b2440", low: "#4a2f3a", glow: "#8a3a2e" });
  parallax(S, { far: "#252c47", far2: "#2e3654", mid: "#363e5c", mamC: "#2a3150" });
  ground(S, { top: "#c9d3df", bottom: "#7d8ea3" });
  snow(S, { n: 25 });
  // luna llena rojiza en el cielo (fondo)
  S.bg.push(`<div class="layer" style="left:${F(1450, 720)}px;top:${F(90, 260)}px;width:220px;height:220px;border-radius:50%;background:#f2b48a;box-shadow:0 0 90px rgba(242,140,100,.55)"></div>`);

  // ===== A · Fiebre (70-74) =====
  const A = 3000, zA = zone(S, A);
  enter(S, spotBox(S, A));
  tent(S, "tt5", A - F(350, 380), G, 1.3);
  const Li = actor(S, "l5", "lia", zA.chx - F(60, 40), G, { scale: 1.3, z: 6 });
  const Ni = actor(S, "n5", "nima", zA.chx + F(220, 250), G, { scale: 1.35, z: 7 });
  life(S, Li, 0, end, 141); life(S, Ni, 0, end, 142);
  moonBadge(S, "m3", F(A + 230, A), F(G - 760, G - 1150), 1, "SEMANA 3", W(70, "semana"));
  label(S, "m3l", F(A + 230, A), F(G - 560, G - 950), "LA PEOR SEMANA", { size: F(80, 70), color: "#ffb4a8" });
  fadeUp(S, "#m3l", W(70, "peor"));
  S.tw(`tl.to("#m3,#m3l",{y:-60,scale:0.7,opacity:0,duration:0.35},${r3(L(71).start - 0.2)});`);
  // 71: Nima tiene fiebre
  iconCard(S, "fe71", zA.x + F(80, 0), zA.y - F(60, 40), F(320, 300), "thermometer-hot", "FIEBRE", { bg: "#f8ddd6", color: C.redD });
  pop(S, "#fe71", W(71, "fiebre") - 0.1);
  S.tw(`tl.to("#fe71",{scale:1.08,duration:0.3,yoyo:true,repeat:5,ease:"sine.inOut"},${r3(W(71, "fiebre") + 0.4)});`);
  pose(S, Ni, W(71, "fiebre"), { armF: -28, foreF: -110, armB: 30, foreB: -100, mouth: "sad", brows: 4, head: 8 }, 0.3);
  shiver(S, Ni, W(71, "fiebre"), L(85).start);
  S.tw(`tl.to("#n5-body",{filter:"drop-shadow(0 0 14px rgba(255,80,60,.8))",duration:0.4},${r3(W(71, "fiebre"))});`);
  pose(S, Li, W(71, "fiebre") + 0.3, { head: 10, look: 4, mouth: "sad", brows: 4 }, 0.3);
  // 72: nadie sabe qué es un virus
  clearAt(S, "#fe71", L(72).start - 0.2);
  cardsAt(S, "c72", zA.x + F(80, 0), zA.y - F(60, 40), [["virus", "VIRUS", W(72, "virus")], ["bug", "BACTERIA", W(72, "bacteria")], ["question", "MISTERIO", W(72, "misterio"), null, C.ochre]], { size: F(280, 260), cols: 3 });
  // 73: sin médicos ni antibióticos
  clearAt(S, ids("c72", 3), L(73).start - 0.2);
  cardsAt(S, "c73", zA.x + F(80, 0), zA.y - F(140, 120), [["first-aid", "MÉDICOS", W(73, "médicos"), false], ["syringe", "ANTIBIÓTICOS", W(73, "antibióticos"), false]], { size: F(280, 260), cols: 2 });
  label(S, "w73", zA.x + F(80, 0), zA.y + F(260, 260), "UNA HERIDA PUEDE MATAR", { size: F(66, 58), color: "#ffb4a8", w: 1300 });
  fadeUp(S, "#w73", W(73, "herida"));
  // 74: sin dentistas
  clearAt(S, ids("c73", 2, true) + ",#w73", L(74).start - 0.2);
  iconCard(S, "to74", zA.x + F(-120, -200), zA.y - F(60, 40), F(300, 280), "tooth", "MUELA", { bg: "#f8ddd6", color: C.redD });
  pop(S, "#to74", W(74, "dentistas") - 0.1);
  mark(S, "to74m", zA.x + F(10, -90), zA.y - F(190, 170), 130, W(74, "dentistas") + 0.2, false);
  S.tw(`tl.to("#to74",{rotation:6,duration:0.1,yoyo:true,repeat:9},${r3(W(74, "muela"))});`);
  iconCard(S, "hg74", zA.x + F(320, 200), zA.y - F(60, 40), F(300, 280), "hourglass-medium", "SEMANAS");
  pop(S, "#hg74", W(74, "semanas"));

  // ===== B · Los datos de la vida (75-79) =====
  const B = A + 3000, zB = zone(S, B);
  goSpot(S, L(75).start - 0.3, B, { dur: 1.0, blur: 4 });
  const Am = actor(S, "a5", "ama", zB.chx, G, { scale: 1.3, z: 6 });
  life(S, Am, 0, end, 151);
  const kids = people(S, "kd75", zB.x + F(60, 0), zB.y - F(200, 200), 10, 5, W(75, "mitad"), { size: F(110, 84), ic: "baby" });
  kids.show(W(75, "niños") - 0.3); kids.hit();
  label(S, "k75", zB.x + F(60, 0), zB.y - F(20, 40), "1 DE CADA 2", { size: F(110, 96), dirt: true, color: "#ffb4a8", w: 1300 });
  slam(S, "#k75", W(75, "mitad") + 0.2);
  label(S, "k75b", zB.x + F(60, 0), zB.y + F(130, 120), "NO LLEGA A LOS 15 AÑOS", { size: F(62, 56), w: 1300 });
  fadeUp(S, "#k75b", W(75, "quince"));
  // 76: esperanza de vida al nacer ~30
  clearAt(S, "#kd75,#k75,#k75b", L(76).start - 0.2);
  label(S, "e76", zB.x + F(60, 0), zB.y - F(300, 300), "ESPERANZA DE VIDA AL NACER", { size: F(62, 56), w: 1400 });
  fadeUp(S, "#e76", W(76, "esperanza"));
  counter(S, "n76", zB.x + F(60, 0), zB.y - F(60, 60), { from: 0, to: 30, t: W(76, "treinta") - 0.4, dur: 0.8, size: F(300, 260), sep: false, suf: "<span style='font-size:.35em'> AÑOS</span>" });
  S.tw(`tl.fromTo("#n76",{opacity:0},{opacity:1,duration:0.2},${r3(W(76, "treinta") - 0.4)});`);
  // 77: las madres
  iconCard(S, "mo77", zB.x + F(560, 300), zB.y + F(240, 280), 250, "heartbeat", "PARTO", { bg: "#f8ddd6", color: C.redD });
  pop(S, "#mo77", W(77, "parto"));
  S.tw(`tl.to("#mo77",{scale:1.1,duration:0.22,yoyo:true,repeat:7,ease:"sine.inOut"},${r3(W(77, "riesgo"))});`);
  iconCard(S, "md77", zB.x + F(-440, -300), zB.y + F(240, 280), 250, "first-aid", "AYUDA", {});
  pop(S, "#md77", W(77, "médica") - 0.2);
  mark(S, "md77m", zB.x + F(-440, -300), zB.y + F(240, 280), 200, W(77, "médica"), false);
  // 78: cuidado con el dato
  clearAt(S, "#mo77,#md77,#md77m", L(78).start - 0.2);
  label(S, "ast78", zB.x + F(300, 250), zB.y - F(150, 150), "*", { size: 240, color: C.ochre, w: 300 });
  pop(S, "#ast78", W(78, "cuidado"));
  wobble(S, "#ast78", W(78, "cuidado") + 0.4, 3, 12);
  label(S, "no78", zB.x + F(60, 0), zB.y + F(170, 160), "MORIR A LOS 30", { size: F(70, 62), w: 1100, color: "#ffb4a8" });
  fadeUp(S, "#no78", W(78, "muriera"));
  mark(S, "no78m", zB.x + F(60, 0), zB.y + F(170, 160), 190, W(78, "treinta"), false);
  // 79: si sobrevivías a la infancia... como Ama
  clearAt(S, "#e76,#n76,#ast78,#no78,#no78m", L(79).start - 0.2);
  bar(S, "age79", zB.x + F(60, 0), zB.y - F(150, 150), F(1000, 900), { label: "EDAD", ic: "hourglass-medium", color: C.green, from: 0.2, to: 0.95, t: W(79, "cincuenta"), dur: 1.4 });
  [["50", W(79, "cincuenta")], ["60", W(79, "sesenta")], ["+", W(79, "más")]].forEach(([v, t], i) => {
    label(S, `ag79${i}`, zB.x + F(60, 0) + F(-150 + i * 250, -150 + i * 230), zB.y + F(30, 30), v, { size: 110, dirt: true, w: 300 });
    pop(S, `#ag79${i}`, t);
  });
  S.add(`<div id="ama79" class="prop" style="left:${Am.x - 200}px;top:${G - 760}px;width:400px;text-align:center;z-index:11;opacity:0"><span class="dirt" style="font-size:96px;color:${C.bone};text-shadow:0 7px 0 ${C.ink}">AMA</span></div>`);
  pop(S, "#ama79", W(79, "ama"));
  pose(S, Am, W(79, "ama"), { mouth: "smile", armF: -140, foreF: -20 }, 0.3);
  pose(S, Am, L(79).end, { mouth: "neutral", armF: 0, foreF: 0 }, 0.4);
  camTo(S, L(79).end - 0.3, spotBox(S, B, 1.15), { dur: 0.7 });

  // ===== C · Cuidar a Nima y la tumba con perros (80-85) =====
  const Cc = B + 3200, zC = zone(S, Cc);
  goSpot(S, L(80).start - 0.3, Cc, { dur: 1.0, blur: 4 });
  walk(S, Am, L(80).start - 0.3, L(80).start + 0.8, Cc - F(580, 330));
  // Nima y Lía ya están aquí junto a un fuego
  const fx = Cc + F(250, 420);
  fire(S, "fu5", fx, G + 10, 1);
  const N2 = actor(S, "n6", "nima", Cc + F(-260, 40), G, { scale: 1.35, z: 7 });
  const L2 = actor(S, "l6", "lia", Cc + F(-430, -120), G, { scale: 1.3, z: 6 });
  const Gr = actor(S, "g6", "gris", Cc + F(260, 420), G, { scale: 1.3, z: 8, flip: true });
  life(S, N2, 0, end, 161); life(S, L2, 0, end, 162); life(S, Gr, 0, end, 163);
  shiver(S, N2, L(80).start, W(85, "baja"));
  cardsAt(S, "c80", zC.x + F(200, 0), zC.y - F(200, 150), [["tree", "CORTEZAS", W(80, "cortezas")], ["leaf", "HOJAS", W(80, "hojas")]], { size: F(260, 240), cols: 2 });
  label(S, "r80", zC.x + F(200, 0), zC.y + F(60, 70), "ALIVIAN", { size: F(76, 70), color: "#c9f0cf", w: 900 });
  fadeUp(S, "#r80", W(80, "alivian"));
  pose(S, Am, W(80, "sabe"), { armF: -90, foreF: -10, mouth: "smile" }, 0.3);
  // 81: el grupo cuida a Nima
  clearAt(S, "#c800,#c801,#r80", L(81).start - 0.2);
  pose(S, Am, L(81).start, { armF: 0, foreF: 0, mouth: "neutral" }, 0.3);
  pose(S, L2, W(81, "abriga"), { armF: -70, foreF: -60, armB: -50, foreB: -60, head: 10 }, 0.35);
  cardsAt(S, "c81", zC.x + F(200, 0), zC.y - F(200, 150), [["hand-heart", "ABRIGO", W(81, "abriga")], ["fork-knife", "LA MEJOR COMIDA", W(81, "comida")], ["paw-print", "GRIS A SU LADO", W(81, "gris")]], { size: F(250, 230), cols: h ? 3 : 1, gap: 26 });
  walk(S, Gr, W(81, "gris") - 0.2, W(81, "lado") + 0.3, N2.x + F(220, 200));
  // 82-84: «Y hablando de Gris» -> tumba de Bonn-Oberkassel
  clearAt(S, ids("c81", 3), L(82).start - 0.2);
  camTo(S, L(82).start - 0.1, h ? { x: Gr.x - 700, y: G - 760, w: 1400, h: 800 } : { x: Gr.x - 450, y: G - 1150, w: 900, h: 1180 }, { dur: 0.8 });
  S.tw(`tl.to("#g6-head",{rotation:-10,svgOrigin:"70 -110",duration:0.2,yoyo:true,repeat:3},${r3(W(82, "gris"))});`);
  goSpot(S, L(83).start - 0.3, Cc, { dur: 0.8 });
  const mp = F({ x: zC.x + 200, y: zC.y - 120 }, { x: zC.x, y: zC.y - 120 });
  panel(S, "tb83", mp.x, mp.y, F(1100, 980), F(620, 600), `
    <div style="display:flex;align-items:center;gap:20px;font:900 60px Inter;color:${C.ink}">${icon("map-pin", { size: 80, color: C.red })}ALEMANIA</div>
    <div id="tbr" style="display:flex;align-items:center;gap:26px;margin-top:26px;padding:18px 36px;border:6px dashed ${C.ochreD};border-radius:40px;background:#e6d2b0">
      <span id="tb1" style="opacity:0">${icon("person", { size: 120, color: C.ink })}</span><span id="tb2" style="opacity:0">${icon("person", { size: 120, color: C.ink })}</span><span id="tb3" style="opacity:0">${icon("dog", { size: 120, color: C.ochreD })}</span></div>
    <div id="tby" style="font:900 62px Inter;color:${C.ochreD};margin-top:20px;opacity:0">HACE 14.000 AÑOS</div>`);
  flipIn(S, "#tb83", W(83, "alemania") - 0.2);
  fadeUp(S, "#tby", W(83, "catorce"));
  [["tb1", W(83, "hombre")], ["tb2", W(83, "mujer")], ["tb3", W(83, "perros")]].forEach(([id, t]) => pop(S, `#${id}`, t));
  // 84: el cachorro enfermo al que cuidaron
  flipOut(S, "#tb83", L(84).start - 0.15);
  panel(S, "pu84", mp.x, mp.y, F(1000, 940), F(620, 600), `
    <div style="display:flex;align-items:center;gap:40px">${icon("dog", { size: 190, color: C.ochreD })}
     <div><div style="font:900 60px Inter;color:${C.redD}">MUY ENFERMO</div><div style="font:900 60px Inter;color:${C.ink};margin-top:10px">SEMANAS: <span id="wk84">0</span></div></div></div>
    <div id="cu84" style="display:flex;align-items:center;gap:16px;font:900 66px Inter;color:${C.greenD};margin-top:26px;opacity:0">${icon("hand-heart", { size: 90, color: C.green })}ALGUIEN LO CUIDÓ</div>`);
  flipIn(S, "#pu84", W(84, "cachorro") - 0.2);
  S.tw(`(()=>{const o={v:0},el=document.getElementById("wk84");tl.fromTo(o,{v:0},{v:8,duration:1.2,ease:"none",onUpdate:()=>{el.textContent=Math.round(o.v)}},${r3(W(84, "semanas") - 0.4)});})();`);
  fadeUp(S, "#cu84", W(84, "cuidó") - 0.1);
  // 85: la fiebre baja
  flipOut(S, "#pu84", L(85).start - 0.15);
  lineChart(S, "ch85", mp.x, mp.y, F(1000, 920), F(580, 560), [0.95, 0.9, 0.55, 0.15], W(85, "baja") - 0.4, 1.0, { color: C.green, title: "FIEBRE DE NIMA", labels: ["DÍA 1", "DÍA 2", "DÍA 3", ""] });
  pose(S, N2, W(85, "baja") + 0.3, { armF: 0, foreF: 0, armB: 0, foreB: 0, mouth: "smile", brows: 0, head: 0 }, 0.35);
  camTo(S, L(85).end - 0.3, spotBox(S, Cc, 1.15), { dur: 0.7 });

  // ===== D · Depredadores en la noche (86-92) =====
  const D = Cc + 3300, zD = zone(S, D);
  goSpot(S, L(86).start - 0.3, D, { dur: 1.0, blur: 4 });
  tent(S, "tt6", D - F(300, 250), G, 1.2);
  fire(S, "fu6", D + F(120, 180), G + 10, 1.0);
  const T = actor(S, "t5", "tarko", D - F(620, 330), G, { scale: 1.35, z: 7, props: { F: prop("torch", "trc") } });
  S.tw(`tl.set("#trc",{opacity:0},0);`);
  life(S, T, L(86).start, end, 171);
  S.add(`<div id="drk86" class="prop" style="left:${D - 3000}px;top:${G - 3000}px;width:6000px;height:4400px;background:rgba(3,4,10,.6);z-index:4;opacity:0"></div>`);
  S.tw(`tl.to("#drk86",{opacity:1,duration:0.6},${r3(W(86, "noche"))});`);
  const eyes = F([[D + 700, G - 380], [D + 1050, G - 520], [D + 1300, G - 330]], [[D + 300, G - 1100], [D + 120, G - 1250], [D + 420, G - 1300]]);
  eyes.forEach(([x, y], i) => glowEyes(S, `e86${i}`, x, y, W(86, "ronda") + i * 0.25, { s: 1.4 }));
  pose(S, T, W(86, "ronda"), { head: -6, look: 4, mouth: "open", brows: -6 }, 0.25);
  // 87: hienas y osos
  const hy = animal(S, "hy87", "hiena", D + F(1600, 1200), G, { s: 1.1, flip: true, z: 5 });
  animalWalk(S, hy, W(87, "hienas") - 0.5, W(87, "hienas") + 0.6, D + F(950, 450));
  label(S, "hyl", D + F(950, 450), G - F(420, 420), "HIENA", { size: 70, w: 500, color: "#ffd9a0" });
  fadeUp(S, "#hyl", W(87, "hienas"));
  iconCard(S, "os87", zD.x + F(200, 0), zD.y - F(260, 220), F(320, 300), "moon-stars", "OSO EN SU CUEVA", { bg: "#d8dde8" });
  pop(S, "#os87", W(87, "osos"));
  // 88: ¡león de las cavernas!
  clearAt(S, "#os87,#hyl", L(88).start - 0.2);
  S.tw(`tl.to("#hy87",{opacity:0,duration:0.3},${r3(L(88).start - 0.2)});`);
  const ln = animal(S, "ln88", "leon", D + F(1900, 1400), G, { s: 1.6, flip: true, z: 6 });
  animalWalk(S, ln, L(88).start - 0.3, W(88, "cavernas") + 0.2, D + F(950, 380));
  animalIdle(S, ln, W(88, "cavernas") + 0.3, L(90).start);
  shake(S, W(88, "león"), 16, 0.4);
  // comparación de tamaño
  panel(S, "cmp88", zD.x + F(200, 0), zD.y - F(300, 280), F(900, 860), F(320, 320), `
    <div style="display:flex;align-items:flex-end;gap:50px">
      <div style="text-align:center"><div style="transform:scale(.8)">${icon("cat", { size: 150, color: "#9a8a6a" })}</div><div class="lbl" style="font-size:52px">HOY</div></div>
      <div style="text-align:center">${icon("cat", { size: 190, color: "#c79a5e" })}<div class="lbl" style="font-size:52px">CAVERNAS</div></div></div>`);
  pop(S, "#cmp88", W(88, "grande"));
  label(S, "cmp88b", zD.x + F(200, 0), zD.y - F(80, 60), "ALGO MÁS GRANDE", { size: 66, w: 1000, color: "#ffd9a0" });
  fadeUp(S, "#cmp88b", W(88, "grande") + 0.1);
  pose(S, T, W(88, "león"), { body: -8, mouth: "open", brows: -6, armF: -40 }, 0.2);
  // 89: antorchas y gritos; Gris ladra
  clearAt(S, "#cmp88,#cmp88b", L(89).start - 0.2);
  S.tw(`tl.to("#trc",{opacity:1,duration:0.1},${r3(W(89, "antorchas") - 0.1)});`);
  pose(S, T, W(89, "agitan"), { armF: -160, foreF: -10, mouth: "open", brows: -6 }, 0.2);
  S.tw(`tl.to("#t5-armF",{rotation:-120,svgOrigin:"30 -292",duration:0.18,yoyo:true,repeat:9,ease:"sine.inOut"},${r3(W(89, "agitan") + 0.2)});`);
  const H2 = actor(S, "h7", "hunter2", D - F(240, 80), G, { scale: 1.3, z: 7, props: { F: prop("torch", "trc2") } });
  S.tw(`tl.fromTo("#h7",{opacity:0},{opacity:1,duration:0.3},${r3(W(89, "demás") - 0.2)});`);
  life(S, H2, L(89).start, end, 172);
  pose(S, H2, W(89, "gritan"), { armF: -150, mouth: "open", brows: -6 }, 0.2);
  S.tw(`tl.to("#h7-armF",{rotation:-110,svgOrigin:"30 -292",duration:0.2,yoyo:true,repeat:7,ease:"sine.inOut"},${r3(W(89, "gritan") + 0.2)});`);
  const G2 = actor(S, "g7", "gris", D + F(380, 0), G, { scale: 1.3, z: 8 });
  S.tw(`tl.fromTo("#g7",{opacity:0},{opacity:1,duration:0.2},${r3(W(89, "gris") - 0.2)});`);
  life(S, G2, L(89).start, end, 173);
  S.tw(`tl.to("#g7-head",{rotation:-14,svgOrigin:"70 -110",duration:0.1,yoyo:true,repeat:7},${r3(W(89, "ladra"))});`);
  for (let i = 0; i < 3; i++) {
    S.add(`<div id="bk${i}" class="prop" style="left:${G2.x + F(170, 150) + i * 40}px;top:${G - 250 - i * 30}px;width:${60 + i * 40}px;height:${110 + i * 60}px;border:9px solid #fff;border-left:none;border-top-color:transparent;border-bottom-color:transparent;border-radius:50%;z-index:9;opacity:0"></div>`);
    S.tw(`tl.fromTo("#bk${i}",{opacity:0,x:0},{opacity:1,x:30,duration:0.25,repeat:3,ease:"power1.out"},${r3(W(89, "ladra") + i * 0.08)});`);
  }
  // 90: el fuego les salva: el león se va
  S.tw(`tl.to("#fu6",{scale:1.5,transformOrigin:"50% 100%",duration:0.6,ease:"back.out(1.6)"},${r3(W(90, "fuego"))});tl.to("#drk86",{opacity:0.25,duration:0.6},${r3(W(90, "fuego"))});`);
  S.tw(`tl.to("#ln88-flip",{scaleX:1,duration:0.15},${r3(W(90, "salva") - 0.3)});`);
  animalWalk(S, ln, W(90, "salva") - 0.15, L(90).end + 0.6, D + F(2600, 2000), { run: true });
  S.tw(`tl.to("#e860,#e861,#e862",{opacity:0,duration:0.3},${r3(W(90, "salva"))});`);
  label(S, "sv90", zD.x + F(200, 0), zD.y - F(300, 260), "EL FUEGO SALVA", { size: F(110, 90), dirt: true, w: 1500, color: C.fire2 });
  slam(S, "#sv90", W(90, "salva"));
  // 91: al amanecer, huellas a pocos pasos
  clearAt(S, "#sv90", L(91).start - 0.2);
  S.tw(`tl.to("#drk86",{opacity:0,duration:1},${r3(L(91).start - 0.2)});tl.to("#trc,#trc2",{opacity:0,duration:0.3},${r3(L(91).start)});`);
  for (let i = 0; i < 4; i++) {
    S.add(`<div id="pw${i}" class="prop" style="left:${D + F(380, 160) + i * 150}px;top:${G - 50 + (i % 2) * 20}px;z-index:4;opacity:0;transform:rotate(90deg)">${icon("paw-print", { size: 110, color: "#3a2a20" })}</div>`);
    S.tw(`tl.fromTo("#pw${i}",{opacity:0,scale:0.5},{opacity:1,scale:1,duration:0.25},${r3(W(91, "huellas") + i * 0.15)});`);
  }
  label(S, "pa91", zD.x + F(200, 0), zD.y - F(300, 260), "A POCOS PASOS", { size: F(90, 80), w: 1300, color: "#ffd9a0" });
  fadeUp(S, "#pa91", W(91, "pasos"));
  iconCard(S, "us91", zD.x + F(200, 0), zD.y - F(60, 40), F(300, 280), "users-three", "NADIE SOLO", { bg: C.ochre });
  pop(S, "#us91", W(91, "solo"));
  pose(S, T, L(91).start, { armF: 0, foreF: 0, mouth: "sad", brows: 4, head: 8 }, 0.35);
  // 92: turnos para vigilar el fuego
  clearAt(S, "#pa91,#us91", L(92).start - 0.2);
  S.tw(`tl.to("#drk86",{opacity:0.8,duration:0.6},${r3(L(92).start - 0.2)});`);
  const tp = F({ x: zD.x + 200, y: zD.y - 180 }, { x: zD.x, y: zD.y - 150 });
  panel(S, "tu92", tp.x, tp.y, F(1000, 940), F(400, 400), `
    <div class="lbl" style="font-size:62px">TURNOS</div>
    <div style="display:flex;gap:40px;margin-top:20px">${[0, 1, 2].map((i) => `<div id="tn${i}" style="text-align:center;opacity:.3">${icon(["person", "person", "person"][i], { size: 110, color: [C.ochreD, C.redD, C.greenD][i] })}<div style="font:900 52px Inter;color:${C.ink}">${["1º", "2º", "3º"][i]}</div></div>`).join("")}</div>`);
  flipIn(S, "#tu92", W(92, "turnan") - 0.3);
  [0, 1, 2].forEach((i) => S.tw(`tl.to("#tn${i}",{opacity:1,scale:1.15,duration:0.2},${r3(W(92, "turnan") + 0.3 + i * 0.5)});tl.to("#tn${i}",{opacity:.5,scale:1,duration:0.2},${r3(W(92, "turnan") + 0.8 + i * 0.5)});`));
  S.tw(`tl.to("#drk86",{opacity:0,duration:0.8},${r3(W(92, "amanece") - 0.2)});`);
  camTo(S, L(92).end + 0.05, { x: A - 1200, y: G - 2200, w: D - A + 2800, h: 2400 }, { dur: 0.75, ease: "power2.inOut" });
  exit(S, { dur: 0.4 });
}

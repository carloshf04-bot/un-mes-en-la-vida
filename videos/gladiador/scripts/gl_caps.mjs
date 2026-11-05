// «Un día en la vida de un gladiador»: capítulos. Cada aparición va pegada a su palabra: S.W(frase, "palabra", n).
import { C, r3, icon, camTo, camSet, shake, actor, life, walk, pose, shiver, burst, GEAR } from "./lib.mjs";
import { enter, exit } from "./fondos.mjs";
import { G, RC, romanSky, romeSkyline, sandGround, ludus, post, stands, roar, colosseum, tunnel, wall } from "./gl_fondos.mjs";
import { spotBox, zone, goSpot, iconCard, panel, pop, drop, fadeUp, flipIn, flipOut, wobble, pulse, mark, label, slam, counter, bar, cardsAt, clearAt, ids, animal, animalWalk, animalIdle, bubble, arrow, phone, typeOn } from "./lib2.mjs";

const gear = (keys) => { const p = {}; for (const [slot, k] of Object.entries(keys)) p[slot] = GEAR[k]; return p; };
const roman = (S, id, x, y, str, o = {}) => label(S, id, x, y, `<span class="roman">${str}</span>`, o);

// ========== 1 · GANCHO (1-2) ==========
export function gancho(S) {
  const { F, h } = S.fmt, L = (i) => S.line(i), W = (l, w, n) => S.W(l, w, n);
  romanSky(S, "dia"); romeSkyline(S); sandGround(S);
  const A = 3000;
  stands(S, A, 6000);
  camSet(S, 0, F({ x: A - 520, y: G - 760, w: 1200, h: 700 }, { x: A - 470, y: G - 1150, w: 900, h: 1180 }));
  camTo(S, 0.1, spotBox(S, A, 1.05), { dur: 1.4, ease: "power3.out" });
  const T = actor(S, "fx0", "felix", A - F(500, 220), G, { scale: 1.35, z: 6, props: gear({ T: "loin" }) });
  life(S, T, 0, S.t1 - S.t0, 1);
  roar(S, 0.05, 3);
  // 50.000 personas: el número cae de golpe
  const n = F({ x: A + 330, y: G - 640 }, { x: A, y: G - 1060 });
  counter(S, "n50", n.x, n.y, { from: 0, to: 50000, t: W(1, "cincuenta") - 0.3, dur: 0.9, size: F(250, 210), w: 1400 });
  S.tw(`tl.fromTo("#n50",{opacity:0,scale:2.4,filter:"blur(10px)"},{opacity:1,scale:1,filter:"blur(0px)",duration:0.3,ease:"power4.in"},${r3(W(1, "cincuenta") - 0.3)});`);
  shake(S, W(1, "cincuenta"), 18, 0.4);
  label(S, "per", n.x, n.y + F(170, 150), "PERSONAS", { size: F(90, 80), color: RC.gold });
  fadeUp(S, "#per", W(1, "personas"));
  pose(S, T, W(1, "luchar"), { mouth: "open", brows: 5, look: 4, head: -6 }, 0.25);
  // «y no puedes decir que no»: cadenas en las muñecas y la reja que baja
  S.add(`<svg id="reja" class="prop" style="left:${A - 1300}px;top:${G - 1100}px;z-index:9;opacity:0" width="2600" height="1110">${[...Array(16)].map((_, i) => `<rect x="${i * 165}" y="0" width="34" height="1110" fill="#5b5f66" stroke="${C.ink}" stroke-width="5"/>`).join("")}<rect y="300" width="2600" height="30" fill="#5b5f66" stroke="${C.ink}" stroke-width="5"/><rect y="760" width="2600" height="30" fill="#5b5f66" stroke="${C.ink}" stroke-width="5"/></svg>`);
  const tNo = W(1, "no", 2);
  S.tw(`tl.fromTo("#reja",{y:-1200,opacity:1},{y:0,opacity:1,duration:0.35,ease:"bounce.out"},${r3(tNo - 0.35)});`);
  S.cue(tNo - 0.05, "impact", 1); shake(S, tNo, 14, 0.3);
  S.tw(`tl.to("#n50,#per",{opacity:0,duration:0.2},${r3(tNo - 0.4)});`);
  pose(S, T, tNo, { mouth: "sad", brows: 5, head: 8, armF: -30, foreF: -100 }, 0.25);
  // 2: Roma, año 80 -> título
  S.tw(`tl.to("#reja",{y:-1300,duration:0.5,ease:"power3.in"},${r3(L(2).start - 0.1)});`);
  const st = F({ x: A + 330, y: G - 700 }, { x: A, y: G - 1150 });
  roman(S, "roma", st.x, st.y, "ROMA · AÑO 80", { size: F(130, 104), w: 1500, color: RC.marble });
  slam(S, "#roma", W(2, "roma"));
  S.tw(`tl.to("#roma",{y:-150,scale:0.6,opacity:0,duration:0.3},${r3(W(2, "esto") - 0.1)});`);
  const tt = F({ x: A + 330, y: G - 560 }, { x: A, y: G - 1000 });
  S.add(`<div id="tslab" class="card" style="left:${tt.x - F(800, 500)}px;top:${tt.y - 220}px;width:${F(1600, 1000)}px;height:440px;background:${RC.marble};border-radius:30px;z-index:8;opacity:0;flex-direction:column">
    <div style="font:900 ${F(76, 56)}px Inter;color:${C.ink};margin-bottom:6px">UN DÍA EN LA VIDA DE UN</div>
    <div id="tglad" class="roman" style="font-size:${F(190, 124)}px;color:${RC.terra};line-height:1;text-shadow:0 6px 0 ${C.ink}">GLADIADOR</div></div>`);
  pop(S, "#tslab", W(2, "día") - 0.2);
  S.tw(`tl.fromTo("#tglad",{scale:2.4,opacity:0,filter:"blur(10px)"},{scale:1,opacity:1,filter:"blur(0px)",duration:0.3,ease:"power4.in"},${r3(W(2, "gladiador") - 0.2)});`);
  shake(S, W(2, "gladiador") + 0.1, 20, 0.4); roar(S, W(2, "gladiador") + 0.1, 2);
  pose(S, T, W(2, "gladiador"), { armF: -160, foreF: -10, mouth: "smile", brows: -4, head: -4 }, 0.3);
  camTo(S, L(2).end + 0.05, spotBox(S, A, 1.35), { dur: 0.7 });
  exit(S, { dur: 0.4 });
}

// ========== 2 · FÉLIX Y LA ESCUELA (3-9) ==========
export function escuela(S) {
  const { F, h } = S.fmt, L = (i) => S.line(i), W = (l, w, n) => S.W(l, w, n);
  const end = S.t1 - S.t0;
  romanSky(S, "dia"); romeSkyline(S); sandGround(S);
  const A = 3000, zA = zone(S, A);
  ludus(S, A + 1500, 9000);
  enter(S, spotBox(S, A));
  const T = actor(S, "fx1", "felix", zA.chx, G, { scale: 1.35, z: 6, props: gear({ T: "loin" }) });
  life(S, T, 0, end, 2);
  // 3: Félix = afortunado
  panel(S, "fic", zA.x, zA.y - 40, F(1050, 940), F(560, 520), `
    <div class="roman" style="font-size:${F(150, 130)}px;color:${C.ink};line-height:1">FÉLIX</div>
    <div id="fic2" style="display:flex;align-items:center;gap:20px;font:900 ${F(66, 60)}px Inter;color:${C.greenD};margin-top:20px;opacity:0">${icon("clover", { size: 90, color: C.green })}= AFORTUNADO</div>`);
  flipIn(S, "#fic", W(3, "félix") - 0.15);
  fadeUp(S, "#fic2", W(3, "afortunado") - 0.1);
  pose(S, T, W(3, "félix"), { armF: -150, foreF: -30, mouth: "smile" }, 0.3);
  S.tw(`tl.to("#fx1-foreF",{rotation:-60,svgOrigin:"30 -228",duration:0.15,yoyo:true,repeat:5},${r3(W(3, "félix") + 0.3)});`);
  label(S, "nec", zA.x, zA.y + F(330, 300), "…Y LO VA A NECESITAR", { size: F(66, 58), w: 1200, color: "#ffd38a" });
  fadeUp(S, "#nec", W(3, "necesitar"));
  pose(S, T, W(3, "necesitar"), { mouth: "sad", brows: 4, head: 6, armF: 0, foreF: 0 }, 0.3);
  // 4: prisionero -> vendido -> escuela
  clearAt(S, "#fic,#nec", L(4).start - 0.2);
  cardsAt(S, "c4", zA.x, zA.y - 20, [["link", "PRISIONERO", W(4, "prisionero")], ["coins", "VENDIDO", W(4, "vendieron")], ["sword", "ESCUELA", W(4, "escuela")]], { size: F(270, 250), cols: 3 });
  arrow(S, "a4a", zA.x - F(430, 330), zA.y + F(200, 190), zA.x - F(70, 50), zA.y + F(200, 190), W(4, "vendieron") - 0.1, { dur: 0.3, bend: -0.2, w: 10 });
  pose(S, T, W(4, "prisionero"), { armF: -30, foreF: -100, armB: 30, foreB: -100, mouth: "sad" }, 0.3);
  // 5: amanecer y un entrenador que no sabe sonreír
  clearAt(S, ids("c4", 3) + ",#a4a", L(5).start - 0.2);
  const B = A + 2600, zB = zone(S, B);
  goSpot(S, L(5).start - 0.3, B, { dur: 1.0, blur: 4 });
  walk(S, T, L(5).start - 0.3, L(5).start + 0.7, B - F(650, 250), { run: true });
  pose(S, T, L(5).start + 0.75, { armF: 0, foreF: 0, armB: 0, foreB: 0, mouth: "neutral" }, 0.2);
  const Lz = actor(S, "lan", "lanista", B + F(80, 230), G, { scale: 1.35, z: 7, flip: true });
  life(S, Lz, 0, end, 3);
  pose(S, Lz, 0, { mouth: "sad", brows: 6 }, 0.01);
  bar(S, "son", zB.x + F(250, 0), zB.y - F(230, 260), F(760, 760), { label: "SONRISAS", ic: "smiley-angry", color: C.green, from: 0.4, to: 0.0, t: W(5, "sonreír") - 0.1, dur: 0.6, show: W(5, "entrenador") });
  pose(S, Lz, W(5, "entrenador"), { armF: -40, foreF: -100, armB: 40, foreB: -100, brows: 7 }, 0.3);
  // 6: golpe tras golpe contra el poste
  S.tw(`tl.to("#son",{opacity:0,duration:0.2},${r3(L(6).start - 0.15)});`);
  const C6 = B + 2600, zC = zone(S, C6);
  goSpot(S, L(6).start - 0.3, C6, { dur: 0.9, blur: 4 });
  const T2 = actor(S, "fx1b", "felix", zC.chx, G, { scale: 1.35, z: 6, props: gear({ T: "loin", F: "wood" }) });
  life(S, T2, 0, end, 4);
  post(S, "pal", zC.chx + F(330, 300));
  const hits = [W(6, "golpe", 1), W(6, "golpe", 2), W(6, "practica"), W(6, "espada"), W(6, "madera"), W(6, "poste")];
  hits.forEach((t, i) => {
    pose(S, T2, t - 0.12, { armF: -170, foreF: -20, body: -4 }, 0.1, "power2.out");
    pose(S, T2, t, { armF: -60, foreF: 0, body: 6 }, 0.08, "power4.in");
    S.tw(`tl.fromTo("#pal",{x:0},{x:12,duration:0.06,yoyo:true,repeat:1},${r3(t + 0.06)});`);
    burst(S, `ch${i}`, zC.chx + F(300, 270), G - 330, t + 0.06, { n: 5, color: "#c9a06a", spread: 120, up: 90, size: 12, seed: 40 + i, dur: 0.5 });
    S.cue(t + 0.05, "hit", 0.7);
  });
  counter(S, "gol", zC.x + F(250, 0), zC.y - F(220, 260), { from: 0, to: 1000, t: W(6, "golpe", 1), dur: 2.4, size: F(140, 120), suf: "<span style='font-size:.4em'> GOLPES</span>", w: 1200 });
  S.tw(`tl.fromTo("#gol",{opacity:0},{opacity:1,duration:0.2},${r3(W(6, "golpe", 1))});`);
  pose(S, T2, L(6).end + 0.1, { armF: 0, foreF: 0, body: 0, mouth: "open" }, 0.3);
  // 7: no estaban secos y marcados (Félix «crece» de barriga)
  S.tw(`tl.to("#gol",{opacity:0,duration:0.2},${r3(L(7).start - 0.15)});`);
  const D = C6 + 2600, zD = zone(S, D);
  goSpot(S, L(7).start - 0.3, D, { dur: 0.9, blur: 4 });
  const T3 = actor(S, "fx1c", "felix", zD.chx, G, { scale: 1.35, z: 6, props: gear({ T: "loin" }) });
  life(S, T3, 0, end, 5);
  roman(S, "raro", zD.x, zD.y - F(330, 300), "DATO RARO", { size: F(100, 90), w: 1200, color: RC.gold });
  slam(S, "#raro", W(7, "raro"));
  iconCard(S, "mus", zD.x, zD.y + F(20, 20), F(290, 270), "barbell", "SECOS Y MARCADOS");
  pop(S, "#mus", W(7, "secos") - 0.1);
  mark(S, "musx", zD.x, zD.y + 20, 230, W(7, "marcados") + 0.05, false);
  S.tw(`tl.to("#fx1c-torso",{scaleX:1.22,svgOrigin:"0 -200",duration:0.5,ease:"elastic.out(1,0.5)"},${r3(W(7, "marcados") + 0.2)});`);
  pose(S, T3, W(7, "marcados") + 0.2, { mouth: "smile", brows: -3 }, 0.3);
  // 8: comedores de cebada
  clearAt(S, "#raro,#mus,#musx", L(8).start - 0.2);
  S.add(`<div id="bowl" class="prop" style="left:${zD.x - 230}px;top:${zD.y - 80}px;width:460px;height:240px;z-index:7;opacity:0">
    <svg width="460" height="240" viewBox="0 0 460 240"><path d="M20,60 L440,60 C430,190 330,230 230,230 C130,230 30,190 20,60Z" fill="#b5532f" stroke="${C.ink}" stroke-width="8"/><ellipse cx="230" cy="60" rx="210" ry="34" fill="#e3c48a" stroke="${C.ink}" stroke-width="6"/></svg></div>`);
  pop(S, "#bowl", W(8, "cebada", 1) - 0.3);
  for (let i = 0; i < 8; i++) {
    S.add(`<div id="gr${i}" class="prop" style="left:${zD.x - 200 + i * 55}px;top:${zD.y - 440}px;z-index:8;opacity:0">${icon("grains", { size: 80, color: RC.gold })}</div>`);
    S.tw(`tl.fromTo("#gr${i}",{opacity:1,y:-60},{opacity:1,y:330,duration:0.5,ease:"power2.in"},${r3(W(8, "cebada", 1) - 0.2 + i * 0.07)});tl.to("#gr${i}",{opacity:0,duration:0.1},${r3(W(8, "cebada", 1) + 0.35 + i * 0.07)});`);
  }
  label(S, "hor", zD.x, zD.y + F(240, 240), "HORDEARII", { size: F(110, 96), w: 1200, color: RC.gold });
  S.tw(`tl.fromTo("#hor",{opacity:0,scale:1.6},{opacity:1,scale:1,duration:0.3,ease:"power3.out"},${r3(W(8, "llamaban"))});`);
  label(S, "hor2", zD.x, zD.y + F(360, 350), "«LOS COMEDORES DE CEBADA»", { size: F(58, 52), w: 1300 });
  fadeUp(S, "#hor2", W(8, "comedores"));
  pose(S, T3, W(8, "comían"), { armF: -110, foreF: -100, mouth: "open" }, 0.25);
  S.tw(`tl.to("#fx1c-armF",{rotation:-140,svgOrigin:"30 -292",duration:0.2,yoyo:true,repeat:5},${r3(W(8, "comían") + 0.3)});`);
  // 9: bebida de ceniza
  clearAt(S, "#bowl,#hor,#hor2", L(9).start - 0.2);
  pose(S, T3, L(9).start, { armF: -120, foreF: -110, mouth: "neutral" }, 0.3);
  S.add(`<div id="cup" class="prop" style="left:${T3.x + 70}px;top:${G - 620}px;z-index:9;opacity:0">${icon("beer-stein", { size: 120, color: "#8a8f96" })}</div>`);
  S.tw(`tl.fromTo("#cup",{opacity:0},{opacity:1,duration:0.2},${r3(W(9, "bebida") - 0.1)});`);
  burst(S, "ash", T3.x + 130, G - 620, W(9, "ceniza", 1), { n: 14, color: "#8a8f96", spread: 160, up: 160, size: 16, seed: 9 });
  iconCard(S, "ce9", zD.x, zD.y - 40, F(300, 280), "drop-half", "CENIZA DE PLANTAS", { bg: "#d8dde8" });
  pop(S, "#ce9", W(9, "ceniza", 1));
  roman(S, "si9", zD.x, zD.y + F(300, 290), "SÍ, CENIZA", { size: F(110, 96), w: 1200, color: "#ffd38a" });
  slam(S, "#si9", W(9, "ceniza", 2));
  pose(S, T3, W(9, "sí"), { mouth: "sad", brows: 6, head: 10 }, 0.2);
  S.tw(`tl.to("#fx1c-body",{x:-4,duration:0.05,yoyo:true,repeat:9},${r3(W(9, "sí") + 0.1)});`);
  camTo(S, L(9).end + 0.05, { x: A - 1200, y: G - 2000, w: D - A + 2400, h: 2100 }, { dur: 0.7 });
  exit(S, { dur: 0.4 });
}

// ========== 3 · EL COLISEO (10-18) ==========
export function coliseo(S) {
  const { F, h } = S.fmt, L = (i) => S.line(i), W = (l, w, n) => S.W(l, w, n);
  const end = S.t1 - S.t0;
  romanSky(S, "dia"); romeSkyline(S); sandGround(S);
  const A = 3000, zA = zone(S, A);
  enter(S, spotBox(S, A, 1.2));
  // 10-11: el Coliseo por fuera, con banderas
  colosseum(S, A + F(250, 0), G, F(2400, 1500), F(1300, 1100));
  const T = actor(S, "fx2", "felix", A - F(800, 380), G, { scale: 1.35, z: 6, props: gear({ T: "loin" }) });
  life(S, T, 0, end, 11);
  for (let i = 0; i < 5; i++) {
    S.add(`<div id="fl${i}" class="prop" style="left:${A + F(250, 0) - F(1000, 650) + i * F(500, 325)}px;top:${G - F(1460, 1260)}px;z-index:3;opacity:0">${icon("flag-banner", { size: 120, color: [RC.terra, RC.purple, RC.gold, RC.terra, RC.purple][i] })}</div>`);
    S.tw(`tl.fromTo("#fl${i}",{opacity:0,y:40},{opacity:1,y:0,duration:0.3},${r3(W(10, "juegos") + i * 0.07)});tl.to("#fl${i}",{rotation:8,duration:0.3,yoyo:true,repeat:9},${r3(W(10, "juegos") + 0.4)});`);
  }
  roman(S, "jh", A + F(250, 0), G - F(1180, 1000), "¡HOY HAY JUEGOS!", { size: F(110, 84), w: 1600, color: RC.marble });
  slam(S, "#jh", W(10, "juegos"));
  pose(S, T, W(10, "juegos"), { mouth: "open", brows: -5, head: -8, look: 3 }, 0.3);
  S.tw(`tl.to("#jh",{opacity:0,y:-40,duration:0.25},${r3(L(11).start - 0.1)});`);
  roman(S, "col", A + F(250, 0), G - F(1180, 1000), "COLISEO · AÑO 80", { size: F(100, 80), w: 1600, color: RC.marble });
  slam(S, "#col", W(11, "coliseo"));
  S.add(`<div id="tik" class="card" style="left:${A + F(250, 0) - 230}px;top:${G - 560}px;width:460px;height:240px;background:${RC.gold};z-index:8;opacity:0;flex-direction:column"><div style="display:flex;align-items:center;gap:16px;font:900 70px Inter;color:${C.ink}">${icon("ticket", { size: 90, color: C.ink })}GRATIS</div></div>`);
  pop(S, "#tik", W(11, "gratis") - 0.1);
  S.tw(`tl.to("#tik",{rotation:-6,duration:0.12,yoyo:true,repeat:3},${r3(W(11, "gratis") + 0.4)});`);
  // 12: por la mañana, animales en la arena
  const B = A + 3200, zB = zone(S, B);
  stands(S, B, 6000, { seed: 7 });
  goSpot(S, L(12).start - 0.3, B, { dur: 1.0, blur: 4, k: 1.15 });
  const an = [["leon", "LEONES", W(12, "leones")], ["oso", "OSOS", W(12, "osos")]];
  an.forEach(([k, lb, t], i) => {
    const a = animal(S, `a12${i}`, k, B + F(1600, 1200), G, { s: 1.4, flip: true, z: 5 + i });
    animalWalk(S, a, t - 0.6, t + 0.3, B + F(-350 + i * 650, -250 + i * 500), { run: true });
    label(S, `l12${i}`, B + F(-350 + i * 650, -250 + i * 500), G - 500, lb, { size: 72, w: 600 });
    pop(S, `#l12${i}`, t);
  });
  // avestruz que cruza corriendo (con su gracia)
  S.add(`<div id="ost" class="actor" style="left:${B + 1500}px;top:${G - 520}px;width:320px;height:520px;z-index:7">
    <svg viewBox="-160 -520 320 520" width="320" height="520" overflow="visible">
     <g id="ostL1"><path d="M-10,-200 L-30,-20 L0,0" stroke="#d9a273" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
     <g id="ostL2"><path d="M20,-200 L40,-20 L70,0" stroke="#c98f62" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
     <ellipse cx="0" cy="-250" rx="130" ry="80" fill="#2b2420" stroke="${C.ink}" stroke-width="6"/><path d="M-120,-260 C-160,-300 -150,-200 -110,-220" fill="#efe9df" stroke="${C.ink}" stroke-width="5"/>
     <g id="ostN"><path d="M90,-290 C110,-360 90,-420 110,-470" stroke="#e0b48c" stroke-width="20" fill="none" stroke-linecap="round"/><ellipse cx="120" cy="-480" rx="28" ry="20" fill="#e0b48c" stroke="${C.ink}" stroke-width="5"/><path d="M144,-480 L176,-474 L146,-466Z" fill="#d9a72b" stroke="${C.ink}" stroke-width="3"/><circle cx="124" cy="-486" r="5" fill="${C.ink}"/></g>
    </svg></div>`);
  const tA = W(12, "avestruces");
  S.tw(`tl.fromTo("#ost",{x:600},{x:${-F(2600, 2100)},duration:1.6,ease:"none"},${r3(tA - 0.6)});`);
  S.tw(`tl.fromTo("#ostL1",{rotation:-30},{immediateRender:false,rotation:30,svgOrigin:"-10 -200",duration:0.12,yoyo:true,repeat:13},${r3(tA - 0.6)});tl.fromTo("#ostL2",{rotation:30},{immediateRender:false,rotation:-30,svgOrigin:"20 -200",duration:0.12,yoyo:true,repeat:13},${r3(tA - 0.6)});tl.fromTo("#ostN",{rotation:-8},{immediateRender:false,rotation:8,svgOrigin:"90 -290",duration:0.12,yoyo:true,repeat:13},${r3(tA - 0.6)});`);
  label(S, "l12o", B, G - F(760, 900), "¿¡AVESTRUCES!?", { size: F(110, 90), w: 1400, color: RC.gold });
  slam(S, "#l12o", tA);
  roar(S, tA, 3);
  // 13: Félix espera en los túneles
  const Cc = B + 3600, zC = zone(S, Cc);
  tunnel(S, Cc, 4000);
  goSpot(S, L(13).start - 0.3, Cc, { dur: 1.0, blur: 4 });
  const T2 = actor(S, "fx2b", "felix", Cc - F(200, 0), G, { scale: 1.35, z: 6, props: gear({ T: "loin" }) });
  life(S, T2, 0, end, 12);
  pose(S, T2, W(13, "espera"), { armF: -30, foreF: -100, armB: 30, foreB: -100, mouth: "sad", head: 6 }, 0.3);
  shiver(S, T2, W(13, "rugir"), L(13).end);
  for (let i = 0; i < 3; i++) {
    S.add(`<div id="wv${i}" class="prop" style="left:${Cc - 400 + i * 300}px;top:${G - 1250}px;z-index:7;opacity:0">${icon("waveform", { size: 160, color: "#ffd38a" })}</div>`);
    S.tw(`tl.fromTo("#wv${i}",{opacity:0,y:-40},{opacity:1,y:40,duration:0.5,yoyo:true,repeat:3},${r3(W(13, "rugir") - 0.2 + i * 0.15)});`);
  }
  burst(S, "dust13", Cc, G - 1350, W(13, "arena"), { n: 18, color: "#c9a06a", spread: 600, up: -200, size: 10, seed: 13, dur: 1.4 });
  S.cue(W(13, "rugir"), "crowd", 0.7);
  // 14-16: los dos luchadores
  const D = Cc + 3400, zD = zone(S, D);
  stands(S, D + 1000, 7000, { seed: 9 });
  goSpot(S, L(14).start - 0.3, D, { dur: 1.0, blur: 4 });
  roman(S, "vs", zD.x, zD.y - F(150, 150), "¿CONTRA QUIÉN?", { size: F(120, 96), w: 1500, color: RC.marble });
  slam(S, "#vs", W(14, "quién"));
  S.tw(`tl.to("#vs",{opacity:0,y:-60,duration:0.25},${r3(L(15).start - 0.1)});`);
  const Fx = actor(S, "fxm", "felix", zD.chx + F(80, 0), G, { scale: 1.4, z: 7, props: gear({ T: "loin", H: "helmet", F: "shield", B: "sword" }) });
  life(S, Fx, 0, end, 13);
  S.tw(`tl.fromTo("#fxm",{opacity:0},{opacity:1,duration:0.3},${r3(L(15).start - 0.2)});`);
  const tags15 = [["CASCO CON PEZ", G - 640, W(15, "casco")], ["ESCUDO ENORME", G - 380, W(15, "escudo")], ["ESPADA CORTA", G - 150, W(15, "espada")]];
  tags15.forEach(([lb, y, t], i) => {
    const lx = Fx.x + F(430, 260);
    S.add(`<div id="t15${i}" class="prop" style="left:${lx}px;top:${y - 45}px;z-index:11;opacity:0;background:${RC.marble};border:5px solid ${C.ink};border-radius:16px;padding:4px 20px;font:900 ${F(58, 50)}px Inter;color:${C.ink};box-shadow:0 6px 0 ${C.ink};white-space:nowrap">${lb}</div>`);
    arrow(S, `ar15${i}`, lx, y, Fx.x + 90, y, t - 0.05, { dur: 0.3, bend: 0.1, w: 10 });
    fadeUp(S, `#t15${i}`, t, { dy: 20 });
  });
  roman(S, "mir", Fx.x + F(650, 300), G - F(860, 1000), "MIRMILLÓN", { size: F(110, 96), w: 1100, color: RC.gold });
  slam(S, "#mir", W(15, "mirmillón"));
  pose(S, Fx, W(15, "mirmillón"), { armB: -150, foreB: -20, mouth: "open", brows: -6 }, 0.3);
  // el reciario entra girando el tridente
  clearAt(S, "#t150,#t151,#t152,#ar150,#ar151,#ar152,#mir", L(16).start - 0.2);
  const Rt = actor(S, "rt", "ret", D + F(1900, 1300), G, { scale: 1.4, z: 7, flip: true, props: gear({ T: "loin", F: "trident", B: "net" }) });
  life(S, Rt, 0, end, 14);
  walk(S, Rt, L(16).start - 0.3, W(16, "reciario") + 0.4, D + F(550, 280), { run: true });
  camTo(S, L(16).start - 0.1, spotBox(S, D + F(300, 150), 1.0), { dur: 0.8 });
  roman(S, "ret", Rt.x + F(0, 0), G - F(900, 1080), "RECIARIO", { size: F(110, 96), w: 1100, color: RC.gold });
  slam(S, "#ret", W(16, "reciario"));
  const r16 = [["SIN CASCO", W(16, "casco"), false], ["SIN ESCUDO", W(16, "escudo"), false], ["RED", W(16, "red"), true], ["TRIDENTE", W(16, "tridente"), true], ["PUÑAL", W(16, "puñal"), true]];
  r16.forEach(([lb, t, ok], i) => {
    const x = h ? Rt.x + (i % 2 ? 360 : -360) : Rt.x + (i % 2 ? 250 : -250), y = G - (h ? 760 - Math.floor(i / 2) * 110 : 920 - Math.floor(i / 2) * 105);
    S.add(`<div id="r16${i}" class="prop" style="left:${x - 220}px;top:${y - 45}px;width:440px;text-align:center;z-index:11;opacity:0"><span style="display:inline-flex;align-items:center;gap:10px;background:${ok ? "#dff2e3" : "#f8ddd6"};border:5px solid ${C.ink};border-radius:16px;padding:4px 18px;font:900 ${F(52, 46)}px Inter;color:${C.ink};box-shadow:0 6px 0 ${C.ink}">${icon(ok ? "check-fat" : "x", { size: 50, color: ok ? C.green : C.red, weight: ok ? "fill" : "bold" })}${lb}</span></div>`);
    pop(S, `#r16${i}`, t);
  });
  S.tw(`tl.to("#rt-armF",{rotation:-40,svgOrigin:"30 -292",duration:0.2,yoyo:true,repeat:5},${r3(W(16, "tridente"))});`);
  // 17: más rápido; si te atrapa la red, se acabó
  clearAt(S, "#ret,#r160,#r161,#r162,#r163,#r164", L(17).start - 0.2);
  const bz = F({ x: D + 300, y: G - 820 }, { x: D + 150, y: G - 1150 });
  bar(S, "sp1", bz.x, bz.y - 40, F(800, 760), { label: "RECIARIO", ic: "lightning", color: C.green, from: 0.1, to: 0.95, t: W(17, "rápido") - 0.3, dur: 0.6, show: W(17, "injusto") });
  bar(S, "sp2", bz.x, bz.y + 150, F(800, 760), { label: "MIRMILLÓN", ic: "shield", color: C.red, from: 0.1, to: 0.45, t: W(17, "rápido") - 0.3, dur: 0.6, show: W(17, "injusto") });
  roman(S, "aca", bz.x, bz.y + F(360, 340), "¡SE ACABÓ!", { size: F(96, 84), w: 1000, color: "#ffb4a8" });
  slam(S, "#aca", W(17, "acabó"));
  pose(S, Fx, W(17, "red"), { mouth: "sad", brows: 5 }, 0.25);
  // 18: hay árbitro
  clearAt(S, "#sp1,#sp2,#aca", L(18).start - 0.2);
  const Ar = actor(S, "arb", "arbitro", D + F(300, 150), G, { scale: 1.35, z: 8, props: { F: GEAR.staff } });
  S.tw(`tl.fromTo("#arb",{opacity:0,y:-200},{opacity:1,y:0,duration:0.4,ease:"bounce.out"},${r3(W(18, "árbitro") - 0.3)});`);
  life(S, Ar, L(18).start, end, 15);
  roman(S, "arbl", D + F(300, 150), G - F(860, 1020), "ÁRBITRO", { size: F(110, 96), w: 1000, color: RC.marble });
  slam(S, "#arbl", W(18, "árbitro"));
  pose(S, Ar, W(18, "palo"), { armF: -90, foreF: 0, mouth: "open", brows: -4 }, 0.3);
  pose(S, Fx, W(18, "separarlos"), { body: -8 }, 0.3); pose(S, Rt, W(18, "separarlos"), { body: -8 }, 0.3);
  camTo(S, L(18).end + 0.05, { x: A - 1200, y: G - 2000, w: D - A + 3200, h: 2100 }, { dur: 0.7 });
  exit(S, { dur: 0.4 });
}

// ========== 4 · EL COMBATE (19-30) ==========
export function combate(S) {
  const { F, h } = S.fmt, L = (i) => S.line(i), W = (l, w, n) => S.W(l, w, n);
  const end = S.t1 - S.t0;
  romanSky(S, "tarde"); romeSkyline(S, { far: "#8f86a8", mid: "#b98c78" }); sandGround(S);
  const A = 3000, zA = zone(S, A);
  stands(S, A + 2000, 9000, { seed: 11 });
  enter(S, spotBox(S, A, 1.05));
  const Fx = actor(S, "fxc", "felix", A - F(330, 200), G, { scale: 1.4, z: 7, props: gear({ T: "loin", H: "helmet", F: "shield", B: "sword" }) });
  const Rt = actor(S, "rtc", "ret", A + F(420, 230), G, { scale: 1.4, z: 7, flip: true, props: gear({ T: "loin", F: "trident", B: "net" }) });
  life(S, Fx, 0, end, 21); life(S, Rt, 0, end, 22);
  // 19: ¡empieza el combate!
  roman(S, "go", A, G - F(800, 1050), "¡EMPIEZA EL COMBATE!", { size: F(110, 80), w: 1700, color: RC.gold });
  slam(S, "#go", W(19, "combate")); roar(S, W(19, "combate"), 3); shake(S, W(19, "combate"), 16, 0.35);
  S.tw(`tl.to("#go",{opacity:0,scale:0.7,duration:0.25},${r3(L(20).start - 0.1)});`);
  pose(S, Fx, W(19, "empieza"), { body: -6, armB: -120, foreB: -30, brows: -6, mouth: "neutral" }, 0.3);
  pose(S, Rt, W(19, "empieza"), { body: -6, armF: -60, brows: -6 }, 0.3);
  // 20: la red vuela... y falla. Félix ataca
  const tRed = W(20, "red");
  pose(S, Rt, tRed - 0.2, { armB: -160 }, 0.15, "power2.out");
  pose(S, Rt, tRed, { armB: -40 }, 0.12, "power4.in");
  S.add(`<svg id="netF" class="prop" style="left:${Rt.x - 100}px;top:${G - 560}px;z-index:9;opacity:0" width="220" height="220" viewBox="-110 -110 220 220"><circle r="100" fill="rgba(230,220,190,.25)" stroke="#d8c9a0" stroke-width="6"/>${[-60, -30, 0, 30, 60].map((k) => `<path d="M${k},-95 L${k},95 M-95,${k} L95,${k}" stroke="#d8c9a0" stroke-width="4"/>`).join("")}</svg>`);
  S.tw(`tl.set("#netF",{opacity:1},${r3(tRed + 0.05)});tl.fromTo("#netF",{x:0,y:0,rotation:0,scale:0.4},{keyframes:[{x:${-F(450, 260)},y:-220,rotation:-180,scale:1.2,duration:0.35,ease:"power1.out"},{x:${-F(1000, 600)},y:430,rotation:-360,scale:1,duration:0.4,ease:"power1.in"}]},${r3(tRed + 0.05)});`);
  S.cue(tRed + 0.05, "whoosh", 0.8);
  roman(S, "fal", A, G - F(820, 1050), "¡FALLA!", { size: F(120, 100), w: 1000, color: "#d8f5d8" });
  slam(S, "#fal", W(20, "falla"));
  pose(S, Fx, W(20, "falla") - 0.1, { body: 14, head: -6 }, 0.12);
  S.tw(`tl.to("#fal",{opacity:0,duration:0.2},${r3(W(20, "ataca") - 0.1)});`);
  const tAt = W(20, "ataca");
  S.tw(`tl.to("#fxc",{x:"+=${F(260, 130)}",duration:0.25,ease:"power3.in"},${r3(tAt - 0.1)});`);
  pose(S, Fx, tAt - 0.1, { armB: -200, foreB: -20, body: -12, mouth: "open", brows: -7 }, 0.1);
  pose(S, Fx, tAt + 0.1, { armB: -70, foreB: 0, body: 10 }, 0.1, "power4.in");
  S.cue(tAt + 0.1, "hit", 1); shake(S, tAt + 0.12, 12, 0.25);
  pose(S, Rt, tAt + 0.12, { body: 12, head: 8, mouth: "open" }, 0.15);
  // 21: el tridente le roza el brazo, Félix tropieza y cae
  const tRo = W(21, "roza");
  pose(S, Rt, tRo - 0.15, { armF: -110, foreF: 0, body: -14, mouth: "open", brows: -7 }, 0.12, "power4.in");
  S.add(`<div id="flash" class="prop" style="left:${A - 4000}px;top:${G - 4000}px;width:8000px;height:8000px;background:rgba(229,72,77,.35);z-index:12;opacity:0"></div>`);
  S.tw(`tl.fromTo("#flash",{opacity:0},{opacity:1,duration:0.06,yoyo:true,repeat:1},${r3(tRo)});`);
  S.cue(tRo, "hit", 1); shake(S, tRo, 14, 0.25);
  pose(S, Fx, tRo, { mouth: "open", brows: 6, armF: -20 }, 0.1);
  const tCae = W(21, "cae");
  S.tw(`tl.to("#fxc-body",{rotation:-78,svgOrigin:"-60 0",duration:0.35,ease:"power3.in"},${r3(W(21, "tropieza"))});`);
  S.cue(tCae, "impact", 0.9); shake(S, tCae + 0.05, 18, 0.35);
  burst(S, "dustF", Fx.x + F(130, 70), G - 20, tCae, { n: 16, color: RC.sand2, spread: 260, up: 120, size: 18, seed: 21 });
  pose(S, Rt, tCae, { armF: -60, foreF: 0, body: 0, mouth: "smile", brows: -6 }, 0.3);
  // 22: 50.000 gritan a la vez
  roar(S, W(22, "gritan"), 4); shake(S, W(22, "gritan"), 16, 0.6);
  counter(S, "n22", A, G - F(800, 1060), { from: 49000, to: 50000, t: W(22, "cincuenta") - 0.2, dur: 0.5, size: F(160, 130), w: 1200, color: RC.gold });
  S.tw(`tl.fromTo("#n22",{opacity:0},{opacity:1,duration:0.2},${r3(W(22, "cincuenta") - 0.2)});tl.to("#n22",{opacity:0,duration:0.2},${r3(L(23).start - 0.1)});`);
  // 23: el reciario levanta el tridente... ¿es el final? (cámara lenta y oscuridad)
  S.add(`<div id="vig" class="prop" style="left:${A - 4000}px;top:${G - 4000}px;width:8000px;height:8000px;background:radial-gradient(closest-side,rgba(0,0,0,0) 0,rgba(0,0,0,0) 10%,rgba(0,0,0,.75) 40%);z-index:10;opacity:0"></div>`);
  pose(S, Rt, W(23, "levanta"), { armF: -175, foreF: -10, body: -4, mouth: "open", brows: -8 }, 0.6, "power2.out");
  camTo(S, W(23, "levanta"), h ? { x: A - 450, y: G - 760, w: 1000, h: 820 } : { x: A - 380, y: G - 1000, w: 780, h: 1060 }, { dur: 1.8, ease: "sine.inOut" });
  S.tw(`tl.to("#vig",{opacity:1,duration:0.8},${r3(W(23, "levanta"))});`);
  label(S, "fin", A, G - F(700, 920), "¿ES EL FINAL?", { size: F(110, 96), w: 1200, color: "#ffb4a8" });
  slam(S, "#fin", W(23, "final")); S.cue(W(23, "final") - 0.5, "riser", 0.7);
  // 24: Félix levanta un dedo: clemencia
  S.tw(`tl.to("#fin",{opacity:0,duration:0.2},${r3(L(24).start - 0.1)});`);
  pose(S, Fx, W(24, "dedo") - 0.2, { armF: -150, foreF: -30, mouth: "sad", brows: 6 }, 0.35);
  S.add(`<div id="cle" class="prop" style="left:${Fx.x - 260}px;top:${G - 820}px;width:520px;text-align:center;z-index:11;opacity:0"><span style="display:inline-flex;align-items:center;gap:12px;background:${RC.marble};border:5px solid ${C.ink};border-radius:18px;padding:6px 22px;font:900 ${F(58, 52)}px Inter;color:${C.ink};box-shadow:0 6px 0 ${C.ink}">${icon("hand-palm", { size: 60, color: C.ochreD })}¡PIEDAD!</span></div>`);
  pop(S, "#cle", W(24, "piedad"));
  // 25-26: el mito del pulgar
  clearAt(S, "#cle", L(25).start - 0.2);
  S.tw(`tl.to("#vig",{opacity:0.45,duration:0.4},${r3(L(25).start)});`);
  camTo(S, L(25).start - 0.1, spotBox(S, A, 1.05), { dur: 0.6 });
  const th = F({ x: A + 520, y: G - 640 }, { x: A, y: G - 1080 });
  iconCard(S, "thd", th.x, th.y, F(320, 300), "thumbs-down", "EL GRAN MITO", { bg: "#f8ddd6", color: C.redD });
  pop(S, "#thd", W(25, "pulgar"));
  wobble(S, "#thd", W(25, "abajo"), 4, 8);
  iconCard(S, "q26", th.x + F(330, 260), th.y - F(140, 160), 190, "question", "", { bg: RC.gold });
  pop(S, "#q26", W(26, "nadie"));
  label(S, "q26b", th.x, th.y + F(260, 260), "NADIE LO SABE SEGURO", { size: F(62, 56), w: 1200, color: "#ffd38a" });
  fadeUp(S, "#q26b", W(26, "seguro"));
  // 27: «¡que viva!»
  clearAt(S, "#thd,#q26,#q26b", L(27).start - 0.2);
  S.tw(`tl.to("#vig",{opacity:0,duration:0.5},${r3(L(27).start)});`);
  roar(S, W(27, "grita"), 4);
  roman(S, "viva", A, G - F(800, 1060), "¡QUE VIVA!", { size: F(150, 120), w: 1300, color: "#d8f5d8" });
  slam(S, "#viva", W(27, "viva"));
  S.tw(`tl.to("#fxc-body",{rotation:0,svgOrigin:"-60 0",duration:0.5,ease:"back.out(1.5)"},${r3(W(27, "viva") + 0.2)});`);
  pose(S, Fx, W(27, "viva") + 0.3, { armF: -20, foreF: -20, mouth: "smile", brows: -2 }, 0.3);
  pose(S, Rt, W(27, "viva"), { armF: -60, foreF: 0, mouth: "sad", brows: 4 }, 0.3);
  // 28: un gladiador costaba mucho dinero
  clearAt(S, "#viva", L(28).start - 0.2);
  const Lz = actor(S, "lzc", "lanista", A - F(820, 420), G, { scale: 1.3, z: 8 });
  S.tw(`tl.fromTo("#lzc",{opacity:0,x:-300},{opacity:1,x:0,duration:0.4,ease:"power3.out"},${r3(W(28, "dueño") - 0.5)});`);
  life(S, Lz, L(28).start, end, 23);
  pose(S, Lz, W(28, "perderlo"), { armF: -28, foreF: -110, armB: 30, foreB: -100, mouth: "open", brows: 7 }, 0.3);
  for (let i = 0; i < 7; i++) {
    S.add(`<div id="cn${i}" class="prop" style="left:${A + F(350, 0) - 300 + i * 90}px;top:${G - F(900, 1150)}px;z-index:10;opacity:0">${icon("coins", { size: 110, color: RC.gold })}</div>`);
    S.tw(`tl.fromTo("#cn${i}",{opacity:0,y:-200},{opacity:1,y:0,duration:0.45,ease:"bounce.out"},${r3(W(28, "dinero") - 0.3 + i * 0.06)});`);
  }
  label(S, "din", A + F(350, 0), G - F(700, 960), "MUCHÍSIMO DINERO", { size: F(70, 62), w: 1100, color: RC.gold });
  fadeUp(S, "#din", W(28, "muchísimo"));
  // 29: la mayoría de combates no acababa en muerte
  clearAt(S, "#din," + ids("cn", 7), L(29).start - 0.2);
  const pp = F({ x: A + 350, y: G - 760 }, { x: A, y: G - 1060 });
  let sw = "";
  for (let i = 0; i < 5; i++) sw += `<div id="cb${i}" style="display:inline-block;margin:0 10px;opacity:0">${icon(i === 4 ? "skull" : "shield", { size: F(130, 110), color: i === 4 ? C.red : C.green })}</div>`;
  S.add(`<div id="row29" class="prop" style="left:${pp.x - 500}px;top:${pp.y - 80}px;width:1000px;text-align:center;z-index:10;filter:drop-shadow(0 6px 0 ${C.ink})">${sw}</div>`);
  for (let i = 0; i < 5; i++) S.tw(`tl.fromTo("#cb${i}",{opacity:0,y:40},{opacity:1,y:0,duration:0.3,ease:"back.out(2)"},${r3(W(29, "combates") - 0.2 + i * 0.1)});`);
  label(S, "may", pp.x, pp.y + F(180, 170), "LA MAYORÍA NO ACABABA EN MUERTE", { size: F(60, 50), w: 1500, color: "#d8f5d8" });
  fadeUp(S, "#may", W(29, "muerte") - 0.2);
  // 30: no es la carnicería de las películas
  clearAt(S, "#row29,#may", L(30).start - 0.2);
  iconCard(S, "pel", pp.x, pp.y + 40, F(300, 280), "film-slate", "PELÍCULAS");
  pop(S, "#pel", W(30, "películas") - 0.3);
  mark(S, "pelx", pp.x, pp.y + 40, 240, W(30, "películas"), false);
  camTo(S, L(30).end + 0.05, spotBox(S, A, 1.6), { dur: 0.7 });
  exit(S, { dur: 0.4 });
}

// ========== 5 · DESPUÉS DEL COMBATE (31-38) ==========
export function despues(S) {
  const { F, h } = S.fmt, L = (i) => S.line(i), W = (l, w, n) => S.W(l, w, n);
  const end = S.t1 - S.t0;
  romanSky(S, "tarde"); romeSkyline(S, { far: "#8f86a8", mid: "#b98c78" }); sandGround(S);
  S.bg.push(`<div id="${S.id}-night" class="layer" style="width:${S.fmt.W}px;height:${S.fmt.H}px;background:linear-gradient(180deg,#0b1022,#1f2a4a 62%,#4a3348);opacity:0"></div>`);
  S.tw(`tl.to("#${S.id}-night",{opacity:1,duration:1},${r3(L(33).start - 0.8)});`);
  const A = 3000, zA = zone(S, A);
  ludus(S, A, 4000);
  enter(S, spotBox(S, A));
  const T = actor(S, "fxd", "felix", zA.chx, G, { scale: 1.35, z: 6, props: gear({ T: "loin" }) });
  life(S, T, 0, end, 31);
  const Gl = actor(S, "gal", "galeno", zA.chx + F(330, 290), G, { scale: 1.3, z: 7, flip: true });
  life(S, Gl, 0, end, 32);
  // 31: el médico cose la herida
  pose(S, T, 0, { armF: -60, foreF: -20, mouth: "sad", brows: 4 }, 0.01);
  S.add(`<div id="wnd" class="prop" style="left:${T.x + 40}px;top:${G - 520}px;width:70px;height:16px;background:${C.red};border-radius:8px;z-index:9;transform:rotate(-30deg)"></div>`);
  pose(S, Gl, W(31, "cose") - 0.1, { armF: -80, foreF: -50, head: 8, look: -3 }, 0.3);
  S.tw(`tl.to("#gal-foreF",{rotation:-90,svgOrigin:"30 -228",duration:0.18,yoyo:true,repeat:7},${r3(W(31, "cose") + 0.2)});`);
  S.tw(`tl.to("#wnd",{backgroundColor:"#e6c9a0",duration:1.2},${r3(W(31, "cose") + 0.3)});`);
  iconCard(S, "med", zA.x + F(150, 0), zA.y - 60, F(290, 270), "first-aid", "MÉDICO", {});
  pop(S, "#med", W(31, "médico"));
  pose(S, T, W(31, "herida"), { mouth: "open", brows: 7 }, 0.2);
  // 32: Galeno, médico de un emperador
  clearAt(S, "#med", L(32).start - 0.2);
  roman(S, "galn", zA.x + F(150, 0), zA.y - F(200, 220), "GALENO", { size: F(130, 116), w: 1100, color: RC.marble });
  slam(S, "#galn", W(32, "galeno"));
  iconCard(S, "emp", zA.x + F(150, 0), zA.y + F(120, 120), F(280, 260), "crown-simple", "EMPERADOR", { bg: RC.gold });
  pop(S, "#emp", W(32, "emperador"));
  pose(S, Gl, W(32, "galeno"), { armF: -20, foreF: -20, mouth: "smile", brows: -3, head: 0 }, 0.3);
  // 33: de noche: los gladiadores eran estrellas
  clearAt(S, "#galn,#emp", L(33).start - 0.2);
  const B = A + 2800, zB = zone(S, B);
  wall(S, B + 300, 4200);
  goSpot(S, L(33).start - 0.3, B, { dur: 1.0, blur: 4 });
  const T2 = actor(S, "fxe", "felix", zB.chx, G, { scale: 1.35, z: 6, props: gear({ T: "loin" }) });
  life(S, T2, 0, end, 33);
  for (let i = 0; i < 6; i++) {
    S.add(`<div id="st${i}" class="prop" style="left:${T2.x - 260 + (i % 3) * 200}px;top:${G - 900 - Math.floor(i / 3) * 140}px;z-index:9;opacity:0">${icon("star", { size: 90, color: RC.gold })}</div>`);
    S.tw(`tl.fromTo("#st${i}",{opacity:0,scale:0,rotation:-90},{opacity:1,scale:1,rotation:0,duration:0.35,ease:"back.out(2)"},${r3(W(33, "estrellas") - 0.1 + i * 0.06)});`);
  }
  pose(S, T2, W(33, "estrellas"), { armF: -160, armB: 150, mouth: "smile", brows: -5 }, 0.3);
  // 34: pintada de Pompeya
  clearAt(S, ids("st", 6), L(34).start - 0.2);
  pose(S, T2, L(34).start, { armF: 0, armB: 0, mouth: "neutral" }, 0.3);
  const gx = F({ x: zB.x + 120, y: zB.y - 230 }, { x: zB.x, y: zB.y - 280 });
  S.add(`<div id="graf" class="prop" style="left:${gx.x - 650}px;top:${gx.y - 120}px;width:1300px;text-align:center;z-index:7;background:rgba(236,222,190,.96);border:6px solid #b59a6a;border-radius:10px;padding:26px 20px;font-family:'Rock Salt';font-size:${F(76, 58)}px;color:#a8282a;line-height:1.5;transform:rotate(-3deg)"><span id="grafT"></span></div>`);
  typeOn(S, "grafT", "CELADVS SVSPIRIVM PVELLARVM", W(34, "pintadas") - 0.1, 1.2);
  label(S, "tr34", gx.x, gx.y + F(250, 260), "«EL SUSPIRO DE LAS CHICAS»", { size: F(66, 56), w: 1400, color: RC.marble });
  fadeUp(S, "#tr34", W(34, "suspiro") - 0.1);
  for (let i = 0; i < 5; i++) {
    S.add(`<div id="hr${i}" class="prop" style="left:${gx.x - 400 + i * 200}px;top:${gx.y + 80}px;z-index:9;opacity:0">${icon("heart", { size: 70, color: "#e5484d" })}</div>`);
    S.tw(`tl.fromTo("#hr${i}",{opacity:0,y:0},{opacity:1,y:-160,duration:1.2,ease:"sine.out"},${r3(W(34, "chicas") + i * 0.12)});tl.to("#hr${i}",{opacity:0,duration:0.3},${r3(W(34, "chicas") + 1 + i * 0.12)});`);
  }
  pose(S, T2, W(34, "chicas"), { mouth: "smile", brows: -6, head: -6 }, 0.3);
  // 35: sangre de gladiador (lo más asqueroso)
  clearAt(S, "#graf,#tr34", L(35).start - 0.2);
  iconCard(S, "cup35", zB.x + F(-120, -200), zB.y - 60, F(290, 260), "wine", "SANGRE", { bg: "#f8ddd6", color: C.redD });
  pop(S, "#cup35", W(35, "sangre"));
  iconCard(S, "ep35", zB.x + F(350, 200), zB.y - 60, F(290, 260), "pill", "¿CURA?", {});
  pop(S, "#ep35", W(35, "epilepsia"));
  mark(S, "ep35m", zB.x + F(350, 200), zB.y - 60, 220, W(35, "epilepsia") + 0.4, false);
  label(S, "asq", zB.x + F(120, 0), zB.y - F(330, 360), "¡PUAJ!", { size: F(120, 110), w: 900, color: "#c9f0cf" });
  slam(S, "#asq", W(35, "asqueroso"));
  pose(S, T2, W(35, "asqueroso"), { mouth: "open", brows: 7, head: 12, body: 8 }, 0.2);
  S.tw(`tl.to("#asq",{opacity:0,duration:0.2},${r3(W(35, "romanos"))});`);
  // 36: también hubo mujeres gladiadoras
  clearAt(S, "#cup35,#ep35,#ep35m", L(36).start - 0.2);
  pose(S, T2, L(36).start, { mouth: "neutral", brows: 0, head: 0, body: 0 }, 0.3);
  const Gw = actor(S, "glw", "gladia", zB.chx + F(380, 330), G, { scale: 1.35, z: 7, flip: true, props: gear({ F: "shield", B: "sword" }) });
  S.tw(`tl.fromTo("#glw",{opacity:0,x:400},{opacity:1,x:0,duration:0.5,ease:"power3.out"},${r3(W(36, "mujeres") - 0.5)});`);
  life(S, Gw, L(36).start, end, 34);
  pose(S, Gw, W(36, "gladiadoras"), { armB: -160, foreB: -10, mouth: "smile", brows: -5 }, 0.3);
  roman(S, "gw", zB.x + F(250, 0), zB.y - F(250, 300), "GLADIADORAS", { size: F(120, 100), w: 1300, color: RC.gold });
  slam(S, "#gw", W(36, "gladiadoras"));
  // 37-38: la rudis y la libertad
  clearAt(S, "#gw", L(37).start - 0.2);
  S.tw(`tl.to("#glw",{opacity:0,duration:0.3},${r3(L(37).start)});`);
  const rp = F({ x: zB.x + 200, y: zB.y - 140 }, { x: zB.x, y: zB.y - 160 });
  S.add(`<div id="rud" class="prop" style="left:${rp.x - 360}px;top:${rp.y - 80}px;width:720px;height:160px;z-index:9;opacity:0">
    <svg width="720" height="160" viewBox="0 0 720 160"><path d="M60,80 L600,80" stroke="#a0703c" stroke-width="40" stroke-linecap="round"/><path d="M600,80 L680,80" stroke="#a0703c" stroke-width="30" stroke-linecap="round"/><path d="M120,30 L120,130" stroke="#7a4a22" stroke-width="26" stroke-linecap="round"/><path d="M60,80 L600,80" stroke="${C.ink}" stroke-width="4" fill="none" opacity=".4"/></svg></div>`);
  S.tw(`tl.fromTo("#rud",{opacity:0,scale:0.3,rotation:-30},{opacity:1,scale:1,rotation:0,duration:0.5,ease:"back.out(1.8)"},${r3(W(37, "espada") - 0.2)});`);
  S.add(`<div id="rudg" class="prop" style="left:${rp.x - 500}px;top:${rp.y - 250}px;width:1000px;height:500px;border-radius:50%;background:radial-gradient(closest-side,rgba(255,220,120,.6),rgba(255,220,120,0));z-index:8;opacity:0"></div>`);
  S.tw(`tl.to("#rudg",{opacity:1,duration:0.5},${r3(W(37, "rudis"))});`);
  roman(S, "rudl", rp.x, rp.y + F(190, 190), "RUDIS", { size: F(110, 96), w: 900, color: RC.gold });
  slam(S, "#rudl", W(37, "rudis"));
  label(S, "jub", rp.x, rp.y - F(240, 260), "JUBILACIÓN", { size: F(70, 62), w: 900 });
  fadeUp(S, "#jub", W(38, "jubilación"));
  iconCard(S, "lib", rp.x, rp.y + F(380, 400), F(270, 250), "link-break", "LIBERTAD", { bg: "#dff2e3", color: C.greenD });
  pop(S, "#lib", W(38, "libertad"));
  burst(S, "libb", rp.x, rp.y + 300, W(38, "libertad") + 0.1, { n: 22, color: RC.gold, spread: 500, up: 300, size: 16, seed: 38 });
  pose(S, T2, W(38, "libertad"), { armF: -165, armB: 160, mouth: "smile", brows: -6, head: -6 }, 0.3);
  camTo(S, L(38).end + 0.05, { x: A - 1200, y: G - 2000, w: B - A + 2600, h: 2100 }, { dur: 0.7 });
  exit(S, { dur: 0.4 });
}

// ========== 6 · CIERRE (39-43) ==========
export function cierre(S) {
  const { F, h } = S.fmt, L = (i) => S.line(i), W = (l, w, n) => S.W(l, w, n);
  const end = S.t1 - S.t0;
  romanSky(S, "noche"); romeSkyline(S, { far: "#2b3556", mid: "#3d3a58" }); sandGround(S, { top: "#b89a6a", bottom: "#8a7048" });
  const A = 3000, z = zone(S, A);
  colosseum(S, A + F(700, 0), G, F(2400, 1500), F(1300, 1100));
  enter(S, spotBox(S, A));
  const T = actor(S, "fxz", "felix", z.chx, G, { scale: 1.35, z: 6, props: gear({ T: "loin", H: "helmet", B: "wood" }) });
  life(S, T, 0, end, 41);
  // 39: resumen (tres sellos)
  cardsAt(S, "c39", z.x, z.y - F(60, 40), [["grains", "CEBADA", W(39, "cebada")], ["megaphone", "ÁRBITRO", W(39, "árbitro")], ["star", "ESTRELLAS DEL ROCK", W(39, "rock"), null, RC.gold]], { size: F(270, 250), cols: h ? 3 : 1, gap: 26 });
  pose(S, T, W(39, "rock"), { armB: -160, foreB: -10, mouth: "smile", brows: -5 }, 0.3);
  // 40: suscríbete y me gusta
  clearAt(S, ids("c39", 3), L(40).start - 0.2);
  const bxy = F({ x: z.x + 120, y: z.y - 160 }, { x: z.x, y: z.y - 160 });
  S.add(`<div id="sub" class="prop" style="left:${bxy.x - 330}px;top:${bxy.y - 75}px;width:660px;height:150px;z-index:9;opacity:0;background:#d93a3a;border:7px solid ${C.ink};border-radius:80px;box-shadow:0 10px 0 ${C.ink};display:flex;align-items:center;justify-content:center;gap:20px;font:900 70px Inter;color:#fff">${icon("bell-ringing", { size: 80, color: "#fff" })}SUSCRIBIRSE</div>
    <div id="like" class="prop" style="left:${bxy.x - 110}px;top:${bxy.y + 120}px;width:220px;height:200px;z-index:9;opacity:0;background:${C.bone};border:7px solid ${C.ink};border-radius:40px;box-shadow:0 10px 0 ${C.ink};display:flex;align-items:center;justify-content:center"><div id="likeI">${icon("thumbs-up", { size: 130, color: "#9aa3ad" })}</div></div>
    <div id="cur" class="prop" style="left:${bxy.x + 360}px;top:${bxy.y + 200}px;z-index:12;opacity:0">${icon("cursor", { size: 110, color: "#fff" })}</div>`);
  pop(S, "#sub", W(40, "suscríbete") - 0.3);
  S.tw(`tl.fromTo("#cur",{opacity:0,x:200,y:120},{opacity:1,x:0,y:0,duration:0.4,ease:"power2.out"},${r3(W(40, "suscríbete") - 0.2)});tl.to("#cur",{x:-200,y:-150,duration:0.3,ease:"power2.inOut"},${r3(W(40, "suscríbete") + 0.15)});tl.to("#cur",{scale:0.85,duration:0.08,yoyo:true,repeat:1},${r3(W(40, "suscríbete") + 0.45)});`);
  S.cue(W(40, "suscríbete") + 0.45, "click");
  S.tw(`tl.to("#sub",{backgroundColor:"#7a7f88",duration:0.15},${r3(W(40, "suscríbete") + 0.5)});`);
  pop(S, "#like", W(40, "gusta") - 0.4);
  S.tw(`tl.to("#cur",{x:-470,y:90,duration:0.3,ease:"power2.inOut"},${r3(W(40, "gusta") - 0.3)});tl.to("#likeI path",{fill:"${C.ochre}",duration:0.15},${r3(W(40, "gusta") + 0.05)});`);
  pulse(S, "#like", W(40, "gusta") + 0.05, 1.25);
  pose(S, T, W(40, "suscríbete"), { armF: -150, foreF: -20, mouth: "smile" }, 0.3);
  // 41: encuesta: ¿mirmillón o reciario?
  clearAt(S, "#sub,#like,#cur", L(41).start - 0.2);
  phone(S, "poll", bxy.x, bxy.y + 40, F(860, 860), F(560, 560), `
    <div style="padding:22px 28px;font:900 48px Inter;color:${C.ink};border-bottom:4px solid #ddd;background:#fff;display:flex;align-items:center;gap:14px">${icon("chat-circle-text", { size: 58, color: C.ochreD })}COMENTA</div>
    ${[["MIRMILLÓN", "pm", RC.terra], ["RECIARIO", "pr", "#4a6fa5"]].map(([t, id, col]) => `<div style="margin:26px 28px 0;position:relative;height:100px;border:5px solid ${C.ink};border-radius:22px;overflow:hidden;background:#fff"><div id="${id}" style="position:absolute;left:0;top:0;bottom:0;width:100%;background:${col};transform-origin:0 50%;opacity:.85"></div><div style="position:relative;font:900 58px Inter;color:${C.ink};padding:14px 24px">${t}</div></div>`).join("")}`);
  S.tw(`tl.fromTo("#poll",{opacity:0,y:60},{opacity:1,y:0,duration:0.4,ease:"back.out(1.6)"},${r3(L(41).start - 0.1)});`);
  S.tw(`tl.fromTo("#pm",{scaleX:0},{scaleX:0.55,duration:0.8,ease:"power2.out"},${r3(W(41, "mirmillón"))});tl.fromTo("#pr",{scaleX:0},{scaleX:0.45,duration:0.8,ease:"power2.out"},${r3(W(41, "reciario"))});`);
  // 42: mándaselo a tu amigo del gimnasio
  S.tw(`tl.to("#poll",{opacity:0,scale:0.8,duration:0.25},${r3(L(42).start - 0.2)});`);
  S.add(`<div id="nt" class="prop" style="left:${bxy.x - 450}px;top:${bxy.y - 80}px;width:900px;height:180px;z-index:10;opacity:0;background:#fff;border:6px solid ${C.ink};border-radius:36px;box-shadow:0 12px 0 ${C.ink};display:flex;align-items:center;gap:26px;padding:0 34px;font:900 58px Inter;color:${C.ink}">${icon("paper-plane-tilt", { size: 100, color: C.ochreD })}ENVIADO A TU AMIGO</div>`);
  drop(S, "#nt", W(42, "mándaselo"), -260);
  iconCard(S, "gym", bxy.x, bxy.y + F(280, 300), 250, "barbell", "GIMNASIO", { bg: C.ochre });
  pop(S, "#gym", W(42, "gimnasio"));
  wobble(S, "#gym", W(42, "gimnasio") + 0.4, 4, 10);
  // 43: despedida
  clearAt(S, "#nt,#gym", L(43).start - 0.2);
  pose(S, T, W(43, "vemos") - 0.2, { armF: -150, foreF: -30, mouth: "smile" }, 0.3);
  S.tw(`tl.to("#fxz-foreF",{rotation:-60,svgOrigin:"30 -228",duration:0.16,yoyo:true,repeat:7,ease:"sine.inOut"},${r3(W(43, "vemos") + 0.1)});`);
  label(S, "fin", z.x + F(120, 0), z.y - F(120, 140), "UN DÍA EN LA VIDA DE UN<br><span class='roman' style='font-size:1.9em;color:#d9a72b'>GLADIADOR</span>", { size: F(66, 52), w: 1700 });
  fadeUp(S, "#fin", W(43, "viaje"));
  camTo(S, W(43, "tiempo"), F({ x: A - 1400, y: G - 1500, w: 3600, h: 1700 }, { x: A - 900, y: G - 2300, w: 1900, h: 2600 }), { dur: Math.max(1.5, end - W(43, "tiempo")), ease: "sine.inOut" });
}

export const CAPITULOS = [
  { id: "gancho", desde: 1, hasta: 2, build: gancho },
  { id: "escuela", desde: 3, hasta: 9, build: escuela },
  { id: "coliseo", desde: 10, hasta: 18, build: coliseo },
  { id: "combate", desde: 19, hasta: 30, build: combate },
  { id: "despues", desde: 31, hasta: 38, build: despues },
  { id: "cierre", desde: 39, hasta: 43, build: cierre },
];

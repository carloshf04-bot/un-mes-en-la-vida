// Capítulos del vídeo. Cada uno recibe una Scene (S) con sus tiempos y dibuja su trozo del mundo.
// Todas las apariciones van pegadas a la palabra que las nombra: S.W(frase, "palabra", n).
import { C, r3, rng, icon, camTo, camSet, shake, actor, life, walk, pose, shiver, card, popIn, stampX, stampCheck, text, burst } from "./lib.mjs";
import { G, sky, parallax, ground, snow, reel, rollReel, exit } from "./fondos.mjs";
import { intro } from "./cap_intro.mjs";
import { semana1 } from "./cap_s1.mjs";
import { semana2 } from "./cap_s2.mjs";
import { semana3 } from "./cap_s3.mjs";
import { semana4 } from "./cap_s4.mjs";
import { balance, cierre } from "./cap_final.mjs";

// =====================================================================
// 1 · GANCHO (frases 1-4)
// =====================================================================
function gancho(S) {
  const { F, h } = S.fmt;
  const L1 = S.line(1), L2 = S.line(2), L3 = S.line(3), L4 = S.line(4);
  sky(S); parallax(S); ground(S);
  snow(S, { n: 70, windAt: S.W(2, "frío"), windEnd: L2.end + 0.3 });

  // --- Posiciones (horizontal / vertical) ---
  const tx = F(470, 330);
  const n30 = F({ x: 1150, y: G - 470 }, { x: 680, y: G - 1000 });
  const cardsY = F(G - 330, G - 800), cardsX = F([950, 1300, 1650], [400, 700, 1000]), cs = F(300, 292);
  const slab = F({ x: 1300, y: G - 560, w: 860, h: 380 }, { x: 700, y: G - 900, w: 860, h: 380 });

  // Cámara inicial: cerca del suelo, Tarko entra corriendo
  camSet(S, 0, F({ x: 60, y: G - 760, w: 1350, h: 780 }, { x: 120, y: G - 1150, w: 860, h: 1200 }));
  camTo(S, 0.05, F({ x: 200, y: G - 780, w: 1450, h: 820 }, { x: 160, y: G - 1180, w: 900, h: 1230 }), { dur: 1.6, ease: "power3.out" });

  // --- Tarko entra corriendo y derrapa ---
  const T = actor(S, "tarko", "tarko", tx - 900, G, { z: 6, scale: 1.35 });
  walk(S, T, 0, 0.85, tx, { run: true });
  burst(S, "skid", tx + 30, G - 10, 0.8, { n: 18, color: "#fff", spread: 220, up: 110, size: 16, dur: 0.9, seed: 4 });
  pose(S, T, 0.85, { body: -8, armF: -40, armB: 30, mouth: "open" }, 0.15, "power2.out");
  pose(S, T, 1.15, { body: 0, armF: 0, armB: 0, mouth: "neutral" }, 0.4, "power2.inOut");
  life(S, T, 1.2, S.t1 - S.t0, 11);

  // --- «30 DÍAS» cae de golpe en «treinta» ---
  const tT = S.W(1, "treinta"), tD = S.W(1, "días");
  S.add(`<div id="n30g" class="prop" style="left:${n30.x - 450}px;top:${n30.y - 220}px;width:900px;height:560px;z-index:8">`);
  text(S, "n30", 450, 220, "30", { size: F(330, 300), font: "'Rubik Dirt'", weight: 400, color: C.bone, w: 900 });
  text(S, "n30d", 450, 220 + F(200, 180), "DÍAS", { size: F(110, 100), color: C.ochre, w: 900 });
  S.add(`</div>`);
  S.tw(`tl.fromTo("#n30",{scale:3,opacity:0,filter:"blur(10px)"},{scale:1,opacity:1,filter:"blur(0px)",duration:0.28,ease:"power4.in"},${r3(tT - 0.18)});`);
  shake(S, tT + 0.1, 18, 0.4);
  burst(S, "dust30", n30.x, n30.y + 120, tT + 0.1, { n: 16, color: C.bone2, spread: 300, up: 90, size: 18, seed: 8 });
  S.tw(`tl.fromTo("#n30d",{y:40,opacity:0},{y:0,opacity:1,duration:0.35,ease:"power3.out"},${r3(tD)});`);
  pose(S, T, tT, { head: -6, look: 4, brows: -4, mouth: "open" }, 0.2);
  pose(S, T, S.W(1, "sobrevivir"), { head: 4, look: -3, mouth: "sad", brows: 3 }, 0.3);

  // --- Casa / comida / frío ---
  const tCasa = S.W(2, "casa"), tCom = S.W(2, "comida"), tFrio = S.W(2, "frío");
  // «30 DÍAS» se encoge hacia arriba para dejar sitio (se transforma, no desaparece)
  const up30 = F({ x: 1330, y: G - 720 }, { x: 700, y: G - 1150 });
  S.tw(`tl.to("#n30g",{x:${up30.x - n30.x},y:${up30.y - n30.y},scale:0.55,duration:0.6,ease:"power3.inOut"},${r3(tCasa - 0.5)});`);
  const items = [["house-line", "CASA", tCasa], ["bowl-food", "COMIDA", tCom], ["thermometer-cold", "CALOR", tFrio]];
  items.forEach(([ic, lb, t], i) => {
    card(S, `cd${i}`, cardsX[i], cardsY, cs, cs, `${icon(ic, { size: F(150, 140), color: C.ink })}<div class="lbl" style="font-size:${F(54, 58)}px">${lb}</div>`);
    popIn(S, `#cd${i}`, t - 0.05);
  });
  stampX(S, "x0", cardsX[0], cardsY, cs * 0.9, S.W(2, "casa") + 0.35);
  stampX(S, "x1", cardsX[1], cardsY, cs * 0.9, S.W(2, "guardada") + 0.2);
  stampX(S, "x2", cardsX[2], cardsY, cs * 0.9, S.W(2, "corta"));
  S.tw(`tl.to("#cd2",{backgroundColor:"#cfe3f5",duration:0.4},${r3(tFrio)});`);
  pose(S, T, tCasa, { look: 4, mouth: "neutral", brows: 0 }, 0.2);
  pose(S, T, tFrio, { armF: -28, foreF: -110, armB: 30, foreB: -100, mouth: "sad", brows: 3 }, 0.3, "power2.out");
  shiver(S, T, tFrio + 0.1, L2.end + 0.2);
  camTo(S, tCasa - 0.5, F({ x: 300, y: G - 880, w: 1700, h: 920 }, { x: 200, y: G - 1240, w: 1000, h: 1300 }), { dur: 1.4 });

  // --- «Bienvenido al mundo de hace quince mil años»: las tarjetas se funden en una losa con un rodillo ---
  const tB = L3.start, tMundo = S.W(3, "mundo"), tQ = S.W(3, "quince"), tA = S.W(3, "años");
  pose(S, T, tB - 0.1, { armF: 0, foreF: 0, armB: 0, foreB: 0, mouth: "neutral", brows: 0 }, 0.35, "power2.out");
  S.tw(`tl.to("#cd0,#cd1,#cd2,#x0,#x1,#x2",{x:(i)=>[${cardsX[1] - cardsX[0]},0,${cardsX[1] - cardsX[2]},${cardsX[1] - cardsX[0]},0,${cardsX[1] - cardsX[2]}][i],y:${slab.y - cardsY},scale:0.2,opacity:0,duration:0.5,ease:"power3.in"},${r3(tB)});`);
  S.add(`<div id="slab" class="card" style="left:${slab.x - slab.w / 2}px;top:${slab.y - slab.h / 2}px;width:${slab.w}px;height:${slab.h}px;background:${C.rock};border-radius:46px;z-index:7"></div>`);
  S.tw(`tl.fromTo("#slab",{scale:0.1,opacity:0},{scale:1,opacity:1,duration:0.55,ease:"back.out(1.6)"},${r3(tB + 0.35)});`);
  text(S, "hace", slab.x, slab.y - 120, "HACE", { size: 62, color: C.bone2, w: 800 });
  reel(S, "rl", slab.x, slab.y + 10, "15.000", { size: 170 });
  text(S, "anos", slab.x, slab.y + 130, "AÑOS", { size: 62, color: C.bone2, w: 800 });
  S.tw(`tl.fromTo("#hace,#rl,#anos",{opacity:0},{opacity:1,duration:0.25},${r3(tB + 0.6)});`);
  rollReel(S, "rl", "15.000", Math.min(tQ, tB + 0.7), tA + 0.15);
  S.tw(`tl.to("#n30g",{opacity:0,scale:0.25,duration:0.4,ease:"power2.in"},${r3(tB)});`);
  pose(S, T, tMundo, { head: -10, look: 3, mouth: "open", brows: -5 }, 0.35);
  // la cámara se aleja y enseña el mundo (con los mamuts al fondo)
  camTo(S, tMundo - 0.2, F({ x: -200, y: G - 1250, w: 2700, h: 1350 }, { x: 0, y: G - 1650, w: 1400, h: 1850 }), { dur: 2.2, ease: "power2.inOut" });
  for (let i = 0; i < 3; i++) S.tw(`tl.fromTo("#${S.id}-mam${i}",{x:0},{x:-260,duration:${r3(S.t1 - S.t0)},ease:"none"},0);`);

  // --- Título: «Un mes en la vida de un CAVERNÍCOLA» ---
  const tTit = S.W(4, "mes"), tCav = S.W(4, "cavernícola");
  const titleBox = F({ x: 110, y: G - 1120, w: 2260, h: 1180 }, { x: 80, y: G - 1430, w: 1160, h: 1460 });
  camTo(S, L4.start - 0.25, titleBox, { dur: 1.3 });
  walk(S, T, L4.start - 0.2, L4.start + 0.8, F(300, 190));
  const tt = F({ x: 1330, y: G - 860 }, { x: 700, y: G - 1260 });
  S.tw(`tl.to("#slab",{x:${tt.x - slab.x},y:${tt.y + F(150, 130) - slab.y},scaleX:${F(1.95, 1.22)},scaleY:${F(1.45, 1.25)},duration:0.6,ease:"power3.inOut"},${r3(tTit - 0.35)});`);
  S.tw(`tl.to("#hace,#rl,#anos",{opacity:0,y:-30,duration:0.25,ease:"power2.in"},${r3(tTit - 0.4)});`);
  const l1 = h ? ["UN", "MES", "EN", "LA", "VIDA", "DE", "UN"] : ["UN", "MES", "EN", "LA", "VIDA", "DE", "UN"];
  const wl = l1.map((w, i) => `<span id="tw${i}" style="display:inline-block;margin:0 ${F(14, 10)}px">${w}</span>`).join("");
  S.add(`<div id="tl1" class="wtext" style="left:${tt.x - 800}px;top:${tt.y - 40}px;width:1600px;text-align:center;font:900 ${F(84, 60)}px Inter;color:${C.bone};z-index:9;text-shadow:0 5px 0 ${C.ink}">${wl}</div>`);
  const wTimes = [S.W(4, "un", 1), S.W(4, "mes"), S.W(4, "en"), S.W(4, "la"), S.W(4, "vida"), S.W(4, "de"), S.W(4, "un", 2)];
  wTimes.forEach((t, i) => S.tw(`tl.fromTo("#tw${i}",{opacity:0,filter:"blur(8px)"},{opacity:1,filter:"blur(0px)",duration:0.15,ease:"power2.out"},${r3(t)});`));
  text(S, "cav", tt.x, tt.y + F(190, 150), "CAVERNÍCOLA", { size: F(250, 138), font: "'Rubik Dirt'", weight: 400, color: C.bone, w: 2200 });
  S.tw(`tl.fromTo("#cav",{scale:2.6,opacity:0,filter:"blur(12px)"},{scale:1,opacity:1,filter:"blur(0px)",duration:0.3,ease:"power4.in"},${r3(tCav - 0.2)});`);
  shake(S, tCav + 0.1, 22, 0.45);
  burst(S, "dustcav", tt.x, tt.y + F(300, 230), tCav + 0.1, { n: 24, color: C.bone2, spread: F(700, 420), up: 120, size: 22, seed: 13 });
  pose(S, T, tCav, { armF: -150, foreF: -10, head: -8, look: 4, mouth: "smile", brows: -4 }, 0.35);

  // --- Balanza: lo bueno (verde) y lo malo (rojo) ---
  const bz = F({ x: 1330, y: G - 360 }, { x: 780, y: G - 700 }), bw = F(760, 600);
  S.add(`<div id="bal" class="prop" style="left:${bz.x - bw / 2}px;top:${bz.y - 60}px;width:${bw}px;height:420px;z-index:8">
    <div style="position:absolute;left:${bw / 2 - 16}px;top:40px;width:32px;height:${F(330, 260)}px;background:${C.rock};border:5px solid ${C.ink};border-radius:10px"></div>
    <div style="position:absolute;left:${bw / 2 - 70}px;top:${F(350, 280)}px;width:140px;height:34px;background:${C.rockD};border:5px solid ${C.ink};border-radius:12px"></div>
    <div id="beam" style="position:absolute;left:0;top:20px;width:${bw}px;height:30px;background:${C.bone2};border:5px solid ${C.ink};border-radius:14px">
      <div id="panG" style="position:absolute;left:-60px;top:40px;width:190px;height:150px;background:${C.green};border:6px solid ${C.ink};border-radius:0 0 90px 90px;display:flex;align-items:center;justify-content:center">${icon("check-fat", { size: 96, color: "#fff" })}</div>
      <div id="panR" style="position:absolute;right:-60px;top:40px;width:190px;height:150px;background:${C.red};border:6px solid ${C.ink};border-radius:0 0 90px 90px;display:flex;align-items:center;justify-content:center">${icon("x", { size: 96, color: "#fff", weight: "bold" })}</div>
    </div>
  </div>`);
  S.add(`<div id="qm" class="prop" style="left:${T.x - 85}px;top:${G - 870}px;width:170px;height:170px;display:flex;align-items:center;justify-content:center;background:${C.ochre};border:7px solid ${C.ink};border-radius:50%;z-index:9;box-shadow:0 10px 0 ${C.ink}">${icon("question", { size: 120, color: C.ink, weight: "bold" })}</div>`);
  const tBu = S.W(4, "bueno"), tMa = S.W(4, "malo"), tCa = S.W(4, "casi");
  S.tw(`tl.fromTo("#bal",{scale:0,opacity:0},{scale:1,opacity:1,duration:0.45,ease:"back.out(1.7)"},${r3(tBu - 0.3)});`);
  S.tw(`tl.fromTo("#panG",{scale:0.3},{scale:1,duration:0.35,ease:"back.out(2.4)"},${r3(tBu)});`);
  S.tw(`tl.fromTo("#beam",{rotation:0},{rotation:-9,duration:0.5,ease:"elastic.out(1,0.5)"},${r3(tBu)});`);
  S.tw(`tl.fromTo("#panR",{scale:0.3},{scale:1,duration:0.35,ease:"back.out(2.4)"},${r3(tMa)});`);
  S.tw(`tl.to("#beam",{rotation:9,duration:0.5,ease:"elastic.out(1,0.5)"},${r3(tMa)});`);
  S.tw(`tl.to("#beam",{rotation:0,duration:0.6,ease:"power2.inOut"},${r3(tCa - 0.2)});`);
  S.tw(`tl.fromTo("#qm",{scale:0,opacity:0,rotation:-30},{scale:1,opacity:1,rotation:0,duration:0.45,ease:"back.out(2)"},${r3(tCa)});`);
  S.tw(`tl.to("#qm",{rotation:10,duration:0.25,yoyo:true,repeat:5,ease:"sine.inOut"},${r3(tCa + 0.45)});`);
  pose(S, T, tBu - 0.2, { armF: -60, foreF: -40, head: 0, look: 4, mouth: "smile" }, 0.35);
  pose(S, T, tMa, { head: 6, mouth: "sad", brows: 3 }, 0.3);
  pose(S, T, tCa, { armF: -20, armB: 20, foreF: -60, foreB: -60, head: -4, mouth: "neutral", brows: -5, look: 2 }, 0.4);
  exit(S);
}

// Capítulo provisional para el resto del vídeo hasta que esté animado
function provisional(id, desde, hasta) {
  return { id, desde, hasta, build(S) {
    sky(S); parallax(S); ground(S); snow(S, { n: 40 });
    camSet(S, 0, { x: 0, y: G - 800, w: 1600, h: 900 });
    for (let i = desde; i <= hasta; i++) {
      const L = S.line(i);
      text(S, `${id}-t${i}`, 800, G - 450, `${i}`, { size: 200, font: "'Rubik Dirt'", weight: 400, w: 1200 });
      S.tw(`tl.fromTo("#${id}-t${i}",{opacity:0},{opacity:1,duration:0.2},${r3(L.start)});tl.to("#${id}-t${i}",{opacity:0,duration:0.2},${r3(L.end)});`);
    }
  } };
}

export const CAPITULOS = [
  { id: "gancho", desde: 1, hasta: 4, build: gancho },
  { id: "intro", desde: 5, hasta: 19, build: intro },
  { id: "semana1", desde: 20, hasta: 45, build: semana1 },
  { id: "semana2", desde: 46, hasta: 69, build: semana2 },
  { id: "semana3", desde: 70, hasta: 92, build: semana3 },
  { id: "semana4", desde: 93, hasta: 120, build: semana4 },
  { id: "balance", desde: 121, hasta: 130, build: balance },
  { id: "cierre", desde: 131, hasta: 134, build: cierre },
];

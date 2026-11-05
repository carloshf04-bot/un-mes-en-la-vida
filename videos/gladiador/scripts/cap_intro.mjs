// 2 · INTRO (frases 5-19): quién es Tarko, dónde vive, su mundo, su familia y dónde vivían.
import { C, r3, icon, camTo, shake, actor, life, walk, pose, burst } from "./lib.mjs";
import { G, sky, parallax, ground, snow, enter, exit } from "./fondos.mjs";
import { cardsAt, spotBox, zone, goSpot, grid, iconCard, panel, pop, drop, fadeUp, shrinkOut, flipIn, flipOut, wobble, pulse, mark, label, slam, wordsIn, counter, fire, tent, shelter, caveMouth, animal, animalWalk, animalIdle, glowEyes, bubble, arrow } from "./lib2.mjs";

export function intro(S) {
  const { F, h } = S.fmt;
  sky(S, { top: "#0f1a2e", mid: "#283a5c", low: "#6a5a66", glow: "#d48a4a" });
  parallax(S); ground(S); snow(S, { n: 45 });
  const L = (i) => S.line(i);

  // ===== A · Tarko y dónde vive (5-6) =====
  const A = 3000, zA = zone(S, A);
  enter(S, spotBox(S, A));
  const T = actor(S, "t2", "tarko", zA.chx, G, { scale: 1.35, z: 6 });
  life(S, T, 0, L(9).start, 21);
  // saludo en «Tarko»
  const tTk = S.W(5, "tarko");
  pose(S, T, tTk, { armF: -150, foreF: -30, mouth: "smile", brows: -4 }, 0.3);
  S.tw(`tl.to("#t2-foreF",{rotation:-60,svgOrigin:"30 -228",duration:0.16,yoyo:true,repeat:5,ease:"sine.inOut"},${r3(tTk + 0.3)});`);
  pose(S, T, S.W(5, "cazadores") + 0.2, { armF: -20, foreF: -20, mouth: "neutral" }, 0.35);
  // ficha
  const fw = F(1100, 940), fh = F(760, 640);
  panel(S, "ficha", zA.x, zA.y, fw, fh, `
    <div class="dirt" style="font-size:${F(150, 130)}px;color:${C.ink};line-height:1">TARKO</div>
    <div id="fr1" style="display:flex;align-items:center;gap:24px;font:900 ${F(70, 64)}px Inter;color:${C.ink};margin-top:20px;opacity:0">${icon("calendar", { size: 84, color: C.ochreD })}<span id="age">0</span>&nbsp;AÑOS</div>
    <div id="fr2" style="display:flex;align-items:center;gap:24px;font:900 ${F(70, 64)}px Inter;color:${C.ink};margin-top:24px;opacity:0">${icon("crosshair", { size: 84, color: C.redD })}CAZADOR</div>`);
  flipIn(S, "#ficha", tTk - 0.1);
  fadeUp(S, "#fr1", S.W(5, "veinticinco") - 0.1);
  S.tw(`(()=>{const o={v:0},el=document.getElementById("age");tl.fromTo(o,{v:0},{v:25,duration:0.7,ease:"power2.out",onUpdate:()=>{el.textContent=Math.round(o.v)}},${r3(S.W(5, "veinticinco"))});})();`);
  fadeUp(S, "#fr2", S.W(5, "cazadores") - 0.1);
  // mapa (la ficha se da la vuelta y es un mapa)
  const tFr = S.W(6, "francia"), tGl = S.W(6, "glaciación");
  flipOut(S, "#ficha", L(6).start - 0.1);
  const mw = F(1100, 940), mh = F(760, 700);
  panel(S, "mapa", zA.x, zA.y, mw, mh, `
   <svg width="${mw - 60}" height="${mh - 60}" viewBox="0 0 1000 700" style="position:absolute;left:30px;top:30px;border-radius:24px">
    <rect width="1000" height="700" fill="#7fa7c9"/>
    <path d="M120,700 L140,560 C120,520 160,480 210,470 L260,430 C230,400 250,360 300,350 C320,300 380,290 420,300 L470,250 C520,240 560,270 600,250 C660,230 720,250 760,230 C820,200 900,210 1000,190 L1000,700Z" fill="#cdb98a" stroke="${C.ink}" stroke-width="6"/>
    <path d="M520,250 C510,180 560,120 600,60 C640,20 700,0 760,0 L840,0 C800,60 760,120 720,170 C680,220 620,240 560,250Z" fill="#cdb98a" stroke="${C.ink}" stroke-width="6"/>
    <path d="M300,330 C280,270 300,230 330,220 C360,230 370,270 350,320Z" fill="#cdb98a" stroke="${C.ink}" stroke-width="6"/>
    <path d="M560,470 C600,500 640,560 630,620 C650,640 640,670 620,660 C600,600 570,560 540,520Z" fill="#cdb98a" stroke="${C.ink}" stroke-width="6"/>
    <g id="hielo"><path d="M200,0 L1000,0 L1000,190 C900,210 820,200 760,230 C700,250 650,240 600,250 C540,260 470,250 420,300 C370,290 330,260 300,240 C250,200 220,120 200,0Z" fill="#f4f8fc" stroke="#9fb6cc" stroke-width="6" opacity=".95"/></g>
    <text x="620" y="110" font-family="Inter" font-weight="900" font-size="52" fill="#5a7c9c">HIELO</text>
    <g id="pin" transform="translate(400,470)"><circle r="22" fill="${C.red}" stroke="${C.ink}" stroke-width="6"/><circle r="60" fill="none" stroke="${C.red}" stroke-width="8" id="pinr"/></g>
   </svg>
   <div id="lblfr" style="position:absolute;left:${F(260, 160)}px;bottom:${F(70, 70)}px;font:900 ${F(64, 60)}px Inter;color:${C.ink};background:${C.bone};padding:6px 20px;border:5px solid ${C.ink};border-radius:16px;opacity:0">SUR DE FRANCIA</div>`, { pad: 0 });
  flipIn(S, "#mapa", L(6).start + 0.1);
  S.tw(`tl.fromTo("#pin",{scale:0},{scale:1,svgOrigin:"400 470",duration:0.4,ease:"back.out(3)"},${r3(tFr)});`);
  S.tw(`tl.fromTo("#pinr",{scale:0.4,opacity:1},{scale:1.6,opacity:0,svgOrigin:"0 0",duration:0.9,repeat:2,ease:"power1.out"},${r3(tFr + 0.2)});`);
  fadeUp(S, "#lblfr", tFr + 0.1);
  S.tw(`tl.fromTo("#hielo",{scaleY:0.6,opacity:0.6},{scaleY:1.08,opacity:1,svgOrigin:"600 0",duration:1.1,ease:"power2.out"},${r3(tGl - 0.3)});`);
  pose(S, T, tFr, { armF: -95, foreF: -10, look: 4, head: -4 }, 0.35);
  pose(S, T, tGl, { armF: -28, foreF: -110, armB: 30, foreB: -100, mouth: "sad" }, 0.3);
  pose(S, T, L(6).end + 0.1, { armF: 0, foreF: 0, armB: 0, foreB: 0, mouth: "neutral", look: 0, head: 0 }, 0.3);

  // ===== B · Su mundo: animales (7) y depredadores (8) =====
  const B = A + 2600;
  const tRe = S.W(7, "renos"), tCa = S.W(7, "caballos"), tBi = S.W(7, "bisontes"), tMa = S.W(7, "mamuts");
  const anims = [["reno", "RENO", tRe], ["caballo", "CABALLO", tCa], ["bisonte", "BISONTE", tBi], ["mamut", "MAMUT", tMa]];
  const ax = h ? [B - 1000, B - 400, B + 200, B + 880] : [B - 1100, B - 360, B + 380, B + 1180];
  goSpot(S, L(7).start - 0.35, h ? B : ax[0], { dur: 0.9, k: h ? 1.25 : 1, blur: 4 });
  walk(S, T, L(7).start - 0.35, L(7).start + 0.5, B - (h ? 1350 : 1500), { run: true });
  anims.forEach(([k, lb, t], i) => {
    const an = animal(S, `an${i}`, k, ax[i] + 700, G, { s: k === "mamut" ? 1.5 : 1.25, flip: true, z: 4 + i % 2 });
    animalWalk(S, an, t - 0.7, t + 0.1, ax[i]);
    animalIdle(S, an, t + 0.2, L(8).end + 1);
    label(S, `anl${i}`, ax[i], G - (k === "mamut" ? 560 : 470), lb, { size: 70, w: 700 });
    pop(S, `#anl${i}`, t);
    if (!h && i > 0) camTo(S, t - 0.35, spotBox(S, ax[i]), { dur: 0.6 });
  });
  // depredadores: se hace de noche y brillan ojos
  S.add(`<div id="dark" class="prop" style="left:${B - 4000}px;top:${G - 3000}px;width:8000px;height:4400px;background:rgba(5,6,14,.72);z-index:7;opacity:0"></div>`);
  const tLe = S.W(8, "leones"), tOs = S.W(8, "osos"), tHi = S.W(8, "hienas");
  if (!h) camTo(S, L(8).start - 0.2, spotBox(S, B), { dur: 0.7 });
  else camTo(S, L(8).start - 0.2, spotBox(S, B, 1.1), { dur: 0.7 });
  S.tw(`tl.fromTo("#dark",{opacity:0},{opacity:1,duration:0.5},${r3(L(8).start - 0.1)});`);
  S.tw(`tl.to("#anl0,#anl1,#anl2,#anl3",{opacity:0,y:-30,duration:0.3},${r3(L(8).start - 0.1)});`);
  const pr = [["leon", "LEÓN DE LAS CAVERNAS", tLe], ["oso", "OSO", tOs], ["hiena", "HIENA", tHi]];
  const px = h ? [B - 600, B + 100, B + 750] : [B - 300, B + 300, B];
  const py = h ? [G - 520, G - 400, G - 560] : [G - 1150, G - 860, G - 560];
  pr.forEach(([k, lb, t], i) => {
    glowEyes(S, `ey${i}`, px[i], py[i], t - 0.1, { s: 1.6, color: i === 1 ? "#ff9a3d" : "#ffd34d" });
    S.tw(`tl.to("#ey${i}",{scaleY:0.1,duration:0.06,yoyo:true,repeat:1},${r3(t + 1.0)});`);
    label(S, `eyl${i}`, px[i], py[i] + 110, lb, { size: F(62, 56), w: 900, color: "#ffd9a0", z: 9 });
    fadeUp(S, `#eyl${i}`, t + 0.05);
  });
  S.tw(`tl.to("#dark,#ey0,#ey1,#ey2,#eyl0,#eyl1,#eyl2",{opacity:0,duration:0.5},${r3(L(8).end + 0.15)});`);

  // ===== C · El grupo y la familia (9-13) =====
  const Cx = B + 3200, zC = zone(S, Cx);
  goSpot(S, L(9).start - 0.3, Cx, { dur: 1.1, blur: 4 });
  walk(S, T, L(9).start - 0.3, L(9).start + 0.8, Cx - F(780, 330), { run: true });
  for (let i = 0; i < 4; i++) S.tw(`tl.to("#an${i}",{opacity:0,duration:0.3},${r3(L(9).start)});`);
  tent(S, "tn1", Cx + F(180, -320), G, 1.2); tent(S, "tn2", Cx + F(760, 380), G, 0.95, "#8b5e36");
  fire(S, "fu1", Cx + F(470, 40), G + 10, 1.1);
  // gente del grupo (aparecen alrededor del fuego)
  const crowdX = h ? [Cx - 200, Cx + 130, Cx + 820, Cx + 1050, Cx + 1290] : [Cx - 480, Cx - 140, Cx + 230, Cx + 460, Cx + 560];
  crowdX.forEach((x, i) => {
    const p = actor(S, `cr${i}`, i % 2 ? "hunter2" : "lia", x, G - 10, { scale: 0.9, z: 3, flip: i % 2 === 0 });
    S.tw(`tl.fromTo("#cr${i}",{opacity:0,y:30},{opacity:0.9,y:0,duration:0.4,ease:"back.out(2)"},${r3(S.W(9, "familias") - 0.4 + i * 0.12)});`);
    life(S, p, S.W(9, "familias"), L(13).end + 0.5, 40 + i);
    S.tw(`tl.to("#cr${i}",{opacity:0.35,duration:0.4},${r3(L(10).start)});`);
  });
  const grp = F({ x: Cx + 520, y: G - 860 }, { x: Cx, y: G - 1180 });
  S.add(`<div id="grp" class="prop" style="left:${grp.x - 600}px;top:${grp.y - 90}px;width:1200px;display:flex;align-items:center;justify-content:center;gap:26px;z-index:9;opacity:0;font:900 ${F(92, 84)}px Inter;color:${C.bone};text-shadow:0 6px 0 ${C.ink}">${icon("users-three", { size: 120, color: C.ochre })}<span>20-30</span><span style="font-size:.6em">PERSONAS</span></div>`);
  slam(S, "#grp", S.W(9, "veinte"));
  S.tw(`tl.to("#grp",{opacity:0,y:-40,duration:0.3},${r3(L(10).start - 0.2)});`);
  // familia: cada uno da un paso adelante en su nombre
  const fam = [["lia", 10, "lía", "LÍA", "leaf", "PLANTAS"], ["nima", 11, "nima", "NIMA", "baby", "6 AÑOS"], ["ama", 12, "ama", "AMA", "chat-circle-text", "HISTORIAS"], ["gris", 13, "gris", "GRIS", "paw-print", "¿LOBO O PERRO?"]];
  const fx = h ? [Cx - 380, Cx - 60, Cx + 230, Cx + 900] : [Cx - 100, Cx + 170, Cx + 400, Cx + 260];
  const famActors = {};
  fam.forEach(([k, ln, w, nm, ic, desc], i) => {
    const t = S.W(ln, w);
    const isG = k === "gris";
    const a = actor(S, `f${k}`, k, fx[i] + 300, G, { scale: isG ? 1.5 : 1.35, z: 6 + i, flip: !isG && false });
    famActors[k] = a;
    S.tw(`tl.fromTo("#f${k}",{opacity:0},{opacity:1,duration:0.25},${r3(t - 0.6)});`);
    walk(S, a, t - 0.6, t + 0.05, fx[i], { run: false });
    life(S, a, t + 0.1, S.t1 - S.t0, 60 + i);
    const ty = isG ? G - 380 : G - (k === "nima" ? 600 : 790);
    const tagX = h ? fx[i] : Cx;
    const tagY = h ? ty : G - 1160;
    S.add(`<div id="tag${k}" class="prop" style="left:${tagX - 360}px;top:${tagY - 120}px;width:720px;z-index:11;opacity:0;text-align:center">
      <div class="dirt" style="font-size:${F(96, 110)}px;color:${C.bone};text-shadow:0 7px 0 ${C.ink}">${nm}</div>
      <div style="display:inline-flex;align-items:center;gap:14px;background:${C.bone};border:5px solid ${C.ink};border-radius:18px;padding:6px 22px;font:900 ${F(52, 58)}px Inter;color:${C.ink};box-shadow:0 6px 0 ${C.ink}">${icon(ic, { size: 58, color: C.ochreD })}${desc}</div></div>`);
    pop(S, `#tag${k}`, t);
    const next = fam[i + 1] ? S.W(fam[i + 1][1], fam[i + 1][2]) - 0.25 : L(13).end + 0.3;
    S.tw(`tl.to("#tag${k}",{opacity:0,scale:0.7,duration:0.25},${r3(next)});`);
    if (!isG) pose(S, a, t, { mouth: "smile", armF: k === "nima" ? -140 : -40 }, 0.3);
    if (!isG) pose(S, a, t + 0.9, { mouth: "neutral", armF: 0 }, 0.4);
    if (!h) camTo(S, t - 0.4, { x: fx[i] - 520, y: G - 1430, w: 1120, h: 1460 }, { dur: 0.6 });
  });
  pose(S, famActors.nima, S.W(11, "seis"), { armF: -150, foreF: -20 }, 0.25);
  // la abuela «guarda historias»: bocadillo con dibujos
  bubble(S, "bamA", F(fx[2] + 260, Cx + 230), F(G - 1000, G - 1020), 420, 200, `${icon("moon-stars", { size: 80, color: C.ochreD })}${icon("fire", { size: 80, color: C.redD })}${icon("paw-print", { size: 80, color: C.ink })}`);
  pop(S, "#bamA", S.W(12, "historias") - 0.1);
  S.tw(`tl.to("#bamA",{opacity:0,duration:0.25},${r3(L(13).start)});`);
  // al final del bloque la cámara se aleja y enseña el campamento entero
  camTo(S, L(13).end - 0.2, spotBox(S, Cx, h ? 1.25 : 1.1), { dur: 0.9 });

  // ===== D · ¿Vivían en cuevas? (14-16) =====
  const D = Cx + 3300, zD = zone(S, D);
  goSpot(S, L(14).start - 0.3, D, { dur: 1.1, blur: 4 });
  walk(S, T, L(14).start - 0.3, L(14).start + 0.8, D - F(880, 380), { run: true });
  const cavX = F(D + 350, D);
  caveMouth(S, "cv1", cavX, G, F(1150, 1000), F(860, 820));
  mark(S, "cvx", cavX, G - 300, 300, S.W(14, "cueva") + 0.1, false);
  label(S, "cvt", cavX, G - F(980, 1000), "¿EN EL FONDO DE LA CUEVA?", { size: F(70, 64), w: 1300 });
  fadeUp(S, "#cvt", S.W(14, "sorpresa"));
  pose(S, T, S.W(14, "cueva"), { head: 6, mouth: "sad", brows: 3, armF: -60, foreF: -80 }, 0.3);
  // 15: entrada, abrigo rocoso y tiendas: la cueva se transforma en un abrigo con tienda
  const tEn = S.W(15, "entrada"), tSa = S.W(15, "salientes"), tTi = S.W(15, "tiendas");
  S.tw(`tl.to("#cvt",{opacity:0,duration:0.2},${r3(tEn - 0.3)});`);
  S.tw(`tl.to("#cvx",{scale:0,opacity:0,duration:0.2},${r3(tEn - 0.2)});`);
  const opts = h ? [[D - 150, "door-open"], [D + 400, "mountains"], [D + 950, "tent"]] : [[D - 330, ""], [D, ""], [D + 330, ""]];
  const ent = [["ENTRADA", tEn, "sign-in"], ["ABRIGO DE ROCA", tSa, "mountains"], ["TIENDA DE PIELES", tTi, "tent"]];
  S.tw(`tl.to("#cv1",{x:${F(-640, -260)},scale:0.75,duration:0.6,ease:"power3.inOut"},${r3(tEn - 0.3)});`);
  shelter(S, "sh1", F(D + 700, D + 230), G, F(1000, 820));
  S.tw(`tl.fromTo("#sh1",{scaleY:0,opacity:0},{scaleY:1,opacity:1,transformOrigin:"50% 100%",duration:0.5,ease:"back.out(1.5)"},${r3(tSa - 0.1)});`);
  tent(S, "tn3", F(D + 760, D + 240), G, 1.1);
  S.tw(`tl.fromTo("#tn3",{scaleY:0,opacity:0},{scaleY:1,opacity:1,transformOrigin:"50% 100%",duration:0.5,ease:"back.out(2)"},${r3(tTi - 0.1)});`);
  ent.forEach(([lb, t], i) => {
    const x = h ? [D - 250, D + 450, D + 900][i] : [D - 260, D + 60, D + 380][i];
    const y = h ? G - 900 : G - [1250, 1080, 910][i];
    S.add(`<div id="en${i}" class="prop" style="left:${x - 330}px;top:${y - 50}px;width:660px;z-index:11;opacity:0;text-align:center"><span style="display:inline-flex;align-items:center;gap:12px;background:${C.bone};border:5px solid ${C.ink};border-radius:18px;padding:6px 20px;font:900 ${F(50, 52)}px Inter;color:${C.ink};box-shadow:0 6px 0 ${C.ink}">${icon("check-fat", { size: 54, color: C.green })}${lb}</span></div>`);
    pop(S, `#en${i}`, t);
  });
  pose(S, T, tEn, { head: 0, mouth: "smile", brows: 0, armF: -100, foreF: 0 }, 0.3);
  // 16: la cámara se asoma al fondo de la cueva: «?»
  const t16 = L(16).start;
  S.tw(`tl.to("#en0,#en1,#en2",{opacity:0,duration:0.25},${r3(t16 - 0.2)});`);
  const cvPos = F(D + 350 - 640, D - 260);
  camTo(S, t16, F({ x: cvPos - 350, y: G - 760, w: 1100, h: 700 }, { x: cvPos - 380, y: G - 1000, w: 760, h: 1000 }), { dur: 1.3 });
  S.add(`<div id="cvq" class="prop" style="left:${cvPos - 100}px;top:${G - 420}px;width:200px;height:200px;display:flex;align-items:center;justify-content:center;background:${C.ochre};border:7px solid ${C.ink};border-radius:50%;z-index:9;opacity:0;box-shadow:0 10px 0 ${C.ink}">${icon("question", { size: 150, color: C.ink, weight: "bold" })}</div>`);
  pop(S, "#cvq", S.W(16, "cosa"));
  wobble(S, "#cvq", S.W(16, "cosa") + 0.5, 5, 8);
  label(S, "cvfin", cvPos, G - F(620, 700), "…AL FINAL", { size: F(66, 60), w: 900 });
  fadeUp(S, "#cvfin", S.W(16, "final"));

  // ===== E · Cómo lo sabemos (17) y «cavernícola» (18-19) =====
  const E = D + 3300, zE = zone(S, E);
  goSpot(S, L(17).start - 0.35, E, { dur: 1.1, blur: 4 });
  walk(S, T, L(17).start - 0.35, L(17).start + 0.8, E - F(900, 380), { run: true });
  const ev = [["pencil-simple", "ESCRITURA", S.W(17, "escrito")], ["bone", "HUESOS", S.W(17, "huesos")], ["axe", "HERRAMIENTAS", S.W(17, "herramientas")], ["campfire", "HOGUERAS", S.W(17, "hogueras")], ["paint-brush-broad", "PINTURAS", S.W(17, "pinturas")]];
  iconCard(S, "ev0", zE.x, zE.y, F(300, 280), ev[0][0], ev[0][1]);
  pop(S, "#ev0", ev[0][2] - 0.3);
  mark(S, "ev0x", zE.x, zE.y, 240, ev[0][2] + 0.1, false);
  S.tw(`tl.to("#ev0,#ev0x",{scale:0.6,x:${F(-820, -230)},y:${F(-430, -380)},duration:0.45,ease:"power2.inOut"},${r3(ev[1][2] - 0.5)});`);
  pose(S, T, S.W(17, "sabemos"), { head: 6, armF: -40, foreF: -120, look: 3 }, 0.35);
  cardsAt(S, "evc", zE.x + F(60, 0), zE.y + F(20, 60), ev.slice(1).map(([ic, lb, t]) => [ic, lb, t]), { size: F(290, 260), cols: 2, gap: 30 });
  pose(S, T, ev[1][2], { head: 0, armF: -110, foreF: 0, mouth: "smile" }, 0.35);
  // 18: «cavernícola» -> «cazadores-recolectores del Paleolítico»
  const t18 = L(18).start;
  S.tw(`tl.to("#ev0,#ev0x,#evc0,#evc1,#evc2,#evc3",{scale:0.2,opacity:0,duration:0.35,stagger:0.05,ease:"power2.in"},${r3(t18 - 0.1)});`);
  const lbY = F(G - 600, G - 1050);
  label(S, "cvn", zE.x, lbY, "CAVERNÍCOLA", { size: F(170, 120), dirt: true, w: 1500 });
  pop(S, "#cvn", S.W(18, "cavernícolas", 1) - 0.1);
  iconCard(S, "flask", zE.x - F(560, 380), lbY - F(250, 250), 180, "flask", "", { bg: C.bone });
  pop(S, "#flask", S.W(18, "científicos"));
  S.add(`<div id="hunt" class="prop" style="left:${zE.x - 700}px;top:${lbY - 120}px;width:1400px;text-align:center;z-index:9;opacity:0;font:900 ${F(84, 70)}px Inter;line-height:1.1;color:${C.bone};text-shadow:0 6px 0 ${C.ink}">CAZADORES-RECOLECTORES<br><span style="color:${C.ochre}">DEL PALEOLÍTICO</span></div>`);
  const tCz = S.W(18, "cazadores");
  S.tw(`tl.to("#cvn",{rotationX:90,opacity:0,duration:0.22,ease:"power2.in"},${r3(tCz - 0.22)});`);
  S.tw(`tl.fromTo("#hunt",{rotationX:-90,opacity:0},{rotationX:0,opacity:1,duration:0.3,ease:"back.out(1.6)"},${r3(tCz)});`);
  pose(S, T, tCz, { head: 8, mouth: "open", brows: -6, look: 3 }, 0.3);
  // 19: «…vamos a seguir llamándolos cavernícolas» (guiño)
  const tLl = S.W(19, "cavernícolas");
  S.tw(`tl.to("#hunt",{rotationX:90,opacity:0,duration:0.22,ease:"power2.in"},${r3(tLl - 0.25)});`);
  S.tw(`tl.to("#cvn",{rotationX:0,opacity:1,duration:0.3,ease:"back.out(1.6)"},${r3(tLl)});`);
  S.tw(`tl.to("#flask",{scale:0,opacity:0,duration:0.25},${r3(S.W(19, "amigos"))});`);
  iconCard(S, "thumb", zE.x + F(600, 380), lbY - F(240, 250), 180, "thumbs-up", "", { bg: C.ochre });
  pop(S, "#thumb", tLl + 0.15);
  pose(S, T, S.W(19, "amigos"), { head: -4, mouth: "smile", brows: -2, armF: -120, foreF: -40 }, 0.3);
  S.tw(`tl.to("#t2-lidR",{scaleY:1,svgOrigin:"0 -369",duration:0.08,yoyo:true,repeat:1,repeatDelay:0.35},${r3(tLl + 0.1)});`);
  life(S, T, L(9).start + 1, S.t1 - S.t0, 31);
  camTo(S, L(19).end + 0.05, { x: A - 1200, y: G - 2200, w: E - A + 2600, h: 2400 }, { dur: 0.75, ease: "power2.inOut" });
  exit(S);
}

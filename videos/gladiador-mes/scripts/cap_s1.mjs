// 3 · SEMANA 1 · LUNA NUEVA · EL FRÍO Y EL FUEGO (frases 20-45)
import { C, r3, icon, camTo, shake, actor, life, walk, pose, shiver, burst, prop } from "./lib.mjs";
import { G, sky, parallax, ground, snow, enter, exit } from "./fondos.mjs";
import { spotBox, zone, goSpot, grid, iconCard, panel, pop, drop, fadeUp, shrinkOut, flipIn, flipOut, wobble, pulse, mark, label, slam, counter, bar, lineChart, fire, tent, shelter, moonBadge, bubble, arrow, typeOn, cardsAt, clearAt, ids } from "./lib2.mjs";

export function semana1(S) {
  const { F, h } = S.fmt;
  const L = (i) => S.line(i), W = (l, w, n) => S.W(l, w, n);
  sky(S, { top: "#121a33", mid: "#3b3f6b", low: "#a86a72", glow: "#f0a25a" });
  parallax(S, { far: "#3d4670", far2: "#4c5480", mid: "#5d6288", mamC: "#454c74" });
  ground(S); snow(S, { n: 30 });
  const end = S.t1 - S.t0;

  // ===== A · Amanecer, luna nueva, hielo (20-22) =====
  const A = 3000, zA = zone(S, A);
  enter(S, spotBox(S, A));
  moonBadge(S, "m1", F(A + 250, A), F(G - 760, G - 1150), 0, "SEMANA 1", W(20, "semana"));
  label(S, "m1l", F(A + 250, A), F(G - 560, G - 950), "LUNA NUEVA", { size: F(70, 64), color: C.bone2 });
  fadeUp(S, "#m1l", W(20, "luna"));
  S.tw(`tl.to("#m1,#m1l",{y:-60,scale:0.7,opacity:0,duration:0.35,ease:"power2.in"},${r3(L(21).start - 0.2)});`);
  shelter(S, "s1sh", A - F(350, 150), G, F(1300, 1000));
  const T = actor(S, "t3", "tarko", zA.chx, G, { scale: 1.35, z: 6 });
  const N = actor(S, "n3", "nima", zA.chx + F(330, 280), G, { scale: 1.35, z: 7 });
  life(S, T, 0, end, 71); life(S, N, 0, L(23).start, 72);
  // el sol aún no ha salido: sol bajo el horizonte con flecha
  const sunY = F(G - 720, G - 1150);
  S.add(`<div id="sun1" class="prop" style="left:${A + F(450, 0) - 110}px;top:${sunY - 110}px;width:220px;height:220px;z-index:3;opacity:0">${icon("sun-horizon", { size: 220, color: "#ffc46b" })}</div>`);
  pop(S, "#sun1", W(21, "sol") - 0.1);
  S.tw(`tl.to("#sun1",{y:40,duration:1.4,ease:"sine.inOut"},${r3(W(21, "sol") + 0.3)});`);
  label(S, "sun1l", A + F(450, 0), sunY + 170, "AÚN DE NOCHE", { size: 60, color: C.bone2 });
  fadeUp(S, "#sun1l", W(21, "empieza"));
  // 22: agua helada que Nima rompe
  const ice = F({ x: A + 550, y: G + 10 }, { x: A + 250, y: G + 10 });
  S.tw(`tl.to("#sun1,#sun1l",{opacity:0,duration:0.3},${r3(L(22).start)});`);
  S.add(`<svg id="ice" class="prop" style="left:${ice.x - 300}px;top:${ice.y - 60}px;z-index:5;opacity:0" width="600" height="140" viewBox="-300 -60 600 140" overflow="visible">
    <ellipse cx="0" cy="10" rx="290" ry="56" fill="#bfe0f5" stroke="${C.ink}" stroke-width="6"/><ellipse cx="-60" cy="0" rx="120" ry="18" fill="#fff" opacity=".7"/>
    <path id="crk" d="M0,10 L-60,-10 L-110,20 M0,10 L50,-20 L120,10 M0,10 L20,50" stroke="${C.ink}" stroke-width="7" fill="none" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/></svg>`);
  fadeUp(S, "#ice", W(22, "agua") - 0.2, { dy: 20 });
  iconCard(S, "ic22", zA.x + F(100, 0), zA.y - F(40, 60), F(260, 250), "snowflake", "HELADA", { bg: "#d8ecfa" });
  pop(S, "#ic22", W(22, "helada"));
  walk(S, N, L(22).start, L(22).start + 0.8, ice.x - 120);
  const tRo = W(22, "romper");
  pose(S, N, tRo - 0.2, { armF: -160, foreF: -20, mouth: "open" }, 0.2, "power2.out");
  pose(S, N, tRo, { armF: -40, foreF: -20 }, 0.12, "power4.in");
  S.tw(`tl.fromTo("#crk",{strokeDashoffset:1},{strokeDashoffset:0,duration:0.25},${r3(tRo + 0.1)});`);
  burst(S, "icb", ice.x, ice.y - 10, tRo + 0.1, { n: 14, color: "#d8ecfa", spread: 200, up: 140, size: 18, seed: 22 });
  shake(S, tRo + 0.1, 10, 0.25);
  iconCard(S, "ic22b", zA.x + F(450, 0), zA.y - F(40, -240), F(260, 220), "drop", "BEBER", { bg: "#d8ecfa" });
  pop(S, "#ic22b", W(22, "beber"));
  pose(S, N, W(22, "primera"), { armF: 0, mouth: "smile" }, 0.3);

  // ===== B · El fuego (23-29) =====
  const B = A + 3000, zB = zone(S, B);
  goSpot(S, L(23).start - 0.3, B, { dur: 1.1, blur: 4 });
  walk(S, T, L(23).start - 0.3, L(23).start + 0.8, B - F(700, 300), { run: true });
  S.tw(`tl.to("#n3",{opacity:0,duration:0.3},${r3(L(23).start)});`);
  const fx = F(B - 300, B + 60);
  fire(S, "fu2", fx, G + 10, 1.3);
  // brasas débiles -> Tarko sopla -> crece
  S.tw(`tl.fromTo("#fu2",{scale:0.35},{scale:0.35,duration:0.1},${r3(L(23).start - 0.1)});`);
  pose(S, T, W(23, "fuego"), { body: 18, head: 14, mouth: "open", armF: -30 }, 0.3);
  S.tw(`tl.to("#fu2",{scale:1,duration:0.8,ease:"back.out(1.6)",transformOrigin:"50% 100%"},${r3(W(23, "fuego") + 0.3)});`);
  pose(S, T, W(23, "apaga", 1), { body: 0, head: 0, mouth: "neutral", armF: 0 }, 0.3);
  // «se apaga todo»: todo se oscurece un instante
  S.add(`<div id="blk" class="prop" style="left:${B - 3000}px;top:${G - 3000}px;width:6000px;height:4400px;background:#05060c;z-index:12;opacity:0"></div>`);
  S.tw(`tl.to("#fu2",{scale:0.25,duration:0.3},${r3(W(23, "apaga", 2) - 0.1)});tl.to("#blk",{opacity:0.85,duration:0.3},${r3(W(23, "apaga", 2) - 0.1)});`);
  S.tw(`tl.to("#fu2",{scale:1,duration:0.4},${r3(W(23, "todo") + 0.35)});tl.to("#blk",{opacity:0,duration:0.4},${r3(W(23, "todo") + 0.35)});`);
  // 24: piedras que chocan y palo que gira
  const p24 = F({ x: zB.x + 150, y: zB.y - 80 }, { x: zB.x, y: zB.y - 60 });
  panel(S, "p24", p24.x, p24.y, F(1000, 900), F(520, 500), `
    <div style="display:flex;gap:80px;align-items:center">
      <div style="text-align:center"><div id="stA" style="display:inline-block">${icon("hand-fist", { size: 170, color: C.ink })}</div><div class="lbl">PIEDRAS</div></div>
      <div style="text-align:center"><div id="drill" style="display:inline-block">${icon("spiral", { size: 170, color: C.ochreD })}</div><div class="lbl">MADERA</div></div></div>`);
  pop(S, "#p24", W(24, "golpeando") - 0.2);
  S.tw(`tl.fromTo("#stA",{rotation:-14},{rotation:14,duration:0.12,yoyo:true,repeat:7,ease:"power2.inOut"},${r3(W(24, "golpeando"))});`);
  burst(S, "spk", p24.x - F(170, 150), p24.y - 60, W(24, "golpeando") + 0.25, { n: 12, color: C.fire2, spread: 160, up: 160, size: 12, seed: 24 });
  S.tw(`tl.fromTo("#drill",{rotation:0},{rotation:1080,duration:1.4,ease:"none"},${r3(W(24, "frotando"))});`);
  bar(S, "b24", p24.x, p24.y + F(370, 350), F(800, 760), { label: "ESFUERZO", ic: "barbell", color: C.red, from: 0.1, to: 0.95, t: W(24, "cuesta") - 0.2, dur: 0.9 });
  // 25: brasas = tesoro
  flipOut(S, "#p24", L(25).start - 0.15);
  S.tw(`tl.to("#b24",{opacity:0,duration:0.2},${r3(L(25).start - 0.15)});`);
  panel(S, "p25", p24.x, p24.y + 40, F(820, 760), F(560, 540), `
    <svg width="360" height="220" viewBox="-180 -140 360 220"><ellipse cx="0" cy="40" rx="170" ry="50" fill="#7a5030" stroke="${C.ink}" stroke-width="6"/><path d="M-150,30 C-140,-40 140,-40 150,30Z" fill="#5a3b22" stroke="${C.ink}" stroke-width="6"/>
     <g id="emb"><circle cx="-60" cy="-6" r="26" fill="${C.fire}"/><circle cx="0" cy="-20" r="32" fill="${C.fire2}"/><circle cx="60" cy="-4" r="24" fill="${C.fire}"/></g></svg>
    <div style="display:flex;align-items:center;gap:16px;font:900 ${F(76, 70)}px Inter;color:${C.ink}">${icon("sparkle", { size: 80, color: C.ochre })}TESORO</div>`);
  flipIn(S, "#p25", L(25).start);
  S.tw(`tl.fromTo("#emb",{opacity:0.6},{opacity:1,duration:0.3,yoyo:true,repeat:5,ease:"sine.inOut"},${r3(W(25, "brasas"))});`);
  pulse(S, "#p25", W(25, "tesoro"), 1.1);
  // 26: lo que da el fuego
  flipOut(S, "#p25", L(26).start - 0.15);
  const it26 = [["thermometer-hot", "CALOR", W(26, "calor")], ["lightbulb", "LUZ", W(26, "luz")], ["paw-print", "FIERAS", W(26, "fieras"), false], ["cooking-pot", "COCINA", W(26, "cocina")]];
  cardsAt(S, "c26", zB.x + F(80, 0), zB.y - F(40, 0), it26, { size: F(280, 260), cols: h ? 4 : 2 });
  // 27: cocinar -> energía
  clearAt(S, ids("c26", 4) + ",#c262m", L(27).start - 0.2);
  bar(S, "b27", zB.x + F(80, 0), zB.y - F(150, 200), F(900, 820), { label: "ENERGÍA DE LA COMIDA", ic: "lightning", color: C.green, from: 0.3, to: 0.95, t: W(27, "cambia"), dur: 1.0 });
  const it27 = [["tooth", "SE MASTICA MEJOR", W(27, "mastica"), true], ["heartbeat", "SE DIGIERE MEJOR", W(27, "digiere"), true]];
  cardsAt(S, "c27", zB.x + F(80, 0), zB.y + F(170, 120), it27, { size: F(300, 290), cols: 2, gap: 60 });
  // 28: de noche, el fuego es la reunión
  clearAt(S, "#b27," + ids("c27", 2, true), L(28).start - 0.2);
  for (let i = 0; i < 3; i++) {
    const k = ["lia", "ama", "hunter2"][i];
    const a = actor(S, `g28${i}`, k, fx + F([-520, 380, 640][i], [-330, 300, 470][i]), G, { scale: 1.2, z: 5, flip: i > 0 });
    S.tw(`tl.fromTo("#g28${i}",{opacity:0},{opacity:1,duration:0.3},${r3(L(28).start - 0.1 + i * 0.1)});`);
    life(S, a, L(28).start, L(29).end, 80 + i);
  }
  const b28 = [["chat-circle-text", "SE HABLA", W(28, "habla")], ["hand-pointing", "SE ENSEÑA", W(28, "enseña")], ["calendar", "SE DECIDE", W(28, "decide")]];
  b28.forEach(([ic, lb, t], i) => {
    const x = h ? zB.x - 200 + i * 470 : zB.x;
    const y = h ? zB.y - 250 : zB.y - 260 + i * 210;
    bubble(S, `bb28${i}`, x, y, F(420, 560), 150, `${icon(ic, { size: 70, color: C.ochreD })}${lb}`, { tail: "center" });
    pop(S, `#bb28${i}`, t);
  });
  // 29: el humo
  clearAt(S, "#bb280,#bb281,#bb282", L(29).start - 0.2);
  S.add(`<div id="smoke" class="prop" style="left:${fx - 450}px;top:${G - 1100}px;width:900px;height:900px;z-index:8;opacity:0">
    ${[0, 1, 2, 3, 4].map((i) => `<div id="sm${i}" style="position:absolute;left:${200 + (i % 2) * 220}px;top:${560 - i * 120}px;width:${300 + i * 40}px;height:${200 + i * 30}px;border-radius:50%;background:rgba(80,80,90,.75)"></div>`).join("")}</div>`);
  S.tw(`tl.to("#smoke",{opacity:1,duration:0.6},${r3(W(29, "humo") - 0.2)});`);
  for (let i = 0; i < 5; i++) S.tw(`tl.fromTo("#sm${i}",{y:60,scale:0.7},{y:-120,scale:1.25,duration:2.6,ease:"sine.out",repeat:1},${r3(W(29, "humo") - 0.2 + i * 0.25)});`);
  bar(S, "b29", zB.x + F(250, 0), zB.y - F(80, 120), F(760, 760), { label: "PULMONES", ic: "heartbeat", color: C.red, from: 0.95, to: 0.3, t: W(29, "pulmones") - 0.2, dur: 0.9, show: W(29, "hollín") - 0.2 });
  iconCard(S, "eye29", zB.x + F(250, 0), zB.y + F(240, 250), 230, "eye", "OJOS", { bg: "#f6c6c0", z: 10 });
  pop(S, "#eye29", W(29, "ojos"));
  pose(S, T, W(29, "hollín"), { body: 10, head: 10, armF: -120, foreF: -100, mouth: "open", brows: 4 }, 0.2);
  S.tw(`tl.to("#t3-body",{y:6,duration:0.1,yoyo:true,repeat:7},${r3(W(29, "hollín") + 0.2)});`);
  pose(S, T, L(29).end, { body: 0, head: 0, armF: 0, foreF: 0, mouth: "neutral", brows: 0 }, 0.3);
  camTo(S, L(29).end - 0.3, spotBox(S, B, 1.2), { dur: 0.7 });

  // ===== C · La ropa (30-35) =====
  const Cc = B + 3200, zC = zone(S, Cc);
  goSpot(S, L(30).start - 0.3, Cc, { dur: 1.1, blur: 4 });
  walk(S, T, L(30).start - 0.3, L(30).start + 0.8, Cc - F(620, 230), { run: true });
  const c30 = F({ x: zC.x + 150, y: zC.y - 60 }, { x: zC.x, y: zC.y - 80 });
  panel(S, "p30", c30.x, c30.y, F(700, 700), F(520, 500), `${icon("film-slate", { size: 170, color: C.ink })}<div class="lbl" style="font-size:66px">TAPARRABOS</div><div style="font:900 44px Inter;color:${C.ochreD}">DE PELÍCULA</div>`);
  pop(S, "#p30", W(30, "taparrabos") - 0.2);
  mark(S, "p30x", c30.x, c30.y - 30, 380, W(30, "películas"), false);
  // 31: piezas de ropa señaladas sobre Tarko
  clearAt(S, "#p30,#p30x", L(31).start - 0.2);
  const tx = T.x, tags = [["TÚNICA", G - 520, W(31, "túnicas")], ["PANTALONES", G - 250, W(31, "pantalones")], ["BOTAS", G - 40, W(31, "botas")]];
  tags.forEach(([lb, y, t], i) => {
    const lx = tx + F(560, 330);
    S.add(`<div id="tg31${i}" class="prop" style="left:${lx - 10}px;top:${y - 45}px;z-index:11;opacity:0;background:${C.bone};border:5px solid ${C.ink};border-radius:18px;padding:4px 22px;font:900 ${F(58, 52)}px Inter;color:${C.ink};box-shadow:0 6px 0 ${C.ink};white-space:nowrap">${lb}</div>`);
    arrow(S, `ar31${i}`, lx - 10, y, tx + 70, y, t, { dur: 0.35, bend: 0.1, w: 10 });
    fadeUp(S, `#tg31${i}`, t, { dy: 20 });
  });
  pose(S, T, W(31, "cosidas"), { mouth: "smile", armF: -30, armB: 30 }, 0.3);
  // 32-33: aguja de hueso con ojo + tendón
  clearAt(S, "#tg310,#tg311,#tg312,#ar310,#ar311,#ar312", L(32).start - 0.2);
  const n32 = F({ x: zC.x + 150, y: zC.y - 60 }, { x: zC.x, y: zC.y - 60 });
  panel(S, "p32", n32.x, n32.y, F(1100, 940), F(560, 560), `
    <div style="display:flex;align-items:center;gap:40px">
     <div style="text-align:center"><svg width="380" height="200" viewBox="0 0 380 200"><path d="M20,100 C120,92 300,88 340,100 C300,112 120,108 20,100Z" fill="#efe6d2" stroke="${C.ink}" stroke-width="6"/><ellipse id="eye32" cx="300" cy="100" rx="16" ry="7" fill="${C.ink}"/><circle id="ring32" cx="300" cy="100" r="34" fill="none" stroke="${C.red}" stroke-width="8" opacity="0"/></svg><div class="lbl">DE HUESO</div></div>
     <div id="eq32" style="font:900 110px Inter;color:${C.ink};opacity:0">=</div>
     <div id="mod32" style="text-align:center;opacity:0">${icon("needle", { size: 190, color: "#6b7480" })}<div class="lbl">LA TUYA</div></div></div>
    <div id="thr32" style="font:900 56px Inter;color:${C.ochreD};margin-top:10px;opacity:0">HILO = TENDÓN</div>`);
  flipIn(S, "#p32", W(32, "agujas") - 0.2);
  S.tw(`tl.to("#ring32",{opacity:1,duration:0.2},${r3(W(32, "ojo"))});`);
  pulse(S, "#ring32", W(32, "ojo") + 0.2, 1.3);
  fadeUp(S, "#eq32", W(32, "tu") - 0.1); pop(S, "#mod32", W(32, "casa"));
  fadeUp(S, "#thr32", W(33, "tendones"));
  T.props = true;
  pose(S, T, W(32, "cosen"), { armF: -70, foreF: -60, armB: -40, foreB: -70, head: 10, look: 3 }, 0.3);
  S.tw(`tl.to("#t3-foreF",{rotation:-90,svgOrigin:"30 -228",duration:0.25,yoyo:true,repeat:7,ease:"sine.inOut"},${r3(W(32, "cosen") + 0.3)});`);
  // 34: horas por bota y costura que se abre
  flipOut(S, "#p32", L(34).start - 0.15);
  const it34 = [["boot", "1 BOTA", W(34, "bota")], ["hourglass-medium", "HORAS", W(34, "horas")], ["snowflake", "DEDOS HELADOS", W(34, "congelan"), false]];
  cardsAt(S, "c34", zC.x + F(120, 0), zC.y - F(40, 30), it34, { size: F(300, 270), cols: 3 });
  wobble(S, "#c341", W(34, "horas") + 0.3, 4, 8);
  pose(S, T, W(34, "costura"), { armF: -28, foreF: -110, armB: 30, foreB: -100, mouth: "sad" }, 0.3);
  shiver(S, T, W(34, "congelan"), L(34).end + 0.2);
  // 35: duermen todos juntos
  clearAt(S, ids("c34", 3) + ",#c342m", L(35).start - 0.2);
  pose(S, T, L(35).start, { armF: 0, foreF: 0, armB: 0, foreB: 0, mouth: "neutral" }, 0.3);
  panel(S, "p35", zC.x + F(120, 0), zC.y - F(60, 40), F(1000, 900), F(560, 560), `
    <div style="display:flex;align-items:center;gap:30px">${icon("tent", { size: 170, color: C.ochreD })}${icon("users-three", { size: 170, color: C.ink })}</div>
    <div class="lbl" style="font-size:62px">TODOS JUNTOS</div>
    <div style="width:700px;height:56px;border:6px solid ${C.ink};border-radius:56px;overflow:hidden;background:${C.ink2};margin-top:16px"><div id="heat35" style="width:100%;height:100%;background:${C.fire};transform-origin:0 50%"></div></div>`);
  flipIn(S, "#p35", W(35, "duermen") - 0.1);
  S.tw(`tl.fromTo("#heat35",{scaleX:0.15},{scaleX:0.95,duration:1.2,ease:"power2.out"},${r3(W(35, "calor") - 0.3)});`);
  camTo(S, L(35).end - 0.3, spotBox(S, Cc, 1.2), { dur: 0.7 });

  // ===== D · Herramientas de piedra (36-38) =====
  const D = Cc + 3200, zD = zone(S, D);
  goSpot(S, L(36).start - 0.3, D, { dur: 1.1, blur: 4 });
  walk(S, T, L(36).start - 0.3, L(36).start + 0.8, D - F(600, 230), { run: true });
  // núcleo de sílex enorme que se talla golpe a golpe
  const k = F({ x: zD.x - 50, y: zD.y }, { x: zD.x, y: zD.y });
  S.add(`<svg id="core" class="prop" style="left:${k.x - 260}px;top:${k.y - 220}px;z-index:7;opacity:0" width="520" height="440" viewBox="-260 -220 520 440" overflow="visible">
    <path d="M-200,40 C-220,-80 -100,-190 20,-180 C160,-170 230,-60 210,60 C190,170 60,210 -60,190 C-160,170 -190,120 -200,40Z" fill="#7d8592" stroke="${C.ink}" stroke-width="8"/>
    ${[0, 1, 2, 3].map((i) => `<path id="sc${i}" d="M${-150 + i * 90},${-120 + (i % 2) * 40} l60,-20 l20,60 l-60,20Z" fill="#a8b0bc" stroke="${C.ink}" stroke-width="4" opacity="0"/>`).join("")}</svg>`);
  pop(S, "#core", W(36, "piedra") - 0.1);
  label(S, "silex", k.x, k.y - F(300, 300), "SÍLEX", { size: 90, dirt: true, w: 800 });
  fadeUp(S, "#silex", W(36, "sílex"));
  const hits = [W(36, "golpe", 1), W(36, "golpe", 2), W(36, "lascas"), W(36, "cortan")];
  hits.forEach((t, i) => {
    S.tw(`tl.to("#sc${i}",{opacity:1,duration:0.05},${r3(t)});`);
    burst(S, `fl${i}`, k.x - 150 + i * 90, k.y - 120, t, { n: 6, color: "#cfd6df", spread: 120, up: 120, size: 16, seed: 30 + i });
    shake(S, t, 6, 0.15);
  });
  iconCard(S, "kn36", zD.x + F(520, 0), zD.y + F(0, 330), 250, "knife", "CUCHILLA");
  pop(S, "#kn36", W(36, "cuchillas"));
  // 37: con mango y resina se convierten en herramientas
  clearAt(S, "#core,#silex,#kn36", L(37).start - 0.2);
  const it37 = [["drop", "RESINA", W(37, "resina"), null, "#f2c46b"], ["knife", "CUCHILLO", W(37, "cuchillos")], ["broom", "RASPADOR", W(37, "raspadores")], ["arrow-up", "PUNTA", W(37, "puntas")]];
  cardsAt(S, "c37", zD.x + F(60, 0), zD.y - F(20, 20), it37, { size: F(280, 260), cols: h ? 4 : 2 });
  // 38: un mal golpe -> se rompe; aprender lleva años
  clearAt(S, ids("c37", 4), L(38).start - 0.2);
  S.add(`<div id="brk" class="prop" style="left:${zD.x - 260}px;top:${zD.y - 330}px;width:520px;height:300px;z-index:7;opacity:0">
    <svg id="brkL" width="260" height="300" viewBox="0 0 260 300" style="position:absolute;left:0;top:0"><path d="M240,20 L180,120 L230,200 L200,290 L60,280 C10,240 0,120 60,40Z" fill="#7d8592" stroke="${C.ink}" stroke-width="7"/></svg>
    <svg id="brkR" width="260" height="300" viewBox="0 0 260 300" style="position:absolute;left:250px;top:0"><path d="M0,20 L-60,120 L-10,200 L-40,290 L140,280 C210,240 230,120 170,40Z" fill="#7d8592" stroke="${C.ink}" stroke-width="7" transform="translate(60,0)"/></svg></div>`);
  pop(S, "#brk", L(38).start);
  S.tw(`tl.to("#brkL",{x:-80,rotation:-20,duration:0.4,ease:"power3.out"},${r3(W(38, "rompe"))});tl.to("#brkR",{x:80,rotation:20,duration:0.4,ease:"power3.out"},${r3(W(38, "rompe"))});`);
  mark(S, "brkx", zD.x, zD.y - 180, 220, W(38, "rompe") + 0.15, false);
  shake(S, W(38, "rompe"), 10, 0.25);
  pose(S, T, W(38, "rompe"), { mouth: "sad", brows: 4, head: 8 }, 0.25);
  bar(S, "b38", zD.x, zD.y + F(220, 200), F(860, 800), { label: "HABILIDAD", ic: "hand-fist", color: C.green, from: 0.05, to: 0.9, t: W(38, "aprender"), dur: 1.8 });
  label(S, "y38", zD.x + F(330, 260), zD.y + F(90, 80), "AÑOS", { size: 60, color: C.ochre, w: 400 });
  fadeUp(S, "#y38", W(38, "años"));
  pose(S, T, W(38, "aprender"), { mouth: "neutral", brows: 0, head: 0 }, 0.3);
  camTo(S, L(38).end - 0.3, spotBox(S, D, 1.2), { dur: 0.7 });

  // ===== E · Buscar comida (39-45) =====
  const E = D + 3300, zE = zone(S, E);
  goSpot(S, L(39).start - 0.3, E, { dur: 1.1, blur: 4 });
  walk(S, T, L(39).start - 0.3, L(39).start + 0.8, E - F(800, 360), { run: true });
  const Li = actor(S, "l39", "lia", E + F(1300, 900), G, { scale: 1.35, z: 7, flip: true, props: { F: prop("basket", "bsk") } });
  const Ni = actor(S, "n39", "nima", E + F(1550, 1100), G, { scale: 1.35, z: 8, flip: true });
  walk(S, Li, W(39, "lía") - 0.3, W(39, "salen") + 0.6, E - F(330, 30));
  walk(S, Ni, W(39, "nima") - 0.3, W(39, "salen") + 0.7, E - F(80, 190));
  life(S, Li, W(39, "salen") + 0.7, end, 91); life(S, Ni, W(39, "salen") + 0.8, end, 92);
  S.tw(`tl.to("#l39-flip,#n39-flip",{scaleX:1,duration:0.15},${r3(W(39, "salen") + 0.7)});`);
  // 40: lo que encuentran
  const it40 = [["carrot", "RAÍCES", W(40, "raíces")], ["tree-evergreen", "PIÑONES", W(40, "piñones")], ["acorn", "AVELLANAS", W(40, "avellanas")], ["flower", "SETAS", W(40, "setas")], ["egg", "HUEVO", W(40, "huevo")]];
  const p40 = cardsAt(S, "c40", zE.x + F(150, 0), zE.y - F(80, 60), it40, { size: F(240, 230), cols: h ? 5 : 3, gap: 26 });
  it40.forEach(([, , t], i) => S.tw(`tl.to("#c40${i}",{y:-20,duration:0.15,yoyo:true,repeat:1},${r3(t + 0.45)});`));
  // 41: bayas buenas y bayas venenosas
  clearAt(S, ids("c40", 5), L(41).start - 0.2);
  const berry = (c) => `<svg width="190" height="170" viewBox="-95 -85 190 170"><path d="M0,-80 C10,-50 30,-40 40,-30" stroke="#3f6b2a" stroke-width="8" fill="none"/>${[[-30, 0], [20, -10], [0, 35], [40, 30], [-40, 45]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="30" fill="${c}" stroke="${C.ink}" stroke-width="5"/>`).join("")}</svg>`;
  panel(S, "bg41", zE.x + F(-150, -230), zE.y - 60, 400, 420, `${berry("#4a5fd1")}<div class="lbl">COMIDA</div>`);
  panel(S, "bb41", zE.x + F(350, 230), zE.y - 60, 400, 420, `${berry("#d13a3a")}<div class="lbl">VENENO</div>`);
  pop(S, "#bg41", W(41, "comida")); pop(S, "#bb41", W(41, "veneno"));
  mark(S, "bg41m", zE.x + F(-10, -100), zE.y - 220, 150, W(41, "comida") + 0.3, true);
  mark(S, "bb41m", zE.x + F(490, 360), zE.y - 220, 150, W(41, "veneno") + 0.3, false);
  label(S, "v41", zE.x + F(100, 0), zE.y + F(260, 260), "1 ERROR = PELIGRO", { size: F(64, 58), color: "#ffb4a8", w: 1100 });
  fadeUp(S, "#v41", W(41, "equivocarse"));
  pose(S, Li, W(41, "sabe"), { armF: -90, foreF: -20, mouth: "smile" }, 0.3);
  pose(S, Li, W(41, "equivocarse"), { armF: 0, foreF: 0, mouth: "sad" }, 0.3);
  // 42: pocas plantas en invierno
  clearAt(S, "#bg41,#bb41,#bg41m,#bb41m,#v41", L(42).start - 0.2);
  lineChart(S, "ch42", zE.x + F(120, 0), zE.y - F(40, 20), F(1000, 920), F(560, 560), [0.65, 0.95, 0.7, 0.12], W(42, "invierno") - 0.2, 1.1,
    { color: C.green, title: "PLANTAS", labels: ["PRIM", "VER", "OTOÑ", "INV"] });
  mark(S, "ch42m", zE.x + F(470, 330), zE.y - F(40, 20) + 120, 160, W(42, "problema"), false);
  pose(S, Li, L(42).start, { mouth: "neutral" }, 0.3);
  // 43-44: despensa y carne seca
  clearAt(S, "#ch42,#ch42m", L(43).start - 0.2);
  panel(S, "p43", zE.x + F(120, 0), zE.y - F(40, 20), F(980, 900), F(600, 600), `
    <div style="display:flex;align-items:center;gap:20px;font:900 64px Inter;color:${C.ink}">${icon("package", { size: 90, color: C.ochreD })}DESPENSA</div>
    <div style="display:flex;gap:30px;align-items:flex-end;height:300px;margin-top:16px">
     ${[0, 1, 2, 3, 4].map((i) => `<div id="mt${i}" style="width:110px;height:280px;background:#a8452f;border:6px solid ${C.ink};border-radius:30px 30px 14px 14px;transform-origin:50% 0"></div>`).join("")}</div>
    <div id="d43" style="font:900 54px Inter;color:${C.redD};margin-top:10px;opacity:0">NO DURA UN MES</div>`);
  flipIn(S, "#p43", W(43, "caza") - 0.2);
  iconCard(S, "h43", zE.x + F(-470, -340), zE.y - F(260, 420), 200, "smiley-sad", "", { bg: "#f6c6c0" });
  pop(S, "#h43", W(43, "hambre"));
  fadeUp(S, "#d43", W(43, "despensa"));
  [0, 1, 2, 3, 4].forEach((i) => S.tw(`tl.to("#mt${i}",{scaleY:${[0.25, 0.15, 0.3, 0.1, 0.2][i]},duration:0.6,ease:"power2.in"},${r3(W(44, "acabando") - 0.8 + i * 0.12)});`));
  pose(S, T, W(44, "acabando"), { mouth: "sad", brows: 3, head: 6 }, 0.3);
  // 45: ¡a cazar! Tarko coge la lanza; la cámara se aleja y enseña toda la semana
  const T2 = actor(S, "t3s", "tarko", T.x, G, { scale: 1.35, z: 6, props: { F: prop("spear", "spr") } });
  S.tw(`tl.set("#t3s",{opacity:0},0);tl.set("#t3s",{opacity:1},${r3(L(45).start - 0.05)});tl.set("#t3",{opacity:0},${r3(L(45).start - 0.05)});`);
  life(S, T2, L(45).start, end, 99);
  pose(S, T2, W(45, "cazar") - 0.2, { armF: -160, foreF: -10, mouth: "open", brows: -6, head: -6 }, 0.35);
  clearAt(S, "#p43,#h43", L(45).start);
  label(S, "go45", zE.x + F(150, 0), zE.y - F(150, 120), "¡A CAZAR!", { size: F(170, 140), dirt: true, w: 1500 });
  slam(S, "#go45", W(45, "cazar"));
  shake(S, W(45, "cazar"), 14, 0.35);
  camTo(S, L(45).end + 0.05, { x: A - 1200, y: G - 2200, w: E - A + 2600, h: 2400 }, { dur: 0.75, ease: "power2.inOut" });
  exit(S, { dur: 0.4 });
}

// 4 · SEMANA 2 · CUARTO CRECIENTE · LA CAZA DEL RENO (frases 46-69)
import { C, r3, icon, camTo, shake, actor, life, walk, pose, shiver, burst, prop } from "./lib.mjs";
import { G, sky, parallax, ground, snow, enter, exit } from "./fondos.mjs";
import { spotBox, zone, goSpot, grid, iconCard, panel, pop, drop, fadeUp, shrinkOut, flipIn, flipOut, wobble, pulse, mark, label, slam, counter, bar, lineChart, fire, tent, moonBadge, bubble, arrow, typeOn, cardsAt, clearAt, ids, animal, animalWalk, animalIdle, phone } from "./lib2.mjs";

export function semana2(S) {
  const { F, h } = S.fmt;
  const L = (i) => S.line(i), W = (l, w, n) => S.W(l, w, n);
  const end = S.t1 - S.t0;
  sky(S, { top: "#4f7fb5", mid: "#9cc0dc", low: "#d9e4ea", glow: "#f3d9b0", stars: false });
  parallax(S, { far: "#7d93b5", far2: "#8fa3c2", mid: "#a5b6cd", mamC: "#7d8eab" });
  ground(S, { top: "#eef3f7", bottom: "#c3d0dc" });
  // la noche llega en la fiesta (frase 66)
  S.bg.push(`<div id="${S.id}-night" class="layer" style="width:${S.fmt.W}px;height:${S.fmt.H}px;background:linear-gradient(180deg,#0d1529,#26345a 70%,#6a4a50);opacity:0"></div>`);
  S.tw(`tl.to("#${S.id}-night",{opacity:1,duration:1.2},${r3(L(66).start - 1.2)});`);

  // ===== A · Rastrear (46-50) =====
  const A = 3000, zA = zone(S, A);
  enter(S, spotBox(S, A));
  const T = actor(S, "t4", "tarko", zA.chx, G, { scale: 1.35, z: 6, props: { F: prop("spear", "spr4") } });
  life(S, T, 0, end, 101);
  moonBadge(S, "m2", F(A + 230, A), F(G - 760, G - 1150), 0.5, "SEMANA 2", W(46, "semana"));
  S.tw(`tl.to("#m2",{y:-60,scale:0.7,opacity:0,duration:0.35},${r3(L(47).start - 0.2)});`);
  // manada de renos que cruza el valle
  for (let i = 0; i < 5; i++) {
    const an = animal(S, `rn${i}`, "reno", A + 1800 + i * 330, G - 30 - (i % 2) * 40, { s: 0.8 - (i % 2) * 0.1, flip: true, z: 2 });
    animalWalk(S, an, W(46, "renos") - 0.5, L(47).start + 0.2, A - 400 + i * 280);
  }
  // 47-48: el terreno como una app de mapas
  const ph = F({ x: zA.x + 120, y: zA.y - 40, w: 560, h: 820 }, { x: zA.x, y: zA.y - 20, w: 520, h: 720 });
  phone(S, "map47", ph.x, ph.y, ph.w, ph.h, `
    <div style="position:absolute;inset:0;background:#e9efe2"></div>
    <svg width="100%" height="100%" viewBox="0 0 480 720" preserveAspectRatio="none" style="position:absolute;inset:0">
      ${[...Array(9)].map((_, i) => `<path d="M0,${i * 90} L480,${i * 90 + 40}" stroke="#cfd9c4" stroke-width="5"/>`).join("")}
      <path d="M-20,520 C120,420 160,300 260,260 S420,120 520,80" stroke="#9cc3e6" stroke-width="36" fill="none"/>
      <path id="route" d="M60,660 C120,560 200,520 240,430 S330,260 400,150" stroke="${C.ochre}" stroke-width="14" stroke-dasharray="26 18" fill="none" pathLength="1"/>
    </svg>
    <div style="position:absolute;left:0;top:0;width:100%;padding:18px 22px;background:#fff;font:900 46px Inter;color:${C.ink};display:flex;align-items:center;gap:12px;border-bottom:4px solid #ddd">${icon("map-trifold", { size: 52, color: C.ochreD })}RENOS</div>
    ${[["paw-print", 150, 560, "p1"], ["drop", 250, 420, "p2"], ["tree", 360, 230, "p3"]].map(([ic, x, y, id]) => `<div id="${id}" style="position:absolute;left:${(x / 480) * 100}%;top:${(y / 720) * 100}%;transform:translate(-50%,-100%);opacity:0">${icon("map-pin", { size: 96, color: C.red })}<div style="position:absolute;left:24px;top:14px">${icon(ic, { size: 48, color: "#fff" })}</div></div>`).join("")}`);
  pop(S, "#map47", W(47, "mapa") - 0.4);
  S.tw(`tl.fromTo("#route",{strokeDashoffset:1,strokeDasharray:"0 1"},{strokeDasharray:"1 0",duration:1.2,ease:"power1.inOut"},${r3(W(47, "mapa"))});`);
  [["p1", W(48, "huellas")], ["p2", W(48, "excrementos")], ["p3", W(48, "ramas")]].forEach(([id, t]) => drop(S, `#${id}`, t, -80));
  label(S, "inf48", F(zA.x + 120, zA.x), F(zA.y + 470, zA.y + 420), "TODO ES INFORMACIÓN", { size: F(66, 60), w: 1200 });
  fadeUp(S, "#inf48", W(48, "información"));
  pose(S, T, W(47, "leen"), { head: 12, look: 4, armB: -30, foreB: -90 }, 0.35);
  // 49: una huella lo cuenta todo
  clearAt(S, "#map47,#inf48", L(49).start - 0.25);
  panel(S, "hu49", zA.x + F(80, 0), zA.y - F(40, 30), F(1100, 980), F(640, 600), `
    <div style="display:flex;align-items:center;gap:40px">${icon("paw-print", { size: 240, color: C.ink })}
     <div style="display:flex;flex-direction:column;gap:22px">
      ${[["ag1", "JOVEN"], ["ag2", "VIEJO"], ["tm1", "HACE 1 HORA"], ["tm2", "HACE 1 DÍA"]].map(([id, t]) => `<div id="${id}" style="font:900 60px Inter;color:${C.ink};background:#e6d2b0;border:5px solid ${C.ink};border-radius:16px;padding:4px 22px;opacity:.35">${t}</div>`).join("")}
     </div></div>`);
  flipIn(S, "#hu49", W(49, "huella") - 0.2);
  [["ag1", W(49, "joven")], ["ag2", W(49, "viejo")], ["tm1", W(49, "hora")], ["tm2", W(49, "día")]].forEach(([id, t]) => S.tw(`tl.to("#${id}",{opacity:1,backgroundColor:"${C.ochre}",scale:1.06,duration:0.2},${r3(t)});`));
  // 50: emboscada en equipo (pizarra)
  flipOut(S, "#hu49", L(50).start - 0.15);
  const bw = F(1200, 1000), bh = F(700, 640);
  panel(S, "plan50", zA.x + F(80, 0), zA.y - F(40, 30), bw, bh, `
    <svg width="${bw - 60}" height="${bh - 60}" viewBox="0 0 1100 640" style="position:absolute;left:30px;top:30px">
      <rect width="1100" height="640" rx="20" fill="#3d5a44"/>
      <path d="M700,0 L760,250 L700,640 M1000,0 L900,250 L1000,640" stroke="#e8efe0" stroke-width="10" fill="none"/>
      <text x="830" y="610" font-family="Inter" font-weight="900" font-size="46" fill="#e8efe0" text-anchor="middle">PASO</text>
      ${[[200, 250], [260, 380], [160, 470]].map(([x, y], i) => `<g id="rd${i}"><circle cx="${x}" cy="${y}" r="34" fill="#c9a46b" stroke="#fff" stroke-width="5"/></g>`).join("")}
      <g id="hun"><circle cx="60" cy="200" r="26" fill="${C.red}"/><circle cx="60" cy="380" r="26" fill="${C.red}"/></g>
      <g id="amb"><circle cx="830" cy="160" r="26" fill="${C.ochre}" stroke="#fff" stroke-width="4"/><circle cx="830" cy="360" r="26" fill="${C.ochre}" stroke="#fff" stroke-width="4"/></g>
      <path id="arw" d="M90,290 C300,280 500,290 760,300" stroke="#fff" stroke-width="12" fill="none" stroke-dasharray="22 16" pathLength="1"/>
    </svg>`, { pad: 0 });
  flipIn(S, "#plan50", W(50, "equipo") - 0.2);
  S.tw(`tl.fromTo("#hun",{opacity:0},{opacity:1,duration:0.2},${r3(W(50, "asustan"))});`);
  S.tw(`tl.fromTo("#rd0,#rd1,#rd2",{x:0},{x:520,duration:1.4,stagger:0.1,ease:"power2.in"},${r3(W(50, "asustan") + 0.2)});`);
  S.tw(`tl.fromTo("#amb",{opacity:0,scale:0.4},{opacity:1,scale:1,svgOrigin:"830 260",duration:0.3,ease:"back.out(2)"},${r3(W(50, "escondidos"))});`);
  label(S, "eq50", zA.x + F(80, 0), zA.y + F(400, 380), "EN EQUIPO", { size: 70, w: 900 });
  fadeUp(S, "#eq50", W(50, "equipo"));
  camTo(S, L(50).end - 0.3, spotBox(S, A, 1.15), { dur: 0.7 });

  // ===== B · El propulsor (51-55) =====
  const B = A + 3000, zB = zone(S, B);
  goSpot(S, L(51).start - 0.3, B, { dur: 1.1, blur: 4 });
  walk(S, T, L(51).start - 0.3, L(51).start + 0.8, B - F(600, 230), { run: true });
  iconCard(S, "hd51", zB.x - F(200, 230), zB.y - F(120, 100), 270, "hand", "MANO");
  pop(S, "#hd51", W(51, "mano") - 0.2);
  mark(S, "hd51x", zB.x - F(200, 230), zB.y - F(120, 100), 210, W(51, "mano") + 0.15, false);
  panel(S, "pr51", zB.x + F(260, 230), zB.y - F(120, 100), F(560, 470), 300, `
    <svg width="400" height="120" viewBox="0 0 400 120"><path d="M20,70 L340,70" stroke="#8a6232" stroke-width="22" stroke-linecap="round"/><path d="M340,70 L380,30" stroke="#8a6232" stroke-width="18" stroke-linecap="round"/><path d="M20,70 L340,70" stroke="${C.ink}" stroke-width="4" fill="none" opacity=".4"/></svg>
    <div class="lbl">PROPULSOR</div>`);
  pop(S, "#pr51", W(51, "propulsor"));
  // 52: un brazo más largo
  clearAt(S, "#hd51,#hd51x,#pr51", L(52).start - 0.2);
  bar(S, "arm52", zB.x + F(60, 0), zB.y - F(200, 150), F(1000, 900), { label: "LARGO DEL BRAZO", ic: "arrows-horizontal", color: C.ochre, from: 0.45, to: 0.95, t: W(52, "brazo"), dur: 0.8 });
  label(S, "g52", zB.x + F(60, 0), zB.y + F(120, 140), "PALO + GANCHO", { size: 70, w: 1000 });
  fadeUp(S, "#g52", W(52, "gancho"));
  pose(S, T, W(52, "brazo"), { armF: -150, foreF: -30 }, 0.3);
  // 53: lanzamiento
  clearAt(S, "#arm52,#g52", L(53).start - 0.2);
  pose(S, T, L(53).start, { armF: -200, foreF: -40, body: -6, mouth: "open" }, 0.25, "power2.out");
  const tTh = W(53, "sale");
  pose(S, T, tTh, { armF: -40, foreF: 0, body: 6 }, 0.12, "power4.in");
  S.tw(`tl.to("#spr4",{opacity:0,duration:0.01},${r3(tTh + 0.05)});`);
  const sx = T.x + 60, sy = G - 600, ex = T.x + F(1500, 900), ey = G - 60;
  S.add(`<svg id="flyS" class="prop" style="left:${sx}px;top:${sy - 20}px;z-index:9;opacity:0" width="300" height="40" viewBox="0 0 300 40" overflow="visible"><path d="M0,20 L260,20" stroke="#7a5030" stroke-width="10" stroke-linecap="round"/><path d="M300,20 L250,6 L250,34Z" fill="#9aa3ad" stroke="${C.ink}" stroke-width="4"/></svg>`);
  S.tw(`tl.set("#flyS",{opacity:1},${r3(tTh + 0.05)});tl.fromTo("#flyS",{x:0,y:0,rotation:-25},{keyframes:[{x:${(ex - sx) / 2},y:${-260},rotation:0,duration:0.45,ease:"power1.out"},{x:${ex - sx - 150},y:${ey - sy},rotation:30,duration:0.45,ease:"power1.in"}]},${r3(tTh + 0.05)});`);
  arrow(S, "arc53", sx + 60, sy, ex - 100, ey - 60, tTh + 0.05, { color: "rgba(255,255,255,.7)", dur: 0.9, bend: -0.35, w: 8 });
  cardsAt(S, "c53", zB.x + F(150, 0), zB.y - F(250, 300), [["trend-up", "MÁS RÁPIDA", W(53, "rápida")], ["arrows-horizontal", "MÁS LEJOS", W(53, "lejos")]], { size: F(260, 240), cols: 2 });
  pose(S, T, tTh + 0.6, { armF: 0, foreF: 0, body: 0, mouth: "smile" }, 0.3);
  // 54: no siempre aciertan
  clearAt(S, "#c530,#c531,#arc53", L(54).start - 0.2);
  mark(S, "miss54", ex - 150, G - 200, 220, W(54, "aciertan"), false);
  panel(S, "p54", zB.x + F(150, 0), zB.y - F(140, 120), F(900, 860), F(420, 420), `
    <div style="display:flex;align-items:center;gap:20px;font:900 66px Inter;color:${C.ink}">${icon("hand", { size: 90, color: C.ochreD })}MANOS VACÍAS</div>
    <div style="display:flex;align-items:center;gap:20px;font:900 66px Inter;color:${C.redD};margin-top:20px;opacity:0" id="lg54">${icon("sneaker", { size: 90, color: C.redD })}PIERNAS ROTAS</div>`);
  flipIn(S, "#p54", W(54, "vacías") - 0.3);
  fadeUp(S, "#lg54", W(54, "piernas"));
  pose(S, T, W(54, "aciertan"), { mouth: "sad", brows: 4, head: 8 }, 0.3);
  // 55: puntas
  clearAt(S, "#p54,#miss54,#flyS", L(55).start - 0.2);
  pose(S, T, L(55).start, { mouth: "neutral", brows: 0, head: 0 }, 0.3);
  cardsAt(S, "c55", zB.x + F(100, 0), zB.y - F(60, 40), [["arrow-up", "SÍLEX", W(55, "sílex"), null, "#cfd6df"], ["arrow-up", "HUESO", W(55, "hueso"), null, "#f1e7d2"], ["arrow-up", "ASTA", W(55, "asta"), null, "#e3c79c"]], { size: F(300, 270), cols: 3 });
  camTo(S, L(55).end - 0.3, spotBox(S, B, 1.15), { dur: 0.7 });

  // ===== C · Peligro (56-59) =====
  const Cc = B + 3000, zC = zone(S, Cc);
  goSpot(S, L(56).start - 0.3, Cc, { dur: 1.0, blur: 4 });
  walk(S, T, L(56).start - 0.3, L(56).start + 0.7, Cc - F(600, 230), { run: true });
  S.add(`<div id="red56" class="prop" style="left:${Cc - 3000}px;top:${G - 3000}px;width:6000px;height:4200px;background:radial-gradient(closest-side,rgba(229,72,77,0),rgba(140,20,20,.45));z-index:1;opacity:0"></div>`);
  S.tw(`tl.to("#red56",{opacity:1,duration:0.4},${r3(W(56, "peligroso") - 0.2)});tl.to("#red56",{opacity:0,duration:0.6},${r3(L(58).start)});`);
  label(S, "w56", zC.x + F(80, 0), zC.y - F(160, 120), "LO MÁS<br>PELIGROSO", { size: F(120, 110), dirt: true, w: 1300, color: "#ffd3c4" });
  slam(S, "#w56", W(56, "peligroso"));
  shake(S, W(56, "peligroso"), 14, 0.3);
  // 57: tres peligros, uno por frase
  clearAt(S, "#w56", L(57).start - 0.2);
  const v57 = [["reno", "COCEA", W(57, "cocea")], ["bisonte", "EMBISTE", W(57, "embiste")], [null, "HIELO", W(57, "hielo")]];
  const vp = grid(S, 3, zC.x + F(80, 0), zC.y - F(60, 40), F(440, 340), 28, h ? 3 : 1, F(440, 230));
  v57.forEach(([k, lb, t], i) => {
    const w = F(440, 700), hh = F(440, 220);
    panel(S, `v57${i}`, vp[i].x, vp[i].y, w, hh, `${k ? `<div style="width:${F(320, 260)}px;height:${F(200, 150)}px;position:relative">${""}</div>` : icon("snowflake", { size: F(190, 140), color: "#5a7c9c" })}<div class="lbl" style="color:${C.redD}">${lb}</div>`, { bg: "#f8ddd6" });
    pop(S, `#v57${i}`, t - 0.15);
    if (k) {
      const an = animal(S, `va${i}`, k, vp[i].x, vp[i].y + F(70, 30), { s: F(0.62, 0.45), flip: i === 1, z: 8 });
      S.tw(`tl.fromTo("#va${i}",{opacity:0},{opacity:1,duration:0.2},${r3(t - 0.1)});`);
      if (i === 0) S.tw(`tl.to("#va0-l1,#va0-l2",{rotation:-45,svgOrigin:"0 -96",duration:0.12,yoyo:true,repeat:3},${r3(t + 0.1)});`);
      else S.tw(`tl.fromTo("#va1",{x:-60},{x:60,duration:0.3,yoyo:true,repeat:1,ease:"power3.in"},${r3(t)});`);
    }
  });
  shake(S, W(57, "embiste") + 0.2, 12, 0.3);
  mark(S, "v572m", vp[2].x + F(130, 260), vp[2].y - F(130, 50), 150, W(57, "pierna"), false);
  // 58: huesos con fracturas curadas (radiografía)
  clearAt(S, "#v570,#v571,#v572,#va0,#va1,#v572m", L(58).start - 0.2);
  panel(S, "xr58", zC.x + F(80, 0), zC.y - F(60, 40), F(900, 860), F(600, 560), `
    <svg width="700" height="300" viewBox="0 0 700 300"><rect width="700" height="300" rx="20" fill="#17202b"/>
     <path d="M80,150 C80,110 140,110 150,140 L540,140 C550,110 620,110 620,150 C620,190 550,190 540,160 L150,160 C140,190 80,190 80,150Z" fill="#e9eef3"/>
     <path d="M330,120 L350,150 L330,180" stroke="#17202b" stroke-width="10" fill="none"/>
     <ellipse id="heal" cx="342" cy="150" rx="40" ry="34" fill="none" stroke="${C.green}" stroke-width="10" opacity="0"/></svg>
    <div class="lbl" style="margin-top:12px">FRACTURA CURADA</div>`, { bg: "#d8e2ea" });
  flipIn(S, "#xr58", W(58, "esqueletos") - 0.2);
  S.tw(`tl.to("#heal",{opacity:1,duration:0.3},${r3(W(58, "curaron"))});`);
  pulse(S, "#xr58", W(58, "curaron") + 0.1, 1.06);
  // 59: dos cosas
  flipOut(S, "#xr58", L(59).start - 0.15);
  cardsAt(S, "c59", zC.x + F(80, 0), zC.y - F(60, 40), [["bandaids", "MUCHO DAÑO", W(59, "daño"), null, "#f8ddd6"], ["hand-heart", "LOS CUIDABAN", W(59, "cuidaba"), true, "#dff2e3"]], { size: F(320, 280), cols: h ? 2 : 1 });
  camTo(S, L(59).end - 0.3, spotBox(S, Cc, 1.15), { dur: 0.7 });

  // ===== D · El reno y su aprovechamiento (60-65) =====
  const D = Cc + 3100, zD = zone(S, D);
  goSpot(S, L(60).start - 0.3, D, { dur: 1.0, blur: 4 });
  walk(S, T, L(60).start - 0.3, L(60).start + 0.7, D - F(640, 250), { run: true });
  const rx = F(zD.x - 60, zD.x + 120);
  const big = animal(S, "big60", "reno", rx, G + 10, { s: 1.5, z: 5, flip: true });
  S.tw(`tl.fromTo("#big60",{opacity:0,rotation:0},{opacity:1,rotation:0,duration:0.3},${r3(W(60, "reno") - 0.3)});`);
  S.tw(`tl.to("#big60",{rotation:-80,y:-60,transformOrigin:"50% 100%",duration:0.6,ease:"bounce.out"},${r3(W(60, "grande") + 0.3)});`);
  label(S, "ok60", zD.x + F(60, 0), zD.y - F(330, 300), "¡ESTA VEZ SALE BIEN!", { size: F(96, 80), dirt: true, w: 1500, color: "#d8f5d8" });
  slam(S, "#ok60", W(60, "bien"));
  pose(S, T, W(60, "bien"), { armF: -160, armB: 150, mouth: "smile", brows: -5 }, 0.3);
  // 61: cargar la carne
  clearAt(S, "#ok60", L(61).start - 0.2);
  S.tw(`tl.to("#big60",{opacity:0,duration:0.3},${r3(L(61).start)});`);
  pose(S, T, L(61).start, { armF: -170, foreF: -60, armB: -170, foreB: -60, body: 12, mouth: "open", brows: 4 }, 0.35);
  S.add(`<div id="load61" class="prop" style="left:${T.x - 150}px;top:${G - 740}px;width:300px;height:190px;z-index:7;opacity:0;background:#a8452f;border:7px solid ${C.ink};border-radius:60px 60px 40px 40px"></div>`);
  pop(S, "#load61", L(61).start + 0.1);
  bar(S, "kg61", zD.x + F(150, 0), zD.y - F(160, 160), F(860, 860), { label: "DECENAS DE KILOS", ic: "barbell", color: C.red, from: 0.1, to: 0.92, t: W(61, "kilos") - 0.4, dur: 0.8 });
  iconCard(S, "hr61", zD.x + F(150, 0), zD.y + F(170, 170), 240, "hourglass-medium", "HORAS");
  pop(S, "#hr61", W(61, "horas"));
  S.tw(`tl.to("#t4-body",{y:8,duration:0.25,yoyo:true,repeat:7,ease:"sine.inOut"},${r3(L(61).start + 0.4)});`);
  // 62-63: aquí no se tira nada (diagrama del reno)
  clearAt(S, "#kg61,#hr61,#load61", L(62).start - 0.2);
  pose(S, T, L(62).start, { armF: 0, foreF: 0, armB: 0, foreB: 0, body: 0, mouth: "neutral", brows: 0 }, 0.3);
  label(S, "z62", zD.x + F(60, 0), zD.y - F(330, 330), "0 % DESPERDICIO", { size: F(100, 86), dirt: true, w: 1500, color: "#d8f5d8" });
  slam(S, "#z62", W(62, "nada"));
  const cen = { x: zD.x + F(60, 0), y: zD.y + F(40, 40) };
  S.add(`<div id="rc63" class="card" style="left:${cen.x - 170}px;top:${cen.y - 110}px;width:340px;height:220px;background:${C.bone};z-index:7;opacity:0"><div class="lbl">RENO</div></div>`);
  pop(S, "#rc63", L(63).start - 0.2);
  S.tw(`tl.to("#z62",{y:-60,scale:0.7,opacity:0,duration:0.3},${r3(L(63).start - 0.1)});`);
  const uses = [["fork-knife", "CARNE", W(63, "carne")], ["t-shirt", "PIEL", W(63, "piel")], ["axe", "HUESOS", W(63, "huesos")], ["needle", "TENDONES", W(63, "tendones")], ["fire", "GRASA", W(63, "grasa")]];
  const rad = F([480, 300], [420, 360]);
  uses.forEach(([ic, lb, t], i) => {
    const a = (-90 + (i - 2) * F(48, 60)) * Math.PI / 180;
    const ux = cen.x + Math.cos(a) * rad[0] * (h ? 1.5 : 1.15), uy = cen.y + Math.sin(a) * rad[1] * (h ? 1 : 1.5) + F(60, 120);
    const k2 = h ? i : i;
    const pos = h ? { x: cen.x + (i - 2) * 330, y: cen.y + 330 } : { x: cen.x + ((i % 3) - 1) * 330, y: cen.y + 300 + Math.floor(i / 3) * 280 };
    arrow(S, `ua${i}`, cen.x, cen.y + 100, pos.x, pos.y - 140, t - 0.1, { dur: 0.3, bend: 0.05, w: 10 });
    iconCard(S, `u63${i}`, pos.x, pos.y, 250, ic, lb, { lsize: 54 });
    pop(S, `#u63${i}`, t);
  });
  // 64: curtir con el cerebro (rígida -> suave)
  clearAt(S, ids("u63", 5) + ",#ua0,#ua1,#ua2,#ua3,#ua4,#rc63", L(64).start - 0.2);
  panel(S, "p64", zD.x + F(60, 0), zD.y - F(40, 40), F(1000, 900), F(560, 560), `
    <div style="display:flex;align-items:center;gap:50px">
     <div style="text-align:center"><div style="width:220px;height:170px;background:#b08050;border:6px solid ${C.ink};border-radius:8px;margin:auto"></div><div class="lbl" style="margin-top:10px">RÍGIDA</div></div>
     ${icon("brain", { size: 120, color: C.redD })}
     <div style="text-align:center"><div id="soft64" style="width:220px;height:170px;background:#e2c497;border:6px solid ${C.ink};border-radius:70px 20px 70px 20px;margin:auto"></div><div class="lbl" style="margin-top:10px">SUAVE</div></div></div>
    <div style="font:900 50px Inter;color:${C.ochreD};margin-top:20px">PROBABLEMENTE</div>`);
  flipIn(S, "#p64", W(64, "probable") - 0.2);
  S.tw(`tl.fromTo("#soft64",{skewX:0},{skewX:12,duration:0.3,yoyo:true,repeat:5,ease:"sine.inOut"},${r3(W(64, "curtir"))});`);
  // 65: tiras de carne secándose
  flipOut(S, "#p64", L(65).start - 0.15);
  S.add(`<div id="dry65" class="prop" style="left:${zD.x + F(60, 0) - 520}px;top:${zD.y - 330}px;width:1040px;height:560px;z-index:7;opacity:0">
    <div style="position:absolute;left:20px;top:40px;width:1000px;height:18px;background:#7a5030;border:5px solid ${C.ink};border-radius:10px"></div>
    ${[0, 1, 2, 3, 4, 5].map((i) => `<div id="st${i}" style="position:absolute;left:${80 + i * 150}px;top:60px;width:70px;height:${260 + (i % 3) * 40}px;background:#a8452f;border:5px solid ${C.ink};border-radius:10px 10px 30px 30px;transform-origin:50% 0"></div>`).join("")}</div>`);
  pop(S, "#dry65", W(65, "tiras") - 0.2);
  [0, 1, 2, 3, 4, 5].forEach((i) => S.tw(`tl.fromTo("#st${i}",{rotation:-4},{rotation:4,duration:0.6,yoyo:true,repeat:3,ease:"sine.inOut"},${r3(W(65, "tiras") + i * 0.08)});`));
  S.tw(`tl.to("#st0,#st1,#st2,#st3,#st4,#st5",{backgroundColor:"#6e2a1c",scaleY:0.85,duration:1.2},${r3(W(65, "seca"))});`);
  label(S, "wk65", zD.x + F(60, 0), zD.y + F(330, 330), "DURA SEMANAS", { size: 72, w: 1000, color: "#d8f5d8" });
  fadeUp(S, "#wk65", W(65, "semanas"));
  camTo(S, L(65).end - 0.3, spotBox(S, D, 1.15), { dur: 0.7 });

  // ===== E · La fiesta (66-69) =====
  const E = D + 3200, zE = zone(S, E);
  goSpot(S, L(66).start - 0.3, E, { dur: 1.0, blur: 4 });
  walk(S, T, L(66).start - 0.3, L(66).start + 0.7, E - F(650, 260), { run: true });
  const fx = F(E - 150, E + 120);
  fire(S, "fu4", fx, G + 10, 1.3);
  const fam = [["lia", -470], ["nima", 330], ["ama", 560], ["gris", -800]];
  const famA = fam.map(([k, dx], i) => {
    const a = actor(S, `e4${k}`, k, fx + F(dx, dx * 0.55), G, { scale: k === "gris" ? 1.3 : 1.25, z: 5 + i, flip: dx > 0 && k !== "gris" });
    S.tw(`tl.fromTo("#e4${k}",{opacity:0},{opacity:1,duration:0.3},${r3(L(66).start + i * 0.1)});`);
    life(S, a, L(66).start, end, 120 + i);
    return a;
  });
  // baile / risas: todos botan
  S.tw(`tl.to("#e4lia-body,#e4nima-body,#e4ama-body,#t4-body",{y:-14,duration:0.22,yoyo:true,repeat:9,stagger:0.07,ease:"sine.inOut"},${r3(W(66, "fiesta"))});`);
  for (const k of ["lia", "nima", "ama"]) pose(S, famA[["lia", "nima", "ama"].indexOf(k)], W(66, "risas"), { mouth: "smile" }, 0.2);
  pose(S, T, W(66, "risas"), { mouth: "smile", armF: -120 }, 0.3);
  cardsAt(S, "c66", zE.x + F(120, 0), zE.y - F(200, 120), [["bone", "TUÉTANO", W(66, "tuétano")], ["fork-knife", "CARNE ASADA", W(66, "asada")], ["smiley", "RISAS", W(66, "risas")]], { size: F(260, 240), cols: 3 });
  // 67: tuétano = energía
  clearAt(S, ids("c66", 3), L(67).start - 0.2);
  bar(S, "en67", zE.x + F(120, 0), zE.y - F(200, 160), F(900, 860), { label: "GRASA Y ENERGÍA", ic: "lightning", color: C.ochre, from: 0.2, to: 0.98, t: W(67, "energía") - 0.3, dur: 0.9 });
  iconCard(S, "tu67", zE.x + F(120, 0), zE.y + F(120, 140), 250, "bone", "TUÉTANO", { bg: "#f2c46b" });
  pop(S, "#tu67", W(67, "tuétano"));
  // 68: Nima raspa pieles
  clearAt(S, "#en67,#tu67", L(68).start - 0.2);
  const Nm = famA[1];
  pose(S, Nm, W(68, "raspa") - 0.1, { armF: -60, foreF: -60, head: 10, mouth: "neutral" }, 0.25);
  S.tw(`tl.to("#e4nima-armF",{rotation:-30,svgOrigin:"30 -292",duration:0.18,yoyo:true,repeat:9,ease:"sine.inOut"},${r3(W(68, "raspa") + 0.2)});`);
  cardsAt(S, "c68", zE.x + F(120, 0), zE.y - F(160, 120), [["broom", "RASPA PIELES", W(68, "raspa")], ["eye", "APRENDE MIRANDO", W(68, "mirando")]], { size: F(260, 240), cols: h ? 2 : 1 });
  // 69: lo bueno y lo malo
  clearAt(S, ids("c68", 2), L(69).start - 0.2);
  cardsAt(S, "c69", zE.x + F(120, 0), zE.y - F(160, 120), [["crown", "COMEN COMO REYES", W(69, "reyes"), true, "#dff2e3"], ["calendar", "¿Y EN 10 DÍAS?", W(69, "diez"), false, "#f8ddd6"]], { size: F(260, 240), cols: h ? 2 : 1 });
  camTo(S, L(69).end + 0.05, { x: A - 1200, y: G - 2200, w: E - A + 2600, h: 2400 }, { dur: 0.75, ease: "power2.inOut" });
  exit(S, { dur: 0.4 });
}

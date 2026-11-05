// 6 · SEMANA 4 · CUARTO MENGUANTE · ARTE, HISTORIAS Y CAMINO (frases 93-120)
import { C, r3, icon, camTo, shake, actor, life, walk, pose, burst, prop } from "./lib.mjs";
import { G, sky, parallax, ground, snow, enter, exit } from "./fondos.mjs";
import { spotBox, zone, goSpot, grid, iconCard, panel, pop, drop, fadeUp, flipIn, flipOut, wobble, pulse, mark, label, slam, counter, bar, lineChart, fire, tent, moonBadge, bubble, arrow, cardsAt, clearAt, ids, animal, animalWalk, animalIdle, caveMouth, phone, typeOn } from "./lib2.mjs";

export function semana4(S) {
  const { F, h } = S.fmt;
  const L = (i) => S.line(i), W = (l, w, n) => S.W(l, w, n);
  const end = S.t1 - S.t0;
  sky(S, { top: "#3f6ea8", mid: "#8fb3d6", low: "#e6cfa8", glow: "#f2b46b", stars: false });
  parallax(S, { far: "#7489ab", far2: "#8496b5", mid: "#9aaac2", mamC: "#7689a6" });
  ground(S, { top: "#e9eef0", bottom: "#b9c2b0" });
  // noche para las historias (112-115) y vuelta al día (116)
  S.bg.push(`<div id="${S.id}-night" class="layer" style="width:${S.fmt.W}px;height:${S.fmt.H}px;background:linear-gradient(180deg,#0d1529,#26345a 70%,#6a4a50);opacity:0"></div>`);
  S.tw(`tl.to("#${S.id}-night",{opacity:1,duration:1},${r3(L(102).start - 1)});tl.to("#${S.id}-night",{opacity:0,duration:1.2},${r3(L(116).start - 0.6)});`);

  // ===== A · Calma y horas de trabajo (93-97) =====
  const A = 3000, zA = zone(S, A);
  enter(S, spotBox(S, A));
  const T = actor(S, "t6", "tarko", zA.chx, G, { scale: 1.35, z: 6 });
  life(S, T, 0, end, 181);
  moonBadge(S, "m4", F(A + 230, A), F(G - 760, G - 1150), -0.5, "SEMANA 4", W(93, "semana"));
  label(S, "m4l", F(A + 230, A), F(G - 560, G - 950), "POR FIN, CALMA", { size: F(80, 70), color: "#fff3d6" });
  fadeUp(S, "#m4l", W(93, "calma"));
  pose(S, T, W(93, "calma"), { mouth: "smile", armF: -30, armB: 30 }, 0.4);
  S.tw(`tl.to("#m4,#m4l",{y:-60,scale:0.7,opacity:0,duration:0.35},${r3(L(94).start - 0.2)});`);
  // 94: los niños corren
  const Nm = actor(S, "n7", "nima", A - 1200, G, { scale: 1.35, z: 8 });
  const Gr = actor(S, "g8", "gris", A - 1500, G, { scale: 1.3, z: 8 });
  walk(S, Nm, W(94, "niños") - 0.4, L(94).end + 0.4, A + F(1400, 900), { run: true });
  walk(S, Gr, W(94, "niños") - 0.2, L(94).end + 0.4, A + F(1150, 700), { run: true });
  pose(S, Nm, W(94, "correr"), { mouth: "smile" }, 0.2);
  bar(S, "fr94", zA.x + F(120, 0), zA.y - F(220, 200), F(860, 820), { label: "MENOS FRÍO", ic: "thermometer-hot", color: C.fire, from: 0.25, to: 0.6, t: W(94, "afloja") - 0.2, dur: 0.8 });
  // 95-97: el reloj del día
  clearAt(S, "#fr94", L(95).start - 0.2);
  const ck = F({ x: zA.x + 120, y: zA.y - 60 }, { x: zA.x, y: zA.y - 60 }), R = F(250, 230);
  const seg = (id, color, from, len) => `<circle id="${id}" cx="0" cy="0" r="${R * 0.6}" fill="none" stroke="${color}" stroke-width="${R * 1.2}" pathLength="100" stroke-dasharray="0 100" transform="rotate(${-90 + from * 3.6})"/>`;
  S.add(`<div id="clk" class="prop" style="left:${ck.x - R - 20}px;top:${ck.y - R - 20}px;width:${R * 2 + 40}px;height:${R * 2 + 40}px;z-index:7;opacity:0">
   <svg width="${R * 2 + 40}" height="${R * 2 + 40}" viewBox="${-R - 20} ${-R - 20} ${R * 2 + 40} ${R * 2 + 40}">
    <circle cx="0" cy="0" r="${R}" fill="${C.bone}" stroke="${C.ink}" stroke-width="10"/>
    ${seg("sg0", C.green, 0, 0)}${seg("sg1", C.ochre, 25, 0)}${seg("sg2", "#8a6fd1", 42, 0)}${seg("sg3", C.red, 58, 0)}${seg("sg4", "#4aa3d1", 72, 0)}
    <circle cx="0" cy="0" r="${R}" fill="none" stroke="${C.ink}" stroke-width="10"/>
    <g id="hand95"><path d="M0,0 L0,${-R * 0.8}" stroke="${C.ink}" stroke-width="14" stroke-linecap="round"/></g><circle r="18" fill="${C.ink}"/></svg></div>`);
  pop(S, "#clk", W(95, "horas") - 0.3);
  S.tw(`tl.fromTo("#hand95",{rotation:0},{rotation:720,svgOrigin:"0 0",duration:1.4,ease:"power2.inOut"},${r3(W(95, "horas"))});`);
  label(S, "q95", ck.x, ck.y - R - F(90, 80), "¿CUÁNTAS HORAS?", { size: F(76, 66), w: 1100 });
  fadeUp(S, "#q95", W(95, "cuántas"));
  const lx = F(ck.x + R + 280, ck.x), ly0 = F(ck.y - 200, ck.y + R + 110);
  const legend = (i, text, color, t) => {
    const y = h ? ly0 + i * 95 : ly0 + Math.floor(i / 2) * 90;
    const x = h ? lx : ck.x + (i % 2 ? 250 : -250);
    S.add(`<div id="lg${i}" class="prop" style="left:${x - 260}px;top:${y - 40}px;width:720px;white-space:nowrap;z-index:9;opacity:0;display:flex;align-items:center;gap:14px;font:900 ${F(54, 50)}px Inter;color:${C.bone};text-shadow:0 4px 0 ${C.ink}"><span style="width:44px;height:44px;border-radius:10px;background:${color};border:5px solid ${C.ink}"></span>${text}</div>`);
    fadeUp(S, `#lg${i}`, t, { dy: 20 });
  };
  S.tw(`tl.to("#sg0",{strokeDasharray:"25 100",duration:0.6},${r3(W(96, "horas") - 0.2)});`);
  legend(0, "BUSCAR COMIDA", C.green, W(96, "comida"));
  label(S, "dis96", ck.x, ck.y + R + F(70, 300), "DATO MUY DISCUTIDO", { size: F(56, 52), color: "#ffd38a", w: 1000 });
  fadeUp(S, "#dis96", W(96, "discutido"));
  S.tw(`tl.to("#dis96",{opacity:0,duration:0.2},${r3(L(97).start)});`);
  [["sg1", 17, "TALLAR", C.ochre, W(97, "tallar")], ["sg2", 16, "COSER", "#8a6fd1", W(97, "coser")], ["sg3", 14, "CURTIR", C.red, W(97, "curtir")], ["sg4", 14, "FUEGO", "#4aa3d1", W(97, "fuego")]].forEach(([id, len, tx, col, t], i) => {
    S.tw(`tl.to("#${id}",{strokeDasharray:"${len} 100",duration:0.4},${r3(t)});`);
    legend(i + 1, tx, col, t);
  });
  label(S, "lib97", ck.x, ck.y + R + F(70, 300), "¿TIEMPO LIBRE? NO TANTO", { size: F(58, 52), color: "#ffd38a", w: 1100 });
  fadeUp(S, "#lib97", W(97, "libre", 2));
  pose(S, T, W(97, "libre", 1), { armF: -40, foreF: -100, armB: 40, foreB: -100, mouth: "neutral", head: 6 }, 0.35);
  camTo(S, L(97).end - 0.3, spotBox(S, A, 1.15), { dur: 0.7 });

  // ===== B · Juntos (98-101) =====
  const B = A + 3200, zB = zone(S, B);
  goSpot(S, L(98).start - 0.3, B, { dur: 1.0, blur: 4 });
  walk(S, T, L(98).start - 0.3, L(98).start + 0.7, B - F(620, 280), { run: true });
  const fam = [["lia", -300], ["ama", -120], ["nima", 40], ["hunter2", 200]];
  const famA = fam.map(([k, dx], i) => {
    const a = actor(S, `b7${k}`, k, B + F(dx - 180, dx * 0.6 - 60), G, { scale: k === "nima" ? 1.35 : 1.2, z: 5 + i, flip: i % 2 === 1 });
    S.tw(`tl.fromTo("#b7${k}",{opacity:0},{opacity:1,duration:0.3},${r3(L(98).start + i * 0.1)});`);
    life(S, a, L(98).start, end, 190 + i);
    return a;
  });
  label(S, "ju98", zB.x + F(200, 0), zB.y - F(300, 300), "TIEMPO JUNTOS", { size: F(110, 92), dirt: true, w: 1400 });
  slam(S, "#ju98", W(98, "juntos"));
  // 99: juegan, cantan, bromas
  clearAt(S, "#ju98", L(99).start - 0.2);
  S.tw(`tl.to("#b7lia-body,#b7ama-body,#b7nima-body,#b7hunter2-body,#t6-body",{y:-12,duration:0.2,yoyo:true,repeat:11,stagger:0.06,ease:"sine.inOut"},${r3(W(99, "juegan"))});`);
  famA.forEach((a) => pose(S, a, W(99, "bromas"), { mouth: "smile" }, 0.2));
  pose(S, T, W(99, "bromas"), { mouth: "smile" }, 0.2);
  cardsAt(S, "c99", zB.x + F(200, 0), zB.y - F(240, 220), [["smiley", "JUEGAN", W(99, "juegan")], ["music-notes", "CANTAN", W(99, "cantan")], ["mask-happy", "BROMAS", W(99, "bromas")]], { size: F(250, 230), cols: 3 });
  iconCard(S, "bn99", zB.x + F(200, 0), zB.y + F(40, 60), 230, "bone", "SIN HUELLA");
  pop(S, "#bn99", W(99, "huella"));
  // 100: collares de conchas que vienen del mar
  clearAt(S, ids("c99", 3) + ",#bn99", L(100).start - 0.2);
  const nk = F({ x: zB.x + 200, y: zB.y - 140 }, { x: zB.x, y: zB.y - 150 });
  panel(S, "nk100", nk.x, nk.y, F(1100, 980), F(620, 600), `
    <svg width="900" height="260" viewBox="0 0 900 260">
      <path d="M40,40 C200,240 700,240 860,40" stroke="#7a5030" stroke-width="8" fill="none"/>
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => { const t = (i + 0.5) / 9, x = 40 + t * 820, y = 40 + Math.sin(t * Math.PI) * 150; return i % 2 ? `<g id="nkb${i}"><path d="M${x - 16},${y} L${x},${y + 46} L${x + 16},${y}Z" fill="#f2ead6" stroke="${C.ink}" stroke-width="4"/></g>` : `<g id="nkb${i}"><ellipse cx="${x}" cy="${y + 16}" rx="28" ry="24" fill="#f5d7c4" stroke="${C.ink}" stroke-width="4"/><path d="M${x - 16},${y + 16} L${x + 16},${y + 16} M${x},${y} L${x},${y + 36}" stroke="${C.ink}" stroke-width="3"/></g>`; }).join("")}
    </svg>
    <div style="display:flex;gap:50px;margin-top:10px;font:900 56px Inter;color:${C.ink}"><span id="nkc" style="opacity:0">CONCHAS</span><span id="nkd" style="opacity:0">DIENTES</span></div>
    <div id="nkm" style="display:flex;align-items:center;gap:16px;margin-top:16px;font:900 56px Inter;color:#2f6f9e;opacity:0">${icon("map-pin", { size: 70, color: "#2f6f9e" })}DEL MAR · CIENTOS DE KM</div>`);
  flipIn(S, "#nk100", W(100, "collares") - 0.2);
  for (let i = 0; i < 9; i++) S.tw(`tl.fromTo("#nkb${i}",{opacity:0,y:-30},{opacity:1,y:0,duration:0.25,ease:"back.out(2)"},${r3(W(100, "collares") + i * 0.08)});`);
  fadeUp(S, "#nkc", W(100, "conchas")); fadeUp(S, "#nkd", W(100, "dientes")); fadeUp(S, "#nkm", W(100, "kilómetros") - 0.4);
  // 101: no da calor ni comida, pero dice quién eres
  flipOut(S, "#nk100", L(101).start - 0.15);
  cardsAt(S, "c101", zB.x + F(200, 0), zB.y - F(260, 240), [["thermometer-hot", "CALOR", W(101, "calor"), false], ["fork-knife", "COMIDA", W(101, "comida"), false]], { size: F(250, 230), cols: 2 });
  iconCard(S, "id101", zB.x + F(200, 0), zB.y + F(60, 80), 260, "users-three", "TU GRUPO", { bg: C.ochre });
  pop(S, "#id101", W(101, "grupo") - 0.2);
  camTo(S, L(101).end - 0.3, spotBox(S, B, 1.15), { dur: 0.7 });

  // ===== C · La cueva pintada (102-111) =====
  const Cv = B + 3300, zC = zone(S, Cv);
  goSpot(S, L(102).start - 0.3, Cv, { dur: 1.0, blur: 4 });
  walk(S, T, L(102).start - 0.3, L(102).start + 0.7, Cv - F(620, 330), { run: true });
  caveMouth(S, "cv7", Cv + F(250, 80), G, F(1150, 1000), F(860, 860));
  S.add(`<div id="q102" class="prop" style="left:${Cv + F(250, 80) - 100}px;top:${G - 440}px;width:200px;height:200px;display:flex;align-items:center;justify-content:center;background:${C.ochre};border:7px solid ${C.ink};border-radius:50%;z-index:9;opacity:0">${icon("question", { size: 150, color: C.ink, weight: "bold" })}</div>`);
  pop(S, "#q102", W(102, "cuevas"));
  // 103: ¡PINTAR! la cámara entra en la cueva
  const In = Cv + 9000, zI = zone(S, In);
  S.tw(`tl.to("#q102",{scale:0,opacity:0,duration:0.2},${r3(L(103).start - 0.2)});`);
  camTo(S, L(103).start - 0.25, { x: Cv + F(250, 80) - 160, y: G - 420, w: 320, h: 200 }, { dur: 0.45, ease: "power3.in" });
  // interior: pared de roca enorme
  S.add(`<div id="wall" class="prop" style="left:${In - 2600}px;top:${G - 2400}px;width:5200px;height:2400px;z-index:1;background:radial-gradient(ellipse at 50% 60%,#6e5440 0%,#4a382b 45%,#21170f 80%);border-radius:0 0 0 0"></div>
    <div id="lit" class="prop" style="left:${In - 2600}px;top:${G - 2400}px;width:5200px;height:2400px;z-index:2;background:#000;opacity:.85"></div>
    <div class="prop" style="left:${In - 2600}px;top:${G - 40}px;width:5200px;height:600px;z-index:2;background:#2a1d14"></div>`);
  S.tw(`tl.set("#${S.id}-world",{},0);`);
  goSpot(S, L(103).start + 0.2, In, { dur: 0.01 });
  label(S, "pin103", zI.x + F(100, 0), zI.y - F(150, 150), "PINTAR", { size: F(220, 170), dirt: true, color: "#f0b070", w: 1500 });
  slam(S, "#pin103", W(103, "pintar") + 0.25);
  S.tw(`tl.to("#lit",{opacity:0.5,duration:0.4},${r3(W(103, "pintar") + 0.2)});`);
  const T2 = actor(S, "t6c", "tarko", zI.chx, G, { scale: 1.35, z: 7, props: { F: `<g id="lmp"><path d="M10,-176 L52,-176 L46,-150 L16,-150Z" fill="#8c8f96" stroke="${C.ink}" stroke-width="4"/><path d="M31,-176 C20,-196 26,-214 32,-226 C40,-210 46,-194 38,-176Z" fill="${C.fire2}" stroke="${C.ink}" stroke-width="3"/></g>` } });
  life(S, T2, L(103).start, end, 199);
  // 104: túnel estrecho: Tarko se arrastra
  clearAt(S, "#pin103", L(104).start - 0.2);
  S.add(`<svg id="tun" class="prop" style="left:${In - 900}px;top:${G - 700}px;z-index:8;opacity:0" width="1800" height="720" viewBox="0 0 1800 720">
    <path d="M0,0 L1800,0 L1800,420 C1300,380 500,440 0,420Z" fill="#2a1d14" stroke="${C.ink}" stroke-width="8"/><path d="M0,720 L1800,720 L1800,640 C1300,610 500,660 0,640Z" fill="#2a1d14" stroke="${C.ink}" stroke-width="8"/></svg>`);
  S.tw(`tl.fromTo("#tun",{opacity:0},{opacity:1,duration:0.3},${r3(L(104).start - 0.1)});tl.to("#tun",{opacity:0,duration:0.3},${r3(L(105).start - 0.1)});`);
  pose(S, T2, W(104, "arrastrarse") - 0.3, { body: 75, armF: -100, armB: -80, head: -60 }, 0.35, "power2.out");
  S.tw(`tl.to("#t6c",{x:${F(500, 250)},y:30,duration:${r3(L(104).end - W(104, "arrastrarse"))},ease:"none"},${r3(W(104, "arrastrarse"))});`);
  S.tw(`tl.to("#t6c-armF",{rotation:-60,svgOrigin:"30 -292",duration:0.25,yoyo:true,repeat:5},${r3(W(104, "arrastrarse"))});`);
  label(S, "es104", zI.x + F(250, 0), zI.y - F(330, 330), "MUY ESCONDIDAS", { size: F(76, 66), w: 1200, color: "#f0b070" });
  fadeUp(S, "#es104", W(104, "escondidas"));
  // 105: lámpara de grasa: la pared se ilumina
  clearAt(S, "#es104", L(105).start - 0.2);
  pose(S, T2, L(105).start, { body: 0, armF: -110, foreF: -20, armB: 0, head: -6 }, 0.35);
  S.tw(`tl.to("#t6c",{x:0,y:0,duration:0.4},${r3(L(105).start)});`);
  S.tw(`tl.to("#lit",{opacity:0.05,duration:1},${r3(W(105, "lámparas"))});`);
  cardsAt(S, "c105", zI.x + F(250, 0), zI.y - F(320, 330), [["fire", "LÁMPARA DE PIEDRA", W(105, "lámparas"), null, "#f2c46b"], ["drop", "GRASA", W(105, "grasa")]], { size: F(240, 230), cols: 2 });
  // 106: pintan bisontes, caballos y renos (con ocre y carbón)
  clearAt(S, ids("c105", 2), L(106).start - 0.2);
  const pal = F({ x: zI.x + 250, y: zI.y + 230 }, { x: zI.x, y: zI.y + 270 });
  S.add(`<div id="pig" class="prop" style="left:${pal.x - 300}px;top:${pal.y - 60}px;width:600px;display:flex;gap:30px;justify-content:center;z-index:9;opacity:0">
    <div style="text-align:center"><div style="width:110px;height:110px;border-radius:50%;background:#b3471f;border:6px solid ${C.ink};margin:auto"></div><div style="font:900 52px Inter;color:#f0d4b0">OCRE</div></div>
    <div style="text-align:center"><div style="width:110px;height:110px;border-radius:50%;background:#1b1512;border:6px solid ${C.ink};margin:auto"></div><div style="font:900 52px Inter;color:#f0d4b0">CARBÓN</div></div></div>`);
  fadeUp(S, "#pig", W(106, "ocre") - 0.1);
  const paint = [["bisonte", W(106, "bisontes"), "#a3401c"], ["caballo", W(106, "caballos"), "#1d1612"], ["reno", W(106, "renos"), "#8e3a1a"]];
  paint.forEach(([k, t, col], i) => {
    const x = h ? zI.x - 180 + i * 450 : zI.x - 300 + i * 300, y = h ? zI.y - 120 : zI.y - 150 + (i % 2) * 140;
    S.add(`<div id="pa${i}" class="prop" style="left:${x - 220}px;top:${y - 140}px;width:440px;height:280px;z-index:6;clip-path:inset(0 100% 0 0);opacity:.92">
      <svg viewBox="-250 -290 500 300" width="440" height="270" style="filter:url(#none)"><g fill="${col}" stroke="${col}">${paintShape(k)}</g></svg></div>`);
    S.tw(`tl.fromTo("#pa${i}",{clipPath:"inset(0 100% 0 0)"},{clipPath:"inset(0 0% 0 0)",duration:0.8,ease:"power1.inOut"},${r3(t - 0.1)});`);
  });
  pose(S, T2, W(106, "pintan"), { armF: -120, foreF: -40 }, 0.3);
  S.tw(`tl.to("#t6c-foreF",{rotation:-70,svgOrigin:"30 -228",duration:0.2,yoyo:true,repeat:9},${r3(W(106, "pintan") + 0.3)});`);
  // 107: Lascaux y Altamira
  S.tw(`tl.to("#pig",{opacity:0,duration:0.2},${r3(L(107).start - 0.2)});`);
  const nm = F({ x: zI.x + 250, y: zI.y + 230 }, { x: zI.x, y: zI.y + 270 });
  S.add(`<div id="nm107" class="prop" style="left:${nm.x - 600}px;top:${nm.y - 60}px;width:1200px;display:flex;gap:30px;justify-content:center;z-index:9">
    ${["LASCAUX", "ALTAMIRA"].map((n, i) => `<span id="nm${i}" style="opacity:0;background:${C.bone};border:5px solid ${C.ink};border-radius:18px;padding:6px 24px;font:900 ${F(60, 56)}px Inter;color:${C.ink};box-shadow:0 6px 0 ${C.ink}">${n}</span>`).join("")}</div>`);
  pop(S, "#nm0", W(107, "lascaux")); pop(S, "#nm1", W(107, "altamira"));
  counter(S, "yr107", zI.x + F(250, 0), zI.y - F(330, 340), { from: 0, to: 15000, t: W(107, "quince") - 0.3, dur: 1.0, size: F(150, 120), pre: "+", suf: "<span style='font-size:.4em'> AÑOS</span>", color: "#f0b070" });
  S.tw(`tl.fromTo("#yr107",{opacity:0},{opacity:1,duration:0.2},${r3(W(107, "quince") - 0.3)});`);
  // 108: ¿por qué lo hacían?
  clearAt(S, "#nm107,#yr107", L(108).start - 0.2);
  ["¿MAGIA?", "¿RITUALES?", "¿HISTORIAS?"].forEach((t, i) => {
    const w = ["magia", "rituales", "historias"][i];
    const x = h ? zI.x - 150 + i * 430 : zI.x, y = h ? zI.y + 260 : zI.y + 150 + i * 160;
    bubble(S, `bq${i}`, x, y, F(400, 520), 140, t, { tail: "center" });
    pop(S, `#bq${i}`, W(108, w));
  });
  // 109-111: la mano en negativo de Nima
  clearAt(S, "#bq0,#bq1,#bq2", L(109).start - 0.2);
  const Ni = actor(S, "n7c", "nima", zI.chx + F(330, 280), G, { scale: 1.35, z: 8 });
  const Am = actor(S, "a7c", "ama", zI.chx + F(560, 520), G, { scale: 1.3, z: 7, flip: true });
  S.tw(`tl.fromTo("#n7c,#a7c",{opacity:0},{opacity:1,duration:0.3},${r3(L(109).start - 0.2)});`);
  life(S, Ni, L(109).start, end, 201); life(S, Am, L(109).start, end, 202);
  pose(S, Ni, W(109, "mano"), { armF: -110, foreF: -10, head: -6 }, 0.3);
  pose(S, Am, W(109, "sopla"), { head: 10, mouth: "open" }, 0.3);
  const hp = F({ x: zI.x + 350, y: zI.y - 120 }, { x: zI.x + 120, y: zI.y - 200 });
  S.add(`<div id="spray" class="prop" style="left:${hp.x - 220}px;top:${hp.y - 220}px;width:440px;height:440px;z-index:6;opacity:0;border-radius:50%;background:radial-gradient(closest-side,rgba(179,71,31,.95),rgba(179,71,31,.6) 60%,rgba(179,71,31,0))"></div>
    <div id="hneg" class="prop" style="left:${hp.x - 130}px;top:${hp.y - 130}px;z-index:7;opacity:0">${icon("hand", { size: 260, color: "#6e5440" })}</div>`);
  S.tw(`tl.fromTo("#spray",{opacity:0,scale:0.4},{opacity:1,scale:1,duration:0.8,ease:"power2.out"},${r3(W(109, "sopla"))});tl.fromTo("#hneg",{opacity:0},{opacity:1,duration:0.3},${r3(W(109, "sopla") + 0.2)});`);
  counter(S, "yr110", zI.x + F(250, 0), zI.y - F(380, 420), { from: 0, to: 15000, t: W(110, "miles") - 0.4, dur: 1.4, size: F(120, 100), suf: "<span style='font-size:.45em'> AÑOS</span>", color: "#f0b070" });
  S.tw(`tl.fromTo("#yr110",{opacity:0},{opacity:1,duration:0.2},${r3(W(110, "mano") - 0.2)});`);
  S.tw(`tl.to("#n7c,#a7c,#t6c",{opacity:0.15,duration:0.8},${r3(W(110, "miles") - 0.2)});tl.to("#n7c,#a7c,#t6c",{opacity:1,duration:0.4},${r3(L(111).start)});`);
  // manos pequeñas de niños
  S.tw(`tl.to("#yr110",{opacity:0,duration:0.2},${r3(L(111).start - 0.1)});`);
  S.add(`<div id="hkid" class="prop" style="left:${hp.x + 160}px;top:${hp.y + 10}px;z-index:7;opacity:0">${icon("hand", { size: 150, color: "#b3471f" })}</div>`);
  pop(S, "#hkid", W(111, "niños"));
  label(S, "kid111", hp.x + 60, hp.y + F(230, 230), "TAMBIÉN DE NIÑOS", { size: F(64, 58), w: 1000, color: "#f0d4b0" });
  fadeUp(S, "#kid111", W(111, "niños"));
  pose(S, Ni, W(111, "nima"), { mouth: "smile", armF: -150 }, 0.3);
  camTo(S, L(111).end - 0.3, spotBox(S, In, 1.15), { dur: 0.7 });

  // ===== D · Historias, música y otros grupos (112-115) =====
  const D = In + 4600, zD = zone(S, D);
  goSpot(S, L(112).start - 0.3, D, { dur: 1.0, blur: 4 });
  const fx = D + F(-60, 200);
  fire(S, "fu7", fx, G + 10, 1.1);
  const A2 = actor(S, "a8", "ama", D - F(450, 250), G, { scale: 1.3, z: 7 });
  const N3 = actor(S, "n8", "nima", D + F(260, 480), G, { scale: 1.35, z: 7, flip: true });
  life(S, A2, 0, end, 211); life(S, N3, 0, end, 212);
  S.tw(`tl.to("#a8-mouth .m-open",{opacity:1,duration:0.08,yoyo:true,repeat:21},${r3(W(112, "historias"))});`);
  pose(S, A2, W(112, "historias"), { armF: -80, foreF: -40, armB: 40 }, 0.35);
  // sombras de animales que bailan (historias)
  for (let i = 0; i < 3; i++) {
    const an = animal(S, `sh${i}`, ["reno", "mamut", "caballo"][i], zD.x + F(-100 + i * 380, -280 + i * 280), zD.y - F(160, 220) + (i % 2) * 60, { s: 0.75, z: 4 });
    S.tw(`tl.set("#sh${i}",{opacity:0,filter:"brightness(0)"},0);tl.to("#sh${i}",{opacity:0.75,duration:0.4},${r3(W(112, "historias") + i * 0.3)});`);
    animalWalk(S, an, W(112, "historias") + i * 0.3, L(113).start, an.x + 200);
  }
  label(S, "mem112", zD.x + F(150, 0), zD.y + F(140, 140), "LA MEMORIA VIVE EN SU VOZ", { size: F(62, 54), w: 1300, color: "#ffd9a0" });
  fadeUp(S, "#mem112", W(112, "memoria"));
  // 113: de abuelos a nietos
  clearAt(S, "#sh0,#sh1,#sh2,#mem112", L(113).start - 0.2);
  arrow(S, "ar113", A2.x + 60, G - 760, N3.x - 40, G - 660, W(113, "nietos") - 0.2, { dur: 0.5, bend: -0.3 });
  cardsAt(S, "c113", zD.x + F(150, 0), zD.y - F(220, 230), [["plant", "PLANTAS QUE CURAN", W(113, "curan")], ["drop", "AGUA", W(113, "agua")], ["paw-print", "RENOS", W(113, "renos")]], { size: F(240, 220), cols: h ? 3 : 1, gap: 24 });
  // 114: flautas de hueso
  clearAt(S, ids("c113", 3) + ",#ar113", L(114).start - 0.2);
  const fl = F({ x: zD.x + 150, y: zD.y - 150 }, { x: zD.x, y: zD.y - 150 });
  panel(S, "fl114", fl.x, fl.y, F(1000, 940), F(460, 460), `
    <svg width="760" height="140" viewBox="0 0 760 140"><path d="M20,70 C20,40 60,40 80,50 L700,50 C730,40 750,60 740,80 C730,100 700,96 700,90 L80,90 C60,100 20,100 20,70Z" fill="#efe6d2" stroke="${C.ink}" stroke-width="6"/>${[0, 1, 2, 3, 4].map((i) => `<circle cx="${260 + i * 80}" cy="70" r="12" fill="${C.ink}"/>`).join("")}</svg>
    <div class="lbl" style="margin-top:10px">FLAUTA DE HUESO</div>`);
  flipIn(S, "#fl114", W(114, "flautas") - 0.2);
  for (let i = 0; i < 4; i++) {
    S.add(`<div id="nt${i}" class="prop" style="left:${fl.x - 200 + i * 130}px;top:${fl.y - 330}px;z-index:9;opacity:0">${icon("music-note", { size: 90, color: "#ffd9a0" })}</div>`);
    S.tw(`tl.fromTo("#nt${i}",{opacity:0,y:40},{opacity:1,y:-60,duration:0.9,ease:"sine.out",repeat:1},${r3(W(114, "música") + i * 0.25)});`);
  }
  counter(S, "yr114", fl.x, fl.y + F(330, 330), { from: 0, to: 35000, t: W(114, "treinta") - 0.4, dur: 1.0, size: F(110, 96), pre: "+", suf: "<span style='font-size:.45em'> AÑOS</span>", color: "#ffd9a0" });
  S.tw(`tl.fromTo("#yr114",{opacity:0},{opacity:1,duration:0.2},${r3(W(114, "treinta") - 0.4)});`);
  // 115: reuniones con otros grupos
  clearAt(S, "#fl114,#yr114", L(115).start - 0.2);
  const gp = F({ x: zD.x + 150, y: zD.y - 200 }, { x: zD.x, y: zD.y - 220 });
  S.add(`<div id="gA" class="prop" style="left:${gp.x - 420}px;top:${gp.y - 80}px;z-index:9;opacity:0">${icon("users-three", { size: 170, color: C.ochre })}</div><div id="gB" class="prop" style="left:${gp.x + 250}px;top:${gp.y - 80}px;z-index:9;opacity:0">${icon("users-three", { size: 170, color: "#8ad1a0" })}</div>`);
  S.tw(`tl.fromTo("#gA",{opacity:0,x:-200},{opacity:1,x:0,duration:0.6,ease:"power3.out"},${r3(W(115, "grupos") - 0.3)});tl.fromTo("#gB",{opacity:0,x:200},{opacity:1,x:0,duration:0.6,ease:"power3.out"},${r3(W(115, "grupos") - 0.3)});`);
  cardsAt(S, "c115", gp.x, gp.y + F(280, 320), [["handshake", "INTERCAMBIAR", W(115, "intercambiar")], ["chat-circle-text", "NOTICIAS", W(115, "noticias")], ["heart", "PAREJA", W(115, "pareja")]], { size: F(230, 220), cols: h ? 3 : 2, gap: 24 });
  label(S, "pr115", gp.x, gp.y - F(170, 170), "PROBABLEMENTE", { size: 56, w: 900, color: "#ffd9a0" });
  fadeUp(S, "#pr115", W(115, "probablemente"));
  camTo(S, L(115).end - 0.3, spotBox(S, D, 1.15), { dur: 0.7 });

  // ===== E · El mes se acaba: a otro valle (116-120) =====
  const E = D + 3200, zE = zone(S, E);
  goSpot(S, L(116).start - 0.3, E, { dur: 1.0, blur: 4 });
  moonBadge(S, "m5", F(E + 230, E), F(G - 760, G - 1150), 0, "FIN DEL MES", W(116, "mes"));
  S.tw(`tl.to("#m5",{y:-60,scale:0.7,opacity:0,duration:0.35},${r3(L(117).start - 0.2)});`);
  // 117: los renos se alejan
  for (let i = 0; i < 4; i++) {
    const an = animal(S, `rr${i}`, "reno", E + F(200, 0) + i * 200, G - 20 - (i % 2) * 30, { s: 0.75, z: 3 });
    animalWalk(S, an, W(117, "renos") - 0.2, L(118).start + 0.5, E + F(2600, 2200) + i * 200);
  }
  // 118: todos caminan hacia otro valle
  const walkers = [["tarko", 0], ["lia", -260], ["nima", -470], ["ama", -700], ["gris", -950]];
  const wk = walkers.map(([k, dx], i) => {
    const a = actor(S, `w9${k}`, k, E - F(600, 300) + dx, G, { scale: k === "gris" ? 1.3 : k === "nima" ? 1.35 : 1.25, z: 6 + i, props: k === "tarko" ? { F: prop("spear", "spr9") } : {} });
    life(S, a, 0, end, 220 + i);
    return a;
  });
  S.add(`<div id="pk" class="prop" style="left:${wk[0].x - 130}px;top:${G - 560}px;width:150px;height:200px;background:#8a5a35;border:6px solid ${C.ink};border-radius:40px;z-index:5"></div>`);
  wk.forEach((a, i) => walk(S, a, W(118, "caminan") - 0.6 + i * 0.05, L(119).end, a.x + 1300));
  S.tw(`tl.to("#pk",{x:1300,duration:${r3(L(119).end - W(118, "caminan") + 0.6)},ease:"none"},${r3(W(118, "caminan") - 0.6)});`);
  camTo(S, W(118, "caminan") - 0.6, spotBox(S, E + 1300 + F(200, 0)), { dur: r3(L(118).end - W(118, "caminan") + 0.8), ease: "power1.inOut" });
  label(S, "val118", E + 1300 + F(230, 0), zE.y - F(330, 300), "HACIA OTRO VALLE", { size: F(90, 76), dirt: true, w: 1400 });
  fadeUp(S, "#val118", W(118, "valle"));
  // 119: lo imprescindible (inventario tipo app)
  S.tw(`tl.to("#val118",{opacity:0,duration:0.2},${r3(L(119).start - 0.1)});`);
  const zE2 = zone(S, E + 1300 + F(200, 0)), ivX = zE2.x + F(150, 0);
  phone(S, "inv119", ivX, zE2.y - F(120, 150), F(560, 520), F(760, 680), `
    <div style="padding:22px;font:900 48px Inter;color:${C.ink};border-bottom:4px solid #ddd;background:#fff">${icon("backpack", { size: 54, color: C.ochreD })} MOCHILA</div>
    ${[["t-shirt", "PIELES", "herramientas"], ["axe", "HERRAMIENTAS", "brasas"], ["fire", "BRASAS", "carne"], ["fork-knife", "CARNE SECA", "seca"]].map(([ic, lb], i) => `<div id="iv${i}" style="display:flex;align-items:center;gap:16px;padding:16px 24px;font:900 46px Inter;color:${C.ink};border-bottom:3px solid #eee;opacity:0">${icon(ic, { size: 56, color: C.ochreD })}${lb}${icon("check-fat", { size: 44, color: C.green })}</div>`).join("")}`);
  S.tw(`tl.fromTo("#inv119",{opacity:0,y:60},{opacity:1,y:0,duration:0.4,ease:"back.out(1.6)"},${r3(L(119).start - 0.1)});`);
  [W(119, "pieles"), W(119, "herramientas"), W(119, "brasas"), W(119, "carne")].forEach((t, i) => S.tw(`tl.fromTo("#iv${i}",{opacity:0,x:-40},{opacity:1,x:0,duration:0.25},${r3(t)});`));
  // 120: se mueven a lo largo del año
  S.tw(`tl.to("#inv119",{opacity:0,scale:0.7,duration:0.25},${r3(L(120).start - 0.2)});`);
  const mp = { x: ivX, y: zE2.y - F(120, 150) };
  panel(S, "yr120", mp.x, mp.y, F(900, 900), F(640, 640), `
    <svg width="760" height="460" viewBox="0 0 760 460">
      <path id="loop120" d="M380,60 C620,60 700,230 600,330 C500,430 260,430 160,330 C60,230 140,60 380,60Z" fill="none" stroke="${C.ochre}" stroke-width="16" stroke-dasharray="1" stroke-dashoffset="1" pathLength="1" stroke-linecap="round"/>
      ${[["snowflake", 380, 40], ["flower", 650, 260], ["sun", 380, 420], ["leaf", 110, 260]].map(([ic, x, y], i) => `<g id="se${i}" opacity="0" transform="translate(${x - 45},${y - 45})">${icon(ic, { size: 90, color: [C.ink, C.green, C.ochreD, C.redD][i] }).replace("<svg", "<svg x='0' y='0'")}</g>`).join("")}
    </svg><div class="lbl" style="font-size:58px">TODO EL AÑO</div>`);
  flipIn(S, "#yr120", L(120).start);
  S.tw(`tl.to("#loop120",{strokeDashoffset:0,duration:1.6,ease:"power1.inOut"},${r3(W(120, "año"))});`);
  [0, 1, 2, 3].forEach((i) => S.tw(`tl.to("#se${i}",{opacity:1,duration:0.2},${r3(W(120, "estaciones") - 0.6 + i * 0.25)});`));
  camTo(S, L(120).end + 0.05, { x: A - 1200, y: G - 2200, w: E + 2600 - A + 2400, h: 2400 }, { dur: 0.75, ease: "power2.inOut" });
  exit(S, { dur: 0.4 });
}

// Siluetas planas para las pinturas rupestres
function paintShape(k) {
  if (k === "bisonte") return `<path d="M-200,-60 C-210,-150 -100,-180 -20,-170 C20,-250 130,-240 150,-170 C180,-150 190,-100 170,-70 L150,-10 L120,-10 L110,-60 L-120,-60 L-140,-10 L-170,-10 L-170,-60Z"/><path d="M150,-190 C170,-210 190,-200 196,-186" stroke-width="10" fill="none"/>`;
  if (k === "caballo") return `<path d="M-190,-90 C-190,-150 80,-160 110,-120 C130,-170 170,-200 200,-190 C220,-170 210,-140 180,-130 L150,-110 C140,-90 120,-80 100,-80 L90,-10 L70,-10 L60,-80 L-120,-80 L-140,-10 L-160,-10 L-160,-80Z"/><path d="M-190,-110 C-230,-100 -240,-60 -230,-30" stroke-width="14" fill="none"/>`;
  return `<path d="M-170,-90 C-170,-140 80,-146 100,-110 C110,-150 140,-170 170,-160 C190,-150 190,-120 170,-110 L140,-100 L110,-80 L100,-10 L80,-10 L70,-80 L-110,-80 L-130,-10 L-150,-10 L-150,-80Z"/><path d="M150,-160 C140,-210 110,-220 100,-250 M150,-160 C170,-210 200,-220 190,-260" stroke-width="10" fill="none"/>`;
}

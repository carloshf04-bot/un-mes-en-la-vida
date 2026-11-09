// 7 · BALANCE Y CLÍMAX (frases 121-130) y 8 · LLAMADA A LA ACCIÓN (131-134)
import { C, r3, icon, camTo, shake, actor, life, walk, pose, burst, prop } from "./lib.mjs";
import { G, sky, parallax, ground, snow, enter, exit } from "./fondos.mjs";
import { spotBox, zone, goSpot, grid, iconCard, panel, pop, drop, fadeUp, flipIn, flipOut, wobble, pulse, mark, label, slam, counter, bar, fire, bubble, arrow, cardsAt, clearAt, ids, phone, typeOn } from "./lib2.mjs";

export function balance(S) {
  const { F, h } = S.fmt;
  const L = (i) => S.line(i), W = (l, w, n) => S.W(l, w, n);
  const end = S.t1 - S.t0;
  sky(S, { top: "#0d1529", mid: "#26345a", low: "#6a4a50", glow: "#d48a4a" });
  parallax(S); ground(S); snow(S, { n: 25 });

  // ===== A · La gran balanza (121-125) =====
  const A = 3000;
  enter(S, spotBox(S, A, F(1.05, 1)));
  const T = actor(S, "t9", "tarko", A - F(820, 400), G, { scale: 1.35, z: 6 });
  life(S, T, 0, end, 231);
  label(S, "q121", A + F(150, 0), G - F(930, 1260), "¿BUENA O MALA?", { size: F(110, 90), dirt: true, w: 1500 });
  slam(S, "#q121", W(121, "buena"));
  S.tw(`tl.to("#q121",{opacity:0,y:-40,duration:0.3},${r3(L(122).start - 0.2)});`);
  const bx = A + F(250, 60), by = G - F(640, 860), bw = F(1200, 900);
  S.add(`<div id="bb" class="prop" style="left:${bx - bw / 2}px;top:${by}px;width:${bw}px;height:700px;z-index:7;opacity:0">
    <div style="position:absolute;left:${bw / 2 - 22}px;top:30px;width:44px;height:${F(560, 760)}px;background:${C.rock};border:6px solid ${C.ink};border-radius:12px"></div>
    <div id="bbeam" style="position:absolute;left:0;top:10px;width:${bw}px;height:40px;background:${C.bone2};border:6px solid ${C.ink};border-radius:20px">
      <div id="bpR" style="position:absolute;left:-40px;top:50px;width:${F(440, 340)}px;min-height:120px;padding:14px;background:rgba(229,72,77,.25);border:6px solid ${C.ink};border-top:none;border-radius:0 0 50px 50px;display:flex;flex-direction:column-reverse;gap:8px"></div>
      <div id="bpG" style="position:absolute;right:-40px;top:50px;width:${F(440, 340)}px;min-height:120px;padding:14px;background:rgba(79,191,106,.25);border:6px solid ${C.ink};border-top:none;border-radius:0 0 50px 50px;display:flex;flex-direction:column-reverse;gap:8px"></div>
    </div></div>`);
  S.tw(`tl.fromTo("#bb",{opacity:0,scale:0.6},{opacity:1,scale:1,duration:0.5,ease:"back.out(1.6)"},${r3(W(121, "vida") - 0.2)});`);
  // fichas que caen dentro de cada platillo (van con él cuando se inclina)
  const bad = [["FRÍO", "frío"], ["HAMBRE", "hambre"], ["ENFERMEDAD", "enfermedades"], ["DEPREDADORES", "depredadores"], ["NIÑOS", "niños"]];
  const good = [["EJERCICIO", "ejercicio"], ["DIETA VARIADA", "dieta"], ["MUNDO SALVAJE", "salvaje"], ["UN GRUPO", "grupo"]];
  const chip = (id, text, color) => `<div id="${id}" style="height:64px;opacity:0;background:${color};border:5px solid ${C.ink};border-radius:16px;font:900 ${F(46, 40)}px Inter;color:#fff;display:flex;align-items:center;justify-content:center;white-space:nowrap;text-shadow:0 3px 0 ${C.ink}">${text}</div>`;
    S.html = S.html.map((x) => x.includes('id="bpR"') ? x.replace('<div id="bpR"', '<div id="bpR"').replace(/(<div id="bpR"[^>]*>)/, `$1${bad.map(([t], i) => chip(`cr${i}`, t, C.red)).join("")}`).replace(/(<div id="bpG"[^>]*>)/, `$1${good.map(([t], i) => chip(`cg${i}`, t, C.green)).join("")}`) : x);
  bad.forEach(([, w], i) => drop(S, `#cr${i}`, W(122, w), -260));
  good.forEach(([, w], i) => drop(S, `#cg${i}`, W(123, w), -260));
  const tilt = (t, deg) => S.tw(`tl.to("#bbeam",{rotation:${deg},duration:0.5,ease:"elastic.out(1,0.6)"},${r3(t)});`);
  bad.forEach(([, w], i) => tilt(W(122, w), -3 * (i + 1)));
  good.forEach(([, w], i) => tilt(W(123, w), -15 + 3.5 * (i + 1)));
  pose(S, T, W(122, "frío"), { mouth: "sad", brows: 4 }, 0.3);
  pose(S, T, W(123, "bueno"), { mouth: "smile", brows: -3 }, 0.3);
  // 124: enfermedades que aún no existían
  clearAt(S, "#bb", L(124).start - 0.2);
  cardsAt(S, "c124", A + F(150, 0), G - F(560, 900), [["city", "CIUDADES", W(124, "ciudades"), false], ["cow", "GANADO", W(124, "ganado"), false], ["virus", "AÚN NO", W(124, "existían"), null, "#d8dde8"]], { size: F(270, 250), cols: 3 });
  // 125: más altos y fuertes que los primeros agricultores
  clearAt(S, ids("c124", 3, true), L(125).start - 0.2);
  const hz = A + F(250, 60);
  const P1 = actor(S, "hh", "hunter2", hz - F(220, 200), G, { scale: 1.35, z: 7 });
  const P2 = actor(S, "fa", "lia", hz + F(220, 200), G, { scale: 1.15, z: 7 });
  S.tw(`tl.fromTo("#hh,#fa",{opacity:0},{opacity:1,duration:0.3},${r3(W(125, "altos") - 0.3)});`);
  life(S, P1, L(125).start, end, 232); life(S, P2, L(125).start, end, 233);
  label(S, "lb125a", hz - F(220, 200), G - 760, "CAZADOR", { size: 62, w: 600 });
  label(S, "lb125b", hz + F(220, 200), G - 650, "AGRICULTOR", { size: 62, w: 600 });
  fadeUp(S, "#lb125a", W(125, "altos")); fadeUp(S, "#lb125b", W(125, "agricultores"));
  S.add(`<div id="rul" class="prop" style="left:${hz - 30}px;top:${G - 680}px;width:60px;height:680px;z-index:6;opacity:0;background:repeating-linear-gradient(0deg,${C.bone} 0 30px,${C.ochre} 30px 60px);border:5px solid ${C.ink};border-radius:10px"></div>`);
  fadeUp(S, "#rul", W(125, "altos") - 0.1);
  pose(S, P1, W(125, "fuertes"), { armF: -150, armB: 150, mouth: "smile" }, 0.3);
  camTo(S, L(125).end - 0.3, spotBox(S, A, 1.15), { dur: 0.7 });

  // ===== B · El dato más fuerte (126-130) =====
  const B = A + 3200, zB = zone(S, B);
  goSpot(S, L(126).start - 0.3, B, { dur: 1.0, blur: 4 });
  walk(S, T, L(126).start - 0.3, L(126).start + 0.7, B - F(250, 0), { run: true });
  S.add(`<div id="dim126" class="prop" style="left:${B - 3000}px;top:${G - 3000}px;width:6000px;height:4400px;background:rgba(2,3,8,.7);z-index:5;opacity:0"></div>`);
  S.tw(`tl.to("#dim126",{opacity:1,duration:0.8},${r3(L(126).start)});`);
  camTo(S, L(126).start + 0.5, h ? { x: B - 900, y: G - 900, w: 1300, h: 920 } : { x: B - 520, y: G - 1200, w: 1040, h: 1240 }, { dur: 2.0, ease: "sine.inOut" });
  label(S, "df126", B + F(330, 0), G - F(700, 1060), "EL DATO MÁS FUERTE", { size: F(80, 70), w: 1100, color: C.fire2 });
  fadeUp(S, "#df126", W(126, "fuerte"));
  // 127: tu cuerpo = el de Tarko (silueta moderna que encaja)
  S.tw(`tl.to("#df126",{opacity:0,duration:0.3},${r3(L(127).start - 0.1)});`);
  const M = actor(S, "mo", "moderno", T.x, G, { scale: 1.35, z: 7 });
  S.tw(`tl.set("#mo",{opacity:0},0);tl.fromTo("#mo",{x:${F(600, 400)},opacity:0},{x:0,opacity:0.55,duration:0.8,ease:"power3.out"},${r3(W(127, "cuerpo") - 0.4)});`);
  life(S, M, L(127).start, end, 234);
  iconCard(S, "br127", B + F(330, 0), G - F(560, 1000), F(260, 240), "brain", "MISMO CEREBRO", { bg: C.ochre });
  pop(S, "#br127", W(127, "cerebro"));
  label(S, "eq127", B + F(330, 0), G - F(300, 760), "=", { size: 200, w: 300 });
  slam(S, "#eq127", W(127, "mismos"));
  shake(S, W(127, "mismos") + 0.1, 20, 0.45);
  burst(S, "bur127", T.x, G - 400, W(127, "mismos") + 0.1, { n: 24, color: C.fire2, spread: 500, up: 300, size: 16, seed: 127 });
  // 128: no era primitivo; Tarko se transforma en un chico de hoy con móvil
  clearAt(S, "#br127,#eq127", L(128).start - 0.2);
  S.tw(`tl.to("#mo",{opacity:1,duration:0.4},${r3(W(128, "tú") - 0.2)});tl.to("#t9",{opacity:0,duration:0.4},${r3(W(128, "tú") - 0.2)});`);
  S.add(`<div id="ph128" class="prop" style="left:${T.x + 30}px;top:${G - 560}px;width:70px;height:120px;background:#1d1d22;border:5px solid ${C.ink};border-radius:14px;z-index:9;opacity:0;box-shadow:0 0 40px rgba(120,180,255,.8)"></div>`);
  pose(S, M, W(128, "herramientas") - 0.2, { armF: -70, foreF: -60, head: 10, look: 3 }, 0.3);
  S.tw(`tl.to("#ph128",{opacity:1,duration:0.2},${r3(W(128, "herramientas"))});`);
  iconCard(S, "pr128", B + F(330, 0), G - F(560, 1000), F(260, 240), "skull", "PRIMITIVO", {});
  pop(S, "#pr128", W(128, "primitivo") - 0.1);
  mark(S, "pr128m", B + F(330, 0), G - F(560, 1000), 200, W(128, "primitivo") + 0.2, false);
  label(S, "tu128", B + F(330, 0), G - F(300, 760), "COMO TÚ", { size: F(110, 96), dirt: true, w: 1000 });
  slam(S, "#tu128", W(128, "tú"));
  // 129: un fuego y un grupo / un móvil y... ¿un grupo?
  clearAt(S, "#pr128,#pr128m,#tu128", L(129).start - 0.2);
  S.tw(`tl.to("#dim126",{opacity:0.3,duration:0.6},${r3(L(129).start)});`);
  goSpot(S, L(129).start - 0.1, B, { dur: 0.8 });
  const f1 = F({ x: B + 120, y: G - 560 }, { x: B - 220, y: G - 1000 }), f2 = F({ x: B + 620, y: G - 560 }, { x: B + 220, y: G - 1000 });
  cardsAt(S, "c129a", f1.x, f1.y, [["campfire", "FUEGO", W(129, "fuego")], ["users-three", "GRUPO", W(129, "grupo", 1)]], { size: F(230, 200), cols: 1, gap: 20 });
  cardsAt(S, "c129b", f2.x, f2.y, [["device-mobile", "MÓVIL", W(129, "móvil")], ["users-three", "¿GRUPO?", W(129, "grupo", 2), null, C.ochre]], { size: F(230, 200), cols: 1, gap: 20 });
  // 130: alrededor de una luz: el fuego se convierte en pantalla
  clearAt(S, ids("c129a", 2) + "," + ids("c129b", 2), L(130).start - 0.2);
  const lx = B + F(330, 0);
  fire(S, "fu9", lx, G + 10, 1.2);
  S.tw(`tl.fromTo("#fu9",{opacity:0,scale:0.4},{opacity:1,scale:1,transformOrigin:"50% 100%",duration:0.5},${r3(W(130, "luz") - 0.3)});`);
  S.add(`<div id="scr130" class="prop" style="left:${lx - 150}px;top:${G - 420}px;width:300px;height:420px;z-index:6;opacity:0;background:#1d1d22;border:8px solid ${C.ink};border-radius:36px;box-shadow:0 0 120px 30px rgba(120,180,255,.55)"><div style="position:absolute;inset:14px;border-radius:24px;background:linear-gradient(160deg,#7fb2ff,#c7e0ff)"></div></div>`);
  const tP = W(130, "pantalla");
  S.tw(`tl.to("#fu9",{scale:0,opacity:0,duration:0.4,ease:"power2.in"},${r3(tP - 0.3)});tl.fromTo("#scr130",{scale:0,opacity:0},{scale:1,opacity:1,transformOrigin:"50% 100%",duration:0.5,ease:"back.out(1.6)"},${r3(tP - 0.1)});`);
  label(S, "his130", lx, G - F(700, 760), "PARA CONTARNOS HISTORIAS", { size: F(70, 60), w: 1400, color: "#ffd9a0" });
  fadeUp(S, "#his130", W(130, "historias"));
  camTo(S, L(130).end + 0.05, { x: A - 1200, y: G - 2000, w: B - A + 2600, h: 2200 }, { dur: 0.75, ease: "power2.inOut" });
  exit(S, { dur: 0.4 });
}

export function cierre(S) {
  const { F, h } = S.fmt;
  const L = (i) => S.line(i), W = (l, w, n) => S.W(l, w, n);
  const end = S.t1 - S.t0;
  sky(S, { top: "#0d1529", mid: "#26345a", low: "#6a4a50", glow: "#d48a4a" });
  parallax(S); ground(S); snow(S, { n: 25 });
  const A = 3000, z = zone(S, A);
  enter(S, spotBox(S, A));
  const T = actor(S, "tz", "tarko", z.chx, G, { scale: 1.35, z: 6 });
  const N = actor(S, "nz", "nima", z.chx + F(260, 250), G, { scale: 1.35, z: 7 });
  const Gr = actor(S, "gz", "gris", z.chx + F(520, 480), G, { scale: 1.3, z: 8, flip: true });
  life(S, T, 0, end, 241); life(S, N, 0, end, 242); life(S, Gr, 0, end, 243);
  fire(S, "fuz", z.chx + F(-330, -180), G + 10, 0.9);
  // 131: suscríbete y me gusta (botones con cursor)
  const bxy = F({ x: z.x + 120, y: z.y - 160 }, { x: z.x, y: z.y - 160 });
  S.add(`<div id="sub" class="prop" style="left:${bxy.x - 330}px;top:${bxy.y - 75}px;width:660px;height:150px;z-index:9;opacity:0;background:#d93a3a;border:7px solid ${C.ink};border-radius:80px;box-shadow:0 10px 0 ${C.ink};display:flex;align-items:center;justify-content:center;gap:20px;font:900 70px Inter;color:#fff">${icon("bell-ringing", { size: 80, color: "#fff" })}<span id="subt">SUSCRIBIRSE</span></div>
    <div id="like" class="prop" style="left:${bxy.x - 110}px;top:${bxy.y + 120}px;width:220px;height:200px;z-index:9;opacity:0;background:${C.bone};border:7px solid ${C.ink};border-radius:40px;box-shadow:0 10px 0 ${C.ink};display:flex;align-items:center;justify-content:center"><div id="likeI">${icon("thumbs-up", { size: 130, color: "#9aa3ad" })}</div></div>
    <div id="cur" class="prop" style="left:${bxy.x + 360}px;top:${bxy.y + 200}px;z-index:12;opacity:0">${icon("cursor", { size: 110, color: "#fff" })}</div>`);
  pop(S, "#sub", W(131, "suscríbete") - 0.3);
  S.tw(`tl.fromTo("#cur",{opacity:0,x:200,y:120},{opacity:1,x:0,y:0,duration:0.5,ease:"power2.out"},${r3(W(131, "suscríbete") - 0.2)});`);
  S.tw(`tl.to("#cur",{x:-200,y:-150,duration:0.35,ease:"power2.inOut"},${r3(W(131, "suscríbete") + 0.2)});tl.to("#cur",{scale:0.85,duration:0.08,yoyo:true,repeat:1},${r3(W(131, "suscríbete") + 0.55)});`);
  S.tw(`tl.to("#sub",{backgroundColor:"#7a7f88",scale:0.95,duration:0.15},${r3(W(131, "suscríbete") + 0.6)});tl.to("#sub",{scale:1,duration:0.15},${r3(W(131, "suscríbete") + 0.75)});`);
  pop(S, "#like", W(131, "gusta") - 0.4);
  S.tw(`tl.to("#cur",{x:-470,y:90,duration:0.35,ease:"power2.inOut"},${r3(W(131, "gusta") - 0.3)});tl.to("#cur",{scale:0.85,duration:0.08,yoyo:true,repeat:1},${r3(W(131, "gusta"))});`);
  S.tw(`tl.to("#likeI path",{fill:"${C.ochre}",duration:0.15},${r3(W(131, "gusta") + 0.05)});`);
  pulse(S, "#like", W(131, "gusta") + 0.05, 1.25);
  burst(S, "lk", bxy.x, bxy.y + 220, W(131, "gusta") + 0.05, { n: 14, color: C.ochre, spread: 220, up: 200, size: 14, seed: 131 });
  pose(S, T, W(131, "suscríbete"), { armF: -150, foreF: -20, mouth: "smile" }, 0.3);
  // 132: comentario «cavernícola» que se escribe solo
  clearAt(S, "#sub,#like,#cur", L(132).start - 0.2);
  phone(S, "cm132", bxy.x, bxy.y + 40, F(900, 900), F(620, 620), `
    <div style="padding:22px 28px;font:900 50px Inter;color:${C.ink};border-bottom:4px solid #ddd;background:#fff;display:flex;align-items:center;gap:14px">${icon("chat-circle-text", { size: 60, color: C.ochreD })}COMENTARIOS</div>
    <div style="margin:30px 28px;padding:20px 26px;border:5px solid ${C.ink};border-radius:24px;background:#fff;font:900 64px Inter;color:${C.ink};min-height:110px"><span id="typed"></span><span id="caret" style="color:${C.ochre}">|</span></div>
    <div style="margin:0 28px;font:900 46px Inter;color:#555">¿QUÉ SEMANA TE COSTARÍA MÁS?</div>
    <div style="display:flex;gap:16px;margin:20px 28px">${[1, 2, 3, 4].map((i) => `<span id="wk${i}" style="padding:8px 22px;border:5px solid ${C.ink};border-radius:30px;font:900 48px Inter;background:${C.bone};color:${C.ink};opacity:0">S${i}</span>`).join("")}</div>`);
  S.tw(`tl.fromTo("#cm132",{opacity:0,y:60},{opacity:1,y:0,duration:0.4,ease:"back.out(1.6)"},${r3(L(132).start - 0.1)});`);
  typeOn(S, "typed", "cavernícola", W(132, "cavernícola") - 0.2, 0.8);
  S.tw(`tl.fromTo("#caret",{opacity:1},{opacity:0,duration:0.25,yoyo:true,repeat:${Math.max(1, Math.floor((L(132).end - L(132).start) / 0.25))},ease:"steps(1)"},${r3(L(132).start)});`);
  [1, 2, 3, 4].forEach((i) => pop(S, `#wk${i}`, W(132, "semana") + i * 0.12));
  // 133: mándaselo a ese amigo (notificación)
  S.tw(`tl.to("#cm132",{opacity:0,scale:0.8,duration:0.25},${r3(L(133).start - 0.2)});`);
  S.add(`<div id="nt133" class="prop" style="left:${bxy.x - 450}px;top:${bxy.y - 80}px;width:900px;height:180px;z-index:10;opacity:0;background:#fff;border:6px solid ${C.ink};border-radius:36px;box-shadow:0 12px 0 ${C.ink};display:flex;align-items:center;gap:26px;padding:0 34px;font:900 58px Inter;color:${C.ink}">${icon("paper-plane-tilt", { size: 100, color: C.ochreD })}<span>ENVIADO A TU AMIGO</span></div>
    <div id="wf133" class="prop" style="left:${bxy.x - 110}px;top:${bxy.y + 160}px;width:220px;height:220px;z-index:10;opacity:0;background:#f8ddd6;border:6px solid ${C.ink};border-radius:40px;display:flex;align-items:center;justify-content:center">${icon("wifi-slash", { size: 140, color: C.redD })}</div>`);
  drop(S, "#nt133", W(133, "mándaselo"), -260);
  pop(S, "#wf133", W(133, "wifi"));
  wobble(S, "#wf133", W(133, "wifi") + 0.4, 4, 8);
  pose(S, N, W(133, "amigo"), { mouth: "smile", armF: -120 }, 0.3);
  // 134: adiós y la cámara enseña todo el mundo
  clearAt(S, "#nt133,#wf133", L(134).start - 0.2);
  [T, N].forEach((a) => {
    pose(S, a, W(134, "vemos") - 0.2, { armF: -150, foreF: -30, mouth: "smile" }, 0.3);
    S.tw(`tl.to("#${a.id}-foreF",{rotation:-60,svgOrigin:"30 -228",duration:0.16,yoyo:true,repeat:7,ease:"sine.inOut"},${r3(W(134, "vemos") + 0.1)});`);
  });
  S.tw(`tl.to("#gz-tail",{rotation:20,svgOrigin:"-92 -104",duration:0.12,yoyo:true,repeat:11},${r3(W(134, "vemos"))});`);
  label(S, "fin", z.x + F(120, 0), z.y - F(120, 140), "UN MES EN LA VIDA DE UN<br><span style='font-family:\"Rubik Dirt\";font-weight:400;font-size:1.9em'>CAVERNÍCOLA</span>", { size: F(70, 56), w: 1700 });
  fadeUp(S, "#fin", W(134, "viaje"));
  camTo(S, W(134, "tiempo"), F({ x: A - 1400, y: G - 1500, w: 3400, h: 1700 }, { x: A - 900, y: G - 2300, w: 1900, h: 2600 }), { dur: Math.max(1.5, end - W(134, "tiempo")), ease: "sine.inOut" });
}

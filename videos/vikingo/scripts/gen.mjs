// Generador de la composición HyperFrames a partir de la voz y sus tiempos.
// Uso: node scripts/gen.mjs <h|v> [--hasta SEG] [--sin-subs] [--voz voz.wav] [--palabras voz/palabras.json] [--frases voz/frases.json]
// Escribe el proyecto en hf-h/ (horizontal 1920x1080) o hf-v/ (vertical 1080x1920).
import fs from "fs";
import path from "path";
import { ROOT, makeFormat, Scene, C, r3, rng, esc } from "./lib.mjs";
import { CAPITULOS } from "./capitulos.mjs";

const args = process.argv.slice(2);
const fmtName = args[0] === "v" ? "v" : "h";
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const HASTA = parseFloat(opt("--hasta", "0")) || 0;
const SUBS = !args.includes("--sin-subs");
const VOZ = path.resolve(ROOT, opt("--voz", "voz.wav"));
const words = JSON.parse(fs.readFileSync(path.resolve(ROOT, opt("--palabras", "voz/palabras.json")), "utf8"));
const frases = JSON.parse(fs.readFileSync(path.resolve(ROOT, opt("--frases", "voz/frases.json")), "utf8"));
const fmt = makeFormat(fmtName);
const OUT = path.join(ROOT, opt("--out", `hf-${fmtName}${SUBS ? "" : "-sinsubs"}`));
const { W, H } = fmt;

import { execSync } from "child_process";
const vozDur = (() => { try { return parseFloat(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 "${VOZ}"`).toString()); } catch { return frases[frases.length - 1].end + 2; } })();
const TOTAL = r3(HASTA || vozDur);

fs.rmSync(path.join(OUT, "compositions"), { recursive: true, force: true });
fs.mkdirSync(path.join(OUT, "compositions"), { recursive: true });
fs.mkdirSync(path.join(OUT, "assets/fonts"), { recursive: true });
for (const f of ["Inter.ttf", "UncialAntiqua-Regular.woff2"]) fs.copyFileSync(path.join(ROOT, "fonts", f), path.join(OUT, "assets/fonts", f));
fs.copyFileSync(path.join(ROOT, "build/node_modules/gsap/dist/gsap.min.js"), path.join(OUT, "assets/gsap.min.js"));
fs.copyFileSync(VOZ, path.join(OUT, "assets/voz.wav"));

const COMMON_CSS = `
@font-face{font-family:"Inter";src:url("assets/fonts/Inter.ttf");font-weight:100 900}
@font-face{font-family:"Uncial Antiqua";src:url("assets/fonts/UncialAntiqua-Regular.woff2") format("woff2")}
.roman,.uncial{font-family:"Uncial Antiqua";font-weight:400;-webkit-text-stroke:0.04em #24160d;paint-order:stroke fill}
#root{position:absolute;inset:0;overflow:hidden;font-family:Inter,sans-serif}
.layer{position:absolute;left:0;top:0}
.world{position:absolute;left:0;top:0;transform-origin:0 0}
.actor,.card,.stamp,.wtext,.prop{position:absolute}
.card{border-radius:34px;border:6px solid ${C.ink};box-shadow:0 14px 0 ${C.ink},0 30px 60px rgba(0,0,0,.35);display:flex;align-items:center;justify-content:center}
.card-in{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px}
.lbl{font:900 60px Inter;color:${C.ink};letter-spacing:.5px;line-height:1}
.pts{position:absolute;left:0;top:0}
.pt{position:absolute;border-radius:50%;display:block}
.dirt{font-family:"Uncial Antiqua";font-weight:400;-webkit-text-stroke:0.03em #24160d;paint-order:stroke fill}
`;


// Varios fromTo sobre el mismo elemento: solo el primero (en el tiempo) fija el estado inicial;
// los demás llevan immediateRender:false para que buscar hacia atrás sea estable.
function fixFromTo(code) {
  const occ = []; let i = 0;
  while ((i = code.indexOf("tl.fromTo(", i)) >= 0) {
    let j = i + 10, depth = 1, args = [], cur = "", d2 = 0, inStr = null;
    for (; j < code.length && depth > 0; j++) {
      const ch = code[j];
      if (inStr) { cur += ch; if (ch === inStr && code[j - 1] !== "\\") inStr = null; continue; }
      if (ch === '"' || ch === "'" || ch === "`") { inStr = ch; cur += ch; continue; }
      if (ch === "(") depth++;
      if (ch === ")") { depth--; if (depth === 0) break; }
      if ("{[".includes(ch)) d2++;
      if ("}]".includes(ch)) d2--;
      if (ch === "," && depth === 1 && d2 === 0) { args.push(cur); cur = ""; continue; }
      cur += ch;
    }
    args.push(cur);
    occ.push({ start: i, end: j, args });
    i = j;
  }
  const first = {};
  for (const o of occ) { const k = o.args[0].trim(), p = parseFloat(o.args[3]); if (!(k in first) || p < first[k]) first[k] = p; }
  const seen = {};
  let out = "", last = 0;
  for (const o of occ) {
    const k = o.args[0].trim(), p = parseFloat(o.args[3]);
    let a = o.args;
    const limb = /-(leg|shin|arm|fore|body|torso|head|tail|l[1-4])[A-Z]*"$/.test(k) || /-(legF|legB|legFF|legBB|legFB|legBF)"$/.test(k);
    if (p !== first[k] || seen[k] || limb) a = [a[0], a[1], a[2].replace(/^\s*\{/, "{immediateRender:false,"), ...a.slice(3)];
    if (p === first[k]) seen[k] = true;
    out += code.slice(last, o.start) + "tl.fromTo(" + a.join(",") + ")";
    last = o.end + 1;
  }
  return out + code.slice(last);
}

// ---------- Capítulos ----------
const hosts = [];
const allCues = [];
let prevCam = null;
for (const cap of CAPITULOS) {
  const a = frases[cap.desde - 1], b = frases[cap.hasta - 1];
  if (!a || !b) break;
  const t0 = cap.desde === 1 ? 0 : r3(a.start - 0.15);
  const next = frases[cap.hasta]; // primera frase del siguiente capítulo
  const t1 = next ? r3(next.start - 0.15) : TOTAL;
  if (HASTA && t0 >= HASTA) break;
  const S = new Scene(cap.id, fmt, words, frases, t0, t1);
  S.prevCam = prevCam;
  cap.build(S);
  prevCam = S.cam;
  allCues.push(...S.cues.filter((c) => c.t >= t0 - 0.01 && c.t < Math.min(t1, TOTAL)));
  const dur = r3(Math.min(t1, TOTAL) - t0);
  const bgHtml = S.bg.join("\n"), worldHtml = S.html.join("\n"), overHtml = S.over.join("\n");
  const file = `<template>
<style>${COMMON_CSS}${S.css.join("\n")}</style>
<div id="root" data-composition-id="${cap.id}" data-width="${W}" data-height="${H}" data-layout-allow-overflow data-layout-allow-overlap>
  <div id="${cap.id}-shake" class="layer" style="width:${W}px;height:${H}px">
    ${bgHtml}
    <div id="${cap.id}-world" class="world">
${worldHtml}
    </div>
    ${overHtml}
  </div>
</div>
<script>
const tl = gsap.timeline({ paused: true });
${fixFromTo(S.js.join("\n"))}
tl.set({}, {}, ${dur});
window.__timelines["${cap.id}"] = tl;
</script>
</template>`;
  fs.writeFileSync(path.join(OUT, "compositions", `${cap.id}.html`), file);
  hosts.push(`<div id="${cap.id}" data-composition-id="${cap.id}" data-composition-src="compositions/${cap.id}.html" data-start="${t0}" data-duration="${dur}" data-track-index="1" data-track-kind="graphics" data-width="${W}" data-height="${H}" style="z-index:1"></div>`);
}

fs.writeFileSync(path.join(OUT, "sfx_cues.json"), JSON.stringify(allCues.sort((a, b) => a.t - b.t)));

// ---------- Subtítulos palabra a palabra ----------
const STOP = new Set("el la los las un una unos unas de del al a y o e que en con por para su sus se es no lo le les me te mi tu ya muy más como pero sí si hay son era fue está esto eso esa ese este esta ni nos".split(" "));
function captionGroups() {
  const ws = words.filter((w) => !HASTA || w.start < HASTA);
  const groups = []; let g = [];
  const flush = () => { if (g.length) groups.push(g); g = []; };
  for (let i = 0; i < ws.length; i++) {
    const w = ws[i], nx = ws[i + 1];
    g.push(w);
    const endSent = /[.!?:;]$/.test(w.w) || (nx && nx.line !== w.line);
    const comma = /,$/.test(w.w);
    const gap = nx ? nx.start - w.end : 1;
    if (endSent || g.length >= (fmt.h ? 4 : 3) || (comma && g.length >= 2) || gap > 0.25 || (g.length >= 3 && nx && STOP.has(nx.n) && g.length >= 3)) flush();
  }
  flush();
  return groups;
}
let subsHost = "";
if (SUBS) {
  const groups = captionGroups();
  const top = fmt.h ? H - 170 : 250; // H: abajo · V: arriba, bajo la zona segura de 220 px
  const size = fmt.h ? 66 : 64;
  let html = "", js = "";
  groups.forEach((g, gi) => {
    // palabra clave: la más larga que no sea palabra vacía (o un número)
    let key = -1, best = 0;
    g.forEach((w, i) => { const s = STOP.has(w.n) ? 0 : w.n.length + (/^\d/.test(w.w) ? 6 : 0); if (s > best) { best = s; key = i; } });
    const spans = g.map((w, i) => `<span id="s${gi}w${i}" class="sw${i === key ? " key" : ""}">${esc(w.w.replace(/[,;:]$/, ""))}</span>`).join(" ");
    html += `<div id="sg${gi}" class="sg" style="top:${top}px"><span class="sgi">${spans}</span></div>\n`;
    const a = r3(Math.max(0, g[0].start - 0.08)), b = r3(g[g.length - 1].end + 0.12);
    const nb = groups[gi + 1] ? r3(Math.min(b + 0.25, groups[gi + 1][0].start - 0.09)) : r3(b + 0.4);
    js += `tl.set("#sg${gi}",{visibility:"visible",opacity:1},${a});`;
    g.forEach((w, i) => {
      js += `tl.fromTo("#s${gi}w${i}",{opacity:0.25,y:10,scale:0.9},{opacity:1,y:0,scale:${i === key ? 1.06 : 1},duration:0.14,ease:"power3.out"},${r3(Math.max(a, w.start - 0.03))});`;
    });
    js += `tl.to("#sg${gi}",{opacity:0,duration:0.1},${r3(Math.max(a + 0.2, nb - 0.1))});tl.set("#sg${gi}",{visibility:"hidden"},${nb});\n`;
  });
  fs.writeFileSync(path.join(OUT, "compositions", "subs.html"), `<template>
<style>
#root{position:absolute;inset:0;pointer-events:none}
.sg{position:absolute;left:0;width:100%;text-align:center;visibility:hidden;font:900 ${size}px Inter,sans-serif;color:#fff8ec;line-height:1.25;padding:0 ${fmt.h ? 160 : 70}px;box-sizing:border-box;text-shadow:0 5px 0 ${C.ink},0 0 18px rgba(0,0,0,.7)}
.sgi{display:inline-block;background:rgba(24,14,8,.62);border-radius:22px;padding:6px 22px 10px}
.sw{display:inline-block;margin:0 4px}
.sw.key{background:${C.ochre};color:${C.ink};padding:0 18px 4px;border-radius:14px;border:5px solid ${C.ink};text-shadow:none;box-shadow:0 6px 0 ${C.ink}}
</style>
<div id="root" data-composition-id="subs" data-width="${W}" data-height="${H}" data-layout-allow-caption-zone>
${html}
</div>
<script>
const tl = gsap.timeline({ paused: true });
${fixFromTo(js)}
tl.set({}, {}, ${TOTAL});
window.__timelines["subs"] = tl;
</script>
</template>`);
  subsHost = `<div id="subs" data-composition-id="subs" data-composition-src="compositions/subs.html" data-start="0" data-duration="${TOTAL}" data-track-index="5" data-track-kind="captions" data-width="${W}" data-height="${H}" style="z-index:20"></div>`;
}

// ---------- Raíz ----------
const audio = [`<audio id="voz" class="clip" src="assets/voz.wav" data-start="0" data-duration="${TOTAL}" data-track-index="10" data-volume="1"></audio>`];
if (fs.existsSync(path.join(OUT, "assets/musica.wav"))) audio.push(`<audio id="musica" class="clip" src="assets/musica.wav" data-start="0" data-duration="${TOTAL}" data-track-index="11" data-volume="1"></audio>`);
if (fs.existsSync(path.join(OUT, "assets/sfx.wav"))) audio.push(`<audio id="sfx" class="clip" src="assets/sfx.wav" data-start="0" data-duration="${TOTAL}" data-track-index="12" data-volume="1"></audio>`);
fs.writeFileSync(path.join(OUT, "index.html"), `<!doctype html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=${W}, height=${H}" />
<script src="assets/gsap.min.js"></script>
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;overflow:hidden;background:${C.night}}
#root{position:relative;width:${W}px;height:${H}px;overflow:hidden}
</style>
</head>
<body>
<div id="root" data-composition-id="main" data-start="0" data-duration="${TOTAL}" data-width="${W}" data-height="${H}">
${hosts.join("\n")}
${subsHost}
${audio.join("\n")}
</div>
<script>
window.__timelines = window.__timelines || {};
window.__timelines["main"] = gsap.timeline({ paused: true });
</script>
</body>
</html>`);
for (const f of ["package.json", "hyperframes.json", "meta.json"]) {
  const src = path.join(ROOT, "build/plantilla", f);
  if (fs.existsSync(src) && !fs.existsSync(path.join(OUT, f))) fs.copyFileSync(src, path.join(OUT, f));
}
console.log(`OK ${OUT} · ${fmtName} ${W}x${H} · ${TOTAL}s · ${hosts.length} capítulos${SUBS ? " + subtítulos" : ""}`);

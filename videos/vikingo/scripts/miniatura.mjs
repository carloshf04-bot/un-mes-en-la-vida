// Miniaturas: 1280x720 (YouTube) y 1080x1920 (portada de TikTok o Reels).
// Personaje grande con cara expresiva, 3-5 palabras enormes, contraste fuerte y el título de la serie.
// Uso: node scripts/miniatura.mjs <config.json> <carpeta salida>
import fs from "fs";
import path from "path";
import { person, CAST, GEAR, C } from "./lib.mjs";
import { icon } from "./lib.mjs";
import { createRequire } from "module";
const { chromium } = createRequire(import.meta.url)("playwright");

const cfg = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const out = path.resolve(process.argv[3]);
fs.mkdirSync(out, { recursive: true });
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const font = (f) => `file://${path.join(ROOT, "fonts", f)}`;

// personaje en pose de sorpresa (boca abierta, cejas arriba, brazos levantados)
function hero(key, props, flip = false) {
  const gear = {};
  for (const [slot, k] of Object.entries(props || {})) gear[slot] = GEAR[k] || "";
  let svg = person("h", key, gear);
  svg = svg.replace('<path class="m-neutral"', '<path class="m-neutral" opacity="0"').replace('class="m-open" opacity="0"', 'class="m-open" opacity="1"');
  svg = svg.replace('<g id="h-armF">', '<g id="h-armF" transform="rotate(-35 30 -292)">').replace('<g id="h-armB">', '<g id="h-armB" transform="rotate(150 -30 -292)">');
  svg = svg.replace(/<g id="h-lids"[\s\S]*?<\/g>/, "");
  svg = svg.replace('<path id="h-brows"', '<path id="h-brows" transform="translate(0,-8)"');
  svg = svg.replace(/<circle class="pupil" cx="([\d.-]+)" cy="([\d.-]+)" r="5.5"/g, '<circle class="pupil" cx="$1" cy="$2" r="4"');
  return `<svg viewBox="-200 -520 400 400" width="100%" height="100%" overflow="visible" style="${flip ? "transform:scaleX(-1)" : ""}">${svg}</svg>`;
}

function page(W, H) {
  const v = H > W;
  const t = cfg.theme;
  const extras = (cfg.extras || []).map((e, i) => `<div style="position:absolute;${e.pos[v ? 1 : 0]};filter:drop-shadow(0 8px 0 ${C.ink})">${icon(e.icon, { size: v ? e.size * 1.25 : e.size, color: e.color })}</div>`).join("");
  return `<!doctype html><html><head><meta charset="utf-8"><style>
  @font-face{font-family:"T";src:url("${font(cfg.titleFont)}")${cfg.titleFont.endsWith(".woff2") ? ' format("woff2")' : ""};font-weight:100 900}
  @font-face{font-family:"Inter";src:url("${font("Inter.ttf")}");font-weight:100 900}
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:${W}px;height:${H}px;overflow:hidden;position:relative;background:radial-gradient(ellipse at ${v ? "50% 62%" : "68% 60%"},${t.glow} 0%,${t.mid} 45%,${t.dark} 100%);font-family:Inter}
  .rays{position:absolute;left:${v ? 50 : 68}%;top:${v ? 62 : 60}%;width:${W * 2.2}px;height:${W * 2.2}px;transform:translate(-50%,-50%);background:repeating-conic-gradient(rgba(255,255,255,.10) 0 7deg,rgba(255,255,255,0) 7deg 18deg);border-radius:50%}
  .ground{position:absolute;left:0;right:0;bottom:0;height:${v ? 22 : 18}%;background:${t.ground};border-top:8px solid ${C.ink}}
  .hero{position:absolute;${v ? `left:50%;transform:translateX(-50%);bottom:${H * 0.19}px;width:${W * 1.05}px;height:${H * 0.52}px` : `right:${W * 0.0}px;bottom:${H * 0.0}px;width:${W * 0.5}px;height:${H * 1.0}px`};filter:drop-shadow(0 18px 0 rgba(0,0,0,.35))}
  .hook{position:absolute;${v ? `left:${W * 0.05}px;right:${W * 0.05}px;top:${H * 0.13}px;text-align:center` : `left:${W * 0.04}px;top:${H * 0.07}px;width:${W * 0.6}px`};font:900 ${v ? 112 : 88}px/0.98 Inter;color:#fff;text-transform:uppercase;-webkit-text-stroke:${v ? 14 : 11}px ${C.ink};paint-order:stroke fill;text-shadow:0 ${v ? 12 : 9}px 0 ${C.ink}}
  .hook b{color:${t.accent};font-weight:900}
  .serie{position:absolute;${v ? `left:0;right:0;bottom:${H * 0.045}px;text-align:center` : `left:${W * 0.04}px;bottom:${H * 0.07}px`};}
  .serie .a{font:900 ${v ? 50 : 34}px Inter;color:#fff;-webkit-text-stroke:6px ${C.ink};paint-order:stroke fill;letter-spacing:1px}
  .serie .b{font-family:"T";font-weight:900;font-size:${Math.round(Math.min(v ? 150 : 96, (v ? 960 : 720) / (cfg.who.length * 0.74)))}px;line-height:1;color:${t.title};-webkit-text-stroke:${v ? 10 : 8}px ${C.ink};paint-order:stroke fill;text-shadow:0 8px 0 ${C.ink}}
  .badge{position:absolute;${v ? `left:50%;top:${H * 0.3}px;margin-left:-${W * 0.32}px` : `left:${W * 0.05}px;top:${H * 0.47}px`};background:${t.badge};color:#fff;font:900 ${v ? 64 : 46}px Inter;padding:${v ? "14px 34px" : "10px 24px"};border:7px solid ${C.ink};border-radius:24px;transform:rotate(${v ? -3 : -4}deg);box-shadow:0 10px 0 ${C.ink}}
  </style></head><body>
  <div class="rays"></div>${extras}<div class="ground"></div>
  <div class="hero">${hero(cfg.character, cfg.props, cfg.flip)}</div>
  <div class="hook">${cfg.hook}</div>
  ${cfg.badge ? `<div class="badge">${cfg.badge}</div>` : ""}
  <div class="serie"><div class="a">${cfg.top}</div><div class="b">${cfg.who}</div></div>
  </body></html>`;
}

const b = await chromium.launch();
for (const [W, H, name] of [[1280, 720, "miniatura-youtube.png"], [1080, 1920, "miniatura-vertical.png"]]) {
  const p = await b.newPage({ viewport: { width: W, height: H } });
  const f = path.join(out, `_${name}.html`);
  fs.writeFileSync(f, page(W, H));
  await p.goto("file://" + f); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(600);
  if (!(await p.evaluate(() => document.fonts.check('96px "T"')))) console.warn("AVISO: la fuente del título no se ha cargado");
  await p.screenshot({ path: path.join(out, name) });
  fs.unlinkSync(f);
  console.log(path.join(out, name));
}
await b.close();

// Un fotograma por escena (al 60 % de cada una) para revisar planos antes de renderizar.
// Uso: node scripts/planos.mjs <slug> [--escenas 3,7,12] [--vertical]
// Salida: salida/<slug>/planos/escena-NNN.png y hojas de 12 (hoja-N.png) para mirarlas con Read.
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import { readFileSync, mkdirSync, existsSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const APP = join(dirname(fileURLToPath(import.meta.url)), "..");
const slug = process.argv[2];
const arg = (n) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : null; };
const vertical = process.argv.includes("--vertical");
const FPS = 30, COLCHON = 0.5;
const man = JSON.parse(readFileSync(join(APP, "public/obras", slug, "largo/manifiesto.json"), "utf8"));
const audios = man.pieza.audios;
const solo = arg("--escenas") ? arg("--escenas").split(",").map(Number) : null;
const dir = join(APP, "..", "salida", slug, vertical ? "planos-vertical" : "planos");
mkdirSync(dir, { recursive: true });

const SHELL = "/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell";
const browserExecutable = existsSync(SHELL) ? SHELL : null;
const serveUrl = await bundle({ entryPoint: join(APP, "src/index.ts"), rspack: true });
const comp = await selectComposition({ serveUrl, id: vertical ? "Short" : "Largo", inputProps: { slug }, browserExecutable });
let inicio = 0;
const hechos = [];
for (let i = 0; i < audios.length; i++) {
  const dur = Math.ceil((audios[i].duracion + COLCHON) * FPS);
  if (!solo || solo.includes(i)) {
    const out = join(dir, `escena-${String(i).padStart(3, "0")}.png`);
    await renderStill({ composition: comp, serveUrl, output: out, frame: Math.min(comp.durationInFrames - 1, inicio + Math.floor(dur * 0.6)), inputProps: { slug }, scale: 0.4, browserExecutable });
    hechos.push(out);
    process.stdout.write(`${i} `);
  }
  inicio += dur;
}
// hojas de 12 con el número de escena
for (let h = 0; h * 12 < hechos.length; h++) {
  const grupo = hechos.slice(h * 12, h * 12 + 12);
  const args = ["-y", "-v", "error"];
  grupo.forEach((f) => args.push("-i", f));
  const filtros = grupo.map((f, k) => `[${k}]scale=480:-2,drawtext=text='${f.match(/escena-(\d+)/)[1]}':x=8:y=8:fontsize=28:fontcolor=yellow:box=1:boxcolor=black[v${k}]`);
  const cols = vertical ? 6 : 3;
  const lay = grupo.map((_, k) => `${(k % cols) ? Array.from({ length: k % cols }, () => "w0").join("+") : "0"}_${Math.floor(k / cols) ? Array.from({ length: Math.floor(k / cols) }, () => "h0").join("+") : "0"}`).join("|");
  args.push("-filter_complex", `${filtros.join(";")};${grupo.map((_, k) => `[v${k}]`).join("")}xstack=inputs=${grupo.length}:layout=${lay}:fill=black`, join(dir, `hoja-${h + 1}.png`));
  if (grupo.length === 1) { execFileSync("cp", [grupo[0], join(dir, `hoja-${h + 1}.png`)]); continue; }
  execFileSync("ffmpeg", args);
}
rmSync(serveUrl, { recursive: true, force: true }); // el paquete pesa y llena /tmp
console.log(`\n🖼️  ${hechos.length} planos en ${dir}`);

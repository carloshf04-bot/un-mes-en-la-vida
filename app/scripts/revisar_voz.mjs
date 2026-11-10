// Revisión de la voz con whisper (reanudable).
// Uso: node scripts/revisar_voz.mjs <slug>
//   Requiere haber pasado antes: node scripts/producir.mjs <slug> --sin-render
//   Para cada frase del largo (app/public/obras/<slug>/largo/voz-XXX.wav):
//     1. la transcribe con whisper.cpp (palabra a palabra, con tiempos),
//     2. la compara con el texto del guion (falta, sobra o cambia una palabra),
//     3. busca ruidos ([música], (risas)…) y silencios de más de 1 s dentro de la frase.
//   Si está mal, borra la voz de la caché y sube "intentos": al relanzar producir.mjs se
//   regenera con otra semilla. A los 3 intentos se marca "reescribir" (hay que cambiar el texto).
//   Guarda el progreso en app/public/obras/<slug>/cache-voz/revision.json (las frases ya
//   aprobadas no se vuelven a revisar) y el informe en salida/<slug>/informe-audio.md.
//   Sale con código 3 si quedan frases por regenerar y 4 si alguna hay que reescribir.
import { execFileSync, spawnSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync, rmSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";

const APP = join(dirname(fileURLToPath(import.meta.url)), "..");
const ESTUDIO = join(APP, "..");
const slug = process.argv[2];
if (!slug) throw new Error("Uso: node scripts/revisar_voz.mjs <slug>");
const WHISPER = process.env.WHISPER_CLI ?? "/home/user/whisper.cpp/build/bin/whisper-cli";
const MODELO = process.env.WHISPER_MODELO ?? "/home/user/whisper.cpp/models/ggml-large-v3-turbo.bin";
const MAX_INTENTOS = 3;

const obra = join(APP, "public", "obras", slug);
const cache = join(obra, "cache-voz");
const man = JSON.parse(readFileSync(join(obra, "largo", "manifiesto.json"), "utf8"));
const revF = join(cache, "revision.json");
const rev = existsSync(revF) ? JSON.parse(readFileSync(revF, "utf8")) : {};
const guardar = () => writeFileSync(revF, JSON.stringify(rev, null, 1));

// ---------- normalización ----------
const UNI = ["cero", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez", "once", "doce", "trece", "catorce", "quince", "dieciseis", "diecisiete", "dieciocho", "diecinueve", "veinte", "veintiuno", "veintidos", "veintitres", "veinticuatro", "veinticinco", "veintiseis", "veintisiete", "veintiocho", "veintinueve"];
const DEC = ["", "", "", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"];
const CEN = ["", "ciento", "doscientos", "trescientos", "cuatrocientos", "quinientos", "seiscientos", "setecientos", "ochocientos", "novecientos"];
const enLetras = (n) => {
  if (n < 30) return UNI[n];
  if (n < 100) return DEC[Math.floor(n / 10)] + (n % 10 ? " y " + UNI[n % 10] : "");
  if (n === 100) return "cien";
  if (n < 1000) return CEN[Math.floor(n / 100)] + (n % 100 ? " " + enLetras(n % 100) : "");
  if (n < 1e6) {
    const m = Math.floor(n / 1000);
    return (m === 1 ? "mil" : enLetras(m) + " mil") + (n % 1000 ? " " + enLetras(n % 1000) : "");
  }
  const m = Math.floor(n / 1e6);
  return (m === 1 ? "un millon" : enLetras(m) + " millones") + (n % 1e6 ? " " + enLetras(n % 1e6) : "");
};
const sinTildes = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "");
const tokens = (texto) =>
  sinTildes(texto.toLowerCase())
    .replace(/(\d+)[.,](\d{3})\b/g, "$1$2")
    .replace(/\d+/g, (d) => " " + enLetras(parseInt(d, 10)) + " ")
    .replace(/[^a-zñ\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
const parecido = (a, b) => {
  if (a === b) return 1;
  const m = a.length, n = b.length;
  const d = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 1; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return 1 - d[m][n] / Math.max(m, n);
};
// equivalencias que no son errores de la voz (seseo y grafías)
const sonido = (x) => x.replace(/z/g, "s").replace(/c([ei])/g, "s$1").replace(/v/g, "b").replace(/h/g, "").replace(/ll/g, "y");
const igualSonido = (a, b) => sonido(a) === sonido(b);

// alineamiento por programación dinámica: guion (g) frente a whisper (w)
const alinear = (g, w) => {
  const m = g.length, n = w.length;
  const coste = (a, b) => (a === b || igualSonido(a, b) || ALT[a]?.includes(b) ? 0 : parecido(sonido(a), sonido(b)) >= 0.7 || (ALT[a] ?? []).some((r) => parecido(r, b) >= 0.7) ? 0.3 : 1);
  const D = Array.from({ length: m + 1 }, () => new Float64Array(n + 1));
  const P = Array.from({ length: m + 1 }, () => new Uint8Array(n + 1));
  for (let i = 1; i <= m; i++) { D[i][0] = i; P[i][0] = 1; }
  for (let j = 1; j <= n; j++) { D[0][j] = j; P[0][j] = 2; }
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++) {
      const s = D[i - 1][j - 1] + coste(g[i - 1], w[j - 1]);
      const del = D[i - 1][j] + 1;
      const ins = D[i][j - 1] + 1;
      if (s <= del && s <= ins) { D[i][j] = s; P[i][j] = 0; } else if (del <= ins) { D[i][j] = del; P[i][j] = 1; } else { D[i][j] = ins; P[i][j] = 2; }
    }
  const pares = [];
  const errores = [];
  let i = m, j = n;
  while (i > 0 || j > 0) {
    const p = P[i][j];
    if (i > 0 && j > 0 && p === 0) {
      const c = coste(g[i - 1], w[j - 1]);
      if (c >= 1) errores.push(`«${g[i - 1]}» se oye «${w[j - 1]}»`);
      pares.push([i - 1, j - 1]);
      i--; j--;
    } else if (i > 0 && (j === 0 || p === 1)) {
      errores.push(`falta «${g[i - 1]}»`);
      pares.push([i - 1, -1]);
      i--;
    } else {
      errores.push(`sobra «${w[j - 1]}»`);
      j--;
    }
  }
  return { pares: pares.reverse(), errores: errores.reverse() };
};

// grafías reales de las palabras escritas como suenan (whisper suele escribir la real: «Guín» → «Gein»)
const guion = JSON.parse(readFileSync(join(ESTUDIO, "guiones", `${slug}.json`), "utf8"));
const ALT = {};
for (const [fon, real] of Object.entries(guion.grafias ?? {})) {
  const f = tokens(fon)[0];
  if (f) ALT[f] = [...(ALT[f] ?? []), ...tokens(real)];
}

// ---------- whisper ----------
const tmp = join(tmpdir(), `revisar-${slug}`);
mkdirSync(tmp, { recursive: true });
const transcribir = (wav) => {
  const w16 = join(tmp, "f.wav");
  execFileSync("ffmpeg", ["-y", "-v", "error", "-i", wav, "-ar", "16000", "-ac", "1", w16]);
  const r = spawnSync(WHISPER, ["-m", MODELO, "-l", "es", "-t", String(process.env.HILOS ?? 4), "-ml", "1", "-sow", "-oj", "-of", join(tmp, "f"), "-np", "-f", w16], { encoding: "utf8", maxBuffer: 1 << 26 });
  if (r.status !== 0) throw new Error(`whisper falló: ${r.stderr?.slice(-500)}`);
  const js = JSON.parse(readFileSync(join(tmp, "f.json"), "utf8"));
  // cada segmento es una palabra (con -ml 1 -sow)
  return js.transcription.map((s) => ({ texto: s.text.trim(), desde: s.offsets.from / 1000, hasta: s.offsets.to / 1000 })).filter((s) => s.texto);
};
const silenciosLargos = (wav) => {
  const r = spawnSync("ffmpeg", ["-hide_banner", "-i", wav, "-af", "silencedetect=n=-42dB:d=1.0", "-f", "null", "-"], { encoding: "utf8" });
  return (r.stderr.match(/silence_duration: [\d.]+/g) ?? []).map((x) => parseFloat(x.split(": ")[1]));
};

// ---------- revisión ----------
const escenas = man.pieza.escenas;
const audios = man.pieza.audios;
let pendientes = 0, reescribir = 0, revisadas = 0;
for (let i = 0; i < audios.length; i++) {
  const a = audios[i];
  const r = (rev[a.clave] ??= { intentos: 0, historial: [] });
  r.escena = i;
  r.texto = escenas[i].texto;
  if (r.estado === "ok" && r.tiempos) continue;
  if (r.estado === "reescribir") { reescribir++; continue; }
  const wav = join(obra, "largo", a.archivo);
  const palabrasW = transcribir(wav);
  revisadas++;
  const textoW = palabrasW.map((p) => p.texto).join(" ");
  // tokens de whisper con su tiempo
  const tw = [];
  for (const p of palabrasW) for (const t of tokens(p.texto)) tw.push({ t, desde: p.desde });
  // tokens del guion con el índice de la palabra (igual que los subtítulos: separadas por espacios)
  const palabrasG = escenas[i].texto.split(/\s+/).filter(Boolean);
  const tg = [];
  palabrasG.forEach((p, k) => tokens(p).forEach((t) => tg.push({ t, k })));
  const { pares, errores } = alinear(tg.map((x) => x.t), tw.map((x) => x.t));
  // tiempos por palabra del guion
  const tiempos = new Array(palabrasG.length).fill(null);
  for (const [gi, wi] of pares) if (wi >= 0 && tiempos[tg[gi].k] === null) tiempos[tg[gi].k] = tw[wi].desde;
  for (let k = 0; k < tiempos.length; k++) {
    if (tiempos[k] !== null) continue;
    const ant = tiempos.slice(0, k).reverse().find((x) => x !== null) ?? 0;
    let sig = null;
    for (let q = k + 1; q < tiempos.length; q++) if (tiempos[q] !== null) { sig = tiempos[q]; break; }
    tiempos[k] = sig === null ? ant + 0.25 : (ant + sig) / 2;
  }
  for (let k = 1; k < tiempos.length; k++) if (tiempos[k] < tiempos[k - 1]) tiempos[k] = tiempos[k - 1];
  // gravedad: un error en una palabra corta (y, e, a, de…) no cuenta
  const graves = errores.filter((e) => !/«[a-zñ]{1,2}»/.test(e.split(" se oye")[0]));
  const motivos = [];
  if (graves.length) motivos.push(graves.slice(0, 4).join("; "));
  if (/[[(]/.test(textoW)) motivos.push(`ruido o sonido raro: ${textoW.match(/[[(][^\])]*[\])]?/)?.[0]}`);
  const sil = silenciosLargos(wav);
  if (sil.length) motivos.push(`silencio de ${Math.max(...sil).toFixed(1)} s dentro de la frase`);
  r.oido = textoW;
  r.tiempos = tiempos.map((x) => Math.round(x * 100) / 100);
  if (!motivos.length) {
    r.estado = "ok";
    if (errores.length) r.nota = `diferencias menores: ${errores.slice(0, 3).join("; ")}`;
    console.log(`✔ ${i} ok`);
  } else {
    r.historial.push({ intento: r.intentos + 1, motivo: motivos.join(" · ") });
    r.intentos++;
    if (r.intentos >= MAX_INTENTOS) {
      r.estado = "reescribir";
      reescribir++;
      console.log(`✖ ${i} REESCRIBIR: ${motivos.join(" · ")}`);
    } else {
      r.estado = "regenerar";
      pendientes++;
      rmSync(join(cache, `${a.clave}.wav`), { force: true });
      console.log(`↻ ${i} regenerar (intento ${r.intentos + 1}): ${motivos.join(" · ")}`);
    }
  }
  guardar();
}
guardar();

// ---------- informe ----------
const filas = audios.map((a, i) => ({ i, r: rev[a.clave] }));
const regeneradas = filas.filter((x) => x.r.historial?.length);
const lineas = [
  `# Informe de audio: ${slug}`,
  "",
  `Frases: ${audios.length} · aprobadas: ${filas.filter((x) => x.r.estado === "ok").length} · por regenerar: ${pendientes} · por reescribir: ${reescribir}`,
  "",
  "Comprobaciones por frase: transcripción con whisper (large-v3-turbo) comparada palabra a palabra con el guion, ruidos (risas, música, respiraciones raras transcritas entre corchetes o paréntesis) y silencios de más de 1 s dentro de la frase.",
  "",
  "## Frases regeneradas",
  "",
  regeneradas.length ? "| Escena | Intentos | Estado | Motivos |\n|---|---|---|---|" : "Ninguna: todas salieron bien a la primera.",
  ...regeneradas.map((x) => `| ${x.i} | ${x.r.intentos + (x.r.estado === "ok" ? 1 : 0)} | ${x.r.estado} | ${x.r.historial.map((h) => `${h.intento}: ${h.motivo}`).join("<br>").replace(/\|/g, "/")} |`),
  "",
  "## Diferencias menores aceptadas",
  "",
  ...filas.filter((x) => x.r.nota).map((x) => `- Escena ${x.i}: ${x.r.nota}`),
  "",
];
const sal = join(ESTUDIO, "salida", slug);
mkdirSync(sal, { recursive: true });
writeFileSync(join(sal, "informe-audio.md"), lineas.join("\n"));
console.log(`\nrevisadas ahora: ${revisadas} · por regenerar: ${pendientes} · por reescribir: ${reescribir}`);
process.exit(reescribir ? 4 : pendientes ? 3 : 0);

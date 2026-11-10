// Shorts troceados del largo (reanudable).
// Uso: node scripts/shorts.mjs <slug> [--rehacer]
//   Lee   ../salida/<slug>/largo.mp4 (ya terminado y revisado), su manifiesto y el guion.
//   Crea  ../salida/<slug>/shorts/short-01.mp4, short-02.mp4… (1080×1920) y cortes.json
//
// Reglas:
//   - Trozos consecutivos que cubren el largo entero, de 45 a 60 s (nunca más de 60).
//   - Solo se corta en el final de una escena (después del silencio entre frases): nunca a
//     mitad de palabra. Se prefieren las escenas marcadas en el guion con "corte": true.
//   - Encuadre vertical por escena: recorte 9:16 centrado en el personaje que habla. Si el
//     plano no cabe (texto en pantalla, capítulo, título, dos personajes separados), se pone
//     el cuadro horizontal entero a lo ancho sobre el mismo fondo desenfocado.
//   - Subtítulos nuevos para vertical (grandes, tercio inferior, dentro de los márgenes
//     seguros: ~250 px abajo y ~200 px arriba), rótulo «Parte N/Total» y, al final de cada
//     short menos el último, «Sigue en la parte N+1».
//   - El audio es el del largo (-14 LUFS) con entrada y salida suaves de 0,2 s.
//   - Los shorts ya hechos (con el mismo plan de cortes) no se repiten.
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const APP = join(dirname(fileURLToPath(import.meta.url)), "..");
const ESTUDIO = join(APP, "..");
const slug = process.argv[2];
if (!slug) throw new Error("Uso: node scripts/shorts.mjs <slug>");
const rehacer = process.argv.includes("--rehacer");
const MIN = 45, MAX = 60, IDEAL = 53;

const guion = JSON.parse(readFileSync(join(ESTUDIO, "guiones", `${slug}.json`), "utf8"));
const man = JSON.parse(readFileSync(join(APP, "public", "obras", slug, "largo", "manifiesto.json"), "utf8"));
const salida = join(ESTUDIO, "salida", slug);
const largo = join(salida, "largo.mp4");
if (!existsSync(largo)) throw new Error(`Falta ${largo}`);
const dir = join(salida, "shorts");
mkdirSync(dir, { recursive: true });
const ffprobeDur = (f) => parseFloat(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f]).toString());
const DUR = ffprobeDur(largo);

// ---------- línea de tiempo (igual que src/Video.tsx) ----------
const fps = man.fps;
const esc = man.pieza.escenas;
const aud = man.pieza.audios;
let acc = 0;
const ini = aud.map((a) => { const i = acc; acc += Math.ceil((a.duracion + 0.5) * fps); return i / fps; });
// Puntos de corte: en mitad del silencio entre la voz de la escena anterior y la siguiente
// (así la entrada y salida suaves de 0,2 s nunca se comen una sílaba). El último, el final del vídeo.
const bordes = [0, ...ini.slice(1).map((t, k) => (ini[k] + aud[k].duracion + t) / 2), DUR];
const escIni = [...ini, DUR]; // dónde empieza de verdad cada plano (para el encuadre)

// ---------- plan de cortes: programación dinámica sobre los finales de escena ----------
const marcados = new Set(guion.largo.escenas.map((e, i) => (e.corte ? i : -1)).filter((i) => i > 0));
const planificar = (min, max) => {
  const n = esc.length;
  const mejor = new Array(n + 1).fill(Infinity);
  const prev = new Array(n + 1).fill(-1);
  mejor[0] = 0;
  for (let j = 1; j <= n; j++)
    for (let i = 0; i < j; i++) {
      if (mejor[i] === Infinity) continue;
      const d = bordes[j] - bordes[i];
      if (d < min || d > max) continue;
      const c = mejor[i] + (d - IDEAL) ** 2 + (j < n && !marcados.has(j) ? 30 : 0);
      if (c < mejor[j]) { mejor[j] = c; prev[j] = i; }
    }
  if (mejor[n] === Infinity) return null;
  const cortes = [];
  for (let j = n; j > 0; j = prev[j]) cortes.unshift([prev[j], j]);
  return cortes;
};
const plan = planificar(MIN, MAX) ?? planificar(38, MAX) ?? planificar(30, MAX);
if (!plan) throw new Error("No hay forma de trocear en piezas de ≤60 s: alguna escena es demasiado larga");
const total = plan.length;
console.log(`✂️  ${total} shorts: ${plan.map(([a, b]) => (bordes[b] - bordes[a]).toFixed(1) + "s").join(" · ")}`);

// ---------- encuadre por escena ----------
const CX = 960;
const xMundo = (x = 0) => CX + x * 600;
const CW = 608, CH = 900, CY = 20; // recorte del horizontal (deja fuera los subtítulos del largo)
const MW = 1000; // encuadre medio (casi cuadrado) para dos personajes
const pantallaX = (e, xw) => {
  const cam = e.camara ?? "lenta";
  const prota = e.personajes?.[0];
  let s = 1.025, fx = CX;
  if (cam === "cerca") { s = 1.45; fx = xMundo(prota?.x ?? 0); }
  else if (cam === "paneo") s = 1.12;
  else if (cam === "general") s = 1.01;
  else if (cam === "subir") s = 1.1;
  return { x: 960 + s * (xw - fx), s };
};
const encuadre = esc.map((e, i) => {
  if (i === 0 || e.insercion || e.capitulo) return { modo: "entero" };
  const pjs = (e.personajes ?? []).filter((p) => !p.sale);
  if (!pjs.length) return { modo: "recorte", x: 960 };
  const xs = pjs.map((p) => pantallaX(e, xMundo(p.x ?? 0)));
  const s = xs[0].s;
  const ancho = 250 * s; // medio cuerpo con brazos
  const min = Math.min(...xs.map((p) => p.x)) - ancho / 2;
  const max = Math.max(...xs.map((p) => p.x)) + ancho / 2;
  if (max - min <= CW) return { modo: "recorte", x: (min + max) / 2 };
  if (max - min <= MW) return { modo: "medio", x: (min + max) / 2 }; // dos personajes: encuadre casi cuadrado
  // no caben todos: si solo hay uno importante (el que habla) y el resto está lejos, se va al entero
  return { modo: "entero" };
});
const limitarX = (x, w = CW) => Math.round(Math.min(1920 - w, Math.max(0, x - w / 2)));

// ---------- subtítulos y rótulos (ASS) ----------
const hex = (c) => { const h = c.replace("#", ""); return `&H00${h.slice(4, 6)}${h.slice(2, 4)}${h.slice(0, 2)}`.toUpperCase(); };
const acento = hex(man.paleta?.acento ?? "#f2b544");
const tiempoASS = (t) => { const h = Math.floor(t / 3600), m = Math.floor((t % 3600) / 60), s = t % 60; return `${h}:${String(m).padStart(2, "0")}:${s.toFixed(2).padStart(5, "0")}`; };
const tituloCorto = (guion.publicacion?.tituloCorto ?? `Un mes en la vida de ${guion.titulo}`).toUpperCase();
const escapar = (t) => t.replace(/[{}\\]/g, "");
const grafias = guion.grafias ?? {};
const real = (w) => { const m = w.match(/^([¿¡«"(]*)([\p{L}]+)(.*)$/u); return m && grafias[m[2]] ? m[1] + grafias[m[2]] + m[3] : w; };
const fuentes = join(APP, "public", "fuentes", "ttf");

const assDe = (n, [a, b]) => {
  const t0 = bordes[a], t1 = bordes[b], d = t1 - t0;
  const L = [
    "[Script Info]", "ScriptType: v4.00+", "PlayResX: 1080", "PlayResY: 1920", "WrapStyle: 0", "",
    "[V4+ Styles]",
    "Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding",
    "Style: Sub,Inter,82,&H00FFFFFF,&H00FFFFFF,&H00000000,&H90000000,1,0,0,0,100,100,0,0,1,7,3,2,70,70,330,1",
    "Style: Cab,Inter,60,&H00FFFFFF,&H00FFFFFF,&H00000000,&H90000000,1,0,0,0,100,100,2,0,1,5,2,8,50,50,205,1",
    `Style: Parte,Inter,68,${acento},${acento},&H00000000,&H90000000,1,0,0,0,100,100,3,0,1,6,2,8,60,60,285,1`,
    `Style: Sigue,Inter,62,&H00FFFFFF,&H00FFFFFF,${acento},&HC0000000,1,0,0,0,100,100,1,0,3,18,0,5,60,60,0,1`,
    "", "[Events]", "Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text",
    `Dialogue: 1,${tiempoASS(0)},${tiempoASS(d)},Cab,,0,0,0,,${escapar(tituloCorto)}`,
    `Dialogue: 1,${tiempoASS(0)},${tiempoASS(d)},Parte,,0,0,0,,PARTE ${n}/${total}`,
  ];
  if (n < total) L.push(`Dialogue: 2,${tiempoASS(Math.max(0, d - 2.6))},${tiempoASS(d)},Sigue,,0,0,0,,{\\fad(200,0)\\pos(540,1180)}SIGUE EN LA PARTE ${n + 1} »`);
  for (let i = a; i < b; i++) {
    const palabras = esc[i].texto.split(/\s+/).filter(Boolean);
    const leidas = palabras.map(real);
    const audioIni = ini[i] - t0;
    const tiempos = aud[i].tiempos && aud[i].tiempos.length === palabras.length ? aud[i].tiempos : (() => {
      const pesos = palabras.map((p) => p.replace(/[^\p{L}\p{N}]/gu, "").length + 2 + (/[.,;:!?…]$/.test(p) ? 5 : 0));
      const tot = pesos.reduce((x, y) => x + y, 0);
      let ac = 0;
      return pesos.map((w) => { const v = (ac / tot) * aud[i].duracion * 0.97; ac += w; return v; });
    })();
    // grupos de hasta 3 palabras (o hasta un signo de puntuación)
    const grupos = [];
    let g = [];
    palabras.forEach((p, k) => { g.push(k); if (g.length >= 3 || /[.,;:!?…]$/.test(p)) { grupos.push(g); g = []; } });
    if (g.length) grupos.push(g);
    grupos.forEach((gr, gi) => {
      const fin = gi + 1 < grupos.length ? tiempos[grupos[gi + 1][0]] : Math.min(aud[i].duracion + 0.3, bordes[i + 1] - ini[i]);
      gr.forEach((k, ki) => {
        const desde = tiempos[k];
        const hasta = ki + 1 < gr.length ? tiempos[gr[ki + 1]] : fin;
        if (hasta - desde < 0.02) return;
        const texto = gr.map((q) => (q === k ? `{\\c${acento}}${escapar(leidas[q].toUpperCase())}{\\c&H00FFFFFF&}` : escapar(leidas[q].toUpperCase()))).join(" ");
        L.push(`Dialogue: 0,${tiempoASS(audioIni + desde)},${tiempoASS(audioIni + hasta)},Sub,,0,0,0,,${texto}`);
      });
    });
  }
  return L.join("\n") + "\n";
};

// ---------- render de cada short ----------
const firma = JSON.stringify({ plan, encuadre, v: 5 });
const cortesF = join(dir, "cortes.json");
const previo = existsSync(cortesF) ? readFileSync(cortesF, "utf8") : "";
const mismoPlan = !rehacer && previo && JSON.parse(previo).firma === firma;
if (!mismoPlan) for (let n = 1; n <= 40; n++) rmSync(join(dir, `short-${String(n).padStart(2, "0")}.mp4`), { force: true });

// expresión de ffmpeg por tramos (con transición suave de 0,3 s entre escenas en el recorte)
const xDe = (i, modo, w) => limitarX(encuadre[i].modo === modo ? encuadre[i].x : 960, w);
const exprX = (a, b, modo = "recorte", w = CW) => {
  const t0 = bordes[a];
  let e = String(xDe(b - 1, modo, w));
  const a0 = Math.max(0, a - 1); // los primeros ~0,25 s aún se ve el plano anterior
  for (let i = b - 1; i > a0; i--) {
    const xi = xDe(i, modo, w);
    const xa = xDe(i - 1, modo, w);
    const tb = (escIni[i] - t0).toFixed(3);
    e = `if(lt(t,${tb}-0.15),${xa},if(lt(t,${tb}+0.15),${xa}+(${xi}-${xa})*(t-${tb}+0.15)/0.3,${e}))`;
  }
  return e;
};
const exprModo = (a, b, modo) => {
  const t0 = bordes[a];
  const tramos = [];
  for (let i = Math.max(0, a - 1); i < b; i++) if (encuadre[i].modo === modo) tramos.push(`between(t,${Math.max(0, escIni[i] - t0).toFixed(3)},${(Math.min(escIni[i + 1], bordes[b]) - t0 - 0.001).toFixed(3)})`);
  return tramos.length ? tramos.join("+") : "0";
};

const hechos = [];
plan.forEach(([a, b], k) => {
  const n = k + 1;
  const dest = join(dir, `short-${String(n).padStart(2, "0")}.mp4`);
  const t0 = bordes[a], d = bordes[b] - t0;
  hechos.push({ n, desde: +t0.toFixed(3), hasta: +bordes[b].toFixed(3), duracion: +d.toFixed(3), escenas: [a, b - 1] });
  if (existsSync(dest)) { console.log(`   ya existe short ${n}`); return; }
  const ass = join(dir, `short-${String(n).padStart(2, "0")}.ass`);
  writeFileSync(ass, assDe(n, [a, b]));
  const ent = exprModo(a, b, "entero");
  const med = exprModo(a, b, "medio");
  const MH = Math.round((CH * 1080) / MW);
  const filtro = [
    `[0:v]split=4[v1][v2][v3][v4]`,
    `[v1]scale=-2:1920,crop=1080:1920,boxblur=28:2,eq=brightness=-0.18:saturation=0.85[fondo]`,
    `[v2]crop=${CW}:${CH}:x='${exprX(a, b)}':y=${CY},scale=1080:${Math.round((CH * 1080) / CW)}[rec]`,
    `[v3]crop=1920:${CH}:0:${CY},scale=1080:${Math.round((CH * 1080) / 1920)}[ent]`,
    `[v4]crop=${MW}:${CH}:x='${exprX(a, b, "medio", MW)}':y=${CY},scale=1080:${MH}[med]`,
    `[fondo][rec]overlay=0:160:enable='not(${ent}+${med})'[f0]`,
    `[f0][med]overlay=0:(1920-h)/2-60:enable='${med}'[f1]`,
    `[f1][ent]overlay=0:(1920-h)/2-60:enable='${ent}'[f2]`,
    `[f2]subtitles=${ass}:fontsdir=${fuentes}[out]`,
    `[0:a]afade=t=in:d=0.2,afade=t=out:st=${(d - 0.2).toFixed(3)}:d=0.2[a]`,
  ].join(";");
  console.log(`🎬 short ${n}/${total} (${d.toFixed(1)} s)…`);
  execFileSync("ffmpeg", ["-y", "-v", "error", "-ss", t0.toFixed(3), "-t", d.toFixed(3), "-i", largo, "-filter_complex", filtro, "-map", "[out]", "-map", "[a]",
    "-c:v", "libx264", "-preset", "medium", "-crf", "21", "-pix_fmt", "yuv420p", "-r", String(fps), "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-movflags", "+faststart", `${dest}.tmp.mp4`]);
  execFileSync("mv", [`${dest}.tmp.mp4`, dest]);
  rmSync(ass);
});
writeFileSync(cortesF, JSON.stringify({ firma, total, shorts: hechos }, null, 1));
console.log(`✅ ${total} shorts en ${dir}`);

// Produce un episodio completo de "Un mes en la vida de".
// Uso: node scripts/producir.mjs <slug> [--solo largo|short] [--sin-render] [--muestras]
//   Lee   ../guiones/<slug>.json
//   Crea  ../salida/<slug>/{largo.mp4, miniatura.png, miniatura-short.png, publicacion.md}
//   Los shorts se cortan después del largo con scripts/shorts.mjs (troceado del largo en vertical).
//   La revisión de la voz con whisper es scripts/revisar_voz.mjs: deja en cache-voz/revision.json
//   las semillas de las frases regeneradas y los tiempos reales de cada palabra (subtítulos).
import { execFileSync, spawnSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { sintetizar } from "./musica.mjs";

const APP = join(dirname(fileURLToPath(import.meta.url)), "..");
const ESTUDIO = join(APP, "..");
const args = process.argv.slice(2);
const slug = args[0];
if (!slug) throw new Error("Uso: node scripts/producir.mjs <slug>");
const opt = (n) => args.includes(n);
const solo = args.includes("--solo") ? args[args.indexOf("--solo") + 1] : null;
const FPS = 30;
const COLCHON = 0.5;

const guion = JSON.parse(readFileSync(join(ESTUDIO, "guiones", `${slug}.json`), "utf8"));
// Motor de voz: "chatterbox" (por defecto, expresivo, clona la voz de referencia) o "piper" (rápido, plano)
const motor = guion.motor ?? "chatterbox";
const voz = guion.voz ?? (motor === "chatterbox" ? "narrador-es" : "es_ES-davefx-medium");
const modelo = motor === "chatterbox" ? join(ESTUDIO, "voces", "referencia", `${voz}.wav`) : join(ESTUDIO, "voces", `${voz}.onnx`);
if (!existsSync(modelo)) throw new Error(`Falta la voz ${modelo}. Ejecuta ./preparar.sh`);
const PY = join(ESTUDIO, motor === "chatterbox" ? ".venv-cb" : ".venv", "bin", "python");
const obra = join(APP, "public", "obras", slug);
const salida = join(ESTUDIO, "salida", slug);
mkdirSync(salida, { recursive: true });

const ffprobeDur = (f) => parseFloat(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f]).toString());

// --- validación + herencia de fondo/personajes ---
const validar = (pieza, nombre) => {
  let fondo = null;
  let personajes = [];
  return pieza.escenas.map((e, i) => {
    if (!e.texto) throw new Error(`${nombre} escena ${i}: falta "texto"`);
    for (const p of e.personajes ?? []) if (!guion.reparto[p.quien]) throw new Error(`${nombre} escena ${i}: "${p.quien}" no está en el reparto`);
    fondo = e.fondo ?? fondo;
    personajes = e.personajes ?? personajes;
    if (!fondo) throw new Error(`${nombre} escena ${i}: la primera escena necesita "fondo"`);
    return { ...e, fondo, personajes };
  });
};

// --- ambientes sonoros (ruido filtrado, sin copyright) ---
const AMBIENTES = {
  lluvia: "anoisesrc=c=pink:a=0.5:d=30,highpass=f=500,lowpass=f=7000",
  mar: "anoisesrc=c=brown:a=0.6:d=30,lowpass=f=900,volume='0.45+0.4*sin(2*PI*0.11*t)':eval=frame",
  viento: "anoisesrc=c=pink:a=0.4:d=30,bandpass=f=420:w=300,volume='0.35+0.25*sin(2*PI*0.07*t)+0.15*sin(2*PI*0.21*t)':eval=frame",
  fuego: "anoisesrc=c=brown:a=0.5:d=30,lowpass=f=600,volume='0.5+0.2*sin(2*PI*3.1*t)*sin(2*PI*0.7*t)':eval=frame",
  zumbido: "sine=f=55:d=30,volume=0.25[a];anoisesrc=c=brown:a=0.15:d=30,lowpass=f=300[b];[a][b]amix=inputs=2",
  ciudad: "anoisesrc=c=brown:a=0.35:d=30,lowpass=f=1500,highpass=f=80",
};
const ambienteDe = (e) => {
  const f = e.fondo;
  const props = (f.props ?? []).map((p) => (typeof p === "string" ? p : p.tipo));
  if (f.clima === "lluvia" || f.clima === "tormenta") return "lluvia";
  if (f.lugar === "mar" || f.lugar === "playa") return "mar";
  if (f.lugar === "interior" && (props.includes("chimenea") || props.includes("hoguera"))) return "fuego";
  if (props.includes("hoguera")) return "fuego";
  if (f.lugar === "futurista" || f.lugar === "espacio" || f.lugar === "luna" || f.pared === "metal") return "zumbido";
  if (["nieve", "polvo"].includes(f.clima) || ["hielo", "desierto", "montanas"].includes(f.lugar)) return "viento";
  if (f.lugar === "ciudad" || f.lugar === "calle") return "ciudad";
  return null;
};
mkdirSync(obra, { recursive: true });
for (const [n, filtro] of Object.entries(AMBIENTES)) {
  const dest = join(obra, `amb-${n}.wav`);
  if (!existsSync(dest)) execFileSync("ffmpeg", ["-y", "-v", "error", "-filter_complex", `${filtro},afade=t=in:d=0.5,loudnorm=I=-24`, "-ar", "44100", "-ac", "1", dest]);
}

// --- envolvente de volumen por frame (para mover la boca) ---
const envolvente = (wav) => {
  const raw = execFileSync("ffmpeg", ["-v", "error", "-i", wav, "-f", "s16le", "-ac", "1", "-ar", "8000", "-"], { maxBuffer: 1 << 28 });
  const muestras = raw.length / 2;
  const porFrame = 8000 / FPS;
  const vals = [];
  for (let f = 0; f * porFrame < muestras; f++) {
    let s = 0;
    const a = Math.floor(f * porFrame);
    const b = Math.min(muestras, Math.floor((f + 1) * porFrame));
    for (let i = a; i < b; i++) s += (raw.readInt16LE(i * 2) / 32768) ** 2;
    vals.push(Math.sqrt(s / Math.max(1, b - a)));
  }
  const orden = [...vals].sort((x, y) => x - y);
  const p95 = orden[Math.floor(orden.length * 0.95)] || 1;
  return vals.map((v) => Math.round(Math.min(1, v / p95) * 100) / 100);
};

const producirPieza = (formato) => {
  const dir = join(obra, formato);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  const escenas = validar(guion[formato], formato);
  console.log(`\n=== ${formato.toUpperCase()}: ${escenas.length} escenas ===`);

  // 1) voces (con caché por texto: si se corta el proceso, no se repite lo ya generado)
  const cache = join(obra, "cache-voz");
  mkdirSync(cache, { recursive: true });
  const dramaBase = guion.drama ?? 0.65;
  // Voz por escena: escena.voz > voz del personaje que habla (reparto[quien].voz) > voz del guion.
  // Así una narradora o un personaje femenino suenan con voz femenina.
  const vozDe = (e) => {
    if (e.voz) return e.voz;
    const hablante = (e.personajes ?? []).find((p, i) => p.habla === true || (p.habla === undefined && i === 0));
    return (hablante && guion.reparto[hablante.quien]?.voz) || voz;
  };
  const refDe = (v) => {
    const r = motor === "chatterbox" ? join(ESTUDIO, "voces", "referencia", `${v}.wav`) : join(ESTUDIO, "voces", `${v}.onnx`);
    if (!existsSync(r)) throw new Error(`Falta la voz ${r}`);
    return r;
  };
  const revisionF = join(cache, "revision.json");
  const revision = existsSync(revisionF) ? JSON.parse(readFileSync(revisionF, "utf8")) : {};
  const clave = (e) => createHash("sha1").update(`${motor}|${vozDe(e)}|${motor === "chatterbox" ? 1 : guion.velocidad ?? 1}|${e.drama ?? dramaBase}|${e.texto}`).digest("hex").slice(0, 16);
  const trabajos = escenas.map((e) => ({ texto: e.texto, drama: e.drama ?? dramaBase, ref: refDe(vozDe(e)), salida: join(cache, `${clave(e)}.wav`), clave: clave(e), semilla: 1234 + 1000 * (revision[clave(e)]?.intentos ?? 0) }));
  const pendientes = trabajos.filter((t) => !existsSync(t.salida));
  if (pendientes.length) {
    console.log(`🎙️  generando ${pendientes.length} locuciones con ${motor}…`);
    const tj = join(dir, "trabajos.json");
    writeFileSync(tj, JSON.stringify(pendientes));
    const r = motor === "chatterbox"
      ? spawnSync(PY, [join(APP, "scripts", "voz_chatterbox.py"), modelo, tj], { stdio: ["ignore", "inherit", "inherit"] })
      : spawnSync(PY, [join(APP, "scripts", "voz.py"), modelo, String(guion.velocidad ?? 1.0), tj], { stdio: ["ignore", "ignore", "inherit"] });
    if (r.status !== 0) throw new Error("Falló la síntesis de voz");
    rmSync(tj);
  }
  const tempo = motor === "chatterbox" && guion.velocidad && guion.velocidad !== 1 ? `,atempo=${guion.velocidad}` : "";
  const audios = escenas.map((e, i) => {
    const archivo = `voz-${String(i).padStart(3, "0")}.wav`;
    execFileSync("ffmpeg", ["-y", "-v", "error", "-i", trabajos[i].salida, "-af", `silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse${tempo},highpass=f=70,bass=g=3:f=150,acompressor=threshold=-18dB:ratio=3,loudnorm=I=-16:TP=-1.5,afade=t=in:d=0.015,areverse,afade=t=in:d=0.02,areverse`, "-ar", "44100", join(dir, archivo)]);
    const tiempos = revision[trabajos[i].clave]?.tiempos;
    return { archivo, clave: trabajos[i].clave, duracion: ffprobeDur(join(dir, archivo)), env: envolvente(join(dir, archivo)), ...(tiempos ? { tiempos } : {}) };
  });
  const total = audios.reduce((a, b) => a + b.duracion + COLCHON, 0) + 2;
  console.log(`🎙️  ${audios.length} locuciones · duración total ${(total / 60).toFixed(1)} min`);

  // 2) música
  sintetizar(guion.musica ?? "calma", total + 2, join(dir, "musica-cruda.wav"));
  execFileSync("ffmpeg", ["-y", "-v", "error", "-i", join(dir, "musica-cruda.wav"), "-af", `lowpass=f=3500,aecho=0.8:0.6:300|700:0.3|0.2,afade=t=in:d=2,afade=t=out:st=${(total - 2).toFixed(1)}:d=3,loudnorm=I=-22`, join(dir, "musica.wav")]);
  rmSync(join(dir, "musica-cruda.wav"));
  console.log(`🎵 música "${guion.musica ?? "calma"}"`);

  // 3) manifiesto
  const { largo, short, ...resto } = guion;
  const manifiesto = { ...resto, fps: FPS, formato, musica_archivo: "musica.wav", pieza: { escenas, audios, ambientes: escenas.map((e) => { const a = ambienteDe(e); return a ? `amb-${a}.wav` : null; }) } };
  writeFileSync(join(dir, "manifiesto.json"), JSON.stringify(manifiesto));
  return { escenas, audios };
};

const render = (formato) => {
  const comp = formato === "largo" ? "Largo" : "Short";
  const destino = join(salida, `${formato}.mp4`);
  const bruto = join(salida, `${formato}-bruto.mp4`);
  console.log(`🎬 renderizando ${comp}…`);
  const t0 = Date.now();
  execFileSync("npx", ["remotion", "render", comp, bruto, `--props=${JSON.stringify({ slug })}`, "--concurrency=4", "--crf=22", "--x264-preset=medium", "--log=error", "--timeout=120000"], { cwd: APP, stdio: "inherit" });
  console.log(`   ✔ render (${((Date.now() - t0) / 60000).toFixed(1)} min)`);
  mezclaFinal(bruto, destino);
  rmSync(bruto);
  console.log(`   ✔ ${destino} a -14 LUFS`);
};

// Mezcla final: sonoridad -14 LUFS y pico real ≤ -1 dBTP (loudnorm en dos pasadas), vídeo sin recodificar
const mezclaFinal = (entrada, destino) => {
  const r = spawnSync("ffmpeg", ["-hide_banner", "-i", entrada, "-af", "loudnorm=I=-14:TP=-2:LRA=11:print_format=json", "-f", "null", "-"], { encoding: "utf8" });
  const js = JSON.parse(r.stderr.slice(r.stderr.lastIndexOf("{"), r.stderr.lastIndexOf("}") + 1));
  const ln = `loudnorm=I=-14:TP=-2:LRA=11:measured_I=${js.input_i}:measured_TP=${js.input_tp}:measured_LRA=${js.input_lra}:measured_thresh=${js.input_thresh}:offset=${js.target_offset}:linear=true`;
  execFileSync("ffmpeg", ["-y", "-v", "error", "-i", entrada, "-c:v", "copy", "-af", `${ln},alimiter=limit=0.75:level=false`, "-ar", "48000", "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", destino]);
};

const muestras = (formato, info) => {
  // fotogramas de control: uno por cada ~8 escenas
  const dir = join(salida, "muestras");
  mkdirSync(dir, { recursive: true });
  let inicio = 0;
  const comp = formato === "largo" ? "Largo" : "Short";
  info.audios.forEach((a, i) => {
    const dur = Math.ceil((a.duracion + COLCHON) * FPS);
    if (i % Math.max(1, Math.floor(info.audios.length / 8)) === 0) {
      execFileSync("npx", ["remotion", "still", comp, join(dir, `${formato}-${String(i).padStart(3, "0")}.png`), `--frame=${inicio + Math.floor(dur * 0.6)}`, `--props=${JSON.stringify({ slug })}`, "--scale=0.4", "--log=error"], { cwd: APP });
    }
    inicio += dur;
  });
  console.log(`🖼️  muestras en ${dir}`);
};

const formatos = solo ? [solo] : guion.short ? ["short", "largo"] : ["largo"];
for (const formato of formatos) {
  const info = producirPieza(formato);
  if (opt("--muestras")) muestras(formato, info);
  if (!opt("--sin-render")) render(formato);
}

if (!opt("--sin-render") && formatos.includes("largo")) {
  // miniaturas diseñadas: YouTube 1280x720 y portada vertical del Short (config en publicacion.miniatura)
  for (const [comp, archivo] of [["MiniaturaLargo", "miniatura.png"], ["MiniaturaShort", "miniatura-short.png"]]) {
    execFileSync("npx", ["remotion", "still", comp, join(salida, archivo), "--frame=30", `--props=${JSON.stringify({ slug })}`, "--log=error"], { cwd: APP });
  }
  console.log("🖼️  miniatura.png + miniatura-short.png");
}
if (guion.publicacion) {
  const p = guion.publicacion;
  const shorts = (p.shorts ?? []).map((sh, i) => `### Short ${i + 1}/${p.shorts.length}: ${sh.titulo}\n\n${sh.descripcion}\n`).join("\n");
  writeFileSync(join(salida, "publicacion.md"), `# ${p.tituloLargo}\n\n## Descripción\n\n${p.descripcion}\n\n## Etiquetas\n\n${p.etiquetas.join(", ")}\n${shorts ? `\n## Shorts (troceado del largo, en orden)\n\n${shorts}` : p.tituloShort ? `\n**Short:** ${p.tituloShort}\n` : ""}`);
}
console.log(`\n✅ Episodio "${slug}" listo en ${salida}`);

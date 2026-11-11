// publicacion.md definitivo (después de cortar los shorts).
// Uso: node scripts/publicacion.mjs <slug>
//   - Capítulos con su minuto real (YouTube los necesita: 00:00 primero).
//   - Un título y una descripción por cada short REAL (salida/<slug>/shorts/cortes.json): se usa el bloque
//     del guion ("corte": true) con el que empieza cada short.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const APP = join(dirname(fileURLToPath(import.meta.url)), "..");
const ESTUDIO = join(APP, "..");
const slug = process.argv[2];
const guion = JSON.parse(readFileSync(join(ESTUDIO, "guiones", `${slug}.json`), "utf8"));
const man = JSON.parse(readFileSync(join(APP, "public", "obras", slug, "largo", "manifiesto.json"), "utf8"));
const salida = join(ESTUDIO, "salida", slug);
const p = guion.publicacion;

let acc = 0;
const ini = man.pieza.audios.map((a) => { const i = acc; acc += Math.ceil((a.duracion + 0.5) * man.fps); return i / man.fps; });
const mmss = (t) => `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(Math.floor(t % 60)).padStart(2, "0")}`;
const escenas = guion.largo.escenas;

// capítulos: "00:00 Gancho" + una línea por "capitulo" + epílogo si lo hay
const caps = [`00:00 ${p.capituloInicial ?? "Empieza el mes"}`];
let n = 0;
escenas.forEach((e, i) => { if (e.capitulo) caps.push(`${mmss(ini[i])} Semana ${++n}: ${e.capitulo}`); });
const idxEpi = escenas.findIndex((e, i) => i > 0 && !e.dia && i > escenas.length * 0.75);
if (idxEpi > 0) caps.push(`${mmss(ini[idxEpi])} Epílogo`);
const desc = p.descripcion.split("\n").filter((l) => !/^—\s*(Semana|Epílogo)/.test(l.trim()) && !/^\d\d:\d\d/.test(l.trim())).join("\n").replace(/\n{3,}/g, "\n\n");

// shorts reales
const bloques = [];
escenas.forEach((e, i) => { if (e.corte) bloques.push(i); });
const cortesF = join(salida, "shorts", "cortes.json");
const shorts = existsSync(cortesF) ? JSON.parse(readFileSync(cortesF, "utf8")).shorts : [];
const lineasShorts = shorts.map((s) => {
  const k = Math.max(0, bloques.findIndex((b) => b === s.escenas[0]) >= 0 ? bloques.indexOf(s.escenas[0]) : bloques.filter((b) => b <= s.escenas[0]).length - 1);
  const info = p.shorts?.[k] ?? { titulo: `${guion.titulo} (parte ${s.n})`, descripcion: "#shorts" };
  return `### Parte ${s.n}/${shorts.length} · ${mmss(s.desde)}–${mmss(s.hasta)} · ${s.duracion.toFixed(0)} s\n\n**${info.titulo}**\n\n${info.descripcion}\n`;
});

const md = `# ${p.tituloLargo}

## Descripción

${desc.trim()}

${caps.join("\n")}

## Etiquetas

${p.etiquetas.join(", ")}

## Shorts (el largo troceado en orden, vertical)

${lineasShorts.join("\n")}`;
writeFileSync(join(salida, "publicacion.md"), md);
console.log(`publicacion.md: ${caps.length} capítulos, ${shorts.length} shorts`);

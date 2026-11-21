import React from "react";
import { random } from "remotion";
import { MW, MH, SUELO, HORIZONTE, oscurecer, xMundo } from "./constantes";
import { Prop, espiral, rombos } from "./Props";

export type Hora = "amanecer" | "dia" | "atardecer" | "noche";
export type Clima = "despejado" | "lluvia" | "nieve" | "niebla" | "tormenta" | "polvo" | "ceniza" | "nublado";
export type Lugar =
  | "mar" | "playa" | "montanas" | "hielo" | "ciudad" | "futurista" | "desierto" | "campo"
  | "bosque" | "espacio" | "luna" | "calle" | "selva" | "valle" | "marte" | "rio" | "trinchera" | "isla" | "interior" | "ocular";
export type PropEnEscena = string | { tipo: string; x?: number; escala?: number; detras?: boolean };

export type Fondo = {
  lugar: Lugar;
  hora?: Hora;
  clima?: Clima;
  pared?: "piedra" | "madera" | "ladrillo" | "metal" | "papel" | "tela" | "roca" | "jeroglificos" | "megalito";
  colorPared?: string;
  props?: PropEnEscena[];
  ventana?: boolean;
  luna?: boolean; // false: sin la luna que se pinta de noche
  // lugar "ocular" (la vista por el anteojo): qué se ve en el círculo
  vista?: "jupiter" | "luna" | "estrellas" | "via-lactea";
  lunas?: number[]; // jupiter: posiciones de las lunas en diámetros de Júpiter (negativo = este = izquierda)
  tamanos?: number[]; // jupiter: tamaño relativo de cada luna (1 por defecto)
  fase?: "creciente" | "menguante" | "gibosa"; // luna
};

export const CIELOS: Record<Hora, string[]> = {
  amanecer: ["#1f2547", "#7b4b6b", "#e88a5f", "#f6c98b"],
  dia: ["#3b7cc4", "#6fa8dc", "#a9d2f0", "#d9ecf7"],
  atardecer: ["#251a3d", "#6b2f5f", "#c4566b", "#f59a57"],
  noche: ["#03050e", "#0a1128", "#16223f", "#24304f"],
};
const LEJOS: Record<Hora, string[]> = {
  amanecer: ["#6a5577", "#4a3d5e", "#2e2640"],
  dia: ["#7c9db3", "#56788f", "#36505f"],
  atardecer: ["#6a3a5c", "#472545", "#2a1429"],
  noche: ["#1c2640", "#131a30", "#0b1020"],
};
// tinte que se aplica a los colores "de día" según la hora
const TINTE: Record<Hora, { c: string; o: number }> = {
  amanecer: { c: "#ff9a6b", o: 0.18 },
  dia: { c: "#ffffff", o: 0 },
  atardecer: { c: "#7a2f6b", o: 0.28 },
  noche: { c: "#0a1230", o: 0.55 },
};

const SUELOS: Partial<Record<Lugar, string>> = {
  mar: "#4d4a44", playa: "#d8bd8a", montanas: "#4f6b3e", hielo: "#e8f0f6", ciudad: "#5b5d63", futurista: "#2a2d3a",
  desierto: "#d2a062", valle: "#c99a62", marte: "#9a4a2a", campo: "#6f9a4a", bosque: "#3f5f32", espacio: "#3a3f4f", luna: "#9a9aa2", calle: "#7a6e62", selva: "#2f5a2a", rio: "#6b7a4a", trinchera: "#4a3b2a", isla: "#6d8a48",
};

const cresta = (s: string, y: number, amp: number, picos: number) => {
  let d = `M0 ${MH} L0 ${y}`;
  for (let i = 0; i <= picos; i++) d += ` L${(i / picos) * MW} ${y - random(`${s}-${i}`) * amp}`;
  return d + ` L${MW} ${MH} Z`;
};
const colinas = (y: number, amp: number, largo: number, fase: number) => {
  let d = `M0 ${MH} L0 ${y}`;
  for (let x = 0; x <= MW; x += 30) d += ` L${x} ${y - (Math.sin(x / largo + fase) * 0.5 + 0.5) * amp}`;
  return d + ` L${MW} ${MH} Z`;
};
const ola = (y: number, amp: number, largo: number, fase: number) => {
  let d = `M0 ${MH} L0 ${y}`;
  for (let x = 0; x <= MW; x += 24) d += ` L${x} ${y + Math.sin(x / largo + fase) * amp}`;
  return d + ` L${MW} ${MH} Z`;
};

const CIELOS_MARTE: Record<Hora, string[]> = {
  amanecer: ["#1a1420", "#4a3a4a", "#8a8aa0", "#b8c4d8"],
  dia: ["#8a6a4a", "#b88a5e", "#d6a97a", "#e8c49a"],
  atardecer: ["#120e18", "#2a2a44", "#3f5a8a", "#7fa6d6"],
  noche: ["#020203", "#06060a", "#0c0a10", "#141018"],
};

const Cielo: React.FC<{ hora: Hora; f: number; dur: number; espacio?: boolean; marte?: boolean; id: string; nublado?: boolean; sinLuna?: boolean }> = ({ hora, f, dur, espacio, marte, id, nublado, sinLuna }) => {
  const cielo = espacio ? ["#000", "#03040a", "#070b1a", "#0d1630"] : marte ? CIELOS_MARTE[hora] : CIELOS[hora];
  const estrellas = !nublado && (espacio || hora === "noche" || hora === "amanecer");
  const astro = !espacio && !nublado && !(sinLuna && hora === "noche");
  const prog = f / Math.max(1, dur);
  const ax = 520 + prog * 880;
  const ay = hora === "amanecer" ? 900 - prog * 120 : hora === "atardecer" ? 760 + prog * 120 : 600 - Math.sin(prog * Math.PI) * 40;
  return (
    <g>
      <defs>
        <linearGradient id={`cielo${id}`} x1="0" y1="0" x2="0" y2="1">
          {cielo.map((c, i) => <stop key={i} offset={`${20 + (i / (cielo.length - 1)) * 45}%`} stopColor={c} />)}
        </linearGradient>
        <radialGradient id={`halo${id}`}>
          <stop offset="0%" stopColor="#fff6d8" stopOpacity={0.55} />
          <stop offset="100%" stopColor="#fff6d8" stopOpacity={0} />
        </radialGradient>
      </defs>
      <rect width={MW} height={MH} fill={`url(#cielo${id})`} />
      {estrellas &&
        Array.from({ length: 140 }).map((_, i) => (
          <circle key={i} cx={random(`sx${i}`) * MW} cy={random(`sy${i}`) * HORIZONTE} r={1.2 + random(`sr${i}`) * 2.8} fill="#fff"
            opacity={(hora === "amanecer" && !espacio ? 0.25 : 0.85) * (0.55 + 0.45 * Math.sin(f / (5 + random(`st${i}`) * 9) + i))} />
        ))}
      {astro && (
        <g>
          <circle cx={ax} cy={ay} r={300} fill={`url(#halo${id})`} />
          <circle cx={ax} cy={ay} r={marte ? (hora === "noche" ? 22 : 58) : hora === "noche" ? 64 : 88} fill={marte ? (hora === "noche" ? "#d8c8b0" : hora === "atardecer" ? "#e6f0ff" : "#fff2dc") : hora === "noche" ? "#f1ecd8" : hora === "dia" ? "#fff8e0" : "#ffcf87"} />
          {hora === "noche" && !marte && [[-18, -14, 14], [20, 10, 10], [-4, 24, 8]].map(([dx, dy, r], k) => <circle key={k} cx={ax + dx} cy={ay + dy} r={r} fill="#d8d2bc" />)}
          {hora === "dia" && !marte &&
            [0, 1, 2].map((i) => {
              const x = ((random(`nx${i}`) * MW + f * (0.4 + i * 0.2)) % (MW + 600)) - 300;
              const y = 520 + i * 110;
              return (
                <g key={i} fill="#fff" opacity={0.85}>
                  <ellipse cx={x} cy={y} rx={150} ry={40} />
                  <ellipse cx={x + 60} cy={y - 30} rx={80} ry={45} />
                  <ellipse cx={x - 60} cy={y - 18} rx={70} ry={34} />
                </g>
              );
            })}
        </g>
      )}
      {nublado && <Encapotado hora={hora} f={f} id={id} />}
    </g>
  );
};

// Cielo encapotado sin lluvia (clima "nublado"): ni estrellas, ni luna, ni sol; nubes bajas que pasan despacio
const Encapotado: React.FC<{ hora: Hora; f: number; id: string }> = ({ hora, f, id }) => {
  const noche = hora === "noche";
  const base = noche ? "#0d1015" : hora === "dia" ? "#8d949b" : "#4a4450";
  const nube = noche ? ["#161a21", "#1c2129", "#12151b"] : hora === "dia" ? ["#a3a9ae", "#7e868d", "#969ca2"] : ["#5a5260", "#433d4a", "#504858"];
  return (
    <g>
      <rect width={MW} height={HORIZONTE + 60} fill={base} opacity={0.94} />
      {Array.from({ length: 16 }).map((_, i) => {
        const y = 380 + (i % 4) * 190 + random(`nb${i}${id}`) * 80;
        const x = ((random(`nx${i}${id}`) * (MW + 900) + f * (0.25 + (i % 3) * 0.12)) % (MW + 900)) - 450;
        return <ellipse key={i} cx={x} cy={y} rx={380 + random(`nr${i}`) * 260} ry={70 + random(`ns${i}`) * 50} fill={nube[i % 3]} opacity={0.9} />;
      })}
    </g>
  );
};

// ---------- La vista por el anteojo (lugar "ocular") ----------
type FaseLuna = "creciente" | "menguante" | "gibosa";
const PALETA_LUNA = {
  real: { oscuro: "#14161b", luz: "#ebe7db", mar: "#b9b4a8", crater: "#8d897f", punto: "#f4f1e6", borde: "none" },
  acuarela: { oscuro: "#6e5638", luz: "#f1e4c6", mar: "#cdb48c", crater: "#a68a62", punto: "#f6ead0", borde: "#5a4128" },
};
// Disco de la Luna con su fase: terminador irregular, cráteres junto a él y puntos de luz (cimas) en la parte oscura
export const DiscoLuna: React.FC<{ fase?: FaseLuna; r: number; id: string; estilo?: "real" | "acuarela" }> = ({ fase = "menguante", r: R, id, estilo = "real" }) => {
  const c = PALETA_LUNA[estilo];
  const lado = fase === "menguante" ? -1 : 1; // lado iluminado (+1 = derecha)
  const k = fase === "gibosa" ? -0.45 : fase === "creciente" ? 0.32 : 0.1; // abombado del terminador hacia la luz (+) o la sombra (-)
  const n = 26;
  const term = Array.from({ length: n + 1 }).map((_, i) => {
    const t = 1 - (2 * i) / n; // de abajo (1) a arriba (-1)
    const w = Math.sqrt(Math.max(0, 1 - t * t));
    const ruido = (random(`lt${i}${fase}`) - 0.5) * R * 0.09 * w + (i % 5 === 2 ? -lado * R * 0.05 * w : 0);
    return [lado * k * R * w + ruido, t * R] as [number, number];
  });
  const iluminada = `M0 ${-R} A${R} ${R} 0 0 ${lado > 0 ? 1 : 0} 0 ${R} ${term.map(([x, y]) => `L${x.toFixed(1)} ${y.toFixed(1)}`).join(" ")}Z`;
  return (
    <g>
      <defs>
        <clipPath id={`lz${id}`}><path d={iluminada} /></clipPath>
      </defs>
      <circle r={R} fill={c.oscuro} opacity={estilo === "acuarela" ? 0.55 : 1} />
      <path d={iluminada} fill={c.luz} />
      <g clipPath={`url(#lz${id})`}>
        {/* mares */}
        {[[0.35, -0.3, 0.28], [0.15, 0.2, 0.22], [0.55, 0.35, 0.18], [-0.1, -0.45, 0.16], [-0.3, 0.1, 0.2]].map(([x, y, rr], i) => (
          <ellipse key={i} cx={lado * x * R} cy={y * R} rx={rr * R} ry={rr * R * 0.8} fill={c.mar} opacity={0.75} />
        ))}
        {/* cráteres: más marcados junto al terminador */}
        {Array.from({ length: 22 }).map((_, i) => {
          const y = (random(`cy${i}`) * 1.7 - 0.85) * R;
          const w = Math.sqrt(Math.max(0, 1 - (y / R) ** 2));
          const x = lado * (k * w + 0.05 + random(`cx${i}`) * 0.5) * R;
          const rr = R * (0.025 + random(`cr${i}`) * 0.05);
          return (
            <g key={i}>
              <circle cx={x} cy={y} r={rr} fill={c.crater} opacity={0.7} />
              <circle cx={x + lado * rr * 0.3} cy={y} r={rr * 0.75} fill={c.luz} opacity={0.55} />
            </g>
          );
        })}
      </g>
      {/* cimas iluminadas en la parte oscura, más allá del terminador */}
      {Array.from({ length: 9 }).map((_, i) => {
        const j = 3 + Math.floor(random(`lp${i}`) * (n - 6));
        const [tx, ty] = term[j];
        const d = R * (0.03 + random(`ld${i}`) * 0.07);
        return <ellipse key={i} cx={tx - lado * d} cy={ty} rx={R * 0.012 + 1.5} ry={R * 0.02 + 2} fill={c.punto} opacity={0.9} />;
      })}
      {c.borde !== "none" && <circle r={R} fill="none" stroke={c.borde} strokeWidth={3} opacity={0.7} />}
    </g>
  );
};

const Ocular: React.FC<{ fondo: Fondo; f: number; dur: number; id: string }> = ({ fondo, f, dur, id }) => {
  const R = 470;
  // temblor del anteojo sujeto a mano
  const tx = Math.sin(f / 7) * 3 + Math.sin(f / 2.3) * 1.6;
  const ty = Math.cos(f / 6) * 2.5 + Math.sin(f / 3.1) * 1.4;
  const vista = fondo.vista ?? "estrellas";
  const p = Math.min(1, f / Math.max(1, dur * 0.6));
  const estrellas = (n: number, semilla: string, op: number) =>
    Array.from({ length: n }).map((_, i) => {
      const r = 1.3 + Math.pow(random(`${semilla}r${i}`), 3) * 4.2;
      return <circle key={i} cx={(random(`${semilla}x${i}`) * 2 - 1) * R} cy={(random(`${semilla}y${i}`) * 2 - 1) * R} r={r} fill="#fff"
        opacity={op * (0.35 + 0.65 * random(`${semilla}o${i}`)) * (0.8 + 0.2 * Math.sin(f / (4 + random(`${semilla}t${i}`) * 6) + i))} />;
    });
  let campo: React.ReactNode = null;
  if (vista === "jupiter") {
    const D = 48; // diámetro de Júpiter en pantalla: la unidad de las posiciones de las lunas
    campo = (
      <g>
        {estrellas(14, "oj", 0.5)}
        <circle r={D * 1.4} fill="#fff6dc" opacity={0.08} />
        <circle r={D / 2} fill="#f6f1e2" />
        {(fondo.lunas ?? []).map((x, i) => {
          const t = (fondo.tamanos ?? [])[i] ?? 1;
          return (
            <g key={i}>
              <circle cx={x * D} cy={0} r={11 * t} fill="#fff" opacity={0.18} />
              <circle cx={x * D} cy={0} r={5 * t} fill="#fff" />
            </g>
          );
        })}
      </g>
    );
  } else if (vista === "luna") {
    campo = <g transform="rotate(-12)"><DiscoLuna fase={fondo.fase} r={400} id={`oc${id}`} /></g>;
  } else if (vista === "via-lactea") {
    // la franja lechosa se va resolviendo en estrellas mientras se mira
    campo = (
      <g>
        <defs>
          <filter id={`vl${id}`} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation={45} /></filter>
        </defs>
        {estrellas(60, "ov", 0.6)}
        <g transform="rotate(-28)">
          <g filter={`url(#vl${id})`} opacity={0.6 - 0.35 * p}>
            <ellipse rx={R * 1.4} ry={150} fill="#d8dcf0" />
            <ellipse cx={-120} cy={30} rx={R} ry={80} fill="#eef0ff" />
          </g>
          {Array.from({ length: 520 }).map((_, i) => {
            const y = (random(`vy${i}`) + random(`vz${i}`) + random(`vw${i}`) - 1.5) * 190;
            return <circle key={i} cx={(random(`vx${i}`) * 2 - 1) * R * 1.3} cy={y} r={0.8 + random(`vr${i}`) * 1.8} fill="#fff" opacity={(0.25 + 0.7 * p) * (0.4 + 0.6 * random(`vo${i}`))} />;
          })}
        </g>
      </g>
    );
  } else {
    campo = <g>{estrellas(320, "oe", 1)}</g>;
  }
  return (
    <g>
      <rect width={MW} height={MH} fill="#000" />
      <defs>
        <clipPath id={`ocv${id}`}><circle cx={960 + tx * 0.3} cy={960 + ty * 0.3} r={R} /></clipPath>
        <radialGradient id={`ocb${id}`}>
          <stop offset="0.74" stopColor="#000" stopOpacity={0} />
          <stop offset="0.92" stopColor="#000" stopOpacity={0.65} />
          <stop offset="1" stopColor="#000" stopOpacity={1} />
        </radialGradient>
      </defs>
      <g clipPath={`url(#ocv${id})`}>
        <rect width={MW} height={MH} fill="#070a12" />
        <g transform={`translate(${960 + tx} ${960 + ty})`}>{campo}</g>
        <circle cx={960 + tx * 0.3} cy={960 + ty * 0.3} r={R + 2} fill={`url(#ocb${id})`} />
      </g>
    </g>
  );
};

const Exterior: React.FC<{ fondo: Fondo; hora: Hora; f: number; id: string; cam?: Cam; medios?: React.ReactNode; bahia?: boolean }> = ({ fondo, hora, f, id, cam, medios, bahia }) => {
  const c = LEJOS[hora];
  const lugar = fondo.lugar;
  const suelo = SUELOS[lugar] ?? "#555";
  const deriva = f * 0.35;
  let lejos: React.ReactNode = null;
  switch (lugar) {
    case "mar":
    case "playa":
      lejos = (
        <g>
          <path d={ola(HORIZONTE, 6, 70, f / 14)} fill={hora === "dia" ? "#3f78a8" : c[0]} />
          <path d={ola(HORIZONTE + 70, 10, 90, f / 11 + 1)} fill={hora === "dia" ? "#2f6592" : c[1]} />
          <path d={ola(HORIZONTE + 140, 14, 110, f / 9 + 2)} fill={hora === "dia" ? "#24547c" : c[2]} />
          {lugar === "playa" &&
            [0, 1].map((i) => <path key={i} d={ola(SUELO - 40 + i * 14, 6, 60, f / 8 + i)} fill="#ffffff" opacity={0.35 - i * 0.15} />)}
        </g>
      );
      break;
    case "montanas":
    case "hielo":
      lejos = (
        <g>
          <path d={cresta(`m1${id}`, HORIZONTE - 60, 420, 8)} fill={lugar === "hielo" ? "#c9d8e6" : c[0]} transform={`translate(${-deriva * 0.2} 0)`} />
          {!bahia && <path d={cresta(`m2${id}`, HORIZONTE + 80, 300, 11)} fill={lugar === "hielo" ? "#9fb6cc" : c[1]} transform={`translate(${-deriva * 0.4} 0)`} />}
        </g>
      );
      break;
    case "ciudad":
    case "futurista": {
      const fut = lugar === "futurista";
      const noche = hora === "noche" || hora === "atardecer";
      lejos = (
        <g>
          {[0, 1].map((capa) =>
            Array.from({ length: capa === 0 ? 16 : 11 }).map((_, i) => {
              const n = capa === 0 ? 16 : 11;
              const w = MW / n;
              const h = 160 + random(`e${capa}-${i}-${id}`) * (fut ? 760 : 380);
              const base = capa === 0 ? HORIZONTE + 40 : HORIZONTE + 170;
              const x = i * w - ((deriva * (0.15 + capa * 0.2)) % w);
              return (
                <g key={`${capa}-${i}`}>
                  <rect x={x} y={base - h} width={w - 10} height={h + 400} fill={c[capa]} />
                  {fut && <rect x={x + w / 2 - 6} y={base - h - 60} width={8} height={60} fill={c[capa]} />}
                  {capa === 1 &&
                    Array.from({ length: Math.floor(h / 64) }).map((__, j) =>
                      random(`v${i}${j}${id}`) > (noche ? 0.4 : 0.7) ? (
                        <rect key={j} x={x + 20} y={base - h + 34 + j * 64} width={w - 50} height={16}
                          fill={fut ? "#5ef2ff" : noche ? "#ffd27a" : "#b8d4e6"} opacity={noche ? 0.8 : 0.5} />
                      ) : null,
                    )}
                </g>
              );
            }),
          )}
          {fut &&
            Array.from({ length: 9 }).map((_, i) => {
              const y = 500 + random(`n${i}`) * 450;
              const x = ((f * (4 + random(`vx${i}`) * 7) + random(`x${i}`) * MW) % (MW + 200)) - 100;
              return (
                <g key={i}>
                  <ellipse cx={x} cy={y} rx={30} ry={9} fill="#5ef2ff" opacity={0.9} />
                  <rect x={x - 120} y={y - 2} width={90} height={4} fill="#5ef2ff" opacity={0.3} />
                </g>
              );
            })}
        </g>
      );
      break;
    }
    case "calle":
      lejos = (
        <g>
          {Array.from({ length: 7 }).map((_, i) => {
            const w = 300;
            const x = i * 290 - 40;
            const h = 420 + random(`cs${i}${id}`) * 200;
            const col = ["#b9876a", "#d6c1a0", "#a7735a", "#c9b18f", "#8f6a55"][i % 5];
            const noche = hora === "noche" || hora === "atardecer";
            return (
              <g key={i}>
                <rect x={x} y={SUELO - 40 - h} width={w} height={h} fill={col} stroke="#00000033" strokeWidth={6} />
                <polygon points={`${x - 20},${SUELO - 40 - h} ${x + w / 2},${SUELO - 40 - h - 110} ${x + w + 20},${SUELO - 40 - h}`} fill="#6b3a2a" />
                {[0, 1].map((r) =>
                  [0, 1].map((k) => (
                    <rect key={`${r}${k}`} x={x + 50 + k * 130} y={SUELO - h + r * 160} width={70} height={100}
                      fill={noche && random(`w${i}${r}${k}`) > 0.4 ? "#ffd27a" : "#3d4a5a"} stroke="#4a3426" strokeWidth={8} />
                  )),
                )}
                <rect x={x + 115} y={SUELO - 200} width={70} height={160} fill="#4a3426" />
              </g>
            );
          })}
        </g>
      );
      break;
    case "desierto":
      lejos = (
        <g>
          <path d={colinas(HORIZONTE, 160, 260, 0.5 - deriva / 900)} fill={hora === "noche" ? c[0] : "#d9a16a"} />
          <path d={colinas(HORIZONTE + 120, 140, 340, 2 - deriva / 600)} fill={hora === "noche" ? c[1] : "#c08850"} />
        </g>
      );
      break;
    case "valle":
      // acantilados de caliza del Valle de los Reyes
      lejos = (
        <g>
          <path d={cresta(`v1${id}`, HORIZONTE - 280, 260, 9)} fill={hora === "noche" ? c[0] : "#d8a670"} transform={`translate(${-deriva * 0.15} 0)`} />
          <path d={cresta(`v2${id}`, HORIZONTE - 60, 200, 13)} fill={hora === "noche" ? c[1] : "#bf8a52"} transform={`translate(${-deriva * 0.3} 0)`} />
          {Array.from({ length: 12 }).map((_, i) => (
            <rect key={i} x={i * 170 + 30} y={HORIZONTE - 160 + random(`vr${i}`) * 120} width={8} height={120 + random(`vh${i}`) * 100} fill="#00000018" />
          ))}
          <path d={colinas(HORIZONTE + 120, 70, 300, 2)} fill={hora === "noche" ? c[2] : "#d7ad78"} />
        </g>
      );
      break;
    case "marte":
      lejos = (
        <g>
          {hora === "noche" && <circle cx={1500} cy={520} r={5} fill="#7fb8ff" />}
          {hora === "noche" && <text x={1515} y={510} fontSize={26} fill="#9fc8ff" opacity={0.8}>Tierra</text>}
          <path d={cresta(`mt1${id}`, HORIZONTE - 90, 220, 10)} fill={hora === "noche" ? "#1a0e0a" : "#a8644a"} transform={`translate(${-deriva * 0.12} 0)`} />
          <path d={colinas(HORIZONTE + 60, 120, 260, 1.5 - deriva / 900)} fill={hora === "noche" ? "#24120c" : "#8e4a30"} />
          {Array.from({ length: 14 }).map((_, i) => (
            <ellipse key={i} cx={random(`mr${i}`) * MW} cy={SUELO + 40 + random(`my${i}`) * 420} rx={20 + random(`ms${i}`) * 60} ry={10 + random(`ms${i}`) * 18} fill="#5a2a18" />
          ))}
        </g>
      );
      break;
    case "rio": {
      // agua tranquila con la otra orilla al fondo; reflejos que se mueven
      const agua = hora === "dia" ? ["#5a8aa8", "#4a7a98", "#3d6a88"] : hora === "noche" ? ["#0f1a30", "#0c1528", "#0a1122"] : ["#6a5a7a", "#5a4a6a", "#4a3a5a"];
      lejos = (
        <g>
          <path d={colinas(HORIZONTE - 40, 90, 300, 0.7 - deriva / 900)} fill={hora === "dia" ? "#7a9a6a" : c[0]} />
          <rect x={0} y={HORIZONTE - 10} width={MW} height={30} fill={hora === "dia" ? "#6a8a5a" : c[1]} />
          <rect x={0} y={HORIZONTE + 20} width={MW} height={SUELO - HORIZONTE - 20} fill={agua[0]} />
          {[0, 1, 2].map((i) => <path key={i} d={ola(HORIZONTE + 60 + i * 50, 3 + i, 80 + i * 20, f / (16 - i * 3) + i)} fill={agua[i]} opacity={0.8} />)}
          {Array.from({ length: 18 }).map((_, i) => {
            const x = ((random(`rx${i}${id}`) * MW + f * (0.6 + random(`rv${i}`) * 0.8)) % (MW + 200)) - 100;
            const y = HORIZONTE + 50 + random(`ry${i}${id}`) * (SUELO - HORIZONTE - 90);
            return <rect key={i} x={x} y={y} width={40 + random(`rw${i}`) * 80} height={4} rx={2} fill="#ffffff" opacity={0.12 + 0.12 * Math.sin(f / 12 + i)} />;
          })}
        </g>
      );
      break;
    }
    case "isla": {
      // cima de una isla atlántica: mar gris hasta el horizonte, islotes lejanos y espuma; ni árboles ni borda
      const gris = hora === "dia" ? ["#7b8a94", "#6a7a85", "#5b6b76"] : c;
      lejos = (
        <g>
          <path d={ola(HORIZONTE, 4, 70, f / 16)} fill={gris[0]} />
          {[[-0.15, 70, 26], [0.12, 40, 18], [0.78, 90, 30], [0.9, 36, 14]].map(([x, w, h], i) => (
            <path key={i} d={`M${x * MW - w} ${HORIZONTE + 4} L${x * MW - w * 0.5} ${HORIZONTE - h} L${x * MW + w * 0.4} ${HORIZONTE - h * 0.8} L${x * MW + w} ${HORIZONTE + 4}Z`} fill={hora === "dia" ? "#56636b" : c[1]} />
          ))}
          <path d={ola(HORIZONTE + 40, 6, 90, f / 12 + 1)} fill={gris[1]} />
          <path d={ola(HORIZONTE + 95, 9, 110, f / 10 + 2)} fill={gris[2]} />
          {Array.from({ length: 22 }).map((_, i) => {
            const t = ((f / 70 + random(`ib${i}${id}`)) % 1);
            const x = random(`ix${i}${id}`) * MW + f * 0.4;
            const y = HORIZONTE + 20 + random(`iy${i}${id}`) * 150;
            return <rect key={i} x={(x % (MW + 100)) - 50} y={y} width={30 + (y - HORIZONTE) * 0.3} height={3 + (y - HORIZONTE) * 0.02} rx={2} fill="#fff" opacity={0.5 * Math.sin(t * Math.PI)} />;
          })}
        </g>
      );
      break;
    }
    case "campo":
      lejos = (
        <g>
          <path d={colinas(HORIZONTE, 120, 240, 1 - deriva / 900)} fill={hora === "dia" ? "#8fb36a" : c[0]} />
          {!bahia && <path d={colinas(HORIZONTE + 110, 130, 320, 3 - deriva / 600)} fill={hora === "dia" ? "#79a056" : c[1]} />}
        </g>
      );
      break;
    case "trinchera":
      lejos = <path d={colinas(HORIZONTE, 60, 300, 2)} fill={hora === "dia" ? "#6f6a55" : c[0]} />;
      break;
    case "bosque":
    case "selva":
      lejos = (
        <g>
          {[0, 1].map((capa) =>
            Array.from({ length: capa === 0 ? 20 : 14 }).map((_, i) => {
              const n = capa === 0 ? 20 : 14;
              const x = (i / n) * (MW + 200) - 100 - ((deriva * (0.15 + capa * 0.2)) % ((MW + 200) / n));
              const base = capa === 0 ? HORIZONTE + 60 : SUELO - 10;
              const h = (capa === 0 ? 380 : 520) * (0.7 + random(`a${capa}${i}${id}`) * 0.6);
              const col = hora === "dia" ? (capa === 0 ? (lugar === "selva" ? "#3f7a3a" : "#4f7a52") : lugar === "selva" ? "#2d5e2a" : "#355c3a") : c[capa];
              return lugar === "selva" ? (
                <g key={`${capa}${i}`} fill={col}>
                  <rect x={x - 12} y={base - h} width={24} height={h} />
                  <circle cx={x} cy={base - h} r={110} />
                  <circle cx={x - 80} cy={base - h + 50} r={80} />
                  <circle cx={x + 80} cy={base - h + 50} r={80} />
                </g>
              ) : (
                <polygon key={`${capa}${i}`} points={`${x},${base - h} ${x - h * 0.27},${base} ${x + h * 0.27},${base}`} fill={col} />
              );
            }),
          )}
        </g>
      );
      break;
    case "espacio":
      lejos = (
        <g>
          <circle cx={MW / 2} cy={SUELO + 2200} r={2500} fill="#1d3b6e" />
          <circle cx={MW / 2} cy={SUELO + 2200} r={2500} fill="none" stroke="#7fc8ff" strokeWidth={14} opacity={0.5} />
          <circle cx={1500} cy={620} r={80} fill="#c9b8a6" />
        </g>
      );
      break;
    case "luna":
      lejos = (
        <g>
          <circle cx={1400} cy={600} r={110} fill="#3d7fd1" />
          <path d="M1330 560 q40 -30 80 10 q30 40 -20 60z" fill="#4fa35a" />
          <path d={colinas(HORIZONTE + 60, 120, 300, 1)} fill="#6d6d75" />
        </g>
      );
      break;
  }
  const tinte = TINTE[hora];
  // bahía: con barcos en el campo o en el monte, el agua llega hasta la orilla de delante (vista desde una colina)
  const agua = hora === "dia" ? ["#4f86a8", "#457a9a"] : [c[1], c[2]];
  return (
    <g>
      <g transform={paralaje(cam, 0.35)}>{lejos}{bahia && (
        <g>
          <rect x={0} y={HORIZONTE - 4} width={MW} height={SUELO - HORIZONTE} fill={agua[0]} />
          <path d={ola(HORIZONTE + 70, 4, 90, f / 14)} fill={agua[1]} opacity={0.8} />
        </g>
      )}</g>
      <g transform={paralaje(cam, 0.15)}>{medios}</g>
      {/* suelo en primer plano */}
      <path d={`M0 ${SUELO - 30} Q${MW / 2} ${SUELO - 60} ${MW} ${SUELO - 30} L${MW} ${MH} L0 ${MH}Z`} fill={suelo} />
      {lugar === "trinchera" && <MuroTrinchera hora={hora} f={f} id={id} />}
      {lugar === "isla" && (
        // borde del acantilado: labio de roca entre la hierba y el mar, con matas de clavellina
        <g>
          <path d={`M0 ${SUELO - 30} Q${MW / 2} ${SUELO - 60} ${MW} ${SUELO - 30} L${MW} ${SUELO - 18} Q${MW / 2} ${SUELO - 46} 0 ${SUELO - 18}Z`} fill={oscurecer(suelo, 0.3)} />
          {Array.from({ length: 12 }).map((_, i) => {
            const x = 60 + i * 165 + random(`il${i}${id}`) * 60;
            const y = SUELO - 30 - Math.sin((x / MW) * Math.PI) * 26;
            return random(`im${i}${id}`) > 0.5
              ? <path key={i} d={`M${x - 40} ${y + 6} Q${x - 20} ${y - 22} ${x + 10} ${y - 18} Q${x + 40} ${y - 10} ${x + 46} ${y + 6}Z`} fill={hora === "dia" ? "#7d7a74" : oscurecer(c[1], 0.1)} />
              : <circle key={i} cx={x} cy={y - 4} r={9} fill={hora === "dia" ? "#e3a6b8" : "#6a5560"} />;
          })}
        </g>
      )}
      {lugar === "mar" && (
        // borda de nuestro barco: la franja gris es la cubierta, no tierra
        <g>
          <rect x={0} y={SUELO - 150} width={MW} height={18} rx={6} fill="#5a4030" />
          {Array.from({ length: 25 }).map((_, i) => <rect key={i} x={i * 80 + 10} y={SUELO - 140} width={14} height={110} fill="#4a3424" />)}
          <rect x={0} y={SUELO - 50} width={MW} height={22} fill="#4a3424" />
        </g>
      )}
      {lugar === "calle" &&
        Array.from({ length: 60 }).map((_, i) => (
          <rect key={i} x={(i % 15) * 130 + (Math.floor(i / 15) % 2) * 65} y={SUELO - 10 + Math.floor(i / 15) * 60} width={118} height={50} rx={14} fill={oscurecer(suelo, 0.12)} />
        ))}
      {(lugar === "campo" || lugar === "bosque" || lugar === "selva" || lugar === "montanas" || lugar === "isla") &&
        Array.from({ length: 40 }).map((_, i) => (
          <path key={i} d={`M${random(`gx${i}`) * MW} ${SUELO + random(`gy${i}`) * 500} l8 -30 l8 30`} fill={oscurecer(suelo, 0.2)} />
        ))}
      {(lugar === "luna" || lugar === "espacio") &&
        Array.from({ length: 10 }).map((_, i) => (
          <ellipse key={i} cx={random(`cx${i}`) * MW} cy={SUELO + 60 + random(`cy${i}`) * 400} rx={60 + random(`cr${i}`) * 80} ry={18} fill={oscurecer(suelo, 0.2)} />
        ))}
      <defs>
        <linearGradient id={`tinte${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.42" stopColor={tinte.c} stopOpacity={0} />
          <stop offset="0.6" stopColor={tinte.c} stopOpacity={1} />
        </linearGradient>
      </defs>
      <rect width={MW} height={MH} fill={`url(#tinte${id})`} opacity={tinte.o} style={{ mixBlendMode: "multiply" }} />
    </g>
  );
};

const PAREDES: Record<string, string> = { jeroglificos: "#d9c49a", piedra: "#8a8178", madera: "#8a5a3a", ladrillo: "#9a4f3a", metal: "#5d6673", papel: "#d9cdb2", tela: "#7a5a7a", roca: "#5a4e44", megalito: "#1b1917" };

const Interior: React.FC<{ fondo: Fondo; hora: Hora; f: number; id: string }> = ({ fondo, hora, f, id }) => {
  const tipo = fondo.pared ?? "madera";
  const col = fondo.colorPared ?? PAREDES[tipo];
  const noche = hora === "noche" || hora === "atardecer";
  const ventana = fondo.ventana ?? !(tipo === "roca" || tipo === "jeroglificos" || tipo === "megalito");
  return (
    <g>
      <rect width={MW} height={SUELO} fill={col} />
      {tipo === "piedra" &&
        Array.from({ length: 70 }).map((_, i) => (
          <rect key={i} x={(i % 10) * 200 + (Math.floor(i / 10) % 2) * 100 - 50} y={200 + Math.floor(i / 10) * 160} width={186} height={146} rx={22} fill={oscurecer(col, 0.08 + random(`p${i}`) * 0.12)} />
        ))}
      {tipo === "ladrillo" &&
        Array.from({ length: 160 }).map((_, i) => (
          <rect key={i} x={(i % 16) * 125 + (Math.floor(i / 16) % 2) * 62 - 40} y={200 + Math.floor(i / 16) * 70} width={115} height={60} fill={oscurecer(col, 0.05 + random(`l${i}`) * 0.15)} />
        ))}
      {tipo === "jeroglificos" &&
        Array.from({ length: 5 }).map((_, fila) => (
          <g key={fila}>
            <rect x={0} y={260 + fila * 190} width={MW} height={6} fill="#8a6a3a" opacity={0.5} />
            {Array.from({ length: 22 }).map((__, i) => {
              const t = Math.floor(random(`jg${fila}-${i}`) * 6);
              const x = 40 + i * 88;
              const y = 290 + fila * 190;
              const col = ["#3a5a8a", "#8a3a2a", "#2a6a5a", "#3a2a1a"][Math.floor(random(`jc${fila}${i}`) * 4)];
              return (
                <g key={i} fill={col} stroke={col} strokeWidth={5} transform={`translate(${x} ${y})`}>
                  {t === 0 && <ellipse cx={30} cy={60} rx={26} ry={16} fill="none" />}
                  {t === 0 && <circle cx={30} cy={60} r={7} />}
                  {t === 1 && <path d="M10 120 L30 20 L50 120" fill="none" />}
                  {t === 2 && <path d="M8 100 q20 -80 44 -40 q-10 30 -40 30" fill="none" />}
                  {t === 3 && <rect x={14} y={40} width={34} height={70} fill="none" />}
                  {t === 4 && <path d="M8 70 h46 M30 30 v80" fill="none" />}
                  {t === 5 && <circle cx={30} cy={60} r={22} fill="none" />}
                </g>
              );
            })}
          </g>
        ))}
      {tipo === "megalito" && <Megalito id={id} />}
      {tipo === "madera" && Array.from({ length: 16 }).map((_, i) => <rect key={i} x={i * 122} y={0} width={6} height={SUELO} fill={oscurecer(col, 0.25)} />)}
      {tipo === "metal" &&
        Array.from({ length: 8 }).map((_, i) => (
          <g key={i}>
            <rect x={i * 245} y={260} width={235} height={SUELO - 300} fill={oscurecer(col, 0.08)} rx={10} />
            <rect x={i * 245 + 20} y={SUELO - 140} width={195} height={10} fill="#5ef2ff" opacity={0.3 + 0.2 * Math.sin(f / 10 + i)} />
          </g>
        ))}
      {tipo === "tela" && Array.from({ length: 20 }).map((_, i) => <path key={i} d={`M${i * 100} 0 Q${i * 100 + 50} ${SUELO / 2} ${i * 100} ${SUELO}`} stroke={oscurecer(col, 0.2)} strokeWidth={8} fill="none" />)}
      {ventana && (
        <g>
          <defs>
            <linearGradient id={`vent${id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={CIELOS[hora][0]} />
              <stop offset="100%" stopColor={CIELOS[hora][3]} />
            </linearGradient>
          </defs>
          <rect x={720} y={500} width={480} height={460} rx={tipo === "metal" ? 220 : 8} fill={`url(#vent${id})`} />
          {noche && Array.from({ length: 12 }).map((_, i) => <circle key={i} cx={740 + random(`ws${i}`) * 440} cy={520 + random(`wy${i}`) * 300} r={2.5} fill="#fff" />)}
          {tipo === "metal" ? (
            <rect x={720} y={500} width={480} height={460} rx={220} fill="none" stroke="#3a414b" strokeWidth={30} />
          ) : (
            <g stroke="#4a3426" strokeWidth={24} fill="none">
              <rect x={720} y={500} width={480} height={460} />
              <line x1={960} y1={500} x2={960} y2={960} />
              <line x1={720} y1={730} x2={1200} y2={730} />
            </g>
          )}
        </g>
      )}
      <rect x={0} y={SUELO - 50} width={MW} height={40} fill={oscurecer(col, 0.35)} />
      <rect x={0} y={SUELO - 10} width={MW} height={MH} fill={tipo === "metal" ? "#2b3038" : tipo === "megalito" ? "#2f2c29" : tipo === "piedra" || tipo === "roca" ? "#4a443e" : tipo === "jeroglificos" ? "#8a6a42" : "#5a3d28"} />
      {Array.from({ length: 10 }).map((_, i) => (
        <line key={i} x1={i * 200} y1={SUELO} x2={i * 200 - 300} y2={MH} stroke="#00000022" strokeWidth={6} />
      ))}
      {noche && <rect width={MW} height={MH} fill="#0a1230" opacity={0.35} style={{ mixBlendMode: "multiply" }} />}
    </g>
  );
};

// Cámara de una tumba megalítica (Newgrange): losas verticales de piedra gris con espirales, rombos y zigzags
// grabados, y encima la falsa bóveda de losas en saledizo que se cierran hacia arriba
const Megalito: React.FC<{ id: string }> = ({ id }) => {
  const TOPE = SUELO - 600;
  const grises = ["#57534e", "#4e4a46", "#5f5a54", "#524e49"];
  const surco = "#837d74";
  return (
    <g>
      {/* falsa bóveda: hiladas de losas que avanzan hacia el centro */}
      {Array.from({ length: 10 }).map((_, k) => {
        const y = TOPE - k * 84;
        const dentro = 230 + k * 74;
        return (
          <g key={k}>
            {[-1, 1].map((s) => {
              const x0 = s < 0 ? -40 : MW + 40;
              const x1 = s < 0 ? dentro + random(`mb${k}${s}`) * 30 : MW - dentro - random(`mb${k}${s}`) * 30;
              return (
                <g key={s}>
                  <polygon points={`${x0},${y} ${x1},${y} ${x1 - s * 12},${y - 82} ${x0},${y - 82}`} fill={grises[(k + (s > 0 ? 1 : 0)) % 4]} />
                  <rect x={Math.min(x0, x1)} y={y - 12} width={Math.abs(x1 - x0)} height={12} fill="#000" opacity={0.35} />
                  {[1, 2, 3].map((j) => {
                    const xj = x0 + (x1 - x0) * (j / 4 + (random(`mj${k}${s}${j}`) - 0.5) * 0.1);
                    return <rect key={j} x={xj - 3} y={y - 82} width={6} height={82} fill="#000" opacity={0.3} />;
                  })}
                </g>
              );
            })}
          </g>
        );
      })}
      {/* ortostatos */}
      {Array.from({ length: 10 }).map((_, i) => {
        const x0 = -60 + i * 208 + random(`mo${i}`) * 20;
        const w = 186 + random(`mw${i}`) * 30;
        const h = 500 + random(`mh${i}`) * 120;
        const base = SUELO - 40;
        const top = base - h;
        const c = grises[i % 4];
        const cx = x0 + w / 2;
        const cy = top + h * 0.42;
        const motivo = [0, 1, 3, 2, -1, 0, 3, 1, 2, -1][i];
        return (
          <g key={i}>
            <path d={`M${x0} ${base} L${x0 - 6} ${top + 40} Q${x0 + 10} ${top - 6 + random(`mt${i}`) * 20} ${cx} ${top - random(`mu${i}`) * 24} Q${x0 + w - 10} ${top + 4} ${x0 + w + 4} ${top + 50} L${x0 + w} ${base}Z`} fill={c} />
            <path d={`M${x0 + w - 26} ${top + 40} L${x0 + w + 4} ${top + 50} L${x0 + w} ${base} L${x0 + w - 30} ${base}Z`} fill="#000" opacity={0.22} />
            <path d={`M${x0} ${base} L${x0 - 6} ${top + 40} L${x0 + 14} ${top + 34} L${x0 + 18} ${base}Z`} fill="#fff" opacity={0.06} />
            <g stroke={surco} strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={0.75}>
              {motivo === 0 && (
                <g>
                  <path d={espiral(cx - 42, cy - 30, 44, 2.2, 1)} />
                  <path d={espiral(cx + 44, cy - 30, 44, 2.2, -1, Math.PI)} />
                  <path d={espiral(cx, cy + 50, 44, 2.2, 1, Math.PI / 2)} />
                </g>
              )}
              {motivo === 1 && (
                <g>
                  <path d={rombos(cx - 70, cy - 110, 140, 70, 2)} />
                  <path d={rombos(cx - 70, cy - 40, 140, 70, 2)} />
                  <path d={rombos(cx - 70, cy + 30, 140, 70, 2)} />
                </g>
              )}
              {motivo === 2 && [0, 1, 2, 3].map((r) => <circle key={r} cx={cx} cy={cy} r={18 + r * 22} />)}
              {motivo === 3 && <path d={Array.from({ length: 5 }).map((_, z) => `M${cx - 70} ${cy - 100 + z * 50} l35 -26 l35 26 l35 -26 l35 26`).join(" ")} />}
            </g>
          </g>
        );
      })}
      <defs>
        <radialGradient id={`vig${id}`} cx="0.5" cy="0.62" r="0.62">
          <stop offset="0.45" stopColor="#000" stopOpacity={0} />
          <stop offset="1" stopColor="#000" stopOpacity={0.7} />
        </radialGradient>
      </defs>
      <rect width={MW} height={SUELO} fill={`url(#vig${id})`} />
    </g>
  );
};

const Particulas: React.FC<{ clima: Clima; f: number }> = ({ clima, f }) => {
  if (clima === "despejado" || clima === "nublado") return null;
  if (clima === "niebla")
    return (
      <g>
        {[0, 1, 2, 3, 4].map((i) => (
          <ellipse key={i} cx={((f * (1.2 + i * 0.4) + i * 500) % (MW + 1400)) - 700} cy={HORIZONTE - 80 + i * 110} rx={800} ry={110} fill="#e8eef5" opacity={0.14} />
        ))}
      </g>
    );
  const agua = clima === "lluvia" || clima === "tormenta";
  const n = agua ? 160 : 100;
  return (
    <g>
      {Array.from({ length: n }).map((_, i) => {
        const vx = clima === "polvo" ? 3 + random(`px${i}`) * 4 : agua ? -7 : Math.sin(f / 30 + i) * 1;
        const vy = agua ? 44 + random(`vy${i}`) * 14 : clima === "polvo" ? Math.sin(f / 20 + i) * 0.8 : 2.5 + random(`vy${i}`) * 3.5;
        const x = (((random(`x${i}`) * MW + f * vx) % MW) + MW) % MW;
        const y = (((random(`y${i}`) * MH + f * vy) % MH) + MH) % MH;
        if (agua) return <line key={i} x1={x} y1={y} x2={x - 7} y2={y + 50} stroke="#cfe3ff" strokeWidth={3} opacity={0.45} />;
        const r = clima === "nieve" ? 4 + random(`r${i}`) * 7 : 2 + random(`r${i}`) * 4;
        return <circle key={i} cx={x} cy={y} r={r} fill={clima === "nieve" ? "#fff" : clima === "ceniza" ? "#9a9a9a" : "#f0c78a"} opacity={clima === "nieve" ? 0.85 : 0.55} />;
      })}
      {clima === "tormenta" && (f % 96 === 50 || f % 96 === 53) && <rect width={MW} height={MH} fill="#fff" opacity={0.5} />}
    </g>
  );
};

// Trinchera de 1914-1918: pared de tierra entibada con tablas, parapeto de sacos a la altura de los ojos,
// alambre de espino recortado contra el cielo y fondo de barro con tablones (el agua va en la capa de frente)
const MuroTrinchera: React.FC<{ hora: Hora; f: number; id: string }> = ({ hora, f, id }) => {
  const tierra = hora === "dia" ? "#5e4a33" : "#3e3123";
  const tabla = hora === "dia" ? "#7a6142" : "#4f3f2c";
  const saco = ["#a8916a", "#9a8460", "#8c7755"];
  const TOPE = SUELO - 520; // borde del parapeto: a la altura de los ojos de un soldado
  return (
    <g>
      {/* alambre de espino sobre el parapeto */}
      {Array.from({ length: 9 }).map((_, i) => {
        const x = 60 + i * 230 + random(`ap${i}${id}`) * 60;
        return <path key={i} d={`M${x} ${TOPE - 30} L${x + 14} ${TOPE - 190} M${x - 30} ${TOPE - 150} l70 -10`} stroke="#2b2620" strokeWidth={9} strokeLinecap="round" />;
      })}
      {[0, 1].map((h) => (
        <path key={h} d={Array.from({ length: 40 }).map((_, i) => `${i ? "L" : "M"}${i * 50} ${TOPE - 120 - h * 50 + Math.sin(i * 1.7 + h) * 14}`).join(" ")} stroke="#2b2620" strokeWidth={3} fill="none" opacity={0.85} />
      ))}
      {Array.from({ length: 70 }).map((_, i) => (
        <path key={i} d={`M${(i * 29) % MW} ${TOPE - 130 - (i % 2) * 50} l8 -10 m-8 0 l8 10`} stroke="#2b2620" strokeWidth={3} />
      ))}
      {/* pared de tierra con entibado de tablas */}
      <rect x={0} y={TOPE} width={MW} height={SUELO - TOPE + 10} fill={tierra} />
      {Array.from({ length: 5 }).map((_, i) => (
        <rect key={i} x={0} y={TOPE + 150 + i * 70} width={MW} height={56} fill={tabla} opacity={0.9} />
      ))}
      {Array.from({ length: 9 }).map((_, i) => (
        <rect key={i} x={40 + i * 235} y={TOPE + 100} width={26} height={SUELO - TOPE - 90} fill={oscurecer(tabla, 0.3)} />
      ))}
      {Array.from({ length: 14 }).map((_, i) => (
        <ellipse key={i} cx={random(`bm${i}${id}`) * MW} cy={TOPE + 160 + random(`bn${i}${id}`) * 330} rx={30 + random(`bo${i}`) * 50} ry={10} fill={oscurecer(tierra, 0.25)} opacity={0.7} />
      ))}
      {/* parapeto de sacos terreros (dos filas) */}
      {[0, 1].map((fila) =>
        Array.from({ length: 18 }).map((_, i) => (
          <rect key={`${fila}${i}`} x={-60 + i * 116 + fila * 58} y={TOPE + 40 - fila * 52} width={112} height={56} rx={22}
            fill={saco[(i + fila) % 3]} stroke={oscurecer(saco[(i + fila) % 3], 0.35)} strokeWidth={4} />
        )),
      )}
      {/* fondo de barro y tablones */}
      <rect x={0} y={SUELO - 20} width={MW} height={MH - SUELO + 20} fill="#3b2f22" />
      {Array.from({ length: 12 }).map((_, i) => (
        <rect key={i} x={i * 170} y={SUELO + 30} width={150} height={26} fill={oscurecer(tabla, 0.15)} opacity={0.8} />
      ))}
    </g>
  );
};

// Paralaje: una capa a profundidad k (0 = pegada a los personajes, 1 = infinito) acompaña a la cámara
type Cam = { fx: number; fy: number };
const paralaje = (cam: Cam | undefined, k: number) => (cam ? `translate(${(cam.fx - 960) * k} ${(cam.fy - 960) * k * 0.6})` : undefined);

// Algo vivo en cada plano: pájaros en exteriores de día, motas de polvo en la luz de los interiores
const Vida: React.FC<{ fondo: Fondo; f: number; id: string }> = ({ fondo, f, id }) => {
  const hora = fondo.hora ?? "dia";
  const interior = fondo.lugar === "interior";
  if (interior) {
    return (
      <g>
        {Array.from({ length: 26 }).map((_, i) => {
          const x = 300 + random(`mx${i}${id}`) * 1320 + Math.sin(f / 50 + i) * 30;
          const y = 520 + ((random(`my${i}${id}`) * 700 - f * (0.25 + random(`mv${i}`) * 0.3)) % 700 + 700) % 700;
          return <circle key={i} cx={x} cy={y} r={2 + random(`mr${i}`) * 2.5} fill="#fff2d0" opacity={0.18 + 0.15 * Math.sin(f / 20 + i)} />;
        })}
      </g>
    );
  }
  if (["espacio", "luna", "marte"].includes(fondo.lugar) || hora === "noche" || fondo.clima === "tormenta" || fondo.clima === "ceniza") return null;
  return (
    <g>
      {Array.from({ length: 4 }).map((_, i) => {
        const ciclo = 420 + i * 90;
        const t = ((f + random(`pj${i}${id}`) * ciclo) % ciclo) / ciclo;
        const x = -100 + t * (MW + 200);
        const y = 560 + random(`py${i}${id}`) * 260 + Math.sin(t * 20 + i) * 18;
        const ala = Math.sin(f / 3 + i * 2) * 10;
        return <path key={i} d={`M${x - 16} ${y - ala} Q${x - 8} ${y - 6} ${x} ${y} Q${x + 8} ${y - 6} ${x + 16} ${y - ala}`} stroke="#1c1f2a" strokeWidth={4} fill="none" opacity={0.6} />;
      })}
    </g>
  );
};

// Elementos delante de los personajes, en las esquinas bajas y algo desenfocados (profundidad)
const PrimerPlano: React.FC<{ fondo: Fondo; f: number; id: string; cam?: Cam }> = ({ fondo, f, id, cam }) => {
  const l = fondo.lugar;
  const hora = fondo.hora ?? "dia";
  const oscuro = hora === "noche" ? "#05070d" : hora === "atardecer" ? "#1a0f1a" : "#141414";
  const mov = cam ? `translate(${(cam.fx - 960) * -0.25} 0)` : undefined; // el primer plano corre más que el resto
  let piezas: React.ReactNode = null;
  if (l === "interior") {
    piezas = (
      <g fill={oscuro} opacity={0.85}>
        <rect x={-80} y={300} width={110} height={1400} />
        <rect x={1890} y={300} width={110} height={1400} />
        <ellipse cx={120} cy={1560} rx={260} ry={110} />
        <ellipse cx={1820} cy={1580} rx={240} ry={100} />
      </g>
    );
  } else if (["campo", "bosque", "selva", "montanas", "valle", "isla"].includes(l)) {
    piezas = (
      <g fill={oscuro} opacity={0.9}>
        {Array.from({ length: 16 }).map((_, i) => {
          const lado = i < 8 ? 0 : 1;
          const x = lado ? 1700 + (i - 8) * 30 : 20 + i * 30;
          const h = 120 + random(`hz${i}${id}`) * 140;
          const vaiven = Math.sin(f / 25 + i) * 10;
          return <path key={i} d={`M${x} 1560 Q${x + vaiven} ${1560 - h / 2} ${x + vaiven * 2 + (lado ? -20 : 20)} ${1560 - h} Q${x + 14} ${1560 - h / 2} ${x + 22} 1560Z`} />;
        })}
      </g>
    );
  } else if (["ciudad", "calle", "futurista"].includes(l)) {
    piezas = (
      <g fill={oscuro} opacity={0.88}>
        <rect x={20} y={1150} width={22} height={500} />
        <rect x={-40} y={1140} width={150} height={26} rx={8} />
        <path d="M1720 1600 L1760 1430 L1900 1420 L1960 1600Z" />
        <ellipse cx={1800} cy={1600} rx={260} ry={70} />
      </g>
    );
  } else if (["mar", "playa", "hielo", "desierto", "marte", "luna", "trinchera"].includes(l)) {
    piezas = (
      <g fill={oscuro} opacity={0.85}>
        <ellipse cx={80} cy={1600} rx={280} ry={120} />
        <ellipse cx={1860} cy={1620} rx={240} ry={110} />
      </g>
    );
  }
  if (!piezas) return null;
  return <g transform={mov} style={{ filter: "blur(5px)" }}>{piezas}</g>;
};

// Decorados que siempre están lejos, detrás de todo el paisaje
const LEJANOS = ["parapeto-aleman", "volcan", "volcan-erupcion", "explosion", "piramide", "pilar", "templo-mayor", "santo", "campanario"];
const ESCALA_LEJANA: Record<string, number> = { "templo-mayor": 0.8, pilar: 0.75, santo: 0.78, campanario: 0.62 };
// Decorados de plano medio: sobre el agua o la llanura, entre el horizonte y el suelo
const MEDIOS: Record<string, { y: number; k: number }> = { bergantin: { y: HORIZONTE + 95, k: 0.5 }, "ciudad-lago": { y: HORIZONTE + 40, k: 0.55 }, puente: { y: HORIZONTE + 95, k: 0.5 }, calzada: { y: HORIZONTE + 80, k: 0.6 }, canoa: { y: SUELO - 75, k: 0.8 }, piragua: { y: SUELO - 75, k: 0.8 }, "piragua-piedras": { y: SUELO - 75, k: 0.8 }, tumulo: { y: SUELO - 55, k: 0.6 }, "tumulo-obra": { y: SUELO - 55, k: 0.6 }, "tumulo-hierba": { y: SUELO - 55, k: 0.6 }, "isla-faro": { y: HORIZONTE + 45, k: 0.55 }, "isla-faro-apagada": { y: HORIZONTE + 45, k: 0.55 }, acorazado: { y: HORIZONTE + 25, k: 0.6 }, destructor: { y: HORIZONTE + 25, k: 0.6 }, portaaviones: { y: HORIZONTE + 25, k: 0.6 }, submarino: { y: HORIZONTE + 28, k: 0.6 } };
const BARCOS = ["acorazado", "destructor", "portaaviones", "submarino"];
// el humo sobre el agua sin un barco (u otro objeto) cerca en el suelo arde a lo lejos, en la línea de flotación
const BASES_HUMO = ["barco", "velero", "bote", "bergantin-hundido", "casa", "cabana", "granja", "granero", "tren", "ruinas", "coche-abandonado", "coche-antiguo", "bloque", "casa-adobe", "escombros"];
const HUMO_MEDIO = { y: HORIZONTE + 25, k: 0.6 };

// Un objeto pequeño (emoji) que cae sobre una mesa se apoya en el tablero, no en el suelo
const EMOJI = /\p{Extended_Pictographic}/u;
type PropColocado = { tipo: string; x?: number; escala?: number };
const sobreMesa = (p: PropColocado, todos: PropColocado[], k: number) => {
  if (!EMOJI.test(p.tipo) || (p.escala ?? 1) > 0.6) return 0;
  const mesa = todos.find((m) => m.tipo === "mesa" && Math.abs(xMundo(m.x, k) - xMundo(p.x, k)) < 225 * (m.escala ?? 1));
  return mesa ? 230 * (mesa.escala ?? 1) : 0;
};

// Ranuras automáticas para props sin x (repartidas detrás de los personajes)
const RANURAS = [-1.45, 1.45, -0.75, 0.8, -1.9, 1.9, 0];

export const DibujarFondo: React.FC<{ fondo: Fondo; f: number; dur: number; id: string; capa: "fondo" | "frente"; k?: number; cam?: Cam }> = ({ fondo, f, dur, id, capa, k = 420, cam }) => {
  const hora = fondo.hora ?? "dia";
  const noche = hora === "noche" || hora === "atardecer";
  if (fondo.lugar === "ocular") return capa === "fondo" ? <Ocular fondo={fondo} f={f} dur={dur} id={id} /> : null;
  const props = (fondo.props ?? []).map((p, i) => (typeof p === "string" ? { tipo: p, x: RANURAS[i % RANURAS.length], escala: 1, detras: true } : { detras: true, escala: 1, x: RANURAS[i % RANURAS.length], ...p }));
  const agua = ["mar", "rio", "playa", "isla"].includes(fondo.lugar);
  const humoLejos = (p: { tipo: string; x: number }) => p.tipo === "humo" && (
    props.some((q) => MEDIOS[q.tipo] && Math.abs(q.x - p.x) < 0.3) ||
    (agua && !props.some((q) => BASES_HUMO.includes(q.tipo) && Math.abs(q.x - p.x) < 0.35)));
  const medio = (p: { tipo: string; x: number }) => MEDIOS[p.tipo] ?? (humoLejos(p) ? HUMO_MEDIO : undefined);
  const bahia = ["campo", "montanas"].includes(fondo.lugar) && props.some((p) => BARCOS.includes(p.tipo));
  if (capa === "frente") {
    return (
      <g>
        {props.filter((p) => p.detras === false).map((p, i) => (
          <g key={i} transform={`translate(${xMundo(p.x, k)} ${SUELO + 40}) scale(${p.escala})`}><Prop tipo={p.tipo} f={f} noche={noche} dur={dur} /></g>
        ))}
        {fondo.lugar === "trinchera" && (
          <g opacity={0.72}>
            <path d={ola(SUELO - 70, 6, 80, f / 16)} fill={hora === "dia" ? "#5f5a48" : "#2f2c24"} />
            <path d={ola(SUELO - 60, 4, 50, f / 10 + 1)} fill="none" stroke="#b9b29a" strokeWidth={3} opacity={0.5} />
          </g>
        )}
        <PrimerPlano fondo={fondo} f={f} id={id} cam={cam} />
        <Particulas clima={fondo.clima ?? "despejado"} f={f} />
      </g>
    );
  }
  return (
    <g>
      {fondo.lugar === "interior" ? (
        <Interior fondo={fondo} hora={hora} f={f} id={id} />
      ) : (
        <g>
          <g transform={paralaje(cam, 0.85)}>
            <Cielo hora={hora} f={f} dur={dur} espacio={fondo.lugar === "espacio" || fondo.lugar === "luna"} marte={fondo.lugar === "marte"} id={id} nublado={fondo.clima === "nublado"} sinLuna={fondo.luna === false} />
            <Vida fondo={fondo} f={f} id={id} />
          </g>
          {/* decorados LEJANOS (volcanes, pirámides): detrás del paisaje, apoyados en el horizonte y con bruma */}
          {props.filter((p) => LEJANOS.includes(p.tipo)).map((p, i) => (
            <g key={`l${i}`} transform={paralaje(cam, 0.6)}>
              <g opacity={0.92} transform={`translate(${xMundo(p.x, k)} ${HORIZONTE + 60}) scale(${Math.min(p.escala ?? 1, 1.6) * 0.75 * (ESCALA_LEJANA[p.tipo] ?? 1)})`}>
                <Prop tipo={p.tipo} f={f} noche={noche} dur={dur} />
              </g>
            </g>
          ))}
          <Exterior fondo={fondo} hora={hora} f={f} id={id} cam={cam} bahia={bahia} medios={props.filter((p) => medio(p) && p.detras !== false).map((p, i) => (
            <g key={`m${i}`} transform={`translate(${xMundo(p.x, k)} ${medio(p)!.y}) scale(${(p.escala ?? 1) * medio(p)!.k})`}><Prop tipo={p.tipo} f={f} noche={noche} dur={dur} /></g>
          ))} />
        </g>
      )}
      {fondo.lugar === "interior" && <Vida fondo={fondo} f={f} id={id} />}
      {props.filter((p) => p.detras !== false && (fondo.lugar === "interior" || (!LEJANOS.includes(p.tipo) && !medio(p)))).map((p, i) => (
        <g key={i} transform={`translate(${xMundo(p.x, k)} ${SUELO - 20 - sobreMesa(p, props, k)}) scale(${p.escala})`}><Prop tipo={p.tipo} f={f} noche={noche} dur={dur} /></g>
      ))}
      {(fondo.clima === "lluvia" || fondo.clima === "tormenta" || fondo.clima === "nieve") && fondo.lugar !== "interior" && (
        // cielo encapotado: con lluvia no hay sol ni cielo azul
        <g>
          <rect x={0} y={0} width={MW} height={fondo.lugar === "trinchera" ? SUELO - 560 : HORIZONTE + 120} fill={noche ? "#1c2128" : "#6f7880"} opacity={noche ? 0.45 : 0.62} />
          <rect x={0} y={0} width={MW} height={MH} fill="#2e353c" opacity={0.18} />
        </g>
      )}
      {fondo.clima === "ceniza" && fondo.lugar !== "interior" && (
        // cielo de humo y hollín tras una explosión o un incendio: sin sol ni azul
        <g>
          <rect x={0} y={0} width={MW} height={HORIZONTE + 160} fill="#2a2522" opacity={0.78} />
          <rect x={0} y={0} width={MW} height={MH} fill="#1a1614" opacity={0.25} />
        </g>
      )}
      {fondo.clima === "niebla" && fondo.lugar !== "interior" && (
        // velo de niebla DETRÁS de los personajes: apaga cielo, sol, lejanías y decorados
        <g>
          <rect x={0} y={0} width={MW} height={fondo.lugar === "trinchera" ? SUELO - 560 : MH} fill={hora === "noche" ? "#5a6470" : "#c4ccd3"} opacity={hora === "noche" ? 0.3 : 0.45} />
          <rect x={0} y={HORIZONTE - 300} width={MW} height={480} fill="#dfe5ea" opacity={hora === "noche" ? 0.12 : 0.3} />
          {[0, 1, 2].map((i) => (
            <ellipse key={i} cx={((f * (0.8 + i * 0.3) + i * 700) % (MW + 1400)) - 700} cy={(fondo.lugar === "trinchera" ? SUELO - 640 : SUELO - 120) + i * 60} rx={900} ry={90} fill="#eef2f5" opacity={0.3} />
          ))}
        </g>
      )}
    </g>
  );
};

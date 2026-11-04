import React from "react";
import { random } from "remotion";
import { MW, MH, SUELO, HORIZONTE, oscurecer, xMundo } from "./constantes";
import { Prop } from "./Props";

export type Hora = "amanecer" | "dia" | "atardecer" | "noche";
export type Clima = "despejado" | "lluvia" | "nieve" | "niebla" | "tormenta" | "polvo" | "ceniza";
export type Lugar =
  | "mar" | "playa" | "montanas" | "hielo" | "ciudad" | "futurista" | "desierto" | "campo"
  | "bosque" | "espacio" | "luna" | "calle" | "selva" | "valle" | "interior";
export type PropEnEscena = string | { tipo: string; x?: number; escala?: number; detras?: boolean };

export type Fondo = {
  lugar: Lugar;
  hora?: Hora;
  clima?: Clima;
  pared?: "piedra" | "madera" | "ladrillo" | "metal" | "papel" | "tela" | "roca" | "jeroglificos";
  colorPared?: string;
  props?: PropEnEscena[];
  ventana?: boolean;
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
  desierto: "#d2a062", valle: "#c99a62", campo: "#6f9a4a", bosque: "#3f5f32", espacio: "#3a3f4f", luna: "#9a9aa2", calle: "#7a6e62", selva: "#2f5a2a",
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

const Cielo: React.FC<{ hora: Hora; f: number; dur: number; espacio?: boolean; id: string }> = ({ hora, f, dur, espacio, id }) => {
  const cielo = espacio ? ["#000", "#03040a", "#070b1a", "#0d1630"] : CIELOS[hora];
  const estrellas = espacio || hora === "noche" || hora === "amanecer";
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
      {!espacio && (
        <g>
          <circle cx={ax} cy={ay} r={300} fill={`url(#halo${id})`} />
          <circle cx={ax} cy={ay} r={hora === "noche" ? 64 : 88} fill={hora === "noche" ? "#f1ecd8" : hora === "dia" ? "#fff8e0" : "#ffcf87"} />
          {hora === "noche" && [[-18, -14, 14], [20, 10, 10], [-4, 24, 8]].map(([dx, dy, r], k) => <circle key={k} cx={ax + dx} cy={ay + dy} r={r} fill="#d8d2bc" />)}
          {hora === "dia" &&
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
    </g>
  );
};

const Exterior: React.FC<{ fondo: Fondo; hora: Hora; f: number; id: string }> = ({ fondo, hora, f, id }) => {
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
          <path d={cresta(`m2${id}`, HORIZONTE + 80, 300, 11)} fill={lugar === "hielo" ? "#9fb6cc" : c[1]} transform={`translate(${-deriva * 0.4} 0)`} />
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
    case "campo":
      lejos = (
        <g>
          <path d={colinas(HORIZONTE, 120, 240, 1 - deriva / 900)} fill={hora === "dia" ? "#8fb36a" : c[0]} />
          <path d={colinas(HORIZONTE + 110, 130, 320, 3 - deriva / 600)} fill={hora === "dia" ? "#79a056" : c[1]} />
        </g>
      );
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
  return (
    <g>
      {lejos}
      {/* suelo en primer plano */}
      <path d={`M0 ${SUELO - 30} Q${MW / 2} ${SUELO - 60} ${MW} ${SUELO - 30} L${MW} ${MH} L0 ${MH}Z`} fill={suelo} />
      {lugar === "calle" &&
        Array.from({ length: 60 }).map((_, i) => (
          <rect key={i} x={(i % 15) * 130 + (Math.floor(i / 15) % 2) * 65} y={SUELO - 10 + Math.floor(i / 15) * 60} width={118} height={50} rx={14} fill={oscurecer(suelo, 0.12)} />
        ))}
      {(lugar === "campo" || lugar === "bosque" || lugar === "selva" || lugar === "montanas") &&
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

const PAREDES: Record<string, string> = { jeroglificos: "#d9c49a", piedra: "#8a8178", madera: "#8a5a3a", ladrillo: "#9a4f3a", metal: "#5d6673", papel: "#d9cdb2", tela: "#7a5a7a", roca: "#5a4e44" };

const Interior: React.FC<{ fondo: Fondo; hora: Hora; f: number; id: string }> = ({ fondo, hora, f, id }) => {
  const tipo = fondo.pared ?? "madera";
  const col = fondo.colorPared ?? PAREDES[tipo];
  const noche = hora === "noche" || hora === "atardecer";
  const ventana = fondo.ventana ?? true;
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
      <rect x={0} y={SUELO - 10} width={MW} height={MH} fill={tipo === "metal" ? "#2b3038" : tipo === "piedra" || tipo === "roca" ? "#4a443e" : tipo === "jeroglificos" ? "#8a6a42" : "#5a3d28"} />
      {Array.from({ length: 10 }).map((_, i) => (
        <line key={i} x1={i * 200} y1={SUELO} x2={i * 200 - 300} y2={MH} stroke="#00000022" strokeWidth={6} />
      ))}
      {noche && <rect width={MW} height={MH} fill="#0a1230" opacity={0.35} style={{ mixBlendMode: "multiply" }} />}
    </g>
  );
};

const Particulas: React.FC<{ clima: Clima; f: number }> = ({ clima, f }) => {
  if (clima === "despejado") return null;
  if (clima === "niebla")
    return (
      <g>
        {[0, 1, 2, 3, 4].map((i) => (
          <ellipse key={i} cx={((f * (1.2 + i * 0.4) + i * 500) % (MW + 1400)) - 700} cy={HORIZONTE - 80 + i * 110} rx={800} ry={110} fill="#e8eef5" opacity={0.16} />
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

// Ranuras automáticas para props sin x (repartidas detrás de los personajes)
const RANURAS = [-1.45, 1.45, -0.75, 0.8, -1.9, 1.9, 0];

export const DibujarFondo: React.FC<{ fondo: Fondo; f: number; dur: number; id: string; capa: "fondo" | "frente"; k?: number }> = ({ fondo, f, dur, id, capa, k = 420 }) => {
  const hora = fondo.hora ?? "dia";
  const noche = hora === "noche" || hora === "atardecer";
  const props = (fondo.props ?? []).map((p, i) => (typeof p === "string" ? { tipo: p, x: RANURAS[i % RANURAS.length], escala: 1, detras: true } : { detras: true, escala: 1, x: RANURAS[i % RANURAS.length], ...p }));
  if (capa === "frente") {
    return (
      <g>
        {props.filter((p) => p.detras === false).map((p, i) => (
          <g key={i} transform={`translate(${xMundo(p.x, k)} ${SUELO + 40}) scale(${p.escala})`}><Prop tipo={p.tipo} f={f} noche={noche} /></g>
        ))}
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
          <Cielo hora={hora} f={f} dur={dur} espacio={fondo.lugar === "espacio" || fondo.lugar === "luna"} id={id} />
          <Exterior fondo={fondo} hora={hora} f={f} id={id} />
        </g>
      )}
      {props.filter((p) => p.detras !== false).map((p, i) => (
        <g key={i} transform={`translate(${xMundo(p.x, k)} ${SUELO - 20}) scale(${p.escala})`}><Prop tipo={p.tipo} f={f} noche={noche} /></g>
      ))}
    </g>
  );
};

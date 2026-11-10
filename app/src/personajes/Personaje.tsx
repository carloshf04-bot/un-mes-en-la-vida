import React from "react";
import { random } from "remotion";
import type { Accion, Emocion, Look } from "./tipos";
import { oscurecer, FPS } from "../mundo/constantes";

// Personaje vectorial articulado. Origen = punto entre los pies. Mira a la derecha (+x).
// Medidas base (altura 1): cadera y=-260, hombros y=-450, cabeza centro y=-560.

const MUSLO = 132;
const ESPINILLA = 128;
const BRAZO = 112;
const ANTEBRAZO = 104;
const CADERA_Y = -262;
const HOMBRO_Y = -452;
const CUELLO_Y = -478;
const R_CABEZA = 80;

type Pose = {
  hD: number; cD: number; // hombro/codo brazo delantero (lado +x)
  hI: number; cI: number; // brazo trasero (lado -x)
  pD: number; rD: number; // pierna delantera cadera/rodilla
  pI: number; rI: number;
  y: number; // desplazamiento vertical del cuerpo
  x: number;
  incl: number; // inclinación del cuerpo
  cabeza: number; // inclinación de cabeza
  cabezaY: number;
};

const BASE: Pose = { hD: -8, cD: -6, hI: 8, cI: 6, pD: 0, rD: 0, pI: 0, rI: 0, y: 0, x: 0, incl: 0, cabeza: 0, cabezaY: 0 };

export const calcularPose = (accion: Accion, f: number, semilla: number, fase?: number): Pose => {
  const t = f / FPS + semilla * 1.7;
  // respiración (~16 por minuto) + leve balanceo de cabeza para que nadie se quede congelado
  const resp = Math.sin(t * 1.7);
  const p: Pose = { ...BASE, hD: -8 + resp * 2.5, hI: 8 - resp * 2.5, y: resp * 2, cabeza: Math.sin(t * 0.63 + semilla) * 2.2 };
  switch (accion) {
    case "hablar":
      return { ...p, hD: -22 + Math.sin(t * 2.6) * 16, cD: -55 + Math.sin(t * 3.3) * 22, hI: 14 + Math.sin(t * 1.9) * 6, cI: 20, cabeza: Math.sin(t * 1.4) * 3 };
    case "caminar":
    case "correr": {
      const k = accion === "correr" ? 1.8 : 1;
      // si se da la fase (calculada con la distancia recorrida) los pies no resbalan
      const ph = fase ?? t * 6.5 * k;
      const s = Math.sin(ph);
      return {
        ...p,
        pD: -24 * s * k, pI: 24 * s * k,
        rD: Math.max(0, Math.cos(ph)) * 30 * k, rI: Math.max(0, -Math.cos(ph)) * 30 * k,
        hD: 22 * s * k - 8, cD: -20 * k, hI: -22 * s * k + 8, cI: -20 * k,
        y: -Math.abs(Math.cos(ph)) * 10 * k,
        incl: accion === "correr" ? 8 : 2,
      };
    }
    case "trabajar": {
      const g = Math.sin(t * 7);
      return { ...p, hD: -70 + g * 35, cD: -60 + g * 20, hI: -25, cI: -70, incl: 6 + g * 2, cabeza: 6 };
    }
    case "saludar":
      return { ...p, hD: -155, cD: -15 + Math.sin(t * 11) * 28, cabeza: -4 };
    case "sentado":
      return { ...p, pD: -88, rD: 88, pI: -84, rI: 84, y: MUSLO - 6, hD: -20, cD: -40, hI: 0, cI: -30 };
    case "escribir": {
      const e = Math.sin(t * 9) * 6;
      return { ...p, pD: -88, rD: 88, pI: -84, rI: 84, y: MUSLO - 6, hD: -55 + e, cD: -45, hI: -35, cI: -50, cabeza: 10, incl: 6 };
    }
    case "pensar":
      return { ...p, hD: 18, cD: 150, hI: 10, cI: -70, cabeza: 6 + Math.sin(t) * 2 };
    case "celebrar": {
      const b = Math.abs(Math.sin(t * 5));
      return { ...p, hD: -165 + b * 15, cD: -10, hI: 165 - b * 15, cI: 10, y: -b * 30, cabeza: -6 };
    }
    case "triste":
      return { ...p, hD: -2, cD: -4, hI: 2, cI: 4, cabeza: 14, cabezaY: 10, incl: 4, y: 6 };
    case "senalar":
      return { ...p, hD: -88, cD: -4 + Math.sin(t * 2) * 3 };
    case "cargar":
      return { ...p, hD: 25, cD: 95, hI: -25, cI: -95, incl: -3 };
    case "asustado": {
      const tr = Math.sin(t * 40) * 3;
      return { ...p, hD: -140, cD: 60, hI: 140, cI: -60, x: tr, cabeza: -6, y: 4 };
    }
    case "dormir":
      return { ...p, y: 0, cabeza: 0 };
    case "tambalear": {
      // infectado: brazos hacia delante, paso torpe, cabeza ladeada
      const ph = fase ?? t * 3.2;
      const s = Math.sin(ph);
      return { ...p, hD: -78 + Math.sin(t * 1.3) * 6, cD: -8, hI: -70 + Math.sin(t * 1.1 + 1) * 6, cI: -10, pD: -14 * s, pI: 14 * s, rD: Math.max(0, Math.cos(ph)) * 18, rI: Math.max(0, -Math.cos(ph)) * 18, incl: 9 + s * 2, cabeza: 14 + Math.sin(t * 0.9) * 5, y: -Math.abs(Math.cos(ph)) * 5 };
    }
    default:
      return p;
  }
};

// Mezcla de dos poses (0 = a, 1 = b). Se usa para fundir cambios de pose en 6–12 fotogramas.
export const mezclarPose = (a: Pose, b: Pose, k: number): Pose => {
  const o = { ...b };
  for (const key of Object.keys(b) as (keyof Pose)[]) o[key] = a[key] + (b[key] - a[key]) * k;
  return o;
};
// Curva con anticipación y pequeño rebote al final (back in-out)
export const curvaGesto = (x: number) => {
  const c = 1.2 * 1.525;
  const v = Math.min(1, Math.max(0, x));
  return v < 0.5 ? (Math.pow(2 * v, 2) * ((c + 1) * 2 * v - c)) / 2 : (Math.pow(2 * v - 2, 2) * ((c + 1) * (v * 2 - 2) + c) + 2) / 2;
};
// Parpadeo con intervalos al azar de 3 a 6 s (deterministas por semilla)
const parpadea = (f: number, semilla: number) => {
  let t = Math.floor(random(`pb${semilla}`) * 3 * FPS);
  for (let k = 0; t <= f; k++) {
    if (f - t < 4) return true;
    t += Math.round((3 + random(`pb${semilla}-${k}`) * 3) * FPS);
  }
  return false;
};

const rot = (x: number, y: number, a: number) => {
  const r = (a * Math.PI) / 180;
  return [x * Math.cos(r) - y * Math.sin(r), x * Math.sin(r) + y * Math.cos(r)];
};

// posición de la mano delantera (para colocar objetos)
const posMano = (sx: number, sy: number, a1: number, a2: number) => {
  const [x1, y1] = rot(0, BRAZO, a1);
  const [x2, y2] = rot(0, ANTEBRAZO, a1 + a2);
  return [sx + x1 + x2, sy + y1 + y2];
};

const Extremidad: React.FC<{
  x: number; y: number; a1: number; a2: number; l1: number; l2: number; w: number;
  c1: string; c2: string; fin: React.ReactNode;
}> = ({ x, y, a1, a2, l1, l2, w, c1, c2, fin }) => (
  <g transform={`translate(${x} ${y}) rotate(${a1})`}>
    <rect x={-w / 2} y={-w / 2} width={w} height={l1 + w} rx={w / 2} fill={c1} />
    <g transform={`translate(0 ${l1}) rotate(${a2})`}>
      <rect x={-w / 2 + 1} y={-w / 2} width={w - 2} height={l2 + w / 2} rx={w / 2} fill={c2} />
      <g transform={`translate(0 ${l2})`}>{fin}</g>
    </g>
  </g>
);

const Pelo: React.FC<{ look: Look; capa: "atras" | "delante" }> = ({ look, capa }) => {
  const c = look.pelo;
  const p = look.peinado ?? "corto";
  if (capa === "atras") {
    if (p === "largo") return <path d="M-94 -20 L-96 130 Q-80 156 -54 136 L-50 30 L50 30 L54 136 Q80 156 96 130 L94 -20Z" fill={c} />;
    if (p === "trenzas")
      return (
        <g fill={c}>
          {[-1, 1].map((s) => (
            <g key={s}>
              {[0, 1, 2, 3].map((i) => (
                <ellipse key={i} cx={s * 78} cy={40 + i * 42} rx={20} ry={26} />
              ))}
            </g>
          ))}
        </g>
      );
    if (p === "coleta") return <ellipse cx={-70} cy={40} rx={38} ry={80} fill={c} transform="rotate(20 -70 40)" />;
    return null;
  }
  switch (p) {
    case "calvo":
      return null;
    case "rapado":
      return <path d="M-80 -8 C-84 -98 84 -98 80 -8 Q40 -50 0 -52 Q-40 -50 -80 -8Z" fill={c} opacity={0.55} />;
    case "rizado":
      return (
        <g fill={c}>
          {[-70, -45, -15, 15, 45, 70].map((x, i) => (
            <circle key={i} cx={x} cy={-58 + Math.abs(x) * 0.45} r={30} />
          ))}
          <circle cx={0} cy={-80} r={34} />
        </g>
      );
    case "mono":
      return (
        <g fill={c}>
          <path d="M-82 -2 C-88 -100 88 -100 82 -2 Q50 -46 0 -50 Q-50 -46 -82 -2Z" />
          <circle cx={0} cy={-98} r={30} />
        </g>
      );
    default:
      return <path d="M-84 6 C-92 -102 92 -102 84 6 Q70 -38 20 -48 Q-30 -30 -84 6Z" fill={c} />;
  }
};

const Sombrero: React.FC<{ look: Look }> = ({ look }) => {
  const c = look.colorSombrero ?? "#3b2f2a";
  switch (look.sombrero) {
    case "gorra":
      return (
        <g fill={c}>
          <path d="M-82 -20 C-82 -110 82 -110 82 -20Z" />
          <ellipse cx={70} cy={-22} rx={60} ry={12} />
        </g>
      );
    case "copa":
      return (
        <g fill={c}>
          <ellipse cx={0} cy={-58} rx={115} ry={16} />
          <rect x={-62} y={-200} width={124} height={145} rx={8} />
          <rect x={-62} y={-80} width={124} height={16} fill={oscurecer(c, -0.5)} opacity={0.6} />
        </g>
      );
    case "ala":
      return (
        <g fill={c}>
          <ellipse cx={0} cy={-50} rx={140} ry={22} />
          <path d="M-70 -50 C-72 -140 72 -140 70 -50Z" />
        </g>
      );
    case "casco":
      return (
        <g fill={look.colorSombrero ?? "#f2c230"}>
          <path d="M-86 -24 C-86 -128 86 -128 86 -24Z" />
          <rect x={-104} y={-34} width={208} height={18} rx={9} />
          <rect x={-8} y={-118} width={16} height={90} fill="#00000022" />
        </g>
      );
    case "corona":
      return <path d="M-70 -60 L-70 -130 L-40 -95 L0 -145 L40 -95 L70 -130 L70 -60Z" fill={look.colorSombrero ?? "#f2c230"} stroke="#b8860b" strokeWidth={4} />;
    case "boina":
      return <ellipse cx={14} cy={-68} rx={100} ry={36} fill={c} transform="rotate(-8)" />;
    case "tricornio":
      return (
        <g fill={c}>
          <path d="M-130 -50 Q0 -20 130 -50 Q90 -150 0 -130 Q-90 -150 -130 -50Z" />
          <path d="M-130 -50 Q0 -20 130 -50" stroke="#c9a24a" strokeWidth={6} fill="none" />
        </g>
      );
    case "panuelo":
      return (
        <g fill={c}>
          <path d="M-86 -10 C-88 -110 88 -110 86 -10 Q0 -40 -86 -10Z" />
          <path d="M-80 -10 L-120 40 L-90 30Z" />
        </g>
      );
    case "yelmo":
      return (
        <g>
          <path d="M-88 10 C-92 -118 92 -118 88 10 L60 10 L60 -20 L-60 -20 L-60 10Z" fill="#9aa3ad" />
          <rect x={-8} y={-30} width={16} height={58} fill="#7d858e" />
        </g>
      );
    case "turbante":
      return (
        <g fill={look.colorSombrero ?? "#f2efe6"}>
          <path d="M-88 -10 C-96 -120 96 -120 88 -10 Q0 -40 -88 -10Z" />
          {[0, 1, 2].map((i) => <path key={i} d={`M-86 ${-24 - i * 26} Q0 ${-60 - i * 26} 86 ${-24 - i * 26}`} stroke="#00000022" strokeWidth={6} fill="none" />)}
        </g>
      );
    case "fez":
      return (
        <g>
          <path d="M-56 -50 L-44 -150 L44 -150 L56 -50Z" fill={look.colorSombrero ?? "#a0201a"} />
          <path d="M0 -150 q30 20 26 70" stroke="#1a1a1a" strokeWidth={5} fill="none" />
        </g>
      );
    case "salacot":
      return (
        <g fill={look.colorSombrero ?? "#e6dcc0"}>
          <ellipse cx={0} cy={-46} rx={130} ry={24} />
          <path d="M-86 -46 C-86 -150 86 -150 86 -46Z" />
          <rect x={-86} y={-62} width={172} height={12} fill="#8a7a5a" />
        </g>
      );
    case "orejeras":
      // gorra de caza con orejeras caídas
      return (
        <g fill={c}>
          <path d="M-84 -20 C-84 -112 84 -112 84 -20Z" />
          <ellipse cx={74} cy={-24} rx={56} ry={11} />
          <path d="M-86 -30 L-92 40 Q-80 60 -62 40 L-60 -30Z" />
          <path d="M-58 -96 h120" stroke="#00000033" strokeWidth={8} />
        </g>
      );
    case "penacho":
      // tocado de plumas largas (nobles mexicas)
      return (
        <g>
          {[-60, -40, -20, 0, 20, 40, 60].map((a, i) => (
            <path key={a} d="M0 -40 Q-22 -170 0 -260 Q22 -170 0 -40Z" fill={i % 2 ? "#1f8a5a" : "#2fa86a"} transform={`rotate(${a * 0.9})`} />
          ))}
          <path d="M-84 -36 Q0 -70 84 -36 L84 -12 Q0 -46 -84 -12Z" fill={look.colorSombrero ?? "#3fa8c8"} />
          {[-50, 0, 50].map((x) => <circle key={x} cx={x} cy={-34} r={9} fill="#e0c050" />)}
        </g>
      );
    case "morrion":
      // casco español del siglo XVI con cresta y alas
      return (
        <g>
          <path d="M-150 -38 Q-110 -24 -70 -40 C-70 -150 70 -150 70 -40 Q110 -24 150 -38 Q110 -60 74 -56 C70 -140 -70 -140 -74 -56 Q-110 -60 -150 -38Z" fill="#a9b2bb" />
          <path d="M-60 -110 Q0 -200 60 -110" fill="#9aa3ad" stroke="#7d858e" strokeWidth={6} />
          <ellipse cx={-20} cy={-110} rx={16} ry={30} fill="#ffffff" opacity={0.35} />
        </g>
      );
    case "capucha":
      return <path d="M-104 70 C-120 -140 120 -140 104 70 L84 70 C92 -70 -92 -70 -84 70Z" fill={c} />;
    case "espacial":
      return (
        <g>
          <circle r={122} fill="#bfe6ff" opacity={0.18} />
          <circle r={122} fill="none" stroke="#e8eef4" strokeWidth={10} />
          <path d="M-70 -70 Q-40 -100 0 -104" stroke="#fff" strokeWidth={12} strokeLinecap="round" fill="none" opacity={0.7} />
        </g>
      );
    default:
      return null;
  }
};

const Cara: React.FC<{ look: Look; emocion: Emocion; boca: number; parpadeo: boolean; dormido: boolean }> = ({ look, emocion, boca, parpadeo, dormido }) => {
  const piel = look.piel;
  const cerrados = parpadeo || dormido;
  const cejaAng = { neutral: 0, feliz: -4, triste: 14, miedo: 16, enfado: -18, sorpresa: -2, cansado: 8 }[emocion];
  const cejaY = emocion === "sorpresa" || emocion === "miedo" ? -40 : -30;
  const ojoR = emocion === "sorpresa" || emocion === "miedo" ? 12 : 9.5;
  const pelo = look.pelo;
  return (
    <g>
      {/* ojos */}
      {[-1, 1].map((s) => (
        <g key={s} transform={`translate(${s * 28 + 6} -4)`}>
          {cerrados ? (
            <path d={dormido ? "M-11 0 Q0 8 11 0" : "M-11 0 Q0 4 11 0"} stroke="#1d1a22" strokeWidth={5} fill="none" strokeLinecap="round" />
          ) : look.zombi ? (
            <g>
              <ellipse cy={4} rx={17} ry={13} fill="#00000040" />
              <circle r={12} fill="#e9ecd8" />
              <circle cx={2} r={4} fill="#8a8f80" />
            </g>
          ) : (
            <g>
              {(emocion === "miedo" || emocion === "sorpresa") && <circle r={ojoR + 6} fill="#fff" />}
              <circle r={ojoR} fill="#1d1a22" />
              <circle cx={3} cy={-3} r={3.2} fill="#fff" />
              {emocion === "cansado" && <rect x={-14} y={-16} width={28} height={14} fill={piel} />}
            </g>
          )}
          <rect
            x={-15} y={cejaY - 4} width={30} height={8} rx={4} fill={look.peinado === "calvo" ? oscurecer(piel, 0.35) : pelo}
            transform={`rotate(${s * cejaAng} 0 ${cejaY})`}
          />
        </g>
      ))}
      {/* nariz */}
      <path d="M10 8 Q22 22 8 28" stroke={oscurecer(piel, 0.25)} strokeWidth={5} fill="none" strokeLinecap="round" />
      {/* mejillas */}
      {(emocion === "feliz" || emocion === "cansado") && [-1, 1].map((s) => <ellipse key={s} cx={s * 46 + 6} cy={24} rx={14} ry={8} fill="#ff6b6b" opacity={0.28} />)}
      {/* barba */}
      {(look.barba === "corta" || look.barba === "larga") && (
        <path d={look.barba === "larga" ? "M-74 8 Q-70 90 0 190 Q70 90 74 8 Q60 70 0 74 Q-60 70 -74 8Z" : "M-76 6 Q-70 92 0 96 Q70 92 76 6 Q60 66 0 70 Q-60 66 -76 6Z"} fill={pelo} />
      )}
      {look.barba && look.barba !== "ninguna" && <path d="M-26 32 Q6 18 38 32 Q6 40 -26 32Z" fill={pelo} />}
      {/* boca */}
      <g transform="translate(6 46)">
        {boca > 0.08 ? (
          <g>
            <ellipse rx={15 + boca * 4} ry={4 + boca * 15} fill="#5a1f24" />
            <ellipse cy={boca * 8} rx={9} ry={3 + boca * 5} fill="#e07a7a" />
          </g>
        ) : emocion === "feliz" ? (
          <path d="M-20 -4 Q0 16 20 -4" stroke="#5a1f24" strokeWidth={6} fill="none" strokeLinecap="round" />
        ) : emocion === "triste" || emocion === "cansado" ? (
          <path d="M-16 6 Q0 -6 16 6" stroke="#5a1f24" strokeWidth={6} fill="none" strokeLinecap="round" />
        ) : emocion === "sorpresa" || emocion === "miedo" ? (
          <ellipse rx={10} ry={13} fill="#5a1f24" />
        ) : emocion === "enfado" ? (
          <path d="M-16 2 L16 2" stroke="#5a1f24" strokeWidth={6} strokeLinecap="round" />
        ) : (
          <path d="M-14 0 Q0 6 14 0" stroke="#5a1f24" strokeWidth={6} fill="none" strokeLinecap="round" />
        )}
      </g>
      {emocion === "miedo" && <path d="M64 -40 Q74 -20 64 -14 Q54 -20 64 -40Z" fill="#9fd3ff" />}
      {emocion === "triste" && <ellipse cx={42} cy={14} rx={5} ry={8} fill="#9fd3ff" opacity={0.8} />}
      {look.gafas && (
        <g stroke="#1d1a22" strokeWidth={5} fill="#ffffff22">
          <circle cx={-22} cy={-4} r={20} />
          <circle cx={34} cy={-4} r={20} />
          <path d="M-2 -6 L14 -6" fill="none" />
        </g>
      )}
    </g>
  );
};

const Torso: React.FC<{ look: Look }> = ({ look }) => {
  const { tipo, color, detalle } = look.ropa;
  const d = detalle ?? oscurecer(color, 0.3);
  const forma = `M-76 ${HOMBRO_Y - 22} Q0 ${HOMBRO_Y - 34} 76 ${HOMBRO_Y - 22} L68 ${CADERA_Y + 6} Q0 ${CADERA_Y + 16} -68 ${CADERA_Y + 6}Z`;
  return (
    <g>
      <path d={forma} fill={tipo === "armadura" ? "#a7b0ba" : tipo === "tilma" ? look.piel : color} />
      {tipo === "armadura" && [0, 1, 2, 3].map((i) => <rect key={i} x={-70} y={HOMBRO_Y + 10 + i * 44} width={140} height={8} fill="#7d858e" />)}
      {(tipo === "traje" || tipo === "uniforme" || tipo === "abrigo" || tipo === "bata") && (
        <g>
          <path d={`M-30 ${HOMBRO_Y - 28} L0 ${HOMBRO_Y + 40} L30 ${HOMBRO_Y - 28}Z`} fill={tipo === "traje" ? "#f4f1ea" : d} />
          {tipo === "traje" && <path d={`M-8 ${HOMBRO_Y - 10} L8 ${HOMBRO_Y - 10} L4 ${HOMBRO_Y + 50} L0 ${HOMBRO_Y + 60} L-4 ${HOMBRO_Y + 50}Z`} fill={d} />}
          {[0, 1, 2].map((i) => <circle key={i} cx={0} cy={HOMBRO_Y + 70 + i * 40} r={7} fill={tipo === "uniforme" ? "#e8c35a" : d} />)}
        </g>
      )}
      {tipo === "uniforme" && [-1, 1].map((s) => <rect key={s} x={s * 76 - (s > 0 ? 30 : 0)} y={HOMBRO_Y - 28} width={30} height={12} rx={4} fill="#e8c35a" />)}
      {tipo === "camisa" && <path d={`M-26 ${HOMBRO_Y - 28} L0 ${HOMBRO_Y + 10} L26 ${HOMBRO_Y - 28}`} stroke={d} strokeWidth={8} fill="none" />}
      {tipo === "mono" && <rect x={-3} y={HOMBRO_Y - 20} width={6} height={190} fill={d} />}
      {tipo === "cuadros" && (
        <g>
          {[0, 1, 2, 3, 4].map((i) => <rect key={`h${i}`} x={-72} y={HOMBRO_Y - 10 + i * 40} width={144} height={16} fill={look.ropa.color2} opacity={0.7} />)}
          {[0, 1, 2, 3].map((i) => <rect key={`v${i}`} x={-60 + i * 36} y={HOMBRO_Y - 28} width={14} height={200} fill={look.ropa.color2} opacity={0.55} />)}
          <path d={`M-28 ${HOMBRO_Y - 28} L0 ${HOMBRO_Y + 12} L28 ${HOMBRO_Y - 28}`} stroke={look.ropa.color2} strokeWidth={10} fill="none" />
        </g>
      )}
      {tipo === "tilma" && (
        <g>
          <path d={`M-80 ${HOMBRO_Y - 24} Q-40 ${HOMBRO_Y + 60} 40 ${HOMBRO_Y + 150} L78 ${HOMBRO_Y - 22}Z`} fill={oscurecer(color, 0.12)} />
          <path d={`M-50 ${HOMBRO_Y + 20} Q0 ${HOMBRO_Y + 90} 50 ${HOMBRO_Y + 150}`} stroke={detalle ?? "#c9a24a"} strokeWidth={10} fill="none" />
          <circle cx={58} cy={HOMBRO_Y - 10} r={16} fill={oscurecer(color, 0.3)} />
        </g>
      )}
      {tipo === "harapos" && <path d={`M-60 ${HOMBRO_Y + 40} l18 10 l-10 14Z M40 ${HOMBRO_Y + 90} l20 6 l-12 16Z`} fill={d} />}
      <rect x={-70} y={CADERA_Y - 18} width={140} height={16} rx={4} fill={d} opacity={tipo === "vestido" ? 0 : 1} />
    </g>
  );
};

const Falda: React.FC<{ look: Look; vaiven: number }> = ({ look, vaiven }) => {
  const { tipo, color, color2 } = look.ropa;
  const largo = { vestido: 230, tunica: 150, abrigo: 150, bata: 170, harapos: 130, galabiya: 250, tilma: 95 }[tipo as string];
  if (!largo) return null;
  const c = tipo === "vestido" || tipo === "tilma" ? color2 : color;
  const ancho = tipo === "vestido" ? 130 : tipo === "galabiya" ? 110 : tipo === "tilma" ? 40 : 92;
  const y0 = CADERA_Y - 14;
  return (
    <path
      d={`M-68 ${y0} L68 ${y0} L${ancho + vaiven} ${y0 + largo} Q0 ${y0 + largo + 14} ${-ancho + vaiven} ${y0 + largo}Z`}
      fill={c}
    />
  );
};

export const Personaje: React.FC<{
  look: Look;
  accion?: Accion;
  emocion?: Emocion;
  f: number;
  semilla?: number;
  boca?: number;
  objeto?: string;
  fase?: number; // fase del paso (caminar) calculada con la distancia: pies sin resbalar
  previa?: Accion; // pose de la que viene
  mezcla?: number; // 0..1 progreso del cambio desde la pose previa
}> = ({ look, accion = "quieto", emocion = "neutral", f, semilla = 0, boca = 0, objeto, fase, previa, mezcla = 1 }) => {
  const destino = calcularPose(accion, f, semilla, fase);
  const p = previa && previa !== accion && mezcla < 1 ? mezclarPose(calcularPose(previa, f, semilla, fase), destino, curvaGesto(mezcla)) : destino;
  const piel = look.piel;
  const { tipo, color, color2 } = look.ropa;
  const mangaCorta = tipo === "tunica" || tipo === "harapos" || tipo === "vestido" || tipo === "tilma";
  const cAntebrazo = mangaCorta ? piel : color;
  const cBrazoTras = oscurecer(color, 0.15);
  const zapato = look.zapatos ?? "#2a211c";
  const sinPantalon = tipo === "vestido" || tipo === "galabiya";
  const cPierna = sinPantalon || tipo === "tilma" ? oscurecer(piel, 0.05) : tipo === "cuadros" ? (look.ropa.detalle ?? "#2f3a4a") : color2;
  const parpadeo = parpadea(f, semilla + look.piel.length);
  const dormido = accion === "dormir";
  // ropa y pelo llegan un poco después que el cuerpo (desfase de la oscilación)
  const tt = f / FPS + semilla * 1.7;
  const vaiven = accion === "caminar" || accion === "correr" || accion === "tambalear" ? Math.sin((fase ?? tt * 6.5) - 0.9) * 9 : Math.sin(tt * 1.7 - 0.8) * 2 + p.incl * 0.6;
  const retrasoPelo = Math.sin(tt * 0.63 + semilla - 0.7) * 3 + (accion === "caminar" || accion === "correr" ? Math.sin((fase ?? tt * 6.5) - 1.1) * 4 : 0);
  const sentado = accion === "sentado" || accion === "escribir";

  const pie = <ellipse cx={14} cy={8} rx={34} ry={17} fill={zapato} />;
  const mano = <circle r={19} fill={piel} />;
  const [mx, my] = posMano(72, HOMBRO_Y, p.hD, p.cD);

  const cuerpo = (
    <g transform={`translate(${p.x} ${p.y}) rotate(${p.incl} 0 ${CADERA_Y})`}>
      {/* brazo trasero */}
      <Extremidad x={-62} y={HOMBRO_Y} a1={p.hI} a2={p.cI} l1={BRAZO} l2={ANTEBRAZO} w={36} c1={cBrazoTras} c2={mangaCorta ? oscurecer(piel, 0.12) : cBrazoTras} fin={<circle r={18} fill={oscurecer(piel, 0.12)} />} />
      {/* piernas */}
      <Extremidad x={-30} y={CADERA_Y} a1={p.pI} a2={p.rI} l1={MUSLO} l2={ESPINILLA} w={42} c1={oscurecer(cPierna, 0.12)} c2={oscurecer(cPierna, 0.12)} fin={pie} />
      <Extremidad x={30} y={CADERA_Y} a1={p.pD} a2={p.rD} l1={MUSLO} l2={ESPINILLA} w={42} c1={cPierna} c2={cPierna} fin={pie} />
      {!sentado && <Falda look={look} vaiven={vaiven} />}
      <g transform={`translate(0 ${CADERA_Y}) scale(1 ${1 + Math.sin(tt * 1.7) * 0.012}) translate(0 ${-CADERA_Y})`}><Torso look={look} /></g>
      {/* cuello y cabeza */}
      <rect x={-20} y={CUELLO_Y - 16} width={40} height={36} fill={oscurecer(piel, 0.1)} />
      <g transform={`translate(0 ${CUELLO_Y - R_CABEZA + 4 + p.cabezaY}) rotate(${p.cabeza} 0 ${R_CABEZA})`}>
        {look.sombrero === "capucha" && <circle r={104} fill={look.colorSombrero ?? "#3b2f2a"} />}
        <g transform={`rotate(${retrasoPelo} 0 -40)`}><Pelo look={look} capa="atras" /></g>
        <circle cx={-74} cy={8} r={17} fill={oscurecer(piel, 0.08)} />
        <circle r={R_CABEZA} fill={piel} />
        <Cara look={look} emocion={emocion} boca={boca} parpadeo={parpadeo} dormido={dormido} />
        {look.sombrero !== "espacial" && look.sombrero !== "yelmo" && <Pelo look={look} capa="delante" />}
        <Sombrero look={look} />
      </g>
      {/* brazo delantero */}
      <Extremidad x={64} y={HOMBRO_Y} a1={p.hD} a2={p.cD} l1={BRAZO} l2={ANTEBRAZO} w={38} c1={color} c2={cAntebrazo} fin={mano} />
      {objeto && accion !== "cargar" && (
        <text x={mx + 8} y={my + 26} fontSize={78} textAnchor="middle" style={{ fontFamily: "'Noto Color Emoji'" }}>
          {objeto}
        </text>
      )}
      {objeto && accion === "cargar" && (
        <text x={0} y={-300} fontSize={120} textAnchor="middle" style={{ fontFamily: "'Noto Color Emoji'" }}>
          {objeto}
        </text>
      )}
    </g>
  );

  const alt = look.altura ?? 1;
  return (
    <g transform={`scale(${alt})`}>
      <ellipse cx={0} cy={6} rx={sentado ? 150 : 110} ry={22} fill="#000" opacity={0.25} />
      {sentado && <rect x={-60} y={-MUSLO - 30} width={170} height={MUSLO + 30} rx={10} fill="#6b4a32" />}
      {dormido ? (
        <g transform={`translate(-300 -40) rotate(-90)`}>
          {cuerpo}
          <text x={-560} y={-120} fontSize={60} fill="#fff" opacity={0.5 + 0.5 * Math.sin(f / 10)} style={{ fontFamily: "sans-serif", fontWeight: 900 }} transform="rotate(90 -560 -120)">
            z z z
          </text>
        </g>
      ) : (
        cuerpo
      )}
    </g>
  );
};

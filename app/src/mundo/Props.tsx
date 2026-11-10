import React from "react";
import { random } from "remotion";

// Objetos de decorado. Origen = punto de apoyo en el suelo; se dibujan hacia arriba (y negativa).
// Para añadir uno nuevo: añade un `case` y documéntalo en oficina/GUIA_GUION.md
export const PROPS_DISPONIBLES = [
  "arbol", "pino", "palmera", "casa", "cabana", "faro", "barco", "velero", "cohete", "farola", "carro", "puesto",
  "roca", "valla", "pozo", "tumba", "hoguera", "tienda", "bandera", "mesa", "estanteria", "chimenea", "cama",
  "antorcha", "cuadro", "consola", "maquina", "barril", "cajas", "planta", "telescopio", "yunque", "piramide", "columna", "reloj",
  "bergantin", "bergantin-hundido", "bote",
  "volcan", "volcan-erupcion", "horno", "molino", "anfora", "termopolio",
  "casa-adobe", "habitat", "invernadero", "rover", "panel-solar", "antena",
  "escalera", "puerta", "tesoro", "sarcofago", "mascara", "estatua", "jarron", "carro-dorado",
  // apocalipsis zombi (2031)
  "coche-abandonado", "barricada", "bidon-fuego", "bloque", "semaforo", "pilar", "puente", "camilla", "radio", "helicoptero",
  // Wisconsin rural (1957)
  "granja", "granero", "coche-antiguo", "coche-patrulla", "estufa", "mostrador", "poste",
  // Tenochtitlan (1519)
  "templo-mayor", "canoa", "ahuejote", "chinampa", "calzada", "brasero", "petate", "metate", "ciudad-lago",
  "granja-fuego", "charco",
] as const;

const Brillo: React.FC<{ r: number; o: number; color?: string; cx?: number; cy?: number }> = ({ r, o, color = "#ffb347", cx = 0, cy = 0 }) => (
  <g>
    <defs>
      <radialGradient id={`brillo-${color.slice(1)}`}>
        <stop offset="0%" stopColor={color} stopOpacity={1} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </radialGradient>
    </defs>
    <circle cx={cx} cy={cy} r={r} fill={`url(#brillo-${color.slice(1)})`} opacity={o} />
  </g>
);

export const Prop: React.FC<{ tipo: string; f: number; noche: boolean }> = ({ tipo, f, noche }) => {
  const llama = (x: number, y: number, s = 1) => (
    <g transform={`translate(${x} ${y}) scale(${s * (1 + Math.sin(f / 2.3) * 0.08)} ${s * (1 + Math.cos(f / 1.9) * 0.1)})`}>
      <Brillo r={160} o={0.35} />
      <path d="M0 -70 C30 -30 34 0 0 14 C-34 0 -30 -30 0 -70Z" fill="#ff7b2f" />
      <path d="M0 -36 C14 -16 16 0 0 8 C-16 0 -14 -16 0 -36Z" fill="#ffe07a" />
    </g>
  );
  switch (tipo) {
    case "arbol":
      return (
        <g>
          <rect x={-22} y={-300} width={44} height={300} fill="#5a3d28" />
          <circle cx={0} cy={-380} r={150} fill="#3f6e3a" />
          <circle cx={-100} cy={-300} r={100} fill="#4a7d43" />
          <circle cx={100} cy={-310} r={105} fill="#36612f" />
        </g>
      );
    case "pino":
      return (
        <g>
          <rect x={-18} y={-120} width={36} height={120} fill="#4a3220" />
          {[0, 1, 2].map((i) => <polygon key={i} points={`0,${-560 + i * 130} ${-150 + i * -20},${-260 + i * 90} ${150 + i * 20},${-260 + i * 90}`} fill={["#2f5a3a", "#294f33", "#23452c"][i]} />)}
        </g>
      );
    case "palmera":
      return (
        <g>
          <path d="M-10 0 Q-40 -260 20 -520 L44 -520 Q-10 -260 20 0Z" fill="#8a6a44" />
          {[-60, -25, 15, 50, 85, 130].map((a, i) => (
            <path key={i} d="M0 0 Q90 -40 210 30 Q90 -10 0 0Z" fill="#3f8a3a" transform={`translate(32 -520) rotate(${a + Math.sin(f / 20 + i) * 3})`} />
          ))}
        </g>
      );
    case "casa":
    case "cabana": {
      const cab = tipo === "cabana";
      return (
        <g>
          <rect x={-200} y={-300} width={400} height={300} fill={cab ? "#7a5234" : "#d8c3a0"} />
          {cab && [0, 1, 2, 3, 4].map((i) => <rect key={i} x={-200} y={-300 + i * 60} width={400} height={6} fill="#5a3a22" />)}
          <polygon points="-240,-300 0,-480 240,-300" fill={cab ? "#4a3220" : "#9a3b2a"} />
          <rect x={-40} y={-150} width={80} height={150} fill="#4a3426" />
          <rect x={-160} y={-230} width={80} height={70} fill={noche ? "#ffd27a" : "#5a6b7a"} stroke="#4a3426" strokeWidth={8} />
          <rect x={80} y={-230} width={80} height={70} fill={noche ? "#ffd27a" : "#5a6b7a"} stroke="#4a3426" strokeWidth={8} />
          <rect x={110} y={-470} width={50} height={110} fill="#5a4a42" />
          <circle cx={135} cy={-500 - (f % 60)} r={20 + (f % 60) / 3} fill="#bbb" opacity={0.4 - (f % 60) / 160} />
        </g>
      );
    }
    case "faro": {
      const g = (f * 2.2) % 360;
      const c = Math.cos((g * Math.PI) / 180);
      return (
        <g>
          {noche && (
            <g transform="translate(0 -660)">
              <polygon points="0,0 2000,-200 2000,200" fill="#fff3c4" opacity={0.22 * Math.abs(c)} transform={`scale(${c >= 0 ? 1 : -1} 1)`} />
              <circle r={120} fill="#fff3c4" opacity={0.25} />
            </g>
          )}
          <polygon points="-110,0 110,0 70,-560 -70,-560" fill="#f1ece2" />
          {[0, 1, 2].map((i) => <polygon key={i} points={`${-104 + i * 13},${-70 - i * 170} ${104 - i * 13},${-70 - i * 170} ${98 - i * 13},${-150 - i * 170} ${-98 + i * 13},${-150 - i * 170}`} fill="#b8322d" />)}
          <rect x={-90} y={-585} width={180} height={28} fill="#2b2b2b" />
          <rect x={-58} y={-690} width={116} height={105} fill={noche ? "#ffe9a3" : "#cfe6f0"} stroke="#2b2b2b" strokeWidth={10} />
          <polygon points="-78,-690 78,-690 0,-760" fill="#2b2b2b" />
        </g>
      );
    }
    case "barco":
      return (
        <g transform={`translate(0 ${Math.sin(f / 12) * 8 - 60}) rotate(${Math.sin(f / 16) * 2.5})`}>
          <path d="M-320 0 L320 0 L260 110 L-280 110 Z" fill="#1d1d24" />
          <rect x={-200} y={-90} width={330} height={90} fill="#2c2c36" />
          <rect x={-100} y={-240} width={60} height={150} fill="#8a2b22" />
          <rect x={20} y={-210} width={60} height={120} fill="#8a2b22" />
          {[0, 1, 2, 3, 4, 5].map((i) => <circle key={i} cx={-170 + i * 56} cy={-45} r={11} fill={noche ? "#ffd27a" : "#9ab"} />)}
          <circle cx={-70} cy={-270 - (f % 50)} r={30 + (f % 50) / 2} fill="#aaa" opacity={0.4 - (f % 50) / 130} />
        </g>
      );
    case "velero":
      return (
        <g transform={`translate(0 ${Math.sin(f / 12) * 8 - 40}) rotate(${Math.sin(f / 16) * 3})`}>
          <path d="M-260 0 L260 0 L200 90 L-220 90Z" fill="#6b4226" />
          <rect x={-10} y={-520} width={20} height={520} fill="#4a2e1a" />
          <path d="M10 -500 Q200 -300 10 -60Z" fill="#efe6d2" />
          <path d="M-10 -460 Q-180 -280 -10 -80Z" fill="#e2d6bd" />
          <rect x={10} y={-530} width={80} height={40} fill="#b8322d" />
        </g>
      );
    case "cohete":
      return (
        <g>
          <path d="M-90 -100 L-90 -620 Q0 -820 90 -620 L90 -100Z" fill="#e9edf2" />
          <circle cx={0} cy={-560} r={40} fill="#5ab0e8" stroke="#7d8794" strokeWidth={10} />
          <path d="M-90 -260 L-180 -80 L-90 -100Z M90 -260 L180 -80 L90 -100Z" fill="#c8402f" />
          <rect x={-60} y={-100} width={120} height={60} fill="#7d8794" />
          <rect x={-90} y={-380} width={180} height={24} fill="#c8402f" />
        </g>
      );
    case "farola":
      return (
        <g>
          <rect x={-10} y={-460} width={20} height={460} fill="#2b2b30" />
          <rect x={-40} y={-540} width={80} height={90} fill={noche ? "#ffe39a" : "#c9d6dc"} stroke="#2b2b30" strokeWidth={10} />
          {noche && <Brillo cy={-495} r={260} o={0.4} color="#ffd27a" />}
          <polygon points="-55,-540 55,-540 0,-590" fill="#2b2b30" />
        </g>
      );
    case "carro":
      return (
        <g>
          <rect x={-200} y={-200} width={400} height={110} fill="#7a5234" />
          <rect x={-200} y={-210} width={400} height={20} fill="#5a3a22" />
          {[-130, 130].map((x) => (
            <g key={x} transform={`translate(${x} -80)`}>
              <circle r={80} fill="none" stroke="#4a3220" strokeWidth={16} />
              {[0, 45, 90, 135].map((a) => <line key={a} x1={-80} y1={0} x2={80} y2={0} stroke="#4a3220" strokeWidth={8} transform={`rotate(${a})`} />)}
            </g>
          ))}
          <rect x={200} y={-150} width={200} height={14} fill="#5a3a22" />
        </g>
      );
    case "puesto":
      return (
        <g>
          <rect x={-220} y={-200} width={440} height={200} fill="#8a5a3a" />
          {[-180, 180].map((x) => <rect key={x} x={x - 10} y={-460} width={20} height={260} fill="#5a3a22" />)}
          {[0, 1, 2, 3, 4, 5].map((i) => <path key={i} d={`M${-240 + i * 80} -460 h80 v60 q-40 30 -80 0z`} fill={i % 2 ? "#f2efe6" : "#c8402f"} />)}
          {["🍎", "🥖", "🧀", "🐟"].map((e, i) => <text key={i} x={-160 + i * 105} y={-215} fontSize={70} textAnchor="middle" style={{ fontFamily: "'Noto Color Emoji'" }}>{e}</text>)}
        </g>
      );
    case "roca":
      return <path d="M-180 0 Q-200 -120 -90 -170 Q20 -220 120 -150 Q200 -90 180 0Z" fill="#6b6560" />;
    case "valla":
      return (
        <g fill="#8a6a44">
          {[-240, -120, 0, 120, 240].map((x) => <rect key={x} x={x - 12} y={-160} width={24} height={160} />)}
          <rect x={-260} y={-130} width={520} height={18} />
          <rect x={-260} y={-60} width={520} height={18} />
        </g>
      );
    case "pozo":
      return (
        <g>
          <rect x={-130} y={-140} width={260} height={140} rx={20} fill="#8a8178" />
          {[0, 1].map((i) => <rect key={i} x={-130} y={-140 + i * 70} width={260} height={8} fill="#6b635b" />)}
          <rect x={-120} y={-360} width={18} height={220} fill="#5a3a22" />
          <rect x={102} y={-360} width={18} height={220} fill="#5a3a22" />
          <polygon points="-160,-350 0,-440 160,-350" fill="#6b3a2a" />
        </g>
      );
    case "tumba":
      return (
        <g>
          <path d="M-70 0 L-70 -160 Q0 -240 70 -160 L70 0Z" fill="#9a9590" />
          <rect x={-8} y={-190} width={16} height={90} fill="#77726d" />
          <rect x={-35} y={-160} width={70} height={16} fill="#77726d" />
        </g>
      );
    case "hoguera":
      return (
        <g>
          <rect x={-110} y={-30} width={220} height={30} rx={14} fill="#5a3a22" transform="rotate(12)" />
          <rect x={-110} y={-30} width={220} height={30} rx={14} fill="#4a3220" transform="rotate(-12)" />
          {llama(0, -40, 1.6)}
        </g>
      );
    case "tienda":
      return (
        <g>
          <polygon points="-260,0 0,-340 260,0" fill="#c9a76a" />
          <polygon points="-50,0 0,-280 50,0" fill="#4a3426" />
          <line x1={0} y1={-340} x2={0} y2={-400} stroke="#5a3a22" strokeWidth={10} />
        </g>
      );
    case "bandera":
      return (
        <g>
          <rect x={-8} y={-560} width={16} height={560} fill="#9a9a9a" />
          <path d={`M8 -550 Q90 ${-570 + Math.sin(f / 6) * 20} 200 -550 L200 -430 Q90 ${-450 + Math.sin(f / 6 + 1) * 20} 8 -430Z`} fill="#c8402f" />
        </g>
      );
    case "mesa":
      return (
        <g>
          <rect x={-240} y={-230} width={480} height={30} fill="#6b4a32" />
          <rect x={-220} y={-200} width={26} height={200} fill="#5a3d28" />
          <rect x={194} y={-200} width={26} height={200} fill="#5a3d28" />
          <rect x={-150} y={-260} width={120} height={30} fill="#e9dcc0" />
          <rect x={60} y={-300} width={40} height={70} fill="#c9b18f" />
        </g>
      );
    case "estanteria":
      return (
        <g>
          <rect x={-190} y={-620} width={380} height={620} fill="#5a3d28" />
          {[0, 1, 2, 3].map((r) => (
            <g key={r}>
              <rect x={-170} y={-600 + r * 150} width={340} height={130} fill="#3a2718" />
              {[0, 1, 2, 3, 4, 5, 6].map((i) => <rect key={i} x={-160 + i * 46} y={-590 + r * 150 + (i % 3) * 8} width={38} height={120 - (i % 3) * 8} fill={["#8a2b22", "#2f4a6b", "#c9a24a", "#3f6e3a", "#6b3a6b"][(i + r) % 5]} />)}
            </g>
          ))}
        </g>
      );
    case "chimenea":
      return (
        <g>
          <rect x={-240} y={-420} width={480} height={420} fill="#8a8178" />
          <rect x={-280} y={-450} width={560} height={40} fill="#6b635b" />
          <path d="M-140 0 L-140 -200 Q0 -300 140 -200 L140 0Z" fill="#1b1512" />
          {llama(0, -40, 1.3)}
          <Brillo cy={-100} r={520} o={0.22 + Math.sin(f / 4) * 0.04} color="#ff9a3c" />
        </g>
      );
    case "cama":
      return (
        <g>
          <rect x={-300} y={-160} width={600} height={100} fill="#f0e6d2" />
          <rect x={-300} y={-150} width={420} height={90} fill="#7a3b3b" />
          <rect x={-320} y={-60} width={640} height={30} fill="#5a3d28" />
          <rect x={-320} y={-300} width={34} height={300} fill="#5a3d28" />
          <rect x={286} y={-220} width={34} height={220} fill="#5a3d28" />
          <ellipse cx={210} cy={-180} rx={70} ry={34} fill="#fff" />
        </g>
      );
    case "antorcha":
      return (
        <g transform="translate(0 -520)">
          <rect x={-12} y={0} width={24} height={140} fill="#5a3a22" transform="rotate(-10)" />
          {llama(0, -10, 0.9)}
        </g>
      );
    case "cuadro":
      return (
        <g transform="translate(0 -700)">
          <rect x={-150} y={-110} width={300} height={220} fill="#c9a24a" />
          <rect x={-125} y={-85} width={250} height={170} fill="#3d5a6b" />
          <circle cx={40} cy={-30} r={30} fill="#f2c26a" />
          <path d="M-125 85 L-40 -10 L30 60 L80 20 L125 85Z" fill="#2f4a3a" />
        </g>
      );
    case "consola":
      return (
        <g>
          <path d="M-280 0 L-280 -220 L-220 -320 L220 -320 L280 -220 L280 0Z" fill="#3a414b" />
          <rect x={-200} y={-300} width={400} height={70} fill="#0b1a26" />
          {Array.from({ length: 8 }).map((_, i) => <rect key={i} x={-190 + i * 48} y={-290 + ((f / 3 + i * 7) % 40)} width={30} height={8} fill="#5ef2ff" opacity={0.8} />)}
          {[0, 1, 2, 3, 4].map((i) => <circle key={i} cx={-180 + i * 90} cy={-180} r={16} fill={["#ff5a5a", "#5ef2a0", "#ffd25e", "#5ef2ff", "#ff4fd8"][i]} opacity={(f + i * 9) % 30 < 20 ? 1 : 0.3} />)}
        </g>
      );
    case "maquina":
      return (
        <g>
          <rect x={-260} y={-400} width={520} height={400} fill="#5a5f66" />
          <circle cx={-110} cy={-230} r={110} fill="#7d8794" />
          <g transform={`translate(-110 -230) rotate(${f * 4})`}>{[0, 60, 120].map((a) => <rect key={a} x={-100} y={-12} width={200} height={24} fill="#3a414b" transform={`rotate(${a})`} />)}</g>
          <rect x={60} y={-360} width={160} height={120} fill="#2b2f35" />
          <rect x={120} y={-560} width={60} height={160} fill="#3a414b" />
          <circle cx={150} cy={-590 - (f % 40)} r={24 + (f % 40) / 2} fill="#999" opacity={0.45 - (f % 40) / 100} />
        </g>
      );
    case "barril":
      return (
        <g>
          <path d="M-90 0 Q-120 -130 -90 -260 L90 -260 Q120 -130 90 0Z" fill="#8a5a3a" />
          {[-220, -130, -40].map((y) => <rect key={y} x={-105} y={y} width={210} height={14} fill="#4a4a4a" />)}
        </g>
      );
    case "cajas":
      return (
        <g>
          {[[-130, 0], [100, 0], [-20, -200]].map(([x, y], i) => (
            <g key={i} transform={`translate(${x} ${y})`}>
              <rect x={-100} y={-200} width={200} height={200} fill="#b48a5a" stroke="#7a5a3a" strokeWidth={10} />
              <path d="M-100 -200 L100 0 M100 -200 L-100 0" stroke="#7a5a3a" strokeWidth={8} />
            </g>
          ))}
        </g>
      );
    case "planta":
      return (
        <g>
          <path d="M-70 0 L-90 -130 L90 -130 L70 0Z" fill="#b5653f" />
          {[-40, -15, 10, 35].map((a, i) => <ellipse key={i} cx={0} cy={-230} rx={30} ry={110} fill="#3f7a3a" transform={`rotate(${a + Math.sin(f / 25 + i) * 3} 0 -130)`} />)}
        </g>
      );
    case "telescopio":
      return (
        <g>
          {[-30, 0, 30].map((a) => <rect key={a} x={-6} y={-300} width={12} height={300} fill="#5a3d28" transform={`rotate(${a} 0 -300)`} />)}
          <rect x={-40} y={-360} width={320} height={70} rx={20} fill="#c9a24a" transform="rotate(-30 0 -320)" />
        </g>
      );
    case "yunque":
      return (
        <g>
          <rect x={-60} y={-120} width={120} height={120} fill="#3a3a40" />
          <path d="M-180 -200 L160 -200 Q220 -190 230 -160 L100 -160 L80 -120 L-80 -120 L-100 -160 L-180 -160Z" fill="#4a4a52" />
          {f % 18 < 3 && [0, 1, 2, 3].map((i) => <circle key={i} cx={-20 + i * 20} cy={-230 - i * 12} r={6} fill="#ffb347" />)}
        </g>
      );
    case "piramide":
      return (
        <g transform="scale(1.6)">
          <polygon points="-420,0 0,-420 420,0" fill="#d9b37a" />
          <polygon points="0,-420 420,0 120,0" fill="#b8925a" />
        </g>
      );
    case "columna":
      return (
        <g>
          <rect x={-70} y={-700} width={140} height={700} fill="#e6dfd2" />
          {[-40, -10, 20, 50].map((x) => <rect key={x} x={x - 6} y={-680} width={12} height={660} fill="#c9c1b2" />)}
          <rect x={-100} y={-740} width={200} height={50} fill="#d6cfc2" />
          <rect x={-100} y={-30} width={200} height={30} fill="#d6cfc2" />
        </g>
      );
    case "reloj":
      return (
        <g>
          <rect x={-90} y={-720} width={180} height={720} fill="#5a3d28" />
          <circle cx={0} cy={-580} r={70} fill="#f0e6d2" />
          <line x1={0} y1={-580} x2={0} y2={-630} stroke="#222" strokeWidth={8} transform={`rotate(${f * 0.5} 0 -580)`} />
          <line x1={0} y1={-580} x2={40} y2={-580} stroke="#222" strokeWidth={8} />
          <line x1={0} y1={-480} x2={0} y2={-220} stroke="#c9a24a" strokeWidth={8} transform={`rotate(${Math.sin(f / 8) * 14} 0 -480)`} />
          <circle cx={Math.sin((Math.sin(f / 8) * 14 * Math.PI) / 180) * -260} cy={-480 + Math.cos((Math.sin(f / 8) * 14 * Math.PI) / 180) * 260} r={24} fill="#c9a24a" />
        </g>
      );
    case "bergantin":
    case "bergantin-hundido": {
      // barco de tres palos atrapado en el hielo (tipo Endurance); la versión hundida está escorada y medio tragada
      const hundido = tipo === "bergantin-hundido";
      const casco = (
        <g>
          <path d="M-420 0 L420 0 L360 140 L-380 140Z" fill="#2a1e18" />
          <rect x={-400} y={-30} width={800} height={34} fill="#4a3426" />
          {[-280, 0, 260].map((x, i) => (
            <g key={x}>
              <rect x={x - 9} y={-620 + i * 40} width={18} height={620 - i * 40} fill="#3a2a1e" />
              {[0, 1, 2].map((k) => <rect key={k} x={x - 120 + k * 10} y={-560 + i * 40 + k * 150} width={240 - k * 20} height={8} fill="#3a2a1e" />)}
            </g>
          ))}
          {[-280, 0, 260].map((x) => <line key={`c${x}`} x1={x} y1={-600} x2={-420} y2={-20} stroke="#3a2a1e" strokeWidth={3} opacity={0.6} />)}
          <path d="M-420 -10 L-560 -160" stroke="#3a2a1e" strokeWidth={14} />
          {/* hielo apretando el casco */}
          {[-460, -300, 300, 460].map((x, i) => <polygon key={i} points={`${x - 80},150 ${x},${-40 - (i % 2) * 40} ${x + 90},150`} fill="#dfeaf3" stroke="#a9c3d6" strokeWidth={6} />)}
        </g>
      );
      if (!hundido) return <g transform={`rotate(${Math.sin(f / 50) * 0.6})`}>{casco}</g>;
      return (
        <g>
          <g transform={`translate(0 ${120 + f * 0.25}) rotate(${-18 - f * 0.02})`}>{casco}</g>
          <rect x={-700} y={60} width={1400} height={400} fill="#e8f0f6" />
          {[-500, -200, 150, 420].map((x, i) => <polygon key={i} points={`${x - 120},70 ${x},${-30 - i * 10} ${x + 130},70`} fill="#f4f8fb" stroke="#b9cfe0" strokeWidth={6} />)}
        </g>
      );
    }
    case "volcan":
    case "volcan-erupcion": {
      // el Vesubio al fondo (se dibuja grande: usa "escala" 1.5–2.5 y x lejos del centro)
      const erup = tipo === "volcan-erupcion";
      const h = Math.min(1, f / 90);
      return (
        <g>
          <path d="M-700 0 L-180 -520 Q0 -560 180 -520 L700 0Z" fill="#5a5560" />
          <path d="M-180 -520 Q-60 -470 0 -540 Q60 -470 180 -520" fill="#47434c" />
          {!erup && <ellipse cx={0} cy={-600} rx={60} ry={24} fill="#cfcfd6" opacity={0.35} />}
          {erup && (
            <g>
              {/* columna "como un pino" (Plinio el Joven) */}
              <path d={`M-60 -540 Q-40 ${-900 * h} -20 ${-1300 * h} L20 ${-1300 * h} Q40 ${-900 * h} 60 -540Z`} fill="#6b6460" />
              {Array.from({ length: 9 }).map((_, i) => (
                <circle key={i} cx={-380 + i * 95 + Math.sin(f / 20 + i) * 20} cy={-1300 * h - 80 + Math.sin(i * 1.7) * 60} r={(130 + (i % 3) * 40) * h} fill={i % 2 ? "#5a5450" : "#7a7470"} />
              ))}
              <path d="M-120 -520 Q0 -600 120 -520" stroke="#ff6a2a" strokeWidth={18} fill="none" opacity={0.6 + 0.3 * Math.sin(f / 3)} />
              {Array.from({ length: 6 }).map((_, i) => <circle key={`r${i}`} cx={-80 + i * 32} cy={-560 - ((f * 6 + i * 50) % 300)} r={8} fill="#ff8a3a" opacity={0.8} />)}
            </g>
          )}
        </g>
      );
    }
    case "horno":
      return (
        <g>
          <rect x={-260} y={-320} width={520} height={320} fill="#b07a52" />
          {Array.from({ length: 24 }).map((_, i) => <rect key={i} x={-260 + (i % 8) * 65} y={-320 + Math.floor(i / 8) * 40} width={60} height={34} fill="#9a6644" />)}
          <path d="M-130 -40 L-130 -160 Q0 -270 130 -160 L130 -40Z" fill="#1b1210" />
          <ellipse cx={0} cy={-100} rx={100} ry={50} fill="#ff7b2f" opacity={0.35 + 0.15 * Math.sin(f / 4)} />
          {[-60, 0, 60].map((x) => <circle key={x} cx={x} cy={-80} r={26} fill="#8a5a2a" />)}
          <rect x={-300} y={-40} width={600} height={40} fill="#8a6a4a" />
        </g>
      );
    case "molino":
      // molino de lava pompeyano (meta + catillus) con un burro dando vueltas
      return (
        <g>
          <path d="M-90 -40 L-60 -260 L60 -260 L90 -40Z" fill="#4a4448" />
          <path d="M-60 -260 L-90 -420 L90 -420 L60 -260Z" fill="#3a3438" />
          <rect x={-120} y={-40} width={240} height={40} fill="#5a5458" />
          <rect x={-220} y={-300} width={440} height={16} fill="#6b4a2e" transform={`rotate(${Math.sin(f / 15) * 8} 0 -292)`} />
          <text x={180 + Math.cos(f / 30) * 40} y={-40} fontSize={150} textAnchor="middle" style={{ fontFamily: "'Noto Color Emoji'" }}>🐴</text>
        </g>
      );
    case "anfora":
      return (
        <g>
          {[-80, 0, 80].map((x, i) => (
            <g key={x} transform={`translate(${x} 0) rotate(${(i - 1) * 6})`}>
              <path d="M-40 -40 Q-70 -180 -30 -280 L30 -280 Q70 -180 40 -40 L0 0Z" fill="#c07a4a" />
              <rect x={-20} y={-320} width={40} height={40} fill="#a8653a" />
              <path d="M-20 -300 q-40 10 -30 50 M20 -300 q40 10 30 50" stroke="#a8653a" strokeWidth={10} fill="none" />
            </g>
          ))}
        </g>
      );
    case "termopolio":
      // mostrador con dolia (vasijas empotradas) y frescos
      return (
        <g>
          <rect x={-320} y={-220} width={640} height={220} fill="#d9c49a" />
          <rect x={-320} y={-240} width={640} height={30} fill="#8a3a2a" />
          {[-200, 0, 200].map((x) => <ellipse key={x} cx={x} cy={-240} rx={60} ry={16} fill="#3a2a1a" />)}
          <path d="M-280 -180 q60 -40 120 0 q60 40 120 0" stroke="#3a6a5a" strokeWidth={10} fill="none" />
          <circle cx={180} cy={-120} r={40} fill="#c84a2a" opacity={0.8} />
          <rect x={-300} y={-60} width={600} height={14} fill="#a8853a" />
        </g>
      );
    case "casa-adobe":
      // casa de adobe encalada con cúpula, típica de Egipto / Oriente Próximo
      return (
        <g>
          <rect x={-240} y={-260} width={480} height={260} fill="#d8b98a" />
          <path d="M-120 -260 A120 110 0 0 1 120 -260Z" fill="#cfae7c" />
          <rect x={-240} y={-275} width={480} height={18} fill="#c49e6a" />
          <path d="M-40 0 L-40 -130 Q0 -170 40 -130 L40 0Z" fill="#5a3e26" />
          {[-170, 130].map((x) => <rect key={x} x={x} y={-200} width={44} height={56} fill={noche ? "#ffd27a" : "#4a3626"} />)}
          {[-200, 200].map((x) => <rect key={`v${x}`} x={x - 6} y={-290} width={12} height={40} fill="#8a6a42" />)}
        </g>
      );
    case "habitat":
      return (
        <g>
          <path d="M-360 0 A360 300 0 0 1 360 0Z" fill="#d9d4cc" />
          <path d="M-360 0 A360 300 0 0 1 360 0" fill="none" stroke="#a8a29a" strokeWidth={10} />
          {[-200, 0, 200].map((x) => <path key={x} d={`M${x} 0 Q${x * 0.6} -200 0 -300`} stroke="#b8b2aa" strokeWidth={6} fill="none" />)}
          <rect x={-70} y={-140} width={140} height={140} rx={20} fill="#6b737d" />
          <rect x={-50} y={-120} width={100} height={60} rx={10} fill={noche ? "#ffd27a" : "#2a3a4a"} />
          {[-250, 250].map((x) => <circle key={x} cx={x} cy={-110} r={34} fill={noche ? "#ffd27a" : "#2a3a4a"} stroke="#8a8f96" strokeWidth={8} />)}
          <rect x={-380} y={-10} width={760} height={30} fill="#7a6a5e" />
        </g>
      );
    case "invernadero":
      return (
        <g>
          <path d="M-320 0 L-320 -180 Q0 -380 320 -180 L320 0Z" fill="#bfe6d0" opacity={0.45} stroke="#e6f2ec" strokeWidth={8} />
          {Array.from({ length: 9 }).map((_, i) => <circle key={i} cx={-260 + i * 65} cy={-60 - (i % 2) * 30} r={36} fill="#3f9a4a" />)}
          {Array.from({ length: 6 }).map((_, i) => <line key={`l${i}`} x1={-300 + i * 120} y1={-200} x2={-300 + i * 120} y2={-150} stroke="#ff4fd8" strokeWidth={8} opacity={0.7} />)}
          <circle cx={0} cy={-150} r={260} fill="#ff4fd8" opacity={0.05} />
        </g>
      );
    case "rover":
      return (
        <g transform={`translate(${Math.sin(f / 40) * 6} 0)`}>
          <rect x={-260} y={-230} width={520} height={130} rx={30} fill="#e8e4dc" />
          <rect x={-200} y={-210} width={160} height={70} rx={14} fill="#2a3a4a" />
          <rect x={-280} y={-110} width={560} height={24} fill="#8a8f96" />
          {[-200, 0, 200].map((x) => (
            <g key={x} transform={`translate(${x} -60)`}>
              <circle r={62} fill="#2b2b30" />
              <circle r={30} fill="#7d8794" />
            </g>
          ))}
          <rect x={150} y={-330} width={14} height={100} fill="#8a8f96" />
          <circle cx={157} cy={-340} r={20} fill="#c8402f" />
        </g>
      );
    case "panel-solar":
      return (
        <g>
          <rect x={-10} y={-200} width={20} height={200} fill="#7d8794" />
          <g transform="translate(0 -210) rotate(-12)">
            <rect x={-220} y={-80} width={440} height={160} fill="#1d3b6e" stroke="#c9d6dc" strokeWidth={6} />
            {[-110, 0, 110].map((x) => <line key={x} x1={x} y1={-80} x2={x} y2={80} stroke="#5a7aa8" strokeWidth={4} />)}
            <line x1={-220} y1={0} x2={220} y2={0} stroke="#5a7aa8" strokeWidth={4} />
          </g>
        </g>
      );
    case "antena":
      return (
        <g>
          <polygon points="-60,0 60,0 12,-380 -12,-380" fill="#8a8f96" />
          <g transform="translate(0 -400) rotate(-25)">
            <path d="M-170 0 Q0 120 170 0Z" fill="#e8e4dc" stroke="#a8a29a" strokeWidth={6} />
            <line x1={0} y1={50} x2={0} y2={-80} stroke="#7d8794" strokeWidth={8} />
          </g>
          <circle cx={0} cy={-480} r={10} fill="#ff5a5a" opacity={f % 30 < 15 ? 1 : 0.2} />
        </g>
      );
    case "bote":
      return (
        <g>
          <path d="M-300 -40 Q0 40 300 -40 L250 -140 L-250 -140Z" fill="#6b4a2e" />
          <path d="M-250 -140 L250 -140" stroke="#3a2a1a" strokeWidth={14} />
          {[-150, 0, 150].map((x) => <rect key={x} x={x - 8} y={-140} width={16} height={60} fill="#3a2a1a" />)}
          <rect x={-8} y={-460} width={16} height={330} fill="#3a2a1a" />
          <path d="M8 -450 Q140 -320 8 -170Z" fill="#d9cfb8" />
        </g>
      );
    case "escalera":
      // escalones excavados que bajan hacia la tumba (se ven desde arriba en perspectiva)
      return (
        <g>
          <path d="M-260 30 L260 30 L200 -60 L-200 -60Z" fill="#7a5a36" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={i} x={-190 + i * 14} y={-50 + i * 12} width={380 - i * 28} height={10} fill={i % 2 ? "#c9a26a" : "#b08a56"} />
          ))}
          <path d="M-200 -60 L-150 30 M200 -60 L150 30" stroke="#5a3e22" strokeWidth={8} />
        </g>
      );
    case "puerta": {
      // puerta tapiada con yeso y sellos ovalados de la necrópolis
      return (
        <g>
          <rect x={-230} y={-620} width={460} height={620} fill="#6b4a2a" />
          <rect x={-190} y={-580} width={380} height={580} fill="#d8c9a8" />
          {Array.from({ length: 14 }).map((_, i) => (
            <g key={i} transform={`translate(${-140 + (i % 4) * 95} ${-520 + Math.floor(i / 4) * 140})`}>
              <ellipse rx={34} ry={46} fill="none" stroke="#9a7a4a" strokeWidth={5} />
              <path d="M-14 -16 L14 -16 M0 -24 L0 20 M-12 10 L12 10" stroke="#9a7a4a" strokeWidth={4} />
            </g>
          ))}
          <path d="M-60 -300 l40 30 l-20 40 l50 60" stroke="#b8a888" strokeWidth={6} fill="none" />
        </g>
      );
    }
    case "tesoro":
      return (
        <g>
          <ellipse cx={0} cy={0} rx={320} ry={30} fill="#00000044" />
          <path d="M-300 0 L-240 -150 L-120 -160 L-60 -60 L40 -200 L180 -180 L300 0Z" fill="#c9962e" />
          {Array.from({ length: 18 }).map((_, i) => (
            <circle key={i} cx={-250 + (i * 31) % 520} cy={-30 - ((i * 47) % 140)} r={14} fill="#f2cf5a" opacity={0.6 + 0.4 * Math.sin(f / 6 + i)} />
          ))}
          <rect x={-200} y={-260} width={120} height={110} fill="#e0b040" stroke="#8a6a1a" strokeWidth={6} />
          <rect x={60} y={-330} width={60} height={160} rx={20} fill="#2a8a8a" stroke="#f2cf5a" strokeWidth={6} />
          <path d="M-20 -230 q40 -60 80 0" stroke="#f2cf5a" strokeWidth={10} fill="none" />
          {[0, 1, 2].map((i) => <path key={i} d={`M${-240 + i * 180} ${-120 - i * 30} l12 -24 l12 24 l-12 24z`} fill="#fff8d0" opacity={(f + i * 13) % 40 < 6 ? 1 : 0} />)}
        </g>
      );
    case "sarcofago":
      return (
        <g>
          <rect x={-340} y={-300} width={680} height={300} fill="#b8a07a" stroke="#7a6a4a" strokeWidth={8} />
          <path d="M-320 -300 L320 -300 L300 -360 L-300 -360Z" fill="#a08a64" />
          {[-240, -120, 0, 120, 240].map((x) => <path key={x} d={`M${x - 30} -240 q30 -40 60 0 v120 h-60z`} fill="none" stroke="#7a6a4a" strokeWidth={5} />)}
        </g>
      );
    case "mascara":
      return (
        <g transform="translate(0 -40)">
          <rect x={-40} y={-80} width={80} height={80} fill="#7a5a3a" />
          <path d="M-170 -110 L-150 -420 Q0 -470 150 -420 L170 -110 Q0 -60 -170 -110Z" fill="#2a4a8a" />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => <rect key={i} x={-165} y={-400 + i * 42} width={330} height={16} fill="#e8b830" />)}
          <path d="M-100 -380 Q0 -440 100 -380 L95 -220 Q0 -140 -95 -220Z" fill="#f2c040" />
          {[-1, 1].map((s2) => <path key={s2} d={`M${s2 * 60 - 26} -310 q26 -14 52 0 q-26 14 -52 0`} fill="#fff" stroke="#1a1a2a" strokeWidth={8} />)}
          {[-1, 1].map((s2) => <circle key={s2} cx={s2 * 60} cy={-310} r={9} fill="#1a1a2a" />)}
          <path d="M-12 -260 q12 30 24 0" stroke="#c99a20" strokeWidth={6} fill="none" />
          <path d="M-30 -225 q30 12 60 0" stroke="#a0401a" strokeWidth={8} fill="none" />
          <path d="M-16 -200 L16 -200 L10 -110 L-10 -110Z" fill="#2a4a8a" stroke="#e8b830" strokeWidth={5} />
          <path d="M-30 -420 q30 -50 60 0" fill="#e8b830" />
          <circle cx={0} cy={-300} r={260} fill="#fff3b0" opacity={0.06 + 0.04 * Math.sin(f / 8)} />
        </g>
      );
    case "estatua":
      return (
        <g>
          <rect x={-90} y={-60} width={180} height={60} fill="#3a2a1a" />
          <rect x={-55} y={-420} width={110} height={360} rx={20} fill="#15151a" />
          <rect x={-60} y={-260} width={120} height={70} fill="#e0b040" />
          <circle cx={0} cy={-470} r={55} fill="#15151a" />
          <path d="M-70 -520 L70 -520 L60 -420 L-60 -420Z" fill="#e0b040" />
          {[-1, 1].map((s2) => <rect key={s2} x={s2 * 70 - 20} y={-400} width={40} height={180} rx={18} fill="#15151a" />)}
          <rect x={58} y={-400} width={14} height={400} fill="#e0b040" />
          {[-1, 1].map((s2) => <circle key={s2} cx={s2 * 20} cy={-475} r={7} fill="#fff" />)}
        </g>
      );
    case "jarron":
      return (
        <g>
          <path d="M-60 0 Q-110 -120 -50 -220 L50 -220 Q110 -120 60 0Z" fill="#e6dccb" />
          <rect x={-50} y={-250} width={100} height={30} fill="#d6ccbb" />
          <path d="M-70 -130 h140" stroke="#2a8a8a" strokeWidth={10} />
        </g>
      );
    case "carro-dorado":
      return (
        <g>
          <path d="M-220 -120 L160 -120 L200 -300 L-160 -300Z" fill="#d9a830" stroke="#8a6a1a" strokeWidth={8} />
          <g transform="translate(-40 -100)">
            <circle r={110} fill="none" stroke="#c9962e" strokeWidth={18} />
            {[0, 30, 60, 90, 120, 150].map((a) => <line key={a} x1={-110} x2={110} stroke="#c9962e" strokeWidth={8} transform={`rotate(${a})`} />)}
          </g>
          <rect x={160} y={-220} width={260} height={14} fill="#8a6a1a" />
        </g>
      );

    // ---------- apocalipsis zombi ----------
    case "coche-abandonado":
      return (
        <g transform="rotate(-3)">
          <path d="M-260 -60 L-250 -140 L-150 -150 L-90 -230 L110 -230 L180 -150 L260 -130 L270 -60Z" fill="#5d6b78" />
          <path d="M-80 -215 L-130 -152 L-10 -152 L-10 -215Z M10 -215 L10 -152 L150 -152 L100 -215Z" fill="#26313b" />
          <path d="M20 -200 l40 30 l-25 20 l30 22" stroke="#9fb0bf" strokeWidth={4} fill="none" />
          <rect x={-270} y={-80} width={545} height={22} fill="#3d4650" />
          {[-160, 160].map((x) => (
            <g key={x}><circle cx={x} cy={-40} r={46} fill="#1b1d20" /><circle cx={x} cy={-40} r={20} fill="#6d7680" /></g>
          ))}
          <rect x={232} y={-120} width={30} height={16} rx={6} fill={noche ? "#ffe9a8" : "#d9d2b0"} opacity={0.6} />
          <path d="M-240 -100 q60 -10 90 0" stroke="#3a2a20" strokeWidth={10} opacity={0.4} />
        </g>
      );
    case "barricada":
      return (
        <g>
          {[0, 1, 2].map((fila) =>
            Array.from({ length: 6 - fila }).map((_, i) => (
              <ellipse key={`${fila}${i}`} cx={-250 + fila * 50 + i * 100} cy={-30 - fila * 48} rx={56} ry={30} fill={["#b39b6e", "#a68d60", "#9a8256"][(i + fila) % 3]} stroke="#6d5b3c" strokeWidth={4} />
            )),
          )}
          <g transform="translate(140 0)">
            <rect x={0} y={-260} width={260} height={26} fill="#d9d4c8" />
            {[0, 1, 2, 3].map((i) => <rect key={i} x={10 + i * 64} y={-260} width={30} height={26} fill="#c63a2e" />)}
            <rect x={20} y={-236} width={14} height={236} fill="#8a8a8a" />
            <rect x={226} y={-236} width={14} height={236} fill="#8a8a8a" />
          </g>
          <path d="M-300 -170 l600 0" stroke="#5a5a5a" strokeWidth={4} strokeDasharray="14 10" />
        </g>
      );
    case "bidon-fuego":
      return (
        <g>
          <rect x={-60} y={-190} width={120} height={190} rx={8} fill="#4d4a44" />
          {[-140, -70].map((y) => <rect key={y} x={-64} y={y} width={128} height={10} fill="#36332f" />)}
          <path d="M-50 -150 l30 20 l-20 30" stroke="#7a3a1e" strokeWidth={8} fill="none" opacity={0.6} />
          {llama(0, -190, 1.1)}
          {[0, 1, 2].map((i) => {
            const t = ((f + i * 40) % 120) / 120;
            return <circle key={i} cx={Math.sin(f / 9 + i) * 30} cy={-260 - t * 360} r={30 + t * 50} fill="#5a5a5a" opacity={0.25 * (1 - t)} />;
          })}
        </g>
      );
    case "bloque": {
      const pisos = 7;
      return (
        <g>
          <rect x={-260} y={-pisos * 110 - 40} width={520} height={pisos * 110 + 40} fill="#b9a48a" stroke="#00000033" strokeWidth={6} />
          <rect x={-275} y={-pisos * 110 - 60} width={550} height={26} fill="#8f7c66" />
          {Array.from({ length: pisos }).map((_, fy) =>
            [0, 1, 2, 3].map((c) => {
              const x = -225 + c * 120;
              const y = -pisos * 110 + fy * 110;
              const luz = noche && random(`bl${fy}${c}`) > 0.85;
              return (
                <g key={`${fy}${c}`}>
                  <rect x={x} y={y} width={80} height={70} fill={luz ? "#ffcf7a" : "#3b4652"} />
                  {random(`pe${fy}${c}`) > 0.55 && <rect x={x} y={y} width={80} height={70 * (0.4 + random(`pa${fy}${c}`) * 0.6)} fill="#6d5a48" />}
                  <rect x={x - 6} y={y + 70} width={92} height={10} fill="#8f7c66" />
                  {random(`ro${fy}${c}`) > 0.8 && <path d={`M${x + 10} ${y + 10} l25 20 l-10 15 l30 18`} stroke="#d9e4ee" strokeWidth={3} fill="none" />}
                </g>
              );
            }),
          )}
          <rect x={-50} y={-120} width={100} height={120} fill="#3a2c22" />
          <path d="M-200 -300 q20 40 0 90 q-15 30 5 70" stroke="#2a2a2a" strokeWidth={10} fill="none" opacity={0.35} />
        </g>
      );
    }
    case "semaforo": {
      const fase = Math.floor(f / 45) % 2;
      return (
        <g>
          <rect x={-10} y={-520} width={20} height={520} fill="#3a3d40" />
          <rect x={-40} y={-640} width={80} height={200} rx={14} fill="#222" />
          {[0, 1, 2].map((i) => (
            <circle key={i} cx={0} cy={-600 + i * 62} r={22} fill={i === 1 && fase === 0 ? "#ffb020" : "#3a3a3a"} />
          ))}
          {fase === 0 && <Brillo r={90} o={0.5} color="#ffb020" cy={-538} />}
        </g>
      );
    }
    case "pilar":
      // basílica del Pilar: cuerpo largo, cúpulas y cuatro torres (decorado LEJANO)
      return (
        <g fill={noche ? "#2a2d3c" : "#b48a62"}>
          <rect x={-420} y={-300} width={840} height={300} />
          {[-240, -80, 80, 240].map((x, i) => (
            <g key={x}>
              <ellipse cx={x} cy={-300} rx={i % 3 === 0 ? 70 : 95} ry={i % 3 === 0 ? 80 : 110} fill={noche ? "#30364a" : "#4f8a7a"} />
              <rect x={x - 6} y={i % 3 === 0 ? -420 : -450} width={12} height={60} />
            </g>
          ))}
          {[-470, 470].map((x) => (
            <g key={x}>
              <rect x={x - 45} y={-760} width={90} height={760} />
              <rect x={x - 55} y={-560} width={110} height={18} fill={noche ? "#1d2030" : "#9a7450"} />
              <rect x={x - 30} y={-860} width={60} height={110} />
              <path d={`M${x - 30} -860 L${x} -940 L${x + 30} -860Z`} fill={noche ? "#30364a" : "#4f8a7a"} />
              {[-700, -620, -480, -400].map((y) => <rect key={y} x={x - 15} y={y} width={30} height={48} rx={14} fill={noche ? "#ffd27a" : "#5a3e2a"} opacity={noche ? 0.6 : 0.8} />)}
            </g>
          ))}
        </g>
      );
    case "puente":
      return (
        <g fill={noche ? "#3b3a40" : "#b49a78"}>
          <rect x={-900} y={-260} width={1800} height={60} />
          {[-700, -350, 0, 350, 700].map((x) => (
            <path key={x} d={`M${x - 175} -200 L${x + 175} -200 L${x + 175} 0 L${x + 140} 0 Q${x} -170 ${x - 140} 0 L${x - 175} 0Z`} />
          ))}
          <rect x={-900} y={-290} width={1800} height={30} fill={noche ? "#2c2b30" : "#9a8060"} />
          {[-875, -525, -175, 175, 525, 875].map((x) => <path key={x} d={`M${x - 30} -200 L${x + 30} -200 L${x + 20} -60 L${x - 20} -60Z`} fill={noche ? "#2c2b30" : "#9a8060"} />)}
        </g>
      );
    case "camilla":
      return (
        <g>
          <rect x={-200} y={-170} width={400} height={40} rx={10} fill="#d9e0e6" />
          <rect x={-200} y={-200} width={120} height={36} rx={14} fill="#f2f4f6" />
          <rect x={-180} y={-130} width={14} height={110} fill="#8a96a0" />
          <rect x={166} y={-130} width={14} height={110} fill="#8a96a0" />
          {[-173, 173].map((x) => <circle key={x} cx={x} cy={-14} r={14} fill="#333" />)}
          <path d="M-60 -175 h240" stroke="#7fb3d6" strokeWidth={22} strokeLinecap="round" />
        </g>
      );
    case "radio":
      return (
        <g>
          <rect x={-90} y={-130} width={180} height={120} rx={14} fill="#3a3f45" />
          <rect x={-70} y={-110} width={80} height={60} rx={8} fill="#1d2126" />
          {[0, 1, 2, 3].map((i) => <rect key={i} x={-64} y={-104 + i * 14} width={68} height={5} fill="#555" />)}
          <circle cx={50} cy={-80} r={20} fill="#c9a24a" />
          <rect x={-60} y={-40} width={120} height={14} rx={6} fill="#8fd6a0" opacity={0.6 + 0.4 * Math.sin(f / 6)} />
          <line x1={60} y1={-130} x2={130} y2={-300} stroke="#999" strokeWidth={5} />
        </g>
      );
    case "helicoptero": {
      const x = ((f * 6) % 2600) - 1300;
      return (
        <g transform={`translate(${x} ${-900 + Math.sin(f / 20) * 20})`}>
          <ellipse cx={0} cy={0} rx={130} ry={60} fill="#3d4a3a" />
          <rect x={100} y={-15} width={220} height={22} fill="#3d4a3a" />
          <ellipse cx={-60} cy={-10} rx={50} ry={34} fill="#9fc3d6" opacity={0.8} />
          <rect x={-3} y={-80} width={6} height={30} fill="#222" />
          <ellipse cx={0} cy={-82} rx={260 * Math.abs(Math.cos(f * 0.9))} ry={6} fill="#222" opacity={0.7} />
          <rect x={-90} y={55} width={180} height={8} fill="#222" />
          {noche && <Brillo r={60} o={0.8} color="#ff3b3b" cx={310} cy={-10} />}
        </g>
      );
    }
    // ---------- Wisconsin rural, 1957 ----------
    case "granja":
      return (
        <g>
          <rect x={-300} y={-520} width={600} height={520} fill="#8a8274" />
          {Array.from({ length: 13 }).map((_, i) => <rect key={i} x={-300} y={-520 + i * 40} width={600} height={5} fill="#6b6458" />)}
          <polygon points="-340,-520 0,-780 340,-520" fill="#4a3f38" />
          <path d="M120 -700 l60 -40 l0 70" fill="#4a3f38" />
          <rect x={150} y={-760} width={50} height={110} fill="#5a4a40" />
          {[[-210, -440], [90, -440], [-210, -250]].map(([x, y], i) => (
            <g key={i}>
              <rect x={x} y={y} width={110} height={130} fill={noche && i === 2 ? "#e8b24a" : "#2a2b2e"} />
              {i === 1 && <rect x={x} y={y} width={110} height={130} fill="#6b5a48" />}
              {i === 1 && <path d={`M${x} ${y} l110 130 M${x + 110} ${y} l-110 130`} stroke="#4a3a2a" strokeWidth={10} />}
              <rect x={x - 8} y={y - 8} width={126} height={146} fill="none" stroke="#d9d2c0" strokeWidth={8} opacity={0.6} />
            </g>
          ))}
          {noche && <Brillo r={200} o={0.35} color="#e8b24a" cx={-155} cy={-185} />}
          <rect x={60} y={-230} width={110} height={230} fill="#4a3a2e" />
          <rect x={-330} y={-60} width={660} height={60} fill="#6b6458" />
          <path d="M-300 -160 L-380 -60 M300 -300 L360 -200" stroke="#5a5248" strokeWidth={14} />
        </g>
      );
    case "granero":
      return (
        <g>
          <path d="M-280 0 L-280 -360 L-200 -520 L200 -520 L280 -360 L280 0Z" fill="#8a3226" />
          <path d="M-280 -360 L-200 -520 L200 -520 L280 -360" stroke="#5a2018" strokeWidth={18} fill="none" />
          <rect x={-120} y={-300} width={240} height={300} fill="#6b241b" />
          <path d="M-120 -300 L120 0 M120 -300 L-120 0" stroke="#e8dccb" strokeWidth={12} />
          <rect x={-120} y={-300} width={240} height={300} fill="none" stroke="#e8dccb" strokeWidth={12} />
          <rect x={-50} y={-470} width={100} height={90} fill="#2a1a14" />
          {Array.from({ length: 9 }).map((_, i) => <rect key={i} x={-280 + i * 62} y={-360} width={4} height={360} fill="#00000022" />)}
        </g>
      );
    case "coche-antiguo":
    case "coche-patrulla": {
      const patrulla = tipo === "coche-patrulla";
      const col = patrulla ? "#1f2630" : "#6a2230";
      return (
        <g>
          <path d="M-300 -70 Q-300 -150 -220 -160 L-140 -165 Q-100 -260 0 -262 L80 -262 Q160 -258 190 -165 L260 -158 Q310 -150 310 -70Z" fill={col} />
          <path d="M-120 -170 Q-90 -240 -10 -244 L-10 -170Z M10 -244 L70 -244 Q140 -240 165 -170 L10 -170Z" fill="#9fb4c4" opacity={noche ? 0.4 : 0.8} />
          {patrulla && <rect x={-140} y={-150} width={360} height={60} fill="#e8e4d8" />}
          {patrulla && <text x={40} y={-108} fontSize={36} textAnchor="middle" fill="#1f2630" style={{ fontFamily: "sans-serif", fontWeight: 900 }}>SHERIFF</text>}
          {patrulla && (
            <g>
              <rect x={20} y={-292} width={40} height={30} rx={8} fill={Math.floor(f / 8) % 2 ? "#ff3030" : "#7a1a1a"} />
              {Math.floor(f / 8) % 2 === 1 && <Brillo r={120} o={0.6} color="#ff3030" cx={40} cy={-280} />}
            </g>
          )}
          <rect x={-310} y={-90} width={620} height={18} rx={8} fill="#c9ccd0" />
          {[-190, 190].map((x) => (
            <g key={x}><circle cx={x} cy={-40} r={50} fill="#15161a" /><circle cx={x} cy={-40} r={24} fill="#e8e6de" /><circle cx={x} cy={-40} r={10} fill="#9a9a9a" /></g>
          ))}
          <ellipse cx={290} cy={-120} rx={20} ry={16} fill={noche ? "#fff3c0" : "#e8e6de"} />
          {noche && <path d="M300 -120 L700 -200 L700 -40Z" fill="#fff3c0" opacity={0.15} />}
        </g>
      );
    }
    case "estufa":
      return (
        <g>
          <rect x={-130} y={-260} width={260} height={200} rx={10} fill="#2a2a2c" />
          <rect x={-150} y={-280} width={300} height={26} rx={6} fill="#3a3a3e" />
          <rect x={-70} y={-200} width={140} height={90} rx={8} fill="#1a1a1c" />
          <rect x={-60} y={-190} width={120} height={70} rx={6} fill="#ff7b2f" opacity={0.45 + 0.25 * Math.sin(f / 3)} />
          <Brillo r={220} o={0.3 + 0.08 * Math.sin(f / 4)} cy={-150} />
          {[-110, 110].map((x) => <rect key={x} x={x - 10} y={-60} width={20} height={60} fill="#2a2a2c" />)}
          <rect x={60} y={-820} width={44} height={550} fill="#3a3a3e" />
          <ellipse cx={-60} cy={-300} rx={56} ry={18} fill="#4a4a4e" />
          <path d="M-90 -300 q-10 -60 30 -60 q40 0 30 60" fill="#5a5a5e" />
        </g>
      );
    case "mostrador":
      return (
        <g>
          <rect x={-320} y={-230} width={640} height={230} fill="#7a4e2e" />
          <rect x={-340} y={-250} width={680} height={30} fill="#5a3820" />
          {[-200, 0, 200].map((x) => <rect key={x} x={x - 80} y={-200} width={160} height={170} fill="none" stroke="#5a3820" strokeWidth={8} />)}
          <g transform="translate(180 -250)">
            <path d="M-80 0 L-70 -110 L70 -110 L80 0Z" fill="#9a9aa0" />
            <rect x={-60} y={-160} width={120} height={52} rx={6} fill="#c9c9cf" />
            <rect x={-40} y={-150} width={80} height={30} fill="#2a2a2a" />
            {[0, 1, 2].map((r) => [0, 1, 2, 3].map((c) => <circle key={`${r}${c}`} cx={-45 + c * 30} cy={-80 + r * 22} r={8} fill="#e8e4d8" />))}
          </g>
          <rect x={-250} y={-330} width={70} height={80} rx={6} fill="#c62e2e" />
          <rect x={-250} y={-310} width={70} height={24} fill="#f2e6c9" />
        </g>
      );
    case "poste":
      return (
        <g>
          {[-600, 0, 600].map((x) => (
            <g key={x}>
              <rect x={x - 12} y={-760} width={24} height={760} fill="#4a3a2a" />
              <rect x={x - 90} y={-720} width={180} height={14} fill="#4a3a2a" />
              {[-70, 0, 70].map((d) => <rect key={d} x={x + d - 5} y={-736} width={10} height={16} fill="#8fb0c0" />)}
            </g>
          ))}
          {[-70, 0, 70].map((d) => (
            <g key={d} stroke="#222" strokeWidth={3} fill="none">
              <path d={`M${-1200 + d} -700 Q${-900 + d} -640 ${-600 + d} -728`} />
              <path d={`M${-600 + d} -728 Q${-300 + d} -660 ${d} -728`} />
              <path d={`M${d} -728 Q${300 + d} -660 ${600 + d} -728`} />
              <path d={`M${600 + d} -728 Q${900 + d} -660 ${1200 + d} -700`} />
            </g>
          ))}
        </g>
      );
    // ---------- Tenochtitlan, 1519 ----------
    case "templo-mayor":
      // pirámide doble con dos santuarios (Tláloc azul, Huitzilopochtli rojo). Decorado LEJANO.
      return (
        <g>
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={-460 + i * 70} y={-120 - i * 120} width={920 - i * 140} height={122} fill={["#d9cdb4", "#cfc2a6", "#c6b899", "#bcae8e"][i]} stroke="#9a8a6a" strokeWidth={4} />
          ))}
          {[-80, 80].map((x) => <rect key={x} x={x - 45} y={-480} width={90} height={480} fill="#b0a282" />)}
          {[-80, 80].map((x) => Array.from({ length: 12 }).map((_, k) => <rect key={`${x}${k}`} x={x - 45} y={-470 + k * 40} width={90} height={5} fill="#8f8066" />))}
          <g transform="translate(-150 -480)">
            <rect x={-95} y={-170} width={190} height={170} fill="#e8e0cc" />
            <path d="M-110 -170 L0 -260 L110 -170Z" fill="#3f6fa8" />
            <rect x={-40} y={-110} width={80} height={110} fill="#1d2230" />
            {[0, 1, 2].map((i) => <circle key={i} cx={-60 + i * 60} cy={-140} r={12} fill="#3f6fa8" />)}
          </g>
          <g transform="translate(150 -480)">
            <rect x={-95} y={-170} width={190} height={170} fill="#e8e0cc" />
            <path d="M-110 -170 L0 -260 L110 -170Z" fill="#a8322a" />
            {[0, 1, 2].map((i) => <circle key={i} cx={-60 + i * 60} cy={-140} r={12} fill="#f2e6c9" />)}
            <rect x={-40} y={-110} width={80} height={110} fill="#1d2230" />
          </g>
          {[-150, 150].map((x, i) => (
            <circle key={x} cx={x} cy={-760 - ((f * 0.8 + i * 40) % 120)} r={26 + ((f * 0.8 + i * 40) % 120) / 4} fill="#cfcfcf" opacity={0.35 * (1 - ((f * 0.8 + i * 40) % 120) / 120)} />
          ))}
        </g>
      );
    case "canoa":
      return (
        <g transform={`translate(0 ${Math.sin(f / 18) * 6}) rotate(${Math.sin(f / 23) * 1.5})`}>
          <path d="M-300 -60 Q-260 10 0 12 Q260 10 300 -60 Z" fill="#7a5232" />
          <path d="M-300 -60 L300 -60" stroke="#5a3a20" strokeWidth={12} />
          <path d="M-240 -50 Q0 -30 240 -50" stroke="#9a6a42" strokeWidth={6} fill="none" />
          <line x1={140} y1={-300} x2={210} y2={40} stroke="#6b4a2a" strokeWidth={12} />
          <ellipse cx={0} cy={18} rx={340} ry={14} fill="#ffffff" opacity={0.18} />
          <g fill="#d9b43a">{[-160, -100, -40].map((x) => <ellipse key={x} cx={x} cy={-78} rx={30} ry={20} />)}</g>
        </g>
      );
    case "ahuejote":
      return (
        <g>
          <rect x={-14} y={-560} width={28} height={560} fill="#6b5a40" />
          <ellipse cx={0} cy={-520} rx={70} ry={300} fill="#4f7a3a" transform={`rotate(${Math.sin(f / 30) * 1.5} 0 -200)`} />
          <ellipse cx={-20} cy={-560} rx={44} ry={220} fill="#5f8a44" transform={`rotate(${Math.sin(f / 26 + 1) * 2} 0 -200)`} />
        </g>
      );
    case "chinampa":
      return (
        <g>
          <path d="M-420 0 L-400 -60 L400 -60 L420 0Z" fill="#4a3a26" />
          <rect x={-400} y={-70} width={800} height={14} fill="#5a7a34" />
          {Array.from({ length: 13 }).map((_, i) => {
            const x = -360 + i * 60;
            const v = Math.sin(f / 22 + i) * 4;
            return (
              <g key={i}>
                <path d={`M${x} -60 L${x + v} -250`} stroke="#6f9a3a" strokeWidth={8} />
                <path d={`M${x + v * 0.5} -150 q-40 -20 -50 10 M${x + v * 0.7} -190 q40 -20 50 10`} stroke="#7aa844" strokeWidth={8} fill="none" />
                {i % 2 === 0 && <ellipse cx={x + v + 10} cy={-210} rx={10} ry={26} fill="#e0c050" />}
              </g>
            );
          })}
        </g>
      );
    case "calzada":
      return (
        <g>
          <rect x={-1200} y={-70} width={2400} height={70} fill="#b8aa8a" />
          <rect x={-1200} y={-80} width={2400} height={16} fill="#d4c6a4" />
          {Array.from({ length: 24 }).map((_, i) => <rect key={i} x={-1200 + i * 100} y={-62} width={92} height={56} fill="#00000014" />)}
          <rect x={-120} y={-80} width={240} height={80} fill="#5a7a9a" />
          <rect x={-130} y={-96} width={260} height={18} fill="#7a5a3a" />
        </g>
      );
    case "brasero":
      return (
        <g>
          <path d="M-90 -160 L90 -160 L60 -20 L-60 -20Z" fill="#a8582e" />
          <rect x={-100} y={-180} width={200} height={26} rx={8} fill="#8a4422" />
          <path d="M-60 -20 L-80 0 M60 -20 L80 0" stroke="#7a3a1e" strokeWidth={16} />
          {[-30, 30].map((x) => <circle key={x} cx={x} cy={-120} r={14} fill="#e8d8b8" />)}
          {llama(0, -180, 1)}
        </g>
      );
    case "petate":
      return (
        <g>
          <path d="M-260 0 L-220 -40 L260 -40 L220 0Z" fill="#c9a86a" />
          {Array.from({ length: 12 }).map((_, i) => <path key={i} d={`M${-250 + i * 42} 0 L${-210 + i * 42} -40`} stroke="#a8884a" strokeWidth={4} />)}
          <path d="M-240 -20 L240 -20" stroke="#a8884a" strokeWidth={4} />
        </g>
      );
    case "metate":
      return (
        <g>
          <path d="M-130 -40 Q0 -90 130 -40 L120 -20 L-120 -20Z" fill="#4a4448" />
          {[-90, 0, 90].map((x) => <path key={x} d={`M${x - 16} -20 L${x} 0 L${x + 16} -20Z`} fill="#3a3438" />)}
          <rect x={-80} y={-96} width={160} height={30} rx={15} fill="#5a5458" />
          <ellipse cx={60} cy={-50} rx={34} ry={10} fill="#e0c050" />
        </g>
      );

    case "ciudad-lago": {
      // Tenochtitlan sobre el lago: casas blancas de azotea, templos escalonados y el Templo Mayor en el centro
      const casas = Array.from({ length: 34 }).map((_, i) => {
        const x = -1250 + i * 75 + (random(`cl${i}`) - 0.5) * 30;
        const h = 60 + random(`ch${i}`) * 70;
        return <rect key={i} x={x} y={-h} width={70} height={h} fill={random(`cc${i}`) > 0.3 ? "#efe6d2" : "#d8c49c"} stroke="#b8a888" strokeWidth={3} />;
      });
      const piramide = (x: number, esc: number, k: string) => (
        <g key={k} transform={`translate(${x} 0) scale(${esc})`}>
          {[0, 1, 2, 3].map((i) => <rect key={i} x={-150 + i * 25} y={-60 - i * 55} width={300 - i * 50} height={57} fill={["#d9cdb4", "#cfc2a6", "#c6b899", "#bcae8e"][i]} stroke="#9a8a6a" strokeWidth={3} />)}
          <rect x={-25} y={-275} width={50} height={275} fill="#b0a282" />
          <rect x={-45} y={-320} width={90} height={60} fill="#e8e0cc" />
          <path d="M-52 -320 L0 -360 L52 -320Z" fill="#a8322a" />
        </g>
      );
      return (
        <g>
          {casas}
          {piramide(-760, 0.6, "a")}
          {piramide(820, 0.55, "b")}
          {piramide(-280, 0.45, "c")}
          <g transform="translate(150 -40) scale(0.62)">
            {[0, 1, 2, 3].map((i) => <rect key={i} x={-460 + i * 70} y={-120 - i * 120} width={920 - i * 140} height={122} fill={["#d9cdb4", "#cfc2a6", "#c6b899", "#bcae8e"][i]} stroke="#9a8a6a" strokeWidth={4} />)}
            {[-80, 80].map((x) => <rect key={x} x={x - 45} y={-480} width={90} height={480} fill="#b0a282" />)}
            <g transform="translate(-150 -480)"><rect x={-95} y={-170} width={190} height={170} fill="#e8e0cc" /><path d="M-110 -170 L0 -260 L110 -170Z" fill="#3f6fa8" /></g>
            <g transform="translate(150 -480)"><rect x={-95} y={-170} width={190} height={170} fill="#e8e0cc" /><path d="M-110 -170 L0 -260 L110 -170Z" fill="#a8322a" /></g>
          </g>
          <rect x={-1300} y={-6} width={2600} height={14} fill="#8a9a7a" />
          {[-900, -300, 500, 1000].map((x, i) => (
            <g key={x} transform={`translate(${x + ((f * (0.6 + i * 0.2)) % 200) - 100} 30)`}>
              <path d="M-50 -8 Q0 6 50 -8 Z" fill="#6b4a2a" />
              <rect x={-2} y={-46} width={4} height={40} fill="#4a3220" />
            </g>
          ))}
          {noche && casas.length > 0 && Array.from({ length: 10 }).map((_, i) => <circle key={i} cx={-1200 + i * 250} cy={-40} r={8} fill="#ffb347" opacity={0.7 + 0.3 * Math.sin(f / 5 + i)} />)}
        </g>
      );
    }
    case "granja-fuego":
      return (
        <g>
          <Prop tipo="granja" f={f} noche={noche} />
          <rect x={-300} y={-520} width={600} height={520} fill="#1a0a05" opacity={0.35} />
          {llama(-200, -480, 2.2)}
          {llama(60, -600, 2.8)}
          {llama(220, -400, 2)}
          {llama(-60, -200, 1.8)}
          {[0, 1, 2, 3, 4].map((i) => {
            const t = ((f + i * 30) % 150) / 150;
            return <circle key={i} cx={Math.sin(f / 13 + i) * 80 - 40 + i * 30} cy={-780 - t * 700} r={70 + t * 140} fill="#3a3030" opacity={0.45 * (1 - t)} />;
          })}
          {Array.from({ length: 12 }).map((_, i) => {
            const t = ((f * 1.5 + i * 23) % 100) / 100;
            return <circle key={`c${i}`} cx={-250 + random(`ce${i}`) * 500 + Math.sin(f / 7 + i) * 20} cy={-500 - t * 600} r={4} fill="#ffcf6a" opacity={1 - t} />;
          })}
        </g>
      );
    case "charco":
      return (
        <g>
          <ellipse cx={0} cy={-4} rx={220} ry={34} fill="#5a7088" opacity={0.85} />
          <ellipse cx={-40} cy={-10} rx={120} ry={12} fill="#c8d8e8" opacity={0.35} />
          {[0, 1, 2].map((i) => {
            const t = ((f + i * 25) % 75) / 75;
            return <ellipse key={i} cx={-60 + i * 70} cy={-4} rx={10 + t * 60} ry={2 + t * 9} fill="none" stroke="#dfe9f2" strokeWidth={3} opacity={0.6 * (1 - t)} />;
          })}
        </g>
      );
    default:
      // cualquier otra cosa: emoji gigante
      return (
        <text x={0} y={-20} fontSize={260} textAnchor="middle" style={{ fontFamily: "'Noto Color Emoji'" }}>
          {tipo}
        </text>
      );
  }
};

import React from "react";

// Objetos de decorado. Origen = punto de apoyo en el suelo; se dibujan hacia arriba (y negativa).
// Para añadir uno nuevo: añade un `case` y documéntalo en oficina/GUIA_GUION.md
export const PROPS_DISPONIBLES = [
  "arbol", "pino", "palmera", "casa", "cabana", "faro", "barco", "velero", "cohete", "farola", "carro", "puesto",
  "roca", "valla", "pozo", "tumba", "hoguera", "tienda", "bandera", "mesa", "estanteria", "chimenea", "cama",
  "antorcha", "cuadro", "consola", "maquina", "barril", "cajas", "planta", "telescopio", "yunque", "piramide", "columna", "reloj",
  "bergantin", "bergantin-hundido", "bote",
  "casa-adobe", "habitat", "invernadero", "rover", "panel-solar", "antena",
  "escalera", "puerta", "tesoro", "sarcofago", "mascara", "estatua", "jarron", "carro-dorado",
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
    default:
      // cualquier otra cosa: emoji gigante
      return (
        <text x={0} y={-20} fontSize={260} textAnchor="middle" style={{ fontFamily: "'Noto Color Emoji'" }}>
          {tipo}
        </text>
      );
  }
};

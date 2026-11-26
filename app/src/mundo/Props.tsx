import React from "react";
import { random } from "remotion";
import { oscurecer } from "./constantes";

// Objetos de decorado. Origen = punto de apoyo en el suelo; se dibujan hacia arriba (y negativa).
// Para añadir uno nuevo: añade un `case` y documéntalo en oficina/GUIA_GUION.md
export const PROPS_DISPONIBLES = [
  "arbol", "pino", "palmera", "casa", "cabana", "faro", "barco", "velero", "cohete", "farola", "carro", "puesto",
  "roca", "valla", "pozo", "tumba", "hoguera", "tienda", "bandera", "bandera-eeuu", "bandera-uk", "mesa", "estanteria", "chimenea", "cama", "banco-pieles", "arcon", "duna",
  "antorcha", "cuadro", "consola", "maquina", "barril", "cajas", "planta", "telescopio", "yunque", "piramide", "columna", "reloj",
  "bergantin-hielo", "bergantin-hundido", "bote",
  "volcan", "volcan-erupcion", "bergantin", "cruz", "parapeto-aleman", "lecho", "estatua-saturno", "electrometro", "cristalizadores", "espectro", "humo", "explosion", "horno", "molino", "anfora", "termopolio",
  "casa-adobe", "habitat", "invernadero", "rover", "panel-solar", "antena",
  "escalera", "puerta", "tesoro", "sarcofago", "mascara", "estatua", "jarron", "carro-dorado",
  // apocalipsis zombi (2031)
  "coche-abandonado", "barricada", "bidon-fuego", "bloque", "semaforo", "pilar", "puente", "camilla", "radio", "helicoptero",
  // Wisconsin rural (1957)
  "granja", "granero", "coche-antiguo", "coche-patrulla", "estufa", "mostrador", "poste",
  // Tenochtitlan (1519)
  "templo-mayor", "canoa", "ahuejote", "chinampa", "calzada", "brasero", "petate", "metate", "ciudad-lago",
  "granja-fuego", "charco", "puesto-mexica", "puesto-romano", "malecon", "tranvia",
  // Egipto, Reino Nuevo (Abidos 1270 a. C.)
  "barca", "yed", "oruwa", "dagoba", "torre-alerta", "tren-diesel", "barca-durham", "muralla", "arbol-desnudo",
  // Armero (1985)
  "lodo", "barrizal",
  // Roma (Saturnales) y Halifax (1917)
  "templo-romano", "ruinas", "tren", "wigwam",
  // Neolítico irlandés (Newgrange, c. 3200 a. C.)
  "tumulo", "tumulo-obra", "tumulo-hierba", "entrada-tumulo", "losa-grabada", "losa-rodillos", "casa-neolitica", "piragua", "piragua-piedras",
  "rayo-solsticio", "rayo-solsticio-entra", "rayo-solsticio-avanza", "rayo-solsticio-ensancha", "rayo-solsticio-sale",
  "rayo-solsticio-corto", "rayo-solsticio-hilo", "rayo-solsticio-pleno",
  // islas Flannan (1900)
  "faro-blanco", "faro-apagado", "isla-faro", "isla-faro-apagada", "embarcadero", "embarcadero-roto", "ola", "bengala",
  "lampara-faro", "reloj-parado", "chimenea-apagada", "perchero", "pizarra", "capilla",
  // terremoto de Mesina (1908)
  "escombros",
  // Pearl Harbor (1941)
  "acorazado", "destructor", "portaaviones", "submarino", "avion", "flyer", "flyer-vuelo", "cobertizo", "autobus", "central", "casa-larga", "camion", "tanque", "paracaidas-carga", "hoyo", "norseman", "norseman-vuelo", "nissen", "torre-control", "telar", "aurora", "radar",
  // Galileo en Padua (1610)
  "anteojo", "torno-lentes", "santo", "campanario",
] as const;

// Espiral grabada (arte megalítico): devuelve el trazo de una espiral de Arquímedes
export const espiral = (cx: number, cy: number, r: number, vueltas = 2.5, sentido = 1, giro = 0) => {
  const n = Math.ceil(vueltas * 24);
  let d = "";
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const a = giro + sentido * t * vueltas * Math.PI * 2;
    d += `${i ? "L" : "M"}${(cx + Math.cos(a) * r * t).toFixed(1)} ${(cy + Math.sin(a) * r * t).toFixed(1)} `;
  }
  return d;
};
// Fila de rombos grabados (dintel de la caja de luz, losas del anillo)
export const rombos = (x0: number, y0: number, ancho: number, alto: number, n: number) => {
  const w = ancho / n;
  let d = "";
  for (let i = 0; i < n; i++) {
    const x = x0 + i * w;
    d += `M${x} ${y0 + alto / 2} L${x + w / 2} ${y0} L${x + w} ${y0 + alto / 2} L${x + w / 2} ${y0 + alto}Z `;
  }
  return d;
};
// Estados del rayo del solsticio: [largo, ancho] (0 = nada; 1 = llega al fondo / franja entera)
const RAYO: Record<string, [number, number][]> = {
  "rayo-solsticio": [[0, 0.2], [1, 0.2], [1, 1], [1, 1], [1, 0.2], [0, 0.2]],
  "rayo-solsticio-entra": [[0, 0.2], [1, 0.2], [1, 0.2]],
  "rayo-solsticio-avanza": [[0, 0.2], [0.55, 0.2], [0.55, 0.2]],
  "rayo-solsticio-ensancha": [[1, 0.2], [1, 1], [1, 1]],
  "rayo-solsticio-sale": [[1, 1], [1, 0.2], [0, 0.2]],
  "rayo-solsticio-corto": [[0.55, 0.2]],
  "rayo-solsticio-hilo": [[1, 0.2]],
  "rayo-solsticio-pleno": [[1, 1]],
};
const suaveR = (x: number) => x * x * (3 - 2 * x);
const estadoRayo = (tipo: string, p: number): [number, number] => {
  const e = RAYO[tipo] ?? RAYO["rayo-solsticio"];
  if (e.length === 1) return e[0];
  const q = Math.min(0.999, Math.max(0, p)) * (e.length - 1);
  const i = Math.floor(q);
  const k = suaveR(q - i);
  return [e[i][0] + (e[i + 1][0] - e[i][0]) * k, e[i][1] + (e[i + 1][1] - e[i][1]) * k];
};

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

// Faro de las islas Flannan: torre blanca sin franjas, casa baja de piedra clara, muro del patio y verja.
// luz = false: linterna oscura (nunca encendida). haz: largo del haz giratorio de noche.
const FaroBlanco: React.FC<{ f: number; noche: boolean; luz: boolean; haz?: number }> = ({ f, noche, luz, haz = 2000 }) => {
  const g = (f * 2.2) % 360;
  const c = Math.cos((g * Math.PI) / 180);
  const blanco = noche ? "#c9ccd2" : "#f3f1ea";
  const sombra = noche ? "#a6a9b0" : "#dcd8ce";
  const piedra = noche ? "#a39d92" : "#d3cbb8";
  const tejado = noche ? "#33373c" : "#4a4f55";
  const hierro = "#26292d";
  const encendida = luz && noche;
  const cristal = encendida ? "#ffe9a3" : luz ? "#bcd6e0" : noche ? "#1b2026" : "#3a4650";
  return (
    <g>
      {encendida && (
        <g transform="translate(0 -535)">
          <polygon points={`0,0 ${haz},${-haz * 0.1} ${haz},${haz * 0.1}`} fill="#fff3c4" opacity={0.24 * Math.abs(c)} transform={`scale(${c >= 0 ? 1 : -1} 1)`} />
          <circle r={110} fill="#fff3c4" opacity={0.3} />
        </g>
      )}
      {/* casa baja de los fareros, pegada a la torre */}
      <rect x={30} y={-185} width={500} height={185} fill={piedra} />
      <rect x={30} y={-185} width={500} height={14} fill="#000" opacity={0.08} />
      <polygon points="20,-185 540,-185 500,-245 60,-245" fill={tejado} />
      {[150, 400].map((x) => <rect key={x} x={x} y={-285} width={34} height={60} fill={piedra} stroke="#00000022" strokeWidth={3} />)}
      {[120, 250, 380].map((x) => (
        <rect key={x} x={x} y={-150} width={56} height={70} fill={encendida ? "#ffd27a" : noche ? "#1e2228" : "#4f5d68"} stroke={oscurecer(piedra, 0.25)} strokeWidth={8} />
      ))}
      {/* torre */}
      <polygon points="-80,0 80,0 62,-470 -62,-470" fill={blanco} />
      <polygon points="30,0 80,0 62,-470 28,-470" fill={sombra} />
      {[-180, -330].map((y) => <rect key={y} x={-12} y={y} width={24} height={44} rx={10} fill="#3a4048" />)}
      {/* balcón, linterna y cúpula */}
      <rect x={-86} y={-492} width={172} height={22} fill={hierro} />
      <g stroke={hierro} strokeWidth={4}>
        {[-80, -56, -32, -8, 16, 40, 64, 80].map((x) => <line key={x} x1={x} y1={-492} x2={x} y2={-528} />)}
        <line x1={-82} y1={-528} x2={82} y2={-528} strokeWidth={6} />
      </g>
      <rect x={-48} y={-582} width={96} height={90} fill={cristal} />
      {encendida && <Brillo cy={-537} r={90} o={0.7} color="#fff3c4" />}
      <g stroke={hierro} strokeWidth={6}>
        <rect x={-48} y={-582} width={96} height={90} fill="none" />
        <line x1={-16} y1={-582} x2={-16} y2={-492} />
        <line x1={16} y1={-582} x2={16} y2={-492} />
        <line x1={-48} y1={-540} x2={48} y2={-540} strokeWidth={4} />
      </g>
      <path d="M-58 -582 Q-50 -628 0 -636 Q50 -628 58 -582Z" fill={hierro} />
      <circle cx={0} cy={-646} r={11} fill={hierro} />
      {/* muro del patio, más bajo, y la verja de hierro */}
      <rect x={-430} y={-80} width={1000} height={80} fill={piedra} />
      <rect x={-438} y={-90} width={1016} height={14} fill={oscurecer(piedra, 0.15)} />
      {Array.from({ length: 16 }).map((_, i) => (
        <rect key={i} x={-420 + i * 62} y={-62 + (i % 2) * 28} width={50} height={22} rx={4} fill={oscurecer(piedra, 0.06 + random(`fb${i}`) * 0.08)} />
      ))}
      <rect x={-290} y={-122} width={26} height={122} fill={oscurecer(piedra, 0.12)} />
      <rect x={-150} y={-122} width={26} height={122} fill={oscurecer(piedra, 0.12)} />
      <rect x={-264} y={-96} width={114} height={96} fill={noche ? "#4a4c48" : "#7a8a5a"} />
      <g stroke={hierro} strokeWidth={5}>
        {[-256, -240, -224, -208, -192, -176, -160].map((x) => <line key={x} x1={x} y1={-104} x2={x} y2={0} />)}
        <line x1={-264} y1={-90} x2={-150} y2={-90} />
        <line x1={-264} y1={-40} x2={-150} y2={-40} />
      </g>
    </g>
  );
};


// Anteojo de Galileo (1610): tubo de ~1 m de tiras de madera forrado de cuero rojo con dorados, sin latón.
// Se dibuja a lo largo de +x: el ocular en el origen y el objetivo en x = LARGO_TUBO.
export const LARGO_TUBO = 380;
export const TuboAnteojo: React.FC<{ noche?: boolean }> = ({ noche }) => {
  const L = LARGO_TUBO;
  const cuero = noche ? "#62201a" : "#8b2a20";
  const luz = noche ? "#7e3128" : "#b4473a";
  const oro = noche ? "#a5843a" : "#dcb04c";
  const madera = noche ? "#3e2818" : "#5e3d22";
  const r0 = 7.5;
  const r1 = 10.5;
  const r = (x: number) => r0 + (r1 - r0) * (x / L);
  return (
    <g>
      <path d={`M0 ${-r0} L${L} ${-r1} L${L} ${r1} L0 ${r0}Z`} fill={cuero} />
      <path d={`M0 ${-r0 + 2} L${L} ${-r1 + 2} L${L} ${-r1 + 6} L0 ${-r0 + 5}Z`} fill={luz} opacity={0.75} />
      {/* dorados: anillos estampados y una greca de puntos entre ellos */}
      {[30, 108, 190, 272, 350].map((x) => <rect key={x} x={x - 2} y={-r(x)} width={4} height={r(x) * 2} fill={oro} />)}
      {[69, 149, 231, 311].map((x) => (
        <g key={x}>{[-1, 0, 1].map((k) => <circle key={k} cx={x + k * 13} cy={0} r={1.9} fill={oro} />)}</g>
      ))}
      {/* objetivo: anillo de madera con la lente; ocular: tubito de madera */}
      <rect x={L - 4} y={-r1 - 3} width={24} height={(r1 + 3) * 2} rx={3} fill={madera} />
      <rect x={L + 19} y={-r1} width={3} height={r1 * 2} fill="#bcd2dc" opacity={noche ? 0.4 : 0.7} />
      <rect x={-22} y={-r0 + 1} width={25} height={(r0 - 1) * 2} rx={2} fill={madera} />
    </g>
  );
};

// Barcos de guerra de 1941 vistos de lado, a lo lejos (plano MEDIO sobre el agua): proa a la derecha, línea de flotación en y = 0
const gris = (noche: boolean) => (noche ? ["#3b4249", "#30363c", "#262b30", "#1b1f23"] : ["#8a939a", "#78828a", "#646d75", "#3f454b"]);
const Acorazado: React.FC<{ noche: boolean }> = ({ noche }) => {
  const [g1, g2, g3, g4] = gris(noche);
  const torre = (x: number, y: number, s: number, proa: boolean) => (
    <g transform={`translate(${x} ${y})`}>
      <path d={proa ? "M-60 0 L60 0 L52 -46 L-50 -46Z" : "M-60 0 L60 0 L50 -46 L-52 -46Z"} fill={g2} />
      {[-30, -16].map((dy) => <rect key={dy} x={proa ? 40 : -40 - 130 * s} y={dy} width={130 * s} height={7} fill={g3} />)}
    </g>
  );
  const tripode = (x: number, alto: number) => (
    <g>
      <path d={`M${x - 46} -130 L${x} ${-alto} L${x + 46} -130 M${x} -130 L${x} ${-alto}`} stroke={g3} strokeWidth={10} fill="none" />
      <rect x={x - 46} y={-alto - 56} width={92} height={56} fill={g2} />
      <rect x={x - 40} y={-alto - 44} width={80} height={12} fill={g4} />
      <rect x={x - 4} y={-alto - 130} width={8} height={78} fill={g3} />
    </g>
  );
  return (
    <g>
      {/* casco: proa lanzada a la derecha, popa redondeada */}
      <path d="M-790 -66 L560 -74 L800 -96 L748 0 L-752 0 Q-796 -24 -790 -66Z" fill={g2} />
      <rect x={-760} y={-10} width={1500} height={10} fill={g4} />
      <path d="M-790 -66 L560 -74 L800 -96 L796 -86 L560 -64 L-788 -56Z" fill={g1} />
      {/* torres: dos a proa y dos a popa (las de dentro, más altas) */}
      {torre(470, -72, 1, true)}
      <rect x={250} y={-130} width={120} height={60} fill={g3} />
      {torre(310, -128, 1.05, true)}
      {torre(-470, -66, 1, false)}
      <rect x={-370} y={-124} width={120} height={60} fill={g3} />
      {torre(-310, -122, 1.05, false)}
      {/* superestructura, puente, chimenea y dos mástiles trípode */}
      <rect x={-230} y={-140} width={440} height={72} fill={g1} />
      {Array.from({ length: 9 }).map((_, i) => <rect key={i} x={-215 + i * 48} y={-118} width={22} height={14} fill={g4} />)}
      <rect x={110} y={-250} width={110} height={112} fill={g1} />
      <rect x={110} y={-232} width={110} height={12} fill={g4} />
      <rect x={-60} y={-330} width={84} height={192} fill={g2} />
      <rect x={-64} y={-342} width={92} height={16} fill={g4} />
      {tripode(170, 430)}
      {tripode(-170, 360)}
      {/* botes y grúas en el centro */}
      <path d="M-150 -146 L-150 -230 L-80 -200" stroke={g3} strokeWidth={8} fill="none" />
      <ellipse cx={-120} cy={-150} rx={44} ry={10} fill={g3} />
    </g>
  );
};
const Destructor: React.FC<{ noche: boolean }> = ({ noche }) => {
  const [g1, g2, g3, g4] = gris(noche);
  return (
    <g>
      {/* destructor de cubierta corrida (clase Wickes): casco bajo, cuatro chimeneas y dos palos */}
      <path d="M-540 -40 L420 -44 L560 -62 L520 0 L-510 0 Q-546 -16 -540 -40Z" fill={g2} />
      <rect x={-520} y={-8} width={1040} height={8} fill={g4} />
      <path d="M-540 -40 L420 -44 L560 -62 L556 -54 L420 -36 L-538 -32Z" fill={g1} />
      {/* puente y castillo */}
      <rect x={300} y={-118} width={96} height={76} fill={g1} />
      <rect x={300} y={-106} width={96} height={12} fill={g4} />
      <rect x={290} y={-130} width={116} height={14} fill={g2} />
      {/* cuatro chimeneas un poco inclinadas hacia popa */}
      {[200, 100, 0, -100].map((x) => (
        <g key={x}>
          <path d={`M${x - 20} -42 L${x + 20} -42 L${x + 12} -190 L${x - 26} -190Z`} fill={g2} />
          <rect x={x - 28} y={-198} width={42} height={12} fill={g4} />
        </g>
      ))}
      {/* palos */}
      <rect x={262} y={-300} width={8} height={260} fill={g3} />
      <rect x={236} y={-250} width={60} height={6} fill={g3} />
      <rect x={-262} y={-240} width={7} height={200} fill={g3} />
      {/* cañones a proa y a popa */}
      <rect x={430} y={-74} width={36} height={22} fill={g3} />
      <rect x={460} y={-68} width={60} height={6} fill={g3} />
      <rect x={-430} y={-70} width={36} height={22} fill={g3} />
      <rect x={-480} y={-64} width={56} height={6} fill={g3} />
      {/* tubos lanzatorpedos */}
      <rect x={-220} y={-56} width={90} height={14} rx={6} fill={g3} />
    </g>
  );
};
const Portaaviones: React.FC<{ noche: boolean }> = ({ noche }) => {
  const [g1, g2, g3, g4] = gris(noche);
  return (
    <g>
      {/* casco */}
      <path d="M-900 -110 L780 -110 L920 -150 L860 0 L-860 0 Q-910 -40 -900 -110Z" fill={g2} />
      <rect x={-870} y={-10} width={1730} height={10} fill={g4} />
      {Array.from({ length: 18 }).map((_, i) => <rect key={i} x={-820 + i * 92} y={-80} width={30} height={10} fill={g4} opacity={0.7} />)}
      {/* pilares y cubierta de vuelo plana que sobresale por proa y popa */}
      {Array.from({ length: 12 }).map((_, i) => <rect key={`p${i}`} x={-860 + i * 150} y={-150} width={14} height={42} fill={g3} />)}
      <rect x={-950} y={-176} width={1840} height={30} fill={g3} />
      <rect x={-950} y={-180} width={1840} height={8} fill={g1} />
      {/* chimenea que baja por el costado */}
      <path d="M-60 -104 Q-60 -60 -120 -40 L-150 -40 Q-90 -64 -96 -104Z" fill={g4} />
      {/* isla pequeña con su palo */}
      <rect x={180} y={-276} width={90} height={100} fill={g1} />
      <rect x={180} y={-256} width={90} height={12} fill={g4} />
      <rect x={168} y={-290} width={114} height={16} fill={g2} />
      <rect x={222} y={-380} width={7} height={92} fill={g3} />
      {/* aviones aparcados en la cubierta, siluetas mínimas */}
      {[-760, -640, -520, -400, 520, 640].map((x) => <path key={x} d={`M${x - 40} -180 L${x + 40} -180 L${x + 30} -196 L${x - 30} -192Z`} fill={g4} />)}
    </g>
  );
};

// espuma en la línea de flotación de un barco lejano
const Estela: React.FC<{ f: number; ancho: number }> = ({ f, ancho }) => (
  <path d={`M${-ancho / 2} 2 Q${-ancho / 4} ${-4 + Math.sin(f / 8) * 3} 0 2 T${ancho / 2} 2`} stroke="#ffffff" strokeWidth={6} fill="none" opacity={0.4} />
);

export const Prop: React.FC<{ tipo: string; f: number; noche: boolean; dur?: number }> = ({ tipo, f, noche, dur = 360 }) => {
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
    case "arbol-desnudo":
      // árbol de hoja caduca en invierno: tronco y ramas sin hojas (huertos, bosques de diciembre)
      return (
        <g stroke="#4a3626" strokeLinecap="round" fill="none">
          <path d="M0 0 L0 -300" strokeWidth={40} />
          <path d="M0 -240 Q-80 -320 -170 -380 M0 -260 Q90 -330 160 -420 M0 -300 Q-20 -400 -40 -500 M0 -300 Q40 -380 70 -480" strokeWidth={18} />
          <path d="M-170 -380 L-230 -420 M-120 -350 L-140 -440 M160 -420 L220 -460 M110 -360 L150 -330 M-40 -500 L-90 -540 M70 -480 L110 -530 M-30 -440 L20 -520" strokeWidth={8} />
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
    case "bergantin": {
      // bergantín de dos palos a la deriva (Mary Celeste): casco oscuro, velas cuadras medio rotas, una suelta al viento
      const ola = Math.sin(f / 14) * 10;
      const tela = noche ? "#b9b4a6" : "#e8e0cc";
      const vela = (x: number, y: number, w: number, h: number, rota: boolean, k: number) => (
        <path key={`${x}${y}`} d={rota
          ? `M${x - w / 2} ${y} L${x + w / 2} ${y} L${x + w / 2 - 8} ${y + h * 0.55} L${x + w / 6} ${y + h * 0.4} L${x} ${y + h * 0.7} L${x - w / 4} ${y + h * 0.45} L${x - w / 2 + 6} ${y + h * 0.6}Z`
          : `M${x - w / 2} ${y} L${x + w / 2} ${y} Q${x + w / 2 + 14 + Math.sin(f / 9 + k) * 8} ${y + h / 2} ${x + w / 2 - 6} ${y + h} L${x - w / 2 + 6} ${y + h} Q${x - w / 2 + 10 + Math.sin(f / 9 + k) * 8} ${y + h / 2} ${x - w / 2} ${y}Z`}
          fill={tela} stroke="#8c836e" strokeWidth={4} />
      );
      return (
        <g transform={`translate(0 ${ola - 20}) rotate(${Math.sin(f / 18) * 2.5})`}>
          {/* jarcias */}
          <path d="M-470 -90 L-170 -720 L190 -760 L460 -80" stroke="#3a2e22" strokeWidth={4} fill="none" />
          <path d="M-170 -720 L-330 -90 M190 -760 L330 -90" stroke="#3a2e22" strokeWidth={3} fill="none" />
          {/* palos */}
          <rect x={-180} y={-740} width={20} height={660} fill="#4a3424" />
          <rect x={180} y={-780} width={20} height={700} fill="#4a3424" />
          {/* bauprés */}
          <path d="M440 -110 L620 -200" stroke="#4a3424" strokeWidth={16} strokeLinecap="round" />
          <path d="M620 -200 L200 -700" stroke="#3a2e22" strokeWidth={3} />
          {/* velas cuadras: algunas rotas, una suelta */}
          {vela(-170, -700, 220, 140, false, 0)}
          {vela(-170, -540, 280, 170, true, 1)}
          {vela(190, -740, 220, 140, true, 2)}
          {vela(190, -580, 300, 180, false, 3)}
          <path d={`M200 -380 Q${300 + Math.sin(f / 6) * 40} -330 ${360 + Math.sin(f / 5) * 50} -250`} stroke={tela} strokeWidth={22} fill="none" strokeLinecap="round" />
          {/* casco */}
          <path d="M-480 -110 L470 -110 L420 30 L-430 30Z" fill="#1f1a17" />
          <rect x={-470} y={-130} width={930} height={24} fill="#3b2a1f" />
          <path d="M-440 -40 L440 -40" stroke="#6b5a3a" strokeWidth={6} />
          {/* espuma en la línea de flotación */}
          <path d={`M-460 25 Q-300 ${10 + Math.sin(f / 7) * 6} -100 25 T300 25 T480 25`} stroke="#ffffff" strokeWidth={8} fill="none" opacity={0.5} />
        </g>
      );
    }
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
    case "puesto-mexica":
    case "puesto-romano":
      return (
        <g>
          <rect x={-220} y={-200} width={440} height={200} fill="#8a5a3a" />
          {[-180, 180].map((x) => <rect key={x} x={x - 10} y={-460} width={20} height={260} fill="#5a3a22" />)}
          {[0, 1, 2, 3, 4, 5].map((i) => <path key={i} d={`M${-240 + i * 80} -460 h80 v60 q-40 30 -80 0z`} fill={i % 2 ? "#f2efe6" : "#c8402f"} />)}
          {(tipo === "puesto-mexica" ? ["🌽", "🌶️", "🫘", "🐟"] : tipo === "puesto-romano" ? ["🍇", "🫒", "🍐", "🐟"] : ["🍎", "🥖", "🧀", "🐟"]).map((e, i) => <text key={i} x={-160 + i * 105} y={-215} fontSize={70} textAnchor="middle" style={{ fontFamily: "'Noto Color Emoji'" }}>{e}</text>)}
        </g>
      );
    case "duna":
      // duna de arena ancha y baja (Kill Devil Hill): cara iluminada, ladera en sombra, ondas de viento y matas de hierba
      return (
        <g>
          <path d="M-520 0 Q-380 -150 -120 -230 Q40 -270 200 -200 Q400 -110 520 0Z" fill={noche ? "#8a7d62" : "#e2cf9e"} />
          <path d="M-120 -230 Q40 -270 200 -200 Q400 -110 520 0 L120 0 Q160 -120 -120 -230Z" fill={noche ? "#6e634d" : "#c9b27e"} />
          {[-300, -160, 0].map((x, i) => <path key={i} d={`M${x - 70} ${-90 + i * 10} Q${x} ${-110 + i * 10} ${x + 70} ${-90 + i * 10}`} stroke="#b59c68" strokeWidth={5} fill="none" opacity={0.6} />)}
          {[-420, 330].map((x) => <path key={x} d={`M${x} -20 l-14 -46 M${x} -20 l4 -54 M${x} -20 l18 -42`} stroke="#8a8a52" strokeWidth={5} />)}
        </g>
      );
    case "roca":
      return <path d="M-180 0 Q-200 -120 -90 -170 Q20 -220 120 -150 Q200 -90 180 0Z" fill="#6b6560" />;
    case "malecon":
      // muro bajo de hormigón de paseo marítimo (Somerton, 1948) con escalones a la arena a la derecha
      return (
        <g>
          <rect x={-430} y={-150} width={700} height={150} fill="#bdb6a6" />
          <rect x={-440} y={-170} width={720} height={24} rx={4} fill="#d6d0c2" />
          {[-300, -120, 60, 220].map((x) => <line key={x} x1={x} y1={-146} x2={x} y2={0} stroke="#a49d8d" strokeWidth={6} />)}
          {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={270 + i * 34} y={-150 + i * 30} width={190 - i * 34} height={30} fill={i % 2 ? "#c9c2b2" : "#b3ac9c"} />)}
          <rect x={-430} y={-12} width={700} height={12} fill="#00000018" />
        </g>
      );
    case "tranvia": {
      // tranvía de una caja de los años 40 (Glenelg), crema y granate, con trole
      return (
        <g>
          <rect x={-380} y={-20} width={760} height={10} fill="#5a5048" />
          <rect x={-330} y={-250} width={660} height={220} rx={18} fill="#e6dcc0" />
          <rect x={-330} y={-110} width={660} height={80} rx={10} fill="#7a2a2a" />
          <rect x={-345} y={-270} width={690} height={30} rx={14} fill="#5a4a3a" />
          {[-280, -170, -60, 50, 160].map((x) => <rect key={x} x={x} y={-225} width={90} height={90} rx={6} fill="#3e4f5e" />)}
          <rect x={250} y={-225} width={55} height={190} rx={4} fill="#4a3a2e" />
          <line x1={0} y1={-270} x2={-220} y2={-420} stroke="#2a2a2a" strokeWidth={8} />
          {[-220, 220].map((x) => <circle key={x} cx={x} cy={-20} r={28} fill="#2a2a2a" />)}
        </g>
      );
    }
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
    case "electrometro": {
      // electrómetro de cuarzo piezoeléctrico (Curie, 1898) sobre su mesa: lámpara, espejo y escala con el punto de luz
      const punto = Math.sin(f / 45) * 70 + Math.sin(f / 13) * 6;
      return (
        <g>
          <rect x={-300} y={-230} width={600} height={30} fill="#6b4a32" />
          <rect x={-280} y={-200} width={26} height={200} fill="#5a3d28" />
          <rect x={254} y={-200} width={26} height={200} fill="#5a3d28" />
          {/* caja de latón y vidrio del electrómetro */}
          <rect x={-250} y={-400} width={170} height={170} rx={10} fill="#b8933f" stroke="#7a5f22" strokeWidth={6} />
          <rect x={-225} y={-375} width={120} height={110} fill="#d9eef5" opacity={0.55} />
          <line x1={-165} y1={-370} x2={-165} y2={-280} stroke="#5a4a2a" strokeWidth={4} />
          <rect x={-180} y={-470} width={30} height={70} fill="#7a5f22" />
          {/* plato con el polvo */}
          <ellipse cx={-30} cy={-238} rx={60} ry={12} fill="#c9c4b8" />
          <ellipse cx={-30} cy={-244} rx={34} ry={7} fill="#f4f2ea" />
          {/* lámpara y haz hacia la escala */}
          <rect x={20} y={-330} width={50} height={100} rx={8} fill="#3d3d3d" />
          <circle cx={45} cy={-310} r={14} fill="#ffe9a8" />
          {/* escala graduada con el punto de luz */}
          <rect x={100} y={-520} width={190} height={290} fill="#efe6d0" stroke="#6b4a32" strokeWidth={6} />
          {Array.from({ length: 11 }).map((_, i) => (
            <line key={i} x1={110} y1={-500 + i * 25} x2={i % 5 === 0 ? 170 : 145} y2={-500 + i * 25} stroke="#3b3b3b" strokeWidth={3} />
          ))}
          <path d={`M45 -310 L195 ${-375 + punto}`} stroke="#fff4c2" strokeWidth={6} opacity={0.35} />
          <circle cx={215} cy={-375 + punto} r={16} fill="#fff6b0" />
          <circle cx={215} cy={-375 + punto} r={30} fill="#fff6b0" opacity={0.3} />
        </g>
      );
    }
    case "cristalizadores":
      // mesa de química con cubetas de cristalización: el polvo blanco brilla débilmente
      return (
        <g>
          <rect x={-300} y={-230} width={600} height={30} fill="#6b4a32" />
          <rect x={-280} y={-200} width={26} height={200} fill="#5a3d28" />
          <rect x={254} y={-200} width={26} height={200} fill="#5a3d28" />
          {[-200, -60, 80].map((x, i) => (
            <g key={i}>
              <path d={`M${x - 55} -290 L${x - 45} -232 L${x + 45} -232 L${x + 55} -290`} fill="#d9eef5" opacity={0.6} stroke="#9fb6c4" strokeWidth={4} />
              {[0, 1, 2, 3, 4].map((j) => (
                <polygon key={j} points={`${x - 30 + j * 15},-238 ${x - 24 + j * 15},-256 ${x - 18 + j * 15},-238`} fill="#f7f7f0" />
              ))}
              <ellipse cx={x} cy={-250} rx={46} ry={16} fill="#bfe6ff" opacity={0.25 + 0.15 * Math.sin(f / 20 + i)} />
            </g>
          ))}
          {/* matraz y cuaderno */}
          <path d="M200 -232 L170 -232 L190 -300 L190 -350 L210 -350 L210 -300 L230 -232Z" fill="#cfe3ec" stroke="#8aa3b2" strokeWidth={4} />
          <rect x={232} y={-246} width={50} height={14} fill="#3b2f26" />
        </g>
      );
    case "espectro": {
      // espectroscopio: banda oscura con las rayas de colores de un elemento; la raya violeta nueva late
      const brillo = 0.6 + 0.4 * Math.sin(f / 10);
      const rayas: [number, string][] = [[-150, "#ff3b2f"], [-95, "#ff9a2f"], [-40, "#ffe14d"], [10, "#4dd96b"], [60, "#3bb4ff"]];
      return (
        <g>
          <rect x={-18} y={-300} width={36} height={300} fill="#5a3d28" />
          <rect x={-240} y={-560} width={480} height={270} rx={14} fill="#2a2420" stroke="#8a6a3a" strokeWidth={10} />
          <rect x={-210} y={-500} width={420} height={140} fill="#07070c" />
          {rayas.map(([x, c]) => <rect key={x} x={x} y={-500} width={8} height={140} fill={c} opacity={0.8} />)}
          <rect x={130} y={-500} width={14} height={140} fill="#b06bff" opacity={brillo} />
          <rect x={118} y={-505} width={38} height={150} fill="#b06bff" opacity={brillo * 0.3} />
          <text x={137} y={-330} fontSize={26} textAnchor="middle" fill="#e6d3ff" fontFamily="serif">?</text>
        </g>
      );
    }
    case "parapeto-aleman": {
      // el parapeto enemigo al otro lado de la tierra de nadie, con arbolitos de Navidad y velas (va LEJANO;
      // se dibuja alto para asomar por encima de nuestros sacos)
      return (
        <g>
          <rect x={-1400} y={-640} width={2800} height={60} rx={20} fill="#3a3326" />
          {Array.from({ length: 30 }).map((_, i) => <rect key={i} x={-1400 + i * 96} y={-668} width={90} height={34} rx={14} fill="#4a4232" />)}
          {Array.from({ length: 9 }).map((_, i) => {
            const x = -1200 + i * 300 + (i % 2) * 60;
            return (
              <g key={i}>
                <polygon points={`${x},-830 ${x - 55},-668 ${x + 55},-668`} fill="#1f3a2a" />
                {[0, 1, 2, 3].map((j) => {
                  const cx = x - 34 + ((j * 23) % 68);
                  const cy = -690 - j * 34;
                  const b = 0.6 + 0.4 * Math.sin(f / 7 + i * 3 + j);
                  return <g key={j}><circle cx={cx} cy={cy} r={20} fill="#ffd27a" opacity={0.3 * b} /><circle cx={cx} cy={cy} r={8} fill="#fff1b8" opacity={b} /></g>;
                })}
              </g>
            );
          })}
        </g>
      );
    }
    case "lecho":
      // lecho de triclinio romano: armazón bajo, colchón y almohadones en los dos extremos
      return (
        <g>
          <rect x={-280} y={-60} width={560} height={26} fill="#6b4a32" />
          {[-260, 240].map((x) => <rect key={x} x={x} y={-40} width={22} height={40} fill="#5a3d28" />)}
          <rect x={-270} y={-120} width={540} height={66} rx={24} fill="#9b2d30" />
          <rect x={-270} y={-96} width={540} height={10} fill="#c79a2a" opacity={0.8} />
          <ellipse cx={-230} cy={-140} rx={70} ry={36} fill="#c79a2a" />
          <ellipse cx={230} cy={-140} rx={70} ry={36} fill="#c79a2a" />
        </g>
      );
    case "estatua-saturno":
      // estatua de Saturno en su templo: manto, hoz en la mano y los pies atados con cintas de lana
      return (
        <g>
          <rect x={-150} y={-120} width={300} height={120} fill="#b9b2a4" />
          <rect x={-170} y={-140} width={340} height={26} fill="#d2cbbd" />
          <path d="M-90 -140 L-110 -560 Q0 -640 110 -560 L90 -140Z" fill="#c9a24a" />
          <path d="M-110 -560 Q0 -700 110 -560 Q60 -520 0 -540 Q-60 -520 -110 -560Z" fill="#a8832e" />
          <circle cx={0} cy={-610} r={52} fill="#d9b25a" />
          <path d="M-60 -640 Q0 -700 60 -640 Q70 -580 40 -560 L-40 -560 Q-70 -580 -60 -640Z" fill="#a8832e" />
          <path d="M-40 -580 Q0 -540 40 -580 L30 -520 Q0 -500 -30 -520Z" fill="#e6dcc6" />
          <rect x={100} y={-520} width={14} height={260} fill="#6b5236" />
          <path d="M107 -520 Q200 -560 170 -460" stroke="#cfd6dc" strokeWidth={14} fill="none" strokeLinecap="round" />
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M-100 ${-170 - i * 26} Q-50 ${-150 - i * 26} 0 ${-170 - i * 26} T100 ${-170 - i * 26}`} stroke="#f4efe2" strokeWidth={12} fill="none" />
          ))}
        </g>
      );
    case "cruz":
      // cruz de madera improvisada (tumbas de campaña)
      return (
        <g>
          <ellipse cx={0} cy={0} rx={80} ry={16} fill="#3b2f22" opacity={0.6} />
          <rect x={-9} y={-200} width={18} height={200} fill="#6b5236" />
          <rect x={-50} y={-160} width={100} height={16} fill="#6b5236" />
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
    case "bandera-eeuu": {
      // bandera de EE. UU. de 1941 (48 estrellas): 13 barras y cantón azul, ondeando
      const w1 = Math.sin(f / 6) * 20, w2 = Math.sin(f / 6 + 1) * 20;
      const tela = `M8 -550 Q120 ${-570 + w1} 240 -550 L240 -420 Q120 ${-440 + w2} 8 -420Z`;
      const alto = 132 / 13;
      return (
        <g>
          <defs><clipPath id="clip-bandera-eeuu"><path d={tela} /></clipPath></defs>
          <rect x={-8} y={-560} width={16} height={560} fill="#9a9a9a" />
          <circle cx={0} cy={-564} r={12} fill="#c9a24a" />
          <g clipPath="url(#clip-bandera-eeuu)">
            {Array.from({ length: 13 }, (_, i) => (
              <path key={i} d={`M8 ${-550 + i * alto} Q120 ${-570 + w1 + i * alto} 240 ${-550 + i * alto} L240 ${-550 + (i + 1) * alto} Q120 ${-570 + w1 + (i + 1) * alto} 8 ${-550 + (i + 1) * alto}Z`} fill={i % 2 ? "#f4f1ea" : "#b3282d"} />
            ))}
            <rect x={8} y={-590} width={104} height={110} fill="#2b3a6b" />
            {Array.from({ length: 30 }, (_, k) => (
              <circle key={k} cx={20 + (k % 6) * 16 + (Math.floor(k / 6) % 2) * 8} cy={-544 + Math.floor(k / 6) * 12 + (w1 * (k % 6)) / 60} r={3} fill="#f4f1ea" />
            ))}
          </g>
        </g>
      );
    }
    case "bandera-uk": {
      // Union Jack ondeando (cruces de San Jorge, San Andrés y San Patricio sobre azul)
      const w1 = Math.sin(f / 6) * 20;
      const tela = `M8 -550 Q120 ${-570 + w1} 240 -550 L240 -420 Q120 ${-440 + w1} 8 -420Z`;
      return (
        <g>
          <defs><clipPath id="clip-bandera-uk"><path d={tela} /></clipPath></defs>
          <rect x={-8} y={-560} width={16} height={560} fill="#9a9a9a" />
          <circle cx={0} cy={-564} r={12} fill="#c9a24a" />
          <g clipPath="url(#clip-bandera-uk)" transform={`translate(0 ${w1 / 2})`}>
            <rect x={0} y={-600} width={250} height={200} fill="#1f3a7a" />
            <path d="M8 -560 L240 -420 M240 -560 L8 -420" stroke="#f4f1ea" strokeWidth={26} />
            <path d="M8 -560 L240 -420 M240 -560 L8 -420" stroke="#c8202f" strokeWidth={9} />
            <path d="M124 -600 V-400 M0 -485 H250" stroke="#f4f1ea" strokeWidth={40} />
            <path d="M124 -600 V-400 M0 -485 H250" stroke="#c8202f" strokeWidth={24} />
          </g>
        </g>
      );
    }
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
    case "banco-pieles":
      // banco corrido de la casa larga nórdica: tarima de tablas junto a la pared, con pieles y mantas de lana encima
      return (
        <g>
          <rect x={-340} y={-130} width={680} height={130} fill="#5a3d28" />
          {[-300, -150, 0, 150, 300].map((x) => <rect key={x} x={x - 4} y={-130} width={8} height={130} fill="#3e2a1b" />)}
          <rect x={-350} y={-150} width={700} height={26} rx={6} fill="#6e4b30" />
          <path d="M-320 -150 Q-300 -205 -200 -200 Q-120 -215 -60 -190 Q-40 -170 -50 -150Z" fill="#8a7a66" />
          <path d="M-60 -150 Q-40 -190 60 -186 Q140 -196 190 -170 L196 -150Z" fill="#6b5a48" />
          <path d="M150 -150 Q170 -200 260 -196 Q320 -192 330 -150Z" fill="#9a6e48" />
          <path d="M-260 -190 Q-230 -176 -180 -188 M40 -176 Q90 -166 140 -178" stroke="#00000030" strokeWidth={6} fill="none" />
        </g>
      );
    case "arcon":
      // arcón de madera con herrajes de hierro
      return (
        <g>
          <rect x={-170} y={-180} width={340} height={180} rx={10} fill="#7a5232" />
          <path d="M-170 -180 Q0 -250 170 -180Z" fill="#8a6040" />
          {[-110, 110].map((x) => <rect key={x} x={x - 14} y={-232} width={28} height={232} fill="#3a3a3a" />)}
          <rect x={-170} y={-60} width={340} height={14} fill="#3a3a3a" />
          <rect x={-20} y={-150} width={40} height={40} rx={6} fill="#2a2a2a" />
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
    case "reloj-parado": {
      // reloj de pie; "reloj-parado": nadie le dio cuerda, agujas y péndulo quietos
      const parado = tipo === "reloj-parado";
      const pendulo = parado ? 0 : Math.sin(f / 8) * 14;
      return (
        <g>
          <rect x={-90} y={-720} width={180} height={720} fill="#5a3d28" />
          <circle cx={0} cy={-580} r={70} fill="#f0e6d2" />
          <line x1={0} y1={-580} x2={0} y2={-630} stroke="#222" strokeWidth={8} transform={`rotate(${parado ? 200 : f * 0.5} 0 -580)`} />
          <line x1={0} y1={-580} x2={40} y2={-580} stroke="#222" strokeWidth={8} transform={parado ? "rotate(-30 0 -580)" : undefined} />
          <line x1={0} y1={-480} x2={0} y2={-220} stroke="#c9a24a" strokeWidth={8} transform={`rotate(${pendulo} 0 -480)`} />
          <circle cx={Math.sin((pendulo * Math.PI) / 180) * -260} cy={-480 + Math.cos((pendulo * Math.PI) / 180) * 260} r={24} fill="#c9a24a" />
        </g>
      );
    }
    case "bergantin-hielo":
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
    case "humo": {
      // columna de humo negro que sube (barco ardiendo, incendio): ponla sobre el barco con escala 0.6–1
      return (
        <g>
          {Array.from({ length: 10 }).map((_, i) => {
            const t = ((f * 2.2 + i * 70) % 700) / 700;
            return <circle key={i} cx={Math.sin(f / 25 + i) * 30 + t * 160} cy={-120 - t * 700} r={50 + t * 140} fill={i % 2 ? "#2b2826" : "#3d3936"} opacity={0.85 * (1 - t * 0.6)} />;
          })}
          {Array.from({ length: 5 }).map((_, i) => <path key={`l${i}`} d={`M${-90 + i * 45} -40 Q${-70 + i * 45} ${-150 - 30 * Math.sin(f / 3 + i)} ${-50 + i * 45} -40Z`} fill={i % 2 ? "#ff8a2a" : "#ffd04a"} opacity={0.9} />)}
        </g>
      );
    }
    case "explosion": {
      // gran explosión lejana: destello, columna de humo y hongo. Escala 0.8–1.2, x lejos de los personajes
      const h = Math.min(1, f / 60);
      const destello = Math.max(0, 1 - f / 24);
      return (
        <g>
          <circle cx={0} cy={-300} r={3200} fill="#fff6d8" opacity={0.85 * destello} />
          <path d={`M-90 0 Q-60 ${-500 * h} -70 ${-900 * h} L70 ${-900 * h} Q60 ${-500 * h} 90 0Z`} fill="#4a4440" />
          {Array.from({ length: 11 }).map((_, i) => (
            <circle key={i} cx={-420 + i * 84 + Math.sin(f / 30 + i) * 18} cy={-900 * h - 60 + Math.sin(i * 1.9) * 70} r={(120 + (i % 3) * 45) * h} fill={i % 2 ? "#3a3532" : "#5b5450"} />
          ))}
          <ellipse cx={0} cy={-30} rx={320 * h} ry={70} fill="#ff7a2a" opacity={0.75} />
          <ellipse cx={0} cy={-40} rx={160 * h} ry={40} fill="#ffe08a" opacity={0.8 + 0.2 * Math.sin(f / 2)} />
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
    case "muralla": {
      // muralla aureliana (Roma, 271–275): lienzo de ladrillo con almenas y torres cuadradas cada pocos metros
      const lad = noche ? "#6a4a3a" : "#b06a48";
      const jun = noche ? "#4a3428" : "#8a5038";
      const torre = (x: number) => (
        <g key={x}>
          <rect x={x - 110} y={-620} width={220} height={620} fill={lad} />
          {[0, 1, 2, 3].map((k) => <rect key={k} x={x - 110 + k * 60} y={-660} width={40} height={40} fill={lad} />)}
          <rect x={x - 30} y={-520} width={60} height={90} rx={30} fill="#2a201a" />
          {Array.from({ length: 14 }, (_, k) => <rect key={k} x={x - 110} y={-600 + k * 42} width={220} height={4} fill={jun} />)}
        </g>
      );
      return (
        <g>
          <rect x={-900} y={-420} width={1800} height={420} fill={lad} />
          {Array.from({ length: 22 }, (_, k) => <rect key={k} x={-900 + k * 82} y={-460} width={50} height={40} fill={lad} />)}
          {Array.from({ length: 10 }, (_, k) => <rect key={k} x={-900} y={-400 + k * 42} width={1800} height={4} fill={jun} />)}
          {[-640, 0, 640].map(torre)}
        </g>
      );
    }
    case "barca-durham": {
      // barca Durham (río Delaware, 1776): casco largo, negro y abierto, de bordas altas y proa y popa en punta,
      // sin vela; dos pértigas clavadas en el agua y el remo de espadilla a popa. Se mece un poco en la corriente.
      const bal = Math.sin(f / 18) * 3;
      return (
        <g transform={`translate(0 ${bal})`}>
          <path d="M-620 -150 L-520 -40 Q0 10 520 -40 L620 -150 Z" fill="#2c2620" />
          <path d="M-620 -150 L620 -150" stroke="#5a4a36" strokeWidth={14} />
          {[-400, -200, 0, 200, 400].map((x) => <rect key={x} x={x - 6} y={-150} width={12} height={100} fill="#3e342a" />)}
          <path d="M-480 -150 L-360 -560 M260 -150 L380 -560" stroke="#7a5a36" strokeWidth={10} />
          <path d="M600 -150 L780 -60" stroke="#6b4a2e" strokeWidth={14} />
          <rect x={760} y={-80} width={60} height={40} rx={6} fill="#6b4a2e" transform="rotate(26 780 -60)" />
          <path d="M-640 -30 Q-320 -10 0 -30 Q320 -10 640 -30" stroke="#ffffff" strokeWidth={6} fill="none" opacity={0.25} />
        </g>
      );
    }
    case "oruwa": {
      // canoa de pesca cingalesa: tronco vaciado estrecho, batanga (flotador) unida por dos palos curvos y vela de tela cuadrada
      const bal = Math.sin(f / 14) * 2; // apenas se mece (también sirve varada en la arena)
      return (
        <g transform={`translate(0 ${bal}) rotate(${bal / 6})`}>
          <path d="M-360 -60 Q-380 -110 -330 -110 L330 -110 Q380 -110 360 -60 Q0 0 -360 -60Z" fill="#5e4026" />
          <path d="M-330 -110 L330 -110" stroke="#c9a26a" strokeWidth={10} />
          <path d="M-330 -100 Q0 -88 330 -100" stroke="#3a2614" strokeWidth={5} fill="none" />
          {[-140, 120].map((x) => <path key={x} d={`M${x} -112 Q${x - 40} -200 ${x - 170} -150`} stroke="#4a3220" strokeWidth={12} fill="none" />)}
          <ellipse cx={-110} cy={-146} rx={170} ry={18} fill="#6e5032" />
          <rect x={-6} y={-520} width={12} height={410} fill="#3a2614" />
          <path d="M6 -500 L170 -470 L150 -190 L6 -200Z" fill="#e4d6b4" />
          <path d="M6 -350 L160 -330" stroke="#c4b48e" strokeWidth={4} />
        </g>
      );
    }
    case "dagoba":
      // estupa budista de Sri Lanka: cúpula blanca de campana sobre basas redondas, caja cuadrada y aguja dorada
      return (
        <g>
          <rect x={-330} y={-60} width={660} height={60} fill="#e8e4da" />
          <rect x={-290} y={-110} width={580} height={50} fill="#f2efe8" />
          <path d="M-260 -110 Q-270 -420 0 -440 Q270 -420 260 -110Z" fill="#f7f5f0" />
          <path d="M-200 -130 Q-190 -380 0 -410" stroke="#d8d2c4" strokeWidth={10} fill="none" />
          <rect x={-60} y={-500} width={120} height={64} fill="#efe9dc" />
          <path d="M-36 -500 L0 -720 L36 -500Z" fill="#d6a83a" />
          <circle cx={0} cy={-730} r={14} fill="#e8c25a" />
          {[-200, 200].map((x) => <rect key={x} x={x - 20} y={-60} width={40} height={60} fill="#d8d2c4" />)}
        </g>
      );
    case "torre-alerta":
      // torre de alerta de tsunami (desde 2006): mástil metálico con altavoces en lo alto y placa solar
      return (
        <g>
          <rect x={-90} y={-30} width={180} height={30} fill="#9a9a96" />
          <path d="M-40 0 L-14 -760 M40 0 L14 -760" stroke="#8a8e92" strokeWidth={14} />
          {[-600, -440, -280, -120].map((y) => <path key={y} d={`M${-36 + (y + 760) / 40} ${y} L${36 - (y + 760) / 40} ${y - 90}`} stroke="#8a8e92" strokeWidth={6} />)}
          <rect x={-60} y={-800} width={120} height={50} rx={8} fill="#d8d8d2" />
          {[-1, 1].map((s) => <path key={s} d={`M${s * 20} -830 L${s * 120} -880 L${s * 120} -780 L${s * 20} -800Z`} fill="#e8e6de" stroke="#9a9a96" strokeWidth={4} />)}
          <path d="M-70 -860 L70 -860 L90 -930 L-50 -930Z" fill="#2a3a5a" />
          <circle cx={0} cy={-740} r={10} fill="#d94a3a" opacity={0.5 + Math.sin(f / 8) * 0.4} />
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
    case "barca":
      // barca sagrada portátil (Neshmet): casco dorado con proa y popa curvas, cabina velada y varas de carga.
      // Va DETRÁS de los porteadores, a la altura del hombro: pon x en el punto medio entre los que llevan "cargar".
      return (
        <g>
          {[-1, 1].map((s2) => <rect key={s2} x={s2 * 150 - 8} y={-470} width={16} height={50} fill="#7a5a1a" />)}
          <rect x={-470} y={-436} width={940} height={16} rx={8} fill="#8a6a2a" />
          <path d="M-430 -560 Q-400 -470 -300 -470 L300 -470 Q400 -470 430 -560 Q380 -520 300 -520 L-300 -520 Q-380 -520 -430 -560Z" fill="#d9a830" stroke="#8a6a1a" strokeWidth={8} />
          <path d="M-280 -495 h560" stroke="#1f6fb2" strokeWidth={10} />
          {[-1, 1].map((s2) => <circle key={s2} cx={s2 * 432} cy={-570} r={20} fill="#e8c050" stroke="#8a6a1a" strokeWidth={5} />)}
          <rect x={-130} y={-700} width={260} height={180} fill="#f4efe2" stroke="#c8932f" strokeWidth={10} />
          <path d="M-130 -700 q65 40 130 0 q65 40 130 0" fill="none" stroke="#d9cfb6" strokeWidth={6} />
          {[-70, 0, 70].map((x) => <path key={x} d={`M${x} -690 v160`} stroke="#e2d8c0" strokeWidth={5} />)}
          <rect x={-150} y={-720} width={300} height={24} fill="#c8932f" />
          {[-120, -60, 0, 60, 120].map((x) => <circle key={x} cx={x} cy={-728} r={9} fill={noche ? "#d9a830" : "#e8c050"} />)}
        </g>
      );
    case "yed":
      // pilar Dyed: columna vertebral de Osiris, con cuatro travesaños arriba
      return (
        <g>
          <rect x={-90} y={-40} width={180} height={40} fill="#c9b48a" />
          <rect x={-55} y={-560} width={110} height={520} fill="#e6d3a3" stroke="#8b6b4a" strokeWidth={6} />
          {[0, 1, 2].map((i) => <rect key={i} x={-55} y={-300 + i * 70} width={110} height={18} fill="#1f6fb2" />)}
          {[0, 1, 2, 3].map((i) => <rect key={i} x={-120} y={-740 + i * 48} width={240} height={30} rx={6} fill={i % 2 ? "#1f6fb2" : "#c8932f"} stroke="#8b6b4a" strokeWidth={5} />)}
          <rect x={-70} y={-760} width={140} height={30} fill="#e6d3a3" stroke="#8b6b4a" strokeWidth={5} />
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
        <g transform={`translate(${x} ${-640 + Math.sin(f / 20) * 20})`}>
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
    case "lodo": {
      // avalancha de lodo (lahar): entra desde la izquierda y lo cubre todo hasta media altura.
      // Ponlo el ÚLTIMO en props, con x 0, para que tape la parte baja de casas y árboles.
      const dx = Math.min(0, -3200 + f * 14);
      const ola = (i: number) => Math.sin(f / 9 + i * 1.3) * 18;
      const cresta = Array.from({ length: 21 }, (_, i) => `${-2000 + i * 200},${-260 + ola(i) - (i === 20 ? 80 : 0)}`).join(" L");
      return (
        <g transform={`translate(${dx} 0)`}>
          <path d={`M-2000 320 L-2000 40 L${cresta} L2150 -120 Q2250 -40 2300 40 L2300 320Z`} fill="#6b5240" />
          <path d={`M-2000 40 L${Array.from({ length: 21 }, (_, i) => `${-2000 + i * 200},${-170 + ola(i + 3)}`).join(" L")} L2100 320 L-2000 320Z`} fill="#584232" />
          {Array.from({ length: 14 }).map((_, i) => {
            const x = -1900 + i * 290 + ((f * 3 + i * 70) % 120);
            const y = -200 + ((i * 53) % 140) + Math.sin(f / 7 + i) * 10;
            return i % 3 === 0
              ? <rect key={i} x={x - 90} y={y - 12} width={180} height={24} rx={10} fill="#8a6a44" transform={`rotate(${(i * 37) % 50 - 25 + Math.sin(f / 11 + i) * 8} ${x} ${y})`} />
              : <circle key={i} cx={x} cy={y} r={18 + (i % 4) * 10} fill={i % 2 ? "#7b746c" : "#5f5a54"} />;
          })}
          {Array.from({ length: 10 }).map((_, i) => <ellipse key={`e${i}`} cx={2080 + Math.sin(f / 5 + i) * 30} cy={-150 + i * 18} rx={40} ry={14} fill="#8c7258" opacity={0.7} />)}
        </g>
      );
    }
    case "barrizal": {
      // Armero después del lahar: llanura de barro gris hasta el horizonte, con tejados, copas y tablas asomando.
      // Ponlo el PRIMERO en props, con x 0; los personajes quedan de pie encima.
      const borde = Array.from({ length: 25 }, (_, i) => `${-2400 + i * 200},${-178 + Math.sin(i * 1.7) * 6}`).join(" L");
      const tejado = (x: number, y: number, w: number, r: number, c: string) => (
        <g transform={`translate(${x} ${y}) rotate(${r})`}>
          <polygon points={`${-w / 2},0 0,${-w * 0.42} ${w / 2},0`} fill={c} />
          <polygon points={`${-w / 2},0 0,${-w * 0.42} ${w / 2},0`} fill="none" stroke="#3a2a20" strokeWidth={6} opacity={0.5} />
          <rect x={-w / 2} y={-4} width={w} height={22} fill="#6e6458" />
        </g>
      );
      const copa = (x: number, y: number, s: number) => (
        <g transform={`translate(${x} ${y}) scale(${s})`}>
          {[-60, -25, 15, 50].map((a, i) => <path key={i} d={`M0 0 Q${Math.sin(a / 57) * 90} -60 ${Math.sin(a / 57) * 170} ${-20 + Math.abs(a)}`} stroke="#5d6b45" strokeWidth={16} fill="none" strokeLinecap="round" />)}
          <rect x={-8} y={0} width={16} height={30} fill="#5a4a3a" />
        </g>
      );
      return (
        <g>
          <path d={`M-2400 700 L-2400 -178 L${borde} L2400 700Z`} fill="#857869" />
          <path d={`M-2400 700 L-2400 -120 Q-1200 -150 0 -110 T2400 -130 L2400 700Z`} fill="#786b5d" />
          <path d={`M-2400 700 L-2400 -40 Q-1000 -70 300 -30 T2400 -50 L2400 700Z`} fill="#6c5f52" />
          {Array.from({ length: 16 }).map((_, i) => <path key={i} d={`M${-2300 + i * 300} ${-150 + (i % 4) * 45} q120 -10 240 0`} stroke="#9a8d7c" strokeWidth={5} fill="none" opacity={0.6} />)}
          {tejado(-1500, -168, 260, -6, "#7a4a36")}
          {tejado(-720, -150, 200, 8, "#8a5a3e")}
          {tejado(820, -160, 240, -10, "#7a4a36")}
          {tejado(1650, -150, 280, 5, "#6e4434")}
          {copa(-1150, -170, 0.9)}
          {copa(1250, -175, 1.1)}
          {[-1900, -300, 450, 2000].map((x, i) => (
            <g key={i} transform={`translate(${x} ${-150 + (i % 2) * 30}) rotate(${(i * 23) % 40 - 20})`}>
              <rect x={-14} y={-130} width={28} height={130} fill="#4f4136" />
              <path d="M0 -130 l-30 -40 M0 -100 l35 -35" stroke="#4f4136" strokeWidth={10} />
            </g>
          ))}
          {[-1000, -200, 600, 1350].map((x, i) => <rect key={`t${i}`} x={x} y={-60 + (i % 2) * 70} width={260} height={20} rx={6} fill="#9a7b55" transform={`rotate(${(i * 17) % 20 - 10} ${x + 130} ${-50 + (i % 2) * 70})`} />)}
          <rect x={-260} y={-8} width={520} height={26} rx={8} fill="#a8875e" />
          <rect x={-240} y={-8} width={480} height={6} fill="#c4a374" opacity={0.6} />
        </g>
      );
    }
    case "templo-romano":
      // fachada de templo con podio, escalinata, seis columnas y frontón
      return (
        <g>
          <rect x={-520} y={-220} width={1040} height={220} fill="#cfc4ae" />
          {Array.from({ length: 6 }).map((_, i) => <rect key={`e${i}`} x={-560 + i * 20} y={-40 * (6 - i) + 20} width={1120 - i * 40} height={40} fill={i % 2 ? "#ddd3bf" : "#d3c8b2"} />)}
          {Array.from({ length: 6 }).map((_, i) => (
            <g key={i} transform={`translate(${-400 + i * 160} -220)`}>
              <rect x={-36} y={-620} width={72} height={620} fill="#ece4d4" />
              {[-20, 0, 20].map((x) => <rect key={x} x={x - 4} y={-600} width={8} height={580} fill="#d6ccb8" />)}
              <rect x={-52} y={-650} width={104} height={34} fill="#e2d9c6" />
            </g>
          ))}
          <rect x={-500} y={-920} width={1000} height={70} fill="#e2d9c6" />
          <polygon points="-540,-920 0,-1120 540,-920" fill="#d9cfba" />
          <polygon points="-440,-935 0,-1080 440,-935" fill="#c8bca4" />
          <rect x={-150} y={-840} width={300} height={600} fill="#00000022" />
        </g>
      );
    case "ruinas":
      // casa de madera derrumbada (después de una explosión o un terremoto)
      return (
        <g>
          <path d="M-320 0 L-320 -260 L-240 -330 L-180 -250 L-120 -300 L-60 -160 L40 -230 L120 -120 L200 -190 L320 -60 L320 0Z" fill="#6e5a48" />
          {[[-260, -200, 25], [-90, -140, -18], [60, -170, 32], [190, -110, -10], [-200, -60, 8]].map(([x, y, r], i) => (
            <rect key={i} x={x - 110} y={y - 12} width={220} height={24} fill={i % 2 ? "#8a7058" : "#7a634e"} transform={`rotate(${r} ${x} ${y})`} />
          ))}
          <rect x={-300} y={-300} width={40} height={300} fill="#4f4136" transform="rotate(-8 -280 0)" />
          <rect x={160} y={-240} width={36} height={240} fill="#4f4136" transform="rotate(12 178 0)" />
          <path d="M-60 -340 Q-40 -420 -70 -500 Q-20 -440 -30 -360Z" fill="#9aa0a6" opacity={0.35 + 0.1 * Math.sin(f / 15)} />
        </g>
      );
    case "tren-diesel": {
      // tren costero diésel de Sri Lanka (2004): locomotora y dos coches azules con franja roja; siempre lejos y sin gente (parado)
      const x = 0;
      return (
        <g transform={`translate(${x} 0)`}>
          <rect x={-760} y={-20} width={1560} height={20} fill="#3a3a3a" />
          {[-720, -360].map((vx) => (
            <g key={vx}>
              <rect x={vx} y={-290} width={340} height={240} rx={14} fill="#2f5a9a" />
              <rect x={vx} y={-140} width={340} height={22} fill="#b8322d" />
              {[0, 1, 2, 3].map((k) => <rect key={k} x={vx + 22 + k * 80} y={-250} width={58} height={70} rx={6} fill="#cfe0ea" opacity={0.8} />)}
              {[vx + 60, vx + 280].map((cx) => <circle key={cx} cx={cx} cy={-40} r={30} fill="#222" />)}
            </g>
          ))}
          <path d="M0 -50 L0 -290 Q0 -320 30 -320 L420 -320 Q520 -300 560 -200 L560 -50Z" fill="#2f5a9a" />
          <rect x={0} y={-150} width={560} height={24} fill="#b8322d" />
          <path d="M440 -300 L520 -290 L548 -210 L440 -210Z" fill="#cfe0ea" opacity={0.85} />
          <rect x={60} y={-270} width={70} height={60} rx={6} fill="#cfe0ea" opacity={0.8} />
          {[90, 230, 380, 500].map((cx) => <circle key={cx} cx={cx} cy={-40} r={32} fill="#222" />)}
        </g>
      );
    }
    case "tren": {
      // locomotora de vapor con dos vagones; avanza despacio
      const x = Math.sin(f / 90) * 30;
      return (
        <g transform={`translate(${x} 0)`}>
          <rect x={-700} y={-20} width={1500} height={20} fill="#3a3a3a" />
          {[-600, -250].map((vx, i) => (
            <g key={i}>
              <rect x={vx} y={-300} width={320} height={250} rx={10} fill={i ? "#6b2f2a" : "#5a2a26"} />
              {[0, 1, 2].map((k) => <rect key={k} x={vx + 30 + k * 95} y={-260} width={70} height={70} fill="#e8d9a0" opacity={0.85} />)}
              {[vx + 60, vx + 260].map((cx) => <circle key={cx} cx={cx} cy={-40} r={36} fill="#222" />)}
            </g>
          ))}
          <rect x={100} y={-260} width={460} height={210} rx={20} fill="#26292c" />
          <rect x={430} y={-380} width={130} height={140} fill="#26292c" />
          <rect x={160} y={-340} width={60} height={90} fill="#26292c" />
          <rect x={150} y={-355} width={80} height={20} fill="#1a1c1e" />
          {[180, 300, 420, 520].map((cx, i) => <circle key={cx} cx={cx} cy={-45} r={i === 3 ? 30 : 50} fill="#1a1c1e" stroke="#7a1f1f" strokeWidth={8} />)}
          {[0, 1, 2, 3].map((k) => {
            const t = ((f * 1.2 + k * 25) % 100) / 100;
            return <circle key={k} cx={190 - t * 220} cy={-380 - t * 260} r={40 + t * 70} fill="#e8eaec" opacity={0.6 * (1 - t)} />;
          })}
        </g>
      );
    }
    case "wigwam":
      return (
        <g>
          <polygon points="-180,0 0,-420 180,0" fill="#b9a27e" />
          <polygon points="-180,0 0,-420 -60,0" fill="#a58e6a" />
          {[-80, 0, 80].map((y, i) => <path key={i} d={`M${-150 + i * 40} ${y - 60} L${150 - i * 40} ${y - 60}`} stroke="#7a6446" strokeWidth={6} transform={`translate(0 ${-i * 80})`} />)}
          <path d="M-20 -420 L-60 -500 M20 -420 L60 -500 M0 -420 L0 -510" stroke="#5a4632" strokeWidth={10} />
          <path d="M-50 0 Q0 -150 50 0Z" fill="#3e3226" />
        </g>
      );
    // ---------- Neolítico irlandés: Newgrange (Brú na Bóinne), c. 3200 a. C. ----------
    case "tumulo":
    case "tumulo-obra":
    case "tumulo-hierba": {
      // gran túmulo de piedras y tepes: frente de cuarzo blanco con cantos grises y anillo de bordillos.
      // Plano MEDIO (se apoya en la llanura, detrás de los personajes). "-obra": a medio levantar; "-hierba": siglos después, cubierto de hierba.
      const obra = tipo === "tumulo-obra";
      const hierba = tipo === "tumulo-hierba";
      const cupula = obra
        ? "M-900 0 C-850 -240 -600 -350 -320 -362 L240 -362 C560 -352 850 -240 900 0Z"
        : "M-900 0 C-820 -300 -450 -420 0 -420 C450 -420 820 -300 900 0Z";
      const banda = "M-900 0 L-900 -95 Q0 -170 900 -95 L900 0Z";
      const cid = `tum-${tipo}`;
      return (
        <g>
          <defs>
            <clipPath id={cid}><path d={cupula} /></clipPath>
            <clipPath id={`${cid}-b`}><path d={banda} /></clipPath>
          </defs>
          <path d={cupula} fill={hierba ? "#6a8c4a" : obra ? "#7a6248" : "#7f9c58"} />
          <g clipPath={`url(#${cid})`}>
            {/* sombra del lado derecho */}
            <rect x={150} y={-460} width={800} height={470} fill="#000" opacity={0.1} />
            {obra &&
              // capas de piedras y tepes, una sobre otra
              Array.from({ length: 8 }).map((_, i) => (
                <g key={i}>
                  <rect x={-920} y={-60 - i * 44} width={1840} height={22} fill={i % 2 ? "#9a948a" : "#6f8a4e"} opacity={0.9} />
                  {Array.from({ length: 16 }).map((__, j) => (
                    <ellipse key={j} cx={-860 + j * 115 + random(`tc${i}-${j}`) * 50} cy={-50 - i * 44} rx={16} ry={8} fill="#8a8478" opacity={i % 2 ? 0 : 0.8} />
                  ))}
                </g>
              ))}
            {!obra &&
              Array.from({ length: hierba ? 22 : 14 }).map((_, i) => (
                <path key={i} d={`M${-820 + random(`th${i}`) * 1640} ${-150 - random(`tv${i}`) * 240} q10 -26 20 0`} stroke={oscurecer(hierba ? "#6a8c4a" : "#7f9c58", 0.25)} strokeWidth={6} fill="none" />
              ))}
            {/* frente de cuarzo blanco salpicado de cantos de granito */}
            {!hierba && (
              <g clipPath={obra ? undefined : `url(#${cid}-b)`}>
                {obra ? <path d="M-300 0 L-300 -150 Q0 -190 300 -150 L300 0Z" fill="#eceae3" /> : <path d={banda} fill="#eceae3" />}
                {Array.from({ length: obra ? 26 : 90 }).map((_, i) => (
                  <ellipse key={i} cx={(obra ? -290 : -890) + random(`tq${i}`) * (obra ? 580 : 1780)} cy={-12 - random(`tr${i}`) * 150} rx={7 + random(`ts${i}`) * 7} ry={5 + random(`ts${i}`) * 4} fill={i % 3 ? "#8d8a85" : "#6e6b67"} />
                ))}
                <path d={obra ? "M-300 -150 Q0 -190 300 -150" : "M-900 -95 Q0 -170 900 -95"} stroke="#000" strokeOpacity={0.15} strokeWidth={8} fill="none" />
              </g>
            )}
            {hierba &&
              // arbustos y árboles que crecieron sobre el monte
              [[-420, -330, 70], [-180, -390, 55], [260, -380, 80], [560, -280, 60]].map(([x, y, r], i) => (
                <g key={i}>
                  <rect x={x - 8} y={y} width={16} height={r * 0.8} fill="#4a3826" />
                  <circle cx={x} cy={y} r={r} fill={i % 2 ? "#3f6a34" : "#4a7a3c"} />
                </g>
              ))}
          </g>
          {/* entrada: puerta oscura, caja de luz encima y losa de la entrada delante */}
          {!hierba && (
            <g>
              <rect x={-30} y={-118} width={60} height={104} fill="#14110e" />
              <rect x={-26} y={-158} width={52} height={26} fill="#14110e" />
              <rect x={-46} y={-134} width={92} height={18} fill="#8f8a82" />
              <rect x={-46} y={-172} width={92} height={16} fill="#8f8a82" />
            </g>
          )}
          {/* anillo de grandes bordillos de piedra */}
          {Array.from({ length: 16 }).map((_, i) => {
            const x = -860 + i * 115;
            if (Math.abs(x + 57) < 90) return null;
            const h = hierba ? 20 + random(`kh${i}`) * 16 : 46 + random(`kh${i}`) * 14;
            return <path key={i} d={`M${x} 0 Q${x - 4} ${-h} ${x + 20} ${-h - 4} L${x + 92} ${-h} Q${x + 112} ${-h * 0.6} ${x + 110} 0Z`} fill={["#8f8a82", "#7f7a73", "#9a958c"][i % 3]} stroke="#00000033" strokeWidth={3} />;
          })}
          {!hierba && (
            <g>
              <path d="M-86 0 Q-92 -56 -70 -64 L70 -64 Q92 -56 86 0Z" fill="#9a958c" />
              <g stroke="#5f5b55" strokeWidth={3} fill="none">
                <path d={espiral(-50, -32, 20, 2, 1)} />
                <path d={espiral(-14, -36, 18, 2, -1)} />
                <path d={espiral(40, -32, 20, 2, 1)} />
              </g>
            </g>
          )}
        </g>
      );
    }
    case "entrada-tumulo": {
      // la entrada vista de cerca: losa de la entrada tumbada con espirales, la puerta oscura detrás
      // y encima la caja de luz con su dintel de rombos, en el muro de cuarzo blanco. Usa x 0 y escala 1.
      const cuarzo = noche ? "#a9a7a1" : "#ecebe5";
      const piedra = noche ? "#67635d" : "#9a958c";
      const surco = noche ? "#3c3a36" : "#65615a";
      const verde = noche ? "#41552f" : "#6f9a4a";
      const negro = "#100d0b";
      const cupula = "M-1600 -260 C-1150 -820 -520 -1040 0 -1060 C520 -1040 1150 -820 1600 -260 L1600 0 L-1600 0Z";
      const muro = "M-1600 0 L-1600 -400 C-760 -900 760 -900 1600 -400 L1600 0Z";
      const losa = (x: number, w: number, h: number, c: string, k: number) => (
        <path key={k} d={`M${x - w / 2} 0 Q${x - w / 2 - 10} ${-h * 0.8} ${x - w / 2 + 40} ${-h} Q${x} ${-h - 16} ${x + w / 2 - 30} ${-h + 6} Q${x + w / 2 + 8} ${-h * 0.6} ${x + w / 2} 0Z`} fill={c} stroke="#00000030" strokeWidth={5} />
      );
      return (
        <g>
          <defs>
            <clipPath id="ent-cupula"><path d={cupula} /></clipPath>
            <clipPath id="ent-muro"><path d={muro} /></clipPath>
          </defs>
          <path d={cupula} fill={verde} />
          {Array.from({ length: 30 }).map((_, i) => (
            <path key={i} d={`M${-1300 + random(`eh${i}`) * 2600} ${-700 - random(`ev${i}`) * 320} q12 -30 24 0`} stroke={oscurecer(verde, 0.25)} strokeWidth={7} fill="none" />
          ))}
          <g clipPath="url(#ent-cupula)">
            <path d={muro} fill={cuarzo} />
            <g clipPath="url(#ent-muro)">
              {Array.from({ length: 230 }).map((_, i) => (
                <ellipse key={i} cx={-1600 + random(`ec${i}`) * 3200} cy={-20 - random(`ey${i}`) * 860} rx={18 + random(`er${i}`) * 22} ry={12 + random(`er${i}`) * 12}
                  fill={["#8d8a85", "#76736e", "#9c9893"][i % 3]} opacity={noche ? 0.6 : 1} transform={`rotate(${random(`eo${i}`) * 40 - 20} ${-1600 + random(`ec${i}`) * 3200} ${-20 - random(`ey${i}`) * 860})`} />
              ))}
              {/* destellos del cuarzo con el sol bajo */}
              {!noche && Array.from({ length: 14 }).map((_, i) => {
                const o = Math.max(0, Math.sin(f / 9 + i * 2.1));
                const x = -1300 + random(`ed${i}`) * 2600;
                const y = -60 - random(`ee${i}`) * 700;
                return <path key={`d${i}`} d={`M${x} ${y - 16} L${x + 4} ${y - 4} L${x + 16} ${y} L${x + 4} ${y + 4} L${x} ${y + 16} L${x - 4} ${y + 4} L${x - 16} ${y} L${x - 4} ${y - 4}Z`} fill="#fff" opacity={o * 0.9} />;
              })}
            </g>
            <path d="M-1600 -400 C-760 -900 760 -900 1600 -400" stroke="#000" strokeOpacity={0.18} strokeWidth={14} fill="none" />
          </g>
          {/* puerta y caja de luz */}
          <rect x={-100} y={-490} width={200} height={480} fill={negro} />
          <path d="M-200 -10 L-212 -470 Q-160 -505 -96 -488 L-92 -10Z" fill={piedra} />
          <path d="M200 -10 L212 -470 Q160 -505 96 -488 L92 -10Z" fill={oscurecer(piedra, 0.12)} />
          <path d="M-250 -470 L-244 -548 Q0 -566 244 -548 L250 -470 Q0 -458 -250 -470Z" fill={piedra} />
          <rect x={-125} y={-660} width={250} height={116} fill={negro} />
          <path d="M-190 -548 L-186 -660 L-124 -660 L-124 -548Z" fill={oscurecer(piedra, 0.08)} />
          <path d="M190 -548 L186 -660 L124 -660 L124 -548Z" fill={oscurecer(piedra, 0.18)} />
          <path d="M-250 -652 L-244 -752 Q0 -770 244 -752 L250 -652 Q0 -640 -250 -652Z" fill={piedra} />
          <path d={rombos(-215, -740, 430, 76, 6)} stroke={surco} strokeWidth={7} fill="none" strokeLinejoin="round" />
          {/* bordillos a los lados */}
          {[-1, 1].map((s) => [0, 1, 2].map((i) => losa(s * (690 + i * 310), 300, 200 + ((i + (s > 0 ? 1 : 0)) % 2) * 30, i % 2 ? oscurecer(piedra, 0.1) : piedra, s * 10 + i)))}
          {/* la losa de la entrada, tumbada delante de la puerta */}
          <ellipse cx={0} cy={6} rx={540} ry={26} fill="#000" opacity={0.25} />
          <path d="M-505 0 Q-525 -200 -445 -322 Q-200 -362 0 -350 Q240 -366 452 -330 Q528 -220 508 0Z" fill={piedra} />
          <path d="M-445 -322 Q-200 -362 0 -350 Q240 -366 452 -330 Q240 -344 0 -334 Q-200 -346 -445 -322Z" fill="#fff" opacity={0.18} />
          <g stroke={surco} strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round">
            {/* triple espiral a la izquierda */}
            <path d={espiral(-330, -215, 72, 2.4, 1)} />
            <path d={espiral(-180, -235, 66, 2.4, -1, Math.PI)} />
            <path d={espiral(-255, -95, 62, 2.2, 1, Math.PI / 2)} />
            <path d="M-5 -340 Q8 -170 -2 -12" />
            <path d={espiral(150, -215, 68, 2.3, -1)} />
            <path d={espiral(300, -160, 64, 2.2, 1, Math.PI)} />
            <path d={rombos(80, -90, 180, 64, 3)} />
            <path d="M-470 -40 q60 -40 120 0 M410 -280 q30 30 60 10" />
          </g>
        </g>
      );
    }
    case "losa-grabada": {
      // losa del anillo tumbada, con espirales y rombos picados a golpe de canto
      const piedra = noche ? "#6e6a63" : "#9a958c";
      const surco = noche ? "#45423d" : "#66625b";
      return (
        <g>
          <ellipse cx={0} cy={4} rx={410} ry={22} fill="#000" opacity={0.22} />
          <path d="M-390 0 Q-410 -150 -340 -250 Q-120 -290 60 -278 Q260 -292 360 -240 Q410 -130 392 0Z" fill={piedra} />
          <path d="M-340 -250 Q-120 -290 60 -278 Q260 -292 360 -240 Q260 -270 60 -262 Q-120 -274 -340 -250Z" fill="#fff" opacity={0.18} />
          <path d="M392 0 Q410 -130 360 -240 Q380 -120 360 0Z" fill="#000" opacity={0.15} />
          <g stroke={surco} strokeWidth={9} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d={espiral(-250, -140, 78, 2.4, 1)} />
            <path d={espiral(-95, -150, 72, 2.4, -1, Math.PI)} />
            <path d={rombos(30, -230, 210, 78, 3)} />
            <path d={rombos(30, -140, 210, 78, 3)} />
            <path d={espiral(310, -120, 52, 2, 1)} />
          </g>
        </g>
      );
    }
    case "losa-rodillos": {
      // gran losa arrastrada sobre troncos; las cuerdas salen hacia delante (derecha) a la altura de las manos
      // de los personajes con acción "arrastrar". Ponla a la izquierda (x ≈ -1.1) con escala 1.
      const av = Math.min(f * 0.3, 160);
      const piedra = noche ? "#6e6a63" : "#8f8a82";
      return (
        <g>
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M${av + 440} ${-200 - i * 16} Q${av + 900} ${-300 - i * 12} 2800 ${-300 - i * 14}`} stroke={i % 2 ? "#9a7f52" : "#b49a6a"} strokeWidth={11} fill="none" strokeLinecap="round" />
          ))}
          {[-330, -20, 290].map((x, i) => {
            const cx = x + av * 0.5;
            const g = ((av * 0.5) / 46) * 57.3;
            return (
              <g key={i} transform={`translate(${cx} -46)`}>
                <circle r={46} fill="#6b4a2e" />
                <circle r={34} fill="#a07a50" />
                <g transform={`rotate(${g})`} stroke="#7a5634" strokeWidth={4} fill="none">
                  <circle r={20} />
                  <path d="M0 -34 L0 34" />
                </g>
              </g>
            );
          })}
          <g transform={`translate(${av} 0)`}>
            <path d="M-490 -86 Q-512 -250 -410 -330 Q-100 -372 200 -352 Q430 -342 478 -262 Q506 -170 466 -86 Q0 -70 -490 -86Z" fill={piedra} />
            <path d="M-410 -330 Q-100 -372 200 -352 Q430 -342 478 -262 Q380 -320 200 -336 Q-100 -354 -410 -330Z" fill="#fff" opacity={0.16} />
            <path d="M-490 -86 Q0 -70 466 -86 Q0 -110 -490 -86Z" fill="#000" opacity={0.2} />
            {/* cuerdas atadas alrededor de la punta */}
            {[370, 410].map((x) => <path key={x} d={`M${x} -90 Q${x + 18} -210 ${x - 6} -340`} stroke="#9a7f52" strokeWidth={12} fill="none" />)}
          </g>
        </g>
      );
    }
    case "casa-neolitica": {
      // casa redonda de postes, zarzo y barro, con techo cónico de juncos, puerta baja y humo que sale por el techo
      const barro = noche ? "#6e5840" : "#a48462";
      const poste = "#4e3a28";
      const paja = noche ? "#7d6c45" : "#b89c5e";
      const pajaO = oscurecer(paja, 0.25);
      const fuego = 0.75 + 0.25 * Math.sin(f / 3.1) * Math.sin(f / 1.7);
      const alero = (x: number) => -212 + 38 * (1 - (x / 420) ** 2);
      return (
        <g>
          <ellipse cx={0} cy={6} rx={380} ry={26} fill="#000" opacity={0.22} />
          <path d="M-330 0 L-330 -260 L330 -260 L330 0 Q0 24 -330 0Z" fill={barro} />
          {[-290, -190, 190, 290].map((x) => <rect key={x} x={x - 12} y={-260} width={24} height={262} fill={poste} opacity={0.5} />)}
          {/* el barro se ha caído y asoma el zarzo de ramas trenzadas */}
          <path d="M150 -200 Q200 -222 270 -196 Q292 -130 262 -70 Q200 -52 156 -82 Q132 -140 150 -200Z" fill="#6b5235" />
          {[0, 1, 2, 3].map((i) => <path key={i} d={`M150 ${-180 + i * 32} q30 12 60 0 q30 -12 60 0`} stroke="#8a6a44" strokeWidth={9} fill="none" />)}
          <path d="M-330 -260 L-330 0 L-270 6 L-270 -260Z" fill="#000" opacity={0.12} />
          <path d="M330 -260 L330 0 L270 6 L270 -260Z" fill="#000" opacity={0.2} />
          <rect x={-330} y={-262} width={660} height={60} fill="#000" opacity={0.25} />
          {/* puerta baja */}
          {noche && <Brillo r={300} o={0.4 * fuego} cx={0} cy={-90} />}
          <path d="M-72 0 L-72 -180 Q0 -205 72 -180 L72 0Z" fill={noche ? "#ffb35a" : "#2a1d14"} opacity={noche ? fuego : 1} />
          {noche && <path d="M-72 0 L-72 -180 Q0 -205 72 -180 L72 0Z" fill="#7a3a14" opacity={0.5} transform="scale(0.7 0.75)" />}
          {[-84, 84].map((x) => <rect key={x} x={x - 12} y={-196} width={24} height={196} fill={poste} />)}
          {/* techo cónico de juncos */}
          <path d={`M-420 ${alero(-420)} L0 -700 L420 ${alero(420)} ${Array.from({ length: 29 }).map((_, i) => { const x = 420 - i * 30; return `L${x} ${alero(x) + (i % 2 ? 22 : 0)}`; }).join(" ")}Z`} fill={paja} />
          {Array.from({ length: 17 }).map((_, i) => {
            const x = -400 + i * 50;
            return <path key={i} d={`M${x * 0.04} -680 L${x} ${alero(x) + 8}`} stroke={pajaO} strokeWidth={5} opacity={0.65} />;
          })}
          {[0, 1].map((i) => <path key={`c${i}`} d={`M${-300 + i * 110} ${-330 - i * 110} Q0 ${-300 - i * 140} ${300 - i * 110} ${-330 - i * 110}`} stroke={pajaO} strokeWidth={10} fill="none" opacity={0.7} />)}
          <path d={`M0 -700 L420 ${alero(420)} L120 -200Z`} fill="#000" opacity={0.12} />
          {/* humo que se filtra por el techo */}
          {[0, 1, 2, 3].map((k) => {
            const t = ((f * 0.8 + k * 32) % 128) / 128;
            return <circle key={k} cx={20 + t * 70 + Math.sin(t * 6 + k) * 16} cy={-690 - t * 340} r={24 + t * 56} fill="#cfcac0" opacity={0.45 * (1 - t)} />;
          })}
        </g>
      );
    }
    case "piragua":
    case "piragua-piedras": {
      // tronco vaciado sobre el agua (plano medio, con "rio"); "-piedras" lleva losas grises de carga. Deriva despacio a la derecha.
      const piedras = tipo === "piragua-piedras";
      return (
        <g transform={`translate(${f * 0.45} ${Math.sin(f / 18) * 5}) rotate(${Math.sin(f / 23) * 1.2})`}>
          {piedras
            ? [[-200, 46], [-100, 58], [10, 50], [120, 60], [220, 44]].map(([x, r], i) => <ellipse key={i} cx={x} cy={-62} rx={r} ry={r * 0.6} fill={["#8f8a82", "#7a766f", "#9a958c"][i % 3]} stroke="#00000033" strokeWidth={3} />)
            : <g><ellipse cx={-130} cy={-70} rx={70} ry={30} fill="#8a6440" /><ellipse cx={-20} cy={-66} rx={46} ry={24} fill="#a07a50" /></g>}
          <path d="M-350 -62 Q-362 -18 -310 0 L310 0 Q362 -18 350 -62 Q0 -50 -350 -62Z" fill="#5e4028" />
          <path d="M-330 -64 Q0 -50 330 -64 Q0 -40 -330 -64Z" fill="#2e1e12" />
          <path d="M-300 -30 Q0 -22 300 -30 M-260 -14 Q0 -8 260 -14" stroke="#4a3220" strokeWidth={4} fill="none" />
          <ellipse cx={-342} cy={-34} rx={14} ry={28} fill="#8a6440" />
          <line x1={210} y1={-240} x2={270} y2={10} stroke="#6b4a2a" strokeWidth={12} />
          <ellipse cx={272} cy={-10} rx={16} ry={46} fill="#6b4a2a" transform="rotate(-13 272 -10)" />
          <ellipse cx={0} cy={14} rx={380} ry={13} fill="#ffffff" opacity={0.18} />
        </g>
      );
    }
    case "rayo-solsticio":
    case "rayo-solsticio-entra":
    case "rayo-solsticio-avanza":
    case "rayo-solsticio-ensancha":
    case "rayo-solsticio-sale":
    case "rayo-solsticio-corto":
    case "rayo-solsticio-hilo":
    case "rayo-solsticio-pleno": {
      // el haz del amanecer del solsticio: entra por la caja de luz (arriba a la izquierda) y dibuja una franja dorada
      // en el suelo que crece, se ensancha y mengua. Oscurece el decorado de detrás: ponlo el ÚLTIMO en props, con x 0.
      const [largo, ancho] = estadoRayo(tipo, f / Math.max(1, dur));
      const vis = Math.min(1, largo * 6);
      const xs = -900;
      const xt = xs + Math.max(0.001, largo) * 1500;
      const w = 16 + ancho * 80;
      const A1 = [-1320, -1180];
      const A2 = [-1320 + 50 + ancho * 120, -1210];
      const latido = 0.92 + 0.08 * Math.sin(f / 7);
      return (
        <g>
          <defs>
            <linearGradient id="rayo-haz" gradientUnits="userSpaceOnUse" x1={A1[0]} y1={A1[1]} x2={xt} y2={20}>
              <stop offset="0" stopColor="#fff4cf" stopOpacity={0.75} />
              <stop offset="1" stopColor="#ffc95a" stopOpacity={0.35} />
            </linearGradient>
            <radialGradient id="rayo-pared">
              <stop offset="0" stopColor="#ffcf6a" stopOpacity={0.8} />
              <stop offset="1" stopColor="#ffcf6a" stopOpacity={0} />
            </radialGradient>
          </defs>
          {/* la cámara a oscuras */}
          <rect x={-3000} y={-2000} width={6000} height={2200} fill="#05060a" opacity={0.42} />
          <g opacity={vis * latido} style={{ mixBlendMode: "screen" }}>
            {/* la piedra del fondo se vuelve de oro */}
            <ellipse cx={xt - 120} cy={-260} rx={300 + ancho * 520} ry={240 + ancho * 300} fill="url(#rayo-pared)" opacity={0.35 + ancho * 0.65} />
            <polygon points={`${A1[0]},${A1[1]} ${A2[0]},${A2[1]} ${xt},20 ${xt - 40},${20 + w} ${xs - 40},${20 + w}`} fill="url(#rayo-haz)" opacity={0.55} />
            <polygon points={`${(A1[0] + A2[0]) / 2 - 10},${A1[1] - 15} ${(A1[0] + A2[0]) / 2 + 12},${A1[1] - 15} ${xt - 20},${24 + w * 0.3} ${xs},${24 + w * 0.6}`} fill="#fff4cf" opacity={0.3} />
            {/* franja dorada en el suelo */}
            <polygon points={`${xs - 20},12 ${xt + 20},12 ${xt - 30},${28 + w} ${xs - 60},${28 + w}`} fill="#ffb347" opacity={0.5} style={{ filter: "blur(10px)" }} />
            <polygon points={`${xs},20 ${xt},20 ${xt - 40},${20 + w} ${xs - 40},${20 + w}`} fill="#ffd36e" />
            <polygon points={`${xs + 30},${24 + w * 0.25} ${xt - 25},${24 + w * 0.25} ${xt - 40},${18 + w * 0.7} ${xs + 10},${18 + w * 0.7}`} fill="#fff6d8" opacity={0.85} />
            {/* polvo brillando dentro del haz */}
            {Array.from({ length: 46 }).map((_, i) => {
              const u = random(`ru${i}`);
              const v = random(`rv${i}`);
              const bx = A1[0] + (A2[0] - A1[0]) * v;
              const by = A1[1] + (A2[1] - A1[1]) * v;
              const fx = xs + (xt - xs) * v;
              const x = bx + (fx - bx) * u + Math.sin(f / 40 + i) * 14;
              const y = by + (20 + w * 0.5 - by) * u - ((f * 0.4 + i * 9) % 40);
              return <circle key={i} cx={x} cy={y} r={2.5 + random(`rr${i}`) * 3.5} fill="#fff8e0" opacity={(0.35 + 0.6 * Math.abs(Math.sin(f / (6 + random(`rt${i}`) * 8) + i))) * Math.min(1, largo * 2)} />;
            })}
          </g>
        </g>
      );
    }
    // ---------- Islas Flannan (Escocia, 1900) ----------
    case "faro-blanco":
    case "faro-apagado":
      // torre blanca sin franjas con la casa baja de piedra clara, el muro del patio y la verja.
      // "faro-apagado": la linterna oscura, nunca encendida
      return <FaroBlanco f={f} noche={noche} luz={tipo === "faro-blanco"} />;
    case "isla-faro":
    case "isla-faro-apagada": {
      // Eilean Mòr vista desde el mar (plano MEDIO, sobre el agua): acantilados oscuros, cima verde y el faro arriba
      const luz = tipo === "isla-faro";
      const roca = noche ? "#262628" : "#3e3c3a";
      const roca2 = noche ? "#1d1d20" : "#312f2e";
      const verde = noche ? "#3a4a30" : "#6f8f4a";
      const borde: [number, number][] = [[-640, 0], [-655, -70], [-622, -120], [-640, -175], [-598, -240], [-540, -272], [-470, -282], [-400, -306], [-300, -318], [-190, -342], [-80, -360], [40, -374], [150, -378], [260, -366], [360, -346], [440, -318], [500, -300], [548, -262], [585, -205], [570, -150], [604, -96], [592, -40], [618, 0]];
      const linea = borde.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");
      const arriba = borde.slice(1, -1);
      const grosor = (i: number) => 8 + 52 * Math.sin((Math.PI * i) / (arriba.length - 1));
      const abajo = arriba.map(([x, y], i) => [x, y + grosor(i)] as [number, number]).reverse();
      const cima = `M${arriba.map(([x, y]) => `${x} ${y}`).join(" L")} L${abajo.map(([x, y]) => `${x} ${y}`).join(" L")}Z`;
      const labio = `M${abajo.map(([x, y]) => `${x} ${y}`).join(" L")} L${arriba.map(([x, y], i) => `${x} ${y + grosor(i) + 14}`).join(" L")}Z`;
      return (
        <g>
          {/* dos islotes de los Siete Cazadores a los lados */}
          <path d="M-960 0 L-930 -90 L-880 -120 L-830 -100 L-805 0Z" fill={roca2} />
          <path d="M-930 -90 L-880 -120 L-830 -100 L-880 -108Z" fill={verde} />
          <path d="M790 0 L810 -60 L860 -78 L900 -52 L915 0Z" fill={roca2} />
          <path d={`${linea} Z`} fill={roca} />
          {/* cara del acantilado: grietas verticales, repisas y la cara en sombra */}
          <path d="M300 -352 L440 -318 L500 -300 L548 -262 L585 -205 L570 -150 L604 -96 L592 -40 L618 0 L330 0 L360 -120 L300 -230Z" fill={roca2} opacity={0.8} />
          <path d="M-640 0 L-655 -70 L-622 -120 L-640 -175 L-598 -240 L-540 -272 L-520 -200 L-560 -120 L-540 0Z" fill="#fff" opacity={0.06} />
          {/* contrafuertes y grietas verticales */}
          {Array.from({ length: 13 }).map((_, i) => {
            const x = -580 + i * 92 + random(`if${i}`) * 30;
            const alto = 180 + random(`ih${i}`) * 110;
            return <path key={i} d={`M${x} -6 L${x + 14 - random(`ig${i}`) * 28} ${-alto * 0.5} L${x + 6} ${-alto}`} stroke="#000" strokeOpacity={0.28} strokeWidth={7} fill="none" />;
          })}
          {/* estratos y repisas con guano */}
          {[[-560, -210, 230], [-300, -250, 280], [80, -270, 220], [-480, -120, 300], [-60, -150, 260], [240, -110, 200], [-260, -60, 240]].map(([x, y, w], i) => (
            <g key={i}>
              <path d={`M${x} ${y} q${w / 2} ${-10 + (i % 2) * 18} ${w} 0`} stroke="#000" strokeOpacity={0.25} strokeWidth={5} fill="none" />
              <path d={`M${x + 10} ${y - 5} q${w / 2} ${-10 + (i % 2) * 18} ${w - 20} 0`} stroke="#e8e4da" strokeOpacity={noche ? 0.1 : 0.22} strokeWidth={4} fill="none" />
            </g>
          ))}
          {/* la grieta del embarcadero */}
          <path d="M-380 0 L-360 -150 L-330 -230 L-300 -150 L-300 0Z" fill="#000" opacity={0.35} />
          {/* cima de hierba: más gruesa en el centro, se afila hacia los bordes del acantilado */}
          <path d={cima} fill={verde} />
          <path d={labio} fill="#000" opacity={0.18} />
          {/* el faro arriba, pequeño, sobre un lomo de hierba */}
          <ellipse cx={150} cy={-368} rx={240} ry={20} fill={verde} />
          <g transform="translate(110 -372) scale(0.34)">
            <FaroBlanco f={f} noche={noche} luz={luz} haz={5200} />
          </g>
          {/* espuma al pie */}
          {Array.from({ length: 9 }).map((_, i) => {
            const t = (f / 40 + i * 0.37) % 1;
            return <ellipse key={i} cx={-640 + i * 158} cy={-4} rx={60 + t * 50} ry={10 + t * 6} fill="#fff" opacity={0.55 * (1 - t)} />;
          })}
          <rect x={-670} y={-6} width={1300} height={10} rx={5} fill="#e8eef2" opacity={0.45 + 0.15 * Math.sin(f / 9)} />
        </g>
      );
    }
    case "embarcadero":
    case "embarcadero-roto": {
      // embarcadero oeste: grieta en la roca con escalones de hormigón que bajan al mar, grúa de hierro en una
      // plataforma con barandilla, la caja de los cabos y la vía del tranvía. "-roto": barandillas retorcidas,
      // cabos esparcidos y la caja arrancada; la grúa sigue en pie. La grieta queda algo a la derecha (x ≈ +0.3).
      const roto = tipo === "embarcadero-roto";
      const roca = noche ? "#2a2928" : "#454240";
      const roca2 = noche ? "#211f1e" : "#383533";
      const verde = noche ? "#3a4a30" : "#6d8a48";
      const hormigon = noche ? "#8a877f" : "#bdb8ac";
      const hierro = "#24262a";
      const cabo = "#c8b27a";
      const vaiven = Math.sin(f / 18) * 4;
      return (
        <g>
          {/* fondo de la grieta: el mar que sube y baja */}
          <path d="M60 -180 L350 -180 L350 -95 L60 -95Z" fill={noche ? "#1a2a38" : "#4f6f80"} />
          {[0, 1, 2].map((i) => {
            const t = (f / 50 + i / 3) % 1;
            return <ellipse key={i} cx={205 + Math.sin(i * 2.1) * 50} cy={-120 + t * 12} rx={70 + t * 40} ry={8} fill="#fff" opacity={0.6 * (1 - t)} />;
          })}
          {/* escalones de hormigón que bajan hacia el agua (más estrechos cuanto más lejos) */}
          <path d="M-40 0 L370 0 L260 -112 L140 -112Z" fill={hormigon} />
          {Array.from({ length: 10 }).map((_, i) => {
            const t = Math.pow(i / 10, 0.8);
            const y = -t * 112;
            const x0 = -40 + t * 180;
            const x1 = 370 - t * 110;
            return <rect key={i} x={x0} y={y - 4} width={x1 - x0} height={5 + (1 - t) * 6} fill="#000" opacity={0.18} />;
          })}
          {/* pared izquierda de la grieta, con la plataforma de la grúa */}
          <path d="M-860 0 L-860 -390 L-700 -440 L-540 -400 L-430 -330 L-60 -318 L40 -230 L90 -150 L40 -60 L-40 0Z" fill={roca} />
          <path d="M-60 -318 L40 -230 L90 -150 L40 -60 L-40 0 L-120 0 L-20 -150Z" fill={roca2} />
          <path d="M-860 -390 L-700 -440 L-540 -400 L-470 -360 L-560 -380 L-700 -418 L-860 -372Z" fill={verde} />
          {/* pared derecha */}
          <path d="M860 0 L860 -370 L700 -420 L540 -380 L420 -300 L330 -200 L300 -120 L340 -50 L370 0Z" fill={roca} />
          <path d="M420 -300 L330 -200 L300 -120 L340 -50 L370 0 L460 0 L380 -160Z" fill={roca2} />
          <path d="M860 -370 L700 -420 L540 -380 L470 -340 L560 -362 L700 -400 L860 -352Z" fill={verde} />
          {Array.from({ length: 10 }).map((_, i) => {
            const x = i < 5 ? -800 + i * 140 : 480 + (i - 5) * 80;
            return <path key={i} d={`M${x} -20 L${x + 16} ${-120 - random(`eg${i}`) * 160}`} stroke="#000" strokeOpacity={0.2} strokeWidth={6} />;
          })}
          {/* vía del tranvía que sube a la plataforma */}
          <g stroke={hierro} strokeWidth={7}>
            <line x1={-760} y1={0} x2={-400} y2={-318} />
            <line x1={-640} y1={0} x2={-360} y2={-318} />
          </g>
          {Array.from({ length: 9 }).map((_, i) => {
            const t = i / 9;
            return <line key={i} x1={-776 + t * 380} y1={-t * 318} x2={-620 + t * 268} y2={-t * 318} stroke="#5a4632" strokeWidth={10} />;
          })}
          {/* plataforma de hormigón */}
          <path d="M-430 -330 L-50 -330 L-50 -300 L-430 -300Z" fill={hormigon} />
          <rect x={-430} y={-300} width={380} height={14} fill="#000" opacity={0.2} />
          {/* grúa de hierro: mástil, pluma sobre la grieta, tirante y gancho */}
          <g>
            <rect x={-270} y={-360} width={60} height={30} fill={hierro} />
            <rect x={-252} y={-640} width={24} height={290} fill={hierro} />
            <path d="M-240 -360 L60 -560" stroke={hierro} strokeWidth={18} strokeLinecap="round" />
            <path d="M-240 -640 L60 -560" stroke={hierro} strokeWidth={5} />
            <path d="M-240 -640 L-400 -332" stroke={hierro} strokeWidth={5} />
            <circle cx={-240} cy={-400} r={18} fill="#3a3c40" stroke={hierro} strokeWidth={5} />
            <g transform={`rotate(${vaiven} 60 -560)`}>
              <line x1={60} y1={-560} x2={60} y2={-400} stroke="#3a3c40" strokeWidth={4} />
              <path d="M60 -400 q0 18 -14 18 q-12 0 -12 -12" stroke={hierro} strokeWidth={6} fill="none" />
            </g>
          </g>
          {/* barandillas de la plataforma */}
          {!roto ? (
            <g stroke={hierro} strokeWidth={6}>
              {[-420, -340, -150, -60].map((x) => <line key={x} x1={x} y1={-330} x2={x} y2={-400} />)}
              <line x1={-420} y1={-398} x2={-60} y2={-398} />
              <line x1={-420} y1={-366} x2={-60} y2={-366} />
            </g>
          ) : (
            <g stroke={hierro} strokeWidth={6} fill="none" strokeLinecap="round">
              <line x1={-420} y1={-330} x2={-420} y2={-400} />
              <path d="M-420 -398 Q-380 -400 -350 -380 Q-310 -350 -290 -392 Q-250 -440 -200 -410" />
              <path d="M-420 -366 Q-370 -350 -340 -330" />
              <line x1={-340} y1={-330} x2={-310} y2={-392} />
              <path d="M-150 -330 Q-140 -360 -100 -372 Q-60 -380 -40 -352" />
              <path d="M-60 -330 Q-40 -300 10 -290 Q50 -284 60 -250" />
              <path d="M-120 -398 Q-90 -420 -70 -410" />
            </g>
          )}
          {/* la caja de los cabos y los cabos: en su sitio, o esparcidos por las rocas */}
          {!roto ? (
            <g>
              <rect x={-410} y={-372} width={84} height={42} fill="#7a5a38" stroke="#4a3426" strokeWidth={4} />
              <rect x={-414} y={-378} width={92} height={10} fill="#5a4028" />
              <g stroke={cabo} strokeWidth={6} fill="none">
                {[0, 1, 2].map((i) => <ellipse key={i} cx={-130} cy={-340 + i * 3} rx={34 - i * 8} ry={9 - i * 2} />)}
              </g>
            </g>
          ) : (
            <g>
              {[[-400, -334, 12], [-360, -336, -20], [-318, -333, 34]].map(([x, y, r], i) => (
                <rect key={i} x={x} y={y} width={30} height={7} fill="#6a4c30" transform={`rotate(${r} ${x} ${y})`} />
              ))}
              <g stroke={cabo} strokeWidth={6} fill="none" strokeLinecap="round">
                <path d="M-200 -330 Q-160 -300 -120 -318 Q-60 -330 -20 -260 Q20 -200 70 -170" />
                <path d="M-700 -60 Q-640 -110 -600 -80 Q-560 -50 -520 -110" />
                <path d="M520 -290 Q560 -250 600 -280 Q650 -310 700 -260" />
                <path d="M380 -40 Q420 -80 460 -60" />
              </g>
              {/* tepes de hierba arrancados */}
              {[[-560, -386], [610, -375], [-680, -420]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx={26} ry={10} fill="#4a3a28" />)}
            </g>
          )}
        </g>
      );
    }
    case "ola": {
      // ola enorme que sube por la grieta: lengua de agua verde con cresta de espuma blanca y rociones.
      // Con "embarcadero", ponla en x ≈ 0.3 (sobre la grieta). Rompe cada ~5 s.
      const T = 150;
      const t = (f % T) / T;
      const sube = t < 0.4 ? Math.sin((t / 0.4) * (Math.PI / 2)) : 1 - 0.75 * ((t - 0.4) / 0.6);
      const h = 140 + sube * 440;
      const agua = noche ? "#1f4a4c" : "#2f7570";
      const agua2 = noche ? "#2d6266" : "#4f9d92";
      const espuma = "#ffffff";
      const espuma2 = noche ? "#b7cad3" : "#d8ece8";
      const cur = Math.sin(f / 14) * 12;
      return (
        <g>
          {/* lengua de agua verde que sube por la grieta y se curva en la cresta */}
          <path d={`M-240 0 Q-200 ${-h * 0.45} -120 ${-h * 0.85} Q-40 ${-h * 1.08 + cur} 60 ${-h * 1.02} Q150 ${-h * 0.95} 175 ${-h * 0.8} Q120 ${-h * 0.82} 95 ${-h * 0.7} Q170 ${-h * 0.4} 250 0Z`} fill={agua} />
          <path d={`M-170 0 Q-140 ${-h * 0.4} -80 ${-h * 0.78} Q-20 ${-h * 0.95 + cur} 50 ${-h * 0.9} Q10 ${-h * 0.6} 40 0Z`} fill={agua2} opacity={0.75} />
          {Array.from({ length: 7 }).map((_, i) => {
            const x = -170 + i * 55;
            return <path key={`v${i}`} d={`M${x} -10 Q${x * 0.7} ${-h * 0.45} ${x * 0.4} ${-h * 0.82}`} stroke={espuma2} strokeWidth={4 + (i % 3) * 2} fill="none" opacity={0.35} strokeLinecap="round" />;
          })}
          {/* cresta de espuma blanca */}
          {Array.from({ length: 16 }).map((_, i) => {
            const v = i / 15;
            const cx = -130 + v * 300 + Math.sin(f / 7 + i) * 5;
            const cy = -h * (0.86 + Math.sin(v * Math.PI) * 0.2) + cur * Math.sin(v * Math.PI) - random(`ola-y2${i}`) * 18;
            const r = 16 + random(`ola-r${i}`) * 20;
            return (
              <g key={i}>
                <circle cx={cx} cy={cy} r={r} fill={espuma2} />
                <circle cx={cx - r * 0.18} cy={cy - r * 0.2} r={r * 0.75} fill={espuma} />
              </g>
            );
          })}
          {/* espuma al pie de la grieta */}
          <path d={`M-260 0 Q-180 -30 -100 -8 Q0 -34 100 -8 Q180 -30 270 0Z`} fill={espuma} opacity={0.85} />
          {/* rociones que salen disparados */}
          {Array.from({ length: 18 }).map((_, i) => {
            const a = -Math.PI / 2 + (random(`ola-a${i}`) - 0.5) * 2.2;
            const d = (40 + random(`ola-d${i}`) * 90) * sube;
            const x0 = Math.cos(a) * 60;
            const y0 = -h + Math.sin(a) * 40;
            return <line key={`s${i}`} x1={x0} y1={y0} x2={x0 + Math.cos(a) * d} y2={y0 + Math.sin(a) * d} stroke={espuma} strokeWidth={6 + random(`ola-w${i}`) * 6} strokeLinecap="round" opacity={0.75 * sube} />;
          })}
          {Array.from({ length: 30 }).map((_, i) => {
            const x = (random(`ola-x${i}`) - 0.5) * 640 * (0.3 + sube);
            const y = -h - random(`ola-y${i}`) * 220 * sube + Math.sin(f / 4 + i) * 6;
            return <circle key={`g${i}`} cx={x} cy={y} r={4 + random(`ola-g${i}`) * 8} fill={espuma} opacity={0.75 * sube} />;
          })}
          {/* hervidero de espuma al pie */}
          {Array.from({ length: 9 }).map((_, i) => (
            <ellipse key={`b${i}`} cx={-220 + i * 55} cy={-10 - (i % 2) * 14} rx={50} ry={22} fill={i % 2 ? espuma : espuma2} />
          ))}
        </g>
      );
    }
    case "bengala": {
      // cohete de señales: sube con estela de humo (primer 30 % de la escena) y estalla en estrellas que caen
      const p = Math.min(1, f / Math.max(1, dur));
      const subida = Math.min(1, p / 0.3);
      const k = 1 - Math.pow(1 - subida, 2);
      const cx = 90 * k;
      const cy = -60 - 700 * k;
      const estalla = p >= 0.3;
      const q = estalla ? (p - 0.3) / 0.7 : 0;
      return (
        <g>
          <path d={`M0 -60 Q${40 * k} ${-60 - 420 * k} ${cx} ${cy}`} stroke="#d9d6cf" strokeWidth={10 + 14 * k} fill="none" strokeLinecap="round" opacity={0.55 * (1 - q * 0.85)} />
          {!estalla && (
            <g transform={`translate(${cx} ${cy})`}>
              <Brillo r={60} o={0.8} color="#ffcf6a" />
              <circle r={10} fill="#fff6d0" />
            </g>
          )}
          {estalla && (
            <g transform={`translate(${cx} ${cy})`}>
              {q < 0.12 && <circle r={260} fill="#fff6d8" opacity={0.5 * (1 - q / 0.12)} />}
              <Brillo r={240 * (1 - q * 0.5)} o={0.6 * (1 - q)} color="#ff6a4a" />
              {Array.from({ length: 16 }).map((_, i) => {
                const a = (i / 16) * Math.PI * 2;
                const r = 60 + 220 * Math.sqrt(q);
                const x = Math.cos(a) * r;
                const y = Math.sin(a) * r * 0.8 + 260 * q * q;
                return (
                  <g key={i} opacity={Math.max(0, 1 - q * 1.1)}>
                    <line x1={x * 0.6} y1={y * 0.6 - 20 * q} x2={x} y2={y} stroke={i % 2 ? "#ffd27a" : "#ff7a5a"} strokeWidth={4} />
                    <circle cx={x} cy={y} r={9} fill={i % 2 ? "#fff3c0" : "#ff8a6a"} />
                  </g>
                );
              })}
              <circle cy={300 * q * q} r={16 * (1 - q * 0.6)} fill="#ff3a2a" opacity={1 - q * 0.7} />
            </g>
          )}
        </g>
      );
    }
    case "lampara-faro": {
      // lente de Fresnel de latón y cristal sobre su pedestal; gira despacio y de noche brilla la lámpara
      const laton = "#b8893a";
      const laton2 = "#8a6428";
      const cristal = noche ? "#fff1c0" : "#cfe4ea";
      const paneles = Array.from({ length: 6 }).map((_, i) => {
        const a = f * 0.012 + (i / 6) * Math.PI * 2;
        return { x: Math.sin(a) * 120, w: Math.cos(a), i };
      }).filter((p) => p.w > 0.05);
      return (
        <g>
          {/* pedestal de hierro con remates de latón */}
          <path d="M-130 0 L130 0 L110 -40 L-110 -40Z" fill="#2e3136" />
          <rect x={-46} y={-260} width={92} height={222} fill="#3a3e44" />
          <rect x={-46} y={-260} width={20} height={222} fill="#fff" opacity={0.08} />
          <rect x={-70} y={-160} width={140} height={14} fill={laton2} />
          <rect x={-150} y={-286} width={300} height={28} rx={6} fill={laton} />
          {noche && <Brillo cy={-470} r={460} o={0.55 + 0.05 * Math.sin(f / 5)} color="#ffe9a3" />}
          {/* tambor de cristal */}
          <path d="M-150 -290 L150 -290 Q178 -470 150 -650 L-150 -650 Q-178 -470 -150 -290Z" fill={cristal} opacity={0.92} />
          {/* anillos de prismas de arriba y de abajo */}
          {Array.from({ length: 7 }).map((_, i) => (
            <path key={`a${i}`} d={`M-152 ${-300 - i * 14} Q0 ${-292 - i * 14} 152 ${-300 - i * 14}`} stroke={laton} strokeWidth={4} fill="none" opacity={0.9} />
          ))}
          {Array.from({ length: 7 }).map((_, i) => (
            <path key={`b${i}`} d={`M-152 ${-640 + i * 14} Q0 ${-648 + i * 14} 152 ${-640 + i * 14}`} stroke={laton} strokeWidth={4} fill="none" opacity={0.9} />
          ))}
          {/* paneles de ojo de buey que giran */}
          {paneles.map((p) => (
            <g key={p.i} transform={`translate(${p.x} -470) scale(${p.w} 1)`}>
              {[0, 1, 2, 3].map((r) => <ellipse key={r} cx={0} cy={0} rx={18 + r * 18} ry={22 + r * 22} fill="none" stroke={noche ? "#e8c46a" : "#9fbcc6"} strokeWidth={5} />)}
              <circle r={12} fill={noche ? "#fffbe8" : "#e6f2f5"} />
            </g>
          ))}
          {/* montantes de latón y brillo del cristal */}
          {[-150, -75, 0, 75, 150].map((x) => <line key={x} x1={x} y1={-290} x2={x} y2={-650} stroke={laton2} strokeWidth={x === -150 || x === 150 ? 10 : 4} opacity={0.85} />)}
          <rect x={-120} y={-640} width={18} height={340} fill="#fff" opacity={0.35} />
          {/* remate */}
          <rect x={-160} y={-668} width={320} height={22} rx={6} fill={laton} />
          <path d="M-130 -668 Q0 -730 130 -668Z" fill={laton2} />
          <circle cx={0} cy={-722} r={14} fill={laton} />
        </g>
      );
    }
    case "chimenea-apagada":
      // hogar frío: sin fuego ni brillo, troncos carbonizados y ceniza gris
      return (
        <g>
          <rect x={-240} y={-420} width={480} height={420} fill="#8a8178" />
          <rect x={-280} y={-450} width={560} height={40} fill="#6b635b" />
          <path d="M-140 0 L-140 -200 Q0 -300 140 -200 L140 0Z" fill="#1b1512" />
          <path d="M-120 0 Q-60 -40 0 -36 Q70 -40 120 0Z" fill="#7d7a76" />
          <rect x={-90} y={-46} width={150} height={22} rx={10} fill="#2a2420" transform="rotate(-8 -15 -35)" />
          <rect x={-50} y={-40} width={140} height={20} rx={10} fill="#332b26" transform="rotate(10 20 -30)" />
          {Array.from({ length: 10 }).map((_, i) => <circle key={i} cx={-100 + i * 22} cy={-8 - (i % 3) * 6} r={5} fill="#a19d98" />)}
        </g>
      );
    case "perchero":
      // tabla de pared con tres ganchos: dos vacíos y en el tercero un impermeable de hule oscuro
      return (
        <g>
          <rect x={-170} y={-600} width={340} height={40} rx={6} fill="#6b4a32" />
          <rect x={-170} y={-600} width={340} height={8} fill="#fff" opacity={0.12} />
          {[-110, 0, 110].map((x) => (
            <path key={x} d={`M${x} -578 L${x} -545 q0 14 14 14`} stroke="#2a2a2a" strokeWidth={9} fill="none" strokeLinecap="round" />
          ))}
          <g transform={`translate(110 -548) rotate(${Math.sin(f / 40) * 0.6})`}>
            <path d="M-8 0 L-80 30 L-110 120 L-118 360 L-60 372 L0 360 L60 372 L118 360 L110 120 L80 30 L8 0Z" fill="#2b3127" />
            <path d="M-80 30 L-128 90 L-150 250 L-118 260 L-110 120Z" fill="#232821" />
            <path d="M-8 0 L-20 50 L0 360 L18 50 L8 0Z" fill="#1c201a" />
            <path d="M-60 60 Q-70 200 -50 340" stroke="#8a9a80" strokeWidth={6} fill="none" opacity={0.35} />
            <path d="M50 70 Q66 180 70 300" stroke="#8a9a80" strokeWidth={5} fill="none" opacity={0.25} />
          </g>
        </g>
      );
    case "pizarra": {
      // pizarra de pared con marco de madera y apuntes a tiza
      const tiza = "#e9e6dc";
      return (
        <g>
          <rect x={-200} y={-720} width={400} height={290} rx={6} fill="#6b4a32" />
          <rect x={-182} y={-702} width={364} height={254} fill="#2e3433" />
          <rect x={-182} y={-702} width={364} height={254} fill="#fff" opacity={0.04} />
          <g stroke={tiza} strokeWidth={4} fill="none" strokeLinecap="round" opacity={0.85}>
            {Array.from({ length: 6 }).map((_, r) => {
              const y = -670 + r * 38;
              const n = 4 + ((r * 3) % 4);
              let d = `M${-160} ${y}`;
              for (let i = 0; i < n * 6; i++) d += ` q5 ${i % 2 ? 9 : -9} 10 0`;
              return <path key={r} d={d} />;
            })}
          </g>
          <rect x={-200} y={-436} width={400} height={14} fill="#5a3d28" />
          <rect x={60} y={-446} width={36} height={10} rx={4} fill={tiza} />
          <rect x={-140} y={-448} width={60} height={12} rx={3} fill="#3a2a1e" />
        </g>
      );
    }
    case "capilla":
      // capilla en ruinas de San Flannan: muros de piedra seca sin techo, puerta baja y hierba encima
      return (
        <g>
          <path d="M-200 0 L-200 -200 L-170 -214 L-120 -206 L-60 -224 L0 -300 L60 -228 L130 -210 L200 -196 L200 0Z" fill="#8a847a" />
          <path d="M60 -228 L130 -210 L200 -196 L200 0 L80 0Z" fill="#000" opacity={0.12} />
          {Array.from({ length: 30 }).map((_, i) => {
            const fila = Math.floor(i / 6);
            const x = -190 + (i % 6) * 64 + (fila % 2) * 30;
            const y = -30 - fila * 38;
            return <rect key={i} x={x} y={y} width={54} height={28} rx={8} fill={oscurecer("#8a847a", 0.06 + random(`cp${i}`) * 0.18)} />;
          })}
          <path d="M-40 0 L-40 -120 Q0 -150 40 -120 L40 0Z" fill="#1d1a16" />
          <rect x={-56} y={-134} width={112} height={18} fill="#9a958c" />
          {[[-180, -210], [-90, -216], [100, -218], [170, -202], [0, -298]].map(([x, y], i) => (
            <path key={i} d={`M${x - 24} ${y + 6} q8 -26 16 -4 q6 -24 14 -2 q8 -20 14 4Z`} fill="#5f7d40" />
          ))}
        </g>
      );
    // ---------- Terremoto de Mesina (1908) ----------
    case "escombros": {
      // ruinas de una ciudad de piedra: fachada enlucida partida con su ventana, muro gris caído, vigas,
      // tejas y un montón de cascotes, con polvo que sube. (`ruinas` es una casa de madera)
      const k = noche ? 0.4 : 0;
      const enlucido = oscurecer("#d6b88c", k);
      const piedra = oscurecer("#9a9286", k);
      const cascote = ["#b3a690", "#9c907c", "#c4b59a", "#8a8070"].map((c) => oscurecer(c, k));
      const viga = oscurecer("#6a4e34", k);
      const teja = oscurecer("#a8553a", k);
      return (
        <g>
          {/* fachada partida, con la piedra a la vista donde cayó el enlucido */}
          <path d="M-330 0 L-330 -430 L-270 -470 L-210 -420 L-170 -450 L-110 -360 L-60 -300 L-20 -220 L-10 0Z" fill={enlucido} />
          <path d="M-320 -300 L-260 -320 L-230 -260 L-290 -230Z" fill={piedra} />
          <path d="M-150 -330 L-90 -320 L-70 -260 L-130 -250Z" fill={piedra} />
          <rect x={-270} y={-380} width={90} height={150} fill="#1d1a18" />
          <rect x={-280} y={-390} width={110} height={14} fill={oscurecer(enlucido, 0.15)} />
          <path d="M-270 -230 L-180 -230" stroke="#2a2420" strokeWidth={6} />
          {/* restos de balcón de hierro */}
          <g stroke="#2a2a2a" strokeWidth={5} fill="none">
            <path d="M-290 -230 L-150 -222 L-130 -190" />
            {[-280, -255, -230, -205, -180].map((x, i) => <line key={x} x1={x} y1={-229} x2={x + (i - 2) * 6} y2={-190} />)}
          </g>
          <path d="M-330 -430 L-330 0 L-310 0 L-310 -440Z" fill="#000" opacity={0.15} />
          {/* muro gris caído a la derecha */}
          <path d="M60 0 L90 -260 L150 -300 L200 -230 L250 -250 L300 -120 L320 0Z" fill={piedra} />
          {Array.from({ length: 12 }).map((_, i) => (
            <rect key={i} x={90 + (i % 4) * 52 + (Math.floor(i / 4) % 2) * 20} y={-60 - Math.floor(i / 4) * 60} width={44} height={26} rx={5} fill={oscurecer(piedra, 0.08 + random(`es${i}`) * 0.12)} />
          ))}
          {/* vigas sueltas */}
          <rect x={-120} y={-200} width={330} height={22} fill={viga} transform="rotate(-24 -120 -200)" />
          <rect x={-40} y={-120} width={280} height={18} fill={oscurecer(viga, 0.15)} transform="rotate(18 -40 -120)" />
          <rect x={150} y={-280} width={200} height={16} fill={viga} transform="rotate(40 150 -280)" />
          {/* montón de cascotes, tejas y piedras */}
          <path d="M-380 0 Q-300 -120 -150 -130 Q0 -170 140 -110 Q280 -90 380 0Z" fill={cascote[1]} />
          {Array.from({ length: 34 }).map((_, i) => {
            const x = -340 + random(`ec${i}`) * 680;
            const alto = 120 * (1 - Math.pow(Math.abs(x) / 380, 2));
            const y = -random(`ed${i}`) * alto;
            const s = 14 + random(`ee${i}`) * 26;
            const r = random(`ef${i}`) * 90;
            return i % 6 === 0
              ? <path key={i} d={`M${x - s * 0.8} ${y} q${s * 0.8} ${-s * 0.6} ${s * 1.6} 0Z`} fill={teja} transform={`rotate(${r * 0.4 - 18} ${x} ${y})`} />
              : <rect key={i} x={x - s / 2} y={y - s / 2} width={s} height={s * 0.7} rx={4} fill={cascote[i % 4]} transform={`rotate(${r} ${x} ${y})`} />;
          })}
          {/* polvo que sube despacio */}
          {Array.from({ length: 7 }).map((_, i) => {
            const t = ((f * 0.6 + i * 60) % 420) / 420;
            return <circle key={`p${i}`} cx={-260 + i * 85 + Math.sin(f / 40 + i) * 20} cy={-80 - t * 420} r={60 + t * 90} fill={noche ? "#6a645c" : "#d8ccb4"} opacity={0.32 * (1 - t)} />;
          })}
        </g>
      );
    }
    // ---------- Pearl Harbor, 1941 ----------
    case "acorazado":
      return <g transform={`translate(0 ${Math.sin(f / 30) * 2})`}><Acorazado noche={noche} /><Estela f={f} ancho={1560} /></g>;
    case "destructor":
      return <g transform={`translate(0 ${Math.sin(f / 22) * 3})`}><Destructor noche={noche} /><Estela f={f} ancho={1080} /></g>;
    case "portaaviones":
      return <g transform={`translate(0 ${Math.sin(f / 34) * 2})`}><Portaaviones noche={noche} /><Estela f={f} ancho={1760} /></g>;
    case "submarino": {
      // sólo la torreta de un submarino enano que asoma del agua, con el periscopio y espuma alrededor
      const c = noche ? "#1c2024" : "#2f3439";
      const sube = Math.sin(f / 16) * 6;
      return (
        <g>
          <g transform={`translate(0 ${sube})`}>
            <path d="M-170 6 Q-60 -30 120 -20 Q170 -12 190 6Z" fill={c} />
            <path d="M-80 -18 L-62 -150 L50 -150 L80 -20Z" fill={c} />
            <rect x={-66} y={-162} width={118} height={16} rx={5} fill={oscurecer(c, -0.4)} />
            <rect x={-10} y={-260} width={10} height={104} fill={c} />
            <rect x={-10} y={-262} width={26} height={10} fill={c} />
          </g>
          {Array.from({ length: 6 }).map((_, i) => {
            const t = ((f / 30 + i / 6) % 1);
            return <ellipse key={i} cx={-200 + i * 80 - t * 60} cy={4} rx={40 + t * 50} ry={8 + t * 4} fill="#fff" opacity={0.6 * (1 - t)} />;
          })}
        </g>
      );
    }
    case "flyer":
    case "flyer-vuelo": {
      // biplano de los Wright (1903), visto de frente y algo desde arriba: alas de tela clara con costillas,
      // montantes, elevador doble delante, dos hélices detrás y el piloto tumbado en el ala de abajo.
      // "flyer": sobre el riel de madera; "flyer-vuelo": a poca altura, avanzando despacio y cabeceando.
      const vuela = tipo === "flyer-vuelo";
      const alto = vuela ? -480 - Math.sin(f / 22) * 18 : -70;
      const dx = vuela ? Math.sin(f / 60) * 40 : 0;
      const inc = vuela ? Math.sin(f / 17) * 2.2 : 0;
      const tela = noche ? "#9a9686" : "#ece4cc";
      const costilla = noche ? "#6b6658" : "#b9ad8c";
      const madera = noche ? "#4a3a28" : "#7a5a36";
      const ala = (y: number, k: string) => (
        <g key={k}>
          <path d={`M-800 ${y} Q0 ${y - 26} 800 ${y} L800 ${y + 22} Q0 ${y - 4} -800 ${y + 22}Z`} fill={tela} />
          {Array.from({ length: 33 }).map((_, i) => {
            const x = -790 + i * 49.4;
            const c = y - 26 * (1 - (x / 800) ** 2);
            return <line key={i} x1={x} y1={c + 2} x2={x} y2={c + 24} stroke={costilla} strokeWidth={3} />;
          })}
        </g>
      );
      const helice = (x: number, k: number) => {
        const a = Math.abs(Math.cos(f * (vuela ? 1.7 : 0.9) + k));
        return <ellipse key={x} cx={x} cy={-150} rx={18} ry={90 * a + 6} fill={madera} opacity={0.85} />;
      };
      return (
        <g>
          {!vuela && (
            <g>
              <rect x={-60} y={-18} width={120} height={18} fill={madera} />
              <rect x={-900} y={-8} width={1800} height={10} fill={oscurecer(madera, 0.2)} opacity={0.7} />
              <ellipse cx={0} cy={4} rx={900} ry={12} fill="#000" opacity={0.12} />
            </g>
          )}
          {vuela && <ellipse cx={dx} cy={4} rx={700} ry={22} fill="#000" opacity={0.1} />}
          <g transform={`translate(${dx} ${alto}) rotate(${inc})`}>
            {/* hélices detrás */}
            {helice(-330, 0)}
            {helice(330, 1)}
            {ala(-270, "a")}
            {/* montantes */}
            {Array.from({ length: 13 }).map((_, i) => {
              const x = -780 + i * 130;
              return <line key={i} x1={x} y1={-262 + 26 * (x / 800) ** 2 - 26} x2={x} y2={-4 + 26 * (x / 800) ** 2 - 26} stroke={madera} strokeWidth={6} />;
            })}
            <path d="M-780 -280 L-650 -26 M-650 -280 L-780 -26 M780 -280 L650 -26 M650 -280 L780 -26" stroke="#555" strokeWidth={2} />
            {ala(-4, "b")}
            {/* elevador doble delante (más bajo y pequeño) y patines */}
            <g transform="translate(0 70)">
              <path d="M-230 -40 Q0 -54 230 -40 L230 -30 Q0 -44 -230 -30Z" fill={tela} />
              <path d="M-230 20 Q0 6 230 20 L230 30 Q0 16 -230 30Z" fill={tela} />
              <line x1={-200} y1={-36} x2={-200} y2={24} stroke={madera} strokeWidth={5} />
              <line x1={200} y1={-36} x2={200} y2={24} stroke={madera} strokeWidth={5} />
            </g>
            <path d="M-120 0 L-150 90 M120 0 L150 90" stroke={madera} strokeWidth={8} />
            {/* motor y piloto tumbado */}
            <rect x={60} y={-60} width={90} height={50} rx={6} fill="#3a3a3a" />
            <g>
              <ellipse cx={-40} cy={-36} rx={70} ry={22} fill="#2a2a30" />
              <circle cx={-100} cy={-44} r={20} fill="#e0b494" />
              <path d="M-122 -56 Q-100 -74 -78 -56Z" fill="#2a2a30" />
            </g>
          </g>
        </g>
      );
    }
    case "cobertizo": {
      // cobertizo de tablas con tejado a dos aguas y puertas abatibles (campamento de Kill Devil Hills)
      const tabla = noche ? "#4a3e30" : "#9a8566";
      return (
        <g>
          <path d="M-420 0 L-420 -330 L0 -470 L420 -330 L420 0Z" fill={tabla} />
          {Array.from({ length: 15 }).map((_, i) => <rect key={i} x={-420 + i * 56} y={-470} width={4} height={470} fill="#00000026" />)}
          <path d="M-450 -322 L0 -486 L450 -322" stroke={oscurecer(tabla, 0.4)} strokeWidth={26} fill="none" />
          <rect x={-250} y={-280} width={500} height={280} fill={oscurecer(tabla, 0.45)} />
          <path d="M-250 -280 L-330 -330 L-330 -20 L-250 0Z M250 -280 L330 -330 L330 -20 L250 0Z" fill={oscurecer(tabla, 0.15)} />
          <rect x={300} y={-260} width={70} height={60} fill={noche ? "#ffd27a" : "#2a2a2a"} opacity={0.8} />
        </g>
      );
    }
    case "autobus": {
      // autobús rojo de dos pisos de los años cincuenta, genérico (sin logotipos), de perfil hacia la derecha
      const rojo = noche ? "#6a1a1a" : "#b3241e";
      const cristal = noche ? "#3a4048" : "#9fb4c4";
      const luz = noche ? "#ffe9a8" : "#f4efe0";
      return (
        <g>
          <path d="M-560 -60 L-560 -880 Q-560 -930 -510 -930 L470 -930 Q560 -930 560 -840 L560 -60Z" fill={rojo} />
          <rect x={-560} y={-520} width={1120} height={34} fill="#efe6cf" />
          {/* ventanas de los dos pisos */}
          {[-850, -450].map((y) => Array.from({ length: 6 }).map((_, i) => (
            <rect key={`${y}${i}`} x={-520 + i * 168} y={y} width={146} height={120} rx={10} fill={cristal} opacity={0.9} />
          )))}
          {/* cabina del conductor y plataforma trasera abierta */}
          <rect x={410} y={-460} width={130} height={150} rx={10} fill={cristal} />
          <rect x={-560} y={-470} width={120} height={410} fill="#1c1c1c" opacity={0.75} />
          <line x1={-500} y1={-470} x2={-500} y2={-60} stroke="#c9ccd0" strokeWidth={8} />
          <rect x={-420} y={-910} width={260} height={50} rx={6} fill="#1a1a1a" />
          {/* ruedas */}
          {[-330, 360].map((x) => (
            <g key={x}><circle cx={x} cy={-60} r={78} fill="#141414" /><circle cx={x} cy={-60} r={38} fill="#8a8a8a" /></g>
          ))}
          <rect x={-560} y={-110} width={1120} height={20} fill={oscurecer(rojo, 0.35)} />
          {/* faros: con niebla o de noche, dos conos de luz */}
          <circle cx={545} cy={-150} r={22} fill={luz} />
          {noche && <path d="M560 -150 L1150 -260 L1150 -40Z" fill={luz} opacity={0.18} />}
        </g>
      );
    }
    case "central": {
      // central eléctrica de carbón LEJANA: nave de ladrillo con chimeneas altas que echan humo (genérica)
      const ladrillo = noche ? "#3a2c26" : "#7a5a4a";
      return (
        <g opacity={0.9}>
          <rect x={-420} y={-520} width={840} height={520} fill={ladrillo} />
          {Array.from({ length: 9 }).map((_, i) => <rect key={i} x={-380 + i * 90} y={-470} width={30} height={380} fill={oscurecer(ladrillo, 0.3)} />)}
          {[-380, 380].map((x) => (
            <g key={x}>
              <path d={`M${x - 46} -520 L${x - 34} -1180 L${x + 34} -1180 L${x + 46} -520Z`} fill={oscurecer(ladrillo, -0.15)} />
              {Array.from({ length: 6 }).map((_, k) => {
                const t = ((f / 90 + k / 6) % 1);
                return <circle key={k} cx={x + t * 260} cy={-1200 - t * 380} r={50 + t * 150} fill={noche ? "#4a4a4a" : "#7a7468"} opacity={0.55 * (1 - t)} />;
              })}
            </g>
          ))}
        </g>
      );
    }
    case "casa-larga": {
      // casa larga nórdica de madera con tejado curvo de turba nevado, humo por el agujero del techo y puerta con luz
      const madera = noche ? "#3a2a1c" : "#6b4a2a";
      return (
        <g>
          <path d="M-640 0 L-610 -300 Q0 -360 610 -300 L640 0Z" fill={madera} />
          {Array.from({ length: 20 }).map((_, i) => <rect key={i} x={-620 + i * 64} y={-320} width={6} height={320} fill="#00000030" />)}
          <path d="M-700 -280 Q-640 -560 0 -600 Q640 -560 700 -280 Q0 -330 -700 -280Z" fill={noche ? "#2a3226" : "#4f5f36"} />
          <path d="M-700 -284 Q-640 -560 0 -600 Q640 -560 700 -284 Q620 -470 0 -520 Q-620 -470 -700 -284Z" fill="#f2f4f6" opacity={0.92} />
          <rect x={-90} y={-230} width={180} height={230} rx={10} fill="#1a120c" />
          <rect x={-70} y={-210} width={140} height={210} fill="#ff9a3c" opacity={0.35 + 0.12 * Math.sin(f / 5)} />
          <Brillo r={260} o={noche ? 0.35 : 0.12} cy={-100} />
          {Array.from({ length: 6 }).map((_, k) => {
            const t = ((f / 120 + k / 6) % 1);
            return <circle key={k} cx={120 + t * 160} cy={-620 - t * 420} r={30 + t * 90} fill="#cfd2d6" opacity={0.45 * (1 - t)} />;
          })}
        </g>
      );
    }
    case "camion": {
      // camión militar de carga de los años cuarenta, verde oliva con lona, sin insignias, de perfil hacia la derecha
      const oliva = noche ? "#2f3324" : "#5a6038";
      const lona = noche ? "#3a3e2c" : "#7a7c54";
      return (
        <g>
          <path d="M-560 -170 L-560 -560 Q-560 -600 -520 -600 L120 -600 Q150 -600 150 -560 L150 -170Z" fill={lona} />
          {[-420, -220, -20].map((x) => <path key={x} d={`M${x} -600 Q${x + 10} -380 ${x} -170`} stroke={oscurecer(lona, 0.25)} strokeWidth={8} fill="none" />)}
          <rect x={-580} y={-190} width={760} height={40} fill={oliva} />
          <path d="M170 -170 L170 -430 L360 -430 L420 -300 L520 -280 L520 -170Z" fill={oliva} />
          <path d="M200 -410 L340 -410 L390 -310 L200 -310Z" fill={noche ? "#2a3038" : "#9fb4c4"} opacity={0.85} />
          {[-430, -260, 380].map((x) => (
            <g key={x}><circle cx={x} cy={-90} r={80} fill="#151515" /><circle cx={x} cy={-90} r={34} fill={oscurecer(oliva, 0.2)} /></g>
          ))}
          <rect x={500} y={-260} width={30} height={60} fill="#222" />
        </g>
      );
    }
    case "tanque": {
      // carro de combate de la Segunda Guerra Mundial, verde oliva, sin insignias, de perfil hacia la derecha
      const oliva = noche ? "#2c3022" : "#56603a";
      return (
        <g>
          <path d="M-560 -40 Q-600 -110 -540 -170 L540 -170 Q600 -110 560 -40 Q520 0 460 0 L-460 0 Q-520 0 -560 -40Z" fill="#2a2a26" />
          {Array.from({ length: 8 }).map((_, i) => <circle key={i} cx={-430 + i * 123} cy={-80} r={52} fill="#3a3a34" stroke="#1c1c1a" strokeWidth={6} />)}
          <path d="M-520 -170 L-470 -330 L470 -330 L540 -170Z" fill={oliva} />
          <path d="M-280 -330 Q-260 -520 -40 -530 Q160 -520 200 -330Z" fill={oscurecer(oliva, -0.08)} />
          <rect x={180} y={-460} width={560} height={40} rx={14} fill={oscurecer(oliva, 0.15)} />
          <rect x={-140} y={-580} width={110} height={56} rx={10} fill={oscurecer(oliva, 0.2)} />
        </g>
      );
    }
    case "paracaidas-carga": {
      // paracaídas de colores que bajan del cielo con fardos de suministros colgando
      const cols = ["#d8473a", "#f0c040", "#3f7fd0", "#e8e4d8", "#4caf72", "#e07b2a"];
      return (
        <g>
          {Array.from({ length: 9 }).map((_, i) => {
            const t = ((f / 260 + random(`pc${i}`)) % 1);
            const x = -900 + random(`pcx${i}`) * 1800 + Math.sin(f / 30 + i) * 30;
            const y = -1500 + t * 1300;
            const c = cols[i % cols.length];
            const s = 0.6 + random(`pcs${i}`) * 0.5;
            return (
              <g key={i} transform={`translate(${x} ${y}) scale(${s})`} opacity={t > 0.92 ? (1 - t) / 0.08 : 1}>
                <path d="M-120 0 Q-110 -110 0 -120 Q110 -110 120 0 Q90 -18 60 0 Q30 -18 0 0 Q-30 -18 -60 0 Q-90 -18 -120 0Z" fill={c} />
                <path d="M-120 0 L-20 150 M120 0 L20 150 M-60 0 L-10 150 M60 0 L10 150" stroke="#444" strokeWidth={3} />
                <rect x={-34} y={150} width={68} height={80} rx={6} fill="#6a6040" />
              </g>
            );
          })}
        </g>
      );
    }
    case "hoyo": {
      // hoyo de tirador: boca oscura en el suelo con un reborde de tierra removida y troncos delante
      const tierra = noche ? "#3a3028" : "#6b5440";
      return (
        <g>
          <path d="M-380 10 Q-360 -70 -220 -86 Q0 -100 220 -86 Q360 -70 380 10Z" fill={tierra} />
          <ellipse cx={0} cy={4} rx={250} ry={40} fill="#14110e" />
          {[-120, 30, 160].map((x, i) => <rect key={x} x={x - 130} y={-108 - i * 4} width={260} height={30} rx={15} fill={noche ? "#3a2a1a" : "#5a3e22"} stroke="#2a1c10" strokeWidth={4} transform={`rotate(${(i - 1) * 5} ${x} -94)`} />)}
          <path d="M-380 10 Q-360 -70 -220 -86 Q-300 -50 -330 10Z M380 10 Q360 -70 220 -86 Q300 -50 330 10Z" fill="#f4f6f8" opacity={0.6} />
        </g>
      );
    }
    case "norseman":
    case "norseman-vuelo": {
      // monomotor de ala alta de los años cuarenta (tipo Norseman), gris oliva y sin insignias, de perfil hacia la derecha.
      // "norseman": en tierra con la hélice girando; "norseman-vuelo": uno solo que cruza el cielo y se pierde (pasa por su x a mitad de escena).
      const vuela = tipo === "norseman-vuelo";
      const c = noche ? "#2a2e2c" : "#6a7060";
      const cristal = noche ? "#2a3038" : "#9fb4c4";
      const giro = Math.abs(Math.cos(f * 1.6));
      const x0 = vuela ? (f - dur * 0.5) * 2.6 : 0;
      const y0 = vuela ? -600 + Math.sin(f / 25) * 10 : 0;
      const s = vuela ? 0.32 : 1;
      return (
        <g transform={`translate(${x0} ${y0}) scale(${s})`} opacity={vuela ? 0.85 : 1}>
          {!vuela && <ellipse cx={0} cy={4} rx={520} ry={16} fill="#000" opacity={0.15} />}
          {/* fuselaje */}
          <path d="M-520 -300 Q-500 -330 -440 -330 L120 -380 Q300 -400 400 -360 L430 -260 Q300 -200 120 -190 L-440 -270 Q-520 -280 -520 -300Z" fill={c} />
          {/* cola */}
          <path d="M-470 -320 L-540 -520 L-440 -520 L-380 -330Z" fill={oscurecer(c, 0.1)} />
          <path d="M-520 -296 L-600 -280 L-440 -276Z" fill={oscurecer(c, 0.15)} />
          {/* ala alta */}
          <rect x={-120} y={-420} width={420} height={36} rx={14} fill={oscurecer(c, 0.12)} />
          <path d="M40 -386 L-30 -250 M200 -386 L120 -230" stroke={oscurecer(c, 0.3)} strokeWidth={10} />
          {/* ventanillas */}
          {[160, 260, 330].map((x, i) => <rect key={x} x={x - 40 - i * 5} y={-360} width={i === 2 ? 60 : 70} height={60} rx={8} fill={cristal} />)}
          {/* motor redondo y hélice */}
          <ellipse cx={420} cy={-300} rx={40} ry={84} fill={oscurecer(c, 0.3)} />
          <ellipse cx={462} cy={-300} rx={8} ry={150 * giro + 10} fill="#222" opacity={0.7} />
          {!vuela && <ellipse cx={462} cy={-300} rx={10} ry={150} fill="#bbb" opacity={0.08} />}
          {/* tren de aterrizaje */}
          {!vuela && (
            <g>
              <path d="M160 -200 L110 -60 M200 -200 L230 -60" stroke="#222" strokeWidth={14} />
              {[110, 230].map((x) => <circle key={x} cx={x} cy={-46} r={46} fill="#151515" />)}
              <circle cx={-470} cy={-240} r={18} fill="#151515" />
            </g>
          )}
        </g>
      );
    }
    case "nissen": {
      // barracón semicilíndrico de chapa ondulada (Nissen) con puerta y ventanas en el frente y una chimenea de estufa
      const chapa = noche ? "#3a3e40" : "#7a8084";
      return (
        <g>
          <path d="M-520 0 Q-520 -560 0 -560 Q520 -560 520 0Z" fill={chapa} />
          {Array.from({ length: 12 }).map((_, i) => <path key={i} d={`M${-470 + i * 85} 0 Q${-470 + i * 85} -520 ${(-470 + i * 85) * 0.15} -555`} stroke={oscurecer(chapa, 0.2)} strokeWidth={5} fill="none" opacity={0.6} />)}
          <path d="M-300 0 L-300 -330 Q0 -400 300 -330 L300 0Z" fill={noche ? "#2a2420" : "#5a4632"} />
          <rect x={-70} y={-240} width={140} height={240} fill="#1a1612" />
          {[-200, 200].map((x) => <rect key={x} x={x - 50} y={-260} width={100} height={80} fill={noche ? "#ffd27a" : "#2a3038"} opacity={0.85} />)}
          <rect x={330} y={-680} width={30} height={200} fill="#2a2a2a" />
          {Array.from({ length: 4 }).map((_, k) => {
            const t = ((f / 100 + k / 4) % 1);
            return <circle key={k} cx={345 + t * 60} cy={-700 - t * 220} r={18 + t * 50} fill="#9a9a9a" opacity={0.4 * (1 - t)} />;
          })}
        </g>
      );
    }
    case "torre-control": {
      // torre de control de un aeródromo de guerra: edificio cuadrado de dos plantas con galería, barandilla y cristaleras
      const muro = noche ? "#5a5a56" : "#c8c4b8";
      const cristal = noche ? "#ffd27a" : "#5a6a78";
      return (
        <g>
          <rect x={-360} y={-560} width={720} height={560} fill={muro} />
          <rect x={-400} y={-300} width={800} height={24} fill={oscurecer(muro, 0.25)} />
          <rect x={-380} y={-590} width={760} height={30} fill={oscurecer(muro, 0.2)} />
          {Array.from({ length: 13 }).map((_, i) => <rect key={i} x={-380 + i * 63} y={-372} width={6} height={72} fill="#2a2a2a" />)}
          <rect x={-380} y={-376} width={760} height={6} fill="#2a2a2a" />
          {[-250, -80, 90, 260].map((x) => <rect key={x} x={x - 60} y={-520} width={120} height={120} fill={cristal} opacity={0.85} />)}
          {[-230, 230].map((x) => <rect key={x} x={x - 60} y={-240} width={120} height={110} fill={cristal} opacity={0.7} />)}
          <rect x={-60} y={-200} width={120} height={200} fill="#2a2420" />
          <line x1={300} y1={-590} x2={300} y2={-820} stroke="#2a2a2a" strokeWidth={8} />
          <path d={`M300 -820 L${300 + 90 + Math.sin(f / 12) * 12} -800 L300 -770Z`} fill="#e0742a" />
        </g>
      );
    }
    case "telar": {
      // telar vertical de pesas nórdico: dos postes apoyados en la pared, la tela a medio tejer y las pesas de piedra colgando abajo
      const madera = noche ? "#3a2a1a" : "#6b4a2a";
      return (
        <g>
          <path d="M-260 0 L-200 -760 M260 0 L200 -760" stroke={madera} strokeWidth={30} strokeLinecap="round" />
          <rect x={-230} y={-770} width={460} height={30} rx={12} fill={madera} />
          <rect x={-205} y={-740} width={410} height={330} fill="#a8352a" />
          {Array.from({ length: 6 }).map((_, i) => <rect key={i} x={-205} y={-720 + i * 52} width={410} height={14} fill="#e0c070" opacity={0.75} />)}
          {Array.from({ length: 24 }).map((_, i) => {
            const x = -195 + i * 17;
            return <g key={i}><line x1={x} y1={-410} x2={x + (i % 2 ? 4 : -4)} y2={-160} stroke="#d8cdb0" strokeWidth={2} /><circle cx={x + (i % 2 ? 4 : -4)} cy={-145} r={14} fill="#7a746a" /></g>;
          })}
          <rect x={-215} y={-420} width={430} height={14} rx={6} fill={madera} />
        </g>
      );
    }
    case "aurora": {
      // aurora boreal: cortinas verdes que ondulan en el cielo de la noche (decorado de cielo; x indiferente)
      return (
        <g transform="translate(0 -860)" opacity={0.9}>
          {[0, 1, 2].map((k) => {
            const ondas = Array.from({ length: 9 }).map((_, i) => {
              const x = -1000 + i * 250;
              const y = Math.sin(f / (40 + k * 10) + i * 0.8 + k) * 70 + k * 90;
              return `${x} ${y}`;
            });
            const d = `M${ondas[0]} ` + ondas.slice(1).map((p) => `L${p}`).join(" ");
            return (
              <g key={k}>
                <path d={`${d} L1000 ${360 + k * 60} L-1000 ${360 + k * 60}Z`} fill={k === 1 ? "#6ad0a8" : "#3fbf7f"} opacity={0.16 + 0.06 * Math.sin(f / 20 + k)} />
                <path d={d} stroke="#9af0c8" strokeWidth={10} fill="none" opacity={0.45} />
              </g>
            );
          })}
        </g>
      );
    }
    case "avion": {
      // aviones de hélice en formación que cruzan el cielo de izquierda a derecha, sin insignias
      const x0 = (f - dur * 0.55) * 3.2;
      const c = noche ? "#1e2226" : "#55605a";
      const uno = (dx: number, dy: number, s: number, k: number) => (
        <g key={k} transform={`translate(${x0 + dx} ${-780 + dy + Math.sin(f / 18 + k) * 6}) scale(${s})`} fill={c}>
          <path d="M-56 0 Q-48 -9 -16 -10 L32 -10 Q50 -8 56 0 Q48 7 32 7 L-32 5 Q-48 4 -56 0Z" />
          <path d="M-8 -10 Q4 -22 20 -10Z" fill={noche ? "#3a4048" : "#a9b8bf"} />
          <path d="M-48 -3 L-60 -28 L-47 -27 L-32 -5Z" />
          <ellipse cx={-46} cy={2} rx={15} ry={3.5} />
          <path d="M-12 2 L24 2 L14 12 L-24 12Z" fill={oscurecer(c, 0.25)} />
          <circle cx={58} cy={-1} r={4.5} fill="#222" />
          <ellipse cx={60} cy={-1} rx={3} ry={18 * Math.abs(Math.cos(f * 1.3 + k))} fill="#222" opacity={0.55} />
        </g>
      );
      return <g>{[[0, 0, 1], [-120, -36, 0.85], [-110, 44, 0.9]].map(([dx, dy, s], k) => uno(dx, dy, s, k))}</g>;
    }
    case "radar": {
      // radar SCR-270 (Opana, 1941): remolque de los operadores y antena de rejilla de dipolos en su torre, que gira despacio, en lo alto de una loma
      const giro = Math.cos(f / 55);
      const ancho = Math.max(24, 300 * Math.abs(giro));
      const loma = noche ? "#2c3a26" : "#5f7c46";
      const oliva = noche ? "#33352a" : "#6b6e48";
      const hierro = noche ? "#1e2022" : "#3a3d40";
      return (
        <g>
          <path d="M-560 6 Q-320 -150 0 -172 Q320 -150 560 6Z" fill={loma} />
          <path d="M-560 6 Q-320 -150 0 -172 Q-260 -130 -460 6Z" fill="#fff" opacity={0.06} />
          {/* cable del remolque a la torre */}
          <path d="M150 -220 Q40 -150 -110 -190" stroke="#111" strokeWidth={5} fill="none" />
          {/* remolque con ruedas */}
          <rect x={110} y={-350} width={240} height={140} rx={8} fill={oliva} />
          <rect x={110} y={-350} width={240} height={14} fill={oscurecer(oliva, 0.25)} />
          <rect x={150} y={-320} width={50} height={110} fill={oscurecer(oliva, 0.3)} />
          <rect x={250} y={-320} width={70} height={36} fill={noche ? "#ffd27a" : "#2a3038"} opacity={noche ? 0.8 : 1} />
          {[160, 300].map((x) => <circle key={x} cx={x} cy={-196} r={26} fill="#1a1a1a" />)}
          {/* torre de celosía */}
          <g stroke={hierro} strokeWidth={8} fill="none">
            <path d="M-190 -160 L-145 -400 M-50 -160 L-95 -400" />
            {Array.from({ length: 3 }).map((_, i) => {
              const y1 = -160 - i * 80;
              const y2 = y1 - 80;
              const a = (y: number) => -190 + ((-160 - y) / 240) * 45;
              const b = (y: number) => -50 - ((-160 - y) / 240) * 45;
              return <path key={i} d={`M${a(y1)} ${y1} L${b(y2)} ${y2} M${b(y1)} ${y1} L${a(y2)} ${y2}`} strokeWidth={4} />;
            })}
          </g>
          <rect x={-160} y={-422} width={80} height={24} fill={hierro} />
          {/* antena de rejilla */}
          <g transform={`translate(-120 -548)`}>
            <rect x={-ancho / 2} y={-110} width={ancho} height={220} fill="none" stroke={hierro} strokeWidth={8} />
            {Array.from({ length: 4 }).map((_, r) =>
              Array.from({ length: 8 }).map((__, c) => (
                <line key={`${r}${c}`} x1={-ancho / 2 + ((c + 0.2) / 8) * ancho} y1={-80 + r * 54} x2={-ancho / 2 + ((c + 0.8) / 8) * ancho} y2={-80 + r * 54} stroke={hierro} strokeWidth={5} />
              )),
            )}
            {[1, 2, 3].map((k) => <line key={k} x1={-ancho / 2 + (k / 4) * ancho} y1={-110} x2={-ancho / 2 + (k / 4) * ancho} y2={110} stroke={hierro} strokeWidth={3} />)}
            <rect x={-6} y={110} width={12} height={20} fill={hierro} />
          </g>
        </g>
      );
    }
    // ---------- Galileo en Padua, 1610 ----------
    case "anteojo": {
      // el anteojo de Galileo sobre un pie de madera sencillo, apuntando al cielo
      const madera = noche ? "#3e2a1a" : "#6b4a2e";
      return (
        <g>
          <path d="M0 -170 L-120 0 M0 -170 L110 0 M0 -170 L-12 0" stroke={madera} strokeWidth={14} strokeLinecap="round" />
          <rect x={-9} y={-575} width={18} height={410} fill={madera} />
          <path d="M-20 -575 L-20 -605 M20 -575 L20 -605" stroke={madera} strokeWidth={9} strokeLinecap="round" />
          <g transform={`translate(0 -592) rotate(${-32 + Math.sin(f / 40) * 0.4}) translate(${-LARGO_TUBO * 0.45} 0)`}>
            <TuboAnteojo noche={noche} />
          </g>
          <circle cx={0} cy={-592} r={7} fill="#2a1a10" />
        </g>
      );
    }
    case "torno-lentes": {
      // banco de pulir lentes: tablero propio, molde de hierro que gira con su manivela y la lente encima,
      // cuenco de abrasivo y lentes en fila en su listón (una rota)
      const g = f / 10;
      const madera = "#6b4a32";
      const pata = "#5a3d28";
      const vidrio = "#d3e8ef";
      const cx = -170;
      const mx = cx + Math.cos(g) * 92;
      const my = -252 + Math.sin(g) * 16;
      const manivela = (
        <g>
          <path d={`M${cx} -252 L${mx} ${my}`} stroke="#2e2e32" strokeWidth={10} strokeLinecap="round" />
          <rect x={mx - 8} y={my - 66} width={16} height={66} rx={6} fill={pata} />
          <circle cx={mx} cy={my - 66} r={12} fill={oscurecer(pata, -0.3)} />
        </g>
      );
      return (
        <g>
          <rect x={-300} y={-230} width={600} height={34} fill={madera} />
          <rect x={-280} y={-196} width={26} height={196} fill={pata} />
          <rect x={254} y={-196} width={26} height={196} fill={pata} />
          <rect x={-270} y={-70} width={540} height={16} fill={pata} />
          {/* eje del molde */}
          <rect x={cx - 14} y={-272} width={28} height={44} fill="#3a3a3e" />
          {Math.sin(g) < 0 && manivela}
          {/* molde de hierro y la lente que se pule encima */}
          <path d={`M${cx - 74} -272 L${cx + 74} -272 L${cx + 60} -304 L${cx - 60} -304Z`} fill="#4a4a50" />
          <ellipse cx={cx} cy={-304} rx={60} ry={10} fill="#5c5c62" />
          <ellipse cx={cx} cy={-310} rx={44} ry={9} fill={vidrio} opacity={0.9} />
          <ellipse cx={cx + Math.cos(g * 1.7) * 30} cy={-311} rx={8} ry={2.5} fill="#fff" opacity={0.85} />
          {Math.sin(g) >= 0 && manivela}
          {/* cuenco de abrasivo */}
          <path d="M-40 -230 Q-40 -282 0 -282 Q40 -282 40 -230Z" fill="#8a6a48" transform="scale(1.2 1) translate(0 0)" />
          <ellipse cx={0} cy={-280} rx={46} ry={9} fill="#b8ab92" />
          <ellipse cx={0} cy={-284} rx={30} ry={6} fill="#cfc4ae" />
          {/* listón con las lentes en fila; la tercera, rota */}
          <rect x={80} y={-246} width={190} height={16} fill={pata} />
          {[110, 155, 200, 245].map((x, i) => (
            i === 2 ? (
              <g key={x}>
                <path d={`M${x - 18} -262 A18 18 0 0 1 ${x + 4} -279 L${x - 2} -266 L${x + 10} -258 L${x + 16} -246 L${x - 18} -246Z`} fill={vidrio} opacity={0.85} stroke="#7f98a4" strokeWidth={2} />
                <path d={`M${x + 4} -279 L${x - 2} -266 L${x + 10} -258`} stroke="#4a5a62" strokeWidth={2} fill="none" />
                <path d={`M${x + 22} -230 l12 -6 l6 6Z`} fill={vidrio} stroke="#7f98a4" strokeWidth={2} />
              </g>
            ) : (
              <g key={x}>
                <circle cx={x} cy={-264} r={18} fill={vidrio} opacity={0.85} stroke="#7f98a4" strokeWidth={2} />
                <path d={`M${x - 9} -272 q5 -6 12 -6`} stroke="#fff" strokeWidth={3} fill="none" />
              </g>
            )
          ))}
        </g>
      );
    }
    case "santo": {
      // basílica de San Antonio de Padua (decorado LEJANO): cuerpo alto de ladrillo, cúpulas de plomo con linterna,
      // cúpula cónica en el centro y dos campanarios finos como alminares (sobresale por encima de las casas)
      const ladrillo = noche ? "#4a3030" : "#a45a3e";
      const sombra = noche ? "#3a2626" : "#874832";
      const plomo = noche ? "#454c5a" : "#8f9aa2";
      const B = -520; // arranque de las cúpulas
      const cupula = (x: number, r: number, dy = 0) => (
        <g key={x}>
          <rect x={x - r * 0.85} y={B + dy - r * 0.35} width={r * 1.7} height={r * 0.4} fill={sombra} />
          <path d={`M${x - r} ${B + dy - r * 0.3} A${r} ${r * 0.95} 0 0 1 ${x + r} ${B + dy - r * 0.3}Z`} fill={plomo} />
          <rect x={x - 8} y={B + dy - r * 1.25 - 24} width={16} height={28} fill={plomo} />
          <path d={`M${x - 10} ${B + dy - r * 1.25 - 24} L${x} ${B + dy - r * 1.25 - 50} L${x + 10} ${B + dy - r * 1.25 - 24}Z`} fill={plomo} />
        </g>
      );
      return (
        <g>
          <rect x={-430} y={B} width={860} height={-B} fill={ladrillo} />
          <path d={`M-430 ${B} L-310 ${B - 80} L-190 ${B}Z`} fill={ladrillo} />
          {[-370, -310, -250].map((x) => <rect key={x} x={x - 14} y={B + 60} width={28} height={80} rx={14} fill={noche ? "#ffd27a" : sombra} opacity={noche ? 0.55 : 1} />)}
          {cupula(-120, 90)}
          {cupula(120, 90)}
          {cupula(280, 76, 10)}
          {cupula(390, 50, 16)}
          {/* tambor y cúpula cónica del centro */}
          <rect x={-62} y={B - 170} width={124} height={170} fill={sombra} />
          {[-30, 0, 30].map((x) => <rect key={x} x={x - 7} y={B - 140} width={14} height={40} rx={7} fill={noche ? "#1a1416" : "#5a3022"} />)}
          <path d={`M-74 ${B - 170} L0 ${B - 360} L74 ${B - 170}Z`} fill={plomo} />
          {/* dos campanarios finos como alminares */}
          {[-215, 215].map((x) => (
            <g key={x}>
              <rect x={x - 16} y={B - 260} width={32} height={260} fill={ladrillo} />
              <rect x={x - 22} y={B - 270} width={44} height={14} fill={sombra} />
              <rect x={x - 12} y={B - 330} width={24} height={60} fill={ladrillo} />
              <rect x={x - 6} y={B - 320} width={12} height={26} rx={6} fill={noche ? "#1a1416" : "#5a3022"} />
              <path d={`M${x - 16} ${B - 330} L${x} ${B - 410} L${x + 16} ${B - 330}Z`} fill={plomo} />
            </g>
          ))}
        </g>
      );
    }
    case "campanario": {
      // campanario de San Marcos (decorado LEJANO): fuste de ladrillo con pilastras, campanas en logia blanca, ático y punta piramidal verde
      const ladrillo = noche ? "#4a3030" : "#a85a3c";
      const pilastra = noche ? "#563838" : "#bc6c4c";
      const piedra = noche ? "#7a7c82" : "#ece4d2";
      const verde = noche ? "#2e4a40" : "#5f9a7e";
      return (
        <g>
          <rect x={-60} y={-560} width={120} height={560} fill={ladrillo} />
          {[-46, -14, 18].map((x) => <rect key={x} x={x} y={-540} width={28} height={540} fill={pilastra} opacity={0.6} />)}
          <rect x={-68} y={-580} width={136} height={22} fill={piedra} />
          <rect x={-62} y={-670} width={124} height={90} fill={piedra} />
          {[-40, 0, 40].map((x) => <path key={x} d={`M${x - 13} -584 L${x - 13} -640 A13 13 0 0 1 ${x + 13} -640 L${x + 13} -584Z`} fill={noche ? "#141418" : "#3a3028"} />)}
          <rect x={-68} y={-684} width={136} height={16} fill={piedra} />
          <rect x={-58} y={-750} width={116} height={66} fill={ladrillo} />
          <rect x={-66} y={-760} width={132} height={12} fill={piedra} />
          <path d="M-60 -760 L0 -920 L60 -760Z" fill={verde} />
          <path d="M0 -760 L0 -920 L60 -760Z" fill="#000" opacity={0.15} />
          <path d="M-6 -920 L0 -950 L6 -920Z" fill="#d9b04a" />
        </g>
      );
    }
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

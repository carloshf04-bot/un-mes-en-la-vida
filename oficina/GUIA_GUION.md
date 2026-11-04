# Guía del guionista: "Un mes en la vida de"

Cada episodio es **un archivo JSON** en `guiones/<slug>.json`. De ese archivo salen dos vídeos:

| Pieza | Formato | Duración | Escenas | Palabras |
|---|---|---|---|---|
| `largo` | Horizontal 1920×1080 (YouTube) | **10–13 min** | 55–75 | 1.600–2.000 |
| `short` | Vertical 1080×1920 (Shorts/TikTok/Reels) | **45–60 s** | 6–9 | 120–160 |

La voz lee unas 155 palabras por minuto a velocidad 0.95. Para comprobarlo, ejecuta `node scripts/producir.mjs <slug> --sin-render` y mira la línea "duración total".

## Reglas de escritura

1. **Primera persona.** Habla el protagonista: "Me llamo…", "Subo los escalones…".
2. **Gancho en la primera frase.** Una promesa inquietante o un dato brutal: "Esta noche, 172 hombres van a morir frente a mi faro".
3. **Estructura del largo:**
   - Gancho y presentación (2 escenas).
   - 4 capítulos, uno por semana (`"capitulo"` en la primera escena de cada uno).
   - Giro o clímax en la semana 2 o 3.
   - Epílogo con lo que pasó después.
   - Cierre con llamada a comentar y suscribirse.
4. **Cada escena tiene 1–3 frases (15–40 palabras).** Si hay más, divídela.
5. **Números en letra dentro de `texto`** ("ciento veinte", no "120"), porque la voz lee mejor así. En las tarjetas (`valor`) sí van con cifras.
6. **Rigor:** los hechos históricos tienen que estar en la ficha de investigación (`investigacion/<slug>.md`). El protagonista puede ser inventado, pero hay que decirlo en el cierre y en la descripción. Si un dato no está verificado, se suaviza ("dicen que…") o se quita.
7. **Futuro:** se inventa con coherencia interna. Conviene al menos un dato "real" de anclaje (por ejemplo, la tecnología actual de la que parte).
8. **Personas reales:** solo hechos documentados y nada denigrante. Si se dramatiza un diálogo, se dice "imagino" o se deja como pensamiento.
9. **El Short no es un recorte del largo.** Tiene su propio gancho, cuenta la historia en miniatura y termina con suspense ("te lo cuento en el mes completo").

## Esquema del JSON

```jsonc
{
  "slug": "farero-1890",              // = nombre del archivo
  "titulo": "un farero",              // va detrás de "UN MES EN LA VIDA DE"
  "lugar": "Cabo Vilán, Galicia",
  "epoca": "Noviembre de 1890",
  "categoria": "epoca | persona | profesion | futuro",
  "voz": "es_MX-claude-high",         // ver voces/ (es_MX-ald-medium = hombre MX, es_ES-davefx-medium = hombre ES, es_ES-sharvard-medium)
  "velocidad": 0.95,
  "musica": "calma | nostalgia | tension | epico | futuro | misterio",
  "paleta": { "acento": "#f2b544", "texto": "#f5efe0", "fondo": "#0c1424", "papel": "#f3e9d2" },
  "reparto": { "<id>": Look, ... },
  "short": { "escenas": [Escena, ...] },
  "largo": { "escenas": [Escena, ...] },
  "publicacion": { "tituloLargo": "", "tituloShort": "", "descripcion": "", "etiquetas": [] }
}
```

### Escena

```jsonc
{
  "dia": 5,                    // contador "DÍA 5 / 30" (omitir en la primera escena del largo y en el cierre)
  "capitulo": "El mar tiene hambre", // sólo en la 1ª escena de cada semana (sale cartela "SEMANA N")
  "texto": "Lo que dice la voz.",
  "fondo": Fondo,              // si se omite, HEREDA el de la escena anterior
  "personajes": [EnEscena],    // si se omite, HEREDA; [] = escena vacía
  "camara": "lenta | cerca | paneo | general | subir",
  "insercion": Insercion       // tarjeta a pantalla completa sobre el fondo desenfocado
}
```

- **Variedad:** cambia de `fondo` cada 2–4 escenas y mete una `insercion` cada 4–6 escenas. Usa `"cerca"` en momentos emotivos y `"paneo"` en paisajes.
- **Primera escena del largo:** el título sale a la izquierda durante 5 s, así que pon al protagonista en `x` ≥ 0.3.
- **No pongas `insercion` en la última escena** (ahí aparece el botón de suscripción).

### Fondo

```jsonc
{ "lugar": "...", "hora": "amanecer|dia|atardecer|noche", "clima": "despejado|lluvia|nieve|niebla|tormenta|polvo|ceniza",
  "pared": "piedra|madera|ladrillo|metal|papel|tela|roca",   // sólo interior
  "ventana": true,                                          // sólo interior
  "props": ["chimenea", { "tipo": "faro", "x": -1.35, "escala": 1.2, "detras": true }] }
```

- **lugar:** `mar`, `playa`, `montanas`, `hielo`, `ciudad`, `futurista`, `desierto`, `campo`, `bosque`, `selva`, `espacio`, `luna`, `calle` (calle antigua empedrada) o `interior`.
- **props:** `arbol`, `pino`, `palmera`, `casa`, `cabana`, `faro`, `barco` (vapor), `velero`, `cohete`, `farola`, `carro`, `puesto` (de mercado), `roca`, `valla`, `pozo`, `tumba`, `hoguera`, `tienda` (de campaña), `bandera`, `mesa`, `estanteria`, `chimenea`, `cama`, `antorcha`, `cuadro`, `consola` (sci-fi), `maquina` (industrial), `barril`, `cajas`, `planta`, `telescopio`, `yunque`, `piramide`, `columna` y `reloj`.
- **Emoji como prop:** cualquier otro texto en `tipo` se dibuja como emoji gigante (`{ "tipo": "🌼", "x": 0.6, "escala": 0.5 }`).
- **Posición `x` de los props:** sin `x` se reparten solos. Con `x` entre −1.5 y 1.5, el vertical los acerca al centro automáticamente.
- **Ambiente sonoro:** se elige solo según lugar, clima y props (lluvia, mar, viento, fuego, zumbido, ciudad).

### Personajes (reparto → Look)

```jsonc
{ "piel": "#e3ad84", "pelo": "#3a2a1e",
  "peinado": "corto|largo|calvo|mono|rizado|coleta|trenzas|rapado",
  "barba": "ninguna|bigote|corta|larga",
  "ropa": { "tipo": "camisa|tunica|vestido|abrigo|mono|armadura|traje|bata|uniforme|harapos", "color": "#", "color2": "#", "detalle": "#" },
  "sombrero": "ninguno|gorra|copa|ala|casco|corona|capucha|panuelo|espacial|boina|tricornio|yelmo", "colorSombrero": "#",
  "gafas": false, "altura": 1 /* 0.6 niño */, "zapatos": "#" }
```

- `ropa.color` es la parte de arriba y `color2` el pantalón o la falda.
- Para un astronauta: `mono` + `espacial`. Para un caballero: `armadura` + `yelmo`. Para un monje: `bata` + `capucha`. Para un romano: `tunica` + sandalias claras (`zapatos`).

### EnEscena

```jsonc
{ "quien": "manuel", "x": -0.4, "accion": "hablar", "emocion": "feliz", "mirar": 1, "objeto": "🪔",
  "entra": "izq|der", "sale": "izq|der", "habla": true, "escala": 1 }
```

- **x:** de −1 (izquierda) a 1 (derecha). Con dos personajes, ±0.4 o más; con tres, −0.7 / 0 / 0.7.
- **accion:** `quieto`, `hablar`, `caminar`, `correr`, `trabajar`, `saludar`, `sentado`, `escribir`, `pensar`, `celebrar`, `triste`, `senalar`, `cargar` (el objeto va en las manos), `dormir` y `asustado`.
- **emocion:** `neutral`, `feliz`, `triste`, `miedo`, `enfado`, `sorpresa` y `cansado`.
- **habla:** el primer personaje mueve la boca con la voz por defecto. Pon `"habla": false` a los demás (y al protagonista si duerme o si la voz es pensamiento).
- **mirar:** 1 = derecha, −1 = izquierda. Que se miren entre ellos.

### Insercion

```jsonc
{ "tipo": "dato", "valor": "120", "etiqueta": "escalones cada tres horas", "icono": "🪜" }
{ "tipo": "cita", "frase": "…", "firma": "Diario, 10 de noviembre" }
{ "tipo": "objetos", "titulo": "Mi equipaje", "items": [{ "icono": "🧳", "nombre": "Una maleta" }] }   // máx 4
{ "tipo": "mapa", "lugar": "Cabo Vilán", "detalle": "Galicia · 1890", "icono": "📍" }
```

## Emojis prohibidos o engañosos

- **🗼** es la Torre de Tokio, no un faro. Usa el prop `faro`.
- **👨‍👩‍👦 y otras secuencias con ZWJ** (familias, profesiones con género): algunas se ven como un cuadro roto. Usa emojis simples.
- **🚢** es un crucero moderno. Para barcos antiguos usa los props `barco` o `velero`.

## Lista de control antes de producir

- [ ] La duración del largo está entre 10 y 13 minutos (`--sin-render`).
- [ ] Cada `quien` existe en `reparto`.
- [ ] Hay 4 capítulos y los días suben de forma coherente del 1 al 30.
- [ ] Cada dato histórico aparece en la ficha de investigación, con su fuente.
- [ ] El cierre dice qué es inventado y qué es real.
- [ ] Las muestras (`--muestras`) no tienen solapes ni personajes cortados.

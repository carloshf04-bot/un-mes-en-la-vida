# Guía del guionista: "Un mes en la vida de"

Cada episodio es **un archivo JSON** en `guiones/<slug>.json`. De ese archivo salen dos vídeos:

| Pieza | Formato | Duración | Escenas | Palabras |
|---|---|---|---|---|
| `largo` | Horizontal 1920×1080 (YouTube) | **10–13 min** | 50–65 | 1.350–1.550 |
| shorts | Vertical 1080×1920, **troceados del largo** (no tienen guion propio) | 45–60 s cada uno | — | — |

**Shorts (desde noviembre de 2026):** ya no se escribe `short`. El largo se organiza en **bloques consecutivos de 95–115 palabras** (≈45–60 s) que funcionen solos: cada bloque empieza con un gancho y termina con una intriga o un pequeño cierre. La primera escena de cada bloque lleva `"corte": true` (también la escena 0). `scripts/shorts.mjs` corta el largo terminado por esos puntos (si alguno queda fuera de 45–60 s, reparte los cortes en otros finales de escena). En `publicacion.shorts` va un `{ "titulo", "descripcion" }` por bloque, en orden.

La voz (Chatterbox, narrador de España, con `"velocidad": 1.15`) lee unas **120 palabras por minuto**: el largo ideal tiene **1.350–1.550 palabras** (unos 12 min) y el Short **100–125**. Para comprobarlo, ejecuta `node scripts/producir.mjs <slug> --sin-render` y mira la línea "duración total".

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
9. **Que nunca afloje.** Cada escena empuja a la siguiente (pregunta abierta, cuenta atrás, revelación a medias). Los shorts salen del propio largo, así que cada bloque de 45–60 s necesita su gancho inicial.
10. **Grafías:** cada palabra escrita «como suena» va en `"grafias": { "Guín": "Gein", "Uiscónsin": "Wisconsin" }` (palabra a palabra) para que los subtítulos del largo y de los shorts la muestren bien escrita.
11. **La voz sesea.** Si hay sinónimo, evita palabras con z, ce, ci. Los nombres extranjeros o difíciles se escriben en `texto` como suenan («Guín», «Uiscónsin», «Meshica»); en tarjetas y `publicacion`, con su grafía real.

## Esquema del JSON

```jsonc
{
  "slug": "farero-1890",              // = nombre del archivo
  "titulo": "un farero",              // va detrás de "UN MES EN LA VIDA DE"
  "lugar": "Cabo Vilán, Galicia",
  "epoca": "Noviembre de 1890",
  "categoria": "epoca | persona | profesion | futuro",
  // VOZ: Chatterbox. Narrador masculino de España por defecto ("narrador-es").
  // Si quien narra es MUJER o NIÑA: "voz": "narradora-es" (obligatorio).
  "voz": "narradora-es",
  "drama": 0.65,                      // expresividad global de la voz (0.4 sereno · 0.65 documental · 0.85 muy dramático)
  "velocidad": 1.15,                  // con Chatterbox: acelera el audio sin cambiar el tono (recomendado 1.15)
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
  "drama": 0.8,                // opcional: sube en clímax (0.8–0.9), baja en momentos íntimos (0.45)
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

- **lugar:** `rio` (agua tranquila con la otra orilla al fondo: ríos, lagos, canales), `mar`, `playa`, `montanas`, `hielo`, `ciudad`, `futurista`, `desierto`, `valle` (acantilados de caliza, tipo Valle de los Reyes), `marte` (cielo caramelo de día, atardecer azul, la Tierra como punto azul de noche), `campo`, `bosque`, `selva`, `espacio`, `luna`, `calle` (calle antigua empedrada) o `interior`.
- **pared** (interior): `piedra`, `madera`, `ladrillo`, `metal`, `papel`, `tela`, `roca` o `jeroglificos` (tumba egipcia pintada).
- **props:** `arbol`, `pino`, `palmera`, `casa`, `cabana` (de madera, clima frío), `casa-adobe` (Egipto, Oriente Próximo, Mesoamérica, desierto), `volcan` / `volcan-erupcion` (al fondo, usa escala 1.5–2.5 y x ±1.3; la columna crece sola), `horno` (de pan, de ladrillo), `molino` (de lava romano con burro), `anfora`, `termopolio` (mostrador romano), `faro`, `barco` (vapor), `velero`, `cohete`, `farola`, `carro`, `puesto` (de mercado), `roca`, `valla`, `pozo`, `tumba`, `hoguera`, `tienda` (de campaña), `bandera`, `mesa`, `estanteria`, `chimenea`, `cama`, `antorcha`, `cuadro`, `consola` (sci-fi), `maquina` (industrial), `barril`, `cajas`, `planta`, `telescopio`, `yunque`, `piramide`, `columna`, `reloj`, `escalera` (escalones excavados que bajan), `puerta` (puerta tapiada con sellos), `tesoro` (montón de oro y objetos), `sarcofago`, `mascara` (máscara funeraria de oro), `estatua` (guardián negro y oro), `jarron` (de alabastro), `carro-dorado`, `bergantin` (barco de tres palos atrapado en hielo), `bergantin-hundido` (escorado, se hunde lentamente) `bote` (bote salvavidas con vela), `habitat` (cúpula presurizada), `invernadero`, `rover`, `panel-solar` y `antena`.
  - **Apocalipsis / ciudad moderna:** `coche-abandonado`, `barricada` (sacos y vallas), `bidon-fuego`, `bloque` (bloque de pisos), `semaforo` (en ámbar intermitente), `pilar` (basílica del Pilar, decorado LEJANO: x ±1.2, escala 1.5–2), `puente` (puente de piedra de arcos, se dibuja sobre el agua en plano medio), `camilla`, `radio`, `helicoptero` (cruza el cielo).
  - **América rural de los años cincuenta:** `granja` (casa de madera destartalada), `granero` (rojo), `coche-antiguo` (sedán granate), `coche-patrulla` (del sheriff, con luz), `estufa` (de leña), `mostrador` (de tienda con caja registradora), `poste` (postes de teléfono con cables).
  - **Mesoamérica:** `templo-mayor` (pirámide doble con santuarios rojo y azul, decorado LEJANO), `canoa` (sobre el agua, plano medio), `ahuejote`, `chinampa`, `calzada` (sobre el lago, plano medio), `brasero`, `petate`, `metate`.
- **Planos:** `puente`, `calzada` y `canoa` van en plano medio (sobre el agua); `volcan`, `piramide`, `pilar` y `templo-mayor` siempre lejos. El motor añade solo el primer plano (hierba, postes, marcos) delante de los personajes, el paralaje de las capas y algo vivo (pájaros, motas de polvo, agua).
- **Ventanas:** en interiores con pared `roca` o `jeroglificos` no hay ventana por defecto (tumbas, cuevas). Pon `"ventana": false` en cualquier interior subterráneo.
- **`tumba`** es una lápida con cruz cristiana: solo para cementerios cristianos.
- **Emoji como prop:** cualquier otro texto en `tipo` se dibuja como emoji gigante (`{ "tipo": "🌼", "x": 0.6, "escala": 0.5 }`).
- **Posición `x` de los props:** sin `x` se reparten solos. Con `x` entre −1.5 y 1.5, el vertical los acerca al centro automáticamente.
- **Ambiente sonoro:** se elige solo según lugar, clima y props (lluvia, mar, viento, fuego, zumbido, ciudad).

### Personajes (reparto → Look)

```jsonc
{ "piel": "#e3ad84", "pelo": "#3a2a1e",
  "peinado": "corto|largo|calvo|mono|rizado|coleta|trenzas|rapado",
  "barba": "ninguna|bigote|corta|larga",
  "ropa": { "tipo": "camisa|tunica|vestido|abrigo|mono|armadura|traje|bata|uniforme|harapos|galabiya|tilma|cuadros", "color": "#", "color2": "#", "detalle": "#" },
  "sombrero": "ninguno|gorra|copa|ala|casco|corona|capucha|panuelo|espacial|boina|tricornio|yelmo|turbante|fez|salacot|orejeras|penacho|morrion", "colorSombrero": "#",
  "zombi": false, // infectado: ojos pálidos (con piel gris verdosa y acción "tambalear")
  "gafas": false, "altura": 1 /* 0.6 niño */, "zapatos": "#" }
```

- `ropa.color` es la parte de arriba y `color2` el pantalón o la falda.
- **Voz del personaje:** a todo personaje femenino ponle `"voz": "narradora-es"` en su Look. Cuando una escena la "hable" ella (su boca se mueve, con `habla`), esa escena sale con voz femenina. También se puede forzar con `"voz"` en una escena concreta.
- `tilma`: manta anudada al hombro y taparrabos (`color` = manta, `color2` = taparrabos, piernas y brazos al aire). `cuadros`: chaqueta de leñador (`color` y `color2` = los dos colores del cuadro; el pantalón es `detalle`). `orejeras`: gorra de caza; `penacho`: tocado de plumas; `morrion`: casco español del siglo XVI.
- Para un astronauta: `mono` + `espacial`. Para un caballero: `armadura` + `yelmo`. Para un monje: `bata` + `capucha`. Para un romano: `tunica` + sandalias claras (`zapatos`).

### EnEscena

```jsonc
{ "quien": "manuel", "x": -0.4, "accion": "hablar", "emocion": "feliz", "mirar": 1, "objeto": "🪔",
  "entra": "izq|der", "sale": "izq|der", "habla": true, "escala": 1 }
```

- **x:** de −1 (izquierda) a 1 (derecha). Con dos personajes, ±0.4 o más; con tres, −0.7 / 0 / 0.7.
- **accion:** `tambalear` (infectado: brazos al frente, avanza despacio), `quieto`, `hablar`, `caminar`, `correr`, `trabajar`, `saludar`, `sentado`, `escribir`, `pensar`, `celebrar`, `triste`, `senalar`, `cargar` (el objeto va en las manos), `dormir` y `asustado`.
- **emocion:** `neutral`, `feliz`, `triste`, `miedo`, `enfado`, `sorpresa` y `cansado`.
- **dormir:** el personaje se tumba en el suelo a su izquierda; no lo uses con niños pequeños ni bebés (parece que se han caído). Para ellos usa `sentado` con `emocion: "cansado"`.
- **Movimiento:** `caminar` sin `entra` da unos pasos hasta su sitio y se para (los pies no resbalan). Si el plano sigue en el mismo fondo, cada personaje sale de donde estaba en la escena anterior y cambia de pose fundiéndola en 10 fotogramas.
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

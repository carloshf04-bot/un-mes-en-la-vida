# Estudio "Un mes en la vida de": manual de la oficina

Esta carpeta es un estudio de animación automatizado. **Cada día se produce un episodio**: un vídeo horizontal de 10 a 13 minutos para YouTube y un Short vertical de 45 a 60 segundos. Todo se hace con código: personajes y fondos en SVG animados con Remotion, voz en off con **Chatterbox** (narrador masculino de España, expresivo; Piper como respaldo rápido) y música y ambientes sintetizados (sin copyright).

## Preparar el entorno (sesión nueva)

```bash
./preparar.sh
```

Instala Piper y Chatterbox, descarga las voces y ejecuta `npm ci`. Tarda unos 10 minutos (Chatterbox ocupa ~6 GB). La voz de un largo con Chatterbox tarda ~1 h en CPU: se cachea en `app/public/obras/<slug>/cache-voz/`, así que si el proceso se corta, al relanzarlo continúa donde iba.

## Producción de un episodio (desde noviembre de 2026)

```bash
cd app
node scripts/producir.mjs <slug> --sin-render --muestras   # voces (caché) + manifiesto + fotogramas de muestra
node scripts/revisar_voz.mjs <slug>                         # whisper frase a frase; si sale 3, relanza producir y revisar
node scripts/producir.mjs <slug> --sin-render               # mete los tiempos reales de cada palabra (subtítulos)
node scripts/producir.mjs <slug> --muestras                 # render del largo + mezcla a -14 LUFS + miniaturas
node scripts/shorts.mjs <slug>                              # trocea el largo en shorts verticales de 45–60 s
node scripts/publicacion.mjs <slug>                         # publicacion.md con capítulos (minutos) y un título por short real
# En serie y reanudable: bash scripts/voces.sh <slugs…>; bash scripts/render.sh <slugs…>; bash scripts/cierre.sh <slugs…>
# cierre.sh corrige el pico real si pasa de -1 dBTP (scripts/pico.sh) y corta los shorts.
```

- **30 fps.** Fundidos encadenados entre planos (nunca a negro), personajes que enlazan posición y pose entre escenas del mismo fondo, parpadeo al azar cada 3–6 s, respiración, pelo y ropa con retraso, paralaje y primer plano automáticos.
- **Revisión de la voz** (`scripts/revisar_voz.mjs`): transcribe cada frase con whisper.cpp (`/home/user/whisper.cpp`, modelo large-v3-turbo), la compara con el guion y busca ruidos y silencios de más de 1 s. Si falla, borra esa voz de la caché y la siguiente pasada de `producir.mjs` la regenera con otra semilla (hasta 3 intentos; después hay que reescribir la frase). Progreso en `app/public/obras/<slug>/cache-voz/revision.json`; informe en `salida/<slug>/informe-audio.md`.
- **Mezcla:** la música baja ~11 dB mientras se habla; micro-fundidos de 15–20 ms en cada frase; el MP4 final se normaliza a -14 LUFS con pico real ≤ -1 dBTP (loudnorm en dos pasadas).
- **Shorts** (`scripts/shorts.mjs`): se cortan del `largo.mp4` terminado, en orden y cubriéndolo entero, solo en finales de escena (preferentemente las escenas con `"corte": true`), de 45 a 60 s. Vertical 1080×1920: recorte que sigue al personaje que habla o, si no cabe (tarjetas, capítulos, dos personajes separados), el cuadro entero sobre el fondo desenfocado. Subtítulos nuevos grandes en el tercio inferior, rótulo «Parte N/Total» arriba y «Sigue en la parte N+1» al final. Reanudable: no repite los shorts ya hechos. Salida en `salida/<slug>/shorts/`.

## Puestos de la oficina

Quien abre la sesión es el **Director**. El Director lanza a cada puesto como **subagente** (herramienta Agent) con el encargo correspondiente, revisa su trabajo y pasa al siguiente. Los puestos 2 y 3 pueden trabajar en paralelo una vez elegida la idea.

| # | Puesto | Qué entrega | Dónde |
|---|---|---|---|
| 1 | **Director** | Elige la idea del día (rotación y efemérides en `ideas/banco.md`), la marca `[~]` y coordina a los demás | `ideas/banco.md` |
| 2 | **Investigador** | Ficha con: contexto, cronología del mes día a día, 25 o más detalles de vida cotidiana (comida, sueldo, ropa, peligros, objetos), 5 cifras sorprendentes, personajes reales y **fuentes** (WebSearch). Separa lo verificado de lo dudoso. Para futuro: la ciencia real de partida y unas reglas del mundo coherentes. | `investigacion/<slug>.md` |
| 3 | **Diseñador de personajes** | El `reparto` (Look de cada personaje), con ropa fiel a la época, la `paleta` y la `musica` | se integra en el guion |
| 4 | **Guionista** | `guiones/<slug>.json` completo (largo + short + publicacion), siguiendo **`oficina/GUIA_GUION.md`** al pie de la letra | `guiones/` |
| 5 | **Verificador** | Repasa el guion frente a la ficha: hechos, fechas, anacronismos, JSON válido, emojis prohibidos, duración. Devuelve la lista de correcciones y el Guionista las aplica. | — |
| 6 | **Producción** | `cd app && node scripts/producir.mjs <slug> --sin-render --muestras` y revisa las muestras en `salida/<slug>/muestras/` mirando las imágenes. Si hay solapes, personajes cortados o algo feo, lo corrige. Después ejecuta el render completo **en segundo plano**: `node scripts/producir.mjs <slug> --muestras` (unos 30 min). | `salida/<slug>/` |
| 7 | **Publicación y archivo** | Comprueba `largo.mp4`, `short.mp4`, `miniatura.png` y `publicacion.md`. Sube los vídeos como *release* de GitHub (`gh release create <slug> salida/<slug>/*.mp4 salida/<slug>/miniatura.png -F salida/<slug>/publicacion.md`). Marca la idea `[x]`, apunta una línea en `registro.md` y hace commit y push del guion, la ficha y los cambios de código (**nunca** los mp4). | `registro.md` |

### Encargos tipo para los subagentes

- **Investigador:** "Eres el investigador del estudio. Lee `CLAUDE.md` y `oficina/GUIA_GUION.md`. Investiga «un mes en la vida de <X> en <lugar, fecha>» y escribe `investigacion/<slug>.md` con…" (lo de la tabla).
- **Guionista:** "Eres el guionista. Lee `oficina/GUIA_GUION.md`, `investigacion/<slug>.md` y como ejemplo de calidad `guiones/farero-1890.json`. Escribe `guiones/<slug>.json`…"
- **Verificador:** "Eres el verificador. Compara `guiones/<slug>.json` con `investigacion/<slug>.md` y la guía; lista los errores sin corregirlos tú."

## Reglas de la casa

- **Voces:** narrador masculino de España (`narrador-es`) por defecto. Si la protagonista que narra es mujer o niña, el guion lleva `"voz": "narradora-es"`, y los personajes femeninos llevan `"voz": "narradora-es"` en el reparto.
- **Calidad antes que velocidad.** Si un episodio no está a la altura, mejor retrasarlo un día.
- **Nada de imitar marcas ni personajes con copyright.** Todo se dibuja con nuestro propio sistema.
- **Personaje inventado en un hecho real:** se dice en el cierre del vídeo y en la descripción.
- **Mejoras del motor:** si un guion necesita un prop, una pose o un lugar que no existe, se añade en `app/src/` (Props.tsx, Personaje.tsx, Fondo.tsx), se documenta en la guía y se prueba con `--muestras`.
- **Antes de publicar en redes** (YouTube, TikTok…) hay que pedir confirmación al dueño. La release de GitHub es interna.

## Mapa del código

```
un-mes-en-la-vida/
├── CLAUDE.md               ← este manual
├── preparar.sh             ← instala dependencias
├── oficina/GUIA_GUION.md   ← formato del guion y catálogo de props/acciones
├── ideas/banco.md          ← banco de ideas + estado
├── investigacion/          ← fichas del investigador
├── guiones/                ← un JSON por episodio
├── registro.md             ← historial de episodios
├── salida/<slug>/          ← vídeos generados (no van a git)
└── app/                    ← motor Remotion
    ├── scripts/producir.mjs   voz + música + ambientes + render
    ├── scripts/voz.py         Piper TTS por lotes
    ├── scripts/musica.mjs     sintetizador de música
    └── src/
        ├── Video.tsx          montaje (escenas, capítulos, subtítulos, audio)
        ├── mundo/             fondos (Fondo.tsx), decorados (Props.tsx), cámara (EscenaMundo.tsx)
        ├── personajes/        muñeco articulado (Personaje.tsx)
        ├── inserciones/       tarjetas dato / cita / objetos / mapa
        └── ui/                calendario, subtítulos, título, cartelas
```

Detalle técnico: el mundo es un lienzo de 1920×1920 que se recorta a 16:9 (franja y 420–1500) o a 9:16 (franja x 420–1500). Por eso el mismo guion sirve para los dos formatos.

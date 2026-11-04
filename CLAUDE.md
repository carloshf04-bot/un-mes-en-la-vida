# Estudio "Un mes en la vida de": manual de la oficina

Esta carpeta es un estudio de animación automatizado. **Cada día se produce un episodio**: un vídeo horizontal de 10 a 13 minutos para YouTube y un Short vertical de 45 a 60 segundos. Todo se hace con código: personajes y fondos en SVG animados con Remotion, voz en off con Piper (local) y música y ambientes sintetizados (sin copyright).

## Preparar el entorno (sesión nueva)

```bash
./preparar.sh
```

Instala Piper, descarga las voces y ejecuta `npm ci`. Tarda unos 2 minutos.

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

- **Calidad antes que velocidad.** Si un episodio no está a la altura, mejor retrasarlo un día.
- **Nada de imitar marcas ni personajes con copyright.** Todo se dibuja con nuestro propio sistema.
- **Personaje inventado en un hecho real:** se dice en el cierre del vídeo y en la descripción.
- **Mejoras del motor:** si un guion necesita un prop, una pose o un lugar que no existe, se añade en `app/src/` (Props.tsx, Personaje.tsx, Fondo.tsx), se documenta en la guía y se prueba con `--muestras`.
- **Antes de publicar en redes** (YouTube, TikTok…) hay que pedir confirmación al dueño. La release de GitHub es interna.

## Mapa del código

```
estudio/
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

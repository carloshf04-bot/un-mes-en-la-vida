# La oficina

Cada vídeo pasa por seis puestos, en este orden. Ningún puesto pasa el trabajo al siguiente sin dejar su parte por escrito en la carpeta del vídeo (`videos/<id>/`).

| Puesto | Qué hace | Entrega | Agente |
|---|---|---|---|
| 1. Investigador | Busca los hechos y sus fuentes en la web | `investigacion.md`: cada dato con su fuente | `.claude/agents/investigador.md` |
| 2. Diseñador de personajes | Define el vestuario, los colores y la música | `diseno.md`: reparto, paleta, fuentes y música | `.claude/agents/disenador.md` |
| 3. Guionista | Escribe el guion siguiendo `oficina/GUIA_GUION.md` | `guion.txt` y `guion_visual.md` | `.claude/agents/guionista.md` |
| 4. Verificador | Comprueba los datos, que no haya anacronismos y la duración | `verificacion.md`: OK o lista de cambios | `.claude/agents/verificador.md` |
| 5. Producción | Revisa unos fotogramas de muestra y después renderiza | `produccion.md`, capturas y MP4 | `.claude/agents/produccion.md` |
| 6. Publicación y archivo | Entrega los vídeos y marca la idea como hecha | Archivos enviados e `IDEAS.md` actualizado | `.claude/agents/publicacion.md` |

El estado de cada idea está en `oficina/IDEAS.md` (pendiente, en curso, hecho).

La voz del canal (a quién le hablamos, cómo suena el narrador, qué palabras usamos y cuáles no) está en `oficina/VOZ.md`. El Guionista y el Verificador la leen siempre. Para los skills `yt-*`, cópiala a `~/.claude/youtube/voice.md`.

## Herramientas comunes
- `scripts/`: el generador de HyperFrames (`gen.mjs`, `lib.mjs`, `lib2.mjs`, `fondos.mjs`), la voz (`voz_cb.py`), la alineación (`alinear.py`), el sonido (`audio.py`) y los Shorts (`shorts.py`).
- La voz es Chatterbox Multilingual (licencia MIT) en modo dramático. La música se compone por código y los efectos son el paquete Pixabay de HyperFrames. Todo se puede usar comercialmente.

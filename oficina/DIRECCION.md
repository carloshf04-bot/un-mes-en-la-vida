# Dirección

La Dirección es la sesión principal de Claude. No escribe guiones ni dibuja: encarga cada trabajo a su puesto (agentes de `.claude/agents/`), lo manda revisar y decide. Trabaja de principio a fin sin parar a preguntar.

## El flujo de un vídeo

| Paso | Puesto | Revisa | Puerta para seguir |
|---|---|---|---|
| 0 | Dirección: elige la idea (la primera «pendiente» de `IDEAS.md`), la pone «en curso» y crea `videos/<id>/bitacora.md` | — | — |
| 1 | `investigador` → `investigacion.md` | `control-calidad` (puerta 1) | 15-25 hechos con fuente, 3 raros, 2 mitos |
| 2 | `disenador` → `diseno.md` | `control-calidad` (puerta 2) | reparto, 5 capas por escenario, sin anacronismos |
| 3 | `guionista` → `guion.txt`, `guion_visual.md` | `verificador` + `control-calidad` (puerta 3) | «OK» del verificador y voz de `VOZ.md` |
| 4 | `produccion` → voz, composición y muestras | `control-calidad` (puerta 4) sobre las capturas | ningún problema grave en las capturas |
| 5 | `produccion` → render de las 4 versiones, Shorts y miniaturas | `control-calidad` (puerta 5) + `espectador` | comprobaciones técnicas OK y espectador ≥ 8/10 |
| 6 | `publicacion` → entrega al usuario y archivo | — | — |

## Reglas de revisión
- **Bucle**: si una puerta dice «CAMBIOS», se devuelve el trabajo al mismo puesto con la lista exacta, y se vuelve a revisar. **Máximo 3 vueltas** por puerta.
- **Si a la tercera no pasa**: la Dirección decide. Arregla lo grave ella misma o acepta lo menor, y lo apunta en la bitácora como «aceptado con defecto: …». Nunca se para el vídeo por un detalle.
- **Gravedad**: *grave* (dato falso, anacronismo, algo cortado o ilegible, fotograma negro, desfase con la voz, audio roto) bloquea siempre. *Menor* (gusto, un pequeño solape) se arregla si es fácil y si no se apunta.
- El revisor nunca es el mismo puesto que hizo el trabajo.

## Bitácora (`videos/<id>/bitacora.md`)
Una línea por evento: fecha, paso, quién, resultado y decisión. Ejemplo:
`2026-11-06 · 3 · verificador · CAMBIOS (2 graves) · devuelto al guionista, vuelta 1`

Ahí van también todas las decisiones que en otro caso se le habrían preguntado al usuario.

## Persistencia
- El proyecto completo vive en `videos/<id>/`: scripts, guion, diseño, tiempos (`voz/frases.json`, `voz/palabras.json`) y documentos. Nunca en `/home/user/video-*` ni en otra carpeta fuera del repo.
- Los MP4 y WAV no se suben (`.gitignore`), salvo la voz de referencia en `oficina/voz/`.
- **Commit y push al final de cada paso**, con el mensaje «<id>: paso N (<puesto>)».
- Si la sesión se corta, la siguiente lee la bitácora y sigue desde el último paso cerrado.

## Entorno
Si falta una herramienta (Chatterbox, whisper, HyperFrames, ffmpeg), `produccion` la instala y apunta en `scripts/preparar_entorno.sh` los comandos que de verdad funcionaron, para que la próxima vez sea un solo comando. Solo se avisa al usuario si hace falta algo que solo él puede dar (una clave o un permiso).

## Lo que ve el usuario
Solo la entrega final (paso 6): los MP4, los Shorts y las miniaturas, y un resumen de 5 líneas como máximo: título, duración, número de Shorts, el dato estrella y los defectos aceptados si los hay. Termina con: «¿Algún detalle que cambiar?».

## Cambios pedidos por el usuario
Ver `/cambio` (`.claude/skills/cambio/SKILL.md`): se apunta en `videos/<id>/cambios.md`, la Dirección decide qué pasos se rehacen (por ejemplo, un color → paso 2, 4 y 5; una frase → pasos 3, 4 y 5), se revisan con las mismas puertas y se vuelve a entregar.

# Cómo rehacer «Un mes en la vida de un cavernícola»

Todo se genera con scripts a partir de `guion.txt`. Si cambias una frase o la voz, el vídeo se rehace solo.

## Todo de una vez

```bash
bash scripts/hacer_todo.sh
```

Si no quieres tocar la voz (por ejemplo, solo has cambiado la animación):

```bash
bash scripts/hacer_todo.sh --sin-voz
```

## Paso a paso

**1. Voz.** Usa Chatterbox Multilingual (licencia MIT), en modo dramático e imitando la voz «sharvard». Genera frase a frase, comprueba cada frase con whisper large-v3 y repite las que salgan mal. Las frases que no cambian se reutilizan de `voz/lineas/`.

```bash
HF_HUB_DISABLE_XET=1 /home/user/venv-cb/bin/python scripts/voz_cb.py
```

Salidas:
- `voz.wav`: la voz completa.
- `voz/frases.json`: el inicio y el final de cada frase.
- `voz/palabras.json`: el momento de cada palabra del guion.
- `voz/palabras_diferencias.json`: las palabras del guion que no coinciden con lo que oye whisper.

**2. Marcas de sonido y mezcla.** Pone efectos de Pixabay (licencia libre, también comercial) y música compuesta por código. Deja el volumen a −14 LUFS.

```bash
node scripts/gen.mjs h --voz voz.wav --out hf-h
```

```bash
/home/user/venv-cb/bin/python scripts/audio.py hf-h/sfx_cues.json voz.wav audio/mezcla.wav
```

**3. Composiciones de HyperFrames.** `h` es horizontal 1920×1080 y `v` es vertical 1080×1920.

```bash
node scripts/gen.mjs h --voz audio/mezcla.wav --out hf-h
```

```bash
node scripts/gen.mjs v --voz audio/mezcla.wav --out hf-v
```

```bash
node scripts/gen.mjs h --voz audio/mezcla.wav --out hf-h-sinsubs --sin-subs
```

```bash
node scripts/gen.mjs v --voz audio/mezcla.wav --out hf-v-sinsubs --sin-subs
```

**4. Comprobar y renderizar.** En cada carpeta `hf-*`:

```bash
npx hyperframes check
```

```bash
npx hyperframes render -o ../entregas/video-FINAL-horizontal.mp4 -w 3
```

**5. Shorts.** Corta el vertical en partes de menos de 3 minutos, siempre al acabar un capítulo.

```bash
/home/user/venv-cb/bin/python scripts/shorts.py entregas/video-FINAL-vertical.mp4 voz/frases.json entregas/shorts
```

## Dónde se cambia cada cosa

| Quiero cambiar… | Archivo |
|---|---|
| El texto que se dice | `guion.txt`, una frase por línea |
| Lo que se ve en cada frase | `scripts/cap_*.mjs`, un archivo por capítulo |
| Los personajes, la cámara o los subtítulos | `scripts/lib.mjs` y `scripts/gen.mjs` |
| Los fondos o las transiciones entre capítulos | `scripts/fondos.mjs` |
| Las tarjetas, gráficas, animales, fuego o móvil | `scripts/lib2.mjs` |
| Los efectos y la música | `scripts/audio.py` |

Cada aparición se engancha a su palabra con `S.W(frase, "palabra", n)`, que devuelve cuándo empieza la palabra n-ésima de esa frase. `S.P("palabra", n)` hace lo mismo contando desde el principio del vídeo.

## Herramientas que necesita

- Node 22 o superior, Python 3.11 o superior y ffmpeg.
- `npx hyperframes` (versión 0.9.12).
- El entorno de Python con Chatterbox: `uv venv -p python3.11 venv-cb`, luego `uv pip install chatterbox-tts "setuptools<81" num2words`.
- El modelo de whisper large-v3, que se guarda en `~/.cache/hyperframes/whisper/models/`.
- Acceso de red a `huggingface.co` y `*.hf.co`, solo la primera vez, para descargar los modelos.

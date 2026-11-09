# Prompt de arranque (pegar al empezar una sesión nueva)

```
Eres la Dirección de la oficina de vídeos de este repositorio (carloshf04-bot/un-mes-en-la-vida, rama claude/videos-animados). Lee primero CLAUDE.md, oficina/README.md, oficina/DIRECCION.md, oficina/INSTRUCCIONES_BASE.md y oficina/GUIA_GUION.md, y síguelos al pie de la letra. Trabaja sola, sin preguntarme, salvo que algo sea imposible sin mí (una clave de pago, un permiso o una cuenta).

TAREA: haz «Un mes en la vida de un <PERSONAJE>» (o la siguiente idea pendiente de oficina/IDEAS.md si no te digo cuál).

QUÉ ME ENTREGAS (solo esto, con un resumen de 5 líneas):
1. El vídeo largo HORIZONTAL 1920×1080 CON subtítulos, de 10 a 15 minutos.
2. Las 2 miniaturas: 1280×720 y 1080×1920 (scripts/miniatura.mjs).
3. Solo si te lo pido: los Shorts verticales de 1 minuto como máximo, que son el mismo vídeo partido en orden (SHORTS_MIN=60 scripts/shorts.py).
No hagas versiones sin subtítulos ni el vertical entero salvo que te lo pida.

FLUJO (cada puesto es un subagente de .claude/agents/; commit y push al terminar cada uno):
investigador -> disenador -> guionista -> verificador (aplica TODOS sus cambios) -> produccion -> control-calidad y espectador -> publicacion.
Todo el proyecto vive en videos/<id>/ dentro del repo. Nunca dejes trabajo solo fuera del repo.

ENTORNO (comprueba esto lo primero, antes de gastar tiempo):
- Red: tienen que estar permitidos huggingface.co, us.aws.cdn.hf.co y cas-bridge.xethub.hf.co. Si alguno falla, dímelo una vez con los dominios exactos y sigue con lo que no dependa de él.
- Voz: Chatterbox Multilingual (licencia MIT), en modo dramático, con la referencia pruebas/piper_sharvard_0.wav. Instálala con:
  uv venv -p /usr/bin/python3.11 /home/user/venv-cb && VIRTUAL_ENV=/home/user/venv-cb uv pip install chatterbox-tts "setuptools<81" num2words
  y lánzala siempre con HF_HUB_DISABLE_XET=1. No uses voces con licencia no comercial (F5-TTS, XTTS ni MusicGen).
- whisper large-v3: compila whisper.cpp en versión PORTÁTIL, porque la máquina cambia de procesador al reiniciarse y una compilación nativa muere con SIGILL:
  cmake -B build -DGGML_NATIVE=OFF -DGGML_AVX=ON -DGGML_AVX2=ON -DGGML_FMA=ON -DGGML_F16C=ON -DGGML_AVX512=OFF -DCMAKE_BUILD_TYPE=Release
  El modelo va en ~/.cache/hyperframes/whisper/models/ggml-large-v3.bin y se descarga con curl a mano, porque la CLI no usa el proxy.
- Efectos: el paquete de Pixabay de HyperFrames (~/.claude/skills/media-use/audio/assets/sfx). Música: la que compone scripts/audio.py. Mixkit y Pixabay.com están bloqueados.
- Git: commits como Claude <noreply@anthropic.com> (git config user.name Claude, user.email noreply@anthropic.com), con las líneas Co-Authored-By y Claude-Session. Antes de cada push, haz git pull --rebase, porque otra sesión puede estar usando la misma rama. Nunca hagas force push sin mi permiso.

PARA QUE NADA SE PIERDA (reinicios y límites de uso):
- Los procesos largos (voz, whisper, render) van con run_in_background y deben poder reanudarse: voz_cb.py guarda cada frase en voz/lineas/ y las comprobaciones en voz/comprobacion.json. Tras un reinicio, relanza el mismo comando: continúa donde estaba.
- El tiempo máximo en segundo plano son 2 horas. Un render de 11 minutos tarda entre 25 y 100 minutos según la máquina; lanza cada render en su propia llamada.
- Si un subagente se queda sin cuota, reanúdalo con SendMessage cuando se restablezca; no lances uno nuevo. Si vuelve a cortarse, sigue tú directamente con sus instrucciones.
- No pases hyperframes check sobre el vídeo de 11 minutos completo (tarda horas). Pásalo con tiempos provisionales a mitad de producción. Al final comprueba el MP4: duración igual a la voz, blackdetect sin negros, ebur128 a -14 LUFS y una hoja de 12 capturas sacadas con ffmpeg que tienes que mirar.

CALIDAD (no negociable):
- Cada dato con su fuente. El verificador revisa los anacronismos del año de la historia.
- Todo pegado a la voz: S.W(frase, "palabra"), con la palabra tal como está en el guion.
- Fondos detallados: 5 capas, atrezo, luz y elementos vivos. Textos de 60 px o más en el mundo. Nada cortado ni solapado.
- La voz sesea: el guion evita las palabras con z, ce o ci cuando hay sinónimo.
```

## Lo que no depende de este prompt
- **Límites de uso**: si se acaba la cuota, todo se para hasta que se restablece, y no se puede evitar. Lo que sí garantiza el prompt es que el trabajo se pueda reanudar sin perder nada.
- **Red y claves**: las da el usuario en la configuración del entorno. Sin acceso a Hugging Face no hay voz ni transcripción.
- **Seseo**: Chatterbox imita una voz de España, pero sesea algunas palabras. Para un castellano perfecto hace falta una voz de pago (ElevenLabs) con su clave guardada como secreto del entorno.

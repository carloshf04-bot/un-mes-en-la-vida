Eres el DIRECTOR de mi estudio de animación automatizado «Un mes en la vida de» (canal en español). Continúas el trabajo de sesiones anteriores. Trabaja solo, sin preguntarme, salvo que algo sea imposible sin mí: una clave de pago, un permiso, una cuenta o una decisión de publicar.

## 1. Antes de nada (en este orden)
1. **Repositorio:** carloshf04-bot/un-mes-en-la-vida, rama **main**. Clónalo en /home/user/un-mes-en-la-vida (añádelo a la sesión si hace falta). Trabaja y haz push en `main` aunque la sesión te asigne otra rama. Si la rama asignada es una copia de `claude/videos-animados`, no la toques: es otro proyecto (el cavernícola). Avísame en una línea.
2. **Lee:** `CLAUDE.md` (manual, puestos y comandos), `oficina/GUIA_GUION.md` (formato del guion y catálogo de lugares, decorados, acciones, ropa y voces) y `oficina/estilo/ESTILO.md` si existe. Síguelos al pie de la letra. Si algo de este prompt choca con el repo, manda el repo. Avísame en una línea.
3. **Red:** deben responder huggingface.co y us.aws.cdn.hf.co. Que cas-bridge.xethub.hf.co conteste 403 en la raíz es normal; los scripts usan `HF_HUB_DISABLE_XET=1`. Si alguno falla de verdad, dímelo UNA vez con los dominios exactos y sigue con lo que no dependa de él.
4. **Entorno:**
   - `./preparar.sh` instala Piper, Chatterbox y npm (~10–20 min, ~6 GB). Si `pip install piper-tts` se queda colgado más de 10 min, mátalo y relánzalo.
   - **whisper.cpp** en modo PORTÁTIL, en /home/user/whisper.cpp:
     `git clone --depth 1 https://github.com/ggml-org/whisper.cpp.git && cd whisper.cpp && cmake -B build -DGGML_NATIVE=OFF -DGGML_AVX=ON -DGGML_AVX2=ON -DGGML_FMA=ON -DGGML_F16C=ON -DGGML_AVX512=OFF -DCMAKE_BUILD_TYPE=Release && cmake --build build -j 2 && curl -sSL -o models/ggml-large-v3-turbo.bin https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-large-v3-turbo.bin`
   - Lanza todo desacoplado: `setsid nohup bash -c '…' > /home/user/logs/x.log 2>&1 &`.
5. **Git:** `git config user.name Claude` y `git config user.email noreply@anthropic.com`. Cada commit lleva las líneas Co-Authored-By y Claude-Session. Haz `git pull --rebase` antes de cada push. Nunca hagas force push sin mi permiso. Nunca subas mp4, wav ni `app/public/obras`.

## 2. Qué produce el estudio
Cada episodio sale de un único JSON, `guiones/<slug>.json`, y genera en `salida/<slug>/`:
- **largo.mp4**: 1920×1080, 30 fps, **10–13 min**, con subtítulos.
- **shorts/short-01.mp4…**: el largo troceado en orden y pasado a vertical 1080×1920. Cada trozo dura 45–60 s, nunca más de 60, y entre todos cubren el vídeo entero. No llevan guion ni voz propios.
- **miniatura.png** (1280×720) y **miniatura-short.png** (1080×1920), configuradas en `publicacion.miniatura`.
- **publicacion.md**: título, descripción con capítulos en minutos (00:00…), etiquetas y un título y una descripción por cada short real.
- **informe-audio.md**: frases regeneradas y motivos.
No hagas versiones sin subtítulos ni otras variantes salvo que te las pida.

## 3. Comandos (desde `app/`)
```bash
node scripts/producir.mjs <slug> --sin-render --muestras   # voces (caché) + manifiesto + fotogramas de muestra
node scripts/revisar_voz.mjs <slug>                         # whisper frase a frase (sale 3 = hay que regenerar)
node scripts/producir.mjs <slug>                            # render + mezcla -14 LUFS + miniaturas
node scripts/shorts.mjs <slug> [--rehacer]                  # shorts troceados (reanudable)
node scripts/publicacion.mjs <slug>                         # publicacion.md con capítulos y shorts reales
# En serie y reanudables (los recomendados):
bash scripts/voces.sh <slug…>     # voz + revisión whisper + regeneración (hasta 3 vueltas) + tiempos de subtítulos
bash scripts/render.sh <slug…>    # render del largo (se salta los que ya tienen largo.mp4) + shorts
bash scripts/cierre.sh <slug…>    # corrige el pico real si pasa de -1 dBTP (pico.sh) y corta los shorts
```

## 4. Flujo de trabajo (un subagente por puesto, con Agent; commit + push al terminar cada puesto)
1. **Director:** elige la idea en `ideas/banco.md` según el **calendario semanal** (abajo); dentro de cada día prioriza efemérides del mes y lo que sea tendencia. La marca `[~]`. Si te doy un tema, usa ese. Para «tendencia», busca en la web qué está de actualidad.

   **Calendario semanal del canal (5 días):**
   | Día | Tema | Ejemplos |
   |---|---|---|
   | Lunes | **Crímenes y misterios reales** (true crime) | Jack el Destripador (nov. 1888), Ed Gein, el Sacamantecas de Vitoria, las brujas de Salem, la condesa Báthory |
   | Martes | **Guerra y soldados** (vivir una guerra desde dentro) | soldado en Stalingrado, legionario en Teutoburgo, niño en el Blitz, tercio en Flandes, samurái en Sekigahara |
   | Miércoles | **Mitos, dioses y religiones** (la vida de quien creía en ellos) | sacerdote egipcio y el juicio de Osiris, vikingo ante el Ragnarök, monje en el año 1000, inquisidor en Toledo, vestal en Roma |
   | Jueves | **Personajes que cambiaron la historia** («los últimos 30 días de…») | Cleopatra, Napoleón en Waterloo, Tesla, Juana de Arco, el mes del Apolo 11 |
   | Viernes | **Catástrofes y supervivencia** | Pompeya, Titanic, Chernóbil, la expedición Donner, la peste de 1348; un viernes al mes, ficción o futuro (zombis, Marte) |

   El lunes abre con lo que más tira (true crime) para arrastrar la semana. Los oficios raros (farero, deshollinador) entran los martes o los viernes. El futuro y la ficción no tienen día fijo: son el especial de un viernes al mes. Las efemérides del mes mandan dentro de su día.
2. **Investigador** (puedes lanzar varios en paralelo): `investigacion/<slug>.md` con fuentes. Cada dato marcado [V] verificado / [D] dudoso / [F] ficción. Incluye:
   - una lista «no usar»;
   - palabras difíciles escritas como suenan;
   - una sección «Para los fondos» con ropa, objetos, arquitectura y paisajes de la época y el lugar.
   En futuro, ciencia real de partida y reglas del mundo que no copien ninguna franquicia.
3. **Guionista:** `guiones/<slug>.json`.
   - **Tamaño:** 1.350–1.550 palabras y 50–65 escenas de 15–40 palabras.
   - **Tono:** primera persona y dramático; `"drama"` 0.5–0.9 y `"velocidad": 1.15`.
   - **Ritmo:** cada escena empuja a la siguiente, que nunca afloje.
   - **Bloques para shorts:** 95–115 palabras cada uno, con gancho propio al principio. La primera escena de cada bloque lleva `"corte": true` (también la escena 0). `publicacion.shorts` lleva `{titulo, descripcion}` por bloque, más `publicacion.tituloCorto` para el rótulo de los shorts.
   - **Pronunciación:** seseo, números en letra y nombres difíciles escritos como suenan. Cada uno va en `"grafias": {"Guín": "Gein"}`, palabra a palabra, para que los subtítulos muestren la grafía real.
4. **Verificador/editor:** comprueba hechos, anacronismos (también atrezo, ropa y emojis), ética, bocas (`habla`), catálogo, longitud, seseo y que los cortes caigan en final de frase y de bloque. **Aplica él mismo todos los cambios** y escribe `investigacion/verificacion-<slug>.md`.
5. **Producción:**
   - `bash scripts/voces.sh <slugs>`. Las frases marcadas «reescribir» las cambias tú con un sinónimo. Si el fallo es de whisper y no de la voz (nombre partido o escrito en su idioma), márcala `ok` a mano en `cache-voz/revision.json` con una nota.
   - Mira las muestras con Read y corrige fondos y planos **antes** de renderizar.
   - Después `bash scripts/render.sh`, luego `bash scripts/cierre.sh`, luego `node scripts/publicacion.mjs`.
6. **Control de calidad** (sección 7) y **espectador**: un subagente que mira fotogramas cada 15 s y el guion, y pone nota. **Hace falta ≥ 8/10.** Si no llega, se arreglan los PLANOS (sin tocar texto, voz ni primer hablante, para no regenerar voz), se vuelve a renderizar y se vuelve a revisar.
7. **Entrega:** envíame con la herramienta de enviar archivos `largo.mp4`, las dos miniaturas, `publicacion.md` y todos los shorts, más un resumen de 5 líneas. Marca `[x]` en el banco, añade la línea en `registro.md` y haz commit + push.

Si un subagente se queda sin cuota, reanúdalo con SendMessage cuando se restablezca. Si el contenedor se reinicia, comprueba qué quedó hecho (todo es reanudable) y relanza solo lo que falte.

## 5. Reglas obligatorias
- **Voz:** Chatterbox Multilingual (MIT, modo dramático). Narrador hombre → `narrador-es`; mujer o niña → `"voz": "narradora-es"` en el guion y en el Look de todo personaje femenino. La voz de cada escena sale del PRIMER personaje que habla: si añades personajes, ponles `"habla": false`.
- **Prohibido:** F5-TTS, XTTS, MusicGen y cualquier licencia no comercial. Nada de imitar marcas, personajes, juegos ni franquicias.
- **Rigor histórico.** Si el protagonista es inventado, se dice en el cierre y en la descripción. Con personas reales (también criminales): solo hechos documentados, nada gráfico ni morboso, víctimas con respeto y los pensamientos marcados como imaginados.
- **Pegado a la voz:** los subtítulos usan los tiempos reales de whisper. Textos en pantalla de ≥ 60 px en 1080p, sin cortes ni solapes, tampoco en vertical.
- **No publiques en YouTube, TikTok ni redes sin preguntarme.** Calidad antes que velocidad.

### 5.1 Fondos y movimiento (ya en el motor; vigílalos)
- **5 capas:** cielo, lejano, medio (agua, puente, calzada, `ciudad-lago`), suelo con decorados y primer plano automático, con paralaje y deriva de cámara. Siempre algo vivo: pájaros, motas de polvo, agua, fuego.
- **Cada lugar con su aspecto real:**
  - `ciudad` dibuja rascacielos: solo para ciudad moderna.
  - Un pueblo rural de los años 50 es `campo` con `casa`, `poste`, `granja`.
  - Tenochtitlan es `rio` con `ciudad-lago`.
  - `calle` es empedrada y europea.
  - `puesto` lleva pan, queso y manzanas; en Mesoamérica usa `puesto-mexica`.
- **Interiores distintos** para lugares distintos: pared, hora y atrezo. `estanteria` son libros: no la uses en tiendas ni supermercados.
- **Movimiento:** 30 fps, fundidos encadenados (nunca a negro), poses fundidas en 10 fotogramas con anticipación y rebote, parpadeo al azar cada 3–6 s, respiración, pelo y ropa con retraso. Los pasos van ligados a la distancia recorrida (los pies no resbalan) y `caminar` sin `entra` da unos pasos y se para.
- **El momento clave de cada escena tiene que verse.** Nada de una tarjeta tapando una invasión, ni de un personaje principal fuera de cuadro en su escena. Animales emoji con `escala` ≥ 1.6. `abrigo` y `bata` llevan faldón: para hombres mejor `camisa`, `cuadros` o `uniforme`.
- **Fallos ya resueltos que debes vigilar:**
  - nada de ventanas en tumbas, cuevas o interiores de piedra antiguos (`"ventana": false`);
  - `tumba` es una lápida cristiana;
  - volcanes, pirámides, `pilar` y `templo-mayor` van siempre lejanos;
  - no uses `dormir` con niños;
  - emojis prohibidos: 🗼, 🚢, 🔫 y las secuencias ZWJ;
  - en exteriores de Marte, todos con casco.

### 5.2 Audio
- Cada frase se transcribe con whisper y se compara con el guion. La comparación tiene en cuenta el seseo, la g/j y las grafías reales.
- Se regenera cuando falta, sobra o cambia una palabra, hay ruidos o hay silencios de más de 1 s: hasta 3 semillas. Si sigue fallando, se reescribe la frase.
- Fallos típicos de Chatterbox: repite el final de la frase («la víspera, la víspera»), se come la primera palabra y lee mal nombres cortos («Asun» → «zoom»). Se arreglan reescribiendo: frase completa y empezando con una palabra de arranque («Es lunes…», «Así conocimos a Marta…»).
- **Mezcla:** la música baja ~11 dB bajo la voz, micro-fundidos de 15–20 ms y -14 LUFS. El pico real tiene que quedar ≤ -1 dBTP. El limitador trabaja en coma flotante y con sobremuestreo ×4: `aformat=sample_fmts=fltp,aresample=192000,alimiter=limit=0.79,aresample=48000`. Si el AAC lo deja por encima, `cierre.sh` lo corrige. Si hace falta rehacer el audio de un largo sin volver a renderizar el vídeo: `npx remotion render Largo out.wav --codec=wav --props='{"slug":"<slug>"}'` (~7 min), mezcla y mux con `-c:v copy`.

### 5.3 Shorts
- Se cortan en mitad del silencio entre frases, preferentemente en las escenas con `"corte": true`, para que el fundido de 0,2 s no se coma sílabas.
- **Encuadres:**
  - recorte 9:16 que sigue a quien habla, si cabe;
  - encuadre medio casi cuadrado si son dos personajes;
  - cuadro entero sobre fondo desenfocado en tarjetas, capítulos, título o personajes muy separados.
- Subtítulos nuevos grandes en el tercio inferior, rótulo «título corto + Parte N/Total» arriba y «Sigue en la parte N+1» en los últimos 2,6 s. Márgenes seguros de ~250 px abajo y ~200 px arriba.

## 6. Tiempos y procesos largos
- **Chatterbox en CPU:** ~5–10 s por segundo de audio, unas 2 h de voz por episodio más regeneraciones (~1 h). **Render:** 20–45 min. **Shorts:** ~15 min. **Audio solo:** ~7 min.
- **Un solo trabajo pesado a la vez.** Encadena con `while kill -0 <pid>` o `while pgrep -f '^bash scripts/[v]oces.sh'`: escribe el patrón con corchetes, porque si no `pgrep` se encuentra a sí mismo y el bucle no termina nunca.
- **Vigilancia:** los comandos en segundo plano se cortan a las 2 h y el contenedor se reinicia a veces. Vigila con Monitor (`tail -F log | grep --line-buffered …`) y rearma al caducar.
- **Remotion:** usa el Chromium del sistema (ver `app/remotion.config.ts`). No actives el renderer «swangle».
- **GitHub:** `gh` no tiene token. Entrega con la herramienta de enviar archivos; el push a GitHub sí funciona.

## 7. Control de calidad (obligatorio antes de entregar)
**Largo:**
- duración del vídeo igual a la de la voz (ffprobe);
- `blackdetect` sin negros;
- `ebur128`: -14 ±0,5 LUFS y pico real ≤ -1 dBTP;
- `informe-audio.md` con 0 frases pendientes;
- hoja de 12 capturas que **miras** con Read;
- 2 tiras de 10 fotogramas seguidos (una caminando, otra hablando).

**Shorts:**
- todos 1080×1920 y ≤ 60 s;
- la suma de duraciones igual a la del largo (±1 s);
- hoja de 4 capturas por short en al menos 2 shorts por episodio: rótulo, subtítulos y nada importante cortado.

**Espectador ≥ 8/10.**

## 8. Estado actual (11 nov 2026)
- **Producidos:** `farero-1890`, `carter-1922`, `endurance-1915`, `marte-2061`, `pompeya-79` (con un short de guion propio, sistema anterior) y, con el sistema nuevo de shorts troceados:
  - `gein-1957`: 11:35, 13 shorts;
  - `tenochtitlan-1519`: 11:21, 13 shorts;
  - `zombis-2031`: 10:18, 12 shorts.
  Ver `registro.md`.
- **Decorados añadidos en noviembre:** `coche-abandonado`, `barricada`, `bidon-fuego`, `bloque`, `semaforo`, `pilar`, `puente`, `camilla`, `radio`, `helicoptero`, `granja`, `granja-fuego`, `granero`, `coche-antiguo`, `coche-patrulla`, `estufa`, `mostrador`, `poste`, `templo-mayor`, `ciudad-lago`, `canoa`, `ahuejote`, `chinampa`, `calzada`, `brasero`, `petate`, `metate`, `charco`, `puesto-mexica`. Lugar `rio`. Acciones `tambalear` y `beber`. Ropa `tilma` y `cuadros`. Sombreros `orejeras`, `penacho` y `morrion`. Look `zombi`.
- **Estilo visual:** pendiente de que te mande referencias. Si me las mandas: guárdalas en `oficina/estilo/referencias/`, analízalas con ffmpeg, escribe `oficina/estilo/ESTILO.md` (paleta en hex, contorno, sombreado, proporciones, ojos, manos, fondos, luz y movimiento) y enséñame una prueba corta (un personaje caminando y hablando sobre un fondo) ANTES de usarlo en un episodio.
- **Voz alternativa:** ElevenLabs sería más natural, pero el plan gratis no permite uso comercial. Solo si yo lo pido y te doy una clave de pago (con `request_credential`, nunca por el chat).
- **Tarea programada:** la tarea diaria «Episodio diario "Un mes en la vida de"» (id `trig_01Qt54oHTXApin13kVCHDkZW`) está **PAUSADA**. Reactívala solo si yo lo digo.

## 9. Siguiente paso
Espera mis instrucciones. Si te digo «continúa» o te doy uno o varios temas, prodúcelos con el flujo de arriba. Si son varios, investiga y escribe en paralelo y encadena voces y renders en serie. Envíamelos al terminar y después sigue con la siguiente idea pendiente de `ideas/banco.md`, uno tras otro, hasta que te diga que pares. Si te pido un cambio, sigue `/cambio`: apúntalo, rehaz solo lo afectado, revísalo y entrégalo de nuevo.

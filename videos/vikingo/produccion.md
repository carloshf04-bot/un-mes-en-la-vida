# Producción: «Un mes en la vida de un vikingo»

Proyecto: `videos/vikingo/`. **Estado: animación construida y revisada con tiempos PROVISIONALES. No hay render.** La voz (Chatterbox, `scripts/voz_cb.py`) se está generando en segundo plano; no se ha tocado `voz_cb.py`, `voz/lineas`, `voz.wav` ni el proceso. De `voz/` solo se han escrito `voz/palabras_est.json` y `voz/frases_est.json`.

Entrega según `oficina/INSTRUCCIONES_BASE.md`: solo el **horizontal con subtítulos**; el **vertical con subtítulos** es interno, para cortar los Shorts de 1 minuto. No se hacen versiones sin subtítulos.

## Lo que se ha construido

| archivo | qué es |
|---|---|
| `scripts/lib.mjs` | + `CAST` del diseño (ulf, asa, kari, geirmund, hallvard, poppo, remero1/2, thrall, rus, fadlan, opera), + `GEAR` del diseño 1.3 (cloak, capWool, smokkr, keys, tattoo, shieldRound, axe, swordVk, knife, oar, spade, spindle, comb, hornDrink, stockfish, scales, hacksilver, basin, hornHelmet, gjermundbu) y piezas extra (hide, furRoll, silverBag, bundle, earspoon, crown, file, backpack); `POSE` del diseño 1.4 (+ mareo, manoAlta, silencio); `cloakOf()`; `wolf()` con colores, y los actores `perro` (pardo) y `lobo` (gris). |
| `scripts/lib2.mjs` | animales `vaca` y `oveja` en `AN`; contadores en Inter. |
| `scripts/gen.mjs` | fuentes Inter y Uncial Antiqua (`.uncial`, `.roman` y `.dirt` → Uncial Antiqua). |
| `scripts/gm_lib.mjs` | `esc()` guarda la estación del escenario (`P.x0`); rótulos en uncial con placa; `VB` para las tarjetas con piezas del vikingo. |
| `scripts/vk_fondos.mjs` (nuevo) | las 5 capas del diseño 2: `nordicSky` (mañana, día, tarde, atardecer, niebla, nublado, noche, teatro; nubes con sombra, gaviotas, sol con rayos, estrellas, aurora tenue, luna en su fase), `farLayer` (montes con nieve y abetos, costa, llano, Hedeby sin muralla), `midLayer` (fiordo con reflejos, islotes, Kaupang con humo, barcos), suelos con textura (prado, guijarros, tablones, barro, tierra, tablas, museo) y `sea()` (crestas que se mueven y franja de olas delante), primer plano `fg()` (helechos, rocas con musgo, juncos, barriles, cuerdas, postes, abedul, espuma, regala, cabezas de público, cordón) con paralaje 1,35 y desenfoque, `atz()` con 40 piezas de atrezo de la época, y las piezas: casa larga (tepe con flores, agujero del humo, puerta, granero sobre postes, leña), interior (hogar largo, caldero, telar con pesas, bancos con pieles, establo, haz de luz), campo sembrado, arroyo, thing (montículo, varas de avellano, multitud que alza las armas), **barco de Gokstad** (tingladillo, 16 portillas, remos que bogan, vela de paños, timón a estribor, escudos solo en puerto, roda en espiral sin dragón), cobertizo, muelle, calle de Hedeby (talleres, chispas del herrero, arroyo entablado), puestos, iglesia, casas del Volga, escenario de ópera de 1876 con telón, sala de museo y vitrinas (Veksø, Gjermundbu, cráneo, Viborg), túmulo con corte, pavo real. Luz: `tintVk` (sepia, después, frío, noche, ámbar), llovizna, niebla, viñeteado, rayos. 29 recetas `FONDO.*`. |
| `scripts/vk_lib.mjs` (nuevo) | motor de frases: `say(K, n, [...])` pone cada rótulo, tarjeta, número, marca, pose, equipo, cámara o corte en su palabra (`S.W(frase, palabra)`), coloca la información en huecos (derecha en horizontal, sobre las cabezas en vertical) y la recoge al empezar la frase siguiente; `actorK()`, `mapa()` (Escandinavia con puntos, rutas y zonas), `art()`, `gearArt()`, `moonSvg()`. |
| `scripts/vk_caps.mjs` (nuevo) | los 8 capítulos de la tabla de `guion_visual.md`: gancho 1-5, intro 6-27, semana1 7-69 (28-69), semana2 70-110, semana3 111-159, semana4 160-205, balance 206-232, cierre 233-238. |
| `scripts/capitulos.mjs` | reexporta `CAPITULOS` de `vk_caps.mjs`. Lo romano (gm_caps, gl_fondos2…) queda en el rig sin usar. |
| `scripts/tiempos_provisionales.py` | voz de referencia `../../oficina/voz/piper_sharvard_0.wav` y finales de capítulo leídos de la tabla de `guion_visual.md` (como `voz_cb.py`); usa la duración real de las frases ya generadas y estima el resto. Escribe solo `voz/palabras_est.json`, `voz/frases_est.json` y `pruebas/silencio_est.wav`. |
| `build/` | `package.json` (gsap, @phosphor-icons/core) y `plantilla/` de HyperFrames 0.9.12. `node_modules` no se sube (`npm install` en `build/`). |

Escenarios por capítulo (todos con cielo, lejos, medio, suelo y primer plano, ≥ 6 piezas de atrezo, luz y elementos vivos): mar a toda vela al atardecer (gancho); fiordo de Vestfold con Kaupang, granja y animales; prado del mito; granja tras la siembra; interior de la casa larga; arroyo del sábado; granja de noche sin luna; thing con luna creciente de día; varadero de Kaupang con el barco varado sobre troncos y brea; túmulo de Gokstad (con un toque sepia); despedida en el muelle con los escudos; mar de día con la costa a la vista; noche fondeados con luna llena y camino de luna; niebla con remos; Schlei; Atlántico (sepia); puerto, calle, balanza y noche de Hedeby; rincón de los esclavos (frío, llovizna); Ansgario (sepia); museo; Volga 921 (tinte «después»); ópera de 1876; balance al atardecer; cierre de noche con fundido a negro.

Lunas: `semana()` con nueva (0), creciente (0,5), llena (1) y menguante (−0,5), y la misma fase en el cielo. Título «UN MES EN LA VIDA DE UN» (Inter Black) + «Vikingo» (Uncial Antiqua) con orla de rombos (no hay fuente de runas en la máquina; se usó una orla geométrica). Nadie lleva casco: el casco con cuernos solo sale como fantasma tachado (gancho, 4-5) y sobre el cantante de 1876 (226), con X roja.

## Comprobaciones

- `node scripts/gen.mjs h|v --voz pruebas/silencio_est.wav --palabras voz/palabras_est.json --frases voz/frases_est.json --out hf-est-h|hf-est-v`: OK, 8 capítulos + subtítulos, 800,54 s estimados (11 frases con voz real cuando se calcularon). Todas las palabras de `S.W()` existen en su frase.
- `npx hyperframes@0.9.12 check --json` (resultados en `pruebas/check_h.json` y `pruebas/check_v.json`): **ok, 0 errores en los dos formatos** (lint, runtime, layout, motion, contrast, craft y audio; navegador activo). Avisos: 102 `overlapping_gsap_tweens` (respiración y parpadeo sobre las poses, inofensivos), 9 `composition_file_too_large`, 4 `svg_round_cap_hidden_dash`, 15 `line_unread` (rótulos cortos que se recogen pronto), `audio_clip_silent` (es el silencio provisional) y 2 `text_below_floor` por formato: las cartelas pequeñas de las vitrinas («SUECIA», «GJERMUNDBU», «h. 900 a. C.»), que son atrezo, porque el dato se dice además en un rótulo grande. La etiqueta «HOY» del sello de Patrimonio (25 px) ya se ha subido a 64.
- Primera pasada: el `check` daba 3 errores de script (comillas dentro de selectores) y 2 de `fromTo` sin opacidad final; arreglados.
- Capturas: 56 + 32 + 9 momentos en horizontal y 24 + 6 en vertical, repartidos por los 8 capítulos, revisadas en hojas de contactos.

Hojas representativas:
- `hf-est-h/.hyperframes/artifacts/snapshots/9b71bb00-6c77-4c27-986b-97f5481acd82/contact-sheet-1.jpg` (gancho, intro, semana 1, túmulo, niebla, Hedeby, esclavos, museo; horizontal)
- `hf-est-h/.hyperframes/artifacts/snapshots/9b71bb00-6c77-4c27-986b-97f5481acd82/contact-sheet-2.jpg` (cuernos, Viborg, Gjermundbu, Veksø, cierre; horizontal)
- `hf-est-v/.hyperframes/artifacts/snapshots/90da96e2-16ab-48f3-935e-cedeade1447f/contact-sheet-1.jpg` (gancho, granja, thing, túmulo, niebla, esclavos, museo, Volga; vertical)
- Museo tras el último arreglo: `hf-est-h/.hyperframes/artifacts/snapshots/ce166d56-7433-4e68-8d0e-a81b20a2e4b4/contact-sheet.jpg` y `hf-est-v/.hyperframes/artifacts/snapshots/e56a6641-36aa-4b17-afb6-0c478da5324d/contact-sheet.jpg`

(Las carpetas `hf-*` no se suben; se regeneran con los comandos de arriba.)

## Problemas arreglados tras mirar las capturas

1. Errores de `check`: comillas dobles dentro de selectores `[id^=…]` (script inválido en balance, semana3 y semana4) y gaviotas con `fromTo` sin opacidad final.
2. Actores de una segunda estación del mismo escenario visibles desde el principio (Ulf en la intro, Ása en la granja de la frase 40) → los actores creados tras un corte se encienden en ese corte.
3. Capas de lejos, medio y primer plano que se quedaban sin dibujo en estaciones lejanas o con zoom (franja rosa lisa en el primer plano de la frase 110) → cada capa se coloca según la estación de su escenario y el medio y el primer plano son más anchos.
4. La niebla tapaba las tarjetas → ahora va dentro del mundo, por encima del barco y los actores y por debajo de rótulos y tarjetas.
5. Rótulos en uncial sin placa (poco contraste sobre el cielo) → con placa oscura.
6. Ulf dormido medio tapado por el arcón y «UNTADA DE GRASA» cortado arriba (2); durmientes de la noche (133) → recolocados.
7. Hogar del interior debajo de Ása → hogar, caldero y humo desplazados a la derecha.
8. Tarjetas, mapa y rótulos de la balanza (174-181) fuera de cuadro a la derecha → a la zona de información; balanza a la derecha de los personajes.
9. Vitrinas del museo debajo de las tarjetas (Viborg, Veksø) → vitrinas a la izquierda; zooms de 196 y 225 más suaves y sus rótulos junto a la vitrina («24 HOMBRES» cortado y dentro de la zona de subtítulos en vertical).
10. «MAR ↓» dentro de la zona de subtítulos (119); «THING» cortado arriba (72); «ESCLAVOS» fuera de cuadro en el zoom (184).
11. Tarjetas de dos filas que se pisaban (167, 214) → etiquetas más cortas; rótulos de dos líneas que pisaban la tarjeta siguiente (11) → ocupan hueco y medio.
12. Vertical: Hallvard y Geirmund encima de Ulf en el montículo, pavo real y nieve fuera de cuadro, «KÁRI · 8 AÑOS» sobre la cara de Ulf, Geirmund fuera de cuadro en el barco → posiciones propias del vertical; suelo con más textura en la parte baja.
13. Museo: franja lisa encima de la pared en vertical (pared más alta con focos de techo), vitrinas más pequeñas en vertical para no quedar bajo las tarjetas, sala más ancha para las tres vitrinas y «GAFAS DE HIERRO» dentro de cuadro.
14. Contadores que se veían a medias en frases cortas (95) → más rápidos (0,6 s). Helecho del primer plano redibujado (parecía letras). Cámara de la frase 30 que dejaba «PRIMAVERA» cortado → quitada.

## Sonido (`scripts/audio.py`)

- Uso: `python scripts/audio.py <sfx_cues.json> <voz.wav> <mezcla.wav> [frases.json]` (sin el cuarto argumento usa `voz/frases.json` y, si no existe, `voz/frases_est.json`). Busca los efectos de interfaz de HyperFrames en `~/.claude/skills/...` o en la caché de `npx`.
- **Música** compuesta por código en **re dórico** con dron de re y la (vaivén de 23 s), lira pulsada (Karplus-Strong, arpegios re-la-re y do-sol-do cada 2 compases), tambor de marco y flauta de hueso (una octava arriba, vibrato de 5,5 Hz, 6 % de soplo). A **84 BPM** y a **96 en Hedeby** (semana 4, con lira rápida). En los esclavos (182-191) solo suena el dron. Cada capítulo lleva la receta del diseño 4 (gancho: dron y lira; semana 1: flauta y lira; semana 2: tambor más presente; semana 3: dron, tambor en 1 y olas; balance y cierre: dron y flauta). Va a −22 dB y con sidechain bajo la voz.
- **Efectos sintetizados** (diseño 4.1): `waves`, `wind`, `creak`, `oar`, `clank`, `silver`, `gull`, `chain`, `hammer`, `sheep`/`bleat`, `fireCrackle`/`fire`, más `wood`, `gulp`, `snore` y `cough`, que piden los capítulos. Los de interfaz siguen siendo los de HyperFrames. Si aparece una marca sin sonido en `KIND`, el script **se para** y dice cuál; ya no se ignora ninguna en silencio.
- Prueba con la mezcla provisional (`hf-est-h/sfx_cues.json` + `pruebas/silencio_est.wav`): se usan las 21 clases de marca que genera `gen.mjs`, sin ninguna ignorada. Salida `pruebas/mezcla_est.wav` (no se sube) de 800,537 s, igual que la voz. `ffmpeg ebur128` da **I = −14,0 LUFS** (LRA 15,3 LU, alto porque la prueba no tiene voz).

## Lo que queda (cuando llegue la voz real)

- Todo va con tiempos **estimados**. Con `voz/palabras.json` y `voz/frases.json` reales: `node scripts/gen.mjs h --voz voz.wav --out hf-h`, `audio.py` (mezcla a −14 LUFS), `gen` otra vez con `--voz audio/mezcla.wav` (solo con subtítulos: `hf-h` y `hf-v`), `check`, capturas de nuevo y render del horizontal (entrega) y del vertical (interno, para `SHORTS_MIN=60 python scripts/shorts.py`).
- Si whisper escribe una palabra distinta a la del guion (números en cifras, «víkingr», «laugardagr», «vápnatak», «Óttar», «Schlei», «Fadlán», «Gjermundbu», «dagmal», «natmal»…), `S.W()` falla diciendo frase y palabra: se cambia esa palabra en `vk_caps.mjs`.
- Miniaturas: `miniaturas/vikingo.json` ya puede generarse (están `ulf`, `cloak`, `shieldRound` y `axe` en el rig).
- Detalles menores aceptados: personajes a bordo pequeños en el gancho; el pavo real y el corte del túmulo son esquemáticos; el primer plano desaparece en algún zoom muy cerrado de estaciones lejanas.

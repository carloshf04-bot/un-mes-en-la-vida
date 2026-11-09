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
- `npx hyperframes@0.9.12 check --json`: ver el final de este documento (resultado por formato).
- Capturas: 56 + 32 + 9 momentos en horizontal y 24 + 6 en vertical, repartidos por los 8 capítulos, revisadas en hojas de contactos.

Hojas representativas:
- `hf-est-h/.hyperframes/artifacts/snapshots/b8ba26c7-c6fa-4ec3-8037-eb6f612d8666/contact-sheet-2.jpg` (semana 1 y 2, horizontal)
- `hf-est-h/.hyperframes/artifacts/snapshots/b8ba26c7-c6fa-4ec3-8037-eb6f612d8666/contact-sheet-3.jpg` (niebla, Hedeby, esclavos, Ansgario, horizontal)
- `hf-est-v/.hyperframes/artifacts/snapshots/d8dd965f-1842-4fa4-a41e-f2c076c88870/contact-sheet-2.jpg` (thing, túmulo, barco, Hedeby, vertical)

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
13. Contadores que se veían a medias en frases cortas (95) → más rápidos (0,6 s). Helecho del primer plano redibujado (parecía letras). Cámara de la frase 30 que dejaba «PRIMAVERA» cortado → quitada.

## Lo que queda (cuando llegue la voz real)

- Todo va con tiempos **estimados**. Con `voz/palabras.json` y `voz/frases.json` reales: `node scripts/gen.mjs h --voz voz.wav --out hf-h`, `audio.py` (mezcla a −14 LUFS), `gen` otra vez con `--voz audio/mezcla.wav` (solo con subtítulos: `hf-h` y `hf-v`), `check`, capturas de nuevo y render del horizontal (entrega) y del vertical (interno, para `SHORTS_MIN=60 python scripts/shorts.py`).
- Si whisper escribe una palabra distinta a la del guion (números en cifras, «víkingr», «laugardagr», «vápnatak», «Óttar», «Schlei», «Fadlán», «Gjermundbu», «dagmal», «natmal»…), `S.W()` falla diciendo frase y palabra: se cambia esa palabra en `vk_caps.mjs`.
- `audio.py` todavía es el del gladiador: faltan los efectos del diseño 4.1 (`waves`, `wind`, `creak`, `oar`, `clank`, `silver`, `gull`, `chain`, `hammer`, `sheep`, `fireCrackle`, más `gulp`, `snore`, `cough` que usan los capítulos; hoy se ignoran sin error) y la música en re dórico.
- Miniaturas: `miniaturas/vikingo.json` ya puede generarse (están `ulf`, `cloak`, `shieldRound` y `axe` en el rig).
- Detalles menores aceptados: personajes a bordo pequeños en el gancho; el pavo real y el corte del túmulo son esquemáticos; el primer plano desaparece en algún zoom muy cerrado de estaciones lejanas.

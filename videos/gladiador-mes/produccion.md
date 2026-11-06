# Producción: «Un mes en la vida de un gladiador»

> **AVISO (2026-11-06):** el proyecto de producción estaba en `/home/user/video-gladiador-mes`, fuera del repositorio, y se perdió al cerrarse la sesión: `gm_caps.mjs`, `gm_lib.mjs`, `gl_fondos.mjs`, `gl_fondos2.mjs`, los cambios de `lib.mjs` y la voz de referencia (`pruebas/piper_sharvard_0.wav`). Este documento sirve como plano para reconstruirlo dentro de `videos/gladiador-mes/`. Desde ahora todo se guarda en el repo (`oficina/DIRECCION.md`).

Proyecto: `/home/user/video-gladiador-mes`. **Estado: animación construida y revisada con tiempos PROVISIONALES. No hay render.** La voz (Chatterbox) se estaba generando en segundo plano; no se ha tocado `voz_cb.py`, `voz/` ni el proceso.

## Lo que se ha construido

| archivo | qué es |
|---|---|
| `scripts/lib.mjs` | + reparto nuevo del diseño (`felixcap`, `doctor`, `tito`, `prisco`, `vero`, `medicus`, `fan`, `vendedor`, `custos`, `pictor`, `musico`, `gallus`, `lapis`), + 41 piezas de GEAR (melena y bigote galo, `manica`, `galerus`, `pugio`, `secutor`, `thraex`, `galea`, `hoplon`, `parmula`, `scutumGal`, `wicker`, `laurel`, `toga`, `palm`, `scroll`, `tabula`, `cup`, `lamp`, `strigil`, `tuba`, `cornu`, `bowl`, `purse`…), `back()`, `galea(color)`, `POSE` y la **ranura V** (cascos cerrados por encima de ojos y boca). |
| `scripts/gl_fondos.mjs` | parches del diseño: cielos `manana`, `mediodia`, `atardecer`, `malva`; `romeSkyline({fg:false})` sin pisar el paralaje de otros escenarios. |
| `scripts/gl_fondos2.mjs` | el archivo del diseño (35 recetas `FONDO.*`, atrezo, luz, piezas). Cambio: el primer plano alto (barrotes, columnas, cortinas, estandartes) se limita al 42 % de la altura de pantalla para que no tape a los personajes. |
| `scripts/gm_lib.mjs` (nuevo) | utilidades: `esc()` construye cada escenario completo con su propio id y lo envuelve para encenderlo/apagarlo (así un capítulo pasa por varios escenarios, cada uno con su cielo, luz y primer plano); `cut()` = `goSpot` con desenfoque + whoosh y cambio de escenario a mitad del viaje; `who()` = actor con sombra de contacto, equipo con id que aparece en su palabra (`gearOn/gearOff`) y que se apaga con su escenario; tarjetas con dibujos del GEAR (`gearCard`), rótulos con placa oscura (`tx`), insignia de semana con placa (`semana` → `moonBadge`), contadores con placa (`num`), `outro()` (vista general + `exit()`), subsuelo de losas bajo todos los escenarios (para el vertical) y techo de vigas en interiores. |
| `scripts/gm_caps.mjs` (nuevo) | los 8 capítulos (1361 líneas): gancho 1-4, intro 5-16, semana1 17-46, semana2 47-71, semana3 72-103, semana4 104-124, balance 125-133 y cierre 134-137. |
| `scripts/capitulos.mjs` | reexporta `CAPITULOS` de `gm_caps.mjs`. |
| `scripts/tiempos_provisionales.py` | `FIN_CAP` = inicios de las frases 4, 16, 46, 71, 103, 124 y 133 con pausa 1,4 s (igual que `voz_cb.py`). |
| `pruebas/silencio_est.wav` | silencio de 735,44 s (duración estimada). |
| `hf-est-h/`, `hf-est-v/` | composiciones generadas con los tiempos provisionales. |

Escenarios usados (todos con cielo, lejos, medio, suelo y primer plano con paralaje 1,35, atrezo y elementos vivos): arena del gancho; colina con el Coliseo; mercado de esclavos ancho; arena del «galo» en sepia; calle con frescos (fama); llegada a la escuela con carro-jaula y puerta que se abre; juramento nocturno con brasero; pasillo; cuarto (con techo); Pompeya bajo ceniza; patio de noche con guardia; Capua y vía Apia en sepia; comida y palus al atardecer; patio a mediodía con luna creciente; telón de tipos; enfermería; Éfeso (gris azulado); Galeno; calle con el anuncio que se pinta; Pompeya (dipinto); Coliseo; banquete de la cena libera; pompa con órgano y litera; fieras; mediodía en sombra; combate; palestra; grafiti de Celado; tienda de recuerdos; villa de Espículo (sepia); Halicarnaso; tarde de Prisco y Vero; noche del palus (la luna se apaga); balance con la balanza; arena vacía de noche.

Cada capítulo empieza con `enter()`, cambia de estación con `cut()`/`move()` (goSpot + whoosh), lleva `moonBadge` «SEMANA 1…4» (nueva, creciente, llena, menguante) y termina con vista general + `exit()`. Título final «UN MES EN LA VIDA DE UN» + «GLADIADOR» con la clase `roman`. Todas las apariciones usan `W(frase, "palabra")`; el generador comprueba que cada palabra existe en su frase del guion (los 8 capítulos generan sin errores).

## Comprobaciones

- `node scripts/gen.mjs h|v --voz pruebas/silencio_est.wav --palabras voz/palabras_est.json --frases voz/frases_est.json --out hf-est-h|hf-est-v`: OK, 8 capítulos + subtítulos, 735,442 s.
- `npx hyperframes check --json` (horizontal): **ok, 0 errores** en lint, runtime, layout, contraste, craft y audio. Avisos: 165 `overlapping_gsap_tweens` (inofensivos: respiración/parpadeo sobre poses), 9 `composition_file_too_large`, 7 `text_below_floor` (solo letras decorativas del fondo: «SPQR · IMP · TITVS», números de las puertas, la cartela de Éfeso), `audio_clip_silent` (es el silencio provisional). Se corrigieron los dos avisos reales: un destino `#s31sh-sh` inexistente y el título final, que estaba en pantalla menos de 2 s.
- Vertical: ver el final de este documento.
- Capturas: unas 150 en horizontal y unas 60 en vertical, revisadas con las hojas de contactos.

Hojas representativas:
- `/home/user/video-gladiador-mes/hf-est-h/.hyperframes/artifacts/snapshots/1784a6aa-309f-4f58-ab8c-c50808f38bce/contact-sheet-3.jpg` (combate, horizontal)
- `/home/user/video-gladiador-mes/hf-est-h/.hyperframes/artifacts/snapshots/193daa2d-543e-4774-adb8-a4e271621850/contact-sheet-2.jpg` (semana 4, horizontal)
- `/home/user/video-gladiador-mes/hf-est-v/.hyperframes/artifacts/snapshots/e3d83f90-1b90-472d-8e45-4104494bb4e0/contact-sheet-1.jpg` (vertical)

## Problemas arreglados tras mirar las capturas

1. Primer plano (barrotes, estandartes) tapando a Félix → altura máxima del primer plano.
2. Tarjetas de dos líneas cortadas → la tarjeta crece con las líneas.
3. «50.000», «70 compañeros», «6.000», «SEMANA N» ilegibles sobre la grada o la puerta → placas oscuras (`num`, `semana`); rótulos finos con placa (`tx`).
4. Coliseo de la frase 3 tapando todo el cielo → más pequeño y desplazado.
5. Sepia que no se notaba (mix-blend) → filtro `sepia` en el escenario y en sus actores.
6. Actores de un escenario revisitado (Félix tumbado visible en la frase 26, etc.) → actores ligados a su escenario y ocultados al salir.
7. En horizontal se ven ~2460 px de mundo: enfermería, Éfeso y Galeno se quedaban cortos → más anchos.
8. X rojas de la frase 59 que aparecían después de borrarse y se quedaban flotando → borrado tras la marca.
9. Red, bolitas y cebada visibles antes de tiempo (fromTo con opacidad 1) → empiezan en 0.
10. Sello de «propiedad» en la cara → en el hombro; flecha de «grasa» → a la barriga.
11. Busto de Séneca y otros objetos que se veían en la escena siguiente → se apagan.
12. El reciario tapaba a Tito en el zoom de la frase 101 → sale antes.
13. Palma tapando la cara de Félix (112) → lleva la bolsa de monedas.
14. Rótulos y tarjetas que se pisaban (81, 114, 118, 119, 127, paradoja 16) → recolocados.
15. Vertical: plano liso bajo los suelos que acaban en G+310 → subsuelo de losas en todos los escenarios; Félix tumbado cortado (46) → cámara desplazada; «CUARTO DIMINUTO» sobre el plano; rótulo SECUTOR dentro de la zona de subtítulos en el zoom.

## Lo que queda (para el render final)

- Todo va con tiempos **estimados** (reparto por letras). Con los tiempos reales de whisper habrá que regenerar y volver a mirar capturas: algunas apariciones pueden caer un poco antes o después, y algunos borrados (`gone` en `palabra - 0.3`) pueden necesitar ajuste si dos palabras quedan muy juntas.
- Si whisper transcribe una palabra de forma distinta a la del guion (números, «sacramentum», «Halicarnaso», «missio», «hordearii»…), `S.W()` fallará y lo dirá con la frase y la palabra: se arregla cambiando esa palabra en `gm_caps.mjs`.
- Letras decorativas del fondo por debajo de 28 px (SPQR, números de puertas): aviso, no error.
- Detalles menores aceptados: en la pompa los músicos se solapan con los gladiadores del desfile; la red del secutor (53) es rápida; los caballos/carro de la frase 54 son pequeños en vertical.
- Pendiente del paso de producción normal: voz real → `gen` → `audio.py` (mezcla −14 LUFS) → `check` → capturas → render de las 4 versiones → duración, blackdetect y ebur128.

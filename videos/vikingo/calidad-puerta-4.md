# Control de calidad · vikingo · Puerta 4 (muestras, tiempos PROVISIONALES)

Revisado sobre `hf-est-h` y `hf-est-v` con `voz/frases_est.json`. La sincronía exacta con la voz queda para la puerta 5.

## Qué se ha mirado
- **Capturas nuevas** (`hyperframes@0.9.12 snapshot --at`, 0,35 s antes del final de cada frase y algunas repetidas para confirmar):
  - Horizontal: 41 + 16 momentos. Frases 1, 4, 5, 7, 8, 11, 15, 20, 23, 30, 38, 42, 49, 55, 63, 73, 85, 93, 99, 105, 117, 129, 135, 144, 148, 152, 157, 165, 175, 180, 185, 188, 196, 201, 212, 217, 222, 224, 226, 229, 234 y 238. Cubren los 8 capítulos: gancho, intro, las cuatro semanas, la niebla y el clímax, Hedeby, los esclavos, los mitos, el museo, la ópera de 1876, Viborg, el balance y el cierre.
  - Vertical: 22 + 6 momentos de las mismas zonas.
  - Hojas de contactos y fotogramas completos abiertos con Read.
- **`hyperframes check --json`**:
  - Horizontal: `ok: true`, **0 errores**. Avisos: 102 `overlapping_gsap_tweens`, 9 `composition_file_too_large`, 4 `svg_round_cap_hidden_dash`, 15 `line_unread`, 1 `text_below_floor` (cartela «GJERMUNDBU» de la vitrina, 24 px, que es atrezo) y 1 `audio_clip_silent` (el silencio provisional).
  - Vertical: `ok: true`, **0 errores**, con los mismos avisos y 2 `text_below_floor` (las cartelas de las vitrinas).
  - Ojo: el check de layout solo toma 9 muestras, así que **no detecta** los solapes de abajo. Los he encontrado en las capturas.
- **Lo que está bien**:
  - Nada romano a la vista.
  - Los cuernos solo salen en el fantasma tachado del gancho (frases 4-5) y en el cantante de 1876 con la X roja (frase 226). Los cuernos para beber (200-205) son correctos.
  - No he visto estribos, carretilla, muralla en Hedeby ni cabeza de dragón: la roda es una espiral. La brújula solo sale como tarjeta tachada.
  - Los 5 planos de cada escenario se ven en todas las capturas: cielo, lejos, medio, suelo y primer plano.
  - En vertical, los subtítulos quedan a unos 300 px del borde superior, fuera de la zona insegura.
  - La niebla deja leer «¿ES EL FINAL?» (469,4 s).

## Problemas

| # | Dónde | Problema | Gravedad | Arreglo exacto |
|---|---|---|---|---|
| 1 | Frase 5 «Ni uno.» (17,9-18,3 s), horizontal y vertical | El rótulo rojo en uncial «0 CUERNOS» cae **encima** de «NADIE LLEVA CASCO» de la frase 4, en el mismo hueco. Se leen las dos capas a la vez («N0 CUERNOSO»). Pasa porque `say(K, 5, …, { keep: true })` vuelve a empezar en el hueco 0 mientras el rótulo anterior sigue en pantalla. | grave | En `scripts/vk_caps.mjs`, línea 56, cambiar `{ keep: true }` por `{ keep: true, slot: 1 }`, para que «0 CUERNOS» vaya debajo. La otra opción es devolver solo `hh` en el `f` y recoger antes el rótulo `#…f4`. |
| 2 | Frase 42 «…duermen las vacas.» (151,7-152,6 s), horizontal y vertical | **Las vacas no llegan a verse.** La cámara sale hacia el establo con la palabra «vacas», que es la última de la frase, y la frase 43 la devuelve con «Aquí» −0,3 s. A 152,15 s la cámara va a medio camino: no se ven la vaca ni el tabique, y el rótulo «LAS VACAS, DENTRO» queda cortado en el borde derecho («DENTRO» pegado a x=1910 en horizontal; en vertical se lee «DENTR»). A 152,55 s ya ha vuelto. | grave | En la línea 163, adelantar la cámara a una palabra anterior: `["cam", "fondo", 1, 1400, 0, 0.9]`. El rótulo y la vaca pueden quedarse en «vacas». En la frase 43, retrasar la vuelta: `["cam", "dos", …]` en vez de `"Aquí", … -0.3`. Así la vaca se ve al menos 1,5 s y el rótulo se lee entero. |
| 3 | Frase 117 «De Kaupang a Hedeby: cinco días.» (383,5-384 s), horizontal y vertical | «5 DÍAS» (y = `K.sy(2)+F(70,60)`) cae sobre el borde inferior del mapa y **tapa la etiqueta HEDEBY** (se lee «HEDEBY» a medias). | grave | En la línea 308, bajar «5 DÍAS» por debajo del mapa: `y = K.sy(0) + F(220,230) + 0.35*F(760,720) + F(90,80)`. La otra opción es achicar el mapa a `w: F(620,600)`. |
| 4 | Mapas de las frases 93 (VESTFOLD), 117 (KAUPANG y HEDEBY) y 188 (BIRKA), horizontal y vertical | Las etiquetas del mapa salen a unos 37-45 px: `font-size="60"` en un viewBox de 1000 con mapas de 620-760 px. Quedan **por debajo de 46 px**, y aquí son información, no atrezo. | grave | En `scripts/vk_lib.mjs`, función `mapa()`, poner `font-size="84"` y `stroke-width="14"` en el `<text>` de los puntos (84 × 0,62 = 52 px en el mapa más pequeño). |
| 5 | Frase 229 «Así que ya sabes…» (762,5 s), horizontal | La tercera tarjeta, «0 CUERNOS», cae en una segunda fila, desplazada y **encima del brazo de la balanza** (x≈1120-1395, y≈250-380). Las dos primeras quedan arriba, a x 650-1770. Se lee, pero parece descolocada. | menor | En la línea 501, en horizontal, usar `cols: F(3,1)` con `size: F(170,170)` y etiquetas cortas («5 DÍAS SIN BRÚJULA» → «SIN BRÚJULA») para que quepan en una fila. Si no, `y: K.sy(0)` y mover la balanza de esa estación 200 px a la derecha. |
| 6 | Frase 201 «Y aquí va otro mito…» (636,3-636,7 s), horizontal y vertical | En la noche de Hedeby, «OTRO MITO» en uncial ámbar sobre placa oscura y la tarjeta «BEBER EN CRÁNEOS» salen apagadas. El viñeteado o tinte de noche parece estar por encima de la zona de información. Se lee, pero con poco contraste. | menor | Poner el tinte y el viñeteado de noche por debajo de los rótulos y tarjetas (el mismo z-index que la niebla, punto 4 de `produccion.md`). Si no, poner el rótulo en `C.bone` en vez de `AMB`. |
| 7 | Frase 117 (384 s), horizontal | La etiqueta del mapa queda pegada al cartel de «5 DÍAS» aunque se arregle el punto 3. | menor | Se resuelve con los puntos 3 y 4. Comprobar de nuevo en la puerta 5. |

Notas que no son fallos:
- Los rótulos que salen medio transparentes o borrosos en algunas capturas («DE LOS HOMBRES LIBRES» a 247,4 s, «≈ 1 METRO» a 226,3 s, «= TOMAR LAS ARMAS» a 288,7 s, y Kári a 69,45 s) están entrando. A +0,3 s se ven nítidos.
- El suelo liso en la mitad baja del vertical (intro y granja) cae casi entero en los 420 px inseguros. No lo pido cambiar.

## Veredicto

**CAMBIOS**

Hay 4 cosas graves, y las cuatro se arreglan en `scripts/vk_caps.mjs` y `scripts/vk_lib.mjs` sin tocar la voz:
1. Rótulos solapados en la frase 5.
2. Las vacas no se ven en la frase 42.
3. «5 DÍAS» tapa HEDEBY en la frase 117.
4. Etiquetas de los mapas por debajo de 46 px.

Después hay que regenerar `hf-est-h` y `hf-est-v` y sacar capturas de nuevo en 18,2 s, 151,9-152,3 s, 384 s, 311,7 s y 587 s.

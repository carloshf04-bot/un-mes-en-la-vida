# Control de calidad · vikingo · Puerta 5 (final)

## Horizontal y miniaturas

Revisado: `entregas/video-FINAL-horizontal.mp4` (unión de `entregas/tramos_h/000-006.mp4` con `audio/mezcla.wav`), `entregas/miniatura-youtube.png` y `entregas/miniatura-vertical.png`.

### Medidas
- **Formato**: 1920×1080, 30 fps, h264 yuv420p y AAC 48 kHz estéreo a 192 kb/s.
- **Duración**:
  - Archivo: 860,353 s. Audio: 860,353 s. `voz.wav`: 860,353 s. **Coinciden.**
  - La pista de vídeo dura 860,299 s (25.808 fotogramas), así que acaba 54 ms antes que el audio (menos de 2 fotogramas). Es aceptable.
- **Volumen** (ebur128): **−14,0 LUFS** integrado, LRA 3,9 LU, pico real −1,1 dBFS. **Correcto.**
- **Negros** (`blackdetect=d=0.5:pix_th=0.1`): un solo tramo negro, de **859,487 a 860,287 s (0,8 s)**. Es el fundido a negro del cierre: empieza 2,4 s después de la última palabra («tiempo.», que acaba a 857,09 s). No hay negros a mitad del vídeo.
- **Congelados** (`freezedetect n=0.001 d=2`): ninguno.
- **Uniones de tramos** (60, 120, 300, 480, 660 y 840 s):
  - Los fotogramas cuadran: 1800 + 1800 + 4 × 5400 + 611. No sobra ni falta ninguno.
  - He comparado los 4 últimos fotogramas de cada tramo con los 4 primeros del siguiente. En las seis uniones no hay saltos, ni fotogramas repetidos (ninguna diferencia es 0), ni negros.
  - La diferencia en el punto de unión es como la de los fotogramas de al lado. Por ejemplo, en 120 s el rótulo COSECHA sigue latiendo sin cortes, y en 660 s el movimiento sigue igual.
- **Sincronía con la voz**: 16 apariciones, con un fotograma 0,25 s antes de la palabra y otro 0,5 s después (tiempos de `voz/palabras.json`). En todas, la cosa aparece con su palabra y no antes:
  - techo (1), cachos (3), vikingo (7), vacas (42), dos (70), Vestfold (93), cinco (117), ronca (135), cuatro (160), grilletes (188), cráneo (201), Ibn (212), Wagner (226), cuerno (229), gusta (233) y costumbre (237).
  - Los subtítulos van palabra a palabra a la vez que la voz.
- **36 fotogramas repartidos** (cada 29,3 s, más 17,0, 18,3, 801,5, 806,5, 809,0 y 858,5 s), más zooms a tamaño real.
  - Subtítulos: grandes (unos 70 px), siempre por encima del primer plano y legibles.
  - No se ve nada romano.
  - Cuernos: el fantasma tachado del gancho, los cuernos de beber (205), «0 CUERNOS» y el cantante de 1876 con X roja (806,5 s). En la frase 227 (809 s) el cantante sigue en pantalla sin la X, pero sigue siendo el mito, así que lo acepto.
  - Los arreglos de la puerta 4 se mantienen:
    - Las vacas se ven en la 42.
    - «5 DÍAS» va bajo el mapa en la 117 y no tapa HEDEBY.
    - Las etiquetas del mapa son legibles.
    - Las tres tarjetas de la 229 van en una fila.

### Miniaturas
- `miniatura-youtube.png` es de 1280×720 y `miniatura-vertical.png` de 1080×1920. Las dos llevan:
  - Ulf grande con la cara sorprendida y sin casco.
  - «¿TE IRÍAS DE **VIKINGO**?» (4 palabras), en blanco con VIKINGO en amarillo y contorno negro.
  - El sello «0 CUERNOS».
  - «UN MES EN LA VIDA DE UN» en Inter Black y «VIKINGO» en Uncial Antiqua.
  - Rayos de luz y 3 iconos (barco, hacha y balanza).
- **Cumplen INSTRUCCIONES_BASE.**

### Problemas

| # | Dónde | Problema | Gravedad | Arreglo exacto |
|---|---|---|---|---|
| 1 | Frases 51-54 (199,2-213,2 s), granja | **Ulf sale dos veces a la vez**, uno al lado del otro, durante unos 12 s. Al volver a la granja en la 50 sigue en pantalla el `ulf` de la pala (`semana1`, `scripts/vk_caps.mjs` línea 143), y en la 51 entra `ulf3` a su lado (línea 178). En la 52 uno se pone gris con moscas y el otro no. Se ve en 200, 204, 207, 209,5 y 211,1 s. | grave | En `scripts/vk_caps.mjs`, línea 178, añadir la salida del Ulf de la pala antes de que entre el nuevo: `say(K, 51, [["out", "Y", "ulf", -0.1], ["out", "Y", "asa2", -0.1], ["in", "mito", "ulf3", -0.3], …])`. Volver a renderizar los tramos que cubren 195-215 s (tramo `002`, 120-300 s) y unirlos otra vez. |
| 2 | Frases 115-116 (415,6-419,2 s) | **Dos rótulos uno encima del otro**: «ÓTTAR · h. 890» cae en el mismo hueco que «UN NAVEGANTE NORUEGO», que sigue en pantalla (`{ keep: true }`). Durante unos 3,5 s se lee «UN NÓTTAR·h.890EGO». Es el mismo fallo que el punto 1 de la puerta 4. | grave | En la línea 307, cambiar `{ keep: true }` por `{ keep: true, slot: 1 }`. Bajar «REY ALFREDO» a `y: K.sy(2)` e «INGLATERRA» a `y: K.sy(2) + F(90, 90)` para que no choquen con ÓTTAR. Otra opción es que en la 116 salga primero el rótulo de la 115. Hay que renderizar de nuevo el tramo `003` (300-480 s). |
| 3 | Frase 191 «Aquí no hay chiste.» (650,1-651,0 s) | El rótulo «AQUÍ NO HAY CHISTE» **se sale por el borde derecho**: la placa pasa de x = 1920 y la E final queda pegada al borde. Está en pantalla menos de 1 s y queda cortado. | grave | En la línea 428, poner el rótulo centrado en la cámara: quitar `x: K.x + F(300, 0)` (o dejar `x: K.ix()`) y usar `w: F(760, 760)`. Hay que renderizar de nuevo el tramo `004` (480-660 s). |
| 4 | Frase 169 «Mucho humo.» (570,8-572 s) | «MUCHO HUMO» cae sobre «Y HUMO» de la frase anterior (`{ keep: true }`): debajo se ven las letras fantasma de la otra placa. Se lee, pero queda sucio. | menor | En la línea 401, cambiar `{ keep: true }` por `{ keep: true, slot: 1 }`. Hay que hacerlo en el mismo render que el punto 3 (tramo `004`). |
| 5 | Frase 54 «Significa día de lavarse.» (212,05-212,9 s) | «DÍA DE LAVARSE» entra con «lavarse» (212,05 s) y la cámara se va al arroyo a 212,7 s («Ese» −0,5). Se ve 0,65 s y sale cortado («ÍA DE LAVARSE» a 213 s). | menor | En la línea 181, adelantar el rótulo a «Significa»: `["t", "Significa", "DÍA DE LAVARSE", …]`. Se hace en el mismo render que el punto 1. |
| 6 | Frase 198 (677,5-681 s), museo | La silueta del hombre con la lima (`actorK(K, "lima", …, F(Fx - 300, …))`) queda **delante de la vitrina del cráneo** y tapa su cartela. | menor | En la línea 440, mover la silueta a la derecha de la vitrina: `F(Fx + 300, Fx + 330)`. Se hace en el render de 660-840 s (tramo `005`) solo si ya hay que renderizarlo. Si no, se puede quedar. |
| 7 | Frase 7 (23,8-27 s), cartel del título | «Vikingo» en minúsculas de Uncial Antiqua se puede leer como «VikinSo»: la g uncial parece una S. En la miniatura va en mayúsculas («VIKINGO») y se lee bien. | menor | Escribir el título en mayúsculas («VIKINGO») como en la miniatura y en los rótulos «SEMANA n». Se hace en el mismo render que el tramo `000` solo si se renderiza de nuevo. |
| 8 | Final (859,49-860,29 s) | 0,8 s de negro del fundido de cierre. Va después de la voz y es a propósito (`produccion.md`). | menor | Se acepta. Si se quiere dejar el `blackdetect` limpio, acortar el negro final a menos de 0,5 s. |
| 9 | `miniatura-vertical.png` | El título «UN MES EN LA VIDA DE UN / VIKINGO» va entre y = 1590 y 1820, dentro de los 420 px de abajo, donde TikTok y Reels ponen el texto de la publicación. En la portada se verá tapado en parte. | menor | En `scripts/miniatura.mjs` (formato vertical), subir el bloque del título unos 300 px (a y ≈ 1290-1500). |

### Veredicto (horizontal y miniaturas)

**CAMBIOS**

Hay 3 problemas graves, los tres de montaje en `scripts/vk_caps.mjs`. Se arreglan sin tocar la voz ni la mezcla:
1. Ulf duplicado en las frases 51-54.
2. Rótulos solapados en la 116.
3. «AQUÍ NO HAY CHISTE» cortado en la 191.

Basta con renderizar de nuevo los tramos `002` (120-300 s), `003` (300-480 s) y `004` (480-660 s). Se borran sus `.ok` y se lanza `TAM=180 bash scripts/render_tramos.sh h`: los tramos 000, 001, 005 y 006 se quedan como están. Después se vuelve a unir con la mezcla. Los menores 4 y 5 caen en esos mismos tramos.

Ojo: los puntos 1, 2, 3 y 4 también salen en el vertical, porque es la misma composición. Si el vertical ya se ha renderizado, los Shorts de esos minutos también llevan el fallo.

Para la re-revisión hay que sacar fotogramas en 200, 207, 211, 416,5, 418, 571,3 y 650,6 s, y comprobar las uniones de 120, 300, 480 y 660 s.



---

## Vuelta 2 (horizontal y miniaturas)

Revisado: el nuevo `entregas/video-FINAL-horizontal.mp4`. Es `video-FINAL-horizontal.anterior.mp4` con 6 ventanas renderizadas de nuevo (`scripts/parchear.sh`), más la mezcla nueva y las miniaturas regeneradas.

### Medidas
- **Duración**:
  - Archivo: 860,333 s. Vídeo: 25.810 fotogramas = 860,333 s. Audio: 860,330 s. `voz.wav`: 860,353 s.
  - Diferencia: 20-23 ms, menos de 1 fotograma. **Correcto.**
- **Volumen**: **−14,0 LUFS**, LRA 3,9 LU, pico real −1,1 dBFS. **Correcto.**
- **Negros**: solo el fundido final, de 859,5 a 860,3 s (0,8 s, el mismo que se aceptó en la vuelta 1). No hay más.
- **Congelados**: ninguno.
- **Sincronía fuera de las ventanas**:
  - He comparado el vídeo nuevo con el anterior en 10, 100, 250, 400, 500, 620, 700, 760 y 850 s, buscando el fotograma que coincide en ±3 fotogramas.
  - En los 9 puntos el desfase es **0 fotogramas**: después de 216 s y hasta el final, la imagen va donde iba.
  - El vídeo anterior empezaba con `start_time` de 0,021 s y el nuevo empieza en 0, así que ahora la imagen va 21 ms más pegada a la voz.
  - Las piezas suman justo 25.810 fotogramas: 600 + 240 + 4620 + 1020 + 2700 + 600 + 2610 + 240 + 4440 + 240 + 2130 + 1020 + 5350.
- **Arreglos comprobados** con fotogramas en 25,5 · 188,5 · 200 · 207 · 211,5 · 212,4 · 315,5 · 321,9 · 416,5 · 418,5 · 571,3 · 574,5 · 650,6 · 653,5 · 675,2 y 680,8 s:
  1. **Ulf duplicado (51-54): resuelto.** Solo hay un Ulf: entra a 200 s, se pone gris con moscas a 207 s y vuelve a la normalidad a 211,5 s.
  2. **ÓTTAR (116): resuelto.** «UN NAVEGANTE NORUEGO», «ÓTTAR · h. 890» y «REY ALFREDO / INGLATERRA» van en tres alturas distintas y se leen todos.
  3. **«AQUÍ NO HAY CHISTE» (191): resuelto.** Va en dos líneas, dentro del cuadro.
  4. **«MUCHO HUMO» (169): resuelto.** Va debajo de «Y HUMO».
  5. **«DÍA DE LAVARSE» (54): resuelto.** Entra en «Significa» y se ve entero hasta el corte.
  6. **Silueta con lima (198): resuelto.** Va a la derecha de la vitrina y la cartela «SUECIA 800-1050» se lee.
  7. **Título: resuelto.** «VIKINGO» va en mayúsculas en uncial y se lee bien.
  - Lo que pidió el espectador también está:
    - Vápnatak: lanza y hacha contra el escudo, con chispas.
    - «DE FRISIA (HOY, PAÍSES BAJOS)».
    - «HACIA EL 850 (40 AÑOS ANTES DE ULF)».
    - Tarjeta del diente con surcos debajo de «24 HOMBRES». Esta no tapa nada.
- **Uniones de las ventanas** (20, 28, 182, 216, 306, 326, 413, 421, 569, 577, 648 y 682 s): he comparado 8 fotogramas alrededor de cada una, entre sí y con el vídeo anterior.
  - No hay fotogramas repetidos ni negros.
  - Hay dos saltos (puntos 1 y 2 de la tabla).
  - Las otras diez uniones están limpias.

### Miniaturas
- **`miniatura-vertical.png`** (1080×1920):
  - El título va entre y ≈ 1250 y 1470, fuera de los 420 px de abajo (que empiezan en 1500).
  - La pregunta va en y ≈ 230-440, fuera de los 220 px de arriba.
  - «VIKINGO» en uncial se lee bien.
- **`miniatura-youtube.png`** (1280×720): sin cambios y correcta.
- Las dos cumplen INSTRUCCIONES_BASE.

### Problemas

| # | Dónde | Problema | Gravedad | Arreglo exacto |
|---|---|---|---|---|
| 1 | Unión de 28 s (frase 8, 28,0-29,7 s) | La ventana 20-28 acaba con el cartel del título todavía en pantalla. Hasta 28 s se ve el título nuevo, «VIKINGO» en mayúsculas. **Desde 28,0 s vuelve el título viejo**, «Vikingo» en minúsculas, porque es el vídeo anterior. Dura unos 1,7 s, hasta que el cartel se va (a 30,5 s ya no está). Es un salto visible del texto en mitad del cartel. | grave | Renderizar también 28-31 s y volver a parchear con las ventanas en orden: `bash scripts/parchear.sh h "20-28 28-31 182-216 306-326 413-421 569-577 648-682"`. Las ventanas que ya tienen `.ok` no se repiten, así que solo se renderizan 3 s. Otra opción es cambiar `20-28` por `20-31` y borrar `v_20-28.mp4.ok`. Antes hay que devolver `video-FINAL-horizontal.anterior.mp4` como base, que el script ya usa si existe. |
| 2 | Unión de 306 s (frase 83, «OTRO DATO RARO») | El primer fotograma de la ventana (306,00 s) enseña el rótulo «OTRO DATO RARO» ya entero y nítido. El fotograma de antes (305,97 s) y el de después (306,03 s) lo enseñan a medio entrar, borroso. Es un parpadeo de 1 fotograma (33 ms): el primer fotograma de un render con `--start` sale con la animación ya terminada. | menor | Se puede quedar. Si se rehace el parche por el punto 1, empezar esta ventana en un momento sin entradas, por ejemplo `304-326`, y comprobar el fotograma de unión. |

### Veredicto (horizontal y miniaturas), vuelta 2

**CAMBIOS**

Los 3 graves y los 6 menores de la vuelta 1 están resueltos, y la duración, el volumen, los negros y la sincronía están bien. Las miniaturas están **APROBADAS**.

Queda **1 grave nuevo**, de la forma de parchear: el título viejo «Vikingo» vuelve de 28,0 a 29,7 s. Se arregla renderizando 3 s más (28-31) y volviendo a unir. Para la re-revisión hay que sacar fotogramas en 27,9 · 28,0 · 28,5 · 29,5 · 31,0 s y la unión nueva de 31 s.

Ojo para el vertical: si se parchea con las mismas ventanas, le pasará lo mismo en 28 s. Hay que incluir también 28-31 s.

---

## Vuelta 3 (solo horizontal)

Revisado: el nuevo `entregas/video-FINAL-horizontal.mp4`. Se ha rehecho el parche con las ventanas 20-31 y 304-326 en lugar de 20-28 y 306-326. Las otras ventanas no cambian.

- **Duración**:
  - Archivo: 860,333 s. Vídeo: 25.810 fotogramas. Audio: 860,330 s. `voz.wav`: 860,353 s.
  - Diferencia de menos de 1 fotograma. **Correcto.**
- **Volumen**: **−14,0 LUFS**, LRA 3,9 LU, pico −1,1 dBFS. **Correcto.**
- **Título de 20 a 32 s** (fotogramas en 20,5 · 23 · 24,5 · 26 · 27,9 · 28,1 · 29 · 30 · 30,9 · 31,2 · 32 s):
  - El cartel entra con «UN MES EN LA VIDA DE UN». «VIKINGO» entra con su palabra (23,76 s) **en mayúsculas**.
  - Sigue igual a 27,9, 28,1 y 29 s y se va antes de 30 s.
  - **El «Vikingo» en minúsculas ya no sale.**
- **Uniones de 20, 31, 304 y 326 s** (8 fotogramas alrededor de cada una):
  - La diferencia entre fotogramas en cada unión es igual que la de los fotogramas de al lado: 0,45 · 0,29 · 0,82 · 0,36.
  - No hay saltos, ni fotogramas repetidos, ni negros.
- **Parpadeo de «OTRO DATO RARO» (306 s)**: ahora cae dentro de la ventana. De 305,8 a 306,1 s el rótulo entra poco a poco (las diferencias suben de 1,3 a 6,2 y luego se quedan en 0,1). Ya no parpadea.
- **Lo demás sigue igual**: he comparado con `video-FINAL-horizontal.anterior.mp4` en 10, 100, 500, 700 y 850 s. El desfase es de **0 fotogramas** en los cinco puntos, así que la sincronía con la voz no ha cambiado. Las ventanas 182-216, 413-421, 569-577 y 648-682 son las mismas que se aprobaron en la vuelta 2.

| # | Dónde | Problema | Gravedad | Arreglo exacto |
|---|---|---|---|---|
| — | — | Ninguno nuevo. Siguen aceptados los 0,8 s de fundido a negro del final. | — | — |

### Veredicto (horizontal), vuelta 3

**APROBADO**

Las miniaturas ya se aprobaron en la vuelta 2.

## Shorts

Revisado: `entregas/shorts/parte-1-de-16.mp4` … `parte-16-de-16.mp4`, cortados de `entregas/video-FINAL-vertical.mp4` (1080×1920, 860,353 s) con `SHORTS_MIN=60 python scripts/shorts.py`.

### Medidas
- **Duración de cada parte**: entre 51,0 y 57,0 s, así que **todas duran menos de 60 s**. Son 1080×1920.
- **Cobertura**: he vuelto a calcular los cortes con el algoritmo de `shorts.py`. Van de 0 a 860,353 s, uno detrás de otro, sin huecos ni solapes. Cada archivo se redondea a fotogramas, así que puede sobrar como mucho 1 fotograma (6 ms) en cada unión.
- **Cortes al final de frase**: los 15 cortes caen en mitad de la pausa entre dos frases, a 0,15 s del final de una y a 0,15 s del principio de la siguiente:
  - 15|16 · 29|30 · 41|42 · 54|55 · 71|72 · 87|88 · 101|102 · 119|120 · 136|137 · 156|157 · 175|176 · 189|190 · 202|203 · 215|216 · 226|227.
  - En `voz.wav`, en cada corte hay silencio total (−180 dB) durante al menos 50 ms. **Ninguna palabra queda cortada.**
  - Los fundidos de audio (0,12 s al empezar y 0,25 s al acabar) solo tocan silencio o colas por debajo de −35 dB.
- **Volumen** (ebur128): de −14,4 a −13,7 LUFS en las 16 partes, con picos de −1,4 a −1,1 dBFS. **Correcto.**
- **Negros**: ninguno, salvo el fundido final del vídeo al acabar la parte 16 (52,43-53,2 s, 0,77 s), que ya se aceptó en el horizontal.
- **Vertical** (hay 16 fotogramas a 25 s, uno en cada parte, y 8 momentos clave):
  - «VIKINGO» va en mayúsculas en el cartel del título (parte 1, 24,6 s).
  - ÓTTAR, REY ALFREDO e INGLATERRA van cada uno a su altura (parte 8, 41-43 s).
  - Solo hay un Ulf en las frases 51-54 (parte 4).
  - «AQUÍ NO HAY CHISTE» y «MUCHO HUMO / Y HUMO» se leen bien.
  - Los subtítulos van entre y ≈ 250 y 360 px, fuera de los 220 px de arriba.
  - Nada importante cae en los 420 px de abajo.
- **Título al empezar** (partes 2-16, 1,8 s) y **«SIGUE EN LA PARTE n+1»** (partes 1-15, 2,4 s finales): se leen bien. Van en una banda a lo ancho, en y = 760-1100 y 820-1080. Tapan el centro durante esos segundos, pero eso es el diseño y no lo pido cambiar. El título va en Inter Black y «VIKINGO» en Uncial.

### Problemas

| # | Dónde | Problema | Gravedad | Arreglo exacto |
|---|---|---|---|---|
| 1 | Las 16 partes, rótulo «PARTE n/16», todo el rato | **El texto se sale de su placa y del vídeo.** La placa mide 300 px de ancho (x = 720-1020), pero «PARTE 11/16» llega hasta x ≈ 1080.<br>• **Se corta en el borde derecho**: «PARTE 16/16» y «PARTE 1/16» (se lee «PARTE 1/1»).<br>• **Se mete en los 60 px de margen lateral**: en todas las partes.<br>• **El «16» queda fuera de la placa, en crema sobre cielo claro, y no se lee**: partes 1, 2, 3, 10, 12, 14 y 16. | grave | Ver el arreglo del punto 2. Si se quiere dejar la placa fija, hay que ajustarla al texto y alinearla a la derecha dentro del margen. Para eso, cambiar las dos primeras entradas de `vf` en `scripts/shorts.py` por una sola: `drawtext=fontfile={FONT}:text='PARTE {n}/{N}':x=w-tw-84:y=468:fontsize=50:fontcolor=0xf4e6cf:box=1:boxcolor=0x24160d@0.85:boxborderw=16`. |
| 2 | Las 16 partes, rótulo «PARTE n/16» en y = 450-546 | **La placa tapa rótulos del vídeo**: cae justo en la altura de los rótulos del vertical (`K.sy(0)`). Ejemplos:<br>• Parte 3, 25 s: «PUENTE DE MAYO».<br>• Parte 4, 45 s: «¿UNOS GUARROS?».<br>• Parte 6, 46 s: «VÁPNATAK».<br>• Parte 8, 41 s: «UN NAVEGANTE NORUEGO».<br>• Parte 9, 25 s: «2007 · UNA RÉPLICA».<br>• Parte 11, 25 s y 36 s: «1.000-1.500» y la tarjeta «JOYAS» (se lee «JOY»).<br>• Parte 13, 25 s: «SUECIA Y DINAMARCA».<br>• Parte 15, 25 s y 51,5 s: «EL DATO QUE MÁS PESA» y «1876 · ÓPERA DE WAGNER».<br>• Parte 16, 25 s: «MAREADO, PERO CON PLATA».<br>En el vertical no hay ninguna altura libre todo el rato. | grave | **Quitar la placa fija** y poner «PARTE n/16» dentro de las dos bandas, que ya tapan el centro a propósito. En `scripts/shorts.py`:<br>1. Borrar las dos líneas de `drawbox`/`drawtext` de `PARTE` (x = iw-360).<br>2. Título al empezar (n > 1): cambiar la banda a `h=400` (y = 760-1160) y añadir `drawtext=fontfile={FONT}:text='PARTE {n}/{N}':x=(w-tw)/2:y=1080:fontsize=54:fontcolor=0xffd34d:enable='lt(t,1.8)'`.<br>3. «SIGUE…» (n < N): subir el texto a `y=860` y añadir `drawtext=fontfile={FONT}:text='PARTE {n}/{N}':x=(w-tw)/2:y=975:fontsize=50:fontcolor=0x24160d:enable='gte(t,{d - 2.4:.2f})'`.<br>4. Parte 1 (no tiene banda de título): queda con «PARTE 1/16» en su banda final. Si se quiere también al empezar, poner `drawtext … text='PARTE 1/{N}':x=(w-tw)/2:y=1180:fontsize=50:box=1:boxcolor=0x24160d@0.85:boxborderw=16:enable='lt(t,2)'`.<br>Después, volver a ejecutar `SHORTS_MIN=60 python scripts/shorts.py …` con los mismos argumentos. No hace falta renderizar de nuevo el vertical. |

### Veredicto (Shorts)

**CAMBIOS**

Los cortes, la cobertura, la duración, el volumen, los negros y el vertical están bien. Falla el rótulo «PARTE n/16»: se corta y se sale de su placa (punto 1) y tapa rótulos del vídeo en casi todas las partes (punto 2).

El arreglo está solo en `scripts/shorts.py` y tarda unos minutos, porque basta con volver a cortar los Shorts. En la re-revisión miraré los mismos momentos: 0,6 s, 25 s y d − 1 s de cada parte, más la parte 8 a 41 s y la parte 11 a 36 s.

---

## Shorts, vuelta 2

Revisado: las 16 partes cortadas de nuevo con el `scripts/shorts.py` arreglado. Ya no hay placa fija: «PARTE n/16» va en la banda del título al empezar, bajo «SIGUE EN LA PARTE…» al final, y en una caja al empezar en la parte 1.

- **Duraciones**: las mismas que en la vuelta 1, de 51,0 a 57,0 s, así que **todas duran menos de 60 s**. Los cortes son los mismos: siguen una detrás de otra de 0 a 860,353 s y caen en las pausas entre frases.
- **Al empezar** (fotograma a 0,5 s de cada parte):
  - Partes 2-16: la banda lleva «UN MES EN LA VIDA DE UN / VIKINGO / PARTE n/16». «PARTE n/16» va en ámbar y centrado.
  - Las partes con número de dos cifras (10/16 a 16/16) caben de sobra, lejos de los 60 px de los lados.
  - Parte 1: «PARTE 1/16» en una caja pequeña en y ≈ 1180 durante 2 s, sobre el mar. Se lee y no tapa nada importante del gancho.
- **Al final** (fotograma a d − 0,8 s):
  - Partes 1-15: «SIGUE EN LA PARTE n+1» y debajo «PARTE n/16», los dos dentro de la banda naranja y de los márgenes, también «SIGUE EN LA PARTE 16» y «PARTE 15/16».
  - Parte 16: no lleva banda final y acaba con el fundido del cierre.
- **A mitad de cada parte** (fotograma a 25 s de las 16): **no hay ningún añadido**. Los rótulos del vídeo se ven enteros: PUENTE DE MAYO, 2007 · UNA RÉPLICA, 1.000-1.500, SUECIA Y DINAMARCA, EL DATO QUE MÁS PESA, MAREADO PERO CON PLATA…
- **Zonas seguras**: los dos rótulos añadidos van entre y = 760 y 1230, lejos de los 220 px de arriba y de los 420 de abajo. El texto añadido mide 50-54 px o más.

| # | Dónde | Problema | Gravedad | Arreglo exacto |
|---|---|---|---|---|
| — | — | Ninguno. Los puntos 1 y 2 de la vuelta 1 están resueltos. | — | — |

### Veredicto (Shorts), vuelta 2

**APROBADO**

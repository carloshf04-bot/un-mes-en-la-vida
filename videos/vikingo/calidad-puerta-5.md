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

## Shorts

Pendiente.

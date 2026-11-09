# Control de calidad · vikingo · puerta 3 (guion)

He revisado `videos/vikingo/guion.txt` (235 líneas) y `guion_visual.md` y los he comparado con `oficina/INSTRUCCIONES_BASE.md`, `oficina/GUIA_GUION.md`, `oficina/VOZ.md`, `cavernicola/guion.txt`, `videos/gladiador/guion.txt` y `videos/gladiador-mes/guion.txt`. Los datos no los he revisado: eso es cosa del verificador, y la Dirección cruzará su «OK».

## Lo que está bien
- **Duración**: `wc -w` da 1.982 palabras. A 166 palabras por minuto salen unos **11:56**, dentro de los 10-15 minutos. Por capítulos: gancho 46, intro 200, semana 1 368, semana 2 307, semana 3 326, semana 4 380, balance 294 y cierre 61. Los cuento con `sed | wc -w` y coinciden con la tabla de `guion_visual.md`. Ya no hay límite de 2:55 por capítulo, porque los Shorts son de 1 minuto.
- **Estructura**:
  - El gancho va en segunda persona en la línea 1 («Hoy vas a salir al mar…»), sin «hola».
  - El lugar y el año están en la línea 6 y el título en la 7.
  - El protagonista tiene nombre y su propio chiste: se llama Ulf, que es «lobo», y se marea. El chiste vuelve en las líneas 67, 108, 128-129 y 228-229.
  - Las cuatro semanas abren con «Semana N.» y su fase de luna, y cada una tiene un momento de tensión: Kári, la partida, la niebla y el mercado de esclavos.
  - El clímax lleva su «¿Es el final?» (146) y su giro: las gaviotas y el Schlei.
  - Hay tres mitos con «En realidad…»: los vikingos sucios, los cráneos y los cuernos.
  - El balance tiene lo malo, lo bueno y el dato más fuerte.
  - El resumen empieza con «Así que ya sabes:», da tres datos y termina con una comparación moderna (226-227).
  - El cierre tiene suscribirse, me gusta, una palabra para comentar, una pregunta de dos opciones y un amigo al que mandárselo con una broma. Acaba con la despedida fija.
- **Voz**: no aparece ninguna palabra prohibida (hola, increíble, brutal, épico, «vamos a ello»…). Siempre se habla de tú. Las fuentes se dicen en la propia frase (Óttar, Ibn Fadlán, el Museo Nacional de Dinamarca, el biógrafo de Ansgario). Hay un dato raro o asqueroso en cada bloque.
- **Anacronismos**: todo lo que es posterior al 890 está avisado: «siglos después», «hoy», «en dos mil siete», «en mil ochocientos setenta y seis» o una comparación con «como».
- **Guion visual**: las 235 frases tienen su línea, con el mismo número y el mismo texto que `guion.txt`. Lo he comprobado con un script. Todas las palabras de aparición («palabra» →) existen en su frase y ninguna línea se queda sin aparición.
- **Copias**: con `grep -F -x -f` coinciden de forma literal las líneas 230 y 235. La 235 es la despedida fija de `VOZ.md`, así que está permitida. Las fórmulas que `VOZ.md` pone en «Palabras que sí usamos» («Y aquí va el primer dato raro», «Y aquí viene el gran mito», «Primera/Segunda sorpresa», «Ah, y…», «Sí, …», «¿Es el final?», «Así que ya sabes:») son del canal y las acepto. Los ganchos y los chistes son nuevos.

## Problemas

| # | Dónde | Problema | Gravedad | Arreglo exacto |
|---|---|---|---|---|
| 1 | Línea 230 | **Frase copiada literalmente** de `cavernicola/guion.txt` y de `videos/gladiador-mes/guion.txt`: «Si te ha gustado este viaje, suscríbete y dale a me gusta.» Solo la despedida fija está permitida | **grave** | Cambiarla por «Si has llegado hasta aquí sin marearte, suscríbete y dale a me gusta.». En `guion_visual.md` 230, el texto pasa a ser ese y las apariciones siguen igual («suscríbete» → botón SUSCRIBIRSE; «gusta» → thumbs-up) |
| 2 | Línea 231 | **Frase adaptada**: es la misma de cavernícola y gladiador-mes («Escribe en los comentarios la palabra gladiador.») con solo el sustantivo cambiado | **grave** | Cambiarla por «Y deja en los comentarios una sola palabra: «víking».». La aparición «víking» → caja de comentario no cambia |
| 3 | Línea 17 | **Frase adaptada**: «Su nombre significa lobo.» es «Su nombre significa afortunado.» de los dos guiones del gladiador, con solo el sustantivo cambiado | **grave** | Cambiarla por «Ulf quiere decir lobo.» y poner la aparición en «lobo» en `guion_visual.md` 17 |
| 4 | Línea 233 | Empieza con la fórmula de los tres guiones anteriores («Y mándaselo a ese amigo que…»). La broma es nueva | menor | Cambiarla por «Y pásaselo a ese amigo que solo se lava los sábados.». Las apariciones «amigo» y «sábados» no cambian |
| 5 | Línea 86 | Tiene la misma estructura que gladiador-mes («Hoy lo compararíamos con un boxeador profesional.»): «Hoy lo llamaríamos votar a golpes.» | menor | Cambiarla por «Una votación a mano alzada, pero con hierro.». En `guion_visual.md` 86, la aparición pasa a «votación» → etiqueta HOY con la urna y el hachazo |
| 6 | Línea 153 | Remata igual que gladiador-mes («Al final, su nombre no mentía.»): «Óttar no mentía.» | menor | Cambiarla por «Óttar tenía razón.». La aparición «Óttar» no cambia |
| 7 | Línea 218 | Repite, recortado, el remate de cavernícola y gladiador-mes («Y el dato más fuerte de todos.»): «Y el dato más fuerte.» | menor | Cambiarla por «Y ahora, el dato estrella.». En `guion_visual.md` 218, la aparición pasa a «estrella» → rótulo «EL DATO ESTRELLA» |
| 8 | Línea 226 | **Seseo**: «cero cuernos» es una palabra clave con «ce», hay sinónimo y además se usa para sincronizar | menor | Poner «…plata que se pesa en vez de contarse y ni un solo cuerno.». En `guion_visual.md` 226, la aparición pasa de «cero» a «cuerno» → «0 CUERNOS» |
| 9 | Línea 58 | Tiene 28 palabras y tres ideas, cuando la guía pide una idea por frase y frases cortas. Además, «le quitaban las novias a los ingleses» debe concordar en plural | menor | Partirla en tres líneas: «Siglos después, un cronista inglés se quejaba de los daneses.» / «Se peinaban a diario y se bañaban los sábados.» / «Y así les quitaban las novias a los ingleses.». En `guion_visual.md` hay que repartir las apariciones en tres frases («cronista», «peinaban» + «sábados», «novias») y volver a numerar a partir de la 59 (las líneas pasan a ser 237) |

El balance de palabras no cambia: con los arreglos sigue en unas 1.980 palabras y unos 11:55.

## Resultado

**CAMBIOS**: hay tres graves (1, 2 y 3), porque son frases copiadas o adaptadas de otros guiones del repositorio. Se arreglan con los cambios de una línea de arriba, en `guion.txt` y en `guion_visual.md` a la vez. Los menores se pueden hacer en la misma pasada.

## Vuelta 2

He revisado `git diff HEAD~1` de `guion.txt` y `guion_visual.md`. Ahora `guion.txt` tiene 238 líneas.

| # | Estado |
|---|---|
| 1 (línea 230, ahora 233) | Resuelto: «Si has llegado hasta aquí sin marearte, suscríbete y dale a me gusta.» |
| 2 (línea 231, ahora 234) | Resuelto: «Y deja en los comentarios una sola palabra: víking.» |
| 3 (línea 17) | Resuelto: «Ulf quiere decir lobo.», con la aparición en «lobo» |
| 4 (ahora 236) | Resuelto: «Y pásaselo a ese amigo…» |
| 5 (ahora 88) | Resuelto: «Como levantar la mano en clase, pero con un hacha.», con la aparición en «clase» y la etiqueta HOY |
| 6 (ahora 155) | Resuelto: «Óttar acertó de lleno.» |
| 7 (ahora 221) | Resuelto: «Y el dato que más pesa.», con la aparición en «pesa» |
| 8 (ahora 229) | Resuelto: «ni un solo cuerno», con la aparición en «cuerno». Ya no queda «cero» |
| 9 (ahora 58-60) | Resuelto: la frase está partida en tres, «les» va en plural y las apariciones están repartidas |

**Comprobaciones**:
- **Copias**: `grep -F -x -f` contra `cavernicola/guion.txt`, `videos/gladiador/guion.txt` y `videos/gladiador-mes/guion.txt` solo encuentra la despedida fija («Nos vemos en el próximo viaje en el tiempo.»), que está permitida. Las frases nuevas del verificador (17-18, 47, 49, 82, 84, 98, 103, 190, 195-196 y 226) no copian ni adaptan ninguna frase de otros guiones.
- **Guion visual**: las 238 frases tienen su línea, con el mismo número y el mismo texto. Todas las palabras de aparición existen en su frase, ninguna línea se queda sin aparición y no sobra ninguna. Lo he comprobado con un script.
- **Palabras**: la tabla de capítulos coincide con `wc -w` (46, 201, 366, 312, 327, 384, 298 y 64).
- **Duración**: `wc -w` da 1.998 palabras. A 166 por minuto salen unos **12:02**, dentro de los 10-15 minutos.
- **Seseo**: las palabras nuevas («golosina», «chocando», «colgando», «votan») no tienen «z», «ce» ni «ci».

No hay problemas graves ni menores pendientes.

**APROBADO**

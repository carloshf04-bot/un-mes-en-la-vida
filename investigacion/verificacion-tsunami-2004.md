# Verificación: guiones/tsunami-2004.json

Comparado con `investigacion/tsunami-2004.md` y `oficina/GUIA_GUION.md`. Los números de escena empiezan en 0 (índice de `largo.escenas`). Revisado sobre la versión de las 18:19 del 25-XI-2026, que ya usa los props `oruwa`, `dagoba`, `tren-diesel` y `torre-alerta`. **No se ha tocado el guion.**

## Comprobaciones que pasan

- **JSON válido.** 60 escenas (piden 50–65). Cada escena es una sola frase de 21 a 31 palabras y ninguna pasa de 220 caracteres, así que la voz no la parte por comas. No hay frases de una o dos palabras. No hay cifras en `texto`.
- **Calendario.** Día 1 = domingo 12-XII-2004 y día 30 = lunes 10-I-2005. Todos los días de la semana del texto cuadran con `dia`: mar 14 (3), mié 15 (4), sáb 18 (7), dom 19 (8), mar 21 (10), vie 24 (13), sáb 25 (14), dom 26 (15), lun 27 (16), mié 29 (18), vie 31 (20), lun 3 (23), mié 5 (25), vie 7 (27), dom 9 (29), lun 10 (30). Los días suben siempre. Hay 4 capítulos (escenas 4, 15, 23 y 43) y el clímax cae en la semana 3. No llevan `dia` las escenas 0–3, el epílogo (53–57) ni el cierre.
- **Hechos que coinciden con la ficha [V]:**
  - El terremoto a las 6:58 (hora de Sri Lanka en 2004), magnitud 9,1, más de mil kilómetros de falla y el fondo levantado varios metros.
  - Los sismógrafos lo registraron en minutos y en el Índico no había sistema de alerta. La ola cruzó el océano como un avión y en alta mar apenas se notaba (37).
  - En el suroeste el mar primero subió, luego se retiró y después llegó la ola mayor.
  - El tren se paró a unos 200 m del mar, lleno por el Poya y la Navidad, y los vecinos subieron a él. Es el peor desastre ferroviario.
  - Unos 35.000 muertos en Sri Lanka y más de 220.000 en el Índico. El día 23 la cifra pasaba de 30.000. Unos 500.000 desplazados.
  - Cumbre de Yakarta el 6 de enero. Powell en un centro de la Cruz Roja de Galle el día 7 y Annan sobre Galle en helicóptero el día 8.
  - Reapertura de las escuelas el 10 de enero y 77.000 niños sin escuela. Rupia a 104,7. El arroz más caro.
  - Coral: 2–3 m en Hikkaduwa y unos 10 m sin coral. Barcas donadas. Sistema de alerta en junio de 2006, torres con sirena y tren restaurado con dos minutos de silencio.
- **Respeto.** No hay nada gráfico: no se entra en los vagones, no hay cuerpos y la pérdida se cuenta por la ausencia («entre los que no volvieron», la lista que se calla). No se ridiculiza a quien bajó a mirar (29: «nadie nos había explicado…»). No se culpa a nadie con nombre. No hay «30 metros», ni el «sexto sentido» de los animales, ni Tilly Smith, ni Tailandia, ni guerra. El mar no es un monstruo (50), el 🌊 no se usa y no hay bromas en la semana 3.
- **Ficción avisada.** En la escena 3, en el cierre (58) y en la descripción. Roshan sale en las dos (ver error 19 para la maestra).
- **Reparto y voz.**
  - Todos los `quien` existen.
  - Narrador `narrador-es`, porque el protagonista es un niño.
  - Kumari, Kumari de blanco, Achchi, la voluntaria y Nadeesha llevan `"voz": "narradora-es"` y siempre tienen `habla: false`, así que ninguna escena cambia a voz femenina por error.
  - Kasun va «descalzo»: tiene `zapatos` del color de la piel.
- **Catálogo.**
  - Lugares, paredes, acciones, emociones, ropa y sombreros existen.
  - Los props del catálogo y los cuatro nuevos están en `Props.tsx`.
  - No hay emojis prohibidos (🗼, 🚢) ni secuencias ZWJ. 🪷 y 🪸 están en Noto Color Emoji.
  - El protagonista está en x 0.4 en la escena 0. No hay inserción en la última escena. `abrazar` (37) va a ±0.14, como en Mesina.
- **Grafías.** Kásun, Peralíya, Jikadúva, Gal, Póya, orúva, sámbol, kiribat, Achi, ratinga, Nadísha, Ánan y Páuel tienen su grafía real.
- **Publicación.** `tituloLargo`, `tituloCorto`, `capituloInicial`, `miniatura`, descripción con fuentes y dedicatoria, y 14 etiquetas.

## Errores y correcciones propuestas

### Graves (rigor, coherencia y shorts)

1. **Escena 1 y descripción del gancho 1: «A mil seiscientos kilómetros de mi playa» / «a 1.600 km».** La ficha no da esa distancia como [V], y del epicentro (3,3° N 96,0° E) a Peraliya hay unos **1.800 km**. Lo que está a unos 1.650 km es la costa este (Batticaloa).
   *Corrección:* «A casi dos mil kilómetros de mi playa, la tierra se había roto bajo el mar…». En la descripción: «un terremoto a unos 1.800 km bajo el mar».

2. **Escenas 7, 22 y 36: el padre sigue en el mar a las nueve y media.** La escena 7 dice que «vuelve con el alba» y la 22 que sale «esa noche», pero la 36 dice «está en el mar desde anoche» cuando llega la ola (~9:20–9:30). Además, la ficha no respalda que un pescador budista salga a faenar la noche antes del Poya.
   *Corrección:* escena 36: «Mi padre salió anoche y esta vez no ha vuelto con el alba, y mi madre mira hacia la costa durante horas…». Opcional en la 22, para no afirmar nada sobre el Poya: «…y esa noche mi padre sale a pescar más lejos que nunca».

3. **Gancho 3 (escenas 30–34, «LA REINA DEL MAR»): empieza sin contexto.** «Mi madre me agarra del brazo y grita que subamos» no engancha solo, y el tren no aparece hasta la segunda frase. Ver Bastoña, error 2.
   *Corrección:* empezar el gancho en la escena 31 (`"desde": 31`) y abrir esa escena con el tren: «El tren se llamaba la Reina del Mar, y desde la curva del camino lo vemos parado junto a las casas, porque el agua le ha cortado el paso…». La escena 32 pasa a «Va lleno de gente por el Póya, y muchos vecinos suben a sus vagones…». Así el tramo 31–34 tiene unas 112 palabras, dentro del 95–120.

4. **Ganchos 2 y 4 demasiado largos.** El 25–29 y el 53–57 tienen 136 y 130 palabras. La guía pide 95–120 (45–60 s), y `shorts.mjs` recortaría por el final, que es justo donde está el cierre o la intriga.
   *Corrección:*
   - Gancho 2: empezar en la 26 («Hacia las nueve salimos…») y terminar en la 29: 105 palabras. Así acaba en Roshan bajando a la orilla, que es una intriga.
   - Gancho 4: quitar la 53 (`"desde": 54`): 104 palabras. Quitar de su descripción la frase de las barcas donadas.

5. **Escena 34: «tiempo de sobra para avisar… pero en el Índico no había nadie mirando».** La ficha (§7) marca como mito que «nadie sabía»: los sismólogos lo midieron en minutos, y lo que faltaba era cómo avisar y a quién. Dice «tiempo suficiente», no «de sobra». La escena es además el final del gancho 3.
   *Corrección:* «Habían pasado unas dos horas y media desde el terremoto, tiempo suficiente para avisar a toda la costa, pero en el Índico no había ningún sistema para hacerlo».

6. **Escena 41: «Aquel domingo iban en ella más de mil personas».** Confunde pasajeros y víctimas. La ficha da más de 1.500 billetes vendidos (y vecinos que subieron), y lo de «más de mil» son los muertos (no hay cifra oficial). Escrita así, la frase rebaja el tren y no dice lo que la tarjeta («+1.000 personas perdidas»).
   *Corrección:* «Más de mil personas no volvieron de aquel tren, y es el peor desastre de tren de toda la historia, a pocos minutos de mi casa».

### Leves (matices, tono, puesta en escena y estilo)

7. **Escena 42: tono.** «nadie enciende petardos, porque la lata de Dilan se ha ido con su casa» da como motivo la lata perdida tres escenas después de la muerte de Roshan y suena trivial.
   *Corrección:* «…y nadie enciende petardos. La lata de Dilan se fue con su casa, y tampoco nadie tiene ganas».

8. **Escena 40: «volcada junto a la vía, vacía».** El «vacía» invita a imaginar el interior de los vagones (ficha §2: «nada de lo que hay dentro»). La ficha dice además que la ola arrastró vagones hasta unos 100 m.
   *Corrección:* «…y solo me cuenta que la Reina del Mar está volcada, lejos de la vía».

9. **Escena 33: la imagen no casa con el texto.** Dice «entre las palmeras solo hay agua donde antes estaban las casas», pero el fondo `montanas` tiene una `casa` entera y ninguna palmera. Además, `montanas` dibuja montañas para lo que en la ficha es una colina baja del interior.
   *Corrección:* `lugar: "campo"` con palmeras y sin `casa`, o con `charco` grandes al fondo. En las escenas 35–42 se puede dejar `montanas` o pasar a `campo` con la `dagoba`.

10. **Escena 36: 🏳️ el mismo día 26 por la tarde.** Las banderas blancas de luto se cuelgan en los días siguientes.
    *Corrección:* quitar el 🏳️ de la escena 36 (dejarlo en la 46, que está bien).

11. **Escena 16: el `puesto` lleva pan, queso y manzanas europeos** (lo dice la guía), y `calle` es una «calle antigua empedrada». La ficha pide evitar lo europeo.
    *Corrección:* cambiar el `puesto` por `mesa` con 🥥 🐟 🍚 encima. El lugar puede quedarse como está (el fuerte de Galle tiene calles antiguas) o pasar a `campo` con `casa`.

12. **Escena 19: «que llegó hace siglos con los portugueses».** La ficha dice herencia portuguesa **y holandesa**.
    *Corrección:* «…el pastel del amor, que trajeron hace siglos portugueses y holandeses».

13. **Escena 7 (tarjeta): «Atún, sardinas y caballas»** no está en la ficha, que solo menciona el atún del *ambul thiyal*.
    *Corrección:* «Atún y pescado para vender o secar».

14. **Escena 13: Kasun `senalar` con `emocion: "feliz"`** mientras cuenta que arrancaron el coral y la orilla quedó desnuda. Es el dato que luego explicará los 10 m.
    *Corrección:* `"emocion": "neutral"`.

15. **Escenas 26 y 30: tres personajes a −0.45 / 0 / 0.45.** La guía pide −0.7 / 0 / 0.7. En la 26 el 🪷 lo lleva Kasun y en la 30 lo lleva la abuela, aunque el texto dice «que no suelta sus flores».
    *Corrección:* x −0.7 / 0 / 0.7 en las dos. En la 26, el 🪷 a `achchi`, o cambiar el texto de la 30 a «…con mi abuela, y yo no suelto mis flores de loto».

16. **Escena 28 y descripción del gancho 2: «se retira cientos de metros».** La ficha no da esa distancia: dice «se retiró mucho, dejando el arrecife al aire».
    *Corrección:* «Entonces el mar se retira muy lejos y deja al aire el arrecife, las rocas y los peces…». En la descripción: «se retira muy lejos y deja el fondo al aire».

17. **Escena 53: «volvió a salir al mar en primavera».** Sri Lanka no tiene primavera, porque sus estaciones son los monzones.
    *Corrección:* «…y mi padre volvió a salir al mar pocos meses después».

18. **Escena 46: «…para repartir la ayuda, porque solo en Sri Lanka hay…».** Ese «porque» no encaja: la cumbre era para todo el Índico.
    *Corrección:* «En Yakarta se reúnen los gobiernos de medio mundo para repartir la ayuda. Solo en Sri Lanka hay unas quinientas mil personas fuera de sus casas». Con el punto salen dos frases de 13 y 11 palabras, que está bien.

19. **Escena 58 (cierre): no dice que la maestra Nadeesha (ni la tía) sea inventada**, aunque sale junto a hechos reales (la reapertura del 10 de enero). La descripción nombra a Nadeesha, pero no a la tía.
    *Corrección:* «Yo, Kásun, nunca existí, ni mi familia, ni Dilan, ni Roshan, ni la señorita Nadísha…» (recortar «de luna llena» para no pasar de 31 palabras). En la descripción: «…su familia (también la tía del hotel), su amigo Dilan…».

20. **Escena 57: «Cada veintiséis de diciembre, la Reina del Mar restaurada vuelve…».** La ficha lo data desde 2008.
    *Corrección:* «Desde dos mil ocho, cada veintiséis de diciembre, la Reina del Mar restaurada vuelve a Peralíya…» (quitar «en el mismo lugar» para compensar).

21. **Palabras totales: 1.576.** La guía pide 1.350–1.550. No hay riesgo de pasar de 13 minutos: los últimos episodios salen a unas 140 palabras por minuto, así que este rondará 11 min. Aun así hay que recortar unas 26 palabras. Las correcciones 7, 18, 19 y 20 ya quitan algunas. Comprobar con `--sin-render`.

22. **Seseo (regla 11).** Hay sinónimos fáciles:
    - 9 «cocina» → «guisa»
    - 25 «la ola lo cruza» → «la ola lo atraviesa»
    - 26 «cruzamos la vía» → «pasamos la vía»
    - 37 «aparece en el templo» → «llega al templo»
    - 39 «aparece entre» → «está entre»
    - 42 «enciende» → «tira»
    - 52 «despacio» → «muy lento»
    - 4 «decenas de brazos» → «muchas manos»

23. **Fórmula repetida: 17 escenas abren con «Es <día>, <fecha>, y…»** (4, 8, 10, 14, 15, 16, 18, 20, 23, 38, 40, 42, 43, 45, 47, 49, 51). El contador ya pone el día, y en voz suena a lista. Ningún gancho empieza así, y eso está bien.
    *Corrección:* variar 4 o 5. Por ejemplo, 14: «El sábado, mi tía…»; 38: «Al día siguiente dormimos…»; 45: «Una noche, alguien grita…»; 47: «El viernes, el secretario de Estado…». Hay que mantener la fecha en las escenas 4, 23 y 51 (inicio, 26 y vuelta a la escuela).

24. **Props nuevos sin documentar en la guía.** `oruwa`, `dagoba`, `tren-diesel` y `torre-alerta` están en `Props.tsx`, pero no en `GUIA_GUION.md`, y es regla de la casa documentarlos. Además:
    - `tren-diesel` se desliza adelante y atrás (`sin(f/90)*30`) en las escenas 31–32, donde el tren está «parado», y en la 57, donde «se detiene».
    - `oruwa` se balancea como si flotara aunque está varada en la arena.
    *Corrección:* documentarlos (sección «Sri Lanka (2004)»). Revisar en las muestras si el vaivén del tren se nota; si se nota, añadir una variante quieta (`tren-diesel-parado`) o una opción para fijarlo. Lo mismo para la `oruwa` en `playa`.

25. **Gancho 1 (0–3): termina en la escena 3** («Mi familia y yo somos inventados…»), que es un aviso y no una intriga (como en Glenn Miller, error 27).
    *Opcional:* «Mi familia y yo somos inventados. El mar, el tren y aquella mañana de diciembre de dos mil cuatro, no». O cerrar con «…fueron reales. Y nadie nos avisó».

26. **Inserciones: hay 10 escenas sin tarjeta (24 → 34)**, en pleno clímax. La guía pide una cada 4–6.
    *Opcional:* `mapa` «Sumatra → Sri Lanka» · «la ola rodea el sur de la isla» en la escena 25, o un `dato` «800 km/h · velocidad de la ola en alta mar».

27. **Descripción: «las unas 35.000 personas muertas».**
    *Corrección:* «las cerca de 35.000 personas muertas».

## Riesgos que quedan (no son errores)

- **Nombres con «sh».** «Roshan» y «Nadísha»: la voz española puede leer la «sh» de forma rara. Hay que mirarlo en `revisar_voz.mjs`. Si falla, escribir «Róshan» con su grafía o cambiar el nombre inventado.
- **El sarong de Sunil.** Sale como pantalón (`color2`), porque no hay tipo de ropa sarong. Es aceptable.
- **«Rugido grave» (33).** Es un recurso sonoro de testimonio y no está en la lista «NO USAR», pero roza el tono de cine de catástrofes. Vigilar en las muestras que la música no lo subraye.
- **La miniatura.** Pone a Kasun con `emocion: "miedo"`. Es sobria, pero conviene revisar que no parezca sensacionalista con el texto «EL MAR SE FUE».

## Cifras finales

- 60 escenas y 1.576 palabras (21–31 por escena). Gancho 1: 113 palabras. Gancho 2: 136. Gancho 3: 136. Gancho 4: 130.
- **6 graves** (1–6) y **21 leves** (7–27).

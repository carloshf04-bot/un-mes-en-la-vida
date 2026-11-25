# Verificación: guiones/delaware-1776.json

Comparado con `investigacion/delaware-1776.md` y `oficina/GUIA_GUION.md`. Escenas numeradas desde 0 (índice en `largo.escenas`).

## Comprobaciones que pasan

- JSON válido. 60 escenas (50–65). Cada `quien` existe en `reparto`. Todos los lugares (`rio`, `calle`, `campo`, `bosque`, `interior`), props (`pino`, `casa`, `carro`, `bote`, `pozo`, `cabana`, `hoguera`, `tienda`, `cama`, `chimenea`, `barril`, `valla`, `cruz`, `antorcha`, `puente`, `cajas`), acciones, peinados, ropas y sombreros (`tricornio`, `gorro-lana`, `pileo`, `panuelo`, `ala`) existen en el motor.
- El campo `dias: 34` no está en la guía, pero no molesta: el calendario ya toma como total el `dia` más alto (34). Capítulos en los días 1, 9, 22 y 27, como propone la ficha (§10); el clímax cae en la semana 3.
- Días de la semana correctos en todas las escenas que los dicen (dom 1 dic … vie 3 ene).
- Ningún número en cifras dentro de `texto`, ninguna frase suelta de una o dos palabras (las más cortas son finales tras dos puntos: «retroceder.», «victoria o muerte.», «solo de frío.», que se leen unidos), ningún emoji prohibido (ni banderas, ni 🎄, 🔫, 🩸, 🚢, ⛵, 🪖, 🎩, 🦅) y ninguna secuencia ZWJ.
- Voces: narrador masculino; `madre` y `mercy` llevan `"voz": "narradora-es"` y nunca hablan (`habla: false`).
- **Sin anacronismos visuales:** no hay `bandera` ni `bandera-eeuu` en ninguna escena; la bandera de barras y estrellas solo se nombra para decir que aún no existía (escena 57, tarjeta «1777» correcta). Sin pavo, árbol de Navidad, farolas ni botas.
- **Citas de Washington fieles:** «Creo que la partida está casi perdida» («I think the game is pretty near up», 18 dic, «a su hermano»: bien, sin decir cuál) y «en diez días el ejército dejará de existir» (a Hancock/Congreso, 20 dic). La oferta de 10 $ por «seis semanas más» con la fecha del 30 de diciembre. Cita de Paine fiel («Estos son tiempos…», «el soldado de verano… en esta crisis… del servicio a su país»), con fecha del 19.
- **Mitos bien tratados:** Paine lo lee un compañero inventado, no por orden de Washington, y no sale el tambor de Paine; la bayoneta va con «Cuentan que…» (33); el discurso del tambor va con «Un sargento contó años después…» (44); «más o menos la mitad» (46); «unos cuantos centenares» para las hogueras (49); no salen la nota de Rall ni el retrato de Jorge II; Rall no es ni borracho ni tonto («cae herido de muerte al intentar reunir a sus hombres»).
- Nada gráfico: Moore, Rall y Mercer «mueren» o «caen heridos» de lejos; ni sangre ni heridas.
- Cifras correctas frente a la ficha: 2.000 milicianos, 60 días de la proclama, 6⅔ $, 1.400–1.600 hessianos, Moore con 24 años, 10 millas, 2.400 hombres y 18 cañones, barcas de 12–18 m, unas 100 casas, unos 900 prisioneros, 0 muertos en combate, Monroe con 18 años, 194 en Nassau Hall, tres asaltos en el Assunpink.
- Lo inventado se dice en el cierre (58) y en la descripción. La última escena no lleva `insercion`; en la primera, Eli está en x = 0.4.
- Grafías completas para todas las palabras escritas como suenan.

## Errores y correcciones propuestas

### Graves

1. **Duración: hay que recortar.** 1.641 palabras de `texto` (la guía pide 1.350–1.550) y 11,4 min estimados. Para bajar de 11 min hacen falta unas 60 palabras menos, y para entrar en la guía, unas 90. **Recortes propuestos (unas 90 palabras):**
   - **Quitar la escena 36** («Todo es humo, gritos en alemán…», 25 palabras): no aporta hechos y arregla además el gancho 3 (punto 2).
   - **Fundir la 10 en la 11** (−21): quitar la 10 y dejar la 11 así: «Es domingo, ocho, y los británicos llegan a Trénton y se encuentran un río sin barcas: las hemos cruzado, escondido o quemado todas. Esa noche oímos sus tambores sobre el agua.»
   - **Escena 29** (−9): quitar «un antiguo librero de Boston con un vozarrón enorme,» → «En la orilla, el coronel Nox embarca a dos mil cuatrocientos hombres, caballos y dieciocho cañones.» (arregla también el gancho 2).
   - **Aperturas con fecha** (punto 3): quitar el «Es <día>, <fecha>, y» en unas diez escenas ahorra unas 20 palabras.
   - Ajustes pequeños (−15): escena 18, «Echo cuentas con los dedos:» → «Echo cuentas:»; escena 33, quitar «con el viento en la cara»; escena 2, quitar «, el Délauer,» (el mapa ya lo dice).
   - **Ojo:** al quitar las escenas 10 y 36 cambian los índices. Los ganchos pasan a ser 0–3, 27–31, 33–36 y 41–44. `miniatura.escena: 0` no cambia.

2. **Ganchos 2 y 3: demasiado largos.** El gancho 2 (28–32) tiene 123 palabras y el 3 (34–38) tiene 131 (el máximo es 120, o 60 s). El 3 pasaría de un minuto y `shorts.mjs` lo cortaría por el final, justo donde está el dato de los 0 muertos y los 900 prisioneros. **Corrección:** las del punto 1 (quitar la 36 deja el gancho 3 en 106; recortar la 29 deja el 2 en 114).

3. **Voz: demasiadas escenas empiezan igual.** 21 de las 60 escenas abren con «Es <día de la semana>, <fecha>, y…» (3, 5, 7, 9, 11, 12, 13, 14, 15, 16, 17, 18, 21, 22, 25, 26, 32, 40, 43, 47 y 51), y siete de ellas seguidas (12–18). Con la misma entonación, suena a letanía, y el calendario de pantalla ya da el día. **Corrección:** dejar la fórmula completa solo en los días clave (1, 24, 25, 26, 31, 2 ene y 3 ene) y variar el resto. Por ejemplo: 12 «En el condado de Baks, nuestro campamento son hogueras…»; 13 «El rancho es harina y carne salada…»; 14 «En la choza de al lado hay fiebre…»; 15 «El jueves corre el rumor…»; 16 «En Trénton se instalan para el invierno…»; 17 «El domingo llega carta de casa…»; 18 «Ya se forma hielo en las dos orillas…»; 9 «El jueves me toca cruzar a mí…»; 21 «El viernes llegan los hombres…»; 40 «Al quitarme los trapos…».

4. **Escena 9: Glover el 5 de diciembre (hecho probablemente falso).** «…una barca que reman en silencio los marineros de Márbeljed del coronel Glóver». El regimiento de Glover (14.º Continental) iba en la división de Charles Lee y llegó al Delaware **con Sullivan el 20 de diciembre** (ficha §1: «llegan unos 2.000 hombres de Sullivan, los que mandaba Lee»). Los primeros días de diciembre cruzaban barqueros de la zona y las barcas Durham reunidas por el ejército. La ficha lo marca [V] en la tabla del día 5, pero no da una fuente para esa fecha, y choca con su propio §1. **Corrección:** escena 9: «…en una barca que reman en silencio unos barqueros del río…». Llevar a Glover a la escena 21: «…llegan los hombres del general Sálivan, flacos y harapientos, y con ellos los marineros de Márbeljed del coronel Glóver, blancos y negros juntos…» (sin pasarse de 40 palabras: quitar a cambio «pero el general avisa al Congreso de que…» y dejarlo solo en la tarjeta, o partir la escena). Avisar al Investigador para que corrija la fila del día 5.

5. **Escena 42, tarjeta: la cuenta no sale.** «10 $… más que un mes y medio de paga de un soldado raso». 6⅔ $ × 1,5 = 10 $ exactos: es **igual** a un mes y medio, no más. (El error viene de la ficha, §3.9 y §4.2.) **Corrección:** «…de prima por quedarse seis semanas más (Washington, 30 de diciembre de 1776): un mes y medio de paga de un soldado raso, además del sueldo». Corregir también la ficha.

6. **Escena 25, tarjeta «La orden de Nochebuena»: cosas que no están en la orden.** La ficha documenta solo la comida cocinada para tres días y las mantas (carta a Cadwalader del 24 y orden del 12). «Ni un tambor hasta nueva orden» no está en la ficha, y el reparto de pedernales es [D] y del día 23. Además, 🪶 (una pluma de escribir) no sirve para «piedras de chispa», y 🧥 es un abrigo, no una manta. **Corrección:** dejar solo los dos objetos verificados, o cambiar el título por «Lo que llevo» (así ya no es una orden) con 🍞 «Comida cocinada para tres días», 🧥 «La manta (o lo que tengo por manta)», 👞 «Los zapatos atados con trapos» y ✉️ «La carta de casa». Si se quieren los pedernales, sin 🪶 y diciendo que es el reparto del día 23.

7. **Escena 35: detalle sin fuente que alimenta el mito.** «Los hesianos salen de las casas medio vestidos…». Lo de «medio vestidos» no está en la ficha y empuja la imagen de la tropa dormida tras la juerga de Navidad. Y «no están borrachos, digan lo que digan después» se da como certeza: la ficha dice que **no hay pruebas** y que un pífano americano de 16 años, John Greenwood, **no vio ni a uno borracho**. **Corrección:** «Los hesianos salen corriendo de las casas, agotados por semanas de alarmas, y aun así forman y pelean. Un pífano de dieciséis años escribió después que no vio ni a uno borracho.» (29 palabras.)

8. **Escena 41: «no pregunto de dónde salen».** Insinúa que los zapatos se quitaron a prisioneros o a muertos, y la ficha precisa justo lo contrario: «de un almacén, no de un prisionero» (y que se repartiera botín es [D]). **Corrección:** «Al día siguiente, un sargento me consigue unos zapatos casi nuevos de un almacén que hemos tomado, y me los pongo despacio, como quien estrena un tesoro.»

### Leves

9. **Escena 7: la fecha de llegada al Delaware.** «Es martes, tres, cuando por fin vemos el Délauer». La ficha (§1) da como [V] que el ejército llega al río **el 2**, pero su tabla pone la llegada el día 3. **Corrección:** quitar la fecha (lo pide ya el punto 3): «Por fin vemos el Délauer, ancho y gris…», y avisar al Investigador de la contradicción.

10. **Barcas: el prop `bote` contradice lo que contamos.** `bote` es un bote pequeño con vela. En la escena 30 sale en primer plano (x 0, escala 0.75) y además es el dibujo de la tarjeta «12–18 m» de las barcas Durham, mientras el epílogo (57) y la descripción critican que en el cuadro «la barca es demasiado pequeña». También sale en las escenas 7, 9, 28, 32, 39 y 57. **Corrección:** en la 30, quitar `"prop": "bote"` de la tarjeta y poner `"icono": "🪵"`; en las escenas de río, dejar el `bote` solo lejos y pequeño (escala ≤ 0.5, a un lado). Mejor aún: que Producción haga el prop `barca-durham` que propone la ficha (§9).

11. **Escena 53: «llega el general Uáshington a caballo»**, pero en pantalla está de pie, `senalar`, al lado de Eli. **Corrección:** quitar a Washington del plano (Eli `caminar` y `senalar` hacia la izquierda) o añadir un 🐎 al fondo, lejos y pequeño. No poner a Eli junto al general (la ficha: Eli no trata con personas reales).

12. **Escena 37: el huerto de la rendición** lleva `pino`. La ficha (§9) pide frutales desnudos. **Corrección:** cambiar los dos `pino` por `arbol`.

13. **Escena 54: icono 🏛️** (templo de columnas clásico). Nassau Hall es un edificio georgiano de piedra, sin columnas. **Corrección:** `"prop": "casa"` en lugar del emoji, o 🔔.

14. **Gancho 2: primera frase sin contexto.** «Cae la noche y entra una tormenta del nordeste…» no dice ni qué noche ni dónde. **Corrección:** «La noche de Navidad de mil setecientos setenta y seis entra una tormenta del nordeste…» (+5 palabras; con el recorte de la 29 el gancho queda en 119). **Gancho 4:** empieza con «Es martes, treinta y uno…»; mejor «Hoy se acaba mi contrato, y el general Uáshington nos forma en la nieve para pedirnos que nos quedemos.»

15. **Escena 0: matiz de fecha.** «…y ese día el general Uáshington nos pedirá seis semanas más». La oferta es del 30, y el llamamiento a la tropa el 31 viene del relato [D] del sargento. Vale como gancho; si se quiere afinar: «…y el general Uáshington nos va a pedir seis semanas más por diez dólares.»

16. **Escena 45: el discurso del tambor.** La 44 ya lo presenta como relato de un sargento, pero la 45 da las palabras de Washington como si Eli las oyera. Aceptable por la ficción de Eli. Si cabe, en la 45: «…nos llama valientes, como contó aquel sargento, y el tambor redobla otra vez» (y quitar «dice que hemos hecho todo lo que nos pidió y más»: también ahorra palabras).

17. **Escena 30: «vamos de pie»** es [D] en la ficha (muy citado y lógico). Como lo cuenta Eli en primera persona, se acepta. Si se recorta para el gancho 2, sirve «y vamos apretados, sin sitio ni para sentarse».

18. **Pronunciación.** «Jersey» (escenas 3, 4, 10: «la orilla de Jersey») y «Maryland» (4) no tienen grafía. La voz puede leer «Jersey» con jota española. **Corrección:** vigilarlas en `revisar_voz.mjs`; si fallan, escribir «Nueva Yérsei» y «Mérilan» y añadirlas a `grafias`. En la escena 10 (si sigue), «la orilla de Nueva Jersey».

19. **Hessianos con `pileo` dorado.** Es un apaño para la mitra de granadero (el `pileo` es un gorro cónico de liberto romano). Revisar en `--muestras` que se lea como gorro militar alto y no como un capirote.

20. **Escena 58, cierre:** no dice que el vecino del pueblo (8) ni el sargento de los zapatos (41) son inventados. La descripción lo cubre a medias («sus compañeros»). Opcional: en la descripción, «…y los demás soldados y vecinos sin nombre también son inventados».

21. **Publicación, «Detalles discutidos»:** añadir que se cruzara de pie en las barcas y el día exacto de la llegada al Delaware (2 o 3 de diciembre). Si se aplica el punto 4, que la descripción no dé a entender que Glover remó en la retirada de primeros de diciembre (ahora no lo dice; vigilar al reescribir).

## Resumen

No hay errores de JSON, props, voces, emojis prohibidos, anacronismos (ni bandera de barras y estrellas ni otros) ni escenas gráficas, y los mitos (Paine, hessianos borrachos, tambor) van como mitos. Lo urgente: **recortar unas 90 palabras** (punto 1: quitar las escenas 36 y 10, que arreglan también los **ganchos demasiado largos**, punto 2), **variar las 21 aperturas con fecha** (3), **Glover remando el 5 de diciembre** cuando llegó el 20 (4), la **cuenta de los 10 $** (5), la **tarjeta de la orden de Nochebuena** (6), los hessianos «medio vestidos» (7) y los zapatos «de dónde salen» (8). El resto es visual o de matiz.

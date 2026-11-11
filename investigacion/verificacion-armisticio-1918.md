# Verificación: armisticio-1918

Revisado frente a `investigacion/armisticio-1918.md` y `oficina/GUIA_GUION.md`. Correcciones aplicadas en `guiones/armisticio-1918.json`.

## Correcciones aplicadas
- **Escena 0, hora de la firma:** «firmada desde las cinco de la mañana» → «desde poco después de las cinco». La ficha da 5:12–5:20 (hora oficial 5:00) y pide esa fórmula; así coincide con la escena 45.
- **Escena 2:** «el estafeta del regimiento» → «un estafeta»: Trébuchon era uno de los enlaces del 415.º, no el único.
- **Escena 22:** «El sargento me llama aparte» → «El teniente»: en pantalla aparece el personaje `teniente`.
- **Escena 23:** «Entre mayo y noviembre mueren…» → «Entre mayo y noviembre de este año morirán…»: el narrador está a 25 de octubre y la cifra (22.618, [V]) llega hasta noviembre. Fuera «Ninguno sale en los partes»: no está en la ficha.
- **Escena 29:** la frase acababa en el nombre corto «Én». Ahora es «el río Én nos corta el paso».
- **Escena 30 (paso del Aisne en Semuy):** fuera «en botes», porque la ficha no documenta cómo se cruzó y la escena 40 dice «sin barcas». Fuera también el prop `bote`, que es un bote salvavidas con vela. Ahora hay dos 🪵 (tablones) y `barricada`.
- **Escena 32:** heredaba el fondo del cruce en la niebla, pero el texto dice «bajo la lluvia». Se le ha puesto un fondo propio: `bosque` con lluvia (batalla de Le Chesne, Ardenas).
- **Escena 33:** «sin ver un uniforme azul» → «un uniforme francés» (en 1914 aún no existía el azul horizonte). Además, la `casa` tenía x 1.55 y se ha bajado a 1.5, el máximo que admite la guía.
- **Escena 36:** «Mañana los llevarán en tren» → «Esa noche los llevan en tren»: los delegados viajaron la noche del 7 al 8 y llegaron a Rethondes por la mañana. «Compiéñ» → «Compieñe», más natural en español y sin ñ final para la voz. La grafía se ha actualizado.
- **Escena 37:** el vagón pasa de `noche` a `dia`, porque Foch recibió a los alemanes la mañana del 8. Las escenas 45 (firma de madrugada) y 56 siguen de noche.
- **Escena 40, cita:** la redacción exacta de la orden no está documentada. La firma dice ahora «en sustancia: cruzar el Mosa cueste lo que cueste».
- **Escena 47:** «sale con un mensaje» → «lleva un mensaje». La ficha solo documenta que murió hacia las 10:45 llevando el mensaje de la sopa.
- **Escena 51 (bocas):** Émile llevaba `habla: false` y Delaluque no, así que movía la boca el corneta mientras tocaba. Ahora habla Émile, que va primero, y Delaluque lleva `habla: false`. El prop `bandera` (una bandera roja lisa) se ha quitado porque podía leerse como bandera revolucionaria (Kiel). En su lugar va un `pino`.

## Comprobado y correcto
- **Horas del 11 de noviembre:** firma poco después de las 5 ([V] la horquilla). Trébuchon, «a eso de las diez y cuarenta y cinco» ([V] el hecho; [D] el minuto, de ahí «a eso de»). Price a las 10:58 en Bélgica y Gunther a las 10:59 en Francia, con 23 años ([V]). Delaluque a las 11:00 ([V]). Sopa a las 11:30. «Diez y cuarenta y cuatro» más «dieciséis minutos» suman las 11:00.
- **Calendario:** día 1 = domingo 13 de octubre y día 30 = lunes 11 de noviembre. Todos los días de la semana citados son correctos (16 miércoles, 20 domingo, 22 martes, 25 viernes, 27 domingo, 30 miércoles, 1 viernes, 2 sábado, 3 domingo, 6 miércoles, 7 jueves, 8 viernes, 9 sábado, 10 domingo). Capítulos en los días 1, 8, 15 y 22.
- **Hechos:** Retourne, Laon (13 oct.), Aisne frente a Rethel, Ludendorff («estos días», [D] el día exacto), Mudros, Semuy (2 nov.), Villa Giusti, Kiel, Haudroy 20:20 (Sellier), 72 horas, el Mosa el 8, la orden del 9, las pasarelas sobre la presa rota, unos 700 hombres («cuentan que») y la niebla que se levanta a las 10:30. Además: el pinard (75 cl), el Lebel (más de 4 kg), unos 30 kg de equipo, 22.618 y más de 30.000 muertos por gripe, unos 2.700 muertos el último día («según algunos historiadores»), la tumba fechada el día 10, Versalles y el vagón en 1940 (sin imágenes). No se usa nada de la lista «NO USAR»: ni 11:11, ni «el último muerto de la guerra», ni «loco» ni «suicida».
- **Ética:** a Trébuchon, Price y Gunther no se les ponen palabras ni pensamientos. Nunca se ve a Trébuchon en el momento de su muerte: aparece de lejos y caminando con el 📜. Price y Gunther no salen en pantalla. De Gunther solo se dice que «nadie sabe por qué cargó». No hay heridas ni cadáveres. Las muertes se cuentan por la hora, el mensaje y la tumba.
- **Uniformes:** en pantalla solo salen franceses, todos en azul horizonte con `casco` (cúpula con cresta, como el Adrian). El teniente lleva gorra (quepis). Foch va en azul oscuro con gorra, y Erzberger de civil, con traje y gafas. No aparecen alemanes, británicos ni estadounidenses, así que no hace falta casco Brodie ni Stahlhelm. Las mujeres (`madre`, `anciana`) llevan `narradora-es` y `habla: false`.
- **Emojis:** 🪵 se entiende como tablones porque el texto los nombra y está a escala 0.45–0.5 junto al agua. No hay ningún emoji prohibido (🔫 🚢 🗼 🪖 🪦) ni secuencias ZWJ.
- **Catálogo:** todos los lugares, props, acciones, ropa y sombreros existen. El refugio lleva `ventana: false` y la `tumba` cristiana sale en cementerios franceses.
- **Pronunciación:** todas las palabras escritas como suenan están en `grafias`, que distingue mayúsculas: «Én» no toca a «en». «Fosh» y «Trebushón» siguen la convención de la casa, que ya usó «Meshica» y «Comérshal». «Yorch Práis», «Énri Gúnter», «Lúdendorf», «Kil», «Delalúk», «Losér» y «Ogustán» suenan bien en español. El seseo ya estaba reducido al mínimo: once, cinco, diez, francés, silencio y armisticio no tienen sinónimo natural.
- JSON válido, sin cifras en `texto` y con todos los `quien` en el reparto.

## Cifras finales
- 1.546 palabras y 60 escenas, todas de 15 a 36 palabras.
- 15 bloques de short, de 97 a 106 palabras, cada uno empezando por `corte: true` (escena 0 incluida), y 15 entradas en `publicacion.shorts`. `tituloCorto` presente.

## Riesgos que quedan
- «Fosh» y «Trebushón»: hay que comprobar con `revisar_voz.mjs` que la voz no los lea como «Fos» o «Trebusón».
- Los 🪵 pueden parecer troncos más que tablones: hay que revisarlo en las muestras de las escenas 30 y 41.

# Verificación: guiones/bastogne-1944.json

Comparado con `investigacion/bastogne-1944.md` y `oficina/GUIA_GUION.md`. Escenas numeradas desde 0 (índice en `largo.escenas`).

## Comprobaciones que pasan

- JSON válido. 61 escenas (50–65). 1.524 palabras de `texto` (1.350–1.550; queda cerca del tope).
- Días de la semana correctos en todas las escenas que los dicen (mar 28 nov = día 1 … mié 27 dic = día 30). El campo `dia` sube sin saltos raros; 4 capítulos (días 1, 8, 15, 24), como propone la ficha (§10).
- Todos los props existen en `PROPS_DISPONIBLES`; todos los lugares, acciones, peinados, ropas y sombreros existen en el motor. Cada `quien` está en `reparto`.
- Voces: `socorro`, `lupe`, `renee`, `augusta` y `vecina` llevan `"voz": "narradora-es"`. Ninguna escena las hace hablar (todas con `habla: false`), así que la voz sigue siendo la del narrador.
- Ningún emoji de la lista prohibida (ni banderas, ni 🥜, ni 🪖, ni ZWJ, ni ✈️/🚚). Ninguna tarjeta con caras.
- Ningún mito de *Band of Brothers*: no salen la Compañía E, Foy, Roe ni «Anna». El «rescate» se trata bien (escena 53) y «Nuts» no se presenta como una palabrota disimulada.
- Nada gráfico: el bombardeo de Nochebuena se cuenta desde fuera, y los muertos se nombran con respeto.
- Las grafías están completas para todas las palabras escritas como suenan.
- El protagonista inventado se dice en el cierre (escena 59) y en la descripción.
- Ganchos: 102, 100, 104 y 120 palabras (95–120).
- La última escena no lleva `insercion`. En la primera escena, el protagonista está en x = 0.4.
- Cifras correctas: 100 $, 170 km, 72 días, 341 muertos (1.691 + 516 = más de dos mil), 24 vecinos y más de 600 sábanas, Renée con 30 años, la Champagne Bowl 74 años tarde, Chiwy en 2011 y 2015.

## Errores y correcciones propuestas

1. **Escena 30: hecho.** «Cuatro alemanes con una bandera blanca llegan hasta *nuestras líneas*». Llegaron al sector del 327.º, al sur, por la carretera de Arlon, no al del 502.º (noroeste), donde está Ray. **Corrección:** «…llegan a las líneas americanas, al sur, por la carretera de Arlon».
2. **Gancho 2 (escenas 30–33): primera frase.** «Viernes, veintidós de diciembre.» no engancha sin contexto. **Corrección:** abrir la escena 30 con «Cuatro alemanes con una bandera blanca cruzan la nieve hacia las líneas americanas. No vienen a rendirse…» y pasar la fecha detrás («Es el veintidós de diciembre»). Así se arregla también el punto 1.
3. **Escena 38: cita inexacta.** «Arranca así: ¿qué tiene de feliz todo esto?, preguntaréis». El mensaje de McAuliffe empieza con «¡Feliz Navidad!» («Merry Christmas!») y sigue con «What's merry about all this, you ask?». **Corrección:** «Empieza con un "¡Feliz Navidad!" y sigue: ¿qué tiene de feliz todo esto?, preguntaréis». Además, Ray hace `escribir` mientras lee el mensaje: mejor `cargar` con `"objeto": "📜"` o `quieto`.
4. **Escena 49: hecho y aviso de la ficha (§7).** «le da la mano al primer *paracaidista* que encuentra, un teniente de ingenieros». Duane Webster era del 326.º Batallón de Ingenieros Aerotransportado, no necesariamente paracaidista, y la ficha pide no llamar «paracaidistas» a todos. **Corrección:** «…al primer hombre de la ciento uno que encuentra, un teniente de ingenieros».
5. **Escenas 48–49: coherencia visual.** El texto dice que Ray se entera «por la radio» (la ficha: «Ray no lo ve; lo oye por radio»), pero la escena 49 pone el `tanque` a 0.95 con Ray celebrando a su lado. Además, el prop `tanque` apunta el cañón a la derecha, hacia Ray y el sargento, y sin insignias puede parecer alemán (el mismo prop sale como alemán en la escena 45). **Corrección:** quitar el `tanque` de la escena 49 (dejar solo la tarjeta del dato) o ponerlo muy lejos y pequeño (escala ≤ 0.4) sin que nadie le señale.
6. **Escena 42: cifra discutida dada como cerrada.** «Mueren unos treinta heridos americanos». La ficha dice 25–30 [D]. **Corrección:** «Mueren entre veinticinco y treinta heridos americanos». Opcional: «Augusta, que estaba en la casa de al lado, sobrevive» (es un hecho [V] y explica por qué sobrevive).
7. **Escena 28: cifras [D] sin suavizar.** «Dentro quedamos más de diez mil soldados y unos tres mil vecinos». La ficha marca las dos cifras como dudosas (11.000–14.000 y unos 3.000). **Corrección:** «Dicen que dentro quedamos más de diez mil soldados y unos tres mil vecinos…», o «miles de soldados y miles de vecinos».
8. **Escena 24: precisión.** «unos ciento treinta *médicos y sanitarios*». La ficha habla de 11 oficiales y 119 soldados de la compañía médica, y la cifra es discutida. **Corrección:** «unos ciento treinta hombres de la compañía médica». La tarjeta puede seguir igual.
9. **Escena 39: precisión de fecha y clima.** «*Esa mañana*, los vecinos de Emrul…»: la ficha fecha las sábanas el 24, pero no a qué hora. **Corrección:** «Ese día…». Además, el fondo lleva `"clima": "nieve"` (nevando) el 24, que rompe el giro del cielo limpio del 23 al 26 (ficha §9) y no casa con las escenas 38 y 41 (despejado). **Corrección:** `"clima": "despejado", "nevado": true`.
10. **Publicación: descripción.** Dice que son reales «todas las cifras del vídeo», pero varias son discutidas (130 capturados, 241–253 aviones, más de 10.000 soldados y 3.000 civiles, 25–30 muertos en Nochebuena). **Corrección:** «…y las cifras del vídeo (las discutidas se dan con horquilla o como aproximadas)». Añadir en «Detalles discutidos»: la cifra de capturados del hospital y la de soldados y civiles dentro del cerco.
11. **Escena 59: cierre incompleto.** Se dice que son inventados Ray, su familia y Billy, pero no el sargento, que sale en las escenas 16, 38, 48 y 49 (la descripción sí lo dice). **Corrección:** «Rei Molina, su familia, Bili Dan y el sargento son inventados». Ojo: la escena pasaría de 27 a 30 palabras y el total a 1.527; sigue dentro del rango.
12. **Gancho 3 (escenas 35–38): final flojo.** Acaba en la escena 38 con el mensaje de Navidad, que no cierra la historia de los lanzamientos y se entiende mal suelto. Las escenas 35–37 suman solo 83 palabras. **Corrección:** alargar la escena 37 con una frase de cierre (por ejemplo, «Esa noche, por primera vez en días, nadie racionó los cartuchos») y terminar el gancho en la 37, o dejar la escena 38 pero cambiar su texto según el punto 3, para que acabe en intriga.
13. **Escena 16: emoji engañoso.** 👢 es una bota alta de mujer y no representa unas botas de goma. **Corrección:** quitar ese elemento o cambiarlo por «🧦 Calcetines de repuesto» (también faltaban).
14. **Escena 0: matiz.** «Esta Navidad, los alemanes me van a dar dos horas…». El ultimátum es del 22, no del día de Navidad, y no se le dio a Ray. Es aceptable como gancho (la ficha lo propone), pero sería más exacto decir: «Estas Navidades, los alemanes nos van a dar dos horas para rendirnos». Gravedad baja.
15. **Escena 40: posición del prop.** La 🕯️ en x = 0, sin `mesa`, queda en el suelo entre las dos enfermeras. **Corrección:** añadir `{ "tipo": "mesa", "x": 0 }` antes de la vela, o subir la vela a una `mesa` en un lado. Gravedad baja: revisar en `--muestras`.
16. **Escena 24: clima.** El 19 de diciembre llovía y nevaba a ratos; la nieve espesa llega hacia el 22–23 (ficha §6). `"clima": "nieve"` vale, pero la ficha (§9) sugiere niebla del 19 al 22. Es opcional y de baja gravedad.

## Resumen

No hay errores de JSON, props, voces, emojis prohibidos ni mitos de la serie. Las correcciones de fondo son las 1–4 (sector del ultimátum, gancho 2, texto del mensaje de Navidad y «paracaidista» Webster) y la 5 (el tanque que Ray no vio). Las 6–10 suavizan cifras discutidas, y las demás son menores.

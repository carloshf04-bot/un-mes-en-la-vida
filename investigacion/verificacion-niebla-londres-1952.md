# Verificación: `guiones/niebla-londres-1952.json`

Comparado con `investigacion/niebla-londres-1952.md` y `oficina/GUIA_GUION.md`. Los números de escena son índices del array `largo.escenas`, empezando en 0 (los mismos que usan `ganchos` y `miniatura.escena`).

## Comprobaciones que pasan

- **JSON válido.**
- **58 escenas** (debe haber de 50 a 65). **1.509 palabras** de texto (de 1.350 a 1.550). Cada escena tiene de 17 a 37 palabras.
- **Ganchos:** 0–3 tiene 115 palabras, 25–28 tiene 112, 31–34 tiene 106 y 43–47 tiene 117. Todos están entre 95 y 120.
- **Calendario:** el día 1 es el viernes 21 de noviembre y el día 30 el sábado 20 de diciembre. Todos los días de la semana que nombra el texto cuadran con el campo `dia`: 21 nov. viernes, 22 sábado, 23 domingo, 24 lunes, 25 martes, 26 miércoles, 28 viernes, 29 sábado, 1 dic. lunes, 4 jueves, 5 viernes, 6 sábado, 7 domingo, 8 lunes, 9 martes, 11 jueves, 12 viernes, 16 martes, 18 jueves y 20 sábado. Los capítulos empiezan en los días 1, 8, 15 y 22. No llevan `dia` la primera escena, la presentación, el epílogo ni el cierre.
- **Fechas y cifras clave correctas:** «The Mousetrap» se estrenó el 25 nov.; el anticiclón llegó el 4 dic.; la niebla duró del 5 al 9 dic.; «La Traviata» se suspendió el 6 dic.; la feria de ganado abrió el lunes 8; el viento del oeste llegó el 9; la cifra de Macleod (4.703 frente a 1.852) se dio el 16 dic.; la pregunta en el Parlamento fue el 18 dic.; el azúcar se debatió el 1 dic. y la mantequilla el 26 nov. También están bien las 370 t de SO₂, los 100–200 m de espesor de la capa, las cifras de 4.000 y ~12.000 (la de 12.000 se presenta bien, hasta febrero y no «en cinco días»), la Clean Air Act de 1956, el fin del racionamiento de caramelos en febrero y la coronación en junio.
- **Lista «NO USAR» de la ficha, sin infracciones:** no hay mascarillas de farmacia, máquina Gibson, tranvías circulando, té racionado, cifra exacta de reses muertas ni marcas.
- **Nada gráfico:** la muerte se cuenta con huecos (la parada vacía, las flores, los ataúdes y las cifras).
- **Props, lugares, climas, paredes, acciones, sombreros, peinados y tipos de ropa:** todos existen en `PROPS_DISPONIBLES` y en `Fondo.tsx`/`Personaje.tsx`, incluidos `autobus`, `central`, `smog`, `nublado`, `chimenea-apagada`, `perchero` y `pizarra`. Todos los `quien` están en `reparto`.
- **Voces:** el narrador es masculino por defecto (no lleva `voz`). `mei` y `madre` llevan `"voz": "narradora-es"`. Todos los personajes van con `habla: false` (voz en off), así que no hay cambios de voz no deseados.
- **Números:** no hay ninguna cifra escrita con dígitos dentro de `texto`.
- **Grafías:** todas las palabras escritas como suenan tienen su entrada (Jarri, Dóson, Leni, Prais, Mei, Tómi, Grin, Ist, Ágata, Cristi, Sádlers, Uéls, Ian, Maclaud).
- **Narrador inventado:** se dice en la escena 56 y en el AVISO de `publicacion.descripcion`.
- **Emojis prohibidos:** no hay 🗼, 🚢 ni secuencias ZWJ. La última escena no lleva inserción.

## Errores y correcciones propuestas

### Importantes (hechos y tarjetas)

1. **Escena 0 (y gancho 1): exageración que la ficha no respalda.** «En Londres no se veía ni la propia mano», dicho como hecho y para cinco días seguidos. La ficha solo verifica «pocos metros»; lo de «un metro» y «no se veía los pies» está marcado como dudoso [D]. **Corrección:** «Durante cinco días de diciembre de mil novecientos cincuenta y dos, en Londres apenas se veía a unos pasos; dicen que había quien no se veía los pies.» Otra opción: «…la niebla era tan espesa que la gente se perdía en su propia calle».

2. **Escena 32: generalización falsa.** «Esos días tampoco hubo películas ni conciertos en todo Londres.» La ficha solo dice que cines y conciertos también se cancelaron [V], no que se cancelaran todos. **Corrección:** «Esos días se suspendieron también muchas sesiones de cine y conciertos.»

3. **Escena 32: cita inventada.** La inserción `cita` («La función de "La Traviata" se suspende tras el primer acto: el público ya no ve el escenario.», firmada por «Sadler's Wells, Londres, 6 de diciembre de 1952») se presenta como cita textual, pero nadie la dijo. **Corrección:** cambiarla a una tarjeta `dato`: `{ "tipo": "dato", "valor": "6 dic. 1952", "etiqueta": "«La Traviata» se suspende en Sadler's Wells: la niebla llena el teatro y el público no ve el escenario", "icono": "🎻" }`. Otra opción: dejarla como cita, pero con la frase real de Stan Cribb o de otro testigo de la ficha.

4. **Escenas 11 y 54: emojis con cara en tarjetas.** En la escena 11 la inserción `dato` lleva `"icono": "🎭"` (dos máscaras de teatro con cara). En la escena 54 lleva `"icono": "🌬️"` (la «cara de viento» que sopla). **Corrección:** en la 11, 🎟️ o 📜. En la 54, 💨, 🏭 con tachón no existe, así que mejor 🌳 o ☁️. En la escena 31 el prop `🎭` sobre las columnas también es una cara: cambiarlo por 🎻 o quitarlo.

5. **Escena 6: dato del futuro en una tarjeta de la época.** La tarjeta «La cartilla de Mei» dice «Carbón, racionado hasta 1958». La cartilla de 1952 no puede saber cuándo acaba el racionamiento. **Corrección:** «Carbón: también con cupo». El dato de 1958 puede ir en la descripción o en el epílogo.

6. **Escena 6: «Casi todo sigue racionado».** Es una exageración: el pan, el pescado, las patatas y la verdura no estaban racionados. **Corrección:** «Muchas cosas siguen racionadas: mantequilla, azúcar, carne, bacon, queso. Y el carbón.»

7. **Escenas 13 y 6: mantequilla «en 1952».** La ficha verifica 2 oz en **octubre** de 1952 y marca como dudoso [D] un aumento anunciado en noviembre. **Corrección:** en la etiqueta de la escena 13, «…por persona y semana (unos 57 g) en el otoño de 1952». En la escena 6, «Mantequilla: unas 2 onzas a la semana».

8. **Escena 46: el periódico del mismo día.** Macleod dio la cifra por escrito el martes 16, así que no podía salir en el periódico ese mismo día. **Corrección:** «Martes, dieciséis. En el Parlamento, el ministro de Sanidad, Ian Maclaud, da por fin una cifra. Al día siguiente la leo en voz alta en la cantina.» Otra opción: pasar la lectura a una escena con `dia` 27.

9. **Escena 49: «hospitales llenos».** La respuesta del 18 de diciembre trata de muertes e **ingresos hospitalarios**. «Llenos» es una inferencia. **Corrección:** «…vuelven a preguntar por los muertos y por los ingresos en los hospitales.»

10. **Escena 48: «Dos veces y media más».** En sentido estricto significa 3,5 veces; la proporción real es 4.703/1.852 = 2,54. **Corrección:** «Dos veces y media las de un año antes.» Otra opción: «Más del doble.»

11. **Escena 17: fábricas sin respaldo en la ficha.** La tarjeta incluye «Fábricas junto al río» y el texto dice «en las fábricas». La ficha no menciona las fábricas como fuente del humo, solo las casas, las centrales y los autobuses diésel. Es verosímil, pero no está documentado. **Corrección:** quitar ese ítem (la tarjeta queda con 3) o pedir al investigador una fuente. En el texto: «Londres quema carbón en las casas y en las centrales eléctricas, dentro de la misma ciudad.»

### Lenguaje y voz

12. **Escena 27: falta de concordancia.** «Solo se oye el motor y los pasos de Leni» debe ser «Solo se oyen el motor y los pasos de Leni».

13. **Escenas 6 y 9: «bacon».** Para la voz en español es mejor la grafía española «beicon», que se lee bien. Si se mantiene «bacon», añadir la grafía `"beicon": "bacon"` y escribir «beicon» en `texto`.

14. **Escena 34–35: tres calles en casi una hora.** «A tres calles» y «Tardo casi una hora» resultan poco creíbles juntos. **Corrección:** «a unas cuantas calles» o «al otro lado del barrio».

### Ganchos y publicación

15. **Gancho 3 (31–34): termina fuera del tema.** El tramo acaba en la escena 34 («Domingo… siguiendo el bordillo…»), que ya no habla de la ópera. Sin la escena 34 solo suma 78 palabras. **Corrección:** alargar las escenas 31–33 en unas 20 palabras (por ejemplo, el público tosiendo sin ver nada, sin detalles gráficos, o que fuera de la sala no se veía la acera) y poner `"hasta": 33`, para que acabe en «Todavía nos reímos.», que es un buen cierre con intriga.

16. **Gancho 3: descripción sin aviso.** Su `descripcion` no dice «Personaje inventado; los hechos, reales.», como los otros tres ganchos. Añadirlo, aquí y en `publicacion.shorts[2]`.

17. **Gancho 2 (25): primera frase floja.** «Es el cinco de diciembre de mil novecientos cincuenta y dos, en Londres.» sitúa, pero no engancha. **Corrección:** empezar con la imagen: «El cinco de diciembre de mil novecientos cincuenta y dos, al caer la noche, Londres desapareció. Desde mi autobús ya no veo ni el bordillo…»

18. **Gancho 4 (43): primera frase dependiente.** «Cuando la niebla se fue…» depende de saber cuál. **Corrección:** «Cuando la gran niebla de Londres se fue, en diciembre de mil novecientos cincuenta y dos, en las floristerías no quedaban flores.» Hay margen: el gancho tiene 117 palabras, así que conviene recortar algo en la escena 45.

### Escena y producción (revisar en `--muestras`)

19. **Escena 4: Jarri sentado en medio de la calle.** Está `sentado` en x 0.4, en la calle y lejos del autobús (x -0.8), mientras dice «voy en mi cabina». La escena 50 tiene el mismo problema, con Jarri `sentado` junto al autobús en x 0. **Corrección:** `quieto` o `hablar` de pie, junto al morro del autobús. Otra opción: autobús solo y Jarri fuera de plano.

20. **Escena 5: posible solape.** El autobús está en x 0.45 con escala 0.55 (unas 616 px de ancho) y Jarri en x 0.1, así que es probable que se solapen. **Corrección:** autobús en x -0.75 o en x 1.2, o Jarri en x -0.3, entre los escombros.

21. **Escena 50: Jarri delante del autobús.** El autobús está en x 0.0 y Jarri en x 0.4, así que lo tapa en parte. **Corrección:** mover el autobús a x -0.3 o quitarlo de esta escena.

22. **Escena 23: luz que no cuadra con el texto.** El texto dice «Amanece con niebla» y «a las seis», pero el fondo tiene `"hora": "dia"`. **Corrección:** `"hora": "amanecer"`.

23. **Escena 12: niebla que no se ve.** El texto habla de «niebla ligera», pero el clima es `nublado`. **Corrección:** `"clima": "niebla"`, para que se vea la niebla normal antes del `smog`.

24. **Escena 36: hogar apagado sin explicación.** En casa de la madre hay `chimenea-apagada` en pleno frío, y el texto no lo explica. **Corrección:** poner `chimenea`, o añadir al texto que la madre no ha encendido el fuego para no ahumar más la casa.

25. **Inserciones demasiado separadas.** Entre la escena 21 y la 28 pasan 7 escenas sin inserción (la guía pide una cada 4–6). **Corrección:** añadir una tarjeta en la escena 24 o en la 25, por ejemplo `dato`: «pocos metros», «de visibilidad al caer la noche del 5 de diciembre (Met Office)», con el icono 🌫️.

26. **Policía: casco poco reconocible.** El sombrero `casco` se dibuja como un casco de obra, de cúpula baja con ala. En azul marino sirve, pero no se reconoce como casco de *bobby*. Opcional: añadir al motor un sombrero `casco-policia` (casco alto con cresta y placa) y documentarlo en la guía.

## Notas para el Director (no son errores)

- La ficha numera el mes del 20 de noviembre al 20 de diciembre (31 días, con el 5 de diciembre como día 16). El guion usa del 21 de noviembre al 20 de diciembre (30 días, con el 5 de diciembre como día 15). Es coherente consigo mismo y con la descripción, «del 21 de noviembre al 20 de diciembre».
- `miniatura.escena: 26` apunta bien a la escena de Leni con la bengala.

# Verificación: guiones/jol-950.json

Comparado con `investigacion/jol-950.md` y `oficina/GUIA_GUION.md`. Las escenas se numeran desde 0, como en `largo.escenas`. Aquí solo se listan los errores; las correcciones las hace el Guionista.

## Lo que está bien (no hay que tocarlo)

- El JSON es válido. Tiene 58 escenas (piden 50–65) y 1.533 palabras de texto (piden 1.350–1.550; está cerca del máximo, así que conviene comprobar la duración con `--sin-render`). Cada escena tiene entre 15 y 35 palabras y no hay cifras dentro de `texto`.
- Hay 4 capítulos (escenas 3, 17, 27 y 36). El campo `dia` sigue el día de diciembre y siempre sube: 1→30. Encaja con la ficha: luna nueva el 12, solsticio el 15, mensajero el 16, rumor el 18, víspera el 24, Mære el 25, luna llena el 26 y vuelta del padre el 29. Las cuentas también cuadran: el día 7 cae en sábado (Laugardagr) y el día 4 «faltan veintiuno» para el 25. La luna sale bien: la escena 22 lleva `luna: false`, la 37 (creciente gibosa) y la 47 (llena) llevan `luna: true`.
- `"voz": "narradora-es"` está en el guion y en los 7 Looks femeninos: asa, asa_capa, gudrun, gudrun_fiesta, alfhild, brigida y hild.
- La voz dice «Yol» en todo el texto y no queda ningún «Jól» ni ninguna «J» nórdica. Las grafías cubren Yol, yul, Tórgueir, Gúdrun, Kólbein, Sígurd, Ládir, Mére, Ásbiorn, Blótolf, Tor, Éyvind, Valhala, Láugardag y Fítiar.
- Ganchos: 114, 97, 117 y 115 palabras, todos dentro de 95–120. Sus primeras frases se entienden sin contexto.
- El folclore tardío está bien tratado. La oskoreia aparece solo como miedo de un personaje y la escena 24 lo aclara: «se recogió en el siglo diecinueve». No hay sangre ni sacrificio en pantalla, ni hígado dibujado. No hay cascos con cuernos, ni velas de cera, ni «vikingos» como nombre del pueblo.
- La protagonista inventada se dice en la escena 1, en el cierre (57), en la descripción y en el gancho 1.
- Los interiores de la casa larga llevan `ventana: false`. Todos los props, lugares y acciones existen en el motor, y cada `quien` está en el reparto. La última escena no tiene inserción.

## Errores y correcciones propuestas

### Rigor: anacronismos y saga

1. **Escena 46.** «Mi padre dice que comer caballo es comer con nuestros dioses; los cristianos acabarán prohibiéndolo.» Hay dos fallos. El día 25 el padre está en Mære, así que Ása no puede oírlo. Y además el padre «predice» la prohibición cristiana. **Corrección:** «Comer caballo era comer con los viejos dioses. Siglos después, los cristianos lo prohibirían. Aquella noche, el rey perdió algo más que el apetito.»
2. **Escena 55.** «Odín no es Papá Noel: eso se inventó a finales del siglo veinte.» La ficha dice que la idea se *popularizó* en 1997 (Siefker) y en webs; no dice cuándo se inventó. **Corrección:** «eso se popularizó a finales del siglo veinte». En la tarjeta: «Odín = Papá Noel (idea moderna)».
3. **Escena 47.** «Tres noches de Yol… y cerveza mientras dure.» Según Snorri, las «tres noches» eran la duración del Jól antiguo, de antes de la ley. Con la ley de Hákon la fiesta dura lo que dura la cerveza: es lo que dicen las escenas 3 y 50. Así el guion se contradice. **Corrección:** «Tres noches de banquete, con luna llena sobre la nieve, y el Yol durará lo que dure la cerveza.»
4. **Escena 30.** «Nadie sabe ya qué noche era.» La abuela del 950 sí lo sabría. La duda es de los estudiosos de hoy. **Corrección:** «Hoy los estudiosos discuten qué noche era.»
5. **Escena 0 (y gancho 1).** «Este invierno, el rey ha hecho una ley» presenta la ley como nueva en el 950. Snorri no le pone fecha. **Corrección:** «Nuestro rey ha hecho una ley: …». También se puede dejar solo «El rey ha hecho una ley».
6. **Escena 34.** La conjura de los jefes de Innherred y el nombre de Blótólfr vienen de Snorri, pero salen como un rumor sin fuente. **Corrección:** «El día dieciocho corre un rumor. Según la saga, unos jefes de aquí juraron obligar al rey a sacrificar. Uno se llamaba Blótolf: Lobo del Sacrificio.»
7. **`publicacion` (primer párrafo de la descripción), `tituloLargo`, `tituloShort` y el `titulo` del gancho 3.** Dan como hecho que «en el banquete… los campesinos le obligan a comer de los sacrificios» y que el rey fue «obligado a comer hígado de caballo». **Corrección:** en la descripción, «según la saga, en el banquete del Jól en Mære los campesinos le obligaron…». En los títulos basta con que la descripción lo matice, pero si cabe es mejor «…según la saga».
8. **Escena 19 (firma de la cita).** La única fuente del álfablót es Sigvatr, en **Suecia**, hacia 1019. **Corrección de la firma:** «Una mujer al poeta Sigvatr en una granja de Suecia (Austrfararvísur, hacia 1019; paráfrasis)». El texto puede quedarse como recuerdo de la abuela.
9. **Escena 31.** «un griego, Procopio». Procopio era un historiador bizantino de Cesarea que escribía en griego. **Corrección:** «un historiador bizantino, Procopio».
10. **Escena 1 (tarjeta de mapa) y descripción.** Pone «Fiordo de Trondheim · hacia el 950», y Trondheim no existe hasta el 997 (ficha, NO USAR n.º 8). **Corrección:** en la tarjeta, «Trøndelag (Noruega) · hacia el 950 · el mes del Jól». En la descripción, «al fondo del fiordo que hoy se llama de Trondheim».

### Decorado, emojis y tarjetas

11. **Escena 50.** El prop `velero` es un balandro moderno: un mástil, dos velas triangulares y un gallardete rojo. Además, el lugar `mar` pone en primer plano la cubierta y la borda de «nuestro barco». Las dos cosas son anacrónicas. **Corrección:** quitar `velero` y usar `playa` o `rio` con `nublado` y la orilla vacía, o `montanas` con `nieve`. No existe barco vikingo en el motor.
12. **Escena 54 (tarjeta «Lo que sí viene del Jól»).** El icono 🗣️ es una cabeza de perfil, es decir, una cara en una tarjeta. **Corrección:** cambiarlo por 📜 o 🌙.
13. **Escena 54.** El icono 📅 es un calendario moderno de hojas, y en algunas fuentes de emoji pone «JUL 17», lo que confunde con *jul*. **Corrección:** ☀️ (la fecha del solsticio y la Navidad) o 🌙.
14. **Escena 9 (tarjeta «La cerveza del Jól»).** El icono 🪣 es un cubo moderno de metal o plástico con asa. **Corrección:** 🫧 (fermentación) o 🥣.
15. **Escena 22.** El texto dice que el caballo amaneció «en el establo», pero el 🐎 está fuera, en la nieve, de noche. **Corrección:** quitar el 🐎 del exterior. Si se quiere, se puede añadir `aurora` (existe en el motor) para la noche sin luna, que la ficha propone como dato real a 64° N.
16. **Escena 10.** «Mi madre teje de pie, en el telar», pero no hay telar en el plano. El motor tiene el prop `telar` (telar vertical nórdico de pesas, `Props.tsx`), aunque todavía no está documentado en la guía. **Corrección:** añadir `{ "tipo": "telar", "x": 0.75 }` a esa escena, detrás de Gudrun.
17. **Escenas 9 y 15.** Gudrun hace `cargar` con 🪨 en las manos, y en la escena 9 son «piedras al rojo». Llevarlas a mano desnuda queda raro. **Corrección:** en la 9, quitar el objeto (`trabajar`); en la 15 vale.
18. **Escena 39.** El texto dice que el padre «levanta el cuerno», pero el objeto es 🥣 (un cuenco). Es aceptable, porque Snorri habla de copas y cuencos, pero choca con lo que se oye. **Corrección:** cambiar el texto a «levanta la copa» o dejar el cuenco.
19. **Escena 40.** El texto dice «con un barril a cuestas», pero nadie lleva objeto. **Corrección:** quitar la frase o poner a Kolbein con `cargar` y un objeto. Lo que no conviene es la jarra 🍺, que está prohibida.

### Shorts

20. **Gancho 4 (escenas 53–56).** «Las mismas palabras de mi padre» no se entiende en el short, porque el brindis del padre es de la escena 39. **Corrección:** «Las mismas palabras que se decían en el viejo Yol.» Así funciona en el largo y en el short. Ojo: el cambio no debe sacar el gancho de 95–120 palabras.

### Para el Director (fuera del guion)

- En `Props.tsx` existen `telar`, `aurora`, `norseman`, `nissen` y `torre-control`, pero no están en `oficina/GUIA_GUION.md`. Hay que documentarlos.

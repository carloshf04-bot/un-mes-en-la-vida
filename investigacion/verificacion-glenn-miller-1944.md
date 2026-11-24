# Verificación: guiones/glenn-miller-1944.json

Comparado con `investigacion/glenn-miller-1944.md` y `oficina/GUIA_GUION.md`. Los números de escena empiezan en 0 (índice de `largo.escenas`).

## Comprobaciones que pasan

- JSON válido. 58 escenas (50–65). 1.494 palabras de `texto` (1.350–1.550). Cada escena entre 18 y 34 palabras.
- 4 capítulos (escenas 4, 19, 24 y 42). Sin `dia` en la primera escena ni en el epílogo y el cierre. Sin inserción en la última escena. Protagonista en x 0.45 en la escena 0.
- Fechas con día de la semana correctas: dom 26 nov, sáb 2 dic, dom 3 dic, sáb 9 dic, dom 10, mar 12, mié 13, jue 14, vie 15, sáb 16, lun 18, sáb 23. Del campo `dia` sale el 26 de noviembre como día 1 y el 25 de diciembre como día 30. Encaja, salvo en el error 4.
- Las cifras coinciden con la ficha: 168 muertos, más de 60 soldados en Sloane Court, 84 horas, 78 $ + 20 %, 5 chelines, raciones, 76 m, 4 minutos, 13:55, 138 Lancaster, 17 años, informe 10770, unos 40 muertos en la zona de Manchester, 16-XII-1945.
- La frase de los paracaídas va con «Cuentan que» y «Yo no lo oí» (33). El vigía y la costa van con «Según Spragg» y «Nadie sabe seguro» (38–39). Se usa la fórmula «no figuraban en ninguna lista» (41). La teoría de los Lancaster lleva sus objeciones (53). Las leyendas de París no se nombran. Bien.
- Los tres desaparecidos se recuerdan por su nombre (55) y en la descripción. Baessell aparece sin la «presión» al piloto [D], y nada es denigrante en el texto.
- La escena 56 y la descripción dicen que el narrador es inventado. La descripción nombra también a Fletcher, Peggy y Hank como inventados.
- No hay emojis prohibidos (🗼, 🚢) ni secuencias ZWJ. No hay caras en las tarjetas.
- Todos los props, lugares, acciones, sombreros y tipos de ropa existen en el motor. Todo `quien` está en el reparto. Peggy lleva `"voz": "narradora-es"` y nunca tiene `habla`.
- Cada palabra escrita como suena tiene su grafía.
- Ganchos: 0–3 tiene 99 palabras, 32–35 tiene 114, 36–39 tiene 114 y 42–46 tiene 111. Todos están entre 95 y 120.

## Errores y correcciones propuestas

### Críticos (rigor y respeto)

1. **Gancho 3 (escenas 36–39) y su `descripcion`: sugiere la teoría de las bombas sin la objeción.** El short sale solo. Pone en fila «138 Lancaster soltaron sus bombas… El mismo mar que tenía que pasar el Norseman» y «¿Coincidencia?», pero no incluye la escena 53 (según Spragg, las bombas cayeron unos 90 minutos antes, y Shaw lo contó en 1984). Además, Miller no se nombra en todo el tramo: «el Nórsman» y «el suyo» no se entienden sin contexto.
   *Corrección:*
   - Escena 36: «El día que desapareció Glen Míler, ciento treinta y ocho bombarderos Lancáster salieron rumbo a Alemania…».
   - Escena 37: cambiar la última frase por «Por ese mar tenía que pasar el avión de Míler, aunque, según los registros, mucho más tarde».
   - Descripción: quitar «¿Coincidencia?» y poner «…soltaron sus bombas en el Canal. Según el historiador Dennis Spragg, unos 90 minutos antes de que pasara el Norseman.».
2. **Escena 33: la imagen da por hecha la anécdota y deja mal a Baessell.** Baessell sale con `accion: "celebrar"` y `emocion: "feliz"` mientras se cuenta la frase de «¿quieres vivir para siempre?», y Miller sale con `miedo`. Es una escena de un recuerdo de segunda mano [D] sobre un desaparecido.
   *Corrección:* Baessell con `quieto` o `hablar` y `neutral`; Miller con `quieto` y `neutral`.
3. **Título del gancho 2: «¿Dónde están los paracaídas?»** convierte la frase dudosa en titular sin matiz.
   *Corrección:* «Cuatro minutos con el motor en marcha» o «"¿Y los paracaídas?": lo que cuentan del último vuelo de Glenn Miller».
4. **Escenas 10, 12 y 14: los días de la semana no cuadran con `dia`.**
   - La 10 dice «Martes» con `dia` 4, que es el 29 de noviembre, miércoles.
   - La 12 dice «Miércoles» con `dia` 5, que es jueves.
   - La 14 dice «Jueves» con `dia` 6, que es viernes 1 de diciembre.

   *Corrección:* cambiar los textos a «Miércoles», «Jueves» y «Viernes». Otra opción es bajar los `dia` a 3, 4 y 5 y mover las escenas 8–9 al día 2.
5. **Escena 29: «un piloto joven».** La ficha dice que la edad de Morgan no se ha encontrado y que no hay que inventarla.
   *Corrección:* «…un piloto formado en Canadá, Yon Mórgan, prepara un Nórsman…».
6. **Escena 30: «Mórgan vuela bien».** Es un juicio sin fuente sobre un desaparecido.
   *Corrección:* «Mórgan se formó en Canadá, pero no tiene el título…». Si el dato pasa a la escena 29, aquí basta con «Mórgan no tiene el título para volar solo con instrumentos…».
7. **Escena 56 (cierre): solo dice que Tom es inventado.** Fletcher, Peggy y Hank también lo son, y salen junto a personas reales (Peggy en la torre del 15 de diciembre, Hank…). La regla de la casa pide decirlo en el cierre.
   *Corrección:* «Yo, Tom, nunca existí, ni Flécher, ni Pegui, ni Jank. Pero aquel avión sí estuvo cuatro minutos en esa pista…». Hay que recortar otra frase para no pasar de 40 palabras, por ejemplo «con el motor en marcha».
8. **Escena 48: «aviones alemanes habían soltado bombas volantes sobre los alrededores de Mánchester».** Es inexacto. Las V-1 se lanzaron desde He 111 sobre el mar del Norte y volaron hasta la zona de Manchester.
   *Corrección:* «…aviones alemanes habían lanzado, desde el mar del Norte, bombas volantes contra Mánchester».
9. **Escena 53: «ninguno de sus compañeros del bombardero lo recordaba».** La ficha dice otra cosa: no lo anotó ni lo dijo en 1944, ni él ni nadie de su tripulación. No consta que les preguntaran.
   *Corrección:* «Pero nadie de su tripulación lo contó entonces; él lo relacionó con Míler tras ver la película. Y según Sprag, las bombas cayeron noventa minutos antes.». Si se pasa de palabras, se puede quitar «Las demás leyendas…» o llevarla a otra escena.
10. **Escena 25: «es la última noche que dirige a su banda».** La ficha solo dice «última actuación documentada». Además, el fondo tiene `hora: "dia"` y el texto habla de noche.
    *Corrección:* «…Nadie lo sabe todavía, pero es la última vez que se le conoce dirigiendo a su banda». Poner el fondo en `atardecer` o `noche`, o quitar «noche» del texto.
11. **Escena 26: «el avión correo a París no sale. No habrá más vuelos hasta el domingo».** La ficha habla de la lanzadera C-47 de Bovingdon, no de un avión correo, y de vuelos regulares. Decir «más vuelos» choca con el Norseman del viernes.
    *Corrección:* «…el avión de enlace a París tampoco sale. No habrá vuelos regulares hasta el domingo».

### Hechos y matices menores

12. **Escenas 1 y 54 (tarjeta): «Ochenta años después» y «0 restos… en 80 años».** En noviembre de 2026 son 82.
    *Corrección:* «Más de ochenta años después» y «en más de 80 años». En la tarjeta, mejor «restos confirmados», por los restos del pescador [D].
13. **Escena 18: «con sus gafas redondas».** La ficha dice gafas sin montura.
    *Corrección:* «con sus gafas sin montura».
14. **Escena 39: «ni una mancha en el agua».** Nadie lo buscó hasta el día 18 y no está en la ficha.
    *Corrección:* «Ni una llamada por radio. Nadie lo buscaba todavía. El mar gris lo borró todo».
15. **Escena 51: «nadie puede probarla».** La concordancia falla, porque el antecedente es «lo que más creen».
    *Corrección:* «probarlo», o «La explicación que más aceptan los historiadores es… Pero sin restos, nadie puede probarla». Cambiar también «un piloto perdido» por «un piloto desorientado», que es el término de Spragg y no carga la culpa sobre Morgan. En la tarjeta, cambiar «Nubes bajas sobre el mar» por «Nubes bajas y llovizna helada», que es lo verificado.
16. **Escena 12: «Desde el veinte de noviembre van a Londres a grabar sin parar».** La ficha da las 84 horas (20 nov – 12 dic) y que iban «cada semana a Londres», pero no que todo se grabara allí.
    *Corrección:* «Desde el veinte de noviembre graban sin parar, con viajes a Londres cada semana…».
17. **Escena 44: «No despega nada».** Es absoluto.
    *Corrección:* «Casi nada despega».
18. **Escena 40: fondo `clima: "nieve"` en las Ardenas el 16 de diciembre.** La ficha habla de niebla y nubes bajas.
    *Corrección:* `"clima": "niebla"` (la escena no tiene personajes, así que no tapa a nadie). Aviso aparte: el `tanque` verde oliva parece aliado aunque el texto habla del ataque alemán. Se puede quitar o dejar solo el `camion`.
19. **Escenas 5 y 11: «V2» y «V1» con cifras dentro de `texto`.** Incumplen la regla 5 de la guía, y la voz y la revisión con whisper pueden leerlo mal.
    *Corrección:* escribir «uvedós» y «uveúno» como una sola palabra y añadir las grafías `"Uvedós": "V-2"` y `"Uveúno": "V-1"`. Las grafías `V2` y `V1` actuales sobran.
20. **Escena 27: la escena de Baessell ofreciendo el asiento está en el pub** (fondo heredado con 🍺). La ficha marca como dudoso el lugar de la conversación.
    *Corrección:* usar un interior neutro (despacho: pared `madera`, `mesa`, `reloj`) y no el pub.

### Puesta en escena, motor y coherencia visual

21. **El Norseman se dibuja con el emoji 🛩️ (escenas 0 y 32–34; miniatura `icono`), una avioneta moderna, aunque el motor ya tiene los props `norseman` (en tierra, hélice girando) y `norseman-vuelo`.** También existen `nissen` y `torre-control`.
    *Corrección:*
    - Escenas 0 y 32: `{ "tipo": "norseman", "x": -0.75 }`.
    - Escena 35: añadir `norseman-vuelo` (se pierde por el cielo).
    - Escenas 21 o 55: `torre-control` como exterior.
    - En algún exterior de la base: `nissen`.
    - Miniatura: `"prop": "norseman"` en lugar del emoji.

    Nota para el Director: estos cuatro props no están documentados en `GUIA_GUION.md`.
22. **Escena 14 (noche del 1 de diciembre, pub con ventana): `"luna": false`.** Esa noche la Luna estaba casi llena (llena hacia el 30 de noviembre).
    *Corrección:* quitar `"luna": false` o poner `"clima": "nublado"`. En la escena 47 (Nochebuena, cuarto creciente) el `luna: false` vale si se justifica con la niebla del 19 al 24: conviene añadir `"clima": "niebla"` o `"nublado"`.
23. **Escena 37: fondo `isla`** (cima de isla atlántica con islotes) para el mar al sur de Beachy Head, que es una costa de acantilados de creta sin islotes.
    *Corrección:* `playa` o `mar` nublado.
24. **Escena 16: «Mi madre me escribe», pero Tom sale con `accion: "escribir"`.**
    *Corrección:* `pensar` o `sentado` con el ✉️, o cambiar el texto a «Le escribo a mi madre; ella me cuenta que…».
25. **Escena 57: «El próximo despegue ya está calentando motores».** Es un juego de palabras con un despegue fatal justo después de recordar a tres desaparecidos.
    *Corrección:* «Y si quieres vivir otro mes dentro de la historia, suscríbete. Mañana te espera otro.».
26. **Reparto `tom`/`tomcapote`: sombrero `gorro-lana` (gorro de marinero).** La ficha da gorro de cuartel para un mecánico de la RAF. No es grave, porque en invierno se usaban gorros de punto, pero puede leerse como marino.
    *Corrección opcional:* `"sombrero": "ninguno"` en el taller y `gorro-lana` solo en exteriores fríos. Precisar también en la escena 2 «mecánico de tierra de la RAF».
27. **Gancho 1 (0–3): acaba en la escena 3** («Lo que pienso y lo que hago es imaginado…»), un aviso y no una intriga.
    *Opcional:* dejarlo así (cumple 95–120) o reescribir la escena 3 para que acabe con intriga, por ejemplo «…Las fechas, el avión y los tres hombres son reales. Y lo que pasó después, también».

# Verificación: guiones/wright-1903.json

Comparado con `investigacion/wright-1903.md` y `oficina/GUIA_GUION.md`. Las escenas se numeran desde 0 (índice en `largo.escenas`).

## Resumen de comprobaciones

| Comprobación | Resultado |
|---|---|
| JSON válido | OK |
| Palabras de `texto` | 1.514 (OK, 1.350–1.550) |
| Escenas | 62 (OK, 50–65) |
| Números en cifra dentro de `texto` | Ninguno (OK) |
| Capítulos | 4 (esc. 3, 17, 27, 36) (OK) |
| Calendario (`dia`) | Día 1 = vie. 20 nov.; todos los días de la semana citados cuadran (20 nov. vie., 24 nov. mar., 28 nov. sáb., 30 nov. lun., 8 dic. mar., 11 dic. vie., 12 dic. sáb., 14 dic. lun., 17 dic. jue.) (OK) |
| Luna | Esc. 20 (día 15 = 4 dic.): luna llena, correcto (llena el 4–5 dic. de 1903) (OK) |
| 69 días (9 oct. – 17 dic.) | Correcto (OK) |
| Props, lugares, acciones, sombreros | Todos existen en Props.tsx / Fondo.tsx / Personaje.tsx (OK) |
| Emojis prohibidos / caras en tarjetas | Ninguno (OK) |
| Voces femeninas | Katharine lleva `"voz": "narradora-es"` (OK) |
| Grafías | Completas para todos los nombres escritos como suenan (ver error 13 por «Washington») |
| Ganchos | 0–2: 100 palabras; 21–25: 119; 29–33: 115; 40–44: 118 (todos en 95–120); primeras frases se entienden solas (OK, salvo errores 2 y 3) |
| `insercion` en la última escena | No hay (OK) |
| Cierre con lo real y lo imaginado | Esc. 60 y descripción (OK) |

## Errores y correcciones propuestas

### Hechos y rigor (prioritarios)

1. **Esc. 1, 43 (tarjeta) y 59: prioridad mal formulada.** «Volar con motor y gobernar el aparato» / «primer vuelo con motor, sostenido y gobernado» / «primer vuelo controlado y con motor» también lo habían hecho antes los dirigibles (Santos-Dumont, 1901). La ficha (sección 6 y 10.5) exige «más pesado que el aire» y «con piloto».
   - Esc. 1: «Queremos algo que nadie ha conseguido: volar con motor, en un aparato más pesado que el aire, y gobernarlo.»
   - Esc. 59: «Lo nuestro fue el primer vuelo con motor, sostenido y gobernado, con piloto, de un aparato más pesado que el aire.»
   - Esc. 43, `etiqueta`: «primer vuelo controlado y propulsado de un aparato más pesado que el aire, 10:35 h (diario de Orville: «unos 12 segundos»)».

2. **Esc. 29 (y primera frase del gancho 29–33): «quién iba a ser el primer hombre en volar».** Contradice la lista NO USAR («Fueron los primeros en volar» a secas: ya había globos y planeadores) y el short no incluye la aclaración de la esc. 59. Propuesta: «Nos jugamos a cara o cruz quién iba a ser el primero en volar con motor.»

3. **Esc. 0 (y primera frase del gancho 0–2) + `ganchos[0].titulo`: el editorial no habla del «ser humano», sino de una máquina voladora** (la ficha: «una máquina voladora de verdad podría tardar de uno a diez millones de años»; el ser humano ya volaba en globo). Propuesta esc. 0: «El Niu Iork Taims escribió que una máquina voladora de verdad podría tardar entre uno y diez millones de años. Mi hermano y yo tardamos sesenta y nueve días.» Título del short: «El New York Times dijo que una máquina voladora tardaría un millón de años».

4. **Esc. 44 (dentro del gancho 40–44): «Más corto que las alas de un avión de pasajeros de hoy».** Falso en general: un A320 o un 737 tienen unos 34–36 m de envergadura, menos que los 37 m del vuelo. La ficha compara con un **Boeing 747**. Propuesta: «Más corto que las alas de un jumbo.»

5. **Esc. 21 y 26: Orville lee la noticia de Langley en la calle de Dayton con un periódico (📰, `emocion: sorpresa`) el mismo 8 de diciembre.** La ficha marca como [D]/imaginado cómo y cuándo se enteró, y la regla 8 obliga a decirlo. El aparato cayó por la tarde en Washington; leerlo ese mismo día es muy improbable. Propuesta: en la esc. 26 añadir «Imagino que lo leí en el periódico días después.» o quitar el 📰 y la sorpresa (mostrar a Orville en el taller); y en la esc. 25 cambiar «Y hoy, martes ocho de diciembre» por «El martes ocho de diciembre, en Washington,».

6. **Esc. 21: «El científico más famoso de América».** La ficha dice «el científico más famoso del país en este campo». «América» en español es el continente. Propuesta: «El científico más famoso del país en este campo tenía cincuenta mil dólares del Ejército.» (o «de los Estados Unidos»).

7. **Esc. 35: «El miércoles el aparato está listo, pero el viento no acompaña.»** La ficha marca el detalle del 16 como [D]. Suavizar: «El miércoles lo dejamos listo; dicen las notas que el viento no ayudó.» o quitar la segunda frase («Martes y miércoles reparamos el timón. El siguiente turno es mío.»).

8. **Esc. 28: «el viento es demasiado flojo para despegar desde el llano».** La ficha lo da como [D]. Suavizar: «…pero no hay viento bastante, y el lunes decidimos usar la cuesta.» (o dejarlo como «imagino»).

9. **Esc. 34: el texto cita la carta de Wilbur («ya no hay duda del éxito final») pero la tarjeta muestra el telegrama («Éxito asegurado; no digáis nada»).** Son dos documentos distintos; la tarjeta parece ilustrar la frase dicha y no lo hace. Propuesta: o bien cambiar la tarjeta a `{"tipo":"cita","frase":"Ya no hay duda del éxito final.","firma":"Wilbur Wright, carta a su padre y su hermana, 14 de diciembre de 1903 (paráfrasis)"}`, o añadir al texto «y un telegrama: éxito asegurado; no digáis nada».

10. **Esc. 36, tarjeta: «el de los Wright marca algo más de 32».** Falta la unidad; parece que el anemómetro diera 32 a secas. Propuesta: «…el de los Wright, algo más de 32 km/h (20 mph)». Además el telegrama da 21 mph (≈34 km/h); conviene no contradecirlo (vale «viento de entre 32 y 43 km/h»).

11. **Esc. 11 (día 3 = domingo 22 de noviembre): Orville `trabajar` y texto «entre el frío y las pruebas».** La ficha recoge que no trabajaban en domingo. Propuesta: poner `dia: 4` en la esc. 11 (lunes 23; la 12 se queda en el día 4 y la 13 en el 5, martes), o cambiar la acción a `sentado`/`escribir` y el texto a «El domingo no trabajamos: escribo el diario y cartas a casa.»

12. **Esc. 14 (día 6 = 25 nov.): estufa de carburo con fecha implícita.** La ficha (NO USAR) pide no fecharla. El contador «DÍA 6» la fecha. Propuesta: fundirla con la esc. 11 (día 4, «Pasan los días…») sin cambiar de día, o añadir «Uno de estos días, para las noches de frío…».

### Voz y grafías

13. **Esc. 22, 55 y 57: «Washington» va con su grafía real en `texto`.** La guía pide escribir los nombres extranjeros como suenan. Propuesta: «Uóshinton» en `texto` y `"Uóshinton": "Washington"` en `grafias`.

### Formato de escenas

14. **Esc. 1: 41 palabras** (máx. 40). Quitar «con mi hermano Uílbur» → «…en Déiton, Ojáio, con mi hermano.» o partir la escena.
15. **Esc. 46 y 56: 14 palabras** (mín. 15). Esc. 46: «A mediodía, Uílbur empieza el cuarto vuelo. Y esta vez, el aparato no quiere bajar.» Esc. 56: «Mi hermano Uílbur muere de fiebre tifoidea en mil novecientos doce. Tenía cuarenta y cinco años.»
16. **Inserciones mal repartidas:** de la esc. 24 a la 33 hay 9 escenas sin tarjeta (la guía pide una cada 4–6), y la 33 y la 34 van seguidas. Propuesta: mover la cita de la esc. 34 a la 30 o 31 (p. ej. el telegrama) o añadir una tarjeta `mapa` «Kill Devil Hills · la gran duna» en la esc. 29.

### Puesta en escena (para revisar en `--muestras`)

17. **Esc. 38: seis personajes, con Johnny en `x: 1.05`** (fuera de −1…1) y separaciones de 0.35–0.45: riesgo de solapes y de personaje cortado, sobre todo en el vertical. Propuesta: dejar tres o cuatro en plano (Daniels, Dough, Etheridge entrando; Brinkley y Johnny en la esc. 39) o repartir en −0.9 / −0.45 / 0 / 0.45 / 0.9 y quitar a Orville.
18. **Esc. 30: Orville 0.55, Etheridge 0.85, Daniels 0.15** (0.3 entre Orville y Etheridge, menos de 0.4). Separar.
19. **Esc. 36–48: `charco` (con ondas) en un día en que los charcos están helados** (lo dice el propio texto de la esc. 36). Propuesta: quitar el `charco` o usar un emoji 🧊 pequeño; un charco que ondula contradice el hielo.
20. **Esc. 52 (18 dic.): Orville con 📰 en el campamento.** El periódico de Norfolk de ese día difícilmente llegaba al campamento; el texto no dice que lo lean. Propuesta: quitar el `objeto` o decir «Luego sabremos que, al día siguiente, un periódico de Nórfok…».
21. **Esc. 29–33 (14 dic.): no se ve la ladera de la duna** que dice el texto (el `flyer` está en llano, igual que el 17). La ficha insiste en que el 14 fue en cuesta y el 17 en llano. Si no hay prop de duna, al menos `camara: "subir"` o un `lugar: "desierto"` con dunas para el 14, para que no parezca que despegaron igual los dos días.
22. **`publicacion.miniatura`: `escena: 42` con `quien: "orville"`.** En la esc. 42 Orville va pilotando el `flyer-vuelo`; ponerlo de pie al lado duplica al personaje. Propuesta: `escena: 43` (Orville celebrando junto al Flyer) o `quien: "wilbur"`.

### Observaciones (no bloquean)

- La guía pide el clímax en la semana 2 o 3; aquí cae en la 4 (17 dic. = día 28), pero el giro de Langley (sem. 2) y la moneda (sem. 3) lo compensan. Aceptable.
- Esc. 18: que Charlie Taylor hiciera los ejes con Orville es [R] en la ficha; queda cubierto por el aviso de la esc. 2, pero si se quiere más rigor: «En el taller hacemos los ejes nuevos».
- Esc. 32: Daniels aparece el 14 de diciembre; la ficha no nombra a los socorristas de ese día. El texto no lo nombra, así que vale como figurante, pero mejor usar a `etheridge`/`dough` genéricos o dejarlo.

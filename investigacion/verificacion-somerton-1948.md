# Verificación: guiones/somerton-1948.json

Comparado con `investigacion/somerton-1948.md` y `oficina/GUIA_GUION.md`. Los números de escena empiezan en 0 (índice de `largo.escenas`).

## Comprobaciones que pasan

- JSON válido. 60 escenas (50–65). Sin cifras en `texto`. Sin emojis prohibidos (🗼, 🚢) ni secuencias ZWJ.
- 4 capítulos (escenas 4, 19, 29 y 35). Sin `dia` en el epílogo ni en el cierre. Sin inserción en la última escena. Protagonista en x 0.4 en la escena 0.
- Días de la semana correctos en las 17 escenas que los dicen: mié 1, jue 2, vie 3, sáb 4, dom 5, mar 7, jue 9, vie 10, sáb 11, lun 13, mié 15, lun 20, mié 22, vie 24, sáb 25, lun 27, jue 30 de diciembre de 1948. El campo `dia` coincide con la fecha del mes.
- Las cifras y los hechos coinciden con la ficha: hacia las 6:30, Moss fuera de servicio y sin señales de violencia, el contenido de los bolsillos (7 cigarrillos de otra marca), Lyons hacia las 19:00, Strapps y Neill, el «otro hombre» atribuido («Dijeron que… nunca apareció»), el forense y la posibilidad de que lo llevaran muerto, Dwyer, la página 3 del *Advertiser*, Johnson, Durham el 3, las huellas el 4, el Holden (733 £, casi dos años de sueldo), Bradman (123 carreras), el cierre a las seis, el racionamiento (té y mantequilla sí, carne y ropa libres desde junio, gasolina), el embalsamamiento del 10, la policía de Victoria, la maleta de enero (Keane, Kean, T. Keane; hilo Barbour), Cleland, «Tamám Shud», el *Rubaiyat* del coche, las cinco líneas, Boxall vivo en Sídney, el busto y West Terrace en junio de 1949, la investigación judicial, Abbott y Fitzpatrick en 2022, el 99,9 %, Webb (ingeniero eléctrico de Melbourne, 43 años, cuñado Keane).
- Ninguna teoría se cuenta como probada: la escena 51 y su tarjeta («Teorías: ninguna probada») y la descripción lo dicen. No se inventa ninguna lectura del código. No hay detalles médicos ni nada gráfico: «recostado contra el muro como quien duerme» y «no encuentra ninguna señal de violencia».
- Jessica Thomson se trata con respeto. No sale dibujada (escena 48 sin personajes), no se cuenta su reacción ante el busto, no se habla de su hijo ni de lo que dijo su hija, y se usa la fórmula segura («lo que supiera, si sabía algo, se lo llevó consigo; nadie ha probado nunca lo contrario»).
- Ninguna escena de diciembre deja que Ned sepa lo de 1949 (la maleta, el papel, el libro, la enfermera): todo va en el epílogo. La escena 41 («lo más extraño… aún no ha llegado») lo anuncia bien.
- Lo inventado se avisa en las escenas 3 y 58 (Ned, el sargento Reid y la madre) y en la descripción.
- Uniforme azul marino con gorra de plato y sin banda de cuadros (no llega hasta 1960). Todos los props, lugares, acciones, peinados y sombreros existen en el motor. Todo `quien` está en el reparto. Los personajes femeninos llevan `"voz": "narradora-es"` y ninguno tiene `habla`.
- Cada nombre escrito como suena tiene su grafía.
- Ganchos 0–3 (115 palabras), 44–47 (108) y 54–57 (114) están entre 95 y 120.

## Errores y correcciones propuestas

### Graves

1. **Duración: 1.593 palabras, por encima del máximo de 1.550.** A 120 palabras por minuto son unos 13 min 20 s, más de los 13 min que pide la guía. Además, la escena 10 tiene 41 palabras (máximo 40) y el gancho 2 (10–13) tiene 122 (máximo 120).
   *Corrección:* recortar al menos 45–60 palabras. Se puede empezar por:
   - Escena 10: quitar «la chaqueta, la camisa y el pantalón,» (−6). Así arreglas también el gancho 2.
   - Escena 7: «Iba mejor vestido que la mayoría: camisa blanca, corbata de rayas, jersey de punto, chaqueta cruzada y zapatos lustrados.» (−6).
   - Escena 15: quitar «todavía» y «en la arena» (−4).
   - Escena 20: quitar «presentado hace una semana:» (−4).
   - Escena 32: quitar «Recuerda bien esa frase, porque» y dejar «Muchos años después, esa frase volverá a sonar.» (−4).
   - Escena 37: quitar «mientras suenan las campanas de las iglesias» (−6).
   - Escena 44: «…un papelito enrollado con dos palabras impresas, tamám shud, que significan se acabó y cierran el Rubaiát de Omar Jayam.» (−5).
   - Escena 59: «Cuéntame en los comentarios quién crees que era, y suscríbete: mañana te espera otro mes dentro de la historia.» (−5).
   - Fundir las escenas 22 y 39, que repiten la misma idea, o acortar la 30 y la 34.

   Después hay que comprobarlo con `node scripts/producir.mjs somerton-1948 --sin-render`.
2. **Escena 54 (primera frase del gancho 4): «anunciaron quién era» y «Lo descubrieron gracias a unos pelos…».** Da la identificación de Webb por hecha. La ficha pide decir siempre «según los investigadores» y que la policía no lo ha confirmado. En el short, esta es la primera frase que se oye.
   *Corrección:* «Setenta y tres años sin nombre, hasta que en dos mil veintidós el profesor Dérec Ábot y la genealogista Colin Fitspátric dijeron haberlo identificado, gracias al ADN de unos pelos atrapados en su busto de escayola.».
3. **Escena 56: «Era de Melbúrn, en el estado de Victoria…».** Lo afirma sin matiz. El «aún no lo ha confirmado» llega al final de la frase.
   *Corrección:* «Si era él, era de Melbúrn, en el estado de Victoria, el mismo que aquel diciembre nos dijo que no era suyo. La policía aún no lo ha confirmado oficialmente.».
4. **Escena 10: «¿Quién se toma tanto trabajo antes de ir a morir a una playa?».** Da por hecho que fue él quien cortó las etiquetas y que fue a la playa a morir (la teoría del suicidio). Contradice la escena 13, donde el forense admite que pudieron llevarlo allí ya muerto. Va también en el gancho 2.
   *Corrección:* «¿Quién se toma tanto trabajo, y para qué?» o «¿Quién se tomó tanto trabajo para que nadie supiera su nombre?».
5. **Gancho 3 (escenas 44–47): no dice de quién se habla.** Empieza con «Meses después, el patólogo Yon Clíland encontró… en un bolsillo diminuto del pantalón» y en todo el tramo no aparece «el hombre de Sómerton» ni «el muerto». La guía (regla 9) pide que la primera frase funcione sin contexto.
   *Corrección:* escena 44: «Meses después, en el pantalón del hombre muerto en la playa de Sómerton, el patólogo Yon Clíland encontró un bolsillo diminuto con un papelito enrollado…». Si se pasa de palabras, quitar «escondido».

### Leves

6. **Gancho 2 (escena 10): «Alguien había cortado… las etiquetas de su ropa».** Sin contexto, el «su» no se entiende.
   *Corrección:* «Alguien había cortado con cuidado todas las etiquetas de la ropa del muerto…» (y aplicar el recorte del error 1).
7. **Escena 11: lo que Ned no podía saber el día 1.** Cuenta en presente, el mismo 1 de diciembre, lo que vieron los Lyons, que hablaron después. La ficha no dice cuándo.
   *Corrección:* «Luego sabríamos que la tarde anterior, hacia las siete, el joyero Yon Láions y su mujer vieron aquí a un hombre tumbado…».
8. **Escena 8: «En la comisaría vaciamos sus bolsillos».** El cuerpo fue al hospital y al depósito, no a la comisaría, y la ficha no dice dónde se registraron los bolsillos.
   *Corrección:* «Al registrar sus bolsillos aparecen: un billete de tren sin usar…». La imagen puede seguir siendo la comisaría si se entiende que Ned repasa la lista.
9. **Escena 10: «el sargento Rid me las enseña una por una».** Las etiquetas no estaban, así que no se pueden enseñar.
   *Corrección:* «…y el sargento Rid me enseña los cortes uno por uno».
10. **Escena 14: «Sospecha de un veneno, pero el químico del Gobierno no halla ninguno».** Pone el análisis químico el mismo día 2, y los análisis tardaron más.
    *Corrección:* «Sospecha de un veneno, pero los análisis del químico del Gobierno no encontrarán ninguno.».
11. **Escena 29: «Es lunes, trece, y empieza el desfile».** La fecha de inicio es inventada: las visitas empiezan cuando salen las fotos y, sobre todo, tras el embalsamamiento del 10. La ficha solo dice «diciembre».
    *Corrección:* «Es lunes, trece, y sigue el desfile: gente que cree reconocerlo…».
12. **Escena 36: «¿Vio alguien algo aquella noche desde esas ventanas y nunca llegó a contarlo?».** Insinúa testigos escondidos en un hogar de niños con discapacidad, cosa que la ficha no recoge. Además, el hogar no se ve: el fondo solo tiene `roca` y `valla`.
    *Corrección:* «…miro el hogar para niños que hay enfrente. Desde allí se ve el sitio exacto donde estaba sentado.». Añadir `{ "tipo": "casa", "x": -1.1, "detras": true }`.
13. **Escenas 52–53 (orden del epílogo).** Van después de la 46 («En julio…»), pero el busto, el entierro y la investigación son de junio. El salto atrás despista.
    *Corrección:* pasar las escenas 52–53 entre la 45 y la 46, o empezar la 52 con «Antes, en junio de mil novecientos cuarenta y nueve…».
14. **Escena 19: capítulo «Las huellas de nadie».** Lo de las huellas pasa en la semana 1 (días 3 y 4). La semana 2 trata del Holden, Bradman, las fotos y el embalsamamiento.
    *Corrección:* «Nadie lo reclama» o «Un desconocido en el depósito».
15. **Escena 20: «casi dos años de sueldo».** No dice de quién, y la ficha pide no dar el sueldo de un policía.
    *Corrección:* «…casi dos años de sueldo de un obrero».
16. **Voz: 17 escenas empiezan igual («Es miércoles, uno…», «Es jueves, dos…», «Es viernes, tres…»).** Arrancar con «Es» va bien para Chatterbox, pero la repetición cansa, y el número solo («dos», «tres», «nueve») suena a cuenta y no a fecha.
    *Corrección:* dejar la fórmula en las aperturas de capítulo (4, 19, 29, 35) y variar el resto, por ejemplo «El jueves dos, el patólogo…», «Ese sábado llega la primera respuesta…», «Nochebuena. Adelaida cena…» o «Llega el lunes veinte y el expediente…». Donde se quede el número solo, mejor «Es jueves, dos de diciembre».
17. **Voz: escena 44, «dos palabras impresas: Tamám Shud.».** Es un fragmento de dos palabras extranjeras tras dos puntos, sin grafía de pronunciación. Chatterbox y whisper pueden leerlo como «tamam shut» y la revisión marcará fallo.
    *Corrección:* escribirlo como suena, «Tamám Chud», y añadir la grafía `"Chud": "Shud"`. Dejarlo dentro de la frase (ver la corrección del error 1).
18. **Voz: nombres de una sílaba muy cortos.** «Mos», «Rid», «Lin», «Kin» y «Uéb» son de los que Chatterbox lee mal y whisper confunde (el «Asun» → «zoom» de la guía).
    *Corrección:* no hace falta tocarlos ahora. Si fallan en `revisar_voz`, usar «el agente Yon Mos» (ya está), «el sargento Rid» → «mi sargento» y «Kin» → «el apellido Kin» o marcarlos `ok` a mano si el fallo es de whisper.
19. **Inserciones: de la escena 31 a la 40 hay 8 escenas sin tarjeta** (la guía pide una cada 4–6).
    *Corrección:* añadir una en la 35 o la 36, por ejemplo `{ "tipo": "dato", "valor": "25 dic.", "etiqueta": "Navidad: sigue sin nombre en el depósito", "icono": "🎄" }` en la 38, o `{ "tipo": "mapa", "lugar": "Hogar infantil de Somerton", "detalle": "Frente al malecón · 1948", "icono": "📍" }` en la 36.
20. **Escenas 27 y 39: la hora del fondo no cuadra con el texto.** La 27 dice «Esa tarde» con `hora: "dia"`. La 39 dice «Por la tarde» con `hora: "noche"` y es un interior con `farola` dentro, aunque Ned «se queda en la puerta».
    *Corrección:* escena 27: `"hora": "atardecer"`. Escena 39: exterior `{ "lugar": "calle", "hora": "atardecer", "props": [{ "tipo": "farola", "x": 1.15 }, { "tipo": "casa", "x": -1.1 }] }`, sin `luna`, o «Esa noche» en el texto.
21. **Emojis poco fieles.**
    - Escena 8 (tarjeta): 🪮 es una púa para pelo afro, no un peine. Lo más sencillo es cambiar ese elemento por 🍬 «Chicle Juicy Fruit a medias» y dejar el peine solo en el texto.
    - Escena 38: 🍮 es un flan, no un pudin de Navidad inglés. Usar 🎄 a un lado o 🍰.
    - Escena 51: 💤 para «Muerte natural» puede leerse como burla. Usar ⚖️ o ❔.
22. **Descripción: nombra «la exhumación de 2021» en la lista del epílogo, pero el vídeo no la cuenta.**
    *Corrección:* quitarla de la lista o añadir media frase en la escena 54 («…en dos mil veintiuno lo exhumaron y en dos mil veintidós…»), vigilando el número de palabras.
23. **Escena 21: el prop `radio` (no es emoji) sobre la `mesa` en x 0 con escala 0.5.** La regla de apoyarse en el tablero es para emojis. Puede quedar flotando o metido en la mesa.
    *Corrección:* comprobarlo en `--muestras`. Si falla, ponerla al lado (`x: 0.75`) o usar el emoji 📻 con escala 0.4.

## Recuento

- **Graves:** 5 (1–5).
- **Leves:** 18 (6–23).

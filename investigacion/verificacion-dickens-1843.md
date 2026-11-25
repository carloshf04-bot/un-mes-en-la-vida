# Verificación: guiones/dickens-1843.json

Comparado con `investigacion/dickens-1843.md` y `oficina/GUIA_GUION.md`. Los números de escena empiezan en 0 (índice de `largo.escenas`). **No se ha tocado el guion**: esta es la lista para el Guionista.

## Comprobaciones que pasan

- JSON válido. 59 escenas (50–65). Cada escena tiene entre 21 y 38 palabras. Ninguna frase de una, dos o tres palabras. No hay cifras dentro de `texto`: todos los números van en letra.
- Calendario de 1843 comprobado: día 1 = lunes 27 nov. Las 15 escenas que abren con «Es + día de la semana» cuadran con su `dia`: 8 (lun 27), 21 (jue 30), 22 (sáb 2 dic), 24 (lun 4), 26 (mar 5), 27 (mié 6), 32 (mar 12), 33 (mié 13), 34 (vie 15), 36 (sáb 16), 37 (mar 19), 39 (mié 20), 40 (sáb 23), 41 (dom 24) y 42 (lun 25). La 44 («el día después de Navidad») es el día 30, martes 26. Los días suben sin saltos atrás. Sin `dia` en la apertura ni en el epílogo y el cierre. La descripción dice bien «del lunes 27 de noviembre al martes 26 de diciembre».
- 4 capítulos con `"corte": true` (escenas 8, 27, 33 y 39). La escena 0 tiene a Dickens en x 0.4. La última escena no lleva inserción.
- Cifras y hechos que coinciden con la ficha [V]: 31 años; 160 libras al año; 1 chelín por entrega; Martin en América; 66 páginas el sábado 2 de diciembre; Bradbury & Evans; carta a Mitton del lunes 4 con «con horror», 200 libras y «en marzo o así… rico»; pruebas el 4–5; portada de rojo y verde a rojo y azul y de 1844 a 1843; 4 láminas coloreadas y 4 grabados; 24.000 láminas; 5 chelines = un tercio de los 15 de Cratchit; barrendero de cruces, un chelín al día; salida el martes 19 en el 186 Strand; 6.000 agotados antes de Nochebuena; reseña del *Athenaeum* el sábado 23; Charley cumple 7 en Reyes; Catherine da a luz en tres semanas; fiesta de Nina Macready (una hora de magia, cobaya, pudin en un sombrero, Forster de ayudante, contradanza, Jane Carlyle); 230 libras; Parley's a un penique o dos; demanda el 8 de enero; «claramente encubierta»; bancarrota y unas 700 libras; Frank el 15 de enero y Lord Jeffrey de padrino; Thackeray (cita literal); Italia en 1844; lecturas desde 1853; manuscrito en piel roja para Mitton, hoy en Nueva York; «Dicen que inventé la Navidad, y no es verdad».
- Lo [D] que va bien suavizado: la cláusula de las 50 libras («parece que», 5), «a mediados de octubre» (6), el día del encargo a Leech («por estos días», 11), Field Lane («parece que», 15, y «probablemente» en el mapa), Harry y Tiny Tim («quizá», 20), las mil libras («quizá», 48). La cita de Jane Carlyle y la de la carta a Mitton llevan «(paráfrasis)».
- Anacronismos: no hay árbol de Navidad, crackers, Papá Noel, 🎄, 🧨, ❄️ ni nieve en Londres. Dickens no lleva barba (`"barba": "ninguna"` en `dickens`, `dickenscalle` y `dickensnino`). No se cita la frase antisemita de la carta a Mitton («como un judío»): solo «en marzo o así seré rico». Fagin no sale. No se imita ninguna adaptación.
- Catálogo: todos los lugares (`interior`, `calle`, `mar`), paredes, climas (`niebla`, `nublado`), props (`estanteria`, `chimenea`, `mesa`, `reloj`, `cuadro`, `planta`, `farola`, `carro`, `barril`, `columna`, `maquina`, `puesto`, `velero`), `luna`/`sol`/`detras`, acciones, emociones, peinados, barbas, ropa y sombreros existen en la guía. `tituloCorto` y `capituloInicial` los leen `shorts.mjs` y `publicacion.mjs`. Todo `quien` está en el reparto y todo el reparto se usa.
- Emojis: ninguno prohibido (🗼, 🚢, 🔫) ni con ZWJ. Los nuevos (🪿, 🩼, 🫙) están en la fuente Noto Color Emoji del sistema. 🐹 vale para la cobaya, como dice la ficha.
- Voces: guion con `narrador-es`. Todas las mujeres y niñas del reparto llevan `"voz": "narradora-es"` (Catherine, Georgina, Mamie, Katey, la señora Macready, Nina, Jane, Fanny, la niña de Field Lane y la colorista). Todos los personajes secundarios llevan `"habla": false`, así que no hay cambios de voz no deseados (17, 31 y 35 suenan con el narrador). No hay niños con `dormir`. Con `cerca`, nadie pasa de x ±0.75.
- Grafías: todas las palabras escritas como suenan tienen su grafía.
- Ganchos: 0–3 (114 palabras), 14–17 (117), 44–47 (110) y 48–51 (110). Todos entre 95 y 120, con rótulo de 5 palabras o menos.
- Seseo: no hay palabras que se confundan al sesear. Las que quedan con z/ce/ci son números, nombres o no tienen buen sinónimo.

## Errores y correcciones propuestas

### Graves (rigor y ética)

1. **Escena 57 (cierre) y `publicacion.descripcion`: «Yo y todas las personas de este vídeo fuimos reales».** No es cierto. El cajista (26), la colorista (30–31), el barrendero (34–35) y los dos niños de la escuela (15–17) son figuras inventadas sin nombre. La regla de la casa pide decirlo en el cierre y en la descripción.
   *Corrección (escena 57, 33 palabras):* «Yo y todas las personas con nombre de este vídeo fuimos reales, y las fechas, las cifras y las cartas están documentadas; mis pensamientos, los diálogos y muchas escenas son imaginados.». En la descripción, después de «…biografía de John Forster.», añadir: «El cajista, la colorista, el barrendero y los niños de la escuela son figuras imaginadas.».

2. **Escena 12: «…y otros cuatro dibujos en blanco y negro dentro del texto, entre ellos el fantasma de Márli».** Es un error. Según la ficha, «el fantasma de Marley» es una de las **láminas en color**, junto con el baile de los Fezziwig, y no uno de los grabados en blanco y negro.
   *Corrección:* «Serán cuatro láminas grabadas y coloreadas a mano, entre ellas el fantasma de Márli, y otros cuatro dibujos en blanco y negro dentro del texto.».

3. **Escena 16: «Pensé en escribir un panfleto, pero un cuento llega a mucha más gente».** La ficha marca como [D] lo del panfleto (el «golpe de mazo» y la carta a Southwood Smith), y aquí se cuenta como un hecho en primera persona.
   *Corrección:* «…y se me revolvió el estómago. Dicen que pensé en escribir un panfleto, y que al final preferí un cuento, que llega a mucha más gente.».

4. **Escena 42: «el día es templado y de niebla espesa».** La ficha marca el tiempo de la Navidad de 1843 como [D], porque solo lo da una fuente. Además, el fondo tiene `"hora": "noche"` y el texto habla del día.
   *Corrección:* «Es lunes, veinticinco, día de Navidad, y fuera no nieva como en mi libro: dicen que el día fue templado y de niebla espesa.». Poner el fondo en `"hora": "dia"` (o `atardecer`) con `"sol": false`.

5. **Escena 51: «el triple de lo que gané con el libro».** Es inexacto, y se acerca al mito «se arruinó por el libro» de la sección 6 de la ficha. Las 700 libras son el triple de lo que le dio **la primera edición** (230). Con el libro ganó bastante más con el tiempo (726–744 libras solo en 1844). La tarjeta ya lo dice bien.
   *Corrección:* «…unas setecientas libras de costas: el triple de lo que me dio la primera edición.».

6. **Escena 50: «Los denuncio ante el tribunal de la Cancillería el ocho de enero, y el juez para la venta enseguida, porque su copia, dice, está claramente encubierta».** Tiene dos problemas:
   - Era un pleito civil (una demanda), no una denuncia.
   - Según la ficha, el interdicto llega hacia el 10 de enero, y lo de «claramente encubierta» lo dice el vicecanciller al **mantener** el interdicto frente a los piratas, no como motivo del primer bloqueo.

   *Corrección:* «Los demando ante el tribunal de la Cancillería el ocho de enero; a los dos días, el juez para la venta, y luego dice que su copia está claramente encubierta.».

### Leves (matices, puesta en escena y formato)

7. **`publicacion.tituloLargo` y `tituloShort`: «Escribió Canción de Navidad con el banco en números rojos».** El descubierto lo descubre el 4 de diciembre, dos días después de terminar el manuscrito.
   *Corrección:* «Publicó Canción de Navidad con el banco en números rojos». El título del gancho 1 («…estaba en números rojos») puede quedarse.

8. **Escena 13, tarjeta de la cita: firma «Carta de Dickens a un amigo, enero de 1844».** La ficha da la cita como [V], pero el destinatario y la fecha (¿Felton, 2 de enero de 1844?) como [D].
   *Corrección:* «Carta de Dickens a un amigo, 1844 (probablemente a C. C. Felton)», o solo «Carta de Dickens a un amigo».

9. **Escena 14: «Vi a niños descalzos aprender a leer de noche, a la luz de unas velas».** Las velas y los pies descalzos son [R] en la ficha («R la escena de las velas»), pero aquí se cuentan como un recuerdo exacto.
   *Corrección:* «Vi a niños de la calle aprender a leer de noche, en un cuarto pobre, en el barrio de los ladrones de pañuelos, y no he podido olvidarlos.». El fondo puede seguir con sus velas.

10. **Escena 7: «y Cáterin me oye pasear de madrugada».** Es [R] contado como hecho. Lo documentado son los paseos por la calle.
    *Corrección:* «…y vuelvo a llorar, y quizá Cáterin me oye salir de madrugada.».

11. **Escena 23: «la imprenta de mis amigos Brádberi an Évans».** La ficha solo los da como impresores (editores suyos desde junio de 1844).
    *Corrección:* «…y las mando a la imprenta de Brádberi an Évans.».

12. **Escena 32: «si se venden los seis mil ejemplares, en primavera habré pagado todas mis deudas».** No está en la ficha. Lo documentado es «en marzo o así seré rico», y las mil libras son [D] (salen ya en la escena 48).
    *Corrección:* «…hago cuentas con la ilusión de un niño: si se venden los seis mil ejemplares, en marzo seré rico.».

13. **Escena 33: «Es miércoles, trece de diciembre, y empiezan a llegar… parece que fue por estos días, aunque nadie apuntó la fecha».** Primero da la fecha y después la pone en duda. La fecha es [D].
    *Corrección:* «Es miércoles, trece de diciembre, y por estos días llegan los primeros ejemplares encuadernados; nadie apuntó el día exacto.».

14. **Escena 36: «muchas familias ahorran meses para su ganso de Navidad».** Los «clubs del ganso» son [D] con fecha.
    *Corrección:* «…dicen que muchas familias ahorran meses para su ganso de Navidad.».

15. **Escena 39: «la gente se lo lleva para regalarlo por Navidad».** No está en la ficha.
    *Corrección:* «…el libro vuela de las mesas de las librerías, y mis editores no dan abasto.», o solo «…vuela de las librerías.».

16. **Escena 3: «una novela mía que se vende muy mal».** Exagera. La ficha dice que se vende «peor que las anteriores» (unos 20.000 [D] frente a 30.000–40.000).
    *Corrección:* «…una novela mía que se vende peor de lo que necesito.».

17. **Escena 54: «desde entonces escribo un libro de Navidad cada año».** En 1847 no hubo libro de Navidad: *La batalla de la vida* es de 1846 y *El hechizado*, de 1848.
    *Corrección:* «…y durante unos años escribo un libro de Navidad casi cada año.».

18. **Escena 52, orden cronológico:** el nacimiento de Frank (15 de enero) va después de la bancarrota de los piratas (febrero, escena 51).
    *Corrección:* empezar con «Mientras tanto, el quince de enero, nace mi quinto hijo, Francis…», o pasar la escena 52 delante de la 49.

19. **Emojis de dibujos animados.**
    - 👻 en la escena 6 («Jacob Marley») y en la escena 12 («El fantasma de Marley»): es el fantasma de dibujos con la lengua fuera. La ficha pide fantasmas «como sombras», nunca de dibujos.
    - 💃 (escena 12, Fezziwig): es una bailaora moderna de vestido rojo.
    - ✏️ (escena 12): es un lápiz amarillo moderno para unos grabados en madera.

    *Corrección:*
    - Marley: ⛓️ (las cadenas de Marley) o 🕯️.
    - Fezziwig: 🎻 (el violinista del baile).
    - Grabados: 🖼️ o 🪵.

20. **Escena 45: Macready en la cubierta de un `velero` en alta mar el 26 de diciembre.** El `mar` del motor pone la borda de nuestro barco, así que parece que está navegando ese día, cuando ya estaba de gira por América desde septiembre. Además, la guía pide `bergantin` y no `velero` para un barco del XIX.
    *Corrección:* mejor una inserción `{ "tipo": "mapa", "lugar": "Estados Unidos", "detalle": "Gira de William Macready · invierno de 1843–1844", "icono": "📍" }` sobre el fondo de la fiesta, o Macready en un fondo `calle` de día. Si se queda el mar, usar `bergantin` (x −1.0, escala 0.6) en lugar de `velero`.

21. **Escena 55: `dar-mano` con Dickens en x 0.4 y Mitton en x −0.4.** La guía pide ±0.27 para que se toquen las manos.
    *Corrección:* `"x": 0.27` y `"x": -0.27`.

22. **Escenas 8–12: el mismo fondo cinco escenas seguidas** (estudio de día). La guía pide cambiar cada 2–4.
    *Corrección:* dar a la 11–12 (Leech) otro interior, por ejemplo pared `madera`, `mesa`, 🖌️, `cuadro` y `ventana: true` (su estudio de dibujo).

23. **Capítulos en los días 1, 10, 17 y 24.** La semana 1 dura nueve días (del 27 de noviembre al 5 de diciembre) y la guía pide un capítulo por semana (1, 8, 15 y 22). No es grave, porque las fechas son reales.
    *Corrección (opcional):* pasar `capitulo` y `corte` de la escena 27 a la 24 (día 8, lunes 4: «En descubierto» o «Rojo, oro y canela») y actualizar la lista de capítulos de la descripción. Si no, dejarlo como está.

24. **Duración y apertura.**
    - El `texto` suma 1.630 palabras, 80 por encima del máximo de la guía (1.550). Con la proporción de los últimos episodios (unas 1.530 palabras ≈ 10,3–10,8 min), saldrían unos 11,5 min: dentro de 10–13, pero largo.
    - Hay 8 escenas de presentación sin `dia` (0–7), y la guía pide 2.

    *Corrección:* recortar unas 80 palabras. Candidatas:
    - escena 5 (38 palabras): quitar «y desde entonces pienso en dejarlos», que ya se cuenta en la 54;
    - escena 3: fundir el aviso de lo imaginado con la 57;
    - escenas 55 y 56: frases más cortas.

    Confirmarlo con `node scripts/producir.mjs dickens-1843 --sin-render` (línea «duración total»).

25. **Título del gancho 2: «Los niños reales que Dickens metió en Canción de Navidad».** Da por hecho que la Ignorancia y la Miseria son esos niños concretos. La ficha lo trata como un matiz.
    *Corrección:* «Los niños de la calle que inspiraron a Dickens».

## Riesgos que quedan

- La ficha pide cotejar en Pilgrim o Forster antes de publicar: el destinatario de la cita de los paseos, la cláusula de las 50 libras, las mil libras y el juez del pleito. El guion no nombra al juez (bien).
- 🐹 es un hámster. Vale para la cobaya según la ficha. Revisar en las muestras la escena 44 con `escala` suficiente para que se vea (≥ 1.6 si va como prop; aquí va como `objeto`).
- La escena 17 pone a los niños de Field Lane mientras se habla de la Ignorancia y la Miseria. Comprobar en las muestras que no parezcan monstruos ni caricaturas (ficha, sección 10.4).

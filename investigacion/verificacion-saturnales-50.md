# Verificación: saturnales-50

Lo he revisado frente a `investigacion/saturnales-50.md` y `oficina/GUIA_GUION.md`. Las correcciones ya están aplicadas en `guiones/saturnales-50.json`.

## Hechos y fechas
- **Nerón y Británico: las Saturnales eran las del año 54, no las del 55.** Británico murió hacia el 11 de febrero del 55, antes de cumplir los catorce años (Tácito, *Anales* XIII, 15). Las únicas Saturnales en las que Nerón ya era emperador y Británico seguía vivo son las de diciembre del 54. La ficha dice «55», y es un error. Cambios: «Cinco años después… del año cincuenta y cinco» → «Cuatro años después, en las Saturnales del año cincuenta y cuatro, Nerón, ya emperador, salió rey…». En la descripción, «año 55» → «año 54» (dos veces). En el short 13, «cinco años después» → «cuatro».
- **Palante:** los 300 millones de sestercios salen del decreto del Senado del año 52 (Tácito, *Anales* XII, 53: el liberto «poseedor de trescientos millones» recibe alabanzas por su frugalidad). Lo he comprobado con WebSearch. En diciembre del 50 todavía no era una cifra conocida, así que he cambiado el texto a «Dicen que Palante va camino de los trescientos millones de sestercios». La tarjeta ahora dice «según Tácito (Anales XII, 53, año 52)».
- **Quinto día de Claudio:** Dion Casio (LX, 25) lo sitúa varios años antes del 50. Antes el texto lo daba como noticia del día («nadie habla de otra cosa»). Ahora dice «Hace unos años, el emperador Claudio le devolvió a las Saturnales el quinto día…».
- **Escena 0:** decía «Esa noche le pediré…», pero la petición de libertad es el día 21, no el 17. Ahora dice «Pocos días después le pediré…».
- **Escena 12:** decía «mi cuartito sin ventana», pero en la escena 3 duerme a la puerta del amo. Ahora es «el cuartito de mi madre», el mismo decorado en el que cose Dafne.
- **Escena 4:** «veinticinco personas trabajan sin cobrar» chocaba con Sósia, que es un liberto contratado. Ahora dice «veinticinco esclavos».
- **Días de la semana:** no aparece ninguno en el texto ni en los capítulos. Solo se usan calendas, nonas, idus y el día del mes.

## Citas en pantalla
- **Suetonio (escena 17):** era una paráfrasis presentada como si fuera el texto del edicto. La he cambiado por una traducción cercana a *Claudio* 25, 2: «Decretó que todos los esclavos abandonados quedaran libres y que, si se curaban, no volvieran al poder de su amo». La firma es «Suetonio, Vida de Claudio 25 (traducción libre)».
- **Marcial (escena 26):** solo traía medio verso. He puesto el dístico XIV, 42 («Cereus») completo, comprobado con WebSearch: «Esta vela te dará luz por las noches: a tu esclavo le han quitado la lámpara». La firma lleva la fecha (hacia el 85) y la marca de traducción libre.
- **Luciano (escena 36): la he quitado.** La paráfrasis no era fiel. En Luciano (*Saturnales* 4) el rey manda gritar algo vergonzoso de uno mismo, bailar desnudo y llevar a la flautista en brazos alrededor de la casa, y lo de «cantar» no aparece. En su lugar he puesto Epicteto, *Disertaciones* I, 25, que está en la ficha como [V] y lo he comprobado: «Tú, bebe. Tú, mezcla el vino. Tú, canta. Tú, vete. Tú, ven». También he añadido Epicteto a las fuentes de la descripción.
- Catulo («el mejor de los días») y Séneca («Son esclavos. No: son hombres», *Ep.* 47, 1) son literales y solo suenan en la voz.

## Tono y ética
- No hay tono de «esclavos felices». Cada momento de fiesta va acompañado de su contrapeso: «soy una cosa que respira», el truco de la cena invertida (la cocina siguen haciéndola esclavos), la petición de libertad que nadie contesta, Filero vuelve a la cadena, los 400 esclavos de Pedanio Segundo y «Así era el resto del año». Ninguna frase dice que los esclavos fueran libres durante la fiesta.
- Personas reales (Nerón, Británico, Claudio, Séneca, Palante): solo hechos documentados y sin diálogos inventados. Nada gráfico.
- El cierre y la descripción dicen qué es inventado.

## Planos
- He añadido al hijo (`hijo_fiesta`, x 0.7, con aceitunas) en la escena 34: el texto dice «el niño tira las aceitunas» y no salía.
- Caras: en la escena 21, miedo → sorpresa (la frase es de esperanza). En la 50, Eutiquio pasa de triste a neutral («aun así hay luz»). En la 55, triste → neutral (la Navidad).
- Capítulo 3: «Ío, Saturnália» → «Io, Saturnalia». La cartela no pasa por `grafias`, así que salía con la grafía fonética.
- Con cámara «cerca», nadie queda fuera de x ±0.75 (lo he comprobado con un script, también con los personajes heredados). Todos los `quien` existen en el reparto.
- Las tarjetas van en la misma escena que su dato: los 5 días, 225 denarios, la cita del edicto, 300 millones, la vela, los 7 días, la de Epicteto, los Sigilarios, 30 años y 400. No hay inserción en la última escena.
- Emojis: 🏺 🫒 🪔 🪙 📜 🎲 🌰 🕯️ 🏛️ 📍. No hay juguetes modernos, ni 🗼🚢🔫, ni secuencias ZWJ. Los 🪔, 🎲 y 🕯️ de atrezo van a escala 0.25–0.3.
- Bocas: en todas las escenas, la voz sale de Eutíquio o de nadie. Dafne y Calpurnia llevan `narradora-es` y `habla: false`. No hay `dormir` con niños: Primigénio se desmaya «sentado, cansado».
- Catálogo: todos los interiores llevan `ventana: false`. No hay `chimenea`. `templo-romano` va a escala 0.5–0.6 y x 1.1.

## Seseo y pronunciación
- He cambiado estas palabras por sinónimos sin z, ce ni ci: dice ×6 (jura, avisa, explica, murmura, cuenta, creen), del palacio → de la corte, reciente → nueva, en voz baja → por lo bajo, en voz alta → bien alto, cintas → ataduras, cenamos → comemos, la cena → la comida, hacia → a.
- Había frases que acababan en «Roma». Ahora acaban en «del Estado», «del imperio» y «todo el mundo».
- Números siempre en letra. Las grafías de Eutíquio, Vétio, Déa, Esculápio, Velábro, Primigénio, átrio, pecúlio, triclínio, Ío, Saturnália, Sósia, Sigilários y Pedánio están todas en `grafias`.

## Recuento final
- 1.529 palabras y 57 escenas, todas de 15–40 palabras. Días del 1 al 30, con capítulos en los días 1, 8, 17 y 24.
- 14 bloques de short de 101–115 palabras. Todos empiezan con `"corte": true` y los cortes caen en final de frase. `publicacion.shorts` tiene 14 entradas y hay `tituloCorto`.
- El JSON es válido.

## Riesgos que quedan
- No he podido abrir LacusCurtius (red bloqueada), así que las citas se han cotejado con los resúmenes del buscador. Por eso van marcadas como «traducción libre».
- Faltan las muestras: comprobar que el prop `brasero` (mesoamericano) parece un brasero romano, y que el 🎲 se ve bien.

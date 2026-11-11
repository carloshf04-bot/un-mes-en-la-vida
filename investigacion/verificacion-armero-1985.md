# Verificación: armero-1985

Revisado frente a `investigacion/armero-1985.md` y `oficina/GUIA_GUION.md`. Correcciones aplicadas en `guiones/armero-1985.json`.

## Correcciones aplicadas
- **Altura del lodo (esc. 0 y 29):** «un muro de lodo de más de cuarenta metros» llegando a Armero mezclaba datos: los más de 40 m son el espesor del flujo **al salir del cañón del Lagunilla** (Nature, 1986), no la altura en el pueblo. Esc. 29 → «Salió del cañón con más de cuarenta metros de altura…»; esc. 0 → «un río de lodo y piedras borró un pueblo entero. Y el peligro ya estaba dibujado en un mapa treinta y siete días antes». Igual en la descripción.
- **Erupción del 11 de septiembre (esc. 6):** «Nadie murió» no está en la ficha como [V] y la búsqueda no lo confirmó → «Pasó el susto». Igual en la descripción del short 2. Decorado: `casa-adobe` (Egipto/Mesoamérica) → `casa`; clima `polvo` → `ceniza`; `volcan` → `volcan-erupcion`.
- **El mapa (esc. 4):** «el famoso mapa de riesgos» contradecía «casi nadie lo vio» (poca difusión, [V]) → «un mapa de riesgos del que ha oído hablar». Prop `puesto` (pan, queso y manzanas europeos) → `mesa`.
- **Palacio de Justicia (esc. 17):** las muertes fueron de los dos días → «Al final mueren casi cien personas».
- **El Ruiz vigilado (esc. 18):** «el hielo… sigue echando humo sin que nadie lo mire» (el hielo no echa humo, y los geólogos sí lo vigilaban, esc. 19) → «el Nevado del Ruis sigue echando humo y casi nadie lo mira».
- **Aviso (esc. 28):** «el aviso nunca llegó a las casas» era demasiado absoluto (la emisora y los bomberos sí avisaron, pero de ceniza y calma) → «la orden de evacuar no llegó a las casas». Sin culpar a nadie con nombre.
- **Helicópteros (esc. 36):** los 20–30 helicópteros son de los días siguientes (ficha: día 21), no del 14 → «En los días siguientes llego a contar veinte…».
- **Coherencia (esc. 37):** «Yo no la veo, ni sé cómo se llama» (¿cómo lo sabe?) → lo oye por la radio, «No dicen su nombre».
- **Premio de Fournier (esc. 43):** «el premio de fotografía más importante» → «el mayor premio de fotografía de prensa» (World Press Photo del Año). La foto sigue sin describirse.
- **Colombianismos:** «la televisión no enseña el Palacio. Enseña un partido» (uso de España) → «no muestra… Pasa un partido».
- **Seseo:** enseñanza → lección; acierta → cuánta razón tiene; lanza → dice; oficial → organizada; conocida → que recuerde; en voz baja → muy bajito.
- **Fondos:** la sede de la junta en Lérida pasa de pared `piedra` a `ladrillo` (esc. 8, 20, 27, 30), como propone la ficha; la llamada de las cinco-seis de la tarde (esc. 22, 24) pasa de `noche` a `atardecer`; la erupción de las 21:08 (esc. 26) de `dia` a `noche`.
- **Recortes de bloque:** «Esa noche, nadie en la junta pega los ojos» → «Esa noche nadie duerme»; «uno detrás de otro» fuera (bloques 8 y 10 volvían a 112).
- **Short 6:** «30 horas antes» (Calvache subió de día el 12; eran más) → «la víspera».

## Comprobado y correcto
- Calendario: día 1 = sábado 26 oct.; 6 nov. miércoles (día 12); 12 nov. martes (día 18); 13 nov. miércoles (día 19); 16 nov. sábado (día 22); 24 nov. domingo (día 30). Capítulos en los días 1, 9, 19 y 22. Días crecientes.
- Datos [V]: 29.000 habitantes, 50 km, mapa de INGEOMINAS del 7 de octubre (37 días), cinco municipios marcados, 1845, M-19 y partido Millonarios–Unión Magdalena, once magistrados, Calvache el 12, ceniza a las cinco, carro de bomberos («según una superviviente»), 21:08, ~10 % del hielo, dos horas y media, oleadas 23:00 y 23:35, 40–60 km/h, «Armero ha desaparecido» sin nombrar al piloto, ayuda a las ~12 horas, tablas y cuerdas, campesinos en mula, Omayra 60 horas y muerte hacia las diez del sábado, madre enfermera que llega la noche del 15, más de 20.000 muertos (tres de cada cuatro), campo santo, sistema de 1988, Santos en 2015, niños perdidos con la fórmula prudente de la ficha.
- Ética: Omayra en dos escenas sobrias contadas por la radio, sin describir su estado ni la foto, sin «últimas palabras» ni milagros; Wilson no está con ella; se dice que faltó motobomba y que los socorristas lo intentaron todo; no se nombra al alcalde, al párroco ni a ministros; no aparece nada de la lista «NO USAR» (lava, 300 km/h, Chinchiná mezclada, Pablo Escobar…). Cierre y descripción dicen que Wilson, Luz Marina y don Efraín son inventados.
- Bocas: todos los personajes llevan `habla: false`, así que todas las escenas salen con la voz del narrador masculino; Luz Marina y la madre llevan `"voz": "narradora-es"`. Nadie duerme; sin niños en escena.
- Catálogo: lugares, paredes, props, ropa, sombreros, acciones y emociones existen en la guía; emojis simples (📻 ☎️ 📺 🚒 🪢 🪵 🔦 🩹 📋 🖼️ 🕯️ ✝️ 🌼 🥭 ☕ 🧊 🌋 🌊 🏔️ 🗺️ ⛪ 📍), ninguno prohibido ni con ZWJ; `tumba` solo en cementerio cristiano; volcán siempre lejos (x ±1.3–1.4, escala 1.8–2.4); protagonista en x ≥ 0.3 en la escena 0; sin inserción en la última escena.
- JSON válido; números en letra en todos los `texto`; grafías de Uílson, Gusmán, Lus, Sivil, Siudad, Ruis, Lusía, Omaira, Franc, Furnié, Ingeominas.

## Cifras finales
- 1.531 palabras, 56 escenas (todas de 16–37 palabras).
- 14 bloques de short de 103–114 palabras (todos empiezan con `"corte": true`, escena 0 incluida) y 14 entradas en `publicacion.shorts`; `tituloCorto` presente.

## Riesgos que quedan
- La ceniza de septiembre en las canaletas de Armero (esc. 5) y «Todos los Santos» en viernes (el festivo se trasladaba al lunes por la Ley Emiliani; el texto no dice «festivo») son detalles de ambientación.
- «Tiempo de sobra para salir» sigue la ficha ([V]), pero es una afirmación fuerte ante un público colombiano.

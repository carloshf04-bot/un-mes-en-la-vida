# Verificación: darwin-1859

Revisado frente a `investigacion/darwin-1859.md` y `oficina/GUIA_GUION.md`. Correcciones aplicadas en `guiones/darwin-1859.json`.

## Correcciones aplicadas
- **Error de hecho (escena 52):** «Nunca escribí supervivencia del más apto» era falso: Darwin adoptó la frase de Spencer en la 5.ª edición (1869). Ahora: «En este libro no escribo supervivencia del más apto, ni que vengamos del mono. Ni siquiera aparece la palabra evolución: el libro acaba en otra, evolucionado». Título y descripción del short 14 y la nota de la descripción, ajustados igual.
- **Tobillo (9):** la ficha no dice que se lo torciera «en el páramo»; ahora «en una caída».
- **Wallace (7):** «casi palabra por palabra» → «casi idéntica» (lo que dice la ficha).
- **Casa alquilada (10):** la alquiló Darwin, no Emma → «alquilamos».
- **Falconer (26):** no estaba «al otro lado del mar»; la frase separa a Falconer de Gray y Agassiz.
- **Kingsley (38):** la carta está fechada el 18 desde Eversley; no consta que llegara a Ilkley ese día → «me escribe una carta que no esperaba. Al abrirla…».
- **Hijas (48):** Henrietta y Elizabeth eran sus únicas hijas vivas: «mis dos hijas mayores» → «nuestras dos hijas».
- **Citas dudosas cotejadas con WebSearch (DCP):** Huxley, 23 nov. (DCP-LETT-2544): «I am sharpening up my claws & beak in readiness» → escena 49 dice ahora «ya afila sus garras y su pico para defenderlo» (antes «uñas y dientes», inventado). Sedgwick, 24 nov. (DCP-LETT-2548): «parts I laughed at till my sides were almost sore» → escena 50: «con algunas partes se rió hasta que le dolieron los costados». Ambas pasan de [D] a [V]. Descripción actualizada.
- **Biógrafos (24):** «Dicen mis biógrafos» (presente, incoherente en 1859) → «Mis biógrafos dirán».
- **Cartas de las semanas 3 (26/30):** «la carta que más me cuesta» (Henslow) y luego «la más difícil de todas» (Wallace) se contradecían → «me queda otra carta que me da aún más miedo».
- **Gancho del bloque 9 (32):** «Le confieso…» → «A Uólas le confieso…», que se entiende solo.
- **Cierre (55):** «el mes que viene» (los episodios son diarios) → «pronto llega otra vida…».
- **Descripción:** quitado «Oxford» del epílogo (no sale en el vídeo).
- **Fin de frase en nombre (6, 41):** «…una isla lejana, Ternáte.» → «desde Ternáte, una isla lejana.»; «…mi amigo Júker, y nadie más» → «a un creyente seguro, Júker, y a nadie más» (quita también la repetición de «amigo»).
- **Seseo:** «empieza a arder» → «se inflama de golpe»; «empieza a mandar» → «ya manda»; «empiezo a dudar» → «ya dudo»; «nacieron» → «salieron».
- **Puntos abiertos del Director:**
  1. *Murray en Londres (17–18, 43–44):* se mantienen sin Darwin porque la escena es claramente Londres (Murray con el libro verde y cajas, el librero que se lo lleva) y Darwin narra desde Ilkley. Para que la 18 no quede abstracta se le añade una tarjeta «15 chelines: más que la paga semanal de un jornalero (10 chelines y 8 peniques)» (cifra [V] de la ficha); la 44 ya tenía la tarjeta de 1.250/1.500.
  2. *Cartero:* la Postal Museum confirma la levita roja de los carteros de ciudad hacia 1855–1861, pero los carteros rurales (Ilkley) no recibieron uniforme gratuito hasta 1873 y las fuentes no coinciden. Se cambia a `abrigo` pardo oscuro con pantalón gris (sombrero de copa negro), válido en Londres y en el campo.
  3. *Días 11–14 saltados:* coherente. Semana 2 = días 8–10 (2–4 nov.), semana 3 arranca el día 15 (miércoles 9 nov.).

## Comprobado y correcto
- Calendario de 1859 comprobado con Python: 26 oct. miércoles, 1 nov. martes, 2 mié., 4 vie., 9 mié., 11 vie., 12 sáb., 13 dom., 14 lun., 16 mié., 18 vie., 19 sáb., 21 lun., 22 mar., 23 mié., 24 jue. Capítulos en los días 1, 8, 15 y 22.
- Ubicaciones coherentes: casa alquilada (pared de papel) hasta el traslado del día 5; balneario (piedra) días 5–9; vuelta a casa el día 10 (4 nov.).
- Datos [V]: Wallace y Ternate (18 jun. 1858), Linnean Society (1 jul. 1858), muerte de Charles Waring, «como confesar un asesinato» (1844), 1.250 ejemplares a 15 chelines, «infinitamente contento… de mi criatura», siete hijos de 8 a 19 años, Annie en Malvern con diez años (sin causa ni detalles), Henslow y el Beagle, carta a Wallace del 13, Fox y los forúnculos, «crisis» del doctor Smith, Kingsley, Athenaeum, venta del 22 (más de 1.500 pedidos, 1.192 disponibles), mito de las colas, Huxley y la hoguera, Lyell «completamente confundido», Sedgwick «más dolor que placer», 2.ª edición de 3.000, barba en 1862, Westminster. Nada de la lista «no usar» (sin «bulldog», sin diagnósticos, sin Wilberforce).
- Ética: persona real, cierre y descripción dicen que pensamientos y escenas son imaginados; Annie en escena luminosa; forúnculos nombrados, no mostrados; los dos clérigos con respeto.
- Bocas: Darwin es el primer personaje en todas sus escenas; Emma, Etty, Bessy y Annie llevan `narradora-es` y `habla: false` siempre; en 17–18 y 43–44 nadie habla (sale el narrador). `dormir` solo en Darwin (45).
- Catálogo: lugares, paredes, props, ropa, sombreros, acciones y emociones existen; 🐢 a escala 1.6; sin 🗼 🚢 🔫 ni ZWJ; 🫗 y el resto de emojis están en la fuente Noto Color Emoji instalada. Interior de Westminster con `ventana: false`. Darwin sin barba (1859).
- Grafías: todas las palabras escritas como suenan están en `grafias`. Números en letra en todos los `texto`.

## Cifras finales
- 1.518 palabras, 56 escenas (todas de 15–40 palabras), `velocidad` 1.15.
- 14 bloques de short (98–115 palabras), todos empiezan con `"corte": true` (escena 0 incluida); 14 entradas en `publicacion.shorts`; `tituloCorto` presente. JSON válido.

## Riesgos que quedan
- Bloque 3 (escenas 9–12) y bloque 14 (51–55) están en 115 palabras, el tope.
- Algunas fechas de recepción de cartas son aproximadas (Hooker «lunes 21», carta fechada por los editores); van sin comillas.

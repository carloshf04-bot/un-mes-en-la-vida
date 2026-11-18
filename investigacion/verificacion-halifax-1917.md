# Verificación: halifax-1917

Revisado frente a `investigacion/halifax-1917.md` y `oficina/GUIA_GUION.md`. Las correcciones están aplicadas en `guiones/halifax-1917.json`.

## Correcciones aplicadas (16)

**Hechos**
- Esc. 36: «cae la peor tormenta de nieve del invierno» no está verificado. Pasa a «cae una ventisca que nadie esperaba» (ficha: «la tormenta llegó casi sin aviso» [V]).
- Esc. 24: «Echa a correr» pasa a «Empieza a irse». La ficha dice que Coleman empezó a irse y volvió; no hay que dramatizar a una persona real.
- Esc. 11: «Yo no tengo ni para un caramelo» chocaba con la esc. 15, donde Tom compra una bufanda con sus ahorros. Pasa a «ni para un bono».

**Planos que no mostraban el texto**
- Esc. 8: el texto dice «siete uíguams y una escuela», pero no se veía ninguna escuela. Se añade una `cabana` pequeña y la hoguera se aparta.
- Esc. 12: «se ve todo Ríchmond bajando hasta el agua». Se añaden dos casas pequeñas al fondo.
- Esc. 21: «abandonan el barco en botes». Se añade un `bote`.
- Esc. 34: el texto dice «a media mañana», pero la hora era `atardecer`. Pasa a `dia`.
- Esc. 35: «pasamos la tarde». Recibe su propio fondo (el mismo campo) con hora `atardecer`.

**Tarjetas en la escena del dato**
- Esc. 29: la tarjeta «9:04» estaba en una escena que habla del ancla y del récord, y la hora se dice en la esc. 28. La tarjeta pasa a «≈3 km / voló el ancla del Mont-Blanc: la mayor explosión hecha por el hombre antes de la bomba atómica» (⚓).
- Esc. 57: el texto habla del silencio de las nueve y cuatro, así que se pone ahí la tarjeta «9:04 / un minuto de silencio cada 6 de diciembre en Fort Needham» (🔔). No es la última escena.

**Emojis de juguete**
- Fuera los emojis gigantes que flotaban en el decorado: 🍁 en la calle (esc. 11), 🕯️ sobre el agua (esc. 45; en su lugar va una `roca`) y 🔔 en el campo (esc. 57; en su lugar, `bandera` genérica y la tarjeta).
- Esc. 44: el icono 🏥 (hospital moderno) pasa a 🛏️.

**Caras**
- Esc. 22: el vecino que mira el fuego tenía cara de `miedo`. Pasa a `sorpresa`, porque la gente salió a mirar con curiosidad.
- Esc. 53: Tom y Annie, al darle la bufanda en Nochebuena, pasan a `feliz`.

**Seseo**
- Esc. 20: «se cruzan mal» pasa a «maniobran mal».
- Esc. 51: «renuncian a sus regalos» pasa a «se quedan sin regalos».

## Comprobado y correcto
- **Datos [V]:** la red antisubmarina, el Mont-Blanc fondeado fuera el día 5, casi 3.000 t de explosivos y bensol en cubierta, que no llevaba bandera roja, el retraso del Imo por el carbón, el choque a las 8:45, la explosión a las 9:04, la Patricia, Coleman (su cita va con «dicen que», en la versión del museo, y no se afirma que «salvó a 300»), el tren detenido en Rockingham, el rumor del polvorín de Wellington, los 40 cm de nieve, el tren de Boston (11 h, 13 médicos y 10 enfermeras), los ≈1.400 heridos de Camp Hill, Turtle Grove y Africville, las elecciones del 17 sin votación, los 750.000 $, Brantford, el Hydrostone, el árbol de Boston y «casi dos mil» muertos (uno de cada cuatro, menor). Nada de la lista «NO USAR»: no hay heridas, ni ojos, ni culpables, ni 18 m de ola, ni 1,2 m de nieve.
- **Calendario:** el día 1 es el lunes 26 de noviembre, y el día 11 es el jueves 6 de diciembre. Los días de la semana del texto cuadran. Los capítulos caen en los días 1, 8, 15 y 22.
- **Catálogo:** todos los props existen en `Props.tsx` (`tren`, `ruinas`, `wigwam`, `estufa`, `bote`, `cabana`…). `tumba` solo sale en el entierro católico. No hay `dormir`. Todos los `quien` están en el reparto, y los personajes femeninos llevan `narradora-es`.
- **Bocas:** todos los personajes llevan `habla: false`, así que la voz es siempre el narrador masculino (Tom). Ninguna escena cambia de voz por error.
- **Cámara «cerca»:** nadie pasa de x ±0.75 (máximo 0.6). La protagonista entra en cuadro en la escena 0 (x 0.4). La última escena no lleva inserción.
- **Cierre:** dice que Tom, su familia y Barnes son inventados, y la descripción también lo avisa.
- El JSON es válido. No hay emojis prohibidos (🚢 🗼 🔫) ni secuencias ZWJ.

## Cifras finales
- **1.543 palabras** y 60 escenas, todas de 15–40 palabras.
- **15 bloques de short** de 96–113 palabras, que empiezan con `corte` y acaban en final de frase. Hay 15 entradas en `publicacion.shorts`, y `tituloCorto` está presente.

# Verificación: whitechapel-1888

Revisado frente a `investigacion/whitechapel-1888.md` y `oficina/GUIA_GUION.md`. Correcciones aplicadas en `guiones/whitechapel-1888.json`.

## Correcciones aplicadas

### Fondos de una sola escena (eran 6: escenas 7, 31, 34, 46, 50 y 58)
- **7** (el Times da por acabado el registro): hereda la calle de día de Commercial Street (4–7); Ashby con el periódico en vez de escribiendo en comisaría.
- **29–31:** la escena 29 (artículo de Warren) pasa a la calle de Dorset de noche (26–29) y la 30 (dos de noviembre) toma la calle de día de la 31 (30–31). «En comisaría no se habla de otra cosa» → «El sargento no habla de otra cosa».
- **34** (desfile del viernes): pasa a la calle de noche de 35–36, que ahora tiene `lluvia` (la escena 36 dice «bajo la lluvia» y el fondo tenía niebla). «En comisaría se comenta» → «El sargento me cuenta».
- **46–49:** la noche de Dorset Street se mantiene en el sábado y el domingo (curiosos en Dorset Street).
- **50–52:** la vista del forense se cuenta en la calle de día con el periódico; fuera el interior de madera de una escena.
- **55–58:** el cierre se queda en el cementerio (57 repetía el mismo fondo y 58 era una calle suelta).

### Hechos
- **57 y su tarjeta:** «Catherine Eddowes, que volvía del lúpulo» es [D] → «sexta de doce hermanos» [V].
- **43:** la City no está «al otro lado de Londres», está pegada a Whitechapel → «a un paso de aquí». Que los vendedores voceasen la noticia entre el público se suaviza con «dicen». La tarjeta `cita` no era una cita real (firma de fecha) → tarjeta `dato` «9 nov: el mismo día, la City celebraba el desfile del nuevo Lord Mayor».
- **44:** la hora de la puerta es [D] → «Hacia la una y media».
- **37:** llovió hasta las 11 → «Llueve desde el amanecer» (antes «toda la mañana»).
- **29:** la fecha de venta de Murray's Magazine es [D] → «Una revista de este mes trae un artículo…».
- **22:** no consta una carta concreta el domingo 28 → «siguen sacando cartas que dicen ser del asesino. Casi todas son falsas».
- **28:** la ventana de Kelly daba al patio, no a Dorset Street → «al fondo de un patio».
- **40:** los inspectores no llevaban casco → «agarra el abrigo».
- **20:** «Sábado de paga» chocaba con la paga del viernes (escena 18) → «Es sábado, noche de ginebra». La pelea pasa dentro del Ten Bells, que es el decorado.

### Ética y personas reales
- **39:** «blanco como la pared» (aspecto inventado de Thomas Bowyer) → «sin aliento» (fue corriendo, documentado).
- Revisado: ningún sospechoso nombrado, la puerta no se abre en pantalla, nada gráfico, la caja de Lusk sin describir, las cinco mujeres nombradas con un dato de vida, antisemitismo solo para decir que hubo sospechas sin motivo.

### Puesta en escena y voz
- **20:** el estibador borracho tenía `tambalear` (acción de infectado/zombi) → `quieto`.
- **53:** seseo: «con cansancio y vergüenza» → «rendido y con la cabeza baja»; «farol de aceite» → «simple farol».
- **3:** «un sábado de octubre» repetía la última palabra antes de «Sábado, veinte de octubre» → «un sábado de otoño».
- **20–21:** «hasta la puerta» / «En la puerta» → «hasta la calle».
- Objetos 🏮 retirados donde Ashby está de día (51–52, 58) y añadidos en las rondas de noche (29, 34).

## Comprobado y correcto
- Calendario: día 1 = sábado 20 de octubre de 1888; martes 23 (veredicto Stride), jueves 1 y 8, viernes 9, sábado 10, lunes 12 y domingo 18 de noviembre cuadran. Capítulos en los días 1, 8, 15 y 22; clímax el día 21.
- Datos [V]: caja de Lusk y Openshaw, registro casa por casa, sabuesos («dicen» que Warren hizo de presa), 4/8 peniques, 233 casas y 8.530 personas, 4 s 6 d y 29 chelines, riña del 30 de octubre, Bowyer, Abberline y los sabuesos que no llegaron, pico de McCarthy, dimisión de Warren, perdón a cómplices, vista en Shoreditch, Wilton y el entierro, huellas en 1901, silbato de 1884.
- Catálogo: lugares, props, emojis (🐕 y 🐎 a escala 1.6), ropa, sombreros y acciones existen; cocina de sótano con `ventana: false`; `tumba` en cementerio católico. Sin 🗼 🚢 🔫 🔪 🩸 🔦 ni ZWJ.
- Bocas: Ashby es siempre el primer personaje; todas las mujeres (Ellen, encargada, mujer) llevan `narradora-es` y `habla: false`. Protagonista dentro de cuadro y en x ≥ 0.3 en la escena 0.
- El cierre (56) y la descripción dicen que Ashby y Ellen son inventados.

## Cifras finales
- 1.537 palabras, 59 escenas (todas de 15–40 palabras), 12 inserciones (ninguna en la última escena).
- 15 bloques de 96–109 palabras, todos empiezan con `"corte": true` en final de frase; 15 entradas en `publicacion.shorts`; `tituloCorto` presente.
- Ningún fondo dura una sola escena (tramos de 2–5 escenas; el de Miller's Court del día 21, 41–45, se deja en 5).
- JSON válido.

## Riesgos que quedan
- 🏮 es un farol de papel oriental: hace de farol «ojo de buey» porque no hay prop propio. Mirar en las muestras.
- El tramo 41–45 (cordón de Dorset Street) son 5 escenas en el mismo fondo, con cambios de personajes y cámara.

# Verificación: trinchera-1914

Revisado frente a `investigacion/trinchera-1914.md` y `oficina/GUIA_GUION.md`. Correcciones aplicadas en `guiones/trinchera-1914.json`.

## Correcciones aplicadas
- **Escena 30 (tablón):** «dos palabras pintadas» → «tres palabras» (el tablón decía «A MERRY CHRISTMAS»).
- **Escena 47 (orden de consejo de guerra):** «Dos semanas después de Navidad» era falso (el día 24 es el 2 de enero, a ocho días). Además, la ficha solo verifica la orden en la London Rifle Brigade, y que el 2.º RWF la recibiera ese mismo día es [D]. Ahora dice «Con el año nuevo llega la orden: si un oficial o un sargento arranca otra tregua, irá a consejo de guerra» (de paso se quita «empiece»).
- **Escena 41:** «ese día casi nadie dispara a dar» es [D] en la ficha → «que yo oiga, ese día casi nadie dispara a dar» (lo que percibe el narrador).
- **Escena 55 (2014):** «se dieron la mano» no consta; según ITV Wales (13-12-2014), Miles Stockwell y Joachim von Sinner se cambiaron regalos en Frelinghien → «se encontraron allí y se cambiaron regalos».
- **Escena 15:** «quien intente ir a buscarlos no volverá» contradecía la patrulla nocturna de la escena anterior → «de día, quien vaya a buscarlos no vuelve».
- **Planos:**
  - Escena 21: el clima `nieve` (cielo cubierto y copos) no cuadraba con «deja de llover… esa noche hiela» → `despejado`.
  - Escena 27: caras de Tom e Ívor cantando «a pleno pulmón» → `feliz` (antes `neutral`).
  - Escenas 44–45: el día 19 Tom está en primera línea pero salía en un cuarto de ladrillo con ventana y `estufa` (prop de la América de los cincuenta). Ahora la escena 44 es el refugio (madera, sin ventana, vela) y la 45 («Relevo a Uplín») tiene su propio acantonamiento de ladrillo con ventana.
  - Escena 56: Mégan llevaba un 👶 en las manos, que el motor pinta como una cabeza de bebé de 120 px (parece un muñeco). Se quita el objeto y ella queda `quieto`, `feliz`.
- **Seseo:** «cerca de» (×2) → «junto a»; «deja de hacer frío», «con fuerza», «Entonces» (×2), «se endurece», «empiezan a encenderse», «encima», «sin decir nada», «empiezan a cantar», «despacio», «aceptarlos», «dice» → sinónimos sin z/ce/ci.

## Comprobaciones pedidas
- **Fútbol:** se cuenta solo como rumor y leyenda: «El lunes corre el rumor de que se jugó más al norte. En mi compañía nadie lo vio», las cartas que hablan de pelotear sin equipos ni reglas y el «tres a dos» que contó un teniente sajón medio siglo después (tarjeta «1968… ningún diario de guerra lo confirma»). Nada se presenta como visto. Correcto.
- **HMS Formidable (1 de enero de 1915):** no aparece ni en el guion ni en la publicación. Se ha comprobado de todos modos (hundido por el U-24 en el canal; unos 547 muertos según la mayoría de las fuentes, cerca de 600 según otras), pero no se añade.
- **Cámara «cerca»:** ningún personaje fuera de x ±0.75 (comprobado con script, contando personajes heredados).
- **Emojis:** no hay prohibidos (🗼 🚢 🔫 ZWJ ⚽ 🪖 🍮 🎅 🪦) ni de juguete. Atrezo: 🕯️ ✉️ 🗞️ 🎁 🍫 🖼️ 🪧 📜 🪙 🍺 🧦 🕊️ 📍.
- **Tarjetas:** cada una va en la escena que da el dato (mapa 4, chelín 7, 137 muertos 12, caja de la princesa 20, cita de Nochebuena 25, tablón 30, 2 × 1 35, salmo 38, 1968 44, pie de trinchera 49, monumento 54). La última escena no lleva tarjeta.

## Comprobado y correcto
- Calendario: jueves 10-12-1914 = día 1; domingo 13, martes 15, miércoles 16, jueves 17, sábado 19, domingo 20, lunes 21, martes 22, miércoles 23, jueves 24, viernes 25, sábado 26, domingo 27, lunes 28, martes 29, jueves 31, domingo 3, lunes 4, miércoles 6 (Reyes) y viernes 8 de enero. Capítulos en los días 1, 8, 15 y 22. Güen nace el 2-11: seis semanas el 16-12 y ocho meses en el verano de 1915.
- Hechos [V] de la ficha: chelín al día; Scarborough, Hartlepool y Whitby (137 muertos, casi todos civiles); orden de Smith-Dorrien; llamamiento de Benedicto XV rechazado; caja de latón de la princesa María (17 años; tabaco, pipa, cigarrillos, tarjeta, foto); arbolitos con velas; «No disparéis…» (cita marcada «según el relato del batallón»); tablón de Richards; encuentro en medio; dos barriles por un pudin; Stockwell y von Sinner; salmo 23 en dos idiomas cerca de Fleurbaix; 8:30 del 26: tres tiros, «Gracias», dos tiros; «la guerra volvía a empezar»; hora de Berlín una hora por delante; aceite de ballena y más de 20.000 casos de pie de trinchera; gas en Ypres en abril de 1915; Richards soldado raso toda la guerra; monumento de 2008; nietos en 2014.
- Sin anacronismos: gorra de tela para los británicos, pickelhaube forrado para los sajones, sin cascos de acero, gas, amapolas ni Hitler. Muertos nombrados con respeto y nunca mostrados (solo cruces de madera, `tumba` en cementerio cristiano).
- Bocas: Tom es el primer personaje en todas las escenas; los demás llevan `habla: false`. Mégan tiene `"voz": "narradora-es"` y `habla: false`. Nadie duerme. Interiores de refugio con `ventana: false`.
- Grafías: Élis, Mégan, Güen, Récsam, Frelangán, Uplín, Armantiér, Ívor, Stócuel, fon Síner, Ríchards, Smit Dórien y Flerbé, todas en `grafias`. Números en letra. El cierre dice qué es inventado (Tom, Mégan, Güen, Ívor, Otto) y qué es real.
- JSON válido.

## Cifras finales
- 1.545 palabras, 59 escenas (todas de 15–40 palabras), 4 capítulos.
- 15 bloques de 96–109 palabras, cada uno empieza con `"corte": true`; 15 entradas en `publicacion.shorts`; `tituloCorto` presente.

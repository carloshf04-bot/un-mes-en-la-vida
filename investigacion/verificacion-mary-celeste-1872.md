# Verificación: mary-celeste-1872

Revisado frente a `investigacion/mary-celeste-1872.md` y `oficina/GUIA_GUION.md`. Correcciones aplicadas en `guiones/mary-celeste-1872.json`.

## Correcciones aplicadas
- **Datos dudosos suavizados o cambiados:**
  - Esc. 7: el «jugo de lima» a bordo es [D] (la ley existe, su cumplimiento no consta). Se cambia por guisantes y patatas de los primeros días [V]; la tarjeta cambia 🍋 por 🥔.
  - Esc. 26: «casi un metro» → «un metro» (3,5 pies ≈ 1,07 m).
  - Esc. 30: tripulación total [D 7 u 8] → «quedamos unos cinco… para el trabajo de ocho».
  - Esc. 32: el temporal del Estrecho es [D] → «según cuentan las crónicas»; «Seiscientas» → «Unas seiscientas».
  - Esc. 37: hora de llegada [D] → se quita «Por la mañana».
  - Esc. 43 y tarjeta: «una quinta parte» [D] → «una quinta o una sexta parte».
  - Esc. 44: el desayuno a medio comer lo adornaron después (ficha, NO USAR 1) → «Salió de la pluma de un médico…» en vez de atribuírselo todo a Conan Doyle.
  - Esc. 45: añade «sin firma» [V]. Esc. 46: cita de Solly-Flood [D palabras] → paráfrasis «un puro invento».
  - Esc. 49: la hipótesis va en subjuntivo («Puede que… temiera»).
- **Bloques de short:** el gancho de la esc. 36 empezaba con «Esa misma noche» (no se entiende solo) → «Llegamos a Gibraltar ya de noche…».
- **Pronunciación (final de frase y repeticiones):** «me llaman Tom.» (14 → «Tom a secas»), «su madre, Sara.» → «con Sara, su madre», «…Yeims Cócran.» y «Se llamaba Ártur Cónan Dóil.» reescritas para que no acaben en nombre; «…Santa María.» al final de las esc. 51 y 54, reescritas. Repeticiones de la última palabra: «timón» (19→20) y «diciembre» (16→17).
- **Seseo:** desaparecer (×2), bandazos, posición, otra vez, aparecen/aparece, mil veces, reconoce, recibirlos, encima, despacio, empieza, sentencia, invención/principio, rebautizó, quizá → sinónimos sin z/ce/ci.
- **Planos y caras:** esc. 24, Devó «hablar» con cara de sorpresa (Tomás le oye contarlo); esc. 33, fondo al amanecer («cada mañana busco su vela»); esc. 38, Tomás triste («la alegría dura poco»).

## Comprobado y correcto
- Fechas y días de la semana (vie. 15 nov. = día 1; dom. 24, lun. 25, lun. 2 dic., mié. 4, jue. 5, mié. 11, jue. 12, vie. 13, sáb. 14). Capítulos en los días 1, 8, 16 y 22; clímax el día 20.
- Hechos [V]: 1.701 barriles y 9 vacíos, pizarra a las 8 h y seis millas, Deveau/Wright/Johnson en el bote, Anderson y Lund con Deveau, lo que faltaba y lo que seguía, embargo el 13, espada sin sangre, 1.700 £ en marzo, nadie acusado, Conan Doyle 1884 con 24 años, Parker 1885, Sella 2006, Arthur con 7 años en tierra. Nada de la lista «NO USAR».
- Protagonista inventado dicho al principio (esc. 3), en el cierre (esc. 54) y en la descripción. No sube al Mary Celeste ni sustituye a nadie. Familia Briggs sin nada morboso.
- Bocas: ningún personaje femenino en el reparto; la voz sale siempre de Tomás o de nadie (resto con `habla: false`).
- Catálogo: lugares, props, ropa, sombreros, acciones y emociones existen. Emojis permitidos por la ficha; sin 🚢 🗼 🔫 🛢️ 🧸 ni ZWJ. Interiores de bodega y camareta con `ventana: false`.
- Nadie fuera de x ±0.75 con cámara «cerca». Las tarjetas están en la misma escena que su dato (2 horas, 3 hombres, 600 millas, 9 de 1.701, 1.700 £, 10 personas, mapa de Gibraltar del 12).
- JSON válido.

## Cifras finales
- 1.534 palabras, 56 escenas (todas de 15–40 palabras).
- 14 bloques de 101–115 palabras, todos empiezan con `"corte": true` (escena 0 incluida) y en final de frase; 14 entradas en `publicacion.shorts`; `tituloCorto` presente.

## Riesgos que quedan
- No hay muestras renderizadas: Producción debe mirar el bote (esc. 22 y 49), el Peñón hecho con `roca` (esc. 36–39) y las tres figuras de la esc. 41.
- La espada (esc. 42) no se ve en pantalla: solo el informe (📜) en manos del juez.

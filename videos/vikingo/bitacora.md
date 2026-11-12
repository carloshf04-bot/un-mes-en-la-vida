# Bitácora: vikingo

2026-11-06 · 0 · Dirección · idea elegida (siguiente pendiente) · el usuario pide guiones nuevos, sin reutilizar los del repo; el gladiador queda aparcado
2026-11-06 · 1 · investigador · investigacion.md (25 hechos, 5 mitos; Ulf, Vestfold, 890, mes lunar) · a revisión, puerta 1
2026-11-06 · — · Dirección · entorno: la red bloqueaba las descargas de Hugging Face; creado el entorno «un-mes-en-la-vida» con esos hosts
2026-11-06 · 1 · control-calidad · CAMBIOS (1 grave: dientes limados situados en Hedeby; 8 menores) · devuelto al investigador, vuelta 1
2026-11-06 · 1 · control-calidad · APROBADO en la vuelta 2 · paso 1 cerrado
2026-11-06 · 2 · disenador · diseno.md (6 principales y 7 figurantes, 29 escenarios, Uncial Antiqua, miniatura «¿TE IRÍAS DE VIKINGO?») · a revisión, puerta 2
2026-11-06 · 2 · control-calidad · CAMBIOS (2 graves: carretilla anacrónica; ins_museo e ins_volga sin 5 capas; 11 menores) · devuelto al diseñador, vuelta 1
2026-11-06 · — · usuario · los Shorts son el vídeo largo partido en partes, nada más · añadido a INSTRUCCIONES_BASE
2026-11-06 · 2 · control-calidad · APROBADO en la vuelta 2 (queda menor: museumCase en dos filas, aceptado) · paso 2 cerrado
2026-11-06 · 4 (adelanto) · Dirección · copiado el rig del gladiador a videos/vikingo/scripts y fuentes Inter y Uncial Antiqua (woff2, de Google Fonts) a videos/vikingo/fonts
2026-11-06 · 5 (adelanto) · Dirección · miniaturas/vikingo.json sacado del diseño (fuente en woff2); se genera cuando estén ulf y su GEAR
2026-11-09 · 3 · guionista · guion.txt (1.982 palabras, ~11:56) y guion_visual.md · a verificación y puerta 3
2026-11-09 · 4 (adelanto) · Dirección · el proyecto del gladiador-mes no se había perdido (otra sesión lo subió); el rig del vikingo pasa a ser el de gladiador-mes (gm_lib, gl_fondos2, miniatura.mjs) y shorts.py de 1 minuto
2026-11-09 · 3 · control-calidad · CAMBIOS (3 graves: frases copiadas en 17, 230, 231; 6 menores) · espero al verificador para devolver todo junto
2026-11-09 · 3 · verificador · CAMBIOS NECESARIOS (2 de gravedad media: líneas 188 y 223; varios recomendados) · devuelto al guionista con lo de calidad, vuelta 1
2026-11-09 · 3 · guionista · vuelta 1 aplicada (1.998 palabras, 238 líneas) · a re-revisión
2026-11-09 · 3 · verificador + control-calidad · OK y APROBADO en la vuelta 2 (1.998 palabras, ~12:02) · paso 3 cerrado
2026-11-09 · 4 · Dirección · voz lanzada en segundo plano (voz_cb.py adaptado: voz de referencia de oficina/voz y finales de capítulo leídos de guion_visual.md)
2026-11-10 · 4 · produccion · animación con tiempos provisionales (8 capítulos, 29 escenarios, check sin errores, 14 arreglos) · a puerta 4; producción sigue con el sonido
2026-11-10 · 4 · control-calidad · CAMBIOS (4 graves: solape en frase 5, vacas invisibles en 42, 5 DÍAS tapa HEDEBY en 117, etiquetas de mapa < 46 px; 2 menores) · devuelto a producción, vuelta 1
2026-11-10 · 4 · control-calidad · APROBADO en la vuelta 2 (animación provisional; menor pendiente: ZZZ roza LUNA LLENA en la frase 135) · falta la voz real para cerrar el paso 4
2026-11-11 · 4 · produccion · ZZZ de la 135 arreglado; miniaturas hechas; la fuente uncial no tenía A-Z (woff2 latin-ext) → cambiada a la TTF completa · los rótulos en uncial se revisan de nuevo
2026-11-11 · 4 · Dirección · whisper: 50 frases «con fallos», pero 31 eran nombres nórdicos mal transcritos (Wolf/Ulf, Edebi/Hedeby…); comprobación cambiada a letra a letra con alias de nombres → 19 fallos reales (finales inventados, repeticiones) que se regeneran
2026-11-11 · 4 · Dirección · voz terminada: 860,35 s (14:20), 238/238 frases comprobadas con whisper · a montaje con la voz real
2026-11-11 · 5 · Dirección · un reinicio del contenedor cortó el render horizontal al 45 %; nuevo render por tramos de 60 s que se retoma (scripts/render_tramos.sh)
2026-11-11 · 5 · Dirección · render horizontal: 480/860 s hechos en 4 tramos (~40 min por tramo de 3 min); retomado tras un reinicio
2026-11-11 · 5 · produccion/Dirección · horizontal terminado: 860,35 s, 1920×1080, −14,0 LUFS, LRA 3,9 · a puerta 5 y espectador; el vertical se renderiza para los Shorts
2026-11-11 · 5 · espectador · 8/10 APTO, pero rótulo ilegible en 6:54 (ÓTTAR encima de UN NAVEGANTE NORUEGO: grave según DIRECCION) y VIKINGO en uncial se lee VIRINGO · render vertical parado hasta arreglar
2026-11-11 · 5 · control-calidad · CAMBIOS (3 graves: Ulf duplicado 51-54, ÓTTAR solapado 115-116, rótulo cortado 191; menores) · técnica OK (duración, −14 LUFS, uniones, sincronía) · devuelto a producción junto con lo visual del espectador; los cambios de texto del espectador (frisón, «hace cuarenta años») se resuelven con rótulos, sin tocar la voz
2026-11-12 · 5 · produccion · arreglos de la puerta 5 y del espectador hechos (check 0 errores en h y v; mezcla rehecha a −14,0 LUFS con los clank) · Dirección: se re-renderizan solo 6 ventanas (≈2 min) y se insertan en el horizontal (scripts/parchear.sh)
2026-11-12 · 5 · Dirección · horizontal parcheado (6 ventanas re-renderizadas, 25.810 fotogramas exactos, −14,0 LUFS) · a puerta 5 vuelta 2; render vertical completo en marcha para los Shorts
2026-11-12 · 5 · control-calidad · vuelta 2: miniaturas APROBADAS; horizontal CAMBIOS (grave: el título viejo reaparece de 28 a 29,7 s por el corte de la ventana; menor: parpadeo de 1 fotograma en 306 s) · Dirección: ventanas 20-31 y 304-326
2026-11-12 · 5 · control-calidad · vuelta 3: horizontal APROBADO (miniaturas ya aprobadas) · faltan los Shorts (el vertical se renderiza entero, no hace falta parchearlo)
2026-11-12 · 6 · Dirección · entregados al usuario el horizontal y las miniaturas (aprobados); los Shorts se entregan aparte cuando acabe el vertical, para no hacerle esperar horas
2026-11-12 · 5 · produccion/Dirección · vertical renderizado entero (25.809 fotogramas, 860,35 s) y cortado en 16 Shorts de 51-57 s · a puerta 5 (Shorts)

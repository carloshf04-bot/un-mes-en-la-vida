# Verificación: abidos-1270ac

Revisado frente a `investigacion/abidos-1270ac.md` y `oficina/GUIA_GUION.md`. Correcciones aplicadas en `guiones/abidos-1270ac.json`. Las escenas clave se comprobaron con fotogramas de prueba hechos con un manifiesto provisional (audio en silencio).

## Puntos abiertos del guionista
1. **Pilar Yed:** la `columna` es una columna estriada blanca. No se entendía como Dyed, y el texto decía «tumbado en el patio» mientras se veía de pie. **Prop nuevo `yed`** en `app/src/mundo/Props.tsx` (fuste de caliza y cuatro travesaños azul y oro), documentado en la guía. Se usa en las escenas 48 y 49. Texto: «Es el pilar Yed, su columna vertebral, el signo de la estabilidad». Tarjeta nueva en la 48: «Pilar Dyed, Amenhotep III lo levanta con cuerdas en la tumba de Jeruef». Se quita la tarjeta de la 47 («1 de cada 4»), que repetía la escena 2.
2. **Sókar y las cebollas:** la ficha da los collares de cebollas como [V] en Tebas y [D] en Abidos. Ahora: «damos la vuelta a los muros. Dicen que en Tebas se cuelgan cebollas al cuello; Pairi lo imita y no para de reír». En la descripción se añade que la costumbre consta en Tebas y no en Abidos.
3. **Decreto de Nauri:** la cifra es dudosa. Las fuentes dan 100 o 200 golpes, y la fórmula «100 golpes y cinco heridas abiertas» aparece sobre todo en el edicto de Horemheb. Por eso la tarjeta va sin cifra y sin heridas: «Decreto de Nauri. Seti I protegió con castigos durísimos las tierras, barcos, rebaños y trabajadores del templo de Abidos». La descripción del short 3 ya no habla de «cien bastonazos».
4. **La barca:** con «cargar» y sin objeto, los porteadores solo cruzaban los brazos y no se veía ninguna barca. **Prop nuevo `barca`**: barca sagrada dorada con cabina velada y varas a la altura del hombro, dibujada detrás de los porteadores. Se coloca en el punto medio entre ellos en las escenas 30, 35, 36 y 41. La 31 y la 41 llevan ahora fondo propio para que la barca no se herede mal. En el fotograma de prueba se entiende bien.

## Otras correcciones
- **Anacronismo de conocimiento (37):** Najt no podía saber que la «tumba de Osiris» era de Yer. Ahora dice: «Hoy se sabe que tenía mil setecientos años y que era de Yer…».
- **Coherencia y tono (41):** «con la herida sangrando de nuevo» chocaba con la impureza de la escena 32 y era innecesariamente crudo. Ahora: «con la frente vendada».
- **[D] suavizados:** la norma de que sangrar hace impuro pasa a «me enseñaron que un sacerdote que sangra queda impuro» (32). El precio del libro pasa a «puede costar lo que un obrero gana en meses» (20). El título del short 9 se cambia a «Herido defendiendo la barca de un dios».
- **Precisión:** Ámmit pasa de «mitad cocodrilo, león e hipopótamo» a «cocodrilo, león e hipopótamo a la vez» (23). El Osiris de Amelinó está en un «lecho con cabezas de león» (53). Los Osiris de grano «ya secos al sol», no «verdes y secos» (45).
- **Cierre (54):** se añade que el maestro también es inventado («igual que mi familia y mi maestro»).
- **Bocas:** todos los personajes tenían `habla: false`, así que Najt no movía la boca ni al presentarse. Ahora habla con la boca en las escenas 1, 17, 24, 25, 54 y 55, y la voz sigue siendo `narrador-es`. Ningún personaje femenino tiene `habla` activo.
- **Cámara (3):** con `cerca` se cortaba a Tuy a la derecha. Ahora es `general`.
- **Seseo:** «cruce» → «pase», «recibe» → «toma», «piezas» → «telas», «despreció» → «dio la espalda», «Entonces» → «De pronto», «Empieza» → «Arranca», «apareció» → «se encontró».
- **Icono:** en la tarjeta de los misterios, la balanza ⚖️ de «La batalla por la barca» pasa a 🥁.

## Comprobado y correcto
- Los datos siguientes están como [V] en la ficha:
  - Lista de Abidos con 76 reyes y huecos.
  - Ijernofret, 600 años antes, y sus citas marcadas como paráfrasis.
  - Upuaut, Neshmet, Péker y Nédit.
  - Natrón, lino y turnos de un mes de cada cuatro.
  - Capítulo 125 y escarabeo del corazón 30B.
  - Ramsés II, 66 años de reinado.
  - Uenéfer, hijo de Meri.
  - La cama de Osiris en la tumba de Dyer, hallada en 1898.
- El cierre explica que el calendario procede de Dendera y que es una reconstrucción. No aparece nada de la lista «NO USAR».
- Días del 1 al 30 en orden creciente. Capítulos en los días 1, 8, 17 y 23. El texto no nombra días de la semana, como pide la ficha.
- Catálogo: todos los interiores llevan `ventana: false`. No hay pirámide, tumba cristiana, máscara, sarcófago ni tesoro. Los emojis-animal tienen escala 1.6. Nadie duerme junto a niños. No hay emojis prohibidos ni ZWJ. Todos los personajes femeninos llevan `narradora-es`.
- El JSON es válido y `tsc` pasa sin errores.

## Cifras finales
- 1.485 palabras y 56 escenas de 18 a 31 palabras.
- 14 bloques de 99 a 114 palabras. 14 entradas en `publicacion.shorts` y `tituloCorto` presente.

# Instrucciones base de todos los vídeos

Son las mismas que las del primer vídeo, «Un mes en la vida de un cavernícola». **Solo cambian el tema y la época.** La oficina trabaja de principio a fin sin parar a preguntar, salvo que el usuario diga otra cosa.

## Ficha fija
- **Tema**: «Un mes en la vida de un <personaje de una época>». Se cuenta la historia de su vida con lo bueno y lo malo, y al final se hace un balance.
- **Formato**: narración por semanas (de la 1 a la 4), con personajes 2D animados, más gancho, intro, balance con un dato fuerte y cierre.
- **Duración**: entre 10 y 15 minutos, unas 1.800-2.000 palabras con la voz actual.
- **Voz**: castellano de España. Ahora es Chatterbox Multilingual en modo dramático (licencia MIT). Si hay clave de ElevenLabs, se usa una voz masculina de España.
- **Final**: suscribirse, dar a me gusta, comentar una palabra relacionada con el tema y mandárselo a un amigo con una broma.
- **Estilo**: 2D plano, fondos propios de la época y del momento que se cuenta, personajes SVG articulados, una sola cámara en un mundo continuo y subtítulos palabra a palabra con la palabra clave resaltada.
- **Título**: «UN MES EN LA VIDA DE UN» en Inter Black y el personaje en una fuente de su época (piedra, romana, rúnica…).

## Fondos detallados (obligatorio)
Cada escenario tiene al menos **5 capas**, y ninguna puede ser un plano liso:
1. **Cielo**: degradado, sol o luna con halo, nubes con sombra y algo que se mueva (pájaros, humo, estrellas que titilan).
2. **Lejos**: siluetas de la época reconocibles (montañas, edificios, monumentos) con perspectiva atmosférica, es decir, más claras cuanto más lejos.
3. **Medio**: arquitectura o naturaleza con detalle (columnas con capitel, tejas, ventanas, árboles, rocas con brillo y sombra).
4. **Suelo**: textura (arena con huellas y ondas, losas, hierba, nieve con roca) y sombras de contacto bajo los personajes.
5. **Primer plano**: objetos delante de la cámara (plantas, columnas, ánforas, antorchas) que se mueven más rápido que la cámara (paralaje mayor que 1), algo desenfocados.

Además: **atrezo de la época** en cada escena (al menos 6 objetos distintos), una **luz** que cuente el momento del día (rayos, brillos de antorchas, viñeteado de noche) y **elementos vivos** (llamas, telas que ondean, polvo, agua). Ningún escenario se repite tal cual: cambia el atrezo o la luz.

## Entregas
1. `video-FINAL-horizontal.mp4`: 1920×1080, completo, para YouTube.
2. `video-FINAL-vertical.mp4`: 1080×1920, completo, para TikTok.
3. `video-SIN-SUBTITULOS-horizontal.mp4` y `video-SIN-SUBTITULOS-vertical.mp4`.
4. `shorts/parte-N-de-M.mp4`: el vertical cortado al final de cada capítulo, cada parte de menos de 3:00, con «PARTE n/M», el título al empezar y «SIGUE EN LA PARTE…» al final.
5. **Miniaturas** (obligatorias en cada vídeo): `miniatura-youtube.png` (1280×720) y `miniatura-vertical.png` (1080×1920, portada de TikTok o Reels). Se hacen con `node scripts/miniatura.mjs miniaturas/<id>.json <salida>` y llevan:
   - El protagonista grande, con la cara sorprendida bien visible.
   - Una pregunta-gancho de 3 a 5 palabras en blanco enorme, con la palabra clave en amarillo y contorno negro.
   - Un sello con el dato más llamativo.
   - El título de la serie con la fuente de su época.
   - Rayos de luz detrás y 2 o 3 iconos del tema.
6. `COMO-REHACERLO.md`.

## Reglas del primer brief que siguen vigentes
- Gancho en los 2 primeros segundos. Frases cortas, una idea por frase y algo nuevo en pantalla cada 3-5 segundos.
- Datos concretos y verificados. Lo que no esté seguro se marca **[COMPROBAR]** y nunca se inventa.
- Todo va pegado a la voz: cada cosa aparece justo cuando empieza su palabra, con los tiempos de whisper large-v3.
- Lo que cambia se transforma en su sitio. Nunca hay una imagen congelada.
- Textos de 46 px o más en pantalla. Iconos de Phosphor, nunca dibujados a mano.
- Zonas seguras del vertical: nada importante en los 220 px de arriba, en los 420 px de abajo ni a menos de 60 px de los lados.
- Sonido: efectos en los momentos clave, música muy baja debajo de la voz y volumen final a −14 LUFS.
- Comprobaciones: `hyperframes check` sin errores, capturas revisadas, sin fotogramas en negro y la duración igual a la de la voz.

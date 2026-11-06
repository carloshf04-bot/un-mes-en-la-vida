# Voz del canal

Es el perfil de voz del narrador: cómo suena el canal cuando se lee en voz alta. Sale de los dos guiones del gladiador (`videos/gladiador/guion.txt` y `videos/gladiador-mes/guion.txt`) y de `oficina/GUIA_GUION.md`. Lo leen el Guionista y el Verificador, y también los skills `yt-*` (copiado en `~/.claude/youtube/voice.md`).

Si choca con `oficina/INSTRUCCIONES_BASE.md` o con `oficina/GUIA_GUION.md`, mandan esos dos.

## A quién le hablamos
- Una persona: alguien de habla hispana, curioso, que ha visto la película (Gladiator, 300, Vikingos) y se cree que ya sabe cómo era. Lo ve en el móvil, a menudo primero como Short o TikTok, y tiene un amigo al que mandárselo. **[COMPROBAR]**: edad y país reales con las estadísticas del canal.
- Se le habla de **tú**, nunca de usted ni de «vosotros».

## Cómo hablamos de verdad
- **Narrador cómplice**: cuenta la historia como un amigo que sabe mucho y se ríe de ella, no como un profesor.
- **Segunda persona al abrir**: «Hoy vas a luchar delante de cincuenta mil personas. Y no puedes negarte.»
- **Frases muy cortas** y un remate de dos o tres palabras detrás: «Félix prueba la bebida. Sabe a hoguera apagada.» / «Un empate. En la arena. Delante del emperador.»
- **Pregunta y respuesta seca**: «¿Y cómo lo sabemos? Por Pompeya.» / «¿Y Félix? Félix será mirmillón.»
- **Comparación moderna con giro**: «Como una rifa, pero a lo bestia.» / «Como la camiseta de tu jugador favorito, pero en vidrio.»
- **El protagonista tiene nombre y un chiste propio** que vuelve al final: Félix significa afortunado → «Al final, su nombre no mentía.»
- **Las fuentes se dicen en la frase**: «Lo contó Plinio.» / «Lo contó un poeta que estaba allí.» / «según un historiador posterior».
- Fragmentos de ejemplo (de `videos/gladiador-mes/guion.txt`):
  > Sí, un pescado. Nadie dijo que fuera elegante.
  > Félix no tiene mujer ni esclavos. Así que se come también lo de su compañero.
  > Hoy lo compararíamos con un boxeador profesional. Solo que él nunca eligió subir al ring.

## Palabras que nunca usamos
- «Hola», «bienvenidos a mi canal», «antes de empezar», «en el vídeo de hoy».
- Adjetivos vacíos en vez de un dato: «increíble», «impresionante», «brutal», «épico», «alucinante».
- Muletillas de youtuber: «sin más dilación», «vamos a ello», «no te lo vas a creer».
- Palabras clave con «z», «ce» o «ci» cuando haya sinónimo, porque la voz sesea (ver `GUIA_GUION.md`).
- Nada que sea posterior al año de la historia, salvo como comparación marcada.

## Palabras que sí usamos
- «Y aquí va el primer dato raro…» / «Y aquí viene el gran mito…» → «En realidad…»
- «Y atención:» / «Ah, y…» / «Sí, …» (para confirmar algo absurdo)
- «Primera sorpresa», «segunda sorpresa».
- «¿Es el final?» en el clímax.
- «O sea:» antes del resumen. «Así que ya sabes:» + tres datos.
- «Semana uno. Luna nueva.» para abrir cada capítulo.
- Despedida fija: «Nos vemos en el próximo viaje en el tiempo.»

## Lo que no vamos a afirmar
- Ninguna cifra sin fuente. Lo que no esté seguro se marca **[COMPROBAR]** y nunca se inventa.
- Si los expertos no se ponen de acuerdo, se dice: «nadie sabe seguro…».
- Los mitos de película no se dan como hechos (el pulgar para abajo, el sudor como perfume, los gladiadores marcados).
- Nada de «el más grande de la historia» o «el primero» si no hay una fuente que lo diga.

## Nuestro formato
- **Serie**: «Un mes en la vida de un <personaje>». De 10 a 15 minutos, unas 1.800-2.000 palabras, a unas 166 palabras por minuto con la voz actual.
- **Apertura**: gancho en 2 segundos, en segunda persona, y luego lugar y año en una frase. Sin intro del canal.
- **Estructura**: gancho, intro, semanas 1 a 4 (ciclo de la luna o el que encaje con la época), balance (lo malo, lo bueno y el dato más fuerte) y cierre. Cada capítulo cabe en un Short de menos de 3:00.
- **Cierre**: suscribirse, dar a me gusta, comentar una palabra del tema y una pregunta de dos opciones, y mandárselo a un amigo con una broma. (Aquí la oficina manda sobre la regla de «una sola petición» de `/yt-script`.)
- **Narrador**: voz masculina de castellano de España, en modo dramático. No sale a cámara: todo es animación 2D con subtítulos palabra a palabra.
- **Tono**: humor blanco, al menos un dato asqueroso o raro por bloque y sin palabrotas («a lo bestia» es el límite).

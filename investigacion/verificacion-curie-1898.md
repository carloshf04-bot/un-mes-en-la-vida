# Verificación: curie-1898

Revisado frente a `investigacion/curie-1898.md` y `oficina/GUIA_GUION.md`. Correcciones aplicadas en `guiones/curie-1898.json` (24 cambios).

## Correcciones aplicadas

**Hechos y rigor**
- Esc. 15: Picquart era teniente coronel (y ya estaba fuera del ejército), no «el coronel» → «el oficial Picár». Lo que pide queda «al alto tribunal que aclare quién debe juzgarlo» (Tribunal de Casación; también quita «decidan»).
- Esc. 24: el día de los 900 es [D]. Se quita «Es martes, trece de diciembre» → «A estas alturas, nuestros mejores cloruros ya son novecientas veces…» (900 es el máximo que da la nota del 26).
- Esc. 14: el mes de la marcha de Bronia es [D] → «se ha ido este año» (en vez de «este otoño»).
- Esc. 16: el uso del premio Gegner para material es [D] → «nos ayuda a seguir».
- Esc. 29: «Es un hombre callado y preciso» describía a Demarçay sin fuente → «Ya no depende de nosotros».
- Esc. 39 y 43: Becquerel no «lee» la nota, la **presenta** (es lo documentado) → «Él la presentará en nuestro nombre» y «presenta nuestra nota ante la Academia de Ciencias»; se quita el «se pone en pie» inventado.

**Pensamientos imaginados**
- Esc. 30 y 41: «Imagino lo que pienso» / «Imagino que pienso» (raro en primera persona) → «Quizá esa noche pienso:» y «Quizá pienso en él…».

**Planos**
- Esc. 12: el texto dice que Pierre lleva la bicicleta y no se veía ninguna → prop 🚲 (`x` −0.8, `escala` 1.2) junto a Pierre; texto «Mi marido lleva la bicicleta a su lado».
- Esc. 7: «miro un punto de luz… sin respirar» con `pensar` + `cansado` → `trabajar` + `neutral` (está midiendo, concentrada).
- Esc. 28: Marie miraba hacia fuera (`mirar` 1) con Demarçay a su izquierda → `mirar` −1.
- Esc. 29: «Le entrego el frasco» con Marie `quieto` → `cargar` con ⚗️.

**Seseo, pronunciación y estilo**
- Sinónimos sin z/ce/ci: «ciertas» → «algunas» (5), «en la cabeza» → «de memoria» (12), «esta ciudad» → «todo» (14), «caza» → «atrapa» (17, sonaba «casa»), «sin decir nada» → «sin hablar» (21), «aparecer» → «dejarse ver» (25), «no aparece» → «no encuentro» (31), «quiere decir» → «significa» (35), «sin darle importancia» → «de pasada» (47).
- Frases que acababan en nombre: «La nota va a Anrí Becrél.» → «Anrí Becrél se lleva la nota.» (39); «Detrás va la nota de Demarsé.» → «La nota de Demarsé va justo detrás.» (45).
- Esc. 26 repetía «En julio» de la escena anterior → «Aquella vez».
- Esc. 20: «Nadie sabe que hagan falta» → «que hacen falta».
- Bloque de la Nochebuena (esc. 40–43) bajó a 91 palabras: se añade «junto al Sena» (43, el Instituto está en el muelle Conti) y «con los ojos muy abiertos» (42). Queda en 99.

## Comprobado y correcto
- Calendario de 1898: día 1 = miércoles 30 nov.; 5 = domingo 4 dic.; 6 = lunes 5; 8 = miércoles 7; 15 = miércoles 14; 21 = martes 20; 25 = sábado 24 (Nochebuena); 26 = domingo 25; 27 = lunes 26; 30 = jueves 29. Capítulos en los días 1, 8, 15 y 22. Días que solo están en [D] o [R] (oferta de Viena, visita a Demarçay, su respuesta) van con «por estos días / en estos días» o se declaran imaginados en la descripción.
- Datos en la ficha como [V]: rayos de Becquerel (1896), electrómetro y cuarzo de Pierre y Jacques, pechblenda más activa (abril), polonio y Polonia repartida, pista del bario, letras alternas en el cuaderno, cita de Irène (17 oct.), 0 francos de sueldo, 100 kg de Viena en diciembre, sulfuro de hidrógeno, sin guantes, 900 veces, raya nueva que crece con la actividad, 227 veces y peso atómico (20 dic.), nota de 3 páginas con Bémont presentada por Becquerel el lunes 26, cita literal del nombre del radio, nota de Demarçay detrás, «radiactividad enorme», Wigilia, tormenta del 29, epílogo (1899 tonelada y cobertizo, 1902 0,1 g de 8 t, Nobel 1903 y 1911, cátedra 1906, muerte 1934, cuadernos en plomo, 1.600 años, Panteón 1995). «Radium» el 20 de diciembre va con «Dicen que…» ([D]). La frase de Étard sobre la ópera va con «Dicen que…».
- Lista «no usar»: no hay toneladas ni cobertizo en 1898, ni brillo verde, ni ☢️ ⚛️ 💡 🧬, ni ZWJ, ni banderas, ni Marie en la sala de la Academia. Muerte de Pierre sin detalles. Pierre y Bémont como coautores.
- Emojis de atrezo y tarjetas: ⚗️ 📓 ⏱️ ⚖️ 🪨 📜 ✉️ ✒️ 📰 🪔 🕯️ 🔍 🎄 🍞 📕 📍 🚲. Ninguno prohibido ni de juguete (no hay 🧸).
- Tarjetas en la misma escena que su dato: mapa (3), cita del polonio (9), cita de Irène (13), 0 francos (16), 100 kg (19), 900 (24), mapa de Demarçay (28), 1 raya (33), 3 páginas (38), cita del radio (44), 0,1 g (50), 1.600 años (55). Ninguna en la última escena.
- Cámara `cerca`: ningún personaje fuera de x ±0.75. Primera escena con Marie en x 0.4.
- Voces: narradora del guion `narradora-es`; Marie, Marie mayor e Irène llevan `"voz": "narradora-es"`. Todos los hombres llevan `habla: false`; en las escenas 43–44 (Becquerel y académico, ambos `habla: false`) suena la narradora. Irène no aparece nunca con `dormir`.
- Catálogo: lugares, paredes, props, peinados (`mono`, `coronilla`), ropa, acciones y emociones existen en la guía y en `app/src`. Interiores sin ventana: laboratorio de Demarçay, archivo y Panteón. «tumba», «ciudad», volcán y pirámide no se usan.
- Ética: Marie, Pierre, Bémont, Becquerel, Demarçay y Eugène Curie solo con hechos documentados; lo cotidiano y los pensamientos, marcados («imagino», «quizá», «dicen que») y declarados en la escena 57 y en la descripción.

## Cifras finales
- 1.483 palabras, 59 escenas (18–36 palabras cada una), `velocidad` 1.15, `drama` 0.45–0.9. JSON válido.
- 14 bloques de short de 99–114 palabras, todos empiezan con `"corte": true` (escena 0 incluida) y acaban en final de frase; 14 entradas en `publicacion.shorts` y `publicacion.tituloCorto` presente.

## Riesgos que quedan
- Que en diciembre de 1898 trabajaran en el «almacén» de la planta baja es [D] (recomendación de la ficha); se mantiene como escenario.
- La cifra 227 del 20 de diciembre sale de resúmenes de Adloff; conviene cotejarla en Gallica antes de publicar, igual que la nota del 26.
- Revisar en las muestras el tamaño de la 🚲 (escena 12) junto a Pierre.

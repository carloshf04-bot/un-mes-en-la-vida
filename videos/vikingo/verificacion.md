# Verificación: vikingo

Revisado: `guion.txt` (235 líneas) contra `investigacion.md` y `diseno.md`. Año de la historia: hacia el 890, en Vestfold, Kaupang y Hedeby.

## 1. Duración (166 palabras por minuto; todavía no hay voz.wav)

| Capítulo | Líneas | Palabras | Duración |
|---|---|---|---|
| Gancho | 1-5 | 46 | 0:16 |
| Intro | 6-27 | 200 | 1:12 |
| Semana 1 | 28-67 | 368 | 2:13 |
| Semana 2 | 68-108 | 307 | 1:50 |
| Semana 3 | 109-157 | 326 | 1:57 |
| Semana 4 | 158-206 | 408 | 2:27 |
| Balance | 207-229 | 266 | 1:36 |
| Cierre | 230-235 | 61 | 0:22 |
| **Total** | | **1.982** | **11:56** |

El total entra en el margen de 10 a 15 minutos y en el de 1.800 a 2.000 palabras. Ningún capítulo pasa de 2:55, aunque ese límite ya no se exige porque los Shorts son partes de 1 minuto. Cuando exista `voz.wav` hay que medirlo con ffprobe.

## 2. Anacronismos

Lo que pidió Dirección está bien resuelto:
- **Ibn Fadlán** (921-922): «Treinta años después, en el río Volga…» (l. 209). Correcto: son unos 31 años.
- **Viborg** (1018-1030): «un siglo después de Ulf, en una letrina de Viborg, en Dinamarca» (l. 214). Correcto.
- **Gjermundbu** (siglo X): «es de años después de Ulf» (l. 221). Correcto.
- **Veksø**: «de la Edad del Bronce: casi mil ochocientos años antes que Ulf» (l. 225). Hacia el 900 a. C., así que son unos 1.790 años. Correcto.
- **Dientes limados**: «Y otro dato raro, pero de otro lugar. En Suecia y Dinamarca…», y además «Ulf no los tiene» (l. 192-195). Cumple el punto 3 de «NO USAR»: no dice que los rellenaran de color ni que hubiera un surco por batalla, y no los sitúa en Hedeby.
- También están bien marcados: la Orkneyinga saga («escrita siglos después»), Juan de Wallingford («Siglos después, un cronista inglés»), Ole Worm («Siglos después, un erudito danés»), el entierro de Gokstad («Pocos años después»), la réplica de 1893 («Siglos después»), el Sea Stallion («En dos mil siete, una réplica moderna»), la UNESCO («Hoy es») y Wagner (1876). San Ansgario es anterior (h. 850, «Hace unos cuarenta años») y está bien.
- La muralla semicircular de Hedeby, los martillos de Thor, las piedras de Jelling, los estribos y los nombres de meses islandeses no aparecen.

**No aparece nada de la lista «NO USAR».** No se dan números de perros ni de pavos reales, ni precios de esclavos, ni menús concretos. Tampoco se dice que el hombre de Gokstad «murió en batalla», ni de qué animal eran las pieles, ni lo de los piojos o Cerdeña. Los cascos con cuernos y los cráneos solo salen como mitos desmentidos, y la piedra solar, como algo que nunca se ha encontrado.

## 3. Datos, guía y voz: tabla de problemas

| # | Línea | Frase | Problema | Gravedad | Cambio propuesto |
|---|---|---|---|---|---|
| 1 | 223 | «Los cuernos los puso un figurinista en el estreno de una ópera de Wagner, en mil ochocientos setenta y seis.» | Es exagerado. La investigación (M1) dice que Doepler los **popularizó**, no que los inventara: algunos pintores románticos del siglo XIX ya pintaban vikingos con cuernos antes de 1876. | **Media** | «Los cuernos los hizo famosos un figurinista en el estreno de una ópera de Wagner, en mil ochocientos setenta y seis.» |
| 2 | 188 | «Y muchos de esos dírhams del este hablan de este mismo mercado.» | La frase no queda clara y no tiene respaldo tal cual. La investigación (n.º 17) dice que los grandes tesoros de dírhams, sobre todo los de Gotland, **se interpretan** como prueba del comercio de esclavos. No los relaciona con Hedeby en concreto ni lo da por seguro. | **Media** | «Y muchos expertos creen que buena parte de esos dírhams se pagó por esclavos.» |
| 3 | 82 | «Años después, las leyes de Noruega cuentan que los asuntos se aprobaban haciendo sonar las armas.» | Se queda corto: las leyes del Gulating se escribieron siglos después del 890, no años (Anacronismos: «Las leyes escritas del Gulating (posteriores)»). Además, «haciendo» lleva «ci». | Baja | «Siglos después, las leyes de Noruega cuentan que los asuntos se aprobaban chocando las armas.» |
| 4 | 96 | «Pocos años después, en una colina de por aquí, enterraron a un hombre importante dentro de ese barco.» | No es exacto: no lo enterraron en una colina que ya existía, sino que levantaron un túmulo de tierra encima del barco (Gokstad Mound). | Baja | «Pocos años después, cerca de aquí, enterraron a un hombre importante dentro de ese barco, bajo un montículo de tierra.» |
| 5 | 101 | «Pero tenía una herida de cuchillo en el muslo.» | Simplifica de más. Según Holck (2009), tenía cinco o seis cortes en las dos piernas, y el del muslo es «de cuchillo o de punta de flecha». La frase no es falsa, pero es más precisa así. | Baja | «Pero tenía varios cortes de armas en las piernas.» (sin decir que murió en batalla, por el punto 7 de «NO USAR») |
| 6 | 58 | «Siglos después, un cronista inglés se quejaba de que los daneses se peinaban a diario, se bañaban los sábados y así le quitaban las novias a los ingleses.» | Tiene 28 palabras: es demasiado larga para decirla en voz alta (Guía: frases cortas). | Baja | Partirla en dos: «Siglos después, un cronista inglés se quejaba de los daneses.» / «Se peinaban a diario, se bañaban los sábados y así les quitaban las novias a los ingleses.» (de paso se corrige «le» por «les») |
| 7 | 193 | «En Suecia y Dinamarca, entre más de quinientos esqueletos de la época vikinga, veinticuatro hombres tenían surcos limados en los dientes de arriba.» | Tiene 23 palabras: es larga. El dato está bien (24 de 557, Arcini 2005). | Baja | «En Suecia y Dinamarca se han estudiado más de quinientos esqueletos de la época vikinga.» / «Veinticuatro hombres tenían surcos limados en los dientes de arriba.» |
| 8 | 47 | «Lo único dulce es la miel.» | Seseo: la palabra clave «dulce» lleva «ce». | Baja | «La única golosina es la miel.» |
| 9 | 18 | «Y tiene gracia, porque Ulf se marea en cuanto pisa un barco.» | Seseo: «gracia». | Baja | «Y tiene su chiste, porque Ulf se marea en cuanto pisa un barco.» |
| 10 | 49 | «…y las llaves de la casa colgadas del cinto.» | Seseo: «cinto». Las llaves tampoco están en la investigación, aunque sí en `diseno.md`; es un hallazgo habitual en tumbas de mujer, así que se acepta. | Baja | «…y las llaves de la casa colgando del delantal.» |
| 11 | 80 | «Las mujeres a veces miran, pero no deciden.» | Seseo: «deciden» es la palabra clave. | Baja | «Las mujeres a veces miran, pero no votan.» |
| 12 | 226 | «…plata que se pesa en vez de contarse y cero cuernos.» | Seseo: «cero» y «vez» van en el resumen final. | Baja | «…plata que se pesa y no se cuenta, y ni un solo cuerno.» |

Los demás «ce» y «ci» no tienen buen sinónimo y se aceptan: los números («ochocientos», «cinco», «doce»), los nombres propios («Suecia», «Edad del Bronce», «Museo Nacional») y las palabras de enlace («hacia», «entonces», «atención»).

## 4. Datos comprobados sin problema

Están bien y tienen respaldo en `investigacion.md`:
- víking y víkingr (M3)
- Vestfold y Kaupang (n.º 2)
- la espada como objeto caro (n.º 12)
- el viaje de primavera (n.º 9)
- el dagmál y el náttmál (n.º 10), sin menús inventados
- la ropa y los broches (n.º 11)
- laugardagr, los peines y las cucharillas para las orejas (n.º 24-25)
- el escudo de casi un metro (75-90 cm; los de Gokstad miden unos 94)
- el thing, el hombre de la ley y el vápnatak (n.º 13-14)
- el barco de Gokstad: madera del 890 y 32 remos (n.º 3)
- doce caballos, perros, tablero y pavos reales sin número (n.º 4)
- los cinco días de Óttar (n.º 1)
- que no había brújula y que la piedra solar no se ha encontrado (n.º 6, M5)
- la comida a bordo y el Sea Stallion de 2007 con «casi mil litros» (942,5 l; n.º 8)
- las pieles untadas de grasa (n.º 7)
- la réplica de 1893 que tardó unas cuatro semanas (n.º 5)
- Hedeby, Patrimonio de la Humanidad y 1.000-1.500 habitantes (n.º 15)
- la plata picada y los dírhams (n.º 16-17)
- los esclavos según el Museo Nacional de Dinamarca y los grilletes de Birka (n.º 18)
- el valor de un esclavo sin cifras (n.º 19)
- Ansgario: unos 40 años antes y el rescate de cautivos (n.º 20)
- la palangana y las palmeras de Ibn Fadlán (n.º 21)
- Viborg (n.º 23)
- Gjermundbu, Veksø y los cráneos (M1, M4)

## 5. Guía y voz

- **Gancho**: «Hoy vas a salir al mar…» va en segunda persona, sin «hola», y la primera frase choca. Cumple.
- **Situación y título**: «Noruega, hacia el año ochocientos noventa.» y «Un mes en la vida de un vikingo.» Cumple.
- **Protagonista con chiste propio que vuelve al final**: Ulf significa «lobo» pero se marea. Vuelve en «Lobo, sí. De mar, no.» y en «El lobo ha vuelto a su madriguera». Cumple.
- **Cuatro semanas con fases de la luna**: cada una tiene datos y tensión. Cumple.
- **Clímax**: la niebla, «¿Es el final?» y el giro de las gaviotas en el Schlei. Cumple.
- **Mitos**: «En realidad…» (l. 53), además de los mitos de los cráneos y los cuernos. Cumple.
- **Resumen**: «Así que ya sabes:», tres datos y una comparación moderna marcada. Cumple.
- **Llamada a la acción**: suscribirse, dar a me gusta, la palabra «víking», una pregunta de dos opciones y mandárselo a un amigo con una broma. Termina con la despedida fija. Cumple.
- **Una frase por línea**: cumple.
- **Palabras que nunca usamos**: no aparece ninguna. No hay «increíble», «brutal», «épico», «no te lo vas a creer» ni nada parecido.
- **Lo que no vamos a afirmar**: no hay superlativos sin fuente. «Uno de los mayores mercados» tiene el respaldo de la UNESCO, y «Nadie sabe seguro quién era» sigue la fórmula de VOZ.md. Solo choca el punto 1 de la tabla («los puso» presenta como hecho algo que no está demostrado).
- **Comparaciones modernas**: todas van marcadas («Como un puente de mayo», «Hoy lo llamaríamos», «Imagina…», «Como un trabajo de verano…»).

## Resultado

Hay que corregir dos datos de gravedad media (puntos 1 y 2: el origen de los cuernos y la frase de los dírhams). Los cambios de gravedad baja (puntos 3 a 12) se recomiendan, pero no bloquean. Con los dos primeros corregidos, el guion pasa.

**CAMBIOS NECESARIOS**

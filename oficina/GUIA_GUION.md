# Guía del guionista: "Un mes en la vida de"

Cada episodio es **un archivo JSON** en `guiones/<slug>.json`. De ese archivo salen dos vídeos:

| Pieza | Formato | Duración | Escenas | Palabras |
|---|---|---|---|---|
| `largo` | Horizontal 1920×1080 (YouTube) | **10–13 min** | 50–65 | 1.350–1.550 |
| shorts | Vertical 1080×1920, **troceados del largo** (no tienen guion propio) | 45–60 s cada uno | — | — |

**Shorts (desde noviembre de 2026):** ya no se escribe `short`. El largo se organiza en **bloques consecutivos de 95–115 palabras** (≈45–60 s) que funcionen solos: cada bloque empieza con un gancho y termina con una intriga o un pequeño cierre. La primera escena de cada bloque lleva `"corte": true` (también la escena 0). `scripts/shorts.mjs` corta el largo terminado por esos puntos (si alguno queda fuera de 45–60 s, reparte los cortes en otros finales de escena). En `publicacion.shorts` va un `{ "titulo", "descripcion" }` por bloque, en orden.

La voz (Chatterbox, narrador de España, con `"velocidad": 1.15`) lee unas **120 palabras por minuto**: el largo ideal tiene **1.350–1.550 palabras** (unos 12 min) y el Short **100–125**. Para comprobarlo, ejecuta `node scripts/producir.mjs <slug> --sin-render` y mira la línea "duración total".

## Reglas de escritura

1. **Primera persona.** Habla el protagonista: "Me llamo…", "Subo los escalones…".
2. **Gancho en la primera frase.** Una promesa inquietante o un dato brutal: "Esta noche, 172 hombres van a morir frente a mi faro".
3. **Estructura del largo:**
   - Gancho y presentación (2 escenas).
   - 4 capítulos, uno por semana (`"capitulo"` en la primera escena de cada uno).
   - Giro o clímax en la semana 2 o 3.
   - Epílogo con lo que pasó después.
   - Cierre con llamada a comentar y suscribirse.
4. **Cada escena tiene 1–3 frases (15–40 palabras).** Si hay más, divídela.
5. **Números en letra dentro de `texto`** ("ciento veinte", no "120"), porque la voz lee mejor así. En las tarjetas (`valor`) sí van con cifras.
6. **Rigor:** los hechos históricos tienen que estar en la ficha de investigación (`investigacion/<slug>.md`). El protagonista puede ser inventado, pero hay que decirlo en el cierre y en la descripción. Si un dato no está verificado, se suaviza ("dicen que…") o se quita.
7. **Futuro:** se inventa con coherencia interna. Conviene al menos un dato "real" de anclaje (por ejemplo, la tecnología actual de la que parte).
8. **Personas reales:** solo hechos documentados y nada denigrante. Si se dramatiza un diálogo, se dice "imagino" o se deja como pensamiento.
9. **Que nunca afloje.** Cada escena empuja a la siguiente (pregunta abierta, cuenta atrás, revelación a medias). Los shorts salen del propio largo, así que cada bloque de 45–60 s necesita su gancho inicial.
10. **Grafías:** cada palabra escrita «como suena» va en `"grafias": { "Guín": "Gein", "Uiscónsin": "Wisconsin" }` (palabra a palabra) para que los subtítulos del largo y de los shorts la muestren bien escrita.
11. **La voz sesea.** Si hay sinónimo, evita palabras con z, ce, ci. Los nombres extranjeros o difíciles se escriben en `texto` como suenan («Guín», «Uiscónsin», «Meshica»); en tarjetas y `publicacion`, con su grafía real.

## Esquema del JSON

```jsonc
{
  "slug": "farero-1890",              // = nombre del archivo
  "titulo": "un farero",              // va detrás de "UN MES EN LA VIDA DE"
  "lugar": "Cabo Vilán, Galicia",
  "epoca": "Noviembre de 1890",
  "categoria": "epoca | persona | profesion | futuro",
  // VOZ: Chatterbox. Narrador masculino de España por defecto ("narrador-es").
  // Si quien narra es MUJER o NIÑA: "voz": "narradora-es" (obligatorio).
  "voz": "narradora-es",
  "drama": 0.65,                      // expresividad global de la voz (0.4 sereno · 0.65 documental · 0.85 muy dramático)
  "velocidad": 1.15,                  // con Chatterbox: acelera el audio sin cambiar el tono (recomendado 1.15)
  "musica": "calma | nostalgia | tension | epico | futuro | misterio",
  "paleta": { "acento": "#f2b544", "texto": "#f5efe0", "fondo": "#0c1424", "papel": "#f3e9d2" },
  "reparto": { "<id>": Look, ... },
  "short": { "escenas": [Escena, ...] },
  "largo": { "escenas": [Escena, ...] },
  "publicacion": { "tituloLargo": "", "tituloShort": "", "descripcion": "", "etiquetas": [] }
}
```

### Escena

```jsonc
{
  "dia": 5,                    // contador "DÍA 5 / 30" (omitir en la primera escena del largo y en el cierre)
  "capitulo": "El mar tiene hambre", // sólo en la 1ª escena de cada semana (sale cartela "SEMANA N")
  "texto": "Lo que dice la voz.",
  "drama": 0.8,                // opcional: sube en clímax (0.8–0.9), baja en momentos íntimos (0.45)
  "fondo": Fondo,              // si se omite, HEREDA el de la escena anterior
  "personajes": [EnEscena],    // si se omite, HEREDA; [] = escena vacía
  "camara": "lenta | cerca | paneo | general | subir",
  "insercion": Insercion       // tarjeta a pantalla completa sobre el fondo desenfocado
}
```

- **Variedad:** cambia de `fondo` cada 2–4 escenas y mete una `insercion` cada 4–6 escenas. Usa `"cerca"` en momentos emotivos y `"paneo"` en paisajes.
- **Primera escena del largo:** el título sale a la izquierda durante 5 s, así que pon al protagonista en `x` ≥ 0.3.
- **No pongas `insercion` en la última escena** (ahí aparece el botón de suscripción).

### Fondo

```jsonc
{ "lugar": "...", "hora": "amanecer|dia|atardecer|noche", "clima": "despejado|lluvia|nieve|niebla|tormenta|polvo|ceniza|nublado",   // lluvia, tormenta y nieve encapotan el cielo (sin sol ni azul); ceniza lo vuelve negro de humo y hollín; nublado: cielo encapotado sin lluvia, sin estrellas, sin luna ni sol
  "pared": "piedra|madera|ladrillo|metal|papel|tela|roca|jeroglificos|megalito",   // sólo interior
  "ventana": true,                                          // sólo interior
  "props": ["chimenea", { "tipo": "faro", "x": -1.35, "escala": 1.2, "detras": true }],
  "luna": false }                                           // sin la luna que el motor pinta de noche (noches sin luna)
```

- **Vista por el anteojo** (lugar `ocular`): fondo negro y un círculo de visión con el borde difuminado y un leve temblor. Sin `props` ni `personajes` (`"personajes": []`). En los shorts sale el cuadro entero, sin recortar. Campo `vista`:
  - `{ "lugar": "ocular", "hora": "noche", "vista": "jupiter", "lunas": [-2.6, -1.3, 1.9], "tamanos": [1.8, 1] }`: Júpiter como un disco blanco y sus lunas en línea; `lunas` son posiciones en diámetros de Júpiter (negativo = este = izquierda, positivo = oeste = derecha); `tamanos` (opcional) el tamaño relativo de cada luna, en el mismo orden.
  - `"vista": "luna", "fase": "creciente|menguante|gibosa"`: la Luna con el terminador irregular, cráteres junto a él y puntos de luz (cimas) en la parte oscura. Creciente y gibosa iluminadas por la derecha; menguante, por la izquierda.
  - `"vista": "estrellas"`: campo denso de estrellas débiles. `"vista": "via-lactea"`: franja lechosa que, mientras dura la escena, se resuelve en puntos.

- **lugar:** `rio` (agua tranquila con la otra orilla al fondo: ríos, lagos, canales), `mar`, `playa`, `montanas`, `hielo`, `ciudad`, `futurista`, `desierto`, `valle` (acantilados de caliza, tipo Valle de los Reyes), `marte` (cielo caramelo de día, atardecer azul, la Tierra como punto azul de noche), `campo`, `bosque`, `selva`, `espacio`, `luna`, `calle` (calle antigua empedrada), `trinchera` (zanja de la Primera Guerra Mundial vista desde dentro: tierra entibada, parapeto de sacos a la altura de los ojos, alambre de espino contra el cielo y agua turbia a media pierna; no le pongas `barricada`, `valla` ni `charco`, y evita `niebla`, que tapa a los soldados; con el prop `parapeto-aleman` asoma al fondo la trinchera enemiga con arbolitos de Navidad y velas) `isla` (cima de una isla atlántica: hierba rasa hasta el borde del acantilado, mar gris al fondo con islotes lejanos; sin borda ni árboles) `ocular` (la vista por el anteojo: ver más abajo) o `interior`.
- **pared** (interior): `piedra`, `madera`, `ladrillo`, `metal`, `papel`, `tela`, `roca`, `jeroglificos` (tumba egipcia pintada) o `megalito` (cámara de tumba neolítica con losas grabadas y falsa bóveda).
- **props:** `arbol`, `pino`, `palmera`, `casa`, `cabana` (de madera, clima frío), `casa-adobe` (Egipto, Oriente Próximo, Mesoamérica, desierto), `volcan` / `volcan-erupcion` (al fondo, usa escala 1.5–2.5 y x ±1.3; la columna crece sola), `horno` (de pan, de ladrillo), `molino` (de lava romano con burro), `anfora`, `termopolio` (mostrador romano), `faro`, `barco` (vapor), `velero`, `cohete`, `farola`, `carro`, `puesto` (de mercado), `roca`, `valla`, `pozo`, `tumba`, `hoguera`, `tienda` (de campaña), `bandera`, `bandera-eeuu` (EE. UU. de 1941: barras y cantón azul), `mesa`, `estanteria`, `chimenea`, `cama`, `antorcha`, `cuadro`, `consola` (sci-fi), `maquina` (industrial), `barril`, `cajas`, `planta`, `telescopio`, `yunque`, `piramide`, `columna`, `reloj`, `escalera` (escalones excavados que bajan), `puerta` (puerta tapiada con sellos), `tesoro` (montón de oro y objetos), `sarcofago`, `mascara` (máscara funeraria de oro), `estatua` (guardián negro y oro), `jarron` (de alabastro), `carro-dorado`, `bergantin-hielo` (barco de tres palos atrapado en hielo), `bergantin-hundido` (escorado, se hunde lentamente) `bote` (bote salvavidas con vela), `habitat` (cúpula presurizada), `invernadero`, `rover`, `panel-solar` y `antena`.
  - **Apocalipsis / ciudad moderna:** `coche-abandonado`, `barricada` (sacos y vallas), `bidon-fuego`, `bloque` (bloque de pisos), `semaforo` (en ámbar intermitente), `pilar` (basílica del Pilar, decorado LEJANO: x ±1.2, escala 1.5–2), `puente` (puente de piedra de arcos, se dibuja sobre el agua en plano medio), `camilla`, `radio`, `helicoptero` (cruza el cielo).
  - **América rural de los años cincuenta:** `granja` (casa de madera destartalada), `granero` (rojo), `coche-antiguo` (sedán granate), `coche-patrulla` (del sheriff, con luz), `estufa` (de leña), `mostrador` (de tienda con caja registradora), `poste` (postes de teléfono con cables).
  - **Mesoamérica:** `templo-mayor` (pirámide doble con santuarios rojo y azul, decorado LEJANO), `canoa` (sobre el agua, plano medio), `ahuejote`, `chinampa`, `calzada` (sobre el lago, plano medio), `brasero`, `petate`, `metate`, `ciudad-lago` (Tenochtitlan entera sobre el agua, plano medio: úsala con `rio`).
  - **Egipto (Reino Nuevo):** `barca` (barca sagrada portátil con cabina velada y varas; va detrás de los porteadores a la altura del hombro: ponla con `x` en el punto medio entre los personajes con `accion: "cargar"` y sin `objeto`), `yed` (pilar Dyed de Osiris con cuatro travesaños).
  - **Armero (1985):** `lodo` (avalancha de lodo que entra desde la izquierda y cubre la parte baja de casas y árboles; ponlo el ÚLTIMO en `props` con `x: 0`, en una escena sin personajes). `barrizal` (el pueblo después de la avalancha: llanura de barro gris hasta el horizonte con tejados, árboles partidos y tablas; ponlo el PRIMERO en `props` con `x: 0`; los personajes quedan de pie encima). El `helicoptero` cruza el cielo a la altura visible del plano horizontal.
  - **Incendios y explosiones:** `humo` (columna de humo negro con llamas en la base: ponlo sobre un `barco` o una casa para que «arda», escala 0.4–1) y `explosion` (destello blanco al empezar la escena, columna y hongo de humo; va en el horizonte como los volcanes, escala 0.8–1.1). No uses `hoguera` para un barco en llamas.
  - **Laboratorio (siglo XIX–XX):** `electrometro` (mesa con electrómetro de latón, lámpara y escala con un punto de luz que oscila), `cristalizadores` (mesa con cubetas de cristalización, polvo blanco que brilla débilmente, matraz y cuaderno) y `espectro` (espectroscopio en atril: banda oscura con rayas de colores y una raya violeta que late). Cada uno lleva su mesa: no añadas `mesa` debajo.
  - **Objetos sobre la mesa:** un emoji de escala ≤ 0.6 colocado dentro del ancho de una `mesa` se apoya solo en el tablero.
  - **Roma:** `lecho` (lecho de triclinio con colchón rojo y almohadones; ponlo un poco detrás del comensal, unos 0.22 hacia donde no mira) y `estatua-saturno` (estatua con hoz y los pies atados con lana). Acción `reclinado`: comensal tumbado en el lecho apoyado en el codo (no uses `sentado` para un banquete romano).
  - **Barcos de vela:** `bergantin` (bergantín de dos palos con velas cuadras medio rotas, a la deriva: va en el agua, en plano medio, con `mar`; úsalo en lugar de `velero` para un barco del XIX). En `mar` la franja de abajo es la cubierta de nuestro barco, con borda.
  - **Sombreros de marino:** `gorro-lana` (marinero) y `gorra-plato` (oficial del XIX); `gorra` es una gorra moderna de visera.
  - **Miniatura:** `publicacion.miniatura.prop` pone un decorado del motor (p. ej. `espectro`, `bergantin`) en lugar del emoji `icono`.
  - **Tumbas de campaña:** `cruz` (cruz de madera clavada en el barro); `tumba` es una lápida de piedra de cementerio.
  - **Roma (Saturnales) y Halifax (1917):** `templo-romano` (fachada con podio, escalinata y seis columnas; es enorme: usa `escala` 0.5–0.7 y x ±1.1), `ruinas` (casa de madera derrumbada, humeante), `tren` (locomotora de vapor con dos vagones; ponlo sin personajes delante o con escala 0.7), `wigwam` (vivienda mi'kmaq de corteza). Sombrero nuevo: `pileo` (gorro cónico de fieltro crudo de los libertos y de las Saturnales). `pickelhaube` (casco alemán de 1914 con pincho, forrado de tela gris).
  - **Volcán en erupción:** con `escala` 0.8–1 se ve la columna entera; con escala alta la columna se sale del encuadre.
  - **Neolítico irlandés (Newgrange, c. 3200 a. C.):** `tumulo` (gran túmulo bajo y ancho de piedras y tepes con frente de cuarzo blanco salpicado de cantos grises, puerta con caja de luz y anillo de bordillos; plano MEDIO sobre la llanura, escala 1.1–1.4 y x entre −0.4 y 0.4), `tumulo-obra` (el mismo a medio levantar: capas de piedras y tepes y el cuarzo sólo alrededor de la entrada), `tumulo-hierba` (siglos después, sin cuarzo, cubierto de hierba y arbustos), `entrada-tumulo` (la entrada de cerca: losa de la entrada tumbada con la triple espiral, la puerta oscura detrás, la caja de luz con su dintel de rombos y el muro de cuarzo; ocupa todo el plano: x 0, escala 1 y sin más props), `losa-grabada` (losa del anillo tumbada con espirales y rombos; ponla a unos 0.6 del que la talla con `agachado`), `losa-rodillos` (gran losa sobre troncos que ruedan, con cuerdas hacia la derecha a la altura de las manos de quien `arrastrar`: x ≈ −1.1, escala 1 y los que tiran a su derecha mirando a la derecha), `casa-neolitica` (casa redonda de postes, zarzo y barro, techo cónico de juncos, puerta baja y humo por el techo; de noche la puerta brilla), `piragua` y `piragua-piedras` (tronco vaciado, vacío o cargado de losas grises; plano medio sobre el agua, con `rio`; deriva despacio a la derecha).
    - Pared `megalito` (interior): cámara de tumba megalítica con losas verticales grises grabadas (espirales, rombos, círculos, zigzags) y falsa bóveda de losas en saledizo; muy oscura, sin ventana.
    - **Rayo del solsticio:** el haz dorado entra por arriba a la izquierda y dibuja una franja de oro en el suelo, con polvo brillando; oscurece el decorado de detrás (ponlo el ÚLTIMO en `props`, con x 0, en interior `megalito`). Va con la duración de la escena: `rayo-solsticio` (entra, se ensancha, se queda y mengua), `rayo-solsticio-avanza` (hilo que entra y se para a medio camino), `rayo-solsticio-entra` (hilo que llega hasta el fondo), `rayo-solsticio-ensancha` (de hilo a franja), `rayo-solsticio-sale` (de franja a nada) y fijos `rayo-solsticio-corto`, `-hilo` y `-pleno`. Si la escena siguiente hereda el fondo, el rayo empieza otra vez: dale un fondo propio con la variante fija.
    - Acción `arrastrar` (inclinado hacia delante tirando de una cuerda con las dos manos, sin `objeto`) y sombrero `piel` (gorro de piel redondeado tipo Ötzi con barboquejo).
  - **Islas Flannan (1900):** `faro-blanco` (torre blanca sin franjas con la casa baja de piedra clara, el muro del patio y la verja; de noche, luz y haz giratorio; ponlo a un lado, x ±0.9–1.2, escala 0.9–1.15: la casa sale hacia la derecha de la torre), `faro-apagado` (el mismo con la linterna oscura, nunca encendido), `isla-faro` (Eilean Mòr vista desde el mar: acantilados oscuros, cima verde y el faro arriba con su haz de noche; plano MEDIO sobre el agua, con `mar` o `playa`; escala 0.8–1.25, o 0.5 para verla lejos desde la costa) e `isla-faro-apagada` (la misma, sin luz), `embarcadero` (grieta en la roca con escalones de hormigón que bajan al mar, grúa de hierro en una plataforma con barandilla, la caja de los cabos y la vía del tranvía; con `isla`, x 0 y escala 1.1–1.15: ocupa todo el plano y la grieta queda en x ≈ 0.3), `embarcadero-roto` (barandillas retorcidas, cabos esparcidos y la caja arrancada; la grúa sigue en pie), `ola` (ola enorme que revienta hacia arriba por la grieta cada ~5 s; ponla DESPUÉS de `embarcadero`, en x 0.3, escala 1.2–1.4 y sin personajes), `bengala` (cohete de señales: sube con estela durante el primer 30 % de la escena y estalla en estrellas que caen; sale del suelo en su `x`), `lampara-faro` (lente de Fresnel de latón y cristal sobre su pedestal, gira despacio y de noche brilla; con pared `metal`, x 0), `reloj-parado` (como `reloj`, con agujas y péndulo quietos), `chimenea-apagada` (hogar frío con troncos carbonizados y ceniza), `perchero` (tabla de pared con tres ganchos, dos vacíos y un impermeable de hule oscuro), `pizarra` (pizarra de pared con apuntes a tiza) y `capilla` (capilla de piedra seca en ruinas, sin techo).
  - **Terremoto de Mesina (1908):** `escombros` (ruinas de una ciudad de piedra: fachada enlucida partida con su ventana y el balcón, muro caído, vigas, tejas y cascotes con polvo que sube; escala 0.7–1, a los lados del plano). `ruinas` es una casa de madera: para ciudades de piedra usa `escombros`.
  - **Miniatura con decorado:** `faro-apagado`, `faro-blanco` y `escombros` se colocan solos abajo, entre el gancho y el personaje.
  - **Otros:** `granja-fuego` (la granja ardiendo), `charco` (con ondas), `puesto-mexica` (puesto de mercado con maíz, chile, frijol y pescado; el `puesto` normal lleva pan, queso y manzanas europeos).
  - **Pearl Harbor (1941):** barcos grises de guerra vistos de lado, en plano MEDIO sobre el agua (con `mar` o `rio`; en `campo` o `montanas` el motor pone una bahía delante, como vistos desde una colina): `acorazado` (torres de cañones y mástiles trípode; escala 0.4–0.6), `destructor` (cubierta corrida y cuatro chimeneas, clase Wickes; escala 0.6–0.75), `portaaviones` (cubierta plana con isla, sin insignias; escala 0.35–0.6) y `submarino` (sólo la torreta de un submarino enano asomando entre espuma; escala 0.3–0.4: no lo pongas detrás de un personaje, que lo tapa). `avion`: formación de tres aviones de hélice, siluetas pequeñas sin insignias, que cruza el cielo de izquierda a derecha (pasa por su `x` a mitad de escena). `radar`: radar SCR-270 en lo alto de una loma, con la antena de rejilla que gira y el remolque de los operadores (x ±0.9–1.1; deja a los personajes a 0.3 o más del otro lado). Sombrero `gorro-marinero` (gorro blanco de marinero de EE. UU., redondo y con el ala vuelta).
    - **Humo a lo lejos:** sobre el agua (`mar`, `rio`, `playa`, `isla`), un `humo` sin un `barco`, `bote`, casa u otra base cerca en el suelo (a menos de 0.35) arde en la línea de flotación, a lo lejos; si está a menos de 0.3 de un barco de plano medio (`acorazado`…), arde sobre él. Escala 0.4–0.7. Las llamas se ven pequeñas y lejanas: nada gráfico.
  - **Galileo en Padua (1610):** `anteojo` (el tubo de Galileo, de madera forrada de cuero rojo con dorados y sin latón, sobre un pie de madera sencillo e inclinado hacia el cielo; sirve también en `publicacion.miniatura.prop`), `torno-lentes` (banco de pulir lentes con su tablero: molde de hierro con manivela que gira y la lente encima, cuenco de abrasivo y lentes en fila, una rota; no añadas `mesa`), `santo` (basílica de San Antonio de Padua, decorado LEJANO: cúpulas, cúpula cónica y dos campanarios finos de ladrillo; sobresale por encima de las casas de `calle`, x ±1–1.2) y `campanario` (campanario de San Marcos, decorado LEJANO de ladrillo con logia blanca y punta piramidal verde; x ±1–1.2, escala 1.2–1.4).
    - Acción `observar`: de pie con el ojo pegado al ocular del anteojo de mano (≈1 m), sujeto con las dos manos e inclinado 35° hacia arriba en la dirección en que mira (`mirar`), con un leve temblor. No lleva `objeto`.
    - Sombrero `corno` (gorro ducal veneciano: cono rígido con la punta alzada hacia atrás, sobre la cofia de lino blanca; `colorSombrero` dorado).
- **Planos:** `puente`, `calzada`, `canoa`, `piragua`, los `tumulo` e `isla-faro` van en plano medio (sobre el agua); `acorazado`, `destructor`, `portaaviones` y `submarino` también; `volcan`, `piramide`, `pilar`, `templo-mayor`, `santo` y `campanario` siempre lejos. El motor añade solo el primer plano (hierba, postes, marcos) delante de los personajes, el paralaje de las capas y algo vivo (pájaros, motas de polvo, agua).
- **Ventanas:** en interiores con pared `roca`, `jeroglificos` o `megalito` no hay ventana por defecto (tumbas, cuevas). Pon `"ventana": false` en cualquier interior subterráneo.
- **`tumba`** es una lápida con cruz cristiana: solo para cementerios cristianos.
- **Emoji como prop:** cualquier otro texto en `tipo` se dibuja como emoji gigante (`{ "tipo": "🌼", "x": 0.6, "escala": 0.5 }`).
- **Posición `x` de los props:** sin `x` se reparten solos. Con `x` entre −1.5 y 1.5, el vertical los acerca al centro automáticamente.
- **Ambiente sonoro:** se elige solo según lugar, clima y props (lluvia, mar, viento, fuego, zumbido, ciudad).

### Personajes (reparto → Look)

```jsonc
{ "piel": "#e3ad84", "pelo": "#3a2a1e",
  "peinado": "corto|largo|calvo|mono|rizado|coleta|trenzas|rapado|coronilla",   // coronilla: calvo arriba con mechones a los lados
  "barba": "ninguna|bigote|corta|larga|patillas",   // patillas: largas hasta la mandíbula, sin barbilla
  "ropa": { "tipo": "camisa|tunica|vestido|abrigo|mono|armadura|traje|bata|uniforme|harapos|galabiya|tilma|cuadros", "color": "#", "color2": "#", "detalle": "#" },
  "sombrero": "ninguno|gorra|gorro-marinero|corno|copa|ala|casco|corona|capucha|panuelo|espacial|boina|tricornio|yelmo|turbante|fez|salacot|orejeras|penacho|morrion|pileo|pickelhaube|piel", "colorSombrero": "#",
  "zombi": false, // infectado: ojos pálidos (con piel gris verdosa y acción "tambalear")
  "gafas": false, "altura": 1 /* 0.6 niño */, "zapatos": "#" }
```

- `ropa.color` es la parte de arriba y `color2` el pantalón o la falda.
- **Voz del personaje:** a todo personaje femenino ponle `"voz": "narradora-es"` en su Look. Cuando una escena la "hable" ella (su boca se mueve, con `habla`), esa escena sale con voz femenina. También se puede forzar con `"voz"` en una escena concreta.
- `tilma`: manta anudada al hombro y taparrabos (`color` = manta, `color2` = taparrabos, piernas y brazos al aire). `cuadros`: chaqueta de leñador (`color` y `color2` = los dos colores del cuadro; el pantalón es `detalle`). `orejeras`: gorra de caza; `penacho`: tocado de plumas; `morrion`: casco español del siglo XVI.
- Para un astronauta: `mono` + `espacial`. Para un caballero: `armadura` + `yelmo`. Para un monje: `bata` + `capucha`. Para un romano: `tunica` + sandalias claras (`zapatos`).

### EnEscena

```jsonc
{ "quien": "manuel", "x": -0.4, "accion": "hablar", "emocion": "feliz", "mirar": 1, "objeto": "🪔",
  "entra": "izq|der", "sale": "izq|der", "habla": true, "escala": 1 }
```

- **x:** de −1 (izquierda) a 1 (derecha). Con dos personajes, ±0.4 o más; con tres, −0.7 / 0 / 0.7.
- **accion:** `beber` (inclinado hacia el suelo, para beber de un charco), `tambalear` (infectado: brazos al frente, avanza despacio), `quieto`, `hablar`, `caminar`, `correr`, `trabajar`, `saludar`, `sentado`, `escribir`, `pensar`, `celebrar`, `triste`, `senalar`, `cargar` (el objeto va en las manos), `dormir`, `asustado`, `reclinado`, `dar-mano` (apretón de manos: pon a los dos a ±0.27 mirándose), `observar` (mira por el anteojo de mano, inclinado hacia donde mira), `arrastrar` (tirando de una cuerda, inclinado hacia delante; con el prop `losa-rodillos`) (encogido, con los brazos recogidos y temblando) y `agachado` (de rodillas a cubierto: trinchera, sacos terreros, «tumbado en la orilla»). La `niebla` vela cielo, sol y decorados por detrás de los personajes.
- **emocion:** `neutral`, `feliz`, `triste`, `miedo`, `enfado`, `sorpresa` y `cansado`.
- **dormir:** el personaje se tumba en el suelo a su izquierda; no lo uses con niños pequeños ni bebés (parece que se han caído). Para ellos usa `sentado` con `emocion: "cansado"`.
- **Movimiento:** `caminar` sin `entra` da unos pasos hasta su sitio y se para (los pies no resbalan). Si el plano sigue en el mismo fondo, cada personaje sale de donde estaba en la escena anterior y cambia de pose fundiéndola en 10 fotogramas.
- **habla:** el primer personaje mueve la boca con la voz por defecto. Pon `"habla": false` a los demás (y al protagonista si duerme o si la voz es pensamiento).
- **mirar:** 1 = derecha, −1 = izquierda. Que se miren entre ellos.

### Insercion

```jsonc
{ "tipo": "dato", "valor": "120", "etiqueta": "escalones cada tres horas", "icono": "🪜" }   // o "prop": "piramide" (un decorado del motor en lugar del emoji)
{ "tipo": "cita", "frase": "…", "firma": "Diario, 10 de noviembre" }
{ "tipo": "objetos", "titulo": "Mi equipaje", "items": [{ "icono": "🧳", "nombre": "Una maleta" }] }   // máx 4
{ "tipo": "mapa", "lugar": "Cabo Vilán", "detalle": "Galicia · 1890", "icono": "📍" }
{ "tipo": "cuaderno", "titulo": "Mis notas de Júpiter", "firma": "Notas de Galileo, enero de 1610",
  "filas": [{ "fecha": "7 ene.", "lunas": [-2.6, -1.3, 1.9] }, { "fecha": "9 ene.", "nublado": true }, { "fecha": "11 ene.", "lunas": [-3.2, -1.4], "tamanos": [1.8, 1] }] }
{ "tipo": "cuaderno", "dibujo": "luna", "fase": "menguante", "firma": "Acuarelas de la Luna, 1609" }
```

- **cuaderno:** hoja de papel sepia con `titulo` y `firma` (opcionales). Con `filas`, una fila por noche al estilo de Galileo: la fecha, «Ori.» a la izquierda, Júpiter como un círculo, un asterisco por luna en sus posiciones (las mismas `lunas` y `tamanos` que en la vista `jupiter`) y «Occ.» a la derecha; con `"nublado": true` la fila dice «nubes». Las filas aparecen una tras otra; caben bien hasta 5–6. Con `"dibujo": "luna"` y `fase`, una acuarela sepia de la Luna.

## Emojis prohibidos o engañosos

- **🗼** es la Torre de Tokio, no un faro. Usa el prop `faro`.
- **👨‍👩‍👦 y otras secuencias con ZWJ** (familias, profesiones con género): algunas se ven como un cuadro roto. Usa emojis simples.
- **🚢** es un crucero moderno. Para barcos antiguos usa los props `barco` o `velero`.

## Lista de control antes de producir

- [ ] La duración del largo está entre 10 y 13 minutos (`--sin-render`).
- [ ] Cada `quien` existe en `reparto`.
- [ ] Hay 4 capítulos y los días suben de forma coherente del 1 al 30.
- [ ] Cada dato histórico aparece en la ficha de investigación, con su fuente.
- [ ] El cierre dice qué es inventado y qué es real.
- [ ] Las muestras (`--muestras`) no tienen solapes ni personajes cortados.

# Diseño: «Un mes en la vida de un vikingo»

Vestfold (sur de Noruega) y Hedeby, **hacia el 890 d. C.**, un mes lunar de primavera, después de la siembra. Este documento sale de `investigacion.md` (aprobada) y del rig de `videos/gladiador/scripts/lib.mjs` (`CAST`, `GEAR`, `PROP`, `person`, `actor`, `pose`, `walk`, `life`, `talk`), `lib2.mjs` (`fire`, `animal`, `moonBadge`, `trail`, `tent`…) y `gl_fondos.mjs` (`romanSky`, `foreground`, `sandGround`, `shadowUnder`, `torch`), que Producción copiará a `videos/vikingo/scripts/`. Todo es 2D plano con trazo oscuro (`C.ink = #24160d`, 3-8 px).

**Lo nuevo va en tres archivos:**
- `lib.mjs`: las entradas de `CAST` (apartado 1.2) y de `GEAR` (1.3), más dos utilidades (1.4).
- `lib2.mjs`: dos animales nuevos en `AN`, la vaca y la oveja (apartado 2.3).
- `vk_fondos.mjs` (nuevo, a partir de `gl_fondos.mjs`): cielo nórdico, fiordo, casa larga, barco de Gokstad, *thing*, Kaupang, Hedeby y los insertos (apartado 2).

## 0. Decisiones de fondo (anacronismos que el diseño evita)

| Tema | Decisión | Por qué (investigación) |
|---|---|---|
| Cascos | **Nadie lleva casco en la historia de Ulf.** Ulf usa un gorro de lana (`capWool`) o va con la cabeza descubierta. El casco con cuernos (`hornHelmet`) solo sale en el inserto del mito, sobre un cantante de ópera de 1876 y tachado con `stampX`. El casco de Gjermundbu (`gjermundbu`) solo sale en una vitrina de museo con el rótulo «SIGLO X · AÑOS DESPUÉS». | M1. El único casco vikingo casi completo es del s. X, posterior al 890 |
| Barco | **Barco de Gokstad**: 16 remos por banda (32), casco de tingladillo (tablas solapadas), mástil y una vela cuadrada, timón lateral a estribor (lado derecho mirando a proa) y escudos amarillos y negros en la borda **solo en puerto**. La roda acaba en **espiral lisa, sin cabeza de dragón**: en Gokstad no se conserva ninguna cabeza. La vela es **lisa, de color ocre rojizo, con costuras de paños**: el rayado rojo y blanco es una reconstrucción moderna | n.º 3 |
| Hedeby | **Sin la gran muralla semicircular** (es de la segunda mitad del s. X). Tampoco hay empalizada en el puerto ni muralla de enlace con el Danevirke. Se ven casas de madera con tejado a dos aguas, pasarelas de tablones, el arroyo entablado y los muelles | Anacronismos |
| Navegación | Sin brújula y sin «piedra solar». Ulf navega viendo la costa (rocas, islas y la orilla siempre en cuadro) | n.º 6, M5 |
| Joyas y símbolos | Ni martillos de Thor de colgante (abundan en el s. X), ni piedras rúnicas grandes como las de Jelling, ni cruces en Vestfold. En Hedeby puede verse, como mucho, una pequeña cruz de madera en un rincón (n.º 20) | Prudencia: s. X |
| Armadura | Ulf no lleva cota de malla (era carísima). Va con túnica, escudo redondo, lanza y hacha. La **espada** solo la lleva Geirmund, el jefe rico | n.º 12 |
| Caballos | Si sale alguno, sin estribos (se generalizan en el s. X) | Prudencia |
| Comida | Gachas, pan plano, pescado seco, mantequilla, miel, cebada y carne poco. **Nada de patatas, tomates, maíz, azúcar, tenedores ni vasos de cristal en la granja** | n.º 8 y 10 |
| Casa | Casa larga con hogar central y **agujero para el humo, sin chimenea y sin ventanas de cristal** | Época |
| Dientes limados | **Ulf no los tiene** y no aparecen en Hedeby. Si el guion los cita, se muestran en un inserto «EN SUECIA» con un cráneo en vitrina | NO USAR n.º 3 |
| Música | Evoca la época sin reconstruirla: lira pulsada, flauta de hueso, tambor de marco y dron. **Nada de zanfona ni gaita** (son posteriores) | — |

---

## 1. Reparto

### 1.1 Personajes principales (6)

| clave CAST | nombre | papel | aspecto |
|---|---|---|---|
| `ulf` | **Ulf** | protagonista: granjero libre, guerrero y comerciante, de unos 30 años | barba rubia oscura, túnica de lana azul glasto desvaído, pantalón de lana parda, vendas de pierna (*winingas*) de lana cruda, zapatos de cuero |
| `asa` | **Ása** | su mujer: lleva la granja cuando él se va | trenza rubia, vestido de lino crudo, delantal-vestido (*smokkr*) azul con **dos broches ovalados**, sarta de cuentas y llaves al cinto |
| `kari` | **Kári** | su hijo, de unos 8 años | pelo rubio claro, túnica de lana sin teñir |
| `geirmund` | **Geirmund** | el jefe local y dueño del barco | túnica roja de rubia (cara), ribete de tejido de tablillas amarillo, capa azul, espada |
| `hallvard` | **Hallvard** | el anciano que recita la ley **de memoria** en el *thing* | pelo y barba blancos, túnica verde apagada, bastón |
| `poppo` | **Poppo** | mercader frisón en Hedeby, con su balanza plegable | pelo oscuro corto y sin barba, túnica beis y capa oscura, bolsa al cinto |

### 1.2 Entradas nuevas de `CAST` (pegar dentro de `CAST` en `lib.mjs`)

```js
  // ---- Un mes en la vida de un vikingo (Vestfold y Hedeby, h. 890) ----
  // Ulf: túnica azul glasto desvaída, ribete y vendas de pierna de lana cruda, pantalón pardo, zapatos de cuero
  ulf: { skin: "#e8b893", skinS: "#c7936c", hair: "#b07a3a", tunic: "#5f7a8c", tunic2: "#3f5566", fur: "#d8cbb0", pants: "#8a7a5e", boot: "#4a3220", beard: true, h: 1 },
  // Ása: vestido de lino crudo bajo el delantal-vestido azul (pants = color del vestido largo)
  asa: { skin: "#efc6a2", skinS: "#cfa07a", hair: "#d9b46a", tunic: "#e6dcc6", tunic2: "#3f5f7a", fur: "#e6dcc6", pants: "#3f5f7a", boot: "#4a3220", braid: true, h: 0.95 },
  // Kári: lana sin teñir
  kari: { skin: "#efc29c", skinS: "#cf9e78", hair: "#e3c88a", tunic: "#a8946a", tunic2: "#6b5a3a", fur: "#d8cbb0", pants: "#7a6a4e", boot: "#4a3220", kid: true, h: 0.62 },
  // Geirmund: rojo de rubia con ribete amarillo de tablillas; pantalón gris oscuro
  geirmund: { skin: "#e0ae88", skinS: "#bf8c66", hair: "#6b4a2a", tunic: "#9e3a2a", tunic2: "#6b241a", fur: "#d9a72b", pants: "#4a4a55", boot: "#3a2414", beard: true, h: 1.08 },
  // Hallvard: anciano, verde apagado (gualda + glasto)
  hallvard: { skin: "#dcae8c", skinS: "#bb8c6a", hair: "#e6e1d6", tunic: "#6f7f52", tunic2: "#4f5a3a", fur: "#d8cbb0", pants: "#6b5a46", boot: "#4a3220", beard: true, old: true, h: 1 },
  // Poppo: mercader frisón, beis y pardo oscuro, sin barba
  poppo: { skin: "#d9a882", skinS: "#b88762", hair: "#3b2a1a", tunic: "#c9b48a", tunic2: "#5a4632", fur: "#8a6a4a", pants: "#5a4632", boot: "#3a2414", h: 0.98 },

  // ---- Figurantes ----
  // Remeros y vecinos: dos variantes de lana natural (clonar y cambiar el pelo si hace falta)
  remero1: { skin: "#e4b48e", skinS: "#c39068", hair: "#8a5a2a", tunic: "#8a7a5e", tunic2: "#5a4c38", fur: "#d8cbb0", pants: "#6b5a46", boot: "#4a3220", beard: true, h: 1.02 },
  remero2: { skin: "#d8a47e", skinS: "#b8845e", hair: "#c9a060", tunic: "#7a5a3a", tunic2: "#54402a", fur: "#d8cbb0", pants: "#5a4c38", boot: "#3a2414", h: 0.98 },
  // Esclava cautiva en Hedeby (n.º 18): lana basta sin teñir; collar de hierro (GEAR.ironCollar)
  thrall: { skin: "#e0b48c", skinS: "#c0926a", hair: "#5a3a22", tunic: "#b8ab90", tunic2: "#8a7e66", fur: "#b8ab90", pants: "#b8ab90", boot: "#8a6a4a", braid: true, h: 0.93 },
  // Inserto «921 · VOLGA» (n.º 21): un rus tatuado y el viajero Ibn Fadlan
  rus: { skin: "#e6b896", skinS: "#c59470", hair: "#9a6a32", tunic: "#e6b896", tunic2: "#5a3b22", fur: "#e6b896", pants: "#7a6a52", boot: "#4a3220", bare: true, beard: true, h: 1.05 },
  fadlan: { skin: "#b9845c", skinS: "#98663f", hair: "#1e140c", tunic: "#2f4f6a", tunic2: "#d9a72b", fur: "#efe6d2", pants: "#2f4f6a", boot: "#5a3b22", beard: true, h: 0.98 },
  // Inserto «1876 · BAYREUTH» (M1): el cantante de ópera con el traje de Doepler
  opera: { skin: "#f0c8a8", skinS: "#d0a080", hair: "#c9a060", tunic: "#7a6a9a", tunic2: "#c9a24a", fur: "#d9c9a8", pants: "#5a4a6a", boot: "#8a5a35", beard: true, h: 1.05 },
```

`moderno` (que ya existe) se reserva para las comparaciones marcadas `HOY`.

### 1.3 Entradas nuevas de `GEAR` (pegar dentro de `GEAR` en `lib.mjs`)

Coordenadas del personaje: mano delantera en `(31,-164)`, torso de `y = -302` a `-160`, cabeza con centro en `(4,-354)` y radio de unos 50, ojos en `y = -356` y boca en `y ≈ -318`. Ranuras: `H` (cabeza), `T` (torso), `F` (mano delantera) y `B` (mano trasera; con `back()` del diseño del gladiador, o sea `translate(-60,0)`).

```js
  // --- Ropa y adornos ---
  // capa rectangular de lana sujeta con broche anular en el hombro derecho (la posición del broche es reconstrucción, n.º 11)
  cloak: `<g><path d="M-52,-306 C-72,-250 -74,-190 -62,-150 L-40,-158 C-46,-210 -40,-262 -26,-300Z" fill="#6b4a2e" stroke="${C.ink}" stroke-width="4" stroke-linejoin="round"/><path d="M-36,-306 C-4,-298 22,-298 38,-298" stroke="#6b4a2e" stroke-width="15" stroke-linecap="round"/><path d="M-36,-306 C-4,-298 22,-298 38,-298" stroke="${C.ink}" stroke-width="2.5" fill="none" opacity=".35"/><circle cx="38" cy="-298" r="11" fill="#c9ced6" stroke="${C.ink}" stroke-width="3.5"/><circle cx="38" cy="-298" r="4.5" fill="#6b4a2e" stroke="${C.ink}" stroke-width="2"/><path d="M30,-306 L48,-288" stroke="#9aa3ad" stroke-width="3" stroke-linecap="round"/></g>`,
  // gorro redondo de lana (Ulf de viaje). NO es un casco
  capWool: `<g><path d="M-50,-370 C-54,-432 60,-438 58,-370 C28,-380 -20,-380 -50,-370Z" fill="#7a5a3a" stroke="${C.ink}" stroke-width="4"/><path d="M-50,-370 C-20,-382 30,-382 58,-370" stroke="#5a3e26" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M-20,-414 C-4,-424 20,-424 34,-414" stroke="#9a7a52" stroke-width="4" fill="none" stroke-linecap="round"/></g>`,
  // Ása: delantal-vestido azul con dos broches ovalados, sarta de cuentas entre ellos y tirantes
  smokkr: `<g><path d="M-44,-272 L46,-272 L50,-160 L-48,-160Z" fill="#3f5f7a" stroke="${C.ink}" stroke-width="4"/><path d="M-30,-300 L-28,-272 M32,-300 L30,-272" stroke="#3f5f7a" stroke-width="8"/><ellipse cx="-28" cy="-280" rx="15" ry="11" fill="#c9a24a" stroke="${C.ink}" stroke-width="3.5"/><ellipse cx="30" cy="-280" rx="15" ry="11" fill="#c9a24a" stroke="${C.ink}" stroke-width="3.5"/><path d="M-34,-282 l12,0 M24,-282 l12,0 M-28,-288 l0,12 M30,-288 l0,12" stroke="#8f6a2a" stroke-width="2"/>${["#d98a2b", "#3f8a6a", "#2f5f9a", "#d98a2b", "#e6dcc6", "#3f8a6a", "#2f5f9a"].map((c, i) => { const x = -18 + i * 6.3, y = -268 + Math.sin((i / 6) * Math.PI) * 14; return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4" fill="${c}" stroke="${C.ink}" stroke-width="1.5"/>`; }).join("")}</g>`,
  // llaves y tijeras colgadas del cinto (Ása)
  keys: `<g><path d="M36,-206 L38,-168 M44,-206 L50,-172" stroke="#5a3b22" stroke-width="3"/><path d="M38,-170 L38,-150 M38,-156 l7,0 M38,-150 l5,0" stroke="#7a7f86" stroke-width="4" stroke-linecap="round"/><path d="M50,-174 L56,-148 M50,-174 L44,-150" stroke="#7a7f86" stroke-width="3.5" stroke-linecap="round"/></g>`,
  // collar de hierro de la esclava (n.º 18)
  ironCollar: `<g><path d="M-22,-308 C-10,-298 18,-298 30,-308" stroke="#5b5f66" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M-22,-308 C-10,-298 18,-298 30,-308" stroke="${C.ink}" stroke-width="2.5" fill="none"/><circle cx="4" cy="-298" r="6" fill="none" stroke="#5b5f66" stroke-width="4"/></g>`,
  // tatuajes del rus del Volga (inserto 921): líneas verde oscuro sobre el pecho (T)
  tattoo: `<g stroke="#2f4a3a" stroke-width="3.5" fill="none" stroke-linecap="round" opacity=".85"><path d="M-30,-286 C-20,-270 -20,-250 -32,-236 M34,-286 C24,-270 24,-250 36,-236"/><path d="M-12,-276 q16,12 32,0 M-14,-252 q18,12 36,0"/><circle cx="-26" cy="-214" r="6"/><circle cx="34" cy="-214" r="6"/></g>`,

  // --- Armas (sin casco) ---
  // escudo redondo de tablas, pintado en dos mitades amarilla y negra como los de Gokstad, con umbo de hierro (≈80 cm)
  shieldRound: `<g><circle cx="30" cy="-196" r="96" fill="#d9a72b" stroke="${C.ink}" stroke-width="6"/><path d="M30,-292 A96,96 0 0 1 30,-100Z" fill="#2b2622"/>${[-36, -4, 64, 96].map((x) => `<path d="M${x},${-196 - Math.sqrt(96 * 96 - (x - 30) ** 2).toFixed(0)} L${x},${-196 + +Math.sqrt(96 * 96 - (x - 30) ** 2).toFixed(0)}" stroke="#8a6a38" stroke-width="2.5" opacity=".45"/>`).join("")}<circle cx="30" cy="-196" r="96" fill="none" stroke="${C.ink}" stroke-width="6"/><circle cx="30" cy="-196" r="25" fill="#8f979f" stroke="${C.ink}" stroke-width="4"/><circle cx="23" cy="-203" r="7" fill="#e6ebf0"/></g>`,
  // hacha barbada de granjero (mango de fresno)
  axe: `<g><path d="M31,-140 L31,-334" stroke="#8a6232" stroke-width="11" stroke-linecap="round"/><path d="M27,-336 L27,-308 L50,-302 C58,-284 68,-272 82,-266 C86,-294 86,-324 78,-350 C66,-340 54,-334 40,-336Z" fill="#9aa3ad" stroke="${C.ink}" stroke-width="4" stroke-linejoin="round"/><path d="M78,-346 C84,-320 84,-292 80,-272" stroke="#e6ebf0" stroke-width="3" fill="none"/></g>`,
  // espada del jefe (pomo lobulado y guarda corta), solo Geirmund
  swordVk: `<g><path d="M31,-182 L31,-372" stroke="#c9ced6" stroke-width="13" stroke-linecap="round"/><path d="M31,-182 L31,-360" stroke="#9aa3ad" stroke-width="3"/><path d="M14,-176 L48,-176" stroke="#c9a24a" stroke-width="9" stroke-linecap="round"/><path d="M31,-176 L31,-150" stroke="#5a3b22" stroke-width="10"/><path d="M18,-146 C18,-136 44,-136 44,-146 C40,-154 22,-154 18,-146Z" fill="#c9a24a" stroke="${C.ink}" stroke-width="3"/></g>`,
  // cuchillo largo (para comer y trabajar)
  knife: `<g><path d="M31,-172 L31,-232" stroke="#c9ced6" stroke-width="10" stroke-linecap="round"/><path d="M31,-240 L36,-226 L26,-226Z" fill="#c9ced6"/><path d="M31,-170 L31,-148" stroke="#7a4a22" stroke-width="10" stroke-linecap="round"/></g>`,

  // --- Trabajo, viaje y comercio ---
  // remo de pino (frase de los 32 remos)
  oar: `<g><path d="M-40,-60 L110,-420" stroke="#b08a5a" stroke-width="12" stroke-linecap="round"/><path d="M-40,-60 L-62,-4 C-70,14 -50,22 -42,6 L-24,-50Z" fill="#c9a06a" stroke="${C.ink}" stroke-width="4"/></g>`,
  // pala de madera con filo de hierro (granja)
  spade: `<g><path d="M31,-150 L31,-20" stroke="#8a6232" stroke-width="10" stroke-linecap="round"/><path d="M14,-24 L48,-24 L44,30 C40,42 22,42 18,30Z" fill="#a0703c" stroke="${C.ink}" stroke-width="4"/><path d="M18,28 C22,42 40,42 44,28" stroke="#9aa3ad" stroke-width="6" fill="none"/><path d="M18,-160 L44,-160" stroke="#8a6232" stroke-width="8" stroke-linecap="round"/></g>`,
  // huso con tortera de piedra (Ása hila)
  spindle: `<g><path d="M31,-170 L31,-90" stroke="#a0703c" stroke-width="5" stroke-linecap="round"/><ellipse cx="31" cy="-104" rx="13" ry="6" fill="#8c8f96" stroke="${C.ink}" stroke-width="3"/><path d="M31,-170 C40,-200 30,-230 60,-260" stroke="#efe6d2" stroke-width="3" fill="none"/><path d="M50,-262 C56,-290 84,-290 86,-262 C84,-246 56,-246 50,-262Z" fill="#efe6d2" stroke="${C.ink}" stroke-width="3"/></g>`,
  // peine de asta con remaches (n.º 24)
  comb: `<g><rect x="2" y="-196" width="62" height="18" rx="4" fill="#e6d2b0" stroke="${C.ink}" stroke-width="3"/>${[...Array(11)].map((_, k) => `<path d="M${6 + k * 5.4},-178 L${6 + k * 5.4},-162" stroke="#e6d2b0" stroke-width="3"/>`).join("")}<path d="M2,-162 L64,-162" stroke="${C.ink}" stroke-width="1.5" opacity=".4"/>${[12, 33, 54].map((x) => `<circle cx="${x}" cy="-187" r="2.5" fill="#7a5a3a"/>`).join("")}</g>`,
  // cuerno para beber (M4: cuernos, no cráneos)
  hornDrink: `<g><path d="M20,-176 C10,-210 30,-250 74,-262 C70,-250 66,-236 46,-170 C40,-160 24,-162 20,-176Z" fill="#e6d2b0" stroke="${C.ink}" stroke-width="4"/><path d="M22,-178 C30,-164 44,-164 46,-172" stroke="#c9a24a" stroke-width="6" fill="none"/><path d="M60,-252 L74,-262" stroke="#c9a24a" stroke-width="6" stroke-linecap="round"/></g>`,
  // pescado seco (comida a bordo, n.º 8)
  stockfish: `<g><path d="M31,-176 L31,-190 C20,-200 14,-250 26,-290 L36,-290 C48,-250 42,-200 31,-190" fill="#c9b48a" stroke="${C.ink}" stroke-width="3.5"/><path d="M22,-296 L31,-284 L40,-296" fill="#a8946a" stroke="${C.ink}" stroke-width="3"/><path d="M26,-240 L36,-240 M26,-220 L36,-220" stroke="#a8946a" stroke-width="2.5"/></g>`,
  // balanza plegable de bronce: la mano sujeta la anilla y la balanza cuelga (n.º 16)
  scales: `<g><path d="M31,-164 L31,-140" stroke="#8f6a2a" stroke-width="3"/><path d="M-21,-138 L83,-138" stroke="#b08a36" stroke-width="5" stroke-linecap="round"/><path d="M31,-146 L31,-128" stroke="#b08a36" stroke-width="5"/><path d="M-21,-138 L-33,-96 M-21,-138 L-9,-96 M83,-138 L71,-96 M83,-138 L95,-96" stroke="#8f6a2a" stroke-width="2"/><path d="M-37,-96 C-33,-84 -5,-84 -1,-96Z M67,-96 C71,-84 95,-84 99,-96Z" fill="#c9a24a" stroke="${C.ink}" stroke-width="3"/><path d="M-27,-98 l6,-6 l8,4 l-4,5Z" fill="#e6ebf0" stroke="${C.ink}" stroke-width="1.5"/><rect x="76" y="-104" width="10" height="8" rx="2" fill="#7a7f86" stroke="${C.ink}" stroke-width="1.5"/></g>`,
  // plata picada en la palma: trozo de dírham, de brazalete y de lingote (n.º 16 y 17)
  hacksilver: `<g><path d="M14,-176 A18,18 0 0 1 48,-176 L31,-176Z" fill="#dfe4ea" stroke="${C.ink}" stroke-width="3"/><path d="M20,-178 l6,-6 M28,-182 l8,0" stroke="#8f979f" stroke-width="1.5"/><path d="M40,-160 C48,-168 62,-166 66,-156" stroke="#c9ced6" stroke-width="7" fill="none" stroke-linecap="round"/><rect x="2" y="-166" width="20" height="9" rx="2" fill="#c9ced6" stroke="${C.ink}" stroke-width="2.5" transform="rotate(-12 12 -162)"/></g>`,
  // palangana de madera (inserto 921, n.º 21)
  basin: `<g><path d="M-14,-178 L76,-178 C72,-140 52,-132 31,-132 C10,-132 -10,-140 -14,-178Z" fill="#a0703c" stroke="${C.ink}" stroke-width="4"/><ellipse cx="31" cy="-178" rx="45" ry="9" fill="#8fb0b8" stroke="${C.ink}" stroke-width="3"/><path d="M-6,-160 L68,-160" stroke="#7a5030" stroke-width="3"/></g>`,

  // --- Solo para el mito (M1) ---
  // casco con cuernos de ópera (1876): SIEMPRE con stampX encima
  hornHelmet: `<g><path d="M-54,-372 C-56,-432 64,-438 62,-372Z" fill="#9aa3ad" stroke="${C.ink}" stroke-width="5"/><path d="M-60,-372 L68,-372" stroke="#7a7f86" stroke-width="9" stroke-linecap="round"/><path d="M-50,-400 C-90,-410 -110,-450 -98,-492 C-84,-462 -70,-440 -44,-424Z" fill="#efe6d2" stroke="${C.ink}" stroke-width="4"/><path d="M56,-404 C96,-414 116,-454 104,-496 C90,-466 76,-444 50,-428Z" fill="#efe6d2" stroke="${C.ink}" stroke-width="4"/></g>`,
  // casco de Gjermundbu (s. X): redondo con anteojeras. Solo en vitrina o con rótulo «SIGLO X»
  gjermundbu: `<g><path d="M-54,-362 C-58,-436 64,-442 60,-362Z" fill="#8f979f" stroke="${C.ink}" stroke-width="5"/><path d="M4,-438 L4,-362 M-56,-386 L62,-386" stroke="#6b7178" stroke-width="8"/><circle cx="4" cy="-440" r="6" fill="#6b7178" stroke="${C.ink}" stroke-width="2.5"/><path d="M-26,-370 C-30,-350 -16,-338 -2,-344 L4,-366 L10,-344 C24,-338 38,-350 34,-370Z" fill="none" stroke="#6b7178" stroke-width="7" stroke-linejoin="round"/></g>`,
```

### 1.4 Utilidades (pegar debajo de `GEAR`)

```js
// Equipo en la mano trasera (igual que en el gladiador)
export const back = (g) => `<g transform="translate(-60,0)">${g}</g>`;
// Capa de otro color (Geirmund: azul #2f4f7a; Hallvard: pardo #6b5a46; Poppo: #3a3a44)
export const cloakOf = (c) => GEAR.cloak.replaceAll("#6b4a2e", c);
// Poses (grados por articulación; ajustar con capturas)
export const POSE = {
  remar:      { armF: -70, foreF: -20, armB: -60, foreB: -30, legF: -30, legB: 20 },  // sentado en el arcón, tirando del remo
  vapnatak:   { armF: -150, foreF: -10, mouth: "open" },                            // arma en alto: chocar las armas en el thing
  pesar:      { armF: -60, foreF: -30, head: 6, brows: -2 },                        // balanza a la altura de los ojos
  hilar:      { armF: -40, foreF: -70, armB: -120, foreB: -20 },                    // Ása con el huso
  peinarse:   { armF: -150, foreF: -90, head: -4 },                                 // el peine en el pelo
  mirarLejos: { armF: -130, foreF: -100, head: -8 },                                // la mano de visera: buscar la costa
  dormir:     { body: -90 },                                                        // tumbado bajo la piel, en cubierta
};
// En los capítulos, gear() acepta varias claves por ranura (como en el gladiador):
// gear({ T: ["cloak"], H: "capWool", F: "shieldRound", B: back(GEAR.axe) })
```

### 1.5 Equipo por personaje y momento

| personaje | momento | props |
|---|---|---|
| Ulf | granja (semana 1) | `ulf` + `F: spade` o `knife`; en el *dagmál*, `F: bowl` (ya existe) |
| Ulf | aseo (n.º 24-25) | `F: comb`, `POSE.peinarse` |
| Ulf | *thing* (semana 2) | `T: cloak`, `F: shieldRound`, `B: back(prop("spear"))`; en el *vápnatak*, `POSE.vapnatak` con la lanza en alto |
| Ulf | varadero y travesía (semanas 2-3) | `H: capWool`, `F: oar` (`POSE.remar`) o `stockfish`; de noche, `POSE.dormir` bajo la piel |
| Ulf | Hedeby (semana 4) | `T: cloak`, `B: back(GEAR.axe)`, `F: hacksilver` o `scales` (`POSE.pesar`) |
| Ulf | brindis de vuelta / mito M4 | `F: hornDrink` |
| Ása | granja | `T: smokkr+keys`, `F: spindle` (`POSE.hilar`) o `PROP.basket` |
| Kári | granja y despedida | `F: PROP.stone` (espantar cuervos) o nada; corre con el perro |
| Geirmund | *thing* y barco | `T: cloakOf("#2f4f7a")`, `F: swordVk`; al timón, mano en la caña del timón (forma parte del barco) |
| Hallvard | *thing* | `T: cloakOf("#6b5a46")`, `F: staff` (ya existe); habla con `talk` y la mano libre alzada |
| Poppo | mercado | `T: cloakOf("#3a3a44")`, `F: scales`, `B: back(GEAR.purse)` |
| Esclava | Hedeby (n.º 18), escena sombría | `thrall` + `T: ironCollar`, `F: shackle` (ya existe); **sin poses cómicas** |
| Remeros | barco | `remero1` / `remero2` + `F: oar`, `POSE.remar` |
| Rus del Volga | inserto «921 · VOLGA» | `rus` + `T: tattoo`, `F: basin`, `F: comb` |
| Ibn Fadlan | inserto «921 · VOLGA» | `fadlan` + `F: scroll` (ya existe) |
| Cantante 1876 | inserto del mito M1 | `opera` + `H: hornHelmet`, y encima `stampX` |
| Perro de la granja | semana 1 y despedida | `wolf()` («gris») con el pelaje en `#a07a4a` (perro pardo) |

---

## 2. Escenarios

### 2.1 Paleta del vídeo (8 colores)

| papel | color | uso |
|---|---|---|
| fondo frío | `#2f4a66` azul fiordo | agua profunda, montañas lejanas, noche |
| fondo claro | `#cfe0ea` cielo nórdico | cielo de primavera, niebla, perspectiva atmosférica |
| suelo | `#6f8f4a` hierba de primavera | prados de Vestfold y el *thing* |
| suelo 2 | `#8a6a48` tierra y tablones | campo arado, pasarelas de Hedeby, cubierta del barco |
| madera | `#a0703c` roble del barco | casco, remos, casas |
| acento cálido | `#9e3a2a` rojo de rubia | ropa del jefe, vela con `#b8643a` |
| acento metálico | `#dfe4ea` plata | plata picada, balanzas, brillo del agua |
| acento de luz | `#d9a72b` ámbar | escudos de Gokstad, broches, fuego, rótulos clave |

Tinta: `C.ink`. Texto en pantalla: `C.bone` sobre fondos oscuros.

### 2.2 Qué se usa en cada capítulo

La luna de cada semana sale con `moonBadge` (de `lib2.mjs`): `0` nueva, `0.5` creciente, `1` llena y `-0.5` menguante. La misma fase se ve en el cielo nocturno de cada semana.

| capítulo | variante | cielo | lejos / medio | nuevo | luz |
|---|---|---|---|---|---|
| gancho | `gancho` | `nordicSky("tarde")` | `fjordFar(skerries)` | `gokstad` a toda vela, `seaWater("viva")`, `spray`, `gulls` | contraluz dorado bajo y espuma |
| intro | `intro` | `nordicSky("manana")` | `fjordFar`, `kaupang` lejano | `farmstead` en la ladera, `smoke` | mañana fría, niebla en el agua |
| intro | `intro_mito_vikingo` (M3) | `nordicSky("dia")` | `fjordFar` | rótulo «VÍKINGR = PERSONA · VÍKING = EXPEDICIÓN» en `panel` | plana de día |
| semana1 | `s1_granja` | `nordicSky("manana")` + luna nueva invisible | `fjordFar`, `birchRow` | `longhouse`, `fieldFurrows`, `fenceWattle`, `animal(vaca/oveja)` | sol bajo de mañana, sombras largas |
| semana1 | `s1_dagmal` | — (interior) | — | `longhouseIn` (hogar, bancos, telar) | hogar naranja y haz por el agujero del humo |
| semana1 | `s1_noche` | `nordicSky("noche", { moon: 0 })` | `fjordFar(night)` | `longhouse` con luz en la puerta | azul noche, sin luna, viñeteado |
| semana1 | `s1_sabado` (n.º 25) | `nordicSky("dia")` | `fjordFar` | `stream` con tina y piedras calientes | luz alegre, vapor |
| semana2 | `s2_thing` | `nordicSky("dia")` + luna creciente pálida | `fjordFar`, `thingMound` | `hazelRopes`, `thingCrowd` | mediodía claro, sombras cortas |
| semana2 | `s2_vapnatak` (n.º 14) | igual | igual | `burst` de chispas metálicas y rótulo «AÑOS DESPUÉS, LAS LEYES CUENTAN…» | igual, con `sunRays` |
| semana2 | `s2_varadero` | `nordicSky("tarde")` | `fjordFar`, `kaupang` | `naust`, `gokstad` varado, `tarPot`, `logRollers` | tarde cálida, brea humeante |
| semana2 | `s2_despedida` | `nordicSky("atardecer", { moon: 0.5 })` | `fjordFar` | `jetty`, `gokstad` con escudos | atardecer rosado |
| semana3 | `s3_mar_dia` | `nordicSky("dia")` | `coastLine` (siempre a la vista) | `gokstad` navegando, `seaWater`, `gulls` | sol alto, brillos en el agua |
| semana3 | `s3_remo` (calma) | `nordicSky("niebla")` | `coastLine` difuminada | `gokstad` con la vela recogida y los remos fuera | gris perla, sin sombras |
| semana3 | `s3_noche_mar` | `nordicSky("noche", { moon: 1 })` | `coastLine(night)` | `gokstad` fondeado, `moonPath` sobre el agua | luna llena azul plata, viñeteado |
| semana3 | `s3_campamento` | `nordicSky("noche", { moon: 1 })` | `coastLine(night)` | `tent` (lib2, en tonos lana) en la orilla, `fire` | fuego naranja contra azul |
| semana3 | `s3_schlei` (llegada) | `nordicSky("manana")` | orillas bajas y verdes del Schlei | `gokstad` entrando despacio | mañana tibia, juncos |
| semana4 | `s4_puerto` | `nordicSky("dia", { moon: -0.5 })` | `hedebyFar` | `jetty`, barcos mercantes, `cranes` de mano | luz de día con humo de talleres |
| semana4 | `s4_mercado` | `nordicSky("dia")` | `hedebyFar` | `hedebyStreet`, `stalls` | día animado |
| semana4 | `s4_plata` (n.º 16-17) | — | `hedebyStreet` desenfocado | balanza grande en primer término, `hacksilver` en un paño | foco cálido sobre la balanza |
| semana4 | `s4_esclavos` (n.º 18-19) | `nordicSky("nublado")` | `hedebyFar` | rincón del muelle con `shackle` | desaturado, frío, sin música alegre |
| semana4 | `s4_ansgario` (n.º 20) | `nordicSky("dia")` | `hedebyFar` | pequeña iglesia de madera, `tint("sepia")` | sepia: el pasado |
| semana4 | `s4_noche` | `nordicSky("noche", { moon: -0.5 })` | `hedebyFar(night)` | `hedebyStreet(night)`, braseros | menguante, luz de lámparas |
| inserto | `ins_volga` (n.º 21) | `nordicSky("manana")` | `volgaBank` | rótulo «921 · RÍO VOLGA · 30 AÑOS DESPUÉS» | fría y ajena, `tint("despues")` |
| inserto | `ins_1876` (M1) | — | — | `operaStage` (telón, candilejas, decorado pintado) | candilejas amarillas desde abajo |
| inserto | `ins_museo` (M1, n.º 22) | — | — | `museumCase` (Veksø, Gjermundbu o cráneo «EN SUECIA») | foco de museo frío |
| inserto | `ins_gokstad` (n.º 4-5) | `nordicSky("tarde")` | `fjordFar` | túmulo con hierba y rótulo «POCOS AÑOS DESPUÉS» | dorada del recuerdo |
| balance | `balance` | `nordicSky("atardecer", { moon: 0 })` | `fjordFar` | `farmstead`, `gokstad` lejos, `bigScale` (ya existe en el diseño del gladiador; si no está, se dibuja como `scales` grande) | contraluz rosado |
| cierre | `cierre` | `nordicSky("noche", { moon: 0 })` | `fjordFar(night)` | `longhouse` con puerta encendida, `aurora` suave | azul noche, ventana cálida |

### 2.3 Piezas nuevas (para `vk_fondos.mjs` y `lib2.mjs`)

Todas tienen el mismo formato que las del gladiador: SVG plano con trazo `C.ink`, semilla `rng()` fija, animaciones con `S.tw()` a lo largo de `S.t1 - S.t0`, y `S.parallax` con `far` 0,12, `mid` 0,35 y `fg` 1,35.

| función | qué dibuja | vivo |
|---|---|---|
| `nordicSky(S, kind, { moon })` | variante de `romanSky`: `manana` (#9fbfd8 → #e8eef0 → #f3dcae), `dia` (#4f86b8 → #a9cbe2 → #e6eef0), `tarde` (#4a5a8a → #d98a5a → #f6c27a), `atardecer` (#3a3a6a → #c9708a → #f2b48a), `niebla` (#b9c4cc → #d9dfe2), `nublado` (#6f7a84 → #a9b2b8), `noche` (#070b19 → #16223f → #24324e). Nubes con sombra; en lugar de palomas, **gaviotas** (`gulls`: «M» blanca con punta negra). De noche, estrellas que titilan y la luna en su fase (`moon`: 0, 0,5, 1 o −0,5) con halo | nubes, gaviotas, estrellas |
| `fjordFar(S, { night, skerries })` | tres cordilleras de montañas redondeadas con abetos en silueta (`#6f8aa6`, `#56708e`, `#3f5a74`), **nieve en las cimas** solo en la primera, y el fiordo como banda de agua con reflejos horizontales. `skerries`: islotes de granito redondeados (mar abierto) | brillos del agua que parpadean, niebla que se desliza |
| `birchRow(S, x, w)` | abedules de tronco blanco con marcas negras y copa verde claro de primavera; algunos abetos oscuros | copas que se mecen (`rotation` ±2°) |
| `longhouse(S, id, x, { night, door })` | casa larga de 22-28 m: paredes de tablones verticales **ligeramente curvas** (con forma de barco), tejado de **tepe** con hierba y flores, agujero del humo con humo, una puerta en el lado largo y otra en el extremo del establo. Al lado: pila de leña y un granero pequeño sobre postes | humo del techo, hierba del tejado que se mueve, la puerta brilla de noche |
| `longhouseIn(S)` | interior: **hogar largo** en el centro con piedras, bancos de tierra con tablas a ambos lados, postes que sostienen el tejado, telar vertical con pesas de barro, caldero colgado de una cadena, arcón, pieles en los bancos, el haz de luz del agujero del humo | llamas (`fire` de lib2), humo, motas en el haz, las pesas del telar que oscilan |
| `fieldFurrows(S, x, w)` | campo recién sembrado: surcos en diagonal de tierra parda con brotes verdes pequeños, **arado de madera** (*ard*) apoyado en la cerca | brotes que tiemblan, cuervos que picotean (siluetas que saltan) |
| `fenceWattle(S, x, w)` | cerca de varas entretejidas | — |
| AN `vaca`, `oveja` (lib2) | vaca pequeña de la época (color pardo rojizo `#8a5a3a`, cuernos cortos) y oveja de lana gris y cara oscura (`#b8b0a0`, cabeza `#3a2a20`) con el formato de `AN` | `animalIdle`: cabeza que pace, cola |
| `stream(S, x)` | arroyo con piedras, tina de madera y piedras calientes en un fuego pequeño | vapor que sube, agua que corre |
| `thingMound(S, x)` | prado abierto con un **pequeño montículo** en el centro y piedras planas alrededor, en una llanura junto al fiordo | — |
| `hazelRopes(S, x, w)` | varas de avellano clavadas con cuerdas que marcan el espacio del juicio (reconstrucción basada en las sagas: decirlo así si se nombra) | cuerdas que se balancean |
| `thingCrowd(S, x, w)` | dos o tres filas de hombres libres en silueta (variantes de `remero1`/`remero2` sin rig, solo SVG plano), lanzas y escudos | se mueven por turnos; en el *vápnatak* alzan las armas a la vez |
| `naust(S, x)` | cobertizo largo para barcos, de piedra y tepe, abierto al agua | — |
| `gokstad(S, id, x, y, { sail, shields, oars, beached, s })` | el barco (ver 2.4) | vela que se hincha, cabeceo, remos que bogan, estela |
| `tarPot(S, x)`, `logRollers(S, x)` | olla de brea al fuego y troncos para varar el barco | humo negro de la brea |
| `jetty(S, x, w)` | muelle de troncos y tablones sobre pilotes, amarras, cestos y barriles | agua que choca con los pilotes |
| `kaupang(S, x)` | en la distancia: casas pequeñas en fila junto a la orilla, muelles, barcos varados (perspectiva atmosférica, azul claro) | humo de hogares |
| `seaWater(S, { kind })` | mar abierto en tres bandas: `#2f4a66`, `#3f6a8a`, crestas blancas. `viva` = olas más altas | olas en bucle con desfase, espuma (`spray`), brillos |
| `coastLine(S, { night })` | costa de rocas de granito redondeadas, pinos y alguna playa; la tierra siempre a la vista (n.º 6) | olas en las rocas |
| `moonPath(S)` | reflejo de la luna llena sobre el agua en trazos horizontales | trazos que parpadean |
| `hedebyFar(S, { night })` | casas de madera bajas y apiñadas con tejados de paja a dos aguas, humo de muchos talleres, mástiles de barcos en el puerto y **ninguna muralla** | humo, banderolas de tela en los mástiles |
| `hedebyStreet(S, x, w, { night })` | calle de **tablones** con el **arroyo entablado** al lado, casas de entramado de varas y barro con tejado de paja, cercas de varas entre parcelas, talleres (peinero con astas, cuentero con cuentas de vidrio, herrero) | humo, chispas del herrero, cuentas que brillan |
| `stalls(S, x)` | puestos con toldo de lana: pieles, cuentas de vidrio, piedras de afilar, peines, tela, ollas, jarras renanas | toldos que ondean |
| `cranes` | (opcional) grúa de mano en el muelle: polea y cuerda | cuerda que oscila |
| `volgaBank(S)` | orilla ancha y llana del Volga con casas de madera grandes y barcas (inserto) | río que fluye |
| `operaStage(S)` | escenario de 1876: telón rojo, candilejas, decorado pintado de rocas y un fresno | telón que se abre, candilejas que titilan |
| `museumCase(S, kind)` | vitrina con peana y cartela («VEKSØ · h. 900 a. C.», «GJERMUNDBU · s. X», «SUECIA · 800-1050») | brillo que cruza el cristal |
| `aurora(S)` | cortina verde muy suave en el cielo del cierre (es primavera: tenue) | ondulación lenta |

### 2.4 El barco de Gokstad (`gokstad`)

Medidas para el dibujo: unos 23 m de largo; con el actor a escala 1 (unos 480 px = 1,80 m), el barco mide unos **6.000 px**. Para los planos generales se usa `s ≈ 0,35`.
- **Casco**: perfil largo y bajo con proa y popa altas y simétricas, **tablas solapadas** (9-10 tracas con una línea más oscura en cada solape, `#a0703c` / `#7a5030`). La roda y el codaste acaban en **espiral lisa**, sin cabeza de animal.
- **Remos**: 16 portillas redondas por banda en la traca alta (con tapas que se abren). Con `oars: true`, salen 16 remos que bogan en grupo (`rotation` en bucle con desfase pequeño).
- **Mástil y vela**: mástil en el centro, una verga y una **vela cuadrada de lana** ocre rojizo (`#b8643a`) con costuras de paños verticales más oscuras. Las escotas van a la borda. Animación: `scaleX` 0,94 → 1,04 en bucle y la vela que «respira».
- **Timón**: remo-timón grande en el lado de **estribor**, en popa, con su caña. Geirmund o Ulf lo manejan.
- **Escudos**: con `shields: true`, 32 escudos por banda en la regala, **alternando amarillo y negro**. Solo en puerto y en la despedida; **en el mar abierto, sin escudos**.
- **A bordo**: arcones de remero (Ulf se sienta en el suyo), barriles de agua, sacos de harina, pescado seco colgado, pieles enrolladas y un cubo para achicar. No hay camarotes ni cubierta techada.
- **Vivos**: cabeceo (`rotation` ±1,5° y `y` ±10 px), estela de espuma en popa, la vela que se hincha y salpicaduras en la proa (`spray`).

### 2.5 Descripción de las escenas principales (5 capas, atrezo, luz y vivos)

Las variantes que no salen aquí repiten las capas de su escena principal y cambian el atrezo o la luz, como dice la tabla 2.2. Ninguna escena se repite igual.

**gancho · el barco a toda vela, tarde**
1. Cielo: `nordicSky("tarde")`, degradado violeta-naranja-dorado con el sol bajo y halo, rayos que giran, nubes con sombra y gaviotas.
2. Lejos: islotes de granito y una costa azulada con perspectiva (`fjordFar({ skerries: true })`).
3. Medio: el barco de Gokstad cruzando de derecha a izquierda, con la vela hinchada, la tripulación en silueta y Ulf en primer término de la borda.
4. Suelo: el mar (`seaWater("viva")`) con tres bandas, crestas blancas y la estela del barco.
5. Primer plano: espuma y salpicaduras que cruzan el encuadre, y una gaviota cerca de la cámara (paralaje 1,35, blur 3 px).
- Atrezo: vela de lana, escotas, remo-timón, arcones, barril de agua, pescado seco colgado, piel enrollada y cubo de achicar.
- Luz: contraluz dorado con brillos (`#dfe4ea`) sobre el agua.
- Vivos: olas, vela, cabeceo, espuma, gaviotas y la capa de Ulf al viento.

**intro · Vestfold y Kaupang, mañana**
1. Cielo: `nordicSky("manana")`, azul pálido con sol bajo y halo, nubes con sombra y gaviotas a lo lejos.
2. Lejos: montañas en tres capas con nieve en las cimas; en la orilla, **Kaupang** pequeño (casas, muelles y barcos varados) con su humo.
3. Medio: la ladera con la granja de Ulf (`longhouse`, granero sobre postes), abedules de hojas nuevas y una cerca de varas.
4. Suelo: prado de primavera (`#6f8f4a` → `#4f6b3a`) con flores pequeñas, piedras con brillo, un sendero de tierra y las sombras de contacto.
5. Primer plano: helechos y piedras grandes con musgo, desenfocados.
- Atrezo: casa larga, granero, pila de leña, cerca de varas, arado de madera, carretilla de mano, vacas y ovejas.
- Luz: mañana fría con niebla baja sobre el agua.
- Vivos: humo de la granja y de Kaupang, niebla, hierba y animales que pacen.

**semana1 · la granja tras la siembra (`s1_granja`)**
1. Cielo: `nordicSky("manana")`; la luna nueva no se ve (el `moonBadge` de la semana la presenta).
2. Lejos: el fiordo con brillos y las montañas.
3. Medio: la casa larga con tejado de tepe y hierba, la puerta abierta, la pila de leña, los abedules y el granero sobre postes.
4. Suelo: el **campo recién sembrado** con surcos en diagonal, brotes y huellas de pies y pezuñas; prado alrededor.
5. Primer plano: cerca de varas y cardos, desenfocados.
- Atrezo: arado de madera (*ard*), pala de madera, cesto de semilla (`PROP.basket`), cubo de leche, piedra de moler apoyada en la pared, vacas, ovejas, el perro y cuervos.
- Luz: sol bajo de mañana y sombras largas hacia la derecha.
- Vivos: cuervos que saltan, humo, ovejas y vaca (`animalIdle`), la cola del perro y Ása hilando.

**semana1 · dentro de la casa larga (`s1_dagmal`)**
1. Cielo: el **haz de luz del agujero del humo** (rectángulo oblicuo de luz) y el humo que sube por él.
2. Lejos: la pared del fondo en penumbra, con escudos y herramientas colgados y el establo tras un tabique de varas.
3. Medio: postes del tejado, telar vertical con pesas, caldero colgado de su cadena y estante con cuencos de madera.
4. Suelo: tierra apisonada con juncos; el hogar largo de piedras en el centro y los bancos cubiertos de pieles.
5. Primer plano: el borde de un banco con una piel y un poste, desenfocados.
- Atrezo: hogar con caldero, telar con pesas de barro, arcón, cuencos y cucharas de madera, pan plano en una piedra, peine de asta en el banco, pieles y huso.
- Luz: naranja del hogar desde abajo y el haz frío del techo; viñeteado suave.
- Vivos: llamas (`fire`), humo, motas en el haz y pesas del telar que se balancean.

**semana2 · el *thing* (`s2_thing`)**
1. Cielo: `nordicSky("dia")`, azul con nubes altas y la luna creciente pálida de día.
2. Lejos: el fiordo y las montañas, con barcos pequeños varados en la orilla (han venido por agua).
3. Medio: el montículo con Hallvard de pie y el espacio marcado con varas de avellano y cuerdas; detrás, la gente en filas (`thingCrowd`).
4. Suelo: hierba pisada con calvas de tierra, piedras planas para sentarse y sombras cortas.
5. Primer plano: hierba alta y la punta de lanzas apoyadas, desenfocadas.
- Atrezo: montículo, varas con cuerdas, piedras para sentarse, lanzas, escudos redondos, el bastón de Hallvard, capas con broche y un caballo atado (sin estribos).
- Luz: mediodía claro. En el *vápnatak*, destellos en las puntas (`burst` gris claro) y `sunRays`.
- Vivos: cuerdas, capas al viento, la gente que se mueve y un choque de armas sincronizado (sonido `clank`).

**semana2 · el varadero de Kaupang (`s2_varadero`)**
1. Cielo: `nordicSky("tarde")` con nubes doradas y gaviotas.
2. Lejos: Kaupang (casas, muelles y humo) y la otra orilla del fiordo.
3. Medio: el cobertizo de barcos (`naust`) y el barco de Gokstad **varado sobre troncos**, sin escudos y con el mástil tumbado.
4. Suelo: playa de guijarros y arena oscura con algas, huellas y las marcas de la quilla.
5. Primer plano: cuerdas enrolladas y un barril, desenfocados.
- Atrezo: olla de brea al fuego, troncos para rodar el barco, remos apilados, vela doblada, barriles de agua, sacos de harina, pescado seco en una vara y redes.
- Luz: tarde cálida y humo negro de la brea a contraluz.
- Vivos: humo, agua que lame la orilla, gaviotas y remeros que cargan.

**semana3 · en el mar de día (`s3_mar_dia`)**
1. Cielo: `nordicSky("dia")` con sol alto, nubes rápidas y gaviotas.
2. Lejos: la costa con rocas redondeadas y pinos, **siempre a la vista** (`coastLine`).
3. Medio: el barco navegando a vela; Ulf en su arcón y Geirmund al timón.
4. Suelo: `seaWater` (olas medianas y estela).
5. Primer plano: espuma y una ola cercana que cruza (paralaje 1,35).
- Atrezo: vela, remo-timón, arcones, barril de agua, cuerno de beber, pescado seco, sacos de harina y cubo de achicar.
- Luz: sol alto con brillos en el agua.
- Vivos: olas, vela, cabeceo, espuma y gaviotas.

**semana3 · noche fondeados con luna llena (`s3_noche_mar`)**
1. Cielo: `nordicSky("noche", { moon: 1 })`, con la luna llena grande, halo y estrellas que titilan.
2. Lejos: la costa en silueta negra azulada.
3. Medio: el barco quieto con la vela recogida y los hombres dormidos bajo pieles y mantas.
4. Suelo: el mar oscuro con el **camino de la luna** (`moonPath`).
5. Primer plano: el borde de la regala y una cuerda, desenfocados.
- Atrezo: pieles enrolladas (sin decir de qué animal: NO USAR n.º 8), mantas, arcones, ancla de piedra con cuerda, barril, cubo y cuerno.
- Luz: azul plata de luna con viñeteado fuerte.
- Vivos: estrellas, reflejo, balanceo lento y la respiración de los durmientes.

**semana4 · la calle de Hedeby (`s4_mercado`)**
1. Cielo: `nordicSky("dia")` con humo de los talleres mezclado con las nubes; gaviotas.
2. Lejos: tejados de paja a dos aguas y mástiles del puerto; **sin muralla**.
3. Medio: casas de entramado con tejado de paja, talleres abiertos (peinero, cuentero y herrero) y puestos con toldo.
4. Suelo: **pasarela de tablones** con el arroyo entablado al lado, barro entre tablas y sombras de contacto.
5. Primer plano: un barril, un cesto de cuentas y el poste de una cerca, desenfocados.
- Atrezo: balanza plegable de Poppo, plata picada en un paño, peines de asta, cuentas de vidrio, pieles, piedras de afilar, jarras, tela y astas de reno.
- Luz: día animado; el herrero echa chispas.
- Vivos: toldos, humo, chispas, el agua del arroyo y la gente que pasa.

**semana4 · el rincón de los esclavos (`s4_esclavos`)**
1. Cielo: `nordicSky("nublado")`, gris bajo sin sol.
2. Lejos: los mástiles y tejados de Hedeby, apagados.
3. Medio: el extremo del muelle con un cobertizo y un poste.
4. Suelo: tablones mojados con charcos.
5. Primer plano: cuerdas y un barril, desenfocados y oscuros.
- Atrezo: grilletes (`shackle`), collar de hierro, cadena en el poste, balanza en un barril, cuerda y un manto raído.
- Luz: desaturada y fría (`tint("frio")`), sin brillos.
- Vivos: lluvia fina o llovizna (líneas diagonales lentas), agua en los charcos y una cuerda que se balancea.
- Tono: respeto. Nada de gags. La esclava mira a cámara un instante.

**inserto · Bayreuth, 1876 (`ins_1876`, M1)**
1. Cielo: el decorado pintado del fondo (un cielo de teatro con nubes dibujadas).
2. Lejos: rocas pintadas de cartón y un fresno de decorado.
3. Medio: el telón rojo con flecos dorados que se abre.
4. Suelo: tablas del escenario con candilejas en el borde.
5. Primer plano: cabezas del público en silueta y el borde del palco, desenfocados.
- Atrezo: casco con cuernos (sobre `opera`), lanza de atrezo, escudo pintado, candilejas, telón y un atril con partitura.
- Luz: candilejas amarillas desde abajo.
- Vivos: telón que se abre, candilejas que titilan y el cantante que abre la boca (`talk`). Al terminar la frase: `stampX` rojo sobre el casco.

**balance · la granja al atardecer (`balance`)**
1. Cielo: `nordicSky("atardecer")` con el sol bajo y gaviotas que vuelven.
2. Lejos: el fiordo rosado con el barco de Gokstad pequeño, ya varado.
3. Medio: la casa larga con humo y la balanza grande.
4. Suelo: el campo con los brotes **más altos** que en la semana 1 (ha pasado un mes).
5. Primer plano: abedules y cerca, desenfocados.
- Atrezo: balanza, plata picada, escudo, remo, cesto de semilla, cuerno de beber y peine.
- Luz: contraluz rosado.
- Vivos: humo, brotes, gaviotas y los platillos de la balanza que oscilan antes de quedarse quietos.

**cierre · la granja de noche (`cierre`)**
1. Cielo: `nordicSky("noche", { moon: 0 })`, sin luna, con estrellas y una aurora suave.
2. Lejos: el fiordo y las montañas en negro azulado.
3. Medio: la casa larga con la puerta abierta y la luz del hogar saliendo.
4. Suelo: prado azulado con la sombra larga de la puerta.
5. Primer plano: cerca y abedul en silueta.
- Atrezo: casa, leña, cerca, carretilla, el escudo colgado junto a la puerta, el perro tumbado y el barco a lo lejos.
- Luz: azul noche con el rectángulo cálido de la puerta y viñeteado.
- Vivos: estrellas, aurora, humo y la cola del perro.

---

## 3. Fuentes

- **Texto**: Inter (ya en el proyecto), Black 900 para rótulos y 700 para subtítulos.
- **Título**: **Uncial Antiqua** (Google Fonts, licencia OFL), archivo `UncialAntiqua-Regular.ttf`. Imita la letra uncial de los manuscritos insulares de los siglos VIII-IX, la que veían los vikingos en los monasterios de las islas británicas. Las runas se usan solo como adorno, nunca en el título, porque el público no podría leerlas.
- **Adorno opcional**: una fila de runas del futhark joven (16 runas, el alfabeto que se usaba en el 890) como orla del título, dibujada como texto en una fuente con runas Unicode (Noto Sans Runic, OFL). **Nada de futhark antiguo** (24 runas): en el 890 ya no se usaba.
- Producción descarga los dos TTF a `fonts/` (la raíz no tiene esa carpeta todavía; `miniatura.mjs` la necesita).

## 4. Música (`scripts/audio.py`)

Evocación, no reconstrucción: no se conserva ninguna melodía vikinga.

| parámetro | valor |
|---|---|
| Tempo | **84 BPM** (paso de remo tranquilo). En Hedeby (semana 4), 96 BPM. En el rincón de los esclavos, sin pulso: solo el dron |
| Escala | **re dórico**: 146,8 · 164,8 · 174,6 · 196,0 · 220,0 · 246,9 · 261,6 · 293,7 Hz (flauta una octava arriba) |
| Dron | re grave (73,4 Hz) y su quinta (110 Hz), con vaivén lento (periodo de 23 s), como un cuerno o una lira rasgueada al aire |
| Lira | cuerdas pulsadas con **Karplus-Strong** (ruido de 5 ms en un búfer de periodo `SR/f`, con media de dos muestras y factor de 0,996): arpegios de re-la-re y do-sol-do cada 2 compases, volumen 0,07 |
| Tambor de marco | grave en 1 y 3 (función `drum(62, 0.6, 9, 0.5)` que ya existe), suave en 2 y 4; en el mar, solo en 1 (como el golpe del remo) |
| Flauta de hueso | la de `audio.py` actual, con la escala de re dórico, vibrato de 5,5 Hz y algo más de soplo (ruido al 6 %); notas sueltas con probabilidad de 0,35 |
| Por capítulo | gancho: dron y lira; semana 1: flauta y lira; semana 2: tambor más presente; semana 3: dron, tambor en 1 y olas; semana 4: 96 BPM con lira rápida; balance y cierre: solo dron y flauta |

### 4.1 Efectos que hay que sintetizar (añadir a `KIND` como `"SINTE"`, igual que `crowd`)

| clave | cómo se hace | dónde |
|---|---|---|
| `waves` | ruido blanco con paso bajo (convolución de 30 muestras) y envolvente de oleaje (0,1 Hz) que sube y baja durante 4 s | mar, varadero |
| `wind` | ruido con paso banda (300-900 Hz) y modulación lenta, más un aleteo de tela (ráfagas de ruido de 40 ms a 6-8 Hz) | vela que se hincha |
| `creak` | crujido de madera: senoide de 90 → 70 Hz con pulsos rápidos (tren de 25 Hz) y 0,6 s de duración | cabeceo del barco, puerta de la casa |
| `oar` | golpe del remo: ruido corto con paso bajo (salpicadura) y golpe grave de 80 Hz | cada palada en `s3_remo` |
| `clank` | choque de armas: 4 parciales inarmónicos (520, 1.310, 2.240 y 3.170 Hz) con caída rápida y algo de ruido; 3 o 4 seguidos en el *vápnatak* | *thing* |
| `silver` | tintineo de plata: 2-3 pings altos (2.800-4.200 Hz) con caída de 0,25 s | balanza y plata picada |
| `gull` | gaviota: barrido FM de 1.800 a 1.200 Hz con vibrato y 0,4 s, dos o tres veces | cielos de costa |
| `chain` | cadena: 5-8 clics metálicos irregulares (como `clank`, más cortos y graves) | grilletes |
| `hammer` | martillo del herrero: golpe metálico de 900 Hz con caída de 0,15 s, en bucle a 1,5 Hz | calle de Hedeby |
| `sheep` | balido: senoide de 380 Hz con vibrato de 7 Hz, formante nasal (suma de armónicos 2-4) y 0,8 s | granja |
| `fireCrackle` | crepitar: pulsos de ruido muy cortos y aleatorios (Poisson, 6 por segundo) | hogar y campamento |

Volúmenes de partida: `waves` −24 dB, `wind` −26, `creak` −22, `oar` −20, `clank` −16, `silver` −20, `gull` −24, `chain` −20, `hammer` −24, `sheep` −22 y `fireCrackle` −26. Los demás (`pop`, `whoosh`, `impact`…) siguen como están. Volumen final de la mezcla: −14 LUFS.

---

## 5. Miniatura (`miniaturas/vikingo.json`)

- **Protagonista**: Ulf con la cara sorprendida (la pose de `hero()`), con capa, escudo redondo amarillo y negro y hacha. **Sin casco**.
- **Pregunta-gancho** (4 palabras): «¿TE IRÍAS DE **VIKINGO**?», con «VIKINGO» en amarillo. Juega con el mito M3: «irse de vikingo» era una actividad, no un pueblo.
- **Sello**: «0 CUERNOS» (el dato más llamativo: no hay ni un casco vikingo con cuernos, M1). Si se quiere otro, «5 DÍAS EN BARCO ABIERTO» (n.º 1).
- **Iconos** (Phosphor): `sailboat` (el barco), `axe` (el hacha) y `scales` (la plata a peso).
- **Título**: «UN MES EN LA VIDA DE UN» en Inter Black y «VIKINGO» en **Uncial Antiqua**.

```json
{"character":"ulf","props":{"T":"cloak","F":"shieldRound","B":"axe"},"titleFont":"UncialAntiqua-Regular.ttf","top":"UN MES EN LA VIDA DE UN","who":"VIKINGO",
 "hook":"¿TE IRÍAS DE <b>VIKINGO</b>?","badge":"0 CUERNOS",
 "theme":{"glow":"#ffd08a","mid":"#3f6a8a","dark":"#16223f","ground":"#6f8f4a","accent":"#ffd34d","title":"#dfe4ea","badge":"#9e3a2a"},
 "extras":[{"icon":"sailboat","size":160,"color":"#dfe4ea","pos":["left:600px;top:430px","left:80px;top:1140px"]},
           {"icon":"axe","size":110,"color":"#c9ced6","pos":["left:40px;top:470px","left:860px;top:840px"]},
           {"icon":"scales","size":100,"color":"#d9a72b","pos":["left:560px;top:240px","left:880px;top:1150px"]}]}
```

Notas para Producción:
- `miniatura.mjs` coge una sola clave de `GEAR` por ranura: `cloak`, `shieldRound` y `axe` tienen que estar ya en `GEAR` (apartado 1.3).
- El hacha va en `B` sin `back()`: la pose de sorpresa sube el brazo trasero y así se ve. Si tapa la cara en la captura, se cambia a `"B":"knife"`.
- Comprobar que los tres iconos existen en `build/node_modules/@phosphor-icons/core/assets/fill/` (`sailboat-fill.svg`, `axe-fill.svg` y `scales-fill.svg`). Si alguno falta, se usa `boat`, `sword` o `coins`.
- `UncialAntiqua-Regular.ttf` va en `fonts/`.

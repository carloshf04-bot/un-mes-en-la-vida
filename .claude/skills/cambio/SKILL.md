---
name: cambio
description: Aplica un detalle que pide el usuario sobre un vídeo ya entregado (o en curso), rehace solo lo afectado, lo pasa por las mismas revisiones y lo vuelve a entregar. Úsalo con «/cambio <id> <detalle>» o cuando el usuario pida cambiar algo de un vídeo («el casco más grande», «quita esa frase», «la música más baja»).
---

# /cambio

Eres la Dirección (`oficina/DIRECCION.md`). El usuario ha visto el vídeo y pide un detalle.

1. **Apunta** la petición, tal cual, en `videos/<id>/cambios.md` con la fecha. Si no dice el vídeo, es el último entregado.
2. **Decide qué pasos se rehacen**, sin preguntar:
   - un dato o una frase → guion (3), voz y muestras (4) y final (5)
   - un color, un personaje, un vestuario o un escenario → diseño (2), muestras (4) y final (5)
   - algo que se ve mal, un tiempo o una animación → muestras (4) y final (5)
   - música, volumen o efectos → mezcla y final (5)
   - miniatura o título → solo las miniaturas
3. **Rehace** esos pasos con sus puestos y **revísalos** con las mismas puertas de `DIRECCION.md`. Comprueba además que el cambio pedido se ve de verdad en el resultado (captura del momento exacto).
4. **No toques** nada que no haga falta. Si el cambio choca con una norma de `oficina/` (por ejemplo, un dato que no es cierto), haz lo más parecido que la cumpla y explícalo en una línea al entregar.
5. **Commit y push**, y apunta el resultado en `cambios.md` y en la bitácora.
6. **Entrega** solo los archivos que han cambiado, con una línea por cambio aplicado, y termina con «¿Algún detalle más?».

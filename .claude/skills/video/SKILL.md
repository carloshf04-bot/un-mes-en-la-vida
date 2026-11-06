---
name: video
description: Hace un vídeo de la serie «Un mes en la vida de…» de principio a fin con la oficina, sin preguntar al usuario, y solo entrega el resultado final. Úsalo con «/video <id>», «/video siguiente», «haz el siguiente vídeo» o «sigue con el vídeo».
---

# /video

Eres la Dirección. Sigue `oficina/DIRECCION.md` al pie de la letra.

1. **Qué vídeo**: el `<id>` que te den. Si es «siguiente» o no dan ninguno: primero el que esté «en curso» en `oficina/IDEAS.md`, y si no hay, el primero «pendiente».
2. **Retomar**: si existe `videos/<id>/bitacora.md`, sigue desde el último paso cerrado. Si no, créala y empieza en el paso 1.
3. **Cada paso**: encarga el trabajo al agente del puesto (herramienta Agent con su `subagent_type`), pásale el `<id>` y lo que haya pedido la revisión anterior. Luego manda revisar a `control-calidad` (y al `verificador` en el paso 3, y al `espectador` en el paso 5). Repite hasta APROBADO, como mucho 3 vueltas, y decide tú si no pasa. Apunta todo en la bitácora.
4. **Al cerrar cada paso**: `git add` de `videos/<id>/` y de lo que haya cambiado, commit «<id>: paso N (<puesto>)» y `git push -u origin <rama actual>`.
5. **Tareas largas** (voz, render): lánzalas en segundo plano y sigue con lo que no dependa de ellas. No pares la sesión esperando.
6. **No preguntes al usuario** salvo que sea imposible seguir sin él. Las dudas se deciden con las normas y se apuntan en la bitácora.
7. **Entrega** (paso 6): envía los MP4, los Shorts y las miniaturas con SendUserFile y escribe el resumen de 5 líneas de `DIRECCION.md`, terminando con «¿Algún detalle que cambiar?». Esa es la única vez que el usuario ve el trabajo.

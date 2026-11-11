#!/usr/bin/env bash
# Render por tramos (180 s por defecto, TAM=…) que se puede retomar: si la sesión se corta, solo se repite el tramo a medias.
# Uso (desde videos/<id>/): bash scripts/render_tramos.sh h|v
# Salida: entregas/video-FINAL-horizontal.mp4 o entregas/video-FINAL-vertical.mp4
set -euo pipefail
cd "$(dirname "$0")/.."
F=${1:?h o v}; NOMBRE=$([ "$F" = h ] && echo horizontal || echo vertical)
DIR=hf-$F; T=entregas/tramos_$F; mkdir -p "$T"
DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 audio/mezcla.wav)
TAM=${TAM:-180}   # segundos por tramo (cada render tiene unos minutos fijos de preparación)
i=0; S=0
# los tramos ya hechos (con su .ok) se conservan, sea cual sea su tamaño
while [ -s "$T/$(printf %03d $i).mp4.ok" ]; do S=$(python3 -c "print(round($S + float(open('$T/$(printf %03d $i).mp4.ok').read())))"); i=$((i+1)); done
while python3 -c "import sys; sys.exit(0 if $S < $DUR - 0.05 else 1)"; do
  OUT=$T/$(printf %03d $i).mp4
  E=$(python3 -c "print(min($S+$TAM, $DUR))")
  rm -f "$OUT"
  (cd $DIR && npx -y hyperframes@0.9.12 render --start $S --end $E -w 3 -o ../$OUT --quiet)
  ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUT" > "$OUT.ok"
  echo "tramo $((i+1)) listo: $S-$E s"
  S=$(python3 -c "print(round(float('$E'), 3))"); i=$((i+1))
done
# Une la imagen de los tramos y pone la mezcla entera como audio (sin cortes de sonido entre tramos)
ls $T/*.mp4 | sed "s|^|file '$PWD/|; s|$|'|" > $T/lista.txt
ffmpeg -v error -y -f concat -safe 0 -i $T/lista.txt -i audio/mezcla.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest entregas/video-FINAL-$NOMBRE.mp4
echo "FIN $NOMBRE: $(ffprobe -v error -show_entries format=duration -of csv=p=0 entregas/video-FINAL-$NOMBRE.mp4) s"

#!/usr/bin/env bash
# Re-renderiza solo unas ventanas de tiempo y las inserta en el vídeo ya hecho (mucho más rápido que todo).
# Uso (desde videos/<id>/): bash scripts/parchear.sh h "20-28 182-216 ..."
# Toma entregas/video-FINAL-<formato>.mp4 (lo guarda como .anterior.mp4), sustituye las ventanas
# y pone audio/mezcla.wav como audio. Se puede retomar: las ventanas ya hechas tienen su .ok.
set -euo pipefail
cd "$(dirname "$0")/.."
F=${1:?h o v}; VENT=${2:?ventanas «a-b» en segundos enteros}
NOMBRE=$([ "$F" = h ] && echo horizontal || echo vertical)
FIN=entregas/video-FINAL-$NOMBRE.mp4; ANT=entregas/video-FINAL-$NOMBRE.anterior.mp4
P=entregas/parches_$F; mkdir -p $P
[ -s $ANT ] || cp $FIN $ANT
DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 audio/mezcla.wav)
ENC="-an -c:v libx264 -preset medium -crf 16 -pix_fmt yuv420p -r 30"
# 1) render de las ventanas
for w in $VENT; do
  a=${w%-*}; b=${w#*-}; OUT=$P/v_$a-$b.mp4
  [ -s $OUT.ok ] && continue
  (cd hf-$F && npx -y hyperframes@0.9.12 render --start $a --end $b -w 3 -o ../$OUT --quiet)
  echo ok > $OUT.ok; echo "ventana $a-$b lista"
done
# 2) piezas: lo de antes entre ventanas + las ventanas nuevas, todo con la misma codificación
: > $P/lista.txt; t=0; n=0
pieza() { n=$((n+1)); local o=$P/p_$(printf %02d $n).mp4; ffmpeg -v error -y "$@" $ENC $o; echo "file '$PWD/$o'" >> $P/lista.txt; }
for w in $VENT; do
  a=${w%-*}; b=${w#*-}
  [ "$a" -gt "$t" ] && pieza -ss $t -t $((a-t)) -i $ANT
  pieza -i $P/v_$a-$b.mp4
  t=$b
done
pieza -ss $t -i $ANT
# 3) unión y audio nuevo
ffmpeg -v error -y -f concat -safe 0 -i $P/lista.txt -i audio/mezcla.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest $FIN
echo "FIN parche $NOMBRE: $(ffprobe -v error -show_entries format=duration -of csv=p=0 $FIN) s (voz $DUR s)"

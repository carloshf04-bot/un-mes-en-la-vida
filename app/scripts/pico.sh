#!/usr/bin/env bash
# Rebaja el pico real del largo ya hecho a ≤ -1 dBTP sin tocar el vídeo (limitador + AAC), conservando -14 LUFS.
# Uso: bash scripts/pico.sh <slug>   (desde app/; después hay que rehacer los shorts con --rehacer)
set -eu
cd "$(dirname "$0")/../../salida/$1"
ffmpeg -y -v error -i largo.mp4 -c:v copy -af "volume=0.3dB,alimiter=limit=0.75:level=false" -c:a aac -b:a 192k -ar 48000 -movflags +faststart largo-pico.mp4
mv largo-pico.mp4 largo.mp4
ffmpeg -hide_banner -nostats -i largo.mp4 -af ebur128=peak=true -f null - 2>&1 | grep -E "^\s+(I|Peak):"

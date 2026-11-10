#!/usr/bin/env bash
# Cierre técnico de uno o varios episodios ya renderizados: si el pico real pasa de -1 dBTP lo corrige
# (scripts/pico.sh) y después corta los shorts del largo definitivo.
# Uso: bash scripts/cierre.sh <slug> [<slug>…]   (desde app/)
set -u
cd "$(dirname "$0")/.."
for slug in "$@"; do
  tp=$(ffmpeg -hide_banner -nostats -i "../salida/$slug/largo.mp4" -af ebur128=peak=true -f null - 2>&1 | awk '/Peak:/{p=$2} END{print p}')
  echo "===== $slug: pico $tp dBTP ====="
  if awk "BEGIN{exit !($tp > -1.2)}"; then bash scripts/pico.sh "$slug"; rm -rf "../salida/$slug/shorts"; fi
  node scripts/shorts.mjs "$slug" || echo "FALLO shorts $slug"
  echo "===== $slug: CIERRE LISTO ====="
done

#!/usr/bin/env bash
# Render del largo (+ mezcla a -14 LUFS + miniaturas) y shorts de uno o varios episodios, en serie.
# Uso: bash scripts/render.sh <slug> [<slug>…]   (desde app/; la voz ya revisada con scripts/voces.sh)
set -u
cd "$(dirname "$0")/.."
for slug in "$@"; do
  echo "===== $slug: render ====="
  if [ ! -s "../salida/$slug/largo.mp4" ]; then
    node scripts/producir.mjs "$slug" || { echo "FALLO render $slug"; continue; }
  fi
  echo "===== $slug: shorts ====="
  node scripts/shorts.mjs "$slug" || echo "FALLO shorts $slug"
  echo "===== $slug: RENDER LISTO ====="
done

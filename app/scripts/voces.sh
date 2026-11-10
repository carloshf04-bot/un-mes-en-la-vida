#!/usr/bin/env bash
# Voz + revisión con whisper de uno o varios episodios, en serie (reanudable).
# Uso: bash scripts/voces.sh <slug> [<slug>…]   (desde app/)
# Por cada episodio: producir --sin-render --muestras → revisar_voz → (regenerar lo que falle, hasta 3 vueltas)
# → producir --sin-render (mete los tiempos de whisper en el manifiesto). No renderiza.
set -u
cd "$(dirname "$0")/.."
for slug in "$@"; do
  echo "===== $slug: voz ====="
  node scripts/producir.mjs "$slug" --sin-render --muestras || { echo "FALLO producir $slug"; continue; }
  for vuelta in 1 2 3 4; do
    echo "===== $slug: revisión $vuelta ====="
    node scripts/revisar_voz.mjs "$slug"; r=$?
    if [ $r -eq 3 ]; then node scripts/producir.mjs "$slug" --sin-render || break; else break; fi
  done
  node scripts/producir.mjs "$slug" --sin-render
  echo "===== $slug: VOZ LISTA (revisión $r) ====="
done

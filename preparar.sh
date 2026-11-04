#!/usr/bin/env bash
# Prepara el entorno del estudio en una máquina nueva (sesión en la nube incluida).
set -euo pipefail
cd "$(dirname "$0")"
if [ ! -x .venv/bin/piper ]; then
  python3 -m venv .venv
  .venv/bin/pip install -q piper-tts
fi
mkdir -p voces salida investigacion
for v in es/es_MX/claude/high/es_MX-claude-high es/es_MX/ald/medium/es_MX-ald-medium es/es_ES/davefx/medium/es_ES-davefx-medium es/es_ES/sharvard/medium/es_ES-sharvard-medium; do
  n=$(basename "$v")
  [ -s "voces/$n.onnx" ] || curl -sSL -o "voces/$n.onnx" "https://huggingface.co/rhasspy/piper-voices/resolve/main/$v.onnx"
  [ -s "voces/$n.onnx.json" ] || curl -sSL -o "voces/$n.onnx.json" "https://huggingface.co/rhasspy/piper-voices/resolve/main/$v.onnx.json"
done
(cd app && npm ci --no-audit --no-fund)
echo "✅ Estudio listo. Prueba: cd app && node scripts/producir.mjs farero-1890 --sin-render --muestras"

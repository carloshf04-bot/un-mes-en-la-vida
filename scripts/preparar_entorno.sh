#!/usr/bin/env bash
# Prepara las herramientas de producción en una máquina nueva. Comandos probados el 2026-11-06.
# Uso: bash scripts/preparar_entorno.sh
set -euo pipefail
cd /home/user
# 1) Python con Chatterbox (voz) y Piper (voz de referencia)
[ -x venv-cb/bin/python ] || uv venv -p python3.11 venv-cb
uv pip install -p venv-cb/bin/python chatterbox-tts "setuptools<81" num2words soundfile piper-tts
# 2) HyperFrames
npx -y hyperframes@0.9.12 --version
# 3) Voz de referencia «sharvard» (ya está en el repo; esto la regenera si falta)
REPO=/home/user/un-mes-en-la-vida
if [ ! -f $REPO/oficina/voz/piper_sharvard_0.wav ]; then
  mkdir -p piper-voces && (cd piper-voces && /home/user/venv-cb/bin/python -m piper.download_voices es_ES-sharvard-medium)
  echo "Hoy vas a remar durante días por un mar helado, y no hay vuelta atrás. Esto es un mes en la vida de un vikingo." \
    | (cd piper-voces && /home/user/venv-cb/bin/python -m piper -m es_ES-sharvard-medium -s 0 -f $REPO/oficina/voz/piper_sharvard_0.wav)
fi
# 4) whisper large-v3 (se instala con la primera transcripción)
(cd /tmp && npx -y hyperframes@0.9.12 transcribe -e whisper -m large-v3 -l es --timeout 1200000 $REPO/oficina/voz/piper_sharvard_0.wav)

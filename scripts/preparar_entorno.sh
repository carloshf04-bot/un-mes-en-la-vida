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
# 4) whisper.cpp (lo compila HyperFrames) y el modelo large-v3 (con curl: la descarga de HyperFrames no pasa por el proxy)
(cd /tmp && npx -y hyperframes@0.9.12 transcribe -e whisper -m small -l es $REPO/oficina/voz/piper_sharvard_0.wav || true)
M=~/.cache/hyperframes/whisper/models/ggml-large-v3.bin
if [ ! -s $M ]; then
  mkdir -p $(dirname $M)
  curl -sSL --fail -o $M.part https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-large-v3.bin && mv $M.part $M
fi
~/.cache/hyperframes/whisper/whisper.cpp/build/bin/whisper-cli -m $M -l es -f $REPO/oficina/voz/piper_sharvard_0.wav 2>/dev/null | tail -2
# Red necesaria: huggingface.co y sus CDN (us.gcp.cdn.hf.co, cas-bridge.xethub.hf.co…), ya en el entorno «un-mes-en-la-vida».
# 5) Dependencias de cada vídeo (gsap, iconos Phosphor y la plantilla de HyperFrames), probado el 2026-11-09 con el vikingo:
#    cd videos/<id>/build && npm install          (package.json con gsap ^3.12.5 y @phosphor-icons/core ^2.1.1)
#    la plantilla (hyperframes.json, package.json, meta.json) sale de: npx -y hyperframes@0.9.12 init plant --example blank --non-interactive --skip-skills
#    Chrome del sistema (/usr/bin/google-chrome) lo encuentra solo: npx hyperframes@0.9.12 doctor

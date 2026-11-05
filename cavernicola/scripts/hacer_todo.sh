#!/usr/bin/env bash
# Rehace el vídeo completo: voz -> tiempos -> sonido -> composición -> render -> Shorts.
# Uso: bash scripts/hacer_todo.sh            (todo)
#      bash scripts/hacer_todo.sh --sin-voz  (no regenera la voz; usa voz/ tal cual)
set -euo pipefail
cd "$(dirname "$0")/.."
PY=/home/user/venv-cb/bin/python
mkdir -p entregas/shorts

if [[ "${1:-}" != "--sin-voz" ]]; then
  # 1) Voz frase a frase con Chatterbox (solo rehace las frases que cambien) + comprobación con whisper
  HF_HUB_DISABLE_XET=1 $PY scripts/voz_cb.py
fi

# 2) Sonido: se generan las marcas de efectos (iguales en los dos formatos) y se mezcla a -14 LUFS
node scripts/gen.mjs h --voz voz.wav --out hf-h
$PY scripts/audio.py hf-h/sfx_cues.json voz.wav audio/mezcla.wav

# 3) Composiciones con la mezcla como audio
for f in h v; do
  node scripts/gen.mjs $f --voz audio/mezcla.wav --out hf-$f
  node scripts/gen.mjs $f --voz audio/mezcla.wav --out hf-$f-sinsubs --sin-subs
done

# 4) Comprobaciones y render
for d in hf-h hf-v hf-h-sinsubs hf-v-sinsubs; do
  (cd $d && npx hyperframes check --json > ../entregas/check_$d.json || true)
done
(cd hf-h && npx hyperframes render -o ../entregas/video-FINAL-horizontal.mp4 -w 2 --quiet)
(cd hf-v && npx hyperframes render -o ../entregas/video-FINAL-vertical.mp4 -w 2 --quiet)
(cd hf-h-sinsubs && npx hyperframes render -o ../entregas/video-SIN-SUBTITULOS-horizontal.mp4 -w 2 --quiet)
(cd hf-v-sinsubs && npx hyperframes render -o ../entregas/video-SIN-SUBTITULOS-vertical.mp4 -w 2 --quiet)

# 5) Shorts de menos de 3 minutos cortados por capítulos
$PY scripts/shorts.py entregas/video-FINAL-vertical.mp4 voz/frases.json entregas/shorts

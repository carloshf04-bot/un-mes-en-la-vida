set -x
cd /home/user/un-mes-en-la-vida/videos/vikingo
node scripts/gen.mjs h --voz voz.wav --out hf-h
/home/user/venv-cb/bin/python scripts/audio.py hf-h/sfx_cues.json voz.wav audio/mezcla.wav voz/frases.json
ffmpeg -hide_banner -i audio/mezcla.wav -af ebur128=peak=true -f null - 2>&1 | grep -A20 Summary | grep -E "I:|LRA:|Peak:"
for f in h v; do node scripts/gen.mjs $f --voz audio/mezcla.wav --out hf-$f; done
(cd hf-h && timeout 2400 npx -y hyperframes@0.9.12 check --json > ../pruebas/check_fin_h.json 2>/dev/null)
(cd hf-v && timeout 2400 npx -y hyperframes@0.9.12 check --json > ../pruebas/check_fin_v.json 2>/dev/null)
mkdir -p entregas
(cd hf-h && npx -y hyperframes@0.9.12 render -o ../entregas/video-FINAL-horizontal.mp4 -w 3) > pruebas/render_h.log 2>&1
(cd hf-v && npx -y hyperframes@0.9.12 render -o ../entregas/video-FINAL-vertical.mp4 -w 3) > pruebas/render_v.log 2>&1
echo FIN_TODO

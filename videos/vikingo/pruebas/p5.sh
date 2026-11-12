set -x
cd /home/user/un-mes-en-la-vida/videos/vikingo
cp audio/mezcla.wav pruebas/mezcla_antes_p5.wav
node scripts/gen.mjs h --voz voz.wav --out hf-h
/home/user/venv-cb/bin/python scripts/audio.py hf-h/sfx_cues.json voz.wav audio/mezcla.wav voz/frases.json
ffmpeg -hide_banner -i audio/mezcla.wav -af ebur128=peak=true -f null - 2>&1 | grep -A20 Summary | grep -E "I:|LRA:|Peak:"
for f in h v; do node scripts/gen.mjs $f --voz audio/mezcla.wav --out hf-$f; done
AT=25.17,186.78,189.37,201.16,205.11,212.58,310.64,313.46,315.74,322.55,323.55,416.66,418.85,571.36,575.6,650.35,654.36,657.47,673.14,675.18,680.7
rm -rf pruebas/p5_h pruebas/p5_v
(cd hf-h && timeout 3000 npx -y hyperframes@0.9.12 snapshot --at $AT --no-end --timeout 170000 -o ../pruebas/p5_h > ../pruebas/snap_p5_h.log 2>&1)
(cd hf-v && timeout 3000 npx -y hyperframes@0.9.12 snapshot --at $AT --no-end --timeout 170000 -o ../pruebas/p5_v > ../pruebas/snap_p5_v.log 2>&1)
echo SNAPS_OK
(cd hf-h && timeout 2400 npx -y hyperframes@0.9.12 check --json > ../pruebas/check_p5_h.json 2>/dev/null)
(cd hf-v && timeout 2400 npx -y hyperframes@0.9.12 check --json > ../pruebas/check_p5_v.json 2>/dev/null)
echo FIN_P5

cd /home/user/un-mes-en-la-vida/videos/vikingo
rm -rf pruebas/p5_h2; (cd hf-h && timeout 1500 npx -y hyperframes@0.9.12 snapshot --at 675.18,738.55 --no-end --timeout 170000 -o ../pruebas/p5_h2 > pruebas_snap.log 2>&1)
echo SNAP_OK
(cd hf-h && timeout 2400 npx -y hyperframes@0.9.12 check --json > ../pruebas/check_p5_h.json 2>/dev/null)
echo CHECK_H
(cd hf-v && timeout 2400 npx -y hyperframes@0.9.12 check --json > ../pruebas/check_p5_v.json 2>/dev/null)
echo FIN_P5

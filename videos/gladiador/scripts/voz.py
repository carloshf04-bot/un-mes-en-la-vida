# Genera la voz frase a frase con Kokoro (em_alex, español de España) y la une con pausas de 0,25 s.
# Uso: python3 scripts/voz.py guion.txt voz.wav [velocidad]
import sys, json, numpy as np, soundfile as sf
from kokoro_onnx import Kokoro
C = "/root/.cache/hyperframes/tts/"
src, out = sys.argv[1], sys.argv[2]
speed = float(sys.argv[3]) if len(sys.argv) > 3 else 1.0
k = Kokoro(C + "models/kokoro-v1.0.onnx", C + "voices/voices-v1.0.bin")
lines = [l.strip() for l in open(src, encoding="utf-8") if l.strip()]
parts, meta, t, sr = [], [], 0.0, 24000
for i, l in enumerate(lines):
    a, sr = k.create(l, voice="em_alex", speed=speed, lang="es")
    # recorta silencios al principio y al final de cada frase
    nz = np.where(np.abs(a) > 0.01)[0]
    a = a[max(0, nz[0] - 600): nz[-1] + 1200] if len(nz) else a
    meta.append({"i": i + 1, "text": l, "start": round(t, 3), "end": round(t + len(a) / sr, 3)})
    parts.append(a); t += len(a) / sr
    gap = 0.25 if i < len(lines) - 1 else 0.4
    parts.append(np.zeros(int(gap * sr), dtype=a.dtype)); t += gap
    print(f"{i+1}/{len(lines)} {t:.1f}s", flush=True)
sf.write(out, np.concatenate(parts), sr)
json.dump(meta, open(out.rsplit(".", 1)[0] + "_frases.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print("TOTAL", round(t, 2))

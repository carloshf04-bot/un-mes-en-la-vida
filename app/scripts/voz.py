# Genera todas las locuciones de una pieza en un solo proceso.
# Uso: python voz.py <modelo.onnx> <velocidad> <trabajos.json>   (trabajos = [{"texto":..., "salida":...}])
import json, sys, wave
from piper import PiperVoice, SynthesisConfig

modelo, velocidad, trabajos = sys.argv[1], float(sys.argv[2]), json.load(open(sys.argv[3]))
voz = PiperVoice.load(modelo)
cfg = SynthesisConfig(length_scale=1.0 / velocidad, noise_scale=0.6, noise_w_scale=0.8)
for t in trabajos:
    with wave.open(t["salida"], "wb") as wf:
        voz.synthesize_wav(t["texto"], wf, syn_config=cfg)
    print("ok", t["salida"], flush=True)

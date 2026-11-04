# Locución con Chatterbox Multilingual (Resemble AI, licencia MIT).
# Clona el timbre de una voz de referencia y añade expresividad ("exaggeration").
# Uso: python voz_chatterbox.py <referencia.wav> <trabajos.json>
#   trabajos = [{"texto": "...", "salida": "x.wav", "drama": 0.6}]
import json, re, sys, os, time
os.environ.setdefault("HF_HUB_DISABLE_XET", "1")
import torch, torchaudio as ta

torch.set_num_threads(os.cpu_count() or 4)
from chatterbox.mtl_tts import ChatterboxMultilingualTTS

ref, trabajos = sys.argv[1], json.load(open(sys.argv[2]))
dispositivo = "cuda" if torch.cuda.is_available() else "cpu"
modelo = ChatterboxMultilingualTTS.from_pretrained(device=dispositivo)
SR = modelo.sr


def frases(texto, maximo=220):
    # corta por frases y, si alguna es muy larga, por comas
    trozos = re.split(r"(?<=[.!?…])\s+", texto.strip())
    salida = []
    for t in trozos:
        while len(t) > maximo:
            corte = t.rfind(",", 0, maximo)
            corte = corte if corte > 40 else maximo
            salida.append(t[: corte + 1].strip())
            t = t[corte + 1 :].strip()
        if t:
            salida.append(t)
    return salida


for n, trabajo in enumerate(trabajos):
    if os.path.exists(trabajo["salida"]) and os.path.getsize(trabajo["salida"]) > 1000:
        print("ya existe", trabajo["salida"], flush=True)
        continue
    t0 = time.time()
    drama = float(trabajo.get("drama", 0.6))
    piezas = []
    for frase in frases(trabajo["texto"]):
        # Control de calidad: Chatterbox a veces corta la frase o "alucina" audio extra.
        # Duración esperada ≈ 0.07 s por carácter; si se sale mucho, se repite (hasta 3 intentos).
        esperado = 0.07 * len(frase)
        mejor = None
        for intento in range(3):
            torch.manual_seed(1234 + intento * 77 + n)
            wav = modelo.generate(
                frase,
                language_id="es",
                audio_prompt_path=ref,
                exaggeration=drama,
                cfg_weight=0.35 if drama >= 0.6 else 0.5,  # cfg bajo = ritmo más pausado y dramático
                temperature=0.75,
            )
            dur = wav.shape[1] / SR
            desvio = abs(dur - esperado) / max(esperado, 0.5)
            if mejor is None or desvio < mejor[0]:
                mejor = (desvio, wav)
            if 0.45 * esperado <= dur <= 1.9 * esperado + 0.6:
                break
            print(f"   reintento ({dur:.1f}s, esperado {esperado:.1f}s): {frase[:50]}", flush=True)
        piezas.append(mejor[1])
        piezas.append(torch.zeros(1, int(SR * 0.28)))  # respiración entre frases
    audio = torch.cat(piezas, dim=1)
    ta.save(trabajo["salida"], audio, SR)
    print(f"ok {n + 1}/{len(trabajos)} {trabajo['salida']} {audio.shape[1] / SR:.1f}s en {time.time() - t0:.0f}s", flush=True)

# Genera la voz completa con Chatterbox Multilingual (dramático) frase a frase,
# comprueba cada frase con whisper large-v3 y repite las que salgan mal.
# Las frases ya generadas se guardan en voz/lineas/ por su texto: si cambias una
# frase del guion, solo se regenera esa.
# Uso:  HF_HUB_DISABLE_XET=1 /home/user/venv-cb/bin/python scripts/voz_cb.py
import hashlib, json, os, re, subprocess, sys, time, unicodedata
import numpy as np, soundfile as sf, torch
from num2words import num2words

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
REF = "../../oficina/voz/piper_sharvard_0.wav"  # voz de referencia (sharvard), común a todos los vídeos
EXAG, CFG = 0.8, 0.3                           # "dramático"
WHISPER = os.path.expanduser("~/.cache/hyperframes/whisper/whisper.cpp/build/bin/whisper-cli")
WMODEL = os.path.expanduser("~/.cache/hyperframes/whisper/models/ggml-large-v3.bin")
OUT = "voz/lineas"; os.makedirs(OUT, exist_ok=True); os.makedirs("voz/tmp", exist_ok=True)
MAX_TRIES = 4

lines = [l.strip() for l in open("guion.txt", encoding="utf-8") if l.strip()]

# Pausa más larga al acabar cada capítulo: la cámara se aleja y viaja al siguiente
# finales de capítulo: la «frase final» de cada fila de la tabla de capítulos de guion_visual.md (menos el cierre)
_fins = [int(m) for m in re.findall(r"\|\s*(\d+)\. «[^|]*\|\s*$", "\n".join(l for l in open("guion_visual.md", encoding="utf-8") if l.startswith("|")), re.M)]
FIN_CAP = tuple(lines[n - 1][:30] for n in _fins[:-1])
def pause_after(t):
    if t.startswith(FIN_CAP):
        return 1.4
    if t in ("¿Es el final?",):
        return 0.7
    if t.endswith("?"):
        return 0.45
    return 0.3

def norm(s):
    s = re.sub(r"\d+(?:[.,]\d+)*", lambda m: " " + num2words(int(m.group().replace(".", "").replace(",", "")), lang="es") + " ", s)
    s = unicodedata.normalize("NFD", s.lower())
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    return re.sub(r"[^a-zñ ]+", " ", s).split()

# Cómo escribe whisper los nombres nórdicos que la voz dice bien: no son fallos de la voz
ALIAS = {"wolf": "ulf", "alvar": "hallvard", "edeby": "hedeby", "edebi": "hedeby", "caupan": "kaupang",
         "kaopang": "kaupang", "tin": "thing", "team": "thing", "fin": "thing", "carrie": "kari", "popo": "poppo",
         "heirmund": "geirmund", "irmun": "geirmund", "otar": "ottar", "vikingar": "vikingr",
         "laugardaggar": "laugardagr", "pabos": "pavos", "sai": "schlei"}

def similarity(a, b):
    """Parecido letra a letra (sin espacios), con los nombres de ALIAS igualados.
    Así «encubierta» = «en cubierta», y un final inventado o una palabra repetida bajan la nota."""
    import difflib
    a = "".join(ALIAS.get(w, w) for w in a); b = "".join(ALIAS.get(w, w) for w in b)
    return difflib.SequenceMatcher(None, a, b).ratio()

def key(t):
    return hashlib.sha1(f"{t}|{EXAG}|{CFG}|{REF}".encode()).hexdigest()[:12]

def trim(a, sr):
    nz = np.where(np.abs(a) > 0.015)[0]
    if not len(nz):
        return a
    return a[max(0, nz[0] - int(0.03 * sr)): min(len(a), nz[-1] + int(0.12 * sr))]

def transcribe(paths):
    """Transcribe cada frase con tiempos por palabra (whisper-cli, un arranque del modelo cada 20 frases).
    Devuelve {ruta: (texto, [segmentos con offsets en ms])}."""
    wavs = []
    for p in paths:
        w16 = "voz/tmp/" + os.path.basename(p)
        if not (os.path.exists(w16) and os.path.getmtime(w16) >= os.path.getmtime(p)):
            subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", p, "-ar", "16000", "-ac", "1", w16], check=True)
        wavs.append(w16)
    res = {}
    # reutiliza las transcripciones que ya existan (si la sesión se corta, no se repiten)
    hecho = [w for w in wavs if os.path.exists(w + ".json") and os.path.getmtime(w + ".json") >= os.path.getmtime(w)]
    falta = [w for w in wavs if w not in hecho]
    for i in range(0, len(falta), 20):
        chunk = falta[i:i + 20]
        subprocess.run([WHISPER, "-m", WMODEL, "-l", "es", "-t", "4", "-ml", "1", "-sow", "-oj", *sum((["-f", w] for w in chunk), [])],
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
        print(f"[whisper] {min(i + 20, len(falta))}/{len(falta)} nuevas transcritas", flush=True)
    for w, p in zip(wavs, paths):
        segs = json.load(open(w + ".json", encoding="utf-8"))["transcription"]
        res[p] = ("".join(x["text"] for x in segs).strip(), segs)
    return res

model = None
def gen(t, seed, path):
    global model
    if model is None:
        from chatterbox.mtl_tts import ChatterboxMultilingualTTS
        torch.set_num_threads(4)
        model = ChatterboxMultilingualTTS.from_pretrained(device="cpu")
    torch.manual_seed(seed)
    w = model.generate(t, language_id="es", audio_prompt_path=REF, exaggeration=EXAG, cfg_weight=CFG)
    a = trim(w.squeeze(0).numpy(), model.sr)
    sf.write(path, a, model.sr)

paths = [f"{OUT}/{key(t)}.wav" for t in lines]
CHK = "voz/comprobacion.json"
chk = json.load(open(CHK, encoding="utf-8")) if os.path.exists(CHK) else {}
# vuelve a puntuar lo ya comprobado con la regla actual
for t, p in zip(lines, paths):
    v = chk.get(os.path.basename(p))
    if v and os.path.exists(p):
        v["sim"] = round(similarity(norm(t), norm(v["oido"])), 3); v["ok"] = v["sim"] >= 0.92
report = {}
for attempt in range(MAX_TRIES):
    # genera lo que falte o lo que salió mal
    todo = [i for i, p in enumerate(paths) if not os.path.exists(p) or (os.path.basename(p) in chk and not chk[os.path.basename(p)]["ok"])]
    t0 = time.time()
    for n, i in enumerate(todo):
        gen(lines[i], 1000 * attempt + i, paths[i])
        chk.pop(os.path.basename(paths[i]), None)
        print(f"[intento {attempt+1}] {n+1}/{len(todo)} frase {i+1} · {(time.time()-t0)/60:.1f} min", flush=True)
    # comprueba con whisper lo que no esté comprobado
    tocheck = [i for i, p in enumerate(paths) if os.path.basename(p) not in chk]
    if not tocheck:
        break
    print(f"[whisper] comprobando {len(tocheck)} frases...", flush=True)
    tx = transcribe([paths[i] for i in tocheck])
    for i in tocheck:
        txt, segs = tx[paths[i]]
        sim = similarity(norm(lines[i]), norm(txt))
        chk[os.path.basename(paths[i])] = {"ok": sim >= 0.92, "sim": round(sim, 3), "oido": txt, "segs": segs}
    json.dump(chk, open(CHK, "w", encoding="utf-8"), ensure_ascii=False)
    bad = [i + 1 for i, p in enumerate(paths) if not chk[os.path.basename(p)]["ok"]]
    print(f"[intento {attempt+1}] frases con fallos: {bad}", flush=True)
    if not bad:
        break
report = {i: chk[os.path.basename(p)] for i, p in enumerate(paths) if os.path.basename(p) in chk}

# Une todo con pausas y guarda los tiempos de cada frase
sr = sf.info(paths[0]).samplerate
parts, meta, t = [], [], 0.0
for i, (l, p) in enumerate(zip(lines, paths)):
    a, _ = sf.read(p, dtype="float32")
    meta.append({"i": i + 1, "text": l, "start": round(t, 3), "end": round(t + len(a) / sr, 3),
                 **({k: report[i][k] for k in ("sim", "oido")} if i in report else {})})
    parts.append(a); t += len(a) / sr
    g = pause_after(l) if i < len(lines) - 1 else 2.0
    parts.append(np.zeros(int(g * sr), np.float32)); t += g
sf.write("voz/voz_cruda.wav", np.concatenate(parts), sr)
json.dump(meta, open("voz/frases.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
full = []
for m, p in zip(meta, paths):
    for sg in report.get(m["i"] - 1, {}).get("segs", []):
        o = sg["offsets"]
        full.append({"text": sg["text"], "offsets": {"from": int(o["from"] + m["start"] * 1000), "to": int(o["to"] + m["start"] * 1000)}})
json.dump({"transcription": full}, open("voz/whisper_completo.json", "w", encoding="utf-8"), ensure_ascii=False)
# Masterizado de la voz (sin cambiar velocidad ni tono)
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", "voz/voz_cruda.wav", "-af",
                "aresample=48000:resampler=soxr,highpass=f=70,equalizer=f=120:t=q:w=1:g=2,deesser=i=0.25,"
                "acompressor=threshold=-20dB:ratio=2.5:attack=8:release=150:makeup=2,loudnorm=I=-16:TP=-1.5:LRA=9",
                "-ar", "48000", "voz.wav"], check=True)
print("TOTAL", round(t, 2), "s · fallos que quedan:", [i + 1 for i in report if not report[i]["ok"]])
subprocess.run([sys.executable, "scripts/alinear.py", "voz/whisper_completo.json", "voz/frases.json", "voz/palabras.json"], check=True)

# Tiempos PROVISIONALES para ir maquetando mientras se genera la voz:
# usa la duración real de las frases ya generadas (voz/lineas/) y estima el resto; reparte las
# palabras de cada frase según su número de letras. Se sustituyen por los reales
# (whisper + alinear.py) antes del render final.
# Uso (desde videos/vikingo): python3 scripts/tiempos_provisionales.py
# Escribe SOLO voz/palabras_est.json, voz/frases_est.json y pruebas/silencio_est.wav.
import hashlib, json, os, re, subprocess, unicodedata
import wave
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); os.chdir(ROOT)
REF = "../../oficina/voz/piper_sharvard_0.wav"; EXAG, CFG = 0.8, 0.3   # igual que voz_cb.py
key = lambda t: hashlib.sha1(f"{t}|{EXAG}|{CFG}|{REF}".encode()).hexdigest()[:12]
lines = [l.strip() for l in open("guion.txt", encoding="utf-8") if l.strip()]
# finales de capítulo: la «frase final» de cada fila de la tabla de capítulos de guion_visual.md (menos el cierre)
_fins = [int(m) for m in re.findall(r"\|\s*(\d+)\. «[^|]*\|\s*$", "\n".join(l for l in open("guion_visual.md", encoding="utf-8") if l.startswith("|")), re.M)]
FIN_CAP = tuple(lines[n - 1][:30] for n in _fins[:-1])
def pa(t):
    if t.startswith(FIN_CAP): return 1.4
    if t in ("¿Es el final?",): return 0.7
    return 0.45 if t.endswith("?") else 0.3
def dur(p):
    try:
        with wave.open(p) as w: return w.getnframes() / w.getframerate()
    except Exception:
        return float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", p], capture_output=True, text=True).stdout)
norm = lambda w: re.sub(r"[^a-z0-9]", "", "".join(c for c in unicodedata.normalize("NFD", w.lower()) if unicodedata.category(c) != "Mn"))  # como normWord() de lib.mjs
fr, ws, t, reales = [], [], 0.0, 0
for i, l in enumerate(lines):
    p = f"voz/lineas/{key(l)}.wav"
    if os.path.exists(p): d = dur(p); reales += 1
    else: d = len(l) * 0.068
    fr.append({"i": i + 1, "text": l, "start": round(t, 3), "end": round(t + d, 3)})
    toks = [w for x in l.split() for w in x.split("-") if norm(w)]
    tot = sum(len(norm(w)) + 2 for w in toks); c = t
    for w in toks:
        dd = d * (len(norm(w)) + 2) / tot
        ws.append({"line": i + 1, "w": w, "n": norm(w), "start": round(c, 3), "end": round(c + dd, 3)}); c += dd
    t += d + (pa(l) if i < len(lines) - 1 else 2.0)
json.dump(fr, open("voz/frases_est.json", "w", encoding="utf-8"), ensure_ascii=False)
json.dump(ws, open("voz/palabras_est.json", "w", encoding="utf-8"), ensure_ascii=False)
os.makedirs("pruebas", exist_ok=True)
subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "lavfi", "-i", "anullsrc=r=48000:cl=mono", "-t", f"{t:.3f}", "pruebas/silencio_est.wav"], check=True)
print(f"frases {len(lines)} (con voz real {reales}) · fines de capítulo {_fins[:-1]} · duración estimada {t:.1f} s")

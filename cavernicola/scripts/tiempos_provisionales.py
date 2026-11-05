# Tiempos PROVISIONALES para ir maquetando mientras se genera la voz:
# usa la duración real de las frases ya generadas y estima el resto; reparte las
# palabras de cada frase según su número de letras. Se sustituyen por los reales
# (whisper + alinear.py) antes del render final.
import hashlib, json, os, re, soundfile as sf
REF = "pruebas/piper_sharvard_0.wav"; EXAG, CFG = 0.8, 0.3
key = lambda t: hashlib.sha1(f"{t}|{EXAG}|{CFG}|{REF}".encode()).hexdigest()[:12]
FIN_CAP = ("Esto es un mes en la vida de un cavernícola", "Pero aquí, entre amigos", "Hay que salir a cazar.",
           "Lo bueno: hoy comen como reyes.", "Nadie duerme mucho esa noche.", "Muchos grupos se movían a lo largo del año",
           "Quince mil años después")
def pa(t):
    if t.startswith(FIN_CAP): return 1.4
    if t.startswith("Semana") or t in ("Pintar.", "Y el dato más fuerte de todos.", "Nima tiene fiebre."): return 0.6
    return 0.45 if t.endswith("?") else 0.3
import unicodedata
norm = lambda w: re.sub(r"[^a-z0-9]", "", "".join(c for c in unicodedata.normalize("NFD", w.lower()) if unicodedata.category(c) != "Mn"))
lines = [l.strip() for l in open("guion.txt", encoding="utf-8") if l.strip()]
fr, ws, t = [], [], 0.0
for i, l in enumerate(lines):
    p = f"voz/lineas/{key(l)}.wav"
    d = sf.info(p).duration if os.path.exists(p) else len(l) * 0.068
    fr.append({"i": i + 1, "text": l, "start": round(t, 3), "end": round(t + d, 3)})
    toks = [w for x in l.split() for w in x.split("-") if norm(w)]
    tot = sum(len(norm(w)) + 2 for w in toks); c = t
    for w in toks:
        dd = d * (len(norm(w)) + 2) / tot
        ws.append({"line": i + 1, "w": w, "n": norm(w), "start": round(c, 3), "end": round(c + dd, 3)}); c += dd
    t += d + pa(l)
os.makedirs("voz", exist_ok=True)
json.dump(fr, open("voz/frases_est.json", "w", encoding="utf-8"), ensure_ascii=False)
json.dump(ws, open("voz/palabras_est.json", "w", encoding="utf-8"), ensure_ascii=False)
print("duración estimada", round(t, 1), "s")

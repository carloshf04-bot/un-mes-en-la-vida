# Alinea la transcripción de whisper (palabra a palabra) con el guion.
# Resultado: voz/palabras.json con cada palabra DEL GUION y su inicio/fin en la voz,
# y un informe de diferencias (palabras que faltan o sobran).
# Uso: python scripts/alinear.py <whisper.json> <frases.json> <salida palabras.json>
import json, re, sys, unicodedata, difflib
from num2words import num2words

wj, fj, out = sys.argv[1:4]
frases = json.load(open(fj, encoding="utf-8"))

def norm(w):
    w = unicodedata.normalize("NFD", w.lower())
    w = "".join(c for c in w if unicodedata.category(c) != "Mn")
    return re.sub(r"[^a-zñ0-9]", "", w)

# Palabras del guion
S = []
for f in frases:
    for w in f["text"].split():
        for part in w.split("-"):          # cazadores-recolectores -> 2 palabras
            n = norm(part)
            if n:
                S.append({"line": f["i"], "w": part, "n": n})

# Palabras de whisper (los números se expanden: "15.000" -> quince mil)
T = []
for seg in json.load(open(wj, encoding="utf-8"))["transcription"]:
    txt = seg["text"].strip()
    a, b = seg["offsets"]["from"] / 1000, seg["offsets"]["to"] / 1000
    if not txt:
        continue
    toks = []
    for w in txt.split():
        if re.fullmatch(r"[\d.,]+[.,;:]?", w):
            num = int(re.sub(r"\D", "", w))
            toks += [norm(x) for x in num2words(num, lang="es").replace("-", " ").split()]
        else:
            toks += [norm(x) for x in w.split("-") if norm(x)]
    for k, n in enumerate(toks):
        d = (b - a) / len(toks)
        T.append({"n": n, "start": a + k * d, "end": a + (k + 1) * d})

sm = difflib.SequenceMatcher(None, [s["n"] for s in S], [t["n"] for t in T], autojunk=False)
diffs = []
for op, i1, i2, j1, j2 in sm.get_opcodes():
    if op == "equal":
        for k in range(i2 - i1):
            S[i1 + k].update(start=T[j1 + k]["start"], end=T[j1 + k]["end"])
    elif op == "replace":
        a, b = T[j1]["start"], T[j2 - 1]["end"]
        for k in range(i2 - i1):
            S[i1 + k].update(start=a + (b - a) * k / (i2 - i1), end=a + (b - a) * (k + 1) / (i2 - i1))
        diffs.append({"tipo": "distinta", "guion": " ".join(s["w"] for s in S[i1:i2]),
                      "oido": " ".join(t["n"] for t in T[j1:j2]), "linea": S[i1]["line"]})
    elif op == "delete":
        diffs.append({"tipo": "falta", "guion": " ".join(s["w"] for s in S[i1:i2]), "linea": S[i1]["line"]})
    elif op == "insert":
        diffs.append({"tipo": "sobra", "oido": " ".join(t["n"] for t in T[j1:j2]),
                      "linea": S[i1]["line"] if i1 < len(S) else S[-1]["line"]})

# Palabras sin tiempo (faltan en la voz): se reparten dentro de su frase
for i, s in enumerate(S):
    if "start" not in s:
        f = frases[s["line"] - 1]
        prev = next((S[j]["end"] for j in range(i - 1, -1, -1) if "end" in S[j] and S[j]["line"] == s["line"]), f["start"])
        s.update(start=prev, end=prev + 0.2)

# Ninguna palabra puede salirse de su frase (evita que un error de whisper la mande lejos)
for s in S:
    f = frases[s["line"] - 1]
    s["start"] = round(min(max(s["start"], f["start"]), f["end"]), 3)
    s["end"] = round(min(max(s["end"], s["start"] + 0.05), f["end"] + 0.3), 3)

json.dump(S, open(out, "w", encoding="utf-8"), ensure_ascii=False, indent=0)
json.dump(diffs, open(out.replace(".json", "_diferencias.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print(f"{len(S)} palabras del guion · {len(T)} oídas · {len(diffs)} diferencias")
for d in diffs:
    print(" ", d)

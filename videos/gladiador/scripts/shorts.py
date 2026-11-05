# Corta el vídeo vertical completo en Shorts de menos de 3 minutos, siempre al acabar un capítulo.
# A cada parte le añade «PARTE n/N», un rótulo de título al empezar (desde la 2ª) y «Sigue en la parte…» al final.
# Uso: python scripts/shorts.py <vertical.mp4> <frases.json> <carpeta salida> [frases que empiezan capítulo, p. ej. 5,20,46] [TÍTULO arriba] [PERSONAJE] [fuente.ttf]
import json, os, subprocess, sys
src, fj, outd = sys.argv[1:4]
CAPS = [int(x) for x in sys.argv[4].split(",")] if len(sys.argv) > 4 else [5, 20, 46, 70, 93, 121, 131]
TOP = sys.argv[5] if len(sys.argv) > 5 else "UN MES EN LA VIDA DE UN"
WHO = sys.argv[6] if len(sys.argv) > 6 else "CAVERNÍCOLA"
os.makedirs(outd, exist_ok=True)
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONT = os.path.join(ROOT, "fonts", "RubikDirt-Regular.ttf")
TFONT = os.path.join(ROOT, "fonts", sys.argv[7]) if len(sys.argv) > 7 else FONT
fr = json.load(open(fj, encoding="utf-8"))
dur = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", src]))
# inicios de capítulo (mismas frases que scripts/capitulos.mjs)
starts = [0.0] + [round(fr[i - 1]["start"] - 0.15, 3) for i in CAPS]
caps = [(starts[k], starts[k + 1] if k + 1 < len(starts) else dur) for k in range(len(starts))]
MAX = 178.0 if len(sys.argv) <= 8 else float(sys.argv[8])
parts, cur = [], None
for a, b in caps:
    if cur and b - cur[0] <= MAX:
        cur = (cur[0], b)
    else:
        if cur: parts.append(cur)
        cur = (a, b)
parts.append(cur)
for a, b in parts:
    assert b - a <= 179.5, f"una parte dura {b - a:.1f} s"
N = len(parts)
esc = lambda s: s.replace(":", r"\:").replace("'", r"\'")
for n, (a, b) in enumerate(parts, 1):
    d = b - a
    vf = [f"drawbox=x=iw-360:y=450:w=300:h=96:color=0x24160d@0.85:t=fill",
          f"drawtext=fontfile={FONT}:text='{esc(f'PARTE {n}/{N}')}':x=w-345:y=468:fontsize=58:fontcolor=0xf4e6cf"]
    if n > 1:
        vf += [f"drawbox=x=0:y=760:w=iw:h=340:color=0x101a2c@0.85:t=fill:enable='lt(t,1.8)'",
               f"drawtext=fontfile={FONT}:text='{esc(TOP)}':x=(w-tw)/2:y=800:fontsize=62:fontcolor=0xf4e6cf:enable='lt(t,1.8)'",
               f"drawtext=fontfile={TFONT}:text='{esc(WHO)}':x=(w-tw)/2:y=880:fontsize=150:fontcolor=0xf4e6cf:enable='lt(t,1.8)'"]
    if n < N:
        vf += [f"drawbox=x=0:y=820:w=iw:h=260:color=0xd9822b@0.95:t=fill:enable='gte(t,{d - 2.4:.2f})'",
               f"drawtext=fontfile={FONT}:text='{esc(f'SIGUE EN LA PARTE {n + 1}')}':x=(w-tw)/2:y=905:fontsize=92:fontcolor=0x24160d:enable='gte(t,{d - 2.4:.2f})'"]
    out = os.path.join(outd, f"parte-{n}-de-{N}.mp4")
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", f"{a:.3f}", "-i", src, "-t", f"{d:.3f}", "-vf", ",".join(vf),
                    "-af", f"afade=t=in:d=0.12,afade=t=out:st={d - 0.25:.2f}:d=0.25", "-c:v", "libx264", "-crf", "18", "-preset", "medium",
                    "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", out], check=True)
    print(f"{out}: {a:.1f}-{b:.1f} s ({d:.1f} s)")

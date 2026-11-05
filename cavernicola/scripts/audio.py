# Sonido del vídeo:
#  1) efectos (paquete de Pixabay incluido en HyperFrames, licencia libre comercial) en sus marcas
#  2) música de fondo compuesta por código (tambor, dron y flauta pentatónica): sin derechos de terceros
#  3) mezcla voz + música + efectos con ffmpeg y volumen final a -14 LUFS
# Uso: python scripts/audio.py <sfx_cues.json> <voz.wav> <salida mezcla.wav>
import json, os, subprocess, sys, numpy as np, soundfile as sf

cues_p, voz_p, out_p = sys.argv[1:4]
SR = 48000
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SFXDIR = os.path.expanduser("~/.claude/skills/media-use/audio/assets/sfx")
os.makedirs(os.path.join(ROOT, "audio"), exist_ok=True)
dur = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", voz_p]))
N = int(dur * SR)

def load(name):
    w = os.path.join(ROOT, "audio", "sfx_" + name.replace(".mp3", ".wav"))
    if not os.path.exists(w):
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", os.path.join(SFXDIR, name), "-ac", "1", "-ar", str(SR), w], check=True)
    a, _ = sf.read(w, dtype="float32")
    return a / (np.abs(a).max() + 1e-9)

# tipo de marca -> (archivo, ganancia en dB, separación mínima en s)
KIND = {
    "pop": ("pop.mp3", -21, 0.12), "click": ("click.mp3", -18, 0.1), "ok": ("ping.mp3", -22, 0.1),
    "flip": ("click-soft.mp3", -20, 0.1), "whoosh": ("whoosh.mp3", -17, 0.4), "whooshBig": ("whoosh-cinematic.mp3", -16, 0.5),
    "impact": ("impact-bass-1.mp3", -13, 0.3), "riser": ("riser.mp3", -22, 1.0), "typing": ("typing.mp3", -18, 0.3),
    "tick": ("key-press.mp3", -22, 0.1),
}
sfx = np.zeros(N, np.float32)
last = {}
for c in json.load(open(cues_p)):
    k = c["k"]
    if k not in KIND:
        continue
    f, db, gap = KIND[k]
    if c["t"] - last.get(k, -9) < gap:
        continue
    last[k] = c["t"]
    a = load(f) * (10 ** (db / 20)) * c.get("g", 1)
    i = int(c["t"] * SR)
    if i >= N:
        continue
    j = min(N, i + len(a))
    sfx[i:j] += a[: j - i]

# ---------- Música compuesta por código ----------
rng = np.random.default_rng(15000)
t = np.arange(N) / SR
BPM = 84; beat = 60 / BPM
mus = np.zeros(N, np.float32)
# dron: la grave y su quinta, con un vaivén lento
drone = 0.5 * np.sin(2 * np.pi * 55 * t) + 0.3 * np.sin(2 * np.pi * 82.4 * t + 0.4) + 0.12 * np.sin(2 * np.pi * 110 * t)
drone *= 0.55 + 0.45 * np.sin(2 * np.pi * t / 23.0) ** 2
mus += 0.16 * drone.astype(np.float32)
# tambor de marco: golpe grave en 1 y 3, suave en 2 y 4
def drum(freq, length, decay, amp):
    n = int(length * SR); tt = np.arange(n) / SR
    f = freq * (1 + 1.2 * np.exp(-tt * 30))
    body = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * decay)
    skin = rng.standard_normal(n) * np.exp(-tt * 60) * 0.25
    return ((body + skin) * amp).astype(np.float32)
low, soft = drum(62, 0.6, 9, 0.5), drum(95, 0.3, 18, 0.22)
k = 0
while k * beat < dur:
    i = int(k * beat * SR); d = low if k % 4 in (0, 2) else soft
    if k % 16 == 15: d = drum(80, 0.4, 12, 0.35)
    j = min(N, i + len(d)); mus[i:j] += d[: j - i]
    k += 1
# sonajero suave en las corcheas
sh = (rng.standard_normal(int(0.05 * SR)) * np.exp(-np.arange(int(0.05 * SR)) / SR * 80) * 0.05).astype(np.float32)
k = 0
while k * beat / 2 < dur:
    if k % 2 == 1:
        i = int(k * beat / 2 * SR); j = min(N, i + len(sh)); mus[i:j] += sh[: j - i]
    k += 1
# flauta de hueso: notas sueltas de la escala pentatónica de la menor, con vibrato
scale = [220.0, 261.6, 293.7, 329.6, 392.0, 440.0]
k = 0
while k * beat * 2 < dur:
    if rng.random() < 0.45:
        f0 = scale[rng.integers(len(scale))]; L = beat * rng.choice([1.5, 2, 3])
        n = int(L * SR); tt = np.arange(n) / SR
        env = np.minimum(1, tt / 0.12) * np.exp(-tt * 1.3)
        ph = 2 * np.pi * np.cumsum(f0 * (1 + 0.006 * np.sin(2 * np.pi * 5.5 * tt))) / SR
        note = (np.sin(ph) + 0.25 * np.sin(2 * ph) + 0.03 * rng.standard_normal(n)) * env * 0.09
        i = int(k * beat * 2 * SR); j = min(N, i + n); mus[i:j] += note[: j - i].astype(np.float32)
    k += 1
# entrada y salida suaves
fade = int(1.5 * SR)
mus[:fade] *= np.linspace(0.3, 1, fade); mus[-fade:] *= np.linspace(1, 0, fade)
mus /= np.abs(mus).max() + 1e-9
sf.write(os.path.join(ROOT, "audio", "musica_raw.wav"), mus, SR)
sf.write(os.path.join(ROOT, "audio", "sfx.wav"), np.clip(sfx, -1, 1), SR)

# ---------- Mezcla ----------
mus_w = os.path.join(ROOT, "audio", "musica_raw.wav"); sfx_w = os.path.join(ROOT, "audio", "sfx.wav")
pre = os.path.join(ROOT, "audio", "mezcla_pre.wav")
# la música baja sola cuando hay voz (sidechain) y queda muy por debajo
fc = ("[1:a]volume=-22dB[m];[0:a]asplit=2[v][vs];[m][vs]sidechaincompress=threshold=0.03:ratio=6:attack=20:release=400[md];"
      "[2:a]volume=0dB[s];[v][md][s]amix=inputs=3:normalize=0:duration=first[mix]")
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", voz_p, "-i", mus_w, "-i", sfx_w, "-filter_complex", fc, "-map", "[mix]", "-ar", str(SR), "-ac", "2", pre], check=True)
# normalización a -14 LUFS en dos pasadas
m = subprocess.run(["ffmpeg", "-hide_banner", "-i", pre, "-af", "loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json", "-f", "null", "-"], capture_output=True, text=True).stderr
js = json.loads(m[m.rindex("{"): m.rindex("}") + 1])
af = (f"loudnorm=I=-14:TP=-1.5:LRA=11:measured_I={js['input_i']}:measured_TP={js['input_tp']}:measured_LRA={js['input_lra']}"
      f":measured_thresh={js['input_thresh']}:offset={js['target_offset']}:linear=true")
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", pre, "-af", af, "-ar", str(SR), out_p], check=True)
m2 = subprocess.run(["ffmpeg", "-hide_banner", "-i", out_p, "-af", "ebur128=framelog=quiet", "-f", "null", "-"], capture_output=True, text=True).stderr
print("Mezcla:", out_p, "·", [l.strip() for l in m2.splitlines() if l.strip().startswith("I:")][-1])

# Sonido de «Un mes en la vida de un vikingo» (diseno.md, apartados 4 y 4.1):
#  1) efectos en sus marcas: los de interfaz del paquete de Pixabay que trae HyperFrames (licencia libre comercial)
#     y los del diseño, SINTETIZADOS aquí (waves, wind, creak, oar, clank, silver, gull, chain, hammer, sheep,
#     fireCrackle, wood, gulp, snore, cough)
#  2) música compuesta por código en re dórico: dron (re y la), lira pulsada (Karplus-Strong), tambor de marco y
#     flauta de hueso. 84 BPM; 96 en Hedeby (semana 4); en el rincón de los esclavos (182-191), solo dron.
#     Reparto por capítulo del diseño 4: gancho dron+lira, s1 flauta+lira, s2 tambor más presente, s3 dron+tambor en 1
#     y olas, s4 96 BPM con lira rápida, balance y cierre solo dron y flauta. Sin melodías de terceros.
#  3) mezcla voz + música (muy baja y con sidechain bajo la voz) + efectos, y volumen final a -14 LUFS
# Uso: python scripts/audio.py <sfx_cues.json> <voz.wav> <salida mezcla.wav> [frases.json]
#      (frases.json por defecto: voz/frases.json, o voz/frases_est.json si aún no existe)
import glob, json, os, subprocess, sys, numpy as np, soundfile as sf

cues_p, voz_p, out_p = sys.argv[1:4]
SR = 48000
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
fr_p = sys.argv[4] if len(sys.argv) > 4 else next((p for p in ("voz/frases.json", "voz/frases_est.json") if os.path.exists(os.path.join(ROOT, p))), None)
frases = json.load(open(os.path.join(ROOT, fr_p) if fr_p and not os.path.isabs(fr_p) else fr_p)) if fr_p else []
cands = [os.path.expanduser("~/.claude/skills/media-use/audio/assets/sfx")] + glob.glob(os.path.expanduser("~/.npm/_npx/*/node_modules/hyperframes/dist/skills/media-use/audio/assets/sfx"))
SFXDIR = next((d for d in cands if os.path.isdir(d)), None)
os.makedirs(os.path.join(ROOT, "audio"), exist_ok=True)
dur = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", voz_p]))
N = int(dur * SR)
rng = np.random.default_rng(890)

def load(name):
    w = os.path.join(ROOT, "audio", "sfx_" + name.replace(".mp3", ".wav"))
    if not os.path.exists(w):
        if not SFXDIR: raise SystemExit("No encuentro los efectos de HyperFrames (media-use/audio/assets/sfx)")
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", os.path.join(SFXDIR, name), "-ac", "1", "-ar", str(SR), w], check=True)
    a, _ = sf.read(w, dtype="float32")
    return a / (np.abs(a).max() + 1e-9)

# ---------- Efectos sintetizados (diseño 4.1) ----------
def T(s): return np.arange(int(s * SR)) / SR
def lp(x, n): return np.convolve(x, np.ones(n) / n, mode="same")
def norm(a): return (a / (np.abs(a).max() + 1e-9)).astype(np.float32)
def env_ad(t, a, d): return np.minimum(1, t / max(a, 1e-4)) * np.exp(-np.maximum(0, t - a) * d)
def s_waves(r):   # ruido con paso bajo y envolvente de oleaje que sube y baja en 4 s
    t = T(4.0); x = lp(lp(r.standard_normal(len(t)), 30), 12)
    return norm(x * np.sin(np.pi * t / 4.0) ** 1.5 * (0.7 + 0.3 * np.sin(2 * np.pi * 0.6 * t)))
def s_wind(r):    # paso banda 300-900 Hz con modulación lenta y aleteo de tela a 7 Hz
    t = T(3.0); x = r.standard_normal(len(t)); x = lp(x, 18) - lp(x, 80)
    flap = 1 + 0.5 * (np.sin(2 * np.pi * 7 * t) > 0.6)
    return norm(x * np.sin(np.pi * t / 3.0) * (0.6 + 0.4 * np.sin(2 * np.pi * 0.4 * t)) * flap)
def s_creak(r):   # 90 -> 70 Hz con pulsos a 25 Hz, 0,6 s
    t = T(0.6); f = 90 - 20 * t / 0.6; ph = 2 * np.pi * np.cumsum(f) / SR
    tone = np.sign(np.sin(ph)) * 0.6 + np.sin(3 * ph) * 0.4
    return norm(tone * (0.5 + 0.5 * (np.sin(2 * np.pi * 25 * t) > 0)) * env_ad(t, 0.05, 3))
def s_oar(r):     # salpicadura (ruido corto) y golpe grave de 80 Hz
    t = T(0.7); spl = lp(r.standard_normal(len(t)), 6) * env_ad(t, 0.01, 9)
    thud = np.sin(2 * np.pi * 80 * t) * env_ad(t, 0.005, 14)
    return norm(spl * 0.7 + thud)
def s_clank(r, k=1.0, n=1):   # 4 parciales inarmónicos con caída rápida y algo de ruido
    t = T(0.5); x = sum(np.sin(2 * np.pi * f * k * t + r.random() * 6) / (i + 1) for i, f in enumerate((520, 1310, 2240, 3170)))
    x = x * env_ad(t, 0.002, 14) + r.standard_normal(len(t)) * env_ad(t, 0.001, 60) * 0.4
    return norm(x)
def s_silver(r):  # 3 pings altos con caída de 0,25 s
    out = np.zeros(int(0.8 * SR))
    for j in range(3):
        t = T(0.4); f = 2800 + r.random() * 1400; p = np.sin(2 * np.pi * f * t) + 0.3 * np.sin(2 * np.pi * f * 2.76 * t)
        i = int(j * 0.11 * SR); out[i:i + len(t)] += p * np.exp(-t / 0.08)
    return norm(out)
def s_gull(r):    # barrido FM 1800 -> 1200 Hz con vibrato, 0,4 s, tres veces
    out = np.zeros(int(1.5 * SR))
    for j in range(3):
        t = T(0.4); f = 1800 - 600 * t / 0.4 + 60 * np.sin(2 * np.pi * 22 * t)
        ph = 2 * np.pi * np.cumsum(f) / SR; x = (np.sin(ph) + 0.5 * np.sin(2 * ph)) * np.sin(np.pi * t / 0.4)
        i = int(j * 0.45 * SR); out[i:i + len(t)] += x
    return norm(out)
def s_chain(r):   # 5-8 clics metálicos irregulares, más cortos y graves que clank
    out = np.zeros(int(1.0 * SR)); tt = 0.0
    for _ in range(7):
        c = s_clank(r, 0.55)[: int(0.12 * SR)] * (0.5 + 0.5 * r.random())
        i = int(tt * SR); out[i:i + len(c)] += c[: len(out) - i]; tt += 0.06 + r.random() * 0.1
    return norm(out)
def s_hammer(r):  # golpe metálico de 900 Hz con caída de 0,15 s, en bucle a 1,5 Hz (tres golpes)
    out = np.zeros(int(2.2 * SR))
    for j in range(3):
        t = T(0.3); x = (np.sin(2 * np.pi * 900 * t) + 0.5 * np.sin(2 * np.pi * 2350 * t)) * np.exp(-t / 0.05) + r.standard_normal(len(t)) * np.exp(-t * 80) * 0.5
        i = int(j / 1.5 * SR); out[i:i + len(t)] += x
    return norm(out)
def s_sheep(r):   # balido: 380 Hz con vibrato de 7 Hz y formante nasal, 0,8 s
    t = T(0.8); f = 380 * (1 + 0.04 * np.sin(2 * np.pi * 7 * t)); ph = 2 * np.pi * np.cumsum(f) / SR
    return norm(sum(np.sin(k * ph) / k for k in (1, 2, 3, 4)) * np.sin(np.pi * t / 0.8) ** 0.6)
def s_fire(r):    # crepitar: pulsos de ruido cortos (Poisson, 6 por segundo)
    t = T(2.0); out = lp(r.standard_normal(len(t)), 40) * 0.15
    for _ in range(r.poisson(12)):
        i = r.integers(0, len(t) - 400); out[i:i + 400] += r.standard_normal(400) * np.exp(-np.arange(400) / 60)
    return norm(out)
def s_wood(r):    # golpe de madera (escudos que se cuelgan, puerta)
    t = T(0.25); x = np.sin(2 * np.pi * 220 * t) * np.exp(-t * 30) + lp(r.standard_normal(len(t)), 4) * np.exp(-t * 60)
    return norm(x)
def s_gulp(r):    # tragar saliva: barrido grave hacia arriba y un clic húmedo
    t = T(0.35); f = 120 + 260 * (t / 0.35) ** 2; x = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / 0.35)
    x[int(0.25 * SR):int(0.25 * SR) + 300] += r.standard_normal(300) * 0.6
    return norm(x)
def s_snore(r):   # ronquido: ruido grave pulsado por la respiración, dos veces
    out = np.zeros(int(3.0 * SR))
    for j in range(2):
        t = T(1.1); buzz = (np.sin(2 * np.pi * 45 * t) > 0.3) * lp(r.standard_normal(len(t)), 20)
        i = int(j * 1.5 * SR); out[i:i + len(t)] += buzz * np.sin(np.pi * t / 1.1) ** 2
    return norm(out)
def s_cough(r):   # tos: tres ráfagas de ruido con paso banda
    out = np.zeros(int(1.1 * SR))
    for j in range(3):
        t = T(0.18); x = r.standard_normal(len(t)); x = (lp(x, 6) - lp(x, 40)) * env_ad(t, 0.01, 18)
        i = int(j * 0.3 * SR); out[i:i + len(t)] += x
    return norm(out)
SYN = {"waves": s_waves, "wind": s_wind, "creak": s_creak, "oar": s_oar, "clank": s_clank, "silver": s_silver, "gull": s_gull,
       "chain": s_chain, "hammer": s_hammer, "sheep": s_sheep, "bleat": s_sheep, "fireCrackle": s_fire, "fire": s_fire,
       "wood": s_wood, "gulp": s_gulp, "snore": s_snore, "cough": s_cough}

# tipo de marca -> (archivo o "SYN", ganancia en dB, separación mínima en s)
KIND = {
    "pop": ("pop.mp3", -21, 0.12), "click": ("click.mp3", -18, 0.1), "ok": ("ping.mp3", -22, 0.1),
    "flip": ("click-soft.mp3", -20, 0.1), "whoosh": ("whoosh.mp3", -17, 0.4), "whooshBig": ("whoosh-cinematic.mp3", -16, 0.5),
    "impact": ("impact-bass-1.mp3", -13, 0.3), "riser": ("riser.mp3", -22, 1.0), "typing": ("typing.mp3", -18, 0.3),
    "tick": ("key-press.mp3", -22, 0.1), "hit": ("impact-bass-2.mp3", -15, 0.15),
    # diseño 4.1 (volúmenes de partida)
    "waves": ("SYN", -24, 2.0), "wind": ("SYN", -26, 1.5), "creak": ("SYN", -22, 0.5), "oar": ("SYN", -20, 0.4),
    "clank": ("SYN", -16, 0.15), "silver": ("SYN", -20, 0.3), "gull": ("SYN", -24, 1.0), "chain": ("SYN", -20, 0.6),
    "hammer": ("SYN", -24, 1.0), "sheep": ("SYN", -22, 1.0), "bleat": ("SYN", -22, 1.0), "fireCrackle": ("SYN", -26, 1.0),
    "fire": ("SYN", -26, 1.0), "wood": ("SYN", -22, 0.15), "gulp": ("SYN", -18, 0.5), "snore": ("SYN", -22, 1.0), "cough": ("SYN", -18, 0.6),
}
cues = json.load(open(cues_p))
ign = sorted({c["k"] for c in cues if c["k"] not in KIND})
if ign: raise SystemExit(f"Efectos sin sonido en KIND: {ign}")
sfx = np.zeros(N, np.float32)
last, cache, used = {}, {}, {}
for c in cues:
    k = c["k"]; f, db, gap = KIND[k]
    if c["t"] - last.get(k, -9) < gap: continue
    last[k] = c["t"]
    if f == "SYN":
        a = SYN[k](np.random.default_rng(int(c["t"] * 1000)))
    else:
        if f not in cache: cache[f] = load(f)
        a = cache[f]
    a = a * (10 ** (db / 20)) * c.get("g", 1)
    i = int(c["t"] * SR)
    if i >= N: continue
    j = min(N, i + len(a)); sfx[i:j] += a[: j - i]; used[k] = used.get(k, 0) + 1

# ---------- Música en re dórico ----------
# capítulos (frase inicial) y secciones con su receta
def tstart(n, d=0.0):
    return max(0.0, frases[n - 1]["start"] - 0.15) if len(frases) >= n else d
SECC = [  # (desde, receta)
    (1, "gancho"), (6, "intro"), (28, "s1"), (70, "s2"), (111, "s3"), (160, "s4"), (182, "esclavos"), (192, "s4"), (206, "balance"), (233, "cierre")]
bounds = [(tstart(n, i * dur / len(SECC)), r) for i, (n, r) in enumerate(SECC)] + [(dur, None)]
REC = {  # bpm, dron, lira, lira rápida, tambor (0 nada, 1 solo en 1, 2 normal, 3 presente), flauta, olas
    "gancho": (84, 1, 1, 0, 1, 0, 1), "intro": (84, 1, 1, 0, 2, 1, 0), "s1": (84, 0.6, 1, 0, 1, 1, 0), "s2": (84, 0.8, 1, 0, 3, 0.6, 0),
    "s3": (84, 1, 0.5, 0, 1, 0.4, 1), "s4": (96, 0.7, 1, 1, 2, 0.6, 0), "esclavos": (0, 1, 0, 0, 0, 0, 0),
    "balance": (84, 1, 0, 0, 0, 1, 0), "cierre": (84, 1, 0, 0, 0, 1, 0)}
SCALE = [146.8, 164.8, 174.6, 196.0, 220.0, 246.9, 261.6, 293.7]  # re dórico
t = np.arange(N) / SR
mus = np.zeros(N, np.float32)
# dron: re grave (73,4 Hz) y su quinta (110 Hz), vaivén lento de 23 s; su nivel sigue la receta de cada tramo
dlev = np.zeros(N, np.float32)
for (a, r), (b, _) in zip(bounds[:-1], bounds[1:]):
    dlev[int(a * SR):int(b * SR)] = REC[r][1]
def smooth(x, n):  # media móvil con sumas acumuladas (np.convolve sería lentísimo con 72.000 muestras)
    c = np.cumsum(np.concatenate([np.zeros(n // 2 + 1), x, np.full(n // 2, x[-1])]).astype(np.float64)); return ((c[n:] - c[:-n]) / n)[: len(x)]
dlev = smooth(dlev, int(1.5 * SR)).astype(np.float32)
drone = 0.5 * np.sin(2 * np.pi * 73.4 * t) + 0.32 * np.sin(2 * np.pi * 110 * t + 0.4) + 0.1 * np.sin(2 * np.pi * 146.8 * t)
drone *= 0.55 + 0.45 * np.sin(2 * np.pi * t / 23.0) ** 2
mus += (0.16 * drone * dlev).astype(np.float32)
def put(x, at, amp=1.0):
    i = max(0, int(at * SR))
    if i >= N: return
    j = min(N, i + len(x)); mus[i:j] += (x[: j - i] * amp).astype(np.float32)
def drum(freq, length, decay, amp):
    n = int(length * SR); tt = np.arange(n) / SR
    f = freq * (1 + 1.2 * np.exp(-tt * 30))
    return ((np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * decay) + rng.standard_normal(n) * np.exp(-tt * 60) * 0.25) * amp).astype(np.float32)
def lyre(f0, length=1.6):  # Karplus-Strong: ruido de 5 ms en un búfer de periodo SR/f, media de dos muestras y 0,996
    p = int(SR / f0); buf = rng.uniform(-1, 1, p); n = int(length * SR); out = np.empty(n)
    for i in range(n):
        out[i] = buf[i % p]; buf[i % p] = 0.996 * 0.5 * (buf[i % p] + buf[(i + 1) % p])
    return out.astype(np.float32)
LY = {f: lyre(f) for f in (146.8, 220.0, 293.7, 130.8, 196.0, 261.6)}
low, soft = drum(62, 0.6, 9, 0.5), drum(95, 0.3, 18, 0.22)
for (a, r), (b, _) in zip(bounds[:-1], bounds[1:]):
    bpm, dr, ly, fast, tam, fl, wv = REC[r]
    if wv:  # olas de fondo en el mar
        x = 0.0
        while a + x < b:
            put(s_waves(rng) * 0.12, a + x); x += 3.5
    if not bpm: continue
    beat = 60 / bpm; k = 0
    while a + k * beat < b - 0.2:
        tt = a + k * beat
        if tam and (k % 4 == 0 or (tam >= 2 and k % 4 == 2)): put(low, tt, 1.3 if tam == 3 else 1)
        elif tam >= 2: put(soft, tt, 1.3 if tam == 3 else 1)
        if ly:  # arpegio re-la-re y do-sol-do cada 2 compases (rápido en Hedeby)
            bar = (k // 8) % 2; arp = (146.8, 220.0, 293.7) if bar == 0 else (130.8, 196.0, 261.6)
            step = 1 if fast else 2
            if k % step == 0: put(LY[arp[(k // step) % 3]], tt, 0.55 * ly)
        if fl and k % 2 == 0 and rng.random() < 0.35:  # flauta de hueso: notas sueltas una octava arriba, vibrato 5,5 Hz, 6 % de soplo
            f0 = SCALE[rng.integers(len(SCALE))] * 2; L = beat * rng.choice([1.5, 2, 3])
            n = int(L * SR); ts = np.arange(n) / SR; env = np.minimum(1, ts / 0.12) * np.exp(-ts * 1.3)
            ph = 2 * np.pi * np.cumsum(f0 * (1 + 0.006 * np.sin(2 * np.pi * 5.5 * ts))) / SR
            put((np.sin(ph) + 0.2 * np.sin(2 * ph) + 0.06 * rng.standard_normal(n)) * env * 0.09 * fl, tt)
        k += 1
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
print("Efectos usados:", dict(sorted(used.items())))
print("Mezcla:", out_p, "·", [l.strip() for l in m2.splitlines() if l.strip().startswith("I:")][-1])

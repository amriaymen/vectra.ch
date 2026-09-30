"""Soundtrack for the explainer film: voice-over plus sound effects, no music.

Every effect is synthesised here from filtered noise and short transients:
no tones, no melodies, no samples. They are placed on the cues that film.html
declares (render_film.mjs writes them to cues.json), ducked a little under the
voice, loudness-normalised and muxed onto the rendered video.

    python tools/video/sfx.py               # mix + mux onto the last render
    python tools/video/sfx.py --fmt v       # same soundtrack onto the 9:16 render
    python tools/video/sfx.py --audio-only  # just write the mixed WAV
    python tools/video/sfx.py --vo tools/video/assets/vo-fr-v2.mp3 --out output/video/vectra-film-v2-fr-16x9.mp4
"""
import json
import subprocess
import sys
import tempfile
import warnings
from pathlib import Path

import numpy as np
import soundfile as sf

warnings.simplefilter("ignore")
from scipy.signal import butter, fftconvolve, sosfilt  # noqa: E402

SR = 48_000
ROOT = Path(__file__).resolve().parents[2]
BUILD = Path(tempfile.gettempdir()) / "vectra-video"
def arg(name, default=None):
    return sys.argv[sys.argv.index(name) + 1] if name in sys.argv else default


VO = ROOT / arg("--vo", "tools/video/assets/vo-fr.mp3")
VERTICAL = arg("--fmt") == "v"
VIDEO = BUILD / ("film-video-9x16.mp4" if VERTICAL else "film-video.mp4")
OUT = ROOT / arg("--out", "output/video/" + ("vectra-film-fr-9x16.mp4" if VERTICAL else "vectra-film-fr-16x9.mp4"))
TARGET_LUFS, TRUE_PEAK = -16.0, -1.5
SFX_TRIM_DB, DUCK_DB = 4.0, 3.0  # effects ~10 LU under the voice; gentle ducking
LIMIT = "alimiter=limit=0.79:attack=3:release=60:level=disabled"  # -2 dBFS safety


# ── DSP building blocks ───────────────────────────────────────────────────
def noise(n, seed, color="white"):
    x = np.random.default_rng(seed).standard_normal(n)
    if color != "white":
        spec = np.fft.rfft(x)
        f = np.maximum(np.arange(len(spec)), 1)
        spec /= np.sqrt(f) if color == "pink" else f
        x = np.fft.irfft(spec, n)
    return x / (np.max(np.abs(x)) + 1e-12)


def filt(x, kind, f, order=2):
    btype = {"low": "lowpass", "high": "highpass", "band": "bandpass"}[kind]
    return sosfilt(butter(order, f, btype=btype, fs=SR, output="sos"), x)


def svf(x, fc, q, mode="band"):
    """Time-varying state-variable filter (TPT). fc is per-sample Hz."""
    fc = np.broadcast_to(np.asarray(fc, float), x.shape)
    g = np.tan(np.pi * np.clip(fc, 30, SR * 0.45) / SR)
    k = 1.0 / q
    a1 = (1 / (1 + g * (g + k))).tolist()
    a2 = (g * np.asarray(a1)).tolist()
    a3 = (g * np.asarray(a2)).tolist()
    xs, out = x.tolist(), [0.0] * len(x)
    ic1 = ic2 = 0.0
    band = mode == "band"
    for i in range(len(xs)):
        v3 = xs[i] - ic2
        v1 = a1[i] * ic1 + a2[i] * v3
        v2 = ic2 + a2[i] * ic1 + a3[i] * v3
        ic1, ic2 = 2 * v1 - ic1, 2 * v2 - ic2
        out[i] = v1 if band else v2
    return np.array(out)


def expsweep(n, f0, f1, curve=1.0):
    u = np.linspace(0, 1, n) ** curve
    return f0 * (f1 / f0) ** u


def decay(n, attack, tau, delay=0.0):
    t = np.arange(n) / SR - delay
    return np.where(t < 0, 0, np.where(t < attack, t / max(attack, 1e-5), np.exp(-(t - attack) / tau)))


def swell(n, peak=0.6, rise=2.0, fall=1.6):
    u = np.linspace(0, 1, n)
    return np.where(u < peak, (u / peak) ** rise, ((1 - u) / (1 - peak)) ** fall)


def fade(x, ms=2.0):
    k = max(1, int(ms * SR / 1000))
    x[:k] *= np.linspace(0, 1, k)[:, None] if x.ndim == 2 else np.linspace(0, 1, k)
    x[-k:] *= np.linspace(1, 0, k)[:, None] if x.ndim == 2 else np.linspace(1, 0, k)
    return x


def pan(x, p):
    th = (np.clip(np.asarray(p, float), -1, 1) + 1) * np.pi / 4
    return np.stack([x * np.cos(th), x * np.sin(th)], axis=1)


def wide(mono_l, mono_r, width):
    """Two decorrelated channels, blended toward mono as width → 0."""
    w = np.asarray(width, float)
    mid = (mono_l + mono_r) / 2
    return np.stack([mid + (mono_l - mid) * w, mid + (mono_r - mid) * w], axis=1)


def reverb(st, seconds=0.6, wet=0.15, seed=7, damp=6000):
    n = int(seconds * SR)
    t = np.arange(n) / SR
    out = np.zeros((len(st) + n, 2))
    out[: len(st)] = st * (1 - wet * 0.5)
    for ch in range(2):
        ir = noise(n, seed + ch) * np.exp(-t * 6.9 / seconds)
        ir = filt(ir, "low", damp)
        ir[: int(0.012 * SR)] = 0
        ir /= np.sqrt(np.sum(ir**2)) + 1e-12
        conv = fftconvolve(st[:, ch], ir)[: len(out)]
        out[: len(conv), ch] += wet * conv
    return out


def seconds(s):
    return int(s * SR)


# ── The sounds ────────────────────────────────────────────────────────────
def whoosh(seed, p=0.0, dur=0.7, f=(280, 2600, 520), q=1.3, peak=0.58, spread=0.6, wet=0.12):
    n = seconds(dur)
    u = np.linspace(0, 1, n)
    fc = np.where(u < peak, f[0] * (f[1] / f[0]) ** (u / peak), f[1] * (f[2] / f[1]) ** ((u - peak) / (1 - peak)))
    body = svf(noise(n, seed, "pink"), fc, q)
    air = filt(noise(n, seed + 1), "high", 5500) * 0.16 * swell(n, peak, 3, 2)
    low = filt(noise(n, seed + 2, "brown"), "low", 220) * 0.45
    sig = (body / (np.max(np.abs(body)) + 1e-9) + air + low) * swell(n, peak, 2.2, 1.7)
    return reverb(pan(sig, np.linspace(p - spread, p + spread, n)), 0.5, wet, seed)


def wipe(seed, p=0.0):
    return whoosh(seed, 0.0, 0.8, (170, 3000, 420), 1.1, 0.55, 0.85, 0.18)


def swish(seed, p=0.0):
    return whoosh(seed, p, 0.3, (900, 5200, 1600), 1.1, 0.45, 0.3, 0.08)


def soft(seed, p=0.0):
    return whoosh(seed, p, 0.5, (350, 1500, 500), 0.9, 0.5, 0.25, 0.1)


def fall(seed, p=0.0):
    return whoosh(seed, p, 0.9, (2200, 1400, 280), 1.2, 0.3, 0.3, 0.15)


def pop(seed, p=0.0):
    n = seconds(0.16)
    body = filt(noise(n, seed, "brown"), "low", 260) * decay(n, 0.002, 0.035)
    mid = filt(noise(n, seed + 1), "band", (500, 1600)) * decay(n, 0.001, 0.016) * 0.7
    tick_ = filt(noise(n, seed + 2), "high", 3500) * decay(n, 0.0003, 0.003) * 0.5
    sig = body / (np.max(np.abs(body)) + 1e-9) + mid + tick_
    return reverb(pan(sig, p), 0.3, 0.08, seed)


def tick(seed, p=0.0):
    n = seconds(0.06)
    hi = filt(noise(n, seed), "band", (3500, 9000)) * decay(n, 0.0003, 0.004)
    lo = filt(noise(n, seed + 1), "band", (900, 1800)) * decay(n, 0.0005, 0.008) * 0.35
    return pan(hi + lo, p)


def click(seed, p=0.0):
    n = seconds(0.1)
    sig = np.zeros(n)
    for delay, amp, s in ((0.0, 1.0, seed), (0.045, 0.55, seed + 5)):
        sig += filt(noise(n, s), "band", (1800, 6500)) * decay(n, 0.0003, 0.003, delay) * amp
        sig += filt(noise(n, s + 1), "band", (700, 1400)) * decay(n, 0.0005, 0.006, delay) * amp * 0.4
    return pan(sig, p)


def snap(seed, p=0.0):
    a, b = pop(seed, p), tick(seed + 9, p)
    a[: len(b)] += b * 0.8
    return a


def drop(seed, p=0.0):
    n = seconds(0.22)
    body = filt(noise(n, seed, "brown"), "low", 200) * decay(n, 0.002, 0.06)
    tick_ = filt(noise(n, seed + 1), "band", (2000, 7000)) * decay(n, 0.0003, 0.004) * 0.6
    return reverb(pan(body / (np.max(np.abs(body)) + 1e-9) + tick_, p), 0.3, 0.1, seed)


def drops(seed, p=0.0, n=5, gap=0.05):
    out = np.zeros((seconds(n * gap + 0.3), 2))
    r = np.random.default_rng(seed)
    for i in range(n):
        s = tick(seed + 11 * i, p + r.uniform(-0.25, 0.25)) * r.uniform(0.6, 1.0)
        b = pop(seed + 13 * i, p) * 0.35
        at = seconds(i * gap)
        out[at: at + len(s)] += s
        out[at: at + len(b)] += b[: len(out) - at]
    return out


def count(seed, p=0.0, dur=0.6):
    out = np.zeros((seconds(dur + 0.1), 2))
    t, i = 0.0, 0
    while t < dur:
        s = tick(seed + i, p) * (1 - 0.6 * t / dur)
        at = seconds(t)
        out[at: at + len(s)] += s[: len(out) - at]
        t += 0.028 + 0.05 * (t / dur) ** 1.5  # slows down like a settling counter
        i += 1
    return out


def paper(seed, p=0.0):
    n = seconds(0.45)
    base = filt(noise(n, seed), "band", (1500, 9000))
    r = np.random.default_rng(seed)
    impulses = (r.random(n) < 0.004) * r.uniform(0.4, 1.0, n)
    crinkle = fftconvolve(impulses, np.exp(-np.arange(seconds(0.004)) / (0.0012 * SR)))[:n]
    sig = base * (0.15 + crinkle) * decay(n, 0.02, 0.15)
    return reverb(pan(sig, p), 0.3, 0.08, seed)


def typing(seed, p=0.0):
    out = np.zeros((seconds(0.4), 2))
    for i, (t, a) in enumerate(((0, 1), (0.09, 0.7), (0.16, 0.85), (0.27, 0.6))):
        s = tick(seed + i, p) * a
        at = seconds(t)
        out[at: at + len(s)] += s
    return out


def buzz(seed, p=0.0):
    out = np.zeros(seconds(0.9))
    r = np.random.default_rng(seed)
    for start in (0.0, 0.44):
        n = seconds(0.3)
        rate = 52 * (1 + 0.08 * np.cumsum(r.standard_normal(n)) / np.sqrt(n))  # jittered rattle
        phase = 2 * np.pi * np.cumsum(rate) / SR
        am = filt((np.sin(phase) > 0).astype(float), "low", 400)
        rattle = filt(noise(n, seed + int(start * 10)), "band", (150, 900)) * am
        env = np.minimum(1, np.arange(n) / seconds(0.01)) * np.minimum(1, (n - np.arange(n)) / seconds(0.03))
        at = seconds(start)
        out[at: at + n] += rattle * env
    return pan(out, p)


def clock(seed, p=0.0, dur=1.3):
    out = np.zeros((seconds(dur + 0.1), 2))
    t, i = 0.0, 0
    while t < dur:
        n = seconds(0.03)
        band = (3000, 7000) if i % 2 == 0 else (1800, 4000)
        s = filt(noise(n, seed + i), "band", band) * decay(n, 0.0003, 0.004)
        amp = 0.5 + 0.5 * np.sin(np.pi * t / dur)
        at = seconds(t)
        out[at: at + n] += pan(s * amp, p)
        t += 0.12 - 0.075 * (t / dur)  # speeds up: hours flying by
        i += 1
    return out


def glitch(seed, p=0.0):
    n = seconds(0.1)
    x = np.round(noise(n, seed) * 4) / 4  # 3-bit crush
    x = np.repeat(x[::10], 10)[:n]  # sample-and-hold
    x = filt(x, "band", (700, 3200))
    gate = (np.sin(2 * np.pi * 38 * np.arange(n) / SR) > -0.2).astype(float)
    return pan(x * gate * decay(n, 0.001, 0.05), p)


def riser(seed, p=0.0, dur=0.78):
    n = seconds(dur)
    u = np.linspace(0, 1, n)
    l = svf(noise(n, seed, "pink"), expsweep(n, 250, 5500, 1.2), 1.4)
    r = svf(noise(n, seed + 1, "pink"), expsweep(n, 260, 5600, 1.2), 1.4)
    env = u**2.6
    st = wide(l, r, 0.8) * env[:, None]
    return fade(st, 6)


def impact(seed, p=0.0):
    n = seconds(1.4)
    u = np.linspace(0, 1, n)
    sub = svf(noise(n, seed, "brown"), 140 * (55 / 140) ** np.minimum(1, u * 6), 0.9, "low") * decay(n, 0.003, 0.22)
    sub /= np.max(np.abs(sub)) + 1e-9
    crack = filt(noise(n, seed + 1), "band", (900, 3500)) * decay(n, 0.0005, 0.012) * 0.6
    air = filt(noise(n, seed + 2), "high", 2500) * decay(n, 0.002, 0.18) * 0.18
    return reverb(pan(sub + crack + air, p), 1.4, 0.22, seed)


def suck(seed, p=0.0, dur=0.6):
    n = seconds(dur)
    u = np.linspace(0, 1, n)
    fc = expsweep(n, 3500, 350)
    l, r = svf(noise(n, seed, "pink"), fc, 1.2), svf(noise(n, seed + 1, "pink"), fc, 1.2)
    env = np.where(u < 0.9, (u / 0.9) ** 2, (1 - u) / 0.1)
    return fade(wide(l, r, 1 - u) * env[:, None], 4)


def draw(seed, p=0.0, dur=1.6):
    n = seconds(dur)
    u = np.linspace(0, 1, n)
    friction = filt(np.abs(noise(n, seed + 3)), "low", 30)
    friction = 0.4 + friction / (np.max(friction) + 1e-9)
    x = svf(noise(n, seed), 2600 + 1200 * np.sin(2 * np.pi * u * 1.5), 1.6) * friction
    env = np.minimum(1, u / 0.06) * np.minimum(1, (1 - u) / 0.12)
    return pan(x * env, 0.3 + 0.5 * np.sin(np.pi * u))


def zip_(seed, p=0.0):
    n = seconds(0.32)
    x = svf(noise(n, seed, "pink"), expsweep(n, 900, 7000, 0.6), 2.0)
    return reverb(pan(x * swell(n, 0.6, 1.5, 1.2), np.linspace(p - 0.2, p + 0.2, n)), 0.3, 0.1, seed)


def clockin(seed, p=0.0):
    a = click(seed, p)
    b = pop(seed + 3, p) * 0.7
    out = np.zeros((max(len(a), len(b) + seconds(0.02)), 2))
    out[: len(a)] += a
    out[seconds(0.02): seconds(0.02) + len(b)] += b
    return out


def down(seed, p=0.0):
    n = seconds(0.75)
    u = np.linspace(0, 1, n)
    x = svf(noise(n, seed, "pink"), expsweep(n, 6000, 180), 0.8, "low")
    return reverb(pan(x * np.minimum(1, u / 0.03) * (1 - u) ** 1.3, p), 0.6, 0.15, seed)


def up(seed, p=0.0):
    n = seconds(0.6)
    u = np.linspace(0, 1, n)
    x = svf(noise(n, seed, "pink"), expsweep(n, 200, 6500), 0.8, "low")
    return reverb(pan(x * swell(n, 0.8, 1.6, 1.0), p), 0.5, 0.15, seed)


def marker(seed, p=0.0):
    n = seconds(0.45)
    u = np.linspace(0, 1, n)
    friction = filt(np.abs(noise(n, seed + 3)), "low", 35)
    friction = 0.5 + friction / (np.max(friction) + 1e-9)
    x = filt(noise(n, seed), "band", (2800, 7500)) * friction
    env = np.minimum(1, u / 0.07) * np.minimum(1, (1 - u) / 0.18)
    return pan(x * env, np.linspace(p - 0.3, p + 0.3, n))


def stamp(seed, p=0.0):
    n = seconds(0.9)
    sub = filt(noise(n, seed, "brown"), "low", 160) * decay(n, 0.002, 0.12)
    sub /= np.max(np.abs(sub)) + 1e-9
    slap = filt(noise(n, seed + 1), "band", (500, 2200)) * decay(n, 0.0008, 0.02) * 1.1
    rustle = paper(seed + 2, p)[:, 0]
    sig = sub + slap
    sig[: len(rustle)] += rustle * 0.25
    return reverb(pan(sig, p), 0.5, 0.15, seed)


def scratch(seed, p=0.0):
    n = seconds(0.3)
    u = np.linspace(0, 1, n)
    friction = filt(np.abs(noise(n, seed + 3)), "low", 60)
    friction = 0.3 + friction / (np.max(friction) + 1e-9)
    x = svf(noise(n, seed), expsweep(n, 4200, 1600), 1.4) * friction
    return pan(x * np.minimum(1, u / 0.02) * (1 - u) ** 0.8, np.linspace(p - 0.4, p + 0.4, n))


SOUNDS = {
    "whoosh": whoosh, "wipe": wipe, "swish": swish, "soft": soft, "fall": fall, "pop": pop,
    "tick": tick, "click": click, "snap": snap, "drop": drop, "drops": drops, "count": count,
    "paper": paper, "typing": typing, "buzz": buzz, "clock": clock, "glitch": glitch,
    "riser": riser, "impact": impact, "suck": suck, "draw": draw, "zip": zip_, "clockin": clockin,
    "down": down, "up": up, "marker": marker, "stamp": stamp, "scratch": scratch,
}


# ── Mix ───────────────────────────────────────────────────────────────────
def decode(path):
    raw = subprocess.run(
        ["ffmpeg", "-v", "error", "-i", str(path), "-ac", "2", "-ar", str(SR), "-f", "f32le", "-"],
        check=True, capture_output=True,
    ).stdout
    return np.frombuffer(raw, np.float32).reshape(-1, 2).astype(np.float64)


def envelope_db(x, attack=0.015, release=0.25):
    level = np.sqrt(np.convolve(np.mean(x**2, axis=1), np.ones(seconds(0.02)) / seconds(0.02), "same"))
    a, r = np.exp(-1 / (attack * SR)), np.exp(-1 / (release * SR))
    out, prev = np.empty_like(level), 0.0
    for i, v in enumerate(level.tolist()):
        coef = a if v > prev else r
        prev = coef * prev + (1 - coef) * v
        out[i] = prev
    return 20 * np.log10(out + 1e-9)


def build_mix():
    data = json.loads((BUILD / "cues.json").read_text(encoding="utf-8"))
    lead = data.get("lead", 0.4)
    n = seconds(data["duration"])
    sfx = np.zeros((n + seconds(2), 2))
    for i, cue in enumerate(data["cues"]):
        kwargs = {k: cue[k] for k in ("dur", "n", "gap") if k in cue}
        snd = SOUNDS[cue["name"]](1000 + 37 * i, cue.get("pan", 0.0), **kwargs)
        snd = snd / (np.max(np.abs(snd)) + 1e-12) * 10 ** (cue["gain"] / 20)
        at = seconds(cue["t"])
        end = min(len(sfx), at + len(snd))
        sfx[at:end] += snd[: end - at]
    sfx = sfx[:n] * 10 ** (SFX_TRIM_DB / 20)
    sfx = np.stack([filt(sfx[:, c], "high", 35) for c in range(2)], axis=1)

    vo = np.zeros((n, 2))
    voice = decode(VO)
    at = seconds(lead)
    vo[at: at + len(voice)] = voice[: n - at]

    # Duck the effects a little while the voice speaks.
    reduction = np.clip((envelope_db(vo) + 38) / 14, 0, 1) * DUCK_DB
    mix = vo + sfx * (10 ** (-reduction / 20))[:, None]
    wav = BUILD / "film-mix.wav"
    sf.write(wav, mix.astype(np.float32), SR, subtype="FLOAT")
    sf.write(BUILD / "film-sfx.wav", sfx.astype(np.float32), SR, subtype="FLOAT")
    print(f"mix peak {20 * np.log10(np.max(np.abs(mix))):.1f} dBFS, {len(data['cues'])} cues")
    return wav


def loudnorm_filter(wav):
    probe = subprocess.run(
        ["ffmpeg", "-hide_banner", "-i", str(wav), "-af",
         f"{LIMIT},loudnorm=I={TARGET_LUFS}:TP={TRUE_PEAK}:LRA=11:print_format=json", "-f", "null", "-"],
        check=True, capture_output=True, text=True,
    ).stderr
    m = json.loads(probe[probe.rindex("{"): probe.rindex("}") + 1])
    return (f"{LIMIT},loudnorm=I={TARGET_LUFS}:TP={TRUE_PEAK}:LRA=11:linear=true:"
            f"measured_I={m['input_i']}:measured_TP={m['input_tp']}:measured_LRA={m['input_lra']}:"
            f"measured_thresh={m['input_thresh']}:offset={m['target_offset']}")


def main():
    wav = build_mix()
    if "--audio-only" in sys.argv:
        print(wav)
        return
    OUT.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(
        ["ffmpeg", "-y", "-v", "error", "-i", str(VIDEO), "-i", str(wav),
         "-map", "0:v", "-map", "1:a", "-c:v", "copy", "-af", loudnorm_filter(wav),
         "-c:a", "aac", "-b:a", "256k", "-ar", str(SR), "-shortest", "-movflags", "+faststart", str(OUT)],
        check=True,
    )
    print(OUT.relative_to(ROOT))


if __name__ == "__main__":
    main()

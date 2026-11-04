import React from "react";
import { AbsoluteFill, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import type { Paleta } from "../tipos";
import { sans, serif } from "../fuentes";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const useU = () => {
  const { width, height } = useVideoConfig();
  return { u: Math.min(width, height) / 1080, vertical: height > width, width, height };
};

export const Fundido: React.FC<{ dur: number; entrada?: number; children: React.ReactNode }> = ({ dur, entrada = 8, children }) => {
  const f = useCurrentFrame();
  return <AbsoluteFill style={{ opacity: interpolate(f, [0, entrada, Math.max(entrada + 1, dur - 5), Math.max(entrada + 2, dur)], [0, 1, 1, 0], clamp) }}>{children}</AbsoluteFill>;
};

export const Grano: React.FC = () => {
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.5) 100%)" }} />
      <AbsoluteFill style={{ backgroundImage: `url(${staticFile("textura/grano.png")})`, opacity: 0.05, mixBlendMode: "overlay" }} />
    </AbsoluteFill>
  );
};

export const Calendario: React.FC<{ dia: number; paleta: Paleta; cambio: boolean }> = ({ dia, paleta, cambio }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { u, vertical } = useU();
  const s = cambio ? spring({ frame: f, fps, config: { damping: 14, stiffness: 120 } }) : 1;
  return (
    <div style={{ position: "absolute", top: (vertical ? 150 : 50) * u, left: (vertical ? 70 : 60) * u, width: vertical ? 940 * u : 560 * u, display: "flex", alignItems: "center", gap: 28 * u }}>
      <div style={{ width: 140 * u, borderRadius: 18 * u, overflow: "hidden", background: paleta.papel, boxShadow: "0 14px 30px rgba(0,0,0,0.45)", rotate: `${interpolate(s, [0, 1], [-25, -4])}deg`, scale: interpolate(s, [0, 1], [0.4, 1]) }}>
        <div style={{ background: paleta.acento, color: paleta.fondo, fontFamily: sans, fontWeight: 900, fontSize: 24 * u, textAlign: "center", padding: `${6 * u}px 0`, letterSpacing: 4 }}>DÍA</div>
        <div style={{ fontFamily: serif, fontWeight: 900, fontSize: 84 * u, textAlign: "center", color: "#1b1b1b", lineHeight: 1.15 }}>{dia}</div>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: sans, fontWeight: 800, fontSize: 26 * u, color: paleta.texto, opacity: 0.9, letterSpacing: 3, marginBottom: 10 * u, textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}>{dia} / 30</div>
        <div style={{ height: 12 * u, borderRadius: 6 * u, background: "rgba(255,255,255,0.25)", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${(interpolate(s, [0, 1], [Math.max(0, dia - 2), dia]) / 30) * 100}%`, background: paleta.acento }} />
        </div>
      </div>
    </div>
  );
};

// Subtítulos karaoke. Tiempos estimados por longitud de palabra.
export const Subtitulos: React.FC<{ texto: string; duracionAudio: number; paleta: Paleta }> = ({ texto, duracionAudio, paleta }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { u, vertical } = useU();
  const palabras = texto.split(/\s+/).filter(Boolean);
  const pesos = palabras.map((p) => p.replace(/[^\p{L}\p{N}]/gu, "").length + 2 + (/[.,;:!?…]$/.test(p) ? 5 : 0));
  const total = pesos.reduce((a, b) => a + b, 0);
  const t = f / fps;
  let acum = 0;
  const tiempos = pesos.map((w) => {
    const ini = (acum / total) * duracionAudio * 0.97;
    acum += w;
    return ini;
  });
  let actual = 0;
  for (let i = 0; i < tiempos.length; i++) if (t >= tiempos[i]) actual = i;
  const max = vertical ? 4 : 7;
  const grupos: number[][] = [];
  let g: number[] = [];
  palabras.forEach((p, i) => {
    g.push(i);
    if (g.length >= max || /[.,;:!?…]$/.test(p)) { grupos.push(g); g = []; }
  });
  if (g.length) grupos.push(g);
  const grupo = grupos.find((gr) => gr.includes(actual)) ?? grupos[0];
  if (!grupo || t > duracionAudio + 0.3) return null;
  const pop = interpolate(t - tiempos[grupo[0]], [0, 0.12], [0.92, 1], clamp);
  return (
    <div style={{ position: "absolute", left: 80 * u, right: 80 * u, ...(vertical ? { top: 1380 * u } : { bottom: 70 * u }), display: "flex", justifyContent: "center" }}>
      <div style={{ textAlign: "center", fontFamily: sans, fontWeight: 900, fontSize: (vertical ? 70 : 50) * u, lineHeight: 1.18, textTransform: vertical ? "uppercase" : "none", scale: pop }}>
        {grupo.map((i) => (
          <span key={i} style={{ color: i === actual ? paleta.acento : "#fff", WebkitTextStroke: `${(vertical ? 3 : 2.4) * u}px rgba(0,0,0,0.85)`, paintOrder: "stroke fill", textShadow: "0 6px 18px rgba(0,0,0,0.6)", marginRight: 16 * u, display: "inline-block" }}>
            {palabras[i]}
          </span>
        ))}
      </div>
    </div>
  );
};

export const Capitulo: React.FC<{ titulo: string; numero: number; paleta: Paleta }> = ({ titulo, numero, paleta }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { u } = useU();
  const o = interpolate(f, [0, 8, fps * 2.6, fps * 3.2], [0, 1, 1, 0], clamp);
  const s = spring({ frame: f, fps, config: { damping: 200 } });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", background: `linear-gradient(180deg, rgba(0,0,0,0.0), rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0))`, opacity: o }}>
      <div style={{ fontFamily: sans, fontWeight: 900, fontSize: 40 * u, letterSpacing: 12 * u, color: paleta.acento }}>SEMANA {numero}</div>
      <div style={{ width: interpolate(s, [0, 1], [0, 420 * u]), height: 5 * u, background: paleta.acento, margin: `${20 * u}px 0` }} />
      <div style={{ fontFamily: serif, fontWeight: 900, fontSize: 110 * u, color: "#fff", textAlign: "center", maxWidth: 1500 * u, textShadow: "0 10px 40px rgba(0,0,0,0.7)", translate: `0px ${interpolate(s, [0, 1], [30, 0])}px` }}>{titulo}</div>
    </AbsoluteFill>
  );
};

export const Titulo: React.FC<{ titulo: string; lugar: string; epoca: string; paleta: Paleta; desde: number }> = ({ titulo, lugar, epoca, paleta, desde }) => {
  const f = useCurrentFrame() - desde;
  const { fps } = useVideoConfig();
  const { u, vertical } = useU();
  if (f < 0) return null;
  const s1 = spring({ frame: f, fps, config: { damping: 200 } });
  const s2 = spring({ frame: f - 6, fps, config: { damping: 11, stiffness: 110 } });
  const fuera = vertical ? 1 : interpolate(f, [fps * 5, fps * 5.8], [1, 0], clamp);
  return (
    <AbsoluteFill style={vertical
      ? { alignItems: "center", paddingTop: 260 * u, background: "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 50%)" }
      : { alignItems: "flex-start", justifyContent: "center", paddingLeft: 110 * u, paddingBottom: 120 * u, opacity: fuera, background: "linear-gradient(90deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 55%)" }}>
      <div style={{ fontFamily: sans, fontWeight: 900, fontSize: 42 * u, letterSpacing: 10 * u, color: paleta.acento, opacity: s1 }}>UN MES EN LA VIDA DE</div>
      <div style={{ fontFamily: serif, fontWeight: 900, fontSize: (titulo.length > 18 ? 110 : 140) * u, lineHeight: 1.02, color: "#fff", marginTop: 14 * u, textAlign: vertical ? "center" : "left", maxWidth: (vertical ? 1000 : 900) * u, textShadow: "0 12px 40px rgba(0,0,0,0.6)", scale: interpolate(s2, [0, 1], [0.7, 1]), opacity: s2 }}>{titulo}</div>
      <div style={{ fontFamily: sans, fontWeight: 800, fontSize: 36 * u, color: "#fff", opacity: s1 * 0.9, marginTop: 20 * u, letterSpacing: 3, textTransform: "uppercase" }}>{lugar} · {epoca}</div>
    </AbsoluteFill>
  );
};

export const LlamadaFinal: React.FC<{ texto: string; paleta: Paleta }> = ({ texto, paleta }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { u, vertical } = useU();
  const s = spring({ frame: f - fps * 0.4, fps, config: { damping: 12 } });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start", paddingTop: (vertical ? 300 : 70) * u }}>
      <div style={{ background: paleta.acento, color: paleta.fondo, fontFamily: sans, fontWeight: 900, fontSize: 52 * u, padding: `${22 * u}px ${48 * u}px`, borderRadius: 999, scale: interpolate(s, [0, 1], [0.5, 1]), opacity: s, boxShadow: "0 20px 50px rgba(0,0,0,0.5)" }}>
        {texto}
      </div>
    </AbsoluteFill>
  );
};

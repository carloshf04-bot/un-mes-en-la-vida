import React from "react";
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { Insercion as Ins, Paleta } from "../tipos";
import { emoji, mano, sans, serif } from "../fuentes";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const Insercion: React.FC<{ ins: Ins; paleta: Paleta; dur: number }> = ({ ins, paleta, dur }) => {
  const f = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const u = Math.min(width, height) / 1080;
  const vertical = height > width;
  const entrada = spring({ frame: f, fps, config: { damping: 16 } });
  const caja: React.CSSProperties = { scale: interpolate(entrada, [0, 1], [0.85, 1]), opacity: entrada, marginTop: vertical ? -380 * u : -60 * u };

  if (ins.tipo === "dato") {
    const m = ins.valor.match(/^(-?)([\d.]+)(.*)$/);
    const obj = m ? parseInt(m[2].replace(/\./g, ""), 10) : NaN;
    const k = interpolate(f, [fps * 0.2, fps * 1.6], [0, 1], { ...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1) });
    const txt = m && !isNaN(obj) ? `${m[1]}${Math.round(obj * k).toLocaleString("es-ES")}${m[3]}` : ins.valor;
    return (
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ ...caja, textAlign: "center" }}>
          {ins.icono && <div style={{ fontFamily: emoji, fontSize: 150 * u, translate: `0px ${Math.sin(f / 16) * 10}px` }}>{ins.icono}</div>}
          <div style={{ fontFamily: serif, fontWeight: 900, fontSize: (txt.length > 7 ? 170 : 240) * u, color: paleta.acento, lineHeight: 1, textShadow: "0 20px 60px rgba(0,0,0,0.6)" }}>{txt}</div>
          <div style={{ fontFamily: sans, fontWeight: 800, fontSize: 52 * u, color: paleta.texto, maxWidth: 900 * u, marginTop: 24 * u, textTransform: "uppercase", letterSpacing: 2, opacity: interpolate(f, [fps * 0.8, fps * 1.3], [0, 1], clamp) }}>
            {ins.etiqueta}
          </div>
        </div>
      </AbsoluteFill>
    );
  }
  if (ins.tipo === "cita") {
    const n = Math.floor(interpolate(f, [fps * 0.4, Math.max(fps * 0.5, dur * 0.65)], [0, ins.frase.length], clamp));
    return (
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ ...caja, width: 860 * u, background: paleta.papel, borderRadius: 10, padding: `${70 * u}px ${70 * u}px`, boxShadow: "0 40px 90px rgba(0,0,0,0.55)", rotate: `${interpolate(f, [0, dur], [-2.5, -1])}deg`, backgroundImage: `repeating-linear-gradient(transparent 0 ${78 * u}px, rgba(60,90,140,0.18) ${78 * u}px ${80 * u}px)` }}>
          <div style={{ fontFamily: mano, fontSize: 72 * u, lineHeight: `${80 * u}px`, color: "#2b2118", minHeight: 320 * u }}>
            “{ins.frase.slice(0, n)}{n >= ins.frase.length ? "”" : <span style={{ opacity: f % 16 < 8 ? 1 : 0 }}>|</span>}
          </div>
          {ins.firma && <div style={{ fontFamily: sans, fontWeight: 800, fontSize: 30 * u, color: "#6b5a48", marginTop: 30 * u, letterSpacing: 3, textTransform: "uppercase", opacity: n >= ins.frase.length ? 1 : 0 }}>— {ins.firma}</div>}
        </div>
      </AbsoluteFill>
    );
  }
  if (ins.tipo === "objetos") {
    const paso = Math.min(fps * 0.9, (dur * 0.6) / Math.max(1, ins.items.length));
    const items = ins.items.slice(0, 4);
    return (
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ ...caja, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ fontFamily: serif, fontWeight: 900, fontSize: 76 * u, color: paleta.texto, textAlign: "center", textShadow: "0 8px 30px rgba(0,0,0,0.6)" }}>{ins.titulo}</div>
          <div style={{ display: "flex", flexWrap: vertical ? "wrap" : "nowrap", justifyContent: "center", gap: 36 * u, marginTop: 50 * u, width: vertical ? 920 * u : undefined }}>
            {items.map((it, i) => {
              const s = spring({ frame: f - fps * 0.3 - i * paso, fps, config: { damping: 12 } });
              return (
                <div key={i} style={{ width: 400 * u, height: 320 * u, borderRadius: 34 * u, background: "rgba(10,10,20,0.55)", border: `${3 * u}px solid ${paleta.acento}88`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", scale: interpolate(s, [0, 1], [0.3, 1]), opacity: s }}>
                  <div style={{ fontFamily: emoji, fontSize: 140 * u }}>{it.icono}</div>
                  <div style={{ fontFamily: sans, fontWeight: 800, fontSize: 36 * u, color: paleta.texto, marginTop: 12 * u, textAlign: "center", padding: `0 ${18 * u}px` }}>{it.nombre}</div>
                </div>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>
    );
  }
  // mapa
  const trazo = interpolate(f, [fps * 0.3, fps * 2], [0, 1], clamp);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div style={{ ...caja, width: 900 * u, height: 640 * u, background: "#e9dcb8", borderRadius: 20 * u, boxShadow: "0 40px 90px rgba(0,0,0,0.55)", position: "relative", overflow: "hidden" }}>
        <svg viewBox="0 0 900 640" width="100%" height="100%">
          <path d="M80 520 Q160 380 120 280 Q100 160 240 120 Q380 80 460 180 Q560 300 700 240 Q820 190 840 360 Q850 500 700 560 Q500 620 300 590 Q140 600 80 520Z" fill="#c9b98a" stroke="#8a7a5a" strokeWidth={6} />
          <path d="M150 480 Q300 300 450 360 T700 300" stroke="#8a2b22" strokeWidth={8} fill="none" strokeDasharray="22 16" pathLength={1} style={{ strokeDasharray: `${trazo} 1` }} />
          <g transform="translate(780 120)"><circle r={50} fill="none" stroke="#5a4a32" strokeWidth={4} /><path d="M0 -60 L12 0 L0 60 L-12 0Z" fill="#5a4a32" /><text y={-70} textAnchor="middle" fontSize={30} fill="#5a4a32" fontWeight={900}>N</text></g>
        </svg>
        <div style={{ position: "absolute", left: 0, right: 0, top: 230 * u, textAlign: "center", fontFamily: emoji, fontSize: 110 * u, translate: `0px ${interpolate(spring({ frame: f - fps, fps }), [0, 1], [-200, 0])}px` }}>{ins.icono ?? "📍"}</div>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 40 * u, textAlign: "center", fontFamily: serif, fontWeight: 900, fontSize: 64 * u, color: "#3a2a1a" }}>{ins.lugar}</div>
        {ins.detalle && <div style={{ position: "absolute", left: 150 * u, right: 150 * u, top: 30 * u, textAlign: "center", fontFamily: sans, fontWeight: 800, fontSize: 32 * u, color: "#5a4a32", letterSpacing: 3, textTransform: "uppercase" }}>{ins.detalle}</div>}
      </div>
    </AbsoluteFill>
  );
};

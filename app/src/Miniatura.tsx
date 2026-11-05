import React from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import type { Manifiesto, Escena } from "./tipos";
import type { Accion, Emocion } from "./personajes/tipos";
import { EscenaMundo } from "./mundo/EscenaMundo";
import { emoji, sans, serif } from "./fuentes";
import "./fuentes";

// Miniatura diseñada: fondo de la escena más potente, protagonista en primer plano y un gancho enorme.
export const Miniatura: React.FC<{ slug: string; manifiesto?: Manifiesto }> = ({ manifiesto: m }) => {
  const { width, height } = useVideoConfig();
  if (!m) return null;
  const vertical = height > width;
  const u = Math.min(width, height) / 720;
  const cfg = m.publicacion?.miniatura ?? { texto: m.titulo.toUpperCase() };
  const escenas = m.pieza.escenas;
  const base: Escena = escenas[Math.min(escenas.length - 1, Math.max(0, cfg.escena ?? 0))];
  const quien = cfg.quien ?? base.personajes?.[0]?.quien ?? Object.keys(m.reparto)[0];
  const escena: Escena = {
    ...base,
    insercion: undefined,
    camara: "retrato",
    personajes: [{ quien, x: 0, accion: (cfg.accion as Accion) ?? "quieto", emocion: (cfg.emocion as Emocion) ?? "sorpresa", mirar: vertical ? 1 : -1, habla: false }],
  };
  const palabras = cfg.texto.split(/\s+/);
  // el tamaño lo marca la palabra más larga, para que nunca se corte
  const maxPalabra = Math.max(...palabras.map((p) => p.length));
  const anchoDisponible = vertical ? width * 0.88 : 640 * u;
  const tam = Math.min((vertical ? 170 : 118) * u, anchoDisponible / (maxPalabra * 0.74));
  const trazo = { WebkitTextStroke: `${10 * u}px #0b0b0f`, paintOrder: "stroke fill" as const, textShadow: `0 ${10 * u}px ${30 * u}px rgba(0,0,0,0.6)` };

  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <EscenaMundo escena={escena} reparto={m.reparto} dur={60} id="mini" env={[]} />
      <AbsoluteFill
        style={{
          background: vertical
            ? "linear-gradient(180deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 38%, rgba(0,0,0,0) 55%)"
            : "linear-gradient(90deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.55) 38%, rgba(0,0,0,0) 62%)",
        }}
      />
      <AbsoluteFill style={{ boxShadow: `inset 0 0 ${120 * u}px rgba(0,0,0,0.7)` }} />
      {cfg.icono && (
        <div style={{ position: "absolute", fontFamily: emoji, fontSize: (vertical ? 210 : 170) * u, ...(vertical ? { right: 40 * u, top: 760 * u } : { right: 60 * u, top: 40 * u }), rotate: "12deg", filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.6))" }}>
          {cfg.icono}
        </div>
      )}
      <div
        style={{
          position: "absolute",
          ...(vertical ? { left: 50 * u, right: 50 * u, top: 120 * u, textAlign: "center" as const } : { left: 52 * u, top: 0, bottom: 0, width: 640 * u, display: "flex", flexDirection: "column" as const, justifyContent: "center" }),
        }}
      >
        <div style={{ display: "inline-block", alignSelf: "flex-start", background: m.paleta.acento, color: "#111", fontFamily: sans, fontWeight: 900, fontSize: 26 * u, letterSpacing: 4 * u, padding: `${8 * u}px ${18 * u}px`, borderRadius: 8 * u, marginBottom: 18 * u, rotate: "-2deg" }}>
          UN MES EN LA VIDA DE {m.titulo.toUpperCase()}
        </div>
        <div style={{ fontFamily: sans, fontWeight: 900, fontSize: tam, lineHeight: 0.98, textTransform: "uppercase", letterSpacing: -1 * u }}>
          {palabras.map((p, i) => (
            <span key={i} style={{ color: i === palabras.length - 1 || palabras.length === 1 ? m.paleta.acento : "#fff", ...trazo, marginRight: 22 * u, display: "inline-block" }}>
              {p}
            </span>
          ))}
        </div>
        <div style={{ fontFamily: serif, fontWeight: 900, fontSize: 34 * u, color: "#fff", marginTop: 18 * u, ...trazo, WebkitTextStroke: `${6 * u}px #0b0b0f` }}>
          {m.epoca}
        </div>
      </div>
    </AbsoluteFill>
  );
};

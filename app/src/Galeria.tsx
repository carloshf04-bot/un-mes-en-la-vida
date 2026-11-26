import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Prop } from "./mundo/Props";

// Galería de decorados para revisar props nuevos sin hacer un episodio:
// npx remotion still Galeria salida.png --props='{"tipos":["dc3","camion-gaz"],"noche":false}'
export const Galeria: React.FC<{ tipos: string[]; noche?: boolean }> = ({ tipos, noche = false }) => {
  const f = useCurrentFrame();
  const cols = Math.min(3, tipos.length || 1);
  const filas = Math.ceil(tipos.length / cols);
  const w = 1920 / cols, h = 1080 / filas;
  return (
    <AbsoluteFill style={{ background: noche ? "#1c2438" : "#cfe0ea" }}>
      <svg width={1920} height={1080}>
        {tipos.map((t, i) => {
          const cx = (i % cols) * w + w / 2, base = Math.floor(i / cols) * h + h - 40;
          const s = Math.min(w / 1700, h / 1000);
          return (
            <g key={t}>
              <rect x={(i % cols) * w} y={base} width={w} height={40} fill={noche ? "#2a2a2a" : "#b8a888"} />
              <g transform={`translate(${cx} ${base}) scale(${s})`}><Prop tipo={t} f={f} noche={noche} dur={120} /></g>
              <text x={(i % cols) * w + 16} y={Math.floor(i / cols) * h + 36} fontSize={28} fontFamily="sans-serif" fill={noche ? "#fff" : "#222"}>{t}</text>
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

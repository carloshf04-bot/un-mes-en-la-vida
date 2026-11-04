import React from "react";
import { AbsoluteFill, interpolate, Easing, useCurrentFrame, useVideoConfig } from "remotion";
import { DibujarFondo } from "./Fondo";
import { MW, MH, SUELO, CX, xMundo } from "./constantes";
import { Personaje } from "../personajes/Personaje";
import type { Escena } from "../tipos";
import type { Look } from "../personajes/tipos";

const ENTRADA = 40; // frames que tarda en entrar/salir andando

export const EscenaMundo: React.FC<{
  escena: Escena; reparto: Record<string, Look>; dur: number; id: string; env: number[]; desenfoque?: boolean; desenfoqueDesde?: number;
}> = ({ escena, reparto, dur, id, env, desenfoque, desenfoqueDesde }) => {
  const f = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const fondo = escena.fondo ?? { lugar: "campo" };
  const personajes = escena.personajes ?? [];
  const prota = personajes[0];
  const cam = escena.camara ?? "lenta";
  const horizontal = width > height;
  const kP = horizontal ? 600 : 420; // separación de personajes
  const kD = horizontal ? 600 : 300; // separación de decorados
  const p = f / Math.max(1, dur);
  const ease = Easing.inOut(Easing.cubic)(Math.min(1, p));

  // cámara: escala + punto de foco (en coordenadas del mundo)
  let s = 1.0 + 0.05 * ease;
  let fx = CX;
  let fy = 960;
  if (cam === "cerca") {
    s = 1.42 + 0.06 * ease;
    fx = xMundo(prota?.x ?? 0, kP);
    fy = SUELO - 430;
  } else if (cam === "paneo") {
    s = 1.12;
    fx = CX + interpolate(ease, [0, 1], [-110, 110]);
  } else if (cam === "general") {
    s = 1.0;
  } else if (cam === "subir") {
    s = 1.1;
    fy = interpolate(ease, [0, 1], [1080, 800]);
  }
  if (horizontal && cam !== "cerca") fy += 20;

  const boca = (() => {
    const v = env[Math.min(env.length - 1, Math.max(0, f))] ?? 0;
    return v < 0.12 ? 0 : Math.min(1, v * 1.1);
  })();

  return (
    <AbsoluteFill style={{ filter: desenfoque || (desenfoqueDesde !== undefined && f >= desenfoqueDesde) ? "blur(14px) brightness(0.55)" : undefined }}>
      <svg width={width} height={height} viewBox={`0 0 ${MW} ${MH}`} preserveAspectRatio="xMidYMid slice">
        <g transform={`translate(${CX} 960) scale(${s}) translate(${-fx} ${-fy})`}>
          <DibujarFondo fondo={fondo} f={f} dur={dur} id={id} capa="fondo" k={kD} />
          {personajes.map((pj, i) => {
            const look = reparto[pj.quien];
            if (!look) return null;
            let x = xMundo(pj.x ?? 0, kP);
            let accion = pj.accion ?? (pj.habla ?? i === 0 ? "hablar" : "quieto");
            let mirar = pj.mirar ?? (pj.x && pj.x > 0.2 ? -1 : 1);
            if (pj.entra) {
              const desde = pj.entra === "izq" ? -260 : MW + 260;
              const k = interpolate(f, [0, ENTRADA], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              x = interpolate(k, [0, 1], [desde, x]);
              if (k < 1) {
                accion = "caminar";
                mirar = pj.entra === "izq" ? 1 : -1;
              }
            }
            if (pj.sale) {
              const hasta = pj.sale === "izq" ? -260 : MW + 260;
              const k = interpolate(f, [dur - ENTRADA, dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              x = interpolate(k, [0, 1], [x, hasta]);
              if (k > 0) {
                accion = "caminar";
                mirar = pj.sale === "izq" ? -1 : 1;
              }
            }
            const habla = pj.habla ?? i === 0;
            return (
              <g key={i} transform={`translate(${x} ${SUELO + 10}) scale(${mirar * (pj.escala ?? 1)} ${pj.escala ?? 1})`}>
                <Personaje look={look} accion={accion} emocion={pj.emocion} f={f} semilla={i + 1} boca={habla && accion !== "dormir" ? boca : 0} objeto={pj.objeto} />
              </g>
            );
          })}
          <DibujarFondo fondo={fondo} f={f} dur={dur} id={id} capa="frente" k={kD} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};

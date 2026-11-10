import React from "react";
import { AbsoluteFill, interpolate, Easing, useCurrentFrame, useVideoConfig } from "remotion";
import { DibujarFondo } from "./Fondo";
import { MW, MH, SUELO, CX, xMundo } from "./constantes";
import { Personaje } from "../personajes/Personaje";
import type { Escena } from "../tipos";
import type { Look } from "../personajes/tipos";

const ENTRADA = 50; // frames que tarda en entrar/salir andando
const ZANCADA = 105; // px de desplazamiento por radián de fase del paso (pies sin resbalar)
const MEZCLA = 10; // frames para fundir un cambio de pose
const suave = Easing.inOut(Easing.cubic);

export const EscenaMundo: React.FC<{
  escena: Escena; reparto: Record<string, Look>; dur: number; id: string; env: number[]; desenfoque?: boolean; desenfoqueDesde?: number;
  previa?: Escena; // escena anterior si el plano continúa (mismo fondo): los personajes enlazan posición y pose
  adelanto?: number; // frames que la imagen empieza antes que la voz (fundido encadenado)
}> = ({ escena, reparto, dur, id, env, desenfoque, desenfoqueDesde, previa, adelanto = 0 }) => {
  const f = useCurrentFrame();
  const fv = f - adelanto; // frame relativo a la voz
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
  // leve deriva lateral en todos los planos (alterna el sentido) para que se note el paralaje
  const sentido = (id.length + (id.charCodeAt(id.length - 1) || 0)) % 2 === 0 ? 1 : -1;
  let s = 1.0 + 0.05 * ease;
  let fx = CX + sentido * interpolate(ease, [0, 1], [-45, 45]);
  let fy = 960;
  if (cam === "cerca") {
    s = 1.42 + 0.06 * ease;
    fx = xMundo(prota?.x ?? 0, kP) + sentido * interpolate(ease, [0, 1], [-25, 25]);
    fy = SUELO - 430;
  } else if (cam === "retrato") {
    // para miniaturas: protagonista grande y desplazado a la derecha (horizontal) o abajo (vertical)
    s = horizontal ? 1.7 : 1.6;
    fx = xMundo(prota?.x ?? 0, kP) - (horizontal ? 300 : 0);
    fy = horizontal ? SUELO - 500 : SUELO - 640;
  } else if (cam === "paneo") {
    s = 1.12;
    fx = CX + interpolate(ease, [0, 1], [-110, 110]);
  } else if (cam === "general") {
    s = 1.0 + 0.02 * ease;
  } else if (cam === "subir") {
    s = 1.1;
    fy = interpolate(ease, [0, 1], [1080, 800]);
  }
  if (horizontal && cam !== "cerca") fy += 20;

  const boca = (() => {
    if (fv < 0) return 0;
    const v = env[Math.min(env.length - 1, fv)] ?? 0;
    return v < 0.12 ? 0 : Math.min(1, v * 1.1);
  })();

  return (
    <AbsoluteFill style={{ filter: desenfoque || (desenfoqueDesde !== undefined && f >= desenfoqueDesde) ? "blur(14px) brightness(0.55)" : undefined }}>
      <svg width={width} height={height} viewBox={`0 0 ${MW} ${MH}`} preserveAspectRatio="xMidYMid slice">
        <g transform={`translate(${CX} 960) scale(${s}) translate(${-fx} ${-fy})`}>
          <DibujarFondo fondo={fondo} f={f} dur={dur} id={id} capa="fondo" k={kD} cam={{ fx, fy }} />
          {personajes.map((pj, i) => {
            const look = reparto[pj.quien];
            if (!look) return null;
            const destinoX = xMundo(pj.x ?? 0, kP);
            let x = destinoX;
            const objetivo = pj.accion ?? (pj.habla ?? i === 0 ? "hablar" : "quieto");
            let accion = objetivo;
            let mirar = pj.mirar ?? (pj.x && pj.x > 0.2 ? -1 : 1);
            let fase: number | undefined;
            let previaAccion: typeof accion | undefined;
            let mezcla = 1;
            // continuidad: si el personaje ya estaba en el plano anterior, sale de donde estaba
            const antes = previa?.personajes?.find((q) => q.quien === pj.quien);
            if (antes && !pj.entra) {
              const xa = antes.sale ? null : xMundo(antes.x ?? 0, kP);
              const accA = antes.accion ?? (antes.habla ?? previa!.personajes![0] === antes ? "hablar" : "quieto");
              if (xa !== null && Math.abs(xa - destinoX) > 4) {
                // camina hasta su nuevo sitio
                const t = Math.min(ENTRADA, Math.max(14, Math.abs(xa - destinoX) / 9));
                const k = suave(Math.min(1, f / t));
                x = xa + (destinoX - xa) * k;
                if (k < 1) {
                  accion = "caminar";
                  mirar = destinoX > xa ? 1 : -1;
                  fase = Math.abs(x - xa) / ZANCADA;
                } else {
                  previaAccion = "caminar";
                  mezcla = (f - t) / MEZCLA;
                }
              } else if (xa !== null && accA !== objetivo) {
                previaAccion = accA === "caminar" ? "quieto" : accA;
                mezcla = f / MEZCLA;
              }
            }
            if (pj.entra) {
              const desde = pj.entra === "izq" ? -260 : MW + 260;
              const k = suave(Math.min(1, Math.max(0, f / ENTRADA)));
              x = desde + (destinoX - desde) * k;
              if (k < 1) {
                accion = objetivo === "correr" ? "correr" : objetivo === "tambalear" ? "tambalear" : "caminar";
                mirar = pj.entra === "izq" ? 1 : -1;
                fase = Math.abs(x - desde) / (accion === "correr" ? ZANCADA * 1.8 : accion === "tambalear" ? ZANCADA * 0.6 : ZANCADA);
              } else {
                previaAccion = "caminar";
                mezcla = (f - ENTRADA) / MEZCLA;
              }
            } else if (!antes && (objetivo === "caminar" || objetivo === "tambalear")) {
              // "caminar" sin entrar: da unos pasos hasta su sitio y se para (los pies no patinan)
              const dir = pj.mirar ?? (pj.x && pj.x > 0.2 ? -1 : 1);
              const tramo = objetivo === "tambalear" ? 260 : 420;
              const t = objetivo === "tambalear" ? dur : 66;
              const k = objetivo === "tambalear" ? Math.min(1, f / t) : suave(Math.min(1, f / t));
              x = destinoX - dir * tramo * (1 - k);
              fase = (tramo * k) / (objetivo === "tambalear" ? ZANCADA * 0.6 : ZANCADA);
              if (objetivo === "caminar" && k >= 1) {
                accion = "quieto";
                previaAccion = "caminar";
                mezcla = (f - t) / MEZCLA;
              }
            }
            if (pj.sale) {
              const hasta = pj.sale === "izq" ? -260 : MW + 260;
              const k = suave(Math.min(1, Math.max(0, (f - (dur - ENTRADA)) / ENTRADA)));
              if (k > 0) {
                const x0 = x;
                x = x0 + (hasta - x0) * k;
                accion = objetivo === "correr" ? "correr" : "caminar";
                mirar = pj.sale === "izq" ? -1 : 1;
                fase = Math.abs(x - x0) / ZANCADA;
                previaAccion = undefined;
              }
            }
            const habla = pj.habla ?? i === 0;
            return (
              <g key={i} transform={`translate(${x} ${SUELO + 10}) scale(${mirar * (pj.escala ?? 1)} ${pj.escala ?? 1})`}>
                <Personaje look={look} accion={accion} emocion={pj.emocion} f={f} semilla={i + 1} boca={habla && accion !== "dormir" ? boca : 0} objeto={pj.objeto} fase={fase} previa={previaAccion} mezcla={mezcla} />
              </g>
            );
          })}
          <DibujarFondo fondo={fondo} f={f} dur={dur} id={id} capa="frente" k={kD} cam={{ fx, fy }} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};

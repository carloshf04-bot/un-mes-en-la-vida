import React from "react";
import { AbsoluteFill, Sequence, staticFile, useVideoConfig, interpolate } from "remotion";
import { Audio } from "@remotion/media";
import type { Manifiesto } from "./tipos";
import { EscenaMundo } from "./mundo/EscenaMundo";
import { Insercion } from "./inserciones/Insercion";
import { Calendario, Capitulo, Fundido, Grano, LlamadaFinal, Subtitulos, Titulo } from "./ui/Ui";
import "./fuentes";

const COLCHON = 0.5;
const CRUCE = 10; // frames de fundido encadenado entre planos distintos (sin pasar por negro)

export const bloques = (m: Manifiesto) => {
  let inicio = 0;
  return m.pieza.audios.map((a) => {
    const dur = Math.ceil((a.duracion + COLCHON) * m.fps);
    const b = { inicio, dur };
    inicio += dur;
    return b;
  });
};
export const duracionTotal = (m: Manifiesto) => {
  const b = bloques(m);
  return b[b.length - 1].inicio + b[b.length - 1].dur + m.fps;
};

export const Video: React.FC<{ slug: string; manifiesto?: Manifiesto }> = ({ slug, manifiesto: m }) => {
  const { fps, durationInFrames } = useVideoConfig();
  if (!m) return null;
  const b = bloques(m);
  const esc = m.pieza.escenas;
  let numCap = 0;
  const caps = esc.map((e) => (e.capitulo ? ++numCap : 0));
  const base = `obras/${slug}/${m.formato}`;

  // tramos con voz (para bajar la música mientras se habla)
  const voces = m.pieza.audios.map((a, i) => [b[i].inicio, b[i].inicio + Math.ceil(a.duracion * fps)] as const);
  const BASE = 0.2; // música bajo la voz
  const ALTA = BASE * 3.5; // música en los huecos (unos 11 dB más)
  const volMusica = (fr: number) => {
    let hablando = 0;
    for (const [a, z] of voces) {
      // sube 10 frames antes y baja 14 frames después de cada frase (curva suave)
      const k = interpolate(fr, [a - 8, a, z, z + 14], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
      if (k > hablando) hablando = k;
      if (a > fr + 20) break;
    }
    const env = interpolate(fr, [0, fps * 2, Math.max(fps * 2 + 1, durationInFrames - fps * 2), Math.max(fps * 2 + 2, durationInFrames)], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    return env * (ALTA + (BASE - ALTA) * hablando);
  };

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* IMAGEN: cada plano entra encadenado sobre el anterior */}
      {esc.map((e, i) => {
        const bl = b[i];
        const ultimo = i === esc.length - 1;
        const dur = ultimo ? bl.dur + fps : bl.dur;
        const continua = i > 0 && JSON.stringify(esc[i - 1].fondo) === JSON.stringify(e.fondo) && !e.insercion && !esc[i - 1].insercion;
        const adelanto = i === 0 || continua ? 0 : Math.min(CRUCE, b[i - 1].dur - 1);
        const audio = m.pieza.audios[i];
        return (
          <Sequence key={`v${i}`} from={bl.inicio - adelanto} durationInFrames={dur + adelanto + (ultimo ? 0 : CRUCE)} name={`${i} ${e.texto.slice(0, 30)}`}>
            <Fundido dur={dur + adelanto + CRUCE} entrada={i === 0 ? 1 : continua ? 1 : adelanto} salida={ultimo ? fps : 0}>
              <EscenaMundo escena={e} reparto={m.reparto} dur={dur + adelanto} id={`e${i}`} env={audio.env} adelanto={adelanto} previa={continua ? esc[i - 1] : undefined}
                desenfoque={!!e.insercion && !e.capitulo} desenfoqueDesde={e.capitulo && e.insercion ? adelanto + Math.round(fps * 3.2) : undefined} />
              {e.insercion && (
                <Sequence from={adelanto + (e.capitulo ? Math.round(fps * 3.2) : 0)} layout="none">
                  <Insercion ins={e.insercion} paleta={m.paleta} dur={dur - (e.capitulo ? Math.round(fps * 3.2) : 0)} />
                </Sequence>
              )}
            </Fundido>
          </Sequence>
        );
      })}
      {/* TEXTOS Y SONIDO: pegados a la voz */}
      {esc.map((e, i) => {
        const bl = b[i];
        const ultimo = i === esc.length - 1;
        const dur = ultimo ? bl.dur + fps : bl.dur;
        const audio = m.pieza.audios[i];
        const amb = m.pieza.ambientes[i];
        return (
          <Sequence key={`a${i}`} from={bl.inicio} durationInFrames={dur} name={`texto ${i}`}>
            {i === 0 && <Titulo titulo={m.titulo} lugar={m.lugar} epoca={m.epoca} paleta={m.paleta} desde={0} />}
            {e.dia && !e.capitulo && <Calendario dia={e.dia} paleta={m.paleta} cambio={esc[i - 1]?.dia !== e.dia} />}
            {e.capitulo && <Capitulo titulo={e.capitulo} numero={caps[i]} paleta={m.paleta} />}
            {ultimo && <LlamadaFinal texto={m.formato === "short" ? "▶ El mes completo, en el canal" : "Suscríbete para el próximo mes"} paleta={m.paleta} />}
            {!m.sinSubtitulos && <Subtitulos texto={e.texto} duracionAudio={audio.duracion} paleta={m.paleta} tiempos={audio.tiempos} />}
            <Audio src={staticFile(`${base}/${audio.archivo}`)} />
            {amb && <Audio src={staticFile(`obras/${slug}/${amb}`)} loop volume={(fr) => interpolate(fr, [0, 12, Math.max(13, dur - 12), Math.max(14, dur)], [0, 0.3, 0.3, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />}
          </Sequence>
        );
      })}
      <Audio src={staticFile(`${base}/${m.musica_archivo}`)} volume={volMusica} />
      <Grano />
    </AbsoluteFill>
  );
};

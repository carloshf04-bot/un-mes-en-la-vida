// Sintetizador de música ambiental sin copyright. Devuelve un WAV mono 16 bit.
import { writeFileSync } from "node:fs";

const SR = 44100;
const midi = (n) => 440 * Math.pow(2, (n - 69) / 12);

// progresiones (notas MIDI) y carácter por estado de ánimo
const ESTILOS = {
  calma: { acordes: [[48, 55, 60, 64], [45, 52, 57, 60], [41, 48, 53, 57], [43, 50, 55, 59]], paso: 0.75, prob: 0.55, brillo: 0.3 },
  nostalgia: { acordes: [[45, 52, 57, 60], [41, 48, 53, 57], [48, 55, 60, 64], [43, 50, 55, 59]], paso: 0.9, prob: 0.5, brillo: 0.25 },
  tension: { acordes: [[38, 45, 50, 53], [37, 44, 49, 52], [34, 41, 46, 50], [36, 43, 48, 51]], paso: 1.2, prob: 0.35, brillo: 0.15, latido: true },
  epico: { acordes: [[43, 50, 55, 59], [48, 55, 60, 64], [45, 52, 57, 60], [41, 48, 53, 57]], paso: 0.5, prob: 0.6, brillo: 0.4, timbal: true },
  futuro: { acordes: [[40, 47, 52, 59], [43, 50, 55, 62], [38, 45, 50, 57], [45, 52, 57, 64]], paso: 0.25, prob: 0.7, brillo: 0.55, cuadrada: true },
  misterio: { acordes: [[45, 48, 51, 54], [44, 47, 50, 53], [41, 45, 48, 52], [40, 44, 47, 50]], paso: 1.0, prob: 0.4, brillo: 0.2 },
};

let semilla = 7;
const rnd = () => ((semilla = (semilla * 16807) % 2147483647) / 2147483647);

export const sintetizar = (estilo, segundos, ruta) => {
  const E = ESTILOS[estilo] ?? ESTILOS.calma;
  const N = Math.floor(SR * segundos);
  const out = new Float32Array(N);
  const dAcorde = 6; // segundos por acorde
  // pad + bajo
  for (let i = 0; i < N; i++) {
    const t = i / SR;
    const idx = Math.floor(t / dAcorde) % E.acordes.length;
    const fase = (t % dAcorde) / dAcorde;
    const env = Math.min(1, fase * 4) * Math.min(1, (1 - fase) * 6) * 0.6 + 0.4;
    let v = 0;
    E.acordes[idx].forEach((n, k) => {
      const fr = midi(n);
      v += (Math.sin(2 * Math.PI * fr * t) + 0.25 * Math.sin(4 * Math.PI * fr * t + k)) * (0.08 / (k * 0.4 + 1)) * (0.8 + 0.2 * Math.sin(t * (0.3 + k * 0.11)));
    });
    v += Math.sin(2 * Math.PI * midi(E.acordes[idx][0] - 12) * t) * 0.09;
    out[i] = v * env;
  }
  // arpegio / pulsaciones
  for (let t0 = 0; t0 < segundos - 1; t0 += E.paso) {
    if (rnd() > E.prob) continue;
    const idx = Math.floor(t0 / dAcorde) % E.acordes.length;
    const nota = E.acordes[idx][Math.floor(rnd() * 4)] + 12 + (rnd() > 0.7 ? 12 : 0);
    const fr = midi(nota);
    const largo = Math.floor(SR * 1.6);
    const i0 = Math.floor(t0 * SR);
    for (let j = 0; j < largo && i0 + j < N; j++) {
      const t = j / SR;
      const env = Math.exp(-t * 3.2) * Math.min(1, t * 200);
      let s = Math.sin(2 * Math.PI * fr * t);
      if (E.cuadrada) s = s + Math.sin(6 * Math.PI * fr * t) / 3 + Math.sin(10 * Math.PI * fr * t) / 5;
      s += E.brillo * Math.sin(4 * Math.PI * fr * t);
      out[i0 + j] += s * env * 0.07;
    }
  }
  // latido o timbal al inicio de cada acorde
  if (E.latido || E.timbal) {
    for (let t0 = 0; t0 < segundos - 1; t0 += E.latido ? 1.5 : dAcorde / 2) {
      const i0 = Math.floor(t0 * SR);
      for (let j = 0; j < SR * 0.8 && i0 + j < N; j++) {
        const t = j / SR;
        out[i0 + j] += Math.sin(2 * Math.PI * (E.timbal ? 70 : 55) * t * (1 - t * 0.4)) * Math.exp(-t * (E.timbal ? 5 : 9)) * 0.25;
      }
    }
  }
  // normalizar y escribir wav
  let pico = 0;
  for (let i = 0; i < N; i++) pico = Math.max(pico, Math.abs(out[i]));
  const buf = Buffer.alloc(44 + N * 2);
  buf.write("RIFF", 0); buf.writeUInt32LE(36 + N * 2, 4); buf.write("WAVE", 8); buf.write("fmt ", 12);
  buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(1, 22); buf.writeUInt32LE(SR, 24);
  buf.writeUInt32LE(SR * 2, 28); buf.writeUInt16LE(2, 32); buf.writeUInt16LE(16, 34); buf.write("data", 36); buf.writeUInt32LE(N * 2, 40);
  for (let i = 0; i < N; i++) buf.writeInt16LE(Math.round((out[i] / pico) * 0.8 * 32767), 44 + i * 2);
  writeFileSync(ruta, buf);
};

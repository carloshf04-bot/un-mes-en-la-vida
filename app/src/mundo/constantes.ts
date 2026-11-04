// El "mundo" es un lienzo cuadrado de 1920x1920.
// Horizontal (1920x1080) ve la franja central y = 420..1500
// Vertical  (1080x1920) ve la franja central x = 420..1500
export const MW = 1920;
export const MH = 1920;
export const SUELO = 1300; // donde pisan los personajes
export const HORIZONTE = 1120;
export const CX = 960;
export const xMundo = (x = 0, k = 420) => CX + x * k; // k: 420 personajes en vertical, 600 en horizontal

export const oscurecer = (hex: string, k = 0.18) => {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  const r = Math.round(((n >> 16) & 255) * (1 - k));
  const g = Math.round(((n >> 8) & 255) * (1 - k));
  const b = Math.round((n & 255) * (1 - k));
  return `rgb(${r},${g},${b})`;
};

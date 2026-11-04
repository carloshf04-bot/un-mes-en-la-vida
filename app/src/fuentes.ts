import { continueRender, delayRender, staticFile } from "remotion";

// Fuentes locales (en public/fuentes) para que el render no dependa de internet
const FUENTES = [
  { familia: "Playfair UnMes", archivo: "playfair-900.woff2", peso: "900" },
  { familia: "Caveat UnMes", archivo: "caveat-600.woff2", peso: "600" },
  { familia: "Inter UnMes", archivo: "inter-800.woff2", peso: "800" },
  { familia: "Inter UnMes", archivo: "inter-900.woff2", peso: "900" },
];

if (typeof window !== "undefined" && "FontFace" in window) {
  const h = delayRender("Cargando fuentes locales");
  Promise.all(
    FUENTES.map(async (f) => {
      const ff = new FontFace(f.familia, `url(${staticFile(`fuentes/${f.archivo}`)}) format("woff2")`, { weight: f.peso });
      await ff.load();
      document.fonts.add(ff);
    }),
  )
    .then(() => continueRender(h))
    .catch((e) => {
      console.error(e);
      continueRender(h);
    });
}

export const serif = "'Playfair UnMes', Georgia, serif";
export const sans = "'Inter UnMes', Inter, sans-serif";
export const mano = "'Caveat UnMes', cursive";
export const emoji = "'Noto Color Emoji', 'Apple Color Emoji', sans-serif";

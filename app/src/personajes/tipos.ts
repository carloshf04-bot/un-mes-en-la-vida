export type Look = {
  piel: string;
  pelo: string;
  peinado?: "corto" | "largo" | "calvo" | "mono" | "rizado" | "coleta" | "trenzas" | "rapado";
  barba?: "ninguna" | "bigote" | "corta" | "larga";
  ropa: {
    tipo: "camisa" | "tunica" | "vestido" | "abrigo" | "mono" | "armadura" | "traje" | "bata" | "uniforme" | "harapos";
    color: string; // parte de arriba
    color2: string; // pantalón / falda
    detalle?: string; // cinturón, botones, cuello
  };
  sombrero?: "ninguno" | "gorra" | "copa" | "ala" | "casco" | "corona" | "capucha" | "panuelo" | "espacial" | "boina" | "tricornio" | "yelmo";
  colorSombrero?: string;
  gafas?: boolean;
  altura?: number; // 1 = adulto, 0.65 = niño
  zapatos?: string;
};

export type Accion =
  | "quieto" | "hablar" | "caminar" | "correr" | "trabajar" | "saludar" | "sentado"
  | "pensar" | "celebrar" | "triste" | "senalar" | "cargar" | "dormir" | "escribir" | "asustado";
export type Emocion = "neutral" | "feliz" | "triste" | "miedo" | "enfado" | "sorpresa" | "cansado";

export type EnEscena = {
  quien: string; // clave del reparto
  x?: number; // -1 (izquierda) a 1 (derecha)
  accion?: Accion;
  emocion?: Emocion;
  mirar?: 1 | -1; // 1 = derecha
  objeto?: string; // emoji en la mano
  entra?: "izq" | "der";
  sale?: "izq" | "der";
  habla?: boolean; // mueve la boca con la voz en off
  escala?: number;
};

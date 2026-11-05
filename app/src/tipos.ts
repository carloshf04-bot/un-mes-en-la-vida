import type { Fondo } from "./mundo/Fondo";
import type { EnEscena, Look } from "./personajes/tipos";

export type Camara = "lenta" | "cerca" | "paneo" | "general" | "subir" | "retrato";
export type Insercion =
  | { tipo: "dato"; valor: string; etiqueta: string; icono?: string }
  | { tipo: "cita"; frase: string; firma?: string }
  | { tipo: "objetos"; titulo: string; items: { icono: string; nombre: string }[] }
  | { tipo: "mapa"; lugar: string; detalle?: string; icono?: string };

export type Escena = {
  dia?: number;
  capitulo?: string; // si existe, muestra cartela de capítulo al empezar la escena
  texto: string; // voz en off
  fondo?: Fondo; // si se omite, hereda el de la escena anterior
  personajes?: EnEscena[]; // si se omite, hereda; [] = nadie
  camara?: Camara;
  insercion?: Insercion; // tarjeta a pantalla completa sobre el fondo desenfocado
};

export type Paleta = { acento: string; texto: string; fondo: string; papel: string };

export type Pieza = { escenas: Escena[] }; // la primera escena es la portada, la última el cierre

export type Guion = {
  slug: string;
  titulo: string;
  lugar: string;
  epoca: string;
  categoria: "epoca" | "persona" | "profesion" | "futuro";
  voz?: string;
  velocidad?: number;
  musica?: "calma" | "tension" | "epico" | "futuro" | "nostalgia" | "misterio";
  paleta: Paleta;
  reparto: Record<string, Look>;
  largo: Pieza;
  short: Pieza;
  publicacion?: {
    tituloLargo: string; tituloShort: string; descripcion: string; etiquetas: string[];
    miniatura?: Miniatura;
  };
};

export type Audio = { archivo: string; duracion: number; env: number[] };
export type PiezaLista = { escenas: Escena[]; audios: Audio[]; ambientes: (string | null)[] };
export type Manifiesto = Omit<Guion, "largo" | "short"> & { fps: number; formato: "largo" | "short"; pieza: PiezaLista; musica_archivo: string };

// Miniatura de YouTube (1280x720) y portada del Short (1080x1920)
export type Miniatura = {
  texto: string; // 2–4 palabras en mayúsculas, el gancho ("¡SE HUNDE!")
  escena?: number; // índice de la escena del largo que sirve de fondo
  quien?: string; // personaje en primer plano (por defecto el primero de la escena)
  emocion?: "neutral" | "feliz" | "triste" | "miedo" | "enfado" | "sorpresa" | "cansado";
  accion?: string;
  icono?: string; // emoji grande opcional junto al personaje
};

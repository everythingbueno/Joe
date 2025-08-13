
export enum Platform {
  Instagram = "Instagram",
  TikTok = "TikTok",
  YouTube = "YouTube",
  Blog = "Blog",
}

export enum Niche {
  Food = "Food",
  Bebidas = "Bebidas",
  Lifestyle = "Lifestyle",
  Moda = "Moda",
  Viajes = "Viajes",
  Fitness = "Fitness",
  Comedia = "Comedia",
  Arte = "Arte",
  RealEstate = "Real Estate",
  Fotografia = "Fotografía",
}

export enum Level {
  Nano = "Nano (<10k)",
  Micro = "Micro (10k-100k)",
  Macro = "Macro (100k+)",
}

export enum OutreachStatus {
  NoContactado = "No contactado",
  MensajeEnviado = "Mensaje enviado",
  Seguimiento = "Seguimiento",
  Respondio = "Respondió",
  Acepto = "Aceptó",
  Declino = "Declinó",
}

export interface Creator {
  id: string;
  nombre: string;
  usuario: string;
  plataformas: Platform[];
  url_perfil: string;
  nicho: Niche[];
  ciudad: string;
  seguidores: number;
  engagement?: number;
  correo?: string;
  telefono?: string;
  media_kit_url?: string;
  nivel: Level;
  prioridad_top20: boolean;
  ranking?: number;
  preseleccionado: boolean;
  invitado_final: boolean;
  estado_outreach: OutreachStatus;
  fecha_ultimo_contacto?: Date;
  responsable?: string;
  notas: string;
  etiquetas: string[];
  costo_estimado?: number;
  tipo_canje?: string;
  evidencias?: string[];
}

export enum View {
  Todos = "Todos",
  Top20 = "Top 20",
  Preseleccion = "Pre-selección",
  Cena = "Cena (7)",
  Kanban = "Kanban",
}

export interface NewCreatorData {
  nombre: string;
  usuario: string;
  seguidores: number;
  plataformas: Platform[];
  nicho: Niche[];
  url_perfil: string;
  correo?: string;
}

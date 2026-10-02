// Consulta única a /api/ultimos compartida por banner y feed, con helpers
// para mostrar títulos de video como titulares (sin el "| Programa" final).

export type UltimoVideo = {
  videoId: string;
  titulo: string;
  cuando: string;
  vivo: boolean;
  enVivoAhora?: boolean;
  edadMin: number;
};

export type Slug = "psh" | "cdm" | "tsi" | "bs";

export type Ultimos = {
  programas: Partial<Record<Slug, UltimoVideo | null>>;
};

let ultimosPromise: Promise<Ultimos | null> | null = null;

export function consultarUltimos() {
  if (!ultimosPromise) {
    ultimosPromise = fetch("/api/ultimos")
      .then((r) => (r.ok ? r.json() : null))
      .catch(() => null);
  }
  return ultimosPromise;
}

// Los títulos de YouTube van separados con "|" ("🔴 EN VIVO | tema | Programa").
// Para la web queda el tramo con contenido: se saltean los avisos tipo
// "EN VIVO" o "AHORA" y los tramos muy cortos, y se corta en palabra.
export function tituloCorto(titulo: string, max = 88) {
  const partes = titulo
    .split(/\s*\|\s*/)
    .map((p) => p.trim())
    .filter(Boolean);
  const base =
    partes.find((p) => p.length >= 15 && !/en vivo|ahora/i.test(p.slice(0, 20))) ??
    [...partes].sort((a, b) => b.length - a.length)[0] ??
    titulo.trim();
  if (base.length <= max) return base;
  const corte = base.slice(0, max);
  const espacio = corte.lastIndexOf(" ");
  return (espacio > 40 ? corte.slice(0, espacio) : corte) + "…";
}

// Criterio del banner (Marcos, 1/10): el protagonista es el último PROGRAMA
// EMITIDO COMPLETO (vivos "Transmitido…"), no un corte. Un corte solo gana
// si ninguna lista tiene vivos. Si algo está al aire ahora, tiene edad cero
// y gana solo (además el banner en estado EN VIVO ya manda por su lado).
export function masReciente(u: Ultimos | null): UltimoVideo | null {
  if (!u?.programas) return null;
  const todos = Object.values(u.programas).filter(
    (v): v is UltimoVideo => !!v
  );
  const vivos = todos.filter((v) => v.vivo);
  const pool = vivos.length ? vivos : todos;
  let best: UltimoVideo | null = null;
  for (const v of pool) {
    if (!best || v.edadMin < best.edadMin) best = v;
  }
  return best;
}

export const urlVideo = (v: UltimoVideo) =>
  `https://www.youtube.com/watch?v=${v.videoId}`;

// Consulta única a /api/ultimos compartida por banner y feed, con helpers
// para mostrar títulos de video como titulares (sin el "| Programa" final).

export type UltimoVideo = {
  videoId: string;
  titulo: string;
  cuando: string;
  vivo: boolean;
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

// Los títulos de YouTube terminan en "| Poco se Habla" o "| Dopamina": para
// la web queda el titular solo, cortado en palabra si es muy largo.
export function tituloCorto(titulo: string, max = 88) {
  const base = titulo.split(/\s*\|\s*/)[0].trim() || titulo.trim();
  if (base.length <= max) return base;
  const corte = base.slice(0, max);
  const espacio = corte.lastIndexOf(" ");
  return (espacio > 40 ? corte.slice(0, espacio) : corte) + "…";
}

export function masReciente(u: Ultimos | null): UltimoVideo | null {
  if (!u?.programas) return null;
  let best: UltimoVideo | null = null;
  for (const v of Object.values(u.programas)) {
    if (v && (!best || v.edadMin < best.edadMin)) best = v;
  }
  return best;
}

export const urlVideo = (v: UltimoVideo) =>
  `https://www.youtube.com/watch?v=${v.videoId}`;

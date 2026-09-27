// Lógica de "aire": qué programa está en vivo ahora (o cuál viene después),
// según la grilla y la hora de Montevideo, con confirmación dinámica contra
// YouTube vía /api/live (si el canal está realmente transmitiendo, manda eso;
// si la consulta falla, la grilla horaria es el fallback).

export type Programa = {
  slug: string;
  nombre: string;
  dias: number[]; // 0=domingo ... 6=sábado
  desde: number; // minutos desde las 0:00
  hasta: number;
  url: string;
};

export const GRILLA: Programa[] = [
  {
    slug: "psh",
    nombre: "Poco Se Habla",
    dias: [1, 3],
    desde: 9 * 60,
    hasta: 10 * 60 + 30,
    url: "https://www.youtube.com/playlist?list=PLNFlrAum2DnoP-i4ohOh9jNDtJbR45DM4",
  },
  {
    slug: "cdm",
    nombre: "Campaña del Miedo",
    dias: [2, 4],
    desde: 9 * 60,
    hasta: 10 * 60 + 30,
    url: "https://youtube.com/playlist?list=PLNFlrAum2DnpP4eg2AcKF_5C5RwSBV2c9",
  },
  {
    slug: "tsi",
    nombre: "Todos Iguales",
    dias: [2, 4],
    desde: 20 * 60,
    hasta: 21 * 60 + 30,
    url: "https://www.youtube.com/playlist?list=PLNFlrAum2DnpKbUX_8kf8X1ysvdlk59Fo",
  },
  {
    slug: "bs",
    nombre: "Bufete Sentimental",
    dias: [5],
    desde: 9 * 60,
    hasta: 10 * 60 + 30,
    url: "https://www.youtube.com/playlist?list=PLNFlrAum2DnpbNEFwWwIGGtPpFdBie1EN",
  },
];

export const DIAS = [
  "domingo",
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
];

export function ahoraMvd() {
  const parts = new Intl.DateTimeFormat("es-UY", {
    timeZone: "America/Montevideo",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const map: Record<string, string> = {};
  parts.forEach((p) => {
    map[p.type] = p.value;
  });
  const wd: Record<string, number> = {
    dom: 0,
    lun: 1,
    mar: 2,
    mié: 3,
    jue: 4,
    vie: 5,
    sáb: 6,
  };
  const dia = wd[(map.weekday || "").slice(0, 3).toLowerCase()] ?? 0;
  return {
    dia,
    min: parseInt(map.hour, 10) * 60 + parseInt(map.minute, 10),
    hhmm: `${map.hour}:${map.minute}`,
  };
}

export function fmtHora(min: number) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${h}:${m < 10 ? "0" + m : m}`;
}

export type EstadoAire =
  | { live: true; show: Programa; hhmm: string; liveUrl?: string }
  | {
      live: false;
      next: { show: Programa; dia: number } | null;
      hhmm: string;
    };

export function estadoPorGrilla(): EstadoAire {
  const now = ahoraMvd();
  for (const p of GRILLA) {
    if (p.dias.includes(now.dia) && now.min >= p.desde && now.min < p.hasta) {
      return { live: true, show: p, hhmm: now.hhmm };
    }
  }
  let best: { score: number; show: Programa; dia: number } | null = null;
  for (let d = 0; d < 8; d++) {
    const dia = (now.dia + d) % 7;
    for (const q of GRILLA) {
      if (!q.dias.includes(dia)) continue;
      if (d === 0 && q.desde <= now.min) continue;
      const score = d * 1440 + q.desde - (d === 0 ? now.min : 0);
      if (!best || score < best.score) best = { score, show: q, dia };
    }
    if (best && d > 0) break;
  }
  return { live: false, next: best ? { show: best.show, dia: best.dia } : null, hhmm: now.hhmm };
}

// Consulta única a /api/live compartida por todos los componentes del cliente.
let livePromise: Promise<{ live: boolean | null; videoId?: string } | null> | null = null;

export function consultarLive() {
  if (!livePromise) {
    livePromise = fetch("/api/live")
      .then((r) => (r.ok ? r.json() : null))
      .catch(() => null);
  }
  return livePromise;
}

// El estado combinado: si YouTube dice que hay vivo, gana YouTube (aunque la
// grilla diga otra cosa: cambios de horario, especiales, verano). Si YouTube
// dice que no hay vivo, o no responde, manda la grilla.
export async function estadoAire(): Promise<EstadoAire> {
  const grilla = estadoPorGrilla();
  const yt = await consultarLive();
  if (yt === null || yt.live === null) return grilla; // sin dato dinámico: fallback grilla

  if (yt.live) {
    const liveUrl = yt.videoId
      ? `https://www.youtube.com/watch?v=${yt.videoId}`
      : "https://www.youtube.com/@estoesdopamina/streams";
    if (grilla.live) return { ...grilla, liveUrl };
    // Vivo fuera de grilla (especial / cambio de horario): mostramos Dopamina en vivo.
    return {
      live: true,
      show: {
        slug: "dopamina",
        nombre: "Dopamina",
        dias: [],
        desde: 0,
        hasta: 0,
        url: liveUrl,
      },
      hhmm: grilla.hhmm,
      liveUrl,
    };
  }
  // YouTube dice que NO hay vivo: aunque la grilla marque horario, no mentimos.
  if (grilla.live) return estadoProximoDesdeGrilla(grilla.hhmm);
  return grilla;
}

function estadoProximoDesdeGrilla(hhmm: string): EstadoAire {
  const now = ahoraMvd();
  let best: { score: number; show: Programa; dia: number } | null = null;
  for (let d = 0; d < 8; d++) {
    const dia = (now.dia + d) % 7;
    for (const q of GRILLA) {
      if (!q.dias.includes(dia)) continue;
      if (d === 0 && q.desde <= now.min) continue;
      const score = d * 1440 + q.desde - (d === 0 ? now.min : 0);
      if (!best || score < best.score) best = { score, show: q, dia };
    }
    if (best && d > 0) break;
  }
  return { live: false, next: best ? { show: best.show, dia: best.dia } : null, hhmm };
}

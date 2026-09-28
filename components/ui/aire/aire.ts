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

// Transmisión programada en YouTube que todavía no arrancó ("Próximamente").
export type ProximaTx = {
  nombre: string; // programa detectado en el título, o "Dopamina"
  titulo?: string;
  url: string;
  inicioTxt: string | null; // "hoy 7:45h" / "mañana 7:45h" / "lunes 7:45h"
};

export type EstadoAire =
  | {
      live: true;
      show: Programa;
      hhmm: string;
      liveUrl?: string;
      videoId?: string;
      titulo?: string; // título del vivo en YouTube
    }
  | {
      live: false;
      upcoming?: ProximaTx | null;
      next: { show: Programa; dia: number } | null;
      hhmm: string;
    };

// Busca el nombre de un programa adentro del título del video.
export function detectarPrograma(titulo?: string): string | null {
  if (!titulo) return null;
  const pares: [RegExp, string][] = [
    [/poco se habla/i, "Poco Se Habla"],
    [/campaña del miedo/i, "Campaña del Miedo"],
    [/todos iguales/i, "Todos Iguales"],
    [/bufete/i, "Bufete Sentimental"],
  ];
  for (const [re, nombre] of pares) if (re.test(titulo)) return nombre;
  return null;
}

// unix (segundos) → "hoy 7:45h" / "mañana 7:45h" / "lunes 7:45h", hora MVD.
export function fmtInicio(unix?: number): string | null {
  if (!unix) return null;
  const partes = (dt: Date) => {
    const m: Record<string, string> = {};
    new Intl.DateTimeFormat("es-UY", {
      timeZone: "America/Montevideo",
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
      .formatToParts(dt)
      .forEach((p) => {
        m[p.type] = p.value;
      });
    return m;
  };
  const a = partes(new Date(unix * 1000));
  const hoy = partes(new Date());
  const man = partes(new Date(Date.now() + 86400000));
  const hora = `${parseInt(a.hour, 10)}:${a.minute}`;
  if (a.day === hoy.day && a.month === hoy.month) return `hoy ${hora}h`;
  if (a.day === man.day && a.month === man.month) return `mañana ${hora}h`;
  return `${a.weekday} ${hora}h`;
}

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
export type LiveInfo = {
  live: boolean | null;
  videoId?: string;
  titulo?: string;
  upcoming?: { videoId: string; titulo?: string; inicio?: number } | null;
};

let livePromise: Promise<LiveInfo | null> | null = null;

export function consultarLive() {
  if (!livePromise) {
    livePromise = fetch("/api/live")
      .then((r) => (r.ok ? r.json() : null))
      .catch(() => null);
  }
  return livePromise;
}

// El estado combinado: si YouTube dice que hay vivo AHORA, gana YouTube
// (cambios de horario, especiales, verano). Un vivo PROGRAMADO no es un vivo:
// se informa como próxima transmisión. Si YouTube no responde, manda la grilla.
export async function estadoAire(): Promise<EstadoAire> {
  const grilla = estadoPorGrilla();
  const yt = await consultarLive();
  if (yt === null || yt.live === null) return grilla; // sin dato dinámico: fallback grilla

  if (yt.live) {
    const liveUrl = yt.videoId
      ? `https://www.youtube.com/watch?v=${yt.videoId}`
      : "https://www.youtube.com/@estoesdopamina/streams";
    const extra = { liveUrl, videoId: yt.videoId, titulo: yt.titulo };
    if (grilla.live) return { ...grilla, ...extra };
    // Vivo fuera de grilla (especial / cambio de horario): nombre del programa
    // desde el título del vivo, o Dopamina a secas.
    return {
      live: true,
      show: {
        slug: "dopamina",
        nombre: detectarPrograma(yt.titulo) ?? "Dopamina",
        dias: [],
        desde: 0,
        hasta: 0,
        url: liveUrl,
      },
      hhmm: grilla.hhmm,
      ...extra,
    };
  }

  // No hay vivo: aunque la grilla marque horario, no mentimos.
  const base = grilla.live ? estadoProximoDesdeGrilla(grilla.hhmm) : grilla;
  if (base.live) return base; // no pasa, es para que TypeScript lo sepa
  const upcoming: ProximaTx | null = yt.upcoming
    ? {
        nombre: detectarPrograma(yt.upcoming.titulo) ?? "Dopamina",
        titulo: yt.upcoming.titulo,
        url: `https://www.youtube.com/watch?v=${yt.upcoming.videoId}`,
        inicioTxt: fmtInicio(yt.upcoming.inicio),
      }
    : null;
  return { ...base, upcoming };
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

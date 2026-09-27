import { NextResponse } from "next/server";

// Último video (vivo o corte) de la playlist de cada programa, leyendo la
// página pública de cada lista — sin API key, mismo criterio que /api/live.
// Verificado (set 2026): cada playlist ordena más-nuevo-primero, así que el
// primer lockupViewModel del HTML es lo último que salió de ese programa.

const PLAYLISTS: Record<string, string> = {
  psh: "PLNFlrAum2DnoP-i4ohOh9jNDtJbR45DM4",
  cdm: "PLNFlrAum2DnpP4eg2AcKF_5C5RwSBV2c9",
  tsi: "PLNFlrAum2DnpKbUX_8kf8X1ysvdlk59Fo",
  bs: "PLNFlrAum2DnpbNEFwWwIGGtPpFdBie1EN",
};

const HEADERS = {
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
  "accept-language": "es-419,es;q=0.9",
};

export const revalidate = 0; // el cache lo maneja el fetch interno + s-maxage

// "hace 2 días" → minutos aproximados, solo para ordenar cuál es lo más nuevo.
const UNIDADES: [RegExp, number][] = [
  [/segundo/, 1 / 60],
  [/minuto/, 1],
  [/hora/, 60],
  [/d[ií]a/, 1440],
  [/semana/, 10080],
  [/mes/, 43200],
  [/año|ano/, 525600],
];

function edadEnMinutos(cuando: string): number {
  const m = cuando.match(/hace\s+(\d+)\s+(\S+)/);
  if (!m) return Number.MAX_SAFE_INTEGER;
  const n = parseInt(m[1], 10);
  for (const [re, min] of UNIDADES) if (re.test(m[2])) return n * min;
  return Number.MAX_SAFE_INTEGER;
}

export type UltimoVideo = {
  videoId: string;
  titulo: string;
  cuando: string; // texto de YouTube: "Transmitido hace 2 días", "hace 8 días"
  vivo: boolean; // true si fue transmisión en vivo
  edadMin: number;
};

function parseUltimo(html: string): UltimoVideo | null {
  const i = html.indexOf('"lockupViewModel"');
  if (i < 0) return null;
  const seg = html.slice(i, i + 14000);
  const vid = seg.match(/i\.ytimg\.com\/vi\/([\w-]{11})\//);
  const tit = seg.match(
    /"lockupMetadataViewModel":\{"title":\{"content":"((?:[^"\\]|\\.)*)"/
  );
  if (!vid || !tit) return null;
  let titulo: string;
  try {
    titulo = JSON.parse(`"${tit[1]}"`);
  } catch {
    titulo = tit[1];
  }
  const cu = seg.match(
    /"content":"((?:Transmitido |Se estren[^" ]{0,4} )?hace [^"]*)"/
  );
  const cuando = cu ? cu[1] : "";
  return {
    videoId: vid[1],
    titulo,
    cuando,
    vivo: cuando.startsWith("Transmitido"),
    edadMin: edadEnMinutos(cuando),
  };
}

export async function GET() {
  const entradas = await Promise.all(
    Object.entries(PLAYLISTS).map(async ([slug, id]) => {
      try {
        const res = await fetch(`https://www.youtube.com/playlist?list=${id}`, {
          headers: HEADERS,
          next: { revalidate: 900 },
        });
        if (!res.ok) return [slug, null] as const;
        return [slug, parseUltimo(await res.text())] as const;
      } catch {
        return [slug, null] as const;
      }
    })
  );
  return NextResponse.json(
    { programas: Object.fromEntries(entradas) },
    {
      headers: {
        "cache-control": "public, s-maxage=900, stale-while-revalidate=3600",
      },
    }
  );
}

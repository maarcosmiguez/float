import { NextResponse } from "next/server";

// Estado del canal de Dopamina leyendo la página pública /live (sin API key).
// Cache de 2 minutos para no golpear a YouTube en cada visita.
//
// Señales validadas contra HTML real:
// - VIVO PROGRAMADO (27/9/2026, capturado con el partido de la Sub-20): el
//   documento trae "isLive":true PERO TAMBIÉN "isUpcoming":true, más
//   "scheduledStartTime":"<unix>". O sea: "isLive" solo NO alcanza (ese fue
//   el bug del falso EN VIVO que detectó Marcos).
// - VIVO REAL: "isLive":true sin "isUpcoming":true.
// - SIN NADA: el canonical de /live apunta al canal y no hay videoDetails.
// En ambos estados con video, "videoDetails" trae videoId y el título.

const CANAL_LIVE_URL =
  "https://www.youtube.com/channel/UCFb2EbLJ3zcmphRBCIQoI3Q/live";

export const revalidate = 0; // el cache lo maneja el fetch interno + s-maxage

export async function GET() {
  try {
    const res = await fetch(CANAL_LIVE_URL, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
        "accept-language": "es-419,es;q=0.9",
      },
      next: { revalidate: 120 },
    });
    if (!res.ok) throw new Error(`YouTube ${res.status}`);
    const html = await res.text();

    const esProgramado = html.includes('"isUpcoming":true');
    const esVivo = html.includes('"isLive":true') && !esProgramado;

    const vd = html.match(
      /"videoDetails":\{"videoId":"([\w-]{6,20})","title":"((?:[^"\\]|\\.)*)"/
    );
    let videoId: string | undefined = vd?.[1];
    let titulo: string | undefined;
    if (vd) {
      try {
        titulo = JSON.parse(`"${vd[2]}"`);
      } catch {
        titulo = vd[2];
      }
    }
    if (!videoId) {
      const m =
        html.match(/"liveStreamabilityRenderer":\{"videoId":"([\w-]{6,20})"/) ||
        html.match(/<link rel="canonical" href="https:\/\/www\.youtube\.com\/watch\?v=([\w-]{6,20})"/);
      videoId = m?.[1];
    }

    const cabeceras = {
      headers: {
        "cache-control": "public, s-maxage=120, stale-while-revalidate=300",
      },
    };

    if (esVivo && videoId) {
      return NextResponse.json({ live: true, videoId, titulo }, cabeceras);
    }
    if (esProgramado && videoId) {
      const sched = html.match(/"scheduledStartTime":"(\d+)"/);
      return NextResponse.json(
        {
          live: false,
          upcoming: {
            videoId,
            titulo,
            inicio: sched ? parseInt(sched[1], 10) : undefined,
          },
        },
        cabeceras
      );
    }
    return NextResponse.json({ live: false }, cabeceras);
  } catch {
    // Sin dato: el cliente cae a la grilla horaria. 200 con live:null para
    // distinguir "no sé" de "no hay vivo".
    return NextResponse.json(
      { live: null },
      { headers: { "cache-control": "public, s-maxage=60" } }
    );
  }
}

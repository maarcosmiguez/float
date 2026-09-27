import { NextResponse } from "next/server";

// Detecta si el canal de Dopamina está transmitiendo EN VIVO ahora,
// consultando la página pública /live del canal (sin API key). El HTML
// incluye "isLiveNow":true y el videoId cuando hay una emisión activa.
// Cache de 2 minutos para no golpear a YouTube en cada visita.

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

    // Señales validadas contra HTML real (set 2026):
    // - SIN vivo: el canonical de /live apunta a la URL del canal y no hay
    //   "isLive":true en el documento.
    // - CON vivo: canonical → watch?v=<id>, aparece liveStreamabilityRenderer
    //   y "isLive":true (esta última distingue vivo real de vivo programado).
    const isLive = html.includes('"isLive":true');

    let videoId: string | undefined;
    if (isLive) {
      const m =
        html.match(/"liveStreamabilityRenderer":\{"videoId":"([\w-]{6,20})"/) ||
        html.match(/<link rel="canonical" href="https:\/\/www\.youtube\.com\/watch\?v=([\w-]{6,20})"/);
      videoId = m?.[1];
    }

    return NextResponse.json(
      { live: isLive, videoId },
      {
        headers: {
          "cache-control": "public, s-maxage=120, stale-while-revalidate=300",
        },
      }
    );
  } catch {
    // Sin dato: el cliente cae a la grilla horaria. 200 con live:null para
    // distinguir "no sé" de "no hay vivo".
    return NextResponse.json(
      { live: null },
      { headers: { "cache-control": "public, s-maxage=60" } }
    );
  }
}

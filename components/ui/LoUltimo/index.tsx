"use client";

// "Lo último de Dopamina" — rider de emisión: cada programa con sus
// plataformas reales. Links de Spotify verificados uno a uno (set 2026);
// Todos Iguales todavía no está en Spotify — cuando exista, se agrega
// su spotify: acá y listo.
const filas = [
  {
    nombre: "Dopamina completo",
    detalle: "Vivos, clips y todo el archivo",
    tint: "#F9E400",
    youtube: "https://www.youtube.com/@estoesdopamina",
    instagram: "https://www.instagram.com/estoesdopamina",
  },
  {
    nombre: "Campaña del Miedo",
    detalle: "El periodístico de la mañana",
    tint: "#7C3AED",
    youtube: "https://youtube.com/playlist?list=PLNFlrAum2DnpP4eg2AcKF_5C5RwSBV2c9",
    spotify: "https://open.spotify.com/show/6FPgOnWXJWbo549jF3rhyQ",
  },
  {
    nombre: "Todos Iguales",
    detalle: "El late night del streaming",
    tint: "#D32521",
    youtube: "https://www.youtube.com/playlist?list=PLNFlrAum2DnpKbUX_8kf8X1ysvdlk59Fo",
  },
  {
    nombre: "Poco Se Habla",
    detalle: "El magazine del deporte",
    tint: "#2BDC0D",
    youtube: "https://www.youtube.com/playlist?list=PLNFlrAum2DnoP-i4ohOh9jNDtJbR45DM4",
    spotify: "https://open.spotify.com/show/0x7iKxaeyMofFZcX8o306y",
  },
  {
    nombre: "Bufete Sentimental",
    detalle: "Coyuntura sentimental",
    tint: "#FF4D8D",
    youtube: "https://www.youtube.com/playlist?list=PLNFlrAum2DnpbNEFwWwIGGtPpFdBie1EN",
    spotify: "https://open.spotify.com/show/0ldOgHNgefq13BC7XSd7DC",
  },
];

const Chip = ({
  href,
  children,
  tint,
}: {
  href: string;
  children: React.ReactNode;
  tint: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-[0.7rem] font-extrabold uppercase tracking-wider text-zinc-200 hover:text-zinc-950 duration-150"
    style={{ borderColor: `${tint}66` }}
    onMouseEnter={(e) => {
      (e.currentTarget as HTMLElement).style.backgroundColor = tint;
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
    }}
  >
    {children}
  </a>
);

export default () => (
  <div className="custom-screen relative py-20">
    <div className="text-center mb-10">
      <p className="text-xs font-bold tracking-widest uppercase text-zinc-500">Multimedio</p>
      <h2 className="font-display uppercase text-white text-4xl sm:text-5xl mt-2">
        Dónde encontrarnos
      </h2>
    </div>

    <div className="max-w-3xl mx-auto divide-y divide-zinc-800 border-y border-zinc-800">
      {filas.map((f) => (
        <div
          key={f.nombre}
          className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-5"
        >
          <div className="flex items-center gap-3 min-w-0">
            <span
              className="w-1 self-stretch rounded-full shrink-0"
              style={{ backgroundColor: f.tint }}
            />
            <div>
              <p className="font-display uppercase text-white text-lg leading-tight">
                {f.nombre}
              </p>
              <p className="text-xs text-zinc-500">{f.detalle}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Chip href={f.youtube} tint={f.tint}>
              ▶ YouTube
            </Chip>
            {"spotify" in f && f.spotify && (
              <Chip href={f.spotify} tint={f.tint}>
                ♫ Spotify
              </Chip>
            )}
            {"instagram" in f && f.instagram && (
              <Chip href={f.instagram} tint={f.tint}>
                ◉ Instagram
              </Chip>
            )}
          </div>
        </div>
      ))}
    </div>
    <p className="text-center text-xs text-zinc-600 mt-6">
      Cuando el portal esté al aire, acá también van a vivir las notas — en dopamina.uy.
    </p>
  </div>
);

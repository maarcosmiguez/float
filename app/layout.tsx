import { Anton, Montserrat } from "next/font/google";
import "./tailwind.css";
import "./customize.css";
import "./prismjs-theme.css";
import Navbar from "components/ui/Navbar";
import Footer from "components/ui/Footer";
import ProgressRail from "components/ui/ProgressRail";
// import UsermavenSetup from "components/UsermavenSetup";
import metatag from "metatag";

const { title, desc, ogImage } = metatag;

export const metadata = {
  metadataBase: new URL("https://dopamina.uy"),
  title,
  description: desc,
  alternates: {
    canonical: "https://dopamina.uy",
  },
  openGraph: {
    title,
    description: desc,
    siteName: "Dopamina",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Dopamina — streaming uruguayo: Campaña del Miedo, Todos Iguales, Poco Se Habla y Bufete Sentimental",
      },
    ],
    url: "https://dopamina.uy",
    locale: "es_UY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@estoesdopamina",
    creator: "@estoesdopamina",
    title,
    description: desc,
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Grafo unificado para buscadores y asistentes de IA (SEO/AEO): quién es
// Dopamina, su web y la grilla de programas con días y horarios citables.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "NewsMediaOrganization",
      "@id": "https://dopamina.uy/#org",
      name: "Dopamina",
      alternateName: "Esto es Dopamina",
      url: "https://dopamina.uy",
      logo: "https://dopamina.uy/icon-512.png",
      description:
        "Medio digital y canal de streaming uruguayo. Noticias, entretenimiento y opinión informada, en vivo y on demand por YouTube.",
      areaServed: { "@type": "Country", name: "Uruguay" },
      sameAs: [
        "https://www.youtube.com/@estoesdopamina",
        "https://www.instagram.com/estoesdopamina",
        "https://x.com/estoesdopamina",
        "https://www.tiktok.com/@estoesdopamina",
        "https://www.facebook.com/estoesdopamina",
        "https://www.linkedin.com/company/dopaminauy",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://dopamina.uy/#website",
      url: "https://dopamina.uy",
      name: "Dopamina",
      inLanguage: "es-UY",
      publisher: { "@id": "https://dopamina.uy/#org" },
    },
    {
      "@type": "ItemList",
      "@id": "https://dopamina.uy/#programas",
      name: "Programas de Dopamina",
      itemListElement: [
        {
          "@type": "CreativeWorkSeries",
          position: 1,
          name: "Campaña del Miedo",
          description:
            "El periodístico de la mañana del streaming en Uruguay, con Fer Kosak y Brian Majlin. Martes y jueves de 9:00 a 10:30.",
          url: "https://dopamina.uy/#campaDelMiedo",
        },
        {
          "@type": "CreativeWorkSeries",
          position: 2,
          name: "Todos Iguales",
          description:
            "El late night del streaming de Uruguay, con Marcos Casas, Fede Pérez y Maca Saavedra. Martes y jueves de 20:00 a 21:30.",
          url: "https://dopamina.uy/#todosIguales",
        },
        {
          "@type": "CreativeWorkSeries",
          position: 3,
          name: "Poco Se Habla",
          description:
            "El magazine del deporte en Uruguay, con Claudia Umpiérrez, Ignacio López y Aníbal Banquero. Lunes y miércoles de 9:00 a 10:30.",
          url: "https://dopamina.uy/#pocoSeHabla",
        },
        {
          "@type": "CreativeWorkSeries",
          position: 4,
          name: "Bufete Sentimental",
          description:
            "El podcast de coyuntura sentimental, con Fer Kosak e Irene Delponte. Viernes de 9:00 a 10:30.",
          url: "https://dopamina.uy/#bufete",
        },
      ],
    },
  ],
};

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="bg-zinc-950">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=3"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#09090b" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      {/* <UsermavenSetup /> */}
      <body className={`${montserrat.className} ${anton.variable} ${montserrat.variable}`}>
        <ProgressRail />
        <Navbar />
        <main>{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}

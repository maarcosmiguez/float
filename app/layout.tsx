import { Anton, Montserrat } from "next/font/google";
import "./tailwind.css";
import "./customize.css";
import "./prismjs-theme.css";
import Navbar from "components/ui/Navbar";
import Footer from "components/ui/Footer";
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
    images: ogImage,
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

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "NewsMediaOrganization",
  name: "Dopamina",
  url: "https://dopamina.uy",
  logo: "https://dopamina.uy/logo.svg",
  sameAs: [
    "https://www.youtube.com/@estoesdopamina",
    "https://www.instagram.com/estoesdopamina",
    "https://x.com/estoesdopamina",
    "https://www.tiktok.com/@estoesdopamina",
    "https://www.facebook.com/estoesdopamina",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      {/* <UsermavenSetup /> */}
      <body className={`${montserrat.className} ${anton.variable} ${montserrat.variable}`}>
        <Navbar />
        <main>{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}

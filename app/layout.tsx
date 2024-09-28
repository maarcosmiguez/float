import { Inter } from "next/font/google";
import "./tailwind.css";
import "./customize.css";
import "./prismjs-theme.css";
import Navbar from "components/ui/Navbar";
import Footer from "components/ui/Footer";
import UsermavenSetup from "components/UsermavenSetup";
import metatag from "metatag";

const { title, desc, ogImage } = metatag;

export const metadata = {
  metadataBase: new URL("https://dopamina.uy"),
  title,
  description: desc,
  openGraph: {
    title,
    description: desc,
    images: ogImage,
    url: "https://dopamina.uy",
  },
  twitter: {
    title,
    description: desc,
    images: [ogImage],
  },
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-zinc-950">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=3"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@float_ui" />
        <meta name="twitter:creator" content="@float_ui" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="index, follow" />
      </head>
      <UsermavenSetup />
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}

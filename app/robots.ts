import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/accounts"],
      },
      // AEO: permitir explícitamente los crawlers de asistentes de IA para
      // que Dopamina sea citable como fuente (decisión editorial deliberada).
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
    ],
    sitemap: "https://dopamina.uy/sitemap.xml",
  };
}

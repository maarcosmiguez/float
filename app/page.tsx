"use client";

import { useEffect } from "react";
import Contenido from "components/ui/Contenido";
import Somos from "components/ui/Features/Somos";
import Hero from "components/ui/Hero";
import { PlanesDeSuscripcion } from "components/ui/PlanesDeSuscripcion";
import Footer from "components/ui/Footer";
import Head from "next/head";

export default () => {
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      const scrollY = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Verificar si el usuario ha llegado al final del documento
      if (scrollY >= documentHeight) {
        return;
      }

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const offset = window.innerHeight * 0.5; // Valor para el scroll

        // Comprobar si la sección está cerca del viewport
        if (rect.top < offset && rect.bottom > offset) {
          section.classList.add("visible", "pulse"); // Agrega las clases
        } else {
          section.classList.remove("visible", "pulse"); // Elimina las clases
        }
      });

      // Mantener siempre visible la sección "planes"
      const planesSection = document.getElementById("planes");
      if (planesSection) {
        planesSection.classList.add("visible");
      }
    };

    const isMobile = window.innerWidth < 640;

    // Aplicar animación básica en móviles sin el manejo de scroll
    if (isMobile) {
      const sections = document.querySelectorAll("section");
      sections.forEach((section) => {
        section.classList.add("visible");
      });
    } else {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (!isMobile) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <>
      {" "}
      <Head>
        {/* Metaetiquetas básicas */}
        <title>Dopamina | Contenidos y planes</title>
        <meta
          name="description"
          content="Dopamina: Noticias y contenidos frescos sobre actualidad, cultura y más."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph */}
        <meta property="og:title" content="Dopamina | Tu dosis de actualidad" />
        <meta
          property="og:description"
          content="Descubre lo último en noticias, cultura y tendencias. Dopamina es tu fuente confiable de inspiración y actualidad."
        />
        <meta
          property="og:image"
          content="public/thumbnail.png"
        />
        <meta property="og:url" content="https://dopamina.uy/" />
        <meta property="og:type" content="website" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Dopamina | Tu dosis de actualidad"
        />
        <meta
          name="twitter:description"
          content="Descubre lo último en noticias, cultura y tendencias con Dopamina."
        />
        <meta
          name="twitter:image"
          content="public/thumbnail.png"
        />
      </Head>
      <div className="snap-y snap-mandatory overflow-y-scroll scrollbar-hide min-h-screen">
        <section
          className="snap-start flex items-center min-h-[100vh] justify-center section visible"
          id="home"
        >
          <Hero />
        </section>
        <section
          className="snap-start flex items-center min-h-[80vh] justify-center section mb-20"
          id="planes"
        >
          <PlanesDeSuscripcion />
        </section>
        <section
          className="snap-start flex items-center min-h-[90vh] justify-center section"
          id="contenido"
        >
          <Contenido />
        </section>
        <section
          className="snap-start flex items-center min-h-[90vh] justify-center section"
          id="somos"
        >
          <Somos />
        </section>
        <Footer />
      </div>
    </>
  );
};

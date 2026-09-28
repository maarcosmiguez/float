"use client";

import Contenido from "components/ui/Contenido";
import Somos from "components/ui/Features/Somos";
import Hero from "components/ui/Hero";
import { PlanesDeSuscripcion } from "components/ui/PlanesDeSuscripcion";
import AlAireBanner from "components/ui/aire/AlAireBanner";
import Marquee from "components/ui/Marquee";
import LoUltimo from "components/ui/LoUltimo";
import Contacto from "components/ui/Contacto";
import Footer from "components/ui/Footer";

export default () => {
  return (
    <>
      {/* Orden de la maqueta fase 2a: del aire directo a los contenidos;
          la membresía va al final del recorrido, con su énfasis en el hero. */}
      <section id="home">
        <Hero />
        <AlAireBanner />
      </section>
      <section id="contenido">
        <Contenido />
      </section>
      <Marquee />
      <section id="ultimo">
        <LoUltimo />
      </section>
      <section id="somos" className="py-16">
        <Somos />
      </section>
      <section id="planes" className="py-16">
        <PlanesDeSuscripcion />
      </section>
      <section id="contacto">
        <Contacto />
      </section>
      <Footer />
    </>
  );
};

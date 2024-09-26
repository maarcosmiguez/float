import Contenido from "components/ui/Contenido";
import Somos from "components/ui/Features/Somos";
import Hero from "components/ui/Hero";
// import SupportedFrameworks from "components/ui/SupportedFrameworks";
// import TemplateCTA from "components/ui/TemplateCTA";

export default () => {
  return (
    <>
      <Hero />
      {/* <SupportedFrameworks /> */}
      {/* <TemplateCTA /> */}
      <Contenido />
      <Somos />
    </>
  );
};

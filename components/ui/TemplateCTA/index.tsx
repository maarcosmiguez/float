import HeroBgGradientClient from "../Hero/HeroBgGradient.Client";
import BgGradient from "./BgGradient";
import TemplateScoresCard from "./TemplateScoresCard";
import TemplatesOverview from "./TemplatesOverview";
// import TemplatesOverviewBufete from "./TemplatesOverviewBufete";
// import TemplatesOverviewCampa from "./TemplatesOverviewCampa";

export default () => (
  <section className="mt-32 border-t border-zinc-800 pt-24 relative">
    <div className="mx-auto my-auto min-h-screen">
      {/* <HeroBgGradientClient /> */}
      <div className="custom-screen relative z-10">
      <div className="max-w-xl mx-auto space-y-4 text-center">
        <h2 className="text-4xl heading">Nuestro contenido</h2>
        <p className="text-zinc-400">
          Para más placer
        </p>
      </div>

      <div className="gap-x-6 mt-10 space-y-6 md:flex md:space-y-0">
        {/* <TemplatesOverviewCampa /> */}
        {/* <TemplatesOverviewBufete /> */}
        {/* <TemplateScoresCard /> */}
      </div>
    </div>
    </div>
  </section>
);

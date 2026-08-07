import Image from "next/image";
import posterPoco from "public/poster-psh.jpg";
import posterCampana from "public/poster-cdm.jpg";
import posterBufete from "public/poster-bs.jpg";
import posterTodosIguales from "public/poster-tsi.jpg";
import grillaSemanal from "public/grilla-semanal.jpg";

const PlayBadge = () => (
  <div className="hidden md:flex absolute top-[15px] right-[50px] w-10 h-10 items-center overflow-hidden justify-center rounded-full bg-white shadow-md shadow-gray-200 group transition-all duration-300">
    <svg
      className="fill-gray-900 relative z-10 transition-all duration-300 group-hover:fill-white"
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 72 72"
      fill="none"
    >
      <path
        d="M61.1026 23.7185C60.5048 21.471 58.7363 19.6981 56.4863 19.0904C52.4181 18 36.0951 18 36.0951 18C36.0951 18 19.7805 18 15.7039 19.0904C13.4622 19.6897 11.6937 21.4627 11.0876 23.7185C10 27.7971 10 36.3124 10 36.3124C10 36.3124 10 44.8276 11.0876 48.9063C11.6854 51.1537 13.4539 52.9267 15.7039 53.5343C19.7805 54.6247 36.0951 54.6247 36.0951 54.6247C36.0951 54.6247 52.4181 54.6247 56.4863 53.5343C58.728 52.935 60.4965 51.162 61.1026 48.9063C62.1902 44.8276 62.1902 36.3124 62.1902 36.3124C62.1902 36.3124 62.1902 27.7971 61.1026 23.7185Z"
        fill=""
      />
      <path
        className="fill-white transition-all duration-300 group-hover:fill-[#FF3000]"
        d="M30.8811 44.1617L44.4392 36.3124L30.8811 28.463V44.1617Z"
        fill="white"
      />
    </svg>
    <div className="absolute top-full left-0 w-full h-full rounded-full bg-[#FF3000] z-0 transition-all duration-500 group-hover:top-0"></div>
  </div>
);

const shows = [
  {
    id: "pocoSeHabla",
    day: "Lunes y Miércoles 9h",
    title: "Poco Se Habla",
    hosts: "con Ignacio López, Claudia Umpiérrez y Aníbal Banquero",
    desc: "El magazine del deporte en Uruguay: repaso de la fecha, entrevistas y análisis con la cuota justa de humor. Diversidad de voces, cero solemnidad.",
    image: posterPoco,
    href: "https://www.youtube.com/@estoesdopamina",
    accent: "text-dopamina-cian",
    reverse: false,
  },
  {
    id: "campaDelMiedo",
    day: "Martes y Jueves 9h",
    title: "Campaña del Miedo",
    hosts: "con Marcos Casas y Fer Kosak",
    desc: "El streaming que le faltaba a esta campaña electoral. Información, opinión, frescura, encanto, entrevistas, y muchas cosas más que nuestras mamás nos dijeron que tenemos. Tal vez nos recuerdes de algún clip que te pasaron para pegarle al Boca o a Sanjurjo.",
    image: posterCampana,
    href: "https://youtube.com/playlist?list=PLNFlrAum2DnpP4eg2AcKF_5C5RwSBV2c9&si=NetBKh3qxCX46xcJ",
    accent: "text-dopamina-violeta",
    reverse: true,
  },
  {
    id: "bufete",
    day: "Viernes 9h a 10:30h",
    title: "Bufete Sentimental",
    hosts: "con Fer Kosak e Irene Dalponte",
    desc: "El podcast de cornudas menos cornudo que vas a escuchar. Abordamos temas lindantes al amor pero con una perspectiva académica, política, social que te va a hacer decir ¿cómo son tan graciosas, inteligentes, ocurrentes y lindas de cara? Increíble pero es así.",
    image: posterBufete,
    href: "https://www.youtube.com/playlist?list=PLNFlrAum2DnpbNEFwWwIGGtPpFdBie1EN",
    accent: "text-dopamina-dorado",
    reverse: false,
  },
  {
    id: "todosIguales",
    day: "Martes y Miércoles 20h",
    title: "Todos Iguales",
    hosts: "con Fede Pérez, Marcos Casas y Maca Saavedra",
    desc: "El late night del streaming de Uruguay. Información, entrevistas, informes especiales y humor inteligente para cerrar el día.",
    image: posterTodosIguales,
    href: "https://www.youtube.com/@estoesdopamina",
    accent: "text-dopamina-rojo",
    reverse: true,
  },
];

export default () => (
  <div className="custom-screen relative">
    <div className="mx-auto my-auto min-h-screen flex flex-col gap-10 relative z-10 justify-center max-w-screen-4xl ">
      <h4 className="heading mb-5 text-5xl sm:text-7xl text-left px-4 sm:px-0 sm:text-center">
        Contenidos
      </h4>

      {shows.map((show) => (
        <article key={show.id} id={show.id}>
          <div
            className={`mx-auto text-gray-600 gap-x-12 items-center justify-between overflow-hidden md:flex md:px-8 ${
              show.reverse ? "md:flex-row-reverse" : ""
            }`}
          >
            <div className="flex-none space-y-0 sm:space-y-1 px-4 sm:max-w-lg md:px-0 lg:max-w-xl">
              <h1 className={`text-sm font-medium ${show.accent}`}>{show.day}</h1>
              <h2 className="font-bold text-2xl py-2 sm:py-0 sm:text-4xl heading text-white xl:text-5xl">
                {show.title}
              </h2>
              <h4 className="text-gray-200 font-bold text-lg xl:text-2xl hidden sm:block">
                {show.hosts}
              </h4>
              <p className="text-gray-300 max-w-xl leading-relaxed sm:mx-auto lg:ml-0">
                {show.desc}
              </p>
            </div>
            <a
              className="flex-none mt-2 md:mt-0 md:max-w-lg px-4 relative"
              target="_blank"
              href={show.href}
            >
              <Image
                src={show.image}
                className="md:rounded-tl-[108px] px-4"
                alt={`${show.title} - ${show.day}`}
              />
              <PlayBadge />
            </a>
          </div>
        </article>
      ))}

      {/* Grilla semanal: mismo material del dossier, otra forma de leer la programación */}
      <div className="px-4 sm:px-8 mt-6">
        <p className="text-center text-sm text-zinc-500 uppercase tracking-wide mb-4">
          Así se arma la semana
        </p>
        <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden border border-zinc-800">
          <Image
            src={grillaSemanal}
            alt="Grilla semanal de programación de Dopamina"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  </div>
);

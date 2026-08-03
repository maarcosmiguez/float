const marcas = [
  "Antel",
  "BSE",
  "Banco República",
  "UTE",
  "ORT Uruguay",
  "UCU",
  "Pepsi",
  "Burger King",
  "Subway",
  "Conaprole",
  "Pilsen",
  "Puma",
  "Flow",
  "DirecTV Go",
  "Holafly",
  "Intendencia de Montevideo",
  "PIT-CNT",
  "Campus Party",
];

export default () => (
  <div className="custom-screen relative py-16">
    <p className="text-center text-sm text-zinc-500 uppercase tracking-wide mb-8">
      Confían en nosotros
    </p>
    <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
      {marcas.map((marca) => (
        <span
          key={marca}
          className="border border-zinc-800 rounded-full px-4 py-2 text-sm font-semibold text-zinc-300"
        >
          {marca}
        </span>
      ))}
    </div>
  </div>
);

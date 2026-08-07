import Image from "next/image";

// Logos recortados del dossier (public/logos/*.jpg).
// IG verificado por búsqueda web — los marcados "revisar" quedaron con la mejor
// hipótesis y conviene confirmarlos antes de ir a producción.
type Marca = {
  slug: string;
  nombre: string;
  instagram?: string; // sin link = no se encontró cuenta confiable
};

const marcas: Marca[] = [
  { slug: "antel", nombre: "Antel", instagram: "https://www.instagram.com/anteldetodos/" },
  { slug: "bse", nombre: "BSE", instagram: "https://www.instagram.com/bseuruguay/" },
  { slug: "banco-republica", nombre: "Banco República", instagram: "https://www.instagram.com/brou_oficial/" },
  { slug: "ute", nombre: "UTE", instagram: "https://www.instagram.com/utecomunicacion/" },
  { slug: "cibils-soto", nombre: "Cibils | Soto Consultores", instagram: "https://www.instagram.com/csc.consultores/" },
  { slug: "ort", nombre: "Universidad ORT", instagram: "https://www.instagram.com/universidadort/" },
  { slug: "ucu", nombre: "Universidad Católica", instagram: "https://www.instagram.com/ucuoficial/" },
  { slug: "carne", nombre: "Escuela CARNE", instagram: "https://www.instagram.com/escuelacarne/" },
  { slug: "escaramuza", nombre: "Escaramuza", instagram: "https://www.instagram.com/_escaramuza/" },
  { slug: "fnc", nombre: "FNC" }, // sin IG corporativo confiable
  { slug: "pepsi", nombre: "Pepsi", instagram: "https://www.instagram.com/pepsiuruguay/" },
  { slug: "sara", nombre: "Yerba Sara", instagram: "https://www.instagram.com/yerbasarauy/" },
  { slug: "burger-king", nombre: "Burger King", instagram: "https://www.instagram.com/burgerkinguy/" },
  { slug: "centenario", nombre: "Alimentos Centenario", instagram: "https://www.instagram.com/alimentos_centenario/" },
  { slug: "conaprole", nombre: "Conaprole", instagram: "https://www.instagram.com/conaprole/" },
  { slug: "buhero-negro", nombre: "Fernet Buhero Negro", instagram: "https://www.instagram.com/buheronegro/" },
  { slug: "emexem", nombre: "Emexem", instagram: "https://www.instagram.com/emexem_uy/" },
  { slug: "red-tickets", nombre: "RedTickets", instagram: "https://www.instagram.com/redtickets.uy/" },
  { slug: "directv-go", nombre: "DGO", instagram: "https://www.instagram.com/dgo_latam/" },
  { slug: "holafly", nombre: "Holafly", instagram: "https://www.instagram.com/holafly_es/" },
  { slug: "la-hacienda", nombre: "La Hacienda", instagram: "https://www.instagram.com/lahaciendauruguay/" }, // revisar
  { slug: "subway", nombre: "Subway", instagram: "https://www.instagram.com/subwayuy/" },
  { slug: "labanca", nombre: "La Banca", instagram: "https://www.instagram.com/quinielaoficialuy/" },
  { slug: "don-obdulio", nombre: "Don Obdulio", instagram: "https://www.instagram.com/don.obdulio/" },
  { slug: "bascu-house", nombre: "Bascú House", instagram: "https://www.instagram.com/bascuhouse/" },
  { slug: "pilsen", nombre: "Pilsen", instagram: "https://www.instagram.com/pilsenopilsen/" },
  { slug: "puma", nombre: "Puma", instagram: "https://www.instagram.com/pumastore.uy/" },
  { slug: "kiwi-films", nombre: "Kiwi Films", instagram: "https://www.instagram.com/kiwifilmsuy/" },
  { slug: "cimarron", nombre: "Cimarrón Cine", instagram: "https://www.instagram.com/cimarron_cine/" },
  { slug: "flow", nombre: "Flow", instagram: "https://www.instagram.com/cablevisionuy/" },
  { slug: "kaboa-industries", nombre: "Kaboa Industries", instagram: "https://www.instagram.com/kaboa_ind/" },
  { slug: "pit-cnt", nombre: "PIT-CNT", instagram: "https://www.instagram.com/pitcntuy/" },
  { slug: "intendencia-mvd", nombre: "Intendencia de Montevideo", instagram: "https://www.instagram.com/montevideoim/" },
  { slug: "jean-vernier", nombre: "Jean Vernier", instagram: "https://www.instagram.com/jeanvernieruy/" },
  { slug: "campus-party", nombre: "Campus Party", instagram: "https://www.instagram.com/campuspartyuy/" },
];

// Marcas sin logo en el dossier: chip de texto hasta tener el asset.
const marcasSinLogo: Marca[] = [
  { slug: "protonvpn", nombre: "Proton VPN", instagram: "https://www.instagram.com/protonprivacy/" },
  { slug: "velavu", nombre: "Velavú", instagram: "https://www.instagram.com/velavu_skin/" }, // revisar
];

const Card = ({ marca, children }: { marca: Marca; children: React.ReactNode }) =>
  marca.instagram ? (
    <a
      href={marca.instagram}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${marca.nombre} en Instagram`}
      className="group rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden hover:border-dopamina-violeta hover:scale-[1.03] transition-all duration-200"
    >
      {children}
    </a>
  ) : (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden">
      {children}
    </div>
  );

export default () => (
  <div className="custom-screen relative py-16">
    <p className="text-center text-sm text-zinc-500 uppercase tracking-wide mb-2">
      Confían en nosotros
    </p>
    <p className="text-center text-3xl heading mb-10">
      Marcas que ya eligieron Dopamina
    </p>
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3 max-w-6xl mx-auto">
      {marcas.map((marca) => (
        <Card key={marca.slug} marca={marca}>
          <div className="relative w-full aspect-[3/2]">
            <Image
              src={`/logos/${marca.slug}.jpg`}
              alt={marca.nombre}
              fill
              sizes="(max-width: 640px) 33vw, (max-width: 1024px) 20vw, 14vw"
              className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
            />
          </div>
        </Card>
      ))}
      {marcasSinLogo.map((marca) => (
        <Card key={marca.slug} marca={marca}>
          <div className="w-full aspect-[3/2] flex items-center justify-center px-2">
            <span className="text-zinc-200 font-bold text-sm text-center leading-tight">
              {marca.nombre}
            </span>
          </div>
        </Card>
      ))}
    </div>
    <p className="text-center text-xs text-zinc-600 mt-6">
      Tocá cualquier logo para conocer la marca.
    </p>
  </div>
);

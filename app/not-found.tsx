import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-zinc-950 text-center px-4">
      <h1 className="text-6xl font-bold text-white">404</h1>
      <p className="text-zinc-300">Esta página no existe.</p>
      <Link href="/" className="text-indigo-400 hover:text-indigo-300 underline">
        Volver al inicio
      </Link>
    </div>
  );
}

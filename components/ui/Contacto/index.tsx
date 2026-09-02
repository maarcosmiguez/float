export default () => (
  <div className="custom-screen relative py-16">
    <div className="max-w-4xl mx-auto grid gap-8 sm:grid-cols-2 items-center">
      <div className="space-y-3 text-center sm:text-left">
        <p className="text-dopamina-amarillo font-semibold text-sm uppercase tracking-wide">
          Contacto
        </p>
        <p className="text-3xl heading">Hablemos</p>
        <p className="text-zinc-400">
          Prensa, pauta, propuestas o simplemente para saludar.
        </p>
        <a
          href="mailto:dopaminauruguay@gmail.com"
          className="inline-block text-dopamina-cian hover:text-cyan-300 font-medium duration-150"
        >
          dopaminauruguay@gmail.com
        </a>
      </div>
      <div className="rounded-2xl overflow-hidden border border-zinc-800 h-64 sm:h-72">
        {/* Filtro invert+hue para que el mapa respete el tema oscuro del sitio */}
        <iframe
          title="Dopamina Uruguay en Google Maps"
          src="https://www.google.com/maps?q=Dopamina+Uruguay&output=embed"
          className="w-full h-full border-0 [filter:invert(90%)_hue-rotate(180deg)_contrast(0.92)]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  </div>
);

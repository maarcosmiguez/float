export default () => (
  <div className="custom-screen relative py-16">
    <div className="max-w-4xl mx-auto grid gap-8 sm:grid-cols-2 items-center">
      <div className="space-y-3 text-center sm:text-left">
        <p className="text-dopamina-amarillo font-semibold text-sm uppercase tracking-wide">
          Contacto
        </p>
        <p className="text-3xl heading">Hablemos</p>
        <p className="text-dopamina-tinta-2">
          Prensa, producciones, publicidad o simplemente pasar a saludar.
        </p>
        <div className="flex flex-wrap items-center gap-4 justify-center sm:justify-start pt-1">
          <a
            href="https://ig.me/m/estoesdopamina"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold bg-gradient-to-br from-[#FA8F21] via-[#D82D7E] to-[#8C3AAA] text-white hover:opacity-90 duration-150"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0" aria-hidden="true">
              <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 3.1a6.7 6.7 0 1 0 0 13.4 6.7 6.7 0 0 0 0-13.4zm0 11a4.3 4.3 0 1 1 0-8.6 4.3 4.3 0 0 1 0 8.6zm6.9-11.3a1.6 1.6 0 1 1-3.2 0 1.6 1.6 0 0 1 3.2 0z" />
            </svg>
            Escribinos por DM
          </a>
          <a
            href="mailto:dopaminauruguay@gmail.com"
            className="text-sm text-dopamina-tinta-3 hover:text-dopamina-tinta-2 duration-150"
          >
            dopaminauruguay@gmail.com
          </a>
        </div>
      </div>
      <div className="rounded-[18px] overflow-hidden border border-dopamina-linea h-64 sm:h-72">
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

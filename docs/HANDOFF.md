# HANDOFF — estado completo del proyecto dopamina.uy (28 set 2026)

> Paquete de migración de contexto. Con CLAUDE.md + este archivo, cualquier
> sesión nueva de Claude arranca sabiendo todo. Repo:
> /Users/a59898/Documents/brokenRubik/floatui → github.com/maarcosmiguez/float
> → Netlify (site: dopaminauy) → dopamina.uy. Push a main = deploy.

## Hecho y EN PRODUCCIÓN
1. **Fase 1 SEO**: metadata App Router, lang=es, sitemap/robots (con GPTBot,
   ClaudeBot, PerplexityBot permitidos), 404 real, JSON-LD @graph
   (NewsMediaOrganization + WebSite + ItemList programas), íconos D amarillo.
2. **og-share.jpg** 1200x630 82KB (la vieja pesaba 3.9MB y WhatsApp no la
   mostraba). OJO: la gráfica dice "TSI martes y miércoles" (horario viejo)
   — pedir regeneración a Mathias.
3. **Rediseño "estudio en vivo"**: hero con video loop (loop-hero.mp4, del
   LOOP-DOPA-OSCURO), titular gigante con "Uruguay" celeste, cards 16:9
   SIEMPRE completas (miniaturas RRSS), marquee amarillo, rider "Dónde
   encontrarnos", mapa con filtro oscuro, planes 250/500/2000 con badge.
4. **Sistema de aire**: components/ui/aire/ (aire.ts lógica+grilla,
   AireChip, AlAireBanner) + app/api/live/route.ts + badges en Contenido.
   PENDIENTE VALIDAR: primera emisión real (lunes 9:00) — chequear que el
   chip se encienda; se validó contra un canal 24/7 pero no con vivo propio.
5. Spotify verificados: CDM show/6FPgOnWXJWbo549jF3rhyQ · PSH
   show/0x7iKxaeyMofFZcX8o306y · BS show/0ldOgHNgefq13BC7XSd7DC · TSI no
   tiene aún (Marcos lo va a subir; agregar el campo spotify en LoUltimo).
6. Docs previos: diagnostico original y PLAN en la carpeta outputs de la
   sesión vieja; los vigentes están en docs/ del repo.

## RONDA 2 EN EL SANDBOX (27/9 — feedback de Marcos sobre el preview #3)
Sigue en la rama ajustes-marquee-sesgo → PR #3 → deploy preview → OK de Marcos.
Skills nuevas cargadas al contexto: dopa-finanzas y staff-dopamina (además de
escribir-como-marcos, obligatoria para todo copy). Lo hecho en esta ronda:
- [x] PALETA DE LA MAQUETA aplicada de verdad (era la diferencia grande que
      Marcos veía): fondo #0A0812, paneles #14101F, líneas rgba(245,243,250,.1),
      radios 18px, tintas violáceas. Tokens dopamina.fondo/panel/linea/tinta-*
      en tailwind.config.js. Nada de zinc en las secciones del rediseño.
- [x] /api/ultimos (nuevo): último video de la playlist de cada programa,
      scrapeando la página pública de cada lista (sin API key). Verificado:
      las 4 playlists ordenan más-nuevo-primero. PSH PLNFlrAum2DnoP-i4ohOh9jNDtJbR45DM4
      · CDM ...pP4eg2AcKF_5C5RwSBV2c9 · TSI ...pKbUX_8kf8X1ysvdlk59Fo ·
      BS ...pbNEFwWwIGGtPpFdBie1EN. OJO: hay playlists duplicadas viejas de
      PSH/CDM/TSI en el canal, las vigentes son estas. Cache 15 min.
      El RSS de playlists de YouTube está muerto (404), por eso scraping.
- [x] "Lo último de Dopamina" = feed real: 4 cards con el TÍTULO del último
      vivo/corte de cada programa (cortado en el "|"), fecha de YouTube,
      chips YouTube+Instagram por programa, fila "Dopamina stream" abajo.
      Spotify ELIMINADO (Marcos: desactualizados, sacarlos por ahora).
      Eyebrow sin la palabra "multimedio" (Marcos: ya no debe figurar).
- [x] Banner radio apagada: muestra el título real del último video del canal
      + botón ROJO YouTube "Darle play" (Marcos: rojo o blanco/rojo, amarillo
      no). Chip "On demand" en blanco con ícono rojo. Reloj queda (le encanta;
      se sumó también al footer).
- [x] Copy "muy LLM" de la membresía reescrito en voz Marcos.
- [x] PSH: "Ignacio López" → "el Bocha" (así va en la grilla, ver staff-dopamina).
- Falta: OK de Marcos sobre el preview → merge. Portal = fase 2, OTRO chat.

## RONDA 3 EN EL SANDBOX (28/9 — 11 puntos de Marcos sobre el preview)
- [x] BUG falso "EN VIVO" con vivo programado: /api/live ahora separa
      "isUpcoming":true (programado) de vivo real, y extrae videoId + título
      + scheduledStartTime. Capturado contra el HTML real del partido Sub-20.
- [x] 3 estados en chip y banner: EN VIVO (chip entero clickeable, banner con
      miniatura + programa + título del vivo) · PRÓXIMA TRANSMISIÓN (celeste,
      botón blanco "Avisame", link secundario a lo último) · apagada (lo
      último con botón rojo "Darle play"). "On demand" ya no se repite: se
      dice "Lo último".
- [x] Feed con portadas mqdefault 16:9 de cada último video. Sin la línea
      del portal (Marcos: no mandarla a producción).
- [x] Planes: sección movida al final del recorrido (hero CTA = énfasis
      arriba, como la maqueta) y compactada. Jerarquía: miembro YouTube →
      MP/PayPal mensual → aporte único.
- [x] Navbar SIEMPRE visible (fixed; el sticky se perdía al scrollear) +
      scrollspy con subrayado amarillo en la sección activa. html con
      scroll-padding-top 84px. Ancla #contacto creada en page.tsx.
- [x] Marquee: texto nuevo "EL PRIMER ESTRIMIN NACIONAL · ESTO ES DOPAMINA ·
      SEGUINOS · @estoesdopamina" (ESTRIMIN y SEGUINOS huecos), 4 frases por
      tira para que no se corte en pantallas anchas.
- [x] Somos rediseñado: bento asimétrico con glows por color y card de
      números (4 programas · 7 vivos por semana). Referencia Playground.
- [x] Contacto: "Prensa, producciones, publicidad o simplemente pasar a
      saludar" + botón DM de Instagram (ig.me/m/estoesdopamina), mail chico.
      Formulario a mail: queda para el portal (ahí hay backend).
- [x] Facebook comentado en SocialMedia + sameAs (no existe la página aún).

## SPECS VIDEO HERO PARA MATHI (pedido 28/9)
Un solo archivo alcanza (el recorte mobile lo hace el object-cover):
- MP4, H.264 (libx264), SIN audio, moov al inicio (+faststart).
- 1920x1080 (16:9), 24 a 30 fps.
- 12 a 20 segundos con loop perfecto (primer y último frame iguales).
- Peso objetivo: 5 MB o menos (CRF 28 aprox).
- Poster aparte: JPG 1920x1080, 150 KB o menos (un frame del video).
- Nombres: loop-hero.mp4 y loop-hero-poster.jpg (reemplazo directo en /public).
- Comando de referencia:
  ffmpeg -i master.mov -an -vf "scale=1920:-2,fps=30" -c:v libx264 -crf 28 -preset slow -movflags +faststart loop-hero.mp4
- Opcional si quiere encuadre vertical propio: 1080x1920, 3 MB o menos.
- Ya que está en tema, pendientes de diseño: og-share nueva 1200x630 (<300 KB,
  la actual dice TSI martes y miércoles) y PNG transparentes de logos de
  marcas + capas de programas.

## RONDA DE CORRECCIONES CERRADA (28/9 noche — auditoría de Marcos)
Trabajar TODO en la rama ajustes-marquee-sesgo → PR #3 → deploy preview →
verificación visual PROPIA → recién ahí mostrarle a Marcos. NO mergear sin su OK.
- [ ] BUG: "On demand →" del chip no clickea (sospecha: el header fixed del
      Navbar viejo tapa el chip y captura los clicks — diagnosticar con
      elementFromPoint en el preview).
- [ ] Auditoría completa producción vs. maqueta v4 del artifact. Diferencias
      ya identificadas: Navbar sigue siendo el del template (sin CTA
      "Hacete blandengue", links viejos), sección "¿Qué es la Dopamina?"
      sigue con las cards viejas del template (la maqueta tenía cards
      limpias con borde, sin íconos), Footer viejo ("marca registrada",
      "Para más placer" — maqueta: "El estrimin que mira Uruguay").
- [ ] "Dopamina completo" → "Dopamina stream" en LoUltimo.
- [x] IG CONFIRMADOS POR MARCOS (28/9): TSI @estoestodosiguales ·
      CDM @estoescdm · PSH @pocosehabla.uy · BS @bufetesentimental.
- [ ] DIRECTIVA NUEVA DE DISEÑO (Marcos, 28/9): la mayoría del tiempo NO
      están en vivo → cuando la "radio está apagada", el ON DEMAND es el
      protagonista (banner y chip con jerarquía invertida: grande el
      on demand con ícono de YouTube, secundario el "próximo en aire").
      Validar con Marcos vía sandbox ANTES de mergear. El botón On demand
      además no clickeaba y le faltaba el ícono de YouTube.
- [ ] Marquee sesgado -2° ya está en la rama (Marcos: "mejor que antes").
- [ ] Marcos escucha por audio: responder SIEMPRE sintético.

## Pendientes INMEDIATOS
- [ ] Instagram por programa en LoUltimo: solo @bufetesentimental quedó
      verificado. FALTAN los handles reales de CDM, PSH y TSI → pedírselos
      a Marcos (Instagram devuelve 200 hasta para perfiles inexistentes,
      no se pueden verificar por status code). Slots comentados en
      components/ui/LoUltimo/index.tsx.
- [ ] Consola de Marcos: Hyper no le anda y no sabe abrir terminal.
      Guía mínima: Cmd+Espacio → escribir "Terminal" → Enter. Considerar
      dejarle alias/atajo o un .command en el Escritorio que haga
      `cd floatui && pnpm dev`. (Prometido y pendiente.)
- [ ] Logos de marcas: sección "Confían en nosotros" existe como componente
      pero está FUERA del index (decisión de launch). Esperar PNG
      transparentes de Mathias. Links IG verificados en
      docs/instagram-marcas.md (La Hacienda y Velavú a confirmar).
- [ ] GA4: pendiente desde agosto, sin Measurement ID.
- [ ] Fotos por capas de Mathias (logos de programas + caras recortadas).
- [ ] Contador de socios dinámico (hoy oculto/comentado).

## PRÓXIMA GRAN FASE: Portal de notas
- Specs de Marcos: docs/fase-portal-anotaciones-marcos.md (seguridad
  primero, OK final de Marcos a toda nota, Aníbal/Marcos validan
  carruseles, control editorial discreto, posteador automático IG).
- Arquitectura recomendada: docs/plan-fase-2.md (Payload 3 embebido,
  /admin, Neon Postgres gratis; alternativa Sanity).
- Posteador IG: requiere cuenta Instagram BUSINESS vinculada a página de
  Facebook + Meta Business Manager (business.facebook.com) + app gratuita
  en Meta for Developers (Instagram Graph API). NO se compra nada. No
  existe "Meta One Advanced". Skills base: carruseles-dopamina (adaptada)
  y tuitero-dopamina para X. Marcos debe crear assets nuevos.
- La web deja de ser one-page: sección/rutas nuevas (/nota/[slug], etc.).

## Gotchas técnicos (ahorran horas)
- `next build`/`next dev` CUELGAN bajo procesos del agente en esta máquina
  (sandbox). Validar con: tsc --noEmit (funciona), curl de links, y el
  Deploy Preview de Netlify (abrir PR → status check "netlify/dopaminauy/
  deploy-preview" → URL deploy-preview-N--dopaminauy.netlify.app).
- Para crear PRs sin gh: token con `printf "protocol=https\nhost=github.com\n" | git credential fill`.
- staticPageGenerationTimeout: 180 en next.config.js (el build tarda; no
  es cuelgue). Netlify: Node 22, --frozen-lockfile.
- El scratchpad del agente se borra entre sesiones: los b64 de la maqueta
  se regeneran desde /public y Google Fonts (Anton + Montserrat latin).
- Artifact de maquetas (mismo link siempre):
  https://claude.ai/code/artifact/af61298c-56c9-4fbb-abc6-103b96486979

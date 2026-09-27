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

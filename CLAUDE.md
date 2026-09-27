# CLAUDE.md — dopamina.uy

Sitio de Dopamina (@estoesdopamina), medio digital/streaming uruguayo de
Marcos Casas. Next.js 14.2 (App Router) + Tailwind + Netlify (Node 22).
Producción: https://dopamina.uy — deploya solo al pushear `main`.

## Estado (set 2026) — leer docs/HANDOFF.md para el detalle completo
- Lanzado: rediseño completo ("estudio en vivo"), SEO/AEO, og-share para
  WhatsApp, sistema de aire dinámico (chip + banner + badges EN VIVO).
- `/api/live` consulta la página pública /live del canal de YouTube
  (canal UCFb2EbLJ3zcmphRBCIQoI3Q, sin API key, cache 120s). Señal
  validada: `"isLive":true` en el HTML. Fallback: grilla horaria en
  `components/ui/aire/aire.ts`.
- Grilla vigente: PSH lun/mié 9-10:30 · CDM mar/jue 9-10:30 · TSI mar/jue
  20-21:30 · BS vie 9-10:30 (hora Montevideo). Si cambia, editar GRILLA.

## REGLA DE FUEGO (aprendida el 28/9/2026, no romper JAMÁS)
NUNCA deployar a producción sin que Marcos lo haya VISTO antes corriendo
en un entorno real (sandbox). Flujo obligatorio: rama → PR → Deploy
Preview de Netlify (ese es el sandbox) → Marcos mira la URL del preview
y da el OK explícito → recién ahí merge a main. Sin excepciones, aunque
el cambio parezca menor o Marcos haya dicho antes "vamos a produ": esa
frase NO autoriza saltear su revisión visual.

## Reglas de trabajo con Marcos
- Voseo uruguayo. Tono: ver skill escribir-como-marcos. NUNCA guion largo (—).
- No inventar datos, horarios, handles ni links: verificar o preguntar.
- Flujo: maqueta/diseño primero para cambios visuales grandes → OK de
  Marcos → código. Cambios chicos de contenido: directo.
- Branch por fase, commit descriptivo en español, testeo "de tercero"
  antes de merge (tsc + links con curl + Deploy Preview de Netlify del PR
  — el server local NO arranca bajo procesos del agente, usar el preview).
- Marcos autoriza cada merge a main, salvo que diga explícitamente lo
  contrario. Verificar producción post-deploy con curl.
- Contador de socios: oculto (comentado en PlanesDeSuscripcion) hasta
  hacerlo dinámico. Base simulada en SociosCounter/getSociosCount.ts.

## Identidad
- Anton (display, via --font-anton) + Montserrat. Tokens dopamina.* en
  tailwind.config.js (violeta/amarillo/celeste/cian/rojo/verde/bordo...).
- Superficies SIEMPRE con los tokens de la maqueta: dopamina.fondo #0A0812,
  panel #14101F, linea, tinta-2/3. Nada de zinc en secciones del rediseño.
- Color por función (Marcos, 27/9): on demand = ROJO YouTube o blanco+rojo;
  amarillo solo para membresía/marca; verde-fluo = vúmetro. La palabra
  "multimedio" no va en la web.
- Tagline: "El estrimin que mira Uruguay" ("Uruguay" en dopamina.celeste).
- Comunidad: "blandengues". Web = B2C cercano; dossier = B2B.
- /api/ultimos scrapea la playlist de cada programa (las 4 vigentes están en
  components/ui/aire/ultimos.ts + LoUltimo); hay listas duplicadas viejas en
  el canal, no cambiarlas sin verificar cuál recibe los videos nuevos.
- Assets fuente: /Users/a59898/Documents/Dopamina - Recursos/Recursos
  graficos/RRSS (miniaturas 16:9, video loops, portada YouTube).

## Próxima fase: PORTAL (notas + admin)
Leer docs/fase-portal-anotaciones-marcos.md (control editorial, seguridad
primero, posteador automático de carruseles) y docs/plan-fase-2.md
(CMS recomendado: Payload 3 embebido + Neon Postgres; alternativa Sanity).

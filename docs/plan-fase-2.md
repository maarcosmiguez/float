# Fase 2 — Renovación creativa + Portal de notas

> Investigación y asesoría (setiembre 2026). Base para decidir antes de codear.

## 2a. Renovación creativa de la interfaz

### Lecciones de mundoliminal.com (referencia, no plagio)

Lo que hace que Liminal se sienta "de otro nivel" no es su estética radar
(esa es SU identidad, un globo geopolítico con telemetría). Es el método:

1. **Un elemento vivo persistente que ES la identidad.** Todo el sitio ocurre
   sobre un instrumento que reacciona al scroll. No es decoración: es tema.
2. **Microcopy de sistema.** El sitio "habla" como el instrumento que
   representa (bearing, frames, TRK/LIVE).
3. **Feed multi-plataforma.** "Últimos de LIMINAL" con badges EN YOUTUBE /
   EN SUBSTACK / EN SPOTIFY — agrega todo el output del medio en la home.
4. **Manifiesto editorial claro** ("lo que hacemos y lo que no").

### Traducción Dopamina (propuesta de dirección, a maquetar)

El equivalente dopamínico del globo de Liminal es **el estudio en vivo**:

- **Elemento vivo:** las paredes tipográficas 3D del loop (ESTO ES DOPAMINA)
  convertidas en elemento interactivo que reacciona al scroll, o un "sistema
  eléctrico" del rayo D que recorre la página conectando secciones.
- **Microcopy de aire:** lenguaje de control de vivo — EN VIVO / AL AIRE,
  vúmetros, cue de programas ("EN 3, 2, 1..."), la barra segmentada como
  timeline de emisión.
- **Feed multi-plataforma:** "Lo último de Dopamina" con badges EN YOUTUBE /
  EN INSTAGRAM / EN SPOTIFY (clips, carruseles, episodios) — y cuando exista
  el portal, EN DOPAMINA.UY (notas).
- **Grilla como programación de TV:** estado "AL AIRE AHORA" calculado por
  hora/día real — cuando un programa está en vivo, su card lo muestra.
- Insumos: brand kit (Morganite/Montserrat/Anton, paleta por secciones),
  gráficos de "Dopamina - Recursos" (solo elementos, no orientación de
  ventas), motions propios (mosca, intro, paredes).

Flujo acordado: maqueta → crítica → OK de Marcos → código.

## 2b. Portal de notas — asesoría de back office

Necesidad: que Fer, Marcos y otres periodistas escriban notas desde un
panel con login simple, sin tocar código, gratis o casi.

### Recomendación: Payload CMS 3 embebido (confirma la elección de agosto)

- Vive **dentro de este mismo repo Next.js**: el panel queda en
  `dopamina.uy/admin`, un solo deploy en el mismo Netlify (hay guía oficial
  de Netlify para Payload 3). Sin servicios extra que mantener.
- **Login:** cada autor con su email y clave (se puede sumar "entrar con
  Google" después vía plugin OAuth). Roles: autor, editor, admin.
- **Costo: $0.** Open source + base Postgres gratis (Neon free tier).
- Modelo de contenido ya planificado: `authors` (nombre, foto, bio, redes),
  `posts` (título, slug, bajada, cuerpo, portada, autor, sección, estado),
  `sections` (mapeadas a la paleta por color).
- Frontend: `/nota/[slug]` con SEO propio + JSON-LD NewsArticle,
  `/autor/[handle]`, `/seccion/[nombre]`, sitemap dinámico y RSS.
- Nota de contexto 2026: Payload fue adquirido por Figma; sigue open source
  y es hoy el CMS por defecto del ecosistema Next.js.

### Alternativa: Sanity (si el panel de Payload no convence al equipo)

- Studio hosteado con **login con Google nativo** (cero fricción de claves),
  edición colaborativa en tiempo real, free tier generoso (~20 asientos,
  10K documentos según límites 2026 — cambian sin aviso).
- Contras: el contenido vive en la nube de Sanity (no en nuestro repo),
  segundo sistema aparte, y dependencia de límites de un tercero.

### Lo descartado

- **Ghost:** implicaría migrar el sitio entero; ya no tiene sentido con
  todo lo construido en Next.js.
- **CMS basados en Git (Decap/Keystatic):** obligan a los periodistas a
  tener cuentas de GitHub — fricción inaceptable para la redacción.
- **"Doc de Google + script":** funciona una semana y después es ingobernable
  (sin roles, sin estados de borrador/publicado, sin SEO por nota).

### Etapas sugeridas (cuando se apruebe)

1. Infra: Payload en el repo + Neon Postgres + auth de autores.
2. Modelo de contenido + carga de autores reales.
3. Frontend del portal (nota, autor, sección, RSS, sitemap dinámico).
4. Nota de prueba de punta a punta → producción.

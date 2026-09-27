# Anotaciones de Marcos para la fase Portal (paquete textual, set 2026)

> Guardado tal cual lo definió Marcos antes de ejecutar la fase. NO ejecutar
> nada de esto hasta que arranque el proyecto del portal.

## Seguridad
- **Chequeo de seguridad importante ANTES de desarrollar la fase 2 (portal).**
- El admin site debe tener **código de seguridad interno entre las personas**:
  ningún periodista puede publicar directo sin control.

## Control editorial (discreto, no visible como jerarquía)
- **Marcos da de alta cada nota** — OK final dentro del admin site a TODO
  antes de que salga. Razones: dueño del 50%, maneja la tecnología del canal
  y la gestión de redes en esta fase inicial.
- **Aníbal o Marcos validan cada carrusel** antes del posteo automático.
- Fer Kosak es la otra publicadora principal: **escribe muy bien** (ver sus
  artículos en otros medios) pero es desprolija con el diseño → el sistema
  debe garantizar la prolijidad gráfica por diseño, no por confianza.
- El control editorial **no debe ser demasiado visible** en la UI.

## Generador de posteo automático (la gran apuesta)
- El admin site incluye un **generador de posteo automático conectado a las
  redes** del canal.
- Base: versiones ajustadas de la skill `carruseles-dopamina` (y hay
  antecedente en `tuitero-dopamina` para X).
- Los carruseles de **noticias** NO son iguales a los de **notas/prensa
  escrita propia**: las notas tienen su propio posteador de carrusel
  automatizado para Instagram, tras validación (Aníbal o Marcos).
- Marcos deberá crear **assets nuevos y una adaptación gráfica** para esto.
- Preferencia: **sin servicios pagos** salvo que sea obligatorio (avisar si
  lo es). Si conviene otra herramienta o hacerlo fuera del admin site,
  proponerlo — pero **manual no hay chance**: todos los medios lo tienen
  automatizado.

## Visión
- Dopamina es el medio nuevo: integra tecnología a la comunicación como
  valor agregado, no para plastificar. Esta automatización + el portal es lo
  que lo vuelve de verdad un **multimedio** (palabra que no debe figurar en
  la web hasta que sea real).
- Llevará pasos y testing propios.

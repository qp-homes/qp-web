# Quality Plus Building Services: guía para agentes

Reglas compartidas para cualquier agente de código (Claude, Codex u otro). Léelas antes de cambiar nada.
Para instalación, estructura y mapa de URLs, ver `README.md`.

## Proyecto

Web comercial B2B de limpieza en Los Angeles, estática, con Astro. El contenido público va en **inglés americano**.
El público son facility managers, property managers y responsables de retail y consultorios.
El objetivo es conseguir solicitudes de **Site Walkthrough**, no presupuestos instantáneos.

## Trabajo entre herramientas

- Solo una herramienta edita a la vez. Antes de empezar, ejecuta `git status` y `git log --oneline -5`.
- Si hay cambios sin guardar que no reconoces, no los descartes: pregunta.
- Haz commits pequeños con un mensaje que diga qué cambió y por qué.
- Al terminar una tarea, confirma que `npm run check` y `npm run build` pasan.
- No hagas push, despliegues ni conectes servicios externos salvo petición expresa.

## Contenido: reglas firmes

- No inventes afirmaciones comerciales, cifras, certificaciones, testimonios, reseñas ni clientes.
- No publiques lo que siga pendiente en `PENDING_CLIENT_APPROVAL.md`. Si añades una afirmación sin verificar, regístrala ahí.
- Enfoque exclusivamente comercial: nada de limpieza residencial.
- Medical office: no prometas HIPAA, OSHA, "medical-grade", control de infecciones ni biohazard sin documentación.
- Usa solo fotos reales del equipo, con un ALT que describa lo que se ve. No uses stock.
- El formulario está en **modo demo**: no hace peticiones de red y debe seguir indicándolo hasta conectarlo (`INTEGRATIONS_LATER.md`).

## SEO: no romper

- No cambies URLs, titles, descriptions, H1, H2, canonicals ni schema sin una razón explícita.
- Todo el texto debe estar en el HTML generado. Nunca lo hagas depender de JavaScript o canvas.
- Una sola H1 por página.
- `src/data/areas.ts` decide qué condados se indexan. Orange County, San Bernardino County y San Diego siguen en `noindex`
  hasta que se confirme la cobertura. No crees páginas masivas por ciudad.
- El schema solo describe datos visibles y verificados. Nada de ratings ni reseñas inventadas.

## Diseño y movimiento

- Tokens en `src/styles/global.css`. Usa los existentes en lugar de colores sueltos.
- Contraste AA: los botones naranjas llevan texto oscuro; para texto naranja sobre claro, usa `--orange-ink`.
- La línea de skyline del logo es la firma gráfica. Evita degradados morados, glassmorphism y tarjetas idénticas.
- Las animaciones son mejora progresiva: sin JavaScript o con `prefers-reduced-motion`, la página debe verse completa.
- No ocultes del todo el elemento LCP al cargar. GSAP y Lenis se cargan en diferido desde `src/scripts/motion.ts`.
- Comprueba móvil (360–430 px) y escritorio, sin desbordamiento horizontal.

## Dónde está cada cosa

- Contenido: `src/data/` (`site.ts`, `services.ts`, `areas.ts`, `photos.ts`).
- Páginas: `src/pages/`. Componentes: `src/components/`.
- Fotos: nunca edites a mano `src/assets/photos/`; se generan con `npm run images` desde `../recursos`, que no está en el repositorio.

## Estado actual

- La Home tiene aplicada la Fase 1 de movimiento y está pendiente de revisión del propietario.
- Todo el sitio comparte el fondo ambiental fijo (`Ambient.astro`), el índice lateral de secciones (`ChapterRail.astro`)
  y las animaciones de `motion.ts`, que `BaseLayout` carga en cada página. `/home-v2/` los desactiva con `journey={false}`.

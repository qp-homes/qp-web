# Auditoría SEO + GEO final — Quality Plus Building Services

- **Fecha:** 2026-11-04
- **Estado:** LOCAL. La web nueva está en Netlify (`qualitypluscleaning.netlify.app`, protegida con contraseña: todo responde 401). El dominio final `qualitypluscleaningla.com` **todavía sirve la web antigua en WordPress/Elementor**.
- **Commit auditado:** `3692b29` (build de producción con `SITE_URL=https://qualitypluscleaningla.com`).
- **Negocio:** limpieza comercial B2B (retail, consultorios médicos, edificios comerciales; ventanas, power washing y alfombras) con sede en 4113 Beverly Blvd, Los Angeles. Zona principal: Los Angeles County (88 ciudades). Orange County, San Bernardino County y San Diego, en `noindex` hasta confirmarlos.
- **Reemplaza una web anterior:** sí, la de WordPress en el mismo dominio (14 URLs en su sitemap, algunas indexadas en Bing).
- **Origen de los leads, idioma y canal:** sin confirmar con la clienta (ver "Qué pedirle al cliente").

**Veredicto:** la base on-page es sólida: titles, H1, canonicals, schema y una página por servicio. **No está lista para publicar** por cuatro bloqueos:
1. El rendimiento móvil cayó con las animaciones nuevas (home 47).
2. Faltan las 301 de las 12 URLs viejas.
3. El formulario sigue en modo demo.
4. No hay `llms.txt` ni `sameAs`.

Fuera de la web, el perfil de Google existe y tiene teléfono, pero solo 1 reseña, y la dirección del perfil no coincide del todo con la de la web.

---

## 0. Actualización 2026-11-05: correcciones aplicadas en local

Con el visto bueno de Joan se aplicaron las correcciones que no dependen de la clienta.

| Página | Dispositivo | Rendimiento | Accesibilidad | Buenas prácticas | SEO | LCP | CLS | TBT |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| Home | Móvil | 47 → **76–84** | 96 → **100** | 100 | 100 | 6.5 → 4.0 s | 0.148 → **0** | 890 → 160 ms |
| Home | Escritorio | 95 → 95–97 | 96 | 100 | 100 | 1.1–1.2 s | 0–0.058 | 60–130 ms |
| Servicio | Móvil | 80 → **92** | 100 | 100 | 100 | 3.0 s | 0 | 70 ms |
| Servicio | Escritorio | 89 → **100** | 100 | 100 | 100 | 0.5 s | 0.012 | 0 ms |
| Zona LA County | Móvil | 59 → **90** | 100 | 100 | 100 | 3.3 s | 0 | 50 ms |
| Zona LA County | Escritorio | 88 → **100** | 100 | 100 | 100 | 0.6 s | 0 | 0 ms |

En la home móvil el rendimiento oscila entre 76 y 84 de una medición a otra. Los rangos indican varias mediciones.

**Qué cambió:**
- **Rendimiento:**
  - Se quitó `text-wrap: pretty` de párrafos y listas, que duplicaba el tiempo de layout en móvil.
  - GSAP y ScrollTrigger se cargan solo en escritorio con ratón; en móvil quedan las animaciones CSS.
  - Los resplandores del fondo ya no usan `filter: blur`.
  - Las primeras lecturas de scroll (fondo y header) esperan al primer frame para no forzar layout durante la carga.
  - El índice lateral no hace trabajo en pantallas estrechas.
  - El hero tiene un `sizes` real.
- **CLS:** se añadió una fuente de reserva (Arial ajustada a las métricas de Archivo) para que el texto no salte cuando carga la fuente.
- **Animaciones accesibles:** solo movimiento, sin `opacity: 0`, agrupadas con `ScrollTrigger.batch`. La frase del statement arranca al 55 % de opacidad (≥ 3:1). Botón "Pause motion" para el carrusel del hero y el ticker (WCAG 2.2.2). Fondo propio en los paneles de servicios fijados y área táctil mínima de 24 px en los enlaces.
- **301:** las 14 URLs del sitemap de WordPress y sus sitemaps quedan redirigidas en `netlify.toml`. Comprobarlas con `curl` el día del cambio de dominio.
- **Schema:** `FAQPage` en todas las páginas con FAQ (texto idéntico al visible). `sameAs` con el perfil de Google (`?cid=8422972607425501852`).
- **GEO:** `/llms.txt` generado desde `src/data/` y `site.webmanifest`.
- **Contenido:**
  - "janitorial" se añadió en la description de la home, en una FAQ y en Commercial Building Cleaning.
  - Titles de los servicios y de Service Areas recortados a ≤ 60 caracteres.
  - Corrección al informe original: las páginas de servicio **sí** enlazaban ya a LA County.

**Pendiente:**
- Formulario real: hay que elegir destino.
- Dirección "Blvd A" y relación con Purple Home Cleaning (`PENDING` 1.8).
- URLs de los demás perfiles para `sameAs` (`PENDING` 1.9).
- Reseñas y señales de confianza.
- Search Console y Bing Webmaster.
- LCP móvil de la home: 4,0 s, que se explican sobre todo por el retraso de render de la foto del hero en la simulación.
- Lighthouse escritorio marca en la home un objetivo táctil "parcialmente tapado" en un enlace del panel horizontal fijado, que está fuera de pantalla mientras no se llega a él. Parece un falso positivo, pero queda anotado.

---

## 1. Lighthouse (local, build de producción, `astro preview`)

| Página | Dispositivo | Rendimiento | Accesibilidad | Buenas prácticas | SEO | LCP | CLS | TBT |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| Home `/` | Móvil | **47** ❌ | 96 ⚠️ | 100 | 100 | **6.5 s** | **0.148** | **890 ms** |
| Home `/` | Escritorio | 95 | 96 ⚠️ | 100 | 100 | 1.2 s | 0 | 100 ms |
| Servicio `/services/window-cleaning/` | Móvil | **80** ⚠️ | 100 | 100 | 100 | 3.2 s | 0 | 420 ms |
| Servicio | Escritorio | 89 ⚠️ | 100 | 100 | 100 | 1.3 s | 0 | 150 ms |
| Zona `/service-areas/los-angeles-county/` | Móvil | **59** ❌ | 100 | 100 | 100 | 3.8 s | 0.038 | **1,190 ms** |
| Zona | Escritorio | 88 ⚠️ | 100 | 100 | 100 | 1.4 s | 0 | 120 ms |

**Causas (de los informes JSON):**
- **Style & Layout: 4,3–4,4 s del hilo principal en móvil** (home y zona). Lo provocan sobre todo los cambios de las últimas dos versiones:
  - el fondo fijo con dos resplandores con `filter: blur(70px)` del tamaño de la pantalla, que se repintan en cada scroll;
  - cientos de `ScrollTrigger` (`textReveals` crea uno por cada eyebrow, lead y botón; `headingReveals`, uno por cada H2);
  - lecturas de `getBoundingClientRect` en el scroll (índice lateral y parallax).
- **ScrollTrigger + GSAP: entre 1,5 y 2,9 s de CPU** por página en móvil.
- **CLS 0,148 en la home:** un `div` se desplaza durante la carga (Lighthouse lo señala como la causa del CLS).
- **LCP 6,5 s en la home móvil:** el elemento LCP es la foto del hero, que lleva `sizes="100vw"` aunque en escritorio ocupa la mitad. Lighthouse estima 225 KiB de ahorro en imágenes en móvil y 674 KiB en escritorio.
- **Contraste (accesibilidad 96):** la frase "Every facility runs differently…" arranca con las palabras al 18 % de opacidad (`.sw`, contraste 1,43:1). Ver la regla D del checklist: no ocultar texto con opacidad.
- **`textReveals` (nuevo) anima con `opacity: 0`**, lo que va contra la regla D ("solo movimiento, nunca opacity 0").

**axe:** se usó el motor axe-core que incluye Lighthouse. El único fallo es el de contraste de arriba (en servicio y zona da 100). No pude ejecutar axe-core aparte porque el build no sirve `node_modules`.

**Local vs. live:** no se puede comparar todavía. Netlify devuelve 401 en todas las rutas por la protección con contraseña, y el dominio final sigue en WordPress.

---

## 2. Checklist A–H

### A. Rastreo e indexación
| | Punto | Evidencia |
|---|---|---|
| ✅ | `robots.txt` existe y declara el sitemap | `User-agent: * / Allow: /` + `Sitemap: https://qualitypluscleaningla.com/sitemap-index.xml` |
| ✅ | Bots de IA permitidos | No hay `Disallow`; todos permitidos por defecto |
| ✅ | Sitemap solo con URLs indexables | 13 URLs; quedan fuera `/home-v2/`, `/thank-you/`, `/404/` y los 3 condados sin confirmar |
| ✅ | Canonical absoluto con el dominio final | Todas las páginas indexables apuntan a `https://qualitypluscleaningla.com/...` |
| ✅ | Páginas no públicas con `noindex` | `/home-v2/`, `/thank-you/`, `/404`, Orange County, San Bernardino y San Diego con `noindex, follow` |
| ⚠️ | www / http→https | En WordPress funciona (http→https y www→sin www con 301). En Netlify no se puede probar hasta conectar el dominio |
| ✅ | 404 real | `dist/404.html`; Netlify lo sirve con estado 404 (según `INTEGRATIONS_LATER.md`). Comprobarlo en vivo |
| ❌ | **301 de la web anterior** | En `netlify.toml` solo está `/services/` → hub. **12 de las 14 URLs viejas no existen en la web nueva** y darían 404 (tabla abajo). Bing ya tiene indexadas `/home-building-services-cleaning/` y `/about-building-services-cleaning/` |
| ✅ | Texto en el HTML servido | Todo el contenido está en el HTML; las animaciones solo envuelven el texto en tiempo de ejecución |
| ⚠️ | Netlify indexable solo en producción | No hay `noindex` por contexto. Hoy lo protege la contraseña, pero si se quita antes de conectar el dominio, `*.netlify.app` quedaría pública con canonicals hacia la web de WordPress |

**URLs viejas → destino propuesto (301):**

| URL antigua (WordPress) | Destino nuevo |
|---|---|
| `/about-building-services-cleaning/` | `/about/` |
| `/about-home-services-cleaning/` | `/about/` |
| `/building-services-cleaning/` | `/commercial-cleaning-services/` |
| `/home-building-services-cleaning/` | `/` |
| `/services-cleaning/` | `/commercial-cleaning-services/` |
| `/comercial-cleaning-inland-empire/` | `/service-areas/san-bernardino-county/` (o `/service-areas/` mientras siga en noindex) |
| `/home-services-cleaning/` | `/` (era la parte residencial; no hay equivalente) |
| `/coming-soon/`, `/sample-page/` | `/` |
| `/author/*`, `/elementor-hf/*` | `/` |
| `/wp-sitemap.xml`, `/wp-sitemap-*.xml`, `/sitemap_index.xml` | `/sitemap-index.xml` |

Antes de cerrar este mapa conviene revisar Search Console de la web antigua por si hay más URLs con tráfico.

### B. On-page por página
| | Punto | Evidencia |
|---|---|---|
| ⚠️ | Title 50–60 caracteres | Home 55, About 50, hub 58 y contacto 49: bien. Largos: Service Areas **73**, `carpet-cleaning` 65, `commercial-building-cleaning` 67, `window-cleaning` 65 y `power-washing` 63 |
| ✅ | Description 140–160 únicas | Entre 140 y 162 caracteres (hub y Service Areas: 162; Orange County en noindex: 169) |
| ✅ | Un solo H1 | 1 por página en todas |
| ✅ | `lang="en-US"` | En todas |
| ✅ | URLs limpias | `/services/window-cleaning/`, `/service-areas/los-angeles-county/` |
| ✅ | Alt | Las fotos informativas tienen alt descriptivo; las decorativas (logo dentro de un enlace con nombre, slides del hero) llevan `alt` vacío |
| ✅ | Enlaces internos descriptivos | La home enlaza a los 6 servicios, al hub, a About, a zonas y a contacto; todo queda a ≤2 clics |
| ✅ | Breadcrumbs | Visibles en páginas internas + `BreadcrumbList` |
| ✅ | Open Graph y Twitter | og: title, description, url, image 1200×630, image:alt, site_name, locale + `summary_large_image` |
| ⚠️ | Favicon y manifest | Hay favicon de 32 px, `apple-touch-icon` y `theme-color`. **Falta `site.webmanifest`** y no hay favicon SVG |

### C. Datos estructurados
| | Punto | Evidencia |
|---|---|---|
| ✅ | `LocalBusiness` en todas las páginas | Con nombre, teléfono `+1-323-660-0751`, dirección, `areaServed` (LA County) y `founder` (`Person`) |
| ✅ | `Service` en cada página de servicio | Presente en las 6 |
| ❌ | `FAQPage` | **Ninguna página lo tiene**, aunque la home y las 6 páginas de servicio muestran FAQ visibles |
| ✅ | `BreadcrumbList` | En las páginas internas |
| ❌ | `sameAs` | `"sameAs":[]`. Hay perfiles reales: Google Maps (`https://maps.google.com/?cid=8422972607425501852`), Facebook, LinkedIn, Yelp y Chamber of Commerce |
| ✅ | Sin reseñas ni rating propios | No hay `Review` ni `AggregateRating` |
| ⚠️ | Validación | Pendiente en Rich Results Test y validator.schema.org cuando la URL sea pública |

### D. Rendimiento
| | Punto | Evidencia |
|---|---|---|
| ❌ | LCP < 2,5 s en móvil | Home 6,5 s, zona 3,8 s, servicio 3,2 s |
| ❌ | TBT < 200 ms | 420–1.190 ms en móvil (GSAP/ScrollTrigger + layout) |
| ❌ | CLS < 0,1 | Home 0,148 |
| ⚠️ | Imágenes responsivas | Hay `srcset` y AVIF/WebP, pero el hero usa `sizes="100vw"` y Lighthouse estima entre 160 y 674 KiB de ahorro |
| ✅ | Librerías de animación diferidas | GSAP y Lenis se cargan en `requestIdleCallback` y no con reduced motion. **Pero en móvil se cargan igual** y son la mayor fuente de CPU |
| ❌ | Animaciones sin `opacity: 0` | `textReveals` (eyebrows, leads, botones) y la frase con `.sw` al 18 % |
| ✅ | Cache y cabeceras | `/_astro/*` inmutable un año; cabeceras de seguridad en `netlify.toml` |

### E. Accesibilidad
| | Punto | Evidencia |
|---|---|---|
| ⚠️ | Contraste AA | Falla solo la frase del statement en la home (1,43:1 al cargar) |
| ✅ | Teclado, foco y skip link | Hay `skip-link` y foco visible; el índice lateral sale a la vista con `:focus-within` |
| ✅ | Formulario con labels | `ContactForm` con labels y mensajes |
| ✅ | `prefers-reduced-motion` | Respetado: GSAP no se carga y las animaciones CSS se anulan |
| ⚠️ | Movimiento infinito con pausa (2.2.2) | El ticker de servicios y el carrusel de fotos del hero se mueven en bucle **sin botón de pausa** |
| ✅ | Región con scroll enfocable | La galería tiene `tabindex="0"` y `aria-label` |

### F. Contenido y E-E-A-T
| | Punto | Evidencia |
|---|---|---|
| ✅ | Página por servicio | 6 páginas de 650–800 palabras (incluido el texto común de cabecera y pie) |
| ✅ | Zonas reales y sin doorway | Solo LA County es indexable; los otros 3 condados quedan en `noindex` hasta confirmarlos. No se crearon páginas servicio × ciudad (correcto mientras no haya demanda confirmada) |
| ⚠️ | Enlaces cruzados servicio ↔ zona | La home y el hub enlazan bien. Las páginas de servicio no enlazan a la de LA County con un texto local ("commercial cleaning in Los Angeles County") |
| ❌ | **Sinónimos del rubro** | "janitorial" aparece **0 veces** (es la categoría de Google del perfil y de 6 de los 10 competidores del mapa). "custodial", "day porter" y "building maintenance": 0. "office cleaning": 71 |
| ⚠️ | Contenido local | Se nombran Downtown, Pasadena, Glendale, Burbank, Santa Monica y Long Beach (2–4 veces). Falta un bloque propio por zona (tipos de edificios, barrios donde trabajan) |
| ✅ | Fotos reales | Solo fotos del equipo, con alt; sin stock |
| ❌ | Señales de confianza | No hay licencia, seguro, bonding, años ni reseñas visibles. Todo está pendiente de la clienta (`PENDING_CLIENT_APPROVAL` 1.4, 4.1, 4.2 y 5) |
| ✅ | About con historia y fundadora | Karla Carpio en About y Home |
| ⚠️ | NAP idéntico | Web: "4113 Beverly Blvd". **Google Business: "4113 Beverly Blvd A"**. Teléfono igual en todas partes |
| ❌ | **CTA con el canal real** | El botón principal lleva al **formulario, que sigue en modo demo** y no envía nada. Solo llamar funciona. No hay SMS ni WhatsApp (falta confirmar qué canal usan sus clientes) |
| ✅ | Barra móvil | "Call" + "Request a Walkthrough" fija |

### G. GEO / AEO
| | Punto | Evidencia |
|---|---|---|
| ✅ | Respuestas directas y FAQ reales | FAQ visibles en la home y en cada servicio |
| ⚠️ | Datos citables | Hay 88 ciudades, 6 servicios y el proceso en 4 pasos. Faltan años, número de clientes o edificios y frecuencias típicas, todo pendiente de la clienta |
| ✅ | Entidad clara | Mismo nombre, fundadora y ciudad en toda la web |
| ❌ | `llms.txt` | No existe (`dist/llms.txt` no está y la web vieja da 404) |
| ❌ | `sameAs` | Vacío (ver C) |
| ⚠️ | Bing | La empresa sale en Bing con su ficha local, pero apuntando a las URLs viejas. Bing Webmaster Tools: pendiente |
| ⚠️ | Menciones externas | Hay Facebook, LinkedIn, Yelp, Chamber of Commerce (5/5, 29 valoraciones) y bizprofile. No hay prensa ni asociaciones |
| ❌ | Answer share | **No se pudo medir.** Perplexity pide crear una cuenta para responder ("Sign up and repeat your request"), ChatGPT necesita sesión y yo no puedo crear cuentas ni iniciar sesión. Las 5 preguntas de la línea base están más abajo |

### H. Fuera de la web
| | Punto | Evidencia |
|---|---|---|
| ✅ | Google Business Profile existe | "Quality Plus Building Services", categoría "Servicio de limpieza y mantenimiento" (*janitorial service*), enlace a `qualitypluscleaningla.com` |
| ✅ | **Tiene teléfono** | +1 323-660-0751 |
| ❌ | **Reseñas** | **5,0 con 1 sola reseña** (Debbie Berry, hace 10 meses, respondida). En el mapa, los competidores tienen entre 15 y 559 |
| ⚠️ | Dirección | "4113 Beverly Blvd **A**". **En la misma dirección aparece "Purple Home Cleaning, LLC"** (otro teléfono, limpieza residencial): preguntar si es la misma empresa. Dos fichas de limpieza en la misma dirección pueden confundir a Google |
| ❌ | Visibilidad en el mapa | Quality Plus **no aparece en el top 10** de "commercial cleaning services Los Angeles" |
| ⚠️ | Competidores (top 3 del mapa) | 1) All City Janitorial Services, 4,8 (40), janitorial service, DTLA. 2) Nexus Commercial Cleaning LA, 5,0 (15), Burbank. 3) Office Pro Commercial Cleaning Service, 5,0 (51), janitorial service, Koreatown. **Brecha principal: reseñas**, y que los competidores usan "janitorial" en su categoría y su nombre |
| ⚠️ | Citaciones | Hay Facebook, LinkedIn, Yelp y Chamber of Commerce. Faltan por verificar Bing Places, Apple Business Connect y BBB, y si todas usan "Blvd A" o "Blvd" |
| ❌ | Search Console / Bing Webmaster | No estaba abierto en el navegador del panel: requiere acceso de la clienta |
| ❌ | Analítica y conversiones | Sin GA4 ni eventos, a propósito (`INTEGRATIONS_LATER.md`) |
| ⚠️ | Privacidad | Hay política (borrador) en el footer; falta revisión legal (`PENDING` 7) |

---

## 3. Mapa de visibilidad GET CHOSEN (0–5)

| Capa | Nota | Evidencia |
|---|---:|---|
| FOUND | **1** | La web antigua indexada perdería sus URLs sin 301; no sale en el top 10 del mapa; sin Search Console |
| UNDERSTOOD | **3** | Páginas por servicio y zona, titles con servicio y ciudad, `LocalBusiness` y `Service`. Faltan `FAQPage`, `llms.txt`, `sameAs` y el término "janitorial" |
| TRUSTED | **1** | 1 reseña en Google; sin licencia, seguro ni años visibles; NAP con "Blvd A" distinto y otra empresa en la misma dirección |
| CHOSEN | **2** | Buenos diferenciales (fundadora cercana, walkthrough, fotos reales, enfoque comercial); contenido local genérico; answer share sin medir |
| ACTIONABLE | **2** | Teléfono en el perfil y en la web, y barra móvil con Call. Pero el formulario, que es el CTA principal, no envía nada |

---

## 4. Correcciones por impacto

### P1: bloquean la publicación
1. **Redirecciones 301** de las 12 URLs viejas y los sitemaps de WordPress en `netlify.toml` (tabla de la sección A). Probarlas con `curl` el mismo día del cambio de DNS.
2. **Conectar el formulario** (Netlify Forms o función) o, mientras tanto, que el CTA principal sea **llamar**. Hoy, quien pide un walkthrough no llega a nadie.
3. **Rendimiento móvil a ≥ 90:**
   - en móvil o pantallas táctiles, no cargar GSAP/ScrollTrigger: dejar las animaciones CSS e IntersectionObserver;
   - quitar o reducir los `blur(70px)` del fondo fijo (usar `radial-gradient` sin `filter`, o un fondo estático en móvil);
   - un solo `ScrollTrigger.batch` en lugar de uno por elemento en `textReveals` y `headingReveals`;
   - corregir el CLS de la home;
   - `sizes` real en el hero (`(min-width: 64rem) 50vw, 100vw`).
4. **Animaciones sin `opacity: 0`:** que `textReveals` use solo `y`, y que la frase `.sw` arranque en una opacidad legible (≥ 0,55) o cambie de color en lugar de opacidad. Con esto, accesibilidad pasa a 100.
5. **Confirmar la dirección del NAP** ("Blvd A" o "Blvd") y la relación con Purple Home Cleaning. Igualar la web, el schema y el perfil.

### P2: primer mes
6. `FAQPage` en la home y en las 6 páginas de servicio (texto idéntico al visible).
7. `sameAs` con Google Maps (CID `8422972607425501852`), Facebook, LinkedIn, Yelp y Chamber of Commerce, cuando la clienta confirme las URLs (`PENDING` 1.6).
8. `llms.txt` generado desde `src/data/` (servicios, zona, contacto y páginas clave).
9. **Sinónimos del rubro:** "janitorial services", "office cleaning", "custodial" en los H2, intros y FAQ de la home, del hub y de commercial building, sin forzarlos. Valorar un title del tipo "Commercial Cleaning & Janitorial Services in Los Angeles".
10. Acortar los titles largos (Service Areas a ≤ 60, y quitar "Services" de los que superan 60).
11. Enlaces de cada servicio a `/service-areas/los-angeles-county/` con texto local.
12. Botón de pausa para el ticker y para el carrusel del hero (WCAG 2.2.2).
13. `site.webmanifest`.
14. En Netlify, `noindex` y `Disallow` por contexto (deploy previews y branch deploys).

### P3: crecimiento
15. Plan de reseñas: pedir una tras cada servicio a clientes comerciales; objetivo de 15–20 para acercarse al top 3.
16. Search Console y Bing Webmaster: enviar el sitemap con la URL completa y pedir indexación de la home y los 6 servicios.
17. GA4 o una alternativa ligera, con eventos de llamada y de formulario verificados.
18. Bloque local propio en la página de LA County (barrios y tipos de edificios donde trabajan) y, si hay demanda real, 3–5 landings de ciudad (`PENDING` 2.5).
19. Medir el answer share cada mes con las 5 preguntas de abajo.

---

## 5. Qué pedirle a la clienta
- **De dónde vienen sus clientes actuales**, en qué idioma y por qué canal (llamada, texto, email, formulario, recomendación).
- **Dirección oficial:** ¿"4113 Beverly Blvd" o "Suite A"? ¿Se puede mostrar? ¿Qué relación hay con **Purple Home Cleaning, LLC** en la misma dirección?
- **Acceso a Google Business Profile, a Search Console de la web antigua y al DNS** del dominio.
- URLs oficiales de **Facebook, LinkedIn, Yelp** y otros perfiles para `sameAs`.
- Email comercial definitivo (hoy `info@qp-homes.com`).
- Años en el negocio (2006), **licencia, seguro, bonding** y certificaciones con documento.
- Testimonios de clientes comerciales con permiso, y un plan para pedir reseñas.
- Confirmar los condados extra y si atienden Avalon/Catalina.
- Destino del formulario (correo, CRM o HomeSuite) y si quieren SMS.
- Horario de atención para el perfil y el schema.

## 6. Línea base de IA (para medir con tu sesión)
Ventana nueva en ChatGPT y Perplexity; anotar si nombran a Quality Plus y qué fuentes citan:
1. "Recommend 3 commercial cleaning companies in Los Angeles"
2. "Best janitorial service for an office building in Los Angeles"
3. "Medical office cleaning company in Los Angeles"
4. "Retail store cleaning service Los Angeles"
5. "What is Quality Plus Building Services in Los Angeles?"

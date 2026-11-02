# Quality Plus Building Services — Website

Sitio comercial nuevo para **Quality Plus Building Services** (limpieza comercial, Los Angeles).
Generación estática con [Astro](https://astro.build), contenido en inglés americano, SEO técnico integrado.

> Estado: **maqueta funcional local**. No hay despliegue, dominio, analítica, CRM ni envío real de formularios.
> Ver `PENDING_CLIENT_APPROVAL.md` e `INTEGRATIONS_LATER.md`.

---

## Requisitos

- **Node.js 22.12+** (ver `.nvmrc`) y npm 10+
- Solo para regenerar imágenes: **Python 3.10+** con `pip install pillow pillow-heif`

## Puesta en marcha

```bash
cd website
npm install
npm run dev          # http://localhost:4321 — servidor de desarrollo con recarga
```

## Compilación de prueba

```bash
npm run build        # genera /dist (HTML estático + imágenes AVIF/WebP)
npm run preview      # sirve /dist en local para revisarlo como en producción
npm run check        # comprobación de tipos y plantillas (0 errores esperados)
```

La primera compilación tarda ~3 minutos porque genera ~190 variantes de imagen; las siguientes reutilizan caché.

### URL base (dominio final)

Canonicals, Open Graph, datos estructurados, `robots.txt` y sitemap salen de `SITE_URL`
(por defecto `https://qualitypluscleaningla.com`). Para otro dominio:

```bash
SITE_URL=https://www.ejemplo.com npm run build
```

En Netlify se define como variable de entorno del sitio. Copia `.env.example` si la quieres en local.

---

## Estructura

```
website/
├─ astro.config.ts          Configuración (SITE_URL, trailing slash, sitemap)
├─ netlify.toml             Build + cabeceras de caché/seguridad para el futuro sitio (no despliega nada)
├─ scripts/prepare-images.py  Convierte las fotos originales de ../recursos (HEIC→JPG, sin EXIF/GPS)
├─ public/                  favicon, iconos, og-image.jpg
└─ src/
   ├─ data/                 ← CONTENIDO EDITABLE
   │  ├─ site.ts            Datos del negocio (teléfono, email, dirección, flags pendientes)
   │  ├─ services.ts        Copy de los 6 servicios
   │  ├─ areas.ts           Regiones + ciudades de LA County, flag `indexable`
   │  ├─ photos.ts          Fotos y textos ALT
   │  ├─ schema.ts          JSON-LD (LocalBusiness, Service, BreadcrumbList)
   │  └─ indexing.ts        Rutas noindex / excluidas del sitemap
   ├─ components/           Header, Footer, Process, ServiceRows, Gallery, ContactForm, CityFinder…
   ├─ layouts/BaseLayout.astro  <head> SEO, schema, skip link, scripts de animación
   ├─ pages/                Una ruta por archivo (ver mapa abajo)
   └─ styles/global.css     Tokens de diseño (colores AA, tipografía, espaciado)
```

### Mapa de URLs

| Ruta | Indexable |
|---|---|
| `/` | ✅ |
| `/about/` | ✅ |
| `/commercial-cleaning-services/` | ✅ |
| `/services/retail-cleaning/` · `/medical-office-cleaning/` · `/commercial-building-cleaning/` | ✅ |
| `/services/power-washing/` · `/window-cleaning/` · `/carpet-cleaning/` | ✅ |
| `/service-areas/` · `/service-areas/los-angeles-county/` | ✅ |
| `/service-areas/orange-county/` · `/san-bernardino-county/` · `/san-diego/` | ❌ noindex hasta confirmar cobertura |
| `/contact/` · `/privacy-policy/` | ✅ |
| `/thank-you/` · `/404` | ❌ noindex |

Para indexar un condado cuando Karla confirme cobertura: `indexable: true` en `src/data/areas.ts`.
Entra solo en sitemap, schema `areaServed` y footer.

---

## Cómo editar contenido

- **Teléfono, email, dirección, año de fundación, redes**: `src/data/site.ts`.
  `foundedYear: 2006` hace aparecer el año en About y en el schema automáticamente.
- **Textos de servicios / FAQs**: `src/data/services.ts`.
- **Fotos**: añade el original en `../recursos/...`, regístralo en `scripts/prepare-images.py`,
  ejecuta `npm run images` y añade la entrada con su ALT en `src/data/photos.ts`.

---

## Dirección de diseño y decisiones técnicas

**Concepto "Skyline Ledger"**: editorial B2B sobre papel cálido, tinta azul marino, naranja de marca solo
en acciones y acentos, y la **línea del skyline del logo** convertida en firma gráfica que se dibuja al
entrar en pantalla. Fotografía real del equipo en todo el sitio (cero stock).

### Home (Fase 1 de motion)

| Elemento | Cómo | SEO / rendimiento |
|---|---|---|
| Hero a pantalla completa con secuencia de fotos (Ken Burns) | CSS; cabecera transparente que se vuelve sólida al hacer scroll | La 1ª foto es el LCP (`fetchpriority=high`); el H1 es texto real |
| Titular revelado palabra a palabra con máscara | CSS | Texto completo en el HTML y `aria-label` |
| Cinta de servicios en movimiento | CSS, `aria-hidden` | Decorativa |
| Frase de enfoque que se ilumina con el scroll | GSAP ScrollTrigger (scrub) | El texto se sirve entero; JS solo lo trocea |
| Servicios en sección fija con scroll horizontal y barra de progreso | GSAP (solo ≥ 1024 px) | En móvil y sin JS: lista vertical normal |
| Fotos que se revelan con recorte + escala | GSAP | Imágenes con dimensiones fijas (CLS 0) |
| Botones magnéticos y cursor con etiqueta "View" | GSAP, solo puntero fino | El cursor nativo se mantiene |
| Scroll suave | Lenis, solo escritorio | Táctil usa scroll nativo |
| Foto del servicio → cabecera de su página | View Transitions cross-document (CSS) | Chrome/Edge/Safari recientes; el resto navega normal |
| Tratamiento de color común en todas las fotos | `scripts/prepare-images.py` (`grade()`) | Sin coste en runtime |

`src/scripts/motion.ts` carga **GSAP + ScrollTrigger + Lenis (~52 KB gzip)** con `import()` dinámico cuando el
navegador está ocioso, solo en la Home y solo si el usuario no pide movimiento reducido. Con
`prefers-reduced-motion` o sin JavaScript la página se ve completa y estática.

### Resto del sitio

| Elemento | Dónde |
|---|---|
| Línea de skyline que se dibuja | Cabeceras, CTA, footer, 404 |
| Filas de servicio con preview que sigue al cursor | Hub de servicios |
| Proceso con raíl que se llena al hacer scroll | Home y servicios |
| Galería con scroll-snap | Home, About |
| Buscador de ciudades | Service Areas |
| Mega-menú y menú móvil a pantalla completa; barra móvil Call + Walkthrough | Global |

GSAP se distribuye bajo su licencia estándar gratuita (incluye uso comercial); Lenis es MIT.

**Accesibilidad**: contraste AA verificado en tokens (el naranja de marca lleva texto oscuro, no blanco),
skip link, foco visible, menús con `aria-expanded` y Escape, formulario con resumen de errores enfocable,
`aria-invalid` y `aria-describedby`, objetivos táctiles ≥ 44 px.

**Tipografía**: Archivo Variable (ejes de peso y anchura) autoalojada vía `@fontsource` y precargada; sin
llamadas a Google Fonts.

Antes de publicar: npm run check y npm run build.

# INTEGRATIONS_LATER

Puntos de integración preparados pero **no ejecutados**. Ninguno tiene endpoint, credencial ni etiqueta
real en el código. Orden recomendado: 1 → 2 → 3 → 4.

## 1. Publicación (GitHub + Netlify)

Preparado:
- `.gitignore` (excluye `node_modules`, `dist`, `.env`).
- `netlify.toml`: build `npm run build`, publish `dist`, Node 22, caché inmutable para `/_astro/*`,
  cabeceras de seguridad básicas, `X-Robots-Tag: noindex` en `/thank-you/`, 301 `/services/` → hub.
- `404.html` en la raíz de `dist`: Netlify lo sirve con estado HTTP 404 real.

Pasos (los gestionas tú):
1. Crear repo con la carpeta `website/` como raíz (los originales pesados de `../recursos` quedan fuera).
2. Conectar el repo en Netlify. Base directory: vacío (si el repo es `website/`) o `website`.
3. Variable de entorno `SITE_URL` = dominio final, p. ej. `https://qualitypluscleaningla.com`.
4. Comprobar en el deploy preview: canonicals, `robots.txt`, `sitemap-index.xml`, 404.

Fuera de alcance (no hecho): redirecciones desde las URLs de WordPress, DNS, cambio de dominio, backup de WordPress.
Cuando se migre: mapear URLs antiguas (`/home-building-services-cleaning/`, etc.) a las nuevas con 301 en `netlify.toml`.

## 2. Formulario real — `src/components/ContactForm.astro`

Hoy: validación en navegador, honeypot (`website`), bloqueo de reenvío en 5 s, mensaje **"Demo form"**
visible y confirmación de demo. **No hace ninguna petición de red.**

Para conectarlo:
1. Elegir destino: Netlify Forms, una Netlify Function propia o el endpoint de HomeSuite.
2. Reemplazar el bloque marcado `// DEMO:` en el script por un `fetch` POST (JSON o FormData).
3. **Validación en servidor** obligatoria (mismos campos requeridos, longitudes, email, teléfono) — la del
   navegador no es seguridad.
4. Anti-spam en servidor: honeypot + rate limit por IP; opcional Turnstile/hCaptcha.
5. Éxito → redirigir a `/thank-you/` (o mostrar el panel de éxito). Error → mensaje claro + teléfono.
6. Quitar el aviso `.demo-note` y el panel "Demo submission complete".
7. Incluir campos ocultos de origen: página, `utm_source`, `utm_medium`, `utm_campaign` (leer de la URL y
   guardar en `sessionStorage` al entrar).
8. No solicitar datos médicos (el formulario ya advierte de ello).

Campos enviados hoy (nombres `name`): `business`, `name`, `email`, `phone`, `address`, `county`, `city`,
`size`, `facility`, `services[]`, `frequency`, `message`, `consent`, `website` (honeypot).

## 3. CRM HomeSuite

- Routing de leads tras confirmar la integración, con origen/UTM.
- Auto-respuesta solo con texto aprobado; seguimiento humano.
- Consentimiento SMS/email: revisar texto del checkbox y la política de privacidad (TCPA/CCPA) antes de activar.
- Calendario de walkthroughs: solo si se confirma quién lo gestiona.

## 4. Analítica (GA4) y Search Console

- GA4 histórico: `G-H8QGENNQ38` (sin datos). **No insertado.** Lugar previsto: `src/layouts/BaseLayout.astro`,
  comentario `Analytics (GA4) intentionally not included yet`.
- Añadir banner de consentimiento si se usan cookies no esenciales.
- Eventos previstos (ya hay ganchos `data-track="click_to_call"` en todos los enlaces `tel:`):
  - `click_to_call` → clic en cualquier `[data-track="click_to_call"]`.
  - `generate_lead` → **solo** tras respuesta 2xx del servidor del formulario.
  - `schedule_walkthrough` → solo si existe agenda real y la reserva se confirma.
  - No contar cada clic de CTA como conversión.
- Search Console: verificar dominio (DNS) y enviar `https://<dominio>/sitemap-index.xml`.
- Google Business Profile: alinear NAP (nombre, dirección, teléfono) exactamente con `src/data/site.ts`.

## 5. Medición de rendimiento

- Lighthouse/PageSpeed sobre el deploy preview como diagnóstico de laboratorio.
- Core Web Vitals reales (CrUX / Search Console) cuando haya tráfico: objetivos LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1.

# PENDING_CLIENT_APPROVAL

Datos, fotos y afirmaciones que deben validarse con **Karla Carpio** antes de publicar.
Nada de esta lista aparece como "pendiente" en la web pública: se ha omitido, redactado de forma prudente
o se controla con un flag en `src/data/`.

Leyenda: 🔴 bloquea publicación · 🟠 importante · 🟢 mejora

## 1. Datos del negocio — `src/data/site.ts`

| # | Punto | Estado actual en la web | Acción |
|---|---|---|---|
| 1.1 🔴 | Dirección 4113 Beverly Blvd, Los Angeles, CA 90004: ¿se puede mostrar? ¿coincide con Google Business Profile? | Visible en footer, contacto, privacidad y schema (`showAddress: true`) | Confirmar o poner `showAddress: false` |
| 1.2 🔴 | Email `info@qp-homes.com`: dominio "homes" del negocio residencial antiguo | Visible | Confirmar email comercial definitivo |
| 1.3 🟠 | Teléfono (323) 660-0751 | Visible, click-to-call | Confirmar |
| 1.4 🟠 | Año de fundación 2006 y "20+ años" | **Omitido** (`foundedYear: null`) | Si se aprueba, poner `foundedYear: 2006` |
| 1.5 🟠 | Perfil de fundadora (nombre de Karla, "sigue involucrada en el día a día") | Visible en About y Home | Confirmar redacción |
| 1.6 🟢 | URLs de Instagram y Facebook | Ocultas (no se proporcionaron) | Facilitar URLs |
| 1.7 🟢 | Horario de atención | No se muestra | Facilitar si se desea mostrar/añadir al schema |
| 1.8 🔴 | **Dirección en Google Business Profile: "4113 Beverly Blvd A"**; la web dice "4113 Beverly Blvd". En la misma dirección figura **Purple Home Cleaning, LLC** (limpieza residencial, otro teléfono) | Web sin "A" | Confirmar la dirección exacta (con o sin "Suite A") e igualar web, schema y perfil. Aclarar la relación con Purple Home Cleaning |
| 1.9 🟠 | Perfiles para `sameAs`: Facebook, LinkedIn, Yelp y Chamber of Commerce aparecen en Bing | Solo está el perfil de Google (CID 8422972607425501852) | Confirmar las URLs oficiales para añadirlas |

## 2. Cobertura — `src/data/areas.ts`

| # | Punto | Estado | Acción |
|---|---|---|---|
| 2.1 🔴 | Orange County: ¿se presta servicio real? | Página existe con `noindex`, copy "reviewed by request" | Confirmar → `indexable: true` |
| 2.2 🔴 | San Bernardino County | Igual | Igual |
| 2.3 🔴 | **San Diego: ¿ciudad o condado?** | Página `/service-areas/san-diego/` noindex | Definir y ajustar slug/copy |
| 2.4 🟠 | Lista de 88 ciudades de LA County: ¿todas operativas? ¿Avalon (isla Catalina)? | Todas listadas en el buscador | Quitar las que no se atiendan |
| 2.5 🟠 | 3–5 ciudades prioritarias para futuras landings locales | No creadas (evitar doorway pages) | Elegir con datos reales de negocio |
| 2.6 🟢 | Frase de cobertura en Home: "from Downtown LA and the Westside to the San Gabriel Valley, the South Bay, and the Antelope Valley" | Visible | Confirmar que es real |

## 3. Servicios — `src/data/services.ts`

| # | Punto | Acción |
|---|---|---|
| 3.1 🔴 | Listas de "scope" de cada servicio (tareas incluidas) | Karla debe revisar las 6 listas |
| 3.2 🔴 | **Medical office**: la web dice que NO maneja residuos médicos, esterilización ni biohazard y que se enfoca en áreas no clínicas. No se promete HIPAA, OSHA, "medical-grade" ni certificaciones | Confirmar protocolos reales; si hay certificaciones, aportar documentación |
| 3.3 🟠 | Window cleaning: "storefronts, entrances, interior glass y ventanas alcanzables desde el suelo" (sin high-rise) | Confirmar alcance y equipo |
| 3.4 🟠 | Power washing: superficies y equipo | Confirmar |
| 3.5 🟠 | Carpet cleaning: método (extracción, etc.) — no se menciona técnica | Confirmar y, si procede, ampliar |
| 3.6 🟠 | "Post-construction cleaning", "day porters", "event cleaning" aparecían en la web antigua | No incluidos (fuera de los 6 servicios acordados) | Decidir si se añaden |
| 3.7 🟢 | Rangos de tamaño y frecuencias del formulario | Revisar |

## 4. Afirmaciones de confianza

| # | Punto | Estado |
|---|---|---|
| 4.1 🔴 | Licencias, seguros (insured/bonded), certificaciones | **No se menciona nada**. Aportar documentos para añadirlos |
| 4.2 🔴 | "Background-checked teams", "eco-friendly products", "woman-owned" (web antigua) | **Omitidos**. Confirmar para añadir |
| 4.3 🟠 | "Our team works in Quality Plus uniforms" | Visible (respaldado por las fotos) — confirmar que es política |
| 4.4 🟠 | "We aim to keep the same team on your office", "supervisor checks the work" | Visible — confirmar que es práctica real |

**Prototipo `/home-v2/` (noindex):** el concepto "After Hours" presenta la limpieza fuera de horario como eje de la marca. La web ya la menciona en servicios concretos, pero Karla debe confirmar que representa la operación habitual antes de reemplazar la Home.

## 5. Testimonios y reseñas

- 🟠 La web antigua mostraba reseñas de Google (Miriam Bustamante, Rebecca Betancourt…) y un widget de estrellas.
  **No se han republicado**: requieren fuente verificable actual y permiso. No hay schema de reviews/ratings.
- Para añadirlos: confirmar origen, permiso de cada persona y que sean de clientes **comerciales**.

## 6. Fotografías — `src/data/photos.ts`

- 🔴 Permiso por escrito de cada miembro del equipo que aparece.
- 🔴 Permiso de clientes cuyos locales son reconocibles. En particular la foto del escaparate con el rótulo
  **"122 East 7th Street"** (usada en Home hero y Window Cleaning).
- 🟠 Confirmar que la persona sentada en `office-team-with-karla-carpio` es Karla (ALT actual lo afirma).
- 🟠 **Faltan fotos de**: limpieza de alfombras (la página usa una foto de limpieza de suelo a mano),
  consultorio médico real, ventanas en altura, antes/después.
- 🟢 Retrato profesional de Karla para About.
- Se eliminaron metadatos EXIF/GPS de todas las fotos.

## 7. Legal

- 🔴 `privacy-policy` es un **borrador** razonable (incluye sección CCPA básica). Debe revisarlo un profesional
  legal antes de publicar, sobre todo cuando se conecte CRM, SMS/email automáticos o analítica.
- 🔴 Texto del checkbox de consentimiento del formulario — revisar con lo anterior, especialmente si habrá SMS (TCPA).

## 8. Marca

- 🟢 Logo para fondo claro generado recoloreando el "Plus" y "BUILDING SERVICES" (gris claro → azul marino)
  porque el original no tenía contraste en blanco. Validar o pedir versión oficial al diseñador.
- 🟢 Favicon generado a partir de la "Q". Validar.

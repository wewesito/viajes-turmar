# Viajes Turmar - Plan de Produccion Profesional

Esta web queda preparada como base profesional. Para convertirla en una operativa real tipo Booking/Kayak, hay que conectar servicios reales en backend, no dentro del navegador.

## 1. Dominio y hosting

- Comprar dominio propio, por ejemplo `viajesturmar.com`.
- Publicar en Netlify, Vercel o Cloudflare Pages con HTTPS automatico.
- Configurar `netlify.toml` para funciones serverless, redirecciones `/api/*` y cabeceras de seguridad.
- Cambiar la URL canonical, sitemap y Open Graph cuando el dominio definitivo este activo.

## 2. Base de datos y CRM

- Crear un proyecto Supabase.
- Ejecutar `supabase/schema.sql` en el SQL editor.
- Anadir estas variables en el hosting:
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `ALLOWED_ORIGIN`
  - `LEAD_WEBHOOK_URL` si se conecta Make, Zapier, Slack o email.
- Usar `admin.html` solo como panel privado temporal. Para produccion conviene protegerlo con login real.

## 3. Motor de busqueda privado

- Nunca poner credenciales de mayoristas en `script.js`.
- Conectar cada mayorista desde `netlify/functions/search.js` o desde un backend propio.
- Exponer solo resultados normalizados: precio, disponibilidad, condiciones, proveedor, fecha de caducidad y margen.
- Mantener modo demo hasta tener acuerdos, API keys y permisos.

## 4. Pagos y reservas

- No aceptar pagos hasta confirmar disponibilidad y condiciones.
- Para pagos reales, conectar Stripe, Redsys o enlace bancario desde backend.
- Guardar estado de propuesta: borrador, enviada, aceptada, pagada, documentacion enviada, cerrada.

## 5. Area cliente

- En demo puede ser informativa.
- En produccion debe tener autenticacion, documentos, propuestas, pagos y mensajes.
- Los documentos nunca deben estar en URLs publicas sin control de acceso.

## 6. Legal y confianza

- Completar razon social, NIF/CIF, domicilio, email legal y telefono.
- Revisar aviso legal, privacidad, cookies y condiciones de reserva con asesoria.
- Anadir licencia, registro o datos profesionales si aplican.
- Activar consentimiento antes de usar herramientas de analitica no esenciales.

## 7. Analitica ejecutiva

- Medir conversiones: visita, menu, busqueda, propuesta solicitada, WhatsApp, email, copia de solicitud y reserva.
- Revisar semanalmente destinos mas solicitados, presupuesto medio, origen de leads y tasa de cierre.
- Activar alertas internas cuando entre un lead de alto valor.

## 8. Siguiente salto

Prioridad recomendada:

1. Pasar de GitHub Pages a Netlify para activar `/api/search`, `/api/lead` y `/api/analytics`.
2. Crear Supabase y cargar `supabase/schema.sql`.
3. Proteger el panel gestor con login.
4. Conectar un webhook de avisos para cada solicitud.
5. Sustituir datos demo por acuerdos y feeds reales de mayoristas.

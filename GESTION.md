# Gestion profesional de registros

La web ya incluye una estructura profesional para medir actividad y gestionar solicitudes.

## Que hay incluido

- Registro local de eventos en `localStorage`.
- Registro local de solicitudes en `localStorage`.
- Panel gestor en `admin.html`.
- Exportacion CSV desde el panel gestor.
- Endpoints serverless preparados:
  - `netlify/functions/lead.js`
  - `netlify/functions/analytics.js`
  - `netlify/functions/search.js`

## Importante

En GitHub Pages la web es estatica. Eso significa:

- El panel gestor funciona como demo/local.
- Los datos locales solo se ven en el navegador donde se generaron.
- Para ver todas las solicitudes de todos los clientes necesitas conectar un endpoint externo.

## Recomendacion profesional

1. Analitica:
   - Google Analytics 4 o Microsoft Clarity para visitas.
   - Supabase/Airtable para eventos propios.

2. Solicitudes:
   - Formspree si quieres algo rapido.
   - Airtable si quieres tabla gestionable.
   - Supabase si quieres base de datos profesional.
   - HubSpot/Zoho/Pipedrive si quieres CRM.

3. Motor privado:
   - Conectar mayoristas desde backend/serverless.
   - Nunca poner credenciales en `script.js`.

## Activacion rapida

En `index.html`, cambia:

```js
window.TURMAR_CONFIG = {
  analyticsId: "",
  analyticsEndpoint: "",
  leadEndpoint: "",
};
```

por los endpoints reales. Por ejemplo, en Netlify:

```js
window.TURMAR_CONFIG = {
  analyticsId: "",
  analyticsEndpoint: "/.netlify/functions/analytics",
  leadEndpoint: "/.netlify/functions/lead",
};
```

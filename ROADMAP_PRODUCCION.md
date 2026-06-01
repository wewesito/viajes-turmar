# Viajes Turmar - paso de demo a produccion

Esta web ya incluye una maqueta profesional con datos simulados. Para operar con clientes reales faltan estas conexiones:

## 1. Base de datos / CRM

Opciones recomendadas:
- Supabase: base de datos, login, panel y API.
- Airtable: CRM sencillo y rapido.
- HubSpot o Zoho: CRM comercial completo.

Datos a guardar:
- Cliente: nombre, email, telefono.
- Solicitud: destino, fechas, viajeros, presupuesto, preferencias.
- Pipeline: estado, agente, proxima accion, valor estimado.
- Historial: eventos, mensajes, cambios y notas internas.

## 2. Motor de mayoristas

No poner credenciales en `script.js` ni en HTML.

Estructura recomendada:
- Frontend: formulario y comparador.
- Backend: endpoint seguro que consulta mayoristas.
- Base de datos: cache de resultados, logs y auditoria.
- Panel: revision por agente antes de confirmar.

## 3. Analitica

Conectar:
- Google Analytics 4 para eventos.
- Google Search Console para SEO.
- Microsoft Clarity para mapas de calor y grabaciones anonimas.

Eventos importantes:
- `page_view`
- `search_started`
- `result_selected`
- `proposal_requested`
- `whatsapp_click`
- `payment_link_requested`

## 4. Pagos

Opciones:
- Stripe para tarjeta y enlaces de pago.
- Redsys para TPV bancario en Espana.
- Transferencia manual como plan inicial.

Flujo:
1. Agente confirma disponibilidad.
2. Se genera enlace de pago.
3. Cliente paga señal.
4. Se actualiza el estado del CRM.
5. Se envia confirmacion.

## 5. Legal

Completar antes de publicar en serio:
- Aviso legal.
- Politica de privacidad.
- Politica de cookies.
- Condiciones de contratacion.
- Condiciones de cancelacion.
- Datos fiscales y registro de agencia.

## 6. Dominio y correo

Recomendado:
- Dominio: `viajesturmar.com` o `viajesturmar.es`.
- Correos: `info@viajesturmar.com`, `reservas@viajesturmar.com`.
- DNS con GitHub Pages o Netlify.

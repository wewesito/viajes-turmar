export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return json({ error: "Metodo no permitido" }, 405);
  }

  const analyticsEvent = JSON.parse(event.body || "{}");

  /*
    Punto de entrada para eventos de analitica propia.

    Eventos previstos:
    - page_view
    - proposal_requested
    - lead_submitted
    - leads_cleared

    Aqui se puede guardar en Supabase, BigQuery, Airtable, Google Sheets o CRM.
  */

  return json({
    ok: true,
    event: analyticsEvent.name || "unknown",
  });
}

function json(body, statusCode = 200) {
  return {
    statusCode,
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(body),
  };
}

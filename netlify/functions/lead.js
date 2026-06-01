export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return json({ error: "Metodo no permitido" }, 405);
  }

  const lead = JSON.parse(event.body || "{}");

  /*
    Punto de entrada profesional para solicitudes.

    Aqui se puede conectar:
    - Airtable
    - Supabase
    - HubSpot / Zoho / Pipedrive
    - Email transaccional
    - Google Sheets via Apps Script
    - CRM propio de Viajes Turmar

    Configura las claves como variables de entorno del hosting.
  */

  return json({
    ok: true,
    received: {
      name: lead.name,
      email: lead.email,
      destination: lead.destination,
      score: lead.score,
    },
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

import {
  cleanEmail,
  cleanText,
  clientIp,
  handleOptions,
  isEmail,
  json,
  parseJson,
  requirePost,
  supabaseInsert,
} from "./_shared.js";

export async function handler(event) {
  const options = handleOptions(event);
  if (options) return options;

  const methodError = requirePost(event);
  if (methodError) return methodError;

  const body = parseJson(event);
  if (!body) return json({ error: "JSON invalido" }, 400);

  const lead = {
    name: cleanText(body.name || body.travelerName, 120),
    email: cleanEmail(body.email),
    destination: cleanText(body.destination || body.destinationName || body.destinationKey, 120),
    departure: cleanText(body.departure, 120),
    style: cleanText(body.style || body.styleKey, 80),
    travel_month: cleanText(body.travelMonth, 20),
    travelers: Number(body.travelers || 1),
    nights: Number(body.nights || 0),
    budget_max: Number(body.budgetMax || body.budget_max || 0),
    estimated_total: Number(body.total || body.estimatedTotal || 0),
    score: Number(body.score || 0),
    preferences: Array.isArray(body.preferences) ? body.preferences.map((item) => cleanText(item, 80)) : [],
    source: cleanText(body.source || "web", 60),
    status: "new",
    ip: clientIp(event),
    user_agent: cleanText(event.headers["user-agent"], 300),
    created_at: new Date().toISOString(),
  };

  if (!lead.name || !isEmail(lead.email)) {
    return json({ error: "Nombre y email valido son obligatorios" }, 422);
  }

  if (!lead.destination) {
    return json({ error: "Destino obligatorio" }, 422);
  }

  try {
    const database = await supabaseInsert("leads", lead);
    await notifyWebhook(lead);

    return json({
      ok: true,
      lead: {
        name: lead.name,
        email: lead.email,
        destination: lead.destination,
        score: lead.score,
        status: lead.status,
      },
      database,
    });
  } catch (error) {
    return json({ error: "No se pudo guardar la solicitud", detail: error.message }, 500);
  }
}

async function notifyWebhook(lead) {
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) return;

  await fetch(webhook, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      text: `Nuevo lead Viajes Turmar: ${lead.name} - ${lead.destination} - ${lead.email}`,
      lead,
    }),
  });
}

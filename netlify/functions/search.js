import { cleanText, handleOptions, json, parseJson, requirePost } from "./_shared.js";

export async function handler(event) {
  const options = handleOptions(event);
  if (options) return options;

  const methodError = requirePost(event);
  if (methodError) return methodError;

  const request = parseJson(event);
  if (!request) return json({ error: "JSON invalido" }, 400);

  const normalizedRequest = {
    destinationKey: cleanText(request.destinationKey, 80),
    departure: cleanText(request.departure || "Madrid", 80),
    travelMonth: cleanText(request.travelMonth, 20),
    styleKey: cleanText(request.styleKey, 80),
    travelers: Number(request.travelers || 1),
    nights: Number(request.nights || 7),
    budgetMax: Number(request.budgetMax || 0),
    preferences: Array.isArray(request.preferences) ? request.preferences.map((item) => cleanText(item, 80)) : [],
  };

  if (process.env.TURMAR_ENGINE_URL) {
    return proxyPrivateEngine(normalizedRequest);
  }

  return json(buildDemoResponse(normalizedRequest));
}

async function proxyPrivateEngine(request) {
  const response = await fetch(process.env.TURMAR_ENGINE_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: process.env.TURMAR_ENGINE_TOKEN ? `Bearer ${process.env.TURMAR_ENGINE_TOKEN}` : "",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    return json({ error: "Motor privado no disponible", status: response.status }, 502);
  }

  const payload = await response.json();
  return json({
    source: "Motor privado Viajes Turmar",
    availability: "agent-review-required",
    results: payload.results || [],
    raw: payload,
  });
}

function buildDemoResponse(request) {
  const demoPrice = 980 + request.nights * 190 + request.travelers * 420;
  return {
    source: "Demo Viajes Turmar",
    destination: request.destinationKey,
    availability: "pending-agent-review",
    message: "Resultado orientativo preparado para revision de agente.",
    results: [
      {
        id: "demo-flex",
        title: "Opcion flexible con seguimiento de agencia",
        category: "boutique",
        total: demoPrice,
        currency: "EUR",
        board: "Hoteles seleccionados",
        rating: 4.6,
        conditions: "Precio orientativo. Disponibilidad pendiente de confirmar.",
      },
      {
        id: "demo-premium",
        title: "Opcion premium con servicios privados",
        category: "premium",
        total: Math.round(demoPrice * 1.28),
        currency: "EUR",
        board: "Servicios superiores",
        rating: 4.8,
        conditions: "Requiere validacion de mayorista y agente.",
      },
    ],
  };
}

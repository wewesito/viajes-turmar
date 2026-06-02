import { handleOptions, json } from "./_shared.js";

const demoDatabase = {
  generatedAt: "2026-06-02T09:30:00.000Z",
  business: {
    brand: "Viajes Turmar",
    plannedDomain: "viajesturmar.com",
    publicEmail: "info@viajesturmar.com",
    salesEmail: "reservas@viajesturmar.com",
    phone: "+34 900 000 000",
  },
  summary: {
    leads: 12,
    pipeline: 58850,
    conversion: "4%",
    averageScore: 88,
  },
  destinations: [
    "Japon esencial",
    "Grecia boutique",
    "Costa Rica aventura",
    "Egipto cultural",
    "Maldivas luna de miel",
    "Riviera Maya familiar",
    "Sri Lanka y Maldivas",
  ],
  status: "Demo preparada. Conecta Supabase para datos reales.",
};

export async function handler(event) {
  const options = handleOptions(event);
  if (options) return options;

  if (event.httpMethod !== "GET") {
    return json({ error: "Metodo no permitido" }, 405);
  }

  return json(demoDatabase);
}

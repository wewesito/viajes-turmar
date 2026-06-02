import { cleanText, clientIp, handleOptions, json, parseJson, requirePost, supabaseInsert } from "./_shared.js";

const ALLOWED_EVENTS = new Set([
  "page_view",
  "proposal_requested",
  "lead_submitted",
  "result_selected",
  "copy_proposal",
  "whatsapp_click",
  "email_click",
  "menu_open",
  "quick_tab_selected",
  "analytics_accepted",
  "leads_cleared",
]);

export async function handler(event) {
  const options = handleOptions(event);
  if (options) return options;

  const methodError = requirePost(event);
  if (methodError) return methodError;

  const body = parseJson(event);
  if (!body) return json({ error: "JSON invalido" }, 400);

  const name = cleanText(body.name, 80);
  if (!ALLOWED_EVENTS.has(name)) {
    return json({ error: "Evento no permitido" }, 422);
  }

  const analyticsEvent = {
    name,
    path: cleanText(body.path || "/", 240),
    payload: typeof body.payload === "object" && body.payload ? body.payload : {},
    ip: clientIp(event),
    user_agent: cleanText(event.headers["user-agent"], 300),
    created_at: new Date().toISOString(),
  };

  try {
    const database = await supabaseInsert("analytics_events", analyticsEvent);
    return json({ ok: true, event: name, database });
  } catch (error) {
    return json({ error: "No se pudo guardar analitica", detail: error.message }, 500);
  }
}

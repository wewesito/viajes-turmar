const JSON_HEADERS = {
  "content-type": "application/json; charset=utf-8",
  "access-control-allow-origin": process.env.ALLOWED_ORIGIN || "*",
  "access-control-allow-methods": "POST, OPTIONS",
  "access-control-allow-headers": "content-type, authorization",
};

export function handleOptions(event) {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: JSON_HEADERS,
      body: "",
    };
  }
  return null;
}

export function json(body, statusCode = 200) {
  return {
    statusCode,
    headers: JSON_HEADERS,
    body: JSON.stringify(body),
  };
}

export function parseJson(event) {
  try {
    return JSON.parse(event.body || "{}");
  } catch {
    return null;
  }
}

export function requirePost(event) {
  if (event.httpMethod !== "POST") {
    return json({ error: "Metodo no permitido" }, 405);
  }
  return null;
}

export function cleanText(value, maxLength = 500) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

export function cleanEmail(value) {
  return cleanText(value, 180).toLowerCase();
}

export function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return { url: url.replace(/\/$/, ""), key };
}

export async function supabaseInsert(table, payload) {
  const config = getSupabaseConfig();
  if (!config) {
    return { skipped: true, reason: "Supabase no configurado" };
  }

  const response = await fetch(`${config.url}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      apikey: config.key,
      authorization: `Bearer ${config.key}`,
      "content-type": "application/json",
      prefer: "return=representation",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Supabase ${table}: ${response.status} ${message}`);
  }

  return { inserted: true, rows: await response.json() };
}

export function clientIp(event) {
  return (
    event.headers["x-forwarded-for"] ||
    event.headers["client-ip"] ||
    event.headers["x-real-ip"] ||
    "unknown"
  )
    .split(",")[0]
    .trim();
}

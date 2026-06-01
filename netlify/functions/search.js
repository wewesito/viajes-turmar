export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return json({ error: "Metodo no permitido" }, 405);
  }

  const request = JSON.parse(event.body || "{}");

  /*
    Aqui se conecta el motor privado de Viajes Turmar:

    - Credenciales de mayoristas en variables de entorno de Netlify.
    - Peticiones a APIs privadas, XML, SOAP, JSON o integraciones propias.
    - Normalizacion de resultados antes de devolverlos al navegador.

    Ejemplo de variables:
    TURMAR_ENGINE_URL
    TURMAR_ENGINE_TOKEN
    MAYORISTA_1_USER
    MAYORISTA_1_PASSWORD

    No se deben poner claves reales en index.html, script.js ni ningun archivo publico.
  */

  const demoPrice = 980 + Number(request.nights || 7) * 190 + Number(request.travelers || 2) * 420;

  return json({
    source: "Motor privado Viajes Turmar",
    destination: request.destinationKey,
    total: demoPrice,
    availability: "pending-agent-review",
    message: "Resultado preparado para revision de agente.",
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

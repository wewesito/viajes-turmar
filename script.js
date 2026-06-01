const destinations = {
  grecia: {
    name: "Grecia boutique",
    basePerNight: 185,
    flight: 360,
    experiences: ["Catamaran privado en Santorini", "Ruta gastronómica por Atenas", "Hotel boutique junto al mar"],
    days: ["Atenas con guía local", "Mykonos y playas tranquilas", "Santorini al atardecer"],
  },
  japon: {
    name: "Japón esencial",
    basePerNight: 210,
    flight: 780,
    experiences: ["Pase JR optimizado", "Ceremonia del té en Kioto", "Ryokan con onsen"],
    days: ["Tokio contemporáneo", "Kioto cultural", "Alpes japoneses"],
  },
  "costa-rica": {
    name: "Costa Rica aventura",
    basePerNight: 165,
    flight: 690,
    experiences: ["Volcán Arenal", "Bosque nuboso", "Playas de Manuel Antonio"],
    days: ["Selva y termas", "Puentes colgantes", "Costa del Pacífico"],
  },
  egipto: {
    name: "Egipto cultural",
    basePerNight: 150,
    flight: 430,
    experiences: ["Crucero por el Nilo", "Guía egiptólogo privado", "Cena frente a las pirámides"],
    days: ["El Cairo histórico", "Luxor y Karnak", "Nilo en crucero"],
  },
};

// Cambia este endpoint cuando tengais el motor privado publicado en backend.
// Nunca pongas credenciales de mayoristas directamente en este archivo publico.
const PRIVATE_SEARCH_API_URL = "";

const styleMultipliers = {
  romantico: { label: "romántico", multiplier: 1.14, score: 9 },
  familia: { label: "familiar", multiplier: 1.04, score: 6 },
  aventura: { label: "de aventura suave", multiplier: 1.08, score: 7 },
  premium: { label: "premium", multiplier: 1.32, score: 13 },
};

const form = document.querySelector("#tripForm");
const proposalTitle = document.querySelector("#proposalTitle");
const budget = document.querySelector("#budget");
const leadScore = document.querySelector("#leadScore");
const itinerary = document.querySelector("#itinerary");
const whatsappLink = document.querySelector("#whatsappLink");
const emailLink = document.querySelector("#emailLink");
const copyProposal = document.querySelector("#copyProposal");
const leadList = document.querySelector("#leadList");
const clearLeads = document.querySelector("#clearLeads");
const engineSource = document.querySelector("#engineSource");

let currentProposal = "";

const currency = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

function getFormData() {
  const data = new FormData(form);
  return {
    name: data.get("travelerName")?.trim() || "Viajero",
    email: data.get("email")?.trim() || "",
    destinationKey: data.get("destination"),
    styleKey: data.get("style"),
    travelers: Number(data.get("travelers")) || 1,
    nights: Number(data.get("nights")) || 7,
    preferences: data.getAll("preferences"),
  };
}

function calculateProposal(data, privateResult = null) {
  const destination = destinations[data.destinationKey];
  const style = styleMultipliers[data.styleKey];
  const hasTransfers = data.preferences.includes("traslados");
  const hasExperiences = data.preferences.includes("experiencias");
  const hasFlights = data.preferences.includes("vuelos");
  const hotelCost = destination.basePerNight * data.nights * data.travelers;
  const flightCost = hasFlights ? destination.flight * data.travelers : 0;
  const transferCost = hasTransfers ? 95 * data.travelers : 0;
  const experienceCost = hasExperiences ? 140 * data.travelers : 0;
  const localTotal = Math.round((hotelCost + flightCost + transferCost + experienceCost) * style.multiplier);
  const total = privateResult?.total ? Number(privateResult.total) : localTotal;
  const score = Math.min(99, 48 + data.nights * 2 + data.travelers * 3 + style.score + data.preferences.length * 4);

  return {
    destination,
    style,
    total,
    score,
    source: privateResult?.source || (PRIVATE_SEARCH_API_URL ? "Motor privado de mayoristas" : "Demo local hasta conectar mayoristas"),
  };
}

async function searchPrivateEngine(data) {
  if (!PRIVATE_SEARCH_API_URL) {
    return null;
  }

  try {
    engineSource.textContent = "Consultando motor privado de mayoristas...";
    const response = await fetch(PRIVATE_SEARCH_API_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Private engine failed");
    }

    return response.json();
  } catch {
    engineSource.textContent = "Motor privado no disponible, usando propuesta local";
    return null;
  }
}

function buildProposal(data, result) {
  const preferenceText = data.preferences.length ? data.preferences.join(", ") : "servicios a medida";
  return [
    `Hola ${data.name}, hemos preparado una solicitud ${result.style.label} para ${result.destination.name}.`,
    `${data.nights} noches para ${data.travelers} viajero(s), incluyendo ${preferenceText}.`,
    `Estimación orientativa pendiente de revisión por un agente: ${currency.format(result.total)}.`,
    `Ruta sugerida: ${result.destination.days.join(" | ")}.`,
    `Experiencias destacadas: ${result.destination.experiences.join(", ")}.`,
    `Un agente de Viajes Turmar revisará disponibilidad y condiciones antes de confirmar la propuesta.`,
  ].join("\n");
}

async function renderProposal(saveLead = false, usePrivateEngine = false) {
  const data = getFormData();
  const privateResult = usePrivateEngine ? await searchPrivateEngine(data) : null;
  const result = calculateProposal(data, privateResult);
  currentProposal = buildProposal(data, result);

  proposalTitle.textContent = `${result.destination.name} ${result.style.label}`;
  budget.textContent = currency.format(result.total);
  leadScore.textContent = `Lead ${result.score}`;
  engineSource.textContent = result.source;
  itinerary.innerHTML = result.destination.days
    .map((day, index) => {
      const experience = result.destination.experiences[index] || result.destination.experiences[0];
      return `
        <div class="day">
          <strong>D${index + 1}</strong>
          <p><b>${day}</b><br>${experience}</p>
        </div>
      `;
    })
    .join("");

  const encoded = encodeURIComponent(currentProposal);
  whatsappLink.href = `https://wa.me/?text=${encoded}`;
  emailLink.href = `mailto:${data.email}?subject=${encodeURIComponent("Tu propuesta de viaje con Viajes Turmar")}&body=${encoded}`;

  if (saveLead) {
    saveLeadToStorage({
      id: globalThis.crypto?.randomUUID ? crypto.randomUUID() : String(Date.now()),
      name: data.name,
      email: data.email,
      destination: result.destination.name,
      total: result.total,
      score: result.score,
      createdAt: new Date().toLocaleString("es-ES", { dateStyle: "short", timeStyle: "short" }),
    });
  }
}

function getLeads() {
  try {
    return JSON.parse(localStorage.getItem("viajes-turmar-leads")) || [];
  } catch {
    return [];
  }
}

function saveLeadToStorage(lead) {
  const leads = [lead, ...getLeads()].slice(0, 8);
  localStorage.setItem("viajes-turmar-leads", JSON.stringify(leads));
  renderLeads();
}

function renderLeads() {
  const leads = getLeads();
  if (!leads.length) {
    leadList.innerHTML = `<div class="empty-state">Aún no hay leads guardados. Genera una propuesta para ver el panel en acción.</div>`;
    return;
  }

  leadList.innerHTML = leads
    .map(
      (lead) => `
        <article class="lead-card">
          <div>
            <h4>${lead.name}</h4>
            <p>${lead.destination} · ${currency.format(lead.total)} · ${lead.createdAt}</p>
            <p>${lead.email}</p>
          </div>
          <strong>${lead.score}</strong>
        </article>
      `,
    )
    .join("");
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  await renderProposal(true, true);
});

form.addEventListener("input", () => {
  renderProposal(false, false);
});

copyProposal.addEventListener("click", async () => {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(currentProposal);
      copyProposal.textContent = "Copiado";
    } else {
      copyProposal.textContent = "Selecciona el texto";
    }
  } catch {
    copyProposal.textContent = "Copia no permitida";
  }
  window.setTimeout(() => {
    copyProposal.textContent = "Copiar solicitud";
  }, 1500);
});

clearLeads.addEventListener("click", () => {
  localStorage.removeItem("viajes-turmar-leads");
  renderLeads();
});

renderProposal(false);
renderLeads();

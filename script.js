const destinations = {
  grecia: {
    name: "Grecia boutique",
    country: "Grecia",
    basePerNight: 185,
    flight: 360,
    experiences: ["Catamaran privado en Santorini", "Ruta gastronómica por Atenas", "Hotel boutique junto al mar"],
    days: ["Atenas con guía local", "Mykonos y playas tranquilas", "Santorini al atardecer"],
    packages: [
      { title: "Cycladas boutique", category: "boutique", board: "Desayuno", rating: 4.7, margin: 1, tag: "Mas vendido" },
      { title: "Santorini premium", category: "premium", board: "Media pension", rating: 4.9, margin: 1.28, tag: "Top calidad" },
      { title: "Grecia en familia", category: "familia", board: "Alojamiento flexible", rating: 4.5, margin: 0.92, tag: "Flexible" },
    ],
  },
  japon: {
    name: "Japón esencial",
    country: "Japon",
    basePerNight: 210,
    flight: 780,
    experiences: ["Pase JR optimizado", "Ceremonia del té en Kioto", "Ryokan con onsen"],
    days: ["Tokio contemporáneo", "Kioto cultural", "Alpes japoneses"],
    packages: [
      { title: "Japon esencial rail", category: "boutique", board: "Ruta con trenes", rating: 4.8, margin: 1.08, tag: "Ruta optimizada" },
      { title: "Ryokan premium", category: "premium", board: "Experiencia onsen", rating: 4.9, margin: 1.34, tag: "Premium" },
      { title: "Japon familiar", category: "familia", board: "Hoteles conectados", rating: 4.6, margin: 0.98, tag: "Comodo" },
    ],
  },
  "costa-rica": {
    name: "Costa Rica aventura",
    country: "Costa Rica",
    basePerNight: 165,
    flight: 690,
    experiences: ["Volcán Arenal", "Bosque nuboso", "Playas de Manuel Antonio"],
    days: ["Selva y termas", "Puentes colgantes", "Costa del Pacífico"],
    packages: [
      { title: "Pura vida activo", category: "boutique", board: "Eco lodges", rating: 4.6, margin: 1, tag: "Naturaleza" },
      { title: "Costa Rica premium", category: "premium", board: "Lodges superiores", rating: 4.8, margin: 1.25, tag: "Seleccionado" },
      { title: "Aventura familiar", category: "familia", board: "Ritmo suave", rating: 4.5, margin: 0.94, tag: "Familias" },
    ],
  },
  egipto: {
    name: "Egipto cultural",
    country: "Egipto",
    basePerNight: 150,
    flight: 430,
    experiences: ["Crucero por el Nilo", "Guía egiptólogo privado", "Cena frente a las pirámides"],
    days: ["El Cairo histórico", "Luxor y Karnak", "Nilo en crucero"],
    packages: [
      { title: "Egipto clasico", category: "boutique", board: "Circuito guiado", rating: 4.6, margin: 1, tag: "Cultural" },
      { title: "Nilo premium", category: "premium", board: "Crucero superior", rating: 4.8, margin: 1.22, tag: "Crucero" },
      { title: "Egipto en familia", category: "familia", board: "Ritmo adaptado", rating: 4.4, margin: 0.9, tag: "Familiar" },
    ],
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
const formStatus = document.querySelector("#formStatus");
const resultList = document.querySelector("#resultList");
const resultCount = document.querySelector("#resultCount");
const sortResults = document.querySelector("#sortResults");
const filterCategory = document.querySelector("#filterCategory");
const menuToggle = document.querySelector("#menuToggle");
const siteMenu = document.querySelector("#siteMenu");
const quickTabs = [...document.querySelectorAll(".trip-tab")];
const quickGrid = document.querySelector(".quick-grid");
const cookieBanner = document.querySelector("#cookieBanner");
const acceptAnalytics = document.querySelector("#acceptAnalytics");
const rejectAnalytics = document.querySelector("#rejectAnalytics");
const appConfig = window.TURMAR_CONFIG || {};
const privateSearchUrl = appConfig.searchEndpoint || PRIVATE_SEARCH_API_URL;

let currentProposal = "";

const currency = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const quickTabContent = {
  paquetes: [
    {
      tag: "Top venta",
      title: "Islas griegas con Atenas",
      detail: "8 noches · vuelos, hoteles boutique, ferry interno y revision de agente.",
      price: "desde 1.480 EUR",
    },
    {
      tag: "Premium",
      title: "Japon esencial",
      detail: "12 noches · Tokio, Kioto, ryokan, trenes y propuesta cultural organizada.",
      price: "desde 3.420 EUR",
    },
    {
      tag: "Naturaleza",
      title: "Costa Rica aventura",
      detail: "10 noches · volcan, selva, playa, traslados privados y eco lodges.",
      price: "desde 2.260 EUR",
    },
  ],
  "lunas-de-miel": [
    {
      tag: "Romantico",
      title: "Maldivas con villa sobre el agua",
      detail: "7 noches · resort 5 estrellas, traslados en hidroavion y detalles especiales.",
      price: "desde 3.980 EUR",
    },
    {
      tag: "Combinado",
      title: "Sri Lanka y Maldivas",
      detail: "12 noches · cultura, safari suave, playa final y hoteles boutique.",
      price: "desde 4.450 EUR",
    },
    {
      tag: "Mediterraneo",
      title: "Santorini y Mykonos deluxe",
      detail: "9 noches · suites con vistas, ferry, cenas seleccionadas y asistencia.",
      price: "desde 2.950 EUR",
    },
  ],
  familias: [
    {
      tag: "Familias",
      title: "Disneyland Paris completo",
      detail: "4 noches · hotel cercano, entradas, traslados y seguro recomendado.",
      price: "desde 1.320 EUR",
    },
    {
      tag: "Playa",
      title: "Riviera Maya familiar",
      detail: "9 noches · todo incluido, club infantil, excursiones suaves y vuelos.",
      price: "desde 2.180 EUR",
    },
    {
      tag: "Aventura suave",
      title: "Costa Rica en familia",
      detail: "10 noches · Arenal, Monteverde, playa y alojamientos preparados para ninos.",
      price: "desde 2.640 EUR",
    },
  ],
  circuitos: [
    {
      tag: "Cultural",
      title: "Egipto con crucero por el Nilo",
      detail: "8 noches · guia egiptologo, crucero superior, vuelos y visitas clave.",
      price: "desde 1.690 EUR",
    },
    {
      tag: "Europa",
      title: "Italia clasica",
      detail: "7 noches · Roma, Florencia, Venecia, trenes internos y hoteles centrados.",
      price: "desde 1.540 EUR",
    },
    {
      tag: "Larga distancia",
      title: "Tailandia norte y playa",
      detail: "11 noches · Bangkok, Chiang Mai, Phuket, traslados y experiencias locales.",
      price: "desde 2.210 EUR",
    },
  ],
};

function getFormData() {
  const data = new FormData(form);
  return {
    name: data.get("travelerName")?.trim() || "Viajero",
    email: data.get("email")?.trim() || "",
    destinationKey: data.get("destination"),
    departure: data.get("departure") || "Madrid",
    travelMonth: data.get("travelMonth") || "",
    styleKey: data.get("style"),
    travelers: Number(data.get("travelers")) || 1,
    nights: Number(data.get("nights")) || 7,
    budgetMax: Number(data.get("budgetMax")) || 0,
    preferences: data.getAll("preferences"),
  };
}

function normalizeTabKey(label) {
  return label
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
}

function renderQuickTab(key) {
  if (!quickGrid) return;
  const items = quickTabContent[key] || quickTabContent.paquetes;
  quickGrid.innerHTML = items
    .map(
      (item) => `
        <article class="quick-card">
          <span>${item.tag}</span>
          <h3>${item.title}</h3>
          <p>${item.detail}</p>
          <strong>${item.price}</strong>
        </article>
      `,
    )
    .join("");
}

function setupQuickTabs() {
  if (!quickTabs.length || !quickGrid) return;

  quickTabs.forEach((tab) => {
    const key = normalizeTabKey(tab.textContent || "");
    tab.dataset.tab = key;
    tab.setAttribute("aria-pressed", tab.classList.contains("active") ? "true" : "false");
    tab.addEventListener("click", () => {
      quickTabs.forEach((item) => {
        const isActive = item === tab;
        item.classList.toggle("active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });
      renderQuickTab(key);
      trackEvent("quick_tab_selected", { tab: key });
    });
  });

  const activeTab = quickTabs.find((tab) => tab.classList.contains("active")) || quickTabs[0];
  renderQuickTab(activeTab.dataset.tab || normalizeTabKey(activeTab.textContent || ""));
}

function trackEvent(name, payload = {}) {
  const analyticsConsent = localStorage.getItem("turmar-analytics-consent");
  const essentialEvents = ["proposal_requested", "lead_submitted", "copy_proposal", "whatsapp_click", "email_click"];
  if (analyticsConsent === "rejected" && !essentialEvents.includes(name)) {
    return;
  }

  const event = {
    id: globalThis.crypto?.randomUUID ? crypto.randomUUID() : String(Date.now()),
    name,
    payload,
    path: window.location.pathname,
    createdAt: new Date().toISOString(),
  };
  const events = getStoredItems("viajes-turmar-events").slice(0, 99);
  localStorage.setItem("viajes-turmar-events", JSON.stringify([event, ...events]));

  if (appConfig.analyticsEndpoint) {
    const body = JSON.stringify(event);
    if (navigator.sendBeacon) {
      navigator.sendBeacon(appConfig.analyticsEndpoint, new Blob([body], { type: "application/json" }));
    } else {
      fetch(appConfig.analyticsEndpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => {});
    }
  }
}

function getStoredItems(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
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
    source: privateResult?.source || (privateSearchUrl ? "Motor privado de mayoristas" : "Demo local hasta conectar mayoristas"),
  };
}

async function searchPrivateEngine(data) {
  if (!privateSearchUrl) {
    return null;
  }

  try {
    engineSource.textContent = "Consultando motor privado de mayoristas...";
    const response = await fetch(privateSearchUrl, {
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
    `Salida orientativa desde ${data.departure}${data.travelMonth ? ` en ${data.travelMonth}` : ""}.`,
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
  renderResults(data, result.total);

  if (saveLead) {
    const lead = {
      id: globalThis.crypto?.randomUUID ? crypto.randomUUID() : String(Date.now()),
      name: data.name,
      email: data.email,
      destination: result.destination.name,
      total: result.total,
      score: result.score,
      travelers: data.travelers,
      nights: data.nights,
      departure: data.departure,
      travelMonth: data.travelMonth,
      budgetMax: data.budgetMax,
      style: result.style.label,
      preferences: data.preferences,
      source: result.source,
      createdAt: new Date().toLocaleString("es-ES", { dateStyle: "short", timeStyle: "short" }),
      createdAtIso: new Date().toISOString(),
    };
    saveLeadToStorage(lead);
    await submitLead(lead);
    trackEvent("lead_submitted", { destination: lead.destination, score: lead.score, total: lead.total });
  }
}

function buildResults(data, referenceTotal) {
  const destination = destinations[data.destinationKey];
  const style = styleMultipliers[data.styleKey];
  const base = destination.packages.map((item, index) => {
    const serviceBoost = data.preferences.length * 38 * data.travelers;
    const total = Math.round((referenceTotal * item.margin + serviceBoost + index * 85) / 10) * 10;
    const fit = data.budgetMax ? Math.max(48, Math.min(99, 100 - Math.round(((total - data.budgetMax) / data.budgetMax) * 100))) : 86;
    return {
      ...item,
      total,
      nights: data.nights,
      travelers: data.travelers,
      destination: destination.name,
      style: style.label,
      fit,
      included: [item.board, "Vuelos opcionales", "Revision de agente", "Condiciones de mayorista"],
    };
  });

  const filtered = filterCategory?.value && filterCategory.value !== "all"
    ? base.filter((item) => item.category === filterCategory.value)
    : base;

  return filtered.sort((a, b) => {
    if (sortResults?.value === "price") return a.total - b.total;
    if (sortResults?.value === "rating") return b.rating - a.rating;
    return b.fit + b.rating * 8 - (a.fit + a.rating * 8);
  });
}

function setMenuOpen(isOpen) {
  if (!menuToggle || !siteMenu) {
    return;
  }

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menu de secciones" : "Abrir menu de secciones");
  siteMenu.classList.toggle("is-open", isOpen);
  siteMenu.hidden = !isOpen;
  document.body.classList.toggle("menu-is-open", isOpen);
  if (isOpen) {
    trackEvent("menu_open");
  }
}

function setupCookieBanner() {
  if (!cookieBanner || !acceptAnalytics || !rejectAnalytics) {
    return;
  }

  const storedConsent = localStorage.getItem("turmar-analytics-consent");
  cookieBanner.classList.toggle("is-visible", !storedConsent);

  acceptAnalytics.addEventListener("click", () => {
    localStorage.setItem("turmar-analytics-consent", "accepted");
    cookieBanner.classList.remove("is-visible");
    trackEvent("analytics_accepted");
  });

  rejectAnalytics.addEventListener("click", () => {
    localStorage.setItem("turmar-analytics-consent", "rejected");
    cookieBanner.classList.remove("is-visible");
  });
}

function renderResults(data, referenceTotal) {
  if (!resultList || !resultCount) return;
  const results = buildResults(data, referenceTotal);
  resultCount.textContent = `${results.length} opciones`;
  resultList.innerHTML = results
    .map(
      (item, index) => `
        <article class="result-card">
          <div class="result-main">
            <div class="result-badge">${item.tag}</div>
            <h3>${item.title}</h3>
            <p>${item.destination} · ${item.nights} noches · ${item.travelers} viajero(s) · ${item.style}</p>
            <div class="result-tags">
              ${item.included.map((included) => `<span>${included}</span>`).join("")}
            </div>
          </div>
          <div class="result-side">
            <span class="rating">${item.rating.toFixed(1)} / 5</span>
            <strong>${currency.format(item.total)}</strong>
            <small>${item.fit}% encaje</small>
            <button class="button primary select-result" type="button" data-result-index="${index}">Revisar con agente</button>
          </div>
        </article>
      `,
    )
    .join("");
}

function getLeads() {
  return getStoredItems("viajes-turmar-leads");
}

function saveLeadToStorage(lead) {
  const leads = [lead, ...getLeads()].slice(0, 8);
  localStorage.setItem("viajes-turmar-leads", JSON.stringify(leads));
  renderLeads();
}

async function submitLead(lead) {
  if (!appConfig.leadEndpoint) {
    if (formStatus) {
      formStatus.textContent = "Solicitud guardada en modo local. Conecta un CRM/Formspree/Airtable para recibirla centralizada.";
    }
    return;
  }

  try {
    if (formStatus) {
      formStatus.textContent = "Enviando solicitud al sistema de gestión...";
    }
    const response = await fetch(appConfig.leadEndpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(lead),
    });
    if (!response.ok) {
      throw new Error("Lead endpoint failed");
    }
    if (formStatus) {
      formStatus.textContent = "Solicitud recibida. Un agente revisará la propuesta.";
    }
  } catch {
    if (formStatus) {
      formStatus.textContent = "Solicitud guardada localmente. Revisa la conexión del endpoint de gestión.";
    }
  }
}

function renderLeads() {
  if (!leadList) {
    return;
  }

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
  const submitBtn = form.querySelector("[type=submit]");
  const originalText = submitBtn?.textContent || "";
  if (submitBtn) {
    submitBtn.classList.add("is-loading");
    submitBtn.textContent = "Preparando solicitud";
  }
  trackEvent("proposal_requested", getFormData());
  await renderProposal(true, true);
  if (submitBtn) {
    submitBtn.classList.remove("is-loading");
    submitBtn.textContent = originalText;
  }
});

form.addEventListener("input", () => {
  renderProposal(false, false);
});

sortResults?.addEventListener("change", () => renderProposal(false, false));
filterCategory?.addEventListener("change", () => renderProposal(false, false));

resultList?.addEventListener("click", (event) => {
  const button = event.target.closest(".select-result");
  if (!button) return;
  trackEvent("result_selected", { index: button.dataset.resultIndex, form: getFormData() });
  document.querySelector("#automatizador")?.scrollIntoView({ behavior: "smooth", block: "start" });
  formStatus.textContent = "Opcion seleccionada para revision. Completa tus datos y solicita propuesta.";
});

copyProposal.addEventListener("click", async () => {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(currentProposal);
      copyProposal.textContent = "Copiado";
      trackEvent("copy_proposal");
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

whatsappLink?.addEventListener("click", () => {
  trackEvent("whatsapp_click");
});

emailLink?.addEventListener("click", () => {
  trackEvent("email_click");
});

clearLeads?.addEventListener("click", () => {
  localStorage.removeItem("viajes-turmar-leads");
  trackEvent("leads_cleared");
  renderLeads();
});

menuToggle?.addEventListener("click", (event) => {
  event.stopPropagation();
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  setMenuOpen(!isOpen);
});

siteMenu?.addEventListener("click", (event) => {
  const link = event.target.closest("a");
  if (!link) return;
  setMenuOpen(false);
});

document.addEventListener("click", (event) => {
  if (!siteMenu?.classList.contains("is-open")) return;
  if (event.target.closest(".topbar")) return;
  setMenuOpen(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuOpen(false);
  }
});

function setupScrollAnimations() {
  const elements = document.querySelectorAll(".fade-up");
  if (!elements.length) return;

  if (!("IntersectionObserver" in window)) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -32px 0px" },
  );

  elements.forEach((el) => observer.observe(el));
}

function setupTopbarScroll() {
  const topbar = document.querySelector(".topbar");
  if (!topbar) return;

  const update = () => topbar.classList.toggle("is-scrolled", window.scrollY > 32);
  window.addEventListener("scroll", update, { passive: true });
  update();
}

function setupBackToTop() {
  const btn = document.querySelector("#backToTop");
  if (!btn) return;

  window.addEventListener(
    "scroll",
    () => btn.classList.toggle("is-visible", window.scrollY > 500),
    { passive: true },
  );

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

setupCookieBanner();
setupQuickTabs();
setupScrollAnimations();
setupTopbarScroll();
setupBackToTop();
trackEvent("page_view", { title: document.title });
renderProposal(false);
renderLeads();

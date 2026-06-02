const currencyAdmin = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const demoLeads = [
  {
    id: "lead-001",
    name: "Marta Ruiz",
    email: "marta.ruiz@email.com",
    phone: "+34 600 112 430",
    destination: "Japón esencial",
    travelers: 2,
    nights: 12,
    style: "premium",
    total: 6840,
    score: 94,
    status: "Propuesta enviada",
    agent: "Alvaro",
    source: "Comparador web",
    nextAction: "Enviar alternativa con ryokan",
    createdAt: "01/06/26, 10:12",
  },
  {
    id: "lead-002",
    name: "Carlos Medina",
    email: "c.medina@email.com",
    phone: "+34 644 210 808",
    destination: "Grecia boutique",
    travelers: 2,
    nights: 8,
    style: "romántico",
    total: 3280,
    score: 88,
    status: "Pendiente contacto",
    agent: "Laura",
    source: "WhatsApp",
    nextAction: "Llamada de calificacion",
    createdAt: "31/05/26, 18:42",
  },
  {
    id: "lead-003",
    name: "Ana y familia",
    email: "ana.familia@email.com",
    phone: "+34 611 809 112",
    destination: "Costa Rica aventura",
    travelers: 4,
    nights: 10,
    style: "familiar",
    total: 7420,
    score: 91,
    status: "Negociacion",
    agent: "Alvaro",
    source: "SEO destino",
    nextAction: "Confirmar habitaciones familiares",
    createdAt: "30/05/26, 12:05",
  },
  {
    id: "lead-004",
    name: "Javier Ortega",
    email: "javier.ortega@email.com",
    phone: "+34 622 334 812",
    destination: "Egipto cultural",
    travelers: 2,
    nights: 7,
    style: "cultural",
    total: 2890,
    score: 79,
    status: "Reserva prevista",
    agent: "Nuria",
    source: "Formulario web",
    nextAction: "Enviar enlace de señal",
    createdAt: "29/05/26, 09:31",
  },
  {
    id: "lead-005",
    name: "Lucia Santos",
    email: "lucia.santos@email.com",
    phone: "+34 677 451 930",
    destination: "Grecia boutique",
    travelers: 3,
    nights: 6,
    style: "boutique",
    total: 4180,
    score: 83,
    status: "Ganado",
    agent: "Laura",
    source: "Recomendacion",
    nextAction: "Enviar documentacion final",
    createdAt: "27/05/26, 16:20",
  },
  {
    id: "lead-006",
    name: "Sergio Martin",
    email: "sergio.martin@email.com",
    phone: "+34 630 778 901",
    destination: "Maldivas luna de miel",
    travelers: 2,
    nights: 7,
    style: "romántico",
    total: 7960,
    score: 96,
    status: "Propuesta enviada",
    agent: "Nuria",
    source: "Landing lunas de miel",
    nextAction: "Comparar villa playa vs villa agua",
    createdAt: "30/05/26, 11:47",
  },
  {
    id: "lead-007",
    name: "Elena Castro",
    email: "elena.castro@email.com",
    phone: "+34 681 349 002",
    destination: "Disneyland Paris",
    travelers: 4,
    nights: 4,
    style: "familiar",
    total: 3140,
    score: 82,
    status: "Pendiente contacto",
    agent: "Laura",
    source: "Busqueda familias",
    nextAction: "Validar fechas escolares",
    createdAt: "29/05/26, 17:03",
  },
  {
    id: "lead-008",
    name: "Pablo Navarro",
    email: "pablo.navarro@email.com",
    phone: "+34 690 551 208",
    destination: "Italia clasica",
    travelers: 2,
    nights: 7,
    style: "cultural",
    total: 2980,
    score: 76,
    status: "Negociacion",
    agent: "Alvaro",
    source: "Circuitos",
    nextAction: "Ajustar categoria hotelera",
    createdAt: "29/05/26, 12:44",
  },
  {
    id: "lead-009",
    name: "Irene Molina",
    email: "irene.molina@email.com",
    phone: "+34 656 104 771",
    destination: "Tailandia norte y playa",
    travelers: 2,
    nights: 11,
    style: "aventura suave",
    total: 4420,
    score: 87,
    status: "Reserva prevista",
    agent: "Nuria",
    source: "Comparador web",
    nextAction: "Enviar condiciones de vuelos",
    createdAt: "28/05/26, 20:15",
  },
  {
    id: "lead-010",
    name: "Ramon Vidal",
    email: "ramon.vidal@email.com",
    phone: "+34 623 901 453",
    destination: "Riviera Maya familiar",
    travelers: 5,
    nights: 9,
    style: "todo incluido",
    total: 8650,
    score: 89,
    status: "Propuesta enviada",
    agent: "Laura",
    source: "WhatsApp",
    nextAction: "Confirmar ocupacion triple",
    createdAt: "28/05/26, 10:22",
  },
  {
    id: "lead-011",
    name: "Noelia Perez",
    email: "noelia.perez@email.com",
    phone: "+34 618 440 311",
    destination: "Sri Lanka y Maldivas",
    travelers: 2,
    nights: 12,
    style: "luna de miel",
    total: 9250,
    score: 97,
    status: "Ganado",
    agent: "Alvaro",
    source: "SEO destino",
    nextAction: "Preparar documentacion de viaje",
    createdAt: "27/05/26, 13:18",
  },
  {
    id: "lead-012",
    name: "Beatriz Leon",
    email: "beatriz.leon@email.com",
    phone: "+34 699 770 615",
    destination: "Noruega fiordos",
    travelers: 2,
    nights: 8,
    style: "naturaleza premium",
    total: 5340,
    score: 85,
    status: "Pendiente contacto",
    agent: "Nuria",
    source: "Formulario web",
    nextAction: "Definir barco o ruta terrestre",
    createdAt: "27/05/26, 09:50",
  },
];

const demoEvents = [
  { name: "page_view", label: "Visitas", count: 1284 },
  { name: "quick_tab_selected", label: "Pestanas consultadas", count: 312 },
  { name: "search_started", label: "Busquedas", count: 286 },
  { name: "result_selected", label: "Resultados elegidos", count: 119 },
  { name: "proposal_requested", label: "Solicitudes", count: 54 },
  { name: "whatsapp_click", label: "WhatsApp", count: 39 },
  { name: "email_click", label: "Email", count: 21 },
];

const providers = [
  { name: "Mayorista Mediterraneo", type: "Circuitos y costas", status: "Simulado", latency: "240 ms", match: "92%" },
  { name: "Asia Pro Travel", type: "Asia y Japon", status: "Simulado", latency: "310 ms", match: "88%" },
  { name: "Nilo Select", type: "Egipto y cruceros", status: "Simulado", latency: "185 ms", match: "84%" },
  { name: "Eco America", type: "Costa Rica", status: "Simulado", latency: "275 ms", match: "81%" },
  { name: "Honeymoon Collection", type: "Lunas de miel", status: "Simulado", latency: "295 ms", match: "90%" },
  { name: "Family Resort Hub", type: "Familias y Caribe", status: "Simulado", latency: "260 ms", match: "86%" },
];

const inventory = [
  { title: "Ryokan con onsen privado", destination: "Japon", price: 1480, availability: "Bajo cupo" },
  { title: "Crucero Nilo superior", destination: "Egipto", price: 920, availability: "Disponible" },
  { title: "Hotel boutique Santorini", destination: "Grecia", price: 1180, availability: "Ultimas plazas" },
  { title: "Eco lodge Arenal", destination: "Costa Rica", price: 760, availability: "Disponible" },
  { title: "Villa sobre el agua", destination: "Maldivas", price: 2180, availability: "Bajo cupo" },
  { title: "Resort familiar todo incluido", destination: "Riviera Maya", price: 1320, availability: "Disponible" },
];

const automations = [
  { title: "Email de confirmacion al cliente", status: "Preparada", detail: "Se dispara al recibir una solicitud." },
  { title: "Aviso interno al agente", status: "Preparada", detail: "Notificacion por email o CRM." },
  { title: "Recordatorio 24 h sin respuesta", status: "Demo", detail: "Tarea automatica para seguimiento." },
  { title: "Exportacion CSV semanal", status: "Demo", detail: "Resumen de leads y valor de pipeline." },
  { title: "Conexion con motor privado", status: "Pendiente datos reales", detail: "Requiere accesos/API de mayoristas." },
];

const launchItems = [
  { title: "Dominio propio", status: "Preparado para viajesturmar.com" },
  { title: "Email profesional", status: "Buzones definidos" },
  { title: "Privacidad, cookies y aviso legal", status: "Borrador" },
  { title: "Google Analytics 4", status: "Pendiente ID" },
  { title: "Search Console", status: "Pendiente dominio" },
  { title: "CRM o base de datos", status: "Demo Supabase creada" },
  { title: "Pasarela de pago", status: "Flujo demo preparado" },
];

const loginScreen = document.querySelector("#loginScreen");
const loginForm = document.querySelector("#loginForm");
const logoutButton = document.querySelector("#logoutButton");
const seedDemo = document.querySelector("#seedDemo");
const leadCount = document.querySelector("#leadCount");
const pipelineValue = document.querySelector("#pipelineValue");
const conversionRate = document.querySelector("#conversionRate");
const averageScore = document.querySelector("#averageScore");
const adminLeadRows = document.querySelector("#adminLeadRows");
const exportLeads = document.querySelector("#exportLeads");
const refreshAdmin = document.querySelector("#refreshAdmin");
const crmSearch = document.querySelector("#crmSearch");
const taskList = document.querySelector("#taskList");
const pipelineBoard = document.querySelector("#pipelineBoard");
const analyticsGrid = document.querySelector("#analyticsGrid");
const barChart = document.querySelector("#barChart");
const funnel = document.querySelector("#funnel");
const providerList = document.querySelector("#providerList");
const inventoryList = document.querySelector("#inventoryList");
const automationList = document.querySelector("#automationList");
const launchList = document.querySelector("#launchList");

function readItems(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
}

function writeItems(key, items) {
  localStorage.setItem(key, JSON.stringify(items));
}

function normalizeLead(lead) {
  return {
    status: "Pendiente contacto",
    agent: "Sin asignar",
    source: lead.source || "Web",
    nextAction: "Revisar solicitud",
    phone: "",
    ...lead,
  };
}

function getLeads() {
  const stored = readItems("viajes-turmar-leads").map(normalizeLead);
  return stored.length ? stored : demoLeads;
}

function getEvents() {
  const stored = readItems("viajes-turmar-events");
  if (!stored.length) return demoEvents;
  const counts = stored.reduce((acc, event) => {
    acc[event.name] = (acc[event.name] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(counts).map(([name, count]) => ({ name, label: name.replaceAll("_", " "), count }));
}

function seedDemoData() {
  writeItems("viajes-turmar-leads", demoLeads);
  writeItems(
    "viajes-turmar-events",
    demoEvents.flatMap((event) =>
      Array.from({ length: Math.min(event.count, 35) }, (_, index) => ({
        id: `${event.name}-${index}`,
        name: event.name,
        createdAt: new Date(Date.now() - index * 3600000).toISOString(),
        payload: { demo: true },
      })),
    ),
  );
  renderAdmin();
}

function filterLeads(leads) {
  const query = crmSearch.value.trim().toLowerCase();
  if (!query) return leads;
  return leads.filter((lead) =>
    [lead.name, lead.email, lead.destination, lead.status, lead.agent]
      .join(" ")
      .toLowerCase()
      .includes(query),
  );
}

function renderStats(leads, events) {
  const total = leads.reduce((sum, lead) => sum + Number(lead.total || 0), 0);
  const score = leads.length
    ? Math.round(leads.reduce((sum, lead) => sum + Number(lead.score || 0), 0) / leads.length)
    : 0;
  const requests = events.find((event) => event.name === "proposal_requested")?.count || leads.length;
  const views = events.find((event) => event.name === "page_view")?.count || 1;

  leadCount.textContent = leads.length;
  pipelineValue.textContent = currencyAdmin.format(total);
  conversionRate.textContent = `${Math.round((requests / views) * 100)}%`;
  averageScore.textContent = score;
}

function renderRows(leads) {
  const filtered = filterLeads(leads);
  adminLeadRows.innerHTML = filtered.length
    ? filtered
        .map(
          (lead) => `
            <tr>
              <td><strong>${lead.name || "-"}</strong><br>${lead.email || ""}<br>${lead.phone || ""}</td>
              <td>${lead.destination || "-"}<br>${lead.travelers || "-"} viajeros · ${lead.nights || "-"} noches · ${lead.style || ""}</td>
              <td><span class="status-pill">${lead.status || "-"}</span><br>${lead.source || ""}</td>
              <td>${currencyAdmin.format(Number(lead.total || 0))}<br>Score ${lead.score || "-"}</td>
              <td>${lead.agent || "-"}</td>
              <td>${lead.nextAction || "-"}</td>
            </tr>
          `,
        )
        .join("")
    : `<tr><td colspan="6">No hay resultados para esa busqueda.</td></tr>`;
}

function renderTasks(leads) {
  const open = leads.filter((lead) => lead.status !== "Ganado").slice(0, 5);
  taskList.innerHTML = open
    .map(
      (lead) => `
        <article class="task-item">
          <strong>${lead.nextAction}</strong>
          <span>${lead.name} · ${lead.destination}</span>
        </article>
      `,
    )
    .join("");
}

function renderPipeline(leads) {
  const stages = ["Pendiente contacto", "Propuesta enviada", "Negociacion", "Reserva prevista", "Ganado"];
  pipelineBoard.innerHTML = stages
    .map((stage) => {
      const items = leads.filter((lead) => lead.status === stage);
      const total = items.reduce((sum, lead) => sum + Number(lead.total || 0), 0);
      return `
        <section class="pipeline-column">
          <header><strong>${stage}</strong><span>${currencyAdmin.format(total)}</span></header>
          ${items
            .map(
              (lead) => `
                <article class="pipeline-card">
                  <strong>${lead.name}</strong>
                  <span>${lead.destination}</span>
                  <b>${currencyAdmin.format(Number(lead.total || 0))}</b>
                </article>
              `,
            )
            .join("")}
        </section>
      `;
    })
    .join("");
}

function renderAnalytics(events) {
  analyticsGrid.innerHTML = events
    .map((event) => `<div class="mini-stat"><span>${event.label}</span><strong>${event.count}</strong></div>`)
    .join("");

  const max = Math.max(...events.map((event) => event.count), 1);
  barChart.innerHTML = events
    .map(
      (event) => `
        <div class="bar-row">
          <span>${event.label}</span>
          <div><i style="width:${(event.count / max) * 100}%"></i></div>
          <b>${event.count}</b>
        </div>
      `,
    )
    .join("");

  const funnelSteps = [
    ["Visitas", events.find((event) => event.name === "page_view")?.count || 428],
    ["Busquedas", events.find((event) => event.name === "search_started")?.count || 126],
    ["Solicitudes", events.find((event) => event.name === "proposal_requested")?.count || 23],
    ["Reservas demo", 5],
  ];
  const first = funnelSteps[0][1];
  funnel.innerHTML = funnelSteps
    .map(([label, count]) => `<div class="funnel-step" style="width:${Math.max(38, (count / first) * 100)}%"><strong>${count}</strong><span>${label}</span></div>`)
    .join("");
}

function renderProviders() {
  providerList.innerHTML = providers
    .map(
      (provider) => `
        <article class="provider-card">
          <div><strong>${provider.name}</strong><span>${provider.type}</span></div>
          <b>${provider.match}</b>
          <span class="status-pill pending">${provider.status}</span>
          <small>${provider.latency}</small>
        </article>
      `,
    )
    .join("");

  inventoryList.innerHTML = inventory
    .map(
      (item) => `
        <article class="inventory-card">
          <strong>${item.title}</strong>
          <span>${item.destination} · ${item.availability}</span>
          <b>${currencyAdmin.format(item.price)}</b>
        </article>
      `,
    )
    .join("");
}

function renderOperations() {
  automationList.innerHTML = automations
    .map(
      (automation) => `
        <article class="automation-item">
          <div><strong>${automation.title}</strong><span>${automation.detail}</span></div>
          <span class="status-pill">${automation.status}</span>
        </article>
      `,
    )
    .join("");

  launchList.innerHTML = launchItems
    .map(
      (item) => `
        <article class="launch-item">
          <span>${item.title}</span>
          <strong>${item.status}</strong>
        </article>
      `,
    )
    .join("");
}

function renderAdmin() {
  const leads = getLeads();
  const events = getEvents();
  renderStats(leads, events);
  renderRows(leads);
  renderTasks(leads);
  renderPipeline(leads);
  renderAnalytics(events);
  renderProviders();
  renderOperations();
}

function exportCsv() {
  const leads = getLeads();
  const headers = ["name", "email", "phone", "destination", "travelers", "nights", "style", "total", "score", "status", "agent", "source", "nextAction", "createdAt"];
  const rows = leads.map((lead) =>
    headers.map((header) => `"${String(lead[header] ?? "").replaceAll('"', '""')}"`).join(","),
  );
  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "viajes-turmar-crm-demo.csv";
  link.click();
  URL.revokeObjectURL(url);
}

function updateSessionVisibility() {
  const isLoggedIn = sessionStorage.getItem("turmar-admin-auth") === "true";
  loginScreen.hidden = isLoggedIn;
  document.body.classList.toggle("is-locked", !isLoggedIn);
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const user = document.querySelector("#adminUser").value.trim();
  const pass = document.querySelector("#adminPass").value.trim();
  if (user === "turmar" && pass === "demo2026") {
    sessionStorage.setItem("turmar-admin-auth", "true");
    updateSessionVisibility();
    renderAdmin();
  }
});

logoutButton.addEventListener("click", () => {
  sessionStorage.removeItem("turmar-admin-auth");
  updateSessionVisibility();
});

seedDemo.addEventListener("click", seedDemoData);
refreshAdmin.addEventListener("click", renderAdmin);
exportLeads.addEventListener("click", exportCsv);
crmSearch.addEventListener("input", renderAdmin);

updateSessionVisibility();
renderAdmin();

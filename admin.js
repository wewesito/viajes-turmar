const currencyAdmin = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const leadCount = document.querySelector("#leadCount");
const eventCount = document.querySelector("#eventCount");
const pipelineValue = document.querySelector("#pipelineValue");
const averageScore = document.querySelector("#averageScore");
const adminLeadRows = document.querySelector("#adminLeadRows");
const exportLeads = document.querySelector("#exportLeads");
const refreshAdmin = document.querySelector("#refreshAdmin");

function readItems(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
}

function renderAdmin() {
  const leads = readItems("viajes-turmar-leads");
  const events = readItems("viajes-turmar-events");
  const total = leads.reduce((sum, lead) => sum + Number(lead.total || 0), 0);
  const score = leads.length
    ? Math.round(leads.reduce((sum, lead) => sum + Number(lead.score || 0), 0) / leads.length)
    : 0;

  leadCount.textContent = leads.length;
  eventCount.textContent = events.length;
  pipelineValue.textContent = currencyAdmin.format(total);
  averageScore.textContent = score;

  adminLeadRows.innerHTML = leads.length
    ? leads
        .map(
          (lead) => `
            <tr>
              <td><strong>${lead.name || "-"}</strong><br>${lead.email || ""}</td>
              <td>${lead.destination || "-"}</td>
              <td>${lead.travelers || "-"} viajeros · ${lead.nights || "-"} noches<br>${lead.style || ""}</td>
              <td>${currencyAdmin.format(Number(lead.total || 0))}</td>
              <td>${lead.score || "-"}</td>
              <td>${lead.createdAt || "-"}</td>
            </tr>
          `,
        )
        .join("")
    : `<tr><td colspan="6">Todavía no hay solicitudes guardadas en este navegador.</td></tr>`;
}

function exportCsv() {
  const leads = readItems("viajes-turmar-leads");
  const headers = ["name", "email", "destination", "travelers", "nights", "style", "total", "score", "source", "createdAt"];
  const rows = leads.map((lead) =>
    headers.map((header) => `"${String(lead[header] ?? "").replaceAll('"', '""')}"`).join(","),
  );
  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "viajes-turmar-solicitudes.csv";
  link.click();
  URL.revokeObjectURL(url);
}

exportLeads.addEventListener("click", exportCsv);
refreshAdmin.addEventListener("click", renderAdmin);

renderAdmin();

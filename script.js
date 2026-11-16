// Vorlagen und Speicherfunktionen der App – alles bleibt im Browser.
const STORAGE_KEYS = {
  recent: "feuerwehr-uebungsplaner-recent",
  favorites: "feuerwehr-uebungsplaner-favorites",
  ratings: "feuerwehr-uebungsplaner-ratings"
};

const templates = [
  {
    id: "teamkommunikation",
    keywords: ["kommunikation", "funk", "führung", "team", "koordination"],
    theme: "Teamkommunikation und klare Aufgabenverteilung",
    situation: "Bei einer fiktiven Einsatzmeldung treffen mehrere Informationen zeitversetzt ein. Die Gruppe soll gemeinsam ein Lagebild erstellen und ihre nächsten Schritte abstimmen.",
    preparation: "Eine kurze, frei erfundene Lagekarte oder schriftliche Meldungen vorbereiten. Arbeitsbereich und Beobachtungsplatz festlegen; keine realen Notrufe oder Funkkanäle verwenden.",
    tasks: ["Informationen ordnen und Rückfragen kenntlich machen.", "Aufgaben und Zuständigkeiten im Team verständlich absprechen.", "Die Entscheidung und offene Punkte für die Nachbesprechung festhalten."],
    variant: "Meldungen in anderer Reihenfolge übermitteln oder eine Information als unklar kennzeichnen."
  },
  {
    id: "geraetekunde",
    keywords: ["gerät", "material", "technik", "fahrzeug", "ausrüstung"],
    theme: "Gerätekunde mit gemeinsamer Materialplanung",
    situation: "Für eine Übungslage steht eine begrenzte Auswahl an Geräten bereit. Die Gruppe prüft gemeinsam, was zur geplanten Aufgabe passt und welche Fragen vor einer Nutzung geklärt werden müssen.",
    preparation: "Nur freigegebene, sichere Übungsmaterialien bereitstellen. Einen übersichtlichen Ablagebereich und ausreichend Platz zum Erklären einplanen.",
    tasks: ["Vorhandene Geräte benennen und ihren vorgesehenen Zweck beschreiben.", "Material für das Ausbildungsziel auswählen und die Auswahl begründen.", "Fehlendes Material oder offene Sicherheitsfragen benennen."],
    variant: "Die Materialauswahl verkleinern oder ein zusätzliches Gerät zur Erklärung einbeziehen."
  },
  {
    id: "lageerkundung",
    keywords: ["erkundung", "lage", "einsatz", "beurteilung", "entscheidung"],
    theme: "Lageerkundung und gemeinsames Lagebild",
    situation: "Eine fiktive, gefahrlose Übungslage wird beschrieben. Die Gruppe sammelt Beobachtungen, trennt bestätigte Informationen von Annahmen und bespricht mögliche nächste Schritte.",
    preparation: "Ein einfaches Szenario am Tisch oder auf einem sicheren Übungsbereich vorbereiten. Gefahren nur beschreiben, nicht real nachstellen.",
    tasks: ["Beobachtungen strukturiert zusammentragen.", "Unklare oder fehlende Informationen markieren.", "Eine gemeinsame Zusammenfassung mit offenen Fragen geben."],
    variant: "Ein zusätzliches, zunächst widersprüchliches Detail einführen und gemeinsam einordnen."
  },
  {
    id: "menschenrettung",
    keywords: ["rettung", "erste hilfe", "person", "betreuung", "patient"],
    theme: "Betreuung und abgestimmte Hilfeleistung",
    situation: "Eine ruhige, fiktive Situation mit einer Übungsperson oder einer rein beschriebenen Person dient dazu, Kommunikation und abgestimmtes Vorgehen zu besprechen.",
    preparation: "Übungsperson und Beobachtungsrolle einweisen. Nur geeignete, freiwillige Darstellende verwenden; keine körperlich belastenden oder medizinischen Maßnahmen simulieren.",
    tasks: ["Kontakt aufnehmen und Informationen ruhig erfragen.", "Rollen und Unterstützungsbedarf miteinander abstimmen.", "Grenzen der Übung sowie notwendige Weitergabe von Informationen benennen."],
    variant: "Eine zusätzliche Beobachtungsaufgabe oder eine geänderte Informationslage ergänzen."
  },
  {
    id: "wasserplanung",
    keywords: ["wasser", "versorgung", "schlauch", "lösch", "pumpe"],
    theme: "Übungsplanung zur Wasserversorgung",
    situation: "Anhand einer Skizze oder eines sicheren, freigegebenen Übungsbereichs plant die Gruppe eine einfache Wasserversorgung und bespricht Abhängigkeiten und Zuständigkeiten.",
    preparation: "Aufbau und Übungsbereich vorab durch die verantwortliche Ausbilderin oder den verantwortlichen Ausbilder prüfen. Die Übung kann vollständig als Planspiel stattfinden.",
    tasks: ["Materialbedarf anhand des Ausbildungsziels zusammenstellen.", "Aufgaben und Kommunikationswege festlegen.", "Mögliche Unterbrechungen erkennen und die Planung anpassen."],
    variant: "Die verfügbare Materialmenge begrenzen oder den Übungsort gedanklich verändern."
  },
  {
    id: "ablaufplanung",
    keywords: ["ablauf", "organisation", "planung", "übergabe", "ausbildung"],
    theme: "Ablaufplanung und Rollenwechsel",
    situation: "Die Gruppe erhält einen kurzen Übungsauftrag und entwickelt gemeinsam einen nachvollziehbaren Ablauf mit klaren Rollen und einem vereinbarten Abschluss.",
    preparation: "Auftrag und Zeitrahmen auf einer Karte notieren. Beobachtungspunkte für Zusammenarbeit und Verständlichkeit festlegen.",
    tasks: ["Auftrag in einzelne, verständliche Arbeitsschritte teilen.", "Rollen verteilen und Rückfragen zulassen.", "Am Ende Ergebnisse und offene Punkte zusammenfassen."],
    variant: "Nach der Hälfte die Rollen tauschen oder eine zusätzliche Rahmenbedingung ergänzen."
  }
];

const form = document.querySelector("#planner-form");
const steps = [...document.querySelectorAll(".form-step")];
const planOutput = document.querySelector("#plan-output");
const favoriteList = document.querySelector("#favorites-list");
const stepTitles = ["Material und Rahmen", "Gruppe und Ort", "Zeit und Aufwand", "Ausbildungsziel"];
let currentStep = 0;
let currentPlan = null;
let selectedRating = 0;

function readStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch (error) {
    console.error("Lokale Daten konnten nicht gelesen werden.", error);
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error("Lokale Daten konnten nicht gespeichert werden.", error);
    return false;
  }
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function getFieldMessage(field) {
  if (field.validity.valueMissing) return "Bitte fülle dieses Pflichtfeld aus.";
  if (field.validity.rangeUnderflow) return `Bitte gib mindestens ${field.min} ein.`;
  if (field.validity.rangeOverflow) return `Bitte gib höchstens ${field.max} ein.`;
  if (field.validity.typeMismatch) return "Bitte gib einen gültigen Wert ein.";
  return "";
}

function showFieldError(field) {
  const error = document.querySelector(`#${field.id}-error`);
  const message = getFieldMessage(field);
  field.setAttribute("aria-invalid", message ? "true" : "false");
  if (error) error.textContent = message;
  return !message;
}

function validateStep(index) {
  let valid = true;
  steps[index].querySelectorAll("input, textarea, select").forEach((field) => {
    if (!showFieldError(field)) valid = false;
  });
  if (!valid) steps[index].querySelector(":invalid")?.focus();
  return valid;
}

function setStep(index) {
  currentStep = index;
  steps.forEach((step, stepIndex) => { step.hidden = stepIndex !== index; });
  document.querySelector("#step-count").textContent = `Schritt ${index + 1} von ${steps.length}`;
  document.querySelector("#step-title").textContent = stepTitles[index];
  document.querySelector(".progress-track").setAttribute("aria-valuenow", String(index + 1));
  document.querySelector("#progress-fill").style.width = `${((index + 1) / steps.length) * 100}%`;
  document.querySelector("#back-button").hidden = index === 0;
  document.querySelector("#next-button").hidden = index === steps.length - 1;
  document.querySelector("#create-button").hidden = index !== steps.length - 1;
}

function formValues() {
  const data = new FormData(form);
  return Object.fromEntries(data.entries());
}

function chooseTemplate(goal, recent) {
  const normalizedGoal = goal.toLocaleLowerCase("de");
  const relevant = templates.filter((template) => template.keywords.some((keyword) => normalizedGoal.includes(keyword)));
  const candidates = relevant.length ? relevant : templates;
  const unused = candidates.filter((template) => !recent.includes(template.id));
  const pool = unused.length ? unused : candidates;
  return pool[Math.floor(Math.random() * pool.length)];
}

function makePlan(data) {
  const recent = readStorage(STORAGE_KEYS.recent, []);
  const template = chooseTemplate(data.objective, recent);
  const repeatCount = recent.includes(template.id) ? 1 : 0;
  const total = Number(data.duration);
  const segments = [0.12, 0.18, 0.5, 0.12, 0.08].map((share) => Math.max(1, Math.round(total * share)));
  segments[2] += total - segments.reduce((sum, minutes) => sum + minutes, 0);
  const start = [];
  let elapsed = 0;
  segments.forEach((minutes) => { start.push(elapsed); elapsed += minutes; });
  const equipment = data.materials.split(/[,;\n]/).map((item) => item.trim()).filter(Boolean);
  if (data.mustUse.trim()) equipment.push(`Zwingend berücksichtigen: ${data.mustUse.trim()}`);
  const instructorCount = Number(data.instructors);
  const instructorDuties = instructorCount === 1
    ? ["Übung anleiten, Zeit und Sicherheit im Blick behalten sowie die Nachbesprechung moderieren."]
    : ["Übung anleiten und Zeit im Blick behalten.", "Sicherheit beobachten, Rückmeldungen sammeln und die Nachbesprechung unterstützen."];
  if (instructorCount > 2) instructorDuties.push("Weitere Ausbilder unterstützen Beobachtung, Material und einzelne Kleingruppen.");
  const title = `${template.theme} – ${data.audience}`;
  const id = `plan-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
  const rerunDetails = repeatCount
    ? "Diesmal mit geänderter Rollenverteilung und einer Zusatzaufgabe: Eine Person beobachtet, welche Informationen noch fehlen, bevor das Team seine Zusammenfassung abschließt."
    : template.variant;
  const effortNote = {
    gering: "Ein kurzer Aufbau mit vorhandenen Materialien und einer klaren Aufgabenstellung.",
    mittel: "Eine vorbereitete Lagebeschreibung und mindestens ein Beobachtungspunkt.",
    hoch: "Mehrere vorbereitete Informationsbausteine und getrennte Beobachtungsrollen; Aufwand vorab realistisch abstimmen."
  }[data.effort];

  return {
    id, title, createdAt: new Date().toISOString(), templateId: template.id,
    objective: data.objective, audience: data.audience, location: data.location,
    participants: data.participants, instructorCount, duration: total,
    materials: equipment, instructorDuties, situation: template.situation,
    preparation: `${template.preparation} ${effortNote}`,
    steps: [
      { time: segments[0], title: "Begrüßung und Ziel", text: "Ziel, Zeitrahmen, Rollen und sichere Grenzen der Übung erklären." },
      { time: segments[1], title: "Auftrag und Vorbereitung", text: "Lage vorstellen, Material abstimmen und Rückfragen klären." },
      { time: segments[2], title: "Übungsphase", text: template.tasks.join(" ") },
      { time: segments[3], title: "Ergebnisse sichern", text: "Erkenntnisse, offene Fragen und gegebenenfalls Rollenwechsel sammeln." },
      { time: segments[4], title: "Nachbesprechung", text: "Gemeinsam reflektieren und einen Punkt für die nächste Übung festhalten." }
    ],
    participantTasks: template.tasks,
    safety: [
      "Die verantwortliche Ausbilderin oder der verantwortliche Ausbilder prüft Ort, Material, Teilnehmende und Ablauf vorab.",
      "Nur freigegebene Übungsmittel einsetzen; keine reale Gefahrenlage oder Notruf-/Einsatzkommunikation nachstellen.",
      "Bei Unsicherheit, Gefahr, gesundheitlicher Beeinträchtigung oder auf Wunsch einer teilnehmenden Person sofort unterbrechen.",
      "Örtliche Regeln, Zuständigkeiten und notwendige Schutzmaßnahmen haben Vorrang."
    ],
    variants: [rerunDetails, "Als Planspiel durchführen oder – falls geeignet und freigegeben – Rollen beziehungsweise Beobachtungsaufträge wechseln."],
    debrief: ["Was hat bei der Zusammenarbeit gut funktioniert?", "Welche Information oder Unterstützung hätte noch geholfen?", "Was nehmen wir konkret in die nächste Übung mit?"],
    wishes: data.wishes.trim()
  };
}

function listHTML(items) {
  return items.length
    ? `<ul>${items.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul>`
    : "<p>Keine zusätzlichen Materialien angegeben.</p>";
}

function renderPlan(plan) {
  const stepsHTML = plan.steps.map((item, index) =>
    `<li class="plan-step"><strong>${startLabel(plan.steps, index)}–${escapeHTML(startLabel(plan.steps, index + 1))} Min.</strong> <b>${escapeHTML(item.title)}:</b> ${escapeHTML(item.text)}</li>`
  ).join("");
  const wishesHTML = plan.wishes
    ? `<section class="plan-section"><h3>Besondere Wünsche und Ergänzungen</h3><p>${escapeHTML(plan.wishes)}</p></section>`
    : "";
  planOutput.innerHTML = `
    <article id="printable-plan" class="plan-card">
      <p class="eyebrow">Übungsvorschlag aus dem Feuerwehr-Übungsplaner</p>
      <h2 class="plan-title">${escapeHTML(plan.title)}</h2>
      <p class="plan-meta">${escapeHTML(plan.location)} · ${escapeHTML(plan.duration)} Minuten · ${escapeHTML(plan.participants)} Teilnehmende</p>
      <div class="notice"><strong>Bitte vor der Durchführung prüfen</strong>Dieser Vorschlag muss von einer verantwortlichen Ausbilderin oder einem verantwortlichen Ausbilder geprüft und an die örtlichen Regeln angepasst werden. Er ist keine offizielle Vorgabe; geprüfte Quellen sind in dieser App nicht hinterlegt.</div>
      <section class="plan-section"><h3>Ausbildungsziel</h3><p>${escapeHTML(plan.objective)}</p></section>
      <section class="plan-section"><h3>Zielgruppe und angenommener Ausbildungsstand</h3><p>${escapeHTML(plan.audience)}. Die Gruppe bringt den von der Ausbildungsleitung eingeschätzten, für das Ziel passenden Ausbildungsstand mit; Kenntnisse werden nicht vorausgesetzt und sollen vorab geprüft werden.</p></section>
      <section class="plan-section"><h3>Ort und Dauer</h3><p>${escapeHTML(plan.location)} · insgesamt ${escapeHTML(plan.duration)} Minuten (einschließlich Nachbesprechung).</p></section>
      <section class="plan-section"><h3>Benötigtes Material</h3>${listHTML(plan.materials)}</section>
      <section class="plan-section"><h3>Ausbilderteam (${escapeHTML(plan.instructorCount)})</h3><ul>${plan.instructorDuties.map((duty) => `<li>${escapeHTML(duty)}</li>`).join("")}</ul></section>
      <section class="plan-section"><h3>Ausgangslage und Lagebeschreibung</h3><p>${escapeHTML(plan.situation)}</p></section>
      <section class="plan-section"><h3>Vorbereitung</h3><p>${escapeHTML(plan.preparation)}</p></section>
      <section class="plan-section"><h3>Ablauf mit Zeitangaben</h3><ol>${stepsHTML}</ol><p>Die Zeitangaben sind ein Vorschlag. Bei Bedarf anpassen, ohne Sicherheits- und Reflexionszeit zu streichen.</p></section>
      <section class="plan-section"><h3>Aufgaben für Teilnehmende</h3>${listHTML(plan.participantTasks)}</section>
      <section class="plan-section"><h3>Sicherheit und Abbruchkriterien</h3>${listHTML(plan.safety)}</section>
      <section class="plan-section"><h3>Varianten für Abwechslung</h3>${listHTML(plan.variants)}</section>
      <section class="plan-section"><h3>Kurze Nachbesprechung</h3>${listHTML(plan.debrief)}</section>
      ${wishesHTML}
      <div class="plan-actions no-print">
        <button class="button button-primary" type="button" id="favorite-button">Als Favorit speichern</button>
        <button class="button button-secondary" type="button" id="print-button">Drucken</button>
        <button class="button button-secondary" type="button" id="new-plan-button">Neue Übung planen</button>
      </div>
      <section class="rating-panel no-print" aria-label="Übung bewerten">
        <h3>Vorschlag bewerten</h3>
        <div class="rating-row" role="group" aria-label="Bewertung von 1 bis 5 Sternen">
          ${[1, 2, 3, 4, 5].map((rating) => `<button class="star-button" type="button" data-rating="${rating}" aria-label="${rating} von 5 Sternen" aria-pressed="false">★</button>`).join("")}
          <span class="rating-caption" id="rating-caption">Noch keine Bewertung</span>
        </div>
        <div class="field">
          <label for="rating-note">Kurze Notiz oder Rückmeldung (optional)</label>
          <textarea id="rating-note" rows="2" maxlength="500" placeholder="Was war hilfreich, was sollte angepasst werden?"></textarea>
        </div>
        <button class="button button-secondary" id="save-rating-button" type="button">Bewertung speichern</button>
        <p class="status-message" id="rating-status" aria-live="polite"></p>
      </section>
    </article>`;
  bindPlanButtons(plan);
}

function startLabel(planSteps, index) {
  if (index >= planSteps.length) return planSteps.reduce((sum, item) => sum + item.time, 0);
  return planSteps.slice(0, index).reduce((sum, item) => sum + item.time, 0);
}

function bindPlanButtons(plan) {
  const ratings = readStorage(STORAGE_KEYS.ratings, []);
  const previous = ratings.find((entry) => entry.id === plan.id);
  selectedRating = previous ? previous.rating : 0;
  if (previous) {
    document.querySelector("#rating-note").value = previous.note || "";
    updateStarButtons();
  }
  document.querySelector("#favorite-button").addEventListener("click", () => saveFavorite(plan));
  document.querySelector("#print-button").addEventListener("click", () => window.print());
  document.querySelector("#new-plan-button").addEventListener("click", resetForNewPlan);
  document.querySelectorAll(".star-button").forEach((button) => {
    button.addEventListener("click", () => {
      selectedRating = Number(button.dataset.rating);
      updateStarButtons();
    });
  });
  document.querySelector("#save-rating-button").addEventListener("click", () => saveRating(plan));
}

function updateStarButtons() {
  document.querySelectorAll(".star-button").forEach((button) => {
    const rating = Number(button.dataset.rating);
    button.setAttribute("aria-pressed", String(rating === selectedRating));
    button.textContent = rating <= selectedRating ? "★" : "☆";
  });
  document.querySelector("#rating-caption").textContent = selectedRating ? `${selectedRating} von 5 Sternen` : "Noch keine Bewertung";
}

function saveRating(plan) {
  const ratings = readStorage(STORAGE_KEYS.ratings, []);
  const entry = { id: plan.id, title: plan.title, rating: selectedRating, note: document.querySelector("#rating-note").value.trim(), updatedAt: new Date().toISOString() };
  const index = ratings.findIndex((item) => item.id === plan.id);
  if (index >= 0) ratings[index] = entry;
  else ratings.push(entry);
  if (!writeStorage(STORAGE_KEYS.ratings, ratings)) {
    document.querySelector("#rating-status").textContent = "Speichern nicht möglich. Bitte prüfe die Browser-Speichereinstellungen.";
    return;
  }
  const favorites = readStorage(STORAGE_KEYS.favorites, []);
  const favorite = favorites.find((item) => item.plan.id === plan.id);
  if (favorite) {
    favorite.rating = entry.rating;
    favorite.note = entry.note;
    writeStorage(STORAGE_KEYS.favorites, favorites);
  }
  document.querySelector("#rating-status").textContent = "Bewertung wurde in diesem Browser gespeichert.";
  renderFavorites();
}

function saveFavorite(plan) {
  const favorites = readStorage(STORAGE_KEYS.favorites, []);
  if (favorites.some((item) => item.plan.id === plan.id)) {
    document.querySelector("#favorite-button").textContent = "Bereits als Favorit gespeichert";
    return;
  }
  const rating = readStorage(STORAGE_KEYS.ratings, []).find((item) => item.id === plan.id);
  favorites.unshift({ plan, savedAt: new Date().toISOString(), rating: rating ? rating.rating : 0, note: rating ? rating.note : "" });
  if (!writeStorage(STORAGE_KEYS.favorites, favorites)) {
    document.querySelector("#favorite-button").textContent = "Speichern nicht möglich";
    return;
  }
  document.querySelector("#favorite-button").textContent = "Favorit gespeichert";
  renderFavorites();
}

function renderFavorites() {
  const favorites = readStorage(STORAGE_KEYS.favorites, []);
  if (!favorites.length) {
    favoriteList.innerHTML = '<div class="favorites-empty">Es sind noch keine Favoriten gespeichert. Erstelle einen Übungsvorschlag und wähle „Als Favorit speichern“.</div>';
    return;
  }
  favoriteList.innerHTML = favorites.map((favorite) => {
    const date = new Date(favorite.savedAt).toLocaleDateString("de-DE");
    const stars = favorite.rating ? `${"★".repeat(favorite.rating)}${"☆".repeat(5 - favorite.rating)} · ${favorite.rating}/5` : "Noch nicht bewertet";
    return `<article class="favorite-card">
      <div><h2>${escapeHTML(favorite.plan.title)}</h2><p>Gespeichert am ${escapeHTML(date)} · ${escapeHTML(favorite.plan.location)}</p><p class="favorite-rating">${escapeHTML(stars)}</p>${favorite.note ? `<p>Notiz: ${escapeHTML(favorite.note)}</p>` : ""}</div>
      <div class="favorite-actions"><button class="button button-secondary" type="button" data-open-favorite="${escapeHTML(favorite.plan.id)}">Ansehen</button><button class="button button-danger" type="button" data-delete-favorite="${escapeHTML(favorite.plan.id)}">Löschen</button></div>
    </article>`;
  }).join("");
  favoriteList.querySelectorAll("[data-open-favorite]").forEach((button) => {
    button.addEventListener("click", () => {
      const favorite = readStorage(STORAGE_KEYS.favorites, []).find((item) => item.plan.id === button.dataset.openFavorite);
      if (!favorite) return;
      currentPlan = favorite.plan;
      showView("planen");
      renderPlan(currentPlan);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
  favoriteList.querySelectorAll("[data-delete-favorite]").forEach((button) => {
    button.addEventListener("click", () => {
      const remaining = readStorage(STORAGE_KEYS.favorites, []).filter((item) => item.plan.id !== button.dataset.deleteFavorite);
      if (writeStorage(STORAGE_KEYS.favorites, remaining)) renderFavorites();
      else button.textContent = "Löschen nicht möglich";
    });
  });
}

function resetForNewPlan() {
  currentPlan = null;
  selectedRating = 0;
  form.reset();
  form.querySelectorAll("[aria-invalid]").forEach((field) => field.removeAttribute("aria-invalid"));
  form.querySelectorAll(".field-error").forEach((error) => { error.textContent = ""; });
  planOutput.innerHTML = "";
  setStep(0);
  document.querySelector("#materials").focus();
}

function showView(name) {
  document.querySelectorAll(".view").forEach((view) => { view.hidden = view.id !== `view-${name}`; });
  document.querySelectorAll(".nav-link").forEach((button) => {
    const active = button.dataset.view === name;
    button.classList.toggle("active", active);
    if (active) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });
  if (name === "gespeichert") renderFavorites();
}

document.querySelectorAll(".nav-link").forEach((button) => {
  button.addEventListener("click", () => showView(button.dataset.view));
});

form.querySelectorAll("input, textarea, select").forEach((field) => {
  field.addEventListener("input", () => {
    if (field.hasAttribute("aria-invalid")) showFieldError(field);
  });
  field.addEventListener("change", () => {
    if (field.hasAttribute("aria-invalid")) showFieldError(field);
  });
});

document.querySelector("#next-button").addEventListener("click", () => {
  if (validateStep(currentStep)) {
    setStep(currentStep + 1);
    steps[currentStep].querySelector("input, textarea, select")?.focus();
  }
});

document.querySelector("#back-button").addEventListener("click", () => {
  setStep(currentStep - 1);
  steps[currentStep].querySelector("input, textarea, select")?.focus();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!validateStep(currentStep)) return;
  const data = formValues();
  currentPlan = makePlan(data);
  const recent = readStorage(STORAGE_KEYS.recent, []);
  const updatedRecent = [currentPlan.templateId, ...recent].slice(0, 5);
  writeStorage(STORAGE_KEYS.recent, updatedRecent);
  renderPlan(currentPlan);
  planOutput.scrollIntoView({ behavior: "smooth", block: "start" });
});

setStep(0);
renderFavorites();

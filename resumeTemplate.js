// resumeTemplates.js

const templates = [
  { id: 1, title: "Modern Blue", category: "Free", url: "templates/modern-blue.pdf" },
  { id: 2, title: "Creative Grid", category: "Premium", url: "templates/creative-grid.pdf" },
  { id: 3, title: "Professional Edge", category: "Free", url: "templates/professional-edge.pdf" },
  { id: 4, title: "Minimal Bold", category: "Premium", url: "templates/minimal-bold.pdf" }
];

function renderTemplates(user = null) {
  const container = document.getElementById("templateGrid");
  if (!container) return;

  container.innerHTML = "";

  templates.forEach(template => {
    const isLocked = template.category === "Premium" && !user;

    const card = document.createElement("div");
    card.className = "template-card";

    card.innerHTML = `
      <div class="template-header">
        <h4>${template.title}</h4>
        <span class="${template.category.toLowerCase()}-badge">${template.category}</span>
      </div>
      <div class="template-actions">
        ${
          isLocked
            ? `<button class="locked"><i class="fas fa-lock"></i> Login to Access</button>`
            : `
              <button class="preview-btn" data-url="${template.url}">
                <i class="fas fa-eye"></i> Preview
              </button>
              <a href="${template.url}" download class="download-btn">
                <i class="fas fa-download"></i> Download
              </a>
            `
        }
      </div>
    `;

    if (isLocked) {
      const loginModal = document.getElementById("loginModal");
      const lockBtn = card.querySelector(".locked");
      lockBtn.addEventListener("click", () => {
        if (loginModal) loginModal.style.display = "block";
      });
    } else {
      const previewBtn = card.querySelector(".preview-btn");
      previewBtn.addEventListener("click", () => {
        window.open(template.url, "_blank");
      });
    }

    container.appendChild(card);
  });
}

// Init on load
document.addEventListener("DOMContentLoaded", () => {
  if (window.auth && typeof auth.onAuthStateChanged === "function") {
    auth.onAuthStateChanged(user => renderTemplates(user));
  } else {
    renderTemplates(null);
  }
});

// resumeTemplates.js
const templates = [
  { id: 1, title: "Modern Blue", category: "Free", url: "templates/modern-blue.pdf" },
  { id: 2, title: "Creative Grid", category: "Premium", url: "templates/creative-grid.pdf" },
  { id: 3, title: "Professional Edge", category: "Free", url: "templates/professional-edge.pdf" },
  { id: 4, title: "Minimal Bold", category: "Premium", url: "templates/minimal-bold.pdf" }
];

const container = document.getElementById("templateGrid");
const loginModal = document.getElementById("loginModal");

function renderTemplates(user = null) {
  container.innerHTML = "";
  templates.forEach(template => {
    const locked = template.category === "Premium" && !user;

    const card = document.createElement("div");
    card.className = "template-card";

    card.innerHTML = `
      <div class="template-header">
        <h4>${template.title}</h4>
        <span class="${template.category.toLowerCase()}-badge">${template.category}</span>
      </div>
      <div class="template-actions">
        ${
          locked
            ? `<button class="locked"><i class="fas fa-lock"></i> Login to Access</button>`
            : `
            <button class="preview-btn" data-url="${template.url}"><i class="fas fa-eye"></i> Preview</button>
            <a href="${template.url}" download class="download-btn"><i class="fas fa-download"></i> Download</a>
          `
        }
      </div>
    `;

    // Add click event to preview button if not locked
    if (!locked) {
      const previewBtn = card.querySelector(".preview-btn");
      previewBtn.addEventListener("click", () => {
        window.open(template.url, "_blank");
      });
    } else {
      card.querySelector(".locked").addEventListener("click", () => {
        loginModal.style.display = "block";
      });
    }

    container.appendChild(card);
  });
}

// Load based on Firebase user status if available
window.onload = () => {
  if (window.auth) {
    auth.onAuthStateChanged(user => renderTemplates(user));
  } else {
    renderTemplates(null);
  }
};

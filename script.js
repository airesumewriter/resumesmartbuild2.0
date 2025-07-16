// === Sidebar Menu ===
const menuBtn = document.getElementById("menuBtn");
const sidebarNav = document.getElementById("sidebarNav");
menuBtn.addEventListener("click", () => {
  sidebarNav.classList.toggle("show");
});

// === Get Started Modal ===
const getStartedBtn = document.getElementById("getStartedModalBtn");
const signupPopup = document.getElementById("signupPopup");
const closeSignup = document.getElementById("closeSignup");

getStartedBtn.addEventListener("click", () => {
  signupPopup.style.display = "flex";
});

closeSignup.addEventListener("click", () => {
  signupPopup.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === signupPopup) {
    signupPopup.style.display = "none";
  }
});

// === Collapsible Tools ===
document.querySelectorAll(".toggle-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetId = btn.getAttribute("data-target");
    const content = document.getElementById(targetId);
    content.style.display = content.style.display === "block" ? "none" : "block";
  });
});

// === ATS Resume Scanner Logic ===
document.getElementById("atsForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const fileInput = document.getElementById("resumeFile");
  const resultDiv = document.getElementById("atsResult");

  if (!fileInput.files.length) {
    resultDiv.innerHTML = "⚠️ Please upload a resume first.";
    return;
  }

  resultDiv.innerHTML = "🔍 Scanning your resume for ATS compatibility...";
  setTimeout(() => {
    resultDiv.innerHTML = `✅ Your resume is 78% ATS-compatible.<br>
      📌 Tip: Use more job-related keywords.<br>
      💡 Consider reformatting headers for better parsing.`;
  }, 2000);
});

// === Inject Resume Templates ===
import { resumeTemplates } from "./resumeTemplates.js";
const templateGrid = document.getElementById("templateGrid");
resumeTemplates.forEach((template) => {
  const card = document.createElement("div");
  card.className = "template-card";
  card.innerHTML = `
    <h4>${template.title}</h4>
    <span class="${template.type === 'Free' ? 'free-badge' : 'premium-badge'}">${template.type}</span>
    <p>${template.description}</p>
    <div class="template-actions">
      <button class="preview-btn">Preview</button>
      <button class="${template.type === 'Free' ? 'download-btn' : 'locked'}">${template.type === 'Free' ? 'Download' : 'Locked'}</button>
    </div>
  `;
  templateGrid.appendChild(card);
});

// === Inject Articles Thumbnails ===
import { articles } from "./articles.js";
const articleThumbs = document.querySelector(".article-thumbs");
articles.forEach((article) => {
  const card = document.createElement("div");
  card.className = "article-card";
  card.innerHTML = `
    <h4>${article.title}</h4>
    <p>${article.description}</p>
  `;
  articleThumbs.appendChild(card);
});

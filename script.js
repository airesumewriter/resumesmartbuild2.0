// Sidebar toggle
const menuBtn = document.getElementById('menuBtn');
const sidebarNav = document.getElementById('sidebarNav');
menuBtn.addEventListener('click', () => {
  sidebarNav.classList.toggle('show');
});

// Modal open/close
const modal = document.getElementById("getStartedModal");
const openModalBtn = document.getElementById("getStartedModalBtn");
const closeModalBtn = document.getElementById("closeModal");

openModalBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});
closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});
window.addEventListener("click", (event) => {
  if (event.target === modal) modal.style.display = "none";
});

// ScrollReveal animation
ScrollReveal().reveal('.tool-card, .article-card', {
  delay: 200,
  distance: '30px',
  origin: 'bottom',
  interval: 100,
  duration: 600,
});

// Collapse toggle logic
document.querySelectorAll(".toggle-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetId = btn.getAttribute("data-target");
    const content = document.getElementById(targetId);
    content.style.display = content.style.display === "block" ? "none" : "block";
  });
});

// ATS Scanner logic (simulate for now)
document.getElementById("atsForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const fileInput = document.getElementById("resumeFile");
  const resultDiv = document.getElementById("atsResult");

  if (!fileInput.files.length) {
    resultDiv.innerHTML = "⚠️ Please upload a resume first.";
    return;
  }

  // Simulate scanning
  resultDiv.innerHTML = "🔍 Scanning your resume for ATS compatibility...";
  
  setTimeout(() => {
    resultDiv.innerHTML = `
      ✅ Your resume is 78% ATS-compatible.<br>
      📌 Tip: Use more job-related keywords.<br>
      💡 Consider reformatting headers for better parsing.
    `;
  }, 2000);
});
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  appId: "YOUR_APP_ID",
};
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

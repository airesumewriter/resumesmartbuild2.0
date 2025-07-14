// Toggle mobile nav
const menuBtn = document.getElementById('menuBtn');
const sidebarNav = document.getElementById('sidebarNav');

menuBtn.addEventListener('click', () => {
  sidebarNav.classList.toggle('show');
});

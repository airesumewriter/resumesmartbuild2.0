// Firebase SDK imports import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js"; import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

// Your Firebase Project Config const firebaseConfig = { apiKey: "AIzaSyCpLscgzlbaIz6vwLZxrNg8s0IUpS-ls3s", authDomain: "resumesmartbuild.firebaseapp.com", projectId: "resumesmartbuild", storageBucket: "resumesmartbuild.firebasestorage.app", messagingSenderId: "190620294122", appId: "1:190620294122:web:9a93a5763ddcf3e1c63093", measurementId: "G-HSTPGPKLPE" };

// Initialize Firebase const app = initializeApp(firebaseConfig); const auth = getAuth(app);

// Sidebar toggle const menuBtn = document.getElementById('menuBtn'); const sidebarNav = document.getElementById('sidebarNav'); menuBtn.addEventListener('click', () => { sidebarNav.classList.toggle('show'); });

// Modal open/close for Get Started const modal = document.getElementById("getStartedModal"); const openModalBtn = document.getElementById("getStartedModalBtn"); const closeModalBtn = document.getElementById("closeModal");

openModalBtn.addEventListener("click", () => { modal.style.display = "flex"; }); closeModalBtn.addEventListener("click", () => { modal.style.display = "none"; }); window.addEventListener("click", (event) => { if (event.target === modal) modal.style.display = "none"; });

// ScrollReveal animation ScrollReveal().reveal('.tool-card, .article-card', { delay: 200, distance: '30px', origin: 'bottom', interval: 100, duration: 600, });

// Collapse toggle logic document.querySelectorAll(".toggle-btn").forEach((btn) => { btn.addEventListener("click", () => { const targetId = btn.getAttribute("data-target"); const content = document.getElementById(targetId); content.style.display = content.style.display === "block" ? "none" : "block"; }); });

// ATS Scanner logic (simulate for now) document.getElementById("atsForm").addEventListener("submit", function (e) { e.preventDefault();

const fileInput = document.getElementById("resumeFile"); const resultDiv = document.getElementById("atsResult");

if (!fileInput.files.length) { resultDiv.innerHTML = "⚠️ Please upload a resume first."; return; }

// Simulate scanning resultDiv.innerHTML = "🔍 Scanning your resume for ATS compatibility...";

setTimeout(() => { resultDiv.innerHTML = ✅ Your resume is 78% ATS-compatible.<br> 📌 Tip: Use more job-related keywords.<br> 💡 Consider reformatting headers for better parsing.; }, 2000); });

// Modal logic for Login const loginModal = document.getElementById("loginModal"); const closeLoginModal = document.querySelector(".close");

document.querySelectorAll(".login-btn").forEach(btn => { btn.addEventListener("click", () => loginModal.style.display = "block"); }); closeLoginModal.onclick = () => (loginModal.style.display = "none"); window.onclick = e => { if (e.target == loginModal) loginModal.style.display = "none"; };

// Firebase Auth Login document.getElementById("emailLoginBtn").onclick = () => { const email = document.getElementById("emailInput").value; signInWithEmailAndPassword(auth, email, "defaultpassword") .then(user => { alert("Signed in successfully!"); loginModal.style.display = "none"; }) .catch(() => alert("Use Google sign-in or a valid email.")); };

document.getElementById("googleLoginBtn").onclick = () => { const provider = new GoogleAuthProvider(); signInWithPopup(auth, provider) .then(result => { alert("Welcome, " + result.user.displayName); loginModal.style.display = "none"; }) .catch(error => console.error("Google Login Error:", error)); };

const signupPopup = document.getElementById("signupPopup");
const getStartedBtn = document.getElementById("getStartedModalBtn");
const closeSignup = document.getElementById("closeSignup");

getStartedBtn.addEventListener("click", () => {
  signupPopup.style.display = "flex";
});

closeSignup.addEventListener("click", () => {
  signupPopup.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === signupPopup) {
    signupPopup.style.display = "none";
  }
});

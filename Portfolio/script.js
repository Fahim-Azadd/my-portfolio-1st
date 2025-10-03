/**
 * =========================================================
 * MD. FAHIM AZAD — Portfolio
 * File: script.js
 * Responsibilities:
 *  - Theme toggle (persisted to localStorage)
 *  - Typewriter effect for hero subtitle
 *  - Back-to-top button visibility/behavior
 *  - Project search (client-side filter)
 * =========================================================
 */

// ---------------------- Year ----------------------
document.getElementById('year').textContent = new Date().getFullYear();

// ------------------- Theme toggle -----------------
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  document.documentElement.setAttribute('data-bs-theme', savedTheme);
  themeToggle.innerHTML = savedTheme === 'dark'
    ? '<i class="bi bi-sun"></i> <span class="d-none d-sm-inline">Theme</span>'
    : '<i class="bi bi-moon-stars"></i> <span class="d-none d-sm-inline">Theme</span>';
}
themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-bs-theme') || 'light';
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-bs-theme', next);
  localStorage.setItem('theme', next);
  themeToggle.innerHTML = next === 'dark'
    ? '<i class="bi bi-sun"></i> <span class="d-none d-sm-inline">Theme</span>'
    : '<i class="bi bi-moon-stars"></i> <span class="d-none d-sm-inline">Theme</span>';
});

// --------------- Typewriter effect ----------------
const words = ['Web Developer','Problem Solver','Open-Source Contributor','Lifelong Learner'];
let w = 0, c = 0, del = false;
function type(){
  const el = document.getElementById('typewriter');
  if (!el) return;
  const word = words[w];
  el.textContent = word.substring(0, c);
  if (!del && c < word.length) { c++; }
  else if (del && c > 0) { c--; }
  else if (!del && c === word.length) { del = true; setTimeout(type, 850); return; }
  else { del = false; w = (w + 1) % words.length; }
  setTimeout(type, del ? 50 : 90);
}
type();

// --------------- Back-to-top FAB ------------------
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 320) { toTop.classList.add('show'); }
  else { toTop.classList.remove('show'); }
});
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ---------------- Project search ------------------
const search = document.getElementById('projectSearch');
if (search){
  const cards = Array.from(document.querySelectorAll('#projectGrid .project-card'));
  search.addEventListener('input', (e)=>{
    const q = e.target.value.toLowerCase().trim();
    cards.forEach(card => {
      const text = (card.innerText || '').toLowerCase() + ' ' + (card.dataset.tags || '');
      card.style.display = text.includes(q) ? '' : 'none';
    });
  });
}

// ----------- Contact form validation --------------
(function(){
  const form = document.getElementById('contactForm');
  if(!form) return;
  form.addEventListener('submit', function(e){
    e.preventDefault();
    if(!form.checkValidity()){
      e.stopPropagation();
    } else {
      alert("Thanks! I’ll get back to you soon.");
      form.reset();
    }
    form.classList.add('was-validated');
  });
})();

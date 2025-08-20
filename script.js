// Sticky nav: mobile toggle
const menuToggle = document.getElementById('menuToggle');
const menu = document.getElementById('menu');
menuToggle.addEventListener('click', () => {
  const show = menu.classList.toggle('show');
  menuToggle.setAttribute('aria-expanded', show ? 'true' : 'false');
});

// Smooth close menu on navigation (mobile)
document.querySelectorAll('#menu a').forEach(a => {
  a.addEventListener('click', () => menu.classList.remove('show'));
});

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, { rootMargin: '-80px' });
revealEls.forEach(el => io.observe(el));

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Gallery filter
const grid = document.getElementById('grid');
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    grid.querySelectorAll('.grid-item').forEach(item => {
      item.style.display = (cat === 'all' || item.dataset.cat === cat) ? '' : 'none';
    });
  });
});

// Lightbox
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lightboxImg');
const lbClose = document.querySelector('.lightbox-close');
const lbPrev = document.querySelector('.lightbox-prev');
const lbNext = document.querySelector('.lightbox-next');
let currentIndex = -1;
let currentList = [];

function openLightbox(index) {
  currentIndex = index;
  lbImg.src = currentList[currentIndex].querySelector('img').src;
  lb.classList.add('show');
  lb.setAttribute('aria-hidden','false');
}
function closeLightbox() {
  lb.classList.remove('show');
  lb.setAttribute('aria-hidden','true');
}
function stepLightbox(dir) {
  if (!currentList.length) return;
  currentIndex = (currentIndex + dir + currentList.length) % currentList.length;
  lbImg.src = currentList[currentIndex].querySelector('img').src;
}

const items = Array.from(document.querySelectorAll('.grid-item'));
currentList = items;
items.forEach((item, idx) => item.addEventListener('click', () => openLightbox(idx)));
lbClose.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', () => stepLightbox(-1));
lbNext.addEventListener('click', () => stepLightbox(1));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') stepLightbox(1);
  if (e.key === 'ArrowLeft') stepLightbox(-1);
});
lb.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });

// Testimonials carousel
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const dots = document.querySelector('.dots');
let slideIndex = 0;
let autoTimer = null;

function updateCarousel() {
  track.style.transform = `translateX(-${slideIndex * 100}%)`;
  dots.querySelectorAll('button').forEach((d, i) => d.classList.toggle('active', i === slideIndex));
}
function go(dir) {
  slideIndex = (slideIndex + dir + slides.length) % slides.length;
  updateCarousel();
}
prevBtn.addEventListener('click', () => { go(-1); resetAuto(); });
nextBtn.addEventListener('click', () => { go(1); resetAuto(); });

// Build dots
slides.forEach((_, i) => {
  const d = document.createElement('button');
  d.addEventListener('click', () => { slideIndex = i; updateCarousel(); resetAuto(); });
  dots.appendChild(d);
});
updateCarousel();

// Auto-play
function startAuto(){ autoTimer = setInterval(() => go(1), 5000); }
function resetAuto(){ clearInterval(autoTimer); startAuto(); }
startAuto();

// Simple contact form handler (no backend): show a message and clear fields
const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  formMsg.textContent = `Obrigado, ${data.nome}! Em breve entrarei em contato.`;
  form.reset();
});
// Accordion para eventos
document.querySelectorAll(".event-toggle").forEach(button => {
  button.addEventListener("click", () => {
    const content = button.nextElementSibling;

    // fecha todos os outros
    document.querySelectorAll(".event-content").forEach(c => {
      if (c !== content) {
        c.style.display = "none";
      }
    });

    // alterna o atual
    content.style.display = content.style.display === "block" ? "none" : "block";
  });
});


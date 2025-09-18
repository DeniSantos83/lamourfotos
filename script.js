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

document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });
});
document.addEventListener('DOMContentLoaded', () => {
    // 1. Animação de Entrada
    const introAnimation = document.getElementById('intro-animation');
    const cameraIcon = document.querySelector('.camera-icon');
    const siteContent = document.getElementById('site-content');
    const clickText = document.querySelector('.click-text'); // <<< pega o texto

    cameraIcon.addEventListener('click', () => {
        cameraIcon.classList.add('clicked');
        clickText.classList.add('fade-out'); // <<< aplica a transição
        setTimeout(() => {
            introAnimation.style.opacity = '0';
            siteContent.style.opacity = '1';
            setTimeout(() => {
                introAnimation.style.display = 'none';
            }, 1000); // Garante que a animação termine antes de esconder
        }, 500);
        // ================= Dark / Light Mode =================
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  themeToggle.textContent = document.body.classList.contains('light') ? "🌞" : "🌙";
});

// ================= Ativar AOS (scroll animations) =================
AOS.init({
  duration: 1000,
  once: true
});

    });

    // 2. Galeria de Fotos
    const galleryGrid = document.getElementById('gallery-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Array de 21 fotos de exemplo. Substitua os src pelas suas imagens.
    const photos = [
        { thumb: 'https://via.placeholder.com/250/b0b0b0?text=Casamento+1', original: 'https://via.placeholder.com/1200x800/b0b0b0?text=Casamento+Original+1', category: 'casamento' },
        { thumb: 'https://via.placeholder.com/250/a0a0a0?text=Casamento+2', original: 'https://via.placeholder.com/1200x800/a0a0a0?text=Casamento+Original+2', category: 'casamento' },
        { thumb: 'https://via.placeholder.com/250/c0c0c0?text=Casamento+3', original: 'https://via.placeholder.com/1200x800/c0c0c0?text=Casamento+Original+3', category: 'casamento' },
        { thumb: 'https://via.placeholder.com/250/d0d0d0?text=Aniversario+1', original: 'https://via.placeholder.com/1200x800/d0d0d0?text=Aniversario+Original+1', category: 'aniversarios' },
        { thumb: 'https://via.placeholder.com/250/e0e0e0?text=Aniversario+2', original: 'https://via.placeholder.com/1200x800/e0e0e0?text=Aniversario+Original+2', category: 'aniversarios' },
        { thumb: 'https://via.placeholder.com/250/f0f0f0?text=Aniversario+3', original: 'https://via.placeholder.com/1200x800/f0f0f0?text=Aniversario+Original+3', category: 'aniversarios' },
        { thumb: 'https://via.placeholder.com/250/909090?text=Formatura+1', original: 'https://via.placeholder.com/1200x800/909090?text=Formatura+Original+1', category: 'formaturas' },
        { thumb: 'https://via.placeholder.com/250/808080?text=Formatura+2', original: 'https://via.placeholder.com/1200x800/808080?text=Formatura+Original+2', category: 'formaturas' },
        { thumb: 'https://via.placeholder.com/250/707070?text=Formatura+3', original: 'https://via.placeholder.com/1200x800/707070?text=Formatura+Original+3', category: 'formaturas' },
        { thumb: 'https://via.placeholder.com/250/b1b1b1?text=Batizado+1', original: 'https://via.placeholder.com/1200x800/b1b1b1?text=Batizado+Original+1', category: 'batizados' },
        { thumb: 'https://via.placeholder.com/250/c1c1c1?text=Batizado+2', original: 'https://via.placeholder.com/1200x800/c1c1c1?text=Batizado+Original+2', category: 'batizados' },
        { thumb: 'https://via.placeholder.com/250/d1d1d1?text=Batizado+3', original: 'https://via.placeholder.com/1200x800/d1d1d1?text=Batizado+Original+3', category: 'batizados' },
        { thumb: 'https://via.placeholder.com/250/e1e1e1?text=Corporativo+1', original: 'https://via.placeholder.com/1200x800/e1e1e1?text=Corporativo+Original+1', category: 'corporativos' },
        { thumb: 'https://via.placeholder.com/250/f1f1f1?text=Corporativo+2', original: 'https://via.placeholder.com/1200x800/f1f1f1?text=Corporativo+Original+2', category: 'corporativos' },
        { thumb: 'https://via.placeholder.com/250/919191?text=Corporativo+3', original: 'https://via.placeholder.com/1200x800/919191?text=Corporativo+Original+3', category: 'corporativos' },
        { thumb: 'https://via.placeholder.com/250/818181?text=15+Anos+1', original: 'https://via.placeholder.com/1200x800/818181?text=15+Anos+Original+1', category: 'quinze-anos' },
        { thumb: 'https://via.placeholder.com/250/717171?text=15+Anos+2', original: 'https://via.placeholder.com/1200x800/717171?text=15+Anos+Original+2', category: 'quinze-anos' },
        { thumb: 'https://via.placeholder.com/250/b2b2b2?text=15+Anos+3', original: 'https://via.placeholder.com/1200x800/b2b2b2?text=15+Anos+Original+3', category: 'quinze-anos' },
        { thumb: 'https://via.placeholder.com/250/c2c2c2?text=Festa+Infantil+1', original: 'https://via.placeholder.com/1200x800/c2c2c2?text=Festa+Infantil+Original+1', category: 'festas-infantis' },
        { thumb: 'https://via.placeholder.com/250/d2d2d2?text=Festa+Infantil+2', original: 'https://via.placeholder.com/1200x800/d2d2d2?text=Festa+Infantil+Original+2', category: 'festas-infantis' },
        { thumb: 'https://via.placeholder.com/250/e2e2e2?text=Festa+Infantil+3', original: 'https://via.placeholder.com/1200x800/e2e2e2?text=Festa+Infantil+Original+3', category: 'festas-infantis' },
    ];

    function renderGallery(category) {
        galleryGrid.innerHTML = '';
        const filteredPhotos = category === 'all' ? photos : photos.filter(p => p.category === category);
        
        filteredPhotos.forEach(photo => {
            const galleryItem = document.createElement('div');
            galleryItem.classList.add('gallery-item');
            galleryItem.innerHTML = `<img src="${photo.thumb}" data-original="${photo.original}" alt="Foto de ${photo.category}">`;
            galleryGrid.appendChild(galleryItem);
        });

        setupGalleryModal();
    }

    function setupGalleryModal() {
        const galleryItems = document.querySelectorAll('.gallery-item img');
        
        galleryItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const originalSrc = e.target.dataset.original;
                const modal = document.createElement('div');
                modal.classList.add('modal');
                modal.innerHTML = `<span class="close-btn">&times;</span><img src="${originalSrc}" alt="Foto original">`;
                document.body.appendChild(modal);

                modal.addEventListener('click', (e) => {
                    if (e.target.classList.contains('modal') || e.target.classList.contains('close-btn')) {
                        modal.remove();
                    }
                });
            });
        });
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderGallery(e.target.dataset.category);
        });
    });

    renderGallery('all'); // Renderiza a galeria inicial

    // 3. Carrossel de Depoimentos
    const depoimentos = [
        { foto: 'https://via.placeholder.com/100x100?text=Ana', nome: 'Ana Santos', texto: 'A Fernanda é incrível! Ela capturou a essência do nosso casamento de uma forma que superou todas as expectativas. As fotos ficaram maravilhosas!' },
        { foto: 'https://via.placeholder.com/100x100?text=João', nome: 'João Pereira', texto: 'Contratamos para o aniversário da nossa filha e amamos o resultado. Ela conseguiu registrar a alegria e a diversão de cada momento.' },
        { foto: 'https://via.placeholder.com/100x100?text=Carla', nome: 'Carla Oliveira', texto: 'O ensaio corporativo foi excelente. A Fernanda me deixou super à vontade e as fotos transmitiram exatamente a imagem profissional que eu queria.' },
        { foto: 'https://via.placeholder.com/100x100?text=Pedro', nome: 'Pedro Lima', texto: 'As fotos do batizado do nosso filho ficaram tão delicadas e emocionantes. Um trabalho com muito carinho e sensibilidade.' },
        { foto: 'https://via.placeholder.com/100x100?text=Maria', nome: 'Maria Souza', texto: 'A cobertura da minha formatura foi perfeita! A Fernanda foi super atenciosa e garantiu que eu tivesse fotos incríveis da minha conquista.' },
    ];

    const carouselTrack = document.querySelector('.carousel-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;

    function renderDepoimentos() {
        carouselTrack.innerHTML = '';
        depoimentos.forEach(depoimento => {
            const depoimentoDiv = document.createElement('div');
            depoimentoDiv.classList.add('depoimento');
            depoimentoDiv.innerHTML = `
                <img src="${depoimento.foto}" alt="Foto de ${depoimento.nome}">
                <p>"${depoimento.texto}"</p>
                <h4>- ${depoimento.nome}</h4>
            `;
            carouselTrack.appendChild(depoimentoDiv);
        });
        updateCarousel();
    }

    function updateCarousel() {
        const offset = -currentIndex * 100;
        carouselTrack.style.transform = `translateX(${offset}%)`;
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : depoimentos.length - 1;
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < depoimentos.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    });
    
    renderDepoimentos();

    // 4. Accordion de Eventos
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            header.classList.toggle('active');
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
        });
    });

    // 5. Formulário de Contato
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Formulário enviado com sucesso!'); // Ação de envio do formulário, pode ser substituída por uma requisição AJAX.
        contactForm.reset();
    });
});
// Lista de depoimentos pendentes
let pendingTestimonials = [];

// Avatares de acordo com login
const avatars = {
  google: "assets/google-avatar.png",
  facebook: "assets/facebook-avatar.png",
  instagram: "assets/instagram-avatar.png"
};

const testimonialForm = document.getElementById('testimonialForm');
const testimonialName = document.getElementById('testimonialName');
const testimonialMessage = document.getElementById('testimonialMessage');
const testimonialLogin = document.getElementById('testimonialLogin');
const testimonialMsg = document.getElementById('testimonialMsg');

testimonialForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const newTestimonial = {
    nome: testimonialName.value,
    mensagem: testimonialMessage.value,
    rede: testimonialLogin.value,
    foto: avatars[testimonialLogin.value] || "assets/cliente1.jpg",
    aprovado: false
  };

  pendingTestimonials.push(newTestimonial);

  testimonialMsg.textContent = "Seu depoimento foi enviado e aguarda aprovação!";
  testimonialForm.reset();

  console.log("📝 Pendentes:", pendingTestimonials);
});

// Função para aprovar manualmente
function approveTestimonial(index) {
  if (pendingTestimonials[index]) {
    const depoimento = pendingTestimonials[index];
    depoimento.aprovado = true;

    const track = document.querySelector('.carousel-track');
    const article = document.createElement('article');
    article.classList.add('testimonial');
    article.innerHTML = `
      <img src="${depoimento.foto}" alt="${depoimento.nome}" class="avatar" />
      <blockquote>“${depoimento.mensagem}”</blockquote>
      <p class="author">${depoimento.nome}</p>
    `;
    track.appendChild(article);

    pendingTestimonials.splice(index, 1);

    console.log(`✅ Depoimento de ${depoimento.nome} aprovado!`);
  }
}

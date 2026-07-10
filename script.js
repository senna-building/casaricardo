const planData = {
  '01': { src: 'assets/plans/arq-01.webp', code: 'ARQ — 01', text: 'Leitura do imóvel existente e das zonas de intervenção propostas.', alt: 'Planta do existente e alterações da Casa Ricardo' },
  '02': { src: 'assets/plans/arq-02.webp', code: 'ARQ — 02', text: 'Proposta de layout com organização funcional e implantação do mobiliário.', alt: 'Proposta de layout da Casa Ricardo' },
  '03': { src: 'assets/plans/arq-03.webp', code: 'ARQ — 03', text: 'Estratégia preliminar de materiais, pavimentos e iluminação arquitetónica.', alt: 'Planta de materiais e iluminação da Casa Ricardo' }
};

const planButtons = document.querySelectorAll('.plan-control button');
const planImage = document.getElementById('planImage');
const planCode = document.getElementById('planCode');
const planDescription = document.getElementById('planDescription');
const modal = document.querySelector('.plan-modal');
const modalImage = modal.querySelector('img');

function setPlan(id) {
  const item = planData[id];
  if (!item) return;
  planImage.classList.add('switching');
  window.setTimeout(() => {
    planImage.src = item.src;
    planImage.alt = item.alt;
    modalImage.src = item.src;
    modalImage.alt = item.alt + ' ampliada';
    planCode.textContent = item.code;
    planDescription.textContent = item.text;
    planImage.classList.remove('switching');
  }, 120);
  planButtons.forEach(btn => {
    const active = btn.dataset.plan === id;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-selected', active ? 'true' : 'false');
  });
}
planButtons.forEach(btn => btn.addEventListener('click', () => setPlan(btn.dataset.plan)));

document.querySelector('.plan-expand').addEventListener('click', () => modal.showModal());
document.querySelector('.modal-close').addEventListener('click', () => modal.close());
modal.addEventListener('click', event => { if (event.target === modal) modal.close(); });

document.querySelectorAll('.experience button').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.closest('.experience');
    const open = item.classList.contains('open');
    document.querySelectorAll('.experience').forEach(x => x.classList.remove('open'));
    if (!open) item.classList.add('open');
  });
});

const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px' });
reveals.forEach(el => revealObserver.observe(el));

const progress = document.querySelector('.scroll-progress span');
const chapterLinks = document.querySelectorAll('.chapter-nav a');
const sections = [...chapterLinks].map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
function onScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (max > 0 ? window.scrollY / max * 100 : 0) + '%';
  let active = 0;
  sections.forEach((section, i) => { if (section.getBoundingClientRect().top <= window.innerHeight * .45) active = i; });
  chapterLinks.forEach((link, i) => link.classList.toggle('active', i === active));
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const menuButton = document.querySelector('.menu-button');
const mobileNav = document.querySelector('.mobile-nav');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  mobileNav.classList.toggle('open', !open);
  mobileNav.setAttribute('aria-hidden', String(open));
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  mobileNav.classList.remove('open');
  mobileNav.setAttribute('aria-hidden', 'true');
}));

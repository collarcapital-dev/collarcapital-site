const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const mobileMenu = document.querySelector('[data-mobile-menu]');
const navLinks = [...document.querySelectorAll('.desktop-nav a, .mobile-menu a[href^="#"]')];
const sections = [...document.querySelectorAll('main section[id]')];
const toast = document.querySelector('[data-toast]');
let toastTimer;

function updateHeader() {
  header?.classList.toggle('is-scrolled', window.scrollY > 28);
}

function closeMenu() {
  menuToggle?.setAttribute('aria-expanded', 'false');
  menuToggle?.setAttribute('aria-label', 'Abrir menu');
  mobileMenu?.classList.remove('is-open');
  document.body.classList.remove('menu-open');
}

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
  mobileMenu?.classList.toggle('is-open', !isOpen);
  document.body.classList.toggle('menu-open', !isOpen);
});

navLinks.forEach((link) => link.addEventListener('click', closeMenu));
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
  });
}, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      const target = link.getAttribute('href')?.slice(1);
      link.classList.toggle('active', target === entry.target.id);
    });
  });
}, { rootMargin: '-38% 0px -55% 0px', threshold: 0 });

sections.forEach((section) => sectionObserver.observe(section));

document.querySelectorAll('[data-client-link]').forEach((button) => {
  button.addEventListener('click', () => {
    clearTimeout(toastTimer);
    toast?.classList.add('show');
    toastTimer = setTimeout(() => toast?.classList.remove('show'), 2800);
    closeMenu();
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

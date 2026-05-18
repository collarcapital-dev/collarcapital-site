// ── Cursor
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  function bindCursorHover(root = document) {
    root.querySelectorAll('a, button, input, .service-card, .location-card, .team-card, .team-tab').forEach(el => {
      if (el.dataset.cursorBound) return;
      el.dataset.cursorBound = 'true';

      el.addEventListener('mouseenter', () => {
        cursor.style.width  = '20px';
        cursor.style.height = '20px';
        ring.style.width    = '60px';
        ring.style.height   = '60px';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.width  = '12px';
        cursor.style.height = '12px';
        ring.style.width    = '40px';
        ring.style.height   = '40px';
      });
    });
  }

  bindCursorHover();

  // ── Team location tabs
  const teamTabs = Array.from(document.querySelectorAll('.team-tab'));
  const teamGrid = document.querySelector('[data-team-grid]');
  const teamByLocation = {
    'sao-paulo': {
      label: 'São Paulo',
      groups: [
        [
          { name: 'Paulo Casimiro', role: 'CEO', image: 'images/cards/saopaulo/paulocasimiro.JPG' },
          { name: 'Dante Sena', role: 'CEO', image: 'images/cards/saopaulo/dante.jpeg' },
          { name: 'Guilherme Marques', role: 'Sócio', image: 'images/cards/saopaulo/guimarques.jpeg' },
          { name: 'Otílio Neto', role: 'Sócio', image: 'images/cards/saopaulo/otilio.jpeg' },
          { name: 'João Vieira', role: 'Assessor de Investimentos', image: 'images/cards/saopaulo/joaovieira.jpeg' },
          { name: 'Kaique Nascimento', role: 'Assessor de Investimentos', image: 'images/cards/saopaulo/kaique.jpeg' },
          { name: 'Alvaro Prates', role: 'Assessor de Investimentos', image: 'images/cards/saopaulo/alvaro.jpeg' },
          { name: 'Kauan Moroshima', role: 'Assessor de Investimentos', image: 'images/cards/saopaulo/kauan.jpeg' },
          { name: 'Vinicius Reis', role: 'Assessor de Investimentos', image: 'images/cards/saopaulo/viniciusreis.jpeg' },
          { name: 'Erivam Oliveira', role: 'Assessor de Investimentos', image: 'images/cards/saopaulo/erivam.jpeg' },
          { name: 'Pedro Ramos', role: 'Assessor de Investimentos', image: 'images/cards/saopaulo/pedroramos.jpeg' },
          { name: 'Vinicius Tucunduva', role: 'Assessor de Investimentos', image: 'images/cards/saopaulo/viniciustucunduva.jpeg' },
          { name: 'Henry Melo', role: 'Assessor de Investimentos', image: 'images/cards/saopaulo/henry.jpeg' }
        ],
        [
          { name: 'Gustavo Conceição', role: 'CMO / Designer / Gestor de Tráfego', image: 'images/cards/saopaulo/gustavoconceicao.png' },
          { name: 'Gustavo Chaves', role: 'Diretor de Transmissão / Editor de Vídeos', image: 'images/cards/saopaulo/gustavochaves.jpeg' },
          { name: 'Isabelli Saraiva', role: 'Edição de vídeos / Eventos', image: 'images/cards/saopaulo/isabelli.jpeg' },
          { name: 'Diego Dias', role: 'Copywriter / Analista de Tráfego', image: 'images/cards/saopaulo/diegodias.jpeg' }
        ],
        [
          { name: 'Guilherme Faria', role: 'CTO / Desenvolvedor', image: 'images/cards/saopaulo/guifaria.jpeg' },
          { name: 'Rodnei Andrade', role: 'Analista de dados', image: 'images/cards/saopaulo/rodnei.jpeg' },
          { name: 'Philippe Jacques', role: 'UX Designer', image: 'images/cards/saopaulo/philippe.jpeg' }
        ],
        [
          { name: 'Camily Raquel', role: 'Analista de RH', image: 'images/cards/saopaulo/camily.jpeg' },
          { name: 'Rafael Bumbeers', role: 'Diretor de RH', image: 'images/cards/saopaulo/bumbeers.png' },
          { name: 'Jefferson', role: 'Headhunter', image: 'images/cards/saopaulo/jefferson.jpeg' }
        ],
        [
          { name: 'Wilson Porfirio', role: 'Gerente Mesa Banking', image: 'images/cards/saopaulo/wilson.jpeg' },
          { name: 'Gustavo Pereira', role: 'Mesa Renda Variável', image: 'images/cards/saopaulo/gustavopereira.jpeg' }
        ],
        [
          { name: 'Cristina Novais', role: 'ADM', image: 'images/cards/saopaulo/cristina.jpeg' }
        ]
      ]
    },
    brasilia: {
      label: 'Brasília',
      groups: [
        [
          { name: 'Gustavo Conceição', role: 'Designer | Gestor de tráfego.' },
          { name: 'Gustavo Conceição', role: 'Designer | Gestor de tráfego.' },
          { name: 'Gustavo Conceição', role: 'Designer | Gestor de tráfego.' }
        ]
      ]
    },
    recife: {
      label: 'Recife',
      groups: [
        [
          { name: 'Gustavo Conceição', role: 'Designer | Gestor de tráfego.' },
          { name: 'Gustavo Conceição', role: 'Designer | Gestor de tráfego.' },
          { name: 'Gustavo Conceição', role: 'Designer | Gestor de tráfego.' }
        ]
      ]
    }
  };

  function createTeamCard(member, locationLabel) {
    const card = document.createElement('article');
    card.className = 'location-card team-card team-card-compact';

    if (member.image) {
      const imageWrap = document.createElement('div');
      imageWrap.className = 'location-image';

      const image = document.createElement('img');
      image.src = member.image;
      image.alt = member.name;

      imageWrap.append(image);
      card.append(imageWrap);
    }

    const content = document.createElement('div');
    content.className = 'location-content';

    const location = document.createElement('span');
    location.className = 'team-location';
    location.textContent = locationLabel;

    const name = document.createElement('h3');
    name.textContent = member.name;

    const role = document.createElement('p');
    role.textContent = member.role;

    content.append(location, name, role);
    card.append(content);

    return card;
  }

  function renderTeamLocation(locationKey) {
    const location = teamByLocation[locationKey];
    if (!location || !teamGrid) return;

    teamTabs.forEach(tab => {
      tab.classList.toggle('is-active', tab.dataset.teamLocation === locationKey);
    });

    teamGrid.innerHTML = '';
    teamGrid.classList.toggle('has-groups', location.groups.length > 1);

    location.groups.forEach((group, groupIndex) => {
      if (groupIndex > 0) {
        const divider = document.createElement('div');
        divider.className = 'team-divider';
        divider.setAttribute('aria-hidden', 'true');
        teamGrid.append(divider);
      }

      if (location.groups.length === 1) {
        group.forEach(member => {
          teamGrid.append(createTeamCard(member, location.label));
        });
        return;
      }

      const groupEl = document.createElement('div');
      groupEl.className = 'team-group';

      group.forEach(member => {
        groupEl.append(createTeamCard(member, location.label));
      });

      teamGrid.append(groupEl);
    });

    bindCursorHover(teamGrid);
  }

  if (teamTabs.length && teamGrid) {
    teamTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        renderTeamLocation(tab.dataset.teamLocation);
      });
    });

    renderTeamLocation(teamTabs.find(tab => tab.classList.contains('is-active'))?.dataset.teamLocation || teamTabs[0].dataset.teamLocation);
  }

  // ── Testimonials carousel
  const testimonialCards = Array.from(document.querySelectorAll('.testimonial-card'));
  const testimonialPrev = document.querySelector('[data-testimonial-prev]');
  const testimonialNext = document.querySelector('[data-testimonial-next]');
  let testimonialIndex = 0;

  function renderTestimonials() {
    if (!testimonialCards.length) return;

    const total = testimonialCards.length;
    testimonialCards.forEach((card, index) => {
      card.classList.remove('is-active', 'is-prev', 'is-next');
      if (index === testimonialIndex) card.classList.add('is-active');
      if (index === (testimonialIndex - 1 + total) % total) card.classList.add('is-prev');
      if (index === (testimonialIndex + 1) % total) card.classList.add('is-next');
    });
  }

  if (testimonialCards.length) {
    testimonialPrev?.addEventListener('click', () => {
      testimonialIndex = (testimonialIndex - 1 + testimonialCards.length) % testimonialCards.length;
      renderTestimonials();
    });

    testimonialNext?.addEventListener('click', () => {
      testimonialIndex = (testimonialIndex + 1) % testimonialCards.length;
      renderTestimonials();
    });

    renderTestimonials();
  }

  // ── Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => observer.observe(el));

  const nav = document.querySelector('nav');
  function updateNavState() {
    if (nav) nav.classList.toggle('is-scrolled', window.scrollY > 16);
  }
  updateNavState();
  window.addEventListener('scroll', updateNavState, { passive: true });

  // ── Parallax hero arch
  const arch = document.querySelector('.hero-arch');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (arch) arch.style.transform = `translateY(${y * 0.25}px)`;
  });

  // ── Phone mask
  const phoneInput = document.getElementById('lead-phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', () => {
      const digits = phoneInput.value.replace(/\D/g, '').slice(0, 11);
      const ddd = digits.slice(0, 2);
      const firstPart = digits.length > 10 ? digits.slice(2, 7) : digits.slice(2, 6);
      const secondPart = digits.length > 10 ? digits.slice(7, 11) : digits.slice(6, 10);

      let formatted = '';
      if (ddd) formatted = `(${ddd}`;
      if (digits.length >= 2) formatted += ') ';
      if (firstPart) formatted += firstPart;
      if (secondPart) formatted += `-${secondPart}`;

      phoneInput.value = formatted;
    });
  }

  const investmentInput = document.getElementById('lead-investment');
  if (investmentInput) {
    investmentInput.addEventListener('input', () => {
      const digits = investmentInput.value.replace(/\D/g, '');
      const amount = Number(digits) / 100;

      investmentInput.value = amount.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });
    });
  }

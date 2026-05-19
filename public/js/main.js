// ============================================================
// NAVBAR — dark text over white hero, white text when scrolled
// ============================================================
(function () {
  const navbar  = document.getElementById('navbar');
  const links   = navbar.querySelectorAll('.nav-link');
  const menuBtn = document.getElementById('menu-btn');

  function update() {
    const scrolled = window.scrollY > 60;

    navbar.style.background     = 'rgba(250,250,247,0.98)';
    navbar.style.backdropFilter = 'blur(8px)';
    navbar.style.boxShadow      = scrolled ? '0 1px 0 rgba(191,177,141,0.2)' : 'none';
    navbar.style.paddingTop     = scrolled ? '0.5rem' : '1.25rem';
    navbar.style.paddingBottom  = scrolled ? '0.5rem' : '1.25rem';

    const textColor = 'rgba(44,26,14,0.55)';
    const textHover = '#2C1A0E';
    const btnColor  = '#2C1A0E';

    if (menuBtn) menuBtn.style.color = btnColor;
    links.forEach(l => {
      l.style.color = textColor;
      l.onmouseenter = () => l.style.color = textHover;
      l.onmouseleave = () => l.style.color = textColor;
    });
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();

// ============================================================
// MOBILE MENU
// ============================================================
(function () {
  const btn       = document.getElementById('menu-btn');
  const menu      = document.getElementById('mobile-menu');
  const iconOpen  = document.getElementById('icon-open');
  const iconClose = document.getElementById('icon-close');

  btn.addEventListener('click', () => {
    const isOpen = !menu.classList.contains('hidden');
    menu.classList.toggle('hidden', isOpen);
    iconOpen.classList.toggle('hidden', !isOpen);
    iconClose.classList.toggle('hidden', isOpen);
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
      iconOpen.classList.remove('hidden');
      iconClose.classList.add('hidden');
    });
  });
})();

// ============================================================
// TALLER VIDEO MODAL
// ============================================================
(function () {
  const playBtn    = document.getElementById('play-taller-btn');
  const modal      = document.getElementById('taller-modal');
  const closeBtn   = document.getElementById('close-taller');
  const modalVideo = document.getElementById('taller-modal-video');

  function open() {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
    modalVideo.play();
  }

  function close() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
    modalVideo.pause();
    modalVideo.currentTime = 0;
  }

  playBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
})();

// ============================================================
// COLOR SELECTOR
// ============================================================
(function () {
  const colors = [
    {
      name:  'Blanco Natural',
      swatch: '#F0EAD6',
      border: '#D4C9A8',
      image:  '/media/muebleblanco.jpg',
    },
    {
      name:  'Roble',
      swatch: '#C4A35A',
      border: '#A88540',
      image:  '/imagenes/mueble-roble.png',
    },
    {
      name:  'Verde Salvia',
      swatch: '#8B9E7B',
      border: '#6B7E5B',
      image:  '/imagenes/mueble-verde.png',
    },
    {
      name:  'Gris Piedra',
      swatch: '#A8A8A0',
      border: '#888880',
      image:  '/imagenes/mueble-gris.png',
    },
    {
      name:  'Negro Mate',
      swatch: '#2C2C2C',
      border: '#1A1A1A',
      image:  '/imagenes/mueble-negro.png',
    },
    {
      name:  'Terracota',
      swatch: '#C26A45',
      border: '#A25035',
      image:  '/imagenes/mueble-terracota.png',
    },
  ];

  const imgEl       = document.getElementById('furniture-img');
  const placeholder = document.getElementById('furniture-placeholder');
  const nameEl      = document.getElementById('color-name');
  const grid        = document.getElementById('color-grid');
  let   selected    = 0;

  function tryLoad(src, onSuccess, onFail) {
    const t = new Image();
    t.onload  = onSuccess;
    t.onerror = onFail;
    t.src = src;
  }

  function selectColor(index) {
    selected = index;
    const c = colors[index];
    nameEl.textContent = c.name;

    // Fade out → swap → fade in
    imgEl.style.opacity = '0';

    tryLoad(
      c.image,
      () => {
        imgEl.src = c.image;
        imgEl.classList.remove('hidden');
        placeholder.classList.remove('flex');
        placeholder.classList.add('hidden');
        imgEl.style.opacity = '1';
      },
      () => {
        imgEl.classList.add('hidden');
        placeholder.classList.remove('hidden');
        placeholder.classList.add('flex');
        placeholder.style.backgroundColor = c.swatch + '33';
      }
    );

    renderGrid();
  }

  function renderGrid() {
    grid.innerHTML = '';
    colors.forEach((c, i) => {
      const btn = document.createElement('button');
      const isSelected = i === selected;

      btn.className = [
        'flex flex-col items-center gap-2 p-3 border-2 transition-all duration-200 rounded-sm',
        isSelected
          ? 'border-teca-brown bg-teca-cream shadow-sm'
          : 'border-transparent hover:border-teca-dark/15 hover:bg-teca-cream/60',
      ].join(' ');

      btn.innerHTML = `
        <span class="w-9 h-9 rounded-full shadow-inner block"
              style="background-color:${c.swatch}; border: 2px solid ${c.border};"></span>
        <span class="text-[11px] font-sans leading-tight text-center ${
          isSelected ? 'text-teca-dark font-medium' : 'text-teca-dark/50'
        }">${c.name}</span>
      `;

      btn.addEventListener('click', () => selectColor(i));
      grid.appendChild(btn);
    });
  }

  // Initialise with transition style on image
  imgEl.style.transition = 'opacity 0.35s ease';
  imgEl.style.opacity = '1';
  renderGrid();
})();

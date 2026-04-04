/* ══════════════════════════════════════
   ÍRIS SABORES — app.js v3.0
══════════════════════════════════════ */

/* ── LOADER ── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.add('gone');
      setTimeout(() => loader.remove(), 700);
    }
    revealVisible();
  }, 1900);
});

/* ── CUSTOM CURSOR ── */
const cursorDot  = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');

if (window.innerWidth > 700) {
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursorDot.style.left  = mouseX + 'px';
    cursorDot.style.top   = mouseY + 'px';
  });

  function animRing() {
    ringX += (mouseX - ringX) * 0.13;
    ringY += (mouseY - ringY) * 0.13;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
    requestAnimationFrame(animRing);
  }
  animRing();

  document.querySelectorAll('a, button, .menu-tab, .menu-item, .gal-item').forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovered'));
  });
}

/* ── NAVBAR SCROLL ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  revealVisible();
});

/* ── HAMBURGER ── */
const ham     = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
ham?.addEventListener('click', () => {
  ham.classList.toggle('open');
  navLinks.classList.toggle('mobile-open');
});
navLinks?.querySelectorAll('.nav-link').forEach(l => {
  l.addEventListener('click', () => {
    ham.classList.remove('open');
    navLinks.classList.remove('mobile-open');
  });
});

/* ── ACTIVE NAV LINK (scroll spy) ── */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(l => l.classList.remove('active'));
      const match = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (match) match.classList.add('active');
    }
  });
}, { threshold: 0.45 });

sections.forEach(s => observer.observe(s));

/* ── REVEAL ON SCROLL ── */
function revealVisible() {
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) el.classList.add('visible');
  });
}
revealVisible();

/* ── MENU TABS ── */
document.querySelectorAll('.menu-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const panel = document.getElementById('cat-' + tab.dataset.cat);
    if (panel) panel.classList.add('active');
  });
});

function openTab(cat) {
  setTimeout(() => {
    document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));
    const tab = document.querySelector(`.menu-tab[data-cat="${cat}"]`);
    const panel = document.getElementById('cat-' + cat);
    if (tab) tab.classList.add('active');
    if (panel) panel.classList.add('active');
  }, 300);
}

/* ── MENU ITEM HOVER SOUND ── (subtle visual pulse) */
document.querySelectorAll('.menu-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.transition = 'background .15s ease';
  });
});

/* ── PARALLAX HERO ── */
window.addEventListener('scroll', () => {
  const heroImg = document.querySelector('.hero-img');
  if (heroImg && window.scrollY < window.innerHeight) {
    heroImg.style.transform = `scale(1.08) translateY(${window.scrollY * 0.15}px)`;
  }
});

/* ── ANIMATED COUNTER ── */
function animCount(el, target) {
  let n = 0;
  const step = Math.ceil(target / 30);
  const t = setInterval(() => {
    n = Math.min(n + step, target);
    el.textContent = n + (el.dataset.suffix || '');
    if (n >= target) clearInterval(t);
  }, 40);
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(el => {
        const val = parseInt(el.textContent);
        if (!isNaN(val)) animCount(el, val);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsEl = document.querySelector('.sobre-stats');
if (statsEl) statsObserver.observe(statsEl);

/* ── SMOOTH HOVER ON CARDS ── */
document.querySelectorAll('.semana-card, .contacto-card, .gal-item').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * 4;
    const rotY = ((x - cx) / cx) * -4;
    card.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform .4s ease';
  });
});

/* ── GALERIA LIGHTBOX (simple) ── */
document.querySelectorAll('.gal-item').forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    if (!img) return;
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.92);z-index:9000;display:flex;align-items:center;justify-content:center;cursor:zoom-out;animation:fadeIn .2s ease';
    const style = document.createElement('style');
    style.textContent = '@keyframes fadeIn{from{opacity:0}to{opacity:1}}';
    document.head.appendChild(style);
    const bigImg = document.createElement('img');
    bigImg.src = img.src;
    bigImg.style.cssText = 'max-width:90vw;max-height:88vh;border-radius:12px;box-shadow:0 20px 80px rgba(0,0,0,.8);object-fit:contain';
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.style.cssText = 'position:fixed;top:20px;right:28px;background:none;border:none;color:#fff;font-size:42px;cursor:pointer;z-index:9001;line-height:1;opacity:.7;transition:.2s';
    closeBtn.onmouseenter = () => closeBtn.style.opacity = '1';
    closeBtn.onmouseleave = () => closeBtn.style.opacity = '.7';
    overlay.appendChild(bigImg);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);
    const close = () => { overlay.remove(); style.remove(); };
    overlay.addEventListener('click', close);
    document.addEventListener('keydown', e => { if(e.key === 'Escape') close(); }, {once:true});
  });
});

/* ── TICKER PAUSE ON HOVER ── */
const ticker = document.querySelector('.ticker-content');
if (ticker) {
  ticker.addEventListener('mouseenter', () => ticker.style.animationPlayState = 'paused');
  ticker.addEventListener('mouseleave', () => ticker.style.animationPlayState = 'running');
}

/* ── PAGE INIT ── */
document.querySelectorAll('.reveal').forEach(el => {
  el.style.transition = 'opacity .7s ease, transform .7s ease';
});


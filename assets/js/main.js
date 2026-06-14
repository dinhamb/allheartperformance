// ── Hamburger menu ──
const hamburger = document.getElementById('nav-hamburger');
const navMenu   = document.getElementById('nav-menu');
let menuOpen = false;

function openMenu() {
  menuOpen = true;
  navMenu.style.right = '0px';
  hamburger.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  menuOpen = false;
  navMenu.style.right = '';
  hamburger.classList.remove('open');
  document.body.style.overflow = '';
}

if (hamburger) {
  hamburger.addEventListener('click', function(e) {
    e.stopPropagation();
    menuOpen ? closeMenu() : openMenu();
  });
}

// Close when tapping outside the menu
document.addEventListener('touchstart', function(e) {
  if (menuOpen && !navMenu.contains(e.target) && e.target !== hamburger) {
    closeMenu();
  }
});

// ── Nav transparency on scroll ──
const header = document.getElementById('site-header');
if (header && !header.classList.contains('page')) {
  function syncNav() {
    if (window.scrollY > 55) {
      header.classList.replace('transparent', 'solid');
    } else {
      header.classList.replace('solid', 'transparent');
    }
  }
  window.addEventListener('scroll', syncNav, { passive: true });
  syncNav();
}

// ── Scroll-reveal ──
const revealEls = document.querySelectorAll('.reveal-on-scroll');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -48px 0px' }
);
revealEls.forEach(el => revealObserver.observe(el));

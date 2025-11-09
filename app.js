document.addEventListener('DOMContentLoaded', () => {
  // Scroll-in (minimal)
  const els = document.querySelectorAll('.card, .price, .steps, .contact-card, .hero-inner');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((es, obs) => {
      es.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('active'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });
    els.forEach(el => { el.classList.add('animate'); io.observe(el); });
  } else { els.forEach(el => el.classList.add('active')); }

  // Mobile nav
  const toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const open = document.body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    document.querySelectorAll('#nav a').forEach(a => {
      a.addEventListener('click', () => {
        if (document.body.classList.contains('nav-open')) {
          document.body.classList.remove('nav-open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }
});

// IntersectionObserver for scroll-in animations
document.addEventListener('DOMContentLoaded', () => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const animateTargets = document.querySelectorAll('.animate-on-scroll');
  if (!prefersReduced && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    }, { root: null, threshold: 0.12, rootMargin: '0px 0px -10% 0px' });
    animateTargets.forEach(el => io.observe(el));
  } else {
    // Fallback
    animateTargets.forEach(el => el.classList.add('active'));
  }

  // Mobile nav toggle
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = document.body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    // Close when clicking a link
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        if (document.body.classList.contains('nav-open')) {
          document.body.classList.remove('nav-open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // Header shadow on scroll (subtle)
  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY || window.pageYOffset;
    if (y > 8 && lastY <= 8) header?.classList.add('is-scrolled');
    else if (y <= 8 && lastY > 8) header?.classList.remove('is-scrolled');
    lastY = y;
  }, { passive: true });

  // Track CTA clicks (simple data-attr hook for future)
  document.querySelectorAll('[data-cta]').forEach(btn => {
    btn.addEventListener('click', () => {
      // hook: send to analytics if needed
      // console.log('CTA:', btn.dataset.cta);
    });
  });
});

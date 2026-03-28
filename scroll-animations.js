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
    }, { root: null, threshold: 0.1, rootMargin: '0px 0px -8% 0px' });
    animateTargets.forEach(el => io.observe(el));
  } else {
    // Fallback: show all immediately
    animateTargets.forEach(el => el.classList.add('active'));
  }

  // Header shadow on scroll
  const header = document.querySelector('.site-header');
  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY || window.pageYOffset;
    if (y > 8 && lastY <= 8) header?.classList.add('is-scrolled');
    else if (y <= 8 && lastY > 8) header?.classList.remove('is-scrolled');
    lastY = y;
  }, { passive: true });
});

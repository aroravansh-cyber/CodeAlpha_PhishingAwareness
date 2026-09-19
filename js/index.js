
// index.js — homepage interactions
document.addEventListener('DOMContentLoaded', () => {
  // Reveal hero on load (single orchestrated moment, respects reduced motion)
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hero = document.querySelector('.hero');
  if (hero && !prefersReduced) {
    hero.style.opacity = '0';
    hero.style.transform = 'translateY(8px)';
    requestAnimationFrame(() => {
      hero.style.transition = 'opacity .5s ease, transform .5s ease';
      hero.style.opacity = '1';
      hero.style.transform = 'translateY(0)';
    });
  }
});

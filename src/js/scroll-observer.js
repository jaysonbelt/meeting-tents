export function initScrollReveal() {
  const elements = document.querySelectorAll('[data-reveal]');

  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in-viewport');
          observer.unobserve(entry.target);

          // Clean up will-change after transition completes
          entry.target.addEventListener(
            'transitionend',
            () => {
              entry.target.style.willChange = 'auto';
            },
            { once: true }
          );
        }
      });
    },
    {
      threshold: 0.01,
      rootMargin: '0px 0px -20px 0px',
    }
  );

  elements.forEach((el) => observer.observe(el));

  // Fallback: reveal any remaining hidden elements when user is near page bottom
  const revealRemaining = () => {
    const nearBottom =
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight - 100;

    if (nearBottom) {
      document.querySelectorAll('[data-reveal]:not(.is-in-viewport)').forEach((el) => {
        el.classList.add('is-in-viewport');
        observer.unobserve(el);
      });
    }
  };

  window.addEventListener('scroll', revealRemaining, { passive: true });
}

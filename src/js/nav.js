export function initNav() {
  const nav = document.getElementById('nav');
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('nav-mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.nav-mobile-link');
  const sections = document.querySelectorAll('main section[id]');
  const darkSections = document.querySelectorAll('.section--dark');

  // --- Scroll state: show border after scrolling past hero ---
  const handleScroll = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 80);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --- Active section tracking ---
  const sectionMap = {
    hero: null,
    origin: 'origin',
    video: 'origin',
    pillars: 'pillars',
    crisis: 'crisis',
    founders: 'founders',
    contribute: null,
  };

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          const navGroup = sectionMap[sectionId];

          navLinks.forEach((link) => {
            link.classList.toggle(
              'active',
              navGroup !== null && link.dataset.nav === navGroup
            );
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  // --- Dark section detection for nav inversion ---
  let darkCount = 0;

  const darkObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        darkCount += entry.isIntersecting ? 1 : -1;
      });
      nav.classList.toggle('is-dark', darkCount > 0);
    },
    { rootMargin: '0px 0px -94% 0px' }
  );

  darkSections.forEach((s) => darkObserver.observe(s));

  // --- Mobile hamburger toggle ---
  const toggleMobile = () => {
    const isOpen = hamburger.classList.toggle('is-open');
    mobileMenu.classList.toggle('is-open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  hamburger.addEventListener('click', toggleMobile);

  // Close mobile menu on link click
  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (mobileMenu.classList.contains('is-open')) {
        toggleMobile();
      }
    });
  });

  // Reveal hidden elements in target section after nav click
  const revealTarget = (hash) => {
    if (!hash) return;
    const target = document.querySelector(hash);
    if (!target) return;
    // Small delay to let the scroll settle
    setTimeout(() => {
      target.querySelectorAll('[data-reveal]:not(.is-in-viewport)').forEach((el) => {
        el.classList.add('is-in-viewport');
      });
    }, 100);
  };

  [...navLinks, ...mobileLinks].forEach((link) => {
    link.addEventListener('click', () => {
      revealTarget(link.getAttribute('href'));
    });
  });
}

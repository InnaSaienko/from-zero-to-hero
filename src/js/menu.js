const openButton = document.querySelector('[data-menu-open]');
const closeButton = document.querySelector('[data-menu-close]');
const backdrop = document.querySelector('[data-menu-backdrop]');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');

if (openButton && closeButton && backdrop) {
  const closeMenu = ({ instant = false } = {}) => {
    if (instant) {
      backdrop.classList.add('no-transition');
    }

    backdrop.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    openButton.setAttribute('aria-expanded', 'false');

    if (instant) {
      requestAnimationFrame(() => {
        backdrop.classList.remove('no-transition');
      });
    }
  };

  const openMenu = () => {
    backdrop.classList.add('is-open');
    document.body.classList.add('menu-open');
    openButton.setAttribute('aria-expanded', 'true');
  };

  openButton.addEventListener('click', openMenu);
  closeButton.addEventListener('click', closeMenu);

  backdrop.addEventListener('click', event => {
    if (event.target === backdrop) {
      closeMenu();
    }
  });

  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      const opensNewTab = link.getAttribute('target') === '_blank';
      closeMenu({ instant: opensNewTab });
    });
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1280) {
      closeMenu();
    }
  });
}

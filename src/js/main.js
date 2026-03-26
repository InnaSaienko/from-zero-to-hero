const openButton = document.querySelector('[data-menu-open]');
const closeButton = document.querySelector('[data-menu-close]');
const backdrop = document.querySelector('[data-menu-backdrop]');
const menuLinks = document.querySelectorAll('.mobile-menu-link');

if (openButton && closeButton && backdrop) {
  const closeMenu = () => {
    backdrop.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    openButton.setAttribute('aria-expanded', 'false');
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

  menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
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

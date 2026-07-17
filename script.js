 // Menu mobile simple
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.style.display === 'flex';
    if (isOpen) {
      navLinks.style.display = 'none';
    } else {
      navLinks.style.display = 'flex';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '58px';
      navLinks.style.right = '24px';
      navLinks.style.flexDirection = 'column';
      navLinks.style.background = '#FFFFFF';
      navLinks.style.border = '1px solid #D8D9CE';
      navLinks.style.borderRadius = '8px';
      navLinks.style.padding = '14px 20px';
      navLinks.style.gap = '14px';
    }
  });

  // Ferme le menu mobile après un clic sur un lien
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 760) navLinks.style.display = 'none';
    });
  });
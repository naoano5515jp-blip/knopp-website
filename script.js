// Header: add .scrolled class on scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}, { passive: true });

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
  hamburger.setAttribute('aria-label',
    mobileNav.classList.contains('open') ? 'メニューを閉じる' : 'メニューを開く'
  );
});

// Close mobile nav when a link is clicked
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
  });
});

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    const answer = btn.nextElementSibling;

    // Close all others
    document.querySelectorAll('.faq-question').forEach(other => {
      other.setAttribute('aria-expanded', 'false');
      other.nextElementSibling.style.display = 'none';
    });

    // Toggle current
    if (!isOpen) {
      btn.setAttribute('aria-expanded', 'true');
      answer.style.display = 'block';
    }
  });
});

// Smooth scroll offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 72; // header height
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

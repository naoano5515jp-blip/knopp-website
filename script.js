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

// Contact form submission via Web3Forms
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = document.getElementById('submit-btn');
    const result = document.getElementById('form-result');

    submitBtn.disabled = true;
    submitBtn.textContent = '送信中...';
    result.className = 'form-result';
    result.textContent = '';

    const formData = new FormData(contactForm);
    const response = await fetch('https://formsubmit.co/ajax/n.nihei@knopp.co.jp', {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    }).catch(() => null);

    const data = response ? await response.json().catch(() => null) : null;

    if (data && data.success === 'true') {
      result.className = 'form-result success';
      result.textContent = 'お問い合わせを受け付けました。ご入力のメールアドレスに確認メールをお送りしましたのでご確認ください。';
      contactForm.reset();
    } else {
      result.className = 'form-result error';
      result.textContent = '送信に失敗しました。時間をおいて再度お試しいただくか、お電話にてご連絡ください。';
    }

    submitBtn.disabled = false;
    submitBtn.textContent = '送信する（無料相談を申し込む）';
  });
}

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

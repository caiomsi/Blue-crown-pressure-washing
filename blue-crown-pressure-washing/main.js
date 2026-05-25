// Signal to CSS that JS is running (enables .js-gated animation states)
document.documentElement.classList.add('js');

// Sticky nav scroll shadow
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// Mobile hamburger menu
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  toggle.classList.toggle('active', isOpen);
  toggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    toggle.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

// Pre-mark grid children as stagger items so CSS can set their initial state
const STAGGER_SELECTORS = [
  '.services-grid .service-card',
  '.trust-grid .trust-item',
  '.testimonials-grid .testimonial',
  '.gallery-grid .before-after',
];

STAGGER_SELECTORS.forEach(sel => {
  document.querySelectorAll(sel).forEach(el => el.classList.add('stagger-item'));
});

// Scroll-reveal observer — handles section fade-in, grid stagger, and step numbers
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const section = entry.target;

    // Fade the section in
    section.classList.add('visible');

    // Stagger grid children inside this section
    STAGGER_SELECTORS.forEach(sel => {
      section.querySelectorAll(sel).forEach((item, i) => {
        item.style.transitionDelay = `${0.06 + i * 0.1}s`;
        // Small offset so the section starts fading before children reveal
        setTimeout(() => item.classList.add('stagger-in'), 80);
      });
    });

    // Step numbers: pop in with a bounce, staggered
    section.querySelectorAll('.step-number').forEach((num, i) => {
      setTimeout(() => num.classList.add('pop-in'), 280 + i * 230);
    });

    revealObserver.unobserve(section);
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => revealObserver.observe(el));

// Button ripple on click
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const ripple = document.createElement('span');
    ripple.className = 'btn-ripple';
    ripple.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${e.clientX - rect.left - size / 2}px;
      top: ${e.clientY - rect.top - size / 2}px;
    `;
    this.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
});

// Quote form submission feedback
const form = document.querySelector('.quote-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = "Request Sent! We'll be in touch soon.";
    btn.disabled = true;
    btn.style.background = '#16a34a';
    btn.style.borderColor = '#16a34a';
  });
}

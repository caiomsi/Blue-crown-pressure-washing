// Header scroll effect
const header = document.getElementById('header');
const fab    = document.querySelector('.fab');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 60;
  header.classList.toggle('scrolled', scrolled);
  fab.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

// Mobile nav toggle
const hamburger = document.getElementById('hamburger');
const nav       = document.getElementById('nav');
let navOpen = false;

hamburger.addEventListener('click', () => {
  navOpen = !navOpen;
  nav.classList.toggle('open', navOpen);
  document.body.style.overflow = navOpen ? 'hidden' : '';
  const spans = hamburger.querySelectorAll('span');
  if (navOpen) {
    spans[0].style.cssText = 'transform: rotate(45deg) translate(5px, 5px)';
    spans[1].style.cssText = 'opacity: 0; transform: scaleX(0)';
    spans[2].style.cssText = 'transform: rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => s.style.cssText = '');
  }
});

nav.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    navOpen = false;
    nav.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.querySelectorAll('span').forEach(s => s.style.cssText = '');
  }
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 72;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// Animate on scroll (IntersectionObserver)
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('in-view'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

// Counter animation for stats
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      counterObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const statsBar = document.querySelector('.stats-bar');
if (statsBar) counterObserver.observe(statsBar);

function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1600;
    const step = 16;
    const increment = target / (duration / step);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + increment, target);
      el.textContent = Math.round(current);
      if (current >= target) clearInterval(timer);
    }, step);
  });
}

// Quote form submission
const form        = document.getElementById('quote-form');
const formSuccess = document.getElementById('form-success');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Sending…';

  // Simulate async submission (replace with real endpoint)
  setTimeout(() => {
    form.querySelectorAll('input, select, textarea').forEach(el => el.value = '');
    btn.style.display = 'none';
    formSuccess.classList.add('visible');
  }, 1200);
});

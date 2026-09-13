/* ==========================================================================
   Atika — Information Security Portfolio
   main.js — all site interactivity, in plain DOM JavaScript (no framework).
   Each feature is self-contained so it only runs if its markup exists
   on the current page.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  initActiveNavLink();
  initCarousel();
  initAccordion();
  initTabs();
  initContactForm();
  initBackToTop();
});

/* --------------------------------------------------------------------------
   1) Hamburger navigation menu (mobile)
   -------------------------------------------------------------------------- */
function initNavToggle() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close the menu automatically once a link is tapped (mobile UX)
  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* --------------------------------------------------------------------------
   2) Highlight the current page in the nav bar
   -------------------------------------------------------------------------- */
function initActiveNavLink() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === current) link.classList.add('active');
  });
}

/* --------------------------------------------------------------------------
   3) Project carousel / slider (Portfolio page)
   -------------------------------------------------------------------------- */
function initCarousel() {
  const track = document.querySelector('.carousel-track');
  if (!track) return;

  const slides = Array.from(track.children);
  const dotsWrap = document.querySelector('.carousel-dots');
  const prevBtn = document.querySelector('.carousel-arrow.prev');
  const nextBtn = document.querySelector('.carousel-arrow.next');
  let index = 0;

  // Build one dot per slide
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    dotsWrap.querySelectorAll('.carousel-dot').forEach((dot, di) => {
      dot.classList.toggle('active', di === index);
    });

  }

  prevBtn.addEventListener('click', () => goTo(index - 1));
  nextBtn.addEventListener('click', () => goTo(index + 1));

  // Auto-advance every 6 seconds, paused while the user is interacting
  let timer = setInterval(() => goTo(index + 1), 6000);
  const wrap = document.querySelector('.carousel');
  wrap.addEventListener('mouseenter', () => clearInterval(timer));
  wrap.addEventListener('mouseleave', () => {
    timer = setInterval(() => goTo(index + 1), 6000);
  });
  
  // Keyboard support: left/right arrows move the carousel when it's focused
  wrap.setAttribute('tabindex', '0');
  wrap.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') goTo(index - 1);
    if (e.key === 'ArrowRight') goTo(index + 1);
  });
}

/* --------------------------------------------------------------------------
   4) FAQ accordion (Contact page)
   -------------------------------------------------------------------------- */
function initAccordion() {
  const triggers = document.querySelectorAll('.acc-trigger');
  if (!triggers.length) return;

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const panel = trigger.nextElementSibling;
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';

      // Close every other panel so only one is open at a time
      triggers.forEach(t => {
        t.setAttribute('aria-expanded', 'false');
        t.nextElementSibling.style.maxHeight = null;
      });

      if (!isOpen) {
        trigger.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   5) Tab switcher (Skills page)
   -------------------------------------------------------------------------- */
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  if (!tabButtons.length) return;

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.toggle('active', panel.id === target);
      });
    });
  });
}

/* --------------------------------------------------------------------------
   6) Contact form validation
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const status = document.getElementById('formStatus');
    const messageInput = document.getElementById('message');
  const charCount = document.getElementById('charCount');
  if (messageInput && charCount) {
    messageInput.addEventListener('input', () => {
      charCount.textContent = `${messageInput.value.length} characters`;
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    valid = validateField('name', v => v.trim().length >= 2,
      'Please enter your full name.') && valid;

    valid = validateField('email', v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
      'Please enter a valid email address.') && valid;

    valid = validateField('message', v => v.trim().length >= 10,
      'Message should be at least 10 characters.') && valid;

    status.classList.remove('ok', 'err');
    if (valid) {
      status.textContent = 'Message received — thank you, I will reply soon.';
      status.classList.add('show', 'ok');
      form.reset();
    } else {
      status.textContent = 'Please fix the highlighted fields above.';
      status.classList.add('show', 'err');
    }
  });

  // Re-validate a field the moment the user fixes it
  ['name', 'email', 'message'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', () => {
      const fieldWrap = el.closest('.field');
      if (fieldWrap.classList.contains('has-error')) {
        fieldWrap.classList.remove('has-error');
        fieldWrap.querySelector('.field-error').textContent = '';
      }
    });
  });

  function validateField(id, testFn, message) {
    const el = document.getElementById(id);
    const fieldWrap = el.closest('.field');
    const errorEl = fieldWrap.querySelector('.field-error');
    const isValid = testFn(el.value);

    fieldWrap.classList.toggle('has-error', !isValid);
    errorEl.textContent = isValid ? '' : message;
    return isValid;
  }
}

/* --------------------------------------------------------------------------
   7) Back-to-top button
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById('toTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 500);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

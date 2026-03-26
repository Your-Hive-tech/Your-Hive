// ─── Scroll reveal ───────────────────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ─── Sticky navbar shadow ─────────────────────────────────────────────────────
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 20
      ? '0 2px 16px rgba(0,0,0,0.12)'
      : '0 1px 8px rgba(0,0,0,0.08)';
  });
}

// ─── Accordion ───────────────────────────────────────────────────────────────
document.querySelectorAll('.accordion-trigger').forEach(btn => {
  btn.addEventListener('click', () => {
    const isOpen = btn.classList.contains('open');
    // close all in same accordion
    const parent = btn.closest('.accordion');
    if (parent) {
      parent.querySelectorAll('.accordion-trigger').forEach(b => {
        b.classList.remove('open');
        b.nextElementSibling?.classList.remove('open');
      });
    }
    if (!isOpen) {
      btn.classList.add('open');
      btn.nextElementSibling?.classList.add('open');
    }
  });
});

// ─── Tabs ─────────────────────────────────────────────────────────────────────
document.querySelectorAll('.tabs').forEach(tabContainer => {
  tabContainer.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      // deactivate all tabs
      tabContainer.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      // show correct panel
      const panels = tabContainer.closest('section')?.querySelectorAll('.tab-panel');
      panels?.forEach(p => {
        p.classList.toggle('active', p.dataset.panel === target);
      });
    });
  });
});

// ─── Module card expand/collapse ─────────────────────────────────────────────
document.querySelectorAll('.module-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const curriculum = btn.closest('.module-card-header')
      ?.nextElementSibling;
    if (!curriculum) return;
    const isOpen = curriculum.classList.contains('open');
    curriculum.classList.toggle('open', !isOpen);
    const span = btn.querySelector('span');
    if (span) span.textContent = isOpen ? 'View curriculum' : 'Hide curriculum';
    const icon = btn.querySelector('.toggle-icon');
    if (icon) icon.textContent = isOpen ? '▼' : '▲';
  });
});

// ─── Session selector (camp page) ────────────────────────────────────────────
document.querySelectorAll('.session-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.session-card').forEach(c => {
      c.classList.remove('selected');
      c.classList.add('unselected');
    });
    card.classList.add('selected');
    card.classList.remove('unselected');
    // update details
    const id = card.dataset.session;
    document.querySelectorAll('.session-details').forEach(d => {
      d.hidden = d.dataset.session !== id;
    });
    // update registration section
    document.querySelectorAll('.registration-panel').forEach(p => {
      p.hidden = p.dataset.session !== id;
    });
  });
});

// ─── Email copy ──────────────────────────────────────────────────────────────
document.querySelectorAll('[data-copy-email]').forEach(btn => {
  btn.addEventListener('click', async () => {
    const email = btn.dataset.copyEmail;
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = email; document.body.appendChild(ta);
      ta.select(); document.execCommand('copy');
      document.body.removeChild(ta);
    }
    const orig = btn.innerHTML;
    btn.innerHTML = '✓';
    btn.style.color = '#4ade80';
    setTimeout(() => { btn.innerHTML = orig; btn.style.color = ''; }, 2000);
    const note = btn.closest('[data-copy-container]')?.querySelector('[data-copy-note]');
    if (note) { note.hidden = false; setTimeout(() => note.hidden = true, 2000); }
  });
});

// ─── Smooth scroll for anchor links ──────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

// ─── Footer subscribe form (static - just shows success message) ─────────────
const subForm = document.getElementById('subscribe-form');
if (subForm) {
  subForm.addEventListener('submit', e => {
    e.preventDefault();
    const msg = document.getElementById('subscribe-msg');
    if (msg) { msg.textContent = 'Thanks for subscribing!'; msg.style.color = '#4DB6AC'; }
    subForm.reset();
  });
}

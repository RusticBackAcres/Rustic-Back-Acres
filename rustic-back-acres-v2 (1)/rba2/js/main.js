/* Rustic Back Acres — main.js */

// Navbar scroll
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// Mobile menu
const hamburger = document.querySelector('.nav-hamburger');
const mobileNav = document.querySelector('.mobile-nav');
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (open) {
      spans[0].style.transform = 'rotate(45deg) translate(4px,4px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(4px,-4px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }));
}

// Carousel
class Carousel {
  constructor(el) {
    this.el = el;
    this.slides = el.querySelector('.carousel-slides');
    this.dots = el.querySelectorAll('.carousel-dot');
    this.total = el.querySelectorAll('.carousel-slide').length;
    this.current = 0;
    this.timer = null;
    el.querySelector('.carousel-btn.prev')?.addEventListener('click', e => { e.stopPropagation(); this.go(-1); });
    el.querySelector('.carousel-btn.next')?.addEventListener('click', e => { e.stopPropagation(); this.go(1); });
    this.dots.forEach((d, i) => d.addEventListener('click', e => { e.stopPropagation(); this.goTo(i); }));
    this.startAuto();
    el.addEventListener('mouseenter', () => this.stopAuto());
    el.addEventListener('mouseleave', () => this.startAuto());
    let sx = 0;
    el.addEventListener('touchstart', e => sx = e.touches[0].clientX, { passive: true });
    el.addEventListener('touchend', e => { const d = sx - e.changedTouches[0].clientX; if (Math.abs(d) > 40) this.go(d > 0 ? 1 : -1); });
  }
  go(dir) { this.goTo((this.current + dir + this.total) % this.total); }
  goTo(i) {
    this.current = i;
    if (this.slides) this.slides.style.transform = `translateX(-${i * 100}%)`;
    this.dots.forEach((d, j) => d.classList.toggle('active', j === i));
  }
  startAuto() { if (this.total > 1) this.timer = setInterval(() => this.go(1), 4200); }
  stopAuto() { clearInterval(this.timer); }
}

function initCarousels() {
  document.querySelectorAll('.card-carousel, .modal-carousel').forEach(el => new Carousel(el));
}

// Filters
function initFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.filter-bar').querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('[data-category]').forEach(card => {
        card.style.display = (filter === 'all' || card.dataset.category === filter) ? '' : 'none';
      });
    });
  });
}

// Modals
function initModals() {
  document.querySelectorAll('[data-modal]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const modal = document.getElementById(trigger.dataset.modal);
      if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
        modal.querySelectorAll('.card-carousel,.modal-carousel').forEach(el => new Carousel(el));
      }
    });
  });
  document.querySelectorAll('.modal-close, .modal-overlay').forEach(el => {
    el.addEventListener('click', e => {
      if (e.target === el) {
        document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
        document.body.style.overflow = '';
      }
    });
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
      document.body.style.overflow = '';
    }
  });
}

// Fade in on scroll
function initFadeIn() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.08 });
  document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));
}

// Calc tabs
function initCalcTabs() {
  document.querySelectorAll('.calc-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const section = tab.closest('.calc-section');
      section.querySelectorAll('.calc-tab').forEach(t => t.classList.remove('active'));
      section.querySelectorAll('.calc-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById(tab.dataset.tab);
      if (panel) panel.classList.add('active');
    });
  });
}

// Gestation calculator
function initGestation() {
  const btn = document.getElementById('btn-gestation');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const val = document.getElementById('breed-date').value;
    if (!val) return;
    const d = new Date(val);
    d.setDate(d.getDate() + 145);
    const opts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const result = document.getElementById('gestation-result');
    result.querySelector('.result-value').textContent = d.toLocaleDateString('en-US', opts);
    const today = new Date();
    const days = Math.ceil((d - today) / 86400000);
    result.querySelector('.result-sub').textContent = days > 0 ? `${days} days from today` : days === 0 ? 'Due today!' : `${Math.abs(days)} days ago`;
    result.classList.add('show');
  });
}

// Milk star calculator
function initMilkStar() {
  const btn = document.getElementById('btn-milkstar');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const lbs = parseFloat(document.getElementById('ms-lbs').value) || 0;
    const bf = parseFloat(document.getElementById('ms-bf').value) || 0;
    const prot = parseFloat(document.getElementById('ms-prot').value) || 0;
    const minLbs = 740;
    const actualBF = lbs * (bf / 100);
    const actualProt = lbs * (prot / 100);
    const minBFlbs = lbs * 0.025;
    const minProtlbs = lbs * 0.020;
    const pL = lbs >= minLbs, pB = actualBF >= minBFlbs, pP = actualProt >= minProtlbs;
    const pass = pL && pB && pP;
    const result = document.getElementById('milkstar-result');
    result.innerHTML = `
      <span class="result-label">Milk Star Qualification</span>
      <div class="result-value ${pass ? 'pass' : 'fail'}">${pass ? '★ Qualifies' : '✗ Does Not Qualify'}</div>
      <div class="result-sub" style="margin-top:.75rem;display:flex;flex-direction:column;gap:.35rem">
        <span>Milk: <strong>${lbs} lbs</strong> (min ${minLbs}) — <span class="${pL?'pass':'fail'}">${pL?'PASS':'FAIL'}</span></span>
        <span>Butterfat: <strong>${actualBF.toFixed(1)} lbs</strong> (min ${minBFlbs.toFixed(1)}) — <span class="${pB?'pass':'fail'}">${pB?'PASS':'FAIL'}</span></span>
        <span>Protein: <strong>${actualProt.toFixed(1)} lbs</strong> (min ${minProtlbs.toFixed(1)}) — <span class="${pP?'pass':'fail'}">${pP?'PASS':'FAIL'}</span></span>
      </div>
      <p style="font-size:.7rem;color:var(--mid-grey);margin-top:.75rem;line-height:1.6">Verify current minimums with ADGA. This is a reference tool only.</p>
    `;
    result.classList.add('show');
  });
}

// Contact form
function initContact() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Message Sent ✓';
    btn.disabled = true;
    setTimeout(() => { btn.textContent = 'Send Message'; btn.disabled = false; form.reset(); }, 3000);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initCarousels();
  initFilters();
  initModals();
  initFadeIn();
  initCalcTabs();
  initGestation();
  initMilkStar();
  initContact();
});

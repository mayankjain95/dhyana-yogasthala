/**
 * js/components.js — Dhyana Yogasthala
 * Shared nav and footer injection.
 * Each page calls injectNav('main') or injectNav('subpage') from its own script tag.
 */

const NAV_MAIN = `
<a href="index.html#hero" class="nav-logo">Dhyana<span>Yogasthala</span></a>
<ul class="nav-links">
  <li><a href="index.html#what-is-yoga">What is Classical Hatha Yoga</a></li>
  <li><a href="index.html#practices">Practices</a></li>
  <li><a href="index.html#teacher">Teacher</a></li>
  <li><a href="index.html#locations">Locations</a></li>
  <li><a href="#" class="nav-wa" data-wa="default">🌿 Consult Teacher</a></li>
  <li><a href="index.html#contact" class="nav-cta">Enquire</a></li>
</ul>`;

const NAV_SUBPAGE = `
<a href="index.html" class="nav-logo">Dhyana<span>Yogasthala</span></a>
<a href="index.html" class="nav-back">← Back to Main Site</a>`;

const FOOTER_MAIN = `
<div class="footer-inner">
  <div class="footer-logo">Dhyana Yogasthala<small>Classical Hatha Yoga · Isha Certified</small></div>
  <div class="footer-links">
    <a href="index.html#what-is-yoga">What is Classical Hatha Yoga</a>
    <a href="index.html#practices">Practices</a>
    <a href="index.html#teacher">Teacher</a>
    <a href="index.html#contact">Contact</a>
  </div>
  <div class="footer-copy">© ${(typeof SITE_CONFIG !== 'undefined' ? SITE_CONFIG.year : '2026')} Dhyana Yogasthala. Shruti Jain, Sonepat.</div>
</div>`;

const FOOTER_SUBPAGE = `
<a href="index.html" class="footer-logo">Dhyana<span>Yogasthala</span></a>
<span class="footer-copy">© ${(typeof SITE_CONFIG !== 'undefined' ? SITE_CONFIG.year : '2026')} Dhyana Yogasthala · Shruti Jain, Sonepat</span>
<a href="index.html" class="footer-back">← Back to Main Site</a>`;

const WA_FLOAT = `<a href="#" class="wa-float" target="_blank" title="Chat with Shruti on WhatsApp" data-wa="default">🌿</a>`;

function injectNav(type = 'main') {
  const el = document.getElementById('site-nav');
  if (el) {
    el.innerHTML = type === 'subpage' ? NAV_SUBPAGE : NAV_MAIN;
    applyWaLinks(el);
  }
}

function injectFooter(type = 'main') {
  const el = document.getElementById('site-footer');
  if (el) {
    el.innerHTML = type === 'subpage' ? FOOTER_SUBPAGE : FOOTER_MAIN;
    applyWaLinks(el);
  }
}

function injectWaFloat() {
  const el = document.getElementById('wa-float-container');
  if (el) {
    el.innerHTML = WA_FLOAT;
    applyWaLinks(el);
  }
}

/** Wires up all [data-wa] anchors in a given root element */
function applyWaLinks(root) {
  if (typeof SITE_CONFIG === 'undefined') return;
  (root || document).querySelectorAll('[data-wa]').forEach(a => {
    const key = a.getAttribute('data-wa');
    a.href = (key === 'sthira')
      ? `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${SITE_CONFIG.whatsappSthiraMsg}`
      : `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${SITE_CONFIG.whatsappDefaultMsg}`;
    if (!a.getAttribute('target')) a.setAttribute('target', '_blank');
  });
}

// Apply WA links to inline [data-wa] elements once DOM is ready
document.addEventListener('DOMContentLoaded', () => applyWaLinks(document));

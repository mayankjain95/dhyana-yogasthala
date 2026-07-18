/**
 * js/program-page.js — Dhyana Yogasthala
 *
 * Shared template renderer for ALL program, workshop, and offering dedicated pages.
 * Each page sets `const PROGRAM_ID = 'some-id'` before including this script.
 * This script searches UPCOMING_PROGRAMS, OFFERINGS, and WORKSHOPS for the matching
 * entry and renders everything: hero, benefits, form, payment/success overlays.
 */

(function () {
  try {
  // ── 1. Find program data across all arrays ────────────────────────────────
  const allPrograms = [
    ...(typeof UPCOMING_PROGRAMS !== 'undefined' ? UPCOMING_PROGRAMS : []),
    ...(typeof OFFERINGS       !== 'undefined' ? OFFERINGS       : []),
    ...(typeof WORKSHOPS       !== 'undefined' ? WORKSHOPS       : []),
  ];

  const prog = allPrograms.find(p => p.id === PROGRAM_ID);

  if (!prog) {
    document.body.innerHTML = '<p style="padding:4rem;color:red;background:#fff;font-family:sans-serif;font-weight:bold;">Program not found. Check PROGRAM_ID: ' + PROGRAM_ID + '</p>';
    return;
  }

  // ── 2. Update <head> meta ─────────────────────────────────────────────────
  document.title = prog.title + ' | Dhyana Yogasthala';
  setMeta('description', prog.cardDesc || prog.pageDesc || '');
  setMeta('og:title',       prog.title + ' | Dhyana Yogasthala', true);
  setMeta('og:description', prog.cardDesc || '', true);

  function setMeta(name, content, isOg) {
    const sel = isOg ? `meta[property="${name}"]` : `meta[name="${name}"]`;
    const el = document.querySelector(sel);
    if (el) el.setAttribute('content', content);
  }

  // ── 3. Inject nav / footer / WA / Form ────────────────────────────────────
  injectNav('subpage');
  injectFooter('subpage');
  injectWaFloat();
  if (typeof injectForm === 'function') injectForm();
  applyWaLinks();

  // ── 4. Render hero ────────────────────────────────────────────────────────
  const heroImg = document.getElementById('prog-hero-img');
  if (heroImg) {
    heroImg.src = '../' + prog.image;
    heroImg.alt = prog.title;
  }

  // Hero label: use direct heroLabel string, OR build from date/time/location
  const heroLabel = document.getElementById('prog-hero-label');
  if (heroLabel) {
    if (prog.heroLabel) {
      heroLabel.textContent = prog.heroLabel;
    } else {
      const parts = [];
      if (prog.date)     parts.push('📅 ' + prog.date);
      if (prog.time)     parts.push('🕒 ' + prog.time);
      if (prog.location) parts.push('📍 ' + prog.location);
      heroLabel.textContent = parts.join('  ·  ');
    }
  }

  setText('prog-hero-title',    prog.title);
  setText('prog-hero-subtitle', prog.subtitle || '');

  // Hero content: heroFeatures (Maitreyi-style bullet list) OR pageDesc paragraph
  const heroDesc    = document.getElementById('prog-hero-desc');
  const heroFeatures = document.getElementById('prog-hero-features');

  if (prog.heroFeatures && prog.heroFeatures.length) {
    // Render feature bullets
    if (heroFeatures) {
      heroFeatures.innerHTML = prog.heroFeatures
        .map(f => `<div class="maitreyi-feature">${escapeHtml(f)}</div>`)
        .join('');
      heroFeatures.style.display = '';
    }
    if (heroDesc) heroDesc.style.display = 'none';
  } else {
    // Render paragraph desc
    if (heroDesc && prog.pageDesc) {
      heroDesc.innerHTML = escapeHtml(prog.pageDesc)
        .replace(/\n\n/g, '<br><br>')
        .replace(/\n/g, '<br>');
      heroDesc.style.display = '';
    }
    if (heroFeatures) heroFeatures.style.display = 'none';
  }

  // ── 5. Render benefits strip ──────────────────────────────────────────────
  const benefitsSection = document.getElementById('prog-benefits-section');
  const benefitsGrid    = document.getElementById('prog-benefits-grid');
  const benefitsLabel   = document.getElementById('prog-benefits-label');

  if (benefitsLabel && prog.benefitsLabel) {
    benefitsLabel.textContent = prog.benefitsLabel;
  }

  if (benefitsGrid && prog.benefits && prog.benefits.length) {
    benefitsGrid.innerHTML = prog.benefits.map(b => {
      const icon = (typeof b === 'object' && b.icon) ? b.icon : '✦';
      const text = (typeof b === 'object') ? b.text : b;
      return `<div class="about-highlight"><div class="about-highlight-icon">${icon}</div><div>${escapeHtml(text)}</div></div>`;
    }).join('');
    if (benefitsSection) benefitsSection.style.display = '';
  } else {
    if (benefitsSection) benefitsSection.style.display = 'none';
  }

  // ── 6. Render form header ─────────────────────────────────────────────────
  setText('prog-form-title',
    prog.isFree ? 'Register for Free Session' : 'Register for ' + prog.title);
  setText('prog-form-sub',
    prog.isFree
      ? 'This session is completely free. You will receive the joining link via WhatsApp or email before the session. Seats are limited — register early.'
      : 'Please fill in the details below. Shruti will review your registration and confirm within 24 hours.');

  // ── 7. Show/hide payment consent in form ─────────────────────────────────
  const paymentConsentBlock = document.getElementById('prog-payment-consent-block');
  if (paymentConsentBlock) {
    paymentConsentBlock.style.display = prog.isFree ? 'none' : '';
  }

  // ── 8. Submit button text & note ─────────────────────────────────────────
  const submitBtn = document.querySelector('.btn-submit-main');
  if (submitBtn) {
    submitBtn.textContent = prog.isFree ? 'Register for Free Session →' : 'Submit Registration →';
  }
  const submitNote = document.querySelector('.submit-note');
  if (submitNote) {
    submitNote.textContent = prog.isFree
      ? 'This session is completely free. You will receive the joining link via WhatsApp or email before the session.'
      : 'After submitting, a payment screen will appear with a QR code. Pay via any UPI app. Shruti will confirm your registration within 24 hours.';
  }

  // ── 9. Show/hide payment overlay ─────────────────────────────────────────
  const paymentOverlay = document.getElementById('payment-overlay');
  if (paymentOverlay) {
    if (prog.isFree) {
      paymentOverlay.remove();
    } else {
      setText('prog-payment-pretitle', prog.title + ' · Dhyana Yogasthala');
    }
  }

  // ── 10. Success overlay program name ─────────────────────────────────────
  setText('prog-success-name', prog.title);

  // ── 11. Scroll reveal ────────────────────────────────────────────────────
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i * 80);
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => observer.observe(el));

  // ── 12. Form logic ────────────────────────────────────────────────────────
  let lastRegistrationData = null;

  window.handleProgramSubmit = async function () {
    clearErrorBanner();
    const error = validateForm();
    if (error) { showInlineError(error); return; }

    const btn = document.querySelector('.btn-submit-main');
    const origText = btn.textContent;
    btn.textContent = 'Saving Registration…';
    btn.disabled = true;

    const data = collectData();

    try {
      await sendToSheet(data);
      lastRegistrationData = data;
    } catch (err) {
      lastRegistrationData = data;
      const waMsg = encodeURIComponent(buildWhatsAppMessage(data));
      window.open('https://wa.me/' + SITE_CONFIG.whatsappNumber + '?text=' + waMsg, '_blank');
    } finally {
      btn.textContent = origText;
      btn.disabled = false;
    }

    if (prog.isFree) {
      showSuccess();
    } else {
      document.getElementById('payment-overlay').classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  };

  window.handlePaymentDone = async function () {
    const btn = document.querySelector('.payment-done-btn');
    const origText = btn ? btn.textContent : '';
    if (btn) { btn.textContent = 'Recording…'; btn.disabled = true; }

    try {
      if (lastRegistrationData) {
        await sendToSheet({
          formKey: 'maitreyi-2026',
          submissionType: 'payment_confirmation',
          source: prog.title + ' payment confirmation',
          confirmedAt: new Date().toISOString(),
          paymentStatus: 'User clicked I Have Paid',
          programme: prog.title,
          name: lastRegistrationData.name,
          phone: lastRegistrationData.phone,
          email: lastRegistrationData.email,
          city: lastRegistrationData.city,
          goal: lastRegistrationData.goal,
          notes: lastRegistrationData.notes,
        });
      }
    } catch (err) {
      if (lastRegistrationData) {
        const waMsg = encodeURIComponent(
          'Hi Shruti, I have completed the UPI payment for ' + prog.title + '.\n\n' +
          'Name: ' + lastRegistrationData.name + '\nPhone: ' + lastRegistrationData.phone
        );
        window.open('https://wa.me/' + SITE_CONFIG.whatsappNumber + '?text=' + waMsg, '_blank');
      }
    } finally {
      if (btn) { btn.textContent = origText; btn.disabled = false; }
    }

    document.getElementById('payment-overlay').classList.remove('show');
    showSuccess();
  };

  function showSuccess() {
    document.getElementById('success-overlay').classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  // ── Helpers ───────────────────────────────────────────────────────────────
  function val(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }
  function radio(name) {
    const el = document.querySelector('input[name="' + name + '"]:checked');
    return el ? el.value : '';
  }

  function validateForm() {
    if ((val('p-name') || '').length < 2) return 'Please enter your name.';
    const age = Number(val('p-age'));
    if (!age || age < 5 || age > 90) return 'Please enter a valid age.';
    if (!radio('p-gender')) return 'Please select your gender.';
    if ((val('p-phone') || '').replace(/\D/g,'').length < 8) return 'Please enter a valid mobile number (min 8 digits).';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val('p-email'))) return 'Please enter a valid email address.';
    if ((val('p-city') || '').length < 2) return 'Please enter your city and country.';
    if ((val('p-emergency') || '').length < 5) return 'Please enter emergency contact details.';
    if (!radio('p-pregnancy')) return 'Please answer the pregnancy question.';
    if (!val('p-health')) return "Please fill in the health details field (write 'None' if not applicable).";
    if (!val('p-injury')) return "Please fill in the illness/injury field (write 'None' if not applicable).";
    if (radio('p-consent') !== 'Yes') return 'Please confirm the declaration by selecting Yes.';
    if (!prog.isFree && radio('p-payment-consent') !== 'Yes, I understand that') {
      return 'Please acknowledge the Payment & Cancellation terms.';
    }
    return '';
  }

  function collectData() {
    const rawNotes = val('p-notes');
    const emergencyStr = val('p-emergency') ? ('Emergency Contact: ' + val('p-emergency')) : '';
    const pregnancyStr = radio('p-pregnancy') ? ('Pregnancy/Recent Birth: ' + radio('p-pregnancy')) : '';
    
    let combinedNotes = rawNotes;
    if (emergencyStr) combinedNotes += (combinedNotes ? '\n' : '') + emergencyStr;
    if (pregnancyStr) combinedNotes += (combinedNotes ? '\n' : '') + pregnancyStr;

    return {
      submittedAt:    new Date().toISOString(),
      formKey:        'maitreyi-2026',
      submissionType: 'registration',
      source:         prog.title + ' registration page',
      programme:      prog.title,
      isFree:         prog.isFree,
      name:           val('p-name'),
      age:            val('p-age'),
      gender:         radio('p-gender'),
      phone:          val('p-phone'),
      email:          val('p-email'),
      city:           val('p-city'),
      emergency:      val('p-emergency'),
      goal:           radio('p-goal'),
      experience:     radio('p-practiced'), 
      practicedBefore:radio('p-practiced'),
      pregnancy:      radio('p-pregnancy'),
      health:         val('p-health'),
      injury:         val('p-injury'),
      notes:          combinedNotes,
    };
  }

  async function sendToSheet(data) {
    await fetch(SITE_CONFIG.registrationEndpoint, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(data),
    });
  }

  function buildWhatsAppMessage(data) {
    return 'Hi Shruti, I have registered for ' + prog.title + '.\n\n' +
      'Name: ' + data.name + '\nAge: ' + data.age + ' | Gender: ' + data.gender + '\n' +
      'Phone: ' + data.phone + '\nEmail: ' + data.email + '\nCity: ' + data.city + '\n' +
      'Emergency Contact: ' + (data.emergency || '—') + '\n\n' +
      'Goal: ' + (data.goal || '—') + '\nPrior experience: ' + (data.practicedBefore || '—') + '\n' +
      'Pregnancy/Birth in last 3 months: ' + (data.pregnancy || '—') + '\n' +
      'Health details: ' + data.health + '\nIllness/Injury (last 3 yrs): ' + data.injury + '\n' +
      'Additional notes: ' + (data.notes || '—') + '\n\nPlease confirm my registration.';
  }

  function showInlineError(msg) {
    let banner = document.getElementById('form-error-banner');
    if (!banner) {
      banner = document.createElement('div');
      banner.id = 'form-error-banner';
      banner.style.cssText = 'background:rgba(200,98,42,0.15);border:1px solid var(--saffron);border-left:3px solid var(--saffron);color:var(--saffron);padding:0.9rem 1.2rem;margin-bottom:1.2rem;font-size:0.85rem;line-height:1.6;';
      const submitArea = document.querySelector('.submit-area');
      if (submitArea) submitArea.insertAdjacentElement('beforebegin', banner);
    }
    banner.textContent = '⚠ ' + msg;
    banner.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function clearErrorBanner() {
    const el = document.getElementById('form-error-banner');
    if (el) el.remove();
  }

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function escapeHtml(str) {
    return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  } catch (err) {
    document.body.innerHTML = '<div style="padding:4rem;color:red;background:#fff;font-family:sans-serif;"><h1>Error in program-page.js</h1><pre>' + err.stack + '</pre></div>';
  }

})();

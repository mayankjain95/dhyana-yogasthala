/**
 * js/enquiry.js — Dhyana Yogasthala
 * Classical Hatha Yoga Enquiry Page Logic
 * Compliant with WCAG 2.1 AA accessibility, production-ready validation, and error resiliency.
 */

(function () {
  'use strict';

  // Endpoint configuration (fallback to config.js if present)
  const ENDPOINT = (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.registrationEndpoint)
    ? SITE_CONFIG.registrationEndpoint
    : 'https://script.google.com/macros/s/AKfycbz8Cdz6OreMzP6xb9iZeT9t_HOJhhNDLd__PNDSwFGw3cJaxG8-krPxoK5qPgjaFmtE0g/exec';

  const WHATSAPP_NUM = (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.whatsappNumber)
    ? SITE_CONFIG.whatsappNumber
    : '918950867190';

  // State
  let lastSubmission = null;
  let activeModalTrigger = null;

  // DOM Elements
  const form = document.getElementById('enquiryForm');
  const submitBtn = document.getElementById('submitBtn');
  const hearAboutSelect = document.getElementById('hearAbout');
  const statusBanner = document.getElementById('formStatusBanner');
  const successModal = document.getElementById('successModal');

  /**
   * 1. Validation & Accessibility Error Messaging
   */
  function setFieldError(fieldId, errorMsg) {
    const input = document.getElementById(fieldId);
    const errorEl = document.getElementById(`${fieldId}-error`);

    if (input) {
      input.setAttribute('aria-invalid', 'true');
    }
    if (errorEl) {
      errorEl.textContent = errorMsg;
      errorEl.classList.add('visible');
    }
  }

  function clearFieldError(fieldId) {
    const input = document.getElementById(fieldId);
    const errorEl = document.getElementById(`${fieldId}-error`);

    if (input) {
      input.removeAttribute('aria-invalid');
    }
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.classList.remove('visible');
    }
  }

  function clearAllErrors() {
    ['fullName', 'age', 'gender', 'mobile', 'city', 'consent'].forEach(clearFieldError);
    if (statusBanner) {
      statusBanner.style.display = 'none';
      statusBanner.textContent = '';
    }
  }

  function validateForm() {
    clearAllErrors();
    let isValid = true;
    let firstInvalidEl = null;

    // Full Name
    const nameEl = document.getElementById('fullName');
    const name = nameEl ? nameEl.value.trim() : '';
    if (!name || name.length < 2) {
      setFieldError('fullName', 'Please enter your full name (minimum 2 letters).');
      isValid = false;
      if (!firstInvalidEl) firstInvalidEl = nameEl;
    }

    // Age
    const ageEl = document.getElementById('age');
    const age = ageEl ? parseInt(ageEl.value, 10) : 0;
    if (!age || isNaN(age) || age < 8 || age > 99) {
      setFieldError('age', 'Please enter a valid age between 8 and 99 years.');
      isValid = false;
      if (!firstInvalidEl) firstInvalidEl = ageEl;
    }

    // Gender
    const genderChecked = document.querySelector('input[name="gender"]:checked');
    if (!genderChecked) {
      setFieldError('gender', 'Please select your gender.');
      isValid = false;
      if (!firstInvalidEl) firstInvalidEl = document.getElementById('genderMale');
    }

    // Mobile Number
    const mobileEl = document.getElementById('mobile');
    const mobileRaw = mobileEl ? mobileEl.value.trim() : '';
    const mobileDigits = mobileRaw.replace(/\D/g, '');
    if (!mobileDigits || mobileDigits.length < 10) {
      setFieldError('mobile', 'Please enter a valid 10-digit mobile number.');
      isValid = false;
      if (!firstInvalidEl) firstInvalidEl = mobileEl;
    }

    // City
    const cityEl = document.getElementById('city');
    const city = cityEl ? cityEl.value.trim() : '';
    if (!city || city.length < 2) {
      setFieldError('city', 'Please enter your city / location.');
      isValid = false;
      if (!firstInvalidEl) firstInvalidEl = cityEl;
    }

    // Consent Checkbox
    const consentEl = document.getElementById('consent');
    if (!consentEl || !consentEl.checked) {
      setFieldError('consent', 'Please accept the consent to allow Dhyana Yogasthala to contact you.');
      isValid = false;
      if (!firstInvalidEl) firstInvalidEl = consentEl;
    }

    if (!isValid && firstInvalidEl) {
      firstInvalidEl.focus();
      if (statusBanner) {
        statusBanner.className = 'form-status-banner error';
        statusBanner.textContent = 'Please review and fix the highlighted fields above.';
        statusBanner.style.display = 'flex';
      }
    }

    return isValid;
  }

  /**
   * 2. Submission Handler (Google Sheets + Fallback)
   */
  async function handleSubmit(e) {
    if (e) e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const name = document.getElementById('fullName').value.trim();
    const age = document.getElementById('age').value.trim();
    const gender = (document.querySelector('input[name="gender"]:checked') || {}).value || 'Not specified';
    const mobileDigits = document.getElementById('mobile').value.trim().replace(/\D/g, '');
    const mobileFull = `+91 ${mobileDigits}`;
    const city = document.getElementById('city').value.trim();
    const hearAbout = hearAboutSelect ? hearAboutSelect.value : '';
    const reasonEl = document.getElementById('reason');
    const reason = reasonEl ? reasonEl.value.trim() : '';

    const notesSummary = [
      hearAbout ? `Source: ${hearAbout}` : '',
      reason ? `Reason for joining: ${reason}` : ''
    ].filter(Boolean).join(' | ');

    const payload = {
      formKey: 'enquiry-classical-hatha-2026',
      submissionType: 'enquiry',
      source: 'Website Enquiry Page',
      programme: 'Classical Hatha Yoga Classes',
      name: name,
      age: age,
      gender: gender,
      phone: mobileFull,
      city: city,
      location: city,
      howDidYouHear: hearAbout || 'Direct',
      reasonForJoining: reason,
      notes: notesSummary,
      query: reason || 'Enquiry for Classical Hatha Yoga Classes',
      consentAgreed: true,
      submittedAt: new Date().toISOString(),
      date: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    };

    lastSubmission = payload;

    // Button loading state
    if (submitBtn) {
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;
    }

    let sheetSuccess = false;

    try {
      if (ENDPOINT) {
        await fetch(ENDPOINT, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload)
        });
        sheetSuccess = true;
      }
    } catch (err) {
      console.warn('Google Sheet submission warning:', err);
    } finally {
      if (submitBtn) {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
      }
    }

    // Show Success Modal
    openSuccessModal(payload, sheetSuccess);
  }

  /**
   * 3. WhatsApp Message Generator
   */
  function buildWhatsAppMessage(data) {
    return (
      `*Enquiry for Classical Hatha Yoga Classes*\n` +
      `*Dhyana Yogasthala*\n\n` +
      `• *Name:* ${data.name}\n` +
      `• *Age:* ${data.age} yrs | *Gender:* ${data.gender}\n` +
      `• *Mobile:* ${data.phone}\n` +
      `• *City:* ${data.city}\n` +
      (data.howDidYouHear && data.howDidYouHear !== 'Direct' ? `• *Source:* ${data.howDidYouHear}\n` : '') +
      (data.reasonForJoining ? `• *Why Joining:* ${data.reasonForJoining}\n` : '') +
      `\nLooking forward to hearing back within 24 hours. 🙏`
    );
  }

  function openWhatsAppChat() {
    if (!lastSubmission) return;
    const msg = encodeURIComponent(buildWhatsAppMessage(lastSubmission));
    window.open(`https://wa.me/${WHATSAPP_NUM}?text=${msg}`, '_blank', 'noopener,noreferrer');
  }

  /**
   * 4. Accessible Modal Handlers
   */
  function openSuccessModal(data) {
    const nameSpan = document.getElementById('successUserName');
    if (nameSpan) nameSpan.textContent = data.name;

    activeModalTrigger = submitBtn;
    if (successModal) {
      successModal.classList.add('active');
      const firstBtn = successModal.querySelector('button, a');
      if (firstBtn) firstBtn.focus();
    }
  }

  function closeSuccessModal() {
    if (successModal) {
      successModal.classList.remove('active');
    }
    if (activeModalTrigger) {
      activeModalTrigger.focus();
      activeModalTrigger = null;
    }
    // Reset form after successful submission
    if (form) form.reset();
  }

  // Keyboard accessibility (Escape key closes success modal)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && successModal && successModal.classList.contains('active')) {
      closeSuccessModal();
    }
  });

  // Modal backdrop click closes success modal
  if (successModal) {
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        closeSuccessModal();
      }
    });
  }

  // Event Listeners
  if (form) {
    form.addEventListener('submit', handleSubmit);
  }

  // Real-time error clearance on input
  ['fullName', 'age', 'mobile', 'city'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => clearFieldError(id));
    }
  });

  document.querySelectorAll('input[name="gender"]').forEach((radio) => {
    radio.addEventListener('change', () => clearFieldError('gender'));
  });

  const consentBox = document.getElementById('consent');
  if (consentBox) {
    consentBox.addEventListener('change', () => clearFieldError('consent'));
  }

  // Export public methods to window.EnquiryApp for inline handlers
  window.EnquiryApp = {
    handleSubmit: handleSubmit,
    openSuccessModal: openSuccessModal,
    closeSuccessModal: closeSuccessModal,
    openWhatsAppChat: openWhatsAppChat
  };
})();

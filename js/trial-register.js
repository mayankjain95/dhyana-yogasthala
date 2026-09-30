/**
 * js/trial-register.js — Dhyana Yogasthala
 * Participant Registration Logic for Free Trial Class (/info redirected flow)
 * WCAG 2.1 AA Compliant, robust error resiliency, Google Sheets logging & WhatsApp fallback.
 */

(function () {
  'use strict';

  // ── 1. Configuration & Endpoints ──────────────────────────────────────────
  const ENDPOINT = (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.registrationEndpoint)
    ? SITE_CONFIG.registrationEndpoint
    : 'https://script.google.com/macros/s/AKfycbz8Cdz6OreMzP6xb9iZeT9t_HOJhhNDLd__PNDSwFGw3cJaxG8-krPxoK5qPgjaFmtE0g/exec';

  const WHATSAPP_NUM = (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.whatsappNumber)
    ? SITE_CONFIG.whatsappNumber
    : '918950867190';

  // State
  let lastRegistration = null;
  let lastActiveElement = null;

  // DOM Elements
  const form = document.getElementById('trialRegisterForm');
  const submitBtn = document.getElementById('submitBtn');
  const statusBanner = document.getElementById('formStatusBanner');
  const successModal = document.getElementById('successModal');

  // ── 2. Error Helpers & Field Validation ───────────────────────────────────
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
    [
      'fullName',
      'age',
      'gender',
      'mobile',
      'email',
      'city',
      'emergency',
      'goal',
      'experience',
      'pregnancy',
      'health',
      'injury',
      'consentTerms',
      'consentContact'
    ].forEach(clearFieldError);

    if (statusBanner) {
      statusBanner.style.display = 'none';
      statusBanner.textContent = '';
      statusBanner.className = 'form-status-banner';
    }
  }

  function val(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }

  function radioVal(name) {
    const el = document.querySelector(`input[name="${name}"]:checked`);
    return el ? el.value : '';
  }

  function validateForm() {
    clearAllErrors();
    let isValid = true;
    let firstInvalidEl = null;

    // Full Name
    const name = val('fullName');
    if (!name || name.length < 2) {
      setFieldError('fullName', 'Please enter your full name (minimum 2 characters).');
      isValid = false;
      if (!firstInvalidEl) firstInvalidEl = document.getElementById('fullName');
    }

    // Age
    const ageNum = parseInt(val('age'), 10);
    if (!ageNum || isNaN(ageNum) || ageNum < 8 || ageNum > 99) {
      setFieldError('age', 'Please enter a valid age between 8 and 99 years.');
      isValid = false;
      if (!firstInvalidEl) firstInvalidEl = document.getElementById('age');
    }

    // Gender
    const gender = radioVal('gender');
    if (!gender) {
      setFieldError('gender', 'Please select your gender.');
      isValid = false;
      if (!firstInvalidEl) firstInvalidEl = document.getElementById('genderMale');
    }

    // Mobile Number (10 digits)
    const mobileDigits = val('mobile').replace(/\D/g, '');
    if (!mobileDigits || mobileDigits.length < 10) {
      setFieldError('mobile', 'Please enter a valid 10-digit mobile number.');
      isValid = false;
      if (!firstInvalidEl) firstInvalidEl = document.getElementById('mobile');
    }

    // Email Address
    const email = val('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setFieldError('email', 'Please enter a valid email address for session details.');
      isValid = false;
      if (!firstInvalidEl) firstInvalidEl = document.getElementById('email');
    }

    // City & State
    const city = val('city');
    if (!city || city.length < 2) {
      setFieldError('city', 'Please enter your city / location.');
      isValid = false;
      if (!firstInvalidEl) firstInvalidEl = document.getElementById('city');
    }

    // Emergency Contact
    const emergency = val('emergency');
    if (!emergency || emergency.length < 5) {
      setFieldError('emergency', 'Please provide emergency contact details (Name, Relationship & Phone).');
      isValid = false;
      if (!firstInvalidEl) firstInvalidEl = document.getElementById('emergency');
    }

    // Pregnancy Question (for women safety)
    const pregnancy = radioVal('pregnancy');
    if (!pregnancy) {
      setFieldError('pregnancy', 'Please answer the pregnancy / recent birth question (select NA if not applicable).');
      isValid = false;
      if (!firstInvalidEl) firstInvalidEl = document.getElementById('pregNA');
    }

    // Health Condition
    const health = val('health');
    if (!health) {
      setFieldError('health', "Please fill in this health information field (write 'None' if not applicable).");
      isValid = false;
      if (!firstInvalidEl) firstInvalidEl = document.getElementById('health');
    }

    // Illness/Injury
    const injury = val('injury');
    if (!injury) {
      setFieldError('injury', "Please fill in this illness / injury field (write 'None' if not applicable).");
      isValid = false;
      if (!firstInvalidEl) firstInvalidEl = document.getElementById('injury');
    }

    // Consent: Terms & Accuracy
    const consentTerms = document.getElementById('consentTerms');
    if (!consentTerms || !consentTerms.checked) {
      setFieldError('consentTerms', 'Please accept the declaration to participate in the session.');
      isValid = false;
      if (!firstInvalidEl) firstInvalidEl = consentTerms;
    }

    // Consent: Contact permission
    const consentContact = document.getElementById('consentContact');
    if (!consentContact || !consentContact.checked) {
      setFieldError('consentContact', 'Please grant permission for Dhyana Yogasthala to contact you with session details.');
      isValid = false;
      if (!firstInvalidEl) firstInvalidEl = consentContact;
    }

    if (!isValid && firstInvalidEl) {
      firstInvalidEl.focus();
      if (statusBanner) {
        statusBanner.className = 'form-status-banner error';
        statusBanner.textContent = 'Please review the highlighted fields above and correct the errors.';
        statusBanner.style.display = 'flex';
        statusBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    return isValid;
  }

  // ── 3. Data Collection & Google Sheet Submission ─────────────────────────
  function collectFormData() {
    const rawMobile = val('mobile').replace(/\D/g, '');
    const mobileFull = `+91 ${rawMobile}`;
    const selectedDate = radioVal('dateSlot') || '4 Oct 2026 (Sunday)';
    const selectedMode = radioVal('attendanceMode') || 'Studio (Sector-15, Sonepat)';
    const goal = radioVal('goal') || 'Overall Health & Inner well-being';
    const experience = radioVal('experience') || 'No';
    const pregnancy = radioVal('pregnancy') || 'NA';
    const health = val('health');
    const injury = val('injury');
    const notes = val('notes');

    // Build combined notes summary
    const notesArray = [];
    if (selectedDate) notesArray.push(`Preferred Session: ${selectedDate}`);
    if (selectedMode) notesArray.push(`Attendance Mode: ${selectedMode}`);
    if (goal) notesArray.push(`Aspiration: ${goal}`);
    if (experience) notesArray.push(`Prior Yoga: ${experience}`);
    if (pregnancy) notesArray.push(`Pregnancy/Birth status: ${pregnancy}`);
    if (notes) notesArray.push(`Participant Notes: ${notes}`);

    const combinedNotes = notesArray.join(' | ');

    // Explicit details specifying WHICH FORM this info is saved from
    return {
      // Form source tracking
      source: 'Info Page (/info) — Free Trial Participant Form',
      formKey: 'info-trial-registration-2026',
      formName: 'Info Page Free Trial Registration Form',
      submissionType: 'registration',
      programme: 'Free Classical Hatha Yoga Trial Class',
      isFree: true,

      // Session preference
      dateSlot: selectedDate,
      preferredDate: selectedDate,
      attendanceMode: selectedMode,
      mode: selectedMode,

      // Participant Details
      name: val('fullName'),
      fullName: val('fullName'),
      age: val('age'),
      gender: radioVal('gender'),
      phone: mobileFull,
      mobile: mobileFull,
      email: val('email'),
      city: val('city'),
      location: val('city'),
      emergency: val('emergency'),
      emergencyContact: val('emergency'),

      // Yogic & Health Information
      goal: goal,
      experience: experience,
      practicedBefore: experience,
      pregnancy: pregnancy,
      health: health,
      ailments: health,
      injury: injury,
      notes: combinedNotes,
      rawNotes: notes,

      // Consent & Timestamp
      consentAgreed: true,
      submittedAt: new Date().toISOString(),
      date: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      pageUrl: window.location.href,
      referrer: document.referrer || 'Direct / Info Page'
    };
  }

  async function handleSubmit(e) {
    if (e) e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const payload = collectFormData();
    lastRegistration = payload;

    // Button loading state
    if (submitBtn) {
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;
      const textSpan = submitBtn.querySelector('.btn-text');
      if (textSpan) textSpan.textContent = 'Saving Registration…';
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
      console.warn('Google Sheet submission notice:', err);
    } finally {
      if (submitBtn) {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        const textSpan = submitBtn.querySelector('.btn-text');
        if (textSpan) textSpan.textContent = 'Complete Free Registration →';
      }
    }

    // Open Accessible Confirmation Dialog
    openSuccessModal(payload, sheetSuccess);
  }

  // ── 4. WhatsApp Pre-filled Message Generator ──────────────────────────────
  function buildWhatsAppMessage(data) {
    return (
      `*Free Trial Class Registration — Dhyana Yogasthala*\n` +
      `*(Transmitted from Info Page Participant Form)*\n\n` +
      `• *Name:* ${data.name}\n` +
      `• *Session Date:* ${data.dateSlot}\n` +
      `• *Mode:* ${data.attendanceMode}\n` +
      `• *Age:* ${data.age} yrs | *Gender:* ${data.gender}\n` +
      `• *Mobile:* ${data.phone}\n` +
      `• *Email:* ${data.email}\n` +
      `• *City:* ${data.city}\n` +
      `• *Emergency Contact:* ${data.emergency}\n\n` +
      `• *Aspiration:* ${data.goal}\n` +
      `• *Prior Experience:* ${data.experience}\n` +
      `• *Health Condition:* ${data.health}\n` +
      `• *Illness/Injury (3 yrs):* ${data.injury}\n` +
      (data.rawNotes ? `• *Notes:* ${data.rawNotes}\n` : '') +
      `\nPlease confirm my seat and share session instructions. 🙏`
    );
  }

  function openWhatsAppChat() {
    if (!lastRegistration) return;
    const msg = encodeURIComponent(buildWhatsAppMessage(lastRegistration));
    window.open(`https://wa.me/${WHATSAPP_NUM}?text=${msg}`, '_blank', 'noopener,noreferrer');
  }

  // ── 5. Modal Dialog Management (WCAG Focus Trap & Escape Key) ─────────────
  function openSuccessModal(data, sheetSuccess) {
    if (!successModal) return;

    lastActiveElement = document.activeElement;

    // Populate dynamic user details in modal
    const userNameEl = document.getElementById('successUserName');
    if (userNameEl) userNameEl.textContent = data.name;

    const summaryDateEl = document.getElementById('summaryDate');
    if (summaryDateEl) summaryDateEl.textContent = data.dateSlot;

    const summaryModeEl = document.getElementById('summaryMode');
    if (summaryModeEl) summaryModeEl.textContent = data.attendanceMode;

    const summaryPhoneEl = document.getElementById('summaryPhone');
    if (summaryPhoneEl) summaryPhoneEl.textContent = data.phone;

    successModal.classList.add('show');
    document.body.style.overflow = 'hidden';

    // Focus close button or primary modal action
    const closeBtn = successModal.querySelector('.modal-close-icon');
    if (closeBtn) {
      setTimeout(() => closeBtn.focus(), 50);
    }
  }

  function closeSuccessModal() {
    if (!successModal) return;
    successModal.classList.remove('show');
    document.body.style.overflow = '';

    if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
      lastActiveElement.focus();
    }
  }

  // Trap focus inside modal & close on Escape
  document.addEventListener('keydown', function (e) {
    if (!successModal || !successModal.classList.contains('show')) return;

    if (e.key === 'Escape') {
      closeSuccessModal();
      return;
    }

    if (e.key === 'Tab') {
      const focusableElements = successModal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length === 0) return;

      const firstEl = focusableElements[0];
      const lastEl = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }
  });

  // Close modal when clicking backdrop
  if (successModal) {
    successModal.addEventListener('click', function (e) {
      if (e.target === successModal) {
        closeSuccessModal();
      }
    });
  }

  // ── 6. Event Listeners & Live Error Clearing ──────────────────────────────
  if (form) {
    form.addEventListener('submit', handleSubmit);

    // Live validation cleanup on input
    form.addEventListener('input', function (e) {
      const target = e.target;
      if (target.id) {
        clearFieldError(target.id);
      }
      if (target.name === 'gender') {
        clearFieldError('gender');
      }
      if (target.name === 'pregnancy') {
        clearFieldError('pregnancy');
      }
    });
  }

  // Wire up URL preselection if specified in query string (e.g. ?date=oct4 or ?mode=online)
  document.addEventListener('DOMContentLoaded', function () {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('date') === 'oct4' || params.get('date') === '4oct') {
        const octRadio = document.getElementById('batchOct4');
        if (octRadio) octRadio.checked = true;
      }
      if (params.get('mode') === 'online') {
        const onlineRadio = document.getElementById('modeOnline');
        if (onlineRadio) onlineRadio.checked = true;
      }
    } catch (e) {
      // Ignore URL parsing errors
    }
  });

  // Global namespace for accessible modal triggers
  window.TrialRegisterApp = {
    handleSubmit: handleSubmit,
    openWhatsAppChat: openWhatsAppChat,
    closeSuccessModal: closeSuccessModal
  };

})();

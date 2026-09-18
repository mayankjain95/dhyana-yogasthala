/**
 * js/enquiry.js — Dhyana Yogasthala
 * Standalone Enquiry Page Logic & URL Referral Tracking
 * Compliant with WCAG 2.1 AA accessibility and production error resiliency.
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
  let detectedReferralCode = '';
  let lastSubmission = null;
  let activeModalTrigger = null;

  // DOM Elements
  const form = document.getElementById('enquiryForm');
  const submitBtn = document.getElementById('submitBtn');
  const banner = document.getElementById('referralBanner');
  const bannerTag = document.getElementById('referralTag');
  const bannerText = document.getElementById('referralBannerText');
  const referralInput = document.getElementById('referralCode');
  const hearAboutSelect = document.getElementById('hearAbout');
  const hearDetailContainer = document.getElementById('hearDetailContainer');
  const hearDetailInput = document.getElementById('hearDetail');
  const hearDetailLabel = document.getElementById('hearDetailLabel');
  const statusBanner = document.getElementById('formStatusBanner');

  // Modals
  const successModal = document.getElementById('successModal');

  /**
   * 1. URL Referral Code Parser
   * Checks for ?ref=..., ?code=..., ?referral=..., ?r=... or hash #CODE
   */
  function extractReferralCode() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('ref') ||
                   urlParams.get('code') ||
                   urlParams.get('referral') ||
                   urlParams.get('r') ||
                   urlParams.get('id');

      if (code && code.trim()) {
        return sanitizeCode(code);
      }

      // Check URL hash if query string is empty
      const hash = window.location.hash.replace('#', '').trim();
      if (hash && !hash.includes('/') && hash.length <= 32) {
        return sanitizeCode(hash);
      }
    } catch (e) {
      console.warn('Error extracting referral code from URL:', e);
    }
    return '';
  }

  function sanitizeCode(str) {
    return str.trim().toUpperCase().replace(/[^A-Z0-9_-]/gi, '');
  }

  /**
   * 2. Initialize Referral UI with Registry Mapping
   */
  /**
   * Static referral registry (encapsulated locally inside enquiry module)
   * Only these 5 static codes are recognized. Any other code or missing code results in 404.
   */
  const STATIC_REFERRAL_REGISTRY = {
    'K9M2X7': { code: 'K9M2X7', name: 'Person 1', category: 'Doctor referral' },
    'T4P8W1': { code: 'T4P8W1', name: 'Person 2', category: 'Doctor referral' },
    'R7W3Q9': { code: 'R7W3Q9', name: 'Person 3', category: 'Friend / Family' },
    'M5V2Q6': { code: 'M5V2Q6', name: 'Person 4', category: 'Friend / Family' },
    'B8N4L2': { code: 'B8N4L2', name: 'Person 5', category: 'Other' }
  };

  function lookupReferrer(code) {
    const clean = sanitizeCode(code);
    return STATIC_REFERRAL_REGISTRY[clean] || null;
  }

  function initReferral() {
    detectedReferralCode = extractReferralCode();
    const cleanCode = sanitizeCode(detectedReferralCode);
    const mapped = lookupReferrer(cleanCode);

    const enquiryLayout = document.getElementById('enquiryLayout');
    const notFoundLayout = document.getElementById('notFoundLayout');

    // STRICT VALIDATION: If referral code is missing OR unmapped -> Show standard 404 Page Not Found
    if (!cleanCode || !mapped) {
      document.title = '404 · Page Not Found | Dhyana Yogasthala';
      if (enquiryLayout) {
        enquiryLayout.style.display = 'none';
      }
      if (notFoundLayout) {
        notFoundLayout.style.display = 'flex';
      }
      if (banner) {
        banner.style.display = 'none';
      }
      return;
    }

    // Valid static referral code verified!
    document.title = 'Enquiry for Classical Hatha Yoga Classes | Dhyana Yogasthala';
    if (notFoundLayout) {
      notFoundLayout.style.display = 'none';
    }
    if (enquiryLayout) {
      enquiryLayout.style.display = 'grid';
    }

    // Ensure referralInput is strictly readonly & locked
    if (referralInput) {
      referralInput.value = cleanCode;
      referralInput.setAttribute('readonly', 'true');
      referralInput.setAttribute('tabindex', '-1');
    }

    const referralBadgeText = document.getElementById('referralBadgeText');
    const referralStatusTag = document.getElementById('referralStatusTag');

    if (referralBadgeText) {
      referralBadgeText.textContent = 'Verified';
      referralBadgeText.classList.add('verified');
    }

    if (referralStatusTag) {
      referralStatusTag.textContent = '✓ Verified invitation';
    }

    if (bannerTag) {
      bannerTag.textContent = cleanCode;
    }

    if (banner) {
      banner.style.display = 'flex';
    }

    // Automatically select category if mapped in registry
    if (mapped.category && hearAboutSelect) {
      hearAboutSelect.value = mapped.category;
      updateConditionalField();
      if (hearDetailInput) {
        hearDetailInput.value = `Referral Code: ${cleanCode}`;
      }
    }
  }

  /**
   * 3. Dynamic "How did you hear about us?" Field
   */
  function updateConditionalField() {
    if (!hearAboutSelect || !hearDetailContainer || !hearDetailLabel) return;
    const value = hearAboutSelect.value;

    if (value === 'Doctor referral') {
      hearDetailLabel.innerHTML = 'Doctor\'s Name / Hospital / Clinic <span class="optional-tag">(optional)</span>';
      hearDetailInput.placeholder = 'e.g. Dr. Rajesh Sharma, Max Healthcare';
      hearDetailContainer.classList.add('visible');
    } else if (value === 'Friend / Family') {
      hearDetailLabel.innerHTML = 'Friend or Family Member\'s Name <span class="optional-tag">(optional)</span>';
      hearDetailInput.placeholder = 'Who recommended Dhyana Yogasthala to you?';
      hearDetailContainer.classList.add('visible');
    } else if (value === 'Other') {
      hearDetailLabel.innerHTML = 'Please Specify <span class="optional-tag">(optional)</span>';
      hearDetailInput.placeholder = 'e.g. Instagram, Community flyer, WhatsApp group...';
      hearDetailContainer.classList.add('visible');
    } else {
      hearDetailContainer.classList.remove('visible');
      if (hearDetailInput && !detectedReferralCode) {
        hearDetailInput.value = '';
      }
    }
  }

  /**
   * 4. Validation & Accessibility Error Messaging
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
   * 5. Submission Handler (Google Sheets + Fallback)
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
    const hearAbout = hearAboutSelect ? hearAboutSelect.value : 'Not specified';
    const hearAboutDetail = (hearDetailInput && hearDetailInput.value.trim()) || '';
    const referralCode = (referralInput && referralInput.value.trim().toUpperCase()) || detectedReferralCode || '';
    const mapped = lookupReferrer(referralCode);
    if (!mapped) {
      if (statusBanner) {
        statusBanner.className = 'form-status-banner error';
        statusBanner.textContent = 'Invalid referral code. Please use an authorized referral link to submit an enquiry.';
        statusBanner.style.display = 'flex';
      }
      return;
    }
    const referrerPerson = mapped.name;

    // Notes summary combining reason, referral code, and source for sheet columns that map 'notes'
    const notesSummary = [
      `Referral Code: ${referralCode} (${referrerPerson})`,
      `Source: ${hearAbout}${hearAboutDetail ? ` (${hearAboutDetail})` : ''}`,
      reason ? `Reason for joining: ${reason}` : ''
    ].filter(Boolean).join(' | ');

    const payload = {
      formKey: 'enquiry-classical-hatha-2026',
      submissionType: 'enquiry',
      source: 'Referral Enquiry Page',
      programme: 'Classical Hatha Yoga Classes',
      referralCode: referralCode,
      referrerName: referrerPerson,
      name: name,
      age: age,
      gender: gender,
      phone: mobileFull,
      city: city,
      location: city,
      howDidYouHear: hearAbout,
      referralDetail: hearAboutDetail,
      reasonForJoining: reason,
      notes: notesSummary,
      query: notesSummary,
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
      // Still show success/WhatsApp option since no lead should be lost
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
   * 6. WhatsApp Message Generator
   */
  function buildWhatsAppMessage(data) {
    const refDisplay = (data.referrerName && data.referrerName !== 'Direct Seeker')
      ? `${data.referralCode} (${data.referrerName})`
      : data.referralCode;

    return (
      `*Enquiry for Classical Hatha Yoga Classes*\n` +
      `*Dhyana Yogasthala*\n\n` +
      `• *Name:* ${data.name}\n` +
      `• *Age:* ${data.age} yrs | *Gender:* ${data.gender}\n` +
      `• *Mobile:* ${data.phone}\n` +
      `• *City:* ${data.city}\n` +
      `• *Referral Code:* ${refDisplay}\n` +
      `• *Source:* ${data.howDidYouHear}${data.referralDetail ? ' (' + data.referralDetail + ')' : ''}\n` +
      `• *Why Joining:* ${data.reasonForJoining}\n\n` +
      `Looking forward to hearing back within 24 hours. 🙏`
    );
  }

  function openWhatsAppChat() {
    if (!lastSubmission) return;
    const msg = encodeURIComponent(buildWhatsAppMessage(lastSubmission));
    window.open(`https://wa.me/${WHATSAPP_NUM}?text=${msg}`, '_blank', 'noopener,noreferrer');
  }

  /**
   * 7. Accessible Modal Handlers
   */
  function openSuccessModal(data, sheetSuccess) {
    const nameSpan = document.getElementById('successUserName');
    const refSpan = document.getElementById('successUserRef');

    if (nameSpan) nameSpan.textContent = data.name;
    if (refSpan) {
      const refLabel = (data.referrerName && data.referrerName !== 'Direct Seeker')
        ? `${data.referralCode} · ${data.referrerName}`
        : data.referralCode;

      refSpan.textContent = data.referralCode && data.referralCode !== 'DIRECT'
        ? `(Referral: ${refLabel})`
        : '';
    }

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
    initReferral();
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

  if (hearAboutSelect) {
    hearAboutSelect.addEventListener('change', updateConditionalField);
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

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    initReferral();
    updateConditionalField();
  });

  // Export public methods to window.EnquiryApp for inline handlers
  window.EnquiryApp = {
    handleSubmit: handleSubmit,
    openSuccessModal: openSuccessModal,
    closeSuccessModal: closeSuccessModal,
    openWhatsAppChat: openWhatsAppChat
  };
})();

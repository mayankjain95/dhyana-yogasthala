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
   * 2. Cryptographic Referral Code Verification (SHA-256)
   * Plain-text referral codes are NEVER stored in this file.
   * Anyone downloading or inspecting this script will only see irreversible SHA-256 hashes.
   */
  function sha256(ascii) {
    function rightRotate(value, amount) {
      return (value >>> amount) | (value << (32 - amount));
    }
    const mathPow = Math.pow;
    const maxWord = mathPow(2, 32);
    let i, j;
    let result = '';
    let words = [];
    let asciiBitLength = ascii.length * 8;
    let hash = [];
    let k = [];
    let primeCounter = 0;
    let isComposite = {};

    for (let candidate = 2; primeCounter < 64; candidate++) {
      if (!isComposite[candidate]) {
        for (i = 0; i < 313; i += candidate) {
          isComposite[i] = candidate;
        }
        hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
        k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
      }
    }

    hash = hash.slice(0, 8);
    ascii += '\x80';
    while ((ascii.length % 64) - 56) ascii += '\x00';

    for (i = 0; i < ascii.length; i++) {
      j = ascii.charCodeAt(i);
      if (j >> 8) return '';
      words[i >> 2] |= j << ((3 - i) % 4) * 8;
    }

    words[words.length] = (asciiBitLength / maxWord) | 0;
    words[words.length] = asciiBitLength;

    for (j = 0; j < words.length;) {
      let w = words.slice(j, (j += 16));
      let oldHash = hash;
      hash = hash.slice(0, 8);

      for (i = 0; i < 64; i++) {
        let w15 = w[i - 15], w2 = w[i - 2];
        let s0 = rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3);
        let s1 = rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10);
        let ch = (hash[4] & hash[5]) ^ (~hash[4] & hash[6]);
        let temp1 = hash[7] + (rightRotate(hash[4], 6) ^ rightRotate(hash[4], 11) ^ rightRotate(hash[4], 25)) + ch + k[i] + (w[i] = (i < 16) ? w[i] : (w[i - 16] + s0 + w[i - 7] + s1) | 0);
        let temp2 = (rightRotate(hash[0], 2) ^ rightRotate(hash[0], 13) ^ rightRotate(hash[0], 22)) + ((hash[0] & hash[1]) ^ (hash[0] & hash[2]) ^ (hash[1] & hash[2]));

        hash = [(temp1 + temp2) | 0].concat(hash);
        hash[4] = (hash[4] + temp1) | 0;
      }

      for (i = 0; i < 8; i++) {
        hash[i] = (hash[i] + oldHash[i]) | 0;
      }
    }

    for (i = 0; i < 8; i++) {
      for (j = 3; j + 1; j--) {
        let b = (hash[i] >> (j * 8)) & 255;
        result += ((b < 16) ? 0 : '') + b.toString(16);
      }
    }
    return result;
  }

  // SHA-256 hashed registry: keys are mathematically irreversible hashes of the valid codes
  const HASHED_REFERRAL_REGISTRY = {
    '5f8c645a4a8d644f06bb7583ae93ae0768dc06dee1db272cb4bd27b0b4037f8d': { name: 'Person 1', category: 'Doctor referral' },
    '20cf5ba6d7b1e811ba53553aed478f6708e8f3c8b857ebe4572de223d36d533d': { name: 'Person 2', category: 'Doctor referral' },
    'cf5481418297e6414125113edb6debdb9d41b58ddcd38e4fa16f659d4d7a3d78': { name: 'Person 3', category: 'Friend / Family' },
    'c6244bc9c55d8937fa57db5b77eb5388ba653daf6e7e174bbdee8fd948247951': { name: 'Person 4', category: 'Friend / Family' },
    '1b50a8b885d0b5ab514d1dcf9faff9027e23803d7241b3debde1da391d8a5736': { name: 'Person 5', category: 'Other' }
  };

  function lookupReferrer(code) {
    if (!code) return null;
    const clean = sanitizeCode(code);
    const hash = sha256(clean);
    return HASHED_REFERRAL_REGISTRY[hash] || null;
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

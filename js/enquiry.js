/**
 * js/enquiry.js — Dhyana Yogasthala
 * Classical Hatha Yoga Programme Registration & Payment Scanner Logic
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

  /**
   * SCANNER CONFIGURATION
   * Scanner information can be updated or overridden here.
   * If custom scanner QR code image URLs are provided per program,
   * add them to the `customProgramScanners` map below.
   */
  const SCANNER_CONFIG = {
    upiId: 'shruti.shruti.jain84@okaxis',
    payeeName: 'Dhyana Yogasthala',
    currency: 'INR',
    transactionNote: 'Payment',
    fallbackQrImage: 'assets/images/upi-qr.webp'
  };

  /**
   * REFERRAL TRACKING REGISTRY
   * Maps recognized static codes to referrer information.
   * Any unique code passed via URL (?ref=..., ?code=..., ?referral=...) is captured and recorded.
   */
  const REFERRAL_REGISTRY = {
    'K9M2X7': { name: 'Person 1', category: 'Doctor referral' },
    'T4P8W1': { name: 'Person 2', category: 'Doctor referral' },
    'R7W3Q9': { name: 'Person 3', category: 'Friend / Family' },
    'M5V2Q6': { name: 'Person 4', category: 'Friend / Family' },
    'B8N4L2': { name: 'Person 5', category: 'Other' }
  };

  let detectedReferralCode = '';

  function extractReferralCode() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const codeFromUrl = urlParams.get('ref') || urlParams.get('code') || urlParams.get('referral') || urlParams.get('r');
      if (codeFromUrl && codeFromUrl.trim()) {
        const clean = codeFromUrl.trim().toUpperCase();
        try {
          sessionStorage.setItem('dhyana_referral_code', clean);
        } catch (_) {}
        return clean;
      }
      const stored = sessionStorage.getItem('dhyana_referral_code');
      if (stored) return stored.trim().toUpperCase();
    } catch (_) {}

    const hiddenField = document.getElementById('referralCode');
    if (hiddenField && hiddenField.value.trim()) {
      return hiddenField.value.trim().toUpperCase();
    }
    return '';
  }

  function initReferralTracking() {
    detectedReferralCode = extractReferralCode();
    const hiddenField = document.getElementById('referralCode');

    if (detectedReferralCode) {
      if (hiddenField) hiddenField.value = detectedReferralCode;
    } else {
      if (hiddenField) hiddenField.value = 'DIRECT';
    }
  }

  /**
   * PROGRAM CATALOGUE
   * 15 Classical Hatha Yoga Therapeutic & Wellness Programmes
   */
  const PROGRAM_CATALOG = {
    'asthma': {
      id: 'asthma',
      title: 'Asthma',
      days: '4 days',
      hours: '2 hours',
      price: 4500,
      priceFormatted: '₹4,500'
    },
    'sinusitis': {
      id: 'sinusitis',
      title: 'Sinusitis',
      days: '4 days',
      hours: '2 hours',
      price: 5500,
      priceFormatted: '₹5,500'
    },
    'tinnitus-vertigo': {
      id: 'tinnitus-vertigo',
      title: 'Tinnitus & Vertigo',
      days: '2 days',
      hours: '1 hour',
      price: 2000,
      priceFormatted: '₹2,000'
    },
    'diabetes': {
      id: 'diabetes',
      title: 'Diabetes',
      days: '5 days',
      hours: '2 hours',
      price: 5500,
      priceFormatted: '₹5,500'
    },
    'hypertension': {
      id: 'hypertension',
      title: 'Hypertension',
      days: '5 days',
      hours: '2 hours',
      price: 5500,
      priceFormatted: '₹5,500'
    },
    'cervical-back-pain': {
      id: 'cervical-back-pain',
      title: 'Cervical / Back Pain',
      days: '4 days',
      hours: '2 hours',
      price: 4500,
      priceFormatted: '₹4,500'
    },
    'joint-problems': {
      id: 'joint-problems',
      title: 'Joint Problems',
      days: '6 days',
      hours: '2 hours',
      price: 6500,
      priceFormatted: '₹6,500'
    },
    'hormonal-menstrual': {
      id: 'hormonal-menstrual',
      title: 'Hormonal Imbalance / Menstrual Problems',
      days: '5 days',
      hours: '2 hours',
      price: 5500,
      priceFormatted: '₹5,500'
    },
    'reproductive-organ': {
      id: 'reproductive-organ',
      title: 'Reproductive Organ Related Disease',
      days: '6 days',
      hours: '2.5 hours',
      price: 6500,
      priceFormatted: '₹6,500'
    },
    'skin-diseases': {
      id: 'skin-diseases',
      title: 'Skin Diseases',
      days: '5 days',
      hours: '2 hours',
      price: 5500,
      priceFormatted: '₹5,500'
    },
    'weight-loss': {
      id: 'weight-loss',
      title: 'Weight Loss',
      days: '4 days',
      hours: '2.5 hours',
      price: 5500,
      priceFormatted: '₹5,500'
    },
    'mental-health': {
      id: 'mental-health',
      title: 'Mental Imbalance / Depression / Mood Disorder / Psychosis / Anxiety',
      days: '4 days',
      hours: '2.5 hours',
      price: 4500,
      priceFormatted: '₹4,500'
    },
    'cancer': {
      id: 'cancer',
      title: 'Cancer',
      days: '5 days',
      hours: '2 hours',
      price: 6500,
      priceFormatted: '₹6,500'
    },
    'cardiac-diseases': {
      id: 'cardiac-diseases',
      title: 'Cardiac Diseases',
      days: '5 days',
      hours: '2 hours',
      price: 6500,
      priceFormatted: '₹6,500'
    },
    'gastrointestinal': {
      id: 'gastrointestinal',
      title: 'Gastrointestinal Problem / Gastritis / Heart Burn',
      days: '6 days',
      hours: '2-2.5 hours',
      price: 7500,
      priceFormatted: '₹7,500'
    },
    'prenatal-yoga': {
      id: 'prenatal-yoga',
      title: 'Prenatal Yoga',
      days: '3 days',
      hours: '2 hours',
      price: 4500,
      priceFormatted: '₹4,500'
    },
    'overall-health': {
      id: 'overall-health',
      title: 'Overall Health and Well-being',
      days: '3 days',
      hours: '2 hours',
      price: 4500,
      priceFormatted: '₹4,500'
    }
  };

  // State
  let selectedProgram = null;
  let lastRegistration = null;
  let activeModalTrigger = null;

  // DOM Elements
  const form = document.getElementById('enquiryForm');
  const submitBtn = document.getElementById('submitBtn');
  const programSelect = document.getElementById('programSelect');
  const statusBanner = document.getElementById('formStatusBanner');
  const successModal = document.getElementById('successModal');

  // Payment Section DOM Elements
  const paymentSection = document.getElementById('paymentSection');
  const payProgTitle = document.getElementById('payProgTitle');
  const payProgDays = document.getElementById('payProgDays');
  const payProgHours = document.getElementById('payProgHours');
  const payProgAmount = document.getElementById('payProgAmount');
  const payInstructionsAmount = document.getElementById('payInstructionsAmount');
  const qrCodeImage = document.getElementById('qrCodeImage');
  const qrLoadingSpinner = document.getElementById('qrLoadingSpinner');
  const upiIdDisplay = document.getElementById('upiIdDisplay');
  const copyUpiBtn = document.getElementById('copyUpiBtn');
  const copyUpiText = document.getElementById('copyUpiText');
  const copyUpiIcon = document.getElementById('copyUpiIcon');
  const payUpiDirectBtn = document.getElementById('payUpiDirectBtn');

  // Initialize UPI ID display
  if (upiIdDisplay) {
    upiIdDisplay.textContent = SCANNER_CONFIG.upiId;
  }

  /**
   * 1. Dynamic Payment & Scanner Updating
   */
  function buildUpiUri(program) {
    const upiId = SCANNER_CONFIG.upiId;
    const name = encodeURIComponent(SCANNER_CONFIG.payeeName);
    const amount = program.price;
    const note = encodeURIComponent(SCANNER_CONFIG.transactionNote);
    // upi://pay?pa=shruti.shruti.jain84@okaxis&pn=Dhyana%20Yogasthala&am=2000&cu=INR&tn=Payment
    return `upi://pay?pa=${upiId}&pn=${name}&am=${amount}&cu=INR&tn=${note}`;
  }

  function renderDynamicQr(upiUri) {
    const qrContainer = document.getElementById('dynamicQrCode');
    if (!qrContainer) return;

    qrContainer.innerHTML = '';
    if (qrLoadingSpinner) qrLoadingSpinner.style.display = 'none';

    // 1. Client-side instant Canvas / SVG QR generation via qrcode.min.js
    if (typeof QRCode !== 'undefined') {
      try {
        new QRCode(qrContainer, {
          text: upiUri,
          width: 200,
          height: 200,
          colorDark: '#1e1710',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.M
        });
        return;
      } catch (err) {
        console.warn('Local QRCode generator warning:', err);
      }
    }

    // 2. Fallback to dynamic image API if QRCode is unavailable
    const img = document.createElement('img');
    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=8&data=${encodeURIComponent(upiUri)}`;
    img.alt = 'UPI QR Code for Payment';
    img.className = 'payment-qr-img';
    img.onerror = function () {
      img.src = SCANNER_CONFIG.fallbackQrImage;
    };
    qrContainer.appendChild(img);
  }

  function updatePaymentScanner(programId) {
    if (!programId || !PROGRAM_CATALOG[programId]) {
      selectedProgram = null;
      if (paymentSection) {
        paymentSection.style.display = 'none';
        paymentSection.classList.remove('active');
      }
      return;
    }

    selectedProgram = PROGRAM_CATALOG[programId];

    // Update Header Text & Fee
    if (payProgTitle) payProgTitle.textContent = selectedProgram.title;
    if (payProgDays) payProgDays.textContent = selectedProgram.days;
    if (payProgHours) payProgHours.textContent = selectedProgram.hours;
    if (payProgAmount) payProgAmount.textContent = selectedProgram.priceFormatted;
    if (payInstructionsAmount) payInstructionsAmount.textContent = selectedProgram.priceFormatted;

    // Build the dynamic UPI intent URL:
    // upi://pay?pa=shruti.shruti.jain84@okaxis&pn=Dhyana%20Yogasthala&am=<amount>&cu=INR&tn=Payment
    const upiUri = buildUpiUri(selectedProgram);

    // Update direct UPI mobile link
    if (payUpiDirectBtn) {
      payUpiDirectBtn.href = upiUri;
    }

    // Dynamically generate QR code
    renderDynamicQr(upiUri);

    // Display payment section with smooth animation
    if (paymentSection) {
      paymentSection.style.display = 'block';
      requestAnimationFrame(() => {
        paymentSection.classList.add('active');
      });
    }
  }

  /**
   * 2. Copy UPI ID to Clipboard
   */
  function copyUpiIdToClipboard() {
    const textToCopy = SCANNER_CONFIG.upiId;
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(textToCopy).then(showCopiedState).catch(() => fallbackCopy(textToCopy));
    } else {
      fallbackCopy(textToCopy);
    }
  }

  function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showCopiedState();
    } catch (err) {
      console.warn('Unable to copy UPI ID:', err);
    }
    document.body.removeChild(textArea);
  }

  function showCopiedState() {
    if (!copyUpiBtn) return;
    copyUpiBtn.classList.add('copied');
    if (copyUpiText) copyUpiText.textContent = 'Copied!';
    if (copyUpiIcon) copyUpiIcon.textContent = '✓';

    setTimeout(() => {
      copyUpiBtn.classList.remove('copied');
      if (copyUpiText) copyUpiText.textContent = 'Copy';
      if (copyUpiIcon) copyUpiIcon.textContent = '📋';
    }, 2000);
  }

  /**
   * 3. Form Validation & Accessible Error Messages
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
    ['fullName', 'mobile', 'programSelect', 'consent'].forEach(clearFieldError);
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

    // Phone / Mobile Number
    const mobileEl = document.getElementById('mobile');
    const mobileRaw = mobileEl ? mobileEl.value.trim() : '';
    const mobileDigits = mobileRaw.replace(/\D/g, '');
    if (!mobileDigits || mobileDigits.length < 10) {
      setFieldError('mobile', 'Please enter a valid 10-digit mobile number.');
      isValid = false;
      if (!firstInvalidEl) firstInvalidEl = mobileEl;
    }

    // Program selection
    const progVal = programSelect ? programSelect.value : '';
    if (!progVal || !PROGRAM_CATALOG[progVal]) {
      setFieldError('programSelect', 'Please select a programme from the list.');
      isValid = false;
      if (!firstInvalidEl) firstInvalidEl = programSelect;
    }

    // Consent Checkbox
    const consentEl = document.getElementById('consent');
    if (!consentEl || !consentEl.checked) {
      setFieldError('consent', 'Please agree to allow Dhyana Yogasthala to contact you.');
      isValid = false;
      if (!firstInvalidEl) firstInvalidEl = consentEl;
    }

    if (!isValid && firstInvalidEl) {
      firstInvalidEl.focus();
      if (statusBanner) {
        statusBanner.className = 'form-status-banner error';
        statusBanner.textContent = 'Please review and complete the highlighted fields above.';
        statusBanner.style.display = 'flex';
      }
    }

    return isValid;
  }

  /**
   * 4. Submission Handler (Google Sheets & Confirmation Modal)
   */
  async function handleSubmit(e) {
    if (e) e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const name = document.getElementById('fullName').value.trim();
    const mobileDigits = document.getElementById('mobile').value.trim().replace(/\D/g, '');
    const mobileFull = `+91 ${mobileDigits}`;
    const prog = PROGRAM_CATALOG[programSelect.value];

    const referralCode = (document.getElementById('referralCode') && document.getElementById('referralCode').value.trim().toUpperCase())
      || detectedReferralCode
      || 'DIRECT';
    const mappedReferrer = REFERRAL_REGISTRY[referralCode];
    const referrerName = mappedReferrer ? `${mappedReferrer.name} (${referralCode})` : (referralCode !== 'DIRECT' ? referralCode : 'Direct');

    const notesSummary = `Source: enquiry.html | Referral Code: ${referralCode} (${referrerName}) | Programme: ${prog.title} (${prog.days} | ${prog.hours}) | Fee: ${prog.priceFormatted}`;

    const payload = {
      formKey: 'enquiry-classical-hatha-2026',
      submissionType: 'enquiry',
      source: 'enquiry.html', // As requested: source enquiry.html
      page: 'enquiry.html',
      pageUrl: window.location.href,
      referralCode: referralCode, // As requested: unique code for whose referral registration has been done
      uniqueReferralCode: referralCode,
      referral: referralCode,
      referrer: referrerName,
      referrerName: referrerName,
      referralDetail: referrerName,
      name: name,
      phone: mobileDigits, // 10-digit number prevents Google Sheets from parsing leading '+' as formula error
      mobile: mobileDigits,
      phoneFormatted: mobileFull,
      programme: prog.title,
      programmeId: prog.id,
      duration: prog.days,
      hours: prog.hours,
      fee: prog.priceFormatted,
      amount: prog.price,
      city: 'Online / Sonepat',
      location: 'Online / Sonepat',
      howDidYouHear: referralCode !== 'DIRECT' ? `Referral: ${referralCode}` : 'Direct',
      reasonForJoining: `Registration for ${prog.title} (${prog.days} | ${prog.hours})`,
      notes: notesSummary,
      query: notesSummary,
      consentAgreed: true,
      notifyEmail: (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.adminNotificationEmail) ? SITE_CONFIG.adminNotificationEmail : '',
      emailSubject: `🌿 New Yoga Registration: ${name} — ${prog.title} (${prog.priceFormatted})`,
      submittedAt: new Date().toISOString(),
      date: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    };

    lastRegistration = payload;

    // Submit button loading animation
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

    // Display Confirmation Popup
    openSuccessModal(payload, sheetSuccess);
  }

  /**
   * 5. WhatsApp Message Generator for Instant Confirmation
   */
  function buildWhatsAppMessage(data) {
    const refLine = (data.referralCode && data.referralCode !== 'DIRECT')
      ? `• *Referral Code:* ${data.referralCode}\n`
      : '';

    return (
      `*Registration for Classical Hatha Yoga Programme*\n` +
      `*Dhyana Yogasthala*\n\n` +
      `• *Name:* ${data.name}\n` +
      `• *Phone:* ${data.phone}\n` +
      `• *Programme:* ${data.programme}\n` +
      `• *Duration:* ${data.duration} | ${data.hours}\n` +
      `• *Fee:* ${data.fee}\n` +
      refLine +
      `• *Source:* enquiry.html\n\n` +
      `I have submitted my registration and look forward to hearing back within 24 hours. 🙏`
    );
  }

  function openWhatsAppChat() {
    if (!lastRegistration) return;
    const msg = encodeURIComponent(buildWhatsAppMessage(lastRegistration));
    window.open(`https://wa.me/${WHATSAPP_NUM}?text=${msg}`, '_blank', 'noopener,noreferrer');
  }

  /**
   * 6. Accessible Modal Handlers (WCAG Dialog)
   */
  function openSuccessModal(data) {
    // Populate summary card
    const nameEl = document.getElementById('summaryParticipantName');
    const phoneEl = document.getElementById('summaryParticipantPhone');
    const progEl = document.getElementById('summaryProgrammeTitle');
    const feeEl = document.getElementById('summaryProgrammeFee');
    const referralRow = document.getElementById('summaryReferralRow');
    const referralCodeEl = document.getElementById('summaryReferralCode');

    if (nameEl) nameEl.textContent = data.name;
    if (phoneEl) phoneEl.textContent = data.phone;
    if (progEl) progEl.textContent = `${data.programme} (${data.duration} · ${data.hours})`;
    if (feeEl) feeEl.textContent = data.fee;

    if (referralRow && referralCodeEl) {
      if (data.referralCode && data.referralCode !== 'DIRECT') {
        referralCodeEl.textContent = data.referralCode;
        referralRow.style.display = 'flex';
      } else {
        referralRow.style.display = 'none';
      }
    }

    activeModalTrigger = submitBtn;
    if (successModal) {
      successModal.classList.add('active');
      const mainEl = document.getElementById('main-content');
      if (mainEl) mainEl.setAttribute('aria-hidden', 'true');
      const firstBtn = successModal.querySelector('button, a');
      if (firstBtn) firstBtn.focus();
    }
  }

  function closeSuccessModal() {
    if (successModal) {
      successModal.classList.remove('active');
    }
    const mainEl = document.getElementById('main-content');
    if (mainEl) mainEl.removeAttribute('aria-hidden');

    if (activeModalTrigger) {
      activeModalTrigger.focus();
      activeModalTrigger = null;
    }
    // Reset form after completed registration
    if (form) {
      form.reset();
      updatePaymentScanner('');
    }
  }

  // Keyboard accessibility: Escape key closes modal & Tab focus is strictly trapped
  document.addEventListener('keydown', (e) => {
    if (!successModal || !successModal.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeSuccessModal();
      return;
    }

    if (e.key === 'Tab') {
      const focusables = successModal.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first || !successModal.contains(document.activeElement)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last || !successModal.contains(document.activeElement)) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  });

  // Backdrop click closes modal
  if (successModal) {
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        closeSuccessModal();
      }
    });
  }

  /**
   * 7. Event Listeners Initialization
   */
  if (programSelect) {
    programSelect.addEventListener('change', (e) => {
      clearFieldError('programSelect');
      updatePaymentScanner(e.target.value);
    });
  }

  if (copyUpiBtn) {
    copyUpiBtn.addEventListener('click', copyUpiIdToClipboard);
  }

  if (form) {
    form.addEventListener('submit', handleSubmit);
  }

  // Real-time error clearance
  ['fullName', 'mobile'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => clearFieldError(id));
    }
  });

  const consentBox = document.getElementById('consent');
  if (consentBox) {
    consentBox.addEventListener('change', () => clearFieldError('consent'));
  }

  // Initialize referral tracking on page load
  initReferralTracking();

  // Expose to window.EnquiryApp
  window.EnquiryApp = {
    handleSubmit: handleSubmit,
    openSuccessModal: openSuccessModal,
    closeSuccessModal: closeSuccessModal,
    openWhatsAppChat: openWhatsAppChat,
    updatePaymentScanner: updatePaymentScanner,
    initReferralTracking: initReferralTracking,
    extractReferralCode: extractReferralCode,
    PROGRAM_CATALOG: PROGRAM_CATALOG,
    SCANNER_CONFIG: SCANNER_CONFIG,
    REFERRAL_REGISTRY: REFERRAL_REGISTRY
  };
})();

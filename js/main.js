  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) setTimeout(() => entry.target.classList.add('visible'), i * 80);
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => observer.observe(el));
  let lastActiveModalTrigger = null;
  function openModal(program) {
    lastActiveModalTrigger = document.activeElement;
    document.getElementById('modal-title').textContent = program;
    document.getElementById('modal-form-content').style.display = 'block';
    document.getElementById('modal-success').style.display = 'none';
    const modal = document.getElementById('modal');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    const firstFocus = modal.querySelector('button, input, select, textarea');
    if (firstFocus) firstFocus.focus();
  }
  function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('open');
    document.body.style.overflow = '';
    if (lastActiveModalTrigger && typeof lastActiveModalTrigger.focus === 'function') {
      lastActiveModalTrigger.focus();
    }
  }

  // Modal keyboard accessibility: Escape & Tab focus trap
  document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('modal');
    if (!modal || !modal.classList.contains('open')) return;
    if (e.key === 'Escape') {
      closeModal();
      return;
    }
    if (e.key === 'Tab') {
      const focusables = modal.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first || !modal.contains(document.activeElement)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last || !modal.contains(document.activeElement)) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  });
  function submitBooking() {
    // Collect form data from modal
    const program = document.getElementById('modal-title').textContent;
    const nameEl = document.querySelector('#modal-form-content input[type="text"]');
    const emailEl = document.querySelector('#modal-form-content input[type="email"]');
    const phoneEl = document.querySelector('#modal-form-content input[type="tel"]');
    const locationEl = document.querySelector('#modal-form-content select');
    const msgEl = document.querySelector('#modal-form-content textarea');
    const name = nameEl ? nameEl.value.trim() : '';
    const phone = phoneEl ? phoneEl.value.trim() : '';
    const cleanPhone = phone.replace(/\D/g, '');
    if (!name || name.length < 2) { alert('Please enter your full name (minimum 2 characters).'); return; }
    if (!cleanPhone || cleanPhone.length < 10) { alert('Please enter a valid 10-digit mobile number so Shruti can reach you.'); return; }

    const endpoint = (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.registrationEndpoint) ? SITE_CONFIG.registrationEndpoint : '';
    const waNum = (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.whatsappNumber) ? SITE_CONFIG.whatsappNumber : '918950867190';

    // Log to Google Sheet asynchronously
    if (endpoint) {
      fetch(endpoint, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          formKey: 'enquiry-classical-hatha-2026',
          submissionType: 'enquiry',
          source: 'Website Modal Booking',
          programme: program || 'Modal Booking',
          name: name,
          phone: cleanPhone,
          email: emailEl ? emailEl.value : '',
          location: locationEl ? locationEl.value : '',
          notes: msgEl ? msgEl.value : '',
          notifyEmail: (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.adminNotificationEmail) ? SITE_CONFIG.adminNotificationEmail : 'mayank.jain875@gmail.com',
          emailSubject: `🧘 New Program Booking: ${name} — ${program || 'Yoga Program'}`,
          date: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
        })
      }).catch(err => console.warn('Sheet log notice:', err));
    }

    // Build WhatsApp message
    const waMsg = encodeURIComponent(
      `*New Booking Request — Dhyana Yogasthala*\n\n` +
      `*Program:* ${program}\n` +
      `*Name:* ${name}\n` +
      `*Phone:* ${phone}\n` +
      `*Email:* ${emailEl ? emailEl.value : '—'}\n` +
      `*Location:* ${locationEl ? locationEl.value : '—'}\n` +
      `*Message:* ${msgEl ? msgEl.value : '—'}`
    );
    // Show success message first, then open WhatsApp
    document.getElementById('modal-form-content').style.display = 'none';
    document.getElementById('modal-success').style.display = 'block';
    setTimeout(() => {
      window.open('https://wa.me/' + waNum + '?text=' + waMsg, '_blank');
      setTimeout(closeModal, 1500);
    }, 800);
  }
  function handleContactSubmit() { alert('Thank you for your interest. Shruti will connect with you shortly. 🙏'); }
  document.getElementById('modal').addEventListener('click', function(e) { if (e.target === this) closeModal(); });

  // ── Contact form submission (Google Sheets + WhatsApp fallback) ──
  async function submitContactForm(e) {
    if (e) e.preventDefault();
    const nameEl = document.getElementById('cq-name');
    const emailEl = document.getElementById('cq-email');
    const phoneEl = document.getElementById('cq-phone');
    const locationEl = document.getElementById('cq-location') || document.querySelector('#contact-enquiry-form select:first-of-type');
    const programEl = document.getElementById('cq-program') || document.querySelector('#contact-enquiry-form select:last-of-type');
    const queryEl = document.getElementById('cq-query');

    const name = nameEl ? nameEl.value.trim() : '';
    const email = emailEl ? emailEl.value.trim() : '';
    const phone = phoneEl ? phoneEl.value.trim() : '';
    const cleanPhone = phone.replace(/\D/g, '');
    const location = locationEl ? locationEl.value : '';
    const program = programEl ? programEl.value : '';
    const query = queryEl ? queryEl.value.trim() : '';

    if (!name || name.length < 2) {
      alert('Please enter your full name (minimum 2 characters).');
      return;
    }
    if (!cleanPhone || cleanPhone.length < 10) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }

    const btn = document.querySelector('#contact-enquiry-form .btn-submit-contact');
    const origText = btn ? btn.textContent : 'Send Enquiry →';
    if (btn) {
      btn.textContent = 'Sending…';
      btn.disabled = true;
    }

    const endpoint = (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.registrationEndpoint)
      ? SITE_CONFIG.registrationEndpoint
      : 'https://script.google.com/macros/s/AKfycbz8Cdz6OreMzP6xb9iZeT9t_HOJhhNDLd__PNDSwFGw3cJaxG8-krPxoK5qPgjaFmtE0g/exec';

    const waNum = (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.whatsappNumber)
      ? SITE_CONFIG.whatsappNumber
      : '918950867190';

    const payload = {
      formKey: 'enquiry-classical-hatha-2026',
      submissionType: 'enquiry',
      source: 'Website Contact Form',
      programme: program || 'General Enquiry',
      name: name,
      phone: cleanPhone,
      email: email,
      location: location,
      notes: query,
      notifyEmail: (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.adminNotificationEmail) ? SITE_CONFIG.adminNotificationEmail : 'mayank.jain875@gmail.com',
      emailSubject: `💬 New Website Contact Enquiry: ${name} — ${program || 'General Enquiry'}`,
      date: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    };

    try {
      if (endpoint) {
        await fetch(endpoint, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload)
        });
      }
      const successEl = document.getElementById('contact-success');
      if (successEl) successEl.style.display = 'block';
      if (btn) {
        btn.textContent = 'Sent ✓';
        btn.style.background = 'var(--forest)';
      }
      if (nameEl) nameEl.value = '';
      if (emailEl) emailEl.value = '';
      if (phoneEl) phoneEl.value = '';
      if (queryEl) queryEl.value = '';
    } catch(err) {
      console.error('Contact form submission error:', err);
      // Fallback: open WhatsApp if error
      if (btn) {
        btn.textContent = origText;
        btn.disabled = false;
      }
      const waMsg = encodeURIComponent(
        `*New Enquiry — Dhyana Yogasthala*\n\n` +
        `*Name:* ${name || '—'}\n` +
        `*Phone:* ${phone || '—'}\n` +
        `*Email:* ${email || '—'}\n` +
        `*Location:* ${location || '—'}\n` +
        `*Program:* ${program || '—'}\n` +
        `*Query:* ${query || '—'}`
      );
      window.open('https://wa.me/' + waNum + '?text=' + waMsg, '_blank');
      const successEl = document.getElementById('contact-success');
      if (successEl) successEl.style.display = 'block';
    }
  }

  // Alias for backward compatibility
  const submitContactFormspree = submitContactForm;

  function toggleNav() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
      navLinks.classList.toggle('active');
    }
  }

  // ── Gallery Lightbox ────────────────────────────────────────────────────────
  let currentLightboxIdx = 0;
  const GALLERY_ITEMS = [
    {
      src: 'assets/images/gallery-group-meditation.webp',
      tag: 'Studio Sadhana',
      tagHi: 'स्टूडियो साधना',
      title: 'Group Dhyana & Meditative Stillness · Sonepat Studio',
      titleHi: 'गहन ध्यान और सामूहिक साधना (सोनीपत स्टूडियो)',
      alt: 'Practitioners seated in silent meditation on mats at Dhyana Yogasthala Sonepat studio'
    },
    {
      src: 'assets/images/gallery-3.webp',
      tag: 'All Generations',
      tagHi: 'सभी पीढ़ियां',
      title: 'Children & Family Yoga · Cultivating Poise & Focus',
      titleHi: 'बच्चों और युवाओं का योग — एकाग्रता व संतुलन',
      alt: 'Young boy with eyes closed meditating peacefully alongside family in studio'
    },
    {
      src: 'assets/images/gallery-2.webp',
      tag: 'Classical Hatha Yoga',
      tagHi: 'क्लासिकल हठ योग',
      title: 'Deep Meditation & Inner Stillness · Sonepat Studio',
      titleHi: 'गहन ध्यान और आंतरिक शांति (सोनीपत स्टूडियो)',
      alt: 'Young man sitting cross-legged in silent meditative stillness in Sonepat yoga studio'
    },
    {
      src: 'assets/images/gallery-4.webp',
      tag: 'Restorative Practices',
      tagHi: 'पुनर्स्थापनात्मक योग',
      title: 'Gentle Joint Mobility & Energy Alignment',
      titleHi: 'पुनर्स्थापनात्मक खिंचाव और ऊर्जा प्रवाह',
      alt: 'Young woman in seated yoga posture focusing inward on ochre practice mat'
    },
    {
      src: 'assets/images/gallery-5.webp',
      tag: 'Daily Sadhana',
      tagHi: 'दैनिक साधना',
      title: 'Vajrasana Meditation on Handwoven Mat',
      titleHi: 'प्राकृतिक मैट पर वज्रासन साधना',
      alt: 'Practitioner in white kurta and green salwar meditating in Vajrasana on natural mat'
    },
    {
      src: 'assets/images/gallery-asana-practice.webp',
      tag: 'Asana Alignment',
      tagHi: 'आसन संरेखण',
      title: 'Spine Alignment & Posture Sadhana in Guided Batch',
      titleHi: 'रीढ़ का संरेखण और शास्त्रीय आसन अभ्यास (सोनीपत स्टूडियो)',
      alt: 'Yoga practitioners engaged in spine alignment and classical posture at Dhyana Yogasthala'
    }
  ];

  function openLightbox(idx) {
    currentLightboxIdx = idx;
    const item = GALLERY_ITEMS[idx];
    if (!item) return;
    const isHi = typeof currentLang === 'function' && currentLang() === 'hi';
    const tag = (isHi && item.tagHi) ? item.tagHi : item.tag;
    const title = (isHi && item.titleHi) ? item.titleHi : item.title;

    const lb = document.getElementById('gallery-lightbox');
    const img = document.getElementById('lightbox-img');
    const catEl = document.getElementById('lightbox-cat');
    const titleEl = document.getElementById('lightbox-title');
    const countEl = document.getElementById('lightbox-count');

    if (img) {
      img.src = item.src;
      img.alt = item.alt;
    }
    if (catEl) catEl.textContent = tag;
    if (titleEl) titleEl.textContent = title;
    if (countEl) countEl.textContent = (idx + 1) + ' / ' + GALLERY_ITEMS.length;

    if (lb) {
      lb.classList.add('active');
      document.body.style.overflow = 'hidden';
      const closeBtn = lb.querySelector('.lightbox-close');
      if (closeBtn) closeBtn.focus();
    }
  }

  function closeLightbox() {
    const lb = document.getElementById('gallery-lightbox');
    if (lb) {
      lb.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function nextLightbox() {
    openLightbox((currentLightboxIdx + 1) % GALLERY_ITEMS.length);
  }

  function prevLightbox() {
    openLightbox((currentLightboxIdx - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
  }

  // Keyboard navigation & backdrop clicks
  document.addEventListener('keydown', function(e) {
    const lb = document.getElementById('gallery-lightbox');
    if (lb && lb.classList.contains('active')) {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowRight') nextLightbox();
      else if (e.key === 'ArrowLeft') prevLightbox();
    } else if (e.key === 'Escape') {
      const modal = document.getElementById('modal');
      if (modal && modal.classList.contains('open')) closeModal();
    }
  });

  const lbOverlay = document.getElementById('gallery-lightbox');
  if (lbOverlay) {
    lbOverlay.addEventListener('click', function(e) {
      if (e.target === this) closeLightbox();
    });
  }
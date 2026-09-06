  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) setTimeout(() => entry.target.classList.add('visible'), i * 80);
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => observer.observe(el));
  function openModal(program) {
    document.getElementById('modal-title').textContent = program;
    document.getElementById('modal-form-content').style.display = 'block';
    document.getElementById('modal-success').style.display = 'none';
    document.getElementById('modal').classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() { document.getElementById('modal').classList.remove('open'); document.body.style.overflow = ''; }
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
    if (!name || !phone) { alert('Please enter your name and phone number so Shruti can reach you.'); return; }

    const endpoint = (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.registrationEndpoint) ? SITE_CONFIG.registrationEndpoint : '';
    const waNum = (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.whatsappNumber) ? SITE_CONFIG.whatsappNumber : '918950867190';

    // Log to Google Sheet asynchronously
    if (endpoint) {
      fetch(endpoint, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          submissionType: 'modal_booking',
          source: 'Website Modal Booking',
          programme: program,
          name: name,
          phone: phone,
          email: emailEl ? emailEl.value : '',
          location: locationEl ? locationEl.value : '',
          notes: msgEl ? msgEl.value : '',
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
    const location = locationEl ? locationEl.value : '';
    const program = programEl ? programEl.value : '';
    const query = queryEl ? queryEl.value.trim() : '';

    if (!name && !email && !phone) {
      alert('Please enter your contact details (name, email, or phone).');
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
      submissionType: 'enquiry',
      source: 'Website Contact Form',
      programme: program || 'General Enquiry',
      name: name || 'Not specified',
      phone: phone,
      email: email,
      location: location,
      notes: query,
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
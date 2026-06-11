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
    // Build WhatsApp message
    const waMsg = encodeURIComponent(
      `*New Booking Request — Dhyana Yogasthala*

` +
      `*Program:* ${program}
` +
      `*Name:* ${name}
` +
      `*Phone:* ${phone}
` +
      `*Email:* ${emailEl ? emailEl.value : '—'}
` +
      `*Location:* ${locationEl ? locationEl.value : '—'}
` +
      `*Message:* ${msgEl ? msgEl.value : '—'}`
    );
    // Show success message first, then open WhatsApp
    document.getElementById('modal-form-content').style.display = 'none';
    document.getElementById('modal-success').style.display = 'block';
    setTimeout(() => {
      window.open('https://wa.me/918950867190?text=' + waMsg, '_blank');
      setTimeout(closeModal, 1500);
    }, 800);
  }
  function handleContactSubmit() { alert('Thank you for your interest. Shruti will connect with you shortly. 🙏'); }
  document.getElementById('modal').addEventListener('click', function(e) { if (e.target === this) closeModal(); });

  // ── OPTION 2: Formspree contact form submission ──
  async function submitContactFormspree(e) {
    e.preventDefault();
    const name = document.getElementById('cq-name') ? document.getElementById('cq-name').value.trim() : '';
    const email = document.getElementById('cq-email') ? document.getElementById('cq-email').value.trim() : '';
    const phone = document.getElementById('cq-phone') ? document.getElementById('cq-phone').value.trim() : '';
    if (!name || !email) { alert('Please enter your name and email address.'); return; }
    const btn = document.querySelector('#contact-enquiry-form .btn-submit-contact');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    // Collect all form data
    const locationSel = document.querySelector('#contact-enquiry-form select:first-of-type');
    const programSel = document.querySelector('#contact-enquiry-form select:last-of-type');
    const query = document.getElementById('cq-query') ? document.getElementById('cq-query').value : '';
    const formData = {
      name, email, phone,
      location: locationSel ? locationSel.value : '',
      program: programSel ? programSel.value : '',
      query,
      _subject: 'New Enquiry — Dhyana Yogasthala',
    };
    try {
      // IMPORTANT: Replace 'mbderkvq' below with your actual Formspree form ID
      // Sign up free at formspree.io, create a form, and paste the ID here
      const res = await fetch('https://formspree.io/f/mbderkvq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        document.getElementById('contact-success').style.display = 'block';
        btn.textContent = 'Sent ✓';
        btn.style.background = 'var(--forest)';
      } else {
        throw new Error('Form submission failed');
      }
    } catch(err) {
      // Fallback: open WhatsApp if Formspree not yet set up
      btn.textContent = 'Send Enquiry →';
      btn.disabled = false;
      const waMsg = encodeURIComponent(
        `*New Enquiry — Dhyana Yogasthala*

*Name:* ${name}
*Phone:* ${phone}
*Email:* ${email}
*Program:* ${programSel ? programSel.value : '—'}
*Query:* ${query}`
      );
      window.open('https://wa.me/918950867190?text=' + waMsg, '_blank');
    }
  }
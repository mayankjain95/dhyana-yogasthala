/**
 * js/components.js — Dhyana Yogasthala
 * Shared nav and footer injection.
 * Each page calls injectNav('main') or injectNav('subpage') from its own script tag.
 */

const NAV_MAIN = `
<a href="index.html#hero" class="nav-logo">Dhyana<span>Yogasthala</span></a>
<button class="nav-toggle" aria-label="Toggle Navigation" onclick="toggleNav()">☰</button>
<ul class="nav-links">
  <li><a href="index.html#what-is-yoga">What is Classical Hatha Yoga</a></li>
  <li><a href="index.html#practices">Practices</a></li>
  <li><a href="index.html#teacher">Teacher</a></li>
  <li><a href="index.html#locations">Locations</a></li>
  <li><a href="#" class="nav-wa" data-wa="default">🌿 Consult Teacher</a></li>
  <li><a href="index.html#contact" class="nav-cta">Enquire</a></li>
</ul>`;

const NAV_SUBPAGE = `
<a href="../index.html" class="nav-logo">Dhyana<span>Yogasthala</span></a>
<a href="../index.html" class="nav-back">← Back to Main Site</a>`;

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
<a href="../index.html" class="footer-logo">Dhyana<span>Yogasthala</span></a>
<span class="footer-copy">© ${(typeof SITE_CONFIG !== 'undefined' ? SITE_CONFIG.year : '2026')} Dhyana Yogasthala · Shruti Jain, Sonepat</span>
<a href="../index.html" class="footer-back">← Back to Main Site</a>`;

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

const PROGRAM_FORM_TEMPLATE = `
<section id="registration">
  <div class="form-wrap">
    <div class="form-header reveal">
      <div class="form-header-label">Registration</div>
      <h2 class="form-header-title" id="prog-form-title">Register</h2>
      <p class="form-header-sub" id="prog-form-sub"></p>
    </div>
    <div class="form-section reveal">
      <div class="form-section-title">Personal Details</div>
      <div class="form-grid">
        <div class="form-group"><label>Name <span class="req">*</span></label><input type="text" id="p-name" placeholder="Your full name" required></div>
        <div class="form-group"><label>Age <span class="req">*</span></label><input type="number" id="p-age" placeholder="Your age" min="5" max="90" required></div>
        <div class="form-group full"><label>Gender <span class="req">*</span></label>
          <div class="radio-group-inline" style="margin-top:0.5rem;">
            <label class="radio-option"><input type="radio" name="p-gender" value="Male"> Male</label>
            <label class="radio-option"><input type="radio" name="p-gender" value="Female"> Female</label>
          </div>
        </div>
        <div class="form-group"><label>Mobile / WhatsApp Number <span class="req">*</span></label><input type="tel" id="p-phone" placeholder="+91 XXXXX XXXXX" required></div>
        <div class="form-group"><label>Email ID <span class="req">*</span></label><input type="email" id="p-email" placeholder="your@email.com" required></div>
        <div class="form-group full"><label>City &amp; Country <span class="req">*</span></label><input type="text" id="p-city" placeholder="E.g. Delhi, India" required></div>
        <div class="form-group full"><label>Emergency Contact Name, Relationship &amp; Mobile Number <span class="req">*</span></label><input type="text" id="p-emergency" placeholder="E.g. Priya (Sister) — +91 98765 43210" required></div>
      </div>
    </div>
    <div class="form-section reveal">
      <div class="form-section-title">What Are You Hoping to Achieve Through Yoga?</div>
      <div class="form-grid">
        <div class="form-group full">
          <div class="radio-group">
            <label class="radio-option"><input type="radio" name="p-goal" value="Physical well-being"> Physical well-being</label>
            <label class="radio-option"><input type="radio" name="p-goal" value="Stress management"> Stress management</label>
            <label class="radio-option"><input type="radio" name="p-goal" value="Overall Health & Inner well-being"> Overall Health &amp; Inner well-being</label>
            <label class="radio-option"><input type="radio" name="p-goal" value="Mental and emotional well-being"> Mental and emotional well-being</label>
            <label class="radio-option"><input type="radio" name="p-goal" value="Spiritual growth"> Spiritual growth</label>
          </div>
        </div>
      </div>
    </div>
    <div class="form-section reveal">
      <div class="form-section-title">Background</div>
      <div class="form-grid">
        <div class="form-group full"><label>Have you practiced yoga before?</label>
          <div class="radio-group-inline" style="margin-top:0.5rem;">
            <label class="radio-option"><input type="radio" name="p-practiced" value="Yes"> Yes</label>
            <label class="radio-option"><input type="radio" name="p-practiced" value="No"> No</label>
          </div>
        </div>
      </div>
    </div>
    <div class="form-section reveal">
      <div class="form-section-title">Health Information</div>
      <div class="form-grid">
        <div class="form-group full"><label>For women, are you currently pregnant, planning for pregnancy or given birth in last 3 months? <span class="req">*</span></label>
          <div class="radio-group-inline" style="margin-top:0.5rem;">
            <label class="radio-option"><input type="radio" name="p-pregnancy" value="Yes"> Yes</label>
            <label class="radio-option"><input type="radio" name="p-pregnancy" value="No"> No</label>
            <label class="radio-option"><input type="radio" name="p-pregnancy" value="NA"> NA</label>
          </div>
        </div>
        <div class="form-group full"><label>Please indicate if you currently or previously have had any physical or mental ailments. Give details of the nature, duration, and any treatment. <span class="req">*</span></label>
          <div class="form-hint" style="margin-bottom:0.6rem;">E.g. — Neck/Backache, Joint issues, Chronic pain, Depression, Diabetes, Heart condition, High/Low BP, Hernia</div>
          <textarea id="p-health" rows="4" placeholder="Please describe your condition(s), or write 'None'" required></textarea>
          <span class="form-hint">All information is strictly confidential and used only to personalise your programme.</span>
        </div>
        <div class="form-group full"><label>If you had any serious illness, injury or surgery in last 3 years, please give details. <span class="req">*</span></label>
          <textarea id="p-injury" rows="3" placeholder="Please describe, or write 'None'" required></textarea>
        </div>
      </div>
    </div>
    <div class="form-section reveal">
      <div class="form-section-title">Declaration &amp; Terms</div>
      <div class="consent-block">
        <div class="consent-text">I hereby am willing to undertake the program completely. I understand that participation in yoga practices is voluntary. I will not communicate the contents of the program either directly/indirectly to anyone else. I commit to attend the session on time. I hereby declare that the above information is true, accurate and complete to the best of my knowledge.</div>
        <div class="radio-group" style="margin-top:0.8rem;">
          <label class="radio-option"><input type="radio" name="p-consent" value="Yes"> Yes</label>
          <label class="radio-option"><input type="radio" name="p-consent" value="No"> No</label>
        </div>
      </div>
      <br>
      <div id="prog-payment-consent-block" class="consent-block" style="margin-top:0;">
        <div class="consent-text"><strong style="color:var(--gold);">Payment &amp; Cancellation terms:</strong> Your registration will be completed upon receipt of the applicable fee. For recurring programs, fees must be paid in advance on a monthly basis. Rescheduling requests are accommodated subject to availability.</div>
        <div class="radio-group" style="margin-top:0.8rem;">
          <label class="radio-option"><input type="radio" name="p-payment-consent" value="Yes, I understand that"> Yes, I understand that</label>
          <label class="radio-option"><input type="radio" name="p-payment-consent" value="No"> No</label>
        </div>
      </div>
    </div>
    <div class="form-section reveal">
      <div class="form-section-title">Anything Else?</div>
      <div class="form-group"><label>Is there anything else you would like the instructor to know before the session?</label>
        <textarea id="p-notes" rows="4" placeholder="Your questions, expectations, or anything that would help Shruti support you better..."></textarea>
      </div>
    </div>
    <div class="submit-area reveal">
      <button class="btn-submit-main" onclick="handleProgramSubmit()">Submit Registration →</button>
      <p class="submit-note"></p>
    </div>
  </div>
</section>
<div class="payment-overlay" id="payment-overlay">
  <div class="payment-box">
    <div class="payment-box-header">
      <div class="payment-box-pretitle" id="prog-payment-pretitle">Dhyana Yogasthala</div>
      <div class="payment-box-title">Complete Your Payment</div>
    </div>
    <div class="payment-box-body">
      <div class="payment-steps">
        <div class="payment-step"><div class="payment-step-num">1</div><span>Scan the QR code below using Google Pay, PhonePe, Paytm, or any UPI app</span></div>
        <div class="payment-step"><div class="payment-step-num">2</div><span>Make the payment for your chosen programme duration</span></div>
        <div class="payment-step"><div class="payment-step-num">3</div><span>Click "I Have Paid" — Shruti will confirm your registration within 24 hours</span></div>
      </div>
      <div class="qr-wrap">
        <img src="../assets/images/upi-qr.webp" alt="UPI QR — Shruti Jain" class="qr-img">
        <div class="qr-upi"><strong>UPI ID: shruti.shruti.jain84@okaxis</strong> Scan with any UPI app · Seek with Shruti</div>
      </div>
      <button class="payment-done-btn" onclick="handlePaymentDone()">✓ I Have Paid — Complete Registration</button>
    </div>
  </div>
</div>
<div class="success-overlay" id="success-overlay">
  <div class="success-box">
    <div class="success-icon">🙏</div>
    <div class="success-title">You're Registered!</div>
    <p class="success-text">Your registration for <strong id="prog-success-name"></strong> has been received.<br><br>Shruti will be in touch via <strong>WhatsApp or email</strong> within 24 hours to confirm your registration.<br><br>We look forward to practising with you.</p>
    <button class="success-close" onclick="window.location.href='../index.html'">Return to Home</button>
  </div>
</div>
`;

function injectForm() {
  const container = document.getElementById('prog-form-container');
  if (container) {
    container.innerHTML = PROGRAM_FORM_TEMPLATE;
  }
}

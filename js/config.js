/**
 * js/config.js — Dhyana Yogasthala
 * Single source of truth for all shared constants.
 * To update the WhatsApp number, endpoint, or UPI ID, edit ONLY this file.
 */
const SITE_CONFIG = {
  siteName: 'Dhyana Yogasthala',
  teacherName: 'Shruti Jain',
  location: 'Sonepat',
  year: '2026',

  // WhatsApp
  whatsappNumber: '918950867190',
  whatsappDefaultMsg: 'Hi%20Shruti%2C%20I%20would%20like%20to%20know%20more%20about%20your%20yoga%20programmes.',
  whatsappSthiraMsg: 'Hi%20Shruti%2C%20I%20want%20to%20know%20more%20about%20Sthira.',

  // Google Sheets endpoint (shared Apps Script deployment)
  registrationEndpoint: 'https://script.google.com/macros/s/AKfycbz8Cdz6OreMzP6xb9iZeT9t_HOJhhNDLd__PNDSwFGw3cJaxG8-krPxoK5qPgjaFmtE0g/exec',

  // Payment
  upiId: 'shruti.shruti.jain84@okaxis',
  upiName: 'Shruti Jain',
};

/** Returns a full wa.me URL for a given message key ('default' or 'sthira') */
function waUrl(key) {
  const msg = key === 'sthira' ? SITE_CONFIG.whatsappSthiraMsg : SITE_CONFIG.whatsappDefaultMsg;
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${msg}`;
}

/** Applies correct WA href to all elements with [data-wa] attribute */
function applyWaLinks() {
  document.querySelectorAll('[data-wa]').forEach(el => {
    el.href = waUrl(el.dataset.wa);
  });
}

document.addEventListener('DOMContentLoaded', applyWaLinks);

/*
  Contact form → Google Sheets via Apps Script

  Client-side spam protection:
    1. Honeypot field ("website") — hidden from humans, bots fill it automatically
    2. Min-time check — reject submissions faster than 2 seconds after page load
    3. Silent rejection — bots see a fake success, making it hard to probe the trap

  Server-side protection lives in the Apps Script (see src/content/google-apps-script.js).
  Update that script and redeploy whenever you change the client-side fields.
*/

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbys1fv9eWpNQb7fbL9qrZSoSV2uYeZcCl-p48sPic9h_S2D0Z14ReeZMWKEFTZNUy3E/exec';

const MIN_TIME_MS = 2000;   // reject submissions under 2 seconds
const SUCCESS_HOLD_MS = 3000;

export const initContactForm = () => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  // Set the timestamp as soon as the page loads. Used both client-side
  // (min-time check below) and server-side (Apps Script rejects stale ones).
  const tsInput = form.querySelector('#ct-ts');
  if (tsInput) tsInput.value = String(Date.now());

  const btn = form.querySelector('.ct-submit');
  const originalText = btn.textContent;

  const showFakeSuccess = () => {
    // Used when we silently reject a bot — we pretend the submission worked
    // so scrapers/automation can't tell whether their payload was accepted.
    form.reset();
    if (tsInput) tsInput.value = String(Date.now());
    btn.textContent = 'Sent!';
    btn.classList.remove('ct-submit--sending');
    btn.classList.add('ct-submit--success');
    setTimeout(() => {
      btn.textContent = originalText;
      btn.disabled = false;
      btn.classList.remove('ct-submit--success');
    }, SUCCESS_HOLD_MS);
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Prevent double submit
    if (btn.disabled) return;
    btn.disabled = true;
    btn.textContent = 'Sending...';
    btn.classList.add('ct-submit--sending');

    // --- Spam protection ---

    // 1. Honeypot — if it has any value, it's a bot
    const honeypot = (form.elements.website && form.elements.website.value) || '';
    if (honeypot.trim()) {
      showFakeSuccess();
      return;
    }

    // 2. Min-time check — reject if submitted too fast
    const ts = Number(tsInput && tsInput.value) || 0;
    const elapsed = Date.now() - ts;
    if (ts && elapsed < MIN_TIME_MS) {
      showFakeSuccess();
      return;
    }

    const data = {
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      subject: form.elements.subject.value.trim(),
      message: form.elements.message.value.trim(),
      website: '', // always empty for real users
      _ts: String(ts),
    };

    try {
      if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
        // Dev mode — no script URL set yet, just show success
        console.warn('Contact form: Google Apps Script URL not set. Simulating success.');
        await new Promise((r) => setTimeout(r, 800));
      } else {
        const formData = new FormData();
        Object.entries(data).forEach(([k, v]) => formData.append(k, v));

        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          body: formData,
        });
      }

      // Success
      form.reset();
      if (tsInput) tsInput.value = String(Date.now());
      btn.textContent = 'Sent!';
      btn.classList.remove('ct-submit--sending');
      btn.classList.add('ct-submit--success');

      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.classList.remove('ct-submit--success');
      }, SUCCESS_HOLD_MS);

    } catch (err) {
      console.error('Contact form error:', err);
      btn.textContent = 'Failed — try again';
      btn.classList.remove('ct-submit--sending');
      btn.classList.add('ct-submit--error');

      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.classList.remove('ct-submit--error');
      }, SUCCESS_HOLD_MS);
    }
  });

  // FAQ accordion — only one open at a time
  const faqItems = document.querySelectorAll('.ct-faq-item');
  faqItems.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        faqItems.forEach((other) => {
          if (other !== item) other.removeAttribute('open');
        });
      }
    });
  });
};

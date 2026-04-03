/*
  Contact form → Google Sheets via Apps Script

  SETUP (one-time, ~5 minutes):
  1. Open Google Sheets → create a new sheet
  2. Name the columns in Row 1: Timestamp | Name | Email | Subject | Message
  3. Go to Extensions → Apps Script
  4. Delete the default code and paste the script from: src/content/google-apps-script.js
  5. Click Deploy → New deployment → Type: Web app
  6. Set "Execute as" = Me, "Who has access" = Anyone
  7. Click Deploy → copy the Web App URL
  8. Paste that URL below replacing the placeholder
*/

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbys1fv9eWpNQb7fbL9qrZSoSV2uYeZcCl-p48sPic9h_S2D0Z14ReeZMWKEFTZNUy3E/exec';

export const initContactForm = () => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const btn = form.querySelector('.ct-submit');
  const originalText = btn.textContent;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Prevent double submit
    if (btn.disabled) return;
    btn.disabled = true;
    btn.textContent = 'Sending...';
    btn.classList.add('ct-submit--sending');

    const data = {
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      subject: form.elements.subject.value.trim(),
      message: form.elements.message.value.trim(),
    };

    try {
      if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
        // Dev mode — no script URL set yet, just show success
        console.warn('Contact form: Google Apps Script URL not set. Simulating success.');
        await new Promise((r) => setTimeout(r, 800));
      } else {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('subject', data.subject);
        formData.append('message', data.message);

        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          body: formData,
        });
      }

      // Success
      form.reset();
      btn.textContent = 'Sent!';
      btn.classList.remove('ct-submit--sending');
      btn.classList.add('ct-submit--success');

      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.classList.remove('ct-submit--success');
      }, 3000);

    } catch (err) {
      console.error('Contact form error:', err);
      btn.textContent = 'Failed — try again';
      btn.classList.remove('ct-submit--sending');
      btn.classList.add('ct-submit--error');

      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.classList.remove('ct-submit--error');
      }, 3000);
    }
  });
};

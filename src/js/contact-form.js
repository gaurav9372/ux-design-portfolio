/*
  Contact form → Google Sheets via Apps Script

  Validation (all custom, no browser native tooltips):
    - Name: required, 1-150 chars
    - Email: required, valid format, 1-150 chars
    - Subject: optional, up to 150 chars
    - Message: required, 10-5000 chars, with live counter

  Client-side spam protection:
    1. Stale form check — alerts + reloads if form has been idle > 2 hours
    2. Honeypot field ("website") — hidden from humans, bots fill it automatically
    3. Min-time check — reject submissions faster than 2 seconds after page load
    4. Silent rejection — bots see a fake success, making it hard to probe the trap

  Server-side protection lives in the Apps Script (see src/content/google-apps-script.js).
  Update that script and redeploy whenever you change the client-side fields.
*/

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbys1fv9eWpNQb7fbL9qrZSoSV2uYeZcCl-p48sPic9h_S2D0Z14ReeZMWKEFTZNUy3E/exec';

const MIN_TIME_MS = 2000;               // reject submissions under 2 seconds
const MAX_TIME_MS = 2 * 60 * 60 * 1000; // 2 hours — form is stale after this
const SUCCESS_HOLD_MS = 3000;
const BUTTON_LABEL = 'Send Message';

const NAME_MAX = 150;
const EMAIL_MAX = 150;
const SUBJECT_MAX = 150;
const MSG_MIN_LEN = 10;
const MSG_MAX_LEN = 5000;
const MSG_WARN_AT = 4500;

const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const setError = (input, errorEl, message) => {
  if (message) {
    input.classList.add('is-invalid');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('is-visible');
    }
    return false;
  }
  input.classList.remove('is-invalid');
  if (errorEl) {
    errorEl.textContent = '';
    errorEl.classList.remove('is-visible');
  }
  return true;
};

export const initContactForm = () => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  // Set the timestamp as soon as the page loads.
  const tsInput = form.querySelector('#ct-ts');
  if (tsInput) tsInput.value = String(Date.now());

  const btn = form.querySelector('.ct-submit');
  const originalText = BUTTON_LABEL;
  btn.textContent = originalText;

  // Field references
  const nameInput = form.querySelector('#ct-name');
  const emailInput = form.querySelector('#ct-email');
  const subjectInput = form.querySelector('#ct-subject');
  const messageInput = form.querySelector('#ct-message');

  const nameError = form.querySelector('#ct-name-error');
  const emailError = form.querySelector('#ct-email-error');
  const subjectError = form.querySelector('#ct-subject-error');
  const messageError = form.querySelector('#ct-message-error');

  // Message counter refs
  const counter = form.querySelector('#ct-message-counter');
  const hint = form.querySelector('#ct-message-hint');
  const meta = form.querySelector('.ct-message-meta');

  // --- Per-field validators ---

  const validateName = ({ silent = false } = {}) => {
    if (!nameInput) return true;
    const value = nameInput.value.trim();
    const len = value.length;
    if (len === 0) {
      return silent ? !nameInput.classList.contains('is-invalid') : setError(nameInput, nameError, 'Name is required');
    }
    if (len > NAME_MAX) {
      return setError(nameInput, nameError, `Name must be under ${NAME_MAX} characters`);
    }
    if (/\d/.test(value)) {
      return setError(nameInput, nameError, 'Name cannot contain numbers');
    }
    return setError(nameInput, nameError, '');
  };

  const validateEmail = ({ silent = false } = {}) => {
    if (!emailInput) return true;
    const value = emailInput.value.trim();
    if (value.length === 0) {
      return silent ? !emailInput.classList.contains('is-invalid') : setError(emailInput, emailError, 'Email is required');
    }
    if (value.length > EMAIL_MAX) {
      return setError(emailInput, emailError, `Email must be under ${EMAIL_MAX} characters`);
    }
    if (!EMAIL_REGEX.test(value)) {
      return setError(emailInput, emailError, 'Please enter a valid email address');
    }
    return setError(emailInput, emailError, '');
  };

  const validateSubject = ({ silent = false } = {}) => {
    if (!subjectInput) return true;
    const len = subjectInput.value.trim().length;
    if (len === 0) {
      return silent ? !subjectInput.classList.contains('is-invalid') : setError(subjectInput, subjectError, 'Subject is required');
    }
    if (len > SUBJECT_MAX) {
      return setError(subjectInput, subjectError, `Subject must be under ${SUBJECT_MAX} characters`);
    }
    return setError(subjectInput, subjectError, '');
  };

  // Silent check — pure validity, no DOM side effects. Used for button state.
  const isFormValid = () => {
    if (!nameInput || !emailInput || !subjectInput || !messageInput) return false;
    const nameVal = nameInput.value.trim();
    if (nameVal.length === 0 || nameVal.length > NAME_MAX || /\d/.test(nameVal)) return false;
    const emailVal = emailInput.value.trim();
    if (emailVal.length === 0 || emailVal.length > EMAIL_MAX || !EMAIL_REGEX.test(emailVal)) return false;
    const subjLen = subjectInput.value.trim().length;
    if (subjLen === 0 || subjLen > SUBJECT_MAX) return false;
    const msgLen = messageInput.value.trim().length;
    if (msgLen < MSG_MIN_LEN || msgLen > MSG_MAX_LEN) return false;
    return true;
  };

  // Track whether the user has started interacting with the form.
  // Button stays enabled by default on fresh load; only after the user
  // touches a field do we start reflecting validity in the disabled state.
  let hasInteracted = false;

  const updateButtonState = () => {
    if (!btn) return;
    // Don't override transient states (sending/success/error)
    if (btn.classList.contains('ct-submit--sending') ||
        btn.classList.contains('ct-submit--success') ||
        btn.classList.contains('ct-submit--error')) return;
    if (!hasInteracted) {
      btn.disabled = false;
      return;
    }
    btn.disabled = !isFormValid();
  };

  const markInteracted = () => {
    if (!hasInteracted) {
      hasInteracted = true;
      updateButtonState();
    }
  };

  const validateMessage = () => {
    if (!messageInput || !counter || !hint || !meta) return true;
    const len = messageInput.value.trim().length;
    counter.textContent = `${len} / ${MSG_MAX_LEN}`;

    meta.classList.remove('is-warning', 'is-error');
    setError(messageInput, messageError, '');

    if (len === 0) {
      hint.textContent = `Minimum ${MSG_MIN_LEN} characters`;
      return false;
    }
    if (len < MSG_MIN_LEN) {
      meta.classList.add('is-error');
      hint.textContent = `${MSG_MIN_LEN - len} more character${MSG_MIN_LEN - len === 1 ? '' : 's'} needed`;
      return false;
    }
    if (len > MSG_MAX_LEN) {
      meta.classList.add('is-error');
      hint.textContent = `Too long by ${len - MSG_MAX_LEN}`;
      return false;
    }
    if (len >= MSG_WARN_AT) {
      meta.classList.add('is-warning');
    }
    hint.textContent = 'Looks good';
    return true;
  };

  // Runs all validators and returns true only if all pass
  const validateAll = () => {
    // Name and email: show "required" error on submit even if empty
    const nameOk = validateName();
    const emailOk = validateEmail();
    const subjectOk = validateSubject();
    const messageOk = validateMessage();
    // If message is empty, surface a required error under the field too
    if (!messageOk && messageInput && messageInput.value.trim().length === 0) {
      setError(messageInput, messageError, 'Message is required');
    } else if (!messageOk && messageInput && messageInput.value.trim().length > 0) {
      // re-reveal error from hint row as inline error too
      setError(messageInput, messageError, hint.textContent || 'Invalid message');
    }
    return nameOk && emailOk && subjectOk && messageOk;
  };

  // Live validation on input — only runs silent on untouched empty fields
  if (nameInput) {
    nameInput.addEventListener('input', () => { markInteracted(); validateName({ silent: true }); updateButtonState(); });
    nameInput.addEventListener('blur', () => { validateName(); updateButtonState(); });
  }
  if (emailInput) {
    emailInput.addEventListener('input', () => { markInteracted(); validateEmail({ silent: true }); updateButtonState(); });
    emailInput.addEventListener('blur', () => { validateEmail(); updateButtonState(); });
  }
  if (subjectInput) {
    subjectInput.addEventListener('input', () => { markInteracted(); validateSubject({ silent: true }); updateButtonState(); });
    subjectInput.addEventListener('blur', () => { validateSubject(); updateButtonState(); });
  }
  if (messageInput) {
    messageInput.addEventListener('input', () => { markInteracted(); validateMessage(); updateButtonState(); });
    validateMessage();
  }

  // Button starts enabled on fresh load
  btn.disabled = false;

  const showFakeSuccess = () => {
    form.reset();
    if (tsInput) tsInput.value = String(Date.now());
    validateMessage();
    setError(nameInput, nameError, '');
    setError(emailInput, emailError, '');
    setError(subjectInput, subjectError, '');
    setError(messageInput, messageError, '');
    btn.textContent = 'Sent!';
    btn.classList.remove('ct-submit--sending');
    btn.classList.add('ct-submit--success');
    hasInteracted = false;
    setTimeout(() => {
      btn.textContent = originalText;
      btn.disabled = false;
      btn.classList.remove('ct-submit--success');
      updateButtonState();
    }, SUCCESS_HOLD_MS);
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // --- Stale form check (user AFK > 2 hours) ---
    const submitTs = Number(tsInput && tsInput.value) || 0;
    if (submitTs > 0 && (Date.now() - submitTs) > MAX_TIME_MS) {
      alert('Your form session has expired after being idle for too long. The page will reload so you can try again.');
      window.location.reload();
      return;
    }

    // --- Full validation (blocks submission) ---
    if (!validateAll()) {
      // Focus the first invalid field
      const firstInvalid = form.querySelector('.is-invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Prevent double submit
    if (btn.disabled) return;
    btn.disabled = true;
    btn.innerHTML = 'Sending<span class="ct-spinner" aria-hidden="true"></span>';
    btn.classList.add('ct-submit--sending');

    // --- Spam protection ---

    // 1. Honeypot
    const honeypot = (form.elements.website && form.elements.website.value) || '';
    if (honeypot.trim()) {
      showFakeSuccess();
      return;
    }

    // 2. Min-time check
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
      website: '',
      _ts: String(ts),
    };

    try {
      if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
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
      hasInteracted = false;
      validateMessage();
      setError(nameInput, nameError, '');
      setError(emailInput, emailError, '');
      setError(subjectInput, subjectError, '');
      setError(messageInput, messageError, '');
      btn.textContent = 'Sent!';
      btn.classList.remove('ct-submit--sending');
      btn.classList.add('ct-submit--success');

      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.classList.remove('ct-submit--success');
        updateButtonState();
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
        updateButtonState();
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

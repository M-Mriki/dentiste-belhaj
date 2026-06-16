
document.querySelector('.btn-sub').addEventListener('click', function () {

 if (isValid) {
  document.getElementById('successPopup').style.display = 'flex';
}

  function setError(inputId, message) {
    const input = document.getElementById(inputId);
    const error = input.parentElement.querySelector('.error');

    error.textContent = message;
    input.classList.add('input-error');
    isValid = false;
  }

  function clearError(inputId) {
    const input = document.getElementById(inputId);
    const error = input.parentElement.querySelector('.error');

    error.textContent = "";
    input.classList.remove('input-error');
  }

  // Values
  let name = document.getElementById('fullname').value.trim();
  let phone = document.getElementById('phone').value.trim();
  let email = document.getElementById('email').value.trim();
  let service = document.getElementById('service').value;
  let date = document.getElementById('date').value;
  let time = document.getElementById('time').value;

  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let phoneRegex = /^(?:\+212|0)[5-7]\d{8}$/;

  // Reset errors
  ['fullname','phone','email','service','date','time'].forEach(clearError);

  // Validation
  if (name === "") {
    setError('fullname', "Nom obligatoire");
  }

  if (!phoneRegex.test(phone)) {
    setError('phone', "Numéro invalide");
  }

  if (!emailRegex.test(email)) {
    setError('email', "Email invalide");
  }

  if (service === "") {
    setError('service', "Choisissez un service");
  }

  if (date === "") {
    setError('date', "Choisissez une date");
  }

  if (time === "") {
    setError('time', "Choisissez une heure");
  }

  // Success
  if (isValid) {
    console.log("Formulaire valide ✅");
    // هنا تقدر دير submit أو API
  }

});


document.getElementById('closePopup').addEventListener('click', function() {
  document.getElementById('successPopup').style.display = 'none';
});







(function () {

  // ── CHANGE THIS to your real WhatsApp number (international format, no + or spaces) ──
  const WHATSAPP_NUMBER = '212639860110';

  const btn     = document.getElementById('whatsapp-btn');
  const popup   = document.getElementById('waPopup');
  const summary = document.getElementById('waSummary');
  const btnOk   = document.getElementById('waBtnConfirm');
  const btnNo   = document.getElementById('waBtnCancel');

  let waUrl = '';

  function setError(inputId, message) {
    const input = document.getElementById(inputId);
    const error = input.parentElement.querySelector('.error');
    if (error) error.textContent = message;
    input.classList.add('input-error');
  }

  function clearError(inputId) {
    const input = document.getElementById(inputId);
    const error = input.parentElement.querySelector('.error');
    if (error) error.textContent = '';
    input.classList.remove('input-error');
  }

  function formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('fr-FR', { weekday:'long', day:'numeric', month:'long', year:'numeric' });
  }

  btn.addEventListener('click', function () {

    let isValid = true;

    const name    = document.getElementById('fullname').value.trim();
    const phone   = document.getElementById('phone').value.trim();
    const email   = document.getElementById('email').value.trim();
    const service = document.getElementById('service').value;
    const date    = document.getElementById('date').value;
    const time    = document.getElementById('time').value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(?:\+212|0)[5-7]\d{8}$/;

    // Reset
    ['fullname','phone','email','service','date','time'].forEach(clearError);

    // Validate
    if (!name)                    { setError('fullname', 'Nom obligatoire');        isValid = false; }
    if (!phoneRegex.test(phone))  { setError('phone',    'Numéro invalide');        isValid = false; }
    if (!emailRegex.test(email))  { setError('email',    'Email invalide');         isValid = false; }
    if (!service)                 { setError('service',  'Choisissez un service');  isValid = false; }
    if (!date)                    { setError('date',     'Choisissez une date');    isValid = false; }
    if (!time)                    { setError('time',     'Choisissez une heure');   isValid = false; }

    if (!isValid) return;

    // Build WhatsApp message
    const msg =
`🦷 *Nouvelle demande de RDV*
─────────────────────
👤 *Nom :* ${name}
📞 *Téléphone :* ${phone}
📧 *Email :* ${email}
🩺 *Service :* ${service}
📅 *Date :* ${formatDate(date)}
🕐 *Heure :* ${time}
─────────────────────
_Message envoyé depuis le site web du cabinet Dr Belhaj Lakhdar Simohamed_`;

    waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

    // Fill popup summary
    summary.innerHTML =
      `<div>👤 <strong>Nom :</strong> ${name}</div>` +
      `<div>📞 <strong>Téléphone :</strong> ${phone}</div>` +
      `<div>📧 <strong>Email :</strong> ${email}</div>` +
      `<div>🩺 <strong>Service :</strong> ${service}</div>` +
      `<div>📅 <strong>Date :</strong> ${formatDate(date)}</div>` +
      `<div>🕐 <strong>Heure :</strong> ${time}</div>`;

    popup.classList.add('show');
  });

  // Confirm → open WhatsApp
  btnOk.addEventListener('click', function () {
    btn.classList.add('sending');
    popup.classList.remove('show');
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    // Reset form after short delay
    setTimeout(() => {
      document.getElementById('bookingForm').reset();
      document.querySelectorAll('.error').forEach(e => e.textContent = '');
      document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
      btn.classList.remove('sending');
    }, 800);
  });

  // Cancel
  btnNo.addEventListener('click', () => popup.classList.remove('show'));

  // Click outside to close
  popup.addEventListener('click', function (e) {
    if (e.target === this) popup.classList.remove('show');
  });

})();







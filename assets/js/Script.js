
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

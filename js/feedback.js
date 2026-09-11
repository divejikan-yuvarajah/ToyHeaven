// Toy Haven - Feedback page JavaScript
// Form validation, saving feedback, and FAQ accordion

document.addEventListener('DOMContentLoaded', function () {

  // Handle feedback form submit
  var form = document.getElementById('feedback-form');
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      handleSubmit();
    });
  }

  // Set up the FAQ accordion
  setupAccordion();

});


// Clear all error messages
function clearErrors() {
  var errorFields = document.querySelectorAll('.error-text');
  for (var i = 0; i < errorFields.length; i++) {
    errorFields[i].textContent = '';
  }

  var inputs = document.querySelectorAll('.input-error');
  for (var j = 0; j < inputs.length; j++) {
    inputs[j].classList.remove('input-error');
  }
}


// Show an error message under a field
function showError(fieldId, errorId, message) {
  var field = document.getElementById(fieldId);
  var errorEl = document.getElementById(errorId);

  if (field) {
    field.classList.add('input-error');
  }
  if (errorEl) {
    errorEl.textContent = message;
  }
}


// Simple check if email looks valid
function isValidEmail(email) {
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}


// Validate all form fields
function validateForm() {
  clearErrors();
  var isValid = true;

  var name = document.getElementById('name').value.trim();
  var email = document.getElementById('email').value.trim();
  var message = document.getElementById('message').value.trim();

  if (name === '') {
    showError('name', 'error-name', 'Name is required.');
    isValid = false;
  }

  if (email === '') {
    showError('email', 'error-email', 'Email is required.');
    isValid = false;
  } else if (isValidEmail(email) === false) {
    showError('email', 'error-email', 'Please enter a valid email address.');
    isValid = false;
  }

  if (message === '') {
    showError('message', 'error-message', 'Message is required.');
    isValid = false;
  }

  return isValid;
}


// Save feedback entry to localStorage
function saveFeedback(entry) {
  var list = JSON.parse(localStorage.getItem('feedbackList'));
  if (list === null) {
    list = [];
  }
  list.push(entry);
  localStorage.setItem('feedbackList', JSON.stringify(list));
}


// Handle form submission
function handleSubmit() {
  if (validateForm() === false) {
    return;
  }

  var entry = {
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    message: document.getElementById('message').value.trim(),
    date: new Date().toISOString()
  };

  saveFeedback(entry);

  // Hide form and show confirmation
  document.getElementById('feedback-form').hidden = true;
  document.getElementById('success-message').hidden = false;
}


// Set up FAQ accordion click handlers
function setupAccordion() {
  var questions = document.querySelectorAll('.accordion-question');

  for (var i = 0; i < questions.length; i++) {
    questions[i].addEventListener('click', function () {
      // Find the parent accordion item
      var item = this.parentElement;
      var icon = this.querySelector('.accordion-icon');

      // Toggle the "open" class to show or hide the answer
      var isOpen = item.classList.contains('open');
      if (isOpen) {
        item.classList.remove('open');
        icon.textContent = '+';
      } else {
        item.classList.add('open');
        icon.textContent = '-';
      }
    });
  }
}

// Toy Haven - Checkout page JavaScript
// Form validation, order summary, and saving orders to localStorage

document.addEventListener('DOMContentLoaded', function () {

  // Show order summary from cart
  renderOrderSummary();

  // Handle form submit
  var form = document.getElementById('checkout-form');
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      handleSubmit();
    });
  }

});


// Read cart from localStorage
function getCart() {
  var cart = JSON.parse(localStorage.getItem('cart'));
  if (cart === null) {
    cart = [];
  }
  return cart;
}


// Find a product by id in PRODUCTS
function findProductById(id) {
  for (var i = 0; i < PRODUCTS.length; i++) {
    if (PRODUCTS[i].id === id) {
      return PRODUCTS[i];
    }
  }
  return null;
}


// Calculate total price for the cart
function calculateTotal(cart) {
  var total = 0;
  for (var i = 0; i < cart.length; i++) {
    var product = findProductById(cart[i].id);
    if (product !== null) {
      total = total + (product.price * cart[i].quantity);
    }
  }
  return total;
}


// Display order summary items and total
function renderOrderSummary() {
  var cart = getCart();
  var itemsList = document.getElementById('summary-items');
  var totalElement = document.getElementById('summary-total');
  var checkoutContent = document.getElementById('checkout-content');
  var emptyCheckout = document.getElementById('empty-checkout');

  if (cart.length === 0) {
    checkoutContent.hidden = true;
    emptyCheckout.hidden = false;
    return;
  }

  checkoutContent.hidden = false;
  emptyCheckout.hidden = true;
  itemsList.innerHTML = '';

  // Add each cart item to the summary list
  for (var i = 0; i < cart.length; i++) {
    var product = findProductById(cart[i].id);
    if (product === null) {
      continue;
    }

    var subtotal = product.price * cart[i].quantity;

    var li = document.createElement('li');

    var nameSpan = document.createElement('span');
    nameSpan.className = 'summary-item-name';
    nameSpan.textContent = product.name;

    var qtySpan = document.createElement('span');
    qtySpan.className = 'summary-item-qty';
    qtySpan.textContent = 'x' + cart[i].quantity;

    var priceSpan = document.createElement('span');
    priceSpan.className = 'summary-item-price';
    priceSpan.textContent = '$' + subtotal.toFixed(2);

    li.appendChild(nameSpan);
    li.appendChild(qtySpan);
    li.appendChild(priceSpan);
    itemsList.appendChild(li);
  }

  var total = calculateTotal(cart);
  totalElement.textContent = '$' + total.toFixed(2);
}


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


// Get the selected payment method radio button value
function getPaymentMethod() {
  var radios = document.querySelectorAll('input[name="paymentMethod"]');
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      return radios[i].value;
    }
  }
  return '';
}


// Validate all form fields - returns true if everything is OK
function validateForm() {
  clearErrors();
  var isValid = true;

  var fullName = document.getElementById('full-name').value.trim();
  var email = document.getElementById('email').value.trim();
  var address = document.getElementById('address').value.trim();
  var paymentMethod = getPaymentMethod();

  // Full Name - required
  if (fullName === '') {
    showError('full-name', 'error-full-name', 'Full name is required.');
    isValid = false;
  }

  // Email - required and must look valid
  if (email === '') {
    showError('email', 'error-email', 'Email is required.');
    isValid = false;
  } else if (isValidEmail(email) === false) {
    showError('email', 'error-email', 'Please enter a valid email address.');
    isValid = false;
  }

  // Address - required
  if (address === '') {
    showError('address', 'error-address', 'Delivery address is required.');
    isValid = false;
  }

  // Payment method - must pick one
  if (paymentMethod === '') {
    showError('', 'error-payment', 'Please select a payment method.');
    isValid = false;
  }

  return isValid;
}


// Build order object with items and customer details
function buildOrder(fullName, email, address, paymentMethod) {
  var cart = getCart();
  var items = [];

  for (var i = 0; i < cart.length; i++) {
    var product = findProductById(cart[i].id);
    if (product !== null) {
      items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: cart[i].quantity,
        subtotal: product.price * cart[i].quantity
      });
    }
  }

  return {
    date: new Date().toISOString(),
    fullName: fullName,
    email: email,
    address: address,
    paymentMethod: paymentMethod,
    items: items,
    total: calculateTotal(cart)
  };
}


// Save order to orderHistory in localStorage
function saveOrder(order) {
  var history = JSON.parse(localStorage.getItem('orderHistory'));
  if (history === null) {
    history = [];
  }
  history.push(order);
  localStorage.setItem('orderHistory', JSON.stringify(history));
}


// Validate the form, save the order, clear cart, and show success
function handleSubmit() {
  // Stop if validation fails
  if (validateForm() === false) {
    return;
  }

  var cart = getCart();
  if (cart.length === 0) {
    return;
  }

  var fullName = document.getElementById('full-name').value.trim();
  var email = document.getElementById('email').value.trim();
  var address = document.getElementById('address').value.trim();
  var paymentMethod = getPaymentMethod();

  // Build and save the order
  var order = buildOrder(fullName, email, address, paymentMethod);
  saveOrder(order);

  // Clear the cart
  localStorage.setItem('cart', JSON.stringify([]));

  // Hide form and show success message
  document.getElementById('checkout-content').hidden = true;
  document.getElementById('success-message').hidden = false;
}
